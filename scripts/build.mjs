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

// Only records filenames (empty content) — for satisfying readdirSync calls on
// directories whose actual code is already bundled by esbuild.
function collectDirListing(dir, prefix, exts = ['.js']) {
  if (!existsSync(dir)) return {}
  const result = {}
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = `${prefix}/${entry.name}`
    if (entry.isDirectory()) {
      Object.assign(result, collectDirListing(join(dir, entry.name), rel, exts))
    } else if (exts.includes(extname(entry.name))) {
      result[rel] = '' // empty placeholder — only the key matters for dir listing
    }
  }
  return result
}

function collectAssets(dir, prefix, exts = ['.json', '.html', '.css']) {
  if (!existsSync(dir)) return {}
  const result = {}
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      Object.assign(result, collectAssets(join(dir, entry.name), rel, exts))
    } else if (exts.includes(extname(entry.name))) {
      result[rel] = readFileSync(join(dir, entry.name), 'utf8')
    }
  }
  return result
}

console.log('Collecting lighthouse static assets...')
const reportAssets = collectAssets(join(lhDir, 'report', 'assets'), 'report/assets')
const assets = {
  ...collectAssets(join(lhDir, 'shared', 'localization', 'locales'), 'locales'),
  ...collectAssets(join(lhDir, 'flow-report', 'assets'), 'flow-report/assets'),
  ...reportAssets,
  // Short 'assets/' keys for report/assets/* so bundle-relative paths like
  // 'dist/assets/styles.css' (from moduleDir='dist/action', '../assets/styles.css') match
  ...Object.fromEntries(Object.entries(reportAssets).map(([k, v]) => [k.replace('report/', ''), v])),
  // dist/report JS files: report-generator reads these via '../../dist/report/...'
  // which from dist/action/ resolves to <action-root>/dist/report/...
  ...collectAssets(join(lhDir, 'dist', 'report'), 'dist/report', ['.js']),
  ...collectAssets(join(lhDir, 'treemap'), 'treemap'),
  'package.json': readFileSync(join(lhDir, 'package.json'), 'utf8'),
  // Directory listings for paths lighthouse scans via readdirSync at runtime.
  // The actual code is already bundled; we only need the filenames for lookup.
  ...collectDirListing(join(lhDir, 'core', 'gather', 'gatherers'), 'gather/gatherers'),
  ...collectDirListing(join(lhDir, 'core', 'audits'), 'audits'),
  ...collectDirListing(join(lhDir, 'core', 'config'), 'config'),
}
console.log(`  → ${Object.keys(assets).length} assets collected`)

// Write a temporary shim module for 'fs' that esbuild will resolve
const shimPath = join(root, 'scripts', '_shim_fs.mjs')
writeFileSync(shimPath, `
import * as realFs from 'fs';
import { normalize } from 'path';
export * from 'fs';

const __assets__ = ${JSON.stringify(assets)};
const __assetKeys = Object.keys(__assets__);

// Build virtual directory index: dirKey -> [filename, ...]
const __assetDirs__ = {};
for (const k of __assetKeys) {
  const idx = k.lastIndexOf('/');
  if (idx > 0) {
    const dir = k.slice(0, idx);
    if (!__assetDirs__[dir]) __assetDirs__[dir] = [];
    __assetDirs__[dir].push(k.slice(idx + 1));
  }
}

function normPath(p) {
  try { return normalize(String(p)).replace(/\\\\/g, '/'); } catch { return String(p); }
}

function lookup(p) {
  if (typeof p !== 'string') return null;
  const np = normPath(p);
  for (const k of __assetKeys) {
    if (np.endsWith('/' + k) || np === k) return __assets__[k];
  }
  return null;
}

function lookupDir(p) {
  const np = normPath(p).replace(/\\/$/, '');
  for (const dir of Object.keys(__assetDirs__)) {
    if (np.endsWith('/' + dir) || np === dir) return __assetDirs__[dir];
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

function patchedReaddirSync(path, options) {
  const files = lookupDir(String(path));
  if (files !== null) return files;
  return realFs.readdirSync(path, options);
}

export { patchedReadFileSync as readFileSync, patchedReaddirSync as readdirSync };

// Patch the default export so \`import fs from 'fs'; fs.readFileSync()\` is also intercepted
const __patchedDefault = Object.assign(Object.create(null), realFs, {
  readFileSync: patchedReadFileSync,
  readdirSync: patchedReaddirSync,
});
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
  keepNames: true,
  outfile: join(root, 'dist', 'action', 'index.mjs'),
  plugins: [fsShimPlugin],
  banner: {
    js: [
      `import{createRequire as __cjsReq}from'module';`,
      `const __realReq=__cjsReq(import.meta.url);`,
      `const __lhA=${JSON.stringify(assets)};`,
      `const __lhAK=Object.keys(__lhA);`,
      // Build virtual directory index for readdirSync
      `const __lhD=(()=>{const d={};for(const k of __lhAK){const i=k.lastIndexOf('/');if(i>0){const dir=k.slice(0,i);if(!d[dir])d[dir]=[];d[dir].push(k.slice(i+1));}}return d;})();`,
      // Normalize path (handle .. and separators)
      `function __lhN(p){try{return __realReq('path').normalize(String(p)).replace(/\\\\/g,'/');}catch{return String(p);}}`,
      // Lookup asset by path suffix
      `function __lhL(p){if(typeof p!=='string')return null;const n=__lhN(p);for(const k of __lhAK){if(n.endsWith('/'+k)||n===k)return __lhA[k];}return null;}`,
      // Lookup virtual directory
      `function __lhLD(p){const n=__lhN(p).replace(/\\/$/,'');for(const[d,f]of Object.entries(__lhD)){if(n.endsWith('/'+d)||n===d)return f;}return null;}`,
      `const __pFs={...__realReq('fs'),readFileSync(p,o){const v=__lhL(String(p));if(v!==null){const e=typeof o==='string'?o:o?.encoding;return(!e||e==='utf8'||e==='utf-8')?v:Buffer.from(v,'utf8');}return __realReq('fs').readFileSync(p,o);},readdirSync(p,o){const f=__lhLD(String(p));if(f!==null)return f;return __realReq('fs').readdirSync(p,o);}};`,
      `function require(m){if(m==='fs')return __pFs;return __realReq(m);}`,
    ].join('\n'),
  },
  logLevel: 'warning',
})

// Cleanup temp shim
import { unlinkSync } from 'fs'
try { unlinkSync(shimPath) } catch {}

// Build individual gatherer bundles at dist/gather/gatherers/
// Lighthouse does dynamic import() with computed paths at runtime:
//   import.meta.url = dist/action/index.mjs → ../gather/gatherers/foo.js
//   resolves to dist/gather/gatherers/foo.js — these files must exist on disk.
console.log('Bundling gatherers...')
const gathererSrcDir = join(lhDir, 'core', 'gather', 'gatherers')
const gathererEntries = readdirSync(gathererSrcDir, { withFileTypes: true })
  .filter(e => !e.isDirectory() && extname(e.name) === '.js')
  .map(e => join(gathererSrcDir, e.name))
mkdirSync(join(root, 'dist', 'gather', 'gatherers'), { recursive: true })
await build({
  entryPoints: gathererEntries,
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  keepNames: true,
  outdir: join(root, 'dist', 'gather', 'gatherers'),
  logLevel: 'warning',
})
console.log(`  → ${gathererEntries.length} gatherers bundled`)

copyFileSync(join(root, 'src', 'dashboard', 'index.html'), join(root, 'dist', 'action', 'dashboard.html'))
console.log('Build complete → dist/action/index.mjs')
