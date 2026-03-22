#!/usr/bin/env node
/**
 * Run all example scenario tests sequentially.
 *
 * Usage:
 *   node scripts/__tests__/run-all.mjs           # all tests
 *   node scripts/__tests__/run-all.mjs quickstart # single test by name
 *
 * Tests:
 *   quickstart     → examples/quickstart.yml
 *   github-actions → examples/github-actions.yml
 *   full-workflow  → examples/full-workflow.yml
 *   local-server   → examples/local-server.yml
 */
import { spawnSync } from 'child_process'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const ALL_TESTS = [
  { name: 'quickstart',     file: 'test-quickstart.mjs' },
  { name: 'github-actions', file: 'test-github-actions.mjs' },
  { name: 'full-workflow',  file: 'test-full-workflow.mjs' },
  { name: 'local-server',   file: 'test-local-server.mjs' },
]

const filter = process.argv[2]
const tests = filter ? ALL_TESTS.filter(t => t.name.includes(filter)) : ALL_TESTS

if (!tests.length) {
  console.error(`No test matching "${filter}". Available: ${ALL_TESTS.map(t => t.name).join(', ')}`)
  process.exit(1)
}

console.log(`\n🔦 Lighthouse Guard — Running ${tests.length} example test(s)\n`)
console.log('═'.repeat(50))

const results = []

for (const test of tests) {
  console.log(`\n▶  ${test.name}`)
  console.log('─'.repeat(50))

  const start = Date.now()
  const result = spawnSync('node', [join(__dirname, test.file)], {
    stdio: 'inherit',
    timeout: 10 * 60 * 1000, // 10 min max per test
  })
  const elapsed = ((Date.now() - start) / 1000).toFixed(0)
  const passed = result.status === 0

  results.push({ name: test.name, passed, elapsed })
  console.log(`\n${passed ? '✅' : '❌'} ${test.name} — ${elapsed}s`)
}

console.log('\n' + '═'.repeat(50))
console.log('  RESULTS')
console.log('─'.repeat(50))
for (const r of results) {
  console.log(`  ${r.passed ? '✅' : '❌'}  ${r.name.padEnd(20)} ${r.elapsed}s`)
}
console.log('═'.repeat(50))

const allPassed = results.every(r => r.passed)
console.log(`\n${allPassed ? '✅ ALL PASSED' : '❌ SOME FAILED'}\n`)
process.exit(allPassed ? 0 : 1)
