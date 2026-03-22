import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRecordsComputed,
  NetworkRequest
} from "../chunk-YOYAIZOW.js";
import {
  url_utils_default
} from "../chunk-OZ2G5ZKT.js";
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
  Audit,
  linearInterpolation
} from "../chunk-ZGW6XDCS.js";
import {
  __commonJS,
  __name,
  __toESM
} from "../chunk-XE6XARIN.js";

// node_modules/parse-cache-control/index.js
var require_parse_cache_control = __commonJS({
  "node_modules/parse-cache-control/index.js"(exports, module) {
    module.exports = /* @__PURE__ */ __name(function parseCacheControl2(field) {
      if (typeof field !== "string") {
        return null;
      }
      var regex = /(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g;
      var header = {};
      var err = field.replace(regex, function($0, $1, $2, $3) {
        var value = $2 || $3;
        header[$1] = value ? value.toLowerCase() : true;
        return "";
      });
      if (header["max-age"]) {
        try {
          var maxAge = parseInt(header["max-age"], 10);
          if (isNaN(maxAge)) {
            return null;
          }
          header["max-age"] = maxAge;
        } catch (err2) {
        }
      }
      return err ? null : header;
    }, "parseCacheControl");
  }
});

// node_modules/lighthouse/core/audits/byte-efficiency/uses-long-cache-ttl.js
var import_parse_cache_control = __toESM(require_parse_cache_control(), 1);
var UIStrings2 = {
  /** Title of a diagnostic audit that provides detail on the cache policy applies to the page's static assets. Cache refers to browser disk cache, which keeps old versions of network resources around for future use. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Uses efficient cache policy on static assets",
  /** Title of a diagnostic audit that provides details on the any page resources that could have been served with more efficient cache policies. Cache refers to browser disk cache, which keeps old versions of network resources around for future use. This imperative title is shown to users when there is a significant amount of assets served with poor cache policies. */
  failureTitle: "Serve static assets with an efficient cache policy",
  /** Description of a Lighthouse audit that tells the user *why* they need to adopt a long cache lifetime policy. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "A long cache lifetime can speed up repeat visits to your page. [Learn more about efficient cache policies](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/).",
  /** [ICU Syntax] Label for the audit identifying network resources with inefficient cache values. Clicking this will expand the audit to show the resources. */
  displayValue: `{itemCount, plural,
    =1 {1 resource found}
    other {# resources found}
    }`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_PERCENT = 0.925;
var CacheHeaders = class _CacheHeaders extends Audit {
  static {
    __name(this, "CacheHeaders");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-long-cache-ttl",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 3,
      requiredArtifacts: ["DevtoolsLog", "SourceMaps"]
    };
  }
  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // 50th and 25th percentiles HTTPArchive -> 50 and 75, with p10 derived from them.
      // https://bigquery.cloud.google.com/table/httparchive:lighthouse.2018_04_01_mobile?pli=1
      // see https://www.desmos.com/calculator/uzsyl2hbcb
      p10: 28 * 1024,
      median: 128 * 1024
    };
  }
  /**
   * Computes the percent likelihood that a return visit will be within the cache lifetime, based on
   * Chrome UMA stats see the note below.
   * @param {number} maxAgeInSeconds
   * @return {number}
   */
  static getCacheHitProbability(maxAgeInSeconds) {
    const RESOURCE_AGE_IN_HOURS_DECILES = [0, 0.2, 1, 3, 8, 12, 24, 48, 72, 168, 8760, Infinity];
    if (RESOURCE_AGE_IN_HOURS_DECILES.length !== 12) {
      throw new Error("deciles 0-10 and 1 for overflow");
    }
    const maxAgeInHours = maxAgeInSeconds / 3600;
    const upperDecileIndex = RESOURCE_AGE_IN_HOURS_DECILES.findIndex(
      (decile) => decile >= maxAgeInHours
    );
    if (upperDecileIndex === RESOURCE_AGE_IN_HOURS_DECILES.length - 1) return 1;
    if (upperDecileIndex === 0) return 0;
    const upperDecileValue = RESOURCE_AGE_IN_HOURS_DECILES[upperDecileIndex];
    const lowerDecileValue = RESOURCE_AGE_IN_HOURS_DECILES[upperDecileIndex - 1];
    const upperDecile = upperDecileIndex / 10;
    const lowerDecile = (upperDecileIndex - 1) / 10;
    return linearInterpolation(
      lowerDecileValue,
      lowerDecile,
      upperDecileValue,
      upperDecile,
      maxAgeInHours
    );
  }
  /**
   * Return max-age if defined, otherwise expires header if defined, and null if not.
   * @param {Map<string, string>} headers
   * @param {ReturnType<typeof parseCacheControl>} cacheControl
   * @return {?number}
   */
  static computeCacheLifetimeInSeconds(headers, cacheControl) {
    if (cacheControl && cacheControl["max-age"] !== void 0) {
      return cacheControl["max-age"];
    }
    const expiresHeaders = headers.get("expires");
    if (expiresHeaders) {
      const expires = new Date(expiresHeaders).getTime();
      if (!expires) return 0;
      return Math.ceil((expires - Date.now()) / 1e3);
    }
    return null;
  }
  /**
   * Given a network record, returns whether we believe the asset is cacheable, i.e. it was a network
   * request that satisifed the conditions:
   *
   *  1. Has a cacheable status code
   *  2. Has a resource type that corresponds to static assets (image, script, stylesheet, etc).
   *
   * Allowing assets with a query string is debatable, PSI considered them non-cacheable with a similar
   * caveat.
   *
   * TODO: Investigate impact in HTTPArchive, experiment with this policy to see what changes.
   *
   * @param {LH.Artifacts.NetworkRequest} record
   * @return {boolean}
   */
  static isCacheableAsset(record) {
    const CACHEABLE_STATUS_CODES = /* @__PURE__ */ new Set([200, 203, 206]);
    const STATIC_RESOURCE_TYPES = /* @__PURE__ */ new Set([
      NetworkRequest.TYPES.Font,
      NetworkRequest.TYPES.Image,
      NetworkRequest.TYPES.Media,
      NetworkRequest.TYPES.Script,
      NetworkRequest.TYPES.Stylesheet
    ]);
    if (NetworkRequest.isNonNetworkRequest(record)) return false;
    return CACHEABLE_STATUS_CODES.has(record.statusCode) && STATIC_RESOURCE_TYPES.has(record.resourceType || "Other");
  }
  /**
   * Returns true if headers suggest a record should not be cached for a long time.
   * @param {Map<string, string>} headers
   * @param {ReturnType<typeof parseCacheControl>} cacheControl
   * @return {boolean}
   */
  static shouldSkipRecord(headers, cacheControl) {
    if (!cacheControl && (headers.get("pragma") || "").includes("no-cache")) {
      return true;
    }
    if (cacheControl && (cacheControl["must-revalidate"] || cacheControl["no-cache"] || cacheControl["no-store"] || cacheControl["stale-while-revalidate"] || cacheControl["private"])) {
      return true;
    }
    return false;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLogs = artifacts.DevtoolsLog;
    const records = await NetworkRecordsComputed.request(devtoolsLogs, context);
    const results = [];
    let totalWastedBytes = 0;
    for (const record of records) {
      if (!_CacheHeaders.isCacheableAsset(record)) continue;
      const headers = /* @__PURE__ */ new Map();
      for (const header of record.responseHeaders || []) {
        if (headers.has(header.name.toLowerCase())) {
          const previousHeaderValue = headers.get(header.name.toLowerCase());
          headers.set(
            header.name.toLowerCase(),
            `${previousHeaderValue}, ${header.value}`
          );
        } else {
          headers.set(header.name.toLowerCase(), header.value);
        }
      }
      const cacheControl = (0, import_parse_cache_control.default)(headers.get("cache-control"));
      if (this.shouldSkipRecord(headers, cacheControl)) {
        continue;
      }
      let cacheLifetimeInSeconds = _CacheHeaders.computeCacheLifetimeInSeconds(
        headers,
        cacheControl
      );
      if (cacheLifetimeInSeconds !== null && (!Number.isFinite(cacheLifetimeInSeconds) || cacheLifetimeInSeconds <= 0)) {
        continue;
      }
      cacheLifetimeInSeconds = cacheLifetimeInSeconds || 0;
      const cacheHitProbability = _CacheHeaders.getCacheHitProbability(cacheLifetimeInSeconds);
      if (cacheHitProbability > IGNORE_THRESHOLD_IN_PERCENT) continue;
      const url = url_utils_default.elideDataURI(record.url);
      const totalBytes = record.transferSize || 0;
      const wastedBytes = (1 - cacheHitProbability) * totalBytes;
      totalWastedBytes += wastedBytes;
      let debugData;
      if (cacheControl) {
        debugData = {
          type: "debugdata",
          ...cacheControl
        };
      }
      results.push({
        url,
        debugData,
        cacheLifetimeMs: cacheLifetimeInSeconds * 1e3,
        cacheHitProbability,
        totalBytes,
        wastedBytes
      });
    }
    results.sort((a, b) => {
      return a.cacheLifetimeMs - b.cacheLifetimeMs || b.totalBytes - a.totalBytes || a.url.localeCompare(b.url);
    });
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      // TODO(i18n): pre-compute localized duration
      {
        key: "cacheLifetimeMs",
        valueType: "ms",
        label: str_(UIStrings.columnCacheTTL),
        displayUnit: "duration"
      },
      {
        key: "totalBytes",
        valueType: "bytes",
        label: str_(UIStrings.columnTransferSize),
        displayUnit: "kb",
        granularity: 1
      }
    ];
    const details = Audit.makeTableDetails(
      headings,
      results,
      { wastedBytes: totalWastedBytes, sortedBy: ["totalBytes"], skipSumming: ["cacheLifetimeMs"] }
    );
    return {
      score: results.length ? 0 : 1,
      numericValue: totalWastedBytes,
      numericUnit: "byte",
      displayValue: str_(UIStrings2.displayValue, { itemCount: results.length }),
      details
    };
  }
};
var uses_long_cache_ttl_default = CacheHeaders;
export {
  UIStrings2 as UIStrings,
  uses_long_cache_ttl_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/uses-long-cache-ttl.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
