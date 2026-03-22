var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/lighthouse/core/gather/base-gatherer.js
var BaseGatherer = class {
  static {
    __name(this, "BaseGatherer");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = { supportedModes: [] };
  /**
   * Method to start observing a page for an arbitrary period of time.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  startInstrumentation(passContext) {
  }
  /**
   * Method to start observing a page when the measurements are very sensitive and
   * should observe as little Lighthouse-induced work as possible.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  startSensitiveInstrumentation(passContext) {
  }
  /**
   * Method to stop observing a page when the measurements are very sensitive and
   * should observe as little Lighthouse-induced work as possible.
   *
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  stopSensitiveInstrumentation(passContext) {
  }
  /**
   * Method to end observing a page after an arbitrary period of time.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  stopInstrumentation(passContext) {
  }
  /**
   * Method to gather results about a page.
   * @param {LH.Gatherer.Context} passContext
   * @return {LH.Gatherer.PhaseResult}
   */
  getArtifact(passContext) {
  }
};
var base_gatherer_default = BaseGatherer;

// node_modules/lighthouse/core/gather/gatherers/js-usage.js
var JsUsage = class extends base_gatherer_default {
  static {
    __name(this, "JsUsage");
  }
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

lighthouse/types/lh.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/base-gatherer.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/js-usage.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
