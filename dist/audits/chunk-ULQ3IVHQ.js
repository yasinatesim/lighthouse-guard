import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  createIcuMessageFn,
  isIcuMessage
} from "./chunk-O3YNDXOX.js";
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import {
  __commonJS,
  __name,
  __toESM
} from "./chunk-XE6XARIN.js";

// node_modules/csp_evaluator/dist/finding.js
var require_finding = __commonJS({
  "node_modules/csp_evaluator/dist/finding.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Type = exports.Severity = exports.Finding = void 0;
    var Finding = class _Finding {
      static {
        __name(this, "Finding");
      }
      constructor(type, description, severity, directive, value) {
        this.type = type;
        this.description = description;
        this.severity = severity;
        this.directive = directive;
        this.value = value;
      }
      static getHighestSeverity(findings) {
        if (findings.length === 0) {
          return Severity.NONE;
        }
        const severities = findings.map((finding) => finding.severity);
        const min = /* @__PURE__ */ __name((prev, cur) => prev < cur ? prev : cur, "min");
        return severities.reduce(min, Severity.NONE);
      }
      equals(obj) {
        if (!(obj instanceof _Finding)) {
          return false;
        }
        return obj.type === this.type && obj.description === this.description && obj.severity === this.severity && obj.directive === this.directive && obj.value === this.value;
      }
    };
    exports.Finding = Finding;
    var Severity;
    (function(Severity2) {
      Severity2[Severity2["HIGH"] = 10] = "HIGH";
      Severity2[Severity2["SYNTAX"] = 20] = "SYNTAX";
      Severity2[Severity2["MEDIUM"] = 30] = "MEDIUM";
      Severity2[Severity2["HIGH_MAYBE"] = 40] = "HIGH_MAYBE";
      Severity2[Severity2["STRICT_CSP"] = 45] = "STRICT_CSP";
      Severity2[Severity2["MEDIUM_MAYBE"] = 50] = "MEDIUM_MAYBE";
      Severity2[Severity2["INFO"] = 60] = "INFO";
      Severity2[Severity2["NONE"] = 100] = "NONE";
    })(Severity = exports.Severity || (exports.Severity = {}));
    var Type2;
    (function(Type3) {
      Type3[Type3["MISSING_SEMICOLON"] = 100] = "MISSING_SEMICOLON";
      Type3[Type3["UNKNOWN_DIRECTIVE"] = 101] = "UNKNOWN_DIRECTIVE";
      Type3[Type3["INVALID_KEYWORD"] = 102] = "INVALID_KEYWORD";
      Type3[Type3["NONCE_CHARSET"] = 106] = "NONCE_CHARSET";
      Type3[Type3["MISSING_DIRECTIVES"] = 300] = "MISSING_DIRECTIVES";
      Type3[Type3["SCRIPT_UNSAFE_INLINE"] = 301] = "SCRIPT_UNSAFE_INLINE";
      Type3[Type3["SCRIPT_UNSAFE_EVAL"] = 302] = "SCRIPT_UNSAFE_EVAL";
      Type3[Type3["PLAIN_URL_SCHEMES"] = 303] = "PLAIN_URL_SCHEMES";
      Type3[Type3["PLAIN_WILDCARD"] = 304] = "PLAIN_WILDCARD";
      Type3[Type3["SCRIPT_ALLOWLIST_BYPASS"] = 305] = "SCRIPT_ALLOWLIST_BYPASS";
      Type3[Type3["OBJECT_ALLOWLIST_BYPASS"] = 306] = "OBJECT_ALLOWLIST_BYPASS";
      Type3[Type3["NONCE_LENGTH"] = 307] = "NONCE_LENGTH";
      Type3[Type3["IP_SOURCE"] = 308] = "IP_SOURCE";
      Type3[Type3["DEPRECATED_DIRECTIVE"] = 309] = "DEPRECATED_DIRECTIVE";
      Type3[Type3["SRC_HTTP"] = 310] = "SRC_HTTP";
      Type3[Type3["SRC_NO_PROTOCOL"] = 311] = "SRC_NO_PROTOCOL";
      Type3[Type3["EXPERIMENTAL"] = 312] = "EXPERIMENTAL";
      Type3[Type3["WILDCARD_URL"] = 313] = "WILDCARD_URL";
      Type3[Type3["X_FRAME_OPTIONS_OBSOLETED"] = 314] = "X_FRAME_OPTIONS_OBSOLETED";
      Type3[Type3["STYLE_UNSAFE_INLINE"] = 315] = "STYLE_UNSAFE_INLINE";
      Type3[Type3["STATIC_NONCE"] = 316] = "STATIC_NONCE";
      Type3[Type3["SCRIPT_UNSAFE_HASHES"] = 317] = "SCRIPT_UNSAFE_HASHES";
      Type3[Type3["STRICT_DYNAMIC"] = 400] = "STRICT_DYNAMIC";
      Type3[Type3["STRICT_DYNAMIC_NOT_STANDALONE"] = 401] = "STRICT_DYNAMIC_NOT_STANDALONE";
      Type3[Type3["NONCE_HASH"] = 402] = "NONCE_HASH";
      Type3[Type3["UNSAFE_INLINE_FALLBACK"] = 403] = "UNSAFE_INLINE_FALLBACK";
      Type3[Type3["ALLOWLIST_FALLBACK"] = 404] = "ALLOWLIST_FALLBACK";
      Type3[Type3["IGNORED"] = 405] = "IGNORED";
      Type3[Type3["REQUIRE_TRUSTED_TYPES_FOR_SCRIPTS"] = 500] = "REQUIRE_TRUSTED_TYPES_FOR_SCRIPTS";
      Type3[Type3["REPORTING_DESTINATION_MISSING"] = 600] = "REPORTING_DESTINATION_MISSING";
      Type3[Type3["REPORT_TO_ONLY"] = 601] = "REPORT_TO_ONLY";
    })(Type2 = exports.Type || (exports.Type = {}));
  }
});

