var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    __name(parse, "parse");
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    __name(fmtShort, "fmtShort");
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    __name(fmtLong, "fmtLong");
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
    __name(plural, "plural");
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      __name(selectColor, "selectColor");
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self = debug2;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        __name(debug2, "debug");
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
          enumerable: true,
          configurable: false,
          get: /* @__PURE__ */ __name(() => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          }, "get"),
          set: /* @__PURE__ */ __name((v) => {
            enableOverride = v;
          }, "set")
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      __name(createDebug, "createDebug");
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      __name(extend, "extend");
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      __name(enable, "enable");
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      __name(matchesTemplate, "matchesTemplate");
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      __name(disable, "disable");
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      __name(enabled, "enabled");
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      __name(coerce, "coerce");
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      __name(destroy, "destroy");
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    __name(setup, "setup");
    module.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    __name(useColors, "useColors");
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    __name(formatArgs, "formatArgs");
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    __name(save, "save");
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    __name(load, "load");
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    __name(localstorage, "localstorage");
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os = __require("os");
    var tty = __require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    __name(translateLevel, "translateLevel");
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    __name(supportsColor, "supportsColor");
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    __name(getSupportLevel, "getSupportLevel");
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    __name(useColors, "useColors");
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    __name(formatArgs, "formatArgs");
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    __name(getDate, "getDate");
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + "\n");
    }
    __name(log, "log");
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    __name(save, "save");
    function load() {
      return process.env.DEBUG;
    }
    __name(load, "load");
    function init(debug2) {
      debug2.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug2.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    __name(init, "init");
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// node_modules/marky/lib/marky.cjs.js
var require_marky_cjs = __commonJS({
  "node_modules/marky/lib/marky.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var perf = typeof performance !== "undefined" && performance;
    var nowPolyfillForNode;
    {
      hrtime = process.hrtime;
      getNanoSeconds = /* @__PURE__ */ __name(function() {
        var hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      }, "getNanoSeconds");
      loadTime = getNanoSeconds();
      nowPolyfillForNode = /* @__PURE__ */ __name(function() {
        return (getNanoSeconds() - loadTime) / 1e6;
      }, "nowPolyfillForNode");
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
    __name(throwIfEmpty, "throwIfEmpty");
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
    __name(insertSorted, "insertSorted");
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

// node_modules/lookup-closest-locale/index.js
var require_lookup_closest_locale = __commonJS({
  "node_modules/lookup-closest-locale/index.js"(exports, module) {
    module.exports = /* @__PURE__ */ __name(function lookupClosestLocale2(locale, available) {
      if (typeof locale === "string" && available[locale]) return locale;
      var locales2 = [].concat(locale || []);
      for (var l = 0, ll = locales2.length; l < ll; ++l) {
        var current = locales2[l].split("-");
        while (current.length) {
          var candidate = current.join("-");
          if (available[candidate]) return candidate;
          current.pop();
        }
      }
    }, "lookupClosestLocale");
  }
});

// node_modules/tslib/tslib.es6.mjs
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __addDisposableResource: () => __addDisposableResource,
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldIn: () => __classPrivateFieldIn,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __disposeResources: () => __disposeResources,
  __esDecorate: () => __esDecorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __propKey: () => __propKey,
  __read: () => __read,
  __rest: () => __rest,
  __rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
  __runInitializers: () => __runInitializers,
  __setFunctionName: () => __setFunctionName,
  __spread: () => __spread,
  __spreadArray: () => __spreadArray,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values,
  default: () => tslib_es6_default
});
function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  __name(__, "__");
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  __name(accept, "accept");
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}
function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  __name(adopt, "adopt");
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    __name(fulfilled, "fulfilled");
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    __name(rejected, "rejected");
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    __name(step, "step");
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: /* @__PURE__ */ __name(function() {
    if (t[0] & 1) throw t[1];
    return t[1];
  }, "sent"), trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  __name(verb, "verb");
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
  __name(step, "step");
}
function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: /* @__PURE__ */ __name(function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }, "next")
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  __name(awaitReturn, "awaitReturn");
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  __name(verb, "verb");
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  __name(resume, "resume");
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  __name(step, "step");
  function fulfill(value) {
    resume("next", value);
  }
  __name(fulfill, "fulfill");
  function reject(value) {
    resume("throw", value);
  }
  __name(reject, "reject");
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
  __name(settle, "settle");
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
  __name(verb, "verb");
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  __name(verb, "verb");
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
  __name(settle, "settle");
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = /* @__PURE__ */ __name(function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    }, "dispose");
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}
function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  __name(fail, "fail");
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
            fail(e);
            return next();
          });
        } else s |= 1;
      } catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  __name(next, "next");
  return next();
}
function __rewriteRelativeImportExtension(path4, preserveJsx) {
  if (typeof path4 === "string" && /^\.\.?\//.test(path4)) {
    return path4.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
      return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
    });
  }
  return path4;
}
var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys, _SuppressedError, tslib_es6_default;
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.mjs"() {
    extendStatics = /* @__PURE__ */ __name(function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    }, "extendStatics");
    __name(__extends, "__extends");
    __assign = /* @__PURE__ */ __name(function() {
      __assign = Object.assign || /* @__PURE__ */ __name(function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      }, "__assign");
      return __assign.apply(this, arguments);
    }, "__assign");
    __name(__rest, "__rest");
    __name(__decorate, "__decorate");
    __name(__param, "__param");
    __name(__esDecorate, "__esDecorate");
    __name(__runInitializers, "__runInitializers");
    __name(__propKey, "__propKey");
    __name(__setFunctionName, "__setFunctionName");
    __name(__metadata, "__metadata");
    __name(__awaiter, "__awaiter");
    __name(__generator, "__generator");
    __createBinding = Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    __name(__exportStar, "__exportStar");
    __name(__values, "__values");
    __name(__read, "__read");
    __name(__spread, "__spread");
    __name(__spreadArrays, "__spreadArrays");
    __name(__spreadArray, "__spreadArray");
    __name(__await, "__await");
    __name(__asyncGenerator, "__asyncGenerator");
    __name(__asyncDelegator, "__asyncDelegator");
    __name(__asyncValues, "__asyncValues");
    __name(__makeTemplateObject, "__makeTemplateObject");
    __setModuleDefault = Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    };
    ownKeys = /* @__PURE__ */ __name(function(o) {
      ownKeys = Object.getOwnPropertyNames || function(o2) {
        var ar = [];
        for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
        return ar;
      };
      return ownKeys(o);
    }, "ownKeys");
    __name(__importStar, "__importStar");
    __name(__importDefault, "__importDefault");
    __name(__classPrivateFieldGet, "__classPrivateFieldGet");
    __name(__classPrivateFieldSet, "__classPrivateFieldSet");
    __name(__classPrivateFieldIn, "__classPrivateFieldIn");
    __name(__addDisposableResource, "__addDisposableResource");
    _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    __name(__disposeResources, "__disposeResources");
    __name(__rewriteRelativeImportExtension, "__rewriteRelativeImportExtension");
    tslib_es6_default = {
      __extends,
      __assign,
      __rest,
      __decorate,
      __param,
      __esDecorate,
      __runInitializers,
      __propKey,
      __setFunctionName,
      __metadata,
      __awaiter,
      __generator,
      __createBinding,
      __exportStar,
      __values,
      __read,
      __spread,
      __spreadArrays,
      __spreadArray,
      __await,
      __asyncGenerator,
      __asyncDelegator,
      __asyncValues,
      __makeTemplateObject,
      __importStar,
      __importDefault,
      __classPrivateFieldGet,
      __classPrivateFieldSet,
      __classPrivateFieldIn,
      __addDisposableResource,
      __disposeResources,
      __rewriteRelativeImportExtension
    };
  }
});

// node_modules/@formatjs/fast-memoize/index.js
var require_fast_memoize = __commonJS({
  "node_modules/@formatjs/fast-memoize/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.strategies = void 0;
    exports.memoize = memoize;
    function memoize(fn, options) {
      var cache = options && options.cache ? options.cache : cacheDefault;
      var serializer = options && options.serializer ? options.serializer : serializerDefault;
      var strategy = options && options.strategy ? options.strategy : strategyDefault;
      return strategy(fn, {
        cache,
        serializer
      });
    }
    __name(memoize, "memoize");
    function isPrimitive(value) {
      return value == null || typeof value === "number" || typeof value === "boolean";
    }
    __name(isPrimitive, "isPrimitive");
    function monadic(fn, cache, serializer, arg) {
      var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    __name(monadic, "monadic");
    function variadic(fn, cache, serializer) {
      var args = Array.prototype.slice.call(arguments, 3);
      var cacheKey = serializer(args);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    __name(variadic, "variadic");
    function assemble(fn, context, strategy, cache, serialize) {
      return strategy.bind(context, fn, cache, serialize);
    }
    __name(assemble, "assemble");
    function strategyDefault(fn, options) {
      var strategy = fn.length === 1 ? monadic : variadic;
      return assemble(fn, this, strategy, options.cache.create(), options.serializer);
    }
    __name(strategyDefault, "strategyDefault");
    function strategyVariadic(fn, options) {
      return assemble(fn, this, variadic, options.cache.create(), options.serializer);
    }
    __name(strategyVariadic, "strategyVariadic");
    function strategyMonadic(fn, options) {
      return assemble(fn, this, monadic, options.cache.create(), options.serializer);
    }
    __name(strategyMonadic, "strategyMonadic");
    var serializerDefault = /* @__PURE__ */ __name(function() {
      return JSON.stringify(arguments);
    }, "serializerDefault");
    var ObjectWithoutPrototypeCache = (
      /** @class */
      (function() {
        function ObjectWithoutPrototypeCache2() {
          this.cache = /* @__PURE__ */ Object.create(null);
        }
        __name(ObjectWithoutPrototypeCache2, "ObjectWithoutPrototypeCache");
        ObjectWithoutPrototypeCache2.prototype.get = function(key) {
          return this.cache[key];
        };
        ObjectWithoutPrototypeCache2.prototype.set = function(key, value) {
          this.cache[key] = value;
        };
        return ObjectWithoutPrototypeCache2;
      })()
    );
    var cacheDefault = {
      create: /* @__PURE__ */ __name(function create() {
        return new ObjectWithoutPrototypeCache();
      }, "create")
    };
    exports.strategies = {
      variadic: strategyVariadic,
      monadic: strategyMonadic
    };
  }
});

// node_modules/@formatjs/icu-messageformat-parser/error.js
var require_error = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorKind = void 0;
    var ErrorKind;
    (function(ErrorKind2) {
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
      ErrorKind2[ErrorKind2["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
      ErrorKind2[ErrorKind2["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
      ErrorKind2[ErrorKind2["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
      ErrorKind2[ErrorKind2["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
      ErrorKind2[ErrorKind2["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
      ErrorKind2[ErrorKind2["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
      ErrorKind2[ErrorKind2["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
      ErrorKind2[ErrorKind2["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
      ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
      ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
      ErrorKind2[ErrorKind2["INVALID_TAG"] = 23] = "INVALID_TAG";
      ErrorKind2[ErrorKind2["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
      ErrorKind2[ErrorKind2["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
      ErrorKind2[ErrorKind2["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
    })(ErrorKind || (exports.ErrorKind = ErrorKind = {}));
  }
});

// node_modules/@formatjs/icu-messageformat-parser/types.js
var require_types = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SKELETON_TYPE = exports.TYPE = void 0;
    exports.isLiteralElement = isLiteralElement;
    exports.isArgumentElement = isArgumentElement;
    exports.isNumberElement = isNumberElement;
    exports.isDateElement = isDateElement;
    exports.isTimeElement = isTimeElement;
    exports.isSelectElement = isSelectElement;
    exports.isPluralElement = isPluralElement;
    exports.isPoundElement = isPoundElement;
    exports.isTagElement = isTagElement;
    exports.isNumberSkeleton = isNumberSkeleton;
    exports.isDateTimeSkeleton = isDateTimeSkeleton;
    exports.createLiteralElement = createLiteralElement;
    exports.createNumberElement = createNumberElement;
    var TYPE2;
    (function(TYPE3) {
      TYPE3[TYPE3["literal"] = 0] = "literal";
      TYPE3[TYPE3["argument"] = 1] = "argument";
      TYPE3[TYPE3["number"] = 2] = "number";
      TYPE3[TYPE3["date"] = 3] = "date";
      TYPE3[TYPE3["time"] = 4] = "time";
      TYPE3[TYPE3["select"] = 5] = "select";
      TYPE3[TYPE3["plural"] = 6] = "plural";
      TYPE3[TYPE3["pound"] = 7] = "pound";
      TYPE3[TYPE3["tag"] = 8] = "tag";
    })(TYPE2 || (exports.TYPE = TYPE2 = {}));
    var SKELETON_TYPE;
    (function(SKELETON_TYPE2) {
      SKELETON_TYPE2[SKELETON_TYPE2["number"] = 0] = "number";
      SKELETON_TYPE2[SKELETON_TYPE2["dateTime"] = 1] = "dateTime";
    })(SKELETON_TYPE || (exports.SKELETON_TYPE = SKELETON_TYPE = {}));
    function isLiteralElement(el) {
      return el.type === TYPE2.literal;
    }
    __name(isLiteralElement, "isLiteralElement");
    function isArgumentElement(el) {
      return el.type === TYPE2.argument;
    }
    __name(isArgumentElement, "isArgumentElement");
    function isNumberElement(el) {
      return el.type === TYPE2.number;
    }
    __name(isNumberElement, "isNumberElement");
    function isDateElement(el) {
      return el.type === TYPE2.date;
    }
    __name(isDateElement, "isDateElement");
    function isTimeElement(el) {
      return el.type === TYPE2.time;
    }
    __name(isTimeElement, "isTimeElement");
    function isSelectElement(el) {
      return el.type === TYPE2.select;
    }
    __name(isSelectElement, "isSelectElement");
    function isPluralElement(el) {
      return el.type === TYPE2.plural;
    }
    __name(isPluralElement, "isPluralElement");
    function isPoundElement(el) {
      return el.type === TYPE2.pound;
    }
    __name(isPoundElement, "isPoundElement");
    function isTagElement(el) {
      return el.type === TYPE2.tag;
    }
    __name(isTagElement, "isTagElement");
    function isNumberSkeleton(el) {
      return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
    }
    __name(isNumberSkeleton, "isNumberSkeleton");
    function isDateTimeSkeleton(el) {
      return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
    }
    __name(isDateTimeSkeleton, "isDateTimeSkeleton");
    function createLiteralElement(value) {
      return {
        type: TYPE2.literal,
        value
      };
    }
    __name(createLiteralElement, "createLiteralElement");
    function createNumberElement(value, style) {
      return {
        type: TYPE2.number,
        value,
        style
      };
    }
    __name(createNumberElement, "createNumberElement");
  }
});

// node_modules/@formatjs/icu-messageformat-parser/regex.generated.js
var require_regex_generated = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/regex.generated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WHITE_SPACE_REGEX = exports.SPACE_SEPARATOR_REGEX = void 0;
    exports.SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
    exports.WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/date-time.js
var require_date_time = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/date-time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseDateTimeSkeleton = parseDateTimeSkeleton;
    var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
    function parseDateTimeSkeleton(skeleton) {
      var result = {};
      skeleton.replace(DATE_TIME_REGEX, function(match) {
        var len = match.length;
        switch (match[0]) {
          // Era
          case "G":
            result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
            break;
          // Year
          case "y":
            result.year = len === 2 ? "2-digit" : "numeric";
            break;
          case "Y":
          case "u":
          case "U":
          case "r":
            throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
          // Quarter
          case "q":
          case "Q":
            throw new RangeError("`q/Q` (quarter) patterns are not supported");
          // Month
          case "M":
          case "L":
            result.month = ["numeric", "2-digit", "short", "long", "narrow"][len - 1];
            break;
          // Week
          case "w":
          case "W":
            throw new RangeError("`w/W` (week) patterns are not supported");
          case "d":
            result.day = ["numeric", "2-digit"][len - 1];
            break;
          case "D":
          case "F":
          case "g":
            throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
          // Weekday
          case "E":
            result.weekday = len === 4 ? "long" : len === 5 ? "narrow" : "short";
            break;
          case "e":
            if (len < 4) {
              throw new RangeError("`e..eee` (weekday) patterns are not supported");
            }
            result.weekday = ["short", "long", "narrow", "short"][len - 4];
            break;
          case "c":
            if (len < 4) {
              throw new RangeError("`c..ccc` (weekday) patterns are not supported");
            }
            result.weekday = ["short", "long", "narrow", "short"][len - 4];
            break;
          // Period
          case "a":
            result.hour12 = true;
            break;
          case "b":
          // am, pm, noon, midnight
          case "B":
            throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
          // Hour
          case "h":
            result.hourCycle = "h12";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "H":
            result.hourCycle = "h23";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "K":
            result.hourCycle = "h11";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "k":
            result.hourCycle = "h24";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "j":
          case "J":
          case "C":
            throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
          // Minute
          case "m":
            result.minute = ["numeric", "2-digit"][len - 1];
            break;
          // Second
          case "s":
            result.second = ["numeric", "2-digit"][len - 1];
            break;
          case "S":
          case "A":
            throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
          // Zone
          case "z":
            result.timeZoneName = len < 4 ? "short" : "long";
            break;
          case "Z":
          // 1..3, 4, 5: The ISO8601 varios formats
          case "O":
          // 1, 4: milliseconds in day short, long
          case "v":
          // 1, 4: generic non-location format
          case "V":
          // 1, 2, 3, 4: time zone ID or city
          case "X":
          // 1, 2, 3, 4: The ISO8601 varios formats
          case "x":
            throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
        }
        return "";
      });
      return result;
    }
    __name(parseDateTimeSkeleton, "parseDateTimeSkeleton");
  }
});

// node_modules/@formatjs/icu-skeleton-parser/regex.generated.js
var require_regex_generated2 = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/regex.generated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WHITE_SPACE_REGEX = void 0;
    exports.WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/number.js
var require_number = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/number.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseNumberSkeletonFromString = parseNumberSkeletonFromString;
    exports.parseNumberSkeleton = parseNumberSkeleton;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var regex_generated_1 = require_regex_generated2();
    function parseNumberSkeletonFromString(skeleton) {
      if (skeleton.length === 0) {
        throw new Error("Number skeleton cannot be empty");
      }
      var stringTokens = skeleton.split(regex_generated_1.WHITE_SPACE_REGEX).filter(function(x) {
        return x.length > 0;
      });
      var tokens = [];
      for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
        var stringToken = stringTokens_1[_i];
        var stemAndOptions = stringToken.split("/");
        if (stemAndOptions.length === 0) {
          throw new Error("Invalid number skeleton");
        }
        var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
          var option = options_1[_a];
          if (option.length === 0) {
            throw new Error("Invalid number skeleton");
          }
        }
        tokens.push({ stem, options });
      }
      return tokens;
    }
    __name(parseNumberSkeletonFromString, "parseNumberSkeletonFromString");
    function icuUnitToEcma(unit) {
      return unit.replace(/^(.*?)-/, "");
    }
    __name(icuUnitToEcma, "icuUnitToEcma");
    var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
    var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
    var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
    var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
    function parseSignificantPrecision(str) {
      var result = {};
      if (str[str.length - 1] === "r") {
        result.roundingPriority = "morePrecision";
      } else if (str[str.length - 1] === "s") {
        result.roundingPriority = "lessPrecision";
      }
      str.replace(SIGNIFICANT_PRECISION_REGEX, function(_, g1, g2) {
        if (typeof g2 !== "string") {
          result.minimumSignificantDigits = g1.length;
          result.maximumSignificantDigits = g1.length;
        } else if (g2 === "+") {
          result.minimumSignificantDigits = g1.length;
        } else if (g1[0] === "#") {
          result.maximumSignificantDigits = g1.length;
        } else {
          result.minimumSignificantDigits = g1.length;
          result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
        }
        return "";
      });
      return result;
    }
    __name(parseSignificantPrecision, "parseSignificantPrecision");
    function parseSign(str) {
      switch (str) {
        case "sign-auto":
          return {
            signDisplay: "auto"
          };
        case "sign-accounting":
        case "()":
          return {
            currencySign: "accounting"
          };
        case "sign-always":
        case "+!":
          return {
            signDisplay: "always"
          };
        case "sign-accounting-always":
        case "()!":
          return {
            signDisplay: "always",
            currencySign: "accounting"
          };
        case "sign-except-zero":
        case "+?":
          return {
            signDisplay: "exceptZero"
          };
        case "sign-accounting-except-zero":
        case "()?":
          return {
            signDisplay: "exceptZero",
            currencySign: "accounting"
          };
        case "sign-never":
        case "+_":
          return {
            signDisplay: "never"
          };
      }
    }
    __name(parseSign, "parseSign");
    function parseConciseScientificAndEngineeringStem(stem) {
      var result;
      if (stem[0] === "E" && stem[1] === "E") {
        result = {
          notation: "engineering"
        };
        stem = stem.slice(2);
      } else if (stem[0] === "E") {
        result = {
          notation: "scientific"
        };
        stem = stem.slice(1);
      }
      if (result) {
        var signDisplay = stem.slice(0, 2);
        if (signDisplay === "+!") {
          result.signDisplay = "always";
          stem = stem.slice(2);
        } else if (signDisplay === "+?") {
          result.signDisplay = "exceptZero";
          stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
          throw new Error("Malformed concise eng/scientific notation");
        }
        result.minimumIntegerDigits = stem.length;
      }
      return result;
    }
    __name(parseConciseScientificAndEngineeringStem, "parseConciseScientificAndEngineeringStem");
    function parseNotationOptions(opt) {
      var result = {};
      var signOpts = parseSign(opt);
      if (signOpts) {
        return signOpts;
      }
      return result;
    }
    __name(parseNotationOptions, "parseNotationOptions");
    function parseNumberSkeleton(tokens) {
      var result = {};
      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
          case "percent":
          case "%":
            result.style = "percent";
            continue;
          case "%x100":
            result.style = "percent";
            result.scale = 100;
            continue;
          case "currency":
            result.style = "currency";
            result.currency = token.options[0];
            continue;
          case "group-off":
          case ",_":
            result.useGrouping = false;
            continue;
          case "precision-integer":
          case ".":
            result.maximumFractionDigits = 0;
            continue;
          case "measure-unit":
          case "unit":
            result.style = "unit";
            result.unit = icuUnitToEcma(token.options[0]);
            continue;
          case "compact-short":
          case "K":
            result.notation = "compact";
            result.compactDisplay = "short";
            continue;
          case "compact-long":
          case "KK":
            result.notation = "compact";
            result.compactDisplay = "long";
            continue;
          case "scientific":
            result = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, result), { notation: "scientific" }), token.options.reduce(function(all, opt2) {
              return tslib_1.__assign(tslib_1.__assign({}, all), parseNotationOptions(opt2));
            }, {}));
            continue;
          case "engineering":
            result = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, result), { notation: "engineering" }), token.options.reduce(function(all, opt2) {
              return tslib_1.__assign(tslib_1.__assign({}, all), parseNotationOptions(opt2));
            }, {}));
            continue;
          case "notation-simple":
            result.notation = "standard";
            continue;
          // https://github.com/unicode-org/icu/blob/master/icu4c/source/i18n/unicode/unumberformatter.h
          case "unit-width-narrow":
            result.currencyDisplay = "narrowSymbol";
            result.unitDisplay = "narrow";
            continue;
          case "unit-width-short":
            result.currencyDisplay = "code";
            result.unitDisplay = "short";
            continue;
          case "unit-width-full-name":
            result.currencyDisplay = "name";
            result.unitDisplay = "long";
            continue;
          case "unit-width-iso-code":
            result.currencyDisplay = "symbol";
            continue;
          case "scale":
            result.scale = parseFloat(token.options[0]);
            continue;
          case "rounding-mode-floor":
            result.roundingMode = "floor";
            continue;
          case "rounding-mode-ceiling":
            result.roundingMode = "ceil";
            continue;
          case "rounding-mode-down":
            result.roundingMode = "trunc";
            continue;
          case "rounding-mode-up":
            result.roundingMode = "expand";
            continue;
          case "rounding-mode-half-even":
            result.roundingMode = "halfEven";
            continue;
          case "rounding-mode-half-down":
            result.roundingMode = "halfTrunc";
            continue;
          case "rounding-mode-half-up":
            result.roundingMode = "halfExpand";
            continue;
          // https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html#integer-width
          case "integer-width":
            if (token.options.length > 1) {
              throw new RangeError("integer-width stems only accept a single optional option");
            }
            token.options[0].replace(INTEGER_WIDTH_REGEX, function(_, g1, g2, g3, g4, g5) {
              if (g1) {
                result.minimumIntegerDigits = g2.length;
              } else if (g3 && g4) {
                throw new Error("We currently do not support maximum integer digits");
              } else if (g5) {
                throw new Error("We currently do not support exact integer digits");
              }
              return "";
            });
            continue;
        }
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
          result.minimumIntegerDigits = token.stem.length;
          continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
          if (token.options.length > 1) {
            throw new RangeError("Fraction-precision stems only accept a single optional option");
          }
          token.stem.replace(FRACTION_PRECISION_REGEX, function(_, g1, g2, g3, g4, g5) {
            if (g2 === "*") {
              result.minimumFractionDigits = g1.length;
            } else if (g3 && g3[0] === "#") {
              result.maximumFractionDigits = g3.length;
            } else if (g4 && g5) {
              result.minimumFractionDigits = g4.length;
              result.maximumFractionDigits = g4.length + g5.length;
            } else {
              result.minimumFractionDigits = g1.length;
              result.maximumFractionDigits = g1.length;
            }
            return "";
          });
          var opt = token.options[0];
          if (opt === "w") {
            result = tslib_1.__assign(tslib_1.__assign({}, result), { trailingZeroDisplay: "stripIfInteger" });
          } else if (opt) {
            result = tslib_1.__assign(tslib_1.__assign({}, result), parseSignificantPrecision(opt));
          }
          continue;
        }
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
          result = tslib_1.__assign(tslib_1.__assign({}, result), parseSignificantPrecision(token.stem));
          continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
          result = tslib_1.__assign(tslib_1.__assign({}, result), signOpts);
        }
        var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
          result = tslib_1.__assign(tslib_1.__assign({}, result), conciseScientificAndEngineeringOpts);
        }
      }
      return result;
    }
    __name(parseNumberSkeleton, "parseNumberSkeleton");
  }
});

