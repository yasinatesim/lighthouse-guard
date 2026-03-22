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

// node_modules/lighthouse/core/audits/accessibility/valid-lang.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all lang HTML attributes are valid BCP 47 languages. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`[lang]` attributes have a valid value",
  /** Title of an accesibility audit that evaluates if all lang HTML attributes are valid BCP 47 languages. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`[lang]` attributes do not have a valid value",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) on elements helps ensure that text is pronounced correctly by a screen reader. [Learn how to use the `lang` attribute](https://dequeuniversity.com/rules/axe/4.10/valid-lang)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var ValidLang = class extends axe_audit_default {
  static {
    __name(this, "ValidLang");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "valid-lang",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var valid_lang_default = ValidLang;
export {
  UIStrings,
  valid_lang_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/valid-lang.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
