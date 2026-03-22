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

// node_modules/lighthouse/core/audits/accessibility/aria-allowed-role.js
var UIStrings = {
  /** Title of an accessibility audit that evaluates if the ARIA role attributes are valid for the HTML element. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Uses ARIA roles only on compatible elements",
  /** Title of an accessibility audit that evaluates if the ARIA role attributes are valid for the HTML element. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Uses ARIA roles on incompatible elements",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Many HTML elements can only be assigned certain ARIA roles. Using ARIA roles where they are not allowed can interfere with the accessibility of the web page. [Learn more about ARIA roles](https://dequeuniversity.com/rules/axe/4.10/aria-allowed-role)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var ARIAAllowedRole = class extends axe_audit_default {
  static {
    __name(this, "ARIAAllowedRole");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-allowed-role",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_allowed_role_default = ARIAAllowedRole;
export {
  UIStrings,
  aria_allowed_role_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-allowed-role.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
