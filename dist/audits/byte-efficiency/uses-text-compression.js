import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ByteEfficiencyAudit
} from "../chunk-DGNLV5FC.js";
import "../chunk-TMQPGYS4.js";
import "../chunk-4PONSSZA.js";
import "../chunk-YN3ARENP.js";
import "../chunk-IOK3BAH7.js";
import "../chunk-ZIUDIWBD.js";
import "../chunk-Z7S4UQSE.js";
import "../chunk-22N3WN7S.js";
import "../chunk-GRLAFLTF.js";
import "../chunk-2FKQ374S.js";
import "../chunk-ZATS4KUU.js";
import "../chunk-FTKGXG7F.js";
import "../chunk-3WVTZQMF.js";
import "../chunk-3KEMYTTF.js";
import "../chunk-JDNHHZFJ.js";
import {
  url_utils_default
} from "../chunk-YNYBF6HU.js";
import "../chunk-2BIJ7VKV.js";
import "../chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

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
