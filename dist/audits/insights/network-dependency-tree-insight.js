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
  TOO_MANY_PRECONNECTS_THRESHOLD,
  UIStrings14 as UIStrings
} from "../chunk-AB7S44AE.js";
import "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
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

// node_modules/lighthouse/core/audits/insights/network-dependency-tree-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/NetworkDependencyTree.js", UIStrings);
var NetworkDependencyTreeInsight = class extends Audit {
  static {
    __name(this, "NetworkDependencyTreeInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "network-dependency-tree-insight",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.title),
      description: str_(UIStrings.description),
      guidanceLevel: 1,
      requiredArtifacts: ["Trace", "SourceMaps", "TraceElements"],
      replacesAudits: ["critical-request-chains", "uses-rel-preconnect"]
    };
  }
  /**
   * @param {import('@paulirish/trace_engine').Insights.Models.NetworkDependencyTree.CriticalRequestNode[]} nodes
   * @return {LH.Audit.Details.NetworkNode}
   */
  static traceEngineNodesToDetailsNodes(nodes) {
    const simpleRequestNode = {};
    for (const node of nodes) {
      const { request } = node;
      simpleRequestNode[request.args.data.requestId] = {
        url: request.args.data.url,
        navStartToEndTime: Math.round(node.timeFromInitialRequest / 1e3),
        transferSize: request.args.data.encodedDataLength,
        isLongest: node.isLongest,
        children: this.traceEngineNodesToDetailsNodes(node.children)
      };
    }
    return simpleRequestNode;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "NetworkDependencyTree", (insight) => {
      const list = [];
      let sectionDetails;
      sectionDetails = /** @type {LH.Audit.Details.NetworkTree} */
      {
        type: "network-tree",
        chains: this.traceEngineNodesToDetailsNodes(insight.rootNodes),
        longestChain: {
          duration: Math.round(insight.maxTime / 1e3)
        }
      };
      list.push(Audit.makeListDetailSectionItem(sectionDetails));
      if (insight.preconnectedOrigins.length) {
        const headings = [
          /* eslint-disable max-len */
          { key: "origin", valueType: "text", subItemsHeading: { key: "warning" }, label: str_(UIStrings.columnOrigin) },
          { key: "source", valueType: "node", label: str_(UIStrings.columnSource) }
          /* eslint-enable max-len */
        ];
        const items = insight.preconnectedOrigins.map((c) => {
          const warnings2 = [];
          if (c.unused) {
            warnings2.push(str_(UIStrings.unusedWarning));
          }
          if (c.crossorigin) {
            warnings2.push(str_(UIStrings.crossoriginWarning));
          }
          const subItems = {
            type: "subitems",
            items: warnings2.map((warning) => ({ warning }))
          };
          return {
            origin: c.url,
            source: c.source === "DOM" ? makeNodeItemForNodeId(artifacts.TraceElements, c.node_id) : { type: "text", value: c.headerText },
            subItems
          };
        });
        sectionDetails = Audit.makeTableDetails(headings, items);
      } else {
        sectionDetails = /** @type {LH.Audit.Details.TextValue} */
        { type: "text", value: str_(UIStrings.noPreconnectOrigins) };
      }
      list.push(Audit.makeListDetailSectionItem(
        sectionDetails,
        str_(UIStrings.preconnectOriginsTableTitle),
        str_(UIStrings.preconnectOriginsTableDescription)
      ));
      if (insight.preconnectCandidates.length) {
        const headings = [
          { key: "origin", valueType: "text", label: str_(UIStrings.columnOrigin) },
          { key: "wastedMs", valueType: "ms", label: str_(UIStrings.columnWastedMs) }
        ];
        const items = insight.preconnectCandidates.map((c) => {
          return { origin: c.origin, wastedMs: c.wastedMs };
        });
        sectionDetails = Audit.makeTableDetails(headings, items);
      } else {
        sectionDetails = /** @type {LH.Audit.Details.TextValue} */
        { type: "text", value: str_(UIStrings.noPreconnectCandidates) };
      }
      list.push(Audit.makeListDetailSectionItem(
        sectionDetails,
        str_(UIStrings.estSavingTableTitle),
        str_(UIStrings.estSavingTableDescription)
      ));
      const warnings = [];
      if (insight.preconnectedOrigins.length > TOO_MANY_PRECONNECTS_THRESHOLD) {
        warnings.push(str_(UIStrings.tooManyPreconnectLinksWarning));
      }
      return { details: Audit.makeListDetails(list), warnings };
    });
  }
};
var network_dependency_tree_insight_default = NetworkDependencyTreeInsight;
export {
  network_dependency_tree_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/network-dependency-tree-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
