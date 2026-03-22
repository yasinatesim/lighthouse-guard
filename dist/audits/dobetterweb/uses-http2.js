import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LanternLargestContentfulPaintComputed
} from "../chunk-5FAUCPF6.js";
import {
  LanternFirstContentfulPaintComputed
} from "../chunk-VUSO5I4V.js";
import "../chunk-ZFITDNXI.js";
import "../chunk-5AKLBR55.js";
import "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import {
  LoadSimulatorComputed
} from "../chunk-2DV6G4YM.js";
import {
  EntityClassificationComputed
} from "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  NetworkRecordsComputed,
  NetworkRequest
} from "../chunk-AB7S44AE.js";
import {
  url_utils_default
} from "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
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

// node_modules/lighthouse/core/audits/dobetterweb/uses-http2.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to enable HTTP/2. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Use HTTP/2",
  /** Description of a Lighthouse audit that tells the user why they should use HTTP/2. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "HTTP/2 offers many benefits over HTTP/1.1, including binary headers and multiplexing. [Learn more about HTTP/2](https://developer.chrome.com/docs/lighthouse/best-practices/uses-http2/).",
  /** [ICU Syntax] Label identifying the number of network requests that were not served with HTTP/2. */
  displayValue: `{itemCount, plural,
    =1 {1 request not served via HTTP/2}
    other {# requests not served via HTTP/2}
    }`,
  /**  Label for a column in a data table; entries in the column will be the HTTP Protocol used to make a network request. */
  columnProtocol: "Protocol"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var STATIC_RESOURCE_TYPES = /* @__PURE__ */ new Set([
  NetworkRequest.TYPES.Document,
  NetworkRequest.TYPES.Font,
  NetworkRequest.TYPES.Image,
  NetworkRequest.TYPES.Stylesheet,
  NetworkRequest.TYPES.Script,
  NetworkRequest.TYPES.Media
]);
var UsesHTTP2Audit = class _UsesHTTP2Audit extends Audit {
  static {
    __name(this, "UsesHTTP2Audit");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-http2",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 3,
      supportedModes: ["timespan", "navigation"],
      requiredArtifacts: ["URL", "DevtoolsLog", "Trace", "GatherContext", "SourceMaps"]
    };
  }
  /**
   * Computes the estimated effect of all results being converted to http/2 on the provided graph.
   *
   * @param {Array<{url: string}>} results
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @param {LH.Gatherer.Simulation.Simulator} simulator
   * @param {{label?: string}=} options
   * @return {{savings: number, simulationBefore: LH.Gatherer.Simulation.Result, simulationAfter: LH.Gatherer.Simulation.Result}}
   */
  static computeWasteWithGraph(results, graph, simulator, options) {
    options = Object.assign({ label: "" }, options);
    const beforeLabel = `${this.meta.id}-${options.label}-before`;
    const afterLabel = `${this.meta.id}-${options.label}-after`;
    const urlsToChange = new Set(results.map((result) => result.url));
    const simulationBefore = simulator.simulate(graph, { label: beforeLabel });
    const originalProtocols = /* @__PURE__ */ new Map();
    graph.traverse((node) => {
      if (node.type !== "network") return;
      if (!urlsToChange.has(node.request.url)) return;
      originalProtocols.set(node.request.requestId, node.request.protocol);
      node.request.protocol = "h2";
    });
    const simulationAfter = simulator.simulate(graph, { label: afterLabel });
    graph.traverse((node) => {
      if (node.type !== "network") return;
      const originalProtocol = originalProtocols.get(node.request.requestId);
      if (originalProtocol === void 0) return;
      node.request.protocol = originalProtocol;
    });
    const savings = simulationBefore.timeInMs - simulationAfter.timeInMs;
    return {
      // Round waste to nearest 10ms
      savings: Math.round(Math.max(savings, 0) / 10) * 10,
      simulationBefore,
      simulationAfter
    };
  }
  /**
   * Determines whether a network request is a "static resource" that would benefit from H2 multiplexing.
   * XHRs, tracking pixels, etc generally don't benefit as much because they aren't requested en-masse
   * for the same origin at the exact same time.
   *
   * @param {LH.Artifacts.NetworkRequest} networkRequest
   * @param {LH.Artifacts.EntityClassification} classifiedEntities
   * @return {boolean}
   */
  static isMultiplexableStaticAsset(networkRequest, classifiedEntities) {
    if (!STATIC_RESOURCE_TYPES.has(networkRequest.resourceType)) return false;
    if (networkRequest.resourceSize < 100) {
      const entity = classifiedEntities.entityByUrl.get(networkRequest.url);
      if (entity) {
        if (classifiedEntities.firstParty?.name === entity.name) return true;
        if (!entity.isUnrecognized) return false;
      }
    }
    return true;
  }
  /**
   * Determine the set of resources that aren't HTTP/2 but should be.
   * We're a little conservative about what we surface for a few reasons:
   *
   *    - The simulator approximation of HTTP/2 is a little more generous than reality.
   *    - There's a bit of debate surrounding HTTP/2 due to its worse performance in environments with high packet loss.**
   *    - It's something that you'd have absolutely zero control over with a third-party (can't defer to fix it for example).
   *
   * Therefore, we only surface requests that were...
   *
   *    - Served over HTTP/1.1 or earlier
   *    - Served over an origin that serves at least 6 static asset requests
   *      (if there aren't more requests than browser's max/host, multiplexing isn't as big a deal)
   *    - Not served on localhost (h2 is a pain to deal with locally & and CI)
   *
   * ** = https://news.ycombinator.com/item?id=19086639
   *      https://www.twilio.com/blog/2017/10/http2-issues.html
   *      https://www.cachefly.com/http-2-is-not-a-magic-bullet/
   *
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Artifacts.EntityClassification} classifiedEntities
   * @return {Array<{url: string, protocol: string}>}
   */
  static determineNonHttp2Resources(networkRecords, classifiedEntities) {
    const nonHttp2Resources = [];
    const seenURLs = /* @__PURE__ */ new Set();
    const groupedByOrigin = /* @__PURE__ */ new Map();
    for (const record of networkRecords) {
      if (!_UsesHTTP2Audit.isMultiplexableStaticAsset(record, classifiedEntities)) continue;
      if (url_utils_default.isLikeLocalhost(record.parsedURL.host)) continue;
      const existing = groupedByOrigin.get(record.parsedURL.securityOrigin) || [];
      existing.push(record);
      groupedByOrigin.set(record.parsedURL.securityOrigin, existing);
    }
    for (const record of networkRecords) {
      if (seenURLs.has(record.url)) continue;
      if (record.fetchedViaServiceWorker) continue;
      const isOldHttp = /HTTP\/[01][.\d]?/i.test(record.protocol);
      if (!isOldHttp) continue;
      const group = groupedByOrigin.get(record.parsedURL.securityOrigin) || [];
      if (group.length < 6) continue;
      seenURLs.add(record.url);
      nonHttp2Resources.push({ protocol: record.protocol, url: record.url });
    }
    return nonHttp2Resources;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const URL = artifacts.URL;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const classifiedEntities = await EntityClassificationComputed.request({ URL, devtoolsLog }, context);
    const resources = _UsesHTTP2Audit.determineNonHttp2Resources(networkRecords, classifiedEntities);
    let displayValue;
    if (resources.length > 0) {
      displayValue = str_(UIStrings2.displayValue, { itemCount: resources.length });
    }
    if (artifacts.GatherContext.gatherMode === "timespan") {
      const headings2 = [
        { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
        { key: "protocol", valueType: "text", label: str_(UIStrings2.columnProtocol) }
      ];
      const details2 = Audit.makeTableDetails(headings2, resources);
      return {
        displayValue,
        score: resources.length ? 0 : 1,
        details: details2
      };
    }
    const settings = context?.settings || {};
    const simulatorOptions = {
      devtoolsLog,
      settings
    };
    const simulator = await LoadSimulatorComputed.request(simulatorOptions, context);
    const metricComputationInput = Audit.makeMetricComputationDataInput(artifacts, context);
    const {
      pessimisticGraph: fcpGraph
    } = await LanternFirstContentfulPaintComputed.request(metricComputationInput, context);
    const {
      pessimisticGraph: lcpGraph
    } = await LanternLargestContentfulPaintComputed.request(metricComputationInput, context);
    const wasteFcp = _UsesHTTP2Audit.computeWasteWithGraph(
      resources,
      fcpGraph,
      simulator,
      { label: "fcp" }
    );
    const wasteLcp = _UsesHTTP2Audit.computeWasteWithGraph(
      resources,
      lcpGraph,
      simulator,
      { label: "lcp" }
    );
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "protocol", valueType: "text", label: str_(UIStrings2.columnProtocol) }
    ];
    const details = Audit.makeOpportunityDetails(
      headings,
      resources,
      { overallSavingsMs: wasteLcp.savings }
    );
    return {
      displayValue,
      numericValue: wasteLcp.savings,
      numericUnit: "millisecond",
      score: resources.length ? 0 : 1,
      details,
      metricSavings: { LCP: wasteLcp.savings, FCP: wasteFcp.savings }
    };
  }
};
var uses_http2_default = UsesHTTP2Audit;
export {
  UIStrings2 as UIStrings,
  uses_http2_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/uses-http2.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
