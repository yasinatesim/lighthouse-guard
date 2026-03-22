import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  trace_elements_default
} from "../chunk-DNYRYK5L.js";
import "../chunk-36H7DF6Q.js";
import {
  adaptInsightToAuditProduct,
  makeNodeItemForNodeId
} from "../chunk-4F2V2OZV.js";
import "../chunk-IOK3BAH7.js";
import "../chunk-Z7S4UQSE.js";
import {
  CumulativeLayoutShiftComputed
} from "../chunk-22N3WN7S.js";
import "../chunk-GRLAFLTF.js";
import "../chunk-2FKQ374S.js";
import "../chunk-ZATS4KUU.js";
import "../chunk-FTKGXG7F.js";
import "../chunk-3WVTZQMF.js";
import "../chunk-3KEMYTTF.js";
import {
  UIStrings2
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

// node_modules/lighthouse/core/audits/insights/cls-culprits-insight.js
var MAX_LAYOUT_SHIFTS_PER_CLUSTER = 5;
var insightStr_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/CLSCulprits.js", UIStrings2);
var UIStrings3 = {
  /** Label for a column in a data table; entries in this column will be a number representing how large the layout shift was. */
  columnScore: "Layout shift score"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings3);
var CLSCulpritsInsight = class extends Audit {
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
