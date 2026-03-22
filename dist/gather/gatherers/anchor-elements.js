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

// node_modules/lighthouse/core/lib/page-functions.js
import { createRequire } from "module";

// node_modules/lighthouse/shared/statistics.js
var MIN_PASSING_SCORE = 0.9;
var MAX_AVERAGE_SCORE = 0.8999999999999999;
var MIN_AVERAGE_SCORE = 0.5;
var MAX_FAILING_SCORE = 0.49999999999999994;
function erf(x) {
  const sign = Math.sign(x);
  x = Math.abs(x);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = t * (a1 + t * (a2 + t * (a3 + t * (a4 + t * a5))));
  return sign * (1 - y * Math.exp(-x * x));
}
__name(erf, "erf");
function getLogNormalScore({ median, p10 }, value) {
  if (median <= 0) throw new Error("median must be greater than zero");
  if (p10 <= 0) throw new Error("p10 must be greater than zero");
  if (p10 >= median) throw new Error("p10 must be less than the median");
  if (value <= 0) return 1;
  const INVERSE_ERFC_ONE_FIFTH = 0.9061938024368232;
  const xRatio = Math.max(Number.MIN_VALUE, value / median);
  const xLogRatio = Math.log(xRatio);
  const p10Ratio = Math.max(Number.MIN_VALUE, p10 / median);
  const p10LogRatio = -Math.log(p10Ratio);
  const standardizedX = xLogRatio * INVERSE_ERFC_ONE_FIFTH / p10LogRatio;
  const complementaryPercentile = (1 - erf(standardizedX)) / 2;
  let score;
  if (value <= p10) {
    score = Math.max(MIN_PASSING_SCORE, Math.min(1, complementaryPercentile));
  } else if (value <= median) {
    score = Math.max(MIN_AVERAGE_SCORE, Math.min(MAX_AVERAGE_SCORE, complementaryPercentile));
  } else {
    score = Math.max(0, Math.min(MAX_FAILING_SCORE, complementaryPercentile));
  }
  return score;
}
__name(getLogNormalScore, "getLogNormalScore");

