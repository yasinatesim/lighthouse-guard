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

// node_modules/lighthouse/core/audits/accessibility/aria-valid-attr-value.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all elements that have an ARIA HTML attribute have a valid value for that attribute. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`[aria-*]` attributes have valid values",
  /** Title of an accesibility audit that evaluates if all elements that have an ARIA HTML attribute have a valid value for that attribute. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`[aria-*]` attributes do not have valid values",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid values. [Learn more about valid values for ARIA attributes](https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var ARIAValidAttr = class extends axe_audit_default {
  static {
    __name(this, "ARIAValidAttr");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-valid-attr-value",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_valid_attr_value_default = ARIAValidAttr;
export {
  UIStrings,
  aria_valid_attr_value_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-valid-attr-value.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
