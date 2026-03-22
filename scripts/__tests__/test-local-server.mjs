#!/usr/bin/env node
/**
 * Test: examples/local-server.yml
 *
 * Starts a minimal HTTP server on localhost:3000, runs Lighthouse against it,
 * then shuts the server down. Simulates auditing a locally built app.
 *
 * Usage: node scripts/__tests__/test-local-server.mjs
 */
import { createServer } from 'http'
import { requireBundle, runAction } from './_helper.mjs'

requireBundle()

// Minimal HTML page — enough for Lighthouse to audit
const pages = {
  '/': `<!DOCTYPE html><html lang="en"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Local Test — Home</title>
    <meta name="description" content="Local test home page for Lighthouse Guard">
  </head><body><h1>Home</h1><p>Local test server</p></body></html>`,

  '/about': `<!DOCTYPE html><html lang="en"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Local Test — About</title>
    <meta name="description" content="Local test about page for Lighthouse Guard">
  </head><body><h1>About</h1><p>Local test server</p></body></html>`,

  '/contact': `<!DOCTYPE html><html lang="en"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Local Test — Contact</title>
    <meta name="description" content="Local test contact page for Lighthouse Guard">
  </head><body><h1>Contact</h1><p>Local test server</p></body></html>`,
}

const PORT = 3000

const server = createServer((req, res) => {
  const html = pages[req.url] ?? pages['/']
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(html)
})

await new Promise((resolve) => server.listen(PORT, resolve))
console.log(`\n🌐 Local server started on http://localhost:${PORT}`)

// Exact URLs from examples/local-server.yml
const urls = [
  { url: `http://localhost:${PORT}/`,       name: 'Home' },
  { url: `http://localhost:${PORT}/about`,  name: 'About' },
  { url: `http://localhost:${PORT}/contact`, name: 'Contact' },
]

console.log(`\n🧪 local-server.yml — ${urls.length} pages\n`)

// Exact parameters from examples/local-server.yml
// Thresholds set to 0 so the test never fails on scores
const code = runAction({
  urls: JSON.stringify(urls),
  runs: '1',                    // 1 run locally (example uses 2)
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

server.close()
console.log('🛑 Local server stopped')

process.exit(code)
