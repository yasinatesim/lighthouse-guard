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

// node_modules/lighthouse/core/audits/dobetterweb/uses-passive-event-listeners.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the page's use of passive event listeners used to improve the scrolling performance of the page. This descriptive title is shown to users when the page does use passive listeners. */
  title: "Uses passive listeners to improve scrolling performance",
  /** Title of a Lighthouse audit that provides detail on the page's use of passive event listeners used to improve the scrolling performance of the page. This descriptive title is shown to users when the page does not use passive listeners. */
  failureTitle: "Does not use passive listeners to improve scrolling performance",
  /** Description of a Lighthouse audit that tells the user why they should use passive event listeners on the page. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Consider marking your touch and wheel event listeners as `passive` to improve your page's scroll performance. [Learn more about adopting passive event listeners](https://developer.chrome.com/docs/lighthouse/best-practices/uses-passive-event-listeners/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var PassiveEventsAudit = class extends violation_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-passive-event-listeners",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["ConsoleMessages", "SourceMaps", "Scripts"],
      scoreDisplayMode: violation_audit_default.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const results = await violation_audit_default.getViolationResults(artifacts, context, /passive event listener/);
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
var uses_passive_event_listeners_default = PassiveEventsAudit;
export {
  UIStrings2 as UIStrings,
  uses_passive_event_listeners_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/uses-passive-event-listeners.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
