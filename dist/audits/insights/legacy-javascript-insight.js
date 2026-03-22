import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
} from "../chunk-4F2V2OZV.js";
import {
  JSBundlesComputed
} from "../chunk-QQ76V5R3.js";
import "../chunk-Z7S4UQSE.js";
import "../chunk-22N3WN7S.js";
import "../chunk-GRLAFLTF.js";
import "../chunk-2FKQ374S.js";
import "../chunk-ZATS4KUU.js";
import "../chunk-FTKGXG7F.js";
import "../chunk-3WVTZQMF.js";
import "../chunk-3KEMYTTF.js";
import {
  UIStrings12 as UIStrings2
} from "../chunk-JDNHHZFJ.js";
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

// node_modules/lighthouse/core/audits/insights/legacy-javascript-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/LegacyJavaScript.js", UIStrings2);
var LegacyJavaScriptInsight = class extends Audit {
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
