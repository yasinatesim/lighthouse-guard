import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  EntityClassificationComputed
} from "./chunk-EXNQHM7K.js";
import "./chunk-AB7S44AE.js";
import {
  url_utils_default
} from "./chunk-CGRNGE5D.js";
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
  Audit,
  Util
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/valid-source-maps.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on HTTP to HTTPS redirects. This descriptive title is shown to users when HTTP traffic is redirected to HTTPS. */
  title: "Page has valid source maps",
  /** Title of a Lighthouse audit that provides detail on HTTP to HTTPS redirects. This descriptive title is shown to users when HTTP traffic is not redirected to HTTPS. */
  failureTitle: "Missing source maps for large first-party JavaScript",
  /** Description of a Lighthouse audit that tells the user that their JavaScript source maps are invalid or missing. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Source maps translate minified code to the original source code. This helps developers debug in production. In addition, Lighthouse is able to provide further insights. Consider deploying source maps to take advantage of these benefits. [Learn more about source maps](https://developer.chrome.com/docs/devtools/javascript/source-maps/).",
  /** Label for a column in a data table. Entries will be URLs to JavaScript source maps. */
  columnMapURL: "Map URL",
  /** Label for a possible error message indicating that a source map for a large, first-party JavaScript script is missing. */
  missingSourceMapErrorMessage: "Large JavaScript file is missing a source map",
  /** Label for a possible error message indicating that the content of a source map is invalid because it is missing items in the sourcesContent attribute. */
  missingSourceMapItemsWarningMesssage: `{missingItems, plural,
    =1 {Warning: missing 1 item in \`.sourcesContent\`}
    other {Warning: missing # items in \`.sourcesContent\`}
    }`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var LARGE_JS_BYTE_THRESHOLD = 500 * 1024;
var ValidSourceMaps = class extends Audit {
  static {
    __name(this, "ValidSourceMaps");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "valid-source-maps",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["Scripts", "SourceMaps", "URL", "DevtoolsLog"]
    };
  }
  /**
   * Returns true if the size of the script exceeds a static threshold.
   * @param {LH.Artifacts.Script} script
   * @param {LH.Artifacts.EntityClassification} classifiedEntities
   * @return {boolean}
   */
  static isLargeFirstPartyJS(script, classifiedEntities) {
    const url = script.url;
    if (!script.length || !url) return false;
    if (!url_utils_default.isValid(url)) return false;
    if (!Util.createOrReturnURL(url).protocol.startsWith("http")) return false;
    const isLargeJS = script.length >= LARGE_JS_BYTE_THRESHOLD;
    return classifiedEntities.isFirstParty(url) && isLargeJS;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   */
  static async audit(artifacts, context) {
    const { SourceMaps } = artifacts;
    const devtoolsLog = artifacts.DevtoolsLog;
    const classifiedEntities = await EntityClassificationComputed.request(
      { URL: artifacts.URL, devtoolsLog },
      context
    );
    const isMissingMapForLargeFirstPartyScriptUrl = /* @__PURE__ */ new Set();
    let missingMapsForLargeFirstPartyFile = false;
    const results = [];
    for (const script of artifacts.Scripts) {
      const sourceMap = SourceMaps.find((m) => m.scriptId === script.scriptId);
      const errors = [];
      const isLargeFirstParty = this.isLargeFirstPartyJS(script, classifiedEntities);
      if (isLargeFirstParty && (!sourceMap || !sourceMap.map)) {
        missingMapsForLargeFirstPartyFile = true;
        isMissingMapForLargeFirstPartyScriptUrl.add(script.url);
        errors.push({ error: str_(UIStrings2.missingSourceMapErrorMessage) });
      }
      if (sourceMap && !sourceMap.map) {
        errors.push({ error: sourceMap.errorMessage });
      }
      if (sourceMap?.map) {
        const sourcesContent = sourceMap.map.sourcesContent || [];
        let missingSourcesContentCount = 0;
        for (let i = 0; i < sourceMap.map.sources.length; i++) {
          if (sourcesContent.length < i || !sourcesContent[i]) missingSourcesContentCount += 1;
        }
        if (missingSourcesContentCount > 0) {
          errors.push({ error: str_(
            UIStrings2.missingSourceMapItemsWarningMesssage,
            { missingItems: missingSourcesContentCount }
          ) });
        }
      }
      if (sourceMap || errors.length) {
        results.push({
          scriptUrl: script.url,
          sourceMapUrl: sourceMap?.sourceMapUrl,
          subItems: {
            type: (
              /** @type {const} */
              "subitems"
            ),
            items: errors
          }
        });
      }
    }
    const headings = [
      {
        key: "scriptUrl",
        valueType: "url",
        subItemsHeading: { key: "error" },
        label: str_(UIStrings.columnURL)
      },
      { key: "sourceMapUrl", valueType: "url", label: str_(UIStrings2.columnMapURL) }
    ];
    results.sort((a, b) => {
      const missingMapA = isMissingMapForLargeFirstPartyScriptUrl.has(a.scriptUrl);
      const missingMapB = isMissingMapForLargeFirstPartyScriptUrl.has(b.scriptUrl);
      if (missingMapA && !missingMapB) return -1;
      if (!missingMapA && missingMapB) return 1;
      if (a.subItems.items.length && !b.subItems.items.length) return -1;
      if (!a.subItems.items.length && b.subItems.items.length) return 1;
      return b.scriptUrl.localeCompare(a.scriptUrl);
    });
    return {
      score: missingMapsForLargeFirstPartyFile ? 0 : 1,
      details: Audit.makeTableDetails(headings, results)
    };
  }
};
var valid_source_maps_default = ValidSourceMaps;
export {
  UIStrings2 as UIStrings,
  valid_source_maps_default as default
};
/*! Bundled license information:

lighthouse/core/audits/valid-source-maps.js:
  (**
   * @license Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
