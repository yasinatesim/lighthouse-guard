import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  FirstContentfulPaintComputed
} from "../chunk-5PRILO24.js";
import "../chunk-E4NYJWSQ.js";
import "../chunk-VUSO5I4V.js";
import "../chunk-ZFITDNXI.js";
import "../chunk-5AKLBR55.js";
import "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import "../chunk-2DV6G4YM.js";
import "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import "../chunk-AB7S44AE.js";
import "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/metrics/first-contentful-paint.js
var UIStrings2 = {
  /** Description of the First Contentful Paint (FCP) metric, which marks the time at which the first text or image is painted by the browser. This is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var FirstContentfulPaint = class extends Audit {
  static {
    __name(this, "FirstContentfulPaint");
  }
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
