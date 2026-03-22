import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TotalBlockingTimeComputed
} from "../chunk-D5OOLMSC.js";
import "../chunk-AEG256KD.js";
import "../chunk-SPBZCMTA.js";
import "../chunk-E4NYJWSQ.js";
import "../chunk-5FAUCPF6.js";
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

// node_modules/lighthouse/core/audits/metrics/total-blocking-time.js
var UIStrings2 = {
  /** Description of the Total Blocking Time (TBT) metric, which calculates the total duration of blocking time for a web page. Blocking times are time periods when the page would be blocked (prevented) from responding to user input (clicks, taps, and keypresses will feel slow to respond). This is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits.*/
  description: "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more about the Total Blocking Time metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var TotalBlockingTime = class extends Audit {
  static {
    __name(this, "TotalBlockingTime");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "total-blocking-time",
      title: str_(UIStrings.totalBlockingTimeMetric),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      requiredArtifacts: ["Trace", "DevtoolsLog", "GatherContext", "URL", "SourceMaps"]
    };
  }
  /**
   * @return {{mobile: {scoring: LH.Audit.ScoreOptions}, desktop: {scoring: LH.Audit.ScoreOptions}}}
   */
  static get defaultOptions() {
    return {
      mobile: {
        // If determined from HTTP Archive data…
        //     SELECT
        //         APPROX_QUANTILES(tbt_value, 100)[OFFSET(8)] AS p08_tbt,
        //         APPROX_QUANTILES(tbt_value, 100)[OFFSET(25)] AS p25_tbt
        //     FROM (
        //         SELECT CAST(JSON_EXTRACT_SCALAR(report, '$.audits.total-blocking-time.numericValue') AS FLOAT64) AS tbt_value
        //         FROM `httparchive.lighthouse.2021_05_01_mobile`
        //         WHERE report is not NULL
        //     )
        // …we'd use control points of 19 and 189, which leads to surprisingly harsh scoring.
        //
        // The following coefficients are semi-arbitrarily chosen, but start to approach the "correct" ones:
        // See https://www.desmos.com/calculator/pwcgna1cvf go/lh8-tbt-curves
        scoring: {
          p10: 200,
          median: 600
        }
      },
      desktop: {
        // Chosen in HTTP Archive desktop results to approximate curve easing described above.
        // SELECT
        //   APPROX_QUANTILES(tbtValue, 100)[OFFSET(40)] AS p40_tbt,
        //   APPROX_QUANTILES(tbtValue, 100)[OFFSET(60)] AS p60_tbt
        // FROM (
        //   SELECT CAST(JSON_EXTRACT_SCALAR(payload, '$._TotalBlockingTime') AS NUMERIC) AS tbtValue
        //   FROM `httparchive.pages.2020_04_01_desktop`
        // )
        scoring: {
          p10: 150,
          median: 350
        }
      }
    };
  }
  /**
   * Audits the page to calculate Total Blocking Time.
   *
   * We define Blocking Time as any time interval in the loading timeline where task length exceeds
   * 50ms. For example, if there is a 110ms main thread task, the last 60ms of it is blocking time.
   * Total Blocking Time is the sum of all Blocking Time between First Contentful Paint and
   * Interactive Time (TTI).
   *
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
    if (gatherContext.gatherMode === "timespan" && context.settings.throttlingMethod === "simulate") {
      return { score: 1, notApplicable: true };
    }
    const metricResult = await TotalBlockingTimeComputed.request(metricComputationData, context);
    const options = context.options[context.settings.formFactor];
    return {
      score: Audit.computeLogNormalScore(
        options.scoring,
        metricResult.timing
      ),
      scoringOptions: options.scoring,
      numericValue: metricResult.timing,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.ms, { timeInMs: metricResult.timing })
    };
  }
};
var total_blocking_time_default = TotalBlockingTime;
export {
  UIStrings2 as UIStrings,
  total_blocking_time_default as default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/total-blocking-time.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