// node_modules/@formatjs/icu-skeleton-parser/index.js
var require_icu_skeleton_parser = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_date_time(), exports);
    tslib_1.__exportStar(require_number(), exports);
  }
});

// node_modules/@formatjs/icu-messageformat-parser/time-data.generated.js
var require_time_data_generated = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/time-data.generated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timeData = void 0;
    exports.timeData = {
      "001": [
        "H",
        "h"
      ],
      "419": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "AC": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "AD": [
        "H",
        "hB"
      ],
      "AE": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "AF": [
        "H",
        "hb",
        "hB",
        "h"
      ],
      "AG": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "AI": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "AL": [
        "h",
        "H",
        "hB"
      ],
      "AM": [
        "H",
        "hB"
      ],
      "AO": [
        "H",
        "hB"
      ],
      "AR": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "AS": [
        "h",
        "H"
      ],
      "AT": [
        "H",
        "hB"
      ],
      "AU": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "AW": [
        "H",
        "hB"
      ],
      "AX": [
        "H"
      ],
      "AZ": [
        "H",
        "hB",
        "h"
      ],
      "BA": [
        "H",
        "hB",
        "h"
      ],
      "BB": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "BD": [
        "h",
        "hB",
        "H"
      ],
      "BE": [
        "H",
        "hB"
      ],
      "BF": [
        "H",
        "hB"
      ],
      "BG": [
        "H",
        "hB",
        "h"
      ],
      "BH": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "BI": [
        "H",
        "h"
      ],
      "BJ": [
        "H",
        "hB"
      ],
      "BL": [
        "H",
        "hB"
      ],
      "BM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "BN": [
        "hb",
        "hB",
        "h",
        "H"
      ],
      "BO": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "BQ": [
        "H"
      ],
      "BR": [
        "H",
        "hB"
      ],
      "BS": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "BT": [
        "h",
        "H"
      ],
      "BW": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "BY": [
        "H",
        "h"
      ],
      "BZ": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "CA": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "CC": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "CD": [
        "hB",
        "H"
      ],
      "CF": [
        "H",
        "h",
        "hB"
      ],
      "CG": [
        "H",
        "hB"
      ],
      "CH": [
        "H",
        "hB",
        "h"
      ],
      "CI": [
        "H",
        "hB"
      ],
      "CK": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "CL": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "CM": [
        "H",
        "h",
        "hB"
      ],
      "CN": [
        "H",
        "hB",
        "hb",
        "h"
      ],
      "CO": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "CP": [
        "H"
      ],
      "CR": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "CU": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "CV": [
        "H",
        "hB"
      ],
      "CW": [
        "H",
        "hB"
      ],
      "CX": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "CY": [
        "h",
        "H",
        "hb",
        "hB"
      ],
      "CZ": [
        "H"
      ],
      "DE": [
        "H",
        "hB"
      ],
      "DG": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "DJ": [
        "h",
        "H"
      ],
      "DK": [
        "H"
      ],
      "DM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "DO": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "DZ": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "EA": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "EC": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "EE": [
        "H",
        "hB"
      ],
      "EG": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "EH": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "ER": [
        "h",
        "H"
      ],
      "ES": [
        "H",
        "hB",
        "h",
        "hb"
      ],
      "ET": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "FI": [
        "H"
      ],
      "FJ": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "FK": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "FM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "FO": [
        "H",
        "h"
      ],
      "FR": [
        "H",
        "hB"
      ],
      "GA": [
        "H",
        "hB"
      ],
      "GB": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "GD": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "GE": [
        "H",
        "hB",
        "h"
      ],
      "GF": [
        "H",
        "hB"
      ],
      "GG": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "GH": [
        "h",
        "H"
      ],
      "GI": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "GL": [
        "H",
        "h"
      ],
      "GM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "GN": [
        "H",
        "hB"
      ],
      "GP": [
        "H",
        "hB"
      ],
      "GQ": [
        "H",
        "hB",
        "h",
        "hb"
      ],
      "GR": [
        "h",
        "H",
        "hb",
        "hB"
      ],
      "GT": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "GU": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "GW": [
        "H",
        "hB"
      ],
      "GY": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "HK": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "HN": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "HR": [
        "H",
        "hB"
      ],
      "HU": [
        "H",
        "h"
      ],
      "IC": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "ID": [
        "H"
      ],
      "IE": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "IL": [
        "H",
        "hB"
      ],
      "IM": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "IN": [
        "h",
        "H"
      ],
      "IO": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "IQ": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "IR": [
        "hB",
        "H"
      ],
      "IS": [
        "H"
      ],
      "IT": [
        "H",
        "hB"
      ],
      "JE": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "JM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "JO": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "JP": [
        "H",
        "K",
        "h"
      ],
      "KE": [
        "hB",
        "hb",
        "H",
        "h"
      ],
      "KG": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "KH": [
        "hB",
        "h",
        "H",
        "hb"
      ],
      "KI": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "KM": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "KN": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "KP": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "KR": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "KW": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "KY": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "KZ": [
        "H",
        "hB"
      ],
      "LA": [
        "H",
        "hb",
        "hB",
        "h"
      ],
      "LB": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "LC": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "LI": [
        "H",
        "hB",
        "h"
      ],
      "LK": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "LR": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "LS": [
        "h",
        "H"
      ],
      "LT": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "LU": [
        "H",
        "h",
        "hB"
      ],
      "LV": [
        "H",
        "hB",
        "hb",
        "h"
      ],
      "LY": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "MA": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "MC": [
        "H",
        "hB"
      ],
      "MD": [
        "H",
        "hB"
      ],
      "ME": [
        "H",
        "hB",
        "h"
      ],
      "MF": [
        "H",
        "hB"
      ],
      "MG": [
        "H",
        "h"
      ],
      "MH": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "MK": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "ML": [
        "H"
      ],
      "MM": [
        "hB",
        "hb",
        "H",
        "h"
      ],
      "MN": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "MO": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "MP": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "MQ": [
        "H",
        "hB"
      ],
      "MR": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "MS": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "MT": [
        "H",
        "h"
      ],
      "MU": [
        "H",
        "h"
      ],
      "MV": [
        "H",
        "h"
      ],
      "MW": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "MX": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "MY": [
        "hb",
        "hB",
        "h",
        "H"
      ],
      "MZ": [
        "H",
        "hB"
      ],
      "NA": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "NC": [
        "H",
        "hB"
      ],
      "NE": [
        "H"
      ],
      "NF": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "NG": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "NI": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "NL": [
        "H",
        "hB"
      ],
      "NO": [
        "H",
        "h"
      ],
      "NP": [
        "H",
        "h",
        "hB"
      ],
      "NR": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "NU": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "NZ": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "OM": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "PA": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "PE": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "PF": [
        "H",
        "h",
        "hB"
      ],
      "PG": [
        "h",
        "H"
      ],
      "PH": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "PK": [
        "h",
        "hB",
        "H"
      ],
      "PL": [
        "H",
        "h"
      ],
      "PM": [
        "H",
        "hB"
      ],
      "PN": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "PR": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "PS": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "PT": [
        "H",
        "hB"
      ],
      "PW": [
        "h",
        "H"
      ],
      "PY": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "QA": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "RE": [
        "H",
        "hB"
      ],
      "RO": [
        "H",
        "hB"
      ],
      "RS": [
        "H",
        "hB",
        "h"
      ],
      "RU": [
        "H"
      ],
      "RW": [
        "H",
        "h"
      ],
      "SA": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "SB": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "SC": [
        "H",
        "h",
        "hB"
      ],
      "SD": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "SE": [
        "H"
      ],
      "SG": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "SH": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "SI": [
        "H",
        "hB"
      ],
      "SJ": [
        "H"
      ],
      "SK": [
        "H"
      ],
      "SL": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "SM": [
        "H",
        "h",
        "hB"
      ],
      "SN": [
        "H",
        "h",
        "hB"
      ],
      "SO": [
        "h",
        "H"
      ],
      "SR": [
        "H",
        "hB"
      ],
      "SS": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "ST": [
        "H",
        "hB"
      ],
      "SV": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "SX": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "SY": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "SZ": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "TA": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "TC": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "TD": [
        "h",
        "H",
        "hB"
      ],
      "TF": [
        "H",
        "h",
        "hB"
      ],
      "TG": [
        "H",
        "hB"
      ],
      "TH": [
        "H",
        "h"
      ],
      "TJ": [
        "H",
        "h"
      ],
      "TL": [
        "H",
        "hB",
        "hb",
        "h"
      ],
      "TM": [
        "H",
        "h"
      ],
      "TN": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "TO": [
        "h",
        "H"
      ],
      "TR": [
        "H",
        "hB"
      ],
      "TT": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "TW": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "TZ": [
        "hB",
        "hb",
        "H",
        "h"
      ],
      "UA": [
        "H",
        "hB",
        "h"
      ],
      "UG": [
        "hB",
        "hb",
        "H",
        "h"
      ],
      "UM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "US": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "UY": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "UZ": [
        "H",
        "hB",
        "h"
      ],
      "VA": [
        "H",
        "h",
        "hB"
      ],
      "VC": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "VE": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "VG": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "VI": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "VN": [
        "H",
        "h"
      ],
      "VU": [
        "h",
        "H"
      ],
      "WF": [
        "H",
        "hB"
      ],
      "WS": [
        "h",
        "H"
      ],
      "XK": [
        "H",
        "hB",
        "h"
      ],
      "YE": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "YT": [
        "H",
        "hB"
      ],
      "ZA": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "ZM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "ZW": [
        "H",
        "h"
      ],
      "af-ZA": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "ar-001": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "ca-ES": [
        "H",
        "h",
        "hB"
      ],
      "en-001": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "en-HK": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "en-IL": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "en-MY": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "es-BR": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "es-ES": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "es-GQ": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "fr-CA": [
        "H",
        "h",
        "hB"
      ],
      "gl-ES": [
        "H",
        "h",
        "hB"
      ],
      "gu-IN": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "hi-IN": [
        "hB",
        "h",
        "H"
      ],
      "it-CH": [
        "H",
        "h",
        "hB"
      ],
      "it-IT": [
        "H",
        "h",
        "hB"
      ],
      "kn-IN": [
        "hB",
        "h",
        "H"
      ],
      "ml-IN": [
        "hB",
        "h",
        "H"
      ],
      "mr-IN": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "pa-IN": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "ta-IN": [
        "hB",
        "h",
        "hb",
        "H"
      ],
      "te-IN": [
        "hB",
        "h",
        "H"
      ],
      "zu-ZA": [
        "H",
        "hB",
        "hb",
        "h"
      ]
    };
  }
});

