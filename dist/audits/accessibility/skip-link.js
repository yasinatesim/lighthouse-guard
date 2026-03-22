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

// node_modules/lighthouse/core/audits/accessibility/skip-link.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if the skip link is focusable. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Skip links are focusable.",
  /** Title of an accesibility audit that evaluates if the skip link is focusable. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Skip links are not focusable.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Including a skip link can help users skip to the main content to save time. [Learn more about skip links](https://dequeuniversity.com/rules/axe/4.10/skip-link)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var SkipLink = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "skip-link",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var skip_link_default = SkipLink;
export {
  UIStrings,
  skip_link_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/skip-link.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
