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
import {
  NetworkRequest
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
import "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/byte-efficiency/efficient-animated-content.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to use video formats rather than animated GIFs, which are wasteful. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Use video formats for animated content",
  /** Description of a Lighthouse audit that tells the user *why* they should use video instead of GIF format for delivering animated content. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more about efficient video formats](https://developer.chrome.com/docs/lighthouse/performance/efficient-animated-content/)"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var GIF_BYTE_THRESHOLD = 100 * 1024;
var EfficientAnimatedContent = class _EfficientAnimatedContent extends ByteEfficiencyAudit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "efficient-animated-content",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 3,
      requiredArtifacts: ["DevtoolsLog", "Trace", "GatherContext", "URL", "SourceMaps"]
    };
  }
  /**
   * Calculate rough savings percentage based on 1000 real gifs transcoded to video
   * @param {number} bytes
   * @return {number} rough savings percentage
   * @see https://github.com/GoogleChrome/lighthouse/issues/4696#issuecomment-380296510 bytes
   */
  static getPercentSavings(bytes) {
    return Math.round(29.1 * Math.log10(bytes) - 100.7) / 100;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @return {import('./byte-efficiency-audit.js').ByteEfficiencyProduct}
   */
  static audit_(artifacts, networkRecords) {
    const unoptimizedContent = networkRecords.filter(
      (record) => record.mimeType === "image/gif" && record.resourceType === NetworkRequest.TYPES.Image && (record.resourceSize || 0) > GIF_BYTE_THRESHOLD
    );
    const items = unoptimizedContent.map((record) => {
      const resourceSize = record.resourceSize || 0;
      return {
        url: record.url,
        totalBytes: resourceSize,
        wastedBytes: Math.round(resourceSize * _EfficientAnimatedContent.getPercentSavings(resourceSize))
      };
    });
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnResourceSize) },
      { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings.columnWastedBytes) }
    ];
    return {
      items,
      headings
    };
  }
};
var efficient_animated_content_default = EfficientAnimatedContent;
export {
  UIStrings2 as UIStrings,
  efficient_animated_content_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/efficient-animated-content.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
