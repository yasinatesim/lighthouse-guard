import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ResponsivenessComputed
} from "./chunk-36H7DF6Q.js";
import {
  ProcessedNavigationComputed
} from "./chunk-IOK3BAH7.js";
import {
  TraceEngineResultComputed
} from "./chunk-Z7S4UQSE.js";
import {
  CumulativeLayoutShiftComputed
} from "./chunk-22N3WN7S.js";
import {
  Sentry,
  base_gatherer_default
} from "./chunk-GRLAFLTF.js";
import {
  ProcessedTraceComputed
} from "./chunk-FTKGXG7F.js";
import {
  TraceProcessor
} from "./chunk-3WVTZQMF.js";
import {
  require_SDK
} from "./chunk-3KEMYTTF.js";
import {
  LighthouseError
} from "./chunk-2BIJ7VKV.js";
import {
  Util
} from "./chunk-55A4MDN3.js";
import {
  __toESM
} from "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/gather/driver/dom.js
function handlePotentialMissingNodeError(err) {
  if (/No node.*found/.test(err.message) || /Node.*does not belong to the document/.test(err.message)) {
    return void 0;
  }
  throw err;
}
async function resolveNodeIdToObjectId(session, backendNodeId) {
  try {
    const resolveNodeResponse = await session.sendCommand("DOM.resolveNode", { backendNodeId });
    return resolveNodeResponse.object.objectId;
  } catch (err) {
    return handlePotentialMissingNodeError(err);
  }
}