// node_modules/csp_evaluator/dist/csp.js
var require_csp = __commonJS({
  "node_modules/csp_evaluator/dist/csp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CspError = exports.isHash = exports.HASH_PATTERN = exports.STRICT_HASH_PATTERN = exports.isNonce = exports.NONCE_PATTERN = exports.STRICT_NONCE_PATTERN = exports.isUrlScheme = exports.isKeyword = exports.isDirective = exports.Version = exports.FETCH_DIRECTIVES = exports.Directive = exports.TrustedTypesSink = exports.Keyword = exports.Csp = void 0;
    var finding_1 = require_finding();
    var Csp = class _Csp {
      static {
        __name(this, "Csp");
      }
      constructor(directives = {}) {
        this.directives = {};
        for (const [directive, directiveValues] of Object.entries(directives)) {
          if (directiveValues) {
            this.directives[directive] = [...directiveValues];
          }
        }
      }
      clone() {
        return new _Csp(this.directives);
      }
      convertToString() {
        let cspString = "";
        for (const [directive, directiveValues] of Object.entries(this.directives)) {
          cspString += directive;
          if (directiveValues !== void 0) {
            for (let value, i = 0; value = directiveValues[i]; i++) {
              cspString += " ";
              cspString += value;
            }
          }
          cspString += "; ";
        }
        return cspString;
      }
      getEffectiveCsp(cspVersion, optFindings) {
        const findings = optFindings || [];
        const effectiveCsp = this.clone();
        [Directive2.SCRIPT_SRC, Directive2.SCRIPT_SRC_ATTR, Directive2.SCRIPT_SRC_ELEM].forEach((directiveToNormalize) => {
          const directive = effectiveCsp.getEffectiveDirective(directiveToNormalize);
          const values = this.directives[directive] || [];
          const effectiveCspValues = effectiveCsp.directives[directive];
          if (effectiveCspValues && (effectiveCsp.policyHasScriptNonces(directive) || effectiveCsp.policyHasScriptHashes(directive))) {
            if (cspVersion >= Version.CSP2) {
              if (values.includes(Keyword.UNSAFE_INLINE)) {
                arrayRemove(effectiveCspValues, Keyword.UNSAFE_INLINE);
                findings.push(new finding_1.Finding(finding_1.Type.IGNORED, "unsafe-inline is ignored if a nonce or a hash is present. (CSP2 and above)", finding_1.Severity.NONE, directive, Keyword.UNSAFE_INLINE));
              }
            } else {
              for (const value of values) {
                if (value.startsWith("'nonce-") || value.startsWith("'sha")) {
                  arrayRemove(effectiveCspValues, value);
                }
              }
            }
          }
          if (effectiveCspValues && this.policyHasStrictDynamic(directive)) {
            if (cspVersion >= Version.CSP3) {
              for (const value of values) {
                if (!value.startsWith("'") || value === Keyword.SELF || value === Keyword.UNSAFE_INLINE) {
                  arrayRemove(effectiveCspValues, value);
                  findings.push(new finding_1.Finding(finding_1.Type.IGNORED, "Because of strict-dynamic this entry is ignored in CSP3 and above", finding_1.Severity.NONE, directive, value));
                }
              }
            } else {
              arrayRemove(effectiveCspValues, Keyword.STRICT_DYNAMIC);
            }
          }
        });
        if (cspVersion < Version.CSP3) {
          delete effectiveCsp.directives[Directive2.REPORT_TO];
          delete effectiveCsp.directives[Directive2.WORKER_SRC];
          delete effectiveCsp.directives[Directive2.MANIFEST_SRC];
          delete effectiveCsp.directives[Directive2.TRUSTED_TYPES];
          delete effectiveCsp.directives[Directive2.REQUIRE_TRUSTED_TYPES_FOR];
          delete effectiveCsp.directives[Directive2.SCRIPT_SRC_ATTR];
          delete effectiveCsp.directives[Directive2.SCRIPT_SRC_ELEM];
          delete effectiveCsp.directives[Directive2.STYLE_SRC_ATTR];
          delete effectiveCsp.directives[Directive2.STYLE_SRC_ELEM];
        }
        return effectiveCsp;
      }
      getEffectiveDirective(directive) {
        if (directive in this.directives) {
          return directive;
        }
        if ((directive === Directive2.SCRIPT_SRC_ATTR || directive === Directive2.SCRIPT_SRC_ELEM) && Directive2.SCRIPT_SRC in this.directives) {
          return Directive2.SCRIPT_SRC;
        }
        if ((directive === Directive2.STYLE_SRC_ATTR || directive === Directive2.STYLE_SRC_ELEM) && Directive2.STYLE_SRC in this.directives) {
          return Directive2.STYLE_SRC;
        }
        if (exports.FETCH_DIRECTIVES.includes(directive)) {
          return Directive2.DEFAULT_SRC;
        }
        return directive;
      }
      getEffectiveDirectives(directives) {
        const effectiveDirectives = new Set(directives.map((val) => this.getEffectiveDirective(val)));
        return [...effectiveDirectives];
      }
      policyHasScriptNonces(directive) {
        const directiveName = this.getEffectiveDirective(directive || Directive2.SCRIPT_SRC);
        const values = this.directives[directiveName] || [];
        return values.some((val) => isNonce(val));
      }
      policyHasScriptHashes(directive) {
        const directiveName = this.getEffectiveDirective(directive || Directive2.SCRIPT_SRC);
        const values = this.directives[directiveName] || [];
        return values.some((val) => isHash(val));
      }
      policyHasStrictDynamic(directive) {
        const directiveName = this.getEffectiveDirective(directive || Directive2.SCRIPT_SRC);
        const values = this.directives[directiveName] || [];
        return values.includes(Keyword.STRICT_DYNAMIC);
      }
    };
    exports.Csp = Csp;
    var Keyword;
    (function(Keyword2) {
      Keyword2["SELF"] = "'self'";
      Keyword2["NONE"] = "'none'";
      Keyword2["UNSAFE_INLINE"] = "'unsafe-inline'";
      Keyword2["UNSAFE_EVAL"] = "'unsafe-eval'";
      Keyword2["WASM_EVAL"] = "'wasm-eval'";
      Keyword2["WASM_UNSAFE_EVAL"] = "'wasm-unsafe-eval'";
      Keyword2["STRICT_DYNAMIC"] = "'strict-dynamic'";
      Keyword2["UNSAFE_HASHED_ATTRIBUTES"] = "'unsafe-hashed-attributes'";
      Keyword2["UNSAFE_HASHES"] = "'unsafe-hashes'";
      Keyword2["REPORT_SAMPLE"] = "'report-sample'";
      Keyword2["BLOCK"] = "'block'";
      Keyword2["ALLOW"] = "'allow'";
      Keyword2["INLINE_SPECULATION_RULES"] = "'inline-speculation-rules'";
    })(Keyword = exports.Keyword || (exports.Keyword = {}));
    var TrustedTypesSink;
    (function(TrustedTypesSink2) {
      TrustedTypesSink2["SCRIPT"] = "'script'";
    })(TrustedTypesSink = exports.TrustedTypesSink || (exports.TrustedTypesSink = {}));
    var Directive2;
    (function(Directive3) {
      Directive3["CHILD_SRC"] = "child-src";
      Directive3["CONNECT_SRC"] = "connect-src";
      Directive3["DEFAULT_SRC"] = "default-src";
      Directive3["FONT_SRC"] = "font-src";
      Directive3["FRAME_SRC"] = "frame-src";
      Directive3["IMG_SRC"] = "img-src";
      Directive3["MEDIA_SRC"] = "media-src";
      Directive3["OBJECT_SRC"] = "object-src";
      Directive3["SCRIPT_SRC"] = "script-src";
      Directive3["SCRIPT_SRC_ATTR"] = "script-src-attr";
      Directive3["SCRIPT_SRC_ELEM"] = "script-src-elem";
      Directive3["STYLE_SRC"] = "style-src";
      Directive3["STYLE_SRC_ATTR"] = "style-src-attr";
      Directive3["STYLE_SRC_ELEM"] = "style-src-elem";
      Directive3["PREFETCH_SRC"] = "prefetch-src";
      Directive3["MANIFEST_SRC"] = "manifest-src";
      Directive3["WORKER_SRC"] = "worker-src";
      Directive3["BASE_URI"] = "base-uri";
      Directive3["PLUGIN_TYPES"] = "plugin-types";
      Directive3["SANDBOX"] = "sandbox";
      Directive3["DISOWN_OPENER"] = "disown-opener";
      Directive3["FORM_ACTION"] = "form-action";
      Directive3["FRAME_ANCESTORS"] = "frame-ancestors";
      Directive3["NAVIGATE_TO"] = "navigate-to";
      Directive3["REPORT_TO"] = "report-to";
      Directive3["REPORT_URI"] = "report-uri";
      Directive3["BLOCK_ALL_MIXED_CONTENT"] = "block-all-mixed-content";
      Directive3["UPGRADE_INSECURE_REQUESTS"] = "upgrade-insecure-requests";
      Directive3["REFLECTED_XSS"] = "reflected-xss";
      Directive3["REFERRER"] = "referrer";
      Directive3["REQUIRE_SRI_FOR"] = "require-sri-for";
      Directive3["TRUSTED_TYPES"] = "trusted-types";
      Directive3["REQUIRE_TRUSTED_TYPES_FOR"] = "require-trusted-types-for";
      Directive3["WEBRTC"] = "webrtc";
    })(Directive2 = exports.Directive || (exports.Directive = {}));
    exports.FETCH_DIRECTIVES = [
      Directive2.CHILD_SRC,
      Directive2.CONNECT_SRC,
      Directive2.DEFAULT_SRC,
      Directive2.FONT_SRC,
      Directive2.FRAME_SRC,
      Directive2.IMG_SRC,
      Directive2.MANIFEST_SRC,
      Directive2.MEDIA_SRC,
      Directive2.OBJECT_SRC,
      Directive2.SCRIPT_SRC,
      Directive2.SCRIPT_SRC_ATTR,
      Directive2.SCRIPT_SRC_ELEM,
      Directive2.STYLE_SRC,
      Directive2.STYLE_SRC_ATTR,
      Directive2.STYLE_SRC_ELEM,
      Directive2.WORKER_SRC
    ];
    var Version;
    (function(Version2) {
      Version2[Version2["CSP1"] = 1] = "CSP1";
      Version2[Version2["CSP2"] = 2] = "CSP2";
      Version2[Version2["CSP3"] = 3] = "CSP3";
    })(Version = exports.Version || (exports.Version = {}));
    function isDirective(directive) {
      return Object.values(Directive2).includes(directive);
    }
    __name(isDirective, "isDirective");
    exports.isDirective = isDirective;
    function isKeyword(keyword) {
      return Object.values(Keyword).includes(keyword);
    }
    __name(isKeyword, "isKeyword");
    exports.isKeyword = isKeyword;
    function isUrlScheme(urlScheme) {
      const pattern = new RegExp("^[a-zA-Z][+a-zA-Z0-9.-]*:$");
      return pattern.test(urlScheme);
    }
    __name(isUrlScheme, "isUrlScheme");
    exports.isUrlScheme = isUrlScheme;
    exports.STRICT_NONCE_PATTERN = new RegExp("^'nonce-[a-zA-Z0-9+/_-]+[=]{0,2}'$");
    exports.NONCE_PATTERN = new RegExp("^'nonce-(.+)'$");
    function isNonce(nonce, strictCheck) {
      const pattern = strictCheck ? exports.STRICT_NONCE_PATTERN : exports.NONCE_PATTERN;
      return pattern.test(nonce);
    }
    __name(isNonce, "isNonce");
    exports.isNonce = isNonce;
    exports.STRICT_HASH_PATTERN = new RegExp("^'(sha256|sha384|sha512)-[a-zA-Z0-9+/]+[=]{0,2}'$");
    exports.HASH_PATTERN = new RegExp("^'(sha256|sha384|sha512)-(.+)'$");
    function isHash(hash, strictCheck) {
      const pattern = strictCheck ? exports.STRICT_HASH_PATTERN : exports.HASH_PATTERN;
      return pattern.test(hash);
    }
    __name(isHash, "isHash");
    exports.isHash = isHash;
    var CspError = class extends Error {
      static {
        __name(this, "CspError");
      }
      constructor(message) {
        super(message);
      }
    };
    exports.CspError = CspError;
    function arrayRemove(arr, item) {
      if (arr.includes(item)) {
        const idx = arr.findIndex((elem) => item === elem);
        arr.splice(idx, 1);
      }
    }
    __name(arrayRemove, "arrayRemove");
  }
});

