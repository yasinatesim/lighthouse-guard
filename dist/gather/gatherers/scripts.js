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

// node_modules/lighthouse/core/gather/gatherers/scripts.js
async function runInSeriesOrParallel(values, promiseMapper, runInSeries) {
  if (runInSeries) {
    const results = [];
    for (const value of values) {
      const result = await promiseMapper(value);
      results.push(result);
    }
    return results;
  } else {
    const promises = values.map(promiseMapper);
    return await Promise.all(promises);
  }
}
__name(runInSeriesOrParallel, "runInSeriesOrParallel");
function isLighthouseRuntimeEvaluateScript(script) {
  if (!script.embedderName) return true;
  return script.hasSourceURL && script.url === "_lighthouse-eval.js";
}
__name(isLighthouseRuntimeEvaluateScript, "isLighthouseRuntimeEvaluateScript");
var Scripts = class _Scripts extends base_gatherer_default {
  static {
    __name(this, "Scripts");
  }
  static symbol = /* @__PURE__ */ Symbol("Scripts");
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    symbol: _Scripts.symbol,
    supportedModes: ["timespan", "navigation"]
  };
  /** @type {LH.Crdp.Debugger.ScriptParsedEvent[]} */
  _scriptParsedEvents = [];
  /** @type {Array<string | undefined>} */
  _scriptContents = [];
  constructor() {
    super();
    this.onScriptParsed = this.onScriptParsed.bind(this);
  }
  /**
   * @param {LH.Crdp.Debugger.ScriptParsedEvent} params
   */
  onScriptParsed(params) {
    if (!isLighthouseRuntimeEvaluateScript(params)) {
      this._scriptParsedEvents.push(params);
    }
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async startInstrumentation(context) {
    const session = context.driver.defaultSession;
    session.on("Debugger.scriptParsed", this.onScriptParsed);
    await session.sendCommand("Debugger.enable");
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async stopInstrumentation(context) {
    const session = context.driver.defaultSession;
    const formFactor = context.baseArtifacts.HostFormFactor;
    session.off("Debugger.scriptParsed", this.onScriptParsed);
    this._scriptContents = await runInSeriesOrParallel(
      this._scriptParsedEvents,
      ({ scriptId }) => {
        return session.sendCommand("Debugger.getScriptSource", { scriptId }).then((resp) => resp.scriptSource).catch(() => void 0);
      },
      formFactor === "mobile"
      /* runInSeries */
    );
    await session.sendCommand("Debugger.disable");
  }
  async getArtifact() {
    const scripts = this._scriptParsedEvents.map((event, i) => {
      return {
        name: event.url,
        ...event,
        // embedderName is optional on the protocol because backends like Node may not set it.
        // For our purposes, it is always set. But just in case it isn't... fallback to the url.
        url: event.embedderName || event.url,
        content: this._scriptContents[i]
      };
    });
    return scripts;
  }
};
var scripts_default = Scripts;
export {
  scripts_default as default
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

lighthouse/core/gather/gatherers/scripts.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
