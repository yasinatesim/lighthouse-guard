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

// node_modules/lighthouse/core/audits/accessibility/aria-toggle-field-name.js
var UIStrings = {
  /** Title of an accesibility audit that checks that all ARIA toggle fields have an accessible name. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "ARIA toggle fields have accessible names",
  /** Title of an accesibility audit that checks that all ARIA toggle fields have an accessible name. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "ARIA toggle fields do not have accessible names",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "When a toggle field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more about toggle fields](https://dequeuniversity.com/rules/axe/4.10/aria-toggle-field-name)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaToggleFieldName = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-toggle-field-name",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_toggle_field_name_default = AriaToggleFieldName;
export {
  UIStrings,
  aria_toggle_field_name_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-toggle-field-name.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