// node_modules/@formatjs/icu-messageformat-parser/date-time-pattern-generator.js
var require_date_time_pattern_generator = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/date-time-pattern-generator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBestPattern = getBestPattern;
    var time_data_generated_1 = require_time_data_generated();
    function getBestPattern(skeleton, locale) {
      var skeletonCopy = "";
      for (var patternPos = 0; patternPos < skeleton.length; patternPos++) {
        var patternChar = skeleton.charAt(patternPos);
        if (patternChar === "j") {
          var extraLength = 0;
          while (patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar) {
            extraLength++;
            patternPos++;
          }
          var hourLen = 1 + (extraLength & 1);
          var dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
          var dayPeriodChar = "a";
          var hourChar = getDefaultHourSymbolFromLocale(locale);
          if (hourChar == "H" || hourChar == "k") {
            dayPeriodLen = 0;
          }
          while (dayPeriodLen-- > 0) {
            skeletonCopy += dayPeriodChar;
          }
          while (hourLen-- > 0) {
            skeletonCopy = hourChar + skeletonCopy;
          }
        } else if (patternChar === "J") {
          skeletonCopy += "H";
        } else {
          skeletonCopy += patternChar;
        }
      }
      return skeletonCopy;
    }
    __name(getBestPattern, "getBestPattern");
    function getDefaultHourSymbolFromLocale(locale) {
      var hourCycle = locale.hourCycle;
      if (hourCycle === void 0 && // @ts-ignore hourCycle(s) is not identified yet
      locale.hourCycles && // @ts-ignore
      locale.hourCycles.length) {
        hourCycle = locale.hourCycles[0];
      }
      if (hourCycle) {
        switch (hourCycle) {
          case "h24":
            return "k";
          case "h23":
            return "H";
          case "h12":
            return "h";
          case "h11":
            return "K";
          default:
            throw new Error("Invalid hourCycle");
        }
      }
      var languageTag = locale.language;
      var regionTag;
      if (languageTag !== "root") {
        regionTag = locale.maximize().region;
      }
      var hourCycles = time_data_generated_1.timeData[regionTag || ""] || time_data_generated_1.timeData[languageTag || ""] || time_data_generated_1.timeData["".concat(languageTag, "-001")] || time_data_generated_1.timeData["001"];
      return hourCycles[0];
    }
    __name(getDefaultHourSymbolFromLocale, "getDefaultHourSymbolFromLocale");
  }
});