// node_modules/csp_evaluator/dist/checks/parser_checks.js
var require_parser_checks = __commonJS({
  "node_modules/csp_evaluator/dist/checks/parser_checks.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return m[k];
      }, "get") });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkInvalidKeyword = exports.checkMissingSemicolon = exports.checkUnknownDirective = void 0;
    var csp = __importStar(require_csp());
    var csp_1 = require_csp();
    var finding_1 = require_finding();
    function checkUnknownDirective(parsedCsp) {
      const findings = [];
      for (const directive of Object.keys(parsedCsp.directives)) {
        if (csp.isDirective(directive)) {
          continue;
        }
        if (directive.endsWith(":")) {
          findings.push(new finding_1.Finding(finding_1.Type.UNKNOWN_DIRECTIVE, "CSP directives don't end with a colon.", finding_1.Severity.SYNTAX, directive));
        } else {
          findings.push(new finding_1.Finding(finding_1.Type.UNKNOWN_DIRECTIVE, 'Directive "' + directive + '" is not a known CSP directive.', finding_1.Severity.SYNTAX, directive));
        }
      }
      return findings;
    }
    __name(checkUnknownDirective, "checkUnknownDirective");
    exports.checkUnknownDirective = checkUnknownDirective;
    function checkMissingSemicolon(parsedCsp) {
      const findings = [];
      for (const [directive, directiveValues] of Object.entries(parsedCsp.directives)) {
        if (directiveValues === void 0) {
          continue;
        }
        for (const value of directiveValues) {
          if (csp.isDirective(value)) {
            findings.push(new finding_1.Finding(finding_1.Type.MISSING_SEMICOLON, 'Did you forget the semicolon? "' + value + '" seems to be a directive, not a value.', finding_1.Severity.SYNTAX, directive, value));
          }
        }
      }
      return findings;
    }
    __name(checkMissingSemicolon, "checkMissingSemicolon");
    exports.checkMissingSemicolon = checkMissingSemicolon;
    function checkInvalidKeyword(parsedCsp) {
      const findings = [];
      const keywordsNoTicks = Object.values(csp_1.Keyword).map((k) => k.replace(/'/g, ""));
      for (const [directive, directiveValues] of Object.entries(parsedCsp.directives)) {
        if (directiveValues === void 0) {
          continue;
        }
        for (const value of directiveValues) {
          if (keywordsNoTicks.some((k) => k === value) || value.startsWith("nonce-") || value.match(/^(sha256|sha384|sha512)-/)) {
            findings.push(new finding_1.Finding(finding_1.Type.INVALID_KEYWORD, 'Did you forget to surround "' + value + '" with single-ticks?', finding_1.Severity.SYNTAX, directive, value));
            continue;
          }
          if (!value.startsWith("'")) {
            continue;
          }
          if (directive === csp.Directive.REQUIRE_TRUSTED_TYPES_FOR) {
            if (value === csp.TrustedTypesSink.SCRIPT) {
              continue;
            }
          } else if (directive === csp.Directive.TRUSTED_TYPES) {
            if (value === "'allow-duplicates'" || value === "'none'") {
              continue;
            }
          } else {
            if (csp.isKeyword(value) || csp.isHash(value) || csp.isNonce(value)) {
              continue;
            }
          }
          findings.push(new finding_1.Finding(finding_1.Type.INVALID_KEYWORD, value + " seems to be an invalid CSP keyword.", finding_1.Severity.SYNTAX, directive, value));
        }
      }
      return findings;
    }
    __name(checkInvalidKeyword, "checkInvalidKeyword");
    exports.checkInvalidKeyword = checkInvalidKeyword;
  }
});

// node_modules/csp_evaluator/dist/allowlist_bypasses/angular.js
var require_angular = __commonJS({
  "node_modules/csp_evaluator/dist/allowlist_bypasses/angular.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.URLS = void 0;
    exports.URLS = [
      "//gstatic.com/fsn/angular_js-bundle1.js",
      "//www.gstatic.com/fsn/angular_js-bundle1.js",
      "//www.googleadservices.com/pageadimg/imgad",
      "//yandex.st/angularjs/1.2.16/angular-cookies.min.js",
      "//yastatic.net/angularjs/1.2.23/angular.min.js",
      "//yuedust.yuedu.126.net/js/components/angular/angular.js",
      "//art.jobs.netease.com/script/angular.js",
      "//csu-c45.kxcdn.com/angular/angular.js",
      "//elysiumwebsite.s3.amazonaws.com/uploads/blog-media/rockstar/angular.min.js",
      "//inno.blob.core.windows.net/new/libs/AngularJS/1.2.1/angular.min.js",
      "//gift-talk.kakao.com/public/javascripts/angular.min.js",
      "//ajax.googleapis.com/ajax/libs/angularjs/1.2.0rc1/angular-route.min.js",
      "//master-sumok.ru/vendors/angular/angular-cookies.js",
      "//ayicommon-a.akamaihd.net/static/vendor/angular-1.4.2.min.js",
      "//pangxiehaitao.com/framework/angular-1.3.9/angular-animate.min.js",
      "//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.16/angular.min.js",
      "//96fe3ee995e96e922b6b-d10c35bd0a0de2c718b252bc575fdb73.ssl.cf1.rackcdn.com/angular.js",
      "//oss.maxcdn.com/angularjs/1.2.20/angular.min.js",
      "//reports.zemanta.com/smedia/common/angularjs/1.2.11/angular.js",
      "//cdn.shopify.com/s/files/1/0225/6463/t/1/assets/angular-animate.min.js",
      "//parademanagement.com.s3-website-ap-southeast-1.amazonaws.com/js/angular.min.js",
      "//cdn.jsdelivr.net/angularjs/1.1.2/angular.min.js",
      "//eb2883ede55c53e09fd5-9c145fb03d93709ea57875d307e2d82e.ssl.cf3.rackcdn.com/components/angular-resource.min.js",
      "//andors-trail.googlecode.com/git/AndorsTrailEdit/lib/angular.min.js",
      "//cdn.walkme.com/General/EnvironmentTests/angular/angular.min.js",
      "//laundrymail.com/angular/angular.js",
      "//s3-eu-west-1.amazonaws.com/staticancpa/js/angular-cookies.min.js",
      "//collade.demo.stswp.com/js/vendor/angular.min.js",
      "//mrfishie.github.io/sailor/bower_components/angular/angular.min.js",
      "//askgithub.com/static/js/angular.min.js",
      "//services.amazon.com/solution-providers/assets/vendor/angular-cookies.min.js",
      "//raw.githubusercontent.com/angular/code.angularjs.org/master/1.0.7/angular-resource.js",
      "//prb-resume.appspot.com/bower_components/angular-animate/angular-animate.js",
      "//dl.dropboxusercontent.com/u/30877786/angular.min.js",
      "//static.tumblr.com/x5qdx0r/nPOnngtff/angular-resource.min_1_.js",
      "//storage.googleapis.com/assets-prod.urbansitter.net/us-sym/assets/vendor/angular-sanitize/angular-sanitize.min.js",
      "//twitter.github.io/labella.js/bower_components/angular/angular.min.js",
      "//cdn2-casinoroom.global.ssl.fastly.net/js/lib/angular-animate.min.js",
      "//www.adobe.com/devnet-apps/flashshowcase/lib/angular/angular.1.1.5.min.js",
      "//eternal-sunset.herokuapp.com/bower_components/angular/angular.js",
      "//cdn.bootcss.com/angular.js/1.2.0/angular.min.js"
    ];
  }
});

// node_modules/csp_evaluator/dist/allowlist_bypasses/flash.js
var require_flash = __commonJS({
  "node_modules/csp_evaluator/dist/allowlist_bypasses/flash.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.URLS = void 0;
    exports.URLS = [
      "//vk.com/swf/video.swf",
      "//ajax.googleapis.com/ajax/libs/yui/2.8.0r4/build/charts/assets/charts.swf"
    ];
  }
});

