#!/usr/bin/env node
/**
 * Local test: simulates running dist/action/index.mjs exactly as GitHub Actions does.
 * Usage:  node scripts/test-local.mjs [url]
 * Default URL: https://yasinates.com/
 */
import { execSync, spawnSync } from 'child_process'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const bundle = join(root, 'dist', 'action', 'index.mjs')

if (!existsSync(bundle)) {
  console.error('Bundle not found. Run: npm run build')
  process.exit(1)
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ]
  for (const p of candidates) {
    if (p && existsSync(p)) return p
  }
  try {
    return execSync('which google-chrome 2>/dev/null || which chromium 2>/dev/null', { encoding: 'utf8' }).trim()
  } catch { return '' }
}

const chromePath = findChrome()
if (!chromePath) {
  console.warn('⚠️  Chrome not found — set CHROME_PATH env. Proceeding anyway...')
} else {
  console.log(`🔍 Chrome: ${chromePath}`)
}

const url = process.argv[2] || 'https://yasinates.com/'
console.log(`\n🧪 Testing bundle against: ${url}\n`)

const result = spawnSync('node', [bundle], {
  env: {
    ...process.env,
    CHROME_PATH: chromePath,
    // @actions/core reads INPUT_<NAME-UPPERCASE>
    'INPUT_URLS': JSON.stringify([{ url, name: 'Test' }]),
    'INPUT_RUNS': '1',
    'INPUT_STRATEGY': 'median',
    'INPUT_DEVICES': 'mobile',
    'INPUT_PERFORMANCE-THRESHOLD': '0',
    'INPUT_ACCESSIBILITY-THRESHOLD': '0',
    'INPUT_SEO-THRESHOLD': '0',
    'INPUT_BEST-PRACTICES-THRESHOLD': '0',
    'INPUT_DELAY-BETWEEN-RUNS': '0',
    'INPUT_DELAY-BETWEEN-PAGES': '0',
    'INPUT_MAX-RETRIES': '1',
    'INPUT_FAIL-ON-THRESHOLD': 'false',
    'INPUT_SLACK-WEBHOOK': '',
    'INPUT_GITHUB-TOKEN': '',
    'INPUT_UPLOAD-DASHBOARD': 'false',
    // GitHub Actions stubs
    GITHUB_ACTIONS: 'true',
    GITHUB_STEP_SUMMARY: '/tmp/lhg-summary.md',
    GITHUB_OUTPUT: '/tmp/lhg-output.txt',
    RUNNER_TEMP: '/tmp',
  },
  stdio: 'inherit',
  cwd: root,
})

process.exit(result.status ?? 0)
