import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  violation_audit_default
} from "../chunk-ZKWZVC2F.js";
import "../chunk-QQ76V5R3.js";
import "../chunk-3KEMYTTF.js";
import "../chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/dobetterweb/geolocation-on-start.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on geolocation permission requests while the page is loading. This descriptive title is shown to users when the page does not ask for geolocation permissions on load. */
  title: "Avoids requesting the geolocation permission on page load",
  /** Title of a Lighthouse audit that provides detail on geolocation permissions requests. This descriptive title is shown to users when the page does ask for geolocation permissions on load. */
  failureTitle: "Requests the geolocation permission on page load",
  /** Description of a Lighthouse audit that tells the user why they should not ask for geolocation permissions on load. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Users are mistrustful of or confused by sites that request their location without context. Consider tying the request to a user action instead. [Learn more about the geolocation permission](https://developer.chrome.com/docs/lighthouse/best-practices/geolocation-on-start/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var GeolocationOnStart = class extends violation_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "geolocation-on-start",
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
    const results = await violation_audit_default.getViolationResults(artifacts, context, /geolocation/);
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
var geolocation_on_start_default = GeolocationOnStart;
export {
  UIStrings2 as UIStrings,
  geolocation_on_start_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/geolocation-on-start.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
