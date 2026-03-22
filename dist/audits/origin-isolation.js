import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
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
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/origin-isolation.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that evaluates the security of a page's COOP header for origin isolation. "COOP" stands for "Cross-Origin-Opener-Policy" and should not be translated. */
  title: "Ensure proper origin isolation with COOP",
  /** Description of a Lighthouse audit that evaluates the security of a page's COOP header for origin isolation. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. "COOP" stands for "Cross-Origin-Opener-Policy", neither should be translated. */
  description: "The Cross-Origin-Opener-Policy (COOP) can be used to isolate the top-level window from other documents such as pop-ups. [Learn more about deploying the COOP header.](https://web.dev/articles/why-coop-coep#coop)",
  /** Summary text for the results of a Lighthouse audit that evaluates the COOP header for origin isolation. This is displayed if no COOP header is deployed. "COOP" stands for "Cross-Origin-Opener-Policy" and should not be translated. */
  noCoop: "No COOP header found",
  /** Table item value calling out the presence of a syntax error. */
  invalidSyntax: "Invalid syntax",
  /** Label for a column in a data table; entries will be a directive of the COOP header. "COOP" stands for "Cross-Origin-Opener-Policy". */
  columnDirective: "Directive",
  /** Label for a column in a data table; entries will be the severity of an issue with the COOP header. "COOP" stands for "Cross-Origin-Opener-Policy". */
  columnSeverity: "Severity"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var OriginIsolation = class extends Audit {
  static {
    __name(this, "OriginIsolation");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "origin-isolation",
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
  static async getRawCoop(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    let coopHeaders = mainResource.responseHeaders.filter((h) => {
      return h.name.toLowerCase() === "cross-origin-opener-policy";
    }).flatMap((h) => h.value);
    coopHeaders = coopHeaders.map((v) => v.toLowerCase().replace(/\s/g, ""));
    return coopHeaders;
  }
  /**
   * @param {string | undefined} coopDirective
   * @param {LH.IcuMessage | string} findingDescription
   * @param {LH.IcuMessage=} severity
   * @return {LH.Audit.Details.TableItem}
   */
  static findingToTableItem(coopDirective, findingDescription, severity) {
    return {
      directive: coopDirective,
      description: findingDescription,
      severity
    };
  }
  /**
   * @param {string[]} coopHeaders
   * @return {{score: number, results: LH.Audit.Details.TableItem[]}}
   */
  static constructResults(coopHeaders) {
    const rawCoop = [...coopHeaders];
    const allowedDirectives = [
      "unsafe-none",
      "same-origin-allow-popups",
      "same-origin",
      "noopener-allow-popups"
    ];
    const violations = [];
    const syntax = [];
    if (!rawCoop.length) {
      violations.push({
        severity: str_(UIStrings.itemSeverityHigh),
        description: str_(UIStrings2.noCoop),
        directive: void 0
      });
    }
    for (const actualDirective of coopHeaders) {
      if (!allowedDirectives.includes(actualDirective)) {
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
    const coopHeaders = await this.getRawCoop(artifacts, context);
    const { score, results } = this.constructResults(coopHeaders);
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
var origin_isolation_default = OriginIsolation;
export {
  UIStrings2 as UIStrings,
  origin_isolation_default as default
};
/*! Bundled license information:

lighthouse/core/audits/origin-isolation.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
