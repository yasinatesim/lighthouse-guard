import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
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
  UIStrings7 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/forced-reflow-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/ForcedReflow.js", UIStrings2);
var ForcedReflowInsight = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "forced-reflow-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"]
    };
  }
  /**
   * @param {import('@paulirish/trace_engine/models/trace/insights/ForcedReflow.js').ForcedReflowAggregatedData} topLevelFunctionCallData
   * @returns {LH.Audit.Details.Table}
   */
  static makeTopFunctionTable(topLevelFunctionCallData) {
    const { topLevelFunctionCall } = topLevelFunctionCallData;
    const headings = [
      // eslint-disable-next-line max-len
      { key: "source", valueType: "source-location", label: str_(UIStrings2.topTimeConsumingFunctionCall) },
      { key: "reflowTime", valueType: "ms", granularity: 1, label: str_(UIStrings2.totalReflowTime) }
    ];
    const items = [
      {
        source: Audit.makeSourceLocation(
          topLevelFunctionCall.url,
          topLevelFunctionCall.lineNumber,
          topLevelFunctionCall.columnNumber
        ),
        reflowTime: topLevelFunctionCallData.totalReflowTime / 1e3
      }
    ];
    return Audit.makeTableDetails(headings, items);
  }
  /**
   * @param {import('@paulirish/trace_engine/models/trace/insights/ForcedReflow.js').ForcedReflowInsightModel} insight
   * @returns {LH.Audit.Details.Table}
   */
  static makeBottomUpTable(insight) {
    const headings = [
      { key: "source", valueType: "source-location", label: str_(UIStrings.columnSource) },
      { key: "reflowTime", valueType: "ms", granularity: 1, label: str_(UIStrings2.totalReflowTime) }
    ];
    const items = insight.aggregatedBottomUpData.map((data) => {
      const { bottomUpData, totalTime } = data;
      const source = bottomUpData ? Audit.makeSourceLocation(
        bottomUpData.url,
        bottomUpData.lineNumber,
        bottomUpData.columnNumber
      ) : {
        type: (
          /** @type {const} */
          "text"
        ),
        value: str_(UIStrings2.unattributed)
      };
      return {
        source,
        reflowTime: totalTime / 1e3
      };
    });
    return Audit.makeTableDetails(headings, items);
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "ForcedReflow", (insight) => {
      const list = [this.makeBottomUpTable(insight)];
      if (insight.topLevelFunctionCallData) {
        list.unshift(this.makeTopFunctionTable(insight.topLevelFunctionCallData));
      }
      return Audit.makeListDetails(list);
    });
  }
};
var forced_reflow_insight_default = ForcedReflowInsight;
export {
  forced_reflow_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/forced-reflow-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
