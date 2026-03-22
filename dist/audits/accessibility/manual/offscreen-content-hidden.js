import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-6IL5MRWZ.js";
import "../../chunk-55A4MDN3.js";
import "../../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/accessibility/manual/offscreen-content-hidden.js
var OffscreenContentHidden = class extends manual_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "offscreen-content-hidden",
      description: "Offscreen content is hidden with display: none or aria-hidden=true. [Learn how to properly hide offscreen content](https://developer.chrome.com/docs/lighthouse/accessibility/offscreen-content-hidden/).",
      title: "Offscreen content is hidden from assistive technology"
    }, super.partialMeta);
  }
};
var offscreen_content_hidden_default = OffscreenContentHidden;
export {
  offscreen_content_hidden_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/manual/offscreen-content-hidden.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
