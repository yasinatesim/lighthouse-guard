import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  InteractiveComputed
} from "../chunk-FAQPRD3P.js";
import "../chunk-QRPKE3CF.js";
import "../chunk-OMH7NEK4.js";
import "../chunk-KWLN6AZG.js";
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

// node_modules/lighthouse/core/audits/metrics/interactive.js
var UIStrings2 = {
  /** Description of the Time to Interactive (TTI) metric, which evaluates when a page has completed its primary network activity and main thread work. This is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var InteractiveMetric = class extends Audit {
  static {
    __name(this, "InteractiveMetric");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "interactive",
      title: str_(UIStrings.interactiveMetric),
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
        // see https://www.desmos.com/calculator/o98tbeyt1t
        scoring: {
          p10: 3785,
          median: 7300
        }
      },
      desktop: {
        // SELECT QUANTILES(fullyLoaded, 21) FROM [httparchive:summary_pages.2018_12_15_desktop] LIMIT 1000
        scoring: {
          p10: 2468,
          median: 4500
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
    const metricResult = await InteractiveComputed.request(metricComputationData, context);
    const timeInMs = metricResult.timing;
    const options = context.options[context.settings.formFactor];
    return {
      score: Audit.computeLogNormalScore(
        options.scoring,
        timeInMs
      ),
      numericValue: timeInMs,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.seconds, { timeInMs })
    };
  }
};
var interactive_default = InteractiveMetric;
export {
  UIStrings2 as UIStrings,
  interactive_default as default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/interactive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