// node_modules/csp_evaluator/dist/allowlist_bypasses/jsonp.js
var require_jsonp = __commonJS({
  "node_modules/csp_evaluator/dist/allowlist_bypasses/jsonp.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.URLS = exports.NEEDS_EVAL = void 0;
    exports.NEEDS_EVAL = [
      "googletagmanager.com",
      "www.googletagmanager.com",
      "www.googleadservices.com",
      "google-analytics.com",
      "ssl.google-analytics.com",
      "www.google-analytics.com"
    ];
    exports.URLS = [
      "//bebezoo.1688.com/fragment/index.htm",
      "//www.google-analytics.com/gtm/js",
      "//googleads.g.doubleclick.net/pagead/conversion/1036918760/wcm",
      "//www.googleadservices.com/pagead/conversion/1070110417/wcm",
      "//www.google.com/tools/feedback/escalation-options",
      "//pin.aliyun.com/check_audio",
      "//offer.alibaba.com/market/CID100002954/5/fetchKeyword.do",
      "//ccrprod.alipay.com/ccr/arriveTime.json",
      "//group.aliexpress.com/ajaxAcquireGroupbuyProduct.do",
      "//detector.alicdn.com/2.7.3/index.php",
      "//suggest.taobao.com/sug",
      "//translate.google.com/translate_a/l",
      "//count.tbcdn.cn//counter3",
      "//wb.amap.com/channel.php",
      "//translate.googleapis.com/translate_a/l",
      "//afpeng.alimama.com/ex",
      "//accounts.google.com/o/oauth2/revoke",
      "//pagead2.googlesyndication.com/relatedsearch",
      "//yandex.ru/soft/browsers/check",
      "//api.facebook.com/restserver.php",
      "//mts0.googleapis.com/maps/vt",
      "//syndication.twitter.com/widgets/timelines/765840589183213568",
      "//www.youtube.com/profile_style",
      "//googletagmanager.com/gtm/js",
      "//mc.yandex.ru/watch/24306916/1",
      "//share.yandex.net/counter/gpp/",
      "//ok.go.mail.ru/lady_on_lady_recipes_r.json",
      "//d1f69o4buvlrj5.cloudfront.net/__efa_15_1_ornpba.xekq.arg/optout_check",
      "//www.googletagmanager.com/gtm/js",
      "//api.vk.com/method/wall.get",
      "//www.sharethis.com/get-publisher-info.php",
      "//google.ru/maps/vt",
      "//pro.netrox.sc/oapi/h_checksite.ashx",
      "//vimeo.com/api/oembed.json/",
      "//de.blog.newrelic.com/wp-admin/admin-ajax.php",
      "//ajax.googleapis.com/ajax/services/search/news",
      "//ssl.google-analytics.com/gtm/js",
      "//pubsub.pubnub.com/subscribe/demo/hello_world/",
      "//pass.yandex.ua/services",
      "//id.rambler.ru/script/topline_info.js",
      "//m.addthis.com/live/red_lojson/100eng.json",
      "//passport.ngs.ru/ajax/check",
      "//catalog.api.2gis.ru/ads/search",
      "//gum.criteo.com/sync",
      "//maps.google.com/maps/vt",
      "//ynuf.alipay.com/service/um.json",
      "//securepubads.g.doubleclick.net/gampad/ads",
      "//c.tiles.mapbox.com/v3/texastribune.tx-congress-cvap/6/15/26.grid.json",
      "//rexchange.begun.ru/banners",
      "//an.yandex.ru/page/147484",
      "//links.services.disqus.com/api/ping",
      "//api.map.baidu.com/",
      "//tj.gongchang.com/api/keywordrecomm/",
      "//data.gongchang.com/livegrail/",
      "//ulogin.ru/token.php",
      "//beta.gismeteo.ru/api/informer/layout.js/120x240-3/ru/",
      "//maps.googleapis.com/maps/api/js/GeoPhotoService.GetMetadata",
      "//a.config.skype.com/config/v1/Skype/908_1.33.0.111/SkypePersonalization",
      "//maps.beeline.ru/w",
      "//target.ukr.net/",
      "//www.meteoprog.ua/data/weather/informer/Poltava.js",
      "//cdn.syndication.twimg.com/widgets/timelines/599200054310604802",
      "//wslocker.ru/client/user.chk.php",
      "//community.adobe.com/CommunityPod/getJSON",
      "//maps.google.lv/maps/vt",
      "//dev.virtualearth.net/REST/V1/Imagery/Metadata/AerialWithLabels/26.318581",
      "//awaps.yandex.ru/10/8938/02400400.",
      "//a248.e.akamai.net/h5.hulu.com/h5.mp4",
      "//nominatim.openstreetmap.org/",
      "//plugins.mozilla.org/en-us/plugins_list.json",
      "//h.cackle.me/widget/32153/bootstrap",
      "//graph.facebook.com/1/",
      "//fellowes.ugc.bazaarvoice.com/data/reviews.json",
      "//widgets.pinterest.com/v3/pidgets/boards/ciciwin/hedgehog-squirrel-crafts/pins/",
      "//se.wikipedia.org/w/api.php",
      "//cse.google.com/api/007627024705277327428/cse/r3vs7b0fcli/queries/js",
      "//relap.io/api/v2/similar_pages_jsonp.js",
      "//c1n3.hypercomments.com/stream/subscribe",
      "//maps.google.de/maps/vt",
      "//books.google.com/books",
      "//connect.mail.ru/share_count",
      "//tr.indeed.com/m/newjobs",
      "//www-onepick-opensocial.googleusercontent.com/gadgets/proxy",
      "//www.panoramio.com/map/get_panoramas.php",
      "//client.siteheart.com/streamcli/client",
      "//www.facebook.com/restserver.php",
      "//autocomplete.travelpayouts.com/avia",
      "//www.googleapis.com/freebase/v1/topic/m/0344_",
      "//mts1.googleapis.com/mapslt/ft",
      "//publish.twitter.com/oembed",
      "//fast.wistia.com/embed/medias/o75jtw7654.json",
      "//partner.googleadservices.com/gampad/ads",
      "//pass.yandex.ru/services",
      "//gupiao.baidu.com/stocks/stockbets",
      "//widget.admitad.com/widget/init",
      "//api.instagram.com/v1/tags/partykungen23328/media/recent",
      "//video.media.yql.yahoo.com/v1/video/sapi/streams/063fb76c-6c70-38c5-9bbc-04b7c384de2b",
      "//ib.adnxs.com/jpt",
      "//pass.yandex.com/services",
      "//www.google.de/maps/vt",
      "//clients1.google.com/complete/search",
      "//api.userlike.com/api/chat/slot/proactive/",
      "//www.youku.com/index_cookielist/s/jsonp",
      "//mt1.googleapis.com/mapslt/ft",
      "//api.mixpanel.com/track/",
      "//wpd.b.qq.com/cgi/get_sign.php",
      "//pipes.yahooapis.com/pipes/pipe.run",
      "//gdata.youtube.com/feeds/api/videos/WsJIHN1kNWc",
      "//9.chart.apis.google.com/chart",
      "//cdn.syndication.twitter.com/moments/709229296800440320",
      "//api.flickr.com/services/feeds/photos_friends.gne",
      "//cbks0.googleapis.com/cbk",
      "//www.blogger.com/feeds/5578653387562324002/posts/summary/4427562025302749269",
      "//query.yahooapis.com/v1/public/yql",
      "//kecngantang.blogspot.com/feeds/posts/default/-/Komik",
      "//www.travelpayouts.com/widgets/50f53ce9ada1b54bcc000031.json",
      "//i.cackle.me/widget/32586/bootstrap",
      "//translate.yandex.net/api/v1.5/tr.json/detect",
      "//a.tiles.mapbox.com/v3/zentralmedia.map-n2raeauc.jsonp",
      "//maps.google.ru/maps/vt",
      "//c1n2.hypercomments.com/stream/subscribe",
      "//rec.ydf.yandex.ru/cookie",
      "//cdn.jsdelivr.net"
    ];
  }
});

