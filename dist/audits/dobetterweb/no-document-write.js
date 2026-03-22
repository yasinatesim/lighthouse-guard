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

// node_modules/lighthouse/core/audits/dobetterweb/no-document-write.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the page's use of the `document.write` API. This descriptive title is shown to users when the page does not use `document.write`. */
  title: "Avoids `document.write()`",
  /** Title of a Lighthouse audit that provides detail on the page's use of the `document.write` API. This imperative title is shown to users when the page does use `document.write`. */
  failureTitle: "Avoid `document.write()`",
  /** Description of a Lighthouse audit that tells the user why they should avoid `document.write`. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "For users on slow connections, external scripts dynamically injected via `document.write()` can delay page load by tens of seconds. [Learn how to avoid document.write()](https://developer.chrome.com/docs/lighthouse/best-practices/no-document-write/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var NoDocWriteAudit = class extends violation_audit_default {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "no-document-write",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      guidanceLevel: 2,
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
    const results = await violation_audit_default.getViolationResults(artifacts, context, /document\.write/);
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
var no_document_write_default = NoDocWriteAudit;
export {
  UIStrings2 as UIStrings,
  no_document_write_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/no-document-write.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
