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

// node_modules/lighthouse/core/audits/accessibility/identical-links-same-purpose.js
var UIStrings = {
  /** Title of an accesibility audit that checks if identical links have the same purpose. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Identical links have the same purpose.",
  /** Title of an accesibility audit that checks if identical links have the same purpose. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Identical links do not have the same purpose.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Links with the same destination should have the same description, to help users understand the link's purpose and decide whether to follow it. [Learn more about identical links](https://dequeuniversity.com/rules/axe/4.10/identical-links-same-purpose)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var IdenticalLinksSamePurpose = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "identical-links-same-purpose",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      scoreDisplayMode: axe_audit_default.SCORING_MODES.INFORMATIVE,
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var identical_links_same_purpose_default = IdenticalLinksSamePurpose;
export {
  UIStrings,
  identical_links_same_purpose_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/identical-links-same-purpose.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
