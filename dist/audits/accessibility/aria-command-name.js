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

// node_modules/lighthouse/core/audits/accessibility/aria-command-name.js
var UIStrings = {
  /** Title of an accessibility audit that evaluates if important HTML elements have an accessible name. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`button`, `link`, and `menuitem` elements have accessible names",
  /** Title of an accessibility audit that evaluates if important HTML elements do not have accessible names. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`button`, `link`, and `menuitem` elements do not have accessible names.",
  /** Description of a Lighthouse audit that tells the user *why* they should have accessible names for HTML elements. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "When an element doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn how to make command elements more accessible](https://dequeuniversity.com/rules/axe/4.10/aria-command-name)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaCommandName = class extends axe_audit_default {
  static {
    __name(this, "AriaCommandName");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-command-name",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_command_name_default = AriaCommandName;
export {
  UIStrings,
  aria_command_name_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-command-name.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
