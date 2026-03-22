import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  axe_audit_default
} from "../chunk-WENQTRMQ.js";
import {
  createIcuMessageFn
} from "../chunk-O3YNDXOX.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/accessibility/meta-refresh.js
var UIStrings = {
  /** Title of an accesibility audit that evaluates if the page uses a meta tag that refreshes the page automatically. This title is descriptive of the successful state and is shown to users when no user action is required. */
  title: 'The document does not use `<meta http-equiv="refresh">`',
  /** Title of an accesibility audit that evaluates if the page uses a meta tag that refreshes the page automatically. This title is descriptive of the failing state and is shown to users when there is a failure that needs to be addressed. */
  failureTitle: 'The document uses `<meta http-equiv="refresh">`',
  /** Description of a Lighthouse audit that tells the user *why* they should try to pass. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Users do not expect a page to refresh automatically, and doing so will move focus back to the top of the page. This may create a frustrating or confusing experience. [Learn more about the refresh meta tag](https://dequeuniversity.com/rules/axe/4.10/meta-refresh)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var MetaRefresh = class extends axe_audit_default {
  static {
    __name(this, "MetaRefresh");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "meta-refresh",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Accessibility"]
    };
  }
};
var meta_refresh_default = MetaRefresh;
export {
  UIStrings,
  meta_refresh_default as default
};
/*! Bundled license information:

lighthouse/core/audits/accessibility/meta-refresh.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
