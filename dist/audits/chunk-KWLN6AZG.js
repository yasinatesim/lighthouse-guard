import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LanternFirstContentfulPaintComputed,
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

// node_modules/lighthouse/core/computed/metrics/lantern-largest-contentful-paint.js
var LanternLargestContentfulPaint = class extends metrics_exports.LargestContentfulPaint {
  static {
    __name(this, "LanternLargestContentfulPaint");
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
    const fcpResult = await LanternFirstContentfulPaintComputed.request(data, context);
    return this.computeMetricWithGraphs(data, context, { fcpResult });
  }
};
var LanternLargestContentfulPaintComputed = makeComputedArtifact(
  LanternLargestContentfulPaint,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  LanternLargestContentfulPaintComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/lantern-largest-contentful-paint.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
