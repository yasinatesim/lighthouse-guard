import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  largest_contentful_paint_default
} from "./chunk-CDXH3HT6.js";
import {
  LCPBreakdownComputed
} from "./chunk-NDKRZ5OE.js";
import {
  LargestContentfulPaintComputed
} from "./chunk-IF4QRGAW.js";
import "./chunk-32YVOUED.js";
import "./chunk-E4NYJWSQ.js";
import "./chunk-22KTQBIM.js";
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

// node_modules/lighthouse/core/audits/largest-contentful-paint-element.js
var UIStrings2 = {
  /** Descriptive title of a diagnostic audit that provides the element that was determined to be the Largest Contentful Paint. */
  title: "Largest Contentful Paint element",
  /** Description of a Lighthouse audit that tells the user that the element shown was determined to be the Largest Contentful Paint. */
  description: "This is the largest contentful element painted within the viewport. [Learn more about the Largest Contentful Paint element](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)",
  /** Label for a column in a data table; entries will be the name of a phase in the Largest Contentful Paint (LCP) metric. */
  columnPhase: "Phase",
  /** Label for a column in a data table; entries will be the percent of Largest Contentful Paint (LCP) that a phase covers. */
  columnPercentOfLCP: "% of LCP",
  /** Label for a column in a data table; entries will be the amount of time spent in a phase in the Largest Contentful Paint (LCP) metric. */
  columnTiming: "Timing",
  /** Table item value for the Time To First Byte (TTFB) phase of the Largest Contentful Paint (LCP) metric. */
  itemTTFB: "TTFB",
  /** Table item value for the load delay phase of the Largest Contentful Paint (LCP) metric. */
  itemLoadDelay: "Load Delay",
  /** Table item value for the load time phase of the Largest Contentful Paint (LCP) metric. */
  itemLoadTime: "Load Time",
  /** Table item value for the render delay phase of the Largest Contentful Paint (LCP) metric. */
  itemRenderDelay: "Render Delay"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var LargestContentfulPaintElement = class extends Audit {
  static {
    __name(this, "LargestContentfulPaintElement");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "largest-contentful-paint-element",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 1,
      supportedModes: ["navigation"],
      requiredArtifacts: [
        "Trace",
        "TraceElements",
        "DevtoolsLog",
        "GatherContext",
        "settings",
        "URL",
        "SourceMaps"
      ]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Details.Table|undefined}
   */
  static makeElementTable(artifacts) {
    const lcpElement = artifacts.TraceElements.find((element) => element.traceEventType === "largest-contentful-paint");
    if (!lcpElement) return;
    const headings = [
      { key: "node", valueType: "node", label: str_(UIStrings.columnElement) }
    ];
    const lcpElementDetails = [{ node: Audit.makeNodeItem(lcpElement.node) }];
    return Audit.makeTableDetails(headings, lcpElementDetails);
  }
  /**
   * @param {number} metricLcp
   * @param {LH.Artifacts.MetricComputationDataInput} metricComputationData
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Details.Table>}
   */
  static async makePhaseTable(metricLcp, metricComputationData, context) {
    const { ttfb, loadStart, loadEnd } = await LCPBreakdownComputed.request(metricComputationData, context);
    let loadDelay = 0;
    let loadTime = 0;
    let renderDelay = metricLcp - ttfb;
    if (loadStart && loadEnd) {
      loadDelay = loadStart - ttfb;
      loadTime = loadEnd - loadStart;
      renderDelay = metricLcp - loadEnd;
    }
    const results = [
      { phase: str_(UIStrings2.itemTTFB), timing: ttfb },
      { phase: str_(UIStrings2.itemLoadDelay), timing: loadDelay },
      { phase: str_(UIStrings2.itemLoadTime), timing: loadTime },
      { phase: str_(UIStrings2.itemRenderDelay), timing: renderDelay }
    ].map((result) => {
      const percent = 100 * result.timing / metricLcp;
      const percentStr = `${percent.toFixed(0)}%`;
      return { ...result, percent: percentStr };
    });
    const headings = [
      { key: "phase", valueType: "text", label: str_(UIStrings2.columnPhase) },
      { key: "percent", valueType: "text", label: str_(UIStrings2.columnPercentOfLCP) },
      { key: "timing", valueType: "ms", label: str_(UIStrings2.columnTiming) }
    ];
    return Audit.makeTableDetails(headings, results);
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const gatherContext = artifacts.GatherContext;
    const metricComputationData = {
      trace,
      devtoolsLog,
      gatherContext,
      settings: context.settings,
      URL: artifacts.URL,
      SourceMaps: artifacts.SourceMaps,
      simulator: null
    };
    const elementTable = this.makeElementTable(artifacts);
    if (!elementTable) {
      return {
        score: null,
        notApplicable: true,
        metricSavings: { LCP: 0 }
      };
    }
    const items = [elementTable];
    let displayValue;
    let metricLcp = 0;
    try {
      const lcpResult = await LargestContentfulPaintComputed.request(metricComputationData, context);
      metricLcp = lcpResult.timing;
      displayValue = str_(UIStrings.ms, { timeInMs: metricLcp });
      const phaseTable = await this.makePhaseTable(metricLcp, metricComputationData, context);
      items.push(phaseTable);
    } catch (err) {
      Sentry.captureException(err, {
        tags: { audit: this.meta.id },
        level: "error"
      });
      lighthouse_logger_default.error(this.meta.id, err.message);
    }
    const details = Audit.makeListDetails(items);
    const idealLcp = largest_contentful_paint_default.defaultOptions[context.settings.formFactor].scoring.p10;
    const lcpSavings = Math.max(0, metricLcp - idealLcp);
    return {
      score: lcpSavings ? 0 : 1,
      scoreDisplayMode: lcpSavings ? void 0 : Audit.SCORING_MODES.INFORMATIVE,
      displayValue,
      details,
      metricSavings: {
        LCP: lcpSavings
      }
    };
  }
};
var largest_contentful_paint_element_default = LargestContentfulPaintElement;
export {
  UIStrings2 as UIStrings,
  largest_contentful_paint_element_default as default
};
/*! Bundled license information:

lighthouse/core/audits/largest-contentful-paint-element.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
