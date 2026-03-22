import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UnusedCSSComputed
} from "../chunk-ITNLIBH6.js";
import "../chunk-KD3VE2GF.js";
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
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/byte-efficiency/unused-css-rules.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to reduce content from their CSS that isn’t needed immediately and instead load that content at a later time. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Reduce unused CSS",
  /** Description of a Lighthouse audit that tells the user *why* they should defer loading any content in CSS that isn’t needed at page load. This is displayed after a user expands the section to see more. No word length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_BYTES = 10 * 1024;
var UnusedCSSRules = class extends ByteEfficiencyAudit {
  static {
    __name(this, "UnusedCSSRules");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "unused-css-rules",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 1,
      requiredArtifacts: ["Stylesheets", "CSSUsage", "URL", "DevtoolsLog", "Trace", "GatherContext", "SourceMaps"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Artifacts.NetworkRequest[]} _
   * @param {LH.Audit.Context} context
   * @return {Promise<import('./byte-efficiency-audit.js').ByteEfficiencyProduct>}
   */
  static async audit_(artifacts, _, context) {
    const unusedCssItems = await UnusedCSSComputed.request({
      Stylesheets: artifacts.Stylesheets,
      CSSUsage: artifacts.CSSUsage,
      devtoolsLog: artifacts.DevtoolsLog
    }, context);
    const items = unusedCssItems.filter((sheet) => sheet && sheet.wastedBytes > IGNORE_THRESHOLD_IN_BYTES);
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
var unused_css_rules_default = UnusedCSSRules;
export {
  UIStrings2 as UIStrings,
  unused_css_rules_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/unused-css-rules.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
