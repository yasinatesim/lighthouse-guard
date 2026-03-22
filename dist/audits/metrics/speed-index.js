import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  SpeedIndexComputed
} from "../chunk-OK3KJQQ7.js";
import "../chunk-327KT7TQ.js";
import "../chunk-OMH7NEK4.js";
import "../chunk-GPJRF3VM.js";
import "../chunk-GOQIOX72.js";
import "../chunk-GPGXHKXU.js";
import "../chunk-TYEYL6JI.js";
import "../chunk-CVEB2JTF.js";
import "../chunk-E5UDU7XN.js";
import "../chunk-2RUE6MFF.js";
import "../chunk-4WOLRYCI.js";
import "../chunk-XFJEV2GR.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import "../chunk-YOYAIZOW.js";
import "../chunk-OZ2G5ZKT.js";
import "../chunk-EBBYNBKM.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-O3YNDXOX.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/metrics/speed-index.js
var UIStrings2 = {
  /** Description of the Speed Index metric, which summarizes how quickly the page looked visually complete. This is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var SpeedIndex = class extends Audit {
  static {
    __name(this, "SpeedIndex");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "speed-index",
      title: str_(UIStrings.speedIndexMetric),
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
        // 25th and 5th percentiles HTTPArchive -> median and PODR, then p10 derived from them.
        // https://bigquery.cloud.google.com/table/httparchive:lighthouse.2018_04_01_mobile?pli=1
        // see https://www.desmos.com/calculator/dvuzvpl7mi
        scoring: {
          p10: 3387,
          median: 5800
        }
      },
      desktop: {
        // SELECT QUANTILES(SpeedIndex, 21) FROM [httparchive:summary_pages.2018_12_15_desktop] LIMIT 1000
        scoring: {
          p10: 1311,
          median: 2300
        }
      }
    };
  }
  /**
   * Audits the page to give a score for the Speed Index.
   * @see https://github.com/GoogleChrome/lighthouse/issues/197
   * @param {LH.Artifacts} artifacts The artifacts from the gather phase.
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
    const metricResult = await SpeedIndexComputed.request(metricComputationData, context);
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
var speed_index_default = SpeedIndex;
export {
  UIStrings2 as UIStrings,
  speed_index_default as default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/speed-index.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
