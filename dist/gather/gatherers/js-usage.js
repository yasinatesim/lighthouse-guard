import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "./chunk-CWN23GK2.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/gather/gatherers/js-usage.js
var JsUsage = class extends base_gatherer_default {
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "timespan", "navigation"]
  };
  constructor() {
    super();
    this._scriptUsages = [];
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async startInstrumentation(context) {
    const session = context.driver.defaultSession;
    await session.sendCommand("Profiler.enable");
    await session.sendCommand("Profiler.startPreciseCoverage", { detailed: false });
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async stopInstrumentation(context) {
    const session = context.driver.defaultSession;
    const coverageResponse = await session.sendCommand("Profiler.takePreciseCoverage");
    this._scriptUsages = coverageResponse.result;
    await session.sendCommand("Profiler.stopPreciseCoverage");
    await session.sendCommand("Profiler.disable");
  }
  /**
   * @return {Promise<LH.Artifacts['JsUsage']>}
   */
  async getArtifact() {
    const usageByScriptId = {};
    for (const scriptUsage of this._scriptUsages) {
      if (scriptUsage.url === "" || scriptUsage.url === "_lighthouse-eval.js") {
        continue;
      }
      if (scriptUsage.url === "__puppeteer_evaluation_script__") {
        continue;
      }
      usageByScriptId[scriptUsage.scriptId] = scriptUsage;
    }
    return usageByScriptId;
  }
};
var js_usage_default = JsUsage;
export {
  js_usage_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/js-usage.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
