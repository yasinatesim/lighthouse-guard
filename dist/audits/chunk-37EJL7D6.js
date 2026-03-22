import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ResponsivenessComputed
} from "./chunk-4IPLRRAD.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-O3YNDXOX.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/metrics/interaction-to-next-paint.js
var UIStrings2 = {
  /** Description of the Interaction to Next Paint metric. This description is displayed within a tooltip when the user hovers on the metric name to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Interaction to Next Paint measures page responsiveness, how long it takes the page to visibly respond to user input. [Learn more about the Interaction to Next Paint metric](https://web.dev/articles/inp)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var InteractionToNextPaint = class extends Audit {
  static {
    __name(this, "InteractionToNextPaint");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "interaction-to-next-paint",
      title: str_(UIStrings.interactionToNextPaint),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.NUMERIC,
      supportedModes: ["timespan"],
      requiredArtifacts: ["Trace"]
    };
  }
  /**
   * @return {LH.Audit.ScoreOptions}
   */
  static get defaultOptions() {
    return {
      // https://web.dev/articles/inp
      // This is using the same threshold as field tools since only supported in
      // unsimulated user flows for now.
      // see https://www.desmos.com/calculator/4xtrhg51th
      p10: 200,
      median: 500
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const { settings } = context;
    if (settings.throttlingMethod === "simulate") {
      return { score: null, notApplicable: true };
    }
    const trace = artifacts.Trace;
    const metricData = { trace, settings };
    const interactionEvent = await ResponsivenessComputed.request(metricData, context);
    if (interactionEvent === null) {
      return { score: null, notApplicable: true };
    }
    const timing = interactionEvent.args.data.duration;
    return {
      score: Audit.computeLogNormalScore(
        { p10: context.options.p10, median: context.options.median },
        timing
      ),
      numericValue: timing,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.ms, { timeInMs: timing })
    };
  }
};
var interaction_to_next_paint_default = InteractionToNextPaint;

export {
  UIStrings2 as UIStrings,
  interaction_to_next_paint_default
};
/*! Bundled license information:

lighthouse/core/audits/metrics/interaction-to-next-paint.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
