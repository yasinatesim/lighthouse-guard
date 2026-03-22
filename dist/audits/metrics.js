import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TimingSummaryComputed
} from "./chunk-MLJKBDKW.js";
import "./chunk-SCQESDOH.js";
import "./chunk-OK3KJQQ7.js";
import "./chunk-327KT7TQ.js";
import "./chunk-FBGCU7L2.js";
import "./chunk-FS25QDSJ.js";
import "./chunk-HZ5CS3EU.js";
import "./chunk-PJ4YREQU.js";
import "./chunk-FAQPRD3P.js";
import "./chunk-QRPKE3CF.js";
import "./chunk-T34BK2XK.js";
import "./chunk-OMH7NEK4.js";
import "./chunk-4MRT5KFH.js";
import "./chunk-KWLN6AZG.js";
import "./chunk-GPJRF3VM.js";
import "./chunk-GOQIOX72.js";
import "./chunk-GPGXHKXU.js";
import "./chunk-TYEYL6JI.js";
import "./chunk-CVEB2JTF.js";
import "./chunk-E5UDU7XN.js";
import "./chunk-2RUE6MFF.js";
import "./chunk-4WOLRYCI.js";
import "./chunk-XFJEV2GR.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import "./chunk-YOYAIZOW.js";
import "./chunk-OZ2G5ZKT.js";
import "./chunk-EBBYNBKM.js";
import "./chunk-VW72MYVI.js";
import "./chunk-O3YNDXOX.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-DQQIQ7YS.js";
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
