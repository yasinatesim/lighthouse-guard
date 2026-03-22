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

// node_modules/lighthouse/core/audits/accessibility/table-duplicate-name.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if tables have different content in the summary attribute and caption element. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Tables have different content in the summary attribute and `<caption>`.",
  /** Title of an accesibility audit that evaluates if tables have different content in the summary attribute and caption element. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Tables have the same content in the summary attribute and `<caption>.`",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "The summary attribute should describe the table structure, while `<caption>` should have the onscreen title. Accurate table mark-up helps users of screen readers. [Learn more about summary and caption](https://dequeuniversity.com/rules/axe/4.10/table-duplicate-name)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var TableDuplicateName = class extends axe_audit_default {
  static {
    __name(this, "TableDuplicateName");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "table-duplicate-name",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var table_duplicate_name_default = TableDuplicateName;
export {
  UIStrings,
  table_duplicate_name_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/table-duplicate-name.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