// node_modules/csp_evaluator/dist/utils.js
var require_utils = __commonJS({
  "node_modules/csp_evaluator/dist/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.applyCheckFunktionToDirectives = exports.matchWildcardUrls = exports.getHostname = exports.getSchemeFreeUrl = void 0;
    function getSchemeFreeUrl(url) {
      url = url.replace(/^\w[+\w.-]*:\/\//i, "");
      url = url.replace(/^\/\//, "");
      return url;
    }
    __name(getSchemeFreeUrl, "getSchemeFreeUrl");
    exports.getSchemeFreeUrl = getSchemeFreeUrl;
    function getHostname(url) {
      const hostname = new URL("https://" + getSchemeFreeUrl(url).replace(":*", "").replace("*", "wildcard_placeholder")).hostname.replace("wildcard_placeholder", "*");
      const ipv6Regex = /^\[[\d:]+\]/;
      if (getSchemeFreeUrl(url).match(ipv6Regex) && !hostname.match(ipv6Regex)) {
        return "[" + hostname + "]";
      }
      return hostname;
    }
    __name(getHostname, "getHostname");
    exports.getHostname = getHostname;
    function setScheme(u) {
      if (u.startsWith("//")) {
        return u.replace("//", "https://");
      }
      return u;
    }
    __name(setScheme, "setScheme");
    function matchWildcardUrls(cspUrlString, listOfUrlStrings) {
      const cspUrl = new URL(setScheme(cspUrlString.replace(":*", "").replace("*", "wildcard_placeholder")));
      const listOfUrls = listOfUrlStrings.map((u) => new URL(setScheme(u)));
      const host = cspUrl.hostname.toLowerCase();
      const hostHasWildcard = host.startsWith("wildcard_placeholder.");
      const wildcardFreeHost = host.replace(/^\wildcard_placeholder/i, "");
      const path = cspUrl.pathname;
      const hasPath = path !== "/";
      for (const url of listOfUrls) {
        const domain = url.hostname;
        if (!domain.endsWith(wildcardFreeHost)) {
          continue;
        }
        if (!hostHasWildcard && host !== domain) {
          continue;
        }
        if (hasPath) {
          if (path.endsWith("/")) {
            if (!url.pathname.startsWith(path)) {
              continue;
            }
          } else {
            if (url.pathname !== path) {
              continue;
            }
          }
        }
        return url;
      }
      return null;
    }
    __name(matchWildcardUrls, "matchWildcardUrls");
    exports.matchWildcardUrls = matchWildcardUrls;
    function applyCheckFunktionToDirectives(parsedCsp, check) {
      const directiveNames = Object.keys(parsedCsp.directives);
      for (const directive of directiveNames) {
        const directiveValues = parsedCsp.directives[directive];
        if (directiveValues) {
          check(directive, directiveValues);
        }
      }
    }
    __name(applyCheckFunktionToDirectives, "applyCheckFunktionToDirectives");
    exports.applyCheckFunktionToDirectives = applyCheckFunktionToDirectives;
  }
});

// node_modules/csp_evaluator/dist/checks/security_checks.js
var require_security_checks = __commonJS({
  "node_modules/csp_evaluator/dist/checks/security_checks.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return m[k];
      }, "get") });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkHasConfiguredReporting = exports.checkSrcHttp = exports.checkNonceLength = exports.checkDeprecatedDirective = exports.checkIpSource = exports.looksLikeIpAddress = exports.checkFlashObjectAllowlistBypass = exports.checkScriptAllowlistBypass = exports.checkMissingDirectives = exports.checkMultipleMissingBaseUriDirective = exports.checkMissingBaseUriDirective = exports.checkMissingScriptSrcDirective = exports.checkMissingObjectSrcDirective = exports.checkWildcards = exports.checkPlainUrlSchemes = exports.checkScriptUnsafeEval = exports.checkScriptUnsafeInline = exports.URL_SCHEMES_CAUSING_XSS = exports.DIRECTIVES_CAUSING_XSS = void 0;
    var angular = __importStar(require_angular());
    var flash = __importStar(require_flash());
    var jsonp = __importStar(require_jsonp());
    var csp = __importStar(require_csp());
    var csp_1 = require_csp();
    var finding_1 = require_finding();
    var utils = __importStar(require_utils());
    exports.DIRECTIVES_CAUSING_XSS = [
      csp_1.Directive.SCRIPT_SRC,
      csp_1.Directive.SCRIPT_SRC_ATTR,
      csp_1.Directive.SCRIPT_SRC_ELEM,
      csp_1.Directive.OBJECT_SRC,
      csp_1.Directive.BASE_URI
    ];
    exports.URL_SCHEMES_CAUSING_XSS = ["data:", "http:", "https:"];
    function checkScriptUnsafeInline(effectiveCsp) {
      const violations = [];
      const directivesToCheck = effectiveCsp.getEffectiveDirectives([
        csp_1.Directive.SCRIPT_SRC,
        csp_1.Directive.SCRIPT_SRC_ATTR,
        csp_1.Directive.SCRIPT_SRC_ELEM
      ]);
      for (const directive of directivesToCheck) {
        const values = effectiveCsp.directives[directive] || [];
        if (values.includes(csp_1.Keyword.UNSAFE_INLINE)) {
          violations.push(new finding_1.Finding(finding_1.Type.SCRIPT_UNSAFE_INLINE, `'unsafe-inline' allows the execution of unsafe in-page scripts and event handlers.`, finding_1.Severity.HIGH, directive, csp_1.Keyword.UNSAFE_INLINE));
        }
        if (values.includes(csp_1.Keyword.UNSAFE_HASHES)) {
          violations.push(new finding_1.Finding(finding_1.Type.SCRIPT_UNSAFE_HASHES, `'unsafe-hashes', while safer than 'unsafe-inline', allows the execution of unsafe in-page scripts and event handlers as long as their hashes appear in the CSP. Please refactor them to no longer use inline scripts if possible.`, finding_1.Severity.MEDIUM_MAYBE, directive, csp_1.Keyword.UNSAFE_HASHES));
        }
      }
      return violations;
    }
    __name(checkScriptUnsafeInline, "checkScriptUnsafeInline");
    exports.checkScriptUnsafeInline = checkScriptUnsafeInline;
    function checkScriptUnsafeEval(parsedCsp) {
      const violations = [];
      const directivesToCheck = parsedCsp.getEffectiveDirectives([
        csp_1.Directive.SCRIPT_SRC,
        csp_1.Directive.SCRIPT_SRC_ATTR,
        csp_1.Directive.SCRIPT_SRC_ELEM
      ]);
      for (const directive of directivesToCheck) {
        const values = parsedCsp.directives[directive] || [];
        if (values.includes(csp_1.Keyword.UNSAFE_EVAL)) {
          violations.push(new finding_1.Finding(finding_1.Type.SCRIPT_UNSAFE_EVAL, `'unsafe-eval' allows the execution of code injected into DOM APIs such as eval().`, finding_1.Severity.MEDIUM_MAYBE, directive, csp_1.Keyword.UNSAFE_EVAL));
        }
      }
      return violations;
    }
    __name(checkScriptUnsafeEval, "checkScriptUnsafeEval");
    exports.checkScriptUnsafeEval = checkScriptUnsafeEval;
    function checkPlainUrlSchemes(parsedCsp) {
      const violations = [];
      const directivesToCheck = parsedCsp.getEffectiveDirectives(exports.DIRECTIVES_CAUSING_XSS);
      for (const directive of directivesToCheck) {
        const values = parsedCsp.directives[directive] || [];
        for (const value of values) {
          if (exports.URL_SCHEMES_CAUSING_XSS.includes(value)) {
            violations.push(new finding_1.Finding(finding_1.Type.PLAIN_URL_SCHEMES, value + " URI in " + directive + " allows the execution of unsafe scripts.", finding_1.Severity.HIGH, directive, value));
          }
        }
      }
      return violations;
    }
    __name(checkPlainUrlSchemes, "checkPlainUrlSchemes");
    exports.checkPlainUrlSchemes = checkPlainUrlSchemes;
    function checkWildcards(parsedCsp) {
      const violations = [];
      const directivesToCheck = parsedCsp.getEffectiveDirectives(exports.DIRECTIVES_CAUSING_XSS);
      for (const directive of directivesToCheck) {
        const values = parsedCsp.directives[directive] || [];
        for (const value of values) {
          const url = utils.getSchemeFreeUrl(value);
          if (url === "*") {
            violations.push(new finding_1.Finding(finding_1.Type.PLAIN_WILDCARD, directive + ` should not allow '*' as source`, finding_1.Severity.HIGH, directive, value));
            continue;
          }
        }
      }
      return violations;
    }
    __name(checkWildcards, "checkWildcards");
    exports.checkWildcards = checkWildcards;
    function checkMissingObjectSrcDirective(parsedCsp) {
      let objectRestrictions = [];
      if (csp_1.Directive.OBJECT_SRC in parsedCsp.directives) {
        objectRestrictions = parsedCsp.directives[csp_1.Directive.OBJECT_SRC];
      } else if (csp_1.Directive.DEFAULT_SRC in parsedCsp.directives) {
        objectRestrictions = parsedCsp.directives[csp_1.Directive.DEFAULT_SRC];
      }
      if (objectRestrictions !== void 0 && objectRestrictions.length >= 1) {
        return [];
      }
      return [new finding_1.Finding(finding_1.Type.MISSING_DIRECTIVES, `Missing object-src allows the injection of plugins which can execute JavaScript. Can you set it to 'none'?`, finding_1.Severity.HIGH, csp_1.Directive.OBJECT_SRC)];
    }
    __name(checkMissingObjectSrcDirective, "checkMissingObjectSrcDirective");
    exports.checkMissingObjectSrcDirective = checkMissingObjectSrcDirective;
    function checkMissingScriptSrcDirective(parsedCsp) {
      if (csp_1.Directive.SCRIPT_SRC in parsedCsp.directives || csp_1.Directive.DEFAULT_SRC in parsedCsp.directives) {
        return [];
      }
      return [new finding_1.Finding(finding_1.Type.MISSING_DIRECTIVES, "script-src directive is missing.", finding_1.Severity.HIGH, csp_1.Directive.SCRIPT_SRC)];
    }
    __name(checkMissingScriptSrcDirective, "checkMissingScriptSrcDirective");
    exports.checkMissingScriptSrcDirective = checkMissingScriptSrcDirective;
    function checkMissingBaseUriDirective(parsedCsp) {
      return checkMultipleMissingBaseUriDirective([parsedCsp]);
    }
    __name(checkMissingBaseUriDirective, "checkMissingBaseUriDirective");
    exports.checkMissingBaseUriDirective = checkMissingBaseUriDirective;
    function checkMultipleMissingBaseUriDirective(parsedCsps) {
      const needsBaseUri = /* @__PURE__ */ __name((csp2) => csp2.policyHasScriptNonces() || csp2.policyHasScriptHashes() && csp2.policyHasStrictDynamic(), "needsBaseUri");
      const hasBaseUri = /* @__PURE__ */ __name((csp2) => csp_1.Directive.BASE_URI in csp2.directives, "hasBaseUri");
      if (parsedCsps.some(needsBaseUri) && !parsedCsps.some(hasBaseUri)) {
        const description = `Missing base-uri allows the injection of base tags. They can be used to set the base URL for all relative (script) URLs to an attacker controlled domain. Can you set it to 'none' or 'self'?`;
        return [new finding_1.Finding(finding_1.Type.MISSING_DIRECTIVES, description, finding_1.Severity.HIGH, csp_1.Directive.BASE_URI)];
      }
      return [];
    }
    __name(checkMultipleMissingBaseUriDirective, "checkMultipleMissingBaseUriDirective");
    exports.checkMultipleMissingBaseUriDirective = checkMultipleMissingBaseUriDirective;
    function checkMissingDirectives(parsedCsp) {
      return [
        ...checkMissingObjectSrcDirective(parsedCsp),
        ...checkMissingScriptSrcDirective(parsedCsp),
        ...checkMissingBaseUriDirective(parsedCsp)
      ];
    }
    __name(checkMissingDirectives, "checkMissingDirectives");
    exports.checkMissingDirectives = checkMissingDirectives;
    function checkScriptAllowlistBypass(parsedCsp) {
      const violations = [];
      parsedCsp.getEffectiveDirectives([csp_1.Directive.SCRIPT_SRC, csp_1.Directive.SCRIPT_SRC_ELEM]).forEach((effectiveScriptSrcDirective) => {
        const scriptSrcValues = parsedCsp.directives[effectiveScriptSrcDirective] || [];
        if (scriptSrcValues.includes(csp_1.Keyword.NONE)) {
          return;
        }
        for (const value of scriptSrcValues) {
          if (value === csp_1.Keyword.SELF) {
            violations.push(new finding_1.Finding(finding_1.Type.SCRIPT_ALLOWLIST_BYPASS, `'self' can be problematic if you host JSONP, AngularJS or user uploaded files.`, finding_1.Severity.MEDIUM_MAYBE, effectiveScriptSrcDirective, value));
            continue;
          }
          if (value.startsWith("'")) {
            continue;
          }
          if (csp.isUrlScheme(value) || value.indexOf(".") === -1) {
            continue;
          }
          const url = "//" + utils.getSchemeFreeUrl(value);
          const angularBypass = utils.matchWildcardUrls(url, angular.URLS);
          let jsonpBypass = utils.matchWildcardUrls(url, jsonp.URLS);
          if (jsonpBypass) {
            const evalRequired = jsonp.NEEDS_EVAL.includes(jsonpBypass.hostname);
            const evalPresent = scriptSrcValues.includes(csp_1.Keyword.UNSAFE_EVAL);
            if (evalRequired && !evalPresent) {
              jsonpBypass = null;
            }
          }
          if (jsonpBypass || angularBypass) {
            let bypassDomain = "";
            let bypassTxt = "";
            if (jsonpBypass) {
              bypassDomain = jsonpBypass.hostname;
              bypassTxt = " JSONP endpoints";
            }
            if (angularBypass) {
              bypassDomain = angularBypass.hostname;
              bypassTxt += bypassTxt.trim() === "" ? "" : " and";
              bypassTxt += " Angular libraries";
            }
            violations.push(new finding_1.Finding(finding_1.Type.SCRIPT_ALLOWLIST_BYPASS, bypassDomain + " is known to host" + bypassTxt + " which allow to bypass this CSP.", finding_1.Severity.HIGH, effectiveScriptSrcDirective, value));
          } else {
            violations.push(new finding_1.Finding(finding_1.Type.SCRIPT_ALLOWLIST_BYPASS, `No bypass found; make sure that this URL doesn't serve JSONP replies or Angular libraries.`, finding_1.Severity.MEDIUM_MAYBE, effectiveScriptSrcDirective, value));
          }
        }
      });
      return violations;
    }
    __name(checkScriptAllowlistBypass, "checkScriptAllowlistBypass");
    exports.checkScriptAllowlistBypass = checkScriptAllowlistBypass;
    function checkFlashObjectAllowlistBypass(parsedCsp) {
      const violations = [];
      const effectiveObjectSrcDirective = parsedCsp.getEffectiveDirective(csp_1.Directive.OBJECT_SRC);
      const objectSrcValues = parsedCsp.directives[effectiveObjectSrcDirective] || [];
      const pluginTypes = parsedCsp.directives[csp_1.Directive.PLUGIN_TYPES];
      if (pluginTypes && !pluginTypes.includes("application/x-shockwave-flash")) {
        return [];
      }
      for (const value of objectSrcValues) {
        if (value === csp_1.Keyword.NONE) {
          return [];
        }
        const url = "//" + utils.getSchemeFreeUrl(value);
        const flashBypass = utils.matchWildcardUrls(url, flash.URLS);
        if (flashBypass) {
          violations.push(new finding_1.Finding(finding_1.Type.OBJECT_ALLOWLIST_BYPASS, flashBypass.hostname + " is known to host Flash files which allow to bypass this CSP.", finding_1.Severity.HIGH, effectiveObjectSrcDirective, value));
        } else if (effectiveObjectSrcDirective === csp_1.Directive.OBJECT_SRC) {
          violations.push(new finding_1.Finding(finding_1.Type.OBJECT_ALLOWLIST_BYPASS, `Can you restrict object-src to 'none' only?`, finding_1.Severity.MEDIUM_MAYBE, effectiveObjectSrcDirective, value));
        }
      }
      return violations;
    }
    __name(checkFlashObjectAllowlistBypass, "checkFlashObjectAllowlistBypass");
    exports.checkFlashObjectAllowlistBypass = checkFlashObjectAllowlistBypass;
    function looksLikeIpAddress(maybeIp) {
      if (maybeIp.startsWith("[") && maybeIp.endsWith("]")) {
        return true;
      }
      if (/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(maybeIp)) {
        return true;
      }
      return false;
    }
    __name(looksLikeIpAddress, "looksLikeIpAddress");
    exports.looksLikeIpAddress = looksLikeIpAddress;
    function checkIpSource(parsedCsp) {
      const violations = [];
      const checkIp = /* @__PURE__ */ __name((directive, directiveValues) => {
        for (const value of directiveValues) {
          const host = utils.getHostname(value);
          if (looksLikeIpAddress(host)) {
            if (host === "127.0.0.1") {
              violations.push(new finding_1.Finding(finding_1.Type.IP_SOURCE, directive + " directive allows localhost as source. Please make sure to remove this in production environments.", finding_1.Severity.INFO, directive, value));
            } else {
              violations.push(new finding_1.Finding(finding_1.Type.IP_SOURCE, directive + " directive has an IP-Address as source: " + host + " (will be ignored by browsers!). ", finding_1.Severity.INFO, directive, value));
            }
          }
        }
      }, "checkIp");
      utils.applyCheckFunktionToDirectives(parsedCsp, checkIp);
      return violations;
    }
    __name(checkIpSource, "checkIpSource");
    exports.checkIpSource = checkIpSource;
    function checkDeprecatedDirective(parsedCsp) {
      const violations = [];
      if (csp_1.Directive.REFLECTED_XSS in parsedCsp.directives) {
        violations.push(new finding_1.Finding(finding_1.Type.DEPRECATED_DIRECTIVE, "reflected-xss is deprecated since CSP2. Please, use the X-XSS-Protection header instead.", finding_1.Severity.INFO, csp_1.Directive.REFLECTED_XSS));
      }
      if (csp_1.Directive.REFERRER in parsedCsp.directives) {
        violations.push(new finding_1.Finding(finding_1.Type.DEPRECATED_DIRECTIVE, "referrer is deprecated since CSP2. Please, use the Referrer-Policy header instead.", finding_1.Severity.INFO, csp_1.Directive.REFERRER));
      }
      if (csp_1.Directive.DISOWN_OPENER in parsedCsp.directives) {
        violations.push(new finding_1.Finding(finding_1.Type.DEPRECATED_DIRECTIVE, "disown-opener is deprecated since CSP3. Please, use the Cross Origin Opener Policy header instead.", finding_1.Severity.INFO, csp_1.Directive.DISOWN_OPENER));
      }
      if (csp_1.Directive.PREFETCH_SRC in parsedCsp.directives) {
        violations.push(new finding_1.Finding(finding_1.Type.DEPRECATED_DIRECTIVE, "prefetch-src is deprecated since CSP3. Be aware that this feature may cease to work at any time.", finding_1.Severity.INFO, csp_1.Directive.PREFETCH_SRC));
      }
      return violations;
    }
    __name(checkDeprecatedDirective, "checkDeprecatedDirective");
    exports.checkDeprecatedDirective = checkDeprecatedDirective;
    function checkNonceLength(parsedCsp) {
      const noncePattern = new RegExp("^'nonce-(.+)'$");
      const violations = [];
      utils.applyCheckFunktionToDirectives(parsedCsp, (directive, directiveValues) => {
        for (const value of directiveValues) {
          const match = value.match(noncePattern);
          if (!match) {
            continue;
          }
          const nonceValue = match[1];
          if (nonceValue.length < 8) {
            violations.push(new finding_1.Finding(finding_1.Type.NONCE_LENGTH, "Nonces should be at least 8 characters long.", finding_1.Severity.MEDIUM, directive, value));
          }
          if (!csp.isNonce(value, true)) {
            violations.push(new finding_1.Finding(finding_1.Type.NONCE_CHARSET, "Nonces should only use the base64 charset.", finding_1.Severity.INFO, directive, value));
          }
        }
      });
      return violations;
    }
    __name(checkNonceLength, "checkNonceLength");
    exports.checkNonceLength = checkNonceLength;
    function checkSrcHttp(parsedCsp) {
      const violations = [];
      utils.applyCheckFunktionToDirectives(parsedCsp, (directive, directiveValues) => {
        for (const value of directiveValues) {
          const description = directive === csp_1.Directive.REPORT_URI ? "Use HTTPS to send violation reports securely." : "Allow only resources downloaded over HTTPS.";
          if (value.startsWith("http://")) {
            violations.push(new finding_1.Finding(finding_1.Type.SRC_HTTP, description, finding_1.Severity.MEDIUM, directive, value));
          }
        }
      });
      return violations;
    }
    __name(checkSrcHttp, "checkSrcHttp");
    exports.checkSrcHttp = checkSrcHttp;
    function checkHasConfiguredReporting(parsedCsp) {
      const reportUriValues = parsedCsp.directives[csp_1.Directive.REPORT_URI] || [];
      if (reportUriValues.length > 0) {
        return [];
      }
      const reportToValues = parsedCsp.directives[csp_1.Directive.REPORT_TO] || [];
      if (reportToValues.length > 0) {
        return [new finding_1.Finding(finding_1.Type.REPORT_TO_ONLY, `This CSP policy only provides a reporting destination via the 'report-to' directive. This directive is only supported in Chromium-based browsers so it is recommended to also use a 'report-uri' directive.`, finding_1.Severity.INFO, csp_1.Directive.REPORT_TO)];
      }
      return [new finding_1.Finding(finding_1.Type.REPORTING_DESTINATION_MISSING, "This CSP policy does not configure a reporting destination. This makes it difficult to maintain the CSP policy over time and monitor for any breakages.", finding_1.Severity.INFO, csp_1.Directive.REPORT_URI)];
    }
    __name(checkHasConfiguredReporting, "checkHasConfiguredReporting");
    exports.checkHasConfiguredReporting = checkHasConfiguredReporting;
  }
});

