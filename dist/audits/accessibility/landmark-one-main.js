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

// node_modules/lighthouse/core/audits/accessibility/landmark-one-main.js
var UIStrings = {
  /** Title of an accesibility audit that checks if the document has a main landmark. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "Document has a main landmark.",
  /** Title of an accesibility audit that checks if the document has a main landmark. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "Document does not have a main landmark.",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.10/landmark-one-main)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var LandmarkOneMain = class extends axe_audit_default {
  static {
    __name(this, "LandmarkOneMain");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "landmark-one-main",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      scoreDisplayMode: axe_audit_default.SCORING_MODES.INFORMATIVE,
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var landmark_one_main_default = LandmarkOneMain;
export {
  UIStrings,
  landmark_one_main_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/landmark-one-main.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
