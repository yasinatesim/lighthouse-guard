import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/manual/managed-focus.js
var ManagedFocus = class extends manual_audit_default {
  static {
    __name(this, "ManagedFocus");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "managed-focus",
      description: "If new content, such as a dialog, is added to the page, the user's focus is directed to it. [Learn how to direct focus to new content](https://developer.chrome.com/docs/lighthouse/accessibility/managed-focus/).",
      title: "The user's focus is directed to new content added to the page"
    }, super.partialMeta);
  }
};
var managed_focus_default = ManagedFocus;
export {
  managed_focus_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/managed-focus.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
