import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  axe_audit_default
} from "../chunk-WENQTRMQ.js";
import {
  createIcuMessageFn
} from "../chunk-O3YNDXOX.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/list.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all list elements have a valid structure containing only list items. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).",
  /** Title of an accesibility audit that evaluates if all list elements have a valid structure containing only list items. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Lists do not contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Screen readers have a specific way of announcing lists. Ensuring proper list structure aids screen reader output. [Learn more about proper list structure](https://dequeuniversity.com/rules/axe/4.10/list)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var List = class extends axe_audit_default {
  static {
    __name(this, "List");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "list",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var list_default = List;
export {
  UIStrings,
  list_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/list.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
