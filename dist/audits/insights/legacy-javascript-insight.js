import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
} from "../chunk-BAGEWQME.js";
import {
  JSBundlesComputed
} from "../chunk-QMRXOAX7.js";
import "../chunk-TYEYL6JI.js";
import "../chunk-CVEB2JTF.js";
import "../chunk-E5UDU7XN.js";
import "../chunk-2RUE6MFF.js";
import "../chunk-4WOLRYCI.js";
import "../chunk-XFJEV2GR.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  UIStrings12 as UIStrings2
} from "../chunk-YOYAIZOW.js";
import "../chunk-OZ2G5ZKT.js";
import "../chunk-EBBYNBKM.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-O3YNDXOX.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/insights/legacy-javascript-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/LegacyJavaScript.js", UIStrings2);
var LegacyJavaScriptInsight = class extends Audit {
  static {
    __name(this, "LegacyJavaScriptInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "legacy-javascript-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 2,
      requiredArtifacts: ["Trace", "Scripts", "SourceMaps"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const bundles = await JSBundlesComputed.request(artifacts, context);
    return adaptInsightToAuditProduct(artifacts, context, "LegacyJavaScript", (insight) => {
      const headings = [
        /* eslint-disable max-len */
        { key: "url", valueType: "url", subItemsHeading: { key: "location", valueType: "source-location" }, label: str_(UIStrings.columnURL) },
        { key: null, valueType: "code", subItemsHeading: { key: "signal" }, label: "" },
        { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings2.columnWastedBytes) }
        /* eslint-enable max-len */
      ];
      const items = [];
      for (const [script, result] of insight.legacyJavaScriptResults) {
        const bundle = bundles.find((bundle2) => bundle2.script.scriptId === script.scriptId);
        const item = {
          url: script.url ?? "",
          wastedBytes: result.estimatedByteSavings,
          subItems: {
            type: "subitems",
            items: []
          }
        };
        for (const match of result.matches) {
          const { name, line, column } = match;
          const subItem = {
            signal: name,
            location: Audit.makeSourceLocation(script.url ?? "", line, column, bundle)
          };
          item.subItems.items.push(subItem);
        }
        items.push(item);
      }
      return Audit.makeTableDetails(headings, items);
    });
  }
};
var legacy_javascript_insight_default = LegacyJavaScriptInsight;
export {
  legacy_javascript_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/legacy-javascript-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
