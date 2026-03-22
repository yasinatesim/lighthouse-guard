import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/manual/visual-order-follows-dom.js
var VisualOrderFollowsDOM = class extends manual_audit_default {
  static {
    __name(this, "VisualOrderFollowsDOM");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "visual-order-follows-dom",
      description: "DOM order matches the visual order, improving navigation for assistive technology. [Learn more about DOM and visual ordering](https://developer.chrome.com/docs/lighthouse/accessibility/visual-order-follows-dom/).",
      title: "Visual order on the page follows DOM order"
    }, super.partialMeta);
  }
};
var visual_order_follows_dom_default = VisualOrderFollowsDOM;
export {
  visual_order_follows_dom_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/visual-order-follows-dom.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
