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
  UIStrings4 as UIStrings
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

// node_modules/lighthouse/core/audits/insights/dom-size-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/DOMSize.js", UIStrings);
var DOMSizeInsight = class extends Audit {
  static {
    __name(this, "DOMSizeInsight");
  }
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
