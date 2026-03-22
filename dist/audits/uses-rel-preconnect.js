import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "./chunk-HZ5CS3EU.js";
import {
  LanternLargestContentfulPaintComputed
} from "./chunk-KWLN6AZG.js";
import {
  LanternFirstContentfulPaintComputed
} from "./chunk-GPJRF3VM.js";
import {
  ProcessedNavigationComputed
} from "./chunk-GOQIOX72.js";
import {
  PageDependencyGraphComputed
} from "./chunk-GPGXHKXU.js";
import "./chunk-TYEYL6JI.js";
import "./chunk-CVEB2JTF.js";
import {
  LoadSimulatorComputed
} from "./chunk-E5UDU7XN.js";
import "./chunk-2RUE6MFF.js";
import "./chunk-4WOLRYCI.js";
import "./chunk-XFJEV2GR.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import {
  NetworkRecordsComputed
} from "./chunk-YOYAIZOW.js";
import {
  url_utils_default
} from "./chunk-OZ2G5ZKT.js";
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

// node_modules/lighthouse/core/audits/uses-rel-preconnect.js
var PRECONNECT_SOCKET_MAX_IDLE_IN_MS = 15e3;
var IGNORE_THRESHOLD_IN_MS = 50;
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to connect early to internet domains that will be used to load page resources. Origin is the correct term, however 'domain name' could be used if neccsesary. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Preconnect to required origins",
  /** Description of a Lighthouse audit that tells the user how to connect early to third-party domains that will be used to load page resources. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins. [Learn how to preconnect to required origins](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/).",
  /**
   * @description A warning message that is shown when the user tried to follow the advice of the audit, but it's not working as expected.
   * @example {https://example.com} securityOrigin
   * */
  unusedWarning: 'A `<link rel=preconnect>` was found for "{securityOrigin}" but was not used by the browser. Only use `preconnect` for important origins that the page will certainly request.',
  /**
   * @description A warning message that is shown when the user tried to follow the advice of the audit, but it's not working as expected. Forgetting to set the `crossorigin` HTML attribute, or setting it to an incorrect value, on the link is a common mistake when adding preconnect links.
   * @example {https://example.com} securityOrigin
   * */
  crossoriginWarning: 'A `<link rel=preconnect>` was found for "{securityOrigin}" but was not used by the browser. Check that you are using the `crossorigin` attribute properly.',
  /** A warning message that is shown when found more than 2 preconnected links */
  tooManyPreconnectLinksWarning: "More than 2 `<link rel=preconnect>` connections were found. These should be used sparingly and only to the most important origins."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var UsesRelPreconnectAudit = class _UsesRelPreconnectAudit extends Audit {
  static {
    __name(this, "UsesRelPreconnectAudit");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-rel-preconnect",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      supportedModes: ["navigation"],
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "DevtoolsLog", "URL", "LinkElements", "SourceMaps"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   * Check if record has valid timing
   * @param {LH.Artifacts.NetworkRequest} record
   * @return {boolean}
   */
  static hasValidTiming(record) {
    return !!record.timing && record.timing.connectEnd >= 0 && record.timing.connectStart >= 0;
  }
  /**
   * Check is the connection is already open
   * @param {LH.Artifacts.NetworkRequest} record
   * @return {boolean}
   */
  static hasAlreadyConnectedToOrigin(record) {
    if (!record.timing) return false;
    if (record.timing.dnsStart === -1 && record.timing.dnsEnd === -1 && record.timing.connectStart === -1 && record.timing.connectEnd === -1) {
      return true;
    }
    if (record.timing.dnsEnd - record.timing.dnsStart === 0 && record.timing.connectEnd - record.timing.connectStart === 0) {
      return true;
    }
    return false;
  }
  /**
   * Check is the connection has started before the socket idle time
   * @param {LH.Artifacts.NetworkRequest} record
   * @param {LH.Artifacts.NetworkRequest} mainResource
   * @return {boolean}
   */
  static socketStartTimeIsBelowThreshold(record, mainResource) {
    const timeSinceMainEnd = Math.max(0, record.networkRequestTime - mainResource.networkEndTime);
    return timeSinceMainEnd < PRECONNECT_SOCKET_MAX_IDLE_IN_MS;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const { URL, SourceMaps } = artifacts;
    const settings = context.settings;
    let maxWastedLcp = 0;
    let maxWastedFcp = 0;
    const warnings = [];
    const [networkRecords, mainResource, loadSimulator, processedNavigation, pageGraph] = await Promise.all([
      NetworkRecordsComputed.request(devtoolsLog, context),
      MainResourceComputed.request({ devtoolsLog, URL }, context),
      LoadSimulatorComputed.request({ devtoolsLog, settings }, context),
      ProcessedNavigationComputed.request(trace, context),
      PageDependencyGraphComputed.request(
        { settings, trace, devtoolsLog, URL, SourceMaps, fromTrace: false },
        context
      )
    ]);
    const { rtt, additionalRttByOrigin } = loadSimulator.getOptions();
    const lcpGraph = LanternLargestContentfulPaintComputed.getPessimisticGraph(pageGraph, processedNavigation);
    const lcpGraphURLs = /* @__PURE__ */ new Set();
    lcpGraph.traverse((node) => {
      if (node.type === "network") lcpGraphURLs.add(node.request.url);
    });
    const fcpGraph = LanternFirstContentfulPaintComputed.getPessimisticGraph(pageGraph, processedNavigation);
    const fcpGraphURLs = /* @__PURE__ */ new Set();
    fcpGraph.traverse((node) => {
      if (node.type === "network") fcpGraphURLs.add(node.request.url);
    });
    const origins = /* @__PURE__ */ new Map();
    networkRecords.forEach((record) => {
      if (
        // Filter out all resources where timing info was invalid.
        !_UsesRelPreconnectAudit.hasValidTiming(record) || // Filter out all resources that are loaded by the document. Connections are already early.
        record.initiator.url === mainResource.url || // Filter out urls that do not have an origin (data, file, etc).
        !record.parsedURL || !record.parsedURL.securityOrigin || // Filter out all resources that have the same origin. We're already connected.
        mainResource.parsedURL.securityOrigin === record.parsedURL.securityOrigin || // Filter out anything that wasn't part of LCP. Only recommend important origins.
        !lcpGraphURLs.has(record.url) || // Filter out all resources where origins are already resolved.
        _UsesRelPreconnectAudit.hasAlreadyConnectedToOrigin(record) || // Make sure the requests are below the PRECONNECT_SOCKET_MAX_IDLE_IN_MS (15s) mark.
        !_UsesRelPreconnectAudit.socketStartTimeIsBelowThreshold(record, mainResource)
      ) {
        return;
      }
      const securityOrigin = record.parsedURL.securityOrigin;
      const records = origins.get(securityOrigin) || [];
      records.push(record);
      origins.set(securityOrigin, records);
    });
    const preconnectLinks = artifacts.LinkElements.filter((el) => el.rel === "preconnect");
    const preconnectOrigins = new Set(preconnectLinks.map((link) => url_utils_default.getOrigin(link.href || "")));
    let results = [];
    origins.forEach((records) => {
      const firstRecordOfOrigin = records.reduce((firstRecord, record) => {
        return record.networkRequestTime < firstRecord.networkRequestTime ? record : firstRecord;
      });
      if (!firstRecordOfOrigin.timing) return;
      const securityOrigin = firstRecordOfOrigin.parsedURL.securityOrigin;
      const additionalRtt = additionalRttByOrigin.get(securityOrigin) || 0;
      let connectionTime = rtt + additionalRtt;
      if (firstRecordOfOrigin.parsedURL.scheme === "https") connectionTime = connectionTime * 2;
      const timeBetweenMainResourceAndDnsStart = firstRecordOfOrigin.networkRequestTime - mainResource.networkEndTime + firstRecordOfOrigin.timing.dnsStart;
      const wastedMs = Math.min(connectionTime, timeBetweenMainResourceAndDnsStart);
      if (wastedMs < IGNORE_THRESHOLD_IN_MS) return;
      if (preconnectOrigins.has(securityOrigin)) {
        warnings.push(str_(UIStrings2.crossoriginWarning, { securityOrigin }));
        return;
      }
      maxWastedLcp = Math.max(wastedMs, maxWastedLcp);
      if (fcpGraphURLs.has(firstRecordOfOrigin.url)) {
        maxWastedFcp = Math.max(wastedMs, maxWastedLcp);
      }
      results.push({
        url: securityOrigin,
        wastedMs
      });
    });
    results = results.sort((a, b) => b.wastedMs - a.wastedMs);
    for (const origin of preconnectOrigins) {
      if (!origin) continue;
      if (networkRecords.some((record) => origin === record.parsedURL.securityOrigin)) continue;
      warnings.push(str_(UIStrings2.unusedWarning, { securityOrigin: origin }));
    }
    if (preconnectLinks.length >= 2) {
      return {
        score: 1,
        warnings: preconnectLinks.length >= 3 ? [...warnings, str_(UIStrings2.tooManyPreconnectLinksWarning)] : warnings,
        metricSavings: { LCP: maxWastedLcp, FCP: maxWastedFcp }
      };
    }
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "wastedMs", valueType: "timespanMs", label: str_(UIStrings.columnWastedMs) }
    ];
    const details = Audit.makeOpportunityDetails(
      headings,
      results,
      { overallSavingsMs: maxWastedLcp, sortedBy: ["wastedMs"] }
    );
    return {
      score: results.length ? 0 : 1,
      numericValue: maxWastedLcp,
      numericUnit: "millisecond",
      displayValue: maxWastedLcp ? str_(UIStrings.displayValueMsSavings, { wastedMs: maxWastedLcp }) : "",
      warnings,
      details,
      metricSavings: { LCP: maxWastedLcp, FCP: maxWastedFcp }
    };
  }
};
var uses_rel_preconnect_default = UsesRelPreconnectAudit;
export {
  UIStrings2 as UIStrings,
  uses_rel_preconnect_default as default
};
/*! Bundled license information:

lighthouse/core/audits/uses-rel-preconnect.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