// node_modules/@formatjs/icu-messageformat-parser/parser.js
var require_parser = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/parser.js"(exports) {
    "use strict";
    var _a;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var error_1 = require_error();
    var types_1 = require_types();
    var regex_generated_1 = require_regex_generated();
    var icu_skeleton_parser_1 = require_icu_skeleton_parser();
    var date_time_pattern_generator_1 = require_date_time_pattern_generator();
    var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(regex_generated_1.SPACE_SEPARATOR_REGEX.source, "*"));
    var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(regex_generated_1.SPACE_SEPARATOR_REGEX.source, "*$"));
    function createLocation(start, end) {
      return { start, end };
    }
    __name(createLocation, "createLocation");
    var hasNativeStartsWith = !!String.prototype.startsWith && "_a".startsWith("a", 1);
    var hasNativeFromCodePoint = !!String.fromCodePoint;
    var hasNativeFromEntries = !!Object.fromEntries;
    var hasNativeCodePointAt = !!String.prototype.codePointAt;
    var hasTrimStart = !!String.prototype.trimStart;
    var hasTrimEnd = !!String.prototype.trimEnd;
    var hasNativeIsSafeInteger = !!Number.isSafeInteger;
    var isSafeInteger = hasNativeIsSafeInteger ? Number.isSafeInteger : function(n) {
      return typeof n === "number" && isFinite(n) && Math.floor(n) === n && Math.abs(n) <= 9007199254740991;
    };
    var REGEX_SUPPORTS_U_AND_Y = true;
    try {
      re = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
      REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec("a")) === null || _a === void 0 ? void 0 : _a[0]) === "a";
    } catch (_) {
      REGEX_SUPPORTS_U_AND_Y = false;
    }
    var re;
    var startsWith = hasNativeStartsWith ? (
      // Native
      /* @__PURE__ */ __name(function startsWith2(s, search, position) {
        return s.startsWith(search, position);
      }, "startsWith")
    ) : (
      // For IE11
      /* @__PURE__ */ __name(function startsWith2(s, search, position) {
        return s.slice(position, position + search.length) === search;
      }, "startsWith")
    );
    var fromCodePoint = hasNativeFromCodePoint ? String.fromCodePoint : (
      // IE11
      /* @__PURE__ */ __name(function fromCodePoint2() {
        var codePoints = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          codePoints[_i] = arguments[_i];
        }
        var elements = "";
        var length = codePoints.length;
        var i = 0;
        var code;
        while (length > i) {
          code = codePoints[i++];
          if (code > 1114111)
            throw RangeError(code + " is not a valid code point");
          elements += code < 65536 ? String.fromCharCode(code) : String.fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
        }
        return elements;
      }, "fromCodePoint")
    );
    var fromEntries = (
      // native
      hasNativeFromEntries ? Object.fromEntries : (
        // Ponyfill
        /* @__PURE__ */ __name(function fromEntries2(entries) {
          var obj = {};
          for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var _a2 = entries_1[_i], k = _a2[0], v = _a2[1];
            obj[k] = v;
          }
          return obj;
        }, "fromEntries")
      )
    );
    var codePointAt = hasNativeCodePointAt ? (
      // Native
      /* @__PURE__ */ __name(function codePointAt2(s, index) {
        return s.codePointAt(index);
      }, "codePointAt")
    ) : (
      // IE 11
      /* @__PURE__ */ __name(function codePointAt2(s, index) {
        var size = s.length;
        if (index < 0 || index >= size) {
          return void 0;
        }
        var first = s.charCodeAt(index);
        var second;
        return first < 55296 || first > 56319 || index + 1 === size || (second = s.charCodeAt(index + 1)) < 56320 || second > 57343 ? first : (first - 55296 << 10) + (second - 56320) + 65536;
      }, "codePointAt")
    );
    var trimStart = hasTrimStart ? (
      // Native
      /* @__PURE__ */ __name(function trimStart2(s) {
        return s.trimStart();
      }, "trimStart")
    ) : (
      // Ponyfill
      /* @__PURE__ */ __name(function trimStart2(s) {
        return s.replace(SPACE_SEPARATOR_START_REGEX, "");
      }, "trimStart")
    );
    var trimEnd = hasTrimEnd ? (
      // Native
      /* @__PURE__ */ __name(function trimEnd2(s) {
        return s.trimEnd();
      }, "trimEnd")
    ) : (
      // Ponyfill
      /* @__PURE__ */ __name(function trimEnd2(s) {
        return s.replace(SPACE_SEPARATOR_END_REGEX, "");
      }, "trimEnd")
    );
    function RE(s, flag) {
      return new RegExp(s, flag);
    }
    __name(RE, "RE");
    var matchIdentifierAtIndex;
    if (REGEX_SUPPORTS_U_AND_Y) {
      IDENTIFIER_PREFIX_RE_1 = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
      matchIdentifierAtIndex = /* @__PURE__ */ __name(function matchIdentifierAtIndex2(s, index) {
        var _a2;
        IDENTIFIER_PREFIX_RE_1.lastIndex = index;
        var match = IDENTIFIER_PREFIX_RE_1.exec(s);
        return (_a2 = match[1]) !== null && _a2 !== void 0 ? _a2 : "";
      }, "matchIdentifierAtIndex");
    } else {
      matchIdentifierAtIndex = /* @__PURE__ */ __name(function matchIdentifierAtIndex2(s, index) {
        var match = [];
        while (true) {
          var c = codePointAt(s, index);
          if (c === void 0 || _isWhiteSpace(c) || _isPatternSyntax(c)) {
            break;
          }
          match.push(c);
          index += c >= 65536 ? 2 : 1;
        }
        return fromCodePoint.apply(void 0, match);
      }, "matchIdentifierAtIndex");
    }
    var IDENTIFIER_PREFIX_RE_1;
    var Parser = (
      /** @class */
      (function() {
        function Parser2(message, options) {
          if (options === void 0) {
            options = {};
          }
          this.message = message;
          this.position = { offset: 0, line: 1, column: 1 };
          this.ignoreTag = !!options.ignoreTag;
          this.locale = options.locale;
          this.requiresOtherClause = !!options.requiresOtherClause;
          this.shouldParseSkeletons = !!options.shouldParseSkeletons;
        }
        __name(Parser2, "Parser");
        Parser2.prototype.parse = function() {
          if (this.offset() !== 0) {
            throw Error("parser can only be used once");
          }
          return this.parseMessage(0, "", false);
        };
        Parser2.prototype.parseMessage = function(nestingLevel, parentArgType, expectingCloseTag) {
          var elements = [];
          while (!this.isEOF()) {
            var char = this.char();
            if (char === 123) {
              var result = this.parseArgument(nestingLevel, expectingCloseTag);
              if (result.err) {
                return result;
              }
              elements.push(result.val);
            } else if (char === 125 && nestingLevel > 0) {
              break;
            } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
              var position = this.clonePosition();
              this.bump();
              elements.push({
                type: types_1.TYPE.pound,
                location: createLocation(position, this.clonePosition())
              });
            } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
              if (expectingCloseTag) {
                break;
              } else {
                return this.error(error_1.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
              }
            } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
              var result = this.parseTag(nestingLevel, parentArgType);
              if (result.err) {
                return result;
              }
              elements.push(result.val);
            } else {
              var result = this.parseLiteral(nestingLevel, parentArgType);
              if (result.err) {
                return result;
              }
              elements.push(result.val);
            }
          }
          return { val: elements, err: null };
        };
        Parser2.prototype.parseTag = function(nestingLevel, parentArgType) {
          var startPosition = this.clonePosition();
          this.bump();
          var tagName = this.parseTagName();
          this.bumpSpace();
          if (this.bumpIf("/>")) {
            return {
              val: {
                type: types_1.TYPE.literal,
                value: "<".concat(tagName, "/>"),
                location: createLocation(startPosition, this.clonePosition())
              },
              err: null
            };
          } else if (this.bumpIf(">")) {
            var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
            if (childrenResult.err) {
              return childrenResult;
            }
            var children = childrenResult.val;
            var endTagStartPosition = this.clonePosition();
            if (this.bumpIf("</")) {
              if (this.isEOF() || !_isAlpha(this.char())) {
                return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
              }
              var closingTagNameStartPosition = this.clonePosition();
              var closingTagName = this.parseTagName();
              if (tagName !== closingTagName) {
                return this.error(error_1.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
              }
              this.bumpSpace();
              if (!this.bumpIf(">")) {
                return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
              }
              return {
                val: {
                  type: types_1.TYPE.tag,
                  value: tagName,
                  children,
                  location: createLocation(startPosition, this.clonePosition())
                },
                err: null
              };
            } else {
              return this.error(error_1.ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
            }
          } else {
            return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
          }
        };
        Parser2.prototype.parseTagName = function() {
          var startOffset = this.offset();
          this.bump();
          while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
            this.bump();
          }
          return this.message.slice(startOffset, this.offset());
        };
        Parser2.prototype.parseLiteral = function(nestingLevel, parentArgType) {
          var start = this.clonePosition();
          var value = "";
          while (true) {
            var parseQuoteResult = this.tryParseQuote(parentArgType);
            if (parseQuoteResult) {
              value += parseQuoteResult;
              continue;
            }
            var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
            if (parseUnquotedResult) {
              value += parseUnquotedResult;
              continue;
            }
            var parseLeftAngleResult = this.tryParseLeftAngleBracket();
            if (parseLeftAngleResult) {
              value += parseLeftAngleResult;
              continue;
            }
            break;
          }
          var location = createLocation(start, this.clonePosition());
          return {
            val: { type: types_1.TYPE.literal, value, location },
            err: null
          };
        };
        Parser2.prototype.tryParseLeftAngleBracket = function() {
          if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
          !_isAlphaOrSlash(this.peek() || 0))) {
            this.bump();
            return "<";
          }
          return null;
        };
        Parser2.prototype.tryParseQuote = function(parentArgType) {
          if (this.isEOF() || this.char() !== 39) {
            return null;
          }
          switch (this.peek()) {
            case 39:
              this.bump();
              this.bump();
              return "'";
            // '{', '<', '>', '}'
            case 123:
            case 60:
            case 62:
            case 125:
              break;
            case 35:
              if (parentArgType === "plural" || parentArgType === "selectordinal") {
                break;
              }
              return null;
            default:
              return null;
          }
          this.bump();
          var codePoints = [this.char()];
          this.bump();
          while (!this.isEOF()) {
            var ch = this.char();
            if (ch === 39) {
              if (this.peek() === 39) {
                codePoints.push(39);
                this.bump();
              } else {
                this.bump();
                break;
              }
            } else {
              codePoints.push(ch);
            }
            this.bump();
          }
          return fromCodePoint.apply(void 0, codePoints);
        };
        Parser2.prototype.tryParseUnquoted = function(nestingLevel, parentArgType) {
          if (this.isEOF()) {
            return null;
          }
          var ch = this.char();
          if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
            return null;
          } else {
            this.bump();
            return fromCodePoint(ch);
          }
        };
        Parser2.prototype.parseArgument = function(nestingLevel, expectingCloseTag) {
          var openingBracePosition = this.clonePosition();
          this.bump();
          this.bumpSpace();
          if (this.isEOF()) {
            return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
          }
          if (this.char() === 125) {
            this.bump();
            return this.error(error_1.ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
          }
          var value = this.parseIdentifierIfPossible().value;
          if (!value) {
            return this.error(error_1.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
          }
          this.bumpSpace();
          if (this.isEOF()) {
            return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
          }
          switch (this.char()) {
            // Simple argument: `{name}`
            case 125: {
              this.bump();
              return {
                val: {
                  type: types_1.TYPE.argument,
                  // value does not include the opening and closing braces.
                  value,
                  location: createLocation(openingBracePosition, this.clonePosition())
                },
                err: null
              };
            }
            // Argument with options: `{name, format, ...}`
            case 44: {
              this.bump();
              this.bumpSpace();
              if (this.isEOF()) {
                return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
              }
              return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
            }
            default:
              return this.error(error_1.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
          }
        };
        Parser2.prototype.parseIdentifierIfPossible = function() {
          var startingPosition = this.clonePosition();
          var startOffset = this.offset();
          var value = matchIdentifierAtIndex(this.message, startOffset);
          var endOffset = startOffset + value.length;
          this.bumpTo(endOffset);
          var endPosition = this.clonePosition();
          var location = createLocation(startingPosition, endPosition);
          return { value, location };
        };
        Parser2.prototype.parseArgumentOptions = function(nestingLevel, expectingCloseTag, value, openingBracePosition) {
          var _a2;
          var typeStartPosition = this.clonePosition();
          var argType = this.parseIdentifierIfPossible().value;
          var typeEndPosition = this.clonePosition();
          switch (argType) {
            case "":
              return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
            case "number":
            case "date":
            case "time": {
              this.bumpSpace();
              var styleAndLocation = null;
              if (this.bumpIf(",")) {
                this.bumpSpace();
                var styleStartPosition = this.clonePosition();
                var result = this.parseSimpleArgStyleIfPossible();
                if (result.err) {
                  return result;
                }
                var style = trimEnd(result.val);
                if (style.length === 0) {
                  return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
                }
                var styleLocation = createLocation(styleStartPosition, this.clonePosition());
                styleAndLocation = { style, styleLocation };
              }
              var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
              if (argCloseResult.err) {
                return argCloseResult;
              }
              var location_1 = createLocation(openingBracePosition, this.clonePosition());
              if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, "::", 0)) {
                var skeleton = trimStart(styleAndLocation.style.slice(2));
                if (argType === "number") {
                  var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                  if (result.err) {
                    return result;
                  }
                  return {
                    val: { type: types_1.TYPE.number, value, location: location_1, style: result.val },
                    err: null
                  };
                } else {
                  if (skeleton.length === 0) {
                    return this.error(error_1.ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                  }
                  var dateTimePattern = skeleton;
                  if (this.locale) {
                    dateTimePattern = (0, date_time_pattern_generator_1.getBestPattern)(skeleton, this.locale);
                  }
                  var style = {
                    type: types_1.SKELETON_TYPE.dateTime,
                    pattern: dateTimePattern,
                    location: styleAndLocation.styleLocation,
                    parsedOptions: this.shouldParseSkeletons ? (0, icu_skeleton_parser_1.parseDateTimeSkeleton)(dateTimePattern) : {}
                  };
                  var type = argType === "date" ? types_1.TYPE.date : types_1.TYPE.time;
                  return {
                    val: { type, value, location: location_1, style },
                    err: null
                  };
                }
              }
              return {
                val: {
                  type: argType === "number" ? types_1.TYPE.number : argType === "date" ? types_1.TYPE.date : types_1.TYPE.time,
                  value,
                  location: location_1,
                  style: (_a2 = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a2 !== void 0 ? _a2 : null
                },
                err: null
              };
            }
            case "plural":
            case "selectordinal":
            case "select": {
              var typeEndPosition_1 = this.clonePosition();
              this.bumpSpace();
              if (!this.bumpIf(",")) {
                return this.error(error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, tslib_1.__assign({}, typeEndPosition_1)));
              }
              this.bumpSpace();
              var identifierAndLocation = this.parseIdentifierIfPossible();
              var pluralOffset = 0;
              if (argType !== "select" && identifierAndLocation.value === "offset") {
                if (!this.bumpIf(":")) {
                  return this.error(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
                }
                this.bumpSpace();
                var result = this.tryParseDecimalInteger(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, error_1.ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                if (result.err) {
                  return result;
                }
                this.bumpSpace();
                identifierAndLocation = this.parseIdentifierIfPossible();
                pluralOffset = result.val;
              }
              var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
              if (optionsResult.err) {
                return optionsResult;
              }
              var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
              if (argCloseResult.err) {
                return argCloseResult;
              }
              var location_2 = createLocation(openingBracePosition, this.clonePosition());
              if (argType === "select") {
                return {
                  val: {
                    type: types_1.TYPE.select,
                    value,
                    options: fromEntries(optionsResult.val),
                    location: location_2
                  },
                  err: null
                };
              } else {
                return {
                  val: {
                    type: types_1.TYPE.plural,
                    value,
                    options: fromEntries(optionsResult.val),
                    offset: pluralOffset,
                    pluralType: argType === "plural" ? "cardinal" : "ordinal",
                    location: location_2
                  },
                  err: null
                };
              }
            }
            default:
              return this.error(error_1.ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
          }
        };
        Parser2.prototype.tryParseArgumentClose = function(openingBracePosition) {
          if (this.isEOF() || this.char() !== 125) {
            return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
          }
          this.bump();
          return { val: true, err: null };
        };
        Parser2.prototype.parseSimpleArgStyleIfPossible = function() {
          var nestedBraces = 0;
          var startPosition = this.clonePosition();
          while (!this.isEOF()) {
            var ch = this.char();
            switch (ch) {
              case 39: {
                this.bump();
                var apostrophePosition = this.clonePosition();
                if (!this.bumpUntil("'")) {
                  return this.error(error_1.ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
                }
                this.bump();
                break;
              }
              case 123: {
                nestedBraces += 1;
                this.bump();
                break;
              }
              case 125: {
                if (nestedBraces > 0) {
                  nestedBraces -= 1;
                } else {
                  return {
                    val: this.message.slice(startPosition.offset, this.offset()),
                    err: null
                  };
                }
                break;
              }
              default:
                this.bump();
                break;
            }
          }
          return {
            val: this.message.slice(startPosition.offset, this.offset()),
            err: null
          };
        };
        Parser2.prototype.parseNumberSkeletonFromString = function(skeleton, location) {
          var tokens = [];
          try {
            tokens = (0, icu_skeleton_parser_1.parseNumberSkeletonFromString)(skeleton);
          } catch (e) {
            return this.error(error_1.ErrorKind.INVALID_NUMBER_SKELETON, location);
          }
          return {
            val: {
              type: types_1.SKELETON_TYPE.number,
              tokens,
              location,
              parsedOptions: this.shouldParseSkeletons ? (0, icu_skeleton_parser_1.parseNumberSkeleton)(tokens) : {}
            },
            err: null
          };
        };
        Parser2.prototype.tryParsePluralOrSelectOptions = function(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
          var _a2;
          var hasOtherClause = false;
          var options = [];
          var parsedSelectors = /* @__PURE__ */ new Set();
          var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
          while (true) {
            if (selector.length === 0) {
              var startPosition = this.clonePosition();
              if (parentArgType !== "select" && this.bumpIf("=")) {
                var result = this.tryParseDecimalInteger(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, error_1.ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
                if (result.err) {
                  return result;
                }
                selectorLocation = createLocation(startPosition, this.clonePosition());
                selector = this.message.slice(startPosition.offset, this.offset());
              } else {
                break;
              }
            }
            if (parsedSelectors.has(selector)) {
              return this.error(parentArgType === "select" ? error_1.ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : error_1.ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
            }
            if (selector === "other") {
              hasOtherClause = true;
            }
            this.bumpSpace();
            var openingBracePosition = this.clonePosition();
            if (!this.bumpIf("{")) {
              return this.error(parentArgType === "select" ? error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
            }
            var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
            if (fragmentResult.err) {
              return fragmentResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
              return argCloseResult;
            }
            options.push([
              selector,
              {
                value: fragmentResult.val,
                location: createLocation(openingBracePosition, this.clonePosition())
              }
            ]);
            parsedSelectors.add(selector);
            this.bumpSpace();
            _a2 = this.parseIdentifierIfPossible(), selector = _a2.value, selectorLocation = _a2.location;
          }
          if (options.length === 0) {
            return this.error(parentArgType === "select" ? error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
          }
          if (this.requiresOtherClause && !hasOtherClause) {
            return this.error(error_1.ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
          }
          return { val: options, err: null };
        };
        Parser2.prototype.tryParseDecimalInteger = function(expectNumberError, invalidNumberError) {
          var sign = 1;
          var startingPosition = this.clonePosition();
          if (this.bumpIf("+")) {
          } else if (this.bumpIf("-")) {
            sign = -1;
          }
          var hasDigits = false;
          var decimal = 0;
          while (!this.isEOF()) {
            var ch = this.char();
            if (ch >= 48 && ch <= 57) {
              hasDigits = true;
              decimal = decimal * 10 + (ch - 48);
              this.bump();
            } else {
              break;
            }
          }
          var location = createLocation(startingPosition, this.clonePosition());
          if (!hasDigits) {
            return this.error(expectNumberError, location);
          }
          decimal *= sign;
          if (!isSafeInteger(decimal)) {
            return this.error(invalidNumberError, location);
          }
          return { val: decimal, err: null };
        };
        Parser2.prototype.offset = function() {
          return this.position.offset;
        };
        Parser2.prototype.isEOF = function() {
          return this.offset() === this.message.length;
        };
        Parser2.prototype.clonePosition = function() {
          return {
            offset: this.position.offset,
            line: this.position.line,
            column: this.position.column
          };
        };
        Parser2.prototype.char = function() {
          var offset = this.position.offset;
          if (offset >= this.message.length) {
            throw Error("out of bound");
          }
          var code = codePointAt(this.message, offset);
          if (code === void 0) {
            throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
          }
          return code;
        };
        Parser2.prototype.error = function(kind, location) {
          return {
            val: null,
            err: {
              kind,
              message: this.message,
              location
            }
          };
        };
        Parser2.prototype.bump = function() {
          if (this.isEOF()) {
            return;
          }
          var code = this.char();
          if (code === 10) {
            this.position.line += 1;
            this.position.column = 1;
            this.position.offset += 1;
          } else {
            this.position.column += 1;
            this.position.offset += code < 65536 ? 1 : 2;
          }
        };
        Parser2.prototype.bumpIf = function(prefix) {
          if (startsWith(this.message, prefix, this.offset())) {
            for (var i = 0; i < prefix.length; i++) {
              this.bump();
            }
            return true;
          }
          return false;
        };
        Parser2.prototype.bumpUntil = function(pattern) {
          var currentOffset = this.offset();
          var index = this.message.indexOf(pattern, currentOffset);
          if (index >= 0) {
            this.bumpTo(index);
            return true;
          } else {
            this.bumpTo(this.message.length);
            return false;
          }
        };
        Parser2.prototype.bumpTo = function(targetOffset) {
          if (this.offset() > targetOffset) {
            throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
          }
          targetOffset = Math.min(targetOffset, this.message.length);
          while (true) {
            var offset = this.offset();
            if (offset === targetOffset) {
              break;
            }
            if (offset > targetOffset) {
              throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
            }
            this.bump();
            if (this.isEOF()) {
              break;
            }
          }
        };
        Parser2.prototype.bumpSpace = function() {
          while (!this.isEOF() && _isWhiteSpace(this.char())) {
            this.bump();
          }
        };
        Parser2.prototype.peek = function() {
          if (this.isEOF()) {
            return null;
          }
          var code = this.char();
          var offset = this.offset();
          var nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
          return nextCode !== null && nextCode !== void 0 ? nextCode : null;
        };
        return Parser2;
      })()
    );
    exports.Parser = Parser;
    function _isAlpha(codepoint) {
      return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
    }
    __name(_isAlpha, "_isAlpha");
    function _isAlphaOrSlash(codepoint) {
      return _isAlpha(codepoint) || codepoint === 47;
    }
    __name(_isAlphaOrSlash, "_isAlphaOrSlash");
    function _isPotentialElementNameChar(c) {
      return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
    }
    __name(_isPotentialElementNameChar, "_isPotentialElementNameChar");
    function _isWhiteSpace(c) {
      return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
    }
    __name(_isWhiteSpace, "_isWhiteSpace");
    function _isPatternSyntax(c) {
      return c >= 33 && c <= 35 || c === 36 || c >= 37 && c <= 39 || c === 40 || c === 41 || c === 42 || c === 43 || c === 44 || c === 45 || c >= 46 && c <= 47 || c >= 58 && c <= 59 || c >= 60 && c <= 62 || c >= 63 && c <= 64 || c === 91 || c === 92 || c === 93 || c === 94 || c === 96 || c === 123 || c === 124 || c === 125 || c === 126 || c === 161 || c >= 162 && c <= 165 || c === 166 || c === 167 || c === 169 || c === 171 || c === 172 || c === 174 || c === 176 || c === 177 || c === 182 || c === 187 || c === 191 || c === 215 || c === 247 || c >= 8208 && c <= 8213 || c >= 8214 && c <= 8215 || c === 8216 || c === 8217 || c === 8218 || c >= 8219 && c <= 8220 || c === 8221 || c === 8222 || c === 8223 || c >= 8224 && c <= 8231 || c >= 8240 && c <= 8248 || c === 8249 || c === 8250 || c >= 8251 && c <= 8254 || c >= 8257 && c <= 8259 || c === 8260 || c === 8261 || c === 8262 || c >= 8263 && c <= 8273 || c === 8274 || c === 8275 || c >= 8277 && c <= 8286 || c >= 8592 && c <= 8596 || c >= 8597 && c <= 8601 || c >= 8602 && c <= 8603 || c >= 8604 && c <= 8607 || c === 8608 || c >= 8609 && c <= 8610 || c === 8611 || c >= 8612 && c <= 8613 || c === 8614 || c >= 8615 && c <= 8621 || c === 8622 || c >= 8623 && c <= 8653 || c >= 8654 && c <= 8655 || c >= 8656 && c <= 8657 || c === 8658 || c === 8659 || c === 8660 || c >= 8661 && c <= 8691 || c >= 8692 && c <= 8959 || c >= 8960 && c <= 8967 || c === 8968 || c === 8969 || c === 8970 || c === 8971 || c >= 8972 && c <= 8991 || c >= 8992 && c <= 8993 || c >= 8994 && c <= 9e3 || c === 9001 || c === 9002 || c >= 9003 && c <= 9083 || c === 9084 || c >= 9085 && c <= 9114 || c >= 9115 && c <= 9139 || c >= 9140 && c <= 9179 || c >= 9180 && c <= 9185 || c >= 9186 && c <= 9254 || c >= 9255 && c <= 9279 || c >= 9280 && c <= 9290 || c >= 9291 && c <= 9311 || c >= 9472 && c <= 9654 || c === 9655 || c >= 9656 && c <= 9664 || c === 9665 || c >= 9666 && c <= 9719 || c >= 9720 && c <= 9727 || c >= 9728 && c <= 9838 || c === 9839 || c >= 9840 && c <= 10087 || c === 10088 || c === 10089 || c === 10090 || c === 10091 || c === 10092 || c === 10093 || c === 10094 || c === 10095 || c === 10096 || c === 10097 || c === 10098 || c === 10099 || c === 10100 || c === 10101 || c >= 10132 && c <= 10175 || c >= 10176 && c <= 10180 || c === 10181 || c === 10182 || c >= 10183 && c <= 10213 || c === 10214 || c === 10215 || c === 10216 || c === 10217 || c === 10218 || c === 10219 || c === 10220 || c === 10221 || c === 10222 || c === 10223 || c >= 10224 && c <= 10239 || c >= 10240 && c <= 10495 || c >= 10496 && c <= 10626 || c === 10627 || c === 10628 || c === 10629 || c === 10630 || c === 10631 || c === 10632 || c === 10633 || c === 10634 || c === 10635 || c === 10636 || c === 10637 || c === 10638 || c === 10639 || c === 10640 || c === 10641 || c === 10642 || c === 10643 || c === 10644 || c === 10645 || c === 10646 || c === 10647 || c === 10648 || c >= 10649 && c <= 10711 || c === 10712 || c === 10713 || c === 10714 || c === 10715 || c >= 10716 && c <= 10747 || c === 10748 || c === 10749 || c >= 10750 && c <= 11007 || c >= 11008 && c <= 11055 || c >= 11056 && c <= 11076 || c >= 11077 && c <= 11078 || c >= 11079 && c <= 11084 || c >= 11085 && c <= 11123 || c >= 11124 && c <= 11125 || c >= 11126 && c <= 11157 || c === 11158 || c >= 11159 && c <= 11263 || c >= 11776 && c <= 11777 || c === 11778 || c === 11779 || c === 11780 || c === 11781 || c >= 11782 && c <= 11784 || c === 11785 || c === 11786 || c === 11787 || c === 11788 || c === 11789 || c >= 11790 && c <= 11798 || c === 11799 || c >= 11800 && c <= 11801 || c === 11802 || c === 11803 || c === 11804 || c === 11805 || c >= 11806 && c <= 11807 || c === 11808 || c === 11809 || c === 11810 || c === 11811 || c === 11812 || c === 11813 || c === 11814 || c === 11815 || c === 11816 || c === 11817 || c >= 11818 && c <= 11822 || c === 11823 || c >= 11824 && c <= 11833 || c >= 11834 && c <= 11835 || c >= 11836 && c <= 11839 || c === 11840 || c === 11841 || c === 11842 || c >= 11843 && c <= 11855 || c >= 11856 && c <= 11857 || c === 11858 || c >= 11859 && c <= 11903 || c >= 12289 && c <= 12291 || c === 12296 || c === 12297 || c === 12298 || c === 12299 || c === 12300 || c === 12301 || c === 12302 || c === 12303 || c === 12304 || c === 12305 || c >= 12306 && c <= 12307 || c === 12308 || c === 12309 || c === 12310 || c === 12311 || c === 12312 || c === 12313 || c === 12314 || c === 12315 || c === 12316 || c === 12317 || c >= 12318 && c <= 12319 || c === 12320 || c === 12336 || c === 64830 || c === 64831 || c >= 65093 && c <= 65094;
    }
    __name(_isPatternSyntax, "_isPatternSyntax");
  }
});

// node_modules/@formatjs/icu-messageformat-parser/manipulator.js
var require_manipulator = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/manipulator.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hoistSelectors = hoistSelectors;
    exports.isStructurallySame = isStructurallySame;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var types_1 = require_types();
    function cloneDeep(obj) {
      if (Array.isArray(obj)) {
        return tslib_1.__spreadArray([], obj.map(cloneDeep), true);
      }
      if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce(function(cloned, k) {
          cloned[k] = cloneDeep(obj[k]);
          return cloned;
        }, {});
      }
      return obj;
    }
    __name(cloneDeep, "cloneDeep");
    function hoistPluralOrSelectElement(ast, el, positionToInject) {
      var cloned = cloneDeep(el);
      var options = cloned.options;
      cloned.options = Object.keys(options).reduce(function(all, k) {
        var newValue = hoistSelectors(tslib_1.__spreadArray(tslib_1.__spreadArray(tslib_1.__spreadArray([], ast.slice(0, positionToInject), true), options[k].value, true), ast.slice(positionToInject + 1), true));
        all[k] = {
          value: newValue
        };
        return all;
      }, {});
      return cloned;
    }
    __name(hoistPluralOrSelectElement, "hoistPluralOrSelectElement");
    function isPluralOrSelectElement(el) {
      return (0, types_1.isPluralElement)(el) || (0, types_1.isSelectElement)(el);
    }
    __name(isPluralOrSelectElement, "isPluralOrSelectElement");
    function findPluralOrSelectElement(ast) {
      return !!ast.find(function(el) {
        if (isPluralOrSelectElement(el)) {
          return true;
        }
        if ((0, types_1.isTagElement)(el)) {
          return findPluralOrSelectElement(el.children);
        }
        return false;
      });
    }
    __name(findPluralOrSelectElement, "findPluralOrSelectElement");
    function hoistSelectors(ast) {
      for (var i = 0; i < ast.length; i++) {
        var el = ast[i];
        if (isPluralOrSelectElement(el)) {
          return [hoistPluralOrSelectElement(ast, el, i)];
        }
        if ((0, types_1.isTagElement)(el) && findPluralOrSelectElement([el])) {
          throw new Error("Cannot hoist plural/select within a tag element. Please put the tag element inside each plural/select option");
        }
      }
      return ast;
    }
    __name(hoistSelectors, "hoistSelectors");
    function collectVariables(ast, vars) {
      if (vars === void 0) {
        vars = /* @__PURE__ */ new Map();
      }
      ast.forEach(function(el) {
        if ((0, types_1.isArgumentElement)(el) || (0, types_1.isDateElement)(el) || (0, types_1.isTimeElement)(el) || (0, types_1.isNumberElement)(el)) {
          if (el.value in vars && vars.get(el.value) !== el.type) {
            throw new Error("Variable ".concat(el.value, " has conflicting types"));
          }
          vars.set(el.value, el.type);
        }
        if ((0, types_1.isPluralElement)(el) || (0, types_1.isSelectElement)(el)) {
          vars.set(el.value, el.type);
          Object.keys(el.options).forEach(function(k) {
            collectVariables(el.options[k].value, vars);
          });
        }
        if ((0, types_1.isTagElement)(el)) {
          vars.set(el.value, el.type);
          collectVariables(el.children, vars);
        }
      });
    }
    __name(collectVariables, "collectVariables");
    function isStructurallySame(a, b) {
      var aVars = /* @__PURE__ */ new Map();
      var bVars = /* @__PURE__ */ new Map();
      collectVariables(a, aVars);
      collectVariables(b, bVars);
      if (aVars.size !== bVars.size) {
        return {
          success: false,
          error: new Error("Different number of variables: [".concat(Array.from(aVars.keys()).join(", "), "] vs [").concat(Array.from(bVars.keys()).join(", "), "]"))
        };
      }
      return Array.from(aVars.entries()).reduce(function(result, _a) {
        var key = _a[0], type = _a[1];
        if (!result.success) {
          return result;
        }
        var bType = bVars.get(key);
        if (bType == null) {
          return {
            success: false,
            error: new Error("Missing variable ".concat(key, " in message"))
          };
        }
        if (bType !== type) {
          return {
            success: false,
            error: new Error("Variable ".concat(key, " has conflicting types: ").concat(types_1.TYPE[type], " vs ").concat(types_1.TYPE[bType]))
          };
        }
        return result;
      }, { success: true });
    }
    __name(isStructurallySame, "isStructurallySame");
  }
});

// node_modules/@formatjs/icu-messageformat-parser/index.js
var require_icu_messageformat_parser = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isStructurallySame = exports._Parser = void 0;
    exports.parse = parse;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var error_1 = require_error();
    var parser_1 = require_parser();
    var types_1 = require_types();
    function pruneLocation(els) {
      els.forEach(function(el) {
        delete el.location;
        if ((0, types_1.isSelectElement)(el) || (0, types_1.isPluralElement)(el)) {
          for (var k in el.options) {
            delete el.options[k].location;
            pruneLocation(el.options[k].value);
          }
        } else if ((0, types_1.isNumberElement)(el) && (0, types_1.isNumberSkeleton)(el.style)) {
          delete el.style.location;
        } else if (((0, types_1.isDateElement)(el) || (0, types_1.isTimeElement)(el)) && (0, types_1.isDateTimeSkeleton)(el.style)) {
          delete el.style.location;
        } else if ((0, types_1.isTagElement)(el)) {
          pruneLocation(el.children);
        }
      });
    }
    __name(pruneLocation, "pruneLocation");
    function parse(message, opts) {
      if (opts === void 0) {
        opts = {};
      }
      opts = tslib_1.__assign({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
      var result = new parser_1.Parser(message, opts).parse();
      if (result.err) {
        var error = SyntaxError(error_1.ErrorKind[result.err.kind]);
        error.location = result.err.location;
        error.originalMessage = result.err.message;
        throw error;
      }
      if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
        pruneLocation(result.val);
      }
      return result.val;
    }
    __name(parse, "parse");
    tslib_1.__exportStar(require_types(), exports);
    exports._Parser = parser_1.Parser;
    var manipulator_1 = require_manipulator();
    Object.defineProperty(exports, "isStructurallySame", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return manipulator_1.isStructurallySame;
    }, "get") });
  }
});

