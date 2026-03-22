import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LargestContentfulPaintComputed
} from "./chunk-GJZGFHWB.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";

// node_modules/lighthouse/core/audits/metrics/largest-contentful-paint.js
var UIStrings2 = {
  /** Description of the Largest Contentful Paint (LCP) metric, which marks the time at which the largest text or image is painted by the browser. This is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: `Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var LargestContentfulPaint = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "largest-contentful-paint",
      title: str_(UIStrings.largestContentfulPaintMetric),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      supportedModes: ["navigation"],
      requiredArtifacts: [
        "HostUserAgent",
        "Trace",
        "DevtoolsLog",
        "GatherContext",
        "URL",
        "SourceMaps"
      ]
    };
  }
  /**
   * @return {{mobile: {scoring: LH.Audit.ScoreOptions}, desktop: {scoring: LH.Audit.ScoreOptions}}}
   */
  static get defaultOptions() {
    return {
      mobile: {
        // 25th and 13th percentiles HTTPArchive -> median and p10 points.
        // https://bigquery.cloud.google.com/table/httparchive:lighthouse.2020_02_01_mobile?pli=1
        // https://web.dev/articles/lcp#what_is_a_good_lcp_score
        // see https://www.desmos.com/calculator/1etesp32kt
        scoring: {
          p10: 2500,
          median: 4e3
        }
      },
      desktop: {
        // 25th and 5th percentiles HTTPArchive -> median and p10 points.
        // SELECT
        //   APPROX_QUANTILES(lcpValue, 100)[OFFSET(5)] AS p05_lcp,
        //   APPROX_QUANTILES(lcpValue, 100)[OFFSET(25)] AS p25_lcp
        // FROM (
        //   SELECT CAST(JSON_EXTRACT_SCALAR(payload, "$['_chromeUserTiming.LargestContentfulPaint']") AS NUMERIC) AS lcpValue
        //   FROM `httparchive.pages.2020_04_01_desktop`
        // )
        scoring: {
          p10: 1200,
          median: 2400
        }
      }
    };
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
    const metricResult = await LargestContentfulPaintComputed.request(metricComputationData, context);
    const options = context.options[context.settings.formFactor];
    return {
      score: Audit.computeLogNormalScore(
        options.scoring,
        metricResult.timing
      ),
      scoringOptions: options.scoring,
      numericValue: metricResult.timing,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.seconds, { timeInMs: metricResult.timing })
    };
  }
};
var largest_contentful_paint_default = LargestContentfulPaint;

export {
  UIStrings2 as UIStrings,
  largest_contentful_paint_default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/largest-contentful-paint.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
