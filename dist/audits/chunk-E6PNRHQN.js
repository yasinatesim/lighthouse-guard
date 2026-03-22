import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TotalBlockingTimeComputed
} from "./chunk-PJ4YREQU.js";
import {
  MainThreadTasksComputed
} from "./chunk-AJV4A5MH.js";
import {
  InteractiveComputed
} from "./chunk-FAQPRD3P.js";
import {
  FirstContentfulPaintComputed
} from "./chunk-T34BK2XK.js";
import {
  ProcessedTraceComputed
} from "./chunk-XFJEV2GR.js";
import {
  metrics_exports
} from "./chunk-YOYAIZOW.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/tbt-impact-tasks.js
var { calculateTbtImpactForEvent } = metrics_exports.TBTUtils;
var TBTImpactTasks = class {
  static {
    __name(this, "TBTImpactTasks");
  }
  /**
   * @param {LH.Artifacts.TaskNode} task
   * @return {LH.Artifacts.TaskNode}
   */
  static getTopLevelTask(task) {
    let topLevelTask = task;
    while (topLevelTask.parent) {
      topLevelTask = topLevelTask.parent;
    }
    return topLevelTask;
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} metricComputationData
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<{startTimeMs: number, endTimeMs: number}>}
   */
  static async getTbtBounds(metricComputationData, context) {
    const processedTrace = await ProcessedTraceComputed.request(metricComputationData.trace, context);
    if (metricComputationData.gatherContext.gatherMode !== "navigation") {
      return {
        startTimeMs: 0,
        endTimeMs: processedTrace.timings.traceEnd
      };
    }
    const fcpResult = await FirstContentfulPaintComputed.request(metricComputationData, context);
    const ttiResult = await InteractiveComputed.request(metricComputationData, context);
    let startTimeMs = fcpResult.timing;
    let endTimeMs = ttiResult.timing;
    if ("optimisticEstimate" in fcpResult) {
      startTimeMs = fcpResult.optimisticEstimate.timeInMs;
    }
    if ("pessimisticEstimate" in ttiResult) {
      endTimeMs = ttiResult.pessimisticEstimate.timeInMs;
    }
    return { startTimeMs, endTimeMs };
  }
  /**
   * @param {LH.Artifacts.TaskNode[]} tasks
   * @param {Map<LH.Artifacts.TaskNode, number>} taskToImpact
   * @param {Map<LH.Artifacts.TaskNode, number>} taskToBlockingTime
   */
  static createImpactTasks(tasks, taskToImpact, taskToBlockingTime) {
    const tbtImpactTasks = [];
    for (const task of tasks) {
      const tbtImpact = taskToImpact.get(task) || 0;
      let selfTbtImpact = tbtImpact;
      const blockingTime = taskToBlockingTime.get(task) || 0;
      let selfBlockingTime = blockingTime;
      for (const child of task.children) {
        const childTbtImpact = taskToImpact.get(child) || 0;
        selfTbtImpact -= childTbtImpact;
        const childBlockingTime = taskToBlockingTime.get(child) || 0;
        selfBlockingTime -= childBlockingTime;
      }
      tbtImpactTasks.push({
        ...task,
        // Floating point numbers are not perfectly precise, so the subtraction operations above
        // can sometimes output negative numbers close to 0 here. To prevent potentially confusing
        // output we should bump those values to 0.
        tbtImpact: Math.max(tbtImpact, 0),
        selfTbtImpact: Math.max(selfTbtImpact, 0),
        selfBlockingTime: Math.max(selfBlockingTime, 0)
      });
    }
    return tbtImpactTasks;
  }
  /**
   * @param {LH.Artifacts.TaskNode[]} tasks
   * @param {number} startTimeMs
   * @param {number} endTimeMs
   * @return {LH.Artifacts.TBTImpactTask[]}
   */
  static computeImpactsFromObservedTasks(tasks, startTimeMs, endTimeMs) {
    const taskToImpact = /* @__PURE__ */ new Map();
    const taskToBlockingTime = /* @__PURE__ */ new Map();
    for (const task of tasks) {
      const event = {
        start: task.startTime,
        end: task.endTime,
        duration: task.duration
      };
      const topLevelTask = this.getTopLevelTask(task);
      const topLevelEvent = {
        start: topLevelTask.startTime,
        end: topLevelTask.endTime,
        duration: topLevelTask.duration
      };
      const tbtImpact = calculateTbtImpactForEvent(event, startTimeMs, endTimeMs, topLevelEvent);
      const blockingTime = calculateTbtImpactForEvent(event, -Infinity, Infinity, topLevelEvent);
      taskToImpact.set(task, tbtImpact);
      taskToBlockingTime.set(task, blockingTime);
    }
    return this.createImpactTasks(tasks, taskToImpact, taskToBlockingTime);
  }
  /**
   * @param {LH.Artifacts.TaskNode[]} tasks
   * @param {LH.Gatherer.Simulation.Result['nodeTimings']} tbtNodeTimings
   * @param {number} startTimeMs
   * @param {number} endTimeMs
   * @return {LH.Artifacts.TBTImpactTask[]}
   */
  static computeImpactsFromLantern(tasks, tbtNodeTimings, startTimeMs, endTimeMs) {
    const taskToImpact = /* @__PURE__ */ new Map();
    const taskToBlockingTime = /* @__PURE__ */ new Map();
    const topLevelTaskToEvent = /* @__PURE__ */ new Map();
    const traceEventToTask = /* @__PURE__ */ new Map();
    for (const task of tasks) {
      traceEventToTask.set(task.event, task);
    }
    for (const [node, timing] of tbtNodeTimings) {
      if (node.type !== "cpu") continue;
      const event = {
        start: timing.startTime,
        end: timing.endTime,
        duration: timing.duration
      };
      const tbtImpact = calculateTbtImpactForEvent(event, startTimeMs, endTimeMs);
      const blockingTime = calculateTbtImpactForEvent(event, -Infinity, Infinity);
      const task = traceEventToTask.get(node.event);
      if (!task) continue;
      topLevelTaskToEvent.set(task, event);
      taskToImpact.set(task, tbtImpact);
      taskToBlockingTime.set(task, blockingTime);
    }
    for (const task of tasks) {
      if (taskToImpact.has(task) || taskToBlockingTime.has(task)) continue;
      const topLevelTask = this.getTopLevelTask(task);
      const topLevelEvent = topLevelTaskToEvent.get(topLevelTask);
      if (!topLevelEvent) continue;
      const startRatio = (task.startTime - topLevelTask.startTime) / topLevelTask.duration;
      const start = startRatio * topLevelEvent.duration + topLevelEvent.start;
      const endRatio = (topLevelTask.endTime - task.endTime) / topLevelTask.duration;
      const end = topLevelEvent.end - endRatio * topLevelEvent.duration;
      const event = {
        start,
        end,
        duration: end - start
      };
      const tbtImpact = calculateTbtImpactForEvent(event, startTimeMs, endTimeMs, topLevelEvent);
      const blockingTime = calculateTbtImpactForEvent(event, -Infinity, Infinity, topLevelEvent);
      taskToImpact.set(task, tbtImpact);
      taskToBlockingTime.set(task, blockingTime);
    }
    return this.createImpactTasks(tasks, taskToImpact, taskToBlockingTime);
  }
  /**
   * @param {LH.Artifacts.MetricComputationDataInput} metricComputationData
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.TBTImpactTask[]>}
   */
  static async compute_(metricComputationData, context) {
    const tbtResult = await TotalBlockingTimeComputed.request(metricComputationData, context);
    const tasks = await MainThreadTasksComputed.request(metricComputationData.trace, context);
    const { startTimeMs, endTimeMs } = await this.getTbtBounds(metricComputationData, context);
    if ("pessimisticEstimate" in tbtResult) {
      return this.computeImpactsFromLantern(
        tasks,
        tbtResult.pessimisticEstimate.nodeTimings,
        startTimeMs,
        endTimeMs
      );
    }
    return this.computeImpactsFromObservedTasks(tasks, startTimeMs, endTimeMs);
  }
};
var TBTImpactTasksComputed = makeComputedArtifact(
  TBTImpactTasks,
  ["trace", "devtoolsLog", "URL", "SourceMaps", "gatherContext", "settings", "simulator"]
);

export {
  TBTImpactTasksComputed
};
/*! Bundled license information:

lighthouse/core/computed/tbt-impact-tasks.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
