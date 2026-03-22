import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  InteractiveComputed
} from "./chunk-AEG256KD.js";
import {
  LanternInteractiveComputed
} from "./chunk-SPBZCMTA.js";
import {
  metric_default
} from "./chunk-E4NYJWSQ.js";
import {
  LanternFirstContentfulPaintComputed,
  getComputationDataParams
} from "./chunk-VUSO5I4V.js";
import {
  TraceProcessor
} from "./chunk-NUK2ASLP.js";
import {
  metrics_exports
} from "./chunk-AB7S44AE.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/metrics/lantern-total-blocking-time.js
var LanternTotalBlockingTime = class extends metrics_exports.TotalBlockingTime {
  static {
    __name(this, "LanternTotalBlockingTime");
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @param {Omit<Lantern.Metrics.Extras, 'optimistic'>=} extras
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static async computeMetricWithGraphs(data, context, extras) {
    return this.compute(await getComputationDataParams(data, context), extras);
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static async compute_(data, context) {
    const fcpResult = await LanternFirstContentfulPaintComputed.request(data, context);
    const interactiveResult = await LanternInteractiveComputed.request(data, context);
    return this.computeMetricWithGraphs(data, context, { fcpResult, interactiveResult });
  }
};
var LanternTotalBlockingTimeComputed = makeComputedArtifact(
  LanternTotalBlockingTime,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

// node_modules/lighthouse/core/computed/metrics/total-blocking-time.js
var { calculateSumOfBlockingTime } = metrics_exports.TBTUtils;
var TotalBlockingTime = class extends metric_default {
  static {
    __name(this, "TotalBlockingTime");
  }
  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric(data, context) {
    const metricData = metric_default.getMetricComputationInput(data);
    return LanternTotalBlockingTimeComputed.request(metricData, context);
  }
  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data, context) {
    const events = TraceProcessor.getMainThreadTopLevelEvents(data.processedTrace);
    if (data.processedNavigation) {
      const { firstContentfulPaint } = data.processedNavigation.timings;
      const metricData = metric_default.getMetricComputationInput(data);
      const interactiveTimeMs = (await InteractiveComputed.request(metricData, context)).timing;
      return {
        timing: calculateSumOfBlockingTime(
          events,
          firstContentfulPaint,
          interactiveTimeMs
        )
      };
    } else {
      return {
        timing: calculateSumOfBlockingTime(
          events,
          0,
          data.processedTrace.timings.traceEnd
        )
      };
    }
  }
};
var TotalBlockingTimeComputed = makeComputedArtifact(
  TotalBlockingTime,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  TotalBlockingTimeComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/lantern-total-blocking-time.js:
lighthouse/core/computed/metrics/total-blocking-time.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
