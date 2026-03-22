import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-6IL5MRWZ.js";
import "../../chunk-55A4MDN3.js";
import "../../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/accessibility/manual/logical-tab-order.js
var LogicalTabOrder = class extends manual_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "logical-tab-order",
      description: "Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen. [Learn more about logical tab ordering](https://developer.chrome.com/docs/lighthouse/accessibility/logical-tab-order/).",
      title: "The page has a logical tab order"
    }, super.partialMeta);
  }
};
var logical_tab_order_default = LogicalTabOrder;
export {
  logical_tab_order_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/logical-tab-order.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