// node_modules/lighthouse/shared/util.js
var ELLIPSIS = "\u2026";
var NBSP = "\xA0";
var PASS_THRESHOLD = 0.9;
var RATINGS = {
  PASS: { label: "pass", minScore: PASS_THRESHOLD },
  AVERAGE: { label: "average", minScore: 0.5 },
  FAIL: { label: "fail" },
  ERROR: { label: "error" }
};
var listOfTlds = [
  "com",
  "co",
  "gov",
  "edu",
  "ac",
  "org",
  "go",
  "gob",
  "or",
  "net",
  "in",
  "ne",
  "nic",
  "gouv",
  "web",
  "spb",
  "blog",
  "jus",
  "kiev",
  "mil",
  "wi",
  "qc",
  "ca",
  "bel",
  "on"
];
var Util = class _Util {
  static {
    __name(this, "Util");
  }
  static get RATINGS() {
    return RATINGS;
  }
  static get PASS_THRESHOLD() {
    return PASS_THRESHOLD;
  }
  static get MS_DISPLAY_VALUE() {
    return `%10d${NBSP}ms`;
  }
  /**
   * If LHR is older than 10.0 it will not have the `finalDisplayedUrl` property.
   * Old LHRs should have the `finalUrl` property which will work fine for the report.
   *
   * @param {LH.Result} lhr
   */
  static getFinalDisplayedUrl(lhr) {
    if (lhr.finalDisplayedUrl) return lhr.finalDisplayedUrl;
    if (lhr.finalUrl) return lhr.finalUrl;
    throw new Error("Could not determine final displayed URL");
  }
  /**
   * If LHR is older than 10.0 it will not have the `mainDocumentUrl` property.
   * Old LHRs should have the `finalUrl` property which is the same as `mainDocumentUrl`.
   *
   * @param {LH.Result} lhr
   */
  static getMainDocumentUrl(lhr) {
    return lhr.mainDocumentUrl || lhr.finalUrl;
  }
  /**
   * @param {LH.Result} lhr
   * @return {LH.Result.FullPageScreenshot=}
   */
  static getFullPageScreenshot(lhr) {
    if (lhr.fullPageScreenshot) {
      return lhr.fullPageScreenshot;
    }
    const details = (
      /** @type {LH.Result.FullPageScreenshot=} */
      lhr.audits["full-page-screenshot"]?.details
    );
    return details;
  }
  /**
   * Given the entity classification dataset and a URL, identify the entity.
   * @param {string} url
   * @param {LH.Result.Entities=} entities
   * @return {LH.Result.LhrEntity|string}
   */
  static getEntityFromUrl(url, entities) {
    if (!entities) {
      return _Util.getPseudoRootDomain(url);
    }
    const entity = entities.find((e) => e.origins.find((origin) => url.startsWith(origin)));
    return entity || _Util.getPseudoRootDomain(url);
  }
  /**
   * Split a string by markdown code spans (enclosed in `backticks`), splitting
   * into segments that were enclosed in backticks (marked as `isCode === true`)
   * and those that outside the backticks (`isCode === false`).
   * @param {string} text
   * @return {Array<{isCode: true, text: string}|{isCode: false, text: string}>}
   */
  static splitMarkdownCodeSpans(text) {
    const segments = [];
    const parts = text.split(/`(.*?)`/g);
    for (let i = 0; i < parts.length; i++) {
      const text2 = parts[i];
      if (!text2) continue;
      const isCode = i % 2 !== 0;
      segments.push({
        isCode,
        text: text2
      });
    }
    return segments;
  }
  /**
   * Split a string on markdown links (e.g. [some link](https://...)) into
   * segments of plain text that weren't part of a link (marked as
   * `isLink === false`), and segments with text content and a URL that did make
   * up a link (marked as `isLink === true`).
   * @param {string} text
   * @return {Array<{isLink: true, text: string, linkHref: string}|{isLink: false, text: string}>}
   */
  static splitMarkdownLink(text) {
    const segments = [];
    const parts = text.split(/\[([^\]]+?)\]\((https?:\/\/.*?)\)/g);
    while (parts.length) {
      const [preambleText, linkText, linkHref] = parts.splice(0, 3);
      if (preambleText) {
        segments.push({
          isLink: false,
          text: preambleText
        });
      }
      if (linkText && linkHref) {
        segments.push({
          isLink: true,
          text: linkText,
          linkHref
        });
      }
    }
    return segments;
  }
  /**
   * @param {string} string
   * @param {number} characterLimit
   * @param {string} ellipseSuffix
   */
  static truncate(string, characterLimit, ellipseSuffix = "\u2026") {
    if (string.length <= characterLimit) {
      return string;
    }
    const segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
    const iterator = segmenter.segment(string)[Symbol.iterator]();
    let lastSegmentIndex = 0;
    for (let i = 0; i <= characterLimit - ellipseSuffix.length; i++) {
      const result = iterator.next();
      if (result.done) {
        return string;
      }
      lastSegmentIndex = result.value.index;
    }
    for (let i = 0; i < ellipseSuffix.length; i++) {
      if (iterator.next().done) {
        return string;
      }
    }
    return string.slice(0, lastSegmentIndex) + ellipseSuffix;
  }
  /**
   * @param {URL} parsedUrl
   * @param {{numPathParts?: number, preserveQuery?: boolean, preserveHost?: boolean}=} options
   * @return {string}
   */
  static getURLDisplayName(parsedUrl, options) {
    options = options || {
      numPathParts: void 0,
      preserveQuery: void 0,
      preserveHost: void 0
    };
    const numPathParts = options.numPathParts !== void 0 ? options.numPathParts : 2;
    const preserveQuery = options.preserveQuery !== void 0 ? options.preserveQuery : true;
    const preserveHost = options.preserveHost || false;
    let name;
    if (parsedUrl.protocol === "about:" || parsedUrl.protocol === "data:") {
      name = parsedUrl.href;
    } else {
      name = parsedUrl.pathname;
      const parts = name.split("/").filter((part) => part.length);
      if (numPathParts && parts.length > numPathParts) {
        name = ELLIPSIS + parts.slice(-1 * numPathParts).join("/");
      }
      if (preserveHost) {
        name = `${parsedUrl.host}/${name.replace(/^\//, "")}`;
      }
      if (preserveQuery) {
        name = `${name}${parsedUrl.search}`;
      }
    }
    const MAX_LENGTH = 64;
    if (parsedUrl.protocol !== "data:") {
      name = name.slice(0, 200);
      name = name.replace(/([a-f0-9]{7})[a-f0-9]{13}[a-f0-9]*/g, `$1${ELLIPSIS}`);
      name = name.replace(
        /([a-zA-Z0-9-_]{9})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9-_]{10,}/g,
        `$1${ELLIPSIS}`
      );
      name = name.replace(/(\d{3})\d{6,}/g, `$1${ELLIPSIS}`);
      name = name.replace(/\u2026+/g, ELLIPSIS);
      if (name.length > MAX_LENGTH && name.includes("?")) {
        name = name.replace(/\?([^=]*)(=)?.*/, `?$1$2${ELLIPSIS}`);
        if (name.length > MAX_LENGTH) {
          name = name.replace(/\?.*/, `?${ELLIPSIS}`);
        }
      }
    }
    if (name.length > MAX_LENGTH) {
      const dotIndex = name.lastIndexOf(".");
      if (dotIndex >= 0) {
        name = name.slice(0, MAX_LENGTH - 1 - (name.length - dotIndex)) + // Show file extension
        `${ELLIPSIS}${name.slice(dotIndex)}`;
      } else {
        name = name.slice(0, MAX_LENGTH - 1) + ELLIPSIS;
      }
    }
    return name;
  }
  /**
   * Returns the origin portion of a Chrome extension URL.
   * @param {string} url
   * @return {string}
   */
  static getChromeExtensionOrigin(url) {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol + "//" + parsedUrl.host;
  }
  /**
   * Split a URL into a file, hostname and origin for easy display.
   * @param {string} url
   * @return {{file: string, hostname: string, origin: string}}
   */
  static parseURL(url) {
    const parsedUrl = new URL(url);
    return {
      file: _Util.getURLDisplayName(parsedUrl),
      hostname: parsedUrl.hostname,
      // Node's URL parsing behavior is different than Chrome and returns 'null'
      // for chrome-extension:// URLs. See https://github.com/nodejs/node/issues/21955.
      origin: parsedUrl.protocol === "chrome-extension:" ? _Util.getChromeExtensionOrigin(url) : parsedUrl.origin
    };
  }
  /**
   * @param {string|URL} value
   * @return {!URL}
   */
  static createOrReturnURL(value) {
    if (value instanceof URL) {
      return value;
    }
    return new URL(value);
  }
  /**
   * Gets the tld of a domain
   * This function is used only while rendering pre-10.0 LHRs.
   *
   * @param {string} hostname
   * @return {string} tld
   */
  static getPseudoTld(hostname) {
    const tlds = hostname.split(".").slice(-2);
    if (!listOfTlds.includes(tlds[0])) {
      return `.${tlds[tlds.length - 1]}`;
    }
    return `.${tlds.join(".")}`;
  }
  /**
   * Returns a primary domain for provided hostname (e.g. www.example.com -> example.com).
   * As it doesn't consult the Public Suffix List, it can sometimes lose detail.
   * See the `listOfTlds` comment above for more.
   * This function is used only while rendering pre-10.0 LHRs. See UrlUtils.getRootDomain
   * for the current method that makes use of PSL.
   * @param {string|URL} url hostname or URL object
   * @return {string}
   */
  static getPseudoRootDomain(url) {
    const hostname = _Util.createOrReturnURL(url).hostname;
    const tld = _Util.getPseudoTld(hostname);
    const splitTld = tld.split(".");
    return hostname.split(".").slice(-splitTld.length).join(".");
  }
  /**
   * Returns only lines that are near a message, or the first few lines if there are
   * no line messages.
   * @param {SnippetValue['lines']} lines
   * @param {SnippetValue['lineMessages']} lineMessages
   * @param {number} surroundingLineCount Number of lines to include before and after
   * the message. If this is e.g. 2 this function might return 5 lines.
   */
  static filterRelevantLines(lines, lineMessages, surroundingLineCount) {
    if (lineMessages.length === 0) {
      return lines.slice(0, surroundingLineCount * 2 + 1);
    }
    const minGapSize = 3;
    const lineNumbersToKeep = /* @__PURE__ */ new Set();
    lineMessages = lineMessages.sort((a, b) => (a.lineNumber || 0) - (b.lineNumber || 0));
    lineMessages.forEach(({ lineNumber }) => {
      let firstSurroundingLineNumber = lineNumber - surroundingLineCount;
      let lastSurroundingLineNumber = lineNumber + surroundingLineCount;
      while (firstSurroundingLineNumber < 1) {
        firstSurroundingLineNumber++;
        lastSurroundingLineNumber++;
      }
      if (lineNumbersToKeep.has(firstSurroundingLineNumber - minGapSize - 1)) {
        firstSurroundingLineNumber -= minGapSize;
      }
      for (let i = firstSurroundingLineNumber; i <= lastSurroundingLineNumber; i++) {
        const surroundingLineNumber = i;
        lineNumbersToKeep.add(surroundingLineNumber);
      }
    });
    return lines.filter((line) => lineNumbersToKeep.has(line.lineNumber));
  }
  /**
   * Computes a score between 0 and 1 based on the measured `value`. Score is determined by
   * considering a log-normal distribution governed by two control points (the 10th
   * percentile value and the median value) and represents the percentage of sites that are
   * greater than `value`.
   *
   * Score characteristics:
   * - within [0, 1]
   * - rounded to two digits
   * - value must meet or beat a controlPoint value to meet or exceed its percentile score:
   *   - value > median will give a score < 0.5; value ≤ median will give a score ≥ 0.5.
   *   - value > p10 will give a score < 0.9; value ≤ p10 will give a score ≥ 0.9.
   * - values < p10 will get a slight boost so a score of 1 is achievable by a
   *   `value` other than those close to 0. Scores of > ~0.99524 end up rounded to 1.
   * @param {{median: number, p10: number}} controlPoints
   * @param {number} value
   * @return {number}
   */
  static computeLogNormalScore(controlPoints, value) {
    let percentile = getLogNormalScore(controlPoints, value);
    if (percentile > 0.9) {
      percentile += 0.05 * (percentile - 0.9);
    }
    return Math.floor(percentile * 100) / 100;
  }
};

