import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  pageFunctions
} from "./chunk-RDNFCTTE.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/driver/execution-context.js
var ExecutionContext = class _ExecutionContext {
  static {
    __name(this, "ExecutionContext");
  }
  /** @param {LH.Gatherer.ProtocolSession} session */
  constructor(session) {
    this._session = session;
    this._executionContextId = void 0;
    this._executionContextIdentifiersCreated = 0;
    session.on("Page.frameNavigated", () => this.clearContextId());
    session.on("Runtime.executionContextDestroyed", (event) => {
      if (event.executionContextId === this._executionContextId) {
        this.clearContextId();
      }
    });
  }
  /**
   * Returns the isolated context ID currently in use.
   */
  getContextId() {
    return this._executionContextId;
  }
  /**
   * Clears the remembered context ID. Use this method when we have knowledge that the runtime context
   * we were using has been destroyed by the browser and is no longer available.
   */
  clearContextId() {
    this._executionContextId = void 0;
  }
  /**
   * Returns the cached isolated execution context ID or creates a new execution context for the main
   * frame. The cached execution context is cleared on every gotoURL invocation, so a new one will
   * always be created on the first call on a new page.
   * @return {Promise<number>}
   */
  async _getOrCreateIsolatedContextId() {
    if (typeof this._executionContextId === "number") return this._executionContextId;
    await this._session.sendCommand("Page.enable");
    await this._session.sendCommand("Runtime.enable");
    const frameTreeResponse = await this._session.sendCommand("Page.getFrameTree");
    const mainFrameId = frameTreeResponse.frameTree.frame.id;
    const isolatedWorldResponse = await this._session.sendCommand("Page.createIsolatedWorld", {
      frameId: mainFrameId,
      worldName: "lighthouse_isolated_context"
    });
    this._executionContextId = isolatedWorldResponse.executionContextId;
    this._executionContextIdentifiersCreated++;
    return isolatedWorldResponse.executionContextId;
  }
  /**
   * Evaluate an expression in the given execution context; an undefined contextId implies the main
   * page without isolation.
   * @param {string} expression
   * @param {number|undefined} contextId
   * @param {number} timeout
   * @return {Promise<*>}
   */
  async _evaluateInContext(expression, contextId, timeout) {
    const uniqueExecutionContextIdentifier = contextId === void 0 ? void 0 : this._executionContextIdentifiersCreated;
    const evaluationParams = {
      // We need to explicitly wrap the raw expression for several purposes:
      // 1. Ensure that the expression will be a native Promise and not a polyfill/non-Promise.
      // 2. Ensure that errors in the expression are captured by the Promise.
      // 3. Ensure that errors captured in the Promise are converted into plain-old JS Objects
      //    so that they can be serialized properly b/c JSON.stringify(new Error('foo')) === '{}'
      //
      // `__lighthouseExecutionContextUniqueIdentifier` is only used by the FullPageScreenshot gatherer.
      // See `getNodeDetails` in page-functions.
      expression: `(function wrapInNativePromise() {
        ${_ExecutionContext._cachedNativesPreamble};
        globalThis.__lighthouseExecutionContextUniqueIdentifier =
          ${uniqueExecutionContextIdentifier};
        ${pageFunctions.esbuildFunctionWrapperString}
        return new Promise(function (resolve) {
          return Promise.resolve()
            .then(_ => ${expression})
            .catch(${pageFunctions.wrapRuntimeEvalErrorInBrowser})
            .then(resolve);
        });
      }())
      //# sourceURL=_lighthouse-eval.js`,
      includeCommandLineAPI: true,
      awaitPromise: true,
      returnByValue: true,
      timeout,
      contextId
    };
    this._session.setNextProtocolTimeout(timeout);
    const response = await this._session.sendCommand("Runtime.evaluate", evaluationParams);
    const ex = response.exceptionDetails;
    if (ex) {
      const elidedExpression = expression.replace(/\s+/g, " ").substring(0, 100);
      const messageLines = [
        "Runtime.evaluate exception",
        `Expression: ${elidedExpression}
---- (elided)`,
        !ex.stackTrace ? `Parse error at: ${ex.lineNumber + 1}:${ex.columnNumber + 1}` : null,
        ex.exception?.description || ex.text
      ].filter(Boolean);
      const evaluationError = new Error(messageLines.join("\n"));
      return Promise.reject(evaluationError);
    }
    if (response.result === void 0) {
      return Promise.reject(
        new Error('Runtime.evaluate response did not contain a "result" object')
      );
    }
    const value = response.result.value;
    if (value?.__failedInBrowser) {
      return Promise.reject(Object.assign(new Error(), value));
    } else {
      return value;
    }
  }
  /**
   * Evaluate an expression in the context of the current page. If useIsolation is true, the expression
   * will be evaluated in a content script that has access to the page's DOM but whose JavaScript state
   * is completely separate.
   * Returns a promise that resolves on the expression's value.
   *
   * @deprecated Use `evaluate` instead! It has a better API, and unlike `evaluateAsync` doesn't sometimes
   * execute invalid code.
   * @param {string} expression
   * @param {{useIsolation?: boolean}=} options
   * @return {Promise<*>}
   */
  async evaluateAsync(expression, options = {}) {
    const timeout = this._session.hasNextProtocolTimeout() ? this._session.getNextProtocolTimeout() : 6e4;
    const contextId = options.useIsolation ? await this._getOrCreateIsolatedContextId() : void 0;
    try {
      return await this._evaluateInContext(expression, contextId, timeout);
    } catch (err) {
      if (contextId && err.message.includes("Cannot find context")) {
        this.clearContextId();
        const freshContextId = await this._getOrCreateIsolatedContextId();
        return this._evaluateInContext(expression, freshContextId, timeout);
      }
      throw err;
    }
  }
  /**
   * Evaluate a function in the context of the current page.
   * If `useIsolation` is true, the function will be evaluated in a content script that has
   * access to the page's DOM but whose JavaScript state is completely separate.
   * Returns a promise that resolves on a value of `mainFn`'s return type.
   * @template {unknown[]} T, R
   * @param {((...args: T) => R)} mainFn The main function to call.
   * @param {{args: T, useIsolation?: boolean, deps?: Array<Function|string>}} options `args` should
   *   match the args of `mainFn`, and can be any serializable value. `deps` are functions that must be
   *   defined for `mainFn` to work.
   * @return {Promise<Awaited<R>>}
   */
  evaluate(mainFn, options) {
    const argsSerialized = _ExecutionContext.serializeArguments(options.args);
    const depsSerialized = _ExecutionContext.serializeDeps(options.deps);
    const expression = `(() => {
      ${depsSerialized}
      return (${mainFn})(${argsSerialized});
    })()`;
    return this.evaluateAsync(expression, options);
  }
  /**
   * Evaluate a function on every new frame from now on.
   * @template {unknown[]} T
   * @param {((...args: T) => void)} mainFn The main function to call.
   * @param {{args: T, deps?: Array<Function|string>}} options `args` should
   *   match the args of `mainFn`, and can be any serializable value. `deps` are functions that must be
   *   defined for `mainFn` to work.
   * @return {Promise<void>}
   */
  async evaluateOnNewDocument(mainFn, options) {
    const argsSerialized = _ExecutionContext.serializeArguments(options.args);
    const depsSerialized = _ExecutionContext.serializeDeps(options.deps);
    const expression = `(() => {
      ${_ExecutionContext._cachedNativesPreamble};
      ${depsSerialized};
      (${mainFn})(${argsSerialized});
    })()
    //# sourceURL=_lighthouse-eval.js`;
    await this._session.sendCommand("Page.addScriptToEvaluateOnNewDocument", { source: expression });
  }
  /**
   * Cache native functions/objects inside window so we are sure polyfills do not overwrite the
   * native implementations when the page loads.
   * @return {Promise<void>}
   */
  async cacheNativesOnNewDocument() {
    await this.evaluateOnNewDocument(() => {
      window.__nativePromise = window.Promise;
      window.__nativeURL = window.URL;
      window.__nativePerformance = window.performance;
      window.__nativeFetch = window.fetch;
      window.__ElementMatches = window.Element.prototype.matches;
      window.__HTMLElementBoundingClientRect = window.HTMLElement.prototype.getBoundingClientRect;
    }, { args: [] });
  }
  /**
   * Prefix every script evaluation with a shadowing of common globals that tend to be ponyfilled
   * incorrectly by many sites. This allows functions to still refer to `Promise` instead of
   * Lighthouse-specific backups like `__nativePromise` (injected by `cacheNativesOnNewDocument` above).
   */
  static _cachedNativesPreamble = [
    "const Promise = globalThis.__nativePromise || globalThis.Promise",
    "const URL = globalThis.__nativeURL || globalThis.URL",
    "const performance = globalThis.__nativePerformance || globalThis.performance",
    "const fetch = globalThis.__nativeFetch || globalThis.fetch"
  ].join(";\n");
  /**
   * Serializes an array of arguments for use in an `eval` string across the protocol.
   * @param {unknown[]} args
   * @return {string}
   */
  static serializeArguments(args) {
    return args.map((arg) => arg === void 0 ? "undefined" : JSON.stringify(arg)).join(",");
  }
  /**
   * Serializes an array of functions or strings.
   *
   * Also makes sure that an esbuild-bundled version of Lighthouse will
   * continue to create working code to be executed within the browser.
   * @param {Array<Function|string>=} deps
   * @return {string}
   */
  static serializeDeps(deps) {
    deps = [pageFunctions.esbuildFunctionWrapperString, ...deps || []];
    return deps.map((dep) => {
      if (typeof dep === "function") {
        const output = dep.toString();
        const runtimeName = pageFunctions.getRuntimeFunctionName(dep);
        if (runtimeName !== dep.name) {
          return `${output}; const ${dep.name} = ${runtimeName};`;
        } else {
          return output;
        }
      } else {
        return dep;
      }
    }).join("\n");
  }
};

export {
  ExecutionContext
};
/*! Bundled license information:

lighthouse/core/gather/driver/execution-context.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
