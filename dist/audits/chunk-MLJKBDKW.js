import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MaxPotentialFIDComputed
} from "./chunk-SCQESDOH.js";
import {
  SpeedIndexComputed
} from "./chunk-OK3KJQQ7.js";
import {
  SpeedlineComputed
} from "./chunk-327KT7TQ.js";
import {
  LCPBreakdownComputed,
  TimeToFirstByteComputed
} from "./chunk-FBGCU7L2.js";
import {
  LargestContentfulPaintComputed
} from "./chunk-FS25QDSJ.js";
import {
  TotalBlockingTimeComputed
} from "./chunk-PJ4YREQU.js";
import {
  InteractiveComputed
} from "./chunk-FAQPRD3P.js";
import {
  FirstContentfulPaintComputed
} from "./chunk-T34BK2XK.js";
import {
  NavigationMetric
} from "./chunk-OMH7NEK4.js";
import {
  ProcessedNavigationComputed
} from "./chunk-GOQIOX72.js";
import {
  CumulativeLayoutShiftComputed
} from "./chunk-CVEB2JTF.js";
import {
  ProcessedTraceComputed
} from "./chunk-XFJEV2GR.js";
import {
  LighthouseError
} from "./chunk-EBBYNBKM.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import {
  isUnderTest
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/metrics/first-contentful-paint-all-frames.js
var FirstContentfulPaintAllFrames = class extends NavigationMetric {
  static {
    __name(this, "FirstContentfulPaintAllFrames");
  }
  /**
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric() {
    throw new Error("FCP All Frames not implemented in lantern");
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data) {
    const { processedNavigation } = data;
    return {
      timing: processedNavigation.timings.firstContentfulPaintAllFrames,
      timestamp: processedNavigation.timestamps.firstContentfulPaintAllFrames
    };
  }
};
var FirstContentfulPaintAllFramesComputed = makeComputedArtifact(
  FirstContentfulPaintAllFrames,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

// node_modules/lighthouse/core/computed/metrics/largest-contentful-paint-all-frames.js
var LargestContentfulPaintAllFrames = class extends NavigationMetric {
  static {
    __name(this, "LargestContentfulPaintAllFrames");
  }
  /**
   * TODO: Simulate LCP all frames in lantern.
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static async computeSimulatedMetric() {
    throw new Error("LCP All Frames not implemented in lantern");
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static async computeObservedMetric(data) {
    const { processedNavigation } = data;
    if (processedNavigation.timings.largestContentfulPaintAllFrames === void 0) {
      throw new LighthouseError(LighthouseError.errors.NO_LCP_ALL_FRAMES);
    }
    return {
      timing: processedNavigation.timings.largestContentfulPaintAllFrames,
      timestamp: processedNavigation.timestamps.largestContentfulPaintAllFrames
    };
  }
};
var LargestContentfulPaintAllFramesComputed = makeComputedArtifact(
  LargestContentfulPaintAllFrames,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

// node_modules/lighthouse/core/computed/metrics/timing-summary.js
var TimingSummary = class _TimingSummary {
  static {
    __name(this, "TimingSummary");
  }
  /**
     * @param {LH.Trace} trace
     * @param {LH.DevtoolsLog} devtoolsLog
     * @param {LH.Artifacts['GatherContext']} gatherContext
     * @param {LH.Util.ImmutableObject<LH.Config.Settings>} settings
     * @param {LH.Artifacts['URL']} URL
     * @param {LH.Artifacts['SourceMaps']} SourceMaps
     * @param {LH.Artifacts.ComputedContext} context
     * @return {Promise<{metrics: LH.Artifacts.TimingSummary, debugInfo: Record<string,boolean>}>}
     */
  static async summarize(trace, devtoolsLog, gatherContext, settings, URL, SourceMaps, context) {
    const metricComputationData = { trace, devtoolsLog, gatherContext, settings, URL, SourceMaps, simulator: null };
    const requestOrUndefined = /* @__PURE__ */ __name((Artifact, artifact) => {
      return Artifact.request(artifact, context).catch((err) => {
        if (isUnderTest) {
          lighthouse_logger_default.error("lh:computed:TimingSummary", err);
        }
        return void 0;
      });
    }, "requestOrUndefined");
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const processedNavigation = await requestOrUndefined(ProcessedNavigationComputed, trace);
    const speedline = await SpeedlineComputed.request(trace, context);
    const firstContentfulPaint = await requestOrUndefined(FirstContentfulPaintComputed, metricComputationData);
    const firstContentfulPaintAllFrames = await requestOrUndefined(FirstContentfulPaintAllFramesComputed, metricComputationData);
    const largestContentfulPaint = await requestOrUndefined(LargestContentfulPaintComputed, metricComputationData);
    const largestContentfulPaintAllFrames = await requestOrUndefined(LargestContentfulPaintAllFramesComputed, metricComputationData);
    const interactive = await requestOrUndefined(InteractiveComputed, metricComputationData);
    const cumulativeLayoutShiftValues = await requestOrUndefined(CumulativeLayoutShiftComputed, trace);
    const maxPotentialFID = await requestOrUndefined(MaxPotentialFIDComputed, metricComputationData);
    const speedIndex = await requestOrUndefined(SpeedIndexComputed, metricComputationData);
    const totalBlockingTime = await requestOrUndefined(TotalBlockingTimeComputed, metricComputationData);
    const lcpBreakdown = await requestOrUndefined(LCPBreakdownComputed, metricComputationData);
    const ttfb = await requestOrUndefined(TimeToFirstByteComputed, metricComputationData);
    const {
      cumulativeLayoutShift,
      cumulativeLayoutShiftMainFrame
    } = cumulativeLayoutShiftValues || {};
    const metrics = {
      // Include the simulated/observed performance metrics
      firstContentfulPaint: firstContentfulPaint?.timing,
      firstContentfulPaintTs: firstContentfulPaint?.timestamp,
      firstContentfulPaintAllFrames: firstContentfulPaintAllFrames?.timing,
      firstContentfulPaintAllFramesTs: firstContentfulPaintAllFrames?.timestamp,
      largestContentfulPaint: largestContentfulPaint?.timing,
      largestContentfulPaintTs: largestContentfulPaint?.timestamp,
      largestContentfulPaintAllFrames: largestContentfulPaintAllFrames?.timing,
      largestContentfulPaintAllFramesTs: largestContentfulPaintAllFrames?.timestamp,
      interactive: interactive?.timing,
      interactiveTs: interactive?.timestamp,
      speedIndex: speedIndex?.timing,
      speedIndexTs: speedIndex?.timestamp,
      totalBlockingTime: totalBlockingTime?.timing,
      maxPotentialFID: maxPotentialFID?.timing,
      cumulativeLayoutShift,
      cumulativeLayoutShiftMainFrame,
      lcpLoadStart: lcpBreakdown?.loadStart,
      lcpLoadEnd: lcpBreakdown?.loadEnd,
      timeToFirstByte: ttfb?.timing,
      timeToFirstByteTs: ttfb?.timestamp,
      // Include all timestamps of interest from the processed trace
      observedTimeOrigin: processedTrace.timings.timeOrigin,
      observedTimeOriginTs: processedTrace.timestamps.timeOrigin,
      // For now, navigationStart is always timeOrigin.
      observedNavigationStart: processedNavigation?.timings.timeOrigin,
      observedNavigationStartTs: processedNavigation?.timestamps.timeOrigin,
      observedFirstPaint: processedNavigation?.timings.firstPaint,
      observedFirstPaintTs: processedNavigation?.timestamps.firstPaint,
      observedFirstContentfulPaint: processedNavigation?.timings.firstContentfulPaint,
      observedFirstContentfulPaintTs: processedNavigation?.timestamps.firstContentfulPaint,
      observedFirstContentfulPaintAllFrames: processedNavigation?.timings.firstContentfulPaintAllFrames,
      observedFirstContentfulPaintAllFramesTs: processedNavigation?.timestamps.firstContentfulPaintAllFrames,
      observedLargestContentfulPaint: processedNavigation?.timings.largestContentfulPaint,
      observedLargestContentfulPaintTs: processedNavigation?.timestamps.largestContentfulPaint,
      observedLargestContentfulPaintAllFrames: processedNavigation?.timings.largestContentfulPaintAllFrames,
      observedLargestContentfulPaintAllFramesTs: processedNavigation?.timestamps.largestContentfulPaintAllFrames,
      observedTraceEnd: processedTrace.timings.traceEnd,
      observedTraceEndTs: processedTrace.timestamps.traceEnd,
      observedLoad: processedNavigation?.timings.load,
      observedLoadTs: processedNavigation?.timestamps.load,
      observedDomContentLoaded: processedNavigation?.timings.domContentLoaded,
      observedDomContentLoadedTs: processedNavigation?.timestamps.domContentLoaded,
      observedCumulativeLayoutShift: cumulativeLayoutShift,
      observedCumulativeLayoutShiftMainFrame: cumulativeLayoutShiftMainFrame,
      // Include some visual metrics from speedline
      observedFirstVisualChange: speedline.first,
      observedFirstVisualChangeTs: (speedline.first + speedline.beginning) * 1e3,
      observedLastVisualChange: speedline.complete,
      observedLastVisualChangeTs: (speedline.complete + speedline.beginning) * 1e3,
      observedSpeedIndex: speedline.speedIndex,
      observedSpeedIndexTs: (speedline.speedIndex + speedline.beginning) * 1e3
    };
    const debugInfo = {
      lcpInvalidated: !!processedNavigation?.lcpInvalidated
    };
    return { metrics, debugInfo };
  }
  /**
   * @param {{trace: LH.Trace, devtoolsLog: LH.DevtoolsLog, gatherContext: LH.Artifacts['GatherContext']; settings: LH.Util.ImmutableObject<LH.Config.Settings>, URL: LH.Artifacts['URL'], SourceMaps: LH.Artifacts['SourceMaps']}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<{metrics: LH.Artifacts.TimingSummary, debugInfo: Record<string,boolean>}>}
   */
  static async compute_(data, context) {
    return _TimingSummary.summarize(
      data.trace,
      data.devtoolsLog,
      data.gatherContext,
      data.settings,
      data.URL,
      data.SourceMaps,
      context
    );
  }
};
var TimingSummaryComputed = makeComputedArtifact(
  TimingSummary,
  ["devtoolsLog", "gatherContext", "settings", "trace", "URL", "SourceMaps"]
);

export {
  TimingSummaryComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/first-contentful-paint-all-frames.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/computed/metrics/largest-contentful-paint-all-frames.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/computed/metrics/timing-summary.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
