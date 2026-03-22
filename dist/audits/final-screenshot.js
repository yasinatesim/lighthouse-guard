import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ProcessedTraceComputed
} from "./chunk-FTKGXG7F.js";
import "./chunk-3WVTZQMF.js";
import {
  LighthouseError
} from "./chunk-2BIJ7VKV.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";
import "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/computed/screenshots.js
var SCREENSHOT_TRACE_NAME = "Screenshot";
var Screenshots = class {
  /**
   * @param {LH.Trace} trace
   * @return {Promise<Array<{timestamp: number, datauri: string}>>}
  */
  static async compute_(trace) {
    return trace.traceEvents.filter((evt) => evt.name === SCREENSHOT_TRACE_NAME).map((evt) => {
      return {
        timestamp: evt.ts,
        datauri: `data:image/jpeg;base64,${evt.args.snapshot}`
      };
    });
  }
};
var ScreenshotsComputed = makeComputedArtifact(Screenshots, null);

// node_modules/lighthouse/core/audits/final-screenshot.js
var FinalScreenshot = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "final-screenshot",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: "Final Screenshot",
      description: "The last screenshot captured of the pageload.",
      requiredArtifacts: ["Trace", "GatherContext"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const trace = artifacts.Trace;
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const screenshots = await ScreenshotsComputed.request(trace, context);
    const { timeOrigin } = processedTrace.timestamps;
    const finalScreenshot = screenshots[screenshots.length - 1];
    if (!finalScreenshot) {
      if (artifacts.GatherContext.gatherMode === "timespan") return { notApplicable: true, score: 1 };
      throw new LighthouseError(LighthouseError.errors.NO_SCREENSHOTS);
    }
    return {
      score: 1,
      details: {
        type: "screenshot",
        timing: Math.round((finalScreenshot.timestamp - timeOrigin) / 1e3),
        timestamp: finalScreenshot.timestamp,
        data: finalScreenshot.datauri
      }
    };
  }
};
var final_screenshot_default = FinalScreenshot;
export {
  final_screenshot_default as default
};
/*! Bundled license information:

lighthouse/core/computed/screenshots.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/audits/final-screenshot.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
