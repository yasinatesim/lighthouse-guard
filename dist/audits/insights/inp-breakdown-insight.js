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
  UIStrings9 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/inp-breakdown-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/INPBreakdown.js", UIStrings2);
var INPBreakdownInsight = class extends Audit {
  static {
    __name(this, "INPBreakdownInsight");
  }
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
