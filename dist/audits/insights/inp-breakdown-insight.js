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
  UIStrings9 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/inp-breakdown-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/INPBreakdown.js", UIStrings2);
var INPBreakdownInsight = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "inp-breakdown-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["work-during-interaction"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "INPBreakdown", (insight) => {
      const event = insight.longestInteractionEvent;
      if (!event) {
        return;
      }
      const headings = [
        { key: "label", valueType: "text", label: str_(UIStrings2.subpart) },
        { key: "duration", valueType: "ms", label: str_(UIStrings.columnDuration) }
      ];
      const items = [
        /* eslint-disable max-len */
        { subpart: "inputDelay", label: str_(UIStrings2.inputDelay), duration: event.inputDelay / 1e3 },
        { subpart: "processingDuration", label: str_(UIStrings2.processingDuration), duration: event.mainThreadHandling / 1e3 },
        { subpart: "presentationDelay", label: str_(UIStrings2.presentationDelay), duration: event.presentationDelay / 1e3 }
        /* eslint-enable max-len */
      ];
      return Audit.makeListDetails([
        Audit.makeTableDetails(headings, items),
        makeNodeItemForNodeId(artifacts.TraceElements, event.args.data.beginEvent.args.data.nodeId)
      ].filter((table) => !!table));
    });
  }
};
var inp_breakdown_insight_default = INPBreakdownInsight;
export {
  inp_breakdown_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/inp-breakdown-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
