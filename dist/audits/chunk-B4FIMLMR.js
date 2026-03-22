import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  require_src
} from "./chunk-V6LRM2MD.js";
import {
  __commonJS,
  __toESM
} from "./chunk-23MNVS5G.js";

// node_modules/marky/lib/marky.cjs.js
var require_marky_cjs = __commonJS({
  "node_modules/marky/lib/marky.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var perf = typeof performance !== "undefined" && performance;
    var nowPolyfillForNode;
    {
      hrtime = process.hrtime;
      getNanoSeconds = function() {
        var hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      };
      loadTime = getNanoSeconds();
      nowPolyfillForNode = function() {
        return (getNanoSeconds() - loadTime) / 1e6;
      };
    }
    var hrtime;
    var getNanoSeconds;
    var loadTime;
    var now = perf && perf.now ? function() {
      return perf.now();
    } : nowPolyfillForNode;
    function throwIfEmpty(name) {
      if (!name) {
        throw new Error("name must be non-empty");
      }
    }
    function insertSorted(arr, item) {
      var low = 0;
      var high = arr.length;
      var mid;
      while (low < high) {
        mid = low + high >>> 1;
        if (arr[mid].startTime < item.startTime) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      arr.splice(low, 0, item);
    }
    exports.mark = void 0;
    exports.stop = void 0;
    exports.getEntries = void 0;
    exports.clear = void 0;
    if (perf && perf.mark && perf.measure && perf.getEntriesByName && perf.getEntriesByType && perf.clearMarks && perf.clearMeasures && // In Node, we want to detect that this perf/correctness fix [1] is available, which
    // landed in Node 16.15.0, 17.6.0, and 18.0.0. However, it's not observable, and
    // we don't want to rely on fragile version checks.
    // So we can rely on this observable change [2] to add clearResourceTimings, which
    // landed a bit later (18.2.0), but is close enough for our purposes.
    // [1]: https://github.com/nodejs/node/pull/42032
    // [2]: https://github.com/nodejs/node/pull/42725
    perf.clearResourceTimings) {
      exports.mark = function(name) {
        throwIfEmpty(name);
        perf.mark("start " + name);
      };
      exports.stop = function(name) {
        throwIfEmpty(name);
        perf.mark("end " + name);
        var measure = perf.measure(name, "start " + name, "end " + name);
        if (measure) {
          return measure;
        }
        var entries2 = perf.getEntriesByName(name);
        return entries2[entries2.length - 1];
      };
      exports.getEntries = function() {
        return perf.getEntriesByType("measure");
      };
      exports.clear = function() {
        perf.clearMarks();
        perf.clearMeasures();
      };
    } else {
      marks = {};
      entries = [];
      exports.mark = function(name) {
        throwIfEmpty(name);
        var startTime = now();
        marks["$" + name] = startTime;
      };
      exports.stop = function(name) {
        throwIfEmpty(name);
        var endTime = now();
        var startTime = marks["$" + name];
        if (!startTime) {
          throw new Error("no known mark: " + name);
        }
        var entry = {
          startTime,
          name,
          duration: endTime - startTime,
          entryType: "measure"
        };
        insertSorted(entries, entry);
        return entry;
      };
      exports.getEntries = function() {
        return entries;
      };
      exports.clear = function() {
        marks = {};
        entries = [];
      };
    }
    var marks;
    var entries;
  }
});

