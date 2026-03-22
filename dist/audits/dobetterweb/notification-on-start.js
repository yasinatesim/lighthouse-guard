import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  violation_audit_default
} from "../chunk-UWRQ4V42.js";
import "../chunk-QMRXOAX7.js";
import "../chunk-I4AAD5AR.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-O3YNDXOX.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/dobetterweb/notification-on-start.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the page's notification permission requests. This descriptive title is shown to users when the page does not ask for notification permission on load. */
  title: "Avoids requesting the notification permission on page load",
  /** Title of a Lighthouse audit that provides detail on the page's notification permission requests. This descriptive title is shown to users when the page does ask for notification permission on load. */
  failureTitle: "Requests the notification permission on page load",
  /** Description of a Lighthouse audit that tells the user why they should not ask for notification permission on load. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Users are mistrustful of or confused by sites that request to send notifications without context. Consider tying the request to user gestures instead. [Learn more about responsibly getting permission for notifications](https://developer.chrome.com/docs/lighthouse/best-practices/notification-on-start/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var NotificationOnStart = class extends violation_audit_default {
  static {
    __name(this, "NotificationOnStart");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "notification-on-start",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      supportedModes: ["navigation"],
      requiredArtifacts: ["ConsoleMessages", "SourceMaps", "Scripts"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const results = await violation_audit_default.getViolationResults(artifacts, context, /notification permission/);
    const headings = [
      { key: "source", valueType: "source-location", label: str_(UIStrings.columnSource) }
    ];
    const details = violation_audit_default.makeTableDetails(headings, results);
    return {
      score: Number(results.length === 0),
      details
    };
  }
};
var notification_on_start_default = NotificationOnStart;
export {
  UIStrings2 as UIStrings,
  notification_on_start_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/notification-on-start.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
