import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  JSBundlesComputed
} from "./chunk-QQ76V5R3.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";

// node_modules/lighthouse/core/audits/violation-audit.js
var ViolationAudit = class extends Audit {
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @param {RegExp} pattern
   * @return {Promise<Array<{source: LH.Audit.Details.SourceLocationValue}>>}
   */
  static async getViolationResults(artifacts, context, pattern) {
    const bundles = await JSBundlesComputed.request(artifacts, context);
    function filterUndefined(value) {
      return value !== void 0;
    }
    const seen = /* @__PURE__ */ new Set();
    return artifacts.ConsoleMessages.filter((entry) => entry.url && entry.source === "violation" && pattern.test(entry.text)).map((entry) => {
      const bundle = bundles.find((bundle2) => bundle2.script.scriptId === entry.scriptId);
      return Audit.makeSourceLocationFromConsoleMessage(entry, bundle);
    }).filter(filterUndefined).filter((source) => {
      const key = `${source.url}!${source.line}!${source.column}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map((source) => ({ source }));
  }
};
var violation_audit_default = ViolationAudit;

export {
  violation_audit_default
};
/*! Bundled license information:

lighthouse/core/audits/violation-audit.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
