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

// node_modules/lighthouse/core/audits/accessibility/html-lang-valid.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if the value for root HTML tag's lang attribute is a valid BCP 47 language. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`<html>` element has a valid value for its `[lang]` attribute",
  /** Title of an accesibility audit that evaluates if the value for root HTML tag's lang attribute is a valid BCP 47 language. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`<html>` element does not have a valid value for its `[lang]` attribute.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) helps screen readers announce text properly. [Learn how to use the `lang` attribute](https://dequeuniversity.com/rules/axe/4.10/html-lang-valid)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var HTMLLangValid = class extends axe_audit_default {
  static {
    __name(this, "HTMLLangValid");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "html-lang-valid",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var html_lang_valid_default = HTMLLangValid;
export {
  UIStrings,
  html_lang_valid_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/html-lang-valid.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
