import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
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

// node_modules/lighthouse/core/audits/third-party-cookies.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the use of third party cookies. This descriptive title is shown to users when the page does not use third party cookies. */
  title: "Avoids third-party cookies",
  /** Title of a Lighthouse audit that provides detail on the use of third party cookies. This descriptive title is shown to users when the page uses third party cookies. */
  failureTitle: "Uses third-party cookies",
  /** Description of a Lighthouse audit that tells the user why they should not use third party cookies on their page. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Third-party cookies may be blocked in some contexts. [Learn more about preparing for third-party cookie restrictions](https://privacysandbox.google.com/cookies/prepare/overview).",
  /** [ICU Syntax] Label for the audit identifying the number of third-party cookies. */
  displayValue: `{itemCount, plural,
    =1 {1 cookie found}
    other {# cookies found}
    }`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var ThirdPartyCookies = class extends Audit {
  static {
    __name(this, "ThirdPartyCookies");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "third-party-cookies",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["InspectorIssues"]
    };
  }
  /**
   * https://source.chromium.org/chromium/chromium/src/+/d2fcd4ba302baeabf4b96d8fa9fdb7a215736c31:third_party/devtools-frontend/src/front_end/models/issues_manager/CookieIssue.ts;l=62-69
   * @param {LH.Crdp.Audits.CookieIssueDetails} cookieIssue
   * @return {string}
   */
  static getCookieId(cookieIssue) {
    if (!cookieIssue.cookie) {
      return cookieIssue.rawCookieLine ?? "no-cookie-info";
    }
    const { domain, path, name } = cookieIssue.cookie;
    const cookieId = `${domain};${path};${name}`;
    return cookieId;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts) {
    const seenCookies = /* @__PURE__ */ new Set();
    const items = [];
    for (const issue of artifacts.InspectorIssues.cookieIssue ?? []) {
      const isPhaseoutWarn = issue.cookieWarningReasons.includes("WarnThirdPartyPhaseout");
      const isPhaseoutExclude = issue.cookieExclusionReasons.includes("ExcludeThirdPartyPhaseout");
      if (!isPhaseoutWarn && !isPhaseoutExclude) continue;
      const name = issue.cookie?.name || issue.rawCookieLine;
      if (!name) continue;
      const cookieId = this.getCookieId(issue);
      if (seenCookies.has(cookieId)) continue;
      seenCookies.add(cookieId);
      items.push({
        name,
        url: issue.cookieUrl
      });
    }
    const headings = [
      { key: "name", valueType: "text", label: str_(UIStrings.columnName) },
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) }
    ];
    const details = Audit.makeTableDetails(headings, items);
    let displayValue;
    if (items.length > 0) {
      displayValue = str_(UIStrings2.displayValue, { itemCount: items.length });
    }
    return {
      score: items.length ? 0 : 1,
      displayValue,
      details
    };
  }
};
var third_party_cookies_default = ThirdPartyCookies;
export {
  UIStrings2 as UIStrings,
  third_party_cookies_default as default
};
/*! Bundled license information:

lighthouse/core/audits/third-party-cookies.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
