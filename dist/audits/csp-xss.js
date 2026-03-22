import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  evaluateRawCspsForXss,
  getTranslatedDescription
} from "./chunk-MC6O4XLY.js";
import {
  MainResourceComputed
} from "./chunk-7IFF6OOL.js";
import "./chunk-JDNHHZFJ.js";
import "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/csp-xss.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that evaluates the security of a page's CSP. "CSP" stands for "Content Security Policy". "XSS" stands for "Cross Site Scripting". "CSP" and "XSS" do not need to be translated. */
  title: "Ensure CSP is effective against XSS attacks",
  /** Description of a Lighthouse audit that evaluates the security of a page's CSP. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. "CSP" stands for "Content Security Policy". "XSS" stands for "Cross Site Scripting". "CSP" and "XSS" do not need to be translated. */
  description: "A strong Content Security Policy (CSP) significantly reduces the risk of cross-site scripting (XSS) attacks. [Learn how to use a CSP to prevent XSS](https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/)",
  /** Summary text for the results of a Lighthouse audit that evaluates the security of a page's CSP. This is displayed if no CSP is being enforced. "CSP" stands for "Content Security Policy". "CSP" does not need to be translated. */
  noCsp: "No CSP found in enforcement mode",
  /** Message shown when one or more CSPs are defined in a <meta> tag. Shown in a table with a list of other CSP bypasses and warnings. "CSP" stands for "Content Security Policy". "CSP" and "HTTP" do not need to be translated. */
  metaTagMessage: "The page contains a CSP defined in a `<meta>` tag. Consider moving the CSP to an HTTP header or defining another strict CSP in an HTTP header.",
  /** Label for a column in a data table; entries will be a directive of a CSP. "CSP" stands for "Content Security Policy". */
  columnDirective: "Directive",
  /** Label for a column in a data table; entries will be the severity of an issue with the CSP. "CSP" stands for "Content Security Policy". */
  columnSeverity: "Severity",
  /** Table item value calling out the presence of a syntax error. */
  itemSeveritySyntax: "Syntax"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var CspXss = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "csp-xss",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["DevtoolsLog", "MetaElements", "URL"]
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
   * @param {Finding} finding
   * @param {LH.IcuMessage=} severity
   * @return {LH.Audit.Details.TableItem}
   */
  static findingToTableItem(finding, severity) {
    return {
      directive: finding.directive,
      description: getTranslatedDescription(finding),
      severity
    };
  }
  /**
   * @param {Finding[][]} syntaxFindings
   * @param {string[]} rawCsps
   * @return {LH.Audit.Details.TableItem[]}
   */
  static constructSyntaxResults(syntaxFindings, rawCsps) {
    const results = [];
    for (let i = 0; i < syntaxFindings.length; ++i) {
      const items = syntaxFindings[i].map((f) => this.findingToTableItem(f));
      if (!items.length) continue;
      results.push({
        severity: str_(UIStrings2.itemSeveritySyntax),
        description: {
          type: "code",
          value: rawCsps[i]
        },
        subItems: {
          type: "subitems",
          items
        }
      });
    }
    return results;
  }
  /**
   * @param {string[]} cspHeaders
   * @param {string[]} cspMetaTags
   * @return {{score: number, results: LH.Audit.Details.TableItem[]}}
   */
  static constructResults(cspHeaders, cspMetaTags) {
    const rawCsps = [...cspHeaders, ...cspMetaTags];
    if (!rawCsps.length) {
      return {
        score: 0,
        results: [{
          severity: str_(UIStrings.itemSeverityHigh),
          description: str_(UIStrings2.noCsp),
          directive: void 0
        }]
      };
    }
    const { bypasses, warnings, syntax } = evaluateRawCspsForXss(rawCsps);
    const results = [
      ...this.constructSyntaxResults(syntax, rawCsps),
      ...bypasses.map((f) => this.findingToTableItem(f, str_(UIStrings.itemSeverityHigh))),
      ...warnings.map((f) => this.findingToTableItem(f, str_(UIStrings.itemSeverityMedium)))
    ];
    const headerOnlyBypasses = evaluateRawCspsForXss(cspHeaders).bypasses;
    const headerOnlyIsInsecure = headerOnlyBypasses.length > 0 || cspHeaders.length === 0;
    if (cspMetaTags.length > 0 && headerOnlyIsInsecure) {
      results.push({
        severity: str_(UIStrings.itemSeverityMedium),
        description: str_(UIStrings2.metaTagMessage),
        directive: void 0
      });
    }
    return { score: bypasses.length ? 0 : 1, results };
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
var csp_xss_default = CspXss;
export {
  UIStrings2 as UIStrings,
  csp_xss_default as default
};
/*! Bundled license information:

lighthouse/core/audits/csp-xss.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