// node_modules/csp_evaluator/dist/checks/strictcsp_checks.js
var require_strictcsp_checks = __commonJS({
  "node_modules/csp_evaluator/dist/checks/strictcsp_checks.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return m[k];
      }, "get") });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkRequiresTrustedTypesForScripts = exports.checkAllowlistFallback = exports.checkUnsafeInlineFallback = exports.checkStrictDynamicNotStandalone = exports.checkStrictDynamic = void 0;
    var csp = __importStar(require_csp());
    var csp_1 = require_csp();
    var finding_1 = require_finding();
    function checkStrictDynamic(parsedCsp) {
      const directiveName = parsedCsp.getEffectiveDirective(csp.Directive.SCRIPT_SRC);
      const values = parsedCsp.directives[directiveName] || [];
      const schemeOrHostPresent = values.some((v) => !v.startsWith("'"));
      if (schemeOrHostPresent && !values.includes(csp_1.Keyword.STRICT_DYNAMIC)) {
        return [new finding_1.Finding(finding_1.Type.STRICT_DYNAMIC, "Host allowlists can frequently be bypassed. Consider using 'strict-dynamic' in combination with CSP nonces or hashes.", finding_1.Severity.STRICT_CSP, directiveName)];
      }
      return [];
    }
    __name(checkStrictDynamic, "checkStrictDynamic");
    exports.checkStrictDynamic = checkStrictDynamic;
    function checkStrictDynamicNotStandalone(parsedCsp) {
      const directiveName = parsedCsp.getEffectiveDirective(csp.Directive.SCRIPT_SRC);
      const values = parsedCsp.directives[directiveName] || [];
      if (values.includes(csp_1.Keyword.STRICT_DYNAMIC) && (!parsedCsp.policyHasScriptNonces() && !parsedCsp.policyHasScriptHashes())) {
        return [new finding_1.Finding(finding_1.Type.STRICT_DYNAMIC_NOT_STANDALONE, "'strict-dynamic' without a CSP nonce/hash will block all scripts.", finding_1.Severity.INFO, directiveName)];
      }
      return [];
    }
    __name(checkStrictDynamicNotStandalone, "checkStrictDynamicNotStandalone");
    exports.checkStrictDynamicNotStandalone = checkStrictDynamicNotStandalone;
    function checkUnsafeInlineFallback(parsedCsp) {
      if (!parsedCsp.policyHasScriptNonces() && !parsedCsp.policyHasScriptHashes()) {
        return [];
      }
      const directiveName = parsedCsp.getEffectiveDirective(csp.Directive.SCRIPT_SRC);
      const values = parsedCsp.directives[directiveName] || [];
      if (!values.includes(csp_1.Keyword.UNSAFE_INLINE)) {
        return [new finding_1.Finding(finding_1.Type.UNSAFE_INLINE_FALLBACK, "Consider adding 'unsafe-inline' (ignored by browsers supporting nonces/hashes) to be backward compatible with older browsers.", finding_1.Severity.STRICT_CSP, directiveName)];
      }
      return [];
    }
    __name(checkUnsafeInlineFallback, "checkUnsafeInlineFallback");
    exports.checkUnsafeInlineFallback = checkUnsafeInlineFallback;
    function checkAllowlistFallback(parsedCsp) {
      const directiveName = parsedCsp.getEffectiveDirective(csp.Directive.SCRIPT_SRC);
      const values = parsedCsp.directives[directiveName] || [];
      if (!values.includes(csp_1.Keyword.STRICT_DYNAMIC)) {
        return [];
      }
      if (!values.some((v) => ["http:", "https:", "*"].includes(v) || v.includes("."))) {
        return [new finding_1.Finding(finding_1.Type.ALLOWLIST_FALLBACK, "Consider adding https: and http: url schemes (ignored by browsers supporting 'strict-dynamic') to be backward compatible with older browsers.", finding_1.Severity.STRICT_CSP, directiveName)];
      }
      return [];
    }
    __name(checkAllowlistFallback, "checkAllowlistFallback");
    exports.checkAllowlistFallback = checkAllowlistFallback;
    function checkRequiresTrustedTypesForScripts(parsedCsp) {
      const directiveName = parsedCsp.getEffectiveDirective(csp.Directive.REQUIRE_TRUSTED_TYPES_FOR);
      const values = parsedCsp.directives[directiveName] || [];
      if (!values.includes(csp.TrustedTypesSink.SCRIPT)) {
        return [new finding_1.Finding(finding_1.Type.REQUIRE_TRUSTED_TYPES_FOR_SCRIPTS, `Consider requiring Trusted Types for scripts to lock down DOM XSS injection sinks. You can do this by adding "require-trusted-types-for 'script'" to your policy.`, finding_1.Severity.INFO, csp.Directive.REQUIRE_TRUSTED_TYPES_FOR)];
      }
      return [];
    }
    __name(checkRequiresTrustedTypesForScripts, "checkRequiresTrustedTypesForScripts");
    exports.checkRequiresTrustedTypesForScripts = checkRequiresTrustedTypesForScripts;
  }
});

