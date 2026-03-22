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
  UIStrings3 as UIStrings
} from "../chunk-YOYAIZOW.js";
import "../chunk-OZ2G5ZKT.js";
import "../chunk-EBBYNBKM.js";
import "../chunk-VW72MYVI.js";
import {
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

// node_modules/lighthouse/core/audits/insights/document-latency-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/DocumentLatency.js", UIStrings);
var DocumentLatencyInsight = class extends Audit {
  static {
    __name(this, "DocumentLatencyInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "document-latency-insight",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.title),
      description: str_(UIStrings.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["redirects", "server-response-time", "uses-text-compression"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "DocumentLatency", (insight) => {
      if (!insight.data) {
        return;
      }
      const details = Audit.makeChecklistDetails(insight.data.checklist);
      details.debugData = {
        type: "debugdata",
        redirectDuration: insight.data.redirectDuration,
        serverResponseTime: insight.data.serverResponseTime,
        uncompressedResponseBytes: insight.data.uncompressedResponseBytes
      };
      return details;
    });
  }
};
var document_latency_insight_default = DocumentLatencyInsight;
export {
  document_latency_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/document-latency-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
