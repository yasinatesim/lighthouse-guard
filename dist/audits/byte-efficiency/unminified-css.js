import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UnusedCSSComputed
} from "../chunk-ZLY62FGV.js";
import {
  computeCSSTokenLength
} from "../chunk-2XBHRD6G.js";
import {
  estimateTransferSize
} from "../chunk-7PCH2QJG.js";
import {
  ByteEfficiencyAudit
} from "../chunk-7TZ77HKH.js";
import "../chunk-22KTQBIM.js";
import "../chunk-5FAUCPF6.js";
import "../chunk-VUSO5I4V.js";
import "../chunk-ZFITDNXI.js";
import "../chunk-5AKLBR55.js";
import "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import "../chunk-2DV6G4YM.js";
import "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import "../chunk-AB7S44AE.js";
import "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/byte-efficiency/unminified-css.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to minify (remove whitespace) the page's CSS code. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Minify CSS",
  /** Description of a Lighthouse audit that tells the user *why* they should minify (remove whitespace) the page's CSS code. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_PERCENT = 5;
var IGNORE_THRESHOLD_IN_BYTES = 2048;
var UnminifiedCSS = class _UnminifiedCSS extends ByteEfficiencyAudit {
  static {
    __name(this, "UnminifiedCSS");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "unminified-css",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 3,
      requiredArtifacts: [
        "Stylesheets",
        "DevtoolsLog",
        "Trace",
        "URL",
        "GatherContext",
        "SourceMaps"
      ]
    };
  }
  /**
   * Computes the total length of the meaningful tokens (CSS excluding comments and whitespace).
   *
   * @param {string} content
   * @return {number}
   */
  static computeTokenLength(content) {
    return computeCSSTokenLength(content);
  }
  /**
   * @param {LH.Artifacts.CSSStyleSheetInfo} stylesheet
   * @param {LH.Artifacts.NetworkRequest|undefined} networkRecord
   * @return {{url: string, totalBytes: number, wastedBytes: number, wastedPercent: number}}
   */
  static computeWaste(stylesheet, networkRecord) {
    const content = stylesheet.content;
    const totalTokenLength = _UnminifiedCSS.computeTokenLength(content);
    let url = stylesheet.header.sourceURL;
    if (!url || stylesheet.header.isInline) {
      const contentPreview = UnusedCSSComputed.determineContentPreview(stylesheet.content);
      url = contentPreview;
    }
    const totalBytes = estimateTransferSize(networkRecord, content.length, "Stylesheet");
    const wastedRatio = 1 - totalTokenLength / content.length;
    const wastedBytes = Math.round(totalBytes * wastedRatio);
    return {
      url,
      totalBytes,
      wastedBytes,
      wastedPercent: 100 * wastedRatio
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @return {import('./byte-efficiency-audit.js').ByteEfficiencyProduct}
   */
  static audit_(artifacts, networkRecords) {
    const items = [];
    for (const stylesheet of artifacts.Stylesheets) {
      const networkRecord = networkRecords.find((record) => record.url === stylesheet.header.sourceURL);
      if (!stylesheet.content) continue;
      const result = _UnminifiedCSS.computeWaste(stylesheet, networkRecord);
      if (result.wastedPercent < IGNORE_THRESHOLD_IN_PERCENT || result.wastedBytes < IGNORE_THRESHOLD_IN_BYTES || !Number.isFinite(result.wastedBytes)) continue;
      items.push(result);
    }
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnTransferSize) },
      { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings.columnWastedBytes) }
    ];
    return { items, headings };
  }
};
var unminified_css_default = UnminifiedCSS;
export {
  UIStrings2 as UIStrings,
  unminified_css_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/unminified-css.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