// node_modules/lighthouse/core/lib/page-functions.js
import { createRequire } from "module";
function wrapRuntimeEvalErrorInBrowser(err) {
  if (!err || typeof err === "string") {
    err = new Error(err);
  }
  return {
    __failedInBrowser: true,
    name: err.name || "Error",
    message: err.message || "unknown error",
    stack: err.stack
  };
}
function getElementsInDocument(selector) {
  const realMatchesFn = window.__ElementMatches || window.Element.prototype.matches;
  const results = [];
  const _findAllElements = (nodes) => {
    for (const el of nodes) {
      if (!selector || realMatchesFn.call(el, selector)) {
        const matchedEl = el;
        results.push(matchedEl);
      }
      if (el.shadowRoot) {
        _findAllElements(el.shadowRoot.querySelectorAll("*"));
      }
    }
  };
  _findAllElements(document.querySelectorAll("*"));
  return results;
}
function getOuterHTMLSnippet(element, ignoreAttrs = [], snippetCharacterLimit = 500) {
  const ATTRIBUTE_CHAR_LIMIT = 75;
  const autoFillIgnoreAttrs = ["autofill-information", "autofill-prediction", "title"];
  if (element instanceof ShadowRoot) {
    element = element.host;
  }
  try {
    const clone = element.cloneNode();
    const template = element.ownerDocument.createElement("template");
    template.content.append(clone);
    ignoreAttrs.concat(autoFillIgnoreAttrs).forEach((attribute) => {
      clone.removeAttribute(attribute);
    });
    let charCount = 0;
    for (const attributeName of clone.getAttributeNames()) {
      if (charCount > snippetCharacterLimit) {
        clone.removeAttribute(attributeName);
        continue;
      }
      let attributeValue = clone.getAttribute(attributeName);
      if (attributeValue === null) continue;
      let dirty = false;
      if (attributeName === "src" && "currentSrc" in element) {
        const elementWithSrc = (
          /** @type {HTMLImageElement|HTMLMediaElement} */
          element
        );
        const currentSrc = elementWithSrc.currentSrc;
        const documentHref = elementWithSrc.ownerDocument.location.href;
        if (new URL(attributeValue, documentHref).toString() !== currentSrc) {
          attributeValue = currentSrc;
          dirty = true;
        }
      }
      const truncatedString = truncate(attributeValue, ATTRIBUTE_CHAR_LIMIT);
      if (truncatedString !== attributeValue) dirty = true;
      attributeValue = truncatedString;
      if (dirty) {
        if (attributeName === "style") {
          const elementWithStyle = (
            /** @type {HTMLElement} */
            clone
          );
          elementWithStyle.style.cssText = attributeValue;
        } else {
          clone.setAttribute(attributeName, attributeValue);
        }
      }
      charCount += attributeName.length + attributeValue.length;
    }
    const reOpeningTag = /^[\s\S]*?>/;
    const [match] = clone.outerHTML.match(reOpeningTag) || [];
    if (match && charCount > snippetCharacterLimit) {
      return match.slice(0, match.length - 1) + " \u2026>";
    }
    return match || "";
  } catch (_) {
    return `<${element.localName}>`;
  }
}
function computeBenchmarkIndex() {
  function benchmarkIndexGC() {
    const start = Date.now();
    let iterations = 0;
    while (Date.now() - start < 500) {
      let s = "";
      for (let j = 0; j < 1e4; j++) s += "a";
      if (s.length === 1) throw new Error("will never happen, but prevents compiler optimizations");
      iterations++;
    }
    const durationInSeconds = (Date.now() - start) / 1e3;
    return Math.round(iterations / 10 / durationInSeconds);
  }
  function benchmarkIndexNoGC() {
    const arrA = [];
    const arrB = [];
    for (let i = 0; i < 1e5; i++) arrA[i] = arrB[i] = i;
    const start = Date.now();
    let iterations = 0;
    while (iterations % 10 !== 0 || Date.now() - start < 500) {
      const src = iterations % 2 === 0 ? arrA : arrB;
      const tgt = iterations % 2 === 0 ? arrB : arrA;
      for (let j = 0; j < src.length; j++) tgt[j] = src[j];
      iterations++;
    }
    const durationInSeconds = (Date.now() - start) / 1e3;
    return Math.round(iterations / 10 / durationInSeconds);
  }
  return (benchmarkIndexGC() + benchmarkIndexNoGC()) / 2;
}
function getNodePath(node) {
  const isShadowRoot = (node2) => node2.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  const getNodeParent = (node2) => isShadowRoot(node2) ? node2.host : node2.parentNode;
  function getNodeIndex(node2) {
    if (isShadowRoot(node2)) {
      return "a";
    }
    let index = 0;
    let prevNode;
    while (prevNode = node2.previousSibling) {
      node2 = prevNode;
      if (node2.nodeType === Node.TEXT_NODE && (node2.nodeValue || "").trim().length === 0) continue;
      index++;
    }
    return index;
  }
  let currentNode = node;
  const path = [];
  while (currentNode && getNodeParent(currentNode)) {
    const index = getNodeIndex(currentNode);
    path.push([index, currentNode.nodeName]);
    currentNode = getNodeParent(currentNode);
  }
  path.reverse();
  return path.join(",");
}
function getNodeSelector(element) {
  function getSelectorPart(element2) {
    let part = element2.tagName.toLowerCase();
    if (element2.id) {
      part += "#" + element2.id;
    } else if (element2.classList.length > 0) {
      part += "." + element2.classList[0];
    }
    return part;
  }
  const parts = [];
  while (parts.length < 4) {
    parts.unshift(getSelectorPart(element));
    if (!element.parentElement) {
      break;
    }
    element = element.parentElement;
    if (element.tagName === "HTML") {
      break;
    }
  }
  return parts.join(" > ");
}
function isPositionFixed(element) {
  function getStyleAttrValue(element2, attr) {
    return element2.style[attr] || window.getComputedStyle(element2)[attr];
  }
  const htmlEl = document.querySelector("html");
  if (!htmlEl) throw new Error("html element not found in document");
  if (htmlEl.scrollHeight <= htmlEl.clientHeight || !["scroll", "auto", "visible"].includes(getStyleAttrValue(htmlEl, "overflowY"))) {
    return false;
  }
  let currentEl = element;
  while (currentEl) {
    const position = getStyleAttrValue(currentEl, "position");
    if (position === "fixed" || position === "sticky") {
      return true;
    }
    currentEl = currentEl.parentElement;
  }
  return false;
}
function getNodeLabel(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName !== "html" && tagName !== "body") {
    const nodeLabel = element instanceof HTMLElement && element.innerText || element.getAttribute("alt") || element.getAttribute("aria-label");
    if (nodeLabel) {
      return truncate(nodeLabel, 80);
    } else {
      const nodeToUseForLabel = element.querySelector("[alt], [aria-label]");
      if (nodeToUseForLabel) {
        return getNodeLabel(nodeToUseForLabel);
      }
    }
  }
  return null;
}
function getBoundingClientRect(element) {
  const realBoundingClientRect = window.__HTMLElementBoundingClientRect || window.HTMLElement.prototype.getBoundingClientRect;
  const rect = realBoundingClientRect.call(element);
  return {
    top: Math.round(rect.top),
    bottom: Math.round(rect.bottom),
    left: Math.round(rect.left),
    right: Math.round(rect.right),
    width: Math.round(rect.width),
    height: Math.round(rect.height)
  };
}
function wrapRequestIdleCallback(cpuSlowdownMultiplier) {
  const safetyAllowanceMs = 10;
  const maxExecutionTimeMs = Math.floor((50 - safetyAllowanceMs) / cpuSlowdownMultiplier);
  const nativeRequestIdleCallback = window.requestIdleCallback;
  window.requestIdleCallback = (cb, options) => {
    const cbWrap = (deadline) => {
      const start = Date.now();
      deadline.__timeRemaining = deadline.timeRemaining;
      deadline.timeRemaining = () => {
        const timeRemaining = deadline.__timeRemaining();
        return Math.min(
          timeRemaining,
          Math.max(0, maxExecutionTimeMs - (Date.now() - start))
        );
      };
      deadline.timeRemaining.toString = () => {
        return "function timeRemaining() { [native code] }";
      };
      cb(deadline);
    };
    return nativeRequestIdleCallback(cbWrap, options);
  };
  window.requestIdleCallback.toString = () => {
    return "function requestIdleCallback() { [native code] }";
  };
}
function getNodeDetails2(element) {
  if (!window.__lighthouseNodesDontTouchOrAllVarianceGoesAway) {
    window.__lighthouseNodesDontTouchOrAllVarianceGoesAway = /* @__PURE__ */ new Map();
  }
  element = element instanceof ShadowRoot ? element.host : element;
  const selector = getNodeSelector(element);
  let lhId = window.__lighthouseNodesDontTouchOrAllVarianceGoesAway.get(element);
  if (!lhId) {
    lhId = [
      window.__lighthouseExecutionContextUniqueIdentifier === void 0 ? "page" : window.__lighthouseExecutionContextUniqueIdentifier,
      window.__lighthouseNodesDontTouchOrAllVarianceGoesAway.size,
      element.tagName
    ].join("-");
    window.__lighthouseNodesDontTouchOrAllVarianceGoesAway.set(element, lhId);
  }
  const details = {
    lhId,
    devtoolsNodePath: getNodePath(element),
    selector,
    boundingRect: getBoundingClientRect(element),
    snippet: getOuterHTMLSnippet(element),
    nodeLabel: getNodeLabel(element) || selector
  };
  return details;
}
function truncate(string, characterLimit) {
  return Util.truncate(string, characterLimit);
}
function isBundledEnvironment() {
  if (global.isDevtools || global.isLightrider) return true;
  const require2 = createRequire(import.meta.url);
  try {
    require2.resolve("lighthouse-logger");
    return false;
  } catch (err) {
    return true;
  }
}
var esbuildFunctionWrapperString = createEsbuildFunctionWrapper();
function createEsbuildFunctionWrapper() {
  if (!isBundledEnvironment()) {
    return "";
  }
  const functionAsString = (() => {
    const a = () => {
    };
  }).toString().replace("/* @__PURE__ */", "");
  const functionStringMatch = functionAsString.match(/=\s*([\w_]+)\(/);
  if (!functionStringMatch) {
    throw new Error("Could not determine esbuild function wrapper name");
  }
  const esbuildFunctionWrapper = (fn, value) => Object.defineProperty(fn, "name", { value, configurable: true });
  const wrapperFnName = functionStringMatch[1];
  return `let ${wrapperFnName}=${esbuildFunctionWrapper}`;
}
function getRuntimeFunctionName(fn) {
  const match = fn.toString().match(/function ([\w$]+)/);
  if (!match) throw new Error(`could not find function name for: ${fn}`);
  return match[1];
}
var names = {
  truncate: getRuntimeFunctionName(truncate),
  getNodeLabel: getRuntimeFunctionName(getNodeLabel),
  getOuterHTMLSnippet: getRuntimeFunctionName(getOuterHTMLSnippet),
  getNodeDetails: getRuntimeFunctionName(getNodeDetails2)
};
truncate.toString = () => `function ${names.truncate}(string, characterLimit) {
  const Util = { ${Util.truncate} };
  return Util.truncate(string, characterLimit);
}`;
var getNodeLabelRawString = getNodeLabel.toString();
getNodeLabel.toString = () => `function ${names.getNodeLabel}(element) {
  ${truncate};
  return (${getNodeLabelRawString})(element);
}`;
var getOuterHTMLSnippetRawString = getOuterHTMLSnippet.toString();
getOuterHTMLSnippet.toString = () => `function ${names.getOuterHTMLSnippet}(element, ignoreAttrs = [], snippetCharacterLimit = 500) {
  ${truncate};
  return (${getOuterHTMLSnippetRawString})(element, ignoreAttrs, snippetCharacterLimit);
}`;
var getNodeDetailsRawString = getNodeDetails2.toString();
getNodeDetails2.toString = () => `function ${names.getNodeDetails}(element) {
  ${truncate};
  ${getNodePath};
  ${getNodeSelector};
  ${getBoundingClientRect};
  ${getOuterHTMLSnippetRawString};
  ${getNodeLabelRawString};
  return (${getNodeDetailsRawString})(element);
}`;
var pageFunctions = {
  wrapRuntimeEvalErrorInBrowser,
  getElementsInDocument,
  getOuterHTMLSnippet,
  computeBenchmarkIndex,
  getNodeDetails: getNodeDetails2,
  getNodePath,
  getNodeSelector,
  getNodeLabel,
  isPositionFixed,
  wrapRequestIdleCallback,
  getBoundingClientRect,
  truncate,
  esbuildFunctionWrapperString,
  getRuntimeFunctionName
};

// node_modules/lighthouse/core/gather/gatherers/trace.js
var Trace = class _Trace extends base_gatherer_default {
  /** @type {LH.Trace} */
  _trace = { traceEvents: [] };
  static getDefaultTraceCategories() {
    return [
      // Exclude default categories. We'll be selective to minimize trace size
      "-*",
      // Used instead of 'toplevel' in Chrome 71+
      "disabled-by-default-lighthouse",
      // Used for Cumulative Layout Shift metric
      "loading",
      // All compile/execute events are captured by parent events in devtools.timeline..
      // But the v8 category provides some nice context for only <0.5% of the trace size
      "v8",
      // Same situation here. This category is there for RunMicrotasks only, but with other teams
      // accidentally excluding microtasks, we don't want to assume a parent event will always exist
      "v8.execute",
      // For extracting UserTiming marks/measures
      "blink.user_timing",
      // Not mandatory but not used much
      "blink.console",
      // Most of the events we need are from these two categories
      "devtools.timeline",
      "disabled-by-default-devtools.timeline",
      // Up to 450 (https://goo.gl/rBfhn4) JPGs added to the trace
      "disabled-by-default-devtools.screenshot",
      // This doesn't add its own events, but adds a `stackTrace` property to devtools.timeline events
      "disabled-by-default-devtools.timeline.stack",
      // Additional categories used by devtools. Not used by Lighthouse, but included to facilitate
      // loading traces from Lighthouse into the Performance panel.
      "disabled-by-default-devtools.timeline.frame",
      "latencyInfo",
      // Enhanced traces.
      "disabled-by-default-devtools.target-rundown",
      "disabled-by-default-devtools.v8-source-rundown-sources",
      "disabled-by-default-devtools.v8-source-rundown"
      // Not used by Lighthouse (yet) but included for users that want JS samples when looking at
      // a trace collected by Lighthouse (e.g. "View Trace" workflow in DevTools)
      // TODO: Re-enable after investigating b/325659693
      // 'disabled-by-default-v8.cpu_profiler',
    ];
  }
  /**
   * @param {LH.Gatherer.ProtocolSession} session
   * @return {Promise<LH.Trace>}
   */
  static async endTraceAndCollectEvents(session) {
    const traceEvents = [];
    const dataListener = function(data) {
      traceEvents.push(...data.value);
    };
    session.on("Tracing.dataCollected", dataListener);
    return new Promise((resolve, reject) => {
      session.once("Tracing.tracingComplete", (_) => {
        session.off("Tracing.dataCollected", dataListener);
        resolve({ traceEvents });
      });
      session.sendCommand("Tracing.end").catch(reject);
    });
  }
  static symbol = /* @__PURE__ */ Symbol("Trace");
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    symbol: _Trace.symbol,
    supportedModes: ["timespan", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   */
  async startSensitiveInstrumentation({ driver, gatherMode, settings }) {
    const traceCategories = _Trace.getDefaultTraceCategories().concat(settings.additionalTraceCategories || []);
    await driver.defaultSession.sendCommand("Page.enable");
    await driver.defaultSession.sendCommand("Tracing.start", {
      categories: traceCategories.join(","),
      options: "sampling-frequency=10000"
      // 1000 is default and too slow.
    });
    if (gatherMode === "timespan") {
      await driver.defaultSession.sendCommand(
        "Tracing.recordClockSyncMarker",
        { syncId: TraceProcessor.TIMESPAN_MARKER_ID }
      );
    }
  }
  /**
   * @param {LH.Gatherer.Context} passContext
   */
  async stopSensitiveInstrumentation({ driver }) {
    this._trace = await _Trace.endTraceAndCollectEvents(driver.defaultSession);
  }
  getDebugData() {
    return this._trace;
  }
  getArtifact() {
    return this._trace;
  }
};
var trace_default = Trace;

// node_modules/lighthouse/core/gather/driver/execution-context.js
var ExecutionContext = class _ExecutionContext {
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

// node_modules/lighthouse/core/gather/gatherers/source-maps.js
var import_SDK = __toESM(require_SDK(), 1);

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
function isLighthouseRuntimeEvaluateScript(script) {
  if (!script.embedderName) return true;
  return script.hasSourceURL && script.url === "_lighthouse-eval.js";
}
var Scripts = class _Scripts extends base_gatherer_default {
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

// node_modules/lighthouse/core/gather/gatherers/source-maps.js
var SourceMaps = class _SourceMaps extends base_gatherer_default {
  static symbol = /* @__PURE__ */ Symbol("SourceMaps");
  /** @type {LH.Gatherer.GathererMeta<'Scripts'>} */
  meta = {
    symbol: _SourceMaps.symbol,
    supportedModes: ["timespan", "navigation"],
    dependencies: { Scripts: scripts_default.symbol }
  };
  /**
   * @param {LH.Gatherer.Driver} driver
   * @param {string} sourceMapUrl
   * @return {Promise<LH.Artifacts.RawSourceMap>}
   */
  async fetchSourceMap(driver, sourceMapUrl) {
    const response = await driver.fetcher.fetchResource(sourceMapUrl, { timeout: 1500 });
    if (response.content === null) {
      throw new Error(`Failed fetching source map (${response.status})`);
    }
    return import_SDK.default.SourceMap.parseSourceMap(response.content);
  }
  /**
   * @param {string} sourceMapURL
   * @return {LH.Artifacts.RawSourceMap}
   */
  parseSourceMapFromDataUrl(sourceMapURL) {
    const buffer = Buffer.from(sourceMapURL.split(",")[1], "base64");
    return import_SDK.default.SourceMap.parseSourceMap(buffer.toString());
  }
  /**
   * @param {string} url
   * @param {string} base
   * @return {string|undefined}
   */
  _resolveUrl(url, base) {
    try {
      return new URL(url, base).href;
    } catch (e) {
      return;
    }
  }
  /**
   * @param {LH.Gatherer.Driver} driver
   * @param {LH.Artifacts.Script} script
   * @return {Promise<LH.Artifacts.SourceMap>}
   */
  async _retrieveMapFromScript(driver, script) {
    if (!script.sourceMapURL) {
      throw new Error("precondition failed: event.sourceMapURL should exist");
    }
    const isSourceMapADataUri = script.sourceMapURL.startsWith("data:");
    const scriptUrl = script.name;
    const rawSourceMapUrl = isSourceMapADataUri ? script.sourceMapURL : this._resolveUrl(script.sourceMapURL, script.name);
    if (!rawSourceMapUrl) {
      return {
        scriptId: script.scriptId,
        scriptUrl,
        errorMessage: `Could not resolve map url: ${script.sourceMapURL}`
      };
    }
    const sourceMapUrl = isSourceMapADataUri ? void 0 : rawSourceMapUrl;
    try {
      const map = isSourceMapADataUri ? this.parseSourceMapFromDataUrl(rawSourceMapUrl) : await this.fetchSourceMap(driver, rawSourceMapUrl);
      if (typeof map.version !== "number") throw new Error("Map has no numeric `version` field");
      if (!Array.isArray(map.sources)) throw new Error("Map has no `sources` list");
      if (typeof map.mappings !== "string") throw new Error("Map has no `mappings` field");
      if (map.sections) {
        map.sections = map.sections.filter((section) => section.map);
      }
      return {
        scriptId: script.scriptId,
        scriptUrl,
        sourceMapUrl,
        map
      };
    } catch (err) {
      return {
        scriptId: script.scriptId,
        scriptUrl,
        sourceMapUrl,
        errorMessage: err.toString()
      };
    }
  }
  /**
   * @param {LH.Gatherer.Context<'Scripts'>} context
   * @return {Promise<LH.Artifacts['SourceMaps']>}
   */
  async getArtifact(context) {
    const eventProcessPromises = context.dependencies.Scripts.filter((script) => script.sourceMapURL).map((script) => this._retrieveMapFromScript(context.driver, script));
    return Promise.all(eventProcessPromises);
  }
};
var source_maps_default = SourceMaps;

// node_modules/lighthouse/core/gather/gatherers/trace-elements.js
var MAX_LAYOUT_SHIFTS = 15;
function getNodeDetailsData() {
  const elem = this.nodeType === document.ELEMENT_NODE ? this : this.parentElement;
  let traceElement;
  if (elem) {
    traceElement = { node: getNodeDetails(elem) };
  }
  return traceElement;
}
var TraceElements = class _TraceElements extends base_gatherer_default {
  /** @type {LH.Gatherer.GathererMeta<'Trace'|'SourceMaps'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { Trace: trace_default.symbol, SourceMaps: source_maps_default.symbol }
  };
  /** @type {Map<string, string>} */
  animationIdToName = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this._onAnimationStarted = this._onAnimationStarted.bind(this);
  }
  /** @param {LH.Crdp.Animation.AnimationStartedEvent} args */
  _onAnimationStarted({ animation: { id, name } }) {
    if (name) this.animationIdToName.set(id, name);
  }
  /**
   * @param {LH.Artifacts.TraceEngineResult} traceEngineResult
   * @param {string|undefined} navigationId
   * @return {Promise<Array<{nodeId: number}>>}
   */
  static async getTraceEngineElements(traceEngineResult, navigationId) {
    const insightSet = [...traceEngineResult.insights.values()].at(-1);
    if (!insightSet) {
      return [];
    }
    if (navigationId) {
      if (insightSet.navigation?.args.data?.navigationId !== navigationId) {
        return [];
      }
    } else {
      if (insightSet.navigation) {
        return [];
      }
    }
    function recursiveObjectEnumerate(obj, cb, seen) {
      if (seen.has(seen)) {
        return;
      }
      seen.add(obj);
      if (obj && typeof obj === "object" && !Array.isArray(obj)) {
        if (obj instanceof Map) {
          for (const [key, val] of obj) {
            if (typeof val === "object") {
              recursiveObjectEnumerate(val, cb, seen);
            } else {
              cb(val, key);
            }
          }
        } else {
          Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "object") {
              recursiveObjectEnumerate(obj[key], cb, seen);
            } else {
              cb(obj[key], key);
            }
          });
        }
      } else if (Array.isArray(obj)) {
        obj.forEach((item) => {
          if (typeof item === "object" || Array.isArray(item)) {
            recursiveObjectEnumerate(item, cb, seen);
          }
        });
      }
    }
    const nodeIds = [];
    recursiveObjectEnumerate(insightSet.model, (val, key) => {
      const keys = ["nodeId", "node_id", "backendNodeId"];
      if (typeof val === "number" && keys.includes(key)) {
        nodeIds.push(val);
      }
    }, /* @__PURE__ */ new Set());
    for (const shift of insightSet.model.CLSCulprits.shifts.values()) {
      nodeIds.push(...shift.unsizedImages.map((s) => s.backendNodeId));
    }
    return [...new Set(nodeIds)].map((id) => ({ nodeId: id }));
  }
  /**
   * We want to a single representative node to represent the shift, so let's pick
   * the one with the largest impact (size x distance moved).
   *
   * @param {LH.Artifacts.TraceImpactedNode[]} impactedNodes
   * @param {Map<number, number>} impactByNodeId
   * @return {number|undefined}
   */
  static getBiggestImpactNodeForShiftEvent(impactedNodes, impactByNodeId) {
    let biggestImpactNodeId;
    let biggestImpactNodeScore = Number.NEGATIVE_INFINITY;
    for (const node of impactedNodes) {
      const impactScore = impactByNodeId.get(node.node_id);
      if (impactScore !== void 0 && impactScore > biggestImpactNodeScore) {
        biggestImpactNodeId = node.node_id;
        biggestImpactNodeScore = impactScore;
      }
    }
    return biggestImpactNodeId;
  }
  /**
   * This function finds the top (up to 15) layout shifts on the page, and returns
   * the id of the largest impacted node of each shift, along with any related nodes
   * that may have caused the shift.
   *
   * @param {LH.Trace} trace
   * @param {LH.Artifacts.TraceEngineResult['parsedTrace']} traceEngineResult
   * @param {LH.Gatherer.Context} context
   * @return {Promise<Array<{nodeId: number}>>}
   */
  static async getTopLayoutShifts(trace, traceEngineResult, context) {
    const { impactByNodeId } = await CumulativeLayoutShiftComputed.request(trace, context);
    const clusters = traceEngineResult.LayoutShifts.clusters ?? [];
    const layoutShiftEvents = (
      /** @type {import('../../lib/trace-engine.js').SaneSyntheticLayoutShift[]} */
      clusters.flatMap((c) => c.events)
    );
    return layoutShiftEvents.sort((a, b) => b.args.data.weighted_score_delta - a.args.data.weighted_score_delta).slice(0, MAX_LAYOUT_SHIFTS).flatMap((event) => {
      const nodeIds = [];
      const impactedNodes = event.args.data.impacted_nodes || [];
      const biggestImpactedNodeId = this.getBiggestImpactNodeForShiftEvent(impactedNodes, impactByNodeId);
      if (biggestImpactedNodeId !== void 0) {
        nodeIds.push(biggestImpactedNodeId);
      }
      return nodeIds.map((nodeId) => ({ nodeId }));
    });
  }
  /**
   * @param {LH.Trace} trace
   * @param {LH.Gatherer.Context} context
   * @return {Promise<TraceElementData|undefined>}
   */
  static async getResponsivenessElement(trace, context) {
    const { settings } = context;
    try {
      const responsivenessEvent = await ResponsivenessComputed.request({ trace, settings }, context);
      if (!responsivenessEvent) return;
      return { nodeId: responsivenessEvent.args.data.nodeId };
    } catch {
      return;
    }
  }
  /**
   * Find the node ids of elements which are animated using the Animation trace events.
   * @param {Array<LH.TraceEvent>} mainThreadEvents
   * @return {Promise<Array<TraceElementData>>}
   */
  async getAnimatedElements(mainThreadEvents) {
    const animationPairs = /* @__PURE__ */ new Map();
    for (const event of mainThreadEvents) {
      if (event.name !== "Animation") continue;
      if (!event.id2 || !event.id2.local) continue;
      const local = event.id2.local;
      const pair = animationPairs.get(local) || { begin: void 0, status: void 0 };
      if (event.ph === "b") {
        pair.begin = event;
      } else if (event.ph === "n" && event.args.data && event.args.data.compositeFailed !== void 0) {
        pair.status = event;
      }
      animationPairs.set(local, pair);
    }
    const elementAnimations = /* @__PURE__ */ new Map();
    for (const { begin, status } of animationPairs.values()) {
      const nodeId = begin?.args?.data?.nodeId;
      const animationId = begin?.args?.data?.id;
      const failureReasonsMask = status?.args?.data?.compositeFailed;
      const unsupportedProperties = status?.args?.data?.unsupportedProperties;
      if (!nodeId || !animationId) continue;
      const animationIds = elementAnimations.get(nodeId) || /* @__PURE__ */ new Set();
      animationIds.add({ animationId, failureReasonsMask, unsupportedProperties });
      elementAnimations.set(nodeId, animationIds);
    }
    const animatedElementData = [];
    for (const [nodeId, animationIds] of elementAnimations) {
      const animations = [];
      for (const { animationId, failureReasonsMask, unsupportedProperties } of animationIds) {
        const animationName = this.animationIdToName.get(animationId);
        animations.push({ name: animationName, failureReasonsMask, unsupportedProperties });
      }
      animatedElementData.push({ nodeId, animations });
    }
    return animatedElementData;
  }
  /**
   * @param {LH.Trace} trace
   * @param {LH.Gatherer.Context} context
   * @return {Promise<{nodeId: number, type: string} | undefined>}
   */
  static async getLcpElement(trace, context) {
    let processedNavigation;
    try {
      processedNavigation = await ProcessedNavigationComputed.request(trace, context);
    } catch (err) {
      if (context.gatherMode === "timespan" && err.code === LighthouseError.errors.NO_FCP.code) {
        return;
      }
      throw err;
    }
    const lcpData = processedNavigation.largestContentfulPaintEvt?.args?.data;
    if (lcpData?.nodeId === void 0 || !lcpData.type) return;
    return {
      nodeId: lcpData.nodeId,
      type: lcpData.type
    };
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async startInstrumentation(context) {
    await context.driver.defaultSession.sendCommand("Animation.enable");
    context.driver.defaultSession.on("Animation.animationStarted", this._onAnimationStarted);
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async stopInstrumentation(context) {
    context.driver.defaultSession.off("Animation.animationStarted", this._onAnimationStarted);
    await context.driver.defaultSession.sendCommand("Animation.disable");
  }
  /**
   * @param {LH.Gatherer.ProtocolSession} session
   * @param {number} backendNodeId
   */
  async getNodeDetails(session, backendNodeId) {
    try {
      const objectId = await resolveNodeIdToObjectId(session, backendNodeId);
      if (!objectId) return null;
      const deps = ExecutionContext.serializeDeps([
        pageFunctions.getNodeDetails,
        getNodeDetailsData
      ]);
      return await session.sendCommand("Runtime.callFunctionOn", {
        objectId,
        functionDeclaration: `function () {
          ${deps}
          return getNodeDetailsData.call(this);
        }`,
        returnByValue: true,
        awaitPromise: true
      });
    } catch (err) {
      Sentry.captureException(err, {
        tags: { gatherer: "TraceElements" },
        level: "error"
      });
    }
    return null;
  }
  /**
   * @param {LH.Gatherer.Context<'Trace'|'SourceMaps'>} context
   * @return {Promise<LH.Artifacts.TraceElement[]>}
   */
  async getArtifact(context) {
    const session = context.driver.defaultSession;
    const trace = context.dependencies.Trace;
    const SourceMaps2 = context.dependencies.SourceMaps;
    const settings = context.settings;
    const traceEngineResult = await TraceEngineResultComputed.request({ trace, settings, SourceMaps: SourceMaps2 }, context);
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const { mainThreadEvents } = processedTrace;
    const navigationId = processedTrace.timeOriginEvt.args.data?.navigationId;
    const traceEngineData = await _TraceElements.getTraceEngineElements(
      traceEngineResult,
      navigationId
    );
    const lcpNodeData = await _TraceElements.getLcpElement(trace, context);
    const shiftsData = await _TraceElements.getTopLayoutShifts(
      trace,
      traceEngineResult.parsedTrace,
      context
    );
    const animatedElementData = await this.getAnimatedElements(mainThreadEvents);
    const responsivenessElementData = await _TraceElements.getResponsivenessElement(trace, context);
    const backendNodeDataMap = /* @__PURE__ */ new Map([
      ["trace-engine", traceEngineData],
      ["largest-contentful-paint", lcpNodeData ? [lcpNodeData] : []],
      ["layout-shift", shiftsData],
      ["animation", animatedElementData],
      ["responsiveness", responsivenessElementData ? [responsivenessElementData] : []]
    ]);
    const callFunctionOnCache = /* @__PURE__ */ new Map();
    const traceElements = [];
    for (const [traceEventType, backendNodeData] of backendNodeDataMap) {
      for (let i = 0; i < backendNodeData.length; i++) {
        const backendNodeId = backendNodeData[i].nodeId;
        let response = callFunctionOnCache.get(backendNodeId);
        if (response === void 0) {
          response = await this.getNodeDetails(session, backendNodeId);
          callFunctionOnCache.set(backendNodeId, response);
        }
        if (response?.result?.value) {
          traceElements.push({
            ...response.result.value,
            traceEventType,
            animations: backendNodeData[i].animations,
            nodeId: backendNodeId,
            type: backendNodeData[i].type
          });
        }
      }
    }
    return traceElements;
  }
};
var trace_elements_default = TraceElements;

export {
  trace_elements_default
};
/*! Bundled license information:

lighthouse/core/gather/driver/dom.js:
lighthouse/core/gather/gatherers/trace.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/page-functions.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/driver/execution-context.js:
lighthouse/core/gather/gatherers/trace-elements.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/scripts.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/source-maps.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
