import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/dobetterweb/inspector-issues.js
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on various types of problems with a website, like security or network errors. This descriptive title is shown to users when no issues were logged into the Chrome DevTools Issues panel. */
  title: "No issues in the `Issues` panel in Chrome Devtools",
  /** Title of a Lighthouse audit that provides detail on various types of problems with a website, like security or network errors. This descriptive title is shown to users when issues are detected and logged into the Chrome DevTools Issues panel. */
  failureTitle: "Issues were logged in the `Issues` panel in Chrome Devtools",
  /* eslint-disable max-len */
  /** Description of a Lighthouse audit that tells the user why issues being logged to the Chrome DevTools Issues panel are a cause for concern and so should be fixed. This is displayed after a user expands the section to see more. No character length limits. */
  description: "Issues logged to the `Issues` panel in Chrome Devtools indicate unresolved problems. They can come from network request failures, insufficient security controls, and other browser concerns. Open up the Issues panel in Chrome DevTools for more details on each issue.",
  /* eslint-enable max-len */
  /** Table column header for the types of problems observed in a website, like security or network errors. */
  columnIssueType: "Issue type",
  /** The type of an Issue in Chrome DevTools when a resource is blocked due to the website's cross-origin policy. */
  issueTypeBlockedByResponse: "Blocked by cross-origin policy",
  /** The type of an Issue in Chrome DevTools when a site has large ads that use up a lot of the browser's resources. */
  issueTypeHeavyAds: "Heavy resource usage by ads"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var IssuesPanelEntries = class extends Audit {
  static {
    __name(this, "IssuesPanelEntries");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "inspector-issues",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["InspectorIssues"]
    };
  }
  /**
   * @param {Array<LH.Crdp.Audits.MixedContentIssueDetails>} mixedContentIssues
   * @return {LH.Audit.Details.TableItem}
   */
  static getMixedContentRow(mixedContentIssues) {
    const requestUrls = /* @__PURE__ */ new Set();
    for (const issue of mixedContentIssues) {
      const requestUrl = issue.request?.url || issue.mainResourceURL;
      requestUrls.add(requestUrl);
    }
    return {
      issueType: "Mixed content",
      subItems: {
        type: "subitems",
        items: Array.from(requestUrls).map((url) => ({ url }))
      }
    };
  }
  /**
   * @param {Array<LH.Crdp.Audits.CookieIssueDetails>} CookieIssues
   * @return {LH.Audit.Details.TableItem}
   */
  static getCookieRow(CookieIssues) {
    const requestUrls = /* @__PURE__ */ new Set();
    for (const issue of CookieIssues) {
      const requestUrl = issue.request?.url || issue.cookieUrl;
      if (requestUrl) {
        requestUrls.add(requestUrl);
      }
    }
    return {
      issueType: "Cookie",
      subItems: {
        type: "subitems",
        items: Array.from(requestUrls).map((url) => {
          return {
            url
          };
        })
      }
    };
  }
  /**
   * @param {Array<LH.Crdp.Audits.BlockedByResponseIssueDetails>} blockedByResponseIssues
   * @return {LH.Audit.Details.TableItem}
   */
  static getBlockedByResponseRow(blockedByResponseIssues) {
    const requestUrls = /* @__PURE__ */ new Set();
    for (const issue of blockedByResponseIssues) {
      const requestUrl = issue.request?.url;
      if (requestUrl) {
        requestUrls.add(requestUrl);
      }
    }
    return {
      issueType: str_(UIStrings.issueTypeBlockedByResponse),
      subItems: {
        type: "subitems",
        items: Array.from(requestUrls).map((url) => {
          return {
            url
          };
        })
      }
    };
  }
  /**
   * @param {Array<LH.Crdp.Audits.ContentSecurityPolicyIssueDetails>} cspIssues
   * @return {LH.Audit.Details.TableItem}
   */
  static getContentSecurityPolicyRow(cspIssues) {
    const requestUrls = /* @__PURE__ */ new Set();
    for (const issue of cspIssues) {
      const requestUrl = issue.blockedURL;
      if (requestUrl) {
        requestUrls.add(requestUrl);
      }
    }
    return {
      issueType: "Content security policy",
      subItems: {
        type: "subitems",
        items: Array.from(requestUrls).map((url) => {
          return {
            url
          };
        })
      }
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const headings = [
      /* eslint-disable max-len */
      { key: "issueType", valueType: "text", subItemsHeading: { key: "url", valueType: "url" }, label: str_(UIStrings.columnIssueType) }
      /* eslint-enable max-len */
    ];
    const issues = artifacts.InspectorIssues;
    const items = [];
    if (issues.mixedContentIssue?.length) {
      items.push(this.getMixedContentRow(issues.mixedContentIssue));
    }
    if (issues.cookieIssue?.length) {
      items.push(this.getCookieRow(issues.cookieIssue));
    }
    if (issues.blockedByResponseIssue?.length) {
      items.push(this.getBlockedByResponseRow(issues.blockedByResponseIssue));
    }
    if (issues.heavyAdIssue?.length) {
      items.push({ issueType: str_(UIStrings.issueTypeHeavyAds) });
    }
    if (issues.contentSecurityPolicyIssue?.length) {
      items.push(this.getContentSecurityPolicyRow(issues.contentSecurityPolicyIssue));
    }
    return {
      score: items.length > 0 ? 0 : 1,
      details: Audit.makeTableDetails(headings, items)
    };
  }
};
var inspector_issues_default = IssuesPanelEntries;
export {
  UIStrings,
  inspector_issues_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/inspector-issues.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
