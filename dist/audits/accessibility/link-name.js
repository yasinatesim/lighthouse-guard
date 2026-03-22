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

// node_modules/lighthouse/core/audits/accessibility/link-name.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all link elements have a non-generic name to screen readers. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Links have a discernible name",
  /** Title of an accesibility audit that evaluates if all link elements have a non-generic name to screen readers. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Links do not have a discernible name",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. [Learn how to make links accessible](https://dequeuniversity.com/rules/axe/4.10/link-name)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var LinkName = class extends axe_audit_default {
  static {
    __name(this, "LinkName");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "link-name",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var link_name_default = LinkName;
export {
  UIStrings,
  link_name_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/link-name.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
