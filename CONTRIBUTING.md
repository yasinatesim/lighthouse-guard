# Contributing to Lighthouse Guard

Thank you for your interest in contributing. This document covers how to set up the project, the conventions to follow, and how to submit changes.

---

## Getting Started

### Prerequisites

- Node.js 20+
- Chrome installed locally
- Git

### Setup

```bash
git clone https://github.com/yasinatesim/lighthouse-guard.git
cd lighthouse-guard
npm install
npm run type-check
```

---

## Project Structure

```
src/
├── types.ts                    # All shared TypeScript interfaces — add new types here
├── rate-limiter.ts             # Request delay logic (ban protection)
├── safe-chrome.ts              # Chrome launch/kill lifecycle
├── aggregator.ts               # Multi-run result aggregation (median/average)
├── notifier.ts                 # Slack + webhook notifications
├── runner.ts                   # Main LighthouseGuard orchestrator
├── action/
│   ├── index.ts               # GitHub Action entry point
│   └── dashboard-generator.ts # Injects results into dashboard HTML
└── dashboard/
    └── index.html             # Self-contained HTML dashboard
action.yml                     # Action definition (inputs/outputs/runs)
examples/
└── github-actions.yml         # Usage example for yasinates.com
```

---

## Development Workflow

### 1. Create a branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/your-bug-description
```

### 2. Make changes

Follow the conventions below. Run type checking before committing:

```bash
npm run type-check
```

### 3. Build

```bash
npm run build:ts   # TypeScript only
npm run build      # Full build including ncc bundle
```

### 4. Test manually

```bash
# Quick smoke test against a real URL
node -e "
const { LighthouseGuard } = require('./dist/runner');
const guard = new LighthouseGuard({
  urls: [{ url: 'https://yasinates.com', name: 'Home', thresholds: { mobile: { performance: 50 } } }],
  runs: 1,
  devices: ['mobile'],
  delayBetweenRuns: 0,
  delayBetweenPages: 0,
});
guard.run().then(({ passed }) => console.log('Passed:', passed));
"
```

### 5. Open a pull request

- Title: `feat: ...` / `fix: ...` / `docs: ...` / `refactor: ...`
- Description: what the change does and why
- Link any related issue

---

## Code Conventions

### TypeScript

- **Strict mode is on** — no `any`, no implicit `any`
- All new interfaces go in `src/types.ts`
- Use `unknown` when the type is genuinely unknown, then narrow it

```typescript
// ✅ correct
function handleError(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
}

// ❌ wrong
function handleError(error: any): void { ... }
```

### Chrome Lifecycle — Critical Rule

Every `SafeChrome.launch()` **must** have a matching `kill()` in a `finally` block. No exceptions.

```typescript
// ✅ correct
const chrome = new SafeChrome(flags);
try {
  const port = await chrome.launch();
  return await runLighthouse(url, port);
} finally {
  await chrome.kill();
}

// ❌ wrong — kill() only runs on success
const port = await chrome.launch();
const result = await runLighthouse(url, port);
await chrome.kill();
return result;
```

### Graceful Fail Pattern

Return `null` instead of throwing when retries are exhausted and `gracefulFail` is `true`. The caller must handle `null`.

```typescript
// ✅ correct
if (this.config.gracefulFail) {
  return null;
}
throw new Error(`All retries failed for ${url}`);
```

### Rate Limiting

Never use `setTimeout` directly for delays between Lighthouse runs. Always use `RateLimiter` so jitter is applied.

```typescript
// ✅ correct
await this.rateLimiter.wait(this.config.delayBetweenRuns, 'Before run 2');

// ❌ wrong
await new Promise(r => setTimeout(r, 10000));
```

### Dashboard Template

The `__RESULTS_DATA__` placeholder in `src/dashboard/index.html` must not be removed or renamed. The `dashboard-generator.ts` replaces it at runtime with `JSON.stringify(results)`.

---

## Adding a New Input to the Action

1. Add the input to `action.yml` with a `description` and `default`
2. Read it in `src/action/index.ts` with `core.getInput('input-name')`
3. Pass it to `LighthouseGuard` config or use it directly
4. Update the **Inputs** table in `README.md`

---

## Adding a New Reporter

1. Create `src/reporters/your-reporter.ts`
2. Accept `RunResult[]` and return `void` or `Promise<void>`
3. Add it to `Notifier` in `src/notifier.ts` or wire it directly in `src/action/index.ts`
4. Add the corresponding input to `action.yml`

---

## Adding a New Aggregation Strategy

1. Add the strategy name to the `Config.strategy` union type in `src/types.ts`
2. Add a private method in `src/aggregator.ts`
3. Add a case in the `calculate()` switch
4. Add the option to `action.yml` input description

---

## What NOT to Change

| File | Reason |
|------|--------|
| `src/dashboard/index.html` — `__RESULTS_DATA__` placeholder | Runtime injection point |
| `src/safe-chrome.ts` — `finally` kill logic | Core memory-leak prevention |
| `action.yml` — `runs.using: node20` | GitHub Actions requirement |

---

## Commit Message Format

```
feat: add html reporter output
fix: chrome not killed after timeout
docs: update contributing guide
refactor: extract threshold checker to separate module
chore: bump lighthouse to 12.3.0
```

---

## Reporting Bugs

Open a GitHub issue with:

1. A minimal reproduction (which URL, which config, how many runs)
2. The full error message or unexpected output
3. Your Node.js version (`node --version`) and OS

---

## Questions

Open a GitHub Discussion or file an issue tagged `question`.
