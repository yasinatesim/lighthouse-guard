import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  font_display_default
} from "./chunk-GMCDPGZJ.js";
import "./chunk-2DV6G4YM.js";
import "./chunk-EXNQHM7K.js";
import "./chunk-UNPQMFMQ.js";
import "./chunk-NUK2ASLP.js";
import {
  NetworkRecordsComputed
} from "./chunk-AB7S44AE.js";
import "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-4MZOSFEN.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/preload-fonts.js
var PASSING_FONT_DISPLAY_REGEX = /^(optional)$/;
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on whether fonts that used `font-display: optional` were preloaded. This descriptive title is shown to users when all fonts that used `font-display: optional` were preloaded. */
  title: "Fonts with `font-display: optional` are preloaded",
  /** Title of a Lighthouse audit that provides detail on whether fonts that used `font-display: optional` were preloaded. This descriptive title is shown to users when one or more fonts used `font-display: optional` and were not preloaded. */
  failureTitle: "Fonts with `font-display: optional` are not preloaded",
  /** Description of a Lighthouse audit that tells the user why they should preload fonts if they are using `font-display: optional`. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Preload `optional` fonts so first-time visitors may use them. [Learn more about preloading fonts](https://web.dev/articles/preload-optional-fonts)"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var PreloadFontsAudit = class _PreloadFontsAudit extends Audit {
  static {
    __name(this, "PreloadFontsAudit");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "preload-fonts",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["DevtoolsLog", "URL", "CSSUsage", "Stylesheets"]
    };
  }
  /**
   * Finds which font URLs were attempted to be preloaded,
   * ignoring those that failed to be reused and were requested again.
   * Note: document.fonts.load() is a valid way to preload fonts,
   * but we are not currently checking for that.
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @return {Set<string>}
   */
  static getURLsAttemptedToPreload(networkRecords) {
    const attemptedURLs = networkRecords.filter((req) => req.resourceType === "Font").filter((req) => req.isLinkPreload).map((req) => req.url);
    return new Set(attemptedURLs);
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const optionalFontURLs = font_display_default.findFontDisplayDeclarations(artifacts, PASSING_FONT_DISPLAY_REGEX).passingURLs;
    const preloadedFontURLs = _PreloadFontsAudit.getURLsAttemptedToPreload(networkRecords);
    const results = Array.from(optionalFontURLs).filter((url) => !preloadedFontURLs.has(url)).map((url) => {
      return { url };
    });
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) }
    ];
    return {
      score: results.length > 0 ? 0 : 1,
      details: Audit.makeTableDetails(headings, results),
      notApplicable: optionalFontURLs.size === 0
    };
  }
};
var preload_fonts_default = PreloadFontsAudit;
export {
  UIStrings2 as UIStrings,
  preload_fonts_default as default
};
/*! Bundled license information:

lighthouse/core/audits/preload-fonts.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
