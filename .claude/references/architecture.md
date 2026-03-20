---
name: architecture
description: Architecture overview of lighthouse-guard modules
type: reference
---

# Architecture

## Module Responsibilities

| Module | Responsibility |
|--------|---------------|
| `types.ts` | All shared TypeScript interfaces |
| `rate-limiter.ts` | Delay between requests (ban protection) |
| `safe-chrome.ts` | Launch/kill Chrome safely (memory leak prevention) |
| `aggregator.ts` | Combine multiple run results (median/average) |
| `notifier.ts` | Send Slack/webhook notifications |
| `runner.ts` | Orchestrate all modules, main LighthouseGuard class |
| `action/index.ts` | GitHub Action entrypoint, reads inputs, writes outputs |
| `action/dashboard-generator.ts` | Inject results into HTML dashboard template |
| `dashboard/index.html` | Dark-themed dashboard with __RESULTS_DATA__ placeholder |

## Data Flow
```
action/index.ts
  → LighthouseGuard (runner.ts)
    → RateLimiter (rate-limiter.ts)   [ban protection between runs]
    → SafeChrome (safe-chrome.ts)     [Chrome lifecycle per run]
    → lighthouse npm package          [actual measurement]
    → Aggregator (aggregator.ts)      [combine N runs]
    → threshold check                 [compare vs thresholds]
  → Notifier (notifier.ts)           [Slack/webhook]
  → generateDashboardHTML            [inject into HTML]
  → GitHub Job Summary               [markdown table]
  → PR Comment                       [optional]
  → Artifact upload                  [dashboard HTML]
```

## Key Design Decisions
- No Puppeteer/Playwright — chrome-launcher is ~50KB vs ~400MB
- gracefulFail: null return instead of throwing (pipeline stays green)
- Exponential backoff on retry (retryDelay * attempt)
- Dashboard is a single self-contained HTML file (no CDN, no framework)
- __RESULTS_DATA__ placeholder replaced at build time with JSON.stringify(results)
