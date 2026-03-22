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

// node_modules/lighthouse/core/audits/server-response-time.js
var UIStrings2 = {
  /** Title of a diagnostic audit that provides detail on how long it took from starting a request to when the server started responding. This descriptive title is shown to users when the amount is acceptable and no user action is required. */
  title: "Initial server response time was short",
  /** Title of a diagnostic audit that provides detail on how long it took from starting a request to when the server started responding. This imperative title is shown to users when there is a significant amount of execution time that could be reduced. */
  failureTitle: "Reduce initial server response time",
  /** Description of a Lighthouse audit that tells the user *why* they should reduce the amount of time it takes their server to start responding to requests. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Keep the server response time for the main document short because all other requests depend on it. [Learn more about the Time to First Byte metric](https://developer.chrome.com/docs/lighthouse/performance/time-to-first-byte/).",
  /** Used to summarize the total Server Response Time duration for the primary HTML response. The `{timeInMs}` placeholder will be replaced with the time duration, shown in milliseconds (e.g. 210 ms) */
  displayValue: `Root document took {timeInMs, number, milliseconds}\xA0ms`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var TOO_SLOW_THRESHOLD_MS = 600;
var TARGET_MS = 100;
var ServerResponseTime = class _ServerResponseTime extends Audit {
  static {
    __name(this, "ServerResponseTime");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "server-response-time",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      supportedModes: ["navigation"],
      guidanceLevel: 1,
      requiredArtifacts: ["DevtoolsLog", "URL", "GatherContext"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   * @param {LH.Artifacts.NetworkRequest} record
   * @return {number|null}
   */
  static calculateResponseTime(record) {
    if (global.isLightrider && record.lrStatistics) return record.lrStatistics.requestMs;
    if (!record.timing) return null;
    return record.timing.receiveHeadersStart - record.timing.sendEnd;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    const responseTime = _ServerResponseTime.calculateResponseTime(mainResource);
    if (responseTime === null) {
      throw new Error("no timing found for main resource");
    }
    const passed = responseTime < TOO_SLOW_THRESHOLD_MS;
    const displayValue = str_(UIStrings2.displayValue, { timeInMs: responseTime });
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "responseTime", valueType: "timespanMs", label: str_(UIStrings.columnTimeSpent) }
    ];
    const overallSavingsMs = Math.max(responseTime - TARGET_MS, 0);
    const details = Audit.makeOpportunityDetails(
      headings,
      [{ url: mainResource.url, responseTime }],
      { overallSavingsMs }
    );
    return {
      numericValue: responseTime,
      numericUnit: "millisecond",
      score: Number(passed),
      displayValue,
      details,
      metricSavings: {
        FCP: overallSavingsMs,
        LCP: overallSavingsMs
      }
    };
  }
};
var server_response_time_default = ServerResponseTime;
export {
  UIStrings2 as UIStrings,
  server_response_time_default as default
};
/*! Bundled license information:

lighthouse/core/audits/server-response-time.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
