import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  CriticalRequestChainsComputed
} from "./chunk-7XB6HNBV.js";
import {
  MainResourceComputed
} from "./chunk-32YVOUED.js";
import {
  PageDependencyGraphComputed
} from "./chunk-5AKLBR55.js";
import "./chunk-HDGMQKEX.js";
import "./chunk-LBG2XUR7.js";
import {
  LoadSimulatorComputed
} from "./chunk-2DV6G4YM.js";
import "./chunk-EXNQHM7K.js";
import "./chunk-UNPQMFMQ.js";
import "./chunk-RI7XYKZY.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import {
  NetworkRequest
} from "./chunk-AB7S44AE.js";
import {
  url_utils_default
} from "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-4MZOSFEN.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/uses-rel-preload.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to use <link rel=preload> to initiate important network requests earlier during page load. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Preload key requests",
  /** Description of a Lighthouse audit that tells the user *why* they should preload important network requests. The associated network requests are started halfway through pageload (or later) but should be started at the beginning. This is displayed after a user expands the section to see more. No character length limits. '<link rel=preload>' is the html code the user would include in their page and shouldn't be translated. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Consider using `<link rel=preload>` to prioritize fetching resources that are currently requested later in page load. [Learn how to preload key requests](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preload/).",
  /**
   * @description A warning message that is shown when the user tried to follow the advice of the audit, but it's not working as expected. Forgetting to set the `crossorigin` HTML attribute, or setting it to an incorrect value, on the link is a common mistake when adding preload links.
   * @example {https://example.com} preloadURL
   * */
  crossoriginWarning: 'A preload `<link>` was found for "{preloadURL}" but was not used by the browser. Check that you are using the `crossorigin` attribute properly.'
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var THRESHOLD_IN_MS = 100;
var UsesRelPreloadAudit = class _UsesRelPreloadAudit extends Audit {
  static {
    __name(this, "UsesRelPreloadAudit");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-rel-preload",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      supportedModes: ["navigation"],
      guidanceLevel: 3,
      requiredArtifacts: ["DevtoolsLog", "Trace", "URL", "SourceMaps"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   * @param {LH.Artifacts.NetworkRequest} mainResource
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @return {Set<string>}
   */
  static getURLsToPreload(mainResource, graph) {
    const urls = /* @__PURE__ */ new Set();
    graph.traverse((node, traversalPath) => {
      if (node.type !== "network") return;
      const path = traversalPath.slice(1).filter((initiator) => initiator.type === "network");
      if (!_UsesRelPreloadAudit.shouldPreloadRequest(node.request, mainResource, path)) return;
      urls.add(node.request.url);
    });
    return urls;
  }
  /**
   * Finds which URLs were attempted to be preloaded, but failed to be reused and were requested again.
   *
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @return {Set<string>}
   */
  static getURLsFailedToPreload(graph) {
    const requests = [];
    graph.traverse((node) => node.type === "network" && requests.push(node.rawRequest));
    const preloadRequests = requests.filter((req) => req.isLinkPreload);
    const preloadURLsByFrame = /* @__PURE__ */ new Map();
    for (const request of preloadRequests) {
      const preloadURLs = preloadURLsByFrame.get(request.frameId) || /* @__PURE__ */ new Set();
      preloadURLs.add(request.url);
      preloadURLsByFrame.set(request.frameId, preloadURLs);
    }
    const duplicateRequestsAfterPreload = requests.filter((request) => {
      const preloadURLsForFrame = preloadURLsByFrame.get(request.frameId);
      if (!preloadURLsForFrame) return false;
      if (!preloadURLsForFrame.has(request.url)) return false;
      const fromCache = request.fromDiskCache || request.fromMemoryCache || request.fromPrefetchCache;
      return !fromCache && !request.isLinkPreload;
    });
    return new Set(duplicateRequestsAfterPreload.map((req) => req.url));
  }
  /**
   * We want to preload all first party critical requests at depth 2.
   * Third party requests can be tricky to know the URL ahead of time.
   * Critical requests at depth 1 would already be identified by the browser for preloading.
   * Critical requests deeper than depth 2 are more likely to be a case-by-case basis such that it
   * would be a little risky to recommend blindly.
   *
   * @param {Lantern.Types.NetworkRequest} request
   * @param {Lantern.Types.NetworkRequest} mainResource
   * @param {Array<LH.Gatherer.Simulation.GraphNode>} initiatorPath
   * @return {boolean}
   */
  static shouldPreloadRequest(request, mainResource, initiatorPath) {
    const mainResourceDepth = mainResource.redirects ? mainResource.redirects.length : 0;
    if (request.isLinkPreload) return false;
    if (!CriticalRequestChainsComputed.isCritical(request, mainResource)) return false;
    if (NetworkRequest.isNonNetworkRequest(request)) return false;
    if (initiatorPath.length !== mainResourceDepth + 2) return false;
    if (request.frameId !== mainResource.frameId) return false;
    return url_utils_default.rootDomainsMatch(request.url, mainResource.url);
  }
  /**
   * Computes the estimated effect of preloading all the resources.
   * @param {Set<string>} urls The array of byte savings results per resource
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @param {LH.Gatherer.Simulation.Simulator} simulator
   * @return {{wastedMs: number, results: Array<{url: string, wastedMs: number}>}}
   */
  static computeWasteWithGraph(urls, graph, simulator) {
    if (!urls.size) {
      return { wastedMs: 0, results: [] };
    }
    const simulationBeforeChanges = simulator.simulate(graph);
    const modifiedGraph = graph.cloneWithRelationships();
    const nodesToPreload = [];
    let mainDocumentNode = null;
    modifiedGraph.traverse((node) => {
      if (node.type !== "network") return;
      if (node.isMainDocument()) {
        mainDocumentNode = node;
      } else if (node.request && urls.has(node.request.url)) {
        nodesToPreload.push(node);
      }
    });
    if (!mainDocumentNode) {
      throw new Error("Could not find main document node");
    }
    for (const node of nodesToPreload) {
      node.removeAllDependencies();
      node.addDependency(mainDocumentNode);
    }
    const simulationAfterChanges = simulator.simulate(modifiedGraph);
    const originalNodesByRequest = Array.from(simulationBeforeChanges.nodeTimings.keys()).reduce((map, node) => map.set(node.request, node), /* @__PURE__ */ new Map());
    const results = [];
    for (const node of nodesToPreload) {
      const originalNode = originalNodesByRequest.get(node.request);
      const timingAfter = simulationAfterChanges.nodeTimings.get(node);
      const timingBefore = simulationBeforeChanges.nodeTimings.get(originalNode);
      if (!timingBefore || !timingAfter) throw new Error("Missing preload node");
      const wastedMs = Math.round(timingBefore.endTime - timingAfter.endTime);
      if (wastedMs < THRESHOLD_IN_MS) continue;
      results.push({ url: node.request.url, wastedMs });
    }
    if (!results.length) {
      return { wastedMs: 0, results };
    }
    return {
      // Preload won't necessarily impact the deepest chain/overall time
      // We'll use the maximum endTime improvement for now
      wastedMs: Math.max(...results.map((item) => item.wastedMs)),
      results
    };
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
    const { URL, SourceMaps } = artifacts;
    const simulatorOptions = { devtoolsLog, settings: context.settings };
    const [mainResource, graph, simulator] = await Promise.all([
      MainResourceComputed.request({ devtoolsLog, URL }, context),
      PageDependencyGraphComputed.request(
        { settings, trace, devtoolsLog, URL, SourceMaps, fromTrace: false },
        context
      ),
      LoadSimulatorComputed.request(simulatorOptions, context)
    ]);
    const urls = _UsesRelPreloadAudit.getURLsToPreload(mainResource, graph);
    const { results, wastedMs } = _UsesRelPreloadAudit.computeWasteWithGraph(urls, graph, simulator);
    results.sort((a, b) => b.wastedMs - a.wastedMs);
    let warnings;
    const failedURLs = _UsesRelPreloadAudit.getURLsFailedToPreload(graph);
    if (failedURLs.size) {
      warnings = Array.from(failedURLs).map((preloadURL) => str_(UIStrings2.crossoriginWarning, { preloadURL }));
    }
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "wastedMs", valueType: "timespanMs", label: str_(UIStrings.columnWastedMs) }
    ];
    const details = Audit.makeOpportunityDetails(
      headings,
      results,
      { overallSavingsMs: wastedMs, sortedBy: ["wastedMs"] }
    );
    return {
      score: results.length ? 0 : 1,
      numericValue: wastedMs,
      numericUnit: "millisecond",
      displayValue: wastedMs ? str_(UIStrings.displayValueMsSavings, { wastedMs }) : "",
      details,
      warnings
    };
  }
};
var uses_rel_preload_default = UsesRelPreloadAudit;
export {
  UIStrings2 as UIStrings,
  uses_rel_preload_default as default
};
/*! Bundled license information:

lighthouse/core/audits/uses-rel-preload.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
