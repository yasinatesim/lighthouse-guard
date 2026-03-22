import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  scripts_default
} from "./chunk-XVYQYPAA.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __commonJS,
  __name,
  __toESM
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/lib/cdt/generated/ParsedURL.js
var require_ParsedURL = __commonJS({
  "node_modules/lighthouse/core/lib/cdt/generated/ParsedURL.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParsedURL = void 0;
    exports.normalizePath = normalizePath;
    exports.schemeIs = schemeIs;
    function normalizePath(path) {
      if (path.indexOf("..") === -1 && path.indexOf(".") === -1) {
        return path;
      }
      const segments = (path[0] === "/" ? path.substring(1) : path).split("/");
      const normalizedSegments = [];
      for (const segment of segments) {
        if (segment === ".") {
          continue;
        } else if (segment === "..") {
          normalizedSegments.pop();
        } else {
          normalizedSegments.push(segment);
        }
      }
      let normalizedPath = normalizedSegments.join("/");
      if (path[0] === "/" && normalizedPath) {
        normalizedPath = "/" + normalizedPath;
      }
      if (normalizedPath[normalizedPath.length - 1] !== "/" && (path[path.length - 1] === "/" || segments[segments.length - 1] === "." || segments[segments.length - 1] === "..")) {
        normalizedPath = normalizedPath + "/";
      }
      return normalizedPath;
    }
    __name(normalizePath, "normalizePath");
    function schemeIs(url, scheme) {
      try {
        return new URL(url).protocol === scheme;
      } catch {
        return false;
      }
    }
    __name(schemeIs, "schemeIs");
    var ParsedURL = class _ParsedURL {
      static {
        __name(this, "ParsedURL");
      }
      isValid;
      url;
      scheme;
      user;
      host;
      port;
      path;
      queryParams;
      fragment;
      folderPathComponents;
      lastPathComponent;
      blobInnerScheme;
      #displayNameInternal;
      #dataURLDisplayNameInternal;
      constructor(url) {
        this.isValid = false;
        this.url = url;
        this.scheme = "";
        this.user = "";
        this.host = "";
        this.port = "";
        this.path = "";
        this.queryParams = "";
        this.fragment = "";
        this.folderPathComponents = "";
        this.lastPathComponent = "";
        const isBlobUrl = this.url.startsWith("blob:");
        const urlToMatch = isBlobUrl ? url.substring(5) : url;
        const match = urlToMatch.match(_ParsedURL.urlRegex());
        if (match) {
          this.isValid = true;
          if (isBlobUrl) {
            this.blobInnerScheme = match[2].toLowerCase();
            this.scheme = "blob";
          } else {
            this.scheme = match[2].toLowerCase();
          }
          this.user = match[3] ?? "";
          this.host = match[4] ?? "";
          this.port = match[5] ?? "";
          this.path = match[6] ?? "/";
          this.queryParams = match[7] ?? "";
          this.fragment = match[8] ?? "";
        } else {
          if (this.url.startsWith("data:")) {
            this.scheme = "data";
            return;
          }
          if (this.url.startsWith("blob:")) {
            this.scheme = "blob";
            return;
          }
          if (this.url === "about:blank") {
            this.scheme = "about";
            return;
          }
          this.path = this.url;
        }
        const lastSlashExceptTrailingIndex = this.path.lastIndexOf("/", this.path.length - 2);
        if (lastSlashExceptTrailingIndex !== -1) {
          this.lastPathComponent = this.path.substring(lastSlashExceptTrailingIndex + 1);
        } else {
          this.lastPathComponent = this.path;
        }
        const lastSlashIndex = this.path.lastIndexOf("/");
        if (lastSlashIndex !== -1) {
          this.folderPathComponents = this.path.substring(0, lastSlashIndex);
        }
      }
      static concatenate(devToolsPath, ...appendage) {
        return devToolsPath.concat(...appendage);
      }
      static beginsWithWindowsDriveLetter(url) {
        return /^[A-Za-z]:/.test(url);
      }
      static beginsWithScheme(url) {
        return /^[A-Za-z][A-Za-z0-9+.-]*:/.test(url);
      }
      static isRelativeURL(url) {
        return !this.beginsWithScheme(url) || this.beginsWithWindowsDriveLetter(url);
      }
      get displayName() {
        if (this.#displayNameInternal) {
          return this.#displayNameInternal;
        }
        if (this.isDataURL()) {
          return this.dataURLDisplayName();
        }
        if (this.isBlobURL()) {
          return this.url;
        }
        if (this.isAboutBlank()) {
          return this.url;
        }
        this.#displayNameInternal = this.lastPathComponent;
        if (!this.#displayNameInternal) {
          this.#displayNameInternal = (this.host || "") + "/";
        }
        if (this.#displayNameInternal === "/") {
          this.#displayNameInternal = this.url;
        }
        return this.#displayNameInternal;
      }
      static urlRegexInstance = null;
    };
    exports.ParsedURL = ParsedURL;
  }
});

