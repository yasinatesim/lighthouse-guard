import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/console-messages.js
function remoteObjectToString(obj) {
  if (typeof obj.value !== "undefined" || obj.type === "undefined") {
    return String(obj.value);
  }
  if (typeof obj.description === "string" && obj.description !== obj.className) {
    return obj.description;
  }
  const type = obj.subtype || obj.type;
  const className = obj.className || "Object";
  return `[${type} ${className}]`;
}
__name(remoteObjectToString, "remoteObjectToString");
var ConsoleMessages = class extends base_gatherer_default {
  static {
    __name(this, "ConsoleMessages");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["timespan", "navigation"]
  };
  constructor() {
    super();
    this._logEntries = [];
    this._onConsoleAPICalled = this.onConsoleAPICalled.bind(this);
    this._onExceptionThrown = this.onExceptionThrown.bind(this);
    this._onLogEntryAdded = this.onLogEntry.bind(this);
  }
  /**
   * Handles events for when a script invokes a console API.
   * @param {LH.Crdp.Runtime.ConsoleAPICalledEvent} event
   */
  onConsoleAPICalled(event) {
    const { type } = event;
    if (type !== "warning" && type !== "error") {
      return;
    }
    const args = event.args || [];
    const text = args.map(remoteObjectToString).join(" ");
    if (!text && !event.stackTrace) {
      return;
    }
    const { url, lineNumber, columnNumber } = event.stackTrace?.callFrames[0] || {};
    const consoleMessage = {
      eventType: "consoleAPI",
      source: type === "warning" ? "console.warn" : "console.error",
      level: type,
      text,
      stackTrace: event.stackTrace,
      timestamp: event.timestamp,
      url,
      lineNumber,
      columnNumber
    };
    this._logEntries.push(consoleMessage);
  }
  /**
   * Handles exception thrown events.
   * @param {LH.Crdp.Runtime.ExceptionThrownEvent} event
   */
  onExceptionThrown(event) {
    const text = event.exceptionDetails.exception ? event.exceptionDetails.exception.description : event.exceptionDetails.text;
    if (!text) {
      return;
    }
    const consoleMessage = {
      eventType: "exception",
      source: "exception",
      level: "error",
      text,
      stackTrace: event.exceptionDetails.stackTrace,
      timestamp: event.timestamp,
      url: event.exceptionDetails.url,
      scriptId: event.exceptionDetails.scriptId,
      lineNumber: event.exceptionDetails.lineNumber,
      columnNumber: event.exceptionDetails.columnNumber
    };
    this._logEntries.push(consoleMessage);
  }
  /**
   * Handles browser reports logged to the console, including interventions,
   * deprecations, violations, and more.
   * @param {LH.Crdp.Log.EntryAddedEvent} event
   */
  onLogEntry(event) {
    const { source, level, text, stackTrace, timestamp, url, lineNumber } = event.entry;
    const firstStackFrame = event.entry.stackTrace?.callFrames[0];
    this._logEntries.push({
      eventType: "protocolLog",
      source,
      level,
      text,
      stackTrace,
      timestamp,
      url,
      scriptId: firstStackFrame?.scriptId,
      lineNumber,
      columnNumber: firstStackFrame?.columnNumber
    });
  }
  /**
   * @param {LH.Gatherer.Context} passContext
   */
  async startInstrumentation(passContext) {
    const session = passContext.driver.defaultSession;
    session.on("Log.entryAdded", this._onLogEntryAdded);
    await session.sendCommand("Log.enable");
    await session.sendCommand("Log.startViolationsReport", {
      config: [{ name: "discouragedAPIUse", threshold: -1 }]
    });
    session.on("Runtime.consoleAPICalled", this._onConsoleAPICalled);
    session.on("Runtime.exceptionThrown", this._onExceptionThrown);
    await session.sendCommand("Runtime.enable");
  }
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>}
   */
  async stopInstrumentation({ driver }) {
    await driver.defaultSession.sendCommand("Log.stopViolationsReport");
    await driver.defaultSession.off("Log.entryAdded", this._onLogEntryAdded);
    await driver.defaultSession.sendCommand("Log.disable");
    await driver.defaultSession.off("Runtime.consoleAPICalled", this._onConsoleAPICalled);
    await driver.defaultSession.off("Runtime.exceptionThrown", this._onExceptionThrown);
    await driver.defaultSession.sendCommand("Runtime.disable");
  }
  /**
   * @return {Promise<LH.Artifacts['ConsoleMessages']>}
   */
  async getArtifact() {
    return this._logEntries;
  }
};
var console_messages_default = ConsoleMessages;
export {
  console_messages_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/console-messages.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
