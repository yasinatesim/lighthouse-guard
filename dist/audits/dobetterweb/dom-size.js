import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TBTImpactTasksComputed
} from "../chunk-EMYN325U.js";
import "../chunk-F3LBQ6H5.js";
import "../chunk-FXMGSRO7.js";
import "../chunk-QBXT32HH.js";
import "../chunk-CRKKLQWT.js";
import "../chunk-K7WBVFH2.js";
import "../chunk-JY4RKQCD.js";
import "../chunk-DGRQI5GC.js";
import "../chunk-4PONSSZA.js";
import "../chunk-YN3ARENP.js";
import "../chunk-IOK3BAH7.js";
import "../chunk-ZIUDIWBD.js";
import "../chunk-Z7S4UQSE.js";
import "../chunk-22N3WN7S.js";
import "../chunk-GRLAFLTF.js";
import "../chunk-2FKQ374S.js";
import "../chunk-ZATS4KUU.js";
import "../chunk-FTKGXG7F.js";
import "../chunk-3WVTZQMF.js";
import "../chunk-3KEMYTTF.js";
import "../chunk-JDNHHZFJ.js";
import "../chunk-YNYBF6HU.js";
import "../chunk-2BIJ7VKV.js";
import "../chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import {
  Audit
} from "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/dobetterweb/dom-size.js
var UIStrings2 = {
  /** Title of a diagnostic audit that provides detail on the size of the web page's DOM. The size of a DOM is characterized by the total number of DOM elements and greatest DOM depth. This descriptive title is shown to users when the amount is acceptable and no user action is required. */
  title: "Avoids an excessive DOM size",
  /** Title of a diagnostic audit that provides detail on the size of the web page's DOM. The size of a DOM is characterized by the total number of DOM elements and greatest DOM depth. This imperative title is shown to users when there is a significant amount of execution time that could be reduced. */
  failureTitle: "Avoid an excessive DOM size",
  /** Description of a Lighthouse audit that tells the user *why* they should reduce the size of the web page's DOM. The size of a DOM is characterized by the total number of DOM elements and greatest DOM depth. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn how to avoid an excessive DOM size](https://developer.chrome.com/docs/lighthouse/performance/dom-size/).",
  /** Table column header for the type of statistic. These statistics describe how big the DOM is (count of DOM elements, children, depth). */
  columnStatistic: "Statistic",
  /** Table column header for the observed value of the DOM statistic. */
  columnValue: "Value",
  /** [ICU Syntax] Label for an audit identifying the number of DOM elements found in the page. */
  displayValue: `{itemCount, plural,
    =1 {1 element}
    other {# elements}
    }`,
  /** Label for the total number of DOM elements found in the page. */
  statisticDOMElements: "Total DOM Elements",
  /** Label for the numeric value of the maximum depth in the page's DOM tree. */
  statisticDOMDepth: "Maximum DOM Depth",
  /** Label for the numeric value of the maximum number of children any DOM element in the page has. The element described will have the most children in the page. */
  statisticDOMWidth: "Maximum Child Elements"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var DOMSize = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "dom-size",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 1,
      requiredArtifacts: ["DOMStats", "URL", "GatherContext"],
      __internalOptionalArtifacts: ["Trace", "DevtoolsLog", "SourceMaps"]
    };
  }
  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // https://bigquery.cloud.google.com/table/httparchive:lighthouse.2018_04_01_mobile?pli=1
      // see https://www.desmos.com/calculator/tsunbwqt3f
      p10: 818,
      median: 1400
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<number|undefined>}
   */
  static async computeTbtImpact(artifacts, context) {
    let tbtImpact = 0;
    const { GatherContext, DevtoolsLog, Trace } = artifacts;
    if (GatherContext.gatherMode !== "navigation") {
      return void 0;
    }
    if (!DevtoolsLog || !Trace) {
      return 0;
    }
    const metricComputationData = Audit.makeMetricComputationDataInput(artifacts, context);
    try {
      const tbtImpactTasks = await TBTImpactTasksComputed.request(metricComputationData, context);
      for (const task of tbtImpactTasks) {
        if (task.group.id !== "styleLayout") continue;
        tbtImpact += task.selfTbtImpact;
      }
    } catch {
    }
    return Math.round(tbtImpact);
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const stats = artifacts.DOMStats;
    const score = Audit.computeLogNormalScore(
      { p10: context.options.p10, median: context.options.median },
      stats.totalBodyElements
    );
    const headings = [
      { key: "statistic", valueType: "text", label: str_(UIStrings2.columnStatistic) },
      { key: "node", valueType: "node", label: str_(UIStrings.columnElement) },
      { key: "value", valueType: "numeric", label: str_(UIStrings2.columnValue) }
    ];
    const items = [
      {
        statistic: str_(UIStrings2.statisticDOMElements),
        value: {
          type: "numeric",
          granularity: 1,
          value: stats.totalBodyElements
        }
      },
      {
        node: Audit.makeNodeItem(stats.depth),
        statistic: str_(UIStrings2.statisticDOMDepth),
        value: {
          type: "numeric",
          granularity: 1,
          value: stats.depth.max
        }
      },
      {
        node: Audit.makeNodeItem(stats.width),
        statistic: str_(UIStrings2.statisticDOMWidth),
        value: {
          type: "numeric",
          granularity: 1,
          value: stats.width.max
        }
      }
    ];
    const tbtImpact = await this.computeTbtImpact(artifacts, context);
    return {
      score,
      numericValue: stats.totalBodyElements,
      numericUnit: "element",
      displayValue: str_(UIStrings2.displayValue, { itemCount: stats.totalBodyElements }),
      details: Audit.makeTableDetails(headings, items),
      metricSavings: {
        TBT: tbtImpact
      }
    };
  }
};
var dom_size_default = DOMSize;
export {
  UIStrings2 as UIStrings,
  dom_size_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/dom-size.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
