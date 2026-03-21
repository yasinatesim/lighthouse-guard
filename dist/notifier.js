"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notifier = void 0;
class Notifier {
    config;
    constructor(config) {
        this.config = config;
    }
    async notify(results) {
        if (!this.config)
            return;
        const allPassed = results.every(r => r.passed);
        if (this.config.slack) {
            await this.sendSlack(results, allPassed);
        }
        if (this.config.webhook) {
            await this.sendWebhook(results, allPassed);
        }
    }
    async sendSlack(results, allPassed) {
        const slack = this.config.slack;
        const emoji = allPassed ? '✅' : '🔴';
        const status = allPassed ? 'PASSED' : 'FAILED';
        const mention = !allPassed && slack.mentionOnFail ? `${slack.mentionOnFail} ` : '';
        const blocks = [
            {
                type: 'header',
                text: { type: 'plain_text', text: `${emoji} Lighthouse Guard: ${status}` },
            },
        ];
        for (const result of results) {
            const icon = result.passed ? '✅' : '❌';
            let text = `${icon} *${result.name}* (${result.device})\n`;
            text += `Performance: *${result.scores.performance}* | `;
            text += `A11y: *${result.scores.accessibility}* | `;
            text += `BP: *${result.scores.bestPractices}* | `;
            text += `SEO: *${result.scores.seo}*\n`;
            text += `LCP: ${Math.round(result.metrics.lcp)}ms | `;
            text += `FCP: ${Math.round(result.metrics.fcp)}ms | `;
            text += `CLS: ${result.metrics.cls.toFixed(3)}\n`;
            if (result.failures.length > 0) {
                text += `\n⚠️ Failed:\n`;
                for (const f of result.failures) {
                    text += `  • ${f.metric}: ${f.actual} (min: ${f.expected})\n`;
                }
            }
            text += `\n_${result.successfulRuns}/${result.totalRuns} successful runs, strategy: ${result.strategy}_`;
            blocks.push({ type: 'section', text: { type: 'mrkdwn', text } });
            blocks.push({ type: 'divider' });
        }
        const payload = {
            text: `${mention}${emoji} Lighthouse Guard: ${status}`,
            blocks,
        };
        if (slack.channel) {
            payload.channel = slack.channel;
        }
        try {
            const response = await fetch(slack.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                console.warn(`   ⚠️  Slack notification could not be sent: ${response.status}`);
            }
            else {
                console.log('   📨 Slack notification sent');
            }
        }
        catch (error) {
            console.warn(`   ⚠️  Slack connection error: ${error}`);
        }
    }
    async sendWebhook(results, allPassed) {
        const webhook = this.config.webhook;
        try {
            const response = await fetch(webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...(webhook.headers || {}) },
                body: JSON.stringify({
                    status: allPassed ? 'passed' : 'failed',
                    timestamp: new Date().toISOString(),
                    results,
                }),
            });
            if (!response.ok) {
                console.warn(`   ⚠️  Webhook could not be sent: ${response.status}`);
            }
        }
        catch (error) {
            console.warn(`   ⚠️  Webhook connection error: ${error}`);
        }
    }
}
exports.Notifier = Notifier;
//# sourceMappingURL=notifier.js.map