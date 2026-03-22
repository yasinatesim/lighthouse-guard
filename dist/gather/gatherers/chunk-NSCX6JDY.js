import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/devtools-log.js
var DevtoolsLog = class _DevtoolsLog extends base_gatherer_default {
  static {
    __name(this, "DevtoolsLog");
  }
  static symbol = /* @__PURE__ */ Symbol("DevtoolsLog");
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    symbol: _DevtoolsLog.symbol,
    supportedModes: ["timespan", "navigation"]
  };
  constructor() {
    super();
    this._messageLog = new DevtoolsMessageLog(/^(Page|Network|Target|Runtime)\./);
    this._onProtocolMessage = (e) => this._messageLog.record(e);
  }
  /**
   * @param {LH.Gatherer.Context} passContext
   */
  async startSensitiveInstrumentation({ driver }) {
    this._messageLog.reset();
    this._messageLog.beginRecording();
    driver.targetManager.on("protocolevent", this._onProtocolMessage);
    await driver.defaultSession.sendCommand("Page.enable");
  }
  /**
   * @param {LH.Gatherer.Context} passContext
   */
  async stopSensitiveInstrumentation({ driver }) {
    this._messageLog.endRecording();
    driver.targetManager.off("protocolevent", this._onProtocolMessage);
  }
  /**
   * @return {LH.Artifacts['DevtoolsLog']}
   */
  getDebugData() {
    return this._messageLog.messages;
  }
  /**
   * @return {Promise<LH.Artifacts['DevtoolsLog']>}
   */
  async getArtifact() {
    return this._messageLog.messages;
  }
};
var DevtoolsMessageLog = class {
  static {
    __name(this, "DevtoolsMessageLog");
  }
  /**
   * @param {RegExp=} regexFilter
   */
  constructor(regexFilter) {
    this._filter = regexFilter;
    this._messages = [];
    this._isRecording = false;
  }
  /**
   * @return {LH.DevtoolsLog}
   */
  get messages() {
    return this._messages;
  }
  reset() {
    this._messages = [];
  }
  beginRecording() {
    this._isRecording = true;
  }
  endRecording() {
    this._isRecording = false;
  }
  /**
   * Records a message if method matches filter and recording has been started.
   * @param {LH.Protocol.RawEventMessage} message
   */
  record(message) {
    if (!this._isRecording) return;
    if (typeof message.method !== "string") return;
    if (this._filter && !this._filter.test(message.method)) return;
    this._messages.push(message);
  }
};
var devtools_log_default = DevtoolsLog;

export {
  DevtoolsMessageLog,
  devtools_log_default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/devtools-log.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
