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

// node_modules/lighthouse/core/audits/accessibility/heading-order.js
var UIStrings = {
  /** Title of an accesibility audit that checks if heading elements (<h1>, <h2>, etc) appear in numeric order and only ever increase in steps of 1. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Heading elements appear in a sequentially-descending order",
  /** Title of an accesibility audit that checks if heading elements (<h1>, <h2>, etc) appear in numeric order and only ever increase in steps of 1. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Heading elements are not in a sequentially-descending order",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.10/heading-order)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var HeadingOrder = class extends axe_audit_default {
  static {
    __name(this, "HeadingOrder");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "heading-order",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var heading_order_default = HeadingOrder;
export {
  UIStrings,
  heading_order_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/heading-order.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
