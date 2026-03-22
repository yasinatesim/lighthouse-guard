import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TimingSummaryComputed
} from "./chunk-MLJKBDKW.js";
import "./chunk-SCQESDOH.js";
import {
  LanternSpeedIndexComputed
} from "./chunk-OK3KJQQ7.js";
import "./chunk-327KT7TQ.js";
import "./chunk-FBGCU7L2.js";
import "./chunk-FS25QDSJ.js";
import "./chunk-HZ5CS3EU.js";
import "./chunk-PJ4YREQU.js";
import "./chunk-FAQPRD3P.js";
import {
  LanternInteractiveComputed
} from "./chunk-QRPKE3CF.js";
import "./chunk-T34BK2XK.js";
import "./chunk-OMH7NEK4.js";
import "./chunk-4MRT5KFH.js";
import {
  LanternLargestContentfulPaintComputed
} from "./chunk-KWLN6AZG.js";
import {
  LanternFirstContentfulPaintComputed
} from "./chunk-GPJRF3VM.js";
import "./chunk-GOQIOX72.js";
import "./chunk-GPGXHKXU.js";
import "./chunk-TYEYL6JI.js";
import "./chunk-CVEB2JTF.js";
import {
  defaultSettings
} from "./chunk-E5UDU7XN.js";
import "./chunk-2RUE6MFF.js";
import "./chunk-4WOLRYCI.js";
import "./chunk-XFJEV2GR.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import "./chunk-YOYAIZOW.js";
import "./chunk-OZ2G5ZKT.js";
import "./chunk-EBBYNBKM.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-O3YNDXOX.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-DQQIQ7YS.js";
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
