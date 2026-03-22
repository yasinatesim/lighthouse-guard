import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  require_SDK
} from "./chunk-3KEMYTTF.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";
import {
  lighthouse_logger_default
} from "./chunk-B4FIMLMR.js";
import {
  __toESM
} from "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/computed/js-bundles.js
var import_SDK = __toESM(require_SDK(), 1);
function computeGeneratedFileSizes(map, contentLength, content) {
  const lines = content.split("\n");
  const files = {};
  const totalBytes = contentLength;
  let unmappedBytes = totalBytes;
  map.computeLastGeneratedColumns();
  for (const mapping of map.mappings()) {
    const source = mapping.sourceURL;
    const lineNum = mapping.lineNumber;
    const colNum = mapping.columnNumber;
    const lastColNum = mapping.lastColumnNumber;
    if (!source) continue;
    const line = lines[lineNum];
    if (line === null || line === void 0) {
      const errorMessage = `${map.url()} mapping for line out of bounds: ${lineNum + 1}`;
      lighthouse_logger_default.error("JSBundles", errorMessage);
      return { errorMessage };
    }
    if (colNum > line.length) {
      const errorMessage = `${map.url()} mapping for column out of bounds: ${lineNum + 1}:${colNum}`;
      lighthouse_logger_default.error("JSBundles", errorMessage);
      return { errorMessage };
    }
    let mappingLength = 0;
    if (lastColNum !== void 0) {
      if (lastColNum > line.length) {
        const errorMessage = `${map.url()} mapping for last column out of bounds: ${lineNum + 1}:${lastColNum}`;
        lighthouse_logger_default.error("JSBundles", errorMessage);
        return { errorMessage };
      }
      mappingLength = lastColNum - colNum;
    } else {
      mappingLength = line.length - colNum + 1;
    }
    files[source] = (files[source] || 0) + mappingLength;
    unmappedBytes -= mappingLength;
  }
  return {
    files,
    unmappedBytes,
    totalBytes
  };
}
var JSBundles = class {
  /**
   * @param {Pick<LH.Artifacts, 'SourceMaps'|'Scripts'>} artifacts
   */
  static async compute_(artifacts) {
    const { SourceMaps, Scripts } = artifacts;
    const bundles = [];
    for (const SourceMap of SourceMaps) {
      if (!SourceMap.map) continue;
      const { scriptId, map: rawMap } = SourceMap;
      if (!rawMap.mappings) continue;
      const script = Scripts.find((s) => s.scriptId === scriptId);
      if (!script) continue;
      const compiledUrl = SourceMap.scriptUrl || "compiled.js";
      const mapUrl = SourceMap.sourceMapUrl || "compiled.js.map";
      const map = new import_SDK.default.SourceMap(compiledUrl, mapUrl, rawMap);
      const sizes = computeGeneratedFileSizes(map, script.length || 0, script.content || "");
      const bundle = {
        rawMap,
        script,
        map,
        sizes
      };
      bundles.push(bundle);
    }
    return bundles;
  }
};
var JSBundlesComputed = makeComputedArtifact(JSBundles, ["Scripts", "SourceMaps"]);

export {
  JSBundlesComputed
};
/*! Bundled license information:

lighthouse/core/computed/js-bundles.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
