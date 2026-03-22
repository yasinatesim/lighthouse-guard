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
  UIStrings as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/cache-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/Cache.js", UIStrings2);
var CacheInsight = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "cache-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "SourceMaps"],
      replacesAudits: ["uses-long-cache-ttl"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "Cache", (insight) => {
      const headings = [
        /* eslint-disable max-len */
        { key: "url", valueType: "url", label: str_(UIStrings2.requestColumn) },
        { key: "cacheLifetimeMs", valueType: "ms", label: str_(UIStrings2.cacheTTL), displayUnit: "duration" },
        { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnTransferSize), displayUnit: "kb", granularity: 1 }
        /* eslint-enable max-len */
      ];
      const values = insight.requests.sort((a, b) => b.wastedBytes - a.wastedBytes);
      const items = values.map((value) => ({
        url: value.request.args.data.url,
        cacheLifetimeMs: value.ttl * 1e3,
        totalBytes: value.request.args.data.encodedDataLength || 0,
        wastedBytes: value.wastedBytes
      }));
      return Audit.makeTableDetails(headings, items, {
        sortedBy: ["wastedBytes"],
        skipSumming: ["cacheLifetimeMs"]
      });
    });
  }
};
var cache_insight_default = CacheInsight;
export {
  cache_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/cache-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
