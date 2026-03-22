import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UnusedCSSComputed
} from "../chunk-ZLY62FGV.js";
import {
  FirstContentfulPaintComputed
} from "../chunk-5PRILO24.js";
import "../chunk-E4NYJWSQ.js";
import "../chunk-7PCH2QJG.js";
import {
  LCPImageRecordComputed
} from "../chunk-22KTQBIM.js";
import "../chunk-VUSO5I4V.js";
import "../chunk-ZFITDNXI.js";
import "../chunk-5AKLBR55.js";
import {
  TraceEngineResultComputed
} from "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import {
  LoadSimulatorComputed
} from "../chunk-2DV6G4YM.js";
import "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import {
  ProcessedTraceComputed
} from "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  NetworkRequest,
  graph_exports
} from "../chunk-AB7S44AE.js";
import "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import {
  makeComputedArtifact
} from "../chunk-VW72MYVI.js";
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

// node_modules/lighthouse/core/computed/navigation-insights.js
var NavigationInsights = class {
  static {
    __name(this, "NavigationInsights");
  }
  /**
    * @param {{trace: LH.Trace, settings: LH.Audit.Context['settings'], SourceMaps: LH.Artifacts['SourceMaps']}} data
    * @param {LH.Artifacts.ComputedContext} context
   */
  static async compute_(data, context) {
    const { trace, settings, SourceMaps } = data;
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const traceEngineResult = await TraceEngineResultComputed.request({ trace, settings, SourceMaps }, context);
    const navigationId = processedTrace.timeOriginEvt.args.data?.navigationId;
    if (!navigationId) throw new Error("No navigationId found");
    const navInsights = traceEngineResult.insights.get(navigationId);
    if (!navInsights) throw new Error("No navigations insights found");
    return navInsights;
  }
};
var NavigationInsightsComputed = makeComputedArtifact(NavigationInsights, ["trace", "settings", "SourceMaps"]);

