import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRecordsComputed,
  NetworkRequest
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

// node_modules/lighthouse/core/audits/byte-efficiency/total-byte-weight.js
var UIStrings2 = {
  /** Title of a diagnostic audit that provides detail on large network resources required during page load. 'Payloads' is roughly equivalent to 'resources'. This descriptive title is shown to users when the amount is acceptable and no user action is required. */
  title: "Avoids enormous network payloads",
  /** Title of a diagnostic audit that provides detail on large network resources required during page load. 'Payloads' is roughly equivalent to 'resources'. This imperative title is shown to users when there is a significant amount of execution time that could be reduced. */
  failureTitle: "Avoid enormous network payloads",
  /** Description of a Lighthouse audit that tells the user *why* they should reduce the size of the network resources required by the page. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Large network payloads cost users real money and are highly correlated with long load times. [Learn how to reduce payload sizes](https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/).",
  /** Used to summarize the total byte size of the page and all its network requests. The `{totalBytes}` placeholder will be replaced with the total byte sizes, shown in kibibytes (e.g. 142 KiB) */
  displayValue: "Total size was {totalBytes, number, bytes}\xA0KiB"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var TotalByteWeight = class extends Audit {
  static {
    __name(this, "TotalByteWeight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "total-byte-weight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 1,
      requiredArtifacts: ["DevtoolsLog"]
    };
  }
  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // see https://www.desmos.com/calculator/h7kfv68jre
      // ~25th and ~10th percentiles, with resulting p10 computed.
      // http://httparchive.org/interesting.php?a=All&l=Feb%201%202017&s=All#bytesTotal
      p10: 2667 * 1024,
      median: 4e3 * 1024
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const records = await NetworkRecordsComputed.request(devtoolsLog, context);
    let totalBytes = 0;
    let results = [];
    records.forEach((record) => {
      if (NetworkRequest.isNonNetworkRequest(record) || !record.transferSize) return;
      const result = {
        url: record.url,
        totalBytes: record.transferSize
      };
      totalBytes += result.totalBytes;
      results.push(result);
    });
    results = results.sort((itemA, itemB) => {
      return itemB.totalBytes - itemA.totalBytes || itemA.url.localeCompare(itemB.url);
    }).slice(0, 10);
    const score = Audit.computeLogNormalScore(
      { p10: context.options.p10, median: context.options.median },
      totalBytes
    );
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnTransferSize) }
    ];
    const tableDetails = Audit.makeTableDetails(headings, results, { sortedBy: ["totalBytes"] });
    return {
      score,
      numericValue: totalBytes,
      numericUnit: "byte",
      displayValue: str_(UIStrings2.displayValue, { totalBytes }),
      details: tableDetails
    };
  }
};
var total_byte_weight_default = TotalByteWeight;
export {
  UIStrings2 as UIStrings,
  total_byte_weight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/total-byte-weight.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
