import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UIStrings,
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

// node_modules/lighthouse/core/audits/dobetterweb/js-libraries.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the Javascript libraries that are used on the page. */
  title: "Detected JavaScript libraries",
  /** Description of a Lighthouse audit that tells the user what this audit is detecting. This is displayed after a user expands the section to see more. No character length limits. */
  description: "All front-end JavaScript libraries detected on the page. [Learn more about this JavaScript library detection diagnostic audit](https://developer.chrome.com/docs/lighthouse/best-practices/js-libraries/).",
  /** Label for a column in a data table; entries will be the version numbers of the detected Javascript libraries.  */
  columnVersion: "Version"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var JsLibrariesAudit = class extends Audit {
  static {
    __name(this, "JsLibrariesAudit");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "js-libraries",
      title: str_(UIStrings2.title),
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      description: str_(UIStrings2.description),
      requiredArtifacts: ["Stacks"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const libDetails = artifacts.Stacks.filter((stack) => stack.detector === "js").filter((stack) => !stack.id.endsWith("-fast")).map((stack) => ({
      name: stack.name,
      version: stack.version,
      npm: stack.npm
    }));
    const headings = [
      { key: "name", valueType: "text", label: str_(UIStrings.columnName) },
      { key: "version", valueType: "text", label: str_(UIStrings2.columnVersion) }
    ];
    const details = Audit.makeTableDetails(headings, libDetails);
    const debugData = {
      type: (
        /** @type {const} */
        "debugdata"
      ),
      stacks: artifacts.Stacks.map((stack) => {
        return {
          id: stack.id,
          version: stack.version
        };
      })
    };
    if (!libDetails.length) {
      return { score: null, notApplicable: true };
    }
    return {
      score: 1,
      // Always pass for now.
      details: {
        ...details,
        debugData
      }
    };
  }
};
var js_libraries_default = JsLibrariesAudit;
export {
  UIStrings2 as UIStrings,
  js_libraries_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/js-libraries.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
