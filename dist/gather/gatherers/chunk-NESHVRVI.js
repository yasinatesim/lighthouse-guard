import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

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
  scripts_default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/scripts.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
