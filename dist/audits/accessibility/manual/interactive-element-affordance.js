import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/manual/interactive-element-affordance.js
var InteractiveElementAffordance = class extends manual_audit_default {
  static {
    __name(this, "InteractiveElementAffordance");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "interactive-element-affordance",
      description: "Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements. [Learn how to decorate interactive elements with affordance hints](https://developer.chrome.com/docs/lighthouse/accessibility/interactive-element-affordance/).",
      title: "Interactive elements indicate their purpose and state"
    }, super.partialMeta);
  }
};
var interactive_element_affordance_default = InteractiveElementAffordance;
export {
  interactive_element_affordance_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/interactive-element-affordance.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
