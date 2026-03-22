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
  UIStrings5 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/duplicated-javascript-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/DuplicatedJavaScript.js", UIStrings2);
var DuplicatedJavaScriptInsight = class extends Audit {
  static {
    __name(this, "DuplicatedJavaScriptInsight");
  }
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
