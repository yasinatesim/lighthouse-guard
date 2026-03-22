import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct,
  makeNodeItemForNodeId
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
  UIStrings11 as UIStrings
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

// node_modules/lighthouse/core/audits/insights/lcp-discovery-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/LCPDiscovery.js", UIStrings);
var LCPDiscoveryInsight = class extends Audit {
  static {
    __name(this, "LCPDiscoveryInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "lcp-discovery-insight",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.title),
      description: str_(UIStrings.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["prioritize-lcp-image", "lcp-lazy-loaded"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "LCPDiscovery", (insight) => {
      if (!insight.checklist) {
        return;
      }
      return Audit.makeListDetails([
        Audit.makeChecklistDetails(insight.checklist),
        makeNodeItemForNodeId(artifacts.TraceElements, insight.lcpEvent?.args.data?.nodeId)
      ].filter((d) => !!d));
    });
  }
};
var lcp_discovery_insight_default = LCPDiscoveryInsight;
export {
  lcp_discovery_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/lcp-discovery-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
