import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TimingSummaryComputed
} from "./chunk-3OE5E5VT.js";
import "./chunk-XLIALNIE.js";
import {
  LanternSpeedIndexComputed
} from "./chunk-ACBZSPRA.js";
import "./chunk-D5INFJAI.js";
import "./chunk-NDKRZ5OE.js";
import "./chunk-IF4QRGAW.js";
import "./chunk-32YVOUED.js";
import "./chunk-D5OOLMSC.js";
import "./chunk-AEG256KD.js";
import {
  LanternInteractiveComputed
} from "./chunk-SPBZCMTA.js";
import "./chunk-5PRILO24.js";
import "./chunk-E4NYJWSQ.js";
import "./chunk-22KTQBIM.js";
import {
  LanternLargestContentfulPaintComputed
} from "./chunk-5FAUCPF6.js";
import {
  LanternFirstContentfulPaintComputed
} from "./chunk-VUSO5I4V.js";
import "./chunk-ZFITDNXI.js";
import "./chunk-5AKLBR55.js";
import "./chunk-HDGMQKEX.js";
import "./chunk-LBG2XUR7.js";
import {
  defaultSettings
} from "./chunk-2DV6G4YM.js";
import "./chunk-EXNQHM7K.js";
import "./chunk-UNPQMFMQ.js";
import "./chunk-RI7XYKZY.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import "./chunk-AB7S44AE.js";
import "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-4MZOSFEN.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/predictive-perf.js
var SCORING_P10 = 3651;
var SCORING_MEDIAN = 1e4;
var str_ = createIcuMessageFn(import.meta.url, {});
var PredictivePerf = class extends Audit {
  static {
    __name(this, "PredictivePerf");
  }
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
