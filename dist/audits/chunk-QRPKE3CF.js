import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LanternLargestContentfulPaintComputed
} from "./chunk-KWLN6AZG.js";
import {
  getComputationDataParams,
  lanternErrorAdapter
} from "./chunk-GPJRF3VM.js";
import {
  metrics_exports
} from "./chunk-YOYAIZOW.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/metrics/lantern-interactive.js
var LanternInteractive = class extends metrics_exports.Interactive {
  static {
    __name(this, "LanternInteractive");
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @param {Omit<Lantern.Metrics.Extras, 'optimistic'>=} extras
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static async computeMetricWithGraphs(data, context, extras) {
    const params = await getComputationDataParams(data, context);
    return Promise.resolve(this.compute(params, extras)).catch(lanternErrorAdapter);
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static async compute_(data, context) {
    const lcpResult = await LanternLargestContentfulPaintComputed.request(data, context);
    return this.computeMetricWithGraphs(data, context, { lcpResult });
  }
};
var LanternInteractiveComputed = makeComputedArtifact(
  LanternInteractive,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  LanternInteractiveComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/lantern-interactive.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
