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

// node_modules/lighthouse/core/audits/accessibility/aria-prohibited-attr.js
var UIStrings = {
  /** Title of an accessibility audit that checks if elements use prohibited ARIA attributes. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Elements use only permitted ARIA attributes",
  /** Title of an accessibility audit that checks if elements use prohibited ARIA attributes. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Elements use prohibited ARIA attributes",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Using ARIA attributes in roles where they are prohibited can mean that important information is not communicated to users of assistive technologies. [Learn more about prohibited ARIA roles](https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaProhibitedAttr = class extends axe_audit_default {
  static {
    __name(this, "AriaProhibitedAttr");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-prohibited-attr",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_prohibited_attr_default = AriaProhibitedAttr;
export {
  UIStrings,
  aria_prohibited_attr_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-prohibited-attr.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
