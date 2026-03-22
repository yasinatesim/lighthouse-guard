import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  estimateCompressedContentSize
} from "./chunk-7PCH2QJG.js";
import {
  NetworkRecordsComputed
} from "./chunk-AB7S44AE.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  Util
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/unused-css.js
var PREVIEW_LENGTH = 100;
var UnusedCSS = class _UnusedCSS {
  static {
    __name(this, "UnusedCSS");
  }
  /**
   * @param {Array<LH.Artifacts.CSSStyleSheetInfo>} styles The output of the Styles gatherer.
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @return {Object<string, StyleSheetInfo>} A map of styleSheetId to stylesheet information.
   */
  static indexStylesheetsById(styles, networkRecords) {
    const indexedNetworkRecords = networkRecords.filter((record) => record.resourceSize > 0).reduce(
      (indexed, record) => {
        indexed[record.url] = record;
        return indexed;
      },
      /** @type {Object<string, LH.Artifacts.NetworkRequest>} */
      {}
    );
    return styles.reduce(
      (indexed, stylesheet) => {
        indexed[stylesheet.header.styleSheetId] = Object.assign({
          usedRules: [],
          networkRecord: indexedNetworkRecords[stylesheet.header.sourceURL]
        }, stylesheet);
        return indexed;
      },
      /** @type {Object<string, StyleSheetInfo>} */
      {}
    );
  }
  /**
   * Adds used rules to their corresponding stylesheet.
   * @param {Array<LH.Crdp.CSS.RuleUsage>} rules The output of the CSSUsage gatherer.
   * @param {Object<string, StyleSheetInfo>} indexedStylesheets Stylesheet information indexed by id.
   */
  static indexUsedRules(rules, indexedStylesheets) {
    rules.forEach((rule) => {
      const stylesheetInfo = indexedStylesheets[rule.styleSheetId];
      if (!stylesheetInfo) {
        return;
      }
      if (rule.used) {
        stylesheetInfo.usedRules.push(rule);
      }
    });
  }
  /**
   * @param {StyleSheetInfo} stylesheetInfo
   * @return {{wastedBytes: number, totalBytes: number, wastedPercent: number}}
   */
  static computeUsage(stylesheetInfo) {
    let usedUncompressedBytes = 0;
    const totalUncompressedBytes = stylesheetInfo.content.length;
    for (const usedRule of stylesheetInfo.usedRules) {
      usedUncompressedBytes += usedRule.endOffset - usedRule.startOffset;
    }
    const compressedSize = estimateCompressedContentSize(
      stylesheetInfo.networkRecord,
      totalUncompressedBytes,
      "Stylesheet"
    );
    const percentUnused = (totalUncompressedBytes - usedUncompressedBytes) / totalUncompressedBytes;
    const wastedBytes = Math.round(percentUnused * compressedSize);
    return {
      wastedBytes,
      wastedPercent: percentUnused * 100,
      totalBytes: compressedSize
    };
  }
  /**
   * Trims stylesheet content down to the first rule-set definition.
   * @param {string=} content
   * @return {string}
   */
  static determineContentPreview(content) {
    let preview = Util.truncate(content || "", PREVIEW_LENGTH * 5, "").replace(/( {2,}|\t)+/g, "  ").replace(/\n\s+}/g, "\n}").trim();
    if (preview.length > PREVIEW_LENGTH) {
      const firstRuleStart = preview.indexOf("{");
      const firstRuleEnd = preview.indexOf("}");
      if (firstRuleStart === -1 || firstRuleEnd === -1 || firstRuleStart > firstRuleEnd || firstRuleStart > PREVIEW_LENGTH) {
        preview = Util.truncate(preview, PREVIEW_LENGTH);
      } else if (firstRuleEnd < PREVIEW_LENGTH) {
        preview = preview.slice(0, firstRuleEnd + 1) + " \u2026";
      } else {
        const truncated = Util.truncate(preview, PREVIEW_LENGTH, "");
        const lastSemicolonIndex = truncated.lastIndexOf(";");
        preview = lastSemicolonIndex < firstRuleStart ? truncated + "\u2026 } \u2026" : preview.slice(0, lastSemicolonIndex + 1) + " \u2026 } \u2026";
      }
    }
    return preview;
  }
  /**
   * @param {StyleSheetInfo} stylesheetInfo The stylesheetInfo object.
   * @return {LH.Audit.ByteEfficiencyItem}
   */
  static mapSheetToResult(stylesheetInfo) {
    let url = stylesheetInfo.header.sourceURL;
    if (!url || stylesheetInfo.header.isInline) {
      const contentPreview = _UnusedCSS.determineContentPreview(stylesheetInfo.content);
      url = contentPreview;
    }
    const usage = _UnusedCSS.computeUsage(stylesheetInfo);
    return { url, ...usage };
  }
  /**
   * @param {{Stylesheets: LH.Artifacts['Stylesheets'], CSSUsage: LH.Artifacts['CSSUsage'], devtoolsLog: LH.DevtoolsLog}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Audit.ByteEfficiencyItem[]>}
  */
  static async compute_(data, context) {
    const { CSSUsage, Stylesheets, devtoolsLog } = data;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const indexedSheets = _UnusedCSS.indexStylesheetsById(Stylesheets, networkRecords);
    _UnusedCSS.indexUsedRules(CSSUsage, indexedSheets);
    const items = Object.keys(indexedSheets).map((sheetId) => _UnusedCSS.mapSheetToResult(indexedSheets[sheetId]));
    return items;
  }
};
var UnusedCSSComputed = makeComputedArtifact(
  UnusedCSS,
  ["Stylesheets", "CSSUsage", "devtoolsLog"]
);

export {
  UnusedCSSComputed
};
/*! Bundled license information:

lighthouse/core/computed/unused-css.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
