import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ProcessedTraceComputed
} from "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/dobetterweb/doctype.js
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on the doctype of a page. This descriptive title is shown to users when the pages's doctype is set to HTML. */
  title: "Page has the HTML doctype",
  /** Title of a Lighthouse audit that provides detail on the doctype of a page. This descriptive title is shown to users when the page's doctype is not set to HTML. */
  failureTitle: "Page lacks the HTML doctype, thus triggering quirks-mode",
  /** Description of a Lighthouse audit that tells the user why they should define an HTML doctype. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Specifying a doctype prevents the browser from switching to quirks-mode. [Learn more about the doctype declaration](https://developer.chrome.com/docs/lighthouse/best-practices/doctype/).",
  /** Explanatory message stating that the document has no doctype. */
  explanationNoDoctype: "Document must contain a doctype",
  /** Explanatory message stating that the document has wrong doctype that triggers `quirks-mode` */
  explanationWrongDoctype: "Document contains a `doctype` that triggers `quirks-mode`",
  /** Explanatory message stating that the document has wrong doctype that triggers `limited-quirks-mode` */
  explanationLimitedQuirks: "Document contains a `doctype` that triggers `limited-quirks-mode`",
  /** Explanatory message stating that the publicId field is not empty. */
  explanationPublicId: "Expected publicId to be an empty string",
  /** Explanatory message stating that the systemId field is not empty. */
  explanationSystemId: "Expected systemId to be an empty string",
  /** Explanatory message stating that the doctype is set, but is not "html" and is therefore invalid. */
  explanationBadDoctype: "Doctype name must be the string `html`"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var Doctype = class extends Audit {
  static {
    __name(this, "Doctype");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "doctype",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["Doctype"],
      __internalOptionalArtifacts: ["InspectorIssues", "Trace"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    if (!artifacts.Doctype) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationNoDoctype)
      };
    }
    const doctypeName = artifacts.Doctype.name;
    const doctypePublicId = artifacts.Doctype.publicId;
    const doctypeSystemId = artifacts.Doctype.systemId;
    const compatMode = artifacts.Doctype.documentCompatMode;
    const trace = artifacts.Trace;
    let quirksModeIssues = [];
    if (trace && artifacts.InspectorIssues?.quirksModeIssue) {
      const processedTrace = await ProcessedTraceComputed.request(trace, context);
      const mainFrameId = processedTrace.mainFrameInfo.frameId;
      quirksModeIssues = artifacts.InspectorIssues.quirksModeIssue.filter((issue) => issue.frameId === mainFrameId);
    }
    const isLimitedQuirksMode = quirksModeIssues.some((issue) => issue.isLimitedQuirksMode);
    if (compatMode === "CSS1Compat" && !isLimitedQuirksMode) {
      return {
        score: 1
      };
    }
    if (isLimitedQuirksMode) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationLimitedQuirks)
      };
    }
    if (doctypePublicId !== "") {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationPublicId)
      };
    }
    if (doctypeSystemId !== "") {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationSystemId)
      };
    }
    if (doctypeName !== "html") {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationBadDoctype)
      };
    }
    return {
      score: 0,
      explanation: str_(UIStrings.explanationWrongDoctype)
    };
  }
};
var doctype_default = Doctype;
export {
  UIStrings,
  doctype_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/doctype.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
