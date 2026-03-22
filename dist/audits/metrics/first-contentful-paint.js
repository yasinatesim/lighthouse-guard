import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  FirstContentfulPaintComputed
} from "../chunk-JY4RKQCD.js";
import "../chunk-DGRQI5GC.js";
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

// node_modules/lighthouse/core/audits/metrics/first-contentful-paint.js
var UIStrings2 = {
  /** Description of the First Contentful Paint (FCP) metric, which marks the time at which the first text or image is painted by the browser. This is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var FirstContentfulPaint = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "first-contentful-paint",
      title: str_(UIStrings.firstContentfulPaintMetric),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      supportedModes: ["navigation"],
      requiredArtifacts: ["Trace", "DevtoolsLog", "GatherContext", "URL", "SourceMaps"]
    };
  }
  /**
   * @return {{mobile: {scoring: LH.Audit.ScoreOptions}, desktop: {scoring: LH.Audit.ScoreOptions}}}
   */
  static get defaultOptions() {
    return {
      mobile: {
        // 25th and 8th percentiles HTTPArchive -> median and p10.
        // https://bigquery.cloud.google.com/table/httparchive:lighthouse.2021_05_01_mobile
        // see https://www.desmos.com/calculator/6wi8rhipve
        scoring: {
          p10: 1800,
          median: 3e3
        }
      },
      desktop: {
        // SELECT QUANTILES(renderStart, 21) FROM [httparchive:summary_pages.2020_07_01_desktop] LIMIT 1000
        scoring: {
          p10: 934,
          median: 1600
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
    const metricResult = await FirstContentfulPaintComputed.request(metricComputationData, context);
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
var first_contentful_paint_default = FirstContentfulPaint;
export {
  UIStrings2 as UIStrings,
  first_contentful_paint_default as default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/first-contentful-paint.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
