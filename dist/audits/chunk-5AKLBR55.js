import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TraceEngineResultComputed
} from "./chunk-HDGMQKEX.js";
import {
  ProcessedTraceComputed
} from "./chunk-RI7XYKZY.js";
import {
  LanternComputationData_exports,
  NetworkRecordsComputed,
  NetworkRequest,
  graph_exports
} from "./chunk-AB7S44AE.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/page-dependency-graph.js
var PageDependencyGraph = class {
  static {
    __name(this, "PageDependencyGraph");
  }
  /**
   * @param {{trace: LH.Trace, devtoolsLog: LH.DevtoolsLog, settings: LH.Audit.Context['settings'], URL: LH.Artifacts['URL'], SourceMaps: LH.Artifacts['SourceMaps'], fromTrace: boolean}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Gatherer.Simulation.GraphNode>}
   */
  static async compute_(data, context) {
    const { trace, settings, devtoolsLog, URL, SourceMaps } = data;
    const [{ mainThreadEvents }, networkRecords] = await Promise.all([
      ProcessedTraceComputed.request(trace, context),
      NetworkRecordsComputed.request(devtoolsLog, context)
    ]);
    if (data.fromTrace) {
      const traceEngineResult = await TraceEngineResultComputed.request({ trace, settings, SourceMaps }, context);
      const parsedTrace = traceEngineResult.parsedTrace;
      const requests = LanternComputationData_exports.createNetworkRequests(trace, parsedTrace);
      const graph = LanternComputationData_exports.createGraph(requests, trace, parsedTrace, URL);
      return graph;
    }
    const lanternRequests = networkRecords.map(NetworkRequest.asLanternNetworkRequest);
    return graph_exports.PageDependencyGraph.createGraph(mainThreadEvents, lanternRequests, URL);
  }
};
var PageDependencyGraphComputed = makeComputedArtifact(
  PageDependencyGraph,
  ["devtoolsLog", "settings", "trace", "URL", "SourceMaps", "fromTrace"]
);

export {
  PageDependencyGraphComputed
};
/*! Bundled license information:

lighthouse/core/computed/page-dependency-graph.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
