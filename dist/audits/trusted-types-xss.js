import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  parseCsp,
  require_csp
} from "./chunk-ULQ3IVHQ.js";
import {
  MainResourceComputed
} from "./chunk-HZ5CS3EU.js";
import "./chunk-YOYAIZOW.js";
import "./chunk-OZ2G5ZKT.js";
import "./chunk-EBBYNBKM.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-O3YNDXOX.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-DQQIQ7YS.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name,
  __toESM
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/trusted-types-xss.js
var import_csp = __toESM(require_csp(), 1);
var UIStrings2 = {
  /** Title of a Lighthouse audit that evaluates whether the set CSP header and Trusted Types directive is mitigating DOM-based XSS. "CSP" stands for "Content-Security-Policy" and should not be translated. "XSS" stands for "Cross Site Scripting" and should not be translated. */
  title: "Mitigate DOM-based XSS with Trusted Types",
  /** Description of a Lighthouse audit that evaluates whether the set CSP header and Trusted Types directive is mitigating DOM-based XSS. This is displayed after a user expands the section to see more. "CSP" stands for "Content-Security-Policy" and should not be translated. "XSS" stands for "Cross Site Scripting" and should not be translated. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "The `require-trusted-types-for` directive in the `Content-Security-Policy` (CSP) header instructs user agents to control the data passed to DOM XSS sink functions. [Learn more about mitigating DOM-based XSS with Trusted Types](https://developer.chrome.com/docs/lighthouse/best-practices/trusted-types-xss).",
  /** Summary text for the results of a Lighthouse audit that evaluates whether the set CSP header and Trusted Types directive is mitigating DOM-based XSS. This text is displayed if the page does not respond with a CSP header and a Trusted Types directive. "CSP" stands for "Content-Security-Policy" and should not be translated. "XSS" stands for "Cross Site Scripting" and should not be translated. */
  noTrustedTypesToMitigateXss: "No `Content-Security-Policy` header with Trusted Types directive found",
  /** Label for a column in a data table; entries will be the severity of an issue with the page's CSP and Trusted Types directive. */
  columnSeverity: "Severity"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var TrustedTypesXss = class extends Audit {
  static {
    __name(this, "TrustedTypesXss");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "trusted-types-xss",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["DevtoolsLog", "MetaElements", "URL"],
      supportedModes: ["navigation"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<{cspHeaders: string[], cspMetaTags: string[]}>}
   */
  static async getRawCsps(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    const cspMetaTags = artifacts.MetaElements.filter((m) => {
      return m.httpEquiv && m.httpEquiv.toLowerCase() === "content-security-policy";
    }).flatMap((m) => (m.content || "").split(",")).filter((rawCsp) => rawCsp.replace(/\s/g, ""));
    const cspHeaders = mainResource.responseHeaders.filter((h) => {
      return h.name.toLowerCase() === "content-security-policy";
    }).flatMap((h) => h.value.split(",")).filter((rawCsp) => rawCsp.replace(/\s/g, ""));
    return { cspHeaders, cspMetaTags };
  }
  /**
   * @param {LH.IcuMessage | string} findingDescription
   * @param {LH.IcuMessage=} severity
   * @return {LH.Audit.Details.TableItem}
   */
  static findingToTableItem(findingDescription, severity) {
    return {
      description: findingDescription,
      severity
    };
  }
  /**
   * @param {string[]} cspHeaders
   * @param {string[]} cspMetaTags
   * @return {{score: number, results: LH.Audit.Details.TableItem[]}}
   */
  static constructResults(cspHeaders, cspMetaTags) {
    const rawCsps = [...cspHeaders, ...cspMetaTags];
    const parsedCsps = rawCsps.map(parseCsp);
    for (const pc of parsedCsps) {
      const directiveValues = pc.directives[pc.getEffectiveDirective(
        import_csp.Directive.REQUIRE_TRUSTED_TYPES_FOR
      )] || [];
      if (directiveValues.includes("'script'")) {
        return { score: 1, results: [] };
      }
    }
    return {
      score: 0,
      results: [{
        severity: str_(UIStrings.itemSeverityHigh),
        description: str_(UIStrings2.noTrustedTypesToMitigateXss)
      }]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const { cspHeaders, cspMetaTags } = await this.getRawCsps(artifacts, context);
    const { score, results } = this.constructResults(cspHeaders, cspMetaTags);
    const headings = [
      /* eslint-disable max-len */
      { key: "description", valueType: "text", subItemsHeading: { key: "description" }, label: str_(UIStrings.columnDescription) },
      { key: "severity", valueType: "text", subItemsHeading: { key: "severity" }, label: str_(UIStrings2.columnSeverity) }
      /* eslint-enable max-len */
    ];
    const details = Audit.makeTableDetails(headings, results);
    return {
      score,
      notApplicable: !results.length,
      details
    };
  }
};
var trusted_types_xss_default = TrustedTypesXss;
export {
  UIStrings2 as UIStrings,
  trusted_types_xss_default as default
};
/*! Bundled license information:

lighthouse/core/audits/trusted-types-xss.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
