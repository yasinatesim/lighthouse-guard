#!/usr/bin/env node
/**
 * Build script: bundles the action with esbuild (ESM).
 *
 * Lighthouse reads locale/template files via fs.readFileSync at startup.
 * To make the bundle self-contained we inject all these files as a __LH_ASSETS__
 * global and redirect readFileSync calls for those paths via a virtual 'fs' wrapper.
 */
import { build } from 'esbuild'
import { readFileSync, readdirSync, mkdirSync, copyFileSync, existsSync, writeFileSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const lhDir = join(root, 'node_modules', 'lighthouse')

function collectAssets(dir, prefix) {
  if (!existsSync(dir)) return {}
  const result = {}
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      Object.assign(result, collectAssets(join(dir, entry.name), rel))
    } else if (['.json', '.html', '.css'].includes(extname(entry.name))) {
      result[rel] = readFileSync(join(dir, entry.name), 'utf8')
    }
  }
  return result
}

console.log('Collecting lighthouse static assets...')
const assets = {
  ...collectAssets(join(lhDir, 'shared', 'localization', 'locales'), 'locales'),
  ...collectAssets(join(lhDir, 'flow-report', 'assets'), 'flow-report/assets'),
  ...collectAssets(join(lhDir, 'report', 'assets'), 'report/assets'),
  ...collectAssets(join(lhDir, 'treemap'), 'treemap'),
  'package.json': readFileSync(join(lhDir, 'package.json'), 'utf8'),
}
console.log(`  → ${Object.keys(assets).length} assets collected`)

// Write a temporary shim module for 'fs' that esbuild will resolve
const shimPath = join(root, 'scripts', '_shim_fs.mjs')
writeFileSync(shimPath, `
import * as realFs from 'fs';
export * from 'fs';

const __assets__ = ${JSON.stringify(assets)};
const __assetKeys = Object.keys(__assets__);

function lookup(p) {
  if (typeof p !== 'string') return null;
  for (const k of __assetKeys) {
    if (p.endsWith(k) || p.endsWith(k.replace(/\\//g, '\\\\'))) return __assets__[k];
  }
  return null;
}

function patchedReadFileSync(path, options) {
  const v = lookup(String(path));
  if (v !== null) {
    const enc = typeof options === 'string' ? options : options?.encoding;
    return (!enc || enc === 'utf8' || enc === 'utf-8') ? v : Buffer.from(v, 'utf8');
  }
  return realFs.readFileSync(path, options);
}

export { patchedReadFileSync as readFileSync };

// Patch the default export so \`import fs from 'fs'; fs.readFileSync()\` is also intercepted
const __patchedDefault = Object.assign(Object.create(null), realFs, { readFileSync: patchedReadFileSync });
export default __patchedDefault;
`.trim())

/** esbuild plugin: redirect any import of 'fs' to our shim (except from the shim itself) */
const fsShimPlugin = {
  name: 'fs-shim',
  setup(b) {
    b.onResolve({ filter: /^fs$/ }, (args) => {
      // Don't redirect when the shim itself imports 'fs' — let it reach the real module
      if (args.importer === shimPath) return { path: 'fs', external: true }
      return { path: shimPath }
    })
  },
}

mkdirSync(join(root, 'dist', 'action'), { recursive: true })

console.log('Bundling with esbuild...')
await build({
  entryPoints: [join(root, 'src', 'action', 'index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: join(root, 'dist', 'action', 'index.mjs'),
  plugins: [fsShimPlugin],
  banner: {
    js: [
      `import{createRequire as __cjsReq}from'module';`,
      `const __realReq=__cjsReq(import.meta.url);`,
      `const __lhA=${JSON.stringify(assets)};`,
      `function __lhL(p){if(typeof p!=='string')return null;const s=typeof __realReq('path').sep==='string'?__realReq('path').sep:'/';for(const[k,v]of Object.entries(__lhA)){if(p.endsWith(k)||p.endsWith(k.replace(/\\//g,s)))return v;}return null;}`,
      `const __pFs={...__realReq('fs'),readFileSync(p,o){const v=__lhL(String(p));if(v!==null){const e=typeof o==='string'?o:o?.encoding;return(!e||e==='utf8'||e==='utf-8')?v:Buffer.from(v,'utf8');}return __realReq('fs').readFileSync(p,o);}};`,
      `function require(m){if(m==='fs')return __pFs;return __realReq(m);}`,
    ].join('\n'),
  },
  logLevel: 'warning',
})

// Cleanup temp shim
import { unlinkSync } from 'fs'
try { unlinkSync(shimPath) } catch {}

copyFileSync(join(root, 'src', 'dashboard', 'index.html'), join(root, 'dist', 'action', 'dashboard.html'))
console.log('Build complete → dist/action/index.mjs')
