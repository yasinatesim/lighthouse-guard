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
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var lighthouse_logger_default = Log;

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

// node_modules/lighthouse/core/gather/gatherers/seo/font-size.js
function findMostSpecificMatchedCSSRule(matchedCSSRules = [], isDeclarationOfInterest) {
  let mostSpecificRule;
  for (let i = matchedCSSRules.length - 1; i >= 0; i--) {
    if (isDeclarationOfInterest(matchedCSSRules[i].rule.style)) {
      mostSpecificRule = matchedCSSRules[i].rule;
      break;
    }
  }
  if (mostSpecificRule) {
    return {
      type: "Regular",
      ...mostSpecificRule.style,
      parentRule: {
        origin: mostSpecificRule.origin,
        selectors: mostSpecificRule.selectorList.selectors
      }
    };
  }
}
__name(findMostSpecificMatchedCSSRule, "findMostSpecificMatchedCSSRule");

// node_modules/lighthouse/core/gather/gatherers/image-elements.js
function getClientRect(element) {
  const clientRect = element.getBoundingClientRect();
  return {
    // Just grab the DOMRect properties we want, excluding x/y/width/height
    top: clientRect.top,
    bottom: clientRect.bottom,
    left: clientRect.left,
    right: clientRect.right
  };
}
__name(getClientRect, "getClientRect");
function getPosition(element, computedStyle) {
  if (element.parentElement && element.parentElement.tagName === "PICTURE") {
    const parentStyle = window.getComputedStyle(element.parentElement);
    return parentStyle.getPropertyValue("position");
  }
  return computedStyle.getPropertyValue("position");
}
__name(getPosition, "getPosition");
function getHTMLImages(allElements) {
  const allImageElements = (
    /** @type {Array<HTMLImageElement>} */
    allElements.filter((element) => {
      return element.localName === "img";
    })
  );
  return allImageElements.map((element) => {
    const computedStyle = window.getComputedStyle(element);
    const isPicture = !!element.parentElement && element.parentElement.tagName === "PICTURE";
    const canTrustNaturalDimensions = !isPicture && !element.srcset;
    return {
      // currentSrc used over src to get the url as determined by the browser
      // after taking into account srcset/media/sizes/etc.
      src: element.currentSrc,
      srcset: element.srcset,
      displayedWidth: element.width,
      displayedHeight: element.height,
      clientRect: getClientRect(element),
      attributeWidth: element.getAttribute("width"),
      attributeHeight: element.getAttribute("height"),
      naturalDimensions: canTrustNaturalDimensions ? { width: element.naturalWidth, height: element.naturalHeight } : void 0,
      cssRules: void 0,
      // this will get overwritten below
      computedStyles: {
        position: getPosition(element, computedStyle),
        objectFit: computedStyle.getPropertyValue("object-fit"),
        imageRendering: computedStyle.getPropertyValue("image-rendering")
      },
      isCss: false,
      isPicture,
      loading: element.loading,
      isInShadowDOM: element.getRootNode() instanceof ShadowRoot,
      fetchPriority: element.fetchPriority,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(element)
    };
  });
}
__name(getHTMLImages, "getHTMLImages");
function getCSSImages(allElements) {
  const CSS_URL_REGEX = /^url\("([^"]+)"\)$/;
  const images = [];
  for (const element of allElements) {
    const style = window.getComputedStyle(element);
    if (!style.backgroundImage || !CSS_URL_REGEX.test(style.backgroundImage)) continue;
    const imageMatch = style.backgroundImage.match(CSS_URL_REGEX);
    const url = imageMatch[1];
    images.push({
      src: url,
      srcset: "",
      displayedWidth: element.clientWidth,
      displayedHeight: element.clientHeight,
      clientRect: getClientRect(element),
      attributeWidth: null,
      attributeHeight: null,
      naturalDimensions: void 0,
      cssEffectiveRules: void 0,
      computedStyles: {
        position: getPosition(element, style),
        objectFit: "",
        imageRendering: style.getPropertyValue("image-rendering")
      },
      isCss: true,
      isPicture: false,
      isInShadowDOM: element.getRootNode() instanceof ShadowRoot,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(element)
    });
  }
  return images;
}
__name(getCSSImages, "getCSSImages");
function collectImageElementInfo() {
  const allElements = getElementsInDocument();
  return getHTMLImages(allElements).concat(getCSSImages(allElements));
}
__name(collectImageElementInfo, "collectImageElementInfo");
function determineNaturalSize(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("error", (_) => reject(new Error("determineNaturalSize failed img load")));
    img.addEventListener("load", () => {
      resolve({
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      });
    });
    img.src = url;
  });
}
__name(determineNaturalSize, "determineNaturalSize");
function findSizeDeclaration(rule, property) {
  if (!rule || !rule.cssProperties) return;
  const definedProp = rule.cssProperties.find(({ name }) => name === property);
  if (!definedProp) return;
  return definedProp.value;
}
__name(findSizeDeclaration, "findSizeDeclaration");
function findMostSpecificCSSRule(matchedCSSRules, property) {
  const isDeclarationofInterest = /* @__PURE__ */ __name((declaration) => findSizeDeclaration(declaration, property), "isDeclarationofInterest");
  const rule = findMostSpecificMatchedCSSRule(matchedCSSRules, isDeclarationofInterest);
  if (!rule) return;
  return findSizeDeclaration(rule, property);
}
__name(findMostSpecificCSSRule, "findMostSpecificCSSRule");
function getEffectiveSizingRule({ attributesStyle, inlineStyle, matchedCSSRules }, property) {
  const inlineRule = findSizeDeclaration(inlineStyle, property);
  if (inlineRule) return inlineRule;
  const attributeRule = findSizeDeclaration(attributesStyle, property);
  if (attributeRule) return attributeRule;
  const matchedRule = findMostSpecificCSSRule(matchedCSSRules, property);
  if (matchedRule) return matchedRule;
  return null;
}
__name(getEffectiveSizingRule, "getEffectiveSizingRule");
function getPixelArea(element) {
  if (element.naturalDimensions) {
    return element.naturalDimensions.height * element.naturalDimensions.width;
  }
  return element.displayedHeight * element.displayedWidth;
}
__name(getPixelArea, "getPixelArea");
var ImageElements = class extends base_gatherer_default {
  static {
    __name(this, "ImageElements");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "timespan", "navigation"]
  };
  constructor() {
    super();
    this._naturalSizeCache = /* @__PURE__ */ new Map();
  }
  /**
   * @param {LH.Gatherer.Driver} driver
   * @param {LH.Artifacts.ImageElement} element
   */
  async fetchElementWithSizeInformation(driver, element) {
    const url = element.src;
    let size = this._naturalSizeCache.get(url);
    if (!size) {
      try {
        driver.defaultSession.setNextProtocolTimeout(250);
        size = await driver.executionContext.evaluate(determineNaturalSize, {
          args: [url],
          useIsolation: true
        });
        this._naturalSizeCache.set(url, size);
      } catch (_) {
      }
    }
    if (!size) return;
    element.naturalDimensions = { width: size.naturalWidth, height: size.naturalHeight };
  }
  /**
   * Images might be sized via CSS. In order to compute unsized-images failures, we need to collect
   * matched CSS rules to see if this is the case.
   * @url http://go/dwoqq (googlers only)
   * @param {LH.Gatherer.ProtocolSession} session
   * @param {string} devtoolsNodePath
   * @param {LH.Artifacts.ImageElement} element
   */
  async fetchSourceRules(session, devtoolsNodePath, element) {
    try {
      const { nodeId } = await session.sendCommand("DOM.pushNodeByPathToFrontend", {
        path: devtoolsNodePath
      });
      if (!nodeId) return;
      const matchedRules = await session.sendCommand("CSS.getMatchedStylesForNode", {
        nodeId
      });
      const width = getEffectiveSizingRule(matchedRules, "width");
      const height = getEffectiveSizingRule(matchedRules, "height");
      const aspectRatio = getEffectiveSizingRule(matchedRules, "aspect-ratio");
      element.cssEffectiveRules = { width, height, aspectRatio };
    } catch (err) {
      if (/No node.*found/.test(err.message)) return;
      throw err;
    }
  }
  /**
   *
   * @param {LH.Gatherer.Driver} driver
   * @param {LH.Artifacts.ImageElement[]} elements
   */
  async collectExtraDetails(driver, elements) {
    let reachedGatheringBudget = false;
    setTimeout((_) => reachedGatheringBudget = true, 5e3);
    let skippedCount = 0;
    for (const element of elements) {
      if (reachedGatheringBudget) {
        skippedCount++;
        continue;
      }
      if (!element.isInShadowDOM && !element.isCss) {
        await this.fetchSourceRules(driver.defaultSession, element.node.devtoolsNodePath, element);
      }
      if (element.isPicture || element.isCss || element.srcset) {
        await this.fetchElementWithSizeInformation(driver, element);
      }
    }
    if (reachedGatheringBudget) {
      lighthouse_logger_default.warn("ImageElements", `Reached gathering budget of 5s. Skipped extra details for ${skippedCount}/${elements.length}`);
    }
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Artifacts['ImageElements']>}
   */
  async getArtifact(context) {
    const session = context.driver.defaultSession;
    const executionContext = context.driver.executionContext;
    const elements = await executionContext.evaluate(collectImageElementInfo, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getElementsInDocument,
        pageFunctions.getBoundingClientRect,
        pageFunctions.getNodeDetails,
        getClientRect,
        getPosition,
        getHTMLImages,
        getCSSImages
      ]
    });
    await Promise.all([
      session.sendCommand("DOM.enable"),
      session.sendCommand("CSS.enable"),
      session.sendCommand("DOM.getDocument", { depth: -1, pierce: true })
    ]);
    elements.sort((a, b) => getPixelArea(b) - getPixelArea(a));
    await this.collectExtraDetails(context.driver, elements);
    await Promise.all([
      session.sendCommand("DOM.disable"),
      session.sendCommand("CSS.disable")
    ]);
    return elements;
  }
};
var image_elements_default = ImageElements;
export {
  image_elements_default as default
};
/*! Bundled license information:

lighthouse-logger/index.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/types/lh.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/base-gatherer.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/shared/statistics.js:
lighthouse/shared/util.js:
lighthouse/core/gather/gatherers/seo/font-size.js:
lighthouse/core/gather/gatherers/image-elements.js:
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
*/
