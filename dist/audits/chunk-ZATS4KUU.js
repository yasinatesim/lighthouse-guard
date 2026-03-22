import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRecordsComputed,
  core_exports
} from "./chunk-JDNHHZFJ.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";
import {
  lighthouse_logger_default
} from "./chunk-B4FIMLMR.js";

// node_modules/lighthouse/core/computed/network-analysis.js
var NetworkAnalysis = class {
  /**
   * @param {LH.DevtoolsLog} devtoolsLog
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.NetworkAnalysis>}
   */
  static async compute_(devtoolsLog, context) {
    const records = await NetworkRecordsComputed.request(devtoolsLog, context);
    const analysis = core_exports.NetworkAnalyzer.analyze(records);
    if (!analysis) {
      lighthouse_logger_default.error("NetworkAnalysis", "Network analysis failed due to lack of transfer data");
      return {
        throughput: 0,
        rtt: Number.POSITIVE_INFINITY,
        additionalRttByOrigin: /* @__PURE__ */ new Map(),
        serverResponseTimeByOrigin: /* @__PURE__ */ new Map()
      };
    }
    return analysis;
  }
};
var NetworkAnalysisComputed = makeComputedArtifact(NetworkAnalysis, null);

export {
  NetworkAnalysisComputed
};
/*! Bundled license information:

lighthouse/core/computed/network-analysis.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
