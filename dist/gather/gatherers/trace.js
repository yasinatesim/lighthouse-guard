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
var lighthouse_logger_default = Log;

// node_modules/lighthouse/core/lib/tracehouse/trace-processor.js
var ACCEPTABLE_NAVIGATION_URL_REGEX = /^(chrome|https?):/;
var BASE_RESPONSE_LATENCY = 16;
var SCHEDULABLE_TASK_TITLE_LH = "RunTask";
var SCHEDULABLE_TASK_TITLE_ALT1 = "ThreadControllerImpl::RunTask";
var SCHEDULABLE_TASK_TITLE_ALT2 = "ThreadControllerImpl::DoWork";
var SCHEDULABLE_TASK_TITLE_ALT3 = "TaskQueueManager::ProcessTaskFromWorkQueue";
var TraceProcessor = class _TraceProcessor {
  static {
    __name(this, "TraceProcessor");
  }
  static get TIMESPAN_MARKER_ID() {
    return "__lighthouseTimespanStart__";
  }
  /**
   * @return {Error}
   */
  static createNoNavstartError() {
    return new Error("No navigationStart event found");
  }
  /**
   * @return {Error}
   */
  static createNoResourceSendRequestError() {
    return new Error("No ResourceSendRequest event found");
  }
  /**
   * @return {Error}
   */
  static createNoTracingStartedError() {
    return new Error("No tracingStartedInBrowser event found");
  }
  /**
   * @return {Error}
   */
  static createNoFirstContentfulPaintError() {
    return new Error("No FirstContentfulPaint event found");
  }
  /**
   * @return {Error}
   */
  static createNoLighthouseMarkerError() {
    return new Error("No Lighthouse timespan marker event found");
  }
  /**
   * Returns true if the event is a navigation start event of a document whose URL seems valid.
   *
   * @param {LH.TraceEvent} event
   * @return {boolean}
   */
  static _isNavigationStartOfInterest(event) {
    if (event.name !== "navigationStart") return false;
    if (event.args.data?.documentLoaderURL === void 0) return true;
    if (!event.args.data?.documentLoaderURL) return false;
    return ACCEPTABLE_NAVIGATION_URL_REGEX.test(event.args.data.documentLoaderURL);
  }
  /**
   * This method sorts a group of trace events that have the same timestamp. We want to...
   *
   * 1. Put E events first, we finish off our existing events before we start new ones.
   * 2. Order B/X events by their duration, we want parents to start before child events.
   * 3. If we don't have any of this to go on, just use the position in the original array (stable sort).
   *
   * Note that the typical group size with the same timestamp will be quite small (<10 or so events),
   * and the number of groups typically ~1% of total trace, so the same ultra-performance-sensitive consideration
   * given to functions that run on entire traces does not necessarily apply here.
   *
   * @param {number[]} tsGroupIndices
   * @param {number[]} timestampSortedIndices
   * @param {number} indexOfTsGroupIndicesStart
   * @param {LH.TraceEvent[]} traceEvents
   * @return {number[]}
   */
  static _sortTimestampEventGroup(tsGroupIndices, timestampSortedIndices, indexOfTsGroupIndicesStart, traceEvents) {
    const lookupArrayIndexByTsIndex = /* @__PURE__ */ __name((i) => timestampSortedIndices[i], "lookupArrayIndexByTsIndex");
    const lookupEventByTsIndex = /* @__PURE__ */ __name((i) => traceEvents[lookupArrayIndexByTsIndex(i)], "lookupEventByTsIndex");
    const eEventIndices = [];
    const bxEventIndices = [];
    const otherEventIndices = [];
    for (const tsIndex of tsGroupIndices) {
      const arrayIndex = lookupArrayIndexByTsIndex(tsIndex);
      const event = lookupEventByTsIndex(tsIndex);
      if (event.ph === "E") eEventIndices.push(arrayIndex);
      else if (event.ph === "X" || event.ph === "B") bxEventIndices.push(arrayIndex);
      else otherEventIndices.push(arrayIndex);
    }
    const effectiveDuration = /* @__PURE__ */ new Map();
    for (const index of bxEventIndices) {
      const event = traceEvents[index];
      if (event.ph === "X") {
        effectiveDuration.set(index, event.dur);
      } else {
        let duration = Number.MAX_SAFE_INTEGER;
        let additionalNestedEventsWithSameName = 0;
        const startIndex = indexOfTsGroupIndicesStart + tsGroupIndices.length;
        for (let j = startIndex; j < timestampSortedIndices.length; j++) {
          const potentialMatchingEvent = lookupEventByTsIndex(j);
          const eventMatches = potentialMatchingEvent.name === event.name && potentialMatchingEvent.pid === event.pid && potentialMatchingEvent.tid === event.tid;
          if (!eventMatches) continue;
          if (potentialMatchingEvent.ph === "E" && additionalNestedEventsWithSameName === 0) {
            duration = potentialMatchingEvent.ts - event.ts;
            break;
          } else if (potentialMatchingEvent.ph === "E") {
            additionalNestedEventsWithSameName--;
          } else if (potentialMatchingEvent.ph === "B") {
            additionalNestedEventsWithSameName++;
          }
        }
        effectiveDuration.set(index, duration);
      }
    }
    bxEventIndices.sort((indexA, indexB) => (effectiveDuration.get(indexB) || 0) - (effectiveDuration.get(indexA) || 0) || indexA - indexB);
    otherEventIndices.sort((indexA, indexB) => indexA - indexB);
    return [...eEventIndices, ...bxEventIndices, ...otherEventIndices];
  }
  /**
   * Sorts and filters trace events by timestamp and respecting the nesting structure inherent to
   * parent/child event relationships.
   *
   * @param {LH.TraceEvent[]} traceEvents
   * @param {(e: LH.TraceEvent) => boolean} filter
   */
  static filteredTraceSort(traceEvents, filter) {
    const indices = [];
    for (let srcIndex = 0; srcIndex < traceEvents.length; srcIndex++) {
      if (filter(traceEvents[srcIndex])) {
        indices.push(srcIndex);
      }
    }
    indices.sort((indexA, indexB) => traceEvents[indexA].ts - traceEvents[indexB].ts);
    for (let i = 0; i < indices.length - 1; i++) {
      const ts = traceEvents[indices[i]].ts;
      const tsGroupIndices = [i];
      for (let j = i + 1; j < indices.length; j++) {
        if (traceEvents[indices[j]].ts !== ts) break;
        tsGroupIndices.push(j);
      }
      if (tsGroupIndices.length === 1) continue;
      const finalIndexOrder = _TraceProcessor._sortTimestampEventGroup(
        tsGroupIndices,
        indices,
        i,
        traceEvents
      );
      indices.splice(i, finalIndexOrder.length, ...finalIndexOrder);
      i += tsGroupIndices.length - 1;
    }
    const sorted = [];
    for (let i = 0; i < indices.length; i++) {
      sorted.push(traceEvents[indices[i]]);
    }
    return sorted;
  }
  /**
   * There should *always* be at least one top level event, having 0 typically means something is
   * drastically wrong with the trace and we should just give up early and loudly.
   *
   * @param {LH.TraceEvent[]} events
   */
  static assertHasToplevelEvents(events) {
    const hasToplevelTask = events.some(this.isScheduleableTask);
    if (!hasToplevelTask) {
      throw new Error("Could not find any top level events");
    }
  }
  /**
   * Calculate duration at specified percentiles for given population of
   * durations.
   * If one of the durations overlaps the end of the window, the full
   * duration should be in the duration array, but the length not included
   * within the window should be given as `clippedLength`. For instance, if a
   * 50ms duration occurs 10ms before the end of the window, `50` should be in
   * the `durations` array, and `clippedLength` should be set to 40.
   * @see https://docs.google.com/document/d/1b9slyaB9yho91YTOkAQfpCdULFkZM9LqsipcX3t7He8/preview
   * @param {!Array<number>} durations Array of durations, sorted in ascending order.
   * @param {number} totalTime Total time (in ms) of interval containing durations.
   * @param {!Array<number>} percentiles Array of percentiles of interest, in ascending order.
   * @param {number=} clippedLength Optional length clipped from a duration overlapping end of window. Default of 0.
   * @return {!Array<{percentile: number, time: number}>}
   * @private
   */
  static _riskPercentiles(durations, totalTime, percentiles, clippedLength = 0) {
    let busyTime = 0;
    for (let i = 0; i < durations.length; i++) {
      busyTime += durations[i];
    }
    busyTime -= clippedLength;
    let completedTime = totalTime - busyTime;
    let duration = 0;
    let cdfTime = completedTime;
    const results = [];
    let durationIndex = -1;
    let remainingCount = durations.length + 1;
    if (clippedLength > 0) {
      remainingCount--;
    }
    for (const percentile of percentiles) {
      const percentileTime = percentile * totalTime;
      while (cdfTime < percentileTime && durationIndex < durations.length - 1) {
        completedTime += duration;
        remainingCount -= duration < 0 ? -1 : 1;
        if (clippedLength > 0 && clippedLength < durations[durationIndex + 1]) {
          duration = -clippedLength;
          clippedLength = 0;
        } else {
          durationIndex++;
          duration = durations[durationIndex];
        }
        cdfTime = completedTime + Math.abs(duration) * remainingCount;
      }
      results.push({
        percentile,
        time: Math.max(0, (percentileTime - completedTime) / remainingCount) + BASE_RESPONSE_LATENCY
      });
    }
    return results;
  }
  /**
   * Calculates the maximum queueing time (in ms) of high priority tasks for
   * selected percentiles within a window of the main thread.
   * @see https://docs.google.com/document/d/1b9slyaB9yho91YTOkAQfpCdULFkZM9LqsipcX3t7He8/preview
   * @param {Array<ToplevelEvent>} events
   * @param {number} startTime Start time (in ms relative to timeOrigin) of range of interest.
   * @param {number} endTime End time (in ms relative to timeOrigin) of range of interest.
   * @param {!Array<number>=} percentiles Optional array of percentiles to compute. Defaults to [0.5, 0.75, 0.9, 0.99, 1].
   * @return {!Array<{percentile: number, time: number}>}
   */
  static getRiskToResponsiveness(events, startTime, endTime, percentiles = [0.5, 0.75, 0.9, 0.99, 1]) {
    const totalTime = endTime - startTime;
    percentiles.sort((a, b) => a - b);
    const ret = this.getMainThreadTopLevelEventDurations(events, startTime, endTime);
    return this._riskPercentiles(
      ret.durations,
      totalTime,
      percentiles,
      ret.clippedLength
    );
  }
  /**
   * Provides durations in ms of all main thread top-level events
   * @param {Array<ToplevelEvent>} topLevelEvents
   * @param {number} startTime Optional start time (in ms relative to timeOrigin) of range of interest. Defaults to 0.
   * @param {number} endTime Optional end time (in ms relative to timeOrigin) of range of interest. Defaults to trace end.
   * @return {{durations: Array<number>, clippedLength: number}}
   */
  static getMainThreadTopLevelEventDurations(topLevelEvents, startTime = 0, endTime = Infinity) {
    const durations = [];
    let clippedLength = 0;
    for (const event of topLevelEvents) {
      if (event.end < startTime || event.start > endTime) {
        continue;
      }
      let duration = event.duration;
      let eventStart = event.start;
      if (eventStart < startTime) {
        eventStart = startTime;
        duration = event.end - startTime;
      }
      if (event.end > endTime) {
        clippedLength = duration - (endTime - eventStart);
      }
      durations.push(duration);
    }
    durations.sort((a, b) => a - b);
    return {
      durations,
      clippedLength
    };
  }
  /**
   * Provides the top level events on the main thread with timestamps in ms relative to timeOrigin.
   * start.
   * @param {LH.Artifacts.ProcessedTrace} trace
   * @param {number=} startTime Optional start time (in ms relative to timeOrigin) of range of interest. Defaults to 0.
   * @param {number=} endTime Optional end time (in ms relative to timeOrigin) of range of interest. Defaults to trace end.
   * @return {Array<ToplevelEvent>}
   */
  static getMainThreadTopLevelEvents(trace, startTime = 0, endTime = Infinity) {
    const topLevelEvents = [];
    let prevToplevel = void 0;
    for (const event of trace.mainThreadEvents) {
      if (!this.isScheduleableTask(event) || !event.dur) continue;
      const start = (event.ts - trace.timeOriginEvt.ts) / 1e3;
      const end = (event.ts + event.dur - trace.timeOriginEvt.ts) / 1e3;
      if (start > endTime || end < startTime) continue;
      if (prevToplevel && start < prevToplevel.end) {
        prevToplevel.end = start - 1e-3;
      }
      prevToplevel = {
        start,
        end,
        duration: event.dur / 1e3
      };
      topLevelEvents.push(prevToplevel);
    }
    return topLevelEvents;
  }
  /**
   * @param {LH.TraceEvent[]} events
   * @return {{startingPid: number, frameId: string}}
   */
  static findMainFrameIds(events) {
    const startedInBrowserEvt = events.find((e) => e.name === "TracingStartedInBrowser");
    if (startedInBrowserEvt?.args.data?.frames) {
      const mainFrame = startedInBrowserEvt.args.data.frames.find((frame) => !frame.parent);
      const frameId = mainFrame?.frame;
      const pid = mainFrame?.processId;
      if (pid && frameId) {
        return {
          startingPid: pid,
          frameId
        };
      }
    }
    const startedInPageEvt = events.find((e) => e.name === "TracingStartedInPage");
    if (startedInPageEvt?.args?.data) {
      const frameId = startedInPageEvt.args.data.page;
      if (frameId) {
        return {
          startingPid: startedInPageEvt.pid,
          frameId
        };
      }
    }
    const navStartEvt = events.find(
      (e) => this._isNavigationStartOfInterest(e) && e.args.data?.isLoadingMainFrame
    );
    const firstResourceSendEvt = events.find((e) => e.name === "ResourceSendRequest");
    if (navStartEvt?.args?.data && firstResourceSendEvt && firstResourceSendEvt.pid === navStartEvt.pid && firstResourceSendEvt.tid === navStartEvt.tid) {
      const frameId = navStartEvt.args.frame;
      if (frameId) {
        return {
          startingPid: navStartEvt.pid,
          frameId
        };
      }
    }
    throw this.createNoTracingStartedError();
  }
  /**
   * If there were any cross-origin navigations, there'll be more than one pid returned
   * @param {{startingPid: number, frameId: string}} mainFrameInfo
   * @param {LH.TraceEvent[]} keyEvents
   * @return {Map<number, number>} Map where keys are process IDs and their values are thread IDs
   */
  static findMainFramePidTids(mainFrameInfo, keyEvents) {
    const frameProcessEvts = keyEvents.filter(
      (evt) => (
        // ProcessReadyInBrowser is used when a processID isn't available when the FrameCommittedInBrowser trace event is emitted.
        // In that case. FrameCommittedInBrowser has no processId, but a processPseudoId. and the ProcessReadyInBrowser event declares the proper processId.
        (evt.name === "FrameCommittedInBrowser" || evt.name === "ProcessReadyInBrowser") && evt.args?.data?.frame === mainFrameInfo.frameId && evt?.args?.data?.processId
      )
    );
    const mainFramePids = frameProcessEvts.length ? frameProcessEvts.map((e) => e?.args?.data?.processId) : [mainFrameInfo.startingPid];
    const pidToTid = /* @__PURE__ */ new Map();
    for (const pid of new Set(mainFramePids)) {
      const threadEvents = keyEvents.filter(
        (e) => e.cat === "__metadata" && e.pid === pid && e.ph === "M" && e.name === "thread_name"
      );
      let threadNameEvt = threadEvents.find((e) => e.args.name === "CrRendererMain");
      if (!threadNameEvt) {
        threadNameEvt = threadEvents.find((e) => e.args.name === "CrBrowserMain");
      }
      const tid = threadNameEvt?.tid;
      if (!tid) {
        throw new Error("Unable to determine tid for renderer process");
      }
      pidToTid.set(pid, tid);
    }
    return pidToTid;
  }
  /**
   * @param {LH.TraceEvent} evt
   * @return {boolean}
   */
  static isScheduleableTask(evt) {
    return evt.name === SCHEDULABLE_TASK_TITLE_LH || evt.name === SCHEDULABLE_TASK_TITLE_ALT1 || evt.name === SCHEDULABLE_TASK_TITLE_ALT2 || evt.name === SCHEDULABLE_TASK_TITLE_ALT3;
  }
  /**
   * @param {LH.TraceEvent} evt
   * @return {evt is LCPEvent}
   */
  static isLCPEvent(evt) {
    if (evt.name !== "largestContentfulPaint::Invalidate" && evt.name !== "largestContentfulPaint::Candidate") return false;
    return Boolean(evt.args?.frame);
  }
  /**
   * @param {LH.TraceEvent} evt
   * @return {evt is LCPCandidateEvent}
   */
  static isLCPCandidateEvent(evt) {
    return Boolean(
      evt.name === "largestContentfulPaint::Candidate" && evt.args?.frame && evt.args.data && evt.args.data.size !== void 0
    );
  }
  /**
   * The associated frame ID is set in different locations for different trace events.
   * This function checks all known locations for the frame ID and returns `undefined` if it's not found.
   *
   * @param {LH.TraceEvent} evt
   * @return {string|undefined}
   */
  static getFrameId(evt) {
    return evt.args?.data?.frame || evt.args.data?.frameID || evt.args.frame;
  }
  /**
   * Returns the maximum LCP event across all frames in `events`.
   * Sets `invalidated` flag if LCP of every frame is invalidated.
   *
   * LCP's trace event was first introduced in m78. We can't surface an LCP for older Chrome versions.
   * LCP comes from a frame's latest `largestContentfulPaint::Candidate`, but it can be invalidated by a `largestContentfulPaint::Invalidate` event.
   *
   * @param {LH.TraceEvent[]} events
   * @param {LH.TraceEvent} timeOriginEvent
   * @return {{lcp: LCPEvent | undefined, invalidated: boolean}}
   */
  static computeValidLCPAllFrames(events, timeOriginEvent) {
    const lcpEvents = events.filter(this.isLCPEvent).reverse();
    const finalLcpEventsByFrame = /* @__PURE__ */ new Map();
    for (const e of lcpEvents) {
      if (e.ts <= timeOriginEvent.ts) break;
      const frame = e.args.frame;
      if (finalLcpEventsByFrame.has(frame)) continue;
      finalLcpEventsByFrame.set(frame, e);
    }
    let maxLcpAcrossFrames;
    for (const lcp of finalLcpEventsByFrame.values()) {
      if (!this.isLCPCandidateEvent(lcp)) continue;
      if (!maxLcpAcrossFrames || lcp.args.data.size > maxLcpAcrossFrames.args.data.size) {
        maxLcpAcrossFrames = lcp;
      }
    }
    return {
      lcp: maxLcpAcrossFrames,
      // LCP events were found, but final LCP event of every frame was an invalidate event.
      invalidated: Boolean(!maxLcpAcrossFrames && finalLcpEventsByFrame.size)
    };
  }
  /**
   * @param {Array<{id: string, url: string, parent?: string}>} frames
   * @return {Map<string, string>}
   */
  static resolveRootFrames(frames) {
    const parentFrames = /* @__PURE__ */ new Map();
    for (const frame of frames) {
      if (!frame.parent) continue;
      parentFrames.set(frame.id, frame.parent);
    }
    const frameIdToRootFrameId = /* @__PURE__ */ new Map();
    for (const frame of frames) {
      let cur = frame.id;
      while (parentFrames.has(cur)) {
        cur = /** @type {string} */
        parentFrames.get(cur);
      }
      if (cur === void 0) {
        throw new Error("Unexpected undefined frameId");
      }
      frameIdToRootFrameId.set(frame.id, cur);
    }
    return frameIdToRootFrameId;
  }
  /**
   * Finds key trace events, identifies main process/thread, and returns timings of trace events
   * in milliseconds since the time origin in addition to the standard microsecond monotonic timestamps.
   * @param {LH.Trace} trace
   * @param {{timeOriginDeterminationMethod?: TimeOriginDeterminationMethod}} [options]
   * @return {LH.Artifacts.ProcessedTrace}
  */
  static processTrace(trace, options) {
    const { timeOriginDeterminationMethod = "auto" } = options || {};
    const keyEvents = this.filteredTraceSort(trace.traceEvents, (e) => {
      return e.cat.includes("blink.user_timing") || e.cat.includes("loading") || e.cat.includes("devtools.timeline") || e.cat === "__metadata";
    });
    const mainFrameInfo = this.findMainFrameIds(keyEvents);
    const rendererPidToTid = this.findMainFramePidTids(mainFrameInfo, keyEvents);
    const processEvents = _TraceProcessor.filteredTraceSort(trace.traceEvents, (e) => rendererPidToTid.has(e.pid));
    const framesById = /* @__PURE__ */ new Map();
    const tracingStartedFrames = keyEvents.find((e) => e.name === "TracingStartedInBrowser")?.args?.data?.frames;
    if (tracingStartedFrames) {
      for (const frame of tracingStartedFrames) {
        framesById.set(frame.frame, {
          id: frame.frame,
          url: frame.url,
          parent: frame.parent
        });
      }
    }
    keyEvents.filter(
      /** @return {evt is FrameCommittedEvent} */
      (evt) => {
        return Boolean(
          evt.name === "FrameCommittedInBrowser" && evt.args.data?.frame && evt.args.data.url !== void 0
        );
      }
    ).forEach((evt) => {
      framesById.set(evt.args.data.frame, {
        id: evt.args.data.frame,
        url: evt.args.data.url,
        parent: evt.args.data.parent
      });
    });
    const frames = [...framesById.values()];
    const frameIdToRootFrameId = this.resolveRootFrames(frames);
    const inspectedTreeFrameIds = [...frameIdToRootFrameId.entries()].filter(([, rootFrameId]) => rootFrameId === mainFrameInfo.frameId).map(([child]) => child);
    function associatedToMainFrame(e) {
      const frameId = _TraceProcessor.getFrameId(e);
      return frameId === mainFrameInfo.frameId;
    }
    __name(associatedToMainFrame, "associatedToMainFrame");
    function associatedToAllFrames(e) {
      const frameId = _TraceProcessor.getFrameId(e);
      return frameId ? inspectedTreeFrameIds.includes(frameId) : false;
    }
    __name(associatedToAllFrames, "associatedToAllFrames");
    const frameEvents = keyEvents.filter((e) => associatedToMainFrame(e));
    let frameTreeEvents = [];
    if (frameIdToRootFrameId.has(mainFrameInfo.frameId)) {
      frameTreeEvents = keyEvents.filter((e) => associatedToAllFrames(e));
    } else {
      lighthouse_logger_default.warn(
        "TraceProcessor",
        "frameTreeEvents may be incomplete, make sure the trace has frame events"
      );
      frameIdToRootFrameId.set(mainFrameInfo.frameId, mainFrameInfo.frameId);
      frameTreeEvents = frameEvents;
    }
    const timeOriginEvt = this.computeTimeOrigin(
      { keyEvents, frameEvents, mainFrameInfo },
      timeOriginDeterminationMethod
    );
    const mainThreadEvents = processEvents.filter((e) => e.tid === rendererPidToTid.get(e.pid));
    const traceEnd = this.computeTraceEnd(trace.traceEvents, timeOriginEvt);
    return {
      frames,
      mainThreadEvents,
      frameEvents,
      frameTreeEvents,
      processEvents,
      mainFrameInfo,
      timeOriginEvt,
      timings: {
        timeOrigin: 0,
        traceEnd: traceEnd.timing
      },
      timestamps: {
        timeOrigin: timeOriginEvt.ts,
        traceEnd: traceEnd.timestamp
      },
      _keyEvents: keyEvents,
      _rendererPidToTid: rendererPidToTid
    };
  }
  /**
   * Finds key navigation trace events and computes timings of events in milliseconds since the time
   * origin in addition to the standard microsecond monotonic timestamps.
   * @param {LH.Artifacts.ProcessedTrace} processedTrace
   * @return {LH.Artifacts.ProcessedNavigation}
  */
  static processNavigation(processedTrace) {
    const { frameEvents, frameTreeEvents, timeOriginEvt, timings, timestamps } = processedTrace;
    const frameTimings = this.computeNavigationTimingsForFrame(frameEvents, { timeOriginEvt });
    const fcpAllFramesEvt = frameTreeEvents.find(
      (e) => e.name === "firstContentfulPaint" && e.ts > timeOriginEvt.ts
    );
    if (!fcpAllFramesEvt) {
      throw this.createNoFirstContentfulPaintError();
    }
    const lcpAllFramesEvt = this.computeValidLCPAllFrames(frameTreeEvents, timeOriginEvt).lcp;
    const getTiming = /* @__PURE__ */ __name((ts) => (ts - timeOriginEvt.ts) / 1e3, "getTiming");
    const maybeGetTiming = /* @__PURE__ */ __name((ts) => ts === void 0 ? void 0 : getTiming(ts), "maybeGetTiming");
    return {
      timings: {
        timeOrigin: timings.timeOrigin,
        firstPaint: frameTimings.timings.firstPaint,
        firstContentfulPaint: frameTimings.timings.firstContentfulPaint,
        firstContentfulPaintAllFrames: getTiming(fcpAllFramesEvt.ts),
        largestContentfulPaint: frameTimings.timings.largestContentfulPaint,
        largestContentfulPaintAllFrames: maybeGetTiming(lcpAllFramesEvt?.ts),
        load: frameTimings.timings.load,
        domContentLoaded: frameTimings.timings.domContentLoaded,
        traceEnd: timings.traceEnd
      },
      timestamps: {
        timeOrigin: timestamps.timeOrigin,
        firstPaint: frameTimings.timestamps.firstPaint,
        firstContentfulPaint: frameTimings.timestamps.firstContentfulPaint,
        firstContentfulPaintAllFrames: fcpAllFramesEvt.ts,
        largestContentfulPaint: frameTimings.timestamps.largestContentfulPaint,
        largestContentfulPaintAllFrames: lcpAllFramesEvt?.ts,
        load: frameTimings.timestamps.load,
        domContentLoaded: frameTimings.timestamps.domContentLoaded,
        traceEnd: timestamps.traceEnd
      },
      firstPaintEvt: frameTimings.firstPaintEvt,
      firstContentfulPaintEvt: frameTimings.firstContentfulPaintEvt,
      firstContentfulPaintAllFramesEvt: fcpAllFramesEvt,
      largestContentfulPaintEvt: frameTimings.largestContentfulPaintEvt,
      largestContentfulPaintAllFramesEvt: lcpAllFramesEvt,
      loadEvt: frameTimings.loadEvt,
      domContentLoadedEvt: frameTimings.domContentLoadedEvt,
      lcpInvalidated: frameTimings.lcpInvalidated
    };
  }
  /**
   * Computes the last observable timestamp in a set of trace events.
   *
   * @param {Array<LH.TraceEvent>} events
   * @param {LH.TraceEvent} timeOriginEvt
   * @return {{timing: number, timestamp: number}}
   */
  static computeTraceEnd(events, timeOriginEvt) {
    let maxTs = -Infinity;
    for (const event of events) {
      maxTs = Math.max(event.ts + (event.dur || 0), maxTs);
    }
    return { timestamp: maxTs, timing: (maxTs - timeOriginEvt.ts) / 1e3 };
  }
  /**
   * Computes the time origin using the specified method.
   *
   *    - firstResourceSendRequest
   *      Uses the time that the very first network request is sent in the main frame.
   *      Eventually should be used in place of lastNavigationStart as the default for navigations.
   *      This method includes the cost of all redirects when evaluating a navigation (which matches lantern behavior).
   *      The only difference between firstResourceSendRequest and the first `navigationStart` is
   *      the unload time of `about:blank` (which is a Lighthouse implementation detail and shouldn't be included).
   *
   *    - lastNavigationStart
   *      Uses the time of the last `navigationStart` event in the main frame.
   *      The historical time origin of Lighthouse from 2016-Present.
   *      This method excludes the cost of client-side redirects when evaluating a navigation.
   *      Can also be skewed by several hundred milliseconds or even seconds when the browser takes a long
   *      time to unload `about:blank`.
   *
   * @param {{keyEvents: Array<LH.TraceEvent>, frameEvents: Array<LH.TraceEvent>, mainFrameInfo: {frameId: string}}} traceEventSubsets
   * @param {TimeOriginDeterminationMethod} method
   * @return {LH.TraceEvent}
   */
  static computeTimeOrigin(traceEventSubsets, method) {
    const lastNavigationStart = /* @__PURE__ */ __name(() => {
      const frameEvents = traceEventSubsets.frameEvents;
      return frameEvents.filter(this._isNavigationStartOfInterest).pop();
    }, "lastNavigationStart");
    const lighthouseMarker = /* @__PURE__ */ __name(() => {
      const frameEvents = traceEventSubsets.keyEvents;
      return frameEvents.find(
        (evt) => evt.name === "clock_sync" && evt.args.sync_id === _TraceProcessor.TIMESPAN_MARKER_ID
      );
    }, "lighthouseMarker");
    switch (method) {
      case "firstResourceSendRequest": {
        const fetchStart = traceEventSubsets.keyEvents.find((event) => {
          if (event.name !== "ResourceSendRequest") return false;
          const data = event.args.data || {};
          return data.frame === traceEventSubsets.mainFrameInfo.frameId;
        });
        if (!fetchStart) throw this.createNoResourceSendRequestError();
        return fetchStart;
      }
      case "lastNavigationStart": {
        const navigationStart = lastNavigationStart();
        if (!navigationStart) throw this.createNoNavstartError();
        return navigationStart;
      }
      case "lighthouseMarker": {
        const marker = lighthouseMarker();
        if (!marker) throw this.createNoLighthouseMarkerError();
        return marker;
      }
      case "auto": {
        const marker = lighthouseMarker() || lastNavigationStart();
        if (!marker) throw this.createNoNavstartError();
        return marker;
      }
    }
  }
  /**
   * Computes timings of trace events of key trace events in milliseconds since the time origin
   * in addition to the standard microsecond monotonic timestamps.
   * @param {Array<LH.TraceEvent>} frameEvents
   * @param {{timeOriginEvt: LH.TraceEvent}} options
  */
  static computeNavigationTimingsForFrame(frameEvents, options) {
    const { timeOriginEvt } = options;
    const firstPaint = frameEvents.find((e) => e.name === "firstPaint" && e.ts > timeOriginEvt.ts);
    const firstContentfulPaint = frameEvents.find(
      (e) => e.name === "firstContentfulPaint" && e.ts > timeOriginEvt.ts
    );
    if (!firstContentfulPaint) {
      throw this.createNoFirstContentfulPaintError();
    }
    const lcpResult = this.computeValidLCPAllFrames(frameEvents, timeOriginEvt);
    const load = frameEvents.find((e) => e.name === "loadEventEnd" && e.ts > timeOriginEvt.ts);
    const domContentLoaded = frameEvents.find(
      (e) => e.name === "domContentLoadedEventEnd" && e.ts > timeOriginEvt.ts
    );
    const getTimestamp = /* @__PURE__ */ __name((event) => event?.ts, "getTimestamp");
    const timestamps = {
      timeOrigin: timeOriginEvt.ts,
      firstPaint: getTimestamp(firstPaint),
      firstContentfulPaint: firstContentfulPaint.ts,
      largestContentfulPaint: getTimestamp(lcpResult.lcp),
      load: getTimestamp(load),
      domContentLoaded: getTimestamp(domContentLoaded)
    };
    const getTiming = /* @__PURE__ */ __name((ts) => (ts - timeOriginEvt.ts) / 1e3, "getTiming");
    const maybeGetTiming = /* @__PURE__ */ __name((ts) => ts === void 0 ? void 0 : getTiming(ts), "maybeGetTiming");
    const timings = {
      timeOrigin: 0,
      firstPaint: maybeGetTiming(timestamps.firstPaint),
      firstContentfulPaint: getTiming(timestamps.firstContentfulPaint),
      largestContentfulPaint: maybeGetTiming(timestamps.largestContentfulPaint),
      load: maybeGetTiming(timestamps.load),
      domContentLoaded: maybeGetTiming(timestamps.domContentLoaded)
    };
    return {
      timings,
      timestamps,
      timeOriginEvt,
      firstPaintEvt: firstPaint,
      firstContentfulPaintEvt: firstContentfulPaint,
      largestContentfulPaintEvt: lcpResult.lcp,
      loadEvt: load,
      domContentLoadedEvt: domContentLoaded,
      lcpInvalidated: lcpResult.invalidated
    };
  }
};

// node_modules/lighthouse/core/gather/gatherers/trace.js
var Trace = class _Trace extends base_gatherer_default {
  static {
    __name(this, "Trace");
  }
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
    const dataListener = /* @__PURE__ */ __name(function(data) {
      traceEvents.push(...data.value);
    }, "dataListener");
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
export {
  trace_default as default
};
/*! Bundled license information:

lighthouse/types/lh.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/base-gatherer.js:
lighthouse/core/gather/gatherers/trace.js:
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

lighthouse/core/lib/tracehouse/trace-processor.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
