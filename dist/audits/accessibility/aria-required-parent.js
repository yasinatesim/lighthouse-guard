import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  axe_audit_default
} from "../chunk-DZC7VBO4.js";
import {
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/accessibility/aria-required-parent.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates valid aria-role usage. Some ARIA roles require that elements must be a child of specific parent element. This audit checks that when those roles are used, the element with the role is in fact a child of the required parent. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`[role]`s are contained by their required parent element",
  /** Title of an accesibility audit that evaluates valid aria-role usage. Some ARIA roles require that elements must be a child of specific parent element. This audit checks that when those roles are used, the element with the role is in fact a child of the required parent. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`[role]`s are not contained by their required parent element",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Some ARIA child roles must be contained by specific parent roles to properly perform their intended accessibility functions. [Learn more about ARIA roles and required parent element](https://dequeuniversity.com/rules/axe/4.10/aria-required-parent)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaRequiredParent = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-required-parent",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_required_parent_default = AriaRequiredParent;
export {
  UIStrings,
  aria_required_parent_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-required-parent.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
