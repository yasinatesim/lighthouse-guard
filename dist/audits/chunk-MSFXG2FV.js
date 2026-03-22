import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  Sentry
} from "./chunk-GRLAFLTF.js";
import {
  NetworkRecordsComputed
} from "./chunk-JDNHHZFJ.js";
import {
  url_utils_default
} from "./chunk-YNYBF6HU.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";

// node_modules/lighthouse/core/audits/font-display.js
var PASSING_FONT_DISPLAY_REGEX = /^(block|fallback|optional|swap)$/;
var CSS_URL_REGEX = /url\((.*?)\)/;
var CSS_URL_GLOBAL_REGEX = new RegExp(CSS_URL_REGEX, "g");
var UIStrings2 = {
  /** Title of a diagnostic audit that provides detail on if all the text on a webpage was visible while the page was loading its webfonts. This descriptive title is shown to users when the amount is acceptable and no user action is required. */
  title: "All text remains visible during webfont loads",
  /** Title of a diagnostic audit that provides detail on the load of the page's webfonts. Often the text is invisible for seconds before the webfont resource is loaded. This imperative title is shown to users when there is a significant amount of execution time that could be reduced. */
  failureTitle: "Ensure text remains visible during webfont load",
  /** Description of a Lighthouse audit that tells the user *why* they should use the font-display CSS feature. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Leverage the `font-display` CSS feature to ensure text is user-visible while webfonts are loading. [Learn more about `font-display`](https://developer.chrome.com/docs/lighthouse/performance/font-display/).",
  /**
   * @description [ICU Syntax] A warning message that is shown when Lighthouse couldn't automatically check some of the page's fonts, telling the user that they will need to manually check the fonts coming from a certain URL origin.
   * @example {https://font.cdn.com/} fontOrigin
   */
  undeclaredFontOriginWarning: "{fontCountForOrigin, plural, =1 {Lighthouse was unable to automatically check the `font-display` value for the origin {fontOrigin}.} other {Lighthouse was unable to automatically check the `font-display` values for the origin {fontOrigin}.}}"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var FontDisplay = class _FontDisplay extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "font-display",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      supportedModes: ["navigation"],
      guidanceLevel: 3,
      requiredArtifacts: ["DevtoolsLog", "Stylesheets", "URL"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {RegExp} passingFontDisplayRegex
   * @return {{passingURLs: Set<string>, failingURLs: Set<string>}}
   */
  static findFontDisplayDeclarations(artifacts, passingFontDisplayRegex) {
    const passingURLs = /* @__PURE__ */ new Set();
    const failingURLs = /* @__PURE__ */ new Set();
    for (const stylesheet of artifacts.Stylesheets) {
      const newlinesStripped = stylesheet.content.replace(/(\r|\n)+/g, " ");
      const fontFaceDeclarations = newlinesStripped.match(/@font-face\s*{(.*?)}/g) || [];
      for (const declaration of fontFaceDeclarations) {
        const rawFontURLs = declaration.match(CSS_URL_GLOBAL_REGEX);
        if (!rawFontURLs) continue;
        const fontDisplayMatch = declaration.match(/font-display\s*:\s*(\w+)\s*(;|\})/);
        const rawFontDisplay = fontDisplayMatch?.[1] || "";
        const hasPassingFontDisplay = passingFontDisplayRegex.test(rawFontDisplay);
        const targetURLSet = hasPassingFontDisplay ? passingURLs : failingURLs;
        const relativeURLs = rawFontURLs.map((s) => s.match(CSS_URL_REGEX)[1].trim()).map((s) => {
          if (/^('|").*\1$/.test(s)) {
            return s.substr(1, s.length - 2);
          }
          return s;
        });
        for (const relativeURL of relativeURLs) {
          try {
            const relativeRoot = url_utils_default.isValid(stylesheet.header.sourceURL) ? stylesheet.header.sourceURL : artifacts.URL.finalDisplayedUrl;
            const absoluteURL = new URL(relativeURL, relativeRoot);
            targetURLSet.add(absoluteURL.href);
          } catch (err) {
            Sentry.captureException(err, { tags: { audit: this.meta.id } });
          }
        }
      }
    }
    return { passingURLs, failingURLs };
  }
  /**
   * Some pages load many fonts we can't check, so dedupe on origin.
   * @param {Array<string>} warningUrls
   * @return {Array<LH.IcuMessage>}
   */
  static getWarningsForFontUrls(warningUrls) {
    const warningCountByOrigin = /* @__PURE__ */ new Map();
    for (const warningUrl of warningUrls) {
      const origin = url_utils_default.getOrigin(warningUrl);
      if (!origin) continue;
      const count = warningCountByOrigin.get(origin) || 0;
      warningCountByOrigin.set(origin, count + 1);
    }
    const warnings = [...warningCountByOrigin].map(([fontOrigin, fontCountForOrigin]) => {
      return str_(UIStrings2.undeclaredFontOriginWarning, { fontCountForOrigin, fontOrigin });
    });
    return warnings;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLogs = artifacts.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLogs, context);
    const { passingURLs, failingURLs } = _FontDisplay.findFontDisplayDeclarations(artifacts, PASSING_FONT_DISPLAY_REGEX);
    const warningURLs = [];
    const results = networkRecords.filter((record) => record.resourceType === "Font").filter((record) => !/^data:/.test(record.url)).filter((record) => !/^blob:/.test(record.url)).filter((record) => {
      if (failingURLs.has(record.url)) return true;
      if (!passingURLs.has(record.url)) warningURLs.push(record.url);
      return false;
    }).map((record) => {
      const wastedMs = Math.min(record.networkEndTime - record.networkRequestTime, 3e3);
      return {
        url: record.url,
        wastedMs
      };
    });
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "wastedMs", valueType: "ms", label: str_(UIStrings.columnWastedMs) }
    ];
    const details = Audit.makeTableDetails(headings, results);
    return {
      score: Number(results.length === 0),
      details,
      warnings: _FontDisplay.getWarningsForFontUrls(warningURLs)
    };
  }
};
var font_display_default = FontDisplay;

export {
  UIStrings2 as UIStrings,
  font_display_default
};
/*! Bundled license information:

lighthouse/core/audits/font-display.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
