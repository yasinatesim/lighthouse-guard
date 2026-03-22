import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  axe_audit_default
} from "../chunk-DZC7VBO4.js";
import {
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/accessibility/html-xml-lang-mismatch.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if the xml:lang attribute, if present, has the same base language as the `lang` attribute. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`<html>` element has an `[xml:lang]` attribute with the same base language as the `[lang]` attribute.",
  /** Title of an accesibility audit that evaluates if the xml:lang attribute, if present, has the same base language as the `lang` attribute. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`<html>` element does not have an `[xml:lang]` attribute with the same base language as the `[lang]` attribute.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "If the webpage does not specify a consistent language, then the screen reader might not announce the page's text correctly. [Learn more about the `lang` attribute](https://dequeuniversity.com/rules/axe/4.10/html-xml-lang-mismatch)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var HTMLXMLLangMismatch = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "html-xml-lang-mismatch",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var html_xml_lang_mismatch_default = HTMLXMLLangMismatch;
export {
  UIStrings,
  html_xml_lang_mismatch_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/html-xml-lang-mismatch.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
