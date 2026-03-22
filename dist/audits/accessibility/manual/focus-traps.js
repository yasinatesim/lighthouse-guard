import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/manual/focus-traps.js
var FocusTraps = class extends manual_audit_default {
  static {
    __name(this, "FocusTraps");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "focus-traps",
      description: "A user can tab into and out of any control or region without accidentally trapping their focus. [Learn how to avoid focus traps](https://developer.chrome.com/docs/lighthouse/accessibility/focus-traps/).",
      title: "User focus is not accidentally trapped in a region"
    }, super.partialMeta);
  }
};
var focus_traps_default = FocusTraps;
export {
  focus_traps_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/focus-traps.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
