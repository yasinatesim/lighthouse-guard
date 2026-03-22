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

// node_modules/lighthouse/core/audits/accessibility/form-field-multiple-labels.js
var UIStrings = {
  /** Title of an accesibility audit that checks if any form fields have multiple label elements. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "No form fields have multiple labels",
  /** Title of an accesibility audit that checks if any form fields have multiple label elements. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Form fields have multiple labels",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Form fields with multiple labels can be confusingly announced by assistive technologies like screen readers which use either the first, the last, or all of the labels. [Learn how to use form labels](https://dequeuniversity.com/rules/axe/4.10/form-field-multiple-labels)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var FormFieldMultipleLabels = class extends axe_audit_default {
  static {
    __name(this, "FormFieldMultipleLabels");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "form-field-multiple-labels",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      scoreDisplayMode: axe_audit_default.SCORING_MODES.INFORMATIVE,
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var form_field_multiple_labels_default = FormFieldMultipleLabels;
export {
  UIStrings,
  form_field_multiple_labels_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/form-field-multiple-labels.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
