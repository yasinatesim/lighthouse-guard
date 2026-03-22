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

// node_modules/lighthouse/core/audits/clickjacking-mitigation.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that evaluates whether the set CSP or XFO header is mitigating clickjacking attacks. "XFO" stands for "X-Frame-Options" and should not be translated. "CSP" stands for "Content-Security-Policy" and should not be translated. "clickjacking" should not be translated. */
  title: "Mitigate clickjacking with XFO or CSP",
  /** Description of a Lighthouse audit that evaluates whether the set CSP or XFO header is mitigating clickjacking attacks. This is displayed after a user expands the section to see more. "clickjacking" should not be translated. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. "XFO" stands for "X-Frame-Options" and should not be translated. "CSP" stands for "Content-Security-Policy" and should not be translated. */
  description: "The `X-Frame-Options` (XFO) header or the `frame-ancestors` directive in the `Content-Security-Policy` (CSP) header control where a page can be embedded. These can mitigate clickjacking attacks by blocking some or all sites from embedding the page. [Learn more about mitigating clickjacking](https://developer.chrome.com/docs/lighthouse/best-practices/clickjacking-mitigation).",
  /** Summary text for the results of a Lighthouse audit that evaluates whether the page is mitigating clickjacking attacks with a frame control policy. This text is displayed if the page does not control how it can be embedded on other pages. */
  noClickjackingMitigation: "No frame control policy found",
  /** Label for a column in a data table; entries will be the severity of an issue with the page's frame control policy. */
  columnSeverity: "Severity"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var ClickjackingMitigation = class extends Audit {
  static {
    __name(this, "ClickjackingMitigation");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "clickjacking-mitigation",
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
   * @return {Promise<{cspHeaders: string[], xfoHeaders: string[]}>}
   */
  static async getRawCspsAndXfo(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    const cspHeaders = mainResource.responseHeaders.filter((h) => {
      return h.name.toLowerCase() === "content-security-policy";
    }).flatMap((h) => h.value.split(",")).filter((rawCsp) => rawCsp.replace(/\s/g, ""));
    let xfoHeaders = mainResource.responseHeaders.filter((h) => {
      return h.name.toLowerCase() === "x-frame-options";
    }).flatMap((h) => h.value);
    xfoHeaders = xfoHeaders.map((v) => v.toLowerCase().replace(/\s/g, ""));
    return { cspHeaders, xfoHeaders };
  }
  /**
   * @param {string | undefined} directive
   * @param {LH.IcuMessage | string} findingDescription
   * @param {LH.IcuMessage=} severity
   * @return {LH.Audit.Details.TableItem}
   */
  static findingToTableItem(directive, findingDescription, severity) {
    return {
      description: findingDescription,
      severity
    };
  }
  /**
   * @param {string[]} cspHeaders
   * @param {string[]} xfoHeaders
   * @return {{score: number, results: LH.Audit.Details.TableItem[]}}
   */
  static constructResults(cspHeaders, xfoHeaders) {
    const allowedDirectives = ["deny", "sameorigin"];
    for (const cspHeader of cspHeaders) {
      if (cspHeader.includes("frame-ancestors")) {
        return { score: 1, results: [] };
      }
    }
    for (const actualDirective of xfoHeaders) {
      if (allowedDirectives.includes(actualDirective)) {
        return { score: 1, results: [] };
      }
    }
    return {
      score: 0,
      results: [{
        severity: str_(UIStrings.itemSeverityHigh),
        description: str_(UIStrings2.noClickjackingMitigation)
      }]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const { cspHeaders, xfoHeaders } = await this.getRawCspsAndXfo(artifacts, context);
    const { score, results } = this.constructResults(cspHeaders, xfoHeaders);
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
var clickjacking_mitigation_default = ClickjackingMitigation;
export {
  UIStrings2 as UIStrings,
  clickjacking_mitigation_default as default
};
/*! Bundled license information:

lighthouse/core/audits/clickjacking-mitigation.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