// node_modules/csp_evaluator/dist/lighthouse/lighthouse_checks.js
var require_lighthouse_checks = __commonJS({
  "node_modules/csp_evaluator/dist/lighthouse/lighthouse_checks.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.evaluateForSyntaxErrors = exports.evaluateForWarnings = exports.evaluateForFailure = void 0;
    var parser_checks_1 = require_parser_checks();
    var security_checks_1 = require_security_checks();
    var strictcsp_checks_1 = require_strictcsp_checks();
    var csp_1 = require_csp();
    function arrayContains(arr, elem) {
      return arr.some((e) => e.equals(elem));
    }
    __name(arrayContains, "arrayContains");
    function setIntersection(sets) {
      const intersection = [];
      if (sets.length === 0) {
        return intersection;
      }
      const firstSet = sets[0];
      for (const elem of firstSet) {
        if (sets.every((set) => arrayContains(set, elem))) {
          intersection.push(elem);
        }
      }
      return intersection;
    }
    __name(setIntersection, "setIntersection");
    function setUnion(sets) {
      const union = [];
      for (const set of sets) {
        for (const elem of set) {
          if (!arrayContains(union, elem)) {
            union.push(elem);
          }
        }
      }
      return union;
    }
    __name(setUnion, "setUnion");
    function atLeastOnePasses(parsedCsps, checker) {
      const findings = [];
      for (const parsedCsp of parsedCsps) {
        findings.push(checker(parsedCsp));
      }
      return setIntersection(findings);
    }
    __name(atLeastOnePasses, "atLeastOnePasses");
    function atLeastOneFails(parsedCsps, checker) {
      const findings = [];
      for (const parsedCsp of parsedCsps) {
        findings.push(checker(parsedCsp));
      }
      return setUnion(findings);
    }
    __name(atLeastOneFails, "atLeastOneFails");
    function evaluateForFailure2(parsedCsps) {
      const targetsXssFindings = [
        ...atLeastOnePasses(parsedCsps, security_checks_1.checkMissingScriptSrcDirective),
        ...atLeastOnePasses(parsedCsps, security_checks_1.checkMissingObjectSrcDirective),
        ...security_checks_1.checkMultipleMissingBaseUriDirective(parsedCsps)
      ];
      const effectiveCsps = parsedCsps.map((csp) => csp.getEffectiveCsp(csp_1.Version.CSP3));
      const effectiveCspsWithScript = effectiveCsps.filter((csp) => {
        const directiveName = csp.getEffectiveDirective(csp_1.Directive.SCRIPT_SRC);
        return csp.directives[directiveName];
      });
      const robust = [
        ...atLeastOnePasses(effectiveCspsWithScript, strictcsp_checks_1.checkStrictDynamic),
        ...atLeastOnePasses(effectiveCspsWithScript, security_checks_1.checkScriptUnsafeInline),
        ...atLeastOnePasses(effectiveCsps, security_checks_1.checkWildcards),
        ...atLeastOnePasses(effectiveCsps, security_checks_1.checkPlainUrlSchemes)
      ];
      return [...targetsXssFindings, ...robust];
    }
    __name(evaluateForFailure2, "evaluateForFailure");
    exports.evaluateForFailure = evaluateForFailure2;
    function evaluateForWarnings2(parsedCsps) {
      return [
        ...atLeastOneFails(parsedCsps, strictcsp_checks_1.checkUnsafeInlineFallback),
        ...atLeastOneFails(parsedCsps, strictcsp_checks_1.checkAllowlistFallback)
      ];
    }
    __name(evaluateForWarnings2, "evaluateForWarnings");
    exports.evaluateForWarnings = evaluateForWarnings2;
    function evaluateForSyntaxErrors2(parsedCsps) {
      const allFindings = [];
      for (const csp of parsedCsps) {
        const findings = [
          ...security_checks_1.checkNonceLength(csp),
          ...parser_checks_1.checkUnknownDirective(csp),
          ...security_checks_1.checkDeprecatedDirective(csp),
          ...parser_checks_1.checkMissingSemicolon(csp),
          ...parser_checks_1.checkInvalidKeyword(csp)
        ];
        allFindings.push(findings);
      }
      return allFindings;
    }
    __name(evaluateForSyntaxErrors2, "evaluateForSyntaxErrors");
    exports.evaluateForSyntaxErrors = evaluateForSyntaxErrors2;
  }
});

// node_modules/csp_evaluator/dist/parser.js
var require_parser = __commonJS({
  "node_modules/csp_evaluator/dist/parser.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: /* @__PURE__ */ __name(function() {
        return m[k];
      }, "get") });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TEST_ONLY = exports.CspParser = void 0;
    var csp = __importStar(require_csp());
    var CspParser2 = class {
      static {
        __name(this, "CspParser");
      }
      constructor(unparsedCsp) {
        this.csp = new csp.Csp();
        this.parse(unparsedCsp);
      }
      parse(unparsedCsp) {
        this.csp = new csp.Csp();
        const directiveTokens = unparsedCsp.split(";");
        for (let i = 0; i < directiveTokens.length; i++) {
          const directiveToken = directiveTokens[i].trim();
          const directiveParts = directiveToken.match(/\S+/g);
          if (Array.isArray(directiveParts)) {
            const directiveName = directiveParts[0].toLowerCase();
            if (directiveName in this.csp.directives) {
              continue;
            }
            if (!csp.isDirective(directiveName)) {
            }
            const directiveValues = [];
            for (let directiveValue, j = 1; directiveValue = directiveParts[j]; j++) {
              directiveValue = normalizeDirectiveValue(directiveValue);
              if (!directiveValues.includes(directiveValue)) {
                directiveValues.push(directiveValue);
              }
            }
            this.csp.directives[directiveName] = directiveValues;
          }
        }
        return this.csp;
      }
    };
    exports.CspParser = CspParser2;
    function normalizeDirectiveValue(directiveValue) {
      directiveValue = directiveValue.trim();
      const directiveValueLower = directiveValue.toLowerCase();
      if (csp.isKeyword(directiveValueLower) || csp.isUrlScheme(directiveValue)) {
        return directiveValueLower;
      }
      return directiveValue;
    }
    __name(normalizeDirectiveValue, "normalizeDirectiveValue");
    exports.TEST_ONLY = { normalizeDirectiveValue };
  }
});

