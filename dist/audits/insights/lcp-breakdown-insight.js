import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct,
  makeNodeItemForNodeId
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
  UIStrings10 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/lcp-breakdown-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/LCPBreakdown.js", UIStrings2);
var LCPBreakdownInsight = class _LCPBreakdownInsight extends Audit {
  static {
    __name(this, "LCPBreakdownInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "lcp-breakdown-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["largest-contentful-paint-element"]
    };
  }
  /**
   * @param {Required<import('@paulirish/trace_engine/models/trace/insights/LCPBreakdown.js').LCPBreakdownInsightModel>['subparts']} subparts
   * @return {LH.Audit.Details.Table}
   */
  static makeSubpartsTable(subparts) {
    const { ttfb, loadDelay, loadDuration, renderDelay } = subparts;
    const headings = [
      { key: "label", valueType: "text", label: str_(UIStrings2.subpart) },
      { key: "duration", valueType: "ms", label: str_(UIStrings.columnDuration) }
    ];
    let items = [
      /* eslint-disable max-len */
      { subpart: "timeToFirstByte", label: str_(UIStrings2.timeToFirstByte), duration: ttfb.range / 1e3 },
      { subpart: "resourceLoadDelay", label: str_(UIStrings2.resourceLoadDelay), duration: (loadDelay?.range ?? 0) / 1e3 },
      { subpart: "resourceLoadDuration", label: str_(UIStrings2.resourceLoadDuration), duration: (loadDuration?.range ?? 0) / 1e3 },
      { subpart: "elementRenderDelay", label: str_(UIStrings2.elementRenderDelay), duration: renderDelay.range / 1e3 }
      /* eslint-enable max-len */
    ];
    if (loadDelay === void 0) {
      items = items.filter((item) => item.subpart !== "resourceLoadDelay");
    }
    if (loadDuration === void 0) {
      items = items.filter((item) => item.subpart !== "resourceLoadDuration");
    }
    return Audit.makeTableDetails(headings, items);
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "LCPBreakdown", (insight) => {
      if (!insight.subparts) {
        return;
      }
      return Audit.makeListDetails([
        _LCPBreakdownInsight.makeSubpartsTable(insight.subparts),
        makeNodeItemForNodeId(artifacts.TraceElements, insight.lcpEvent?.args.data?.nodeId)
      ].filter((table) => table !== void 0));
    });
  }
};
var lcp_breakdown_insight_default = LCPBreakdownInsight;
export {
  lcp_breakdown_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/lcp-breakdown-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
