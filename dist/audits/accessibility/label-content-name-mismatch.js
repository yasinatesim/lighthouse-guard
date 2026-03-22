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

// node_modules/lighthouse/core/audits/accessibility/label-content-name-mismatch.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if elements labeled through their content have their visible text as part of their accessible name. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Elements with visible text labels have matching accessible names.",
  /** Title of an accesibility audit that evaluates if elements labeled through their content have their visible text as part of their accessible name. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Elements with visible text labels do not have matching accessible names.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Visible text labels that do not match the accessible name can result in a confusing experience for screen reader users. [Learn more about accessible names](https://dequeuniversity.com/rules/axe/4.10/label-content-name-mismatch)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var LabelContentNameMismatch = class extends axe_audit_default {
  static {
    __name(this, "LabelContentNameMismatch");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "label-content-name-mismatch",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var label_content_name_mismatch_default = LabelContentNameMismatch;
export {
  UIStrings,
  label_content_name_mismatch_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/label-content-name-mismatch.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
