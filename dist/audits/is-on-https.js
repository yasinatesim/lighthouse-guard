import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRecordsComputed,
  NetworkRequest
} from "./chunk-AB7S44AE.js";
import {
  url_utils_default
} from "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import {
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

// node_modules/lighthouse/core/audits/is-on-https.js
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on the useage of HTTPS on a page. This descriptive title is shown to users when all requests on a page are fufilled using HTTPS. */
  title: "Uses HTTPS",
  /** Title of a Lighthouse audit that provides detail on the useage of HTTPS on a page. This descriptive title is shown to users when some, or all, requests on the page use HTTP instead of HTTPS. */
  failureTitle: "Does not use HTTPS",
  /** Description of a Lighthouse audit that tells the user *why* HTTPS use *for all resources* is important. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "All sites should be protected with HTTPS, even ones that don't handle sensitive data. This includes avoiding [mixed content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content), where some resources are loaded over HTTP despite the initial request being served over HTTPS. HTTPS prevents intruders from tampering with or passively listening in on the communications between your app and your users, and is a prerequisite for HTTP/2 and many new web platform APIs. [Learn more about HTTPS](https://developer.chrome.com/docs/lighthouse/pwa/is-on-https/).",
  /** [ICU Syntax] Label identifying the number of insecure network requests found by an audit of a web page. */
  displayValue: `{itemCount, plural,
    =1 {1 insecure request found}
    other {# insecure requests found}
    }`,
  /** Label for a column in a data table; entries in the column will be the URLs of insecure (non-HTTPS) network requests. */
  columnInsecureURL: "Insecure URL",
  /** Label for a column in a data table; entries in the column will be how the browser handled insecure (non-HTTPS) network requests. */
  columnResolution: "Request Resolution",
  /** Value for the resolution column in a data table; denotes that the insecure URL was allowed by the browser. */
  allowed: "Allowed",
  /** Value for the resolution column in a data table; denotes that the insecure URL was blocked by the browser. */
  blocked: "Blocked",
  /** Value for the resolution column in a data table; denotes that the insecure URL may be blocked by the browser in the future. */
  warning: "Allowed with warning",
  /** Value for the resolution column in a data table; denotes that the insecure URL was upgraded to a secure request by the browser. */
  upgraded: "Automatically upgraded to HTTPS"
};
var resolutionToString = {
  MixedContentAutomaticallyUpgraded: UIStrings.upgraded,
  MixedContentBlocked: UIStrings.blocked,
  MixedContentWarning: UIStrings.warning
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var HTTPS = class extends Audit {
  static {
    __name(this, "HTTPS");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "is-on-https",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["DevtoolsLog", "InspectorIssues"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLogs = artifacts.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLogs, context);
    const insecureURLs = networkRecords.filter((record) => !NetworkRequest.isSecureRequest(record)).map((record) => url_utils_default.elideDataURI(record.url));
    const items = Array.from(new Set(insecureURLs)).map((url) => ({ url, resolution: void 0 }));
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnInsecureURL) },
      { key: "resolution", valueType: "text", label: str_(UIStrings.columnResolution) }
    ];
    for (const details of artifacts.InspectorIssues.mixedContentIssue ?? []) {
      let item = items.find((item2) => item2.url === details.insecureURL);
      if (!item) {
        item = { url: details.insecureURL };
        items.push(item);
      }
      item.resolution = resolutionToString[details.resolutionStatus] ? str_(resolutionToString[details.resolutionStatus]) : details.resolutionStatus;
    }
    for (const item of items) {
      if (!item.resolution) item.resolution = str_(UIStrings.allowed);
    }
    let displayValue;
    if (items.length > 0) {
      displayValue = str_(UIStrings.displayValue, { itemCount: items.length });
    }
    return {
      score: Number(items.length === 0),
      displayValue,
      details: Audit.makeTableDetails(headings, items)
    };
  }
};
var is_on_https_default = HTTPS;
export {
  UIStrings,
  is_on_https_default as default
};
/*! Bundled license information:

lighthouse/core/audits/is-on-https.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
