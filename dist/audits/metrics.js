import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TimingSummaryComputed
} from "./chunk-TFYOQKOD.js";
import "./chunk-72ATWOH7.js";
import "./chunk-JNURGMM5.js";
import "./chunk-TXZEEGMI.js";
import "./chunk-7UA6YY22.js";
import "./chunk-GJZGFHWB.js";
import "./chunk-7IFF6OOL.js";
import "./chunk-F3LBQ6H5.js";
import "./chunk-CRKKLQWT.js";
import "./chunk-K7WBVFH2.js";
import "./chunk-JY4RKQCD.js";
import "./chunk-DGRQI5GC.js";
import "./chunk-TMQPGYS4.js";
import "./chunk-4PONSSZA.js";
import "./chunk-YN3ARENP.js";
import "./chunk-IOK3BAH7.js";
import "./chunk-ZIUDIWBD.js";
import "./chunk-Z7S4UQSE.js";
import "./chunk-22N3WN7S.js";
import "./chunk-GRLAFLTF.js";
import "./chunk-2FKQ374S.js";
import "./chunk-ZATS4KUU.js";
import "./chunk-FTKGXG7F.js";
import "./chunk-3WVTZQMF.js";
import "./chunk-3KEMYTTF.js";
import "./chunk-JDNHHZFJ.js";
import "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
import "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/metrics.js
var DECIMAL_METRIC_KEYS = /* @__PURE__ */ new Set([
  "cumulativeLayoutShift",
  "cumulativeLayoutShiftMainFrame",
  "observedCumulativeLayoutShift",
  "observedCumulativeLayoutShiftMainFrame"
]);
var Metrics = class extends Audit {
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
