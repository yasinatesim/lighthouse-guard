import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "../chunk-HZ5CS3EU.js";
import "../chunk-YOYAIZOW.js";
import "../chunk-OZ2G5ZKT.js";
import "../chunk-EBBYNBKM.js";
import "../chunk-VW72MYVI.js";
import {
  createIcuMessageFn
} from "../chunk-O3YNDXOX.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/seo/http-status-code.js
var HTTP_UNSUCCESSFUL_CODE_LOW = 400;
var HTTP_UNSUCCESSFUL_CODE_HIGH = 599;
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on the HTTP status code a page responds with. This descriptive title is shown when the page has responded with a valid HTTP status code. */
  title: "Page has successful HTTP status code",
  /** Descriptive title of a Lighthouse audit that provides detail on the HTTP status code a page responds with. This descriptive title is shown when the page responds to requests with an HTTP status code that indicates the request was unsuccessful. */
  failureTitle: "Page has unsuccessful HTTP status code",
  /** Description of a Lighthouse audit that tells the user *why* they need to serve pages with a valid HTTP status code. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Pages with unsuccessful HTTP status codes may not be indexed properly. [Learn more about HTTP status codes](https://developer.chrome.com/docs/lighthouse/seo/http-status-code/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var HTTPStatusCode = class extends Audit {
  static {
    __name(this, "HTTPStatusCode");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "http-status-code",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["DevtoolsLog", "URL", "GatherContext"],
      supportedModes: ["navigation"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const URL = artifacts.URL;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL }, context);
    const statusCode = mainResource.statusCode;
    if (statusCode >= HTTP_UNSUCCESSFUL_CODE_LOW && statusCode <= HTTP_UNSUCCESSFUL_CODE_HIGH) {
      return {
        score: 0,
        displayValue: `${statusCode}`
      };
    }
    return {
      score: 1
    };
  }
};
var http_status_code_default = HTTPStatusCode;
export {
  UIStrings,
  http_status_code_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/http-status-code.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
