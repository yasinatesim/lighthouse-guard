import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
} from "../chunk-BAGEWQME.js";
import "../chunk-TYEYL6JI.js";
import "../chunk-CVEB2JTF.js";
import "../chunk-E5UDU7XN.js";
import "../chunk-2RUE6MFF.js";
import "../chunk-4WOLRYCI.js";
import "../chunk-XFJEV2GR.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  UIStrings15 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/render-blocking-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/RenderBlocking.js", UIStrings2);
var RenderBlockingInsight = class extends Audit {
  static {
    __name(this, "RenderBlockingInsight");
  }
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
