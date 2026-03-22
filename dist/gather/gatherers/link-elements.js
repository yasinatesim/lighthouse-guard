import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  MainResourceComputed
} from "./chunk-VUYE7EEN.js";
import "./chunk-62BSSGB3.js";
import {
  createIcuMessageFn
} from "./chunk-GO42M3MA.js";
import "./chunk-VDXIC3K2.js";
import "./chunk-YWWNWPSO.js";
import "./chunk-7CCOEJTA.js";
import {
  pageFunctions
} from "./chunk-GO4LGQT6.js";
import {
  Util
} from "./chunk-5LGJRNXS.js";
import {
  devtools_log_default
} from "./chunk-2DY3KL3O.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __commonJS,
  __name,
  __toESM
} from "./chunk-TE5Z3W7Q.js";

// node_modules/http-link-header/lib/link.js
var require_link = __commonJS({
  "node_modules/http-link-header/lib/link.js"(exports, module) {
    "use strict";
    var COMPATIBLE_ENCODING_PATTERN = /^utf-?8|ascii|utf-?16-?le|ucs-?2|base-?64|latin-?1$/i;
    var WS_TRIM_PATTERN = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    var WS_CHAR_PATTERN = /\s|\uFEFF|\xA0/;
    var WS_FOLD_PATTERN = /\r?\n[\x20\x09]+/g;
    var DELIMITER_PATTERN = /[;,"]/;
    var WS_DELIMITER_PATTERN = /[;,"]|\s/;
    var TOKEN_PATTERN = /^[!#$%&'*+\-\.^_`|~\da-zA-Z]+$/;
    var STATE = {
      IDLE: 1 << 0,
      URI: 1 << 1,
      ATTR: 1 << 2
    };
    function trim(value) {
      return value.replace(WS_TRIM_PATTERN, "");
    }
    __name(trim, "trim");
    function hasWhitespace(value) {
      return WS_CHAR_PATTERN.test(value);
    }
    __name(hasWhitespace, "hasWhitespace");
    function skipWhitespace(value, offset) {
      while (hasWhitespace(value[offset])) {
        offset++;
      }
      return offset;
    }
    __name(skipWhitespace, "skipWhitespace");
    function needsQuotes(value) {
      return WS_DELIMITER_PATTERN.test(value) || !TOKEN_PATTERN.test(value);
    }
    __name(needsQuotes, "needsQuotes");
    function shallowCompareObjects(object1, object2) {
      return Object.keys(object1).length === Object.keys(object2).length && Object.keys(object1).every(
        (key) => key in object2 && object1[key] === object2[key]
      );
    }
    __name(shallowCompareObjects, "shallowCompareObjects");
    var Link = class _Link {
      static {
        __name(this, "Link");
      }
      /**
       * Link
       * @constructor
       * @param {String} [value]
       * @returns {Link}
       */
      constructor(value) {
        this.refs = [];
        if (value) {
          this.parse(value);
        }
      }
      /**
       * Get refs with given relation type
       * @param {String} value
       * @returns {Array<Object>}
       */
      rel(value) {
        var links = [];
        var type = value.toLowerCase();
        for (var i = 0; i < this.refs.length; i++) {
          if (typeof this.refs[i].rel === "string" && this.refs[i].rel.toLowerCase() === type) {
            links.push(this.refs[i]);
          }
        }
        return links;
      }
      /**
       * Get refs where given attribute has a given value
       * @param {String} attr
       * @param {String} value
       * @returns {Array<Object>}
       */
      get(attr, value) {
        attr = attr.toLowerCase();
        value = value.toLowerCase();
        var links = [];
        for (var i = 0; i < this.refs.length; i++) {
          if (typeof this.refs[i][attr] === "string" && this.refs[i][attr].toLowerCase() === value) {
            links.push(this.refs[i]);
          }
        }
        return links;
      }
      /** Sets a reference. */
      set(link) {
        this.refs.push(link);
        return this;
      }
      /**
       * Sets a reference if a reference with similar properties isn’t already set.
       */
      setUnique(link) {
        if (!this.refs.some((ref) => shallowCompareObjects(ref, link))) {
          this.refs.push(link);
        }
        return this;
      }
      has(attr, value) {
        attr = attr.toLowerCase();
        value = value.toLowerCase();
        for (var i = 0; i < this.refs.length; i++) {
          if (typeof this.refs[i][attr] === "string" && this.refs[i][attr].toLowerCase() === value) {
            return true;
          }
        }
        return false;
      }
      parse(value, offset) {
        offset = offset || 0;
        value = offset ? value.slice(offset) : value;
        value = trim(value).replace(WS_FOLD_PATTERN, "");
        var state = STATE.IDLE;
        var length = value.length;
        var offset = 0;
        var ref = null;
        while (offset < length) {
          if (state === STATE.IDLE) {
            if (hasWhitespace(value[offset])) {
              offset++;
              continue;
            } else if (value[offset] === "<") {
              if (ref != null) {
                ref.rel != null ? this.refs.push(..._Link.expandRelations(ref)) : this.refs.push(ref);
              }
              var end = value.indexOf(">", offset);
              if (end === -1) throw new Error("Expected end of URI delimiter at offset " + offset);
              ref = { uri: value.slice(offset + 1, end) };
              offset = end;
              state = STATE.URI;
            } else {
              throw new Error('Unexpected character "' + value[offset] + '" at offset ' + offset);
            }
            offset++;
          } else if (state === STATE.URI) {
            if (hasWhitespace(value[offset])) {
              offset++;
              continue;
            } else if (value[offset] === ";") {
              state = STATE.ATTR;
              offset++;
            } else if (value[offset] === ",") {
              state = STATE.IDLE;
              offset++;
            } else {
              throw new Error('Unexpected character "' + value[offset] + '" at offset ' + offset);
            }
          } else if (state === STATE.ATTR) {
            if (value[offset] === ";" || hasWhitespace(value[offset])) {
              offset++;
              continue;
            }
            var end = value.indexOf("=", offset);
            if (end === -1) end = value.indexOf(";", offset);
            if (end === -1) end = value.length;
            var attr = trim(value.slice(offset, end)).toLowerCase();
            var attrValue = "";
            offset = end + 1;
            offset = skipWhitespace(value, offset);
            if (value[offset] === '"') {
              offset++;
              while (offset < length) {
                if (value[offset] === '"') {
                  offset++;
                  break;
                }
                if (value[offset] === "\\") {
                  offset++;
                }
                attrValue += value[offset];
                offset++;
              }
            } else {
              var end = offset + 1;
              while (!DELIMITER_PATTERN.test(value[end]) && end < length) {
                end++;
              }
              attrValue = value.slice(offset, end);
              offset = end;
            }
            if (ref[attr] && _Link.isSingleOccurenceAttr(attr)) {
            } else if (attr[attr.length - 1] === "*") {
              ref[attr] = _Link.parseExtendedValue(attrValue);
            } else {
              attrValue = attr === "type" ? attrValue.toLowerCase() : attrValue;
              if (ref[attr] != null) {
                if (Array.isArray(ref[attr])) {
                  ref[attr].push(attrValue);
                } else {
                  ref[attr] = [ref[attr], attrValue];
                }
              } else {
                ref[attr] = attrValue;
              }
            }
            switch (value[offset]) {
              case ",":
                state = STATE.IDLE;
                break;
              case ";":
                state = STATE.ATTR;
                break;
            }
            offset++;
          } else {
            throw new Error('Unknown parser state "' + state + '"');
          }
        }
        if (ref != null) {
          ref.rel != null ? this.refs.push(..._Link.expandRelations(ref)) : this.refs.push(ref);
        }
        ref = null;
        return this;
      }
      toString() {
        var refs = [];
        var link = "";
        var ref = null;
        for (var i = 0; i < this.refs.length; i++) {
          ref = this.refs[i];
          link = Object.keys(this.refs[i]).reduce(function(link2, attr) {
            if (attr === "uri") return link2;
            return link2 + "; " + _Link.formatAttribute(attr, ref[attr]);
          }, "<" + ref.uri + ">");
          refs.push(link);
        }
        return refs.join(", ");
      }
    };
    Link.isCompatibleEncoding = function(value) {
      return COMPATIBLE_ENCODING_PATTERN.test(value);
    };
    Link.parse = function(value, offset) {
      return new Link().parse(value, offset);
    };
    Link.isSingleOccurenceAttr = function(attr) {
      return attr === "rel" || attr === "type" || attr === "media" || attr === "title" || attr === "title*";
    };
    Link.isTokenAttr = function(attr) {
      return attr === "rel" || attr === "type" || attr === "anchor";
    };
    Link.escapeQuotes = function(value) {
      return value.replace(/"/g, '\\"');
    };
    Link.expandRelations = function(ref) {
      var rels = ref.rel.split(" ");
      return rels.map(function(rel) {
        var value = Object.assign({}, ref);
        value.rel = rel;
        return value;
      });
    };
    Link.parseExtendedValue = function(value) {
      var parts = /([^']+)?(?:'([^']*)')?(.+)/.exec(value);
      return {
        language: parts[2].toLowerCase(),
        encoding: Link.isCompatibleEncoding(parts[1]) ? null : parts[1].toLowerCase(),
        value: Link.isCompatibleEncoding(parts[1]) ? decodeURIComponent(parts[3]) : parts[3]
      };
    };
    Link.formatExtendedAttribute = function(attr, data) {
      var encoding = (data.encoding || "utf-8").toUpperCase();
      var language = data.language || "en";
      var encodedValue = "";
      if (Buffer.isBuffer(data.value) && Link.isCompatibleEncoding(encoding)) {
        encodedValue = data.value.toString(encoding);
      } else if (Buffer.isBuffer(data.value)) {
        encodedValue = data.value.toString("hex").replace(/[0-9a-f]{2}/gi, "%$1");
      } else {
        encodedValue = encodeURIComponent(data.value);
      }
      return attr + "=" + encoding + "'" + language + "'" + encodedValue;
    };
    Link.formatAttribute = function(attr, value) {
      if (Array.isArray(value)) {
        return value.map((item) => {
          return Link.formatAttribute(attr, item);
        }).join("; ");
      }
      if (attr[attr.length - 1] === "*" || typeof value !== "string") {
        return Link.formatExtendedAttribute(attr, value);
      }
      if (Link.isTokenAttr(attr)) {
        value = needsQuotes(value) ? '"' + Link.escapeQuotes(value) + '"' : Link.escapeQuotes(value);
      } else if (needsQuotes(value)) {
        value = encodeURIComponent(value);
        value = value.replace(/%20/g, " ").replace(/%2C/g, ",").replace(/%3B/g, ";");
        value = '"' + value + '"';
      }
      return attr + "=" + value;
    };
    module.exports = Link;
  }
});

// node_modules/lighthouse/core/gather/gatherers/link-elements.js
var import_http_link_header = __toESM(require_link(), 1);
var UIStrings = {
  /**
   * @description Warning message explaining that there was an error parsing a link header in an HTTP response. `error` will be an english string with more details on the error. `header` will be the value of the header that caused the error. `link` is a type of HTTP header and should not be translated.
   * @example {Expected attribute delimiter at offset 94} error
   * @example {<https://assets.calendly.com/assets/booking/css/booking-d0ac32b1.css>; rel=preload; as=style; nopush} error
   */
  headerParseWarning: "Error parsing `link` header ({error}): `{header}`"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
function normalizeUrlOrNull(url, finalDisplayedUrl) {
  try {
    return new URL(url, finalDisplayedUrl).href;
  } catch (_) {
    return null;
  }
}
__name(normalizeUrlOrNull, "normalizeUrlOrNull");
function getCrossoriginFromHeader(value) {
  if (value === "anonymous") return "anonymous";
  if (value === "use-credentials") return "use-credentials";
  return null;
}
__name(getCrossoriginFromHeader, "getCrossoriginFromHeader");
function getLinkElementsInDOM() {
  const browserElements = getElementsInDocument("link");
  const linkElements = [];
  for (const link of browserElements) {
    if (!(link instanceof HTMLLinkElement)) continue;
    const hrefRaw = link.getAttribute("href") || "";
    const source = link.closest("head") ? "head" : "body";
    linkElements.push({
      rel: link.rel,
      href: link.href,
      hreflang: link.hreflang,
      as: link.as,
      crossOrigin: link.crossOrigin,
      hrefRaw,
      source,
      fetchPriority: link.fetchPriority,
      // @ts-expect-error - put into scope via stringification
      node: getNodeDetails(link)
    });
  }
  return linkElements;
}
__name(getLinkElementsInDOM, "getLinkElementsInDOM");
var LinkElements = class _LinkElements extends base_gatherer_default {
  static {
    __name(this, "LinkElements");
  }
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Artifacts['LinkElements']>}
   */
  static getLinkElementsInDOM(context) {
    return context.driver.executionContext.evaluate(getLinkElementsInDOM, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getNodeDetails,
        pageFunctions.getElementsInDocument
      ]
    });
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @param {LH.Artifacts['DevtoolsLog']} devtoolsLog
   * @return {Promise<LH.Artifacts['LinkElements']>}
   */
  static async getLinkElementsInHeaders(context, devtoolsLog) {
    const mainDocument = await MainResourceComputed.request({ devtoolsLog, URL: context.baseArtifacts.URL }, context);
    const linkElements = [];
    for (const header of mainDocument.responseHeaders) {
      if (header.name.toLowerCase() !== "link") continue;
      let parsedRefs = [];
      try {
        parsedRefs = import_http_link_header.default.parse(header.value).refs;
      } catch (err) {
        const truncatedHeader = Util.truncate(header.value, 100);
        const warning = str_(UIStrings.headerParseWarning, {
          error: err.message,
          header: truncatedHeader
        });
        context.baseArtifacts.LighthouseRunWarnings.push(warning);
      }
      for (const link of parsedRefs) {
        linkElements.push({
          rel: link.rel || "",
          href: normalizeUrlOrNull(link.uri, context.baseArtifacts.URL.finalDisplayedUrl),
          hrefRaw: link.uri || "",
          hreflang: link.hreflang || "",
          as: link.as || "",
          crossOrigin: getCrossoriginFromHeader(link.crossorigin),
          source: "headers",
          fetchPriority: link.fetchpriority,
          node: null
        });
      }
    }
    return linkElements;
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {Promise<LH.Artifacts['LinkElements']>}
   */
  async getArtifact(context) {
    const devtoolsLog = context.dependencies.DevtoolsLog;
    const fromDOM = await _LinkElements.getLinkElementsInDOM(context);
    const fromHeaders = await _LinkElements.getLinkElementsInHeaders(context, devtoolsLog);
    const linkElements = fromDOM.concat(fromHeaders);
    for (const link of linkElements) {
      link.rel = link.rel.toLowerCase();
    }
    return linkElements;
  }
};
var link_elements_default = LinkElements;
export {
  UIStrings,
  link_elements_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/link-elements.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
