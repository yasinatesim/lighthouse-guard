import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UnusedCSSComputed
} from "../chunk-FCVLBDCN.js";
import "../chunk-S2GJPGDO.js";
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
