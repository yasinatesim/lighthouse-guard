/**
 * Shared helper for all local bundle tests.
 * Mirrors exactly what GitHub Actions does when running the action.
 */
import { execSync, spawnSync } from 'child_process'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

export const __dirname = dirname(fileURLToPath(import.meta.url))
export const root = join(__dirname, '..', '..')
export const bundle = join(root, 'dist', 'action', 'index.mjs')

export function requireBundle() {
  if (!existsSync(bundle)) {
    console.error('❌ Bundle not found. Run: npm run build')
    process.exit(1)
  }
}

export function findChrome() {
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

/**
 * Run the action bundle with given inputs, exactly as GitHub Actions would.
 * @param {object} inputs - Action input values (camelCase or kebab-case keys)
 * @returns {number} exit code
 */
export function runAction(inputs) {
  const chromePath = findChrome()
  if (!chromePath) console.warn('⚠️  Chrome not found — set CHROME_PATH env')
  else console.log(`🔍 Chrome: ${chromePath}`)

  // Convert input keys to INPUT_<UPPER-KEBAB> format that @actions/core expects
  const env = { ...process.env, CHROME_PATH: chromePath }
  for (const [key, val] of Object.entries(inputs)) {
    const envKey = 'INPUT_' + key.toUpperCase().replace(/_/g, '-')
    env[envKey] = String(val)
  }

  // GitHub Actions runtime stubs
  env.GITHUB_ACTIONS = 'true'
  env.GITHUB_STEP_SUMMARY = '/tmp/lhg-summary.md'
  env.GITHUB_OUTPUT = '/tmp/lhg-output.txt'
  env.RUNNER_TEMP = '/tmp'

  const result = spawnSync('node', [bundle], { env, stdio: 'inherit', cwd: root })
  return result.status ?? 0
}
