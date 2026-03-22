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

// node_modules/lighthouse/core/audits/accessibility/aria-allowed-attr.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if the ARIA HTML attributes are misaligned with the aria-role HTML attribute specificed on the element, such mismatches are invalid. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`[aria-*]` attributes match their roles",
  /** Title of an accesibility audit that evaluates if the ARIA HTML attributes are misaligned with the aria-role HTML attribute specificed on the element, such mismatches are invalid. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`[aria-*]` attributes do not match their roles",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Each ARIA `role` supports a specific subset of `aria-*` attributes. Mismatching these invalidates the `aria-*` attributes. [Learn how to match ARIA attributes to their roles](https://dequeuniversity.com/rules/axe/4.10/aria-allowed-attr)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var ARIAAllowedAttr = class extends axe_audit_default {
  static {
    __name(this, "ARIAAllowedAttr");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-allowed-attr",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_allowed_attr_default = ARIAAllowedAttr;
export {
  UIStrings,
  aria_allowed_attr_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-allowed-attr.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
