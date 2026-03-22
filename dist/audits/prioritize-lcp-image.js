import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "./chunk-HZ5CS3EU.js";
import {
  LCPImageRecordComputed
} from "./chunk-4MRT5KFH.js";
import {
  LanternLargestContentfulPaintComputed
} from "./chunk-KWLN6AZG.js";
import "./chunk-GPJRF3VM.js";
import "./chunk-GOQIOX72.js";
import "./chunk-GPGXHKXU.js";
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
  NetworkRequest
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

// node_modules/lighthouse/core/audits/prioritize-lcp-image.js
var UIStrings2 = {
  /** Title of a lighthouse audit that tells a user to preload an image in order to improve their LCP time. */
  title: "Preload Largest Contentful Paint image",
  /** Description of a lighthouse audit that tells a user to preload an image in order to improve their LCP time.  */
  description: "If the LCP element is dynamically added to the page, you should preload the image in order to improve LCP. [Learn more about preloading LCP elements](https://web.dev/articles/optimize-lcp#optimize_when_the_resource_is_discovered)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var PrioritizeLcpImage = class _PrioritizeLcpImage extends Audit {
  static {
    __name(this, "PrioritizeLcpImage");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "prioritize-lcp-image",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      supportedModes: ["navigation"],
      guidanceLevel: 4,
      requiredArtifacts: [
        "Trace",
        "DevtoolsLog",
        "GatherContext",
        "URL",
        "TraceElements",
        "SourceMaps"
      ],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   *
   * @param {LH.Artifacts.NetworkRequest} request
   * @param {LH.Artifacts.NetworkRequest} mainResource
   * @param {InitiatorPath} initiatorPath
   * @return {boolean}
   */
  static shouldPreloadRequest(request, mainResource, initiatorPath) {
    if (request.isLinkPreload) return false;
    if (NetworkRequest.isNonNetworkRequest(request)) return false;
    if (initiatorPath.length <= 2) return false;
    return request.frameId === mainResource.frameId;
  }
  /**
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @param {NetworkRequest} lcpRecord
   * @return {LH.Gatherer.Simulation.GraphNetworkNode|undefined}
   */
  static findLCPNode(graph, lcpRecord) {
    for (const { node } of graph.traverseGenerator()) {
      if (node.type !== "network") continue;
      if (node.request.requestId === lcpRecord.requestId) {
        return node;
      }
    }
  }
  /**
   * Get the initiator path starting with lcpRecord back to mainResource, inclusive.
   * Navigation redirects *to* the mainResource are not included.
   * Path returned will always be at least [lcpRecord, mainResource].
   * @param {NetworkRequest} lcpRecord
   * @param {NetworkRequest} mainResource
   * @return {InitiatorPath}
   */
  static getLcpInitiatorPath(lcpRecord, mainResource) {
    const initiatorPath = [];
    let mainResourceReached = false;
    let request = lcpRecord;
    while (request) {
      mainResourceReached ||= request.requestId === mainResource.requestId;
      let initiatorType = request.initiator?.type ?? "other";
      if (request.initiatorRequest && request.initiatorRequest === request.redirectSource) {
        initiatorType = "redirect";
      }
      if (!request.initiatorRequest && !mainResourceReached) {
        initiatorType = "fallbackToMain";
      }
      initiatorPath.push({ url: request.url, initiatorType });
      if (mainResourceReached) break;
      request = request.initiatorRequest || mainResource;
    }
    return initiatorPath;
  }
  /**
   * @param {LH.Artifacts.NetworkRequest} mainResource
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @param {NetworkRequest|undefined} lcpRecord
   * @return {{lcpNodeToPreload?: LH.Gatherer.Simulation.GraphNetworkNode, initiatorPath?: InitiatorPath}}
   */
  static getLCPNodeToPreload(mainResource, graph, lcpRecord) {
    if (!lcpRecord) return {};
    const lcpNode = _PrioritizeLcpImage.findLCPNode(graph, lcpRecord);
    const initiatorPath = _PrioritizeLcpImage.getLcpInitiatorPath(lcpRecord, mainResource);
    if (!lcpNode) return { initiatorPath };
    const shouldPreload = _PrioritizeLcpImage.shouldPreloadRequest(lcpRecord, mainResource, initiatorPath);
    const lcpNodeToPreload = shouldPreload ? lcpNode : void 0;
    return {
      lcpNodeToPreload,
      initiatorPath
    };
  }
  /**
   * Computes the estimated effect of preloading the LCP image.
   * @param {LH.Artifacts.TraceElement} lcpElement
   * @param {LH.Gatherer.Simulation.GraphNetworkNode|undefined} lcpNode
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @param {LH.Gatherer.Simulation.Simulator} simulator
   * @return {{wastedMs: number, results: Array<{node: LH.Audit.Details.NodeValue, url: string, wastedMs: number}>}}
   */
  static computeWasteWithGraph(lcpElement, lcpNode, graph, simulator) {
    if (!lcpNode) {
      return {
        wastedMs: 0,
        results: []
      };
    }
    const modifiedGraph = graph.cloneWithRelationships();
    const dependenciesIds = /* @__PURE__ */ new Set();
    for (const node of lcpNode.getDependencies()) {
      dependenciesIds.add(node.id);
    }
    let modifiedLCPNode = null;
    let mainDocumentNode = null;
    for (const { node } of modifiedGraph.traverseGenerator()) {
      if (node.type !== "network") continue;
      if (node.isMainDocument()) {
        mainDocumentNode = node;
      } else if (node.id === lcpNode.id) {
        modifiedLCPNode = node;
      }
    }
    if (!mainDocumentNode) {
      throw new Error("Could not find main document node");
    }
    if (!modifiedLCPNode) {
      throw new Error("Could not find the LCP node");
    }
    modifiedLCPNode.removeAllDependencies();
    modifiedLCPNode.addDependency(mainDocumentNode);
    const simulationBeforeChanges = simulator.simulate(graph);
    const simulationAfterChanges = simulator.simulate(modifiedGraph);
    const lcpTimingsBefore = simulationBeforeChanges.nodeTimings.get(lcpNode);
    if (!lcpTimingsBefore) throw new Error("Impossible - node timings should never be undefined");
    const lcpTimingsAfter = simulationAfterChanges.nodeTimings.get(modifiedLCPNode);
    if (!lcpTimingsAfter) throw new Error("Impossible - node timings should never be undefined");
    const modifiedNodesById = Array.from(simulationAfterChanges.nodeTimings.keys()).reduce((map, node) => map.set(node.id, node), /* @__PURE__ */ new Map());
    let maxDependencyEndTime = 0;
    for (const nodeId of Array.from(dependenciesIds)) {
      const node = modifiedNodesById.get(nodeId);
      if (!node) throw new Error("Impossible - node should never be undefined");
      const timings = simulationAfterChanges.nodeTimings.get(node);
      const endTime = timings?.endTime || 0;
      maxDependencyEndTime = Math.max(maxDependencyEndTime, endTime);
    }
    const wastedMs = lcpTimingsBefore.endTime - Math.max(lcpTimingsAfter.endTime, maxDependencyEndTime);
    return {
      wastedMs,
      results: [{
        node: Audit.makeNodeItem(lcpElement.node),
        url: lcpNode.request.url,
        wastedMs
      }]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const gatherContext = artifacts.GatherContext;
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const { URL, SourceMaps } = artifacts;
    const settings = context.settings;
    const metricData = { trace, devtoolsLog, gatherContext, settings, URL, SourceMaps, simulator: null };
    const lcpElement = artifacts.TraceElements.find((element) => element.traceEventType === "largest-contentful-paint");
    if (!lcpElement || lcpElement.type !== "image") {
      return { score: null, notApplicable: true, metricSavings: { LCP: 0 } };
    }
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL }, context);
    const lanternLCP = await LanternLargestContentfulPaintComputed.request(metricData, context);
    const simulator = await LoadSimulatorComputed.request({ devtoolsLog, settings }, context);
    const lcpImageRecord = await LCPImageRecordComputed.request({ trace, devtoolsLog }, context);
    const graph = lanternLCP.pessimisticGraph;
    const { lcpNodeToPreload, initiatorPath } = _PrioritizeLcpImage.getLCPNodeToPreload(
      mainResource,
      graph,
      lcpImageRecord
    );
    const { results, wastedMs } = _PrioritizeLcpImage.computeWasteWithGraph(lcpElement, lcpNodeToPreload, graph, simulator);
    const headings = [
      { key: "node", valueType: "node", label: "" },
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "wastedMs", valueType: "timespanMs", label: str_(UIStrings.columnWastedMs) }
    ];
    const details = Audit.makeOpportunityDetails(
      headings,
      results,
      { overallSavingsMs: wastedMs, sortedBy: ["wastedMs"] }
    );
    if (initiatorPath) {
      details.debugData = {
        type: "debugdata",
        initiatorPath,
        pathLength: initiatorPath.length
      };
    }
    return {
      score: results.length ? 0 : 1,
      numericValue: wastedMs,
      numericUnit: "millisecond",
      displayValue: wastedMs ? str_(UIStrings.displayValueMsSavings, { wastedMs }) : "",
      details,
      metricSavings: { LCP: wastedMs }
    };
  }
};
var prioritize_lcp_image_default = PrioritizeLcpImage;
export {
  UIStrings2 as UIStrings,
  prioritize_lcp_image_default as default
};
/*! Bundled license information:

lighthouse/core/audits/prioritize-lcp-image.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
