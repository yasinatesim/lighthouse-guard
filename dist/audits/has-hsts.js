import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "./chunk-32YVOUED.js";
import "./chunk-AB7S44AE.js";
import "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-4MZOSFEN.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/has-hsts.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that evaluates the security of a page's HSTS header. "HSTS" stands for "HTTP Strict Transport Security". */
  title: "Use a strong HSTS policy",
  /** Description of a Lighthouse audit that evaluates the security of a page's HSTS header. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. "HSTS" stands for "HTTP Strict Transport Security". */
  description: "Deployment of the HSTS header significantly reduces the risk of downgrading HTTP connections and eavesdropping attacks. A rollout in stages, starting with a low max-age is recommended. [Learn more about using a strong HSTS policy.](https://developer.chrome.com/docs/lighthouse/best-practices/has-hsts)",
  /** Summary text for the results of a Lighthouse audit that evaluates the HSTS header. This is displayed if no HSTS header is deployed. "HSTS" stands for "HTTP Strict Transport Security". */
  noHsts: "No HSTS header found",
  /** Summary text for the results of a Lighthouse audit that evaluates the HSTS header. This is displayed if the preload directive is missing. "HSTS" stands for "HTTP Strict Transport Security". */
  noPreload: "No `preload` directive found",
  /** Summary text for the results of a Lighthouse audit that evaluates the HSTS header. This is displayed if the includeSubDomains directive is missing. "HSTS" stands for "HTTP Strict Transport Security". */
  noSubdomain: "No `includeSubDomains` directive found",
  /** Summary text for the results of a Lighthouse audit that evaluates the HSTS header. This is displayed if the max-age directive is missing. "HSTS" stands for "HTTP Strict Transport Security". */
  noMaxAge: "No `max-age` directive",
  /** Summary text for the results of a Lighthouse audit that evaluates the HSTS header. This is displayed if the provided duration for the max-age directive is too low. "HSTS" stands for "HTTP Strict Transport Security". */
  lowMaxAge: "`max-age` is too low",
  /** Table item value calling out the presence of a syntax error. */
  invalidSyntax: "Invalid syntax",
  /** Label for a column in a data table; entries will be a directive of the HSTS header. "HSTS" stands for "HTTP Strict Transport Security". */
  columnDirective: "Directive",
  /** Label for a column in a data table; entries will be the severity of an issue with the HSTS header. "HSTS" stands for "HTTP Strict Transport Security". */
  columnSeverity: "Severity"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var HasHsts = class extends Audit {
  static {
    __name(this, "HasHsts");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "has-hsts",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["DevtoolsLog", "URL"],
      supportedModes: ["navigation"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<string[]>}
   */
  static async getRawHsts(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    let hstsHeaders = mainResource.responseHeaders.filter((h) => {
      return h.name.toLowerCase() === "strict-transport-security";
    }).flatMap((h) => h.value.split(";"));
    hstsHeaders = hstsHeaders.map((v) => v.toLowerCase().replace(/\s/g, ""));
    return hstsHeaders;
  }
  /**
   * @param {string} hstsDirective
   * @param {LH.IcuMessage | string} findingDescription
   * @param {LH.IcuMessage=} severity
   * @return {LH.Audit.Details.TableItem}
   */
  static findingToTableItem(hstsDirective, findingDescription, severity) {
    return {
      directive: hstsDirective,
      description: findingDescription,
      severity
    };
  }
  /**
   * @param {string[]} hstsHeaders
   * @return {{score: number, results: LH.Audit.Details.TableItem[]}}
   */
  static constructResults(hstsHeaders) {
    const rawHsts = [...hstsHeaders];
    const allowedDirectives = ["max-age", "includesubdomains", "preload"];
    const violations = [];
    const warnings = [];
    const syntax = [];
    if (!rawHsts.length) {
      return {
        score: 0,
        results: [{
          severity: str_(UIStrings.itemSeverityHigh),
          description: str_(UIStrings2.noHsts),
          directive: void 0
        }]
      };
    }
    if (!hstsHeaders.toString().includes("max-age")) {
      violations.push({
        severity: str_(UIStrings.itemSeverityHigh),
        description: str_(UIStrings2.noMaxAge),
        directive: "max-age"
      });
    }
    if (!hstsHeaders.toString().includes("includesubdomains")) {
      warnings.push({
        severity: str_(UIStrings.itemSeverityMedium),
        description: str_(UIStrings2.noSubdomain),
        directive: "includeSubDomains"
      });
    }
    if (!hstsHeaders.toString().includes("preload")) {
      warnings.push({
        severity: str_(UIStrings.itemSeverityMedium),
        description: str_(UIStrings2.noPreload),
        directive: "preload"
      });
    }
    for (const actualDirective of hstsHeaders) {
      if (actualDirective.includes("max-age") && parseInt(actualDirective.split("=")[1], 10) < 31536e3) {
        violations.push({
          severity: str_(UIStrings.itemSeverityHigh),
          description: str_(UIStrings2.lowMaxAge),
          directive: "max-age"
        });
      }
      if (!allowedDirectives.includes(actualDirective) && !actualDirective.includes("max-age")) {
        syntax.push({
          severity: str_(UIStrings.itemSeverityLow),
          description: str_(UIStrings2.invalidSyntax),
          directive: actualDirective
        });
      }
    }
    const results = [
      ...violations.map(
        (f) => this.findingToTableItem(
          f.directive,
          f.description,
          str_(UIStrings.itemSeverityHigh)
        )
      ),
      ...warnings.map(
        (f) => this.findingToTableItem(
          f.directive,
          f.description,
          str_(UIStrings.itemSeverityMedium)
        )
      ),
      ...syntax.map(
        (f) => this.findingToTableItem(
          f.directive,
          f.description,
          str_(UIStrings.itemSeverityLow)
        )
      )
    ];
    return { score: violations.length || syntax.length ? 0 : 1, results };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const hstsHeaders = await this.getRawHsts(artifacts, context);
    const { score, results } = this.constructResults(hstsHeaders);
    const headings = [
      /* eslint-disable max-len */
      { key: "description", valueType: "text", subItemsHeading: { key: "description" }, label: str_(UIStrings.columnDescription) },
      { key: "directive", valueType: "code", subItemsHeading: { key: "directive" }, label: str_(UIStrings2.columnDirective) },
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
var has_hsts_default = HasHsts;
export {
  UIStrings2 as UIStrings,
  has_hsts_default as default
};
/*! Bundled license information:

lighthouse/core/audits/has-hsts.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
