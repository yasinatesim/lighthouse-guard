import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/manual/focusable-controls.js
var FocusableControls = class extends manual_audit_default {
  static {
    __name(this, "FocusableControls");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "focusable-controls",
      description: "Custom interactive controls are keyboard focusable and display a focus indicator. [Learn how to make custom controls focusable](https://developer.chrome.com/docs/lighthouse/accessibility/focusable-controls/).",
      title: "Interactive controls are keyboard focusable"
    }, super.partialMeta);
  }
};
var focusable_controls_default = FocusableControls;
export {
  focusable_controls_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/focusable-controls.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
