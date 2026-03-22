import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  CumulativeLayoutShiftComputed
} from "./chunk-22N3WN7S.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";

// node_modules/lighthouse/core/audits/metrics/cumulative-layout-shift.js
var UIStrings2 = {
  /** Description of the Cumulative Layout Shift metric that indicates how much the page changes its layout while it loads. If big segments of the page shift their location during load, the Cumulative Layout Shift will be higher. This description is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var CumulativeLayoutShift = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "cumulative-layout-shift",
      title: str_(UIStrings.cumulativeLayoutShiftMetric),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      requiredArtifacts: ["Trace"]
    };
  }
  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // https://web.dev/articles/cls#what_is_a_good_cls_score
      // This 0.1 target score was determined through both manual evaluation and large-scale analysis.
      // see https://www.desmos.com/calculator/ksp7q91nop
      p10: 0.1,
      median: 0.25
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const trace = artifacts.Trace;
    const { cumulativeLayoutShift, impactByNodeId, ...rest } = await CumulativeLayoutShiftComputed.request(trace, context);
    const details = {
      type: "debugdata",
      items: [rest]
    };
    const scoringOptions = { p10: context.options.p10, median: context.options.median };
    return {
      score: Audit.computeLogNormalScore(
        scoringOptions,
        cumulativeLayoutShift
      ),
      scoringOptions,
      numericValue: cumulativeLayoutShift,
      numericUnit: "unitless",
      displayValue: cumulativeLayoutShift.toLocaleString(context.settings.locale),
      details
    };
  }
};
var cumulative_layout_shift_default = CumulativeLayoutShift;

export {
  UIStrings2 as UIStrings,
  cumulative_layout_shift_default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/cumulative-layout-shift.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
