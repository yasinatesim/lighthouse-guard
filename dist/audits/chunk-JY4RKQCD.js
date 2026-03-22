import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NavigationMetric
} from "./chunk-DGRQI5GC.js";
import {
  LanternFirstContentfulPaintComputed
} from "./chunk-YN3ARENP.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";

// node_modules/lighthouse/core/computed/metrics/first-contentful-paint.js
var FirstContentfulPaint = class extends NavigationMetric {
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric(data, context) {
    const metricData = NavigationMetric.getMetricComputationInput(data);
    return LanternFirstContentfulPaintComputed.request(metricData, context);
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data) {
    const { processedNavigation } = data;
    return {
      timing: processedNavigation.timings.firstContentfulPaint,
      timestamp: processedNavigation.timestamps.firstContentfulPaint
    };
  }
};
var FirstContentfulPaintComputed = makeComputedArtifact(
  FirstContentfulPaint,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  FirstContentfulPaintComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/first-contentful-paint.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