// node_modules/lighthouse/core/lib/cdt/Common.js
var require_Common = __commonJS({
  "node_modules/lighthouse/core/lib/cdt/Common.js"(exports, module) {
    var ParsedURL = require_ParsedURL();
    module.exports = {
      ParsedURL
    };
  }
});

// node_modules/lighthouse/core/lib/cdt/Platform.js
var require_Platform = __commonJS({
  "node_modules/lighthouse/core/lib/cdt/Platform.js"(exports, module) {
    function lowerBound(array, needle, comparator, left, right) {
      let l = left || 0;
      let r = right !== void 0 ? right : array.length;
      while (l < r) {
        const m = l + r >> 1;
        if (comparator(needle, array[m]) > 0) {
          l = m + 1;
        } else {
          r = m;
        }
      }
      return r;
    }
    __name(lowerBound, "lowerBound");
    function upperBound(array, needle, comparator, left, right) {
      let l = left || 0;
      let r = right !== void 0 ? right : array.length;
      while (l < r) {
        const m = l + r >> 1;
        if (comparator(needle, array[m]) >= 0) {
          l = m + 1;
        } else {
          r = m;
        }
      }
      return r;
    }
    __name(upperBound, "upperBound");
    module.exports = {
      ArrayUtilities: {
        lowerBound,
        upperBound
      },
      DevToolsPath: {
        EmptyUrlString: ""
      }
    };
  }
});

