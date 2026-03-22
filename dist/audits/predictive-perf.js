import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TimingSummaryComputed
} from "./chunk-TFYOQKOD.js";
import "./chunk-72ATWOH7.js";
import {
  LanternSpeedIndexComputed
} from "./chunk-JNURGMM5.js";
import "./chunk-TXZEEGMI.js";
import "./chunk-7UA6YY22.js";
import "./chunk-GJZGFHWB.js";
import "./chunk-7IFF6OOL.js";
import "./chunk-F3LBQ6H5.js";
import "./chunk-CRKKLQWT.js";
import {
  LanternInteractiveComputed
} from "./chunk-K7WBVFH2.js";
import "./chunk-JY4RKQCD.js";
import "./chunk-DGRQI5GC.js";
import "./chunk-TMQPGYS4.js";
import {
  LanternLargestContentfulPaintComputed
} from "./chunk-4PONSSZA.js";
import {
  LanternFirstContentfulPaintComputed
} from "./chunk-YN3ARENP.js";
import "./chunk-IOK3BAH7.js";
import "./chunk-ZIUDIWBD.js";
import "./chunk-Z7S4UQSE.js";
import "./chunk-22N3WN7S.js";
import {
  defaultSettings
} from "./chunk-GRLAFLTF.js";
import "./chunk-2FKQ374S.js";
import "./chunk-ZATS4KUU.js";
import "./chunk-FTKGXG7F.js";
import "./chunk-3WVTZQMF.js";
import "./chunk-3KEMYTTF.js";
import "./chunk-JDNHHZFJ.js";
import "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/predictive-perf.js
var SCORING_P10 = 3651;
var SCORING_MEDIAN = 1e4;
var str_ = createIcuMessageFn(import.meta.url, {});
var PredictivePerf = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "predictive-perf",
      title: "Predicted Performance (beta)",
      description: "Predicted performance evaluates how your site will perform under a cellular connection on a mobile device.",
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      supportedModes: ["navigation"],
      requiredArtifacts: ["Trace", "DevtoolsLog", "GatherContext", "URL", "SourceMaps"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const gatherContext = artifacts.GatherContext;
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const { URL, SourceMaps } = artifacts;
    const settings = JSON.parse(JSON.stringify(defaultSettings));
    const computationData = { trace, devtoolsLog, gatherContext, settings, URL, SourceMaps, simulator: null };
    const fcp = await LanternFirstContentfulPaintComputed.request(computationData, context);
    const tti = await LanternInteractiveComputed.request(computationData, context);
    const si = await LanternSpeedIndexComputed.request(computationData, context);
    const lcp = await LanternLargestContentfulPaintComputed.request(computationData, context);
    const timingSummary = await TimingSummaryComputed.request(computationData, context);
    const values = {
      roughEstimateOfFCP: fcp.timing,
      optimisticFCP: fcp.optimisticEstimate.timeInMs,
      pessimisticFCP: fcp.pessimisticEstimate.timeInMs,
      roughEstimateOfTTI: tti.timing,
      optimisticTTI: tti.optimisticEstimate.timeInMs,
      pessimisticTTI: tti.pessimisticEstimate.timeInMs,
      roughEstimateOfSI: si.timing,
      optimisticSI: si.optimisticEstimate.timeInMs,
      pessimisticSI: si.pessimisticEstimate.timeInMs,
      roughEstimateOfLCP: lcp.timing,
      optimisticLCP: lcp.optimisticEstimate.timeInMs,
      pessimisticLCP: lcp.pessimisticEstimate.timeInMs,
      roughEstimateOfTTFB: timingSummary.metrics.timeToFirstByte,
      roughEstimateOfLCPLoadStart: timingSummary.metrics.lcpLoadStart,
      roughEstimateOfLCPLoadEnd: timingSummary.metrics.lcpLoadEnd
    };
    const score = Audit.computeLogNormalScore(
      { p10: SCORING_P10, median: SCORING_MEDIAN },
      values.roughEstimateOfTTI
    );
    return {
      score,
      numericValue: values.roughEstimateOfTTI,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.ms, { timeInMs: values.roughEstimateOfTTI }),
      details: {
        type: "debugdata",
        // TODO: Consider not nesting values under `items`.
        items: [values]
      }
    };
  }
};
var predictive_perf_default = PredictivePerf;
export {
  predictive_perf_default as default
};
/*! Bundled license information:

lighthouse/core/audits/predictive-perf.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
