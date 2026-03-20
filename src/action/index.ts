import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'fs';
import * as path from 'path';
import { LighthouseGuard } from '../runner';
import { RunResult } from '../types';
import { generateDashboardHTML } from './dashboard-generator';

async function run(): Promise<void> {
  try {
    const urlsInput = core.getInput('urls', { required: true });
    const runs = parseInt(core.getInput('runs'));
    const strategy = core.getInput('strategy') as 'median' | 'average';
    const devices = core.getInput('devices').split(',').map(d => d.trim()) as ('mobile' | 'desktop')[];
    const perfThreshold = parseInt(core.getInput('performance-threshold')) || 0;
    const a11yThreshold = parseInt(core.getInput('accessibility-threshold')) || 0;
    const seoThreshold = parseInt(core.getInput('seo-threshold')) || 0;
    const bpThreshold = parseInt(core.getInput('best-practices-threshold')) || 0;
    const delayRuns = parseInt(core.getInput('delay-between-runs'));
    const delayPages = parseInt(core.getInput('delay-between-pages'));
    const maxRetries = parseInt(core.getInput('max-retries'));
    const failOnThreshold = core.getInput('fail-on-threshold') === 'true';
    const slackWebhook = core.getInput('slack-webhook');
    const githubToken = core.getInput('github-token');
    const uploadDashboard = core.getInput('upload-dashboard') === 'true';

    let urls: Array<{ url: string; name: string }>;
    try {
      urls = JSON.parse(urlsInput) as Array<{ url: string; name: string }>;
    } catch {
      urls = urlsInput.split(',').map(u => ({
        url: u.trim(),
        name: new URL(u.trim()).pathname || u.trim(),
      }));
    }

    const threshold = (val: number) => val > 0 ? val : undefined;

    const pagesConfig = urls.map(u => ({
      ...u,
      thresholds: {
        mobile: {
          performance: threshold(perfThreshold),
          accessibility: threshold(a11yThreshold),
          seo: threshold(seoThreshold),
          bestPractices: threshold(bpThreshold),
        },
        desktop: {
          performance: threshold(perfThreshold),
          accessibility: threshold(a11yThreshold),
          seo: threshold(seoThreshold),
          bestPractices: threshold(bpThreshold),
        },
      },
    }));

    core.info('╔══════════════════════════════════════╗');
    core.info('║     🔦 Lighthouse Guard Action       ║');
    core.info('╚══════════════════════════════════════╝');
    core.info('');
    core.info(`📋 ${urls.length} pages × ${devices.length} devices × ${runs} runs`);
    core.info(`📊 Strategy: ${strategy}`);
    core.info(`⏱️  Between runs: ${delayRuns / 1000}s | Between pages: ${delayPages / 1000}s`);

    const guard = new LighthouseGuard({
      urls: pagesConfig,
      runs,
      strategy,
      devices,
      delayBetweenRuns: delayRuns,
      delayBetweenPages: delayPages,
      maxRetries,
      gracefulFail: true,
      failOnThreshold,
      notifications: slackWebhook ? { slack: { webhookUrl: slackWebhook } } : undefined,
    });

    const { results, passed } = await guard.run();

    core.setOutput('results', JSON.stringify(results));
    core.setOutput('passed', passed.toString());
    core.setOutput('summary', results.map(r => `${r.name}(${r.device}): Perf=${r.scores.performance}`).join(', '));

    await writeJobSummary(results, passed);

    if (githubToken && github.context.payload.pull_request) {
      await writePRComment(results, passed, githubToken);
    }

    if (uploadDashboard) {
      await uploadDashboardArtifact(results);
    }

    const outputDir = path.join(process.cwd(), 'lighthouse-guard-results');
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify(results, null, 2));

    if (!passed && failOnThreshold) {
      core.setFailed('Some pages failed to meet threshold values!');
    }
  } catch (error: unknown) {
    core.setFailed(`Action error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function writeJobSummary(results: RunResult[], allPassed: boolean): Promise<void> {
  const icon = allPassed ? '✅' : '❌';
  const status = allPassed ? 'All Tests Passed' : 'Some Tests Failed';

  let md = `## 🔦 Lighthouse Guard ${icon}\n\n`;
  md += `### ${status}\n\n`;

  md += '| Page | Device | Perf | A11y | BP | SEO | Status |\n';
  md += '|------|--------|------|------|----|-----|--------|\n';

  for (const r of results) {
    const e = r.passed ? '✅' : '❌';
    md += `| ${r.name} | ${r.device} `;
    md += `| ${scoreEmoji(r.scores.performance)} ${r.scores.performance} `;
    md += `| ${scoreEmoji(r.scores.accessibility)} ${r.scores.accessibility} `;
    md += `| ${scoreEmoji(r.scores.bestPractices)} ${r.scores.bestPractices} `;
    md += `| ${scoreEmoji(r.scores.seo)} ${r.scores.seo} `;
    md += `| ${e} |\n`;
  }

  md += '\n### 📊 Core Web Vitals\n\n';
  md += '| Page | Device | LCP | FCP | TBT | CLS |\n';
  md += '|------|--------|-----|-----|-----|-----|\n';

  for (const r of results) {
    md += `| ${r.name} | ${r.device} `;
    md += `| ${Math.round(r.metrics.lcp)}ms `;
    md += `| ${Math.round(r.metrics.fcp)}ms `;
    md += `| ${Math.round(r.metrics.tbt)}ms `;
    md += `| ${r.metrics.cls.toFixed(3)} |\n`;
  }

  md += '\n<details>\n<summary>🔄 Individual Run Details</summary>\n\n';

  for (const r of results) {
    md += `#### ${r.name} (${r.device})\n`;
    md += `${r.successfulRuns}/${r.totalRuns} successful runs | Strategy: ${r.strategy}\n\n`;
    md += '| Run | Perf | A11y | BP | SEO |\n';
    md += '|-----|------|------|----|-----|\n';
    r.individualRuns.forEach((run, i) => {
      md += `| ${i + 1} | ${run.performance} | ${run.accessibility} | ${run.bestPractices} | ${run.seo} |\n`;
    });
    md += '\n';
  }
  md += '</details>\n';

  const failures = results.filter(r => r.failures.length > 0);
  if (failures.length > 0) {
    md += '\n### ⚠️ Failed Threshold Values\n\n';
    for (const r of failures) {
      md += `**${r.name}** (${r.device}):\n`;
      for (const f of r.failures) {
        md += `- ${f.metric}: **${f.actual}** (expected min: ${f.expected})\n`;
      }
      md += '\n';
    }
  }

  await core.summary.addRaw(md).write();
}

async function writePRComment(results: RunResult[], allPassed: boolean, token: string): Promise<void> {
  try {
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;
    const prNumber = github.context.payload.pull_request!.number;

    const icon = allPassed ? '✅' : '❌';
    let body = `## 🔦 Lighthouse Guard ${icon}\n\n`;

    body += '| Page | Device | Perf | A11y | BP | SEO |\n';
    body += '|------|--------|------|------|----|-----|\n';

    for (const r of results) {
      body += `| ${r.name} | ${r.device} `;
      body += `| ${scoreEmoji(r.scores.performance)} ${r.scores.performance} `;
      body += `| ${scoreEmoji(r.scores.accessibility)} ${r.scores.accessibility} `;
      body += `| ${scoreEmoji(r.scores.bestPractices)} ${r.scores.bestPractices} `;
      body += `| ${scoreEmoji(r.scores.seo)} ${r.scores.seo} |\n`;
    }

    body += `\n_${results[0]?.runs ?? 3} measurements, ${results[0]?.strategy ?? 'median'} strategy_`;

    const { data: comments } = await octokit.rest.issues.listComments({
      owner, repo, issue_number: prNumber,
    });

    const existing = comments.find(c => c.body?.includes('🔦 Lighthouse Guard'));

    if (existing) {
      await octokit.rest.issues.updateComment({ owner, repo, comment_id: existing.id, body });
    } else {
      await octokit.rest.issues.createComment({ owner, repo, issue_number: prNumber, body });
    }

    core.info('💬 PR comment written');
  } catch (error: unknown) {
    core.warning(`PR comment could not be written: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function uploadDashboardArtifact(results: RunResult[]): Promise<void> {
  try {
    const { DefaultArtifactClient } = await import('@actions/artifact');
    const dashboardDir = path.join(process.cwd(), 'lighthouse-dashboard');
    fs.mkdirSync(dashboardDir, { recursive: true });

    const html = generateDashboardHTML(results);
    const htmlPath = path.join(dashboardDir, 'index.html');
    const dataPath = path.join(dashboardDir, 'data.json');

    fs.writeFileSync(htmlPath, html);
    fs.writeFileSync(dataPath, JSON.stringify(results, null, 2));

    const client = new DefaultArtifactClient();
    await client.uploadArtifact('lighthouse-dashboard', [htmlPath, dataPath], dashboardDir);

    core.info('📊 Dashboard artifact uploaded');
  } catch (error: unknown) {
    core.warning(`Dashboard could not be uploaded: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function scoreEmoji(score: number): string {
  if (score >= 90) return '🟢';
  if (score >= 50) return '🟡';
  return '🔴';
}

run().catch(err => core.setFailed(String(err)));