// node_modules/lighthouse/core/lib/page-functions.js
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
__name(wrapRuntimeEvalErrorInBrowser, "wrapRuntimeEvalErrorInBrowser");
function getElementsInDocument2(selector) {
  const realMatchesFn = window.__ElementMatches || window.Element.prototype.matches;
  const results = [];
  const _findAllElements = /* @__PURE__ */ __name((nodes) => {
    for (const el of nodes) {
      if (!selector || realMatchesFn.call(el, selector)) {
        const matchedEl = el;
        results.push(matchedEl);
      }
      if (el.shadowRoot) {
        _findAllElements(el.shadowRoot.querySelectorAll("*"));
      }
    }
  }, "_findAllElements");
  _findAllElements(document.querySelectorAll("*"));
  return results;
}
__name(getElementsInDocument2, "getElementsInDocument");
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
__name(getOuterHTMLSnippet, "getOuterHTMLSnippet");
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
  __name(benchmarkIndexGC, "benchmarkIndexGC");
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
  __name(benchmarkIndexNoGC, "benchmarkIndexNoGC");
  return (benchmarkIndexGC() + benchmarkIndexNoGC()) / 2;
}
__name(computeBenchmarkIndex, "computeBenchmarkIndex");
function getNodePath(node) {
  const isShadowRoot = /* @__PURE__ */ __name((node2) => node2.nodeType === Node.DOCUMENT_FRAGMENT_NODE, "isShadowRoot");
  const getNodeParent = /* @__PURE__ */ __name((node2) => isShadowRoot(node2) ? node2.host : node2.parentNode, "getNodeParent");
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
  __name(getNodeIndex, "getNodeIndex");
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
__name(getNodePath, "getNodePath");
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
  __name(getSelectorPart, "getSelectorPart");
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
__name(getNodeSelector, "getNodeSelector");
function isPositionFixed(element) {
  function getStyleAttrValue(element2, attr) {
    return element2.style[attr] || window.getComputedStyle(element2)[attr];
  }
  __name(getStyleAttrValue, "getStyleAttrValue");
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
__name(isPositionFixed, "isPositionFixed");
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
__name(getNodeLabel, "getNodeLabel");
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
__name(getBoundingClientRect, "getBoundingClientRect");
function wrapRequestIdleCallback(cpuSlowdownMultiplier) {
  const safetyAllowanceMs = 10;
  const maxExecutionTimeMs = Math.floor((50 - safetyAllowanceMs) / cpuSlowdownMultiplier);
  const nativeRequestIdleCallback = window.requestIdleCallback;
  window.requestIdleCallback = (cb, options) => {
    const cbWrap = /* @__PURE__ */ __name((deadline) => {
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
    }, "cbWrap");
    return nativeRequestIdleCallback(cbWrap, options);
  };
  window.requestIdleCallback.toString = () => {
    return "function requestIdleCallback() { [native code] }";
  };
}
__name(wrapRequestIdleCallback, "wrapRequestIdleCallback");
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
__name(getNodeDetails2, "getNodeDetails");
function truncate(string, characterLimit) {
  return Util.truncate(string, characterLimit);
}
__name(truncate, "truncate");
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
__name(isBundledEnvironment, "isBundledEnvironment");
var esbuildFunctionWrapperString = createEsbuildFunctionWrapper();
function createEsbuildFunctionWrapper() {
  if (!isBundledEnvironment()) {
    return "";
  }
  const functionAsString = (() => {
    const a = /* @__PURE__ */ __name(() => {
    }, "a");
  }).toString().replace("/* @__PURE__ */", "");
  const functionStringMatch = functionAsString.match(/=\s*([\w_]+)\(/);
  if (!functionStringMatch) {
    throw new Error("Could not determine esbuild function wrapper name");
  }
  const esbuildFunctionWrapper = /* @__PURE__ */ __name((fn, value) => Object.defineProperty(fn, "name", { value, configurable: true }), "esbuildFunctionWrapper");
  const wrapperFnName = functionStringMatch[1];
  return `let ${wrapperFnName}=${esbuildFunctionWrapper}`;
}
__name(createEsbuildFunctionWrapper, "createEsbuildFunctionWrapper");
function getRuntimeFunctionName(fn) {
  const match = fn.toString().match(/function ([\w$]+)/);
  if (!match) throw new Error(`could not find function name for: ${fn}`);
  return match[1];
}
__name(getRuntimeFunctionName, "getRuntimeFunctionName");
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
  getElementsInDocument: getElementsInDocument2,
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

// node_modules/lighthouse/core/gather/driver/dom.js
function handlePotentialMissingNodeError(err) {
  if (/No node.*found/.test(err.message) || /Node.*does not belong to the document/.test(err.message)) {
    return void 0;
  }
  throw err;
}
__name(handlePotentialMissingNodeError, "handlePotentialMissingNodeError");
async function resolveDevtoolsNodePathToObjectId(session, path) {
  try {
    const { nodeId } = await session.sendCommand("DOM.pushNodeByPathToFrontend", { path });
    const { object: { objectId } } = await session.sendCommand("DOM.resolveNode", { nodeId });
    return objectId;
  } catch (err) {
    return handlePotentialMissingNodeError(err);
  }
}
__name(resolveDevtoolsNodePathToObjectId, "resolveDevtoolsNodePathToObjectId");

// node_modules/lighthouse/core/gather/gatherers/anchor-elements.js
function collectAnchorElements() {
  const resolveURLOrEmpty = /* @__PURE__ */ __name((url) => {
    try {
      return new URL(url, window.location.href).href;
    } catch (_) {
      return "";
    }
  }, "resolveURLOrEmpty");
  function getTruncatedOnclick(node) {
    const onclick = node.getAttribute("onclick") || "";
    return onclick.slice(0, 1024);
  }
  __name(getTruncatedOnclick, "getTruncatedOnclick");
  function getLangOfInnerText(node) {
    let curNodeLang = null;
    for (const child of node.querySelectorAll("*")) {
      if (!child.textContent) continue;
      const childLang = child.closest("[lang]")?.getAttribute("lang");
      if (!childLang) continue;
      if (!curNodeLang) {
        curNodeLang = childLang;
        continue;
      }
      if (curNodeLang.split("-")[0] !== childLang.split("-")[0]) {
        return null;
      }
    }
    return curNodeLang ?? node.closest("[lang]")?.getAttribute("lang") ?? null;
  }
  __name(getLangOfInnerText, "getLangOfInnerText");
  const anchorElements = getElementsInDocument("a");
  const langElements = getElementsInDocument("[lang]");
  const documentHasSingleLang = langElements.length === 1 && (langElements[0].nodeName === "BODY" || langElements[0].nodeName === "HTML");
  const singleLang = documentHasSingleLang ? langElements[0].getAttribute("lang") : null;
  return anchorElements.map((node) => {
    if (node instanceof HTMLAnchorElement) {
      return {
        href: node.href,
        rawHref: node.getAttribute("href") || "",
        onclick: getTruncatedOnclick(node),
        role: node.getAttribute("role") || "",
        name: node.name,
        text: node.innerText,
        // we don't want to return hidden text, so use innerText
        textLang: singleLang ?? getLangOfInnerText(node) ?? void 0,
        rel: node.rel,
        target: node.target,
        id: node.getAttribute("id") || "",
        attributeNames: node.getAttributeNames(),
        // @ts-expect-error - getNodeDetails put into scope via stringification
        node: getNodeDetails(node)
      };
    }
    return {
      href: resolveURLOrEmpty(node.href.baseVal),
      rawHref: node.getAttribute("href") || "",
      onclick: getTruncatedOnclick(node),
      role: node.getAttribute("role") || "",
      text: node.textContent || "",
      textLang: singleLang ?? getLangOfInnerText(node) ?? void 0,
      rel: "",
      target: node.target.baseVal || "",
      id: node.getAttribute("id") || "",
      attributeNames: node.getAttributeNames(),
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(node)
    };
  });
}
__name(collectAnchorElements, "collectAnchorElements");
async function getEventListeners(session, devtoolsNodePath) {
  const objectId = await resolveDevtoolsNodePathToObjectId(session, devtoolsNodePath);
  if (!objectId) return [];
  const response = await session.sendCommand("DOMDebugger.getEventListeners", {
    objectId
  });
  return response.listeners.map(({ type }) => ({ type }));
}
__name(getEventListeners, "getEventListeners");
var AnchorElements = class extends base_gatherer_default {
  static {
    __name(this, "AnchorElements");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['AnchorElements']>}
   */
  async getArtifact(passContext) {
    const session = passContext.driver.defaultSession;
    const anchors = await passContext.driver.executionContext.evaluate(collectAnchorElements, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getElementsInDocument,
        pageFunctions.getNodeDetails
      ]
    });
    await session.sendCommand("DOM.enable");
    await session.sendCommand("DOM.getDocument", { depth: -1, pierce: true });
    const anchorsWithEventListeners = anchors.map(async (anchor) => {
      const listeners = await getEventListeners(session, anchor.node.devtoolsNodePath);
      const ancestorListeners = /* @__PURE__ */ new Set();
      const splitPath = anchor.node.devtoolsNodePath.split(",");
      const ancestorListenerPromises = [];
      while (splitPath.length >= 2) {
        splitPath.length -= 2;
        const path = splitPath.join(",");
        const promise = getEventListeners(session, path).then((listeners2) => {
          for (const listener of listeners2) {
            ancestorListeners.add(listener);
          }
        }).catch(() => {
        });
        ancestorListenerPromises.push(promise);
      }
      await Promise.all(ancestorListenerPromises);
      return {
        ...anchor,
        listeners,
        ancestorListeners: Array.from(ancestorListeners)
      };
    });
    const result = await Promise.all(anchorsWithEventListeners);
    await session.sendCommand("DOM.disable");
    return result;
  }
};
var anchor_elements_default = AnchorElements;
export {
  anchor_elements_default as default
};
/*! Bundled license information:

lighthouse/types/lh.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/base-gatherer.js:
lighthouse/core/gather/driver/dom.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/shared/statistics.js:
lighthouse/shared/util.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/page-functions.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/anchor-elements.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
