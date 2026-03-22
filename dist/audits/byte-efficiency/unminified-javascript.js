import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  computeJSTokenLength
} from "../chunk-2XBHRD6G.js";
import {
  estimateCompressedContentSize,
  getRequestForScript,
  isInline
} from "../chunk-KD3VE2GF.js";
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
  Util
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/byte-efficiency/unminified-javascript.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to minify the page’s JS code to reduce file size. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Minify JavaScript",
  /** Description of a Lighthouse audit that tells the user *why* they should minify the page’s JS code to reduce file size. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_PERCENT = 10;
var IGNORE_THRESHOLD_IN_BYTES = 2048;
var UnminifiedJavaScript = class _UnminifiedJavaScript extends ByteEfficiencyAudit {
  static {
    __name(this, "UnminifiedJavaScript");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "unminified-javascript",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 3,
      requiredArtifacts: [
        "Scripts",
        "DevtoolsLog",
        "Trace",
        "GatherContext",
        "URL",
        "SourceMaps"
      ]
    };
  }
  /**
   * @param {string} scriptContent
   * @param {string} displayUrl
   * @param {LH.Artifacts.NetworkRequest|undefined} networkRecord
   * @return {{url: string, totalBytes: number, wastedBytes: number, wastedPercent: number}}
   */
  static computeWaste(scriptContent, displayUrl, networkRecord) {
    const contentLength = scriptContent.length;
    const totalTokenLength = computeJSTokenLength(scriptContent);
    const totalBytes = estimateCompressedContentSize(networkRecord, contentLength, "Script");
    const wastedRatio = 1 - totalTokenLength / contentLength;
    const wastedBytes = Math.round(totalBytes * wastedRatio);
    return {
      url: displayUrl,
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
    const warnings = [];
    for (const script of artifacts.Scripts) {
      if (!script.content) continue;
      const networkRecord = getRequestForScript(networkRecords, script);
      const displayUrl = isInline(script) ? `inline: ${Util.truncate(script.content, 40)}` : script.url;
      try {
        const result = _UnminifiedJavaScript.computeWaste(script.content, displayUrl, networkRecord);
        if (result.wastedPercent < IGNORE_THRESHOLD_IN_PERCENT || result.wastedBytes < IGNORE_THRESHOLD_IN_BYTES || !Number.isFinite(result.wastedBytes)) continue;
        items.push(result);
      } catch (err) {
        warnings.push(`Unable to process script ${script.url}: ${err.message}`);
      }
    }
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnTransferSize) },
      { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings.columnWastedBytes) }
    ];
    return {
      items,
      warnings,
      headings
    };
  }
};
var unminified_javascript_default = UnminifiedJavaScript;
export {
  UIStrings2 as UIStrings,
  unminified_javascript_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/unminified-javascript.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
