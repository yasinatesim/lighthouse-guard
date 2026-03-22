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

// node_modules/lighthouse/core/audits/accessibility/link-in-text-block.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all link elements can be distinguished without relying on color. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Links are distinguishable without relying on color.",
  /** Title of an accesibility audit that evaluates if all link elements can be distinguished without relying on color. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Links rely on color to be distinguishable.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Low-contrast text is difficult or impossible for many users to read. Link text that is discernible improves the experience for users with low vision. [Learn how to make links distinguishable](https://dequeuniversity.com/rules/axe/4.10/link-in-text-block)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var LinkInTextBlock = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "link-in-text-block",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var link_in_text_block_default = LinkInTextBlock;
export {
  UIStrings,
  link_in_text_block_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/link-in-text-block.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
