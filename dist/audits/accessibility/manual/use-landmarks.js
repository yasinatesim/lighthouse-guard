import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/manual/use-landmarks.js
var UseLandmarks = class extends manual_audit_default {
  static {
    __name(this, "UseLandmarks");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "use-landmarks",
      description: "Landmark elements (`<main>`, `<nav>`, etc.) are used to improve the keyboard navigation of the page for assistive technology. [Learn more about landmark elements](https://developer.chrome.com/docs/lighthouse/accessibility/use-landmarks/).",
      title: "HTML5 landmark elements are used to improve navigation"
    }, super.partialMeta);
  }
};
var use_landmarks_default = UseLandmarks;
export {
  use_landmarks_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/use-landmarks.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
