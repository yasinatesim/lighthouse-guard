import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TimingSummaryComputed
} from "./chunk-3OE5E5VT.js";
import "./chunk-XLIALNIE.js";
import "./chunk-ACBZSPRA.js";
import "./chunk-D5INFJAI.js";
import "./chunk-NDKRZ5OE.js";
import "./chunk-IF4QRGAW.js";
import "./chunk-32YVOUED.js";
import "./chunk-D5OOLMSC.js";
import "./chunk-AEG256KD.js";
import "./chunk-SPBZCMTA.js";
import "./chunk-5PRILO24.js";
import "./chunk-E4NYJWSQ.js";
import "./chunk-22KTQBIM.js";
import "./chunk-5FAUCPF6.js";
import "./chunk-VUSO5I4V.js";
import "./chunk-ZFITDNXI.js";
import "./chunk-5AKLBR55.js";
import "./chunk-HDGMQKEX.js";
import "./chunk-LBG2XUR7.js";
import "./chunk-2DV6G4YM.js";
import "./chunk-EXNQHM7K.js";
import "./chunk-UNPQMFMQ.js";
import "./chunk-RI7XYKZY.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import "./chunk-AB7S44AE.js";
import "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import "./chunk-4MZOSFEN.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/metrics.js
var DECIMAL_METRIC_KEYS = /* @__PURE__ */ new Set([
  "cumulativeLayoutShift",
  "cumulativeLayoutShiftMainFrame",
  "observedCumulativeLayoutShift",
  "observedCumulativeLayoutShiftMainFrame"
]);
var Metrics = class extends Audit {
  static {
    __name(this, "Metrics");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "metrics",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: "Metrics",
      description: "Collects all available metrics.",
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
    const settings = context.settings;
    const gatherContext = artifacts.GatherContext;
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const { URL, SourceMaps } = artifacts;
    const summary = await TimingSummaryComputed.request({ trace, devtoolsLog, gatherContext, settings, URL, SourceMaps }, context);
    const metrics = summary.metrics;
    const debugInfo = summary.debugInfo;
    for (const [name, value] of Object.entries(metrics)) {
      const key = (
        /** @type {keyof LH.Artifacts.TimingSummary} */
        name
      );
      if (typeof value === "number" && !DECIMAL_METRIC_KEYS.has(key)) {
        metrics[key] = Math.round(value);
      }
    }
    const details = {
      type: "debugdata",
      // TODO: Consider not nesting metrics under `items`.
      items: [metrics, debugInfo]
    };
    return {
      score: 1,
      numericValue: metrics.interactive || 0,
      numericUnit: "millisecond",
      details
    };
  }
};
var metrics_default = Metrics;
export {
  metrics_default as default
};
/*! Bundled license information:

lighthouse/core/audits/metrics.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