// node_modules/lighthouse/core/audits/byte-efficiency/render-blocking-resources.js
var MINIMUM_WASTED_MS = 50;
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to reduce or remove network resources that block the initial render of the page. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Eliminate render-blocking resources",
  /** Description of a Lighthouse audit that tells the user *why* they should reduce or remove network resources that block the initial render of the page. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn how to eliminate render-blocking resources](https://developer.chrome.com/docs/lighthouse/performance/render-blocking-resources/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
function getNodesAndTimingByRequestId(nodeTimings) {
  const requestIdToNode = /* @__PURE__ */ new Map();
  for (const [node, nodeTiming] of nodeTimings) {
    if (node.type !== "network") continue;
    requestIdToNode.set(node.request.requestId, { node, nodeTiming });
  }
  return requestIdToNode;
}
__name(getNodesAndTimingByRequestId, "getNodesAndTimingByRequestId");
function adjustNodeTimings(adjustedNodeTimings, node, Stacks) {
  const nodeTiming = adjustedNodeTimings.get(node);
  if (!nodeTiming) return;
  const stackSpecificTiming = computeStackSpecificTiming(node, nodeTiming, Stacks);
  const difference = nodeTiming.duration - stackSpecificTiming.duration;
  if (!difference) return;
  node.traverse((childNode) => {
    adjustedNodeTimings.delete(childNode);
  });
  adjustedNodeTimings.set(node, stackSpecificTiming);
}
__name(adjustNodeTimings, "adjustNodeTimings");
function computeStackSpecificTiming(node, nodeTiming, Stacks) {
  const stackSpecificTiming = { ...nodeTiming };
  if (Stacks.some((stack) => stack.id === "amp")) {
    if (node.type === graph_exports.BaseNode.types.NETWORK && node.request.resourceType === NetworkRequest.TYPES.Stylesheet && nodeTiming.endTime > 2100) {
      stackSpecificTiming.endTime = Math.max(nodeTiming.startTime, 2100);
      stackSpecificTiming.duration = stackSpecificTiming.endTime - stackSpecificTiming.startTime;
    }
  }
  return stackSpecificTiming;
}
__name(computeStackSpecificTiming, "computeStackSpecificTiming");
var RenderBlockingResources = class _RenderBlockingResources extends Audit {
  static {
    __name(this, "RenderBlockingResources");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "render-blocking-resources",
      title: str_(UIStrings2.title),
      supportedModes: ["navigation"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      description: str_(UIStrings2.description),
      guidanceLevel: 2,
      // TODO: look into adding an `optionalArtifacts` property that captures the non-required nature
      // of CSSUsage
      requiredArtifacts: (
        // eslint-disable-next-line max-len
        ["URL", "Trace", "DevtoolsLog", "Stylesheets", "CSSUsage", "GatherContext", "Stacks", "SourceMaps"]
      )
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<{fcpWastedMs: number, lcpWastedMs: number, results: Array<{url: string, totalBytes: number, wastedMs: number}>}>}
   */
  static async computeResults(artifacts, context) {
    const settings = context.settings;
    const gatherContext = artifacts.GatherContext;
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const SourceMaps = artifacts.SourceMaps;
    const simulatorData = { devtoolsLog, settings: context.settings };
    const simulator = await LoadSimulatorComputed.request(simulatorData, context);
    const wastedCssBytes = await _RenderBlockingResources.computeWastedCSSBytes(artifacts, context);
    const navInsights = await NavigationInsightsComputed.request({ trace, settings, SourceMaps }, context);
    const renderBlocking = navInsights.model.RenderBlocking;
    if (renderBlocking instanceof Error) throw renderBlocking;
    const metricSettings = {
      ...context.settings,
      throttlingMethod: "simulate"
    };
    const metricComputationData = {
      trace,
      devtoolsLog,
      gatherContext,
      simulator,
      settings: metricSettings,
      URL: artifacts.URL,
      SourceMaps: artifacts.SourceMaps
    };
    const fcpSimulation = (
      /** @type {LH.Artifacts.LanternMetric} */
      await FirstContentfulPaintComputed.request(metricComputationData, context)
    );
    const nodesAndTimingsByRequestId = getNodesAndTimingByRequestId(fcpSimulation.optimisticEstimate.nodeTimings);
    const results = [];
    const deferredNodeIds = /* @__PURE__ */ new Set();
    for (const resource of renderBlocking.renderBlockingRequests) {
      const nodeAndTiming = nodesAndTimingsByRequestId.get(resource.args.data.requestId);
      if (!nodeAndTiming) continue;
      const { node, nodeTiming } = nodeAndTiming;
      const stackSpecificTiming = computeStackSpecificTiming(node, nodeTiming, artifacts.Stacks);
      node.traverse((node2) => deferredNodeIds.add(node2.id));
      const wastedMs = Math.round(stackSpecificTiming.duration);
      if (wastedMs < MINIMUM_WASTED_MS) continue;
      results.push({
        url: resource.args.data.url,
        totalBytes: node.request.transferSize,
        wastedMs
      });
    }
    if (!results.length) {
      return { results, fcpWastedMs: 0, lcpWastedMs: 0 };
    }
    const fcpWastedMs = _RenderBlockingResources.estimateSavingsWithGraphs(
      simulator,
      fcpSimulation.optimisticGraph,
      deferredNodeIds,
      wastedCssBytes,
      artifacts.Stacks
    );
    const lcpRecord = await LCPImageRecordComputed.request(metricComputationData, context);
    return { results, fcpWastedMs, lcpWastedMs: lcpRecord ? 0 : fcpWastedMs };
  }
  /**
   * Estimates how much faster this page would reach FCP if we inlined all the used CSS from the
   * render blocking stylesheets and deferred all the scripts. This is more conservative than
   * removing all the assets and more aggressive than inlining everything.
   *
   * *Most* of the time, scripts in the head are there accidentally/due to lack of awareness
   * rather than necessity, so we're comfortable with this balance. In the worst case, we're telling
   * devs that they should be able to get to a reasonable first paint without JS, which is not a bad
   * thing.
   *
   * @param {LH.Gatherer.Simulation.Simulator} simulator
   * @param {LH.Gatherer.Simulation.GraphNode} fcpGraph
   * @param {Set<string>} deferredIds
   * @param {Map<string, number>} wastedCssBytesByUrl
   * @param {LH.Artifacts.DetectedStack[]} Stacks
   * @return {number}
   */
  static estimateSavingsWithGraphs(simulator, fcpGraph, deferredIds, wastedCssBytesByUrl, Stacks) {
    const { nodeTimings } = simulator.simulate(fcpGraph);
    const adjustedNodeTimings = new Map(nodeTimings);
    let totalChildNetworkBytes = 0;
    const minimalFCPGraph = fcpGraph.cloneWithRelationships((node) => {
      adjustNodeTimings(adjustedNodeTimings, node, Stacks);
      const canDeferRequest = deferredIds.has(node.id);
      if (node.type !== graph_exports.BaseNode.types.NETWORK) return !canDeferRequest;
      const isStylesheet = node.request.resourceType === NetworkRequest.TYPES.Stylesheet;
      if (canDeferRequest && isStylesheet) {
        const wastedBytes = wastedCssBytesByUrl.get(node.request.url) || 0;
        totalChildNetworkBytes += (node.request.transferSize || 0) - wastedBytes;
      }
      return !canDeferRequest;
    });
    if (minimalFCPGraph.type !== "network") {
      throw new Error("minimalFCPGraph not a NetworkNode");
    }
    const estimateBeforeInline = Math.max(...Array.from(
      Array.from(adjustedNodeTimings).map((timing) => timing[1].endTime)
    ));
    const originalTransferSize = minimalFCPGraph.request.transferSize;
    const safeTransferSize = originalTransferSize || 0;
    minimalFCPGraph.request.transferSize = safeTransferSize + totalChildNetworkBytes;
    const estimateAfterInline = simulator.simulate(minimalFCPGraph).timeInMs;
    minimalFCPGraph.request.transferSize = originalTransferSize;
    return Math.round(Math.max(estimateBeforeInline - estimateAfterInline, 0));
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<Map<string, number>>}
   */
  static async computeWastedCSSBytes(artifacts, context) {
    const wastedBytesByUrl = /* @__PURE__ */ new Map();
    try {
      const unusedCssItems = await UnusedCSSComputed.request({
        Stylesheets: artifacts.Stylesheets,
        CSSUsage: artifacts.CSSUsage,
        devtoolsLog: artifacts.DevtoolsLog
      }, context);
      for (const item of unusedCssItems) {
        wastedBytesByUrl.set(item.url, item.wastedBytes);
      }
    } catch {
    }
    return wastedBytesByUrl;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const { results, fcpWastedMs, lcpWastedMs } = await _RenderBlockingResources.computeResults(artifacts, context);
    let displayValue;
    if (results.length > 0) {
      displayValue = str_(UIStrings.displayValueMsSavings, { wastedMs: fcpWastedMs });
    }
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnTransferSize) },
      { key: "wastedMs", valueType: "timespanMs", label: str_(UIStrings.columnDuration) }
    ];
    const details = Audit.makeOpportunityDetails(
      headings,
      results,
      { overallSavingsMs: fcpWastedMs }
    );
    return {
      displayValue,
      score: results.length ? 0 : 1,
      numericValue: fcpWastedMs,
      numericUnit: "millisecond",
      details,
      metricSavings: { FCP: fcpWastedMs, LCP: lcpWastedMs }
    };
  }
};
var render_blocking_resources_default = RenderBlockingResources;
export {
  UIStrings2 as UIStrings,
  render_blocking_resources_default as default
};
/*! Bundled license information:

lighthouse/core/computed/navigation-insights.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/audits/byte-efficiency/render-blocking-resources.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