// node_modules/lighthouse/core/lib/cdt/generated/SourceMap.js
var require_SourceMap = __commonJS({
  "node_modules/lighthouse/core/lib/cdt/generated/SourceMap.js"(exports, module) {
    "use strict";
    var Common = require_Common();
    var Platform = require_Platform();
    var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var BASE64_CODES = new Uint8Array(123);
    for (let index = 0; index < BASE64_CHARS.length; ++index) {
      BASE64_CODES[BASE64_CHARS.charCodeAt(index)] = index;
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenIterator = exports.SourceMap = exports.SourceMapEntry = void 0;
    exports.parseSourceMap = parseSourceMap;
    function parseSourceMap(content) {
      if (content.startsWith(")]}")) {
        content = content.substring(content.indexOf("\n"));
      }
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return JSON.parse(content);
    }
    __name(parseSourceMap, "parseSourceMap");
    var SourceMapEntry = class {
      static {
        __name(this, "SourceMapEntry");
      }
      lineNumber;
      columnNumber;
      sourceIndex;
      sourceURL;
      sourceLineNumber;
      sourceColumnNumber;
      name;
      constructor(lineNumber, columnNumber, sourceIndex, sourceURL, sourceLineNumber, sourceColumnNumber, name) {
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
        this.sourceIndex = sourceIndex;
        this.sourceURL = sourceURL;
        this.sourceLineNumber = sourceLineNumber;
        this.sourceColumnNumber = sourceColumnNumber;
        this.name = name;
      }
      static compare(entry1, entry2) {
        if (entry1.lineNumber !== entry2.lineNumber) {
          return entry1.lineNumber - entry2.lineNumber;
        }
        return entry1.columnNumber - entry2.columnNumber;
      }
    };
    exports.SourceMapEntry = SourceMapEntry;
    var SourceMap = class {
      static {
        __name(this, "SourceMap");
      }
      #json;
      #compiledURLInternal;
      #sourceMappingURL;
      #baseURL;
      #mappingsInternal;
      #sourceInfos = [];
      #sourceInfoByURL = /* @__PURE__ */ new Map();
      #scopesInfo = null;
      /**
       * @param {string} compiledURL
       * @param {string} sourceMappingURL
       * @param {object} payload
       * Implements Source Map V3 model. See https://github.com/google/closure-compiler/wiki/Source-Maps
       * for format description.
       */
      constructor(compiledURL, sourceMappingURL, payload) {
        this.#json = payload;
        this.#compiledURLInternal = compiledURL;
        this.#sourceMappingURL = sourceMappingURL;
        this.#baseURL = Common.ParsedURL.schemeIs(sourceMappingURL, "data:") ? compiledURL : sourceMappingURL;
        this.#mappingsInternal = null;
        if ("sections" in this.#json) {
          if (this.#json.sections.find((section) => "url" in section)) {
            console.warn(`SourceMap "${sourceMappingURL}" contains unsupported "URL" field in one of its sections.`);
          }
        }
        this.eachSection(this.parseSources.bind(this));
      }
      #sourceIndex(sourceURL) {
        return this.#sourceInfos.findIndex((info) => info.sourceURL === sourceURL);
      }
      compiledURL() {
        return this.#compiledURLInternal;
      }
      url() {
        return this.#sourceMappingURL;
      }
      sourceURLs() {
        return [...this.#sourceInfoByURL.keys()];
      }
      embeddedContentByURL(sourceURL) {
        const entry = this.#sourceInfoByURL.get(sourceURL);
        if (!entry) {
          return null;
        }
        return entry.content;
      }
      hasScopeInfo() {
        this.#ensureMappingsProcessed();
        return this.#scopesInfo !== null;
      }
      findEntry(lineNumber, columnNumber, inlineFrameIndex) {
        this.#ensureMappingsProcessed();
        if (inlineFrameIndex && this.#scopesInfo !== null) {
          const { inlinedFunctions } = this.#scopesInfo.findInlinedFunctions(lineNumber, columnNumber);
          const { callsite } = inlinedFunctions[inlineFrameIndex - 1];
          if (!callsite) {
            console.error("Malformed source map. Expected to have a callsite info for index", inlineFrameIndex);
            return null;
          }
          return {
            lineNumber,
            columnNumber,
            sourceIndex: callsite.sourceIndex,
            sourceURL: this.sourceURLs()[callsite.sourceIndex],
            sourceLineNumber: callsite.line,
            sourceColumnNumber: callsite.column,
            name: void 0
          };
        }
        const mappings = this.mappings();
        const index = Platform.ArrayUtilities.upperBound(mappings, void 0, (unused, entry) => lineNumber - entry.lineNumber || columnNumber - entry.columnNumber);
        return index ? mappings[index - 1] : null;
      }
      findEntryRanges(lineNumber, columnNumber) {
        const mappings = this.mappings();
        const endIndex = Platform.ArrayUtilities.upperBound(mappings, void 0, (unused, entry) => lineNumber - entry.lineNumber || columnNumber - entry.columnNumber);
        if (!endIndex) {
          return null;
        }
        const startIndex = endIndex - 1;
        const sourceURL = mappings[startIndex].sourceURL;
        if (!sourceURL) {
          return null;
        }
        const endLine = endIndex < mappings.length ? mappings[endIndex].lineNumber : 2 ** 31 - 1;
        const endColumn = endIndex < mappings.length ? mappings[endIndex].columnNumber : 2 ** 31 - 1;
        const range = new TextUtils.TextRange.TextRange(mappings[startIndex].lineNumber, mappings[startIndex].columnNumber, endLine, endColumn);
        const reverseMappings = this.reversedMappings(sourceURL);
        const startSourceLine = mappings[startIndex].sourceLineNumber;
        const startSourceColumn = mappings[startIndex].sourceColumnNumber;
        const endReverseIndex = Platform.ArrayUtilities.upperBound(reverseMappings, void 0, (unused, i) => startSourceLine - mappings[i].sourceLineNumber || startSourceColumn - mappings[i].sourceColumnNumber);
        if (!endReverseIndex) {
          return null;
        }
        const endSourceLine = endReverseIndex < reverseMappings.length ? mappings[reverseMappings[endReverseIndex]].sourceLineNumber : 2 ** 31 - 1;
        const endSourceColumn = endReverseIndex < reverseMappings.length ? mappings[reverseMappings[endReverseIndex]].sourceColumnNumber : 2 ** 31 - 1;
        const sourceRange = new TextUtils.TextRange.TextRange(startSourceLine, startSourceColumn, endSourceLine, endSourceColumn);
        return { range, sourceRange, sourceURL };
      }
      sourceLineMapping(sourceURL, lineNumber, columnNumber) {
        const mappings = this.mappings();
        const reverseMappings = this.reversedMappings(sourceURL);
        const first = Platform.ArrayUtilities.lowerBound(reverseMappings, lineNumber, lineComparator);
        const last = Platform.ArrayUtilities.upperBound(reverseMappings, lineNumber, lineComparator);
        if (first >= reverseMappings.length || mappings[reverseMappings[first]].sourceLineNumber !== lineNumber) {
          return null;
        }
        const columnMappings = reverseMappings.slice(first, last);
        if (!columnMappings.length) {
          return null;
        }
        const index = Platform.ArrayUtilities.lowerBound(columnMappings, columnNumber, (columnNumber2, i) => columnNumber2 - mappings[i].sourceColumnNumber);
        return index >= columnMappings.length ? mappings[columnMappings[columnMappings.length - 1]] : mappings[columnMappings[index]];
        function lineComparator(lineNumber2, i) {
          return lineNumber2 - mappings[i].sourceLineNumber;
        }
        __name(lineComparator, "lineComparator");
      }
      findReverseIndices(sourceURL, lineNumber, columnNumber) {
        const mappings = this.mappings();
        const reverseMappings = this.reversedMappings(sourceURL);
        const endIndex = Platform.ArrayUtilities.upperBound(reverseMappings, void 0, (unused, i) => lineNumber - mappings[i].sourceLineNumber || columnNumber - mappings[i].sourceColumnNumber);
        let startIndex = endIndex;
        while (startIndex > 0 && mappings[reverseMappings[startIndex - 1]].sourceLineNumber === mappings[reverseMappings[endIndex - 1]].sourceLineNumber && mappings[reverseMappings[startIndex - 1]].sourceColumnNumber === mappings[reverseMappings[endIndex - 1]].sourceColumnNumber) {
          --startIndex;
        }
        return reverseMappings.slice(startIndex, endIndex);
      }
      findReverseEntries(sourceURL, lineNumber, columnNumber) {
        const mappings = this.mappings();
        return this.findReverseIndices(sourceURL, lineNumber, columnNumber).map((i) => mappings[i]);
      }
      findReverseRanges(sourceURL, lineNumber, columnNumber) {
        const mappings = this.mappings();
        const indices = this.findReverseIndices(sourceURL, lineNumber, columnNumber);
        const ranges = [];
        for (let i = 0; i < indices.length; ++i) {
          const startIndex = indices[i];
          let endIndex = startIndex + 1;
          while (i + 1 < indices.length && endIndex === indices[i + 1]) {
            ++endIndex;
            ++i;
          }
          const startLine = mappings[startIndex].lineNumber;
          const startColumn = mappings[startIndex].columnNumber;
          const endLine = endIndex < mappings.length ? mappings[endIndex].lineNumber : 2 ** 31 - 1;
          const endColumn = endIndex < mappings.length ? mappings[endIndex].columnNumber : 2 ** 31 - 1;
          ranges.push(new TextUtils.TextRange.TextRange(startLine, startColumn, endLine, endColumn));
        }
        return ranges;
      }
      /** @return {Array<{lineNumber: number, columnNumber: number, sourceURL?: string, sourceLineNumber: number, sourceColumnNumber: number, name?: string, lastColumnNumber?: number}>} */
      mappings() {
        this.#ensureMappingsProcessed();
        return this.#mappingsInternal ?? [];
      }
      reversedMappings(sourceURL) {
        this.#ensureMappingsProcessed();
        return this.#sourceInfoByURL.get(sourceURL)?.reverseMappings ?? [];
      }
      #ensureMappingsProcessed() {
        if (this.#mappingsInternal === null) {
          this.#mappingsInternal = [];
          try {
            this.eachSection(this.parseMap.bind(this));
          } catch (e) {
            console.error("Failed to parse source map", e);
            this.#mappingsInternal = [];
          }
          this.mappings().sort(SourceMapEntry.compare);
          this.#computeReverseMappings(this.#mappingsInternal);
          this.#json = null;
        }
      }
      #computeReverseMappings(mappings) {
        const reverseMappingsPerUrl = /* @__PURE__ */ new Map();
        for (let i = 0; i < mappings.length; i++) {
          const entryUrl = mappings[i].sourceURL;
          if (!entryUrl) {
            continue;
          }
          let reverseMap = reverseMappingsPerUrl.get(entryUrl);
          if (!reverseMap) {
            reverseMap = [];
            reverseMappingsPerUrl.set(entryUrl, reverseMap);
          }
          reverseMap.push(i);
        }
        for (const [url, reverseMap] of reverseMappingsPerUrl.entries()) {
          const info = this.#sourceInfoByURL.get(url);
          if (!info) {
            continue;
          }
          reverseMap.sort(sourceMappingComparator);
          info.reverseMappings = reverseMap;
        }
        function sourceMappingComparator(indexA, indexB) {
          const a = mappings[indexA];
          const b = mappings[indexB];
          return a.sourceLineNumber - b.sourceLineNumber || a.sourceColumnNumber - b.sourceColumnNumber || a.lineNumber - b.lineNumber || a.columnNumber - b.columnNumber;
        }
        __name(sourceMappingComparator, "sourceMappingComparator");
      }
      eachSection(callback) {
        if (!this.#json) {
          return;
        }
        if ("sections" in this.#json) {
          let sourcesIndex = 0;
          for (const section of this.#json.sections) {
            if ("map" in section) {
              callback(section.map, sourcesIndex, section.offset.line, section.offset.column);
              sourcesIndex += section.map.sources.length;
            }
          }
        } else {
          callback(this.#json, 0, 0, 0);
        }
      }
      parseSources(sourceMap) {
        const sourceRoot = sourceMap.sourceRoot ?? "";
        const ignoreList = new Set(sourceMap.ignoreList ?? sourceMap.x_google_ignoreList);
        for (let i = 0; i < sourceMap.sources.length; ++i) {
          let href = sourceMap.sources[i];
          if (Common.ParsedURL.ParsedURL.isRelativeURL(href)) {
            if (sourceRoot && !sourceRoot.endsWith("/") && href && !href.startsWith("/")) {
              href = sourceRoot.concat("/", href);
            } else {
              href = sourceRoot.concat(href);
            }
          }
          const url = href;
          const source = sourceMap.sourcesContent && sourceMap.sourcesContent[i];
          const sourceInfo = {
            sourceURL: url,
            content: source ?? null,
            ignoreListHint: ignoreList.has(i),
            reverseMappings: null
          };
          this.#sourceInfos.push(sourceInfo);
          if (!this.#sourceInfoByURL.has(url)) {
            this.#sourceInfoByURL.set(url, sourceInfo);
          }
        }
      }
      parseMap(map, baseSourceIndex, baseLineNumber, baseColumnNumber) {
        let sourceIndex = baseSourceIndex;
        let lineNumber = baseLineNumber;
        let columnNumber = baseColumnNumber;
        let sourceLineNumber = 0;
        let sourceColumnNumber = 0;
        let nameIndex = 0;
        const names = map.names ?? [];
        const tokenIter = new TokenIterator(map.mappings);
        let sourceURL = this.#sourceInfos[sourceIndex].sourceURL;
        while (true) {
          if (tokenIter.peek() === ",") {
            tokenIter.next();
          } else {
            while (tokenIter.peek() === ";") {
              lineNumber += 1;
              columnNumber = 0;
              tokenIter.next();
            }
            if (!tokenIter.hasNext()) {
              break;
            }
          }
          columnNumber += tokenIter.nextVLQ();
          if (!tokenIter.hasNext() || this.isSeparator(tokenIter.peek())) {
            this.mappings().push(new SourceMapEntry(lineNumber, columnNumber));
            continue;
          }
          const sourceIndexDelta = tokenIter.nextVLQ();
          if (sourceIndexDelta) {
            sourceIndex += sourceIndexDelta;
            sourceURL = this.#sourceInfos[sourceIndex].sourceURL;
          }
          sourceLineNumber += tokenIter.nextVLQ();
          sourceColumnNumber += tokenIter.nextVLQ();
          if (!tokenIter.hasNext() || this.isSeparator(tokenIter.peek())) {
            this.mappings().push(new SourceMapEntry(lineNumber, columnNumber, sourceIndex, sourceURL, sourceLineNumber, sourceColumnNumber));
            continue;
          }
          nameIndex += tokenIter.nextVLQ();
          this.mappings().push(new SourceMapEntry(lineNumber, columnNumber, sourceIndex, sourceURL, sourceLineNumber, sourceColumnNumber, names[nameIndex]));
        }
        if (false) {
          if (!this.#scopesInfo) {
            this.#scopesInfo = new SourceMapScopesInfo_js_1.SourceMapScopesInfo(this, [], []);
          }
          if (map.originalScopes && map.generatedRanges) {
            const { originalScopes, generatedRanges } = (0, SourceMapScopes_js_1.decodeScopes)(map, { line: baseLineNumber, column: baseColumnNumber });
            this.#scopesInfo.addOriginalScopes(originalScopes);
            this.#scopesInfo.addGeneratedRanges(generatedRanges);
          } else if (map.x_com_bloomberg_sourcesFunctionMappings) {
            const originalScopes = this.parseBloombergScopes(map);
            this.#scopesInfo.addOriginalScopes(originalScopes);
          } else {
            this.#scopesInfo.addOriginalScopes(new Array(map.sources.length));
          }
        }
      }
      isSeparator(char) {
        return char === "," || char === ";";
      }
      mapsOrigin() {
        const mappings = this.mappings();
        if (mappings.length > 0) {
          const firstEntry = mappings[0];
          return firstEntry?.lineNumber === 0 || firstEntry.columnNumber === 0;
        }
        return false;
      }
      hasIgnoreListHint(sourceURL) {
        return this.#sourceInfoByURL.get(sourceURL)?.ignoreListHint ?? false;
      }
      /**
       * Returns a list of ranges in the generated script for original sources that
       * match a predicate. Each range is a [begin, end) pair, meaning that code at
       * the beginning location, up to but not including the end location, matches
       * the predicate.
       */
      findRanges(predicate, options) {
        const mappings = this.mappings();
        const ranges = [];
        if (!mappings.length) {
          return [];
        }
        let current = null;
        if ((mappings[0].lineNumber !== 0 || mappings[0].columnNumber !== 0) && options?.isStartMatching) {
          current = TextUtils.TextRange.TextRange.createUnboundedFromLocation(0, 0);
          ranges.push(current);
        }
        for (const { sourceURL, lineNumber, columnNumber } of mappings) {
          const ignoreListHint = sourceURL && predicate(sourceURL);
          if (!current && ignoreListHint) {
            current = TextUtils.TextRange.TextRange.createUnboundedFromLocation(lineNumber, columnNumber);
            ranges.push(current);
            continue;
          }
          if (current && !ignoreListHint) {
            current.endLine = lineNumber;
            current.endColumn = columnNumber;
            current = null;
          }
        }
        return ranges;
      }
      expandCallFrame(frame) {
        this.#ensureMappingsProcessed();
        if (this.#scopesInfo === null) {
          return [frame];
        }
        return this.#scopesInfo.expandCallFrame(frame);
      }
      resolveScopeChain(frame) {
        this.#ensureMappingsProcessed();
        if (this.#scopesInfo === null) {
          return null;
        }
        return this.#scopesInfo.resolveMappedScopeChain(frame);
      }
      findOriginalFunctionName(position) {
        this.#ensureMappingsProcessed();
        return this.#scopesInfo?.findOriginalFunctionName(position) ?? null;
      }
    };
    exports.SourceMap = SourceMap;
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE_MASK = (1 << 5) - 1;
    var VLQ_CONTINUATION_MASK = 1 << 5;
    var TokenIterator = class {
      static {
        __name(this, "TokenIterator");
      }
      #string;
      #position;
      constructor(string) {
        this.#string = string;
        this.#position = 0;
      }
      next() {
        return this.#string.charAt(this.#position++);
      }
      /** Returns the unicode value of the next character and advances the iterator  */
      nextCharCode() {
        return this.#string.charCodeAt(this.#position++);
      }
      peek() {
        return this.#string.charAt(this.#position);
      }
      hasNext() {
        return this.#position < this.#string.length;
      }
      nextVLQ() {
        let result = 0;
        let shift = 0;
        let digit = VLQ_CONTINUATION_MASK;
        while (digit & VLQ_CONTINUATION_MASK) {
          if (!this.hasNext()) {
            throw new Error("Unexpected end of input while decodling VLQ number!");
          }
          const charCode = this.nextCharCode();
          digit = BASE64_CODES[charCode];
          if (charCode !== 65 && digit === 0) {
            throw new Error(`Unexpected char '${String.fromCharCode(charCode)}' encountered while decoding`);
          }
          result += (digit & VLQ_BASE_MASK) << shift;
          shift += VLQ_BASE_SHIFT;
        }
        const negative = result & 1;
        result >>= 1;
        return negative ? -result : result;
      }
      /**
       * @returns the next VLQ number without iterating further. Or returns null if
       * the iterator is at the end or it's not a valid number.
       */
      peekVLQ() {
        const pos = this.#position;
        try {
          return this.nextVLQ();
        } catch {
          return null;
        } finally {
          this.#position = pos;
        }
      }
    };
    exports.TokenIterator = TokenIterator;
    module.exports = SourceMap;
    SourceMap.parseSourceMap = parseSourceMap;
  }
});

