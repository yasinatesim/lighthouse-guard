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
  UIStrings17 as UIStrings,
  summarizeByURL
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

// node_modules/lighthouse/core/audits/insights/third-parties-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/ThirdParties.js", UIStrings);
var ThirdPartiesInsight = class _ThirdPartiesInsight extends Audit {
  static {
    __name(this, "ThirdPartiesInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "third-parties-insight",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.title),
      description: str_(UIStrings.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: ["third-party-summary"]
    };
  }
  /**
   * @param {LH.Artifacts.Entity} entity
   * @param {import('@paulirish/trace_engine/models/trace/extras/ThirdParties.js').URLSummary[]} urlSummaries
   * @return {URLSummary[]}
   */
  static makeSubItems(entity, urlSummaries) {
    urlSummaries = urlSummaries.filter((s) => s.entity === entity);
    return urlSummaries.filter((s) => s.entity === entity).map((s) => ({
      url: s.url,
      mainThreadTime: s.mainThreadTime,
      transferSize: s.transferSize
    })).sort((a, b) => b.mainThreadTime - a.mainThreadTime || b.transferSize - a.transferSize);
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "ThirdParties", (insight, extras) => {
      const urlSummaries = summarizeByURL(extras.parsedTrace, extras.insights.bounds);
      const thirdPartySummaries = insight.entitySummaries.filter((summary) => summary.entity !== insight.firstPartyEntity || null).sort((a, b) => b.mainThreadTime - a.mainThreadTime);
      const headings = [
        /* eslint-disable max-len */
        { key: "entity", valueType: "text", label: str_(UIStrings.columnThirdParty), subItemsHeading: { key: "url", valueType: "url" } },
        { key: "transferSize", granularity: 1, valueType: "bytes", label: str_(UIStrings.columnTransferSize), subItemsHeading: { key: "transferSize" } },
        { key: "mainThreadTime", granularity: 1, valueType: "ms", label: str_(UIStrings.columnMainThreadTime), subItemsHeading: { key: "mainThreadTime" } }
        /* eslint-enable max-len */
      ];
      const items = thirdPartySummaries.map((summary) => {
        return {
          entity: summary.entity.name,
          mainThreadTime: summary.mainThreadTime,
          transferSize: summary.transferSize,
          subItems: {
            type: (
              /** @type {const} */
              "subitems"
            ),
            items: _ThirdPartiesInsight.makeSubItems(summary.entity, urlSummaries)
          }
        };
      });
      return Audit.makeTableDetails(headings, items, { isEntityGrouped: true });
    });
  }
};
var third_parties_insight_default = ThirdPartiesInsight;
export {
  third_parties_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/third-parties-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
