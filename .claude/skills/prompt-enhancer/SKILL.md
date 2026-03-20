---
name: prompt-enhancer
description: Generate a BRAID reasoning graph for complex lighthouse-guard tasks (new feature, debugging Chrome crashes, tuning rate limits, threshold decisions).
---

Generate a task graph following BRAID methodology for lighthouse-guard.

Use when: adding new device support, debugging Chrome crashes, changing aggregation strategy, tuning rate limits, adding new reporter.
Skip when: simple type fix, renaming variable, updating config default.

Key node types for this project:
- `Analyze: Check current SafeChrome kill pattern`
- `Decide: Should retryDelay use exponential or linear backoff?`
- `Implement: Add new device config to DEVICE_CONFIG`
- `Check: Chrome port released after kill (Pass->Next, Fail->Implement, max_retry=3)`

Output DOT graph, then hand off to braid-solver agent.
