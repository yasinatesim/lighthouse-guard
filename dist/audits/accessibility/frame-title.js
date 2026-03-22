import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  axe_audit_default
} from "../chunk-DZC7VBO4.js";
import {
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/accessibility/frame-title.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if all `<frame>` and `<iframe>` elements on the page have a title HTML attribute to describe their contents. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: "`<frame>` or `<iframe>` elements have a title",
  /** Title of an accesibility audit that evaluates if all `<frame>` and `<iframe>` elements on the page have a title HTML attribute to describe their contents. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: "`<frame>` or `<iframe>` elements do not have a title",
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Screen reader users rely on frame titles to describe the contents of frames. [Learn more about frame titles](https://dequeuniversity.com/rules/axe/4.10/frame-title)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var FrameTitle = class extends axe_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "frame-title",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var frame_title_default = FrameTitle;
export {
  UIStrings,
  frame_title_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/frame-title.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