// node_modules/intl-messageformat/src/error.js
var require_error2 = __commonJS({
  "node_modules/intl-messageformat/src/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingValueError = exports.InvalidValueTypeError = exports.InvalidValueError = exports.FormatError = exports.ErrorCode = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var ErrorCode;
    (function(ErrorCode2) {
      ErrorCode2["MISSING_VALUE"] = "MISSING_VALUE";
      ErrorCode2["INVALID_VALUE"] = "INVALID_VALUE";
      ErrorCode2["MISSING_INTL_API"] = "MISSING_INTL_API";
    })(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
    var FormatError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(FormatError2, _super);
        function FormatError2(msg, code, originalMessage) {
          var _this = _super.call(this, msg) || this;
          _this.code = code;
          _this.originalMessage = originalMessage;
          return _this;
        }
        __name(FormatError2, "FormatError");
        FormatError2.prototype.toString = function() {
          return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
        };
        return FormatError2;
      })(Error)
    );
    exports.FormatError = FormatError;
    var InvalidValueError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(InvalidValueError2, _super);
        function InvalidValueError2(variableId, value, options, originalMessage) {
          return _super.call(this, 'Invalid values for "'.concat(variableId, '": "').concat(value, '". Options are "').concat(Object.keys(options).join('", "'), '"'), ErrorCode.INVALID_VALUE, originalMessage) || this;
        }
        __name(InvalidValueError2, "InvalidValueError");
        return InvalidValueError2;
      })(FormatError)
    );
    exports.InvalidValueError = InvalidValueError;
    var InvalidValueTypeError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(InvalidValueTypeError2, _super);
        function InvalidValueTypeError2(value, type, originalMessage) {
          return _super.call(this, 'Value for "'.concat(value, '" must be of type ').concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
        }
        __name(InvalidValueTypeError2, "InvalidValueTypeError");
        return InvalidValueTypeError2;
      })(FormatError)
    );
    exports.InvalidValueTypeError = InvalidValueTypeError;
    var MissingValueError = (
      /** @class */
      (function(_super) {
        tslib_1.__extends(MissingValueError2, _super);
        function MissingValueError2(variableId, originalMessage) {
          return _super.call(this, 'The intl string context variable "'.concat(variableId, '" was not provided to the string "').concat(originalMessage, '"'), ErrorCode.MISSING_VALUE, originalMessage) || this;
        }
        __name(MissingValueError2, "MissingValueError");
        return MissingValueError2;
      })(FormatError)
    );
    exports.MissingValueError = MissingValueError;
  }
});

// node_modules/intl-messageformat/src/formatters.js
var require_formatters = __commonJS({
  "node_modules/intl-messageformat/src/formatters.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PART_TYPE = void 0;
    exports.isFormatXMLElementFn = isFormatXMLElementFn;
    exports.formatToParts = formatToParts;
    var icu_messageformat_parser_1 = require_icu_messageformat_parser();
    var error_1 = require_error2();
    var PART_TYPE;
    (function(PART_TYPE2) {
      PART_TYPE2[PART_TYPE2["literal"] = 0] = "literal";
      PART_TYPE2[PART_TYPE2["object"] = 1] = "object";
    })(PART_TYPE || (exports.PART_TYPE = PART_TYPE = {}));
    function mergeLiteral(parts) {
      if (parts.length < 2) {
        return parts;
      }
      return parts.reduce(function(all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
          all.push(part);
        } else {
          lastPart.value += part.value;
        }
        return all;
      }, []);
    }
    __name(mergeLiteral, "mergeLiteral");
    function isFormatXMLElementFn(el) {
      return typeof el === "function";
    }
    __name(isFormatXMLElementFn, "isFormatXMLElementFn");
    function formatToParts(els, locales2, formatters, formats2, values, currentPluralValue, originalMessage) {
      if (els.length === 1 && (0, icu_messageformat_parser_1.isLiteralElement)(els[0])) {
        return [
          {
            type: PART_TYPE.literal,
            value: els[0].value
          }
        ];
      }
      var result = [];
      for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        if ((0, icu_messageformat_parser_1.isLiteralElement)(el)) {
          result.push({
            type: PART_TYPE.literal,
            value: el.value
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isPoundElement)(el)) {
          if (typeof currentPluralValue === "number") {
            result.push({
              type: PART_TYPE.literal,
              value: formatters.getNumberFormat(locales2).format(currentPluralValue)
            });
          }
          continue;
        }
        var varName = el.value;
        if (!(values && varName in values)) {
          throw new error_1.MissingValueError(varName, originalMessage);
        }
        var value = values[varName];
        if ((0, icu_messageformat_parser_1.isArgumentElement)(el)) {
          if (!value || typeof value === "string" || typeof value === "number") {
            value = typeof value === "string" || typeof value === "number" ? String(value) : "";
          }
          result.push({
            type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
            value
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isDateElement)(el)) {
          var style = typeof el.style === "string" ? formats2.date[el.style] : (0, icu_messageformat_parser_1.isDateTimeSkeleton)(el.style) ? el.style.parsedOptions : void 0;
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getDateTimeFormat(locales2, style).format(value)
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isTimeElement)(el)) {
          var style = typeof el.style === "string" ? formats2.time[el.style] : (0, icu_messageformat_parser_1.isDateTimeSkeleton)(el.style) ? el.style.parsedOptions : formats2.time.medium;
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getDateTimeFormat(locales2, style).format(value)
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isNumberElement)(el)) {
          var style = typeof el.style === "string" ? formats2.number[el.style] : (0, icu_messageformat_parser_1.isNumberSkeleton)(el.style) ? el.style.parsedOptions : void 0;
          if (style && style.scale) {
            value = value * (style.scale || 1);
          }
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getNumberFormat(locales2, style).format(value)
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isTagElement)(el)) {
          var children = el.children, value_1 = el.value;
          var formatFn = values[value_1];
          if (!isFormatXMLElementFn(formatFn)) {
            throw new error_1.InvalidValueTypeError(value_1, "function", originalMessage);
          }
          var parts = formatToParts(children, locales2, formatters, formats2, values, currentPluralValue);
          var chunks = formatFn(parts.map(function(p) {
            return p.value;
          }));
          if (!Array.isArray(chunks)) {
            chunks = [chunks];
          }
          result.push.apply(result, chunks.map(function(c) {
            return {
              type: typeof c === "string" ? PART_TYPE.literal : PART_TYPE.object,
              value: c
            };
          }));
        }
        if ((0, icu_messageformat_parser_1.isSelectElement)(el)) {
          var opt = el.options[value] || el.options.other;
          if (!opt) {
            throw new error_1.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
          }
          result.push.apply(result, formatToParts(opt.value, locales2, formatters, formats2, values));
          continue;
        }
        if ((0, icu_messageformat_parser_1.isPluralElement)(el)) {
          var opt = el.options["=".concat(value)];
          if (!opt) {
            if (!Intl.PluralRules) {
              throw new error_1.FormatError('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', error_1.ErrorCode.MISSING_INTL_API, originalMessage);
            }
            var rule = formatters.getPluralRules(locales2, { type: el.pluralType }).select(value - (el.offset || 0));
            opt = el.options[rule] || el.options.other;
          }
          if (!opt) {
            throw new error_1.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
          }
          result.push.apply(result, formatToParts(opt.value, locales2, formatters, formats2, values, value - (el.offset || 0)));
          continue;
        }
      }
      return mergeLiteral(result);
    }
    __name(formatToParts, "formatToParts");
  }
});

// node_modules/intl-messageformat/src/core.js
var require_core = __commonJS({
  "node_modules/intl-messageformat/src/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntlMessageFormat = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var fast_memoize_1 = require_fast_memoize();
    var icu_messageformat_parser_1 = require_icu_messageformat_parser();
    var formatters_1 = require_formatters();
    function mergeConfig(c1, c2) {
      if (!c2) {
        return c1;
      }
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function(all, k) {
        all[k] = tslib_1.__assign(tslib_1.__assign({}, c1[k]), c2[k] || {});
        return all;
      }, {}));
    }
    __name(mergeConfig, "mergeConfig");
    function mergeConfigs(defaultConfig, configs) {
      if (!configs) {
        return defaultConfig;
      }
      return Object.keys(defaultConfig).reduce(function(all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
      }, tslib_1.__assign({}, defaultConfig));
    }
    __name(mergeConfigs, "mergeConfigs");
    function createFastMemoizeCache(store) {
      return {
        create: /* @__PURE__ */ __name(function() {
          return {
            get: /* @__PURE__ */ __name(function(key) {
              return store[key];
            }, "get"),
            set: /* @__PURE__ */ __name(function(key, value) {
              store[key] = value;
            }, "set")
          };
        }, "create")
      };
    }
    __name(createFastMemoizeCache, "createFastMemoizeCache");
    function createDefaultFormatters(cache) {
      if (cache === void 0) {
        cache = {
          number: {},
          dateTime: {},
          pluralRules: {}
        };
      }
      return {
        getNumberFormat: (0, fast_memoize_1.memoize)(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.NumberFormat).bind.apply(_a, tslib_1.__spreadArray([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.number),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getDateTimeFormat: (0, fast_memoize_1.memoize)(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.DateTimeFormat).bind.apply(_a, tslib_1.__spreadArray([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.dateTime),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getPluralRules: (0, fast_memoize_1.memoize)(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.PluralRules).bind.apply(_a, tslib_1.__spreadArray([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.pluralRules),
          strategy: fast_memoize_1.strategies.variadic
        })
      };
    }
    __name(createDefaultFormatters, "createDefaultFormatters");
    var IntlMessageFormat2 = (
      /** @class */
      (function() {
        function IntlMessageFormat3(message, locales2, overrideFormats, opts) {
          if (locales2 === void 0) {
            locales2 = IntlMessageFormat3.defaultLocale;
          }
          var _this = this;
          this.formatterCache = {
            number: {},
            dateTime: {},
            pluralRules: {}
          };
          this.format = function(values) {
            var parts = _this.formatToParts(values);
            if (parts.length === 1) {
              return parts[0].value;
            }
            var result = parts.reduce(function(all, part) {
              if (!all.length || part.type !== formatters_1.PART_TYPE.literal || typeof all[all.length - 1] !== "string") {
                all.push(part.value);
              } else {
                all[all.length - 1] += part.value;
              }
              return all;
            }, []);
            if (result.length <= 1) {
              return result[0] || "";
            }
            return result;
          };
          this.formatToParts = function(values) {
            return (0, formatters_1.formatToParts)(_this.ast, _this.locales, _this.formatters, _this.formats, values, void 0, _this.message);
          };
          this.resolvedOptions = function() {
            var _a2;
            return {
              locale: ((_a2 = _this.resolvedLocale) === null || _a2 === void 0 ? void 0 : _a2.toString()) || Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
            };
          };
          this.getAst = function() {
            return _this.ast;
          };
          this.locales = locales2;
          this.resolvedLocale = IntlMessageFormat3.resolveLocale(locales2);
          if (typeof message === "string") {
            this.message = message;
            if (!IntlMessageFormat3.__parse) {
              throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
            }
            var _a = opts || {}, formatters = _a.formatters, parseOpts = tslib_1.__rest(_a, ["formatters"]);
            this.ast = IntlMessageFormat3.__parse(message, tslib_1.__assign(tslib_1.__assign({}, parseOpts), { locale: this.resolvedLocale }));
          } else {
            this.ast = message;
          }
          if (!Array.isArray(this.ast)) {
            throw new TypeError("A message must be provided as a String or AST.");
          }
          this.formats = mergeConfigs(IntlMessageFormat3.formats, overrideFormats);
          this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
        }
        __name(IntlMessageFormat3, "IntlMessageFormat");
        Object.defineProperty(IntlMessageFormat3, "defaultLocale", {
          get: /* @__PURE__ */ __name(function() {
            if (!IntlMessageFormat3.memoizedDefaultLocale) {
              IntlMessageFormat3.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
            }
            return IntlMessageFormat3.memoizedDefaultLocale;
          }, "get"),
          enumerable: false,
          configurable: true
        });
        IntlMessageFormat3.memoizedDefaultLocale = null;
        IntlMessageFormat3.resolveLocale = function(locales2) {
          if (typeof Intl.Locale === "undefined") {
            return;
          }
          var supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales2);
          if (supportedLocales.length > 0) {
            return new Intl.Locale(supportedLocales[0]);
          }
          return new Intl.Locale(typeof locales2 === "string" ? locales2 : locales2[0]);
        };
        IntlMessageFormat3.__parse = icu_messageformat_parser_1.parse;
        IntlMessageFormat3.formats = {
          number: {
            integer: {
              maximumFractionDigits: 0
            },
            currency: {
              style: "currency"
            },
            percent: {
              style: "percent"
            }
          },
          date: {
            short: {
              month: "numeric",
              day: "numeric",
              year: "2-digit"
            },
            medium: {
              month: "short",
              day: "numeric",
              year: "numeric"
            },
            long: {
              month: "long",
              day: "numeric",
              year: "numeric"
            },
            full: {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric"
            }
          },
          time: {
            short: {
              hour: "numeric",
              minute: "numeric"
            },
            medium: {
              hour: "numeric",
              minute: "numeric",
              second: "numeric"
            },
            long: {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              timeZoneName: "short"
            },
            full: {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              timeZoneName: "short"
            }
          }
        };
        return IntlMessageFormat3;
      })()
    );
    exports.IntlMessageFormat = IntlMessageFormat2;
  }
});

