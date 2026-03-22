import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ProcessedNavigationComputed
} from "./chunk-IOK3BAH7.js";
import {
  PageDependencyGraphComputed
} from "./chunk-ZIUDIWBD.js";
import {
  TraceEngineResultComputed
} from "./chunk-Z7S4UQSE.js";
import {
  LoadSimulatorComputed
} from "./chunk-GRLAFLTF.js";
import {
  LanternComputationData_exports,
  core_exports,
  metrics_exports
} from "./chunk-JDNHHZFJ.js";
import {
  LighthouseError
} from "./chunk-2BIJ7VKV.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";

// node_modules/lighthouse/core/computed/metrics/lantern-metric.js
async function getComputationDataParamsFromDevtoolsLog(data, context) {
  if (data.gatherContext.gatherMode !== "navigation") {
    throw new Error(`Lantern metrics can only be computed on navigations`);
  }
  const graph = await PageDependencyGraphComputed.request({ ...data, fromTrace: false }, context);
  const processedNavigation = await ProcessedNavigationComputed.request(data.trace, context);
  const simulator = data.simulator || await LoadSimulatorComputed.request(data, context);
  return { simulator, graph, processedNavigation };
}
async function getComputationDataParamsFromTrace(data, context) {
  if (data.gatherContext.gatherMode !== "navigation") {
    throw new Error(`Lantern metrics can only be computed on navigations`);
  }
  const graph = await PageDependencyGraphComputed.request({ ...data, fromTrace: true }, context);
  const traceEngineResult = await TraceEngineResultComputed.request(data, context);
  const frameId = traceEngineResult.parsedTrace.Meta.mainFrameId;
  const navigationId = traceEngineResult.parsedTrace.Meta.mainFrameNavigations[0].args.data?.navigationId;
  if (!navigationId) {
    throw new Error(`Lantern metrics could not be calculated due to missing navigation id`);
  }
  const processedNavigation = LanternComputationData_exports.createProcessedNavigation(
    traceEngineResult.parsedTrace,
    frameId,
    navigationId
  );
  const simulator = data.simulator || await LoadSimulatorComputed.request(data, context);
  return { simulator, graph, processedNavigation };
}
function lanternErrorAdapter(err) {
  if (!(err instanceof core_exports.LanternError)) {
    throw err;
  }
  const code = (
    /** @type {keyof LighthouseError.errors} */
    err.message
  );
  if (LighthouseError.errors[code]) {
    throw new LighthouseError(LighthouseError.errors[code]);
  }
  throw err;
}
function getComputationDataParams(data, context) {
  if (process.env.INTERNAL_LANTERN_USE_TRACE !== void 0) {
    return getComputationDataParamsFromTrace(data, context);
  } else {
    return getComputationDataParamsFromDevtoolsLog(data, context);
  }
}

// node_modules/lighthouse/core/computed/metrics/lantern-first-contentful-paint.js
var LanternFirstContentfulPaint = class extends metrics_exports.FirstContentfulPaint {
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
    return this.computeMetricWithGraphs(data, context);
  }
};
var LanternFirstContentfulPaintComputed = makeComputedArtifact(
  LanternFirstContentfulPaint,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  lanternErrorAdapter,
  getComputationDataParams,
  LanternFirstContentfulPaintComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/lantern-metric.js:
lighthouse/core/computed/metrics/lantern-first-contentful-paint.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