// node_modules/lighthouse/core/lib/cdt/SDK.js
var require_SDK = __commonJS({
  "node_modules/lighthouse/core/lib/cdt/SDK.js"(exports, module) {
    var SDK2 = {
      SourceMap: require_SourceMap()
    };
    SDK2.SourceMap.prototype.computeLastGeneratedColumns = function() {
      const mappings = this.mappings();
      if (mappings.length && mappings[0].lastColumnNumber !== void 0) return;
      for (let i = 0; i < mappings.length - 1; i++) {
        const mapping = mappings[i];
        const nextMapping = mappings[i + 1];
        if (mapping.lineNumber === nextMapping.lineNumber) {
          mapping.lastColumnNumber = nextMapping.columnNumber;
        }
      }
    };
    module.exports = SDK2;
  }
});

// node_modules/lighthouse/core/gather/gatherers/source-maps.js
var import_SDK = __toESM(require_SDK(), 1);
var SourceMaps = class _SourceMaps extends base_gatherer_default {
  static {
    __name(this, "SourceMaps");
  }
  static symbol = /* @__PURE__ */ Symbol("SourceMaps");
  /** @type {LH.Gatherer.GathererMeta<'Scripts'>} */
  meta = {
    symbol: _SourceMaps.symbol,
    supportedModes: ["timespan", "navigation"],
    dependencies: { Scripts: scripts_default.symbol }
  };
  /**
   * @param {LH.Gatherer.Driver} driver
   * @param {string} sourceMapUrl
   * @return {Promise<LH.Artifacts.RawSourceMap>}
   */
  async fetchSourceMap(driver, sourceMapUrl) {
    const response = await driver.fetcher.fetchResource(sourceMapUrl, { timeout: 1500 });
    if (response.content === null) {
      throw new Error(`Failed fetching source map (${response.status})`);
    }
    return import_SDK.default.SourceMap.parseSourceMap(response.content);
  }
  /**
   * @param {string} sourceMapURL
   * @return {LH.Artifacts.RawSourceMap}
   */
  parseSourceMapFromDataUrl(sourceMapURL) {
    const buffer = Buffer.from(sourceMapURL.split(",")[1], "base64");
    return import_SDK.default.SourceMap.parseSourceMap(buffer.toString());
  }
  /**
   * @param {string} url
   * @param {string} base
   * @return {string|undefined}
   */
  _resolveUrl(url, base) {
    try {
      return new URL(url, base).href;
    } catch (e) {
      return;
    }
  }
  /**
   * @param {LH.Gatherer.Driver} driver
   * @param {LH.Artifacts.Script} script
   * @return {Promise<LH.Artifacts.SourceMap>}
   */
  async _retrieveMapFromScript(driver, script) {
    if (!script.sourceMapURL) {
      throw new Error("precondition failed: event.sourceMapURL should exist");
    }
    const isSourceMapADataUri = script.sourceMapURL.startsWith("data:");
    const scriptUrl = script.name;
    const rawSourceMapUrl = isSourceMapADataUri ? script.sourceMapURL : this._resolveUrl(script.sourceMapURL, script.name);
    if (!rawSourceMapUrl) {
      return {
        scriptId: script.scriptId,
        scriptUrl,
        errorMessage: `Could not resolve map url: ${script.sourceMapURL}`
      };
    }
    const sourceMapUrl = isSourceMapADataUri ? void 0 : rawSourceMapUrl;
    try {
      const map = isSourceMapADataUri ? this.parseSourceMapFromDataUrl(rawSourceMapUrl) : await this.fetchSourceMap(driver, rawSourceMapUrl);
      if (typeof map.version !== "number") throw new Error("Map has no numeric `version` field");
      if (!Array.isArray(map.sources)) throw new Error("Map has no `sources` list");
      if (typeof map.mappings !== "string") throw new Error("Map has no `mappings` field");
      if (map.sections) {
        map.sections = map.sections.filter((section) => section.map);
      }
      return {
        scriptId: script.scriptId,
        scriptUrl,
        sourceMapUrl,
        map
      };
    } catch (err) {
      return {
        scriptId: script.scriptId,
        scriptUrl,
        sourceMapUrl,
        errorMessage: err.toString()
      };
    }
  }
  /**
   * @param {LH.Gatherer.Context<'Scripts'>} context
   * @return {Promise<LH.Artifacts['SourceMaps']>}
   */
  async getArtifact(context) {
    const eventProcessPromises = context.dependencies.Scripts.filter((script) => script.sourceMapURL).map((script) => this._retrieveMapFromScript(context.driver, script));
    return Promise.all(eventProcessPromises);
  }
};
var source_maps_default = SourceMaps;

export {
  require_SDK,
  source_maps_default
};
/*! Bundled license information:

lighthouse/core/lib/cdt/Common.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/cdt/Platform.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/cdt/SDK.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/source-maps.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
