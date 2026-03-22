<div align="center">
  <img src="assets/logo.svg" alt="Lighthouse Guard" width="160" height="160"/>

  # Lighthouse Guard

  > Stable and reliable Lighthouse CI — ban-protected, crash-resistant, multi-device GitHub Action.
</div>

> **This is a GitHub Action.** Add it to any repo's `.github/workflows/` file — no local install, no CLI, no Node.js setup needed. It runs in GitHub's CI environment automatically on every push or PR.

Lighthouse produces inconsistent scores on every run. This causes unreliable CI/CD results and unnecessary pipeline failures. **Lighthouse Guard** solves this with multiple runs, smart result aggregation, automatic retries, and rate limiting.

## The Problem

```
Run 1: Performance = 72
Run 2: Performance = 89   ← same page, same time, different score
Run 3: Performance = 81
```

Single-run Lighthouse in CI pipelines leads to:
- False failures that block deployments
- Teams ignoring Lighthouse results because they're unreliable
- Chrome processes leaking memory and crashing subsequent runs
- Target sites rate-limiting or banning CI runners

## The Solution

| Problem | Fix |
|---------|-----|
| Inconsistent scores | 3 runs + median strategy → outliers eliminated |
| Pipeline failures | `gracefulFail: true` → null return instead of crash |
| Chrome memory leaks | `SafeChrome` → guaranteed kill in `finally` block |
| Target site ban | `RateLimiter` + jitter → randomized delays between requests |
| Single device | `devices: ['mobile', 'desktop']` → separate thresholds per device |

---

## Quick Start

```yaml
- name: Install Chrome
  uses: browser-actions/setup-chrome@v1
  with:
    chrome-version: stable

- name: Run Lighthouse Guard
  uses: yasinatesim/lighthouse-guard@v1
  with:
    urls: |
      [
        {"url": "https://your-site.com", "name": "Home"}
      ]
    performance-threshold: 80
    accessibility-threshold: 90
    fail-on-threshold: true
```

That's it. Results appear as a GitHub Job Summary, PR comment, and downloadable dashboard artifact.

> **Note:** `browser-actions/setup-chrome@v1` is required before the action — it installs Chrome and sets `CHROME_PATH` automatically.

---

## Real-World Example

