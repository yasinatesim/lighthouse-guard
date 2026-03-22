import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TotalBlockingTimeComputed
} from "./chunk-D5OOLMSC.js";
import {
  MainThreadTasksComputed
} from "./chunk-DESG734R.js";
import {
  taskGroups
} from "./chunk-UE3SWGEC.js";
import "./chunk-AEG256KD.js";
import "./chunk-SPBZCMTA.js";
import "./chunk-E4NYJWSQ.js";
import "./chunk-5FAUCPF6.js";
import "./chunk-VUSO5I4V.js";
import "./chunk-ZFITDNXI.js";
import "./chunk-5AKLBR55.js";
import "./chunk-HDGMQKEX.js";
import "./chunk-LBG2XUR7.js";
import {
  Sentry
} from "./chunk-2DV6G4YM.js";
import "./chunk-EXNQHM7K.js";
import "./chunk-UNPQMFMQ.js";
import "./chunk-RI7XYKZY.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import "./chunk-AB7S44AE.js";
import "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-4MZOSFEN.js";
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/mainthread-work-breakdown.js
var UIStrings2 = {
  /** Title of a diagnostic audit that provides detail on the main thread work the browser did to load the page. This descriptive title is shown to users when the amount is acceptable and no user action is required. */
  title: "Minimizes main-thread work",
  /** Title of a diagnostic audit that provides detail on the main thread work the browser did to load the page. This imperative title is shown to users when there is a significant amount of execution time that could be reduced. */
  failureTitle: "Minimize main-thread work",
  /** Description of a Lighthouse audit that tells the user *why* they should reduce JS execution times. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)",
  /** Label for the Main Thread Category column in data tables, rows will have a main thread Category and main thread Task Name. */
  columnCategory: "Category"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var MainThreadWorkBreakdown = class _MainThreadWorkBreakdown extends Audit {
  static {
    __name(this, "MainThreadWorkBreakdown");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "mainthread-work-breakdown",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 1,
      requiredArtifacts: ["Trace", "DevtoolsLog", "URL", "GatherContext", "SourceMaps"]
    };
  }
  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // see https://www.desmos.com/calculator/vhglu1x8zv
      p10: 2017,
      median: 4e3
    };
  }
  /**
   * @param {LH.Artifacts.TaskNode[]} tasks
   * @return {Map<TaskGroupIds, number>}
   */
  static getExecutionTimingsByGroup(tasks) {
    const result = /* @__PURE__ */ new Map();
    for (const task of tasks) {
      const originalTime = result.get(task.group.id) || 0;
      result.set(task.group.id, originalTime + task.selfTime);
    }
    return result;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const settings = context.settings || {};
    const trace = artifacts.Trace;
    let tbtSavings = 0;
    try {
      const metricComputationData = Audit.makeMetricComputationDataInput(artifacts, context);
      const tbtResult = await TotalBlockingTimeComputed.request(metricComputationData, context);
      tbtSavings = tbtResult.timing;
    } catch (err) {
      Sentry.captureException(err, {
        tags: { audit: this.meta.id },
        level: "error"
      });
      lighthouse_logger_default.error(this.meta.id, err.message);
    }
    const tasks = await MainThreadTasksComputed.request(trace, context);
    const multiplier = settings.throttlingMethod === "simulate" ? settings.throttling.cpuSlowdownMultiplier : 1;
    const executionTimings = _MainThreadWorkBreakdown.getExecutionTimingsByGroup(tasks);
    let totalExecutionTime = 0;
    const categoryTotals = {};
    const results = Array.from(executionTimings).map(([groupId, rawDuration]) => {
      const duration = rawDuration * multiplier;
      totalExecutionTime += duration;
      const categoryTotal = categoryTotals[groupId] || 0;
      categoryTotals[groupId] = categoryTotal + duration;
      return {
        group: groupId,
        groupLabel: taskGroups[groupId].label,
        duration
      };
    });
    const headings = [
      /* eslint-disable max-len */
      { key: "groupLabel", valueType: "text", label: str_(UIStrings2.columnCategory) },
      { key: "duration", valueType: "ms", granularity: 1, label: str_(UIStrings.columnTimeSpent) }
      /* eslint-enable max-len */
    ];
    results.sort((a, b) => categoryTotals[b.group] - categoryTotals[a.group]);
    const tableDetails = _MainThreadWorkBreakdown.makeTableDetails(
      headings,
      results,
      { sortedBy: ["duration"] }
    );
    const score = Audit.computeLogNormalScore(
      { p10: context.options.p10, median: context.options.median },
      totalExecutionTime
    );
    return {
      score,
      numericValue: totalExecutionTime,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.seconds, { timeInMs: totalExecutionTime }),
      details: tableDetails,
      metricSavings: {
        TBT: tbtSavings
      }
    };
  }
};
var mainthread_work_breakdown_default = MainThreadWorkBreakdown;
export {
  UIStrings2 as UIStrings,
  mainthread_work_breakdown_default as default
};
/*! Bundled license information:

lighthouse/core/audits/mainthread-work-breakdown.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
