#!/usr/bin/env node
/**
 * Test: examples/github-actions.yml
 *
 * Simulates the standard setup — 4 URLs, mobile+desktop, Slack skipped.
 * Uses 1 run locally to keep it fast; CI uses 3.
 *
 * Usage: node scripts/__tests__/test-github-actions.mjs
 */
import { requireBundle, runAction } from './_helper.mjs'

requireBundle()

// Exact URLs from examples/github-actions.yml (replace your-site.com with real site)
const urls = [
  { url: 'https://yasinates.com/',        name: 'Home' },
  { url: 'https://yasinates.com/hakkimda', name: 'About' },
  { url: 'https://yasinates.com/blog',    name: 'Blog' },
  { url: 'https://yasinates.com/iletisim', name: 'Contact' },
]

console.log(`\n🧪 github-actions.yml — ${urls.length} pages\n`)

// Exact parameters from examples/github-actions.yml
// Thresholds set to 0 so the test never fails on scores
const code = runAction({
  urls: JSON.stringify(urls),
  runs: '1',                    // 1 run locally (example uses 3)
  strategy: 'median',
  devices: 'mobile,desktop',
  'performance-threshold': '0',
  'accessibility-threshold': '0',
  'seo-threshold': '0',
  'best-practices-threshold': '0',
  'fail-on-threshold': 'false',
  'delay-between-runs': '0',
  'delay-between-pages': '0',
  'max-retries': '1',
  'slack-webhook': '',          // skip Slack in local test
  'github-token': '',
  'upload-dashboard': 'false',
})

process.exit(code)
