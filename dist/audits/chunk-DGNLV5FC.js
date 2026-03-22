import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LCPImageRecordComputed
} from "./chunk-TMQPGYS4.js";
import {
  LanternLargestContentfulPaintComputed
} from "./chunk-4PONSSZA.js";
import {
  LanternFirstContentfulPaintComputed
} from "./chunk-YN3ARENP.js";
import {
  LoadSimulatorComputed
} from "./chunk-GRLAFLTF.js";
import {
  NetworkRecordsComputed
} from "./chunk-JDNHHZFJ.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";

// node_modules/lighthouse/core/audits/byte-efficiency/byte-efficiency-audit.js
var str_ = createIcuMessageFn(import.meta.url, {});
var WASTED_MS_P10 = 150;
var WASTED_MS_MEDIAN = 935;
var ByteEfficiencyAudit = class extends Audit {
  /**
   * Creates a score based on the wastedMs value using log-normal distribution scoring. A negative
   * wastedMs will be scored as 1, assuming time is not being wasted with respect to the opportunity
   * being measured.
   *
   * @param {number} wastedMs
   * @return {number}
   */
  static scoreForWastedMs(wastedMs) {
    return Audit.computeLogNormalScore(
      { p10: WASTED_MS_P10, median: WASTED_MS_MEDIAN },
      wastedMs
    );
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const gatherContext = artifacts.GatherContext;
    const devtoolsLog = artifacts.DevtoolsLog;
    const settings = context?.settings || {};
    const simulatorOptions = {
      devtoolsLog,
      settings
    };
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const hasContentfulRecords = networkRecords.some((record) => record.transferSize);
    if (!hasContentfulRecords && gatherContext.gatherMode === "timespan") {
      return {
        score: 1,
        notApplicable: true
      };
    }
    const metricComputationInput = Audit.makeMetricComputationDataInput(artifacts, context);
    const [result, simulator] = await Promise.all([
      this.audit_(artifacts, networkRecords, context),
      LoadSimulatorComputed.request(simulatorOptions, context)
    ]);
    return this.createAuditProduct(result, simulator, metricComputationInput, context);
  }
  /**
   * Computes the estimated effect of all the byte savings on the provided graph.
   *
   * @param {Array<LH.Audit.ByteEfficiencyItem>} results The array of byte savings results per resource
   * @param {LH.Gatherer.Simulation.GraphNode} graph
   * @param {LH.Gatherer.Simulation.Simulator} simulator
   * @param {{label?: string, providedWastedBytesByUrl?: Map<string, number>}=} options
   * @return {{savings: number, simulationBeforeChanges: LH.Gatherer.Simulation.Result, simulationAfterChanges: LH.Gatherer.Simulation.Result}}
   */
  static computeWasteWithGraph(results, graph, simulator, options) {
    options = Object.assign({ label: "" }, options);
    const beforeLabel = `${this.meta.id}-${options.label}-before`;
    const afterLabel = `${this.meta.id}-${options.label}-after`;
    const simulationBeforeChanges = simulator.simulate(graph, { label: beforeLabel });
    const wastedBytesByUrl = options.providedWastedBytesByUrl || /* @__PURE__ */ new Map();
    if (!options.providedWastedBytesByUrl) {
      for (const { url, wastedBytes } of results) {
        wastedBytesByUrl.set(url, (wastedBytesByUrl.get(url) || 0) + wastedBytes);
      }
    }
    const originalTransferSizes = /* @__PURE__ */ new Map();
    graph.traverse((node) => {
      if (node.type !== "network") return;
      const wastedBytes = wastedBytesByUrl.get(node.request.url);
      if (!wastedBytes) return;
      const original = node.request.transferSize;
      originalTransferSizes.set(node.request.requestId, original);
      node.request.transferSize = Math.max(original - wastedBytes, 0);
    });
    const simulationAfterChanges = simulator.simulate(graph, { label: afterLabel });
    graph.traverse((node) => {
      if (node.type !== "network") return;
      const originalTransferSize = originalTransferSizes.get(node.request.requestId);
      if (originalTransferSize === void 0) return;
      node.request.transferSize = originalTransferSize;
    });
    const savings = simulationBeforeChanges.timeInMs - simulationAfterChanges.timeInMs;
    return {
      // Round waste to nearest 10ms
      savings: Math.round(Math.max(savings, 0) / 10) * 10,
      simulationBeforeChanges,
      simulationAfterChanges
    };
  }
  /**
   * @param {ByteEfficiencyProduct} result
   * @param {LH.Gatherer.Simulation.Simulator} simulator
   * @param {LH.Artifacts.MetricComputationDataInput} metricComputationInput
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async createAuditProduct(result, simulator, metricComputationInput, context) {
    const results = result.items.sort((itemA, itemB) => itemB.wastedBytes - itemA.wastedBytes);
    const wastedBytes = results.reduce((sum, item) => sum + item.wastedBytes, 0);
    const metricSavings = {
      FCP: 0,
      LCP: 0
    };
    let wastedMs;
    if (metricComputationInput.gatherContext.gatherMode === "navigation") {
      const optimisticFCPGraph = (await LanternFirstContentfulPaintComputed.request(metricComputationInput, context)).optimisticGraph;
      const optimisticLCPGraph = (await LanternLargestContentfulPaintComputed.request(metricComputationInput, context)).optimisticGraph;
      const { savings: fcpSavings } = this.computeWasteWithGraph(
        results,
        optimisticFCPGraph,
        simulator,
        { providedWastedBytesByUrl: result.wastedBytesByUrl, label: "fcp" }
      );
      const { savings: lcpGraphSavings } = this.computeWasteWithGraph(
        results,
        optimisticLCPGraph,
        simulator,
        { providedWastedBytesByUrl: result.wastedBytesByUrl, label: "lcp" }
      );
      let lcpRecordSavings = 0;
      const lcpRecord = await LCPImageRecordComputed.request(metricComputationInput, context);
      if (lcpRecord) {
        const lcpResult = results.find((result2) => result2.url === lcpRecord.url);
        if (lcpResult) {
          lcpRecordSavings = simulator.computeWastedMsFromWastedBytes(lcpResult.wastedBytes);
        }
      }
      metricSavings.FCP = fcpSavings;
      metricSavings.LCP = Math.max(lcpGraphSavings, lcpRecordSavings);
      wastedMs = metricSavings.LCP;
    } else {
      wastedMs = simulator.computeWastedMsFromWastedBytes(wastedBytes);
    }
    let displayValue = result.displayValue || "";
    if (typeof result.displayValue === "undefined" && wastedBytes) {
      displayValue = str_(UIStrings.displayValueByteSavings, { wastedBytes });
    }
    const sortedBy = result.sortedBy || ["wastedBytes"];
    const details = Audit.makeOpportunityDetails(
      result.headings,
      results,
      { overallSavingsMs: wastedMs, overallSavingsBytes: wastedBytes, sortedBy }
    );
    details.debugData = {
      type: "debugdata",
      metricSavings
    };
    return {
      explanation: result.explanation,
      warnings: result.warnings,
      displayValue,
      numericValue: wastedMs,
      numericUnit: "millisecond",
      score: results.length ? 0 : 1,
      details,
      metricSavings
    };
  }
  /* eslint-disable no-unused-vars */
  /**
   * @param {LH.Artifacts} artifacts
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Audit.Context} context
   * @return {ByteEfficiencyProduct|Promise<ByteEfficiencyProduct>}
   */
  static audit_(artifacts, networkRecords, context) {
    throw new Error("audit_ unimplemented");
  }
  /* eslint-enable no-unused-vars */
};

export {
  ByteEfficiencyAudit
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/byte-efficiency-audit.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