// node_modules/lighthouse/core/lib/csp-evaluator.js
var import_lighthouse_checks = __toESM(require_lighthouse_checks(), 1);
var import_finding = __toESM(require_finding(), 1);
var import_parser = __toESM(require_parser(), 1);
var import_csp = __toESM(require_csp(), 1);
var UIStrings = {
  /** Message shown when a CSP does not have a base-uri directive. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "base-uri", "'none'", and "'self'" do not need to be translated. */
  missingBaseUri: "Missing `base-uri` allows injected `<base>` tags to set the base URL for all relative URLs (e.g. scripts) to an attacker controlled domain. Consider setting `base-uri` to `'none'` or `'self'`.",
  /** Message shown when a CSP does not have a script-src directive. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "script-src" does not need to be translated. */
  missingScriptSrc: "`script-src` directive is missing. This can allow the execution of unsafe scripts.",
  /** Message shown when a CSP does not have a script-src directive. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "object-src" and "'none'" do not need to be translated. */
  missingObjectSrc: "Missing `object-src` allows the injection of plugins that execute unsafe scripts. Consider setting `object-src` to `'none'` if you can.",
  /** Message shown when a CSP uses a domain allowlist to filter out malicious scripts. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "CSP", "'strict-dynamic'", "nonces", and "hashes" do not need to be translated. "allowlists" can be interpreted as "whitelist". */
  strictDynamic: "Host allowlists can frequently be bypassed. Consider using CSP nonces or hashes instead, along with `'strict-dynamic'` if necessary.",
  /** Message shown when a CSP allows inline scripts to be run in the page. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "CSP", "'unsafe-inline'", "nonces", and "hashes" do not need to be translated. */
  unsafeInline: "`'unsafe-inline'` allows the execution of unsafe in-page scripts and event handlers. Consider using CSP nonces or hashes to allow scripts individually.",
  /** Message shown when a CSP is not backwards compatible with browsers that do not support CSP nonces/hashes. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "'unsafe-inline'", "nonces", and "hashes" do not need to be translated. */
  unsafeInlineFallback: "Consider adding `'unsafe-inline'` (ignored by browsers supporting nonces/hashes) to be backward compatible with older browsers.",
  /** Message shown when a CSP is not backwards compatible with browsers that do not support the 'strict-dynamic' keyword. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "http:", "https:", and "'strict-dynamic'" do not need to be translated. */
  allowlistFallback: "Consider adding https: and http: URL schemes (ignored by browsers supporting `'strict-dynamic'`) to be backward compatible with older browsers.",
  /** Message shown when a CSP only provides a reporting destination through the report-to directive. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "report-to", "report-uri", and "Chromium" do not need to be translated. */
  reportToOnly: "The reporting destination is only configured via the report-to directive. This directive is only supported in Chromium-based browsers so it is recommended to also use a `report-uri` directive.",
  /** Message shown when a CSP does not provide a reporting destination. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "CSP" does not need to be translated. */
  reportingDestinationMissing: "No CSP configures a reporting destination. This makes it difficult to maintain the CSP over time and monitor for any breakages.",
  /** Message shown when a CSP nonce has less than 8 characters. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "Nonces" does not need to be translated. */
  nonceLength: "Nonces should be at least 8 characters long.",
  /** Message shown when a CSP nonce does not use teh base64 charset. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "Nonces" and "base84" do not need to be translated. "charset" can be interpreted as "a set of characters". */
  nonceCharset: "Nonces should use the base64 charset.",
  /**
   * @description Message shown when a CSP is missing a semicolon. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy".
   * @example {'object-src'} keyword
   */
  missingSemicolon: "Did you forget the semicolon? {keyword} seems to be a directive, not a keyword.",
  /** Message shown when a CSP contains an unknown keyword. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "CSP" does not need to be translated. */
  unknownDirective: "Unknown CSP directive.",
  /**
   * @description Message shown when a CSP contains an invalid keyword. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy".
   * @example {'invalid-keyword'} keyword
   */
  unknownKeyword: "{keyword} seems to be an invalid keyword.",
  /** Message shown when a CSP uses the deprecated reflected-xss directive. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "reflected-xss", "CSP2" and "X-XSS-Protection" do not need to be translated. */
  deprecatedReflectedXSS: "`reflected-xss` is deprecated since CSP2. Please, use the X-XSS-Protection header instead.",
  /** Message shown when a CSP uses the deprecated referrer directive. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "referrer", "CSP2" and "Referrer-Policy" do not need to be translated. */
  deprecatedReferrer: "`referrer` is deprecated since CSP2. Please, use the Referrer-Policy header instead.",
  /** Message shown when a CSP uses the deprecated disown-opener directive. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy". "disown-opener", "CSP3" and "Cross-Origin-Opener-Policy" do not need to be translated. */
  deprecatedDisownOpener: "`disown-opener` is deprecated since CSP3. Please, use the Cross-Origin-Opener-Policy header instead.",
  /**
   * @description Message shown when a CSP wildcard allows unsafe scripts to be run in the page. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy".
   *  @example {*} keyword
   */
  plainWildcards: "Avoid using plain wildcards ({keyword}) in this directive. Plain wildcards allow scripts to be sourced from an unsafe domain.",
  /**
   * @description Message shown when a CSP URL scheme allows unsafe scripts to be run in the page. Shown in a table with a list of other CSP vulnerabilities and suggestions. "CSP" stands for "Content Security Policy".
   *  @example {https:} keyword
   */
  plainUrlScheme: "Avoid using plain URL schemes ({keyword}) in this directive. Plain URL schemes allow scripts to be sourced from an unsafe domain."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var FINDING_TO_UI_STRING = {
  [import_finding.Type.MISSING_SEMICOLON]: UIStrings.missingSemicolon,
  [import_finding.Type.UNKNOWN_DIRECTIVE]: str_(UIStrings.unknownDirective),
  [import_finding.Type.INVALID_KEYWORD]: UIStrings.unknownKeyword,
  [import_finding.Type.MISSING_DIRECTIVES]: {
    [import_csp.Directive.BASE_URI]: str_(UIStrings.missingBaseUri),
    [import_csp.Directive.SCRIPT_SRC]: str_(UIStrings.missingScriptSrc),
    [import_csp.Directive.OBJECT_SRC]: str_(UIStrings.missingObjectSrc)
  },
  [import_finding.Type.SCRIPT_UNSAFE_INLINE]: str_(UIStrings.unsafeInline),
  [import_finding.Type.PLAIN_WILDCARD]: UIStrings.plainWildcards,
  [import_finding.Type.PLAIN_URL_SCHEMES]: UIStrings.plainUrlScheme,
  [import_finding.Type.NONCE_LENGTH]: str_(UIStrings.nonceLength),
  [import_finding.Type.NONCE_CHARSET]: str_(UIStrings.nonceCharset),
  [import_finding.Type.DEPRECATED_DIRECTIVE]: {
    [import_csp.Directive.REFLECTED_XSS]: str_(UIStrings.deprecatedReflectedXSS),
    [import_csp.Directive.REFERRER]: str_(UIStrings.deprecatedReferrer),
    [import_csp.Directive.DISOWN_OPENER]: str_(UIStrings.deprecatedDisownOpener)
  },
  [import_finding.Type.STRICT_DYNAMIC]: str_(UIStrings.strictDynamic),
  [import_finding.Type.UNSAFE_INLINE_FALLBACK]: str_(UIStrings.unsafeInlineFallback),
  [import_finding.Type.ALLOWLIST_FALLBACK]: str_(UIStrings.allowlistFallback),
  [import_finding.Type.REPORTING_DESTINATION_MISSING]: str_(UIStrings.reportingDestinationMissing),
  [import_finding.Type.REPORT_TO_ONLY]: str_(UIStrings.reportToOnly)
};
function getTranslatedDescription(finding) {
  let result = FINDING_TO_UI_STRING[finding.type];
  if (!result) {
    lighthouse_logger_default.warn("CSP Evaluator", `No translation found for description: ${finding.description}`);
    return finding.description;
  }
  if (isIcuMessage(result)) return result;
  if (typeof result === "string") return str_(result, { keyword: finding.value || "" });
  result = result[finding.directive];
  if (!result) {
    lighthouse_logger_default.warn("CSP Evaluator", `No translation found for description: ${finding.description}`);
    return finding.description;
  }
  return result;
}
__name(getTranslatedDescription, "getTranslatedDescription");
function parseCsp(rawCsp) {
  return new import_parser.CspParser(rawCsp).csp;
}
__name(parseCsp, "parseCsp");
function evaluateRawCspsForXss(rawCsps) {
  const parsedCsps = rawCsps.map(parseCsp);
  const bypasses = (0, import_lighthouse_checks.evaluateForFailure)(parsedCsps);
  const warnings = (0, import_lighthouse_checks.evaluateForWarnings)(parsedCsps);
  const syntax = (0, import_lighthouse_checks.evaluateForSyntaxErrors)(parsedCsps);
  return { bypasses, warnings, syntax };
}
__name(evaluateRawCspsForXss, "evaluateRawCspsForXss");

export {
  require_csp,
  getTranslatedDescription,
  parseCsp,
  evaluateRawCspsForXss
};
/*! Bundled license information:

lighthouse/core/lib/csp-evaluator.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
