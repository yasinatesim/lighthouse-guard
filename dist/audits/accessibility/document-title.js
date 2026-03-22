import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  axe_audit_default
} from "../chunk-Z3B7WLST.js";
import {
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/document-title.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if the page has a <title> element that describes the page. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Document has a `<title>` element",
  /** Title of an accesibility audit that evaluates if the page has a <title> element that describes the page. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Document doesn't have a `<title>` element",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search. [Learn more about document titles](https://dequeuniversity.com/rules/axe/4.10/document-title)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var DocumentTitle = class extends axe_audit_default {
  static {
    __name(this, "DocumentTitle");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "document-title",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var document_title_default = DocumentTitle;
export {
  UIStrings,
  document_title_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/document-title.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
