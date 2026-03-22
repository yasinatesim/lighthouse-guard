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

// node_modules/lighthouse/core/audits/accessibility/table-fake-caption.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all tables use caption instead of colspan to indicate a caption. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Tables use `<caption>` instead of cells with the `[colspan]` attribute to indicate a caption.",
  /** Title of an accesibility audit that evaluates if all tables use caption instead of colspan to indicate a caption. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Tables do not use `<caption>` instead of cells with the `[colspan]` attribute to indicate a caption.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Screen readers have features to make navigating tables easier. Ensuring that tables use the actual caption element instead of cells with the `[colspan]` attribute may improve the experience for screen reader users. [Learn more about captions](https://dequeuniversity.com/rules/axe/4.10/table-fake-caption)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var TableFakeCaption = class extends axe_audit_default {
  static {
    __name(this, "TableFakeCaption");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "table-fake-caption",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var table_fake_caption_default = TableFakeCaption;
export {
  UIStrings,
  table_fake_caption_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/table-fake-caption.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
