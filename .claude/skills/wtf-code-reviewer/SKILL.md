---
name: wtf-code-reviewer
description: Dispatch the wtf-code-reviewer agent after any lighthouse-guard implementation. Checks Chrome safety, rate limiting, TypeScript types, and async correctness.
---

After completing any implementation in lighthouse-guard, dispatch the wtf-code-reviewer agent.

Agent({
  subagent_type: 'wtf-code-reviewer',
  description: 'Review lighthouse-guard implementation',
  prompt: `Review this implementation:
  Files modified: [list]
  Key concerns: Chrome lifecycle, gracefulFail pattern, RateLimiter usage
  Produce the full Verification Report.`
})

Loop until VERIFIED (max 3 iterations):
1. Run reviewer
2. NEEDS_FIXES or REJECTED → fix all Chrome/async/type issues → run again
3. Max 3 iterations — stop and tell the user if still failing
