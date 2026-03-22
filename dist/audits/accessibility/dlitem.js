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

// node_modules/lighthouse/core/audits/accessibility/dlitem.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all definition list item elements (`<dt>`/`<dd>`) have a definition list parent element (`<dl>`). This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Definition list items are wrapped in `<dl>` elements",
  /** Title of an accesibility audit that evaluates if all definition list item elements (`<dt>`/`<dd>`) have a definition list parent element (`<dl>`). This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Definition list items are not wrapped in `<dl>` elements",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Definition list items (`<dt>` and `<dd>`) must be wrapped in a parent `<dl>` element to ensure that screen readers can properly announce them. [Learn how to structure definition lists correctly](https://dequeuniversity.com/rules/axe/4.10/dlitem)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var DLItem = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "dlitem",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var dlitem_default = DLItem;
export {
  UIStrings,
  dlitem_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/dlitem.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
