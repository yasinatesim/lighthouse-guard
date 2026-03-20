# Lighthouse Guard

Stable Lighthouse CI tool — ban-protected, resilient, multi-device GitHub Action.

## Project Purpose

Solves Lighthouse's inconsistent results and CI pipeline failures:
- Multiple measurements + median strategy → stable scores
- Rate limiting + jitter → target site does not ban
- gracefulFail + retry → pipeline does not break
- SafeChrome → no memory leaks

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 20, TypeScript 5 (strict) |
| Auditing | Lighthouse 12, chrome-launcher 1 |
| Action SDK | @actions/core, @actions/github, @actions/artifact |
| Build | tsc + @vercel/ncc (single dist bundle) |

## Project Structure

```
src/
├── types.ts                    # All TypeScript interfaces
├── rate-limiter.ts             # Jitter-based waiting (ban protection)
├── safe-chrome.ts              # Chrome launch/kill (leak protection)
├── aggregator.ts               # Multiple run aggregation (median/average)
├── notifier.ts                 # Slack + webhook notifications
├── runner.ts                   # Main LighthouseGuard class
├── action/
│   ├── index.ts               # GitHub Action entry point
│   └── dashboard-generator.ts # Inject data into HTML
└── dashboard/
    └── index.html             # Dark-theme dashboard (__RESULTS_DATA__)
action.yml                     # Action definition (inputs/outputs)
examples/github-actions.yml    # Usage example
```

## Commands

```bash
npm run build        # Compile TypeScript + ncc bundle
npm run build:ts     # Compile TypeScript only
npm run type-check   # Check type errors (no compilation)
npm run lint         # ESLint
```

## Critical Rules

1. **Chrome must always be closed in finally** — SafeChrome.kill() must always run
2. **gracefulFail: true** — If Lighthouse returns no result, return null, do not throw
3. **RateLimiter must be used in all runs** — direct setTimeout is prohibited
4. **No interfaces defined outside types.ts**
5. **any type is forbidden** — use unknown
6. **__RESULTS_DATA__** — this placeholder must always be preserved in the dashboard template

## Data Flow

```
action/index.ts (receive inputs)
  → LighthouseGuard.run()
    → for each page × each device:
      → RateLimiter.wait() (between runs)
      → SafeChrome.launch() + lighthouse() + SafeChrome.kill() (finally)
      → retry on failure (exponential backoff)
      → Aggregator.scores() / .metrics() (median/average)
      → threshold check → Failure[]
  → Notifier.notify() (Slack/webhook)
  → generateDashboardHTML() (__RESULTS_DATA__ replace)
  → core.summary.addRaw() (Job Summary)
  → PR comment (optional)
  → artifact upload (optional)
```

## Development Workflow

1. Brainstorming → create BRAID graph with `/prompt-enhancer`
2. Implementation → write the code
3. Code Review → run `/wtf-code-reviewer` (Chrome safety + type check)
4. Verification → `npm run type-check` must pass
5. Build → create dist/ with `npm run build`

## Skill Integration

| Situation | Skill |
|-----------|-------|
| After every implementation | `/wtf-code-reviewer` |
| Complex feature/debug | `/prompt-enhancer` |
| Before PR | `/code-review-graph:review-pr` |
| After every commit | `/code-review-graph:review-delta` |

## Known Behaviors

- `gracefulFail: true` → If all retries fail, run is skipped (null), pipeline continues
- Chrome kill: normal kill → PID SIGKILL → 1s wait (to free the port)
- Jitter: 0-30% of baseDelay as random extra time (bot detection prevention)
- Dashboard: `__RESULTS_DATA__` is replaced with full JSON string, no framework
