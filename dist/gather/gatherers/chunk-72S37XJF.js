import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  Util
} from "./chunk-XKFKI4NM.js";

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
function getNodeDetails(element) {
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
  getNodeDetails: getRuntimeFunctionName(getNodeDetails)
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
var getNodeDetailsRawString = getNodeDetails.toString();
getNodeDetails.toString = () => `function ${names.getNodeDetails}(element) {
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
  getNodeDetails,
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

export {
  pageFunctions
};
/*! Bundled license information:

lighthouse/core/lib/page-functions.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
