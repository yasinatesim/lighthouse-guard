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

// node_modules/lighthouse/core/audits/accessibility/th-has-data-cells.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all table header elements have children. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: '`<th>` elements and elements with `[role="columnheader"/"rowheader"]` have data cells they describe.',
  /** Title of an accesibility audit that evaluates if all table header elements have children. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: '`<th>` elements and elements with `[role="columnheader"/"rowheader"]` do not have data cells they describe.',
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Screen readers have features to make navigating tables easier. Ensuring table headers always refer to some set of cells may improve the experience for screen reader users. [Learn more about table headers](https://dequeuniversity.com/rules/axe/4.10/th-has-data-cells)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var THHasDataCells = class extends axe_audit_default {
  static {
    __name(this, "THHasDataCells");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "th-has-data-cells",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      scoreDisplayMode: axe_audit_default.SCORING_MODES.INFORMATIVE,
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var th_has_data_cells_default = THHasDataCells;
export {
  UIStrings,
  th_has_data_cells_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/th-has-data-cells.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
