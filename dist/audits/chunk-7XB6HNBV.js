import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "./chunk-32YVOUED.js";
import {
  PageDependencyGraphComputed
} from "./chunk-5AKLBR55.js";
import {
  NetworkRequest
} from "./chunk-AB7S44AE.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/critical-request-chains.js
var CriticalRequestChains = class _CriticalRequestChains {
  static {
    __name(this, "CriticalRequestChains");
  }
  /**
   * For now, we use network priorities as a proxy for "render-blocking"/critical-ness.
   * It's imperfect, but there is not a higher-fidelity signal available yet.
   * @see https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc
   * @param {Lantern.Types.NetworkRequest} request
   * @param {Lantern.Types.NetworkRequest} mainResource
   * @return {boolean}
   */
  static isCritical(request, mainResource) {
    if (!mainResource) {
      throw new Error("mainResource not provided");
    }
    if (request.requestId === mainResource.requestId) return true;
    if (request.isLinkPreload) {
      return false;
    }
    while (request.redirectDestination) {
      request = request.redirectDestination;
    }
    const isIframe = request.resourceType === NetworkRequest.TYPES.Document && request.frameId !== mainResource.frameId;
    const nonCriticalResourceTypes = [
      NetworkRequest.TYPES.Image,
      NetworkRequest.TYPES.XHR,
      NetworkRequest.TYPES.Fetch,
      NetworkRequest.TYPES.EventSource
    ];
    if (nonCriticalResourceTypes.includes(request.resourceType || "Other") || isIframe || request.mimeType && request.mimeType.startsWith("image/")) {
      return false;
    }
    if (!request.initiatorRequest) return false;
    return ["VeryHigh", "High", "Medium"].includes(request.priority);
  }
  /**
   * Create a tree of critical requests.
   * @param {LH.Artifacts.NetworkRequest} mainResource
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @return {LH.Artifacts.CriticalRequestNode}
   */
  static extractChainsFromGraph(mainResource, graph) {
    const rootNode = {};
    function addChain(path) {
      let currentNode = rootNode;
      for (const record of path) {
        if (!currentNode[record.requestId]) {
          currentNode[record.requestId] = {
            request: record,
            children: {}
          };
        }
        currentNode = currentNode[record.requestId].children;
      }
    }
    __name(addChain, "addChain");
    const seenNodes = /* @__PURE__ */ new Set();
    function getNextNodes(node) {
      return node.getDependents().filter((n) => n.getDependencies().every((d) => seenNodes.has(d)));
    }
    __name(getNextNodes, "getNextNodes");
    graph.traverse((node, traversalPath) => {
      seenNodes.add(node);
      if (node.type !== "network") return;
      if (!_CriticalRequestChains.isCritical(node.request, mainResource)) return;
      const networkPath = traversalPath.filter((n) => n.type === "network").reverse().map((node2) => node2.rawRequest);
      if (networkPath.some((r) => !_CriticalRequestChains.isCritical(r, mainResource))) return;
      if (NetworkRequest.isNonNetworkRequest(node.request)) return;
      addChain(networkPath);
    }, getNextNodes);
    return rootNode;
  }
  /**
   * @param {{URL: LH.Artifacts['URL'], SourceMaps: LH.Artifacts['SourceMaps'], devtoolsLog: LH.DevtoolsLog, trace: LH.Trace, settings: LH.Audit.Context['settings']}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.CriticalRequestNode>}
   */
  static async compute_(data, context) {
    const mainResource = await MainResourceComputed.request(data, context);
    const graph = await PageDependencyGraphComputed.request({ ...data, fromTrace: false }, context);
    return _CriticalRequestChains.extractChainsFromGraph(mainResource, graph);
  }
};
var CriticalRequestChainsComputed = makeComputedArtifact(
  CriticalRequestChains,
  ["URL", "SourceMaps", "devtoolsLog", "trace", "settings"]
);

export {
  CriticalRequestChainsComputed
};
/*! Bundled license information:

lighthouse/core/computed/critical-request-chains.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
