import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  JSBundlesComputed
} from "./chunk-QMRXOAX7.js";
import "./chunk-I4AAD5AR.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-O3YNDXOX.js";
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import "./chunk-DQQIQ7YS.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit,
  Util
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/errors-in-console.js
var KB = 1024;
var MAX_CONSOLE_ERRORS = 1e3;
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on browser errors. This descriptive title is shown to users when no browser errors were logged into the devtools console. */
  title: "No browser errors logged to the console",
  /** Title of a Lighthouse audit that provides detail on browser errors. This descriptive title is shown to users when browser errors occurred and were logged into the devtools console. */
  failureTitle: "Browser errors were logged to the console",
  /** Description of a Lighthouse audit that tells the user why errors being logged to the devtools console are a cause for concern and so should be fixed. This is displayed after a user expands the section to see more. No character length limits. */
  description: "Errors logged to the console indicate unresolved problems. They can come from network request failures and other browser concerns. [Learn more about this errors in console diagnostic audit](https://developer.chrome.com/docs/lighthouse/best-practices/errors-in-console/)"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var ErrorLogs = class _ErrorLogs extends Audit {
  static {
    __name(this, "ErrorLogs");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "errors-in-console",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["ConsoleMessages", "SourceMaps", "Scripts"]
    };
  }
  /** @return {AuditOptions} */
  static get defaultOptions() {
    return { ignoredPatterns: ["ERR_BLOCKED_BY_CLIENT.Inspector"] };
  }
  /**
   * @template {{description: string | undefined}} T
   * @param {Array<T>} items
   * @param {AuditOptions} options
   * @return {Array<T>}
   */
  static filterAccordingToOptions(items, options) {
    const { ignoredPatterns, ...restOfOptions } = options;
    const otherOptionKeys = Object.keys(restOfOptions);
    if (otherOptionKeys.length) lighthouse_logger_default.warn(this.meta.id, "Unrecognized options", otherOptionKeys);
    if (!ignoredPatterns) return items;
    return items.filter(({ description }) => {
      if (!description) return true;
      for (const pattern of ignoredPatterns) {
        if (pattern instanceof RegExp && pattern.test(description)) return false;
        if (typeof pattern === "string" && description.includes(pattern)) return false;
      }
      return true;
    });
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const auditOptions = context.options;
    const bundles = await JSBundlesComputed.request(artifacts, context);
    const consoleRows = artifacts.ConsoleMessages.filter((item) => item.level === "error").map((item) => {
      const bundle = bundles.find((bundle2) => bundle2.script.scriptId === item.scriptId);
      return {
        source: item.source,
        description: item.text ? Util.truncate(item.text, 10 * KB) : void 0,
        sourceLocation: Audit.makeSourceLocationFromConsoleMessage(item, bundle)
      };
    }).slice(0, MAX_CONSOLE_ERRORS);
    const tableRows = _ErrorLogs.filterAccordingToOptions(consoleRows, auditOptions).sort((a, b) => (a.description || "").localeCompare(b.description || ""));
    const headings = [
      /* eslint-disable max-len */
      { key: "sourceLocation", valueType: "source-location", label: str_(UIStrings.columnSource) },
      { key: "description", valueType: "code", label: str_(UIStrings.columnDescription) }
      /* eslint-enable max-len */
    ];
    const details = Audit.makeTableDetails(headings, tableRows);
    const numErrors = tableRows.length;
    return {
      score: Number(numErrors === 0),
      details
    };
  }
};
var errors_in_console_default = ErrorLogs;
export {
  UIStrings2 as UIStrings,
  errors_in_console_default as default
};
/*! Bundled license information:

lighthouse/core/audits/errors-in-console.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
