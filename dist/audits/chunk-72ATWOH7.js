import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NavigationMetric
} from "./chunk-DGRQI5GC.js";
import {
  LanternFirstContentfulPaintComputed,
  getComputationDataParams,
  lanternErrorAdapter
} from "./chunk-YN3ARENP.js";
import {
  TraceProcessor
} from "./chunk-3WVTZQMF.js";
import {
  metrics_exports
} from "./chunk-JDNHHZFJ.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";

// node_modules/lighthouse/core/computed/metrics/lantern-max-potential-fid.js
var LanternMaxPotentialFID = class extends metrics_exports.MaxPotentialFID {
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @param {Omit<Lantern.Metrics.Extras, 'optimistic'>=} extras
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static async computeMetricWithGraphs(data, context, extras) {
    const params = await getComputationDataParams(data, context);
    return Promise.resolve(this.compute(params, extras)).catch(lanternErrorAdapter);
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static async compute_(data, context) {
    const fcpResult = await LanternFirstContentfulPaintComputed.request(data, context);
    return this.computeMetricWithGraphs(data, context, { fcpResult });
  }
};
var LanternMaxPotentialFIDComputed = makeComputedArtifact(
  LanternMaxPotentialFID,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

// node_modules/lighthouse/core/computed/metrics/max-potential-fid.js
var MaxPotentialFID = class extends NavigationMetric {
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric(data, context) {
    const metricData = NavigationMetric.getMetricComputationInput(data);
    return LanternMaxPotentialFIDComputed.request(metricData, context);
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static computeObservedMetric(data) {
    const { firstContentfulPaint } = data.processedNavigation.timings;
    const events = TraceProcessor.getMainThreadTopLevelEvents(
      data.processedTrace,
      firstContentfulPaint
    ).filter((evt) => evt.duration >= 1);
    return Promise.resolve({
      timing: Math.max(...events.map((evt) => evt.duration), 16)
    });
  }
};
var MaxPotentialFIDComputed = makeComputedArtifact(
  MaxPotentialFID,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  MaxPotentialFIDComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/lantern-max-potential-fid.js:
lighthouse/core/computed/metrics/max-potential-fid.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
