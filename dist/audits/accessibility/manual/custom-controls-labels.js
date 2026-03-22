import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/manual/custom-controls-labels.js
var CustomControlsLabels = class extends manual_audit_default {
  static {
    __name(this, "CustomControlsLabels");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "custom-controls-labels",
      description: "Custom interactive controls have associated labels, provided by aria-label or aria-labelledby. [Learn more about custom controls and labels](https://developer.chrome.com/docs/lighthouse/accessibility/custom-controls-labels/).",
      title: "Custom controls have associated labels"
    }, super.partialMeta);
  }
};
var custom_controls_labels_default = CustomControlsLabels;
export {
  custom_controls_labels_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/custom-controls-labels.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
