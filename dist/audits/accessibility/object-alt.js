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

// node_modules/lighthouse/core/audits/accessibility/object-alt.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all object elements have an alt HTML attribute that describes their contents. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`<object>` elements have alternate text",
  /** Title of an accesibility audit that evaluates if all object elements have an alt HTML attribute that describes their contents. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`<object>` elements do not have alternate text",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Screen readers cannot translate non-text content. Adding alternate text to `<object>` elements helps screen readers convey meaning to users. [Learn more about alt text for `object` elements](https://dequeuniversity.com/rules/axe/4.10/object-alt)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var ObjectAlt = class extends axe_audit_default {
  static {
    __name(this, "ObjectAlt");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "object-alt",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var object_alt_default = ObjectAlt;
export {
  UIStrings,
  object_alt_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/object-alt.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
