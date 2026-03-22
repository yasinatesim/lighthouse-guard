import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct,
  makeNodeItemForNodeId
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
  UIStrings10 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/lcp-breakdown-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/LCPBreakdown.js", UIStrings2);
var LCPBreakdownInsight = class _LCPBreakdownInsight extends Audit {
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
