import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  __name
} from "./chunk-XE6XARIN.js";

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

export {
  Util
};
/*! Bundled license information:

lighthouse/shared/statistics.js:
lighthouse/shared/util.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
