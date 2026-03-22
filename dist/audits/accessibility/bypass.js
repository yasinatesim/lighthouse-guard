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

// node_modules/lighthouse/core/audits/accessibility/bypass.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if the page has elements that let screen reader users skip over repetitive content. `heading`, `skip link`, and `landmark region` are technical terms for the elements that enable quick page navigation. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "The page contains a heading, skip link, or landmark region",
  /** Title of an accesibility audit that evaluates if the page has elements that let screen reader users skip over repetitive content. `heading`, `skip link`, and `landmark region` are technical terms for the elements that enable quick page navigation. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "The page does not contain a heading, skip link, or landmark region",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Adding ways to bypass repetitive content lets keyboard users navigate the page more efficiently. [Learn more about bypass blocks](https://dequeuniversity.com/rules/axe/4.10/bypass)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var Bypass = class extends axe_audit_default {
  static {
    __name(this, "Bypass");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "bypass",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      scoreDisplayMode: axe_audit_default.SCORING_MODES.INFORMATIVE,
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var bypass_default = Bypass;
export {
  UIStrings,
  bypass_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/bypass.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
