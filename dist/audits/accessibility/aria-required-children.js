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

// node_modules/lighthouse/core/audits/accessibility/aria-required-children.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if the elements with an aria-role that require child elements have the required children. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.",
  /** Title of an accesibility audit that evaluates if the elements with an aria-role that require child elements have the required children. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Elements with an ARIA `[role]` that require children to contain a specific `[role]` are missing some or all of those required children.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Some ARIA parent roles must contain specific child roles to perform their intended accessibility functions. [Learn more about roles and required children elements](https://dequeuniversity.com/rules/axe/4.10/aria-required-children)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaRequiredChildren = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-required-children",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_required_children_default = AriaRequiredChildren;
export {
  UIStrings,
  aria_required_children_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-required-children.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
