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

// node_modules/lighthouse/core/audits/accessibility/aria-roles.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all elements have valid aria-role HTML attributes. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`[role]` values are valid",
  /** Title of an accesibility audit that evaluates if all elements have valid aria-role HTML attributes. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`[role]` values are not valid",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "ARIA roles must have valid values in order to perform their intended accessibility functions. [Learn more about valid ARIA roles](https://dequeuniversity.com/rules/axe/4.10/aria-roles)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaRoles = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-roles",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_roles_default = AriaRoles;
export {
  UIStrings,
  aria_roles_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-roles.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
