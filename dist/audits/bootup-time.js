import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  getExecutionTimingsByURL
} from "./chunk-KRP3ZBL5.js";
import {
  TBTImpactTasksComputed
} from "./chunk-EMYN325U.js";
import "./chunk-F3LBQ6H5.js";
import {
  MainThreadTasksComputed
} from "./chunk-FXMGSRO7.js";
import {
  taskGroups
} from "./chunk-QBXT32HH.js";
import "./chunk-CRKKLQWT.js";
import "./chunk-K7WBVFH2.js";
import "./chunk-JY4RKQCD.js";
import "./chunk-DGRQI5GC.js";
import "./chunk-4PONSSZA.js";
import "./chunk-YN3ARENP.js";
import "./chunk-IOK3BAH7.js";
import "./chunk-ZIUDIWBD.js";
import "./chunk-Z7S4UQSE.js";
import "./chunk-22N3WN7S.js";
import {
  Sentry
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
import {
  lighthouse_logger_default
} from "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/bootup-time.js
var UIStrings2 = {
  /** Title of a diagnostic audit that provides detail on the time spent executing javascript files during the load. This descriptive title is shown to users when the amount is acceptable and no user action is required. */
  title: "JavaScript execution time",
  /** Title of a diagnostic audit that provides detail on the time spent executing javascript files during the load. This imperative title is shown to users when there is a significant amount of execution time that could be reduced. */
  failureTitle: "Reduce JavaScript execution time",
  /** Description of a Lighthouse audit that tells the user that they should reduce the amount of time spent executing javascript and one method of doing so. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to reduce Javascript execution time](https://developer.chrome.com/docs/lighthouse/performance/bootup-time/).",
  /** Label for the total time column in a data table; entries will be the number of milliseconds spent executing per resource loaded by the page. */
  columnTotal: "Total CPU Time",
  /** Label for a time column in a data table; entries will be the number of milliseconds spent evaluating script for every script loaded by the page. */
  columnScriptEval: "Script Evaluation",
  /** Label for a time column in a data table; entries will be the number of milliseconds spent parsing script files for every script loaded by the page. */
  columnScriptParse: "Script Parse",
  /** A message displayed in a Lighthouse audit result warning that Chrome extensions on the user's system substantially affected Lighthouse's measurements and instructs the user on how to run again without those extensions. */
  chromeExtensionsWarning: "Chrome extensions negatively affected this page's load performance. Try auditing the page in incognito mode or from a Chrome profile without extensions."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var BootupTime = class _BootupTime extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "bootup-time",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 1,
      requiredArtifacts: ["Trace", "DevtoolsLog", "URL", "GatherContext", "SourceMaps"]
    };
  }
  /**
   * @return {LH.Audit.ScoreOptions & {thresholdInMs: number}}
   */
  static get defaultOptions() {
    return {
      // see https://www.desmos.com/calculator/ynl8fzh1wd
      // <500ms ~= 100, >1.3s is yellow, >3.5s is red
      p10: 1282,
      median: 3500,
      thresholdInMs: 50
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<number>}
   */
  static async getTbtImpact(artifacts, context) {
    let tbtImpact = 0;
    try {
      const metricComputationData = Audit.makeMetricComputationDataInput(artifacts, context);
      const tasks = await TBTImpactTasksComputed.request(metricComputationData, context);
      for (const task of tasks) {
        const groupId = task.group.id;
        if (groupId !== "scriptEvaluation" && groupId !== "scriptParseCompile") continue;
        tbtImpact += task.selfTbtImpact;
      }
    } catch (err) {
      Sentry.captureException(err, {
        tags: { audit: this.meta.id },
        level: "error"
      });
      lighthouse_logger_default.error(this.meta.id, err.message);
    }
    return tbtImpact;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const settings = context.settings || {};
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const tasks = await MainThreadTasksComputed.request(trace, context);
    const multiplier = settings.throttlingMethod === "simulate" ? settings.throttling.cpuSlowdownMultiplier : 1;
    const executionTimings = getExecutionTimingsByURL(tasks, networkRecords);
    executionTimings.delete("_lighthouse-eval.js");
    const tbtImpact = await this.getTbtImpact(artifacts, context);
    let hadExcessiveChromeExtension = false;
    let totalBootupTime = 0;
    const results = Array.from(executionTimings).map(([url, timingByGroupId]) => {
      let totalExecutionTimeForURL = 0;
      for (const [groupId, timespanMs] of Object.entries(timingByGroupId)) {
        timingByGroupId[groupId] = timespanMs * multiplier;
        totalExecutionTimeForURL += timespanMs * multiplier;
      }
      const scriptingTotal = timingByGroupId[taskGroups.scriptEvaluation.id] || 0;
      const parseCompileTotal = timingByGroupId[taskGroups.scriptParseCompile.id] || 0;
      if (totalExecutionTimeForURL >= context.options.thresholdInMs) {
        totalBootupTime += scriptingTotal + parseCompileTotal;
      }
      hadExcessiveChromeExtension = hadExcessiveChromeExtension || url.startsWith("chrome-extension:") && scriptingTotal > 100;
      return {
        url,
        total: totalExecutionTimeForURL,
        // Highlight the JavaScript task costs
        scripting: scriptingTotal,
        scriptParseCompile: parseCompileTotal
      };
    }).filter((result) => result.total >= context.options.thresholdInMs).sort((a, b) => b.total - a.total);
    let runWarnings;
    if (hadExcessiveChromeExtension) {
      runWarnings = [str_(UIStrings2.chromeExtensionsWarning)];
    }
    const headings = [
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "total", granularity: 1, valueType: "ms", label: str_(UIStrings2.columnTotal) },
      { key: "scripting", granularity: 1, valueType: "ms", label: str_(UIStrings2.columnScriptEval) },
      {
        key: "scriptParseCompile",
        granularity: 1,
        valueType: "ms",
        label: str_(UIStrings2.columnScriptParse)
      }
    ];
    const details = _BootupTime.makeTableDetails(
      headings,
      results,
      { wastedMs: totalBootupTime, sortedBy: ["total"] }
    );
    const score = Audit.computeLogNormalScore(
      { p10: context.options.p10, median: context.options.median },
      totalBootupTime
    );
    return {
      score,
      notApplicable: !results.length,
      numericValue: totalBootupTime,
      numericUnit: "millisecond",
      displayValue: totalBootupTime > 0 ? str_(UIStrings.seconds, { timeInMs: totalBootupTime }) : "",
      details,
      runWarnings,
      metricSavings: {
        TBT: tbtImpact
      }
    };
  }
};
var bootup_time_default = BootupTime;
export {
  UIStrings2 as UIStrings,
  bootup_time_default as default
};
/*! Bundled license information:

lighthouse/core/audits/bootup-time.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