// node_modules/intl-messageformat/index.js
var require_intl_messageformat = __commonJS({
  "node_modules/intl-messageformat/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntlMessageFormat = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var core_1 = require_core();
    Object.defineProperty(exports, "IntlMessageFormat", { enumerable: true, get: /* @__PURE__ */ __name(function() {
      return core_1.IntlMessageFormat;
    }, "get") });
    tslib_1.__exportStar(require_core(), exports);
    tslib_1.__exportStar(require_error2(), exports);
    tslib_1.__exportStar(require_formatters(), exports);
    exports.default = core_1.IntlMessageFormat;
  }
});

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
  static {
    __name(this, "Emitter");
  }
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
  static {
    __name(this, "Log");
  }
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

// node_modules/lighthouse/core/lib/i18n/i18n.js
var import_lookup_closest_locale = __toESM(require_lookup_closest_locale(), 1);
import path3 from "path";
import url2 from "url";

// node_modules/lighthouse/shared/localization/format.js
var import_intl_messageformat = __toESM(require_intl_messageformat(), 1);
import fs2 from "fs";

// node_modules/lighthouse/shared/esm-utils.js
import url from "url";
import path from "path";
function getModulePath(importMeta) {
  return url.fileURLToPath(importMeta.url);
}
__name(getModulePath, "getModulePath");
function getModuleDirectory(importMeta) {
  return path.dirname(getModulePath(importMeta));
}
__name(getModuleDirectory, "getModuleDirectory");

// node_modules/lighthouse/shared/localization/locales.js
import fs from "fs";
var moduleDir = getModuleDirectory(import.meta);
var files = {
  "ar": JSON.parse(fs.readFileSync(`${moduleDir}/locales/ar.json`, "utf8")),
  "ar-XB": JSON.parse(fs.readFileSync(`${moduleDir}/locales/ar-XB.json`, "utf8")),
  "bg": JSON.parse(fs.readFileSync(`${moduleDir}/locales/bg.json`, "utf8")),
  "ca": JSON.parse(fs.readFileSync(`${moduleDir}/locales/ca.json`, "utf8")),
  "cs": JSON.parse(fs.readFileSync(`${moduleDir}/locales/cs.json`, "utf8")),
  "da": JSON.parse(fs.readFileSync(`${moduleDir}/locales/da.json`, "utf8")),
  "de": JSON.parse(fs.readFileSync(`${moduleDir}/locales/de.json`, "utf8")),
  "el": JSON.parse(fs.readFileSync(`${moduleDir}/locales/el.json`, "utf8")),
  "en-GB": JSON.parse(fs.readFileSync(`${moduleDir}/locales/en-GB.json`, "utf8")),
  "en-US": JSON.parse(fs.readFileSync(`${moduleDir}/locales/en-US.json`, "utf8")),
  "en-XA": JSON.parse(fs.readFileSync(`${moduleDir}/locales/en-XA.json`, "utf8")),
  "en-XL": JSON.parse(fs.readFileSync(`${moduleDir}/locales/en-XL.json`, "utf8")),
  "es": JSON.parse(fs.readFileSync(`${moduleDir}/locales/es.json`, "utf8")),
  "es-419": JSON.parse(fs.readFileSync(`${moduleDir}/locales/es-419.json`, "utf8")),
  "fi": JSON.parse(fs.readFileSync(`${moduleDir}/locales/fi.json`, "utf8")),
  "fil": JSON.parse(fs.readFileSync(`${moduleDir}/locales/fil.json`, "utf8")),
  "fr": JSON.parse(fs.readFileSync(`${moduleDir}/locales/fr.json`, "utf8")),
  "he": JSON.parse(fs.readFileSync(`${moduleDir}/locales/he.json`, "utf8")),
  "hi": JSON.parse(fs.readFileSync(`${moduleDir}/locales/hi.json`, "utf8")),
  "hr": JSON.parse(fs.readFileSync(`${moduleDir}/locales/hr.json`, "utf8")),
  "hu": JSON.parse(fs.readFileSync(`${moduleDir}/locales/hu.json`, "utf8")),
  "id": JSON.parse(fs.readFileSync(`${moduleDir}/locales/id.json`, "utf8")),
  "it": JSON.parse(fs.readFileSync(`${moduleDir}/locales/it.json`, "utf8")),
  "ja": JSON.parse(fs.readFileSync(`${moduleDir}/locales/ja.json`, "utf8")),
  "ko": JSON.parse(fs.readFileSync(`${moduleDir}/locales/ko.json`, "utf8")),
  "lt": JSON.parse(fs.readFileSync(`${moduleDir}/locales/lt.json`, "utf8")),
  "lv": JSON.parse(fs.readFileSync(`${moduleDir}/locales/lv.json`, "utf8")),
  "nl": JSON.parse(fs.readFileSync(`${moduleDir}/locales/nl.json`, "utf8")),
  "no": JSON.parse(fs.readFileSync(`${moduleDir}/locales/no.json`, "utf8")),
  "pl": JSON.parse(fs.readFileSync(`${moduleDir}/locales/pl.json`, "utf8")),
  "pt": JSON.parse(fs.readFileSync(`${moduleDir}/locales/pt.json`, "utf8")),
  "pt-PT": JSON.parse(fs.readFileSync(`${moduleDir}/locales/pt-PT.json`, "utf8")),
  "ro": JSON.parse(fs.readFileSync(`${moduleDir}/locales/ro.json`, "utf8")),
  "ru": JSON.parse(fs.readFileSync(`${moduleDir}/locales/ru.json`, "utf8")),
  "sk": JSON.parse(fs.readFileSync(`${moduleDir}/locales/sk.json`, "utf8")),
  "sl": JSON.parse(fs.readFileSync(`${moduleDir}/locales/sl.json`, "utf8")),
  "sr": JSON.parse(fs.readFileSync(`${moduleDir}/locales/sr.json`, "utf8")),
  "sr-Latn": JSON.parse(fs.readFileSync(`${moduleDir}/locales/sr-Latn.json`, "utf8")),
  "sv": JSON.parse(fs.readFileSync(`${moduleDir}/locales/sv.json`, "utf8")),
  "ta": JSON.parse(fs.readFileSync(`${moduleDir}/locales/ta.json`, "utf8")),
  "te": JSON.parse(fs.readFileSync(`${moduleDir}/locales/te.json`, "utf8")),
  "th": JSON.parse(fs.readFileSync(`${moduleDir}/locales/th.json`, "utf8")),
  "tr": JSON.parse(fs.readFileSync(`${moduleDir}/locales/tr.json`, "utf8")),
  "uk": JSON.parse(fs.readFileSync(`${moduleDir}/locales/uk.json`, "utf8")),
  "vi": JSON.parse(fs.readFileSync(`${moduleDir}/locales/vi.json`, "utf8")),
  "zh": JSON.parse(fs.readFileSync(`${moduleDir}/locales/zh.json`, "utf8")),
  "zh-HK": JSON.parse(fs.readFileSync(`${moduleDir}/locales/zh-HK.json`, "utf8")),
  "zh-TW": JSON.parse(fs.readFileSync(`${moduleDir}/locales/zh-TW.json`, "utf8"))
};
var locales = {
  "en-US": files["en-US"],
  // The 'source' strings, with descriptions
  "en": files["en-US"],
  // According to CLDR/ICU, 'en' == 'en-US' dates/numbers (Why?!)
  // TODO: en-GB has just ~10 messages that are different from en-US. We should only ship those.
  "en-AU": files["en-GB"],
  // Alias of 'en-GB'
  "en-GB": files["en-GB"],
  // Alias of 'en-GB'
  "en-IE": files["en-GB"],
  // Alias of 'en-GB'
  "en-SG": files["en-GB"],
  // Alias of 'en-GB'
  "en-ZA": files["en-GB"],
  // Alias of 'en-GB'
  "en-IN": files["en-GB"],
  // Alias of 'en-GB'
  // All locales from here have a messages file, though we allow fallback to the base locale when the files are identical
  "ar-XB": files["ar-XB"],
  // psuedolocalization
  "ar": files["ar"],
  "bg": files["bg"],
  "ca": files["ca"],
  "cs": files["cs"],
  "da": files["da"],
  "de": files["de"],
  // de-AT, de-CH identical, so they fall back into de
  "el": files["el"],
  "en-XA": files["en-XA"],
  // psuedolocalization
  "en-XL": files["en-XL"],
  // local psuedolocalization
  "es": files["es"],
  "es-419": files["es-419"],
  // Aliases of es-419: https://raw.githubusercontent.com/unicode-cldr/cldr-core/master/supplemental/parentLocales.json
  "es-AR": files["es-419"],
  "es-BO": files["es-419"],
  "es-BR": files["es-419"],
  "es-BZ": files["es-419"],
  "es-CL": files["es-419"],
  "es-CO": files["es-419"],
  "es-CR": files["es-419"],
  "es-CU": files["es-419"],
  "es-DO": files["es-419"],
  "es-EC": files["es-419"],
  "es-GT": files["es-419"],
  "es-HN": files["es-419"],
  "es-MX": files["es-419"],
  "es-NI": files["es-419"],
  "es-PA": files["es-419"],
  "es-PE": files["es-419"],
  "es-PR": files["es-419"],
  "es-PY": files["es-419"],
  "es-SV": files["es-419"],
  "es-US": files["es-419"],
  "es-UY": files["es-419"],
  "es-VE": files["es-419"],
  "fi": files["fi"],
  "fil": files["fil"],
  "fr": files["fr"],
  // fr-CH identical, so it falls back into fr
  "he": files["he"],
  "hi": files["hi"],
  "hr": files["hr"],
  "hu": files["hu"],
  "gsw": files["de"],
  // swiss german. identical (for our purposes) to 'de'
  "id": files["id"],
  "in": files["id"],
  // Alias of 'id'
  "it": files["it"],
  "iw": files["he"],
  // Alias of 'he'
  "ja": files["ja"],
  "ko": files["ko"],
  "lt": files["lt"],
  "lv": files["lv"],
  "mo": files["ro"],
  // Alias of 'ro'
  "nl": files["nl"],
  "nb": files["no"],
  // Alias of 'no'
  "no": files["no"],
  "pl": files["pl"],
  "pt": files["pt"],
  // pt-BR identical, so it falls back into pt
  "pt-PT": files["pt-PT"],
  "ro": files["ro"],
  "ru": files["ru"],
  "sk": files["sk"],
  "sl": files["sl"],
  "sr": files["sr"],
  "sr-Latn": files["sr-Latn"],
  "sv": files["sv"],
  "ta": files["ta"],
  "te": files["te"],
  "th": files["th"],
  "tl": files["fil"],
  // Alias of 'fil'
  "tr": files["tr"],
  "uk": files["uk"],
  "vi": files["vi"],
  "zh": files["zh"],
  // aka ZH-Hans, sometimes seen as zh-CN, zh-Hans-CN, Simplified Chinese
  "zh-HK": files["zh-HK"],
  // aka zh-Hant-HK. Note: yue-Hant-HK is not supported.
  "zh-TW": files["zh-TW"]
  // aka zh-Hant, zh-Hant-TW, Traditional Chinese
};

