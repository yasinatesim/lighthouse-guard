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

// node_modules/lighthouse/core/audits/accessibility/aria-text.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if elements with `role=text` have no focusable descendents. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Elements with the `role=text` attribute do not have focusable descendents.",
  /** Title of an accesibility audit that evaluates if elements with `role=text` have focusable descendents. This title is descriptive of the successful state and is shown to users when no user action is required. */
  failureTitle: "Elements with the `role=text` attribute do have focusable descendents.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Adding `role=text` around a text node split by markup enables VoiceOver to treat it as one phrase, but the element's focusable descendents will not be announced. [Learn more about the `role=text` attribute](https://dequeuniversity.com/rules/axe/4.10/aria-text)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaText = class extends axe_audit_default {
  static {
    __name(this, "AriaText");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-text",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_text_default = AriaText;
export {
  UIStrings,
  aria_text_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-text.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
