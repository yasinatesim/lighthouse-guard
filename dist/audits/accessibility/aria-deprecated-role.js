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

// node_modules/lighthouse/core/audits/accessibility/aria-deprecated-role.js
var UIStrings = {
  /** Title of an accessibility audit that checks if deprecated ARIA roles are used. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Deprecated ARIA roles were not used",
  /** Title of an accessibility audit that checks if deprecated ARIA roles are used. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Deprecated ARIA roles were used",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Deprecated ARIA roles may not be processed correctly by assistive technology. [Learn more about deprecated ARIA roles](https://dequeuniversity.com/rules/axe/4.10/aria-deprecated-role)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaDeprecatedRole = class extends axe_audit_default {
  static {
    __name(this, "AriaDeprecatedRole");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-deprecated-role",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_deprecated_role_default = AriaDeprecatedRole;
export {
  UIStrings,
  aria_deprecated_role_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-deprecated-role.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
