import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  trace_elements_default
} from "../chunk-YEK4GLJS.js";
import "../chunk-4IPLRRAD.js";
import {
  adaptInsightToAuditProduct,
  makeNodeItemForNodeId
} from "../chunk-BAGEWQME.js";
import "../chunk-GOQIOX72.js";
import "../chunk-TYEYL6JI.js";
import {
  CumulativeLayoutShiftComputed
} from "../chunk-CVEB2JTF.js";
import "../chunk-E5UDU7XN.js";
import "../chunk-2RUE6MFF.js";
import "../chunk-4WOLRYCI.js";
import "../chunk-XFJEV2GR.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  UIStrings2
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

// node_modules/lighthouse/core/audits/insights/cls-culprits-insight.js
var MAX_LAYOUT_SHIFTS_PER_CLUSTER = 5;
var insightStr_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/CLSCulprits.js", UIStrings2);
var UIStrings3 = {
  /** Label for a column in a data table; entries in this column will be a number representing how large the layout shift was. */
  columnScore: "Layout shift score"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings3);
var CLSCulpritsInsight = class extends Audit {
  static {
    __name(this, "CLSCulpritsInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "cls-culprits-insight",
      title: insightStr_(UIStrings2.title),
      failureTitle: insightStr_(UIStrings2.title),
      description: insightStr_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["layout-shifts", "non-composited-animations", "unsized-images"]
    };
  }
  /**
   * @param {import('@paulirish/trace_engine/models/trace/insights/CLSCulprits.js').CLSCulpritsInsightModel} insight
   * @param {import('../../lib/trace-engine.js').SaneSyntheticLayoutShift} event
   * @param {LH.Artifacts.TraceElement[]} TraceElements
   * @return {LH.Audit.Details.TableSubItems|undefined}
   */
  static getCulpritSubItems(insight, event, TraceElements) {
    const culprits = insight.shifts.get(event);
    if (!culprits) {
      return;
    }
    const subItems = [];
    for (const unsizedImage of culprits.unsizedImages) {
      subItems.push({
        extra: makeNodeItemForNodeId(TraceElements, unsizedImage.backendNodeId),
        cause: insightStr_(UIStrings2.unsizedImage)
      });
    }
    for (const request of culprits.webFonts) {
      const url = request.args.data.url;
      subItems.push({
        extra: { type: "url", value: url },
        cause: insightStr_(UIStrings2.webFont)
      });
    }
    for (const iframe of culprits.iframes) {
      subItems.push({
        extra: iframe.url ? { type: "url", value: iframe.url } : void 0,
        cause: insightStr_(UIStrings2.injectedIframe)
      });
    }
    if (subItems.length) {
      return { type: "subitems", items: subItems };
    }
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "CLSCulprits", (insight) => {
      const headings = [
        /* eslint-disable max-len */
        { key: "node", valueType: "node", subItemsHeading: { key: "extra" }, label: insightStr_(UIStrings.columnElement) },
        { key: "score", valueType: "numeric", subItemsHeading: { key: "cause", valueType: "text" }, granularity: 1e-3, label: str_(UIStrings3.columnScore) }
        /* eslint-enable max-len */
      ];
      const tables = insight.clusters.map((cluster) => {
        const events = (
          /** @type {import('../../lib/trace-engine.js').SaneSyntheticLayoutShift[]} */
          cluster.events.filter((e) => !!e.args.data).sort((a, b) => b.args.data.weighted_score_delta - a.args.data.weighted_score_delta).slice(0, MAX_LAYOUT_SHIFTS_PER_CLUSTER)
        );
        const impactByNodeId = CumulativeLayoutShiftComputed.getImpactByNodeId(events.map((e) => ({
          impactedNodes: e.args.data.impacted_nodes,
          ts: e.ts,
          isMainFrame: e.args.data.is_main_frame,
          weightedScore: e.args.data.weighted_score_delta,
          event: (
            /** @type {any} */
            e
          )
        })));
        const items = events.map((event) => {
          const biggestImpactNodeId = trace_elements_default.getBiggestImpactNodeForShiftEvent(
            event.args.data.impacted_nodes || [],
            impactByNodeId
          );
          return {
            node: makeNodeItemForNodeId(artifacts.TraceElements, biggestImpactNodeId),
            score: event.args.data?.weighted_score_delta,
            subItems: this.getCulpritSubItems(insight, event, artifacts.TraceElements)
          };
        });
        items.unshift({
          node: { type: "text", value: insightStr_(UIStrings.total) },
          score: cluster.clusterCumulativeScore
        });
        return Audit.makeTableDetails(headings, items);
      });
      return Audit.makeListDetails(tables);
    });
  }
};
var cls_culprits_insight_default = CLSCulpritsInsight;
export {
  UIStrings3 as UIStrings,
  cls_culprits_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/cls-culprits-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
