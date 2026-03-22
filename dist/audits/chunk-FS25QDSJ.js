import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NavigationMetric
} from "./chunk-OMH7NEK4.js";
import {
  LanternLargestContentfulPaintComputed
} from "./chunk-KWLN6AZG.js";
import {
  LighthouseError
} from "./chunk-EBBYNBKM.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/metrics/largest-contentful-paint.js
var LargestContentfulPaint = class extends NavigationMetric {
  static {
    __name(this, "LargestContentfulPaint");
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric(data, context) {
    const metricData = NavigationMetric.getMetricComputationInput(data);
    return LanternLargestContentfulPaintComputed.request(metricData, context);
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data) {
    const { processedNavigation } = data;
    if (processedNavigation.timings.largestContentfulPaint === void 0) {
      throw new LighthouseError(LighthouseError.errors.NO_LCP);
    }
    return {
      timing: processedNavigation.timings.largestContentfulPaint,
      timestamp: processedNavigation.timestamps.largestContentfulPaint
    };
  }
};
var LargestContentfulPaintComputed = makeComputedArtifact(
  LargestContentfulPaint,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  LargestContentfulPaintComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/largest-contentful-paint.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
