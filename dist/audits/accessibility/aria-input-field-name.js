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

// node_modules/lighthouse/core/audits/accessibility/aria-input-field-name.js
var UIStrings = {
  /** Title of an accesibility audit that checks that all ARIA input fields have an accessible name. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "ARIA input fields have accessible names",
  /** Title of an accesibility audit that checks that all ARIA input fields have an accessible name. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "ARIA input fields do not have accessible names",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "When an input field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more about input field labels](https://dequeuniversity.com/rules/axe/4.10/aria-input-field-name)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaInputFieldName = class extends axe_audit_default {
  static {
    __name(this, "AriaInputFieldName");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-input-field-name",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_input_field_name_default = AriaInputFieldName;
export {
  UIStrings,
  aria_input_field_name_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-input-field-name.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
