import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  SpeedlineComputed
} from "./chunk-327KT7TQ.js";
import {
  NavigationMetric
} from "./chunk-OMH7NEK4.js";
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

// node_modules/lighthouse/core/computed/metrics/lantern-speed-index.js
var LanternSpeedIndex = class extends metrics_exports.SpeedIndex {
  static {
    __name(this, "LanternSpeedIndex");
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
    const speedline = await SpeedlineComputed.request(data.trace, context);
    const fcpResult = await LanternFirstContentfulPaintComputed.request(data, context);
    return this.computeMetricWithGraphs(data, context, {
      observedSpeedIndex: speedline.speedIndex,
      fcpResult
    });
  }
};
var LanternSpeedIndexComputed = makeComputedArtifact(
  LanternSpeedIndex,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

// node_modules/lighthouse/core/computed/metrics/speed-index.js
var SpeedIndex = class extends NavigationMetric {
  static {
    __name(this, "SpeedIndex");
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric(data, context) {
    const metricData = NavigationMetric.getMetricComputationInput(data);
    return LanternSpeedIndexComputed.request(metricData, context);
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data, context) {
    const speedline = await SpeedlineComputed.request(data.trace, context);
    const timing = Math.round(speedline.speedIndex);
    const timestamp = (timing + speedline.beginning) * 1e3;
    return Promise.resolve({ timing, timestamp });
  }
};
var SpeedIndexComputed = makeComputedArtifact(
  SpeedIndex,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  LanternSpeedIndexComputed,
  SpeedIndexComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/lantern-speed-index.js:
lighthouse/core/computed/metrics/speed-index.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
