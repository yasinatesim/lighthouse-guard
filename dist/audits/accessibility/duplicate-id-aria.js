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

// node_modules/lighthouse/core/audits/accessibility/duplicate-id-aria.js
var UIStrings = {
  /** Title of an accesibility audit that checks if there are any duplicate ARIA IDs on the page. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "ARIA IDs are unique",
  /** Title of an accesibility audit that checks if there are any duplicate ARIA IDs on the page. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "ARIA IDs are not unique",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "The value of an ARIA ID must be unique to prevent other instances from being overlooked by assistive technologies. [Learn how to fix duplicate ARIA IDs](https://dequeuniversity.com/rules/axe/4.10/duplicate-id-aria)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var DuplicateIdAria = class extends axe_audit_default {
  static {
    __name(this, "DuplicateIdAria");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "duplicate-id-aria",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      scoreDisplayMode: axe_audit_default.SCORING_MODES.INFORMATIVE,
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var duplicate_id_aria_default = DuplicateIdAria;
export {
  UIStrings,
  duplicate_id_aria_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/duplicate-id-aria.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
