#!/usr/bin/env node
/**
 * Test: examples/quickstart.yml
 *
 * Simulates the minimal setup — 1 URL, mobile+desktop, 1 run, thresholds disabled.
 * Verifies the bundle runs and produces measurements without errors.
 *
 * Usage: node scripts/__tests__/test-quickstart.mjs [url]
 */
import { requireBundle, runAction } from './_helper.mjs'

requireBundle()

const url = process.argv[2] || 'https://yasinates.com/'
console.log(`\n🧪 quickstart.yml — ${url}\n`)

// Exact parameters from examples/quickstart.yml
// Thresholds set to 0 so the test never fails on scores
const code = runAction({
  urls: JSON.stringify([{ url, name: 'Home' }]),
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
  'github-token': '',
  'upload-dashboard': 'false',
})

process.exit(code)
