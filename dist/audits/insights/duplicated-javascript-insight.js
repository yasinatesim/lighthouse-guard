import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
} from "../chunk-4F2V2OZV.js";
import "../chunk-Z7S4UQSE.js";
import "../chunk-22N3WN7S.js";
import "../chunk-GRLAFLTF.js";
import "../chunk-2FKQ374S.js";
import "../chunk-ZATS4KUU.js";
import "../chunk-FTKGXG7F.js";
import "../chunk-3WVTZQMF.js";
import "../chunk-3KEMYTTF.js";
import {
  UIStrings5 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/duplicated-javascript-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/DuplicatedJavaScript.js", UIStrings2);
var DuplicatedJavaScriptInsight = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "duplicated-javascript-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 2,
      requiredArtifacts: ["Trace", "SourceMaps"],
      replacesAudits: ["duplicated-javascript"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "DuplicatedJavaScript", (insight) => {
      const headings = [
        /* eslint-disable max-len */
        { key: "source", valueType: "code", subItemsHeading: { key: "url", valueType: "url" }, label: str_(UIStrings.columnSource) },
        { key: "wastedBytes", valueType: "bytes", subItemsHeading: { key: "sourceTransferBytes" }, granularity: 10, label: str_(UIStrings2.columnDuplicatedBytes) }
        /* eslint-enable max-len */
      ];
      const entries = [...insight.duplicationGroupedByNodeModules.entries()].slice(0, 10);
      const items = entries.map(([source, data]) => {
        const item = {
          source,
          wastedBytes: data.estimatedDuplicateBytes,
          subItems: {
            type: "subitems",
            items: []
          }
        };
        for (const [index, { script, attributedSize }] of data.duplicates.entries()) {
          const subItem = {
            url: script.url ?? "",
            sourceTransferBytes: index === 0 ? { type: "text", value: "--" } : attributedSize
          };
          item.subItems.items.push(subItem);
        }
        return item;
      });
      return Audit.makeTableDetails(headings, items);
    });
  }
};
var duplicated_javascript_insight_default = DuplicatedJavaScriptInsight;
export {
  duplicated_javascript_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/duplicated-javascript-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
