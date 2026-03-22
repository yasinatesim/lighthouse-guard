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
  UIStrings as UIStrings2
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

// node_modules/lighthouse/core/audits/insights/cache-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/Cache.js", UIStrings2);
var CacheInsight = class extends Audit {
  static {
    __name(this, "CacheInsight");
  }
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
