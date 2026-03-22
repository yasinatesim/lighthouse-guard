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

// node_modules/lighthouse/core/gather/gatherers/devtools-log-compat.js
var DevtoolsLogCompat = class extends base_gatherer_default {
  static {
    __name(this, "DevtoolsLogCompat");
  }
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} passContext
   * @return {Promise<LH.Artifacts['devtoolsLogs']>}
   */
  async getArtifact(passContext) {
    return {
      defaultPass: passContext.dependencies.DevtoolsLog
    };
  }
};
var devtools_log_compat_default = DevtoolsLogCompat;
export {
  devtools_log_compat_default as default
};
/*! Bundled license information:

lighthouse/types/lh.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/base-gatherer.js:
lighthouse/core/gather/gatherers/devtools-log.js:
lighthouse/core/gather/gatherers/devtools-log-compat.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
