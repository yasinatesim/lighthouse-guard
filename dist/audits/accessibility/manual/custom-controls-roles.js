import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/manual/custom-controls-roles.js
var CustomControlsRoles = class extends manual_audit_default {
  static {
    __name(this, "CustomControlsRoles");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "custom-controls-roles",
      description: "Custom interactive controls have appropriate ARIA roles. [Learn how to add roles to custom controls](https://developer.chrome.com/docs/lighthouse/accessibility/custom-control-roles/).",
      title: "Custom controls have ARIA roles"
    }, super.partialMeta);
  }
};
var custom_controls_roles_default = CustomControlsRoles;
export {
  custom_controls_roles_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/custom-controls-roles.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
