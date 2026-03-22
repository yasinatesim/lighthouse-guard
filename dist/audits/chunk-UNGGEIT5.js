import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/unused-javascript-summary.js
var UnusedJavascriptSummary = class _UnusedJavascriptSummary {
  static {
    __name(this, "UnusedJavascriptSummary");
  }
  /**
   * @param {Omit<LH.Crdp.Profiler.ScriptCoverage, 'url'>} scriptCoverage
   * @return {WasteData}
   */
  static computeWaste(scriptCoverage) {
    let maximumEndOffset = 0;
    for (const func of scriptCoverage.functions) {
      maximumEndOffset = Math.max(maximumEndOffset, ...func.ranges.map((r) => r.endOffset));
    }
    const unusedByIndex = new Uint8Array(maximumEndOffset);
    for (const func of scriptCoverage.functions) {
      for (const range of func.ranges) {
        if (range.count === 0) {
          for (let i = range.startOffset; i < range.endOffset; i++) {
            unusedByIndex[i] = 1;
          }
        }
      }
    }
    let unused = 0;
    for (const x of unusedByIndex) {
      unused += x;
    }
    return {
      unusedByIndex,
      unusedLength: unused,
      contentLength: maximumEndOffset
    };
  }
  /**
   * @param {string} scriptId
   * @param {WasteData} wasteData
   * @return {Summary}
   */
  static createItem(scriptId, wasteData) {
    const wastedRatio = wasteData.unusedLength / wasteData.contentLength || 0;
    const wastedBytes = Math.round(wasteData.contentLength * wastedRatio);
    return {
      scriptId,
      totalBytes: wasteData.contentLength,
      wastedBytes,
      wastedPercent: 100 * wastedRatio
    };
  }
  /**
   * @param {WasteData} wasteData
   * @param {LH.Artifacts.Bundle} bundle
   */
  static createSourceWastedBytes(wasteData, bundle) {
    if (!bundle.script.content) return;
    const files = {};
    const lineLengths = bundle.script.content.split("\n").map((l) => l.length);
    let totalSoFar = 0;
    const lineOffsets = lineLengths.map((len) => {
      const retVal = totalSoFar;
      totalSoFar += len + 1;
      return retVal;
    });
    bundle.map.computeLastGeneratedColumns();
    for (const mapping of bundle.map.mappings()) {
      let offset = lineOffsets[mapping.lineNumber];
      offset += mapping.columnNumber;
      const lastColumnOfMapping = mapping.lastColumnNumber !== void 0 ? mapping.lastColumnNumber - 1 : lineLengths[mapping.lineNumber];
      for (let i = mapping.columnNumber; i <= lastColumnOfMapping; i++) {
        if (wasteData.unusedByIndex[offset] === 1) {
          const key = mapping.sourceURL || "(unmapped)";
          files[key] = (files[key] || 0) + 1;
        }
        offset += 1;
      }
    }
    const dataSorted = Object.entries(files).sort(([_, unusedBytes1], [__, unusedBytes2]) => unusedBytes2 - unusedBytes1);
    const bundleData = {};
    for (const [key, unusedBytes] of dataSorted) {
      bundleData[key] = unusedBytes;
    }
    return bundleData;
  }
  /**
   * @param {ComputeInput} data
   * @return {Promise<Summary>}
   */
  static async compute_(data) {
    const { scriptId, scriptCoverage, bundle } = data;
    const wasteData = _UnusedJavascriptSummary.computeWaste(scriptCoverage);
    const item = _UnusedJavascriptSummary.createItem(scriptId, wasteData);
    if (!bundle) return item;
    return {
      ...item,
      sourcesWastedBytes: _UnusedJavascriptSummary.createSourceWastedBytes(wasteData, bundle)
    };
  }
};
var UnusedJavascriptSummaryComputed = makeComputedArtifact(
  UnusedJavascriptSummary,
  ["bundle", "scriptCoverage", "scriptId"]
);

export {
  UnusedJavascriptSummaryComputed
};
/*! Bundled license information:

lighthouse/core/computed/unused-javascript-summary.js:
  (**
   * @license Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
