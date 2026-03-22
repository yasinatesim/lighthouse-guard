import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  JSBundlesComputed
} from "../chunk-QMRXOAX7.js";
import {
  estimateCompressionRatioForContent
} from "../chunk-7PCH2QJG.js";
import {
  ByteEfficiencyAudit
} from "../chunk-7TZ77HKH.js";
import "../chunk-22KTQBIM.js";
import "../chunk-5FAUCPF6.js";
import "../chunk-VUSO5I4V.js";
import "../chunk-ZFITDNXI.js";
import "../chunk-5AKLBR55.js";
import "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import "../chunk-2DV6G4YM.js";
import {
  EntityClassificationComputed
} from "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import "../chunk-AB7S44AE.js";
import "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
  LH_ROOT,
  UIStrings,
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import {
  init_shim_fs,
  shim_fs_default
} from "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/lib/legacy-javascript/legacy-javascript.js
init_shim_fs();
var polyfillModuleDataJson = shim_fs_default.readFileSync(
  `${LH_ROOT}/core/lib/legacy-javascript/polyfill-module-data.json`,
  "utf-8"
);
var polyfillModuleData = JSON.parse(polyfillModuleDataJson);
var graphJson = shim_fs_default.readFileSync(
  `${LH_ROOT}/core/lib/legacy-javascript/polyfill-graph-data.json`,
  "utf-8"
);
var graph = JSON.parse(graphJson);
var CodePatternMatcher = class {
  static {
    __name(this, "CodePatternMatcher");
  }
  /**
   * @param {Pattern[]} patterns
   */
  constructor(patterns) {
    this.patterns = patterns;
  }
  /**
   * @param {string} code
   * @return {PatternMatchResult[]}
   */
  match(code) {
    if (!this.re) {
      const patternsExpression = this.patterns.map((pattern) => `(${pattern.expression})`).join("|");
      this.re = new RegExp(`(^\r
|\r|
)|${patternsExpression}`, "g");
    }
    this.re.lastIndex = 0;
    const seen = /* @__PURE__ */ new Set();
    const matches = [];
    let result;
    let line = 0;
    let lineBeginsAtIndex = 0;
    while ((result = this.re.exec(code)) !== null) {
      const captureGroups = result.slice(1);
      const [isNewline, ...patternExpressionMatches] = captureGroups;
      if (isNewline) {
        line++;
        lineBeginsAtIndex = result.index + 1;
        continue;
      }
      const pattern = this.patterns[patternExpressionMatches.findIndex(Boolean)];
      if (seen.has(pattern)) {
        continue;
      }
      seen.add(pattern);
      matches.push({
        name: pattern.name,
        line,
        column: result.index - lineBeginsAtIndex
      });
    }
    return matches;
  }
};
function buildPolyfillExpression(object, property, coreJs3Module) {
  const qt = /* @__PURE__ */ __name((token) => `['"]${token}['"]`, "qt");
  let expression = "";
  if (object) {
    expression += `${object}\\.${property}\\s?=[^=]`;
  } else {
    expression += `(?:window\\.|[\\s;]+)${property}\\s?=[^=]`;
  }
  if (object) {
    expression += `|${object}\\[${qt(property)}\\]\\s?=[^=]`;
  }
  expression += `|defineProperty\\(${object || "window"},\\s?${qt(property)}`;
  if (object) {
    expression += `|\\(${object},\\s*{${property}:.*},\\s*{${property}`;
  }
  if (object) {
    const objectWithoutPrototype = object.replace(".prototype", "");
    expression += `|{target:${qt(objectWithoutPrototype)}[^;]*},{${property}:`;
  } else {
  }
  expression += `|${coreJs3Module.replaceAll(".", "\\.")}(?:\\.js)?"`;
  return expression;
}
__name(buildPolyfillExpression, "buildPolyfillExpression");
function getCoreJsPolyfillData() {
  return polyfillModuleData.filter((d) => d.corejs).map((d) => {
    return {
      name: d.name,
      coreJs3Module: d.modules[0]
    };
  });
}
__name(getCoreJsPolyfillData, "getCoreJsPolyfillData");
function getPolyfillPatterns() {
  const patterns = [];
  for (const { name, coreJs3Module } of getCoreJsPolyfillData()) {
    const parts = name.split(".");
    const object = parts.length > 1 ? parts.slice(0, parts.length - 1).join(".") : null;
    const property = parts[parts.length - 1];
    patterns.push({
      name,
      expression: buildPolyfillExpression(object, property, coreJs3Module)
    });
  }
  return patterns;
}
__name(getPolyfillPatterns, "getPolyfillPatterns");
function getTransformPatterns() {
  const count = /* @__PURE__ */ __name((content, pattern) => {
    if (typeof pattern === "string") {
      return content.split(pattern).length - 1;
    }
    return (content.match(pattern) ?? []).length;
  }, "count");
  return [
    // @babel/plugin-transform-classes
    //
    // input:
    //
    // class MyTestClass {
    //   log() {
    //     console.log(1);
    //   }
    // };
    //
    // output:
    //
    // function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
    // function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
    // function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
    // function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
    // function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
    // let MyTestClass = function () {
    //   function MyTestClass() {
    //     _classCallCheck(this, MyTestClass);
    //   }
    //   return _createClass(MyTestClass, [{
    //     key: "log",
    //     value: function log() {
    //       console.log(1);
    //     }
    //   }]);
    // }();
    {
      name: "@babel/plugin-transform-classes",
      expression: "Cannot call a class as a function",
      estimateBytes: /* @__PURE__ */ __name((content) => {
        return 1e3 + (count(content, "_classCallCheck") - 1) * "_classCallCheck()".length;
      }, "estimateBytes")
    },
    {
      name: "@babel/plugin-transform-regenerator",
      expression: "Generator is already running|regeneratorRuntime",
      // Example of this transform: https://gist.github.com/connorjclark/af8bccfff377ac44efc104a79bc75da2
      // `regeneratorRuntime.awrap` is generated for every usage of `await`, and adds ~80 bytes each.
      estimateBytes: /* @__PURE__ */ __name((content) => {
        return count(content, /regeneratorRuntime\(?\)?\.a?wrap/g) * 80;
      }, "estimateBytes")
    },
    {
      name: "@babel/plugin-transform-spread",
      expression: "Invalid attempt to spread non-iterable instance",
      estimateBytes: /* @__PURE__ */ __name((content) => {
        const per = "_toConsumableArray()".length;
        return 1169 + count(content, /\.apply\(void 0,\s?_toConsumableArray/g) * per;
      }, "estimateBytes")
    }
  ];
}
__name(getTransformPatterns, "getTransformPatterns");
function estimateWastedBytes(content, matches) {
  const polyfillResults = matches.filter((m) => !m.name.startsWith("@"));
  const transformResults = matches.filter((m) => m.name.startsWith("@"));
  let estimatedWastedBytesFromPolyfills = 0;
  const modulesSeen = /* @__PURE__ */ new Set();
  for (const result of polyfillResults) {
    const modules = graph.dependencies[result.name];
    if (!modules) continue;
    for (const module of modules) {
      modulesSeen.add(module);
    }
  }
  estimatedWastedBytesFromPolyfills += [...modulesSeen].reduce((acc, moduleIndex) => {
    return acc + graph.moduleSizes[moduleIndex];
  }, 0);
  estimatedWastedBytesFromPolyfills = Math.min(estimatedWastedBytesFromPolyfills, graph.maxSize);
  let estimatedWastedBytesFromTransforms = 0;
  for (const result of transformResults) {
    const pattern = getTransformPatterns().find((p) => p.name === result.name);
    if (!pattern || !pattern.estimateBytes || !content) continue;
    estimatedWastedBytesFromTransforms += pattern.estimateBytes(content);
  }
  const estimatedWastedBytes = estimatedWastedBytesFromPolyfills + estimatedWastedBytesFromTransforms;
  return estimatedWastedBytes;
}
__name(estimateWastedBytes, "estimateWastedBytes");
var matcher = new CodePatternMatcher([
  ...getPolyfillPatterns(),
  ...getTransformPatterns()
]);
function detectLegacyJavaScript(content, map) {
  if (!content) return { matches: [], estimatedByteSavings: 0 };
  let matches = matcher.match(content);
  if (map) {
    for (const { name, modules } of polyfillModuleData) {
      if (matches.some((m) => m.name === name)) continue;
      const source = map.sourceURLs().find((source2) => modules.some((module) => {
        return source2.endsWith(`/${module}.js`) || source2.includes(`node_modules/${module}/`);
      }));
      if (!source) continue;
      const mapping = map.mappings().find((m) => m.sourceURL === source);
      if (mapping) {
        matches.push({ name, line: mapping.lineNumber, column: mapping.columnNumber });
      } else {
        matches.push({ name, line: 0, column: 0 });
      }
    }
  }
  matches = matches.sort((a, b) => a.name > b.name ? 1 : a.name === b.name ? 0 : -1);
  return {
    matches,
    estimatedByteSavings: estimateWastedBytes(content, matches)
  };
}
__name(detectLegacyJavaScript, "detectLegacyJavaScript");

// node_modules/lighthouse/core/audits/byte-efficiency/legacy-javascript.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that tells the user about legacy polyfills and transforms used on the page. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Avoid serving legacy JavaScript to modern browsers",
  // TODO: developer.chrome.com article. this codelab is good starting place: https://web.dev/articles/codelab-serve-modern-code
  /** Description of a Lighthouse audit that tells the user about old JavaScript that is no longer needed. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. Consider modifying your JavaScript build process to not transpile [Baseline](https://web.dev/baseline) features, unless you know you must support legacy browsers. [Learn why most sites can deploy ES6+ code without transpiling](https://philipwalton.com/articles/the-state-of-es5-on-the-web/)",
  /** Warning text that an outdated version of the library "core-js" was found, and the developer should upgrade. */
  // eslint-disable-next-line max-len
  detectedCoreJs2Warning: "Version 2 of core-js was detected on the page. You should upgrade to version 3 for many performance improvements."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var LegacyJavascript = class extends ByteEfficiencyAudit {
  static {
    __name(this, "LegacyJavascript");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "legacy-javascript",
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      description: str_(UIStrings2.description),
      title: str_(UIStrings2.title),
      guidanceLevel: 2,
      requiredArtifacts: [
        "DevtoolsLog",
        "Trace",
        "Scripts",
        "SourceMaps",
        "GatherContext",
        "URL"
      ]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Audit.Context} context
   * @return {Promise<ByteEfficiencyProduct>}
   */
  static async audit_(artifacts, networkRecords, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const classifiedEntities = await EntityClassificationComputed.request(
      { URL: artifacts.URL, devtoolsLog },
      context
    );
    const bundles = await JSBundlesComputed.request(artifacts, context);
    const items = [];
    const compressionRatioByUrl = /* @__PURE__ */ new Map();
    for (const script of artifacts.Scripts) {
      const bundle = bundles.find((bundle2) => bundle2.script.scriptId === script.scriptId);
      const { matches, estimatedByteSavings } = detectLegacyJavaScript(script.content ?? "", bundle?.map ?? null);
      if (matches.length === 0) continue;
      const compressionRatio = estimateCompressionRatioForContent(
        compressionRatioByUrl,
        script.url,
        artifacts,
        networkRecords
      );
      const wastedBytes = Math.round(estimatedByteSavings * compressionRatio);
      const item = {
        url: script.url,
        wastedBytes,
        subItems: {
          type: "subitems",
          items: []
        },
        // Not needed, but keeps typescript happy.
        totalBytes: 0
      };
      for (const match of matches) {
        const { name, line, column } = match;
        const subItem = {
          signal: name,
          location: ByteEfficiencyAudit.makeSourceLocation(script.url, line, column, bundle)
        };
        item.subItems.items.push(subItem);
      }
      items.push(item);
    }
    const warnings = [];
    for (const bundle of bundles) {
      if (classifiedEntities.isFirstParty(bundle.script.url)) {
        if (bundle.rawMap.sources.some((s) => s.match(/node_modules\/core-js\/modules\/es[67]/))) {
          warnings.push(str_(UIStrings2.detectedCoreJs2Warning));
          break;
        }
      }
    }
    const wastedBytesByUrl = /* @__PURE__ */ new Map();
    for (const item of items) {
      if (classifiedEntities.isFirstParty(item.url)) {
        wastedBytesByUrl.set(item.url, item.wastedBytes);
      }
    }
    const headings = [
      /* eslint-disable max-len */
      { key: "url", valueType: "url", subItemsHeading: { key: "location", valueType: "source-location" }, label: str_(UIStrings.columnURL) },
      { key: null, valueType: "code", subItemsHeading: { key: "signal" }, label: "" },
      { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings.columnWastedBytes) }
      /* eslint-enable max-len */
    ];
    return {
      items,
      headings,
      wastedBytesByUrl,
      warnings
    };
  }
};
var legacy_javascript_default = LegacyJavascript;
export {
  UIStrings2 as UIStrings,
  legacy_javascript_default as default
};
/*! Bundled license information:

lighthouse/core/lib/legacy-javascript/legacy-javascript.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/audits/byte-efficiency/legacy-javascript.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
