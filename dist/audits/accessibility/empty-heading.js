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

// node_modules/lighthouse/core/audits/accessibility/empty-heading.js
var UIStrings = {
  /** Title of an accesibility audit that checks if all heading elements have content. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "All heading elements contain content.",
  /** Title of an accesibility audit that checks if all heading elements have content. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Heading elements do not contain content.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "A heading with no content or inaccessible text prevent screen reader users from accessing information on the page's structure. [Learn more about headings](https://dequeuniversity.com/rules/axe/4.10/empty-heading)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var EmptyHeading = class extends axe_audit_default {
  static {
    __name(this, "EmptyHeading");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "empty-heading",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      scoreDisplayMode: axe_audit_default.SCORING_MODES.INFORMATIVE,
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var empty_heading_default = EmptyHeading;
export {
  UIStrings,
  empty_heading_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/empty-heading.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
