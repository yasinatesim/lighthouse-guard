import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
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
  UIStrings7 as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/forced-reflow-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/ForcedReflow.js", UIStrings2);
var ForcedReflowInsight = class extends Audit {
  static {
    __name(this, "ForcedReflowInsight");
  }
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