This action is used in production on **[yasinatesim/yasinates.com](https://github.com/yasinatesim/yasinates.com)** — a personal portfolio built with TanStack Start + React.

You can see it running live on the **[feature/mfe-migration PR](https://github.com/yasinatesim/yasinates.com/pull/49)** — the workflow audits 6 pages across 2 devices (mobile + desktop) with 3 runs each on every push and PR.

The workflow file: [`.github/workflows/lighthouse.yml`](https://github.com/yasinatesim/yasinates.com/blob/master/.github/workflows/lighthouse.yml)

---

## Examples

| File | Description |
|------|-------------|
| [`examples/quickstart.yml`](examples/quickstart.yml) | Minimal setup — copy and go |
| [`examples/github-actions.yml`](examples/github-actions.yml) | Standard workflow with Slack + dashboard |
| [`examples/full-workflow.yml`](examples/full-workflow.yml) | Every feature, fully annotated |
| [`examples/local-server.yml`](examples/local-server.yml) | Audit a locally started dev server |

### Pipeline Breaking

When `fail-on-threshold: true` and any score falls below its threshold, the GitHub Actions job exits with code 1:

```
❌ lighthouse-guard — Performance 72 < 80 (mobile · Home)
Error: All checks failed — see summary above
```

This blocks PR merges and deployment steps that `needs: [lighthouse]`.

### Dashboard

The dashboard is uploaded as a workflow artifact on every run — including failures.

**To view:**
1. Go to **Actions** → select the workflow run
2. Scroll to **Artifacts** at the bottom of the page
3. Download **lighthouse-dashboard**
4. Unzip → open **index.html** in your browser

The dashboard shows scores, Core Web Vitals (FCP, LCP, TBT, CLS), per-device breakdown, and failure details.

### Slack Notification

Add your webhook URL to **Settings → Secrets → Actions** as `SLACK_WEBHOOK`, then:

```yaml
slack-webhook: ${{ secrets.SLACK_WEBHOOK }}
```

The notification includes overall pass/fail status, per-page scores, and failure details. Sent on every run.

```
🔦 Lighthouse Guard ✅ — yasinates.com
  Home     mobile   Perf 92  A11y 97  BP 83  SEO 91
  Home     desktop  Perf 96  A11y 97  BP 83  SEO 92
  About    mobile   Perf 78  A11y 99  BP 90  SEO 88
All pages passed.
```

---

---

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `urls` | required | JSON array `[{"url":"...","name":"..."}]` or comma-separated URLs |
| `runs` | `3` | Number of Lighthouse runs per URL per device |
| `strategy` | `median` | Aggregation strategy: `median` or `average` |
| `devices` | `mobile,desktop` | Devices to test: `mobile`, `desktop`, or both |
| `performance-threshold` | `0` | Minimum performance score (0–100) |
| `accessibility-threshold` | `0` | Minimum accessibility score (0–100) |
| `seo-threshold` | `0` | Minimum SEO score (0–100) |
| `best-practices-threshold` | `0` | Minimum best practices score (0–100) |
| `delay-between-runs` | `10000` | Milliseconds to wait between runs (ban protection) |
| `delay-between-pages` | `15000` | Milliseconds to wait between pages (ban protection) |
| `max-retries` | `3` | Max retry attempts for a failed run |
| `fail-on-threshold` | `true` | Fail the action if any threshold is not met |
| `slack-webhook` | — | Slack incoming webhook URL for notifications |
| `github-token` | `${{ github.token }}` | Token for PR comments |
| `upload-dashboard` | `true` | Upload HTML dashboard as a workflow artifact |

## Outputs

| Output | Description |
|--------|-------------|
| `results` | Full JSON results array |
| `passed` | `true` or `false` |
| `summary` | One-line text summary |

---

## GitHub Actions Output

### Job Summary

Every run produces a markdown summary directly in the Actions tab:

```
## 🔦 Lighthouse Guard ✅

| Page    | Device  | Perf   | A11y  | BP    | SEO   | Status |
|---------|---------|--------|-------|-------|-------|--------|
| Home    | mobile  | 🟢 92  | 🟢 97 | 🟢 83 | 🟢 91 | ✅     |
| Home    | desktop | 🟢 96  | 🟢 97 | 🟢 83 | 🟢 92 | ✅     |
| About   | mobile  | 🟡 78  | 🟢 99 | 🟢 90 | 🟢 88 | ✅     |
| About   | desktop | 🟢 91  | 🟢 99 | 🟢 90 | 🟢 90 | ✅     |
```

### PR Comment

Results are automatically posted (and updated) as a PR comment on every run.

### Dashboard Artifact

A self-contained HTML dashboard is uploaded as a workflow artifact. Download it from the Actions run page — no server required, open directly in a browser.

---

## Score Colors

| Score | Color | Meaning |
|-------|-------|---------|
| 90–100 | 🟢 Green | Good |
| 50–89 | 🟡 Yellow | Needs improvement |
| 0–49 | 🔴 Red | Poor |

---

## How It Works

### Multiple Runs + Median Strategy

```
Run 1: 72  ← outlier (cold cache, network spike)
Run 2: 89  ← median ← used as final score
Run 3: 81

Final score: 89
```

The median eliminates outliers caused by network variance, CPU scheduling, or cold caches.

### Rate Limiter + Jitter

```
Run 1 → [10s + random 0-3s] → Run 2 → [10s + random 0-3s] → Run 3
Page 1 → [15s + random 0-5s] → Page 2
```

Randomized jitter prevents the request pattern from looking like a bot. Target sites won't rate-limit or ban your CI runner.

### SafeChrome — Guaranteed Cleanup

```typescript
const chrome = new SafeChrome(flags);
try {
  const port = await chrome.launch();
  const result = await runLighthouse(url, port);
  return result;
} finally {
  await chrome.kill(); // always runs, even on error or timeout
}
```

No zombie Chrome processes. No port conflicts between runs. No memory leaks accumulating over long CI jobs.

### Graceful Fail

```typescript
gracefulFail: true  // default
```

If all retries are exhausted for a run, the run is skipped (returns `null`) instead of throwing. The pipeline continues. Partial results are still aggregated and reported.

---

## Architecture

```
src/
├── types.ts                    # All TypeScript interfaces
├── rate-limiter.ts             # Jittered delay between requests
├── safe-chrome.ts              # Chrome lifecycle (launch/kill)
├── aggregator.ts               # Combine N runs (median/average)
├── notifier.ts                 # Slack + webhook notifications
├── runner.ts                   # LighthouseGuard orchestrator
├── action/
│   ├── index.ts               # GitHub Action entry point
│   └── dashboard-generator.ts # Inject results into HTML
└── dashboard/
    └── index.html             # Self-contained dark-theme dashboard
action.yml                     # Action definition (inputs/outputs)
```

---

## Local Development

```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Build TypeScript
npm run build:ts

# Build action bundle (tsc + ncc)
npm run build
```

Requirements: Node.js 20+, Chrome installed on the system.

---

## License

MIT