// node_modules/lighthouse/shared/localization/format.js
var TYPE = (
  /** @type {const} */
  {
    literal: 0,
    argument: 1,
    number: 2,
    date: 3,
    time: 4,
    select: 5,
    plural: 6,
    pound: 7,
    tag: 8
  }
);
var moduleDir2 = getModuleDirectory(import.meta);
var DEFAULT_LOCALE = "en-US";
var CANONICAL_LOCALES = fs2.readdirSync(moduleDir2 + "/locales/").filter((basename) => basename.endsWith(".json") && !basename.endsWith(".ctc.json")).map((locale) => locale.replace(".json", "")).sort();
var formats = {
  number: {
    bytes: {
      maximumFractionDigits: 0
    },
    milliseconds: {
      maximumFractionDigits: 0
    },
    seconds: {
      // Force the seconds to the tenths place for limited output and ease of scanning
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    },
    extendedPercent: {
      // Force allow up to two digits after decimal place in percentages. (Intl.NumberFormat options)
      maximumFractionDigits: 2,
      style: "percent"
    }
  }
};
function collectAllCustomElementsFromICU(icuElements, customElements = /* @__PURE__ */ new Map()) {
  for (const el of icuElements) {
    if (el.type === TYPE.literal || el.type === TYPE.pound) continue;
    customElements.set(el.value, el);
    if (el.type === TYPE.plural) {
      for (const option of Object.values(el.options)) {
        collectAllCustomElementsFromICU(option.value, customElements);
      }
    }
  }
  return customElements;
}
__name(collectAllCustomElementsFromICU, "collectAllCustomElementsFromICU");
function _preformatValues(messageFormatter, values = {}, lhlMessage) {
  const customElements = collectAllCustomElementsFromICU(messageFormatter.getAst());
  const formattedValues = {};
  for (const [id, element] of customElements) {
    if (!(id in values)) {
      throw new Error(`ICU Message "${lhlMessage}" contains a value reference ("${id}") that wasn't provided`);
    }
    const value = values[id];
    if (element.type !== TYPE.number) {
      formattedValues[id] = value;
      continue;
    }
    if (typeof value !== "number") {
      throw new Error(`ICU Message "${lhlMessage}" contains a numeric reference ("${id}") but provided value was not a number`);
    }
    if (element.style === "milliseconds") {
      formattedValues[id] = Math.round(value / 10) * 10;
    } else if (element.style === "seconds" && id === "timeInMs") {
      formattedValues[id] = Math.round(value / 100) / 10;
    } else if (element.style === "bytes") {
      formattedValues[id] = value / 1024;
    } else {
      formattedValues[id] = value;
    }
  }
  for (const valueId of Object.keys(values)) {
    if (valueId in formattedValues) continue;
    if (valueId === "errorCode") {
      formattedValues.errorCode = values.errorCode;
      continue;
    }
    throw new Error(`Provided value "${valueId}" does not match any placeholder in ICU message "${lhlMessage}"`);
  }
  return formattedValues;
}
__name(_preformatValues, "_preformatValues");
function escapeIcuMessage(message) {
  return message.replace(/'/g, `''`).replace(/\\{/g, `'{`).replace(/\\}/g, `'}`);
}
__name(escapeIcuMessage, "escapeIcuMessage");
function formatMessage(message, values, locale) {
  message = escapeIcuMessage(message);
  const localeForMessageFormat = locale === "en-XA" || locale === "en-XL" ? "de-DE" : locale;
  const IntlMessageFormatCtor = import_intl_messageformat.default.IntlMessageFormat || import_intl_messageformat.default;
  const formatter = new IntlMessageFormatCtor(message, localeForMessageFormat, formats, {
    ignoreTag: true
  });
  const valuesForMessageFormat = _preformatValues(formatter, values, message);
  const formattedResult = formatter.format(valuesForMessageFormat);
  if (typeof formattedResult !== "string") {
    throw new Error("unexpected formatted result");
  }
  return formattedResult;
}
__name(formatMessage, "formatMessage");

// node_modules/lighthouse/shared/root.js
import fs3 from "fs";
import path2 from "path";
var LH_ROOT = path2.dirname(getModuleDirectory(import.meta));
var pkg = JSON.parse(fs3.readFileSync(`${LH_ROOT}/package.json`, "utf-8"));
var lighthouseVersion = pkg.version;

// node_modules/lighthouse/core/lib/i18n/i18n.js
var UIStrings = {
  /** Used to show the duration in milliseconds that something lasted. The `{timeInMs}` placeholder will be replaced with the time duration, shown in milliseconds (e.g. 63 ms) */
  ms: "{timeInMs, number, milliseconds}\xA0ms",
  /** Used to show the duration in seconds that something lasted. The {timeInMs} placeholder will be replaced with the time duration, shown in seconds (e.g. 5.2 s) */
  seconds: "{timeInMs, number, seconds}\xA0s",
  /** Label shown per-audit to show how many bytes smaller the page could be if the user implemented the suggestions. The `{wastedBytes}` placeholder will be replaced with the number of bytes, shown in kibibytes (e.g. 148 KiB) */
  displayValueByteSavings: "Est savings of {wastedBytes, number, bytes}\xA0KiB",
  /** Label shown per-audit to show how many milliseconds faster the page load could be if the user implemented the suggestions. The `{wastedMs}` placeholder will be replaced with the time duration, shown in milliseconds (e.g. 140 ms) */
  displayValueMsSavings: "Est savings of {wastedMs, number, milliseconds}\xA0ms",
  /** Label shown per-audit to show how many HTML elements did not pass the audit. The `{# elements found}` placeholder will be replaced with the number of failing HTML elements. */
  displayValueElementsFound: `{nodeCount, plural, =1 {1 element found} other {# elements found}}`,
  /** Label for a column in a data table; entries will be the URL of a web resource */
  columnURL: "URL",
  /** Label for a column in a data table; entries will be the size or quantity of some resource, e.g. the width and height dimensions of an image or the number of images in a web page. */
  columnSize: "Size",
  /** Label for a column in a data table; entries will be the file size of a web resource in kilobytes. */
  columnResourceSize: "Resource Size",
  /** Label for a column in a data table; entries will be the download size of a web resource in kilobytes. */
  columnTransferSize: "Transfer Size",
  /** Label for a column in a data table; entries will be the time to live value of the cache header on a web resource. */
  columnCacheTTL: "Cache TTL",
  /** Label for a column in a data table; entries will be the number of kilobytes the user could reduce their page by if they implemented the suggestions. */
  columnWastedBytes: "Est Savings",
  /** Label for a column in a data table; entries will be the number of milliseconds the user could reduce page load by if they implemented the suggestions. */
  columnWastedMs: "Est Savings",
  /** Label for a table column that displays how much time each row spent blocking other work on the main thread, entries will be the number of milliseconds spent. */
  columnBlockingTime: "Main-Thread Blocking Time",
  /** Label for a column in a data table; entries will be the number of milliseconds spent during a particular activity. */
  columnTimeSpent: "Time Spent",
  /** Label for a column in a data table; entries will be the location of a specific line of code in a file, in the format "line: 102". */
  columnLocation: "Location",
  /** Label for a column in a data table; entries will be types of resources loaded over the network, e.g. "Scripts", "Third-Party", "Stylesheet". */
  columnResourceType: "Resource Type",
  /** Label for a column in a data table; entries will be the number of network requests done by a webpage. */
  columnRequests: "Requests",
  /** Label for a column in a data table; entries will be the names of arbitrary objects, e.g. the name of a Javascript library, or the name of a user defined timing event. */
  columnName: "Name",
  /** Label for a column in a data table; entries will be the locations of JavaScript or CSS code, e.g. the name of a Javascript package or module. */
  columnSource: "Source",
  /** Label for a column in a data table; entries will be a representation of a DOM element. */
  columnElement: "Element",
  /** Label for a column in a data table; entries will be the number of milliseconds since the page started loading. */
  columnStartTime: "Start Time",
  /** Label for a column in a data table; entries will be the total number of milliseconds from the start time until the end time. */
  columnDuration: "Duration",
  /** Label for a column in a data table; entries will be a representation of a DOM element that did not meet certain suggestions. */
  columnFailingElem: "Failing Elements",
  /** Label for a column in a data table; entries will be a description of the table item. */
  columnDescription: "Description",
  /** Label for a row in a data table; the row represents the total number of something. */
  total: "Total",
  /** Label for a row in a data table; entries will be the total number and byte size of all resources loaded by a web page. */
  totalResourceType: "Total",
  /** Label for a row in a data table; entries will be the total number and byte size of all 'Document' resources loaded by a web page. */
  documentResourceType: "Document",
  /** Label for a row in a data table; entries will be the total number and byte size of all 'Script' resources loaded by a web page. 'Script' refers to JavaScript or other files that are executable by a browser. */
  scriptResourceType: "Script",
  /** Label for a row in a data table; entries will be the total number and byte size of all 'Stylesheet' resources loaded by a web page. 'Stylesheet' refers to CSS stylesheets. */
  stylesheetResourceType: "Stylesheet",
  /** Label for a row in a data table; entries will be the total number and byte size of all 'Image' resources loaded by a web page. */
  imageResourceType: "Image",
  /** Label for a row in a data table; entries will be the total number and byte size of all 'Media' resources loaded by a web page. 'Media' refers to audio and video files. */
  mediaResourceType: "Media",
  /** Label for a row in a data table; entries will be the total number and byte size of all 'Font' resources loaded by a web page. */
  fontResourceType: "Font",
  /** Label for a row in a data table; entries will be the total number and byte size of all resources loaded by a web page that don't fit into the categories of Document, Script, Stylesheet, Image, Media, & Font.*/
  otherResourceType: "Other",
  /** Label for a row in a data table; entries will be the total number and byte size of all third-party resources loaded by a web page. 'Third-party resources are items loaded from URLs that aren't controlled by the owner of the web page. */
  thirdPartyResourceType: "Third-party",
  /** Label used to identify a value in a table where many individual values are aggregated to a single value, for brevity. "Other resources" could also be read as "the rest of the resources". Resource refers to network resources requested by the browser. */
  otherResourcesLabel: "Other resources",
  /** The name of the metric that marks the time at which the first text or image is painted by the browser. Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  firstContentfulPaintMetric: "First Contentful Paint",
  /** The name of the metric that marks the time at which the page is fully loaded and is able to quickly respond to user input (clicks, taps, and keypresses feel responsive). Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  interactiveMetric: "Time to Interactive",
  /** The name of the metric that marks the time at which a majority of the content has been painted by the browser. Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  firstMeaningfulPaintMetric: "First Meaningful Paint",
  /** The name of a metric that calculates the total duration of blocking time for a web page. Blocking times are time periods when the page would be blocked (prevented) from responding to user input (clicks, taps, and keypresses will feel slow to respond). Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  totalBlockingTimeMetric: "Total Blocking Time",
  /** The name of the metric "Maximum Potential First Input Delay" that marks the maximum estimated time between the page receiving input (a user clicking, tapping, or typing) and the page responding. Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  maxPotentialFIDMetric: "Max Potential First Input Delay",
  /** The name of the metric that summarizes how quickly the page looked visually complete. The name of this metric is largely abstract and can be loosely translated. Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  speedIndexMetric: "Speed Index",
  /** The name of the metric that marks the time at which the largest text or image is painted by the browser. Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  largestContentfulPaintMetric: "Largest Contentful Paint",
  /** The name of the metric "Cumulative Layout Shift" that indicates how much the page changes its layout while it loads. If big segments of the page shift their location during load, the Cumulative Layout Shift will be higher. Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  cumulativeLayoutShiftMetric: "Cumulative Layout Shift",
  /** The name of the "Interaction to Next Paint" metric that measures the time between a user interaction and when the browser displays a response on screen. Shown to users as the label for the numeric metric value. Ideally fits within a ~40 character limit. */
  interactionToNextPaint: "Interaction to Next Paint",
  /** Table item value for the severity of a small, or low impact vulnerability. Part of a ranking scale in the form: low, medium, high. */
  itemSeverityLow: "Low",
  /** Table item value for the severity of a vulnerability. Part of a ranking scale in the form: low, medium, high. */
  itemSeverityMedium: "Medium",
  /** Table item value for the severity of a high impact, or dangerous vulnerability. Part of a ranking scale in the form: low, medium, high. */
  itemSeverityHigh: "High"
};
function createIcuMessageFn(filename, fileStrings = {}) {
  if (filename.startsWith("file://")) filename = url2.fileURLToPath(filename);
  if (path3.isAbsolute(filename)) filename = path3.relative(LH_ROOT, filename);
  const mergedStrings = { ...UIStrings, ...fileStrings };
  const getIcuMessageFn = /* @__PURE__ */ __name((message, values) => {
    const keyname = Object.keys(mergedStrings).find((key) => mergedStrings[key] === message);
    if (!keyname) throw new Error(`Could not locate: ${message}`);
    const filenameToLookup = keyname in fileStrings ? filename : path3.relative(LH_ROOT, getModulePath(import.meta));
    const unixStyleFilename = filenameToLookup.replace(/\\/g, "/");
    const i18nId = `${unixStyleFilename} | ${keyname}`;
    return {
      i18nId,
      values,
      formattedDefault: formatMessage(message, values, DEFAULT_LOCALE)
    };
  }, "getIcuMessageFn");
  return getIcuMessageFn;
}
__name(createIcuMessageFn, "createIcuMessageFn");

// node_modules/lighthouse/core/lib/lh-error.js
var UIStrings2 = {
  /**
   * @description Error message explaining that the Lighthouse run was not able to collect screenshots through Chrome.
   * @example {NO_SPEEDLINE_FRAMES} errorCode
   * */
  didntCollectScreenshots: `Chrome didn't collect any screenshots during the page load. Please make sure there is content visible on the page, and then try re-running Lighthouse. ({errorCode})`,
  /**
   * @description Error message explaining that the performance trace was not able to be recorded for the Lighthouse run.
   * @example {NO_TRACING_STARTED} errorCode
   * */
  badTraceRecording: "Something went wrong with recording the trace over your page load. Please run Lighthouse again. ({errorCode})",
  /**
   * @description Error message explaining that the First Contentful Paint metric was not seen during the page load.
   * @example {NO_FCP} errorCode
   * */
  noFcp: "The page did not paint any content. Please ensure you keep the browser window in the foreground during the load and try again. ({errorCode})",
  /**
   * @description Error message explaining that the Largest Contentful Paint metric was not seen during the page load.
   * @example {NO_LCP} errorCode
   * */
  noLcp: "The page did not display content that qualifies as a Largest Contentful Paint (LCP). Ensure the page has a valid LCP element and then try again. ({errorCode})",
  /**
   * @description Error message explaining that the page loaded too slowly to perform a Lighthouse run.
   * @example {NO_TTI_CPU_IDLE_PERIOD} errorCode
   * */
  pageLoadTookTooLong: "Your page took too long to load. Please follow the opportunities in the report to reduce your page load time, and then try re-running Lighthouse. ({errorCode})",
  /** Error message explaining that Lighthouse could not load the requested URL and the steps that might be taken to fix the unreliability. */
  pageLoadFailed: "Lighthouse was unable to reliably load the page you requested. Make sure you are testing the correct URL and that the server is properly responding to all requests.",
  /**
   * @description Error message explaining that Lighthouse could not load the requested URL and the steps that might be taken to fix the unreliability.
   * @example {404} statusCode
   * */
  pageLoadFailedWithStatusCode: "Lighthouse was unable to reliably load the page you requested. Make sure you are testing the correct URL and that the server is properly responding to all requests. (Status code: {statusCode})",
  /**
   * @description Error message explaining that Lighthouse could not load the requested URL and the steps that might be taken to fix the unreliability.
   * @example {FAILED_DOCUMENT_REQUEST} errorDetails
   * */
  pageLoadFailedWithDetails: "Lighthouse was unable to reliably load the page you requested. Make sure you are testing the correct URL and that the server is properly responding to all requests. (Details: {errorDetails})",
  /**
   * @description Error message explaining that the security certificate of the page Lighthouse observed was invalid, so the URL cannot be accessed. securityMessages will be replaced with one or more strings from the browser explaining what was insecure about the page load.
   * @example {net::ERR_CERT_DATE_INVALID} securityMessages
   * */
  pageLoadFailedInsecure: "The URL you have provided does not have a valid security certificate. {securityMessages}",
  /** Error message explaining that Chrome prevented the page from loading and displayed an interstitial screen instead, so the URL cannot be accessed. */
  pageLoadFailedInterstitial: "Chrome prevented page load with an interstitial. Make sure you are testing the correct URL and that the server is properly responding to all requests.",
  /** Error message explaining that Chrome has encountered an error during the Lighthouse run, and that Chrome should be restarted. */
  internalChromeError: "An internal Chrome error occurred. Please restart Chrome and try re-running Lighthouse.",
  /** Error message explaining that fetching the resources of the webpage has taken longer than the maximum time. */
  requestContentTimeout: "Fetching resource content has exceeded the allotted time",
  /**
   * @description Error message explaining that the webpage is non-HTML, so audits are ill-defined.
   * @example {application/xml} mimeType
   * */
  notHtml: "The page provided is not HTML (served as MIME type {mimeType}).",
  /** Error message explaining that the provided URL Lighthouse points to is not valid, and cannot be loaded. */
  urlInvalid: "The URL you have provided appears to be invalid.",
  /**
   * @description Error message explaining that the Chrome Devtools protocol has exceeded the maximum timeout allowed.
   * @example {Network.enable} protocolMethod
   * */
  protocolTimeout: "Waiting for DevTools protocol response has exceeded the allotted time. (Method: {protocolMethod})",
  /** Error message explaining that the requested page could not be resolved by the DNS server. */
  dnsFailure: "DNS servers could not resolve the provided domain.",
  /** Error message explaining that Lighthouse couldn't complete because the page has stopped responding to its instructions. */
  pageLoadFailedHung: "Lighthouse was unable to reliably load the URL you requested because the page stopped responding.",
  /** Error message explaining that Lighthouse timed out while waiting for the initial connection to the Chrome Devtools protocol. */
  criTimeout: "Timeout waiting for initial Debugger Protocol connection.",
  /**
   * @description Error message explaining that a resource that was required for testing was never collected. "artifactName" will be replaced with the name of the resource that wasn't collected.
   * @example {MainDocumentContent} artifactName
   * */
  missingRequiredArtifact: "Required {artifactName} gatherer did not run.",
  /**
   * @description Error message explaining that there was an error while trying to collect a resource that was required for testing. "artifactName" will be replaced with the name of the resource that wasn't collected; "errorMessage" will be replaced with a string description of the error that occurred.
   * @example {MainDocumentContent} artifactName
   * @example {Could not find main document} errorMessage
   * */
  erroredRequiredArtifact: "Required {artifactName} gatherer encountered an error: {errorMessage}",
  /**
   * @description Error message explaining that a feature is unavailable due to an old version of Chrome. "featureName" will be replaced by the name of the feature which is not supported.
   * @example {Largest Contentful Paint} featureName
   * */
  oldChromeDoesNotSupportFeature: "This version of Chrome is too old to support '{featureName}'. Use a newer version to see full results.",
  /** Error message explaining that the browser tab that Lighthouse is inspecting has crashed. */
  targetCrashed: "Browser tab has unexpectedly crashed."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var LHERROR_SENTINEL = "__LighthouseErrorSentinel";
var ERROR_SENTINEL = "__ErrorSentinel";
var LighthouseError = class _LighthouseError extends Error {
  static {
    __name(this, "LighthouseError");
  }
  /**
   * @param {LighthouseErrorDefinition} errorDefinition
   * @param {Record<string, string|undefined>=} properties
   * @param {LHErrorOptions=} options
   */
  constructor(errorDefinition, properties, options) {
    super(errorDefinition.code, options);
    this.name = "LighthouseError";
    this.code = errorDefinition.code;
    this.friendlyMessage = str_(errorDefinition.message, { errorCode: this.code, ...properties });
    this.lhrRuntimeError = !!errorDefinition.lhrRuntimeError;
    if (properties) Object.assign(this, properties);
    Error.captureStackTrace(this, _LighthouseError);
  }
  /**
   * @param {string} method
   * @param {{message: string, data?: string|undefined}} protocolError
   * @return {Error|LighthouseError}
   */
  static fromProtocolMessage(method, protocolError) {
    const matchedErrorDefinition = Object.values(_LighthouseError.errors).filter((e) => e.pattern).find((e) => e.pattern && e.pattern.test(protocolError.message));
    if (matchedErrorDefinition) {
      return new _LighthouseError(matchedErrorDefinition);
    }
    let errMsg = `(${method}): ${protocolError.message}`;
    if (protocolError.data) errMsg += ` (${protocolError.data})`;
    const error = new Error(`Protocol error ${errMsg}`);
    return Object.assign(error, { protocolMethod: method, protocolError: protocolError.message });
  }
  /**
   * A JSON.stringify replacer to serialize LighthouseErrors and (as a fallback) Errors.
   * Returns a simplified version of the error object that can be reconstituted
   * as a copy of the original error at parse time.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter
   * @param {Error|LighthouseError} err
   * @return {SerializedBaseError|SerializedLighthouseError}
   */
  static stringifyReplacer(err) {
    if (err instanceof _LighthouseError) {
      const { name, code, message, friendlyMessage, lhrRuntimeError, stack, cause, ...properties } = err;
      return {
        sentinel: LHERROR_SENTINEL,
        code,
        stack,
        cause,
        properties: (
          /** @type {{ [p: string]: string | undefined }} */
          properties
        )
      };
    }
    if (err instanceof Error) {
      const { message, stack, cause } = err;
      const code = err.code;
      return {
        sentinel: ERROR_SENTINEL,
        message,
        code,
        stack,
        cause
      };
    }
    throw new Error("Invalid value for LighthouseError stringification");
  }
  /**
   * A JSON.parse reviver. If any value passed in is a serialized Error or
   * LighthouseError, the error is recreated as the original object. Otherwise, the
   * value is passed through unchanged.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
   * @param {string} key
   * @param {any} possibleError
   * @return {any}
   */
  static parseReviver(key, possibleError) {
    if (typeof possibleError === "object" && possibleError !== null) {
      if (possibleError.sentinel === LHERROR_SENTINEL) {
        const { code, stack, cause, properties } = (
          /** @type {SerializedLighthouseError} */
          possibleError
        );
        const errorDefinition = _LighthouseError.errors[
          /** @type {keyof typeof ERRORS} */
          code
        ];
        const lhError = new _LighthouseError(errorDefinition, properties, { cause });
        lhError.stack = stack;
        return lhError;
      }
      if (possibleError.sentinel === ERROR_SENTINEL) {
        const { message, code, stack, cause } = (
          /** @type {SerializedBaseError} */
          possibleError
        );
        const opts = cause ? { cause } : void 0;
        const error = new Error(message, opts);
        Object.assign(error, { code, stack });
        return error;
      }
    }
    return possibleError;
  }
};
var ERRORS = {
  // Screenshot/speedline errors
  NO_SPEEDLINE_FRAMES: {
    code: "NO_SPEEDLINE_FRAMES",
    message: UIStrings2.didntCollectScreenshots,
    lhrRuntimeError: true
  },
  SPEEDINDEX_OF_ZERO: {
    code: "SPEEDINDEX_OF_ZERO",
    message: UIStrings2.didntCollectScreenshots,
    lhrRuntimeError: true
  },
  NO_SCREENSHOTS: {
    code: "NO_SCREENSHOTS",
    message: UIStrings2.didntCollectScreenshots,
    lhrRuntimeError: true
  },
  INVALID_SPEEDLINE: {
    code: "INVALID_SPEEDLINE",
    message: UIStrings2.didntCollectScreenshots,
    lhrRuntimeError: true
  },
  // Trace parsing errors
  NO_TRACING_STARTED: {
    code: "NO_TRACING_STARTED",
    message: UIStrings2.badTraceRecording,
    lhrRuntimeError: true
  },
  NO_RESOURCE_REQUEST: {
    code: "NO_RESOURCE_REQUEST",
    message: UIStrings2.badTraceRecording,
    lhrRuntimeError: true
  },
  NO_NAVSTART: {
    code: "NO_NAVSTART",
    message: UIStrings2.badTraceRecording,
    lhrRuntimeError: true
  },
  NO_FCP: {
    code: "NO_FCP",
    message: UIStrings2.noFcp,
    lhrRuntimeError: true
  },
  NO_DCL: {
    code: "NO_DCL",
    message: UIStrings2.badTraceRecording,
    lhrRuntimeError: true
  },
  NO_FMP: {
    code: "NO_FMP",
    message: UIStrings2.badTraceRecording
  },
  NO_LCP: {
    code: "NO_LCP",
    message: UIStrings2.noLcp
  },
  NO_LCP_ALL_FRAMES: {
    code: "NO_LCP_ALL_FRAMES",
    message: UIStrings2.noLcp
  },
  UNSUPPORTED_OLD_CHROME: {
    code: "UNSUPPORTED_OLD_CHROME",
    message: UIStrings2.oldChromeDoesNotSupportFeature
  },
  // TTI calculation failures
  NO_TTI_CPU_IDLE_PERIOD: { code: "NO_TTI_CPU_IDLE_PERIOD", message: UIStrings2.pageLoadTookTooLong },
  NO_TTI_NETWORK_IDLE_PERIOD: {
    code: "NO_TTI_NETWORK_IDLE_PERIOD",
    message: UIStrings2.pageLoadTookTooLong
  },
  // Page load failures
  NO_DOCUMENT_REQUEST: {
    code: "NO_DOCUMENT_REQUEST",
    message: UIStrings2.pageLoadFailed,
    lhrRuntimeError: true
  },
  /* Used when DevTools reports loading failed. Usually an internal (Chrome) issue.
   * Requries an additional `errorDetails` field for translation.
   */
  FAILED_DOCUMENT_REQUEST: {
    code: "FAILED_DOCUMENT_REQUEST",
    message: UIStrings2.pageLoadFailedWithDetails,
    lhrRuntimeError: true
  },
  /* Used when status code is 4xx or 5xx.
   * Requires an additional `statusCode` field for translation.
   */
  ERRORED_DOCUMENT_REQUEST: {
    code: "ERRORED_DOCUMENT_REQUEST",
    message: UIStrings2.pageLoadFailedWithStatusCode,
    lhrRuntimeError: true
  },
  /* Used when security error prevents page load.
   * Requires an additional `securityMessages` field for translation.
   */
  INSECURE_DOCUMENT_REQUEST: {
    code: "INSECURE_DOCUMENT_REQUEST",
    message: UIStrings2.pageLoadFailedInsecure,
    lhrRuntimeError: true
  },
  /* Used when any Chrome interstitial error prevents page load.
   */
  CHROME_INTERSTITIAL_ERROR: {
    code: "CHROME_INTERSTITIAL_ERROR",
    message: UIStrings2.pageLoadFailedInterstitial,
    lhrRuntimeError: true
  },
  /* Used when the page stopped responding and did not finish loading. */
  PAGE_HUNG: {
    code: "PAGE_HUNG",
    message: UIStrings2.pageLoadFailedHung,
    lhrRuntimeError: true
  },
  /* Used when the page is non-HTML. */
  NOT_HTML: {
    code: "NOT_HTML",
    message: UIStrings2.notHtml,
    lhrRuntimeError: true
  },
  // Protocol internal failures
  TRACING_ALREADY_STARTED: {
    code: "TRACING_ALREADY_STARTED",
    message: UIStrings2.internalChromeError,
    pattern: /Tracing.*started/,
    lhrRuntimeError: true
  },
  PARSING_PROBLEM: {
    code: "PARSING_PROBLEM",
    message: UIStrings2.internalChromeError,
    pattern: /Parsing problem/,
    lhrRuntimeError: true
  },
  READ_FAILED: {
    code: "READ_FAILED",
    message: UIStrings2.internalChromeError,
    pattern: /Read failed/,
    lhrRuntimeError: true
  },
  // URL parsing failures
  INVALID_URL: {
    code: "INVALID_URL",
    message: UIStrings2.urlInvalid
  },
  /* Protocol timeout failures
   * Requires an additional `protocolMethod` field for translation.
   */
  PROTOCOL_TIMEOUT: {
    code: "PROTOCOL_TIMEOUT",
    message: UIStrings2.protocolTimeout,
    lhrRuntimeError: true
  },
  // DNS failure on main document (no resolution, timed out, etc)
  DNS_FAILURE: {
    code: "DNS_FAILURE",
    message: UIStrings2.dnsFailure,
    lhrRuntimeError: true
  },
  /** A timeout in the initial connection to the debugger protocol. */
  CRI_TIMEOUT: {
    code: "CRI_TIMEOUT",
    message: UIStrings2.criTimeout,
    lhrRuntimeError: true
  },
  /**
   * Error internal to Runner used when an artifact required for an audit is missing.
   * Requires an additional `artifactName` field for translation.
  */
  MISSING_REQUIRED_ARTIFACT: {
    code: "MISSING_REQUIRED_ARTIFACT",
    message: UIStrings2.missingRequiredArtifact
  },
  /**
   * Error internal to Runner used when an artifact required for an audit was an error.
   * Requires additional `artifactName` and `errorMessage` fields for translation.
  */
  ERRORED_REQUIRED_ARTIFACT: {
    code: "ERRORED_REQUIRED_ARTIFACT",
    message: UIStrings2.erroredRequiredArtifact
  },
  /** The page has crashed and will no longer respond to 99% of CDP commmands. */
  TARGET_CRASHED: {
    code: "TARGET_CRASHED",
    message: UIStrings2.targetCrashed,
    lhrRuntimeError: true
  }
  // Hey! When adding a new error type, update lighthouse-result.proto too.
  // Only necessary for runtime errors, which come from artifacts or pageLoadErrors.
};
LighthouseError.errors = ERRORS;
LighthouseError.NO_ERROR = "NO_ERROR";
LighthouseError.UNKNOWN_ERROR = "UNKNOWN_ERROR";

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
  static getEntityFromUrl(url3, entities) {
    if (!entities) {
      return _Util.getPseudoRootDomain(url3);
    }
    const entity = entities.find((e) => e.origins.find((origin) => url3.startsWith(origin)));
    return entity || _Util.getPseudoRootDomain(url3);
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
  static getChromeExtensionOrigin(url3) {
    const parsedUrl = new URL(url3);
    return parsedUrl.protocol + "//" + parsedUrl.host;
  }
  /**
   * Split a URL into a file, hostname and origin for easy display.
   * @param {string} url
   * @return {{file: string, hostname: string, origin: string}}
   */
  static parseURL(url3) {
    const parsedUrl = new URL(url3);
    return {
      file: _Util.getURLDisplayName(parsedUrl),
      hostname: parsedUrl.hostname,
      // Node's URL parsing behavior is different than Chrome and returns 'null'
      // for chrome-extension:// URLs. See https://github.com/nodejs/node/issues/21955.
      origin: parsedUrl.protocol === "chrome-extension:" ? _Util.getChromeExtensionOrigin(url3) : parsedUrl.origin
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
  static getPseudoRootDomain(url3) {
    const hostname = _Util.createOrReturnURL(url3).hostname;
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
function getElementsInDocument(selector) {
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
__name(getElementsInDocument, "getElementsInDocument");
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
  const path4 = [];
  while (currentNode && getNodeParent(currentNode)) {
    const index = getNodeIndex(currentNode);
    path4.push([index, currentNode.nodeName]);
    currentNode = getNodeParent(currentNode);
  }
  path4.reverse();
  return path4.join(",");
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
__name(getNodeDetails, "getNodeDetails");
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

// node_modules/lighthouse/core/gather/driver/wait-for-condition.js
function waitForFrameNavigated(session) {
  let cancel = /* @__PURE__ */ __name(() => {
    throw new Error("waitForFrameNavigated.cancel() called before it was defined");
  }, "cancel");
  const promise = new Promise((resolve, reject) => {
    session.once("Page.frameNavigated", resolve);
    cancel = /* @__PURE__ */ __name(() => {
      session.off("Page.frameNavigated", resolve);
      reject(new Error("Wait for navigated cancelled"));
    }, "cancel");
  });
  return { promise, cancel };
}
__name(waitForFrameNavigated, "waitForFrameNavigated");
function waitForLoadEvent(session, pauseAfterLoadMs) {
  let cancel = /* @__PURE__ */ __name(() => {
    throw new Error("waitForLoadEvent.cancel() called before it was defined");
  }, "cancel");
  const promise = new Promise((resolve, reject) => {
    let loadTimeout;
    const loadListener = /* @__PURE__ */ __name(function() {
      loadTimeout = setTimeout(resolve, pauseAfterLoadMs);
    }, "loadListener");
    session.once("Page.loadEventFired", loadListener);
    let canceled = false;
    cancel = /* @__PURE__ */ __name(() => {
      if (canceled) return;
      canceled = true;
      session.off("Page.loadEventFired", loadListener);
      loadTimeout && clearTimeout(loadTimeout);
    }, "cancel");
  });
  return {
    promise,
    cancel
  };
}
__name(waitForLoadEvent, "waitForLoadEvent");

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

// node_modules/lighthouse/core/gather/gatherers/bf-cache-failures.js
var AFTER_RETURN_TIMEOUT = 100;
var TEMP_PAGE_PAUSE_TIMEOUT = 100;
var BFCacheFailures = class _BFCacheFailures extends base_gatherer_default {
  static {
    __name(this, "BFCacheFailures");
  }
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["navigation", "timespan"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  /**
   * @param {LH.Crdp.Page.BackForwardCacheNotRestoredExplanation[]} errorList
   * @return {LH.Artifacts.BFCacheFailure}
   */
  static processBFCacheEventList(errorList) {
    const notRestoredReasonsTree = {
      Circumstantial: {},
      PageSupportNeeded: {},
      SupportPending: {}
    };
    for (const err of errorList) {
      const bfCacheErrorsMap = notRestoredReasonsTree[err.type];
      bfCacheErrorsMap[err.reason] = [];
    }
    return { notRestoredReasonsTree };
  }
  /**
   * @param {LH.Crdp.Page.BackForwardCacheNotRestoredExplanationTree} errorTree
   * @return {LH.Artifacts.BFCacheFailure}
   */
  static processBFCacheEventTree(errorTree) {
    const notRestoredReasonsTree = {
      Circumstantial: {},
      PageSupportNeeded: {},
      SupportPending: {}
    };
    function traverse(node) {
      for (const error of node.explanations) {
        const bfCacheErrorsMap = notRestoredReasonsTree[error.type];
        const frameUrls = bfCacheErrorsMap[error.reason] || [];
        frameUrls.push(node.url);
        bfCacheErrorsMap[error.reason] = frameUrls;
      }
      for (const child of node.children) {
        traverse(child);
      }
    }
    __name(traverse, "traverse");
    traverse(errorTree);
    return { notRestoredReasonsTree };
  }
  /**
   * @param {LH.Crdp.Page.BackForwardCacheNotUsedEvent|undefined} event
   * @return {LH.Artifacts.BFCacheFailure}
   */
  static processBFCacheEvent(event) {
    if (event?.notRestoredExplanationsTree) {
      return _BFCacheFailures.processBFCacheEventTree(event.notRestoredExplanationsTree);
    }
    return _BFCacheFailures.processBFCacheEventList(event?.notRestoredExplanations || []);
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Crdp.Page.BackForwardCacheNotUsedEvent|undefined>}
   */
  async activelyCollectBFCacheEvent(context) {
    const session = context.driver.defaultSession;
    let bfCacheEvent = void 0;
    function onBfCacheNotUsed(event) {
      bfCacheEvent = event;
    }
    __name(onBfCacheNotUsed, "onBfCacheNotUsed");
    session.on("Page.backForwardCacheNotUsed", onBfCacheNotUsed);
    const history = await session.sendCommand("Page.getNavigationHistory");
    const entry = history.entries[history.currentIndex];
    await Promise.all([
      session.sendCommand("Page.navigate", { url: "chrome://terms" }),
      // DevTools e2e tests can sometimes fail on the next command if we progress too fast.
      // The only reliable way to prevent this is to wait for an arbitrary period of time after load.
      waitForLoadEvent(session, TEMP_PAGE_PAUSE_TIMEOUT).promise
    ]);
    const [, frameNavigatedEvent] = await Promise.all([
      session.sendCommand("Page.navigateToHistoryEntry", { entryId: entry.id }),
      waitForFrameNavigated(session).promise
    ]);
    await new Promise((resolve) => setTimeout(resolve, AFTER_RETURN_TIMEOUT));
    if (frameNavigatedEvent.type !== "BackForwardCacheRestore" && !bfCacheEvent) {
      throw new Error("bfcache failed but the failure reasons were not emitted in time");
    }
    session.off("Page.backForwardCacheNotUsed", onBfCacheNotUsed);
    return bfCacheEvent;
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {LH.Crdp.Page.BackForwardCacheNotUsedEvent[]}
   */
  passivelyCollectBFCacheEvents(context) {
    const events = [];
    for (const event of context.dependencies.DevtoolsLog) {
      if (event.method === "Page.backForwardCacheNotUsed") {
        events.push(event.params);
      }
    }
    return events;
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {Promise<LH.Artifacts['BFCacheFailures']>}
   */
  async getArtifact(context) {
    const events = this.passivelyCollectBFCacheEvents(context);
    if (context.gatherMode === "navigation" && !context.settings.usePassiveGathering) {
      const activelyCollectedEvent = await this.activelyCollectBFCacheEvent(context);
      if (activelyCollectedEvent) events.push(activelyCollectedEvent);
    }
    return events.map(_BFCacheFailures.processBFCacheEvent);
  }
};
var bf_cache_failures_default = BFCacheFailures;
export {
  bf_cache_failures_default as default
};
/*! Bundled license information:

lighthouse/types/lh.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/base-gatherer.js:
lighthouse/shared/esm-utils.js:
lighthouse/shared/localization/format.js:
lighthouse/shared/root.js:
lighthouse/core/gather/gatherers/devtools-log.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse-logger/index.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/shared/type-verifiers.js:
lighthouse/core/gather/driver/execution-context.js:
lighthouse/core/gather/driver/wait-for-condition.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/shared/localization/locales.js:
lighthouse/core/lib/i18n/i18n.js:
lighthouse/core/lib/lh-error.js:
lighthouse/core/lib/page-functions.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/shared/statistics.js:
lighthouse/shared/util.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/bf-cache-failures.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
