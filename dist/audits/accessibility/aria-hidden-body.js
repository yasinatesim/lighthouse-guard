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

// node_modules/lighthouse/core/audits/accessibility/aria-hidden-body.js
var UIStrings = {
  /** Title of an accesibility audit that checks if the html <body> element does not have an aria-hidden attribute set on it. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: '`[aria-hidden="true"]` is not present on the document `<body>`',
  /** Title of an accesibility audit that checks if the html <body> element does not have an aria-hidden attribute set on it. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: '`[aria-hidden="true"]` is present on the document `<body>`',
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: 'Assistive technologies, like screen readers, work inconsistently when `aria-hidden="true"` is set on the document `<body>`. [Learn how `aria-hidden` affects the document body](https://dequeuniversity.com/rules/axe/4.10/aria-hidden-body).'
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var AriaHiddenBody = class extends axe_audit_default {
  static {
    __name(this, "AriaHiddenBody");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "aria-hidden-body",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var aria_hidden_body_default = AriaHiddenBody;
export {
  UIStrings,
  aria_hidden_body_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/aria-hidden-body.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