// node_modules/lighthouse-logger/index.js
var import_debug = __toESM(require_src(), 1);
var marky = __toESM(require_marky_cjs(), 1);
import process2 from "process";
import { EventEmitter } from "events";
var isWindows = process2.platform === "win32";
var isBrowser = process2.browser;
var colors = {
  red: isBrowser ? "crimson" : 1,
  yellow: isBrowser ? "gold" : 3,
  cyan: isBrowser ? "darkturquoise" : 6,
  green: isBrowser ? "forestgreen" : 2,
  blue: isBrowser ? "steelblue" : 4,
  magenta: isBrowser ? "palevioletred" : 5
};
import_debug.default.colors = [colors.cyan, colors.green, colors.blue, colors.magenta];
var Emitter = class extends EventEmitter {
  // yarn build-types fails without this!
  // https://github.com/microsoft/TypeScript/issues/41672#issuecomment-2303803072
  constructor(options) {
    super(options);
  }
  /**
   * Fires off all status updates. Listen with
   * `require('lib/log').events.addListener('status', callback)`
   * @param {string} title
   * @param {!Array<*>} argsArray
   */
  issueStatus(title, argsArray) {
    if (title === "status" || title === "statusEnd") {
      this.emit(title, [title, ...argsArray]);
    }
  }
  /**
   * Fires off all warnings. Listen with
   * `require('lib/log').events.addListener('warning', callback)`
   * @param {string} title
   * @param {!Array<*>} argsArray
   */
  issueWarning(title, argsArray) {
    this.emit("warning", [title, ...argsArray]);
  }
};
var loggersByTitle = {};
var loggingBufferColumns = 25;
var level_;
var Log = class _Log {
  static _logToStdErr(title, argsArray) {
    const log = _Log.loggerfn(title);
    log(...argsArray);
  }
  /**
   * @param {string} title
   */
  static loggerfn(title) {
    title = `LH:${title}`;
    let log = loggersByTitle[title];
    if (!log) {
      log = (0, import_debug.default)(title);
      loggersByTitle[title] = log;
      if (title.endsWith("error")) {
        log.color = colors.red;
      } else if (title.endsWith("warn")) {
        log.color = colors.yellow;
      }
    }
    return log;
  }
  /**
   * @param {string} level
   */
  static setLevel(level) {
    level_ = level;
    switch (level) {
      case "silent":
        import_debug.default.enable("-LH:*");
        break;
      case "verbose":
        import_debug.default.enable("LH:*");
        break;
      case "warn":
        import_debug.default.enable("-LH:*, LH:*:warn, LH:*:error");
        break;
      case "error":
        import_debug.default.enable("-LH:*, LH:*:error");
        break;
      default:
        import_debug.default.enable("LH:*, -LH:*:verbose");
    }
  }
  /**
   * A simple formatting utility for event logging.
   * @param {string} prefix
   * @param {!Object} data A JSON-serializable object of event data to log.
   * @param {string=} level Optional logging level. Defaults to 'log'.
   */
  static formatProtocol(prefix, data, level) {
    const columns = !process2 || process2.browser ? Infinity : process2.stdout.columns;
    const method = data.method || "?????";
    const maxLength = columns - method.length - prefix.length - loggingBufferColumns;
    const snippet = data.params && method !== "IO.read" ? JSON.stringify(data.params).substr(0, maxLength) : "";
    _Log._logToStdErr(`${prefix}:${level || ""}`, [method, snippet]);
  }
  /**
   * @return {boolean}
   */
  static isVerbose() {
    return level_ === "verbose";
  }
  /**
   * @param {{msg: string, id: string, args?: any[]}} status
   * @param {string} level
   */
  static time({ msg, id, args = [] }, level = "log") {
    marky.mark(id);
    _Log[level]("status", msg, ...args);
  }
  /**
   * @param {{msg: string, id: string, args?: any[]}} status
   * @param {string} level
   */
  static timeEnd({ msg, id, args = [] }, level = "verbose") {
    _Log[level]("statusEnd", msg, ...args);
    marky.stop(id);
  }
  /**
   * @param {string} title
   * @param {...any} args
   */
  static log(title, ...args) {
    _Log.events.issueStatus(title, args);
    return _Log._logToStdErr(title, args);
  }
  /**
   * @param {string} title
   * @param {...any} args
   */
  static warn(title, ...args) {
    _Log.events.issueWarning(title, args);
    return _Log._logToStdErr(`${title}:warn`, args);
  }
  /**
   * @param {string} title
   * @param {...any} args
   */
  static error(title, ...args) {
    return _Log._logToStdErr(`${title}:error`, args);
  }
  /**
   * @param {string} title
   * @param {...any} args
   */
  static verbose(title, ...args) {
    _Log.events.issueStatus(title, args);
    return _Log._logToStdErr(`${title}:verbose`, args);
  }
  /**
   * Add surrounding escape sequences to turn a string green when logged.
   * @param {string} str
   * @return {string}
   */
  static greenify(str) {
    return `${_Log.green}${str}${_Log.reset}`;
  }
  /**
   * Add surrounding escape sequences to turn a string red when logged.
   * @param {string} str
   * @return {string}
   */
  static redify(str) {
    return `${_Log.red}${str}${_Log.reset}`;
  }
  static get green() {
    return "\x1B[32m";
  }
  static get red() {
    return "\x1B[31m";
  }
  static get yellow() {
    return "\x1B[33m";
  }
  static get purple() {
    return "\x1B[95m";
  }
  static get reset() {
    return "\x1B[0m";
  }
  static get bold() {
    return "\x1B[1m";
  }
  static get dim() {
    return "\x1B[2m";
  }
  static get tick() {
    return isWindows ? "\u221A" : "\u2713";
  }
  static get cross() {
    return isWindows ? "\xD7" : "\u2718";
  }
  static get whiteSmallSquare() {
    return isWindows ? "\u0387" : "\u25AB";
  }
  static get heavyHorizontal() {
    return isWindows ? "\u2500" : "\u2501";
  }
  static get heavyVertical() {
    return isWindows ? "\u2502 " : "\u2503 ";
  }
  static get heavyUpAndRight() {
    return isWindows ? "\u2514" : "\u2517";
  }
  static get heavyVerticalAndRight() {
    return isWindows ? "\u251C" : "\u2523";
  }
  static get heavyDownAndHorizontal() {
    return isWindows ? "\u252C" : "\u2533";
  }
  static get doubleLightHorizontal() {
    return "\u2500\u2500";
  }
};
Log.events = new Emitter();
Log.takeTimeEntries = () => {
  const entries = marky.getEntries();
  marky.clear();
  return entries;
};
Log.getTimeEntries = () => marky.getEntries();
var lighthouse_logger_default = Log;

export {
  lighthouse_logger_default
};
/*! Bundled license information:

lighthouse-logger/index.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
