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

// node_modules/lighthouse/core/audits/accessibility/aria-hidden-focus.js
var UIStrings = {
  /** Title of an accesibility audit that checks if all elements that have an aria-hidden attribute do not contain focusable descendent elements. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: '`[aria-hidden="true"]` elements do not contain focusable descendents',
  /** Title of an accesibility audit that checks if all elements that have an aria-hidden attribute do not contain focusable descendent elements. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: '`[aria-hidden="true"]` elements contain focusable descendents',
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: 'Focusable descendents within an `[aria-hidden="true"]` element prevent those interactive elements from being available to users of assistive technologies like screen readers. [Learn how `aria-hidden` affects focusable elements](https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus).'
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaHiddenFocus = class extends axe_audit_default {
  static {
    __name(this, "AriaHiddenFocus");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-hidden-focus",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_hidden_focus_default = AriaHiddenFocus;
export {
  UIStrings,
  aria_hidden_focus_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-hidden-focus.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
