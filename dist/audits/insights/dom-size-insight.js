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
  UIStrings4 as UIStrings
} from "../chunk-JDNHHZFJ.js";
import "../chunk-YNYBF6HU.js";
import "../chunk-2BIJ7VKV.js";
import "../chunk-MLADMIB3.js";
import {
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import {
  Audit
} from "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/insights/dom-size-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/DOMSize.js", UIStrings);
var DOMSizeInsight = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "dom-size-insight",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.title),
      description: str_(UIStrings.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["dom-size"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "DOMSize", (insight) => {
      if (!insight.maxDOMStats?.args.data.maxChildren || !insight.maxDOMStats?.args.data.maxDepth) {
        return;
      }
      const { totalElements, maxChildren, maxDepth } = insight.maxDOMStats.args.data;
      const headings = [
        { key: "statistic", valueType: "text", label: str_(UIStrings.statistic) },
        { key: "node", valueType: "node", label: str_(UIStrings.element) },
        { key: "value", valueType: "numeric", label: str_(UIStrings.value) }
      ];
      const items = [
        {
          statistic: str_(UIStrings.totalElements),
          value: {
            type: "numeric",
            granularity: 1,
            value: totalElements
          }
        },
        {
          statistic: str_(UIStrings.maxChildren),
          node: makeNodeItemForNodeId(artifacts.TraceElements, maxChildren.nodeId),
          value: {
            type: "numeric",
            granularity: 1,
            value: maxChildren.numChildren
          }
        },
        {
          statistic: str_(UIStrings.maxDOMDepth),
          node: makeNodeItemForNodeId(artifacts.TraceElements, maxDepth.nodeId),
          value: {
            type: "numeric",
            granularity: 1,
            value: maxDepth.depth
          }
        }
      ];
      const details = Audit.makeTableDetails(headings, items);
      details.debugData = {
        type: "debugdata",
        totalElements,
        maxChildren: maxChildren.numChildren,
        maxDepth: maxDepth.depth
      };
      return details;
    });
  }
};
var dom_size_insight_default = DOMSizeInsight;
export {
  dom_size_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/dom-size-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
