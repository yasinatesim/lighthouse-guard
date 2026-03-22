import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  JSBundlesComputed
} from "./chunk-QQ76V5R3.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";

// node_modules/lighthouse/core/computed/module-duplication.js
var RELATIVE_SIZE_THRESHOLD = 0.1;
var ABSOLUTE_SIZE_THRESHOLD_BYTES = 1024 * 0.5;
var ModuleDuplication = class _ModuleDuplication {
  /**
   * @param {string} source
   */
  static normalizeSource(source) {
    source = source.replace(/\?$/, "");
    const lastNodeModulesIndex = source.lastIndexOf("node_modules");
    if (lastNodeModulesIndex !== -1) {
      source = source.substring(lastNodeModulesIndex);
    }
    return source;
  }
  /**
   * @param {string} source
   */
  static _shouldIgnoreSource(source) {
    if (source.includes("webpack/bootstrap")) return true;
    if (source.includes("(webpack)/buildin")) return true;
    if (source.includes("external ")) return true;
    return false;
  }
  /**
   * @param {Map<string, Array<{scriptId: string, resourceSize: number}>>} moduleNameToSourceData
   */
  static _normalizeAggregatedData(moduleNameToSourceData) {
    for (const [key, originalSourceData] of moduleNameToSourceData.entries()) {
      let sourceData = originalSourceData;
      sourceData.sort((a, b) => b.resourceSize - a.resourceSize);
      if (sourceData.length > 1) {
        const largestResourceSize = sourceData[0].resourceSize;
        sourceData = sourceData.filter((data) => {
          const percentSize = data.resourceSize / largestResourceSize;
          return percentSize >= RELATIVE_SIZE_THRESHOLD;
        });
      }
      sourceData = sourceData.filter((data) => data.resourceSize >= ABSOLUTE_SIZE_THRESHOLD_BYTES);
      if (sourceData.length > 1) {
        moduleNameToSourceData.set(key, sourceData);
      } else {
        moduleNameToSourceData.delete(key);
      }
    }
  }
  /**
   * @param {Pick<LH.Artifacts, 'Scripts'|'SourceMaps'>} artifacts
   * @param {LH.Artifacts.ComputedContext} context
   */
  static async compute_(artifacts, context) {
    const bundles = await JSBundlesComputed.request(artifacts, context);
    const sourceDatasMap = /* @__PURE__ */ new Map();
    for (const { rawMap, sizes } of bundles) {
      if ("errorMessage" in sizes) continue;
      const sourceDataArray = [];
      sourceDatasMap.set(rawMap, sourceDataArray);
      for (let i = 0; i < rawMap.sources.length; i++) {
        if (this._shouldIgnoreSource(rawMap.sources[i])) continue;
        const sourceKey = (rawMap.sourceRoot || "") + rawMap.sources[i];
        const sourceSize = sizes.files[sourceKey];
        sourceDataArray.push({
          source: _ModuleDuplication.normalizeSource(rawMap.sources[i]),
          resourceSize: sourceSize
        });
      }
    }
    const moduleNameToSourceData = /* @__PURE__ */ new Map();
    for (const { rawMap, script } of bundles) {
      const sourceDataArray = sourceDatasMap.get(rawMap);
      if (!sourceDataArray) continue;
      for (const sourceData of sourceDataArray) {
        let data = moduleNameToSourceData.get(sourceData.source);
        if (!data) {
          data = [];
          moduleNameToSourceData.set(sourceData.source, data);
        }
        data.push({
          scriptId: script.scriptId,
          scriptUrl: script.url,
          resourceSize: sourceData.resourceSize
        });
      }
    }
    this._normalizeAggregatedData(moduleNameToSourceData);
    return moduleNameToSourceData;
  }
};
var ModuleDuplicationComputed = makeComputedArtifact(ModuleDuplication, ["Scripts", "SourceMaps"]);

export {
  ModuleDuplicationComputed
};
/*! Bundled license information:

lighthouse/core/computed/module-duplication.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
