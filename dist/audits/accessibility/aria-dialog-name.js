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

// node_modules/lighthouse/core/audits/accessibility/aria-dialog-name.js
var UIStrings = {
  /** Title of an accessibility audit that evaluates if ARIA dialog elements have an accessible name. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: 'Elements with `role="dialog"` or `role="alertdialog"` have accessible names.',
  /** Title of an accessibility audit that evaluates if ARIA dialog elements do not have accessible names. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: 'Elements with `role="dialog"` or `role="alertdialog"` do not have accessible names.',
  /** Description of a Lighthouse audit that tells the user *why* they should have accessible names for ARIA dialog elements. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "ARIA dialog elements without accessible names may prevent screen readers users from discerning the purpose of these elements. [Learn how to make ARIA dialog elements more accessible](https://dequeuniversity.com/rules/axe/4.10/aria-dialog-name)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaDialogName = class extends axe_audit_default {
  static {
    __name(this, "AriaDialogName");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-dialog-name",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_dialog_name_default = AriaDialogName;
export {
  UIStrings,
  aria_dialog_name_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-dialog-name.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
