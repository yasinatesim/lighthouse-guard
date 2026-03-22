import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  getAttributableURLForTask,
  getJavaScriptURLs
} from "./chunk-KRP3ZBL5.js";
import {
  TotalBlockingTimeComputed
} from "./chunk-F3LBQ6H5.js";
import {
  MainThreadTasksComputed
} from "./chunk-FXMGSRO7.js";
import "./chunk-QBXT32HH.js";
import "./chunk-CRKKLQWT.js";
import "./chunk-K7WBVFH2.js";
import "./chunk-DGRQI5GC.js";
import "./chunk-4PONSSZA.js";
import "./chunk-YN3ARENP.js";
import "./chunk-IOK3BAH7.js";
import {
  PageDependencyGraphComputed
} from "./chunk-ZIUDIWBD.js";
import "./chunk-Z7S4UQSE.js";
import "./chunk-22N3WN7S.js";
import {
  LoadSimulatorComputed
} from "./chunk-GRLAFLTF.js";
import "./chunk-2FKQ374S.js";
import "./chunk-ZATS4KUU.js";
import "./chunk-FTKGXG7F.js";
import "./chunk-3WVTZQMF.js";
import "./chunk-3KEMYTTF.js";
import {
  NetworkRecordsComputed
} from "./chunk-JDNHHZFJ.js";
import "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/long-tasks.js
var DEFAULT_TIMING = { startTime: 0, endTime: 0, duration: 0 };
var DISPLAYED_TASK_COUNT = 20;
var UIStrings2 = {
  /** Title of a diagnostic LH audit that provides details on the longest running tasks that occur when the page loads. */
  title: "Avoid long main-thread tasks",
  /** Description of a diagnostic LH audit that shows the user the longest running tasks that occur when the page loads. */
  description: "Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. [Learn how to avoid long main-thread tasks](https://web.dev/articles/optimize-long-tasks)",
  /** [ICU Syntax] Label identifying the number of long-running CPU tasks that occurred while loading a web page. */
  displayValue: `{itemCount, plural,
  =1 {# long task found}
  other {# long tasks found}
  }`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
function insertUrl(urls, url) {
  const index = urls.indexOf(url);
  if (index > -1) return index;
  return urls.push(url) - 1;
}
function roundTenths(value) {
  return Math.round(value * 10) / 10;
}
var LongTasks = class _LongTasks extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "long-tasks",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["Trace", "DevtoolsLog", "URL", "GatherContext", "SourceMaps"],
      guidanceLevel: 1
    };
  }
  /**
   * Returns the timing information for the given task, recursively walking the
   * task's children and adding up time spent in each type of task activity.
   * If `taskTimingsByEvent` is present, it will be used for task timing instead
   * of the timings on the tasks themselves.
   * If `timeByTaskGroup` is not provided, a new Map will be populated with
   * timing breakdown; if one is provided, timing breakdown will be added to the
   * existing breakdown.
   *
   * TODO: when simulated, a significant number of child tasks are dropped, so
   * most time will be attributed to 'other' (the category of the top-level
   * RunTask). See pruning in `PageDependencyGraph.linkCPUNodes`.
   * @param {LH.Artifacts.TaskNode} task
   * @param {Map<Lantern.Types.TraceEvent, LH.Gatherer.Simulation.NodeTiming>|undefined} taskTimingsByEvent
   * @param {Map<TaskGroupIds, number>} [timeByTaskGroup]
   * @return {{startTime: number, duration: number, timeByTaskGroup: Map<TaskGroupIds, number>}}
   */
  static getTimingBreakdown(task, taskTimingsByEvent, timeByTaskGroup = /* @__PURE__ */ new Map()) {
    const taskTiming = _LongTasks.getTiming(task, taskTimingsByEvent);
    let childrenTime = 0;
    if (taskTiming.duration > 0) {
      for (const child of task.children) {
        const { duration } = _LongTasks.getTimingBreakdown(child, taskTimingsByEvent, timeByTaskGroup);
        childrenTime += duration;
      }
    }
    const selfTime = taskTiming.duration - childrenTime;
    const taskGroupTime = timeByTaskGroup.get(task.group.id) || 0;
    timeByTaskGroup.set(task.group.id, taskGroupTime + selfTime);
    return {
      startTime: taskTiming.startTime,
      duration: taskTiming.duration,
      timeByTaskGroup
    };
  }
  /**
   * @param {Array<LH.Artifacts.TaskNode>} longTasks
   * @param {Set<string>} jsUrls
   * @param {Map<Lantern.Types.TraceEvent, LH.Gatherer.Simulation.NodeTiming>|undefined} taskTimingsByEvent
   * @return {LH.Audit.Details.DebugData}
   */
  static makeDebugData(longTasks, jsUrls, taskTimingsByEvent) {
    const urls = [];
    const tasks = [];
    for (const longTask of longTasks) {
      const attributableUrl = getAttributableURLForTask(longTask, jsUrls);
      const { startTime, duration, timeByTaskGroup } = _LongTasks.getTimingBreakdown(longTask, taskTimingsByEvent);
      const timeByTaskGroupEntries = [...timeByTaskGroup].map(
        /** @return {[TaskGroupIds, number]} */
        ([group, time]) => [group, roundTenths(time)]
      ).sort((a, b) => a[0].localeCompare(b[0]));
      tasks.push({
        urlIndex: insertUrl(urls, attributableUrl),
        startTime: roundTenths(startTime),
        duration: roundTenths(duration),
        ...Object.fromEntries(timeByTaskGroupEntries)
      });
    }
    return {
      type: "debugdata",
      urls,
      tasks
    };
  }
  /**
   * Get timing from task, overridden by taskTimingsByEvent if provided.
   * @param {LH.Artifacts.TaskNode} task
   * @param {Map<Lantern.Types.TraceEvent, LH.Gatherer.Simulation.NodeTiming>|undefined} taskTimingsByEvent
   * @return {Timing}
   */
  static getTiming(task, taskTimingsByEvent) {
    let timing = task;
    if (taskTimingsByEvent) {
      timing = taskTimingsByEvent.get(task.event) || DEFAULT_TIMING;
    }
    const { duration, startTime } = timing;
    return { duration, startTime };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const settings = context.settings || {};
    const { URL, SourceMaps } = artifacts;
    const trace = artifacts.Trace;
    const tasks = await MainThreadTasksComputed.request(trace, context);
    const devtoolsLog = artifacts.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const metricComputationData = Audit.makeMetricComputationDataInput(artifacts, context);
    const tbtResult = await TotalBlockingTimeComputed.request(metricComputationData, context);
    let taskTimingsByEvent;
    if (settings.throttlingMethod === "simulate") {
      taskTimingsByEvent = /* @__PURE__ */ new Map();
      const simulatorOptions = { devtoolsLog, settings: context.settings };
      const pageGraph = (
        // eslint-disable-next-line max-len
        await PageDependencyGraphComputed.request({ settings, trace, devtoolsLog, URL, SourceMaps, fromTrace: false }, context)
      );
      const simulator = await LoadSimulatorComputed.request(simulatorOptions, context);
      const simulation = simulator.simulate(pageGraph, { label: "long-tasks-diagnostic" });
      for (const [node, timing] of simulation.nodeTimings.entries()) {
        if (node.type !== "cpu") continue;
        taskTimingsByEvent.set(node.event, timing);
      }
    }
    const jsURLs = getJavaScriptURLs(networkRecords);
    const longTasks = tasks.map((task) => {
      const { duration } = _LongTasks.getTiming(task, taskTimingsByEvent);
      return { task, duration };
    }).filter(({ task, duration }) => {
      return duration >= 50 && !task.unbounded && !task.parent;
    }).sort((a, b) => b.duration - a.duration).map(({ task }) => task);
    const results = longTasks.map((task) => {
      const timing = _LongTasks.getTiming(task, taskTimingsByEvent);
      return {
        url: getAttributableURLForTask(task, jsURLs),
        duration: timing.duration,
        startTime: timing.startTime
      };
    }).slice(0, DISPLAYED_TASK_COUNT);
    const headings = [
      /* eslint-disable max-len */
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "startTime", valueType: "ms", granularity: 1, label: str_(UIStrings.columnStartTime) },
      { key: "duration", valueType: "ms", granularity: 1, label: str_(UIStrings.columnDuration) }
      /* eslint-enable max-len */
    ];
    const tableDetails = Audit.makeTableDetails(
      headings,
      results,
      { sortedBy: ["duration"], skipSumming: ["startTime"] }
    );
    tableDetails.debugData = _LongTasks.makeDebugData(longTasks, jsURLs, taskTimingsByEvent);
    let displayValue;
    if (results.length > 0) {
      displayValue = str_(UIStrings2.displayValue, { itemCount: results.length });
    }
    return {
      score: results.length === 0 ? 1 : 0,
      notApplicable: results.length === 0,
      details: tableDetails,
      displayValue,
      metricSavings: {
        TBT: tbtResult.timing
      }
    };
  }
};
var long_tasks_default = LongTasks;
export {
  UIStrings2 as UIStrings,
  long_tasks_default as default
};
/*! Bundled license information:

lighthouse/core/audits/long-tasks.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
