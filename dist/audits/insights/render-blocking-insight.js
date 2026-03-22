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
  UIStrings15 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/render-blocking-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/RenderBlocking.js", UIStrings2);
var RenderBlockingInsight = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "render-blocking-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["render-blocking-resources"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "RenderBlocking", (insight) => {
      const headings = [
        { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
        { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnTransferSize) },
        { key: "wastedMs", valueType: "timespanMs", label: str_(UIStrings.columnDuration) }
      ];
      const items = insight.renderBlockingRequests.map((request) => ({
        url: request.args.data.url,
        totalBytes: request.args.data.encodedDataLength,
        wastedMs: insight.requestIdToWastedMs?.get(request.args.data.requestId)
      }));
      return Audit.makeTableDetails(headings, items);
    });
  }
};
var render_blocking_insight_default = RenderBlockingInsight;
export {
  render_blocking_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/render-blocking-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
