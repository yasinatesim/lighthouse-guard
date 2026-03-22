import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ProcessedNavigationComputed
} from "./chunk-ZFITDNXI.js";
import {
  ProcessedTraceComputed
} from "./chunk-RI7XYKZY.js";
import {
  TraceProcessor
} from "./chunk-NUK2ASLP.js";
import {
  NetworkRecordsComputed
} from "./chunk-AB7S44AE.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/metrics/metric.js
var Metric = class {
  static {
    __name(this, "Metric");
  }
  constructor() {
  }
  /**
   * Narrows the metric computation data to the input so child metric requests can be cached.
   *
   * @param {LH.Artifacts.MetricComputationData} data
   * @return {LH.Artifacts.MetricComputationDataInput}
   */
  static getMetricComputationInput(data) {
    return {
      trace: data.trace,
      devtoolsLog: data.devtoolsLog,
      gatherContext: data.gatherContext,
      settings: data.settings,
      URL: data.URL,
      SourceMaps: data.SourceMaps,
      simulator: null
    };
  }
  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric|LH.Artifacts.Metric>}
   */
  static computeSimulatedMetric(data, context) {
    throw new Error("Unimplemented");
  }
  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static computeObservedMetric(data, context) {
    throw new Error("Unimplemented");
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric|LH.Artifacts.Metric>}
   */
  static async compute_(data, context) {
    const { trace, devtoolsLog, settings, gatherContext } = data;
    if (!trace || !devtoolsLog || !settings) {
      throw new Error("Did not provide necessary metric computation data");
    }
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const processedNavigation = gatherContext.gatherMode === "timespan" ? void 0 : await ProcessedNavigationComputed.request(trace, context);
    const augmentedData = Object.assign({
      networkRecords: await NetworkRecordsComputed.request(devtoolsLog, context),
      gatherContext,
      processedTrace,
      processedNavigation
    }, data);
    TraceProcessor.assertHasToplevelEvents(augmentedData.processedTrace.mainThreadEvents);
    switch (settings.throttlingMethod) {
      case "simulate":
        if (gatherContext.gatherMode !== "navigation") {
          throw new Error(`${gatherContext.gatherMode} does not support throttlingMethod simulate`);
        }
        return this.computeSimulatedMetric(augmentedData, context);
      case "provided":
      case "devtools":
        return this.computeObservedMetric(augmentedData, context);
      default:
        throw new TypeError(`Unrecognized throttling method: ${settings.throttlingMethod}`);
    }
  }
};
var metric_default = Metric;

// node_modules/lighthouse/core/computed/metrics/navigation-metric.js
var NavigationMetric = class extends metric_default {
  static {
    __name(this, "NavigationMetric");
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric|LH.Artifacts.Metric>}
   */
  static computeSimulatedMetric(data, context) {
    throw new Error("Unimplemented");
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static computeObservedMetric(data, context) {
    throw new Error("Unimplemented");
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric|LH.Artifacts.Metric>}
   */
  static async compute_(data, context) {
    if (data.gatherContext.gatherMode !== "navigation") {
      throw new Error(`${this.name} can only be computed on navigations`);
    }
    return super.compute_(data, context);
  }
};

export {
  metric_default,
  NavigationMetric
};
/*! Bundled license information:

lighthouse/core/computed/metrics/metric.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/computed/metrics/navigation-metric.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
