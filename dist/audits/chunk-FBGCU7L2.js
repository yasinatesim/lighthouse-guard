import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LargestContentfulPaintComputed
} from "./chunk-FS25QDSJ.js";
import {
  MainResourceComputed
} from "./chunk-HZ5CS3EU.js";
import {
  NavigationMetric
} from "./chunk-OMH7NEK4.js";
import {
  LCPImageRecordComputed
} from "./chunk-4MRT5KFH.js";
import {
  ProcessedNavigationComputed
} from "./chunk-GOQIOX72.js";
import {
  NetworkAnalysisComputed
} from "./chunk-4WOLRYCI.js";
import {
  LighthouseError
} from "./chunk-EBBYNBKM.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/metrics/time-to-first-byte.js
var TimeToFirstByte = class extends NavigationMetric {
  static {
    __name(this, "TimeToFirstByte");
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeSimulatedMetric(data, context) {
    const mainResource = await MainResourceComputed.request(data, context);
    const networkAnalysis = await NetworkAnalysisComputed.request(data.devtoolsLog, context);
    const observedTTFB = (await this.computeObservedMetric(data, context)).timing;
    const observedResponseTime = networkAnalysis.serverResponseTimeByOrigin.get(mainResource.parsedURL.securityOrigin);
    if (observedResponseTime === void 0) throw new Error("No response time for origin");
    let roundTrips = 2;
    if (!mainResource.protocol.startsWith("h3")) roundTrips += 1;
    if (mainResource.parsedURL.scheme === "https") roundTrips += 1;
    const estimatedTTFB = data.settings.throttling.rttMs * roundTrips + observedResponseTime;
    const timing = Math.max(observedTTFB, estimatedTTFB);
    return { timing };
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data, context) {
    const mainResource = await MainResourceComputed.request(data, context);
    if (!mainResource.timing) {
      throw new Error("missing timing for main resource");
    }
    const { processedNavigation } = data;
    const timeOriginTs = processedNavigation.timestamps.timeOrigin;
    const timestampMs = mainResource.timing.requestTime * 1e3 + mainResource.timing.receiveHeadersStart;
    const timestamp = timestampMs * 1e3;
    const timing = (timestamp - timeOriginTs) / 1e3;
    return { timing, timestamp };
  }
};
var TimeToFirstByteComputed = makeComputedArtifact(
  TimeToFirstByte,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

// node_modules/lighthouse/core/computed/metrics/lcp-breakdown.js
var LCPBreakdown = class {
  static {
    __name(this, "LCPBreakdown");
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<{ttfb: number, loadStart?: number, loadEnd?: number}>}
   */
  static async compute_(data, context) {
    const processedNavigation = await ProcessedNavigationComputed.request(data.trace, context);
    const observedLcp = processedNavigation.timings.largestContentfulPaint;
    if (observedLcp === void 0) {
      throw new LighthouseError(LighthouseError.errors.NO_LCP);
    }
    const timeOrigin = processedNavigation.timestamps.timeOrigin / 1e3;
    const { timing: ttfb } = await TimeToFirstByteComputed.request(data, context);
    const lcpRecord = await LCPImageRecordComputed.request(data, context);
    if (!lcpRecord) {
      return { ttfb };
    }
    const { timing: metricLcp } = await LargestContentfulPaintComputed.request(data, context);
    const throttleRatio = metricLcp / observedLcp;
    const unclampedLoadStart = (lcpRecord.networkRequestTime - timeOrigin) * throttleRatio;
    const loadStart = Math.max(ttfb, Math.min(unclampedLoadStart, metricLcp));
    const unclampedLoadEnd = (lcpRecord.networkEndTime - timeOrigin) * throttleRatio;
    const loadEnd = Math.max(loadStart, Math.min(unclampedLoadEnd, metricLcp));
    return {
      ttfb,
      loadStart,
      loadEnd
    };
  }
};
var LCPBreakdownComputed = makeComputedArtifact(
  LCPBreakdown,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  TimeToFirstByteComputed,
  LCPBreakdownComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/time-to-first-byte.js:
lighthouse/core/computed/metrics/lcp-breakdown.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
