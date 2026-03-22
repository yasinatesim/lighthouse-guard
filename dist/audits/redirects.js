import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LanternInteractiveComputed
} from "./chunk-QRPKE3CF.js";
import "./chunk-KWLN6AZG.js";
import "./chunk-GPJRF3VM.js";
import "./chunk-GOQIOX72.js";
import "./chunk-GPGXHKXU.js";
import "./chunk-TYEYL6JI.js";
import "./chunk-CVEB2JTF.js";
import "./chunk-E5UDU7XN.js";
import "./chunk-2RUE6MFF.js";
import "./chunk-4WOLRYCI.js";
import {
  ProcessedTraceComputed
} from "./chunk-XFJEV2GR.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import {
  NetworkRecordsComputed
} from "./chunk-YOYAIZOW.js";
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

// node_modules/lighthouse/core/audits/redirects.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to eliminate the redirects taken through multiple URLs to load the page. This is shown in a list of audits that Lighthouse generates. */
  title: "Avoid multiple page redirects",
  /** Description of a Lighthouse audit that tells users why they should reduce the number of server-side redirects on their page. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Redirects introduce additional delays before the page can be loaded. [Learn how to avoid page redirects](https://developer.chrome.com/docs/lighthouse/performance/redirects/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var Redirects = class _Redirects extends Audit {
  static {
    __name(this, "Redirects");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "redirects",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      supportedModes: ["navigation"],
      guidanceLevel: 2,
      requiredArtifacts: ["URL", "GatherContext", "DevtoolsLog", "Trace", "SourceMaps"]
    };
  }
  /**
   * This method generates the document request chain including client-side and server-side redirects.
   *
   * Example:
   *    GET /requestedUrl => 302 /firstRedirect
   *    GET /firstRedirect => 200 /firstRedirect, window.location = '/secondRedirect'
   *    GET /secondRedirect => 302 /thirdRedirect
   *    GET /thirdRedirect => 302 /mainDocumentUrl
   *    GET /mainDocumentUrl => 200 /mainDocumentUrl
   *
   * Returns network records [/requestedUrl, /firstRedirect, /secondRedirect, /thirdRedirect, /mainDocumentUrl]
   *
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Artifacts.ProcessedTrace} processedTrace
   * @return {Array<LH.Artifacts.NetworkRequest>}
   */
  static getDocumentRequestChain(networkRecords, processedTrace) {
    const documentRequests = [];
    for (const event of processedTrace.processEvents) {
      if (event.name !== "navigationStart") continue;
      const data = event.args.data || {};
      if (!data.documentLoaderURL || !data.isLoadingMainFrame) continue;
      let networkRecord = networkRecords.find((record) => record.requestId === data.navigationId);
      while (networkRecord) {
        documentRequests.push(networkRecord);
        networkRecord = networkRecord.redirectDestination;
      }
    }
    if (!documentRequests.length) {
      throw new Error("No navigation requests found");
    }
    return documentRequests;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const settings = context.settings;
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const gatherContext = artifacts.GatherContext;
    const { URL, SourceMaps } = artifacts;
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const documentRequests = _Redirects.getDocumentRequestChain(networkRecords, processedTrace);
    const metricComputationData = { trace, devtoolsLog, gatherContext, settings, URL, SourceMaps, simulator: null };
    const metricResult = await LanternInteractiveComputed.request(metricComputationData, context);
    const nodeTimingsById = /* @__PURE__ */ new Map();
    for (const [node, timing] of metricResult.pessimisticEstimate.nodeTimings.entries()) {
      if (node.type === "network") {
        nodeTimingsById.set(node.request.requestId, timing);
      }
    }
    let totalWastedMs = 0;
    const tableRows = [];
    for (let i = 0; i < documentRequests.length; i++) {
      if (documentRequests.length < 2) break;
      const initialRequest = documentRequests[i];
      const redirectedRequest = documentRequests[i + 1] || initialRequest;
      const initialTiming = nodeTimingsById.get(initialRequest.requestId);
      const redirectedTiming = nodeTimingsById.get(redirectedRequest.requestId);
      if (!initialTiming || !redirectedTiming) {
        throw new Error("Could not find redirects in graph");
      }
      const lanternTimingDeltaMs = redirectedTiming.startTime - initialTiming.startTime;
      const observedTimingDeltaMs = redirectedRequest.networkRequestTime - initialRequest.networkRequestTime;
      const wastedMs = settings.throttlingMethod === "simulate" ? lanternTimingDeltaMs : observedTimingDeltaMs;
      totalWastedMs += wastedMs;
      tableRows.push({
        url: initialRequest.url,
        wastedMs
      });
    }
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "wastedMs", valueType: "timespanMs", label: str_(UIStrings.columnTimeSpent) }
    ];
    const details = Audit.makeOpportunityDetails(
      headings,
      tableRows,
      { overallSavingsMs: totalWastedMs }
    );
    return {
      score: tableRows.length ? 0 : 1,
      numericValue: totalWastedMs,
      numericUnit: "millisecond",
      displayValue: totalWastedMs ? str_(UIStrings.displayValueMsSavings, { wastedMs: totalWastedMs }) : "",
      details,
      metricSavings: {
        LCP: totalWastedMs,
        FCP: totalWastedMs
      }
    };
  }
};
var redirects_default = Redirects;
export {
  UIStrings2 as UIStrings,
  redirects_default as default
};
/*! Bundled license information:

lighthouse/core/audits/redirects.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
