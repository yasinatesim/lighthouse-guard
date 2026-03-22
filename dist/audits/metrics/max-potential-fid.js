import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MaxPotentialFIDComputed
} from "../chunk-72ATWOH7.js";
import "../chunk-DGRQI5GC.js";
import "../chunk-YN3ARENP.js";
import {
  ProcessedNavigationComputed
} from "../chunk-IOK3BAH7.js";
import "../chunk-ZIUDIWBD.js";
import "../chunk-Z7S4UQSE.js";
import "../chunk-22N3WN7S.js";
import "../chunk-GRLAFLTF.js";
import "../chunk-2FKQ374S.js";
import "../chunk-ZATS4KUU.js";
import {
  ProcessedTraceComputed
} from "../chunk-FTKGXG7F.js";
import "../chunk-3WVTZQMF.js";
import "../chunk-3KEMYTTF.js";
import "../chunk-JDNHHZFJ.js";
import "../chunk-YNYBF6HU.js";
import "../chunk-2BIJ7VKV.js";
import "../chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import {
  Audit
} from "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/metrics/max-potential-fid.js
var UIStrings2 = {
  /** Description of the Maximum Potential First Input Delay metric that marks the maximum estimated time between the page receiving input (a user clicking, tapping, or typing) and the page responding. This description is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more about the Maximum Potential First Input Delay metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-max-potential-fid/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var MaxPotentialFID = class _MaxPotentialFID extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "max-potential-fid",
      title: str_(UIStrings.maxPotentialFIDMetric),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      supportedModes: ["navigation"],
      requiredArtifacts: ["Trace", "DevtoolsLog", "GatherContext", "URL", "SourceMaps"]
    };
  }
  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // see https://www.desmos.com/calculator/onxmbblyqo
      p10: 130,
      median: 250
    };
  }
  /**
   * Extract potential LoAF replacements for MPFID from the trace to log in
   * debugdata details.
   * @param {LH.Artifacts.ProcessedTrace} processedTrace
   * @param {LH.Artifacts.ProcessedNavigation} processedNavigation
   * @return {LoafDebugDetails|undefined}
   */
  static getLongAnimationFrameDetails(processedTrace, processedNavigation) {
    const { firstContentfulPaint, timeOrigin } = processedNavigation.timestamps;
    const loafEvents = processedTrace.mainThreadEvents.filter((evt) => {
      return evt.name === "LongAnimationFrame" && evt.ph === "b";
    });
    if (loafEvents.length === 0) return;
    let currentMaxDuration = -Infinity;
    let currentMaxDurationLoaf;
    let currentMaxBlocking = -Infinity;
    let currentMaxBlockingLoaf;
    const observedLoafs = [];
    for (const loafEvent of loafEvents) {
      const loafDuration = loafEvent.args?.data?.duration;
      const loafBlocking = loafEvent.args?.data?.blockingDuration;
      if (loafDuration === void 0 || loafBlocking === void 0) continue;
      observedLoafs.push({
        startTime: (loafEvent.ts - timeOrigin) / 1e3,
        duration: loafDuration,
        blockingDuration: loafBlocking
      });
      if (loafEvent.ts < firstContentfulPaint) continue;
      if (loafDuration > currentMaxDuration) {
        currentMaxDuration = loafDuration;
        currentMaxDurationLoaf = loafEvent;
      }
      if (loafBlocking > currentMaxBlocking) {
        currentMaxBlocking = loafBlocking;
        currentMaxBlockingLoaf = loafEvent;
      }
    }
    return {
      type: "debugdata",
      observedMaxDurationLoaf: currentMaxDurationLoaf,
      observedMaxBlockingLoaf: currentMaxBlockingLoaf,
      observedLoafs
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const gatherContext = artifacts.GatherContext;
    const metricComputationData = {
      trace,
      devtoolsLog,
      gatherContext,
      settings: context.settings,
      URL: artifacts.URL,
      SourceMaps: artifacts.SourceMaps,
      simulator: null
    };
    const metricResult = await MaxPotentialFIDComputed.request(metricComputationData, context);
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const processedNavigation = await ProcessedNavigationComputed.request(trace, context);
    const details = _MaxPotentialFID.getLongAnimationFrameDetails(
      processedTrace,
      processedNavigation
    );
    return {
      score: Audit.computeLogNormalScore(
        { p10: context.options.p10, median: context.options.median },
        metricResult.timing
      ),
      numericValue: metricResult.timing,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.ms, { timeInMs: metricResult.timing }),
      details
    };
  }
};
var max_potential_fid_default = MaxPotentialFID;
export {
  UIStrings2 as UIStrings,
  max_potential_fid_default as default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/max-potential-fid.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
