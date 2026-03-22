import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
} from "../chunk-NTJRD7SM.js";
import "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import "../chunk-2DV6G4YM.js";
import "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  UIStrings6 as UIStrings2
} from "../chunk-AB7S44AE.js";
import "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/insights/font-display-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/FontDisplay.js", UIStrings2);
var FontDisplayInsight = class extends Audit {
  static {
    __name(this, "FontDisplayInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "font-display-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["font-display"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "FontDisplay", (insight) => {
      const headings = [
        { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
        { key: "wastedMs", valueType: "ms", label: str_(UIStrings.columnWastedMs) }
      ];
      const items = insight.fonts.map((font) => ({
        url: font.request.args.data.url,
        wastedMs: font.wastedTime
      }));
      return Audit.makeTableDetails(headings, items);
    });
  }
};
var font_display_insight_default = FontDisplayInsight;
export {
  font_display_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/font-display-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
