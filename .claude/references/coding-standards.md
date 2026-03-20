---
name: coding-standards
description: TypeScript coding standards for lighthouse-guard
type: reference
---

# Coding Standards

## TypeScript
- strict mode enabled (tsconfig.json)
- No `any` types — use proper typing or `unknown`
- All async functions must use async/await (no raw .then() chains)
- All errors must be caught and handled gracefully

## Error Handling
- Use try/catch/finally in all async operations
- Chrome instances MUST be killed in `finally` blocks to prevent memory leaks
- Use `gracefulFail: true` pattern — null return instead of throwing when retries exhausted

## Chrome Management
- Always use SafeChrome class, never call chrome-launcher directly
- Chrome must be killed in finally block even on success
- Check for zombie processes after kill

## Rate Limiting
- Always use RateLimiter between Lighthouse runs
- Apply jitter (random 0-30% extra) to avoid bot detection
- delayBetweenRuns >= 10000ms, delayBetweenPages >= 15000ms

## Aggregation
- Default strategy: median (eliminates outliers)
- Filter out zero scores before aggregating (failed runs)
- Support both 'median' and 'average' strategies

## Naming
- camelCase for variables, functions, class properties
- PascalCase for classes and interfaces
- SCREAMING_SNAKE_CASE for constants
