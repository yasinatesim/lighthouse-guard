import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  getAttributableURLForTask,
  getJavaScriptURLs
} from "./chunk-32EFSKRS.js";
import {
  TBTImpactTasksComputed
} from "./chunk-E6PNRHQN.js";
import {
  EntityClassificationComputed
} from "./chunk-2RUE6MFF.js";
import {
  NetworkRecordsComputed
} from "./chunk-YOYAIZOW.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-O3YNDXOX.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/third-party-summary.js
var UIStrings2 = {
  /** Title of a diagnostic audit that provides details about the code on a web page that the user doesn't control (referred to as "third-party code"). This descriptive title is shown to users when the amount is acceptable and no user action is required. */
  title: "Minimize third-party usage",
  /** Title of a diagnostic audit that provides details about the code on a web page that the user doesn't control (referred to as "third-party code"). This imperative title is shown to users when there is a significant amount of page execution time caused by third-party code that should be reduced. */
  failureTitle: "Reduce the impact of third-party code",
  /** Description of a Lighthouse audit that identifies the code on the page that the user doesn't control. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Third-party code can significantly impact load performance. Limit the number of redundant third-party providers and try to load third-party code after your page has primarily finished loading. [Learn how to minimize third-party impact](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/).",
  /** Label for a table column that displays the name of a third-party provider that potentially links to their website. */
  columnThirdParty: "Third-Party",
  /** Summary text for the result of a Lighthouse audit that identifies the code on a web page that the user doesn't control (referred to as "third-party code"). This text summarizes the number of distinct entities that were found on the page. */
  displayValue: `Third-party code blocked the main thread for {timeInMs, number, milliseconds}\xA0ms`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var PASS_THRESHOLD_IN_MS = 250;
var ThirdPartySummary = class _ThirdPartySummary extends Audit {
  static {
    __name(this, "ThirdPartySummary");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "third-party-summary",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      guidanceLevel: 1,
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      requiredArtifacts: ["Trace", "DevtoolsLog", "URL", "GatherContext", "SourceMaps"]
    };
  }
  /**
   *
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {Array<LH.Artifacts.TBTImpactTask>} tbtImpactTasks
   * @param {number} cpuMultiplier
   * @param {LH.Artifacts.EntityClassification} entityClassification
   * @return {SummaryMaps}
   */
  static getSummaries(networkRecords, tbtImpactTasks, cpuMultiplier, entityClassification) {
    const byURL = /* @__PURE__ */ new Map();
    const byEntity = /* @__PURE__ */ new Map();
    const defaultSummary = { mainThreadTime: 0, blockingTime: 0, transferSize: 0, tbtImpact: 0 };
    for (const request of networkRecords) {
      const urlSummary = byURL.get(request.url) || { ...defaultSummary };
      urlSummary.transferSize += request.transferSize;
      byURL.set(request.url, urlSummary);
    }
    const jsURLs = getJavaScriptURLs(networkRecords);
    for (const task of tbtImpactTasks) {
      const attributableURL = getAttributableURLForTask(task, jsURLs);
      const urlSummary = byURL.get(attributableURL) || { ...defaultSummary };
      const taskDuration = task.selfTime * cpuMultiplier;
      urlSummary.mainThreadTime += taskDuration;
      urlSummary.blockingTime += task.selfBlockingTime;
      urlSummary.tbtImpact += task.selfTbtImpact;
      byURL.set(attributableURL, urlSummary);
    }
    const urls = /* @__PURE__ */ new Map();
    for (const [url, urlSummary] of byURL.entries()) {
      const entity = entityClassification.entityByUrl.get(url);
      if (!entity) {
        byURL.delete(url);
        continue;
      }
      const entitySummary = byEntity.get(entity) || { ...defaultSummary };
      entitySummary.transferSize += urlSummary.transferSize;
      entitySummary.mainThreadTime += urlSummary.mainThreadTime;
      entitySummary.blockingTime += urlSummary.blockingTime;
      entitySummary.tbtImpact += urlSummary.tbtImpact;
      byEntity.set(entity, entitySummary);
      const entityURLs = urls.get(entity) || [];
      entityURLs.push(url);
      urls.set(entity, entityURLs);
    }
    return { byURL, byEntity, urls };
  }
  /**
   * @param {LH.Artifacts.Entity} entity
   * @param {SummaryMaps} summaries
   * @return {Array<URLSummary>}
   */
  static makeSubItems(entity, summaries) {
    const entityURLs = summaries.urls.get(entity) || [];
    const items = entityURLs.map((url) => (
      /** @type {URLSummary} */
      { url, ...summaries.byURL.get(url) }
    )).sort((a, b) => b.blockingTime - a.blockingTime || b.transferSize - a.transferSize);
    return items;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const settings = context.settings || {};
    const devtoolsLog = artifacts.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const classifiedEntities = await EntityClassificationComputed.request(
      { URL: artifacts.URL, devtoolsLog },
      context
    );
    const firstPartyEntity = classifiedEntities.firstParty;
    const metricComputationData = Audit.makeMetricComputationDataInput(artifacts, context);
    const tbtImpactTasks = await TBTImpactTasksComputed.request(metricComputationData, context);
    const multiplier = settings.throttlingMethod === "simulate" ? settings.throttling.cpuSlowdownMultiplier : 1;
    const summaries = _ThirdPartySummary.getSummaries(
      networkRecords,
      tbtImpactTasks,
      multiplier,
      classifiedEntities
    );
    const overallSummary = { wastedBytes: 0, wastedMs: 0, tbtImpact: 0 };
    const results = Array.from(summaries.byEntity.entries()).filter(([entity]) => !(firstPartyEntity && firstPartyEntity === entity)).map(([entity, stats]) => {
      overallSummary.wastedBytes += stats.transferSize;
      overallSummary.wastedMs += stats.blockingTime;
      overallSummary.tbtImpact += stats.tbtImpact;
      return {
        ...stats,
        entity: entity.name,
        subItems: {
          type: (
            /** @type {const} */
            "subitems"
          ),
          items: _ThirdPartySummary.makeSubItems(entity, summaries)
        }
      };
    }).sort((a, b) => b.blockingTime - a.blockingTime || b.transferSize - a.transferSize);
    const headings = [
      /* eslint-disable max-len */
      { key: "entity", valueType: "text", label: str_(UIStrings2.columnThirdParty), subItemsHeading: { key: "url", valueType: "url" } },
      { key: "transferSize", granularity: 1, valueType: "bytes", label: str_(UIStrings.columnTransferSize), subItemsHeading: { key: "transferSize" } },
      { key: "blockingTime", granularity: 1, valueType: "ms", label: str_(UIStrings.columnBlockingTime), subItemsHeading: { key: "blockingTime" } }
      /* eslint-enable max-len */
    ];
    if (!results.length) {
      return {
        score: 1,
        notApplicable: true,
        metricSavings: { TBT: 0 }
      };
    }
    const details = Audit.makeTableDetails(
      headings,
      results,
      { ...overallSummary, isEntityGrouped: true }
    );
    const passed = overallSummary.wastedMs <= PASS_THRESHOLD_IN_MS;
    return {
      score: Number(passed),
      scoreDisplayMode: passed ? Audit.SCORING_MODES.INFORMATIVE : void 0,
      displayValue: str_(UIStrings2.displayValue, {
        timeInMs: overallSummary.wastedMs
      }),
      details,
      metricSavings: {
        TBT: Math.round(overallSummary.tbtImpact)
      }
    };
  }
};
var third_party_summary_default = ThirdPartySummary;

export {
  UIStrings2 as UIStrings,
  third_party_summary_default
};
/*! Bundled license information:

lighthouse/core/audits/third-party-summary.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
