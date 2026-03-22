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

// node_modules/lighthouse/core/audits/accessibility/listitem.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if any list item elements do not have list parent elements. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "List items (`<li>`) are contained within `<ul>`, `<ol>` or `<menu>` parent elements",
  /** Title of an accesibility audit that evaluates if any list item elements do not have list parent elements. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "List items (`<li>`) are not contained within `<ul>`, `<ol>` or `<menu>` parent elements.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Screen readers require list items (`<li>`) to be contained within a parent `<ul>`, `<ol>` or `<menu>` to be announced properly. [Learn more about proper list structure](https://dequeuniversity.com/rules/axe/4.10/listitem)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var ListItem = class extends axe_audit_default {
  static {
    __name(this, "ListItem");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "listitem",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var listitem_default = ListItem;
export {
  UIStrings,
  listitem_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/listitem.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
