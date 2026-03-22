import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ProcessedTraceComputed,
  lh_trace_processor_default
} from "./chunk-FTKGXG7F.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";

// node_modules/lighthouse/core/computed/processed-navigation.js
var ProcessedNavigation = class {
  /**
   * @param {LH.Trace | LH.Artifacts.ProcessedTrace} traceOrProcessedTrace
   * @return {traceOrProcessedTrace is LH.Artifacts.ProcessedTrace}
   */
  static isProcessedTrace(traceOrProcessedTrace) {
    return "timeOriginEvt" in traceOrProcessedTrace;
  }
  /**
   * @param {LH.Trace | LH.Artifacts.ProcessedTrace} traceOrProcessedTrace
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.ProcessedNavigation>}
   */
  static async compute_(traceOrProcessedTrace, context) {
    if (this.isProcessedTrace(traceOrProcessedTrace)) {
      return lh_trace_processor_default.processNavigation(traceOrProcessedTrace);
    }
    const processedTrace = await ProcessedTraceComputed.request(traceOrProcessedTrace, context);
    return lh_trace_processor_default.processNavigation(processedTrace);
  }
};
var ProcessedNavigationComputed = makeComputedArtifact(ProcessedNavigation, null);

export {
  ProcessedNavigationComputed
};
/*! Bundled license information:

lighthouse/core/computed/processed-navigation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
