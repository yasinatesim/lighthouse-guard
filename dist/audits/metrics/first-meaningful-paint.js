import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
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

// node_modules/lighthouse/core/audits/metrics/first-meaningful-paint.js
var UIStrings2 = {
  /** Description of the First Meaningful Paint (FMP) metric, which marks the time at which a majority of the content has been painted by the browser. This is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "First Meaningful Paint measures when the primary content of a page is visible. [Learn more about the First Meaningful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-meaningful-paint/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var FirstMeaningfulPaint = class extends Audit {
  static {
    __name(this, "FirstMeaningfulPaint");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "first-meaningful-paint",
      title: str_(UIStrings.firstMeaningfulPaintMetric),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      supportedModes: ["navigation"],
      requiredArtifacts: ["Trace", "DevtoolsLog", "GatherContext", "URL"]
    };
  }
  /**
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit() {
    return {
      score: null,
      notApplicable: true
    };
  }
};
var first_meaningful_paint_default = FirstMeaningfulPaint;
export {
  UIStrings2 as UIStrings,
  first_meaningful_paint_default as default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/first-meaningful-paint.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
