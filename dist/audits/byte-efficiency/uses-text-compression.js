import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ByteEfficiencyAudit
} from "../chunk-5PQDCZ5I.js";
import "../chunk-4MRT5KFH.js";
import "../chunk-KWLN6AZG.js";
import "../chunk-GPJRF3VM.js";
import "../chunk-GOQIOX72.js";
import "../chunk-GPGXHKXU.js";
import "../chunk-TYEYL6JI.js";
import "../chunk-CVEB2JTF.js";
import "../chunk-E5UDU7XN.js";
import "../chunk-2RUE6MFF.js";
import "../chunk-4WOLRYCI.js";
import "../chunk-XFJEV2GR.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import "../chunk-YOYAIZOW.js";
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
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/byte-efficiency/uses-text-compression.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to enable text compression (like gzip) in order to enhance the performance of a page. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Enable text compression",
  /** Description of a Lighthouse audit that tells the user *why* their text-based resources should be served with compression (like gzip). This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more about text compression](https://developer.chrome.com/docs/lighthouse/performance/uses-text-compression/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_BYTES = 1400;
var IGNORE_THRESHOLD_IN_PERCENT = 0.1;
var ResponsesAreCompressed = class extends ByteEfficiencyAudit {
  static {
    __name(this, "ResponsesAreCompressed");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-text-compression",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 3,
      requiredArtifacts: [
        "ResponseCompression",
        "GatherContext",
        "DevtoolsLog",
        "Trace",
        "URL",
        "SourceMaps"
      ]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {import('./byte-efficiency-audit.js').ByteEfficiencyProduct}
   */
  static audit_(artifacts) {
    const uncompressedResponses = artifacts.ResponseCompression;
    const items = [];
    uncompressedResponses.forEach((record) => {
      if (!record.gzipSize || record.gzipSize < 0) return;
      const originalSize = record.resourceSize;
      const gzipSize = record.gzipSize;
      const gzipSavings = originalSize - gzipSize;
      if (record.transferSize < gzipSize) {
        return;
      }
      if (gzipSavings < IGNORE_THRESHOLD_IN_BYTES) {
        return;
      }
      if (gzipSavings < 2e4 && 1 - gzipSize / originalSize < IGNORE_THRESHOLD_IN_PERCENT) {
        return;
      }
      const url = url_utils_default.elideDataURI(record.url);
      const isDuplicate = items.find((item) => item.url === url && item.totalBytes === record.resourceSize);
      if (isDuplicate) {
        return;
      }
      items.push({
        url,
        totalBytes: originalSize,
        wastedBytes: gzipSavings
      });
    });
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnTransferSize) },
      { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings.columnWastedBytes) }
    ];
    return {
      items,
      headings
    };
  }
};
var uses_text_compression_default = ResponsesAreCompressed;
export {
  UIStrings2 as UIStrings,
  uses_text_compression_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/uses-text-compression.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
