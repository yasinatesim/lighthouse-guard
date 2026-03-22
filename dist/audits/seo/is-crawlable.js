import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "../chunk-7IFF6OOL.js";
import "../chunk-JDNHHZFJ.js";
import "../chunk-YNYBF6HU.js";
import "../chunk-2BIJ7VKV.js";
import "../chunk-MLADMIB3.js";
import {
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import {
  Audit
} from "../chunk-55A4MDN3.js";
import {
  __commonJS,
  __toESM
} from "../chunk-23MNVS5G.js";

// node_modules/robots-parser/Robots.js
var require_Robots = __commonJS({
  "node_modules/robots-parser/Robots.js"(exports, module) {
    function trimLine(line) {
      if (!line) {
        return null;
      }
      if (Array.isArray(line)) {
        return line.map(trimLine);
      }
      return String(line).trim();
    }
    function removeComments(line) {
      var commentStartIndex = line.indexOf("#");
      if (commentStartIndex > -1) {
        return line.substr(0, commentStartIndex);
      }
      return line;
    }
    function splitLine(line) {
      var idx = String(line).indexOf(":");
      if (!line || idx < 0) {
        return null;
      }
      return [line.slice(0, idx), line.slice(idx + 1)];
    }
    function formatUserAgent(userAgent) {
      var formattedUserAgent = userAgent.toLowerCase();
      var idx = formattedUserAgent.indexOf("/");
      if (idx > -1) {
        formattedUserAgent = formattedUserAgent.substr(0, idx);
      }
      return formattedUserAgent.trim();
    }
    function normaliseEncoding(path) {
      try {
        return urlEncodeToUpper(encodeURI(path).replace(/%25/g, "%"));
      } catch (e) {
        return path;
      }
    }
    function urlEncodeToUpper(path) {
      return path.replace(/%[0-9a-fA-F]{2}/g, function(match) {
        return match.toUpperCase();
      });
    }
    function matches(pattern, path) {
      var matchingLengths = new Array(path.length + 1);
      var numMatchingLengths = 1;
      matchingLengths[0] = 0;
      for (var p = 0; p < pattern.length; p++) {
        if (pattern[p] === "$" && p + 1 === pattern.length) {
          return matchingLengths[numMatchingLengths - 1] === path.length;
        }
        if (pattern[p] == "*") {
          numMatchingLengths = path.length - matchingLengths[0] + 1;
          for (var i = 1; i < numMatchingLengths; i++) {
            matchingLengths[i] = matchingLengths[i - 1] + 1;
          }
        } else {
          var numMatches = 0;
          for (var i = 0; i < numMatchingLengths; i++) {
            if (matchingLengths[i] < path.length && path[matchingLengths[i]] === pattern[p]) {
              matchingLengths[numMatches++] = matchingLengths[i] + 1;
            }
          }
          if (numMatches == 0) {
            return false;
          }
          numMatchingLengths = numMatches;
        }
      }
      return true;
    }
    function parseRobots(contents, robots) {
      var newlineRegex = /\r\n|\r|\n/;
      var lines = contents.split(newlineRegex).map(removeComments).map(splitLine).map(trimLine);
      var currentUserAgents = [];
      var isNoneUserAgentState = true;
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (!line || !line[0]) {
          continue;
        }
        switch (line[0].toLowerCase()) {
          case "user-agent":
            if (isNoneUserAgentState) {
              currentUserAgents.length = 0;
            }
            if (line[1]) {
              currentUserAgents.push(formatUserAgent(line[1]));
            }
            break;
          case "disallow":
            robots.addRule(currentUserAgents, line[1], false, i + 1);
            break;
          case "allow":
            robots.addRule(currentUserAgents, line[1], true, i + 1);
            break;
          case "crawl-delay":
            robots.setCrawlDelay(currentUserAgents, line[1]);
            break;
          case "sitemap":
            if (line[1]) {
              robots.addSitemap(line[1]);
            }
            break;
          case "host":
            if (line[1]) {
              robots.setPreferredHost(line[1].toLowerCase());
            }
            break;
        }
        isNoneUserAgentState = line[0].toLowerCase() !== "user-agent";
      }
    }
    function findRule(path, rules) {
      var matchedRule = null;
      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        if (!matches(rule.pattern, path)) {
          continue;
        }
        if (!matchedRule || rule.pattern.length > matchedRule.pattern.length) {
          matchedRule = rule;
        } else if (rule.pattern.length == matchedRule.pattern.length && rule.allow && !matchedRule.allow) {
          matchedRule = rule;
        }
      }
      return matchedRule;
    }
    function parseUrl(url) {
      try {
        var url = new URL(url, "http://robots-relative.samclarke.com/");
        if (!url.port) {
          url.port = url.protocol === "https:" ? 443 : 80;
        }
        return url;
      } catch (e) {
        return null;
      }
    }
    function Robots(url, contents) {
      this._url = parseUrl(url) || {};
      this._rules = /* @__PURE__ */ Object.create(null);
      this._sitemaps = [];
      this._preferredHost = null;
      parseRobots(contents || "", this);
    }
    Robots.prototype.addRule = function(userAgents, pattern, allow, lineNumber) {
      var rules = this._rules;
      userAgents.forEach(function(userAgent) {
        rules[userAgent] = rules[userAgent] || [];
        if (!pattern) {
          return;
        }
        rules[userAgent].push({
          pattern: normaliseEncoding(pattern),
          allow,
          lineNumber
        });
      });
    };
    Robots.prototype.setCrawlDelay = function(userAgents, delayStr) {
      var rules = this._rules;
      var delay = Number(delayStr);
      userAgents.forEach(function(userAgent) {
        rules[userAgent] = rules[userAgent] || [];
        if (isNaN(delay)) {
          return;
        }
        rules[userAgent].crawlDelay = delay;
      });
    };
    Robots.prototype.addSitemap = function(url) {
      this._sitemaps.push(url);
    };
    Robots.prototype.setPreferredHost = function(url) {
      this._preferredHost = url;
    };
    Robots.prototype._getRule = function(url, ua) {
      var parsedUrl = parseUrl(url) || {};
      var userAgent = formatUserAgent(ua || "*");
      if (parsedUrl.protocol !== this._url.protocol || parsedUrl.hostname !== this._url.hostname || parsedUrl.port !== this._url.port) {
        return;
      }
      var rules = this._rules[userAgent] || this._rules["*"] || [];
      var path = urlEncodeToUpper(parsedUrl.pathname + parsedUrl.search);
      var rule = findRule(path, rules);
      return rule;
    };
    Robots.prototype.isAllowed = function(url, ua) {
      var rule = this._getRule(url, ua);
      if (typeof rule === "undefined") {
        return;
      }
      return !rule || rule.allow;
    };
    Robots.prototype.getMatchingLineNumber = function(url, ua) {
      var rule = this._getRule(url, ua);
      return rule ? rule.lineNumber : -1;
    };
    Robots.prototype.isDisallowed = function(url, ua) {
      return !this.isAllowed(url, ua);
    };
    Robots.prototype.getCrawlDelay = function(ua) {
      var userAgent = formatUserAgent(ua || "*");
      return (this._rules[userAgent] || this._rules["*"] || {}).crawlDelay;
    };
    Robots.prototype.getPreferredHost = function() {
      return this._preferredHost;
    };
    Robots.prototype.getSitemaps = function() {
      return this._sitemaps.slice(0);
    };
    module.exports = Robots;
  }
});

// node_modules/robots-parser/index.js
var require_robots_parser = __commonJS({
  "node_modules/robots-parser/index.js"(exports, module) {
    var Robots = require_Robots();
    module.exports = function(url, contents) {
      return new Robots(url, contents);
    };
  }
});

// node_modules/lighthouse/core/audits/seo/is-crawlable.js
var import_robots_parser = __toESM(require_robots_parser(), 1);
var BOT_USER_AGENTS = /* @__PURE__ */ new Set([
  void 0,
  "Googlebot",
  "bingbot",
  "DuckDuckBot",
  "archive.org_bot"
]);
var BLOCKLIST = /* @__PURE__ */ new Set([
  "noindex",
  "none"
]);
var ROBOTS_HEADER = "x-robots-tag";
var UNAVAILABLE_AFTER = "unavailable_after";
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on if search-engine crawlers are blocked from indexing the page. This title is shown when the page is not blocked from indexing and can be crawled. */
  title: "Page isn\u2019t blocked from indexing",
  /** Title of a Lighthouse audit that provides detail on if search-engine crawlers are blocked from indexing the page. This title is shown when the page has been configured to block indexing and therefore cannot be indexed by search engines. */
  failureTitle: "Page is blocked from indexing",
  /** Description of a Lighthouse audit that tells the user *why* allowing search-engine crawling of their page is beneficial. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Search engines are unable to include your pages in search results if they don't have permission to crawl them. [Learn more about crawler directives](https://developer.chrome.com/docs/lighthouse/seo/is-crawlable/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
function isUnavailable(directive) {
  const parts = directive.split(":");
  if (parts.length <= 1 || parts[0] !== UNAVAILABLE_AFTER) {
    return false;
  }
  const date = Date.parse(parts.slice(1).join(":"));
  return !isNaN(date) && date < Date.now();
}
function hasBlockingDirective(directives) {
  return directives.split(",").map((d) => d.toLowerCase().trim()).some((d) => BLOCKLIST.has(d) || isUnavailable(d));
}
function getUserAgentFromHeaderDirectives(directives) {
  const parts = directives.match(/^([^,:]+):/);
  if (!!parts && parts[1].toLowerCase() !== UNAVAILABLE_AFTER) {
    return parts[1];
  }
}
var IsCrawlable = class _IsCrawlable extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "is-crawlable",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      supportedModes: ["navigation"],
      requiredArtifacts: ["MetaElements", "RobotsTxt", "URL", "DevtoolsLog"]
    };
  }
  /**
   * @param {LH.Artifacts.MetaElement} metaElement
   */
  static handleMetaElement(metaElement) {
    const content = metaElement.content || "";
    if (hasBlockingDirective(content)) {
      return {
        source: {
          ...Audit.makeNodeItem(metaElement.node),
          snippet: `<meta name="${metaElement.name}" content="${content}" />`
        }
      };
    }
  }
  /**
   * @param {string|undefined} userAgent
   * @param {LH.Artifacts.NetworkRequest} mainResource
   * @param {LH.Artifacts.MetaElement[]} metaElements
   * @param {import('robots-parser').Robot|undefined} parsedRobotsTxt
   * @param {URL} robotsTxtUrl
   */
  static determineIfCrawlableForUserAgent(userAgent, mainResource, metaElements, parsedRobotsTxt, robotsTxtUrl) {
    const blockingDirectives = [];
    let meta;
    if (userAgent) meta = metaElements.find((meta2) => meta2.name === userAgent.toLowerCase());
    if (!meta) meta = metaElements.find((meta2) => meta2.name === "robots");
    if (meta) {
      const blockingDirective = _IsCrawlable.handleMetaElement(meta);
      if (blockingDirective) blockingDirectives.push(blockingDirective);
    }
    for (const header of mainResource.responseHeaders || []) {
      if (header.name.toLowerCase() !== ROBOTS_HEADER) continue;
      const directiveUserAgent = getUserAgentFromHeaderDirectives(header.value);
      if (directiveUserAgent !== userAgent && directiveUserAgent !== void 0) continue;
      let directiveWithoutUserAgentPrefix = header.value.trim();
      if (userAgent && header.value.startsWith(`${userAgent}:`)) {
        directiveWithoutUserAgentPrefix = header.value.replace(`${userAgent}:`, "");
      }
      if (!hasBlockingDirective(directiveWithoutUserAgentPrefix)) continue;
      blockingDirectives.push({ source: `${header.name}: ${header.value}` });
    }
    if (parsedRobotsTxt && !parsedRobotsTxt.isAllowed(mainResource.url, userAgent)) {
      const line = parsedRobotsTxt.getMatchingLineNumber(mainResource.url) || 1;
      blockingDirectives.push({
        source: {
          type: (
            /** @type {const} */
            "source-location"
          ),
          url: robotsTxtUrl.href,
          urlProvider: (
            /** @type {const} */
            "network"
          ),
          line: line - 1,
          column: 0
        }
      });
    }
    return blockingDirectives;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    const robotsTxtUrl = new URL("/robots.txt", mainResource.url);
    const parsedRobotsTxt = artifacts.RobotsTxt.content ? (0, import_robots_parser.default)(robotsTxtUrl.href, artifacts.RobotsTxt.content) : void 0;
    const blockedUserAgents = [];
    const genericBlockingDirectives = [];
    for (const userAgent of BOT_USER_AGENTS) {
      const blockingDirectives = _IsCrawlable.determineIfCrawlableForUserAgent(
        userAgent,
        mainResource,
        artifacts.MetaElements,
        parsedRobotsTxt,
        robotsTxtUrl
      );
      if (blockingDirectives.length > 0) {
        blockedUserAgents.push(userAgent);
      }
      if (userAgent === void 0) {
        genericBlockingDirectives.push(...blockingDirectives);
      }
    }
    const score = blockedUserAgents.length === BOT_USER_AGENTS.size ? 0 : 1;
    const warnings = [];
    if (score && blockedUserAgents.length > 0) {
      const list = blockedUserAgents.filter(Boolean).join(", ");
      warnings.push(`The following bot user agents are blocked from crawling: ${list}. The audit is otherwise passing, because at least one bot was explicitly allowed.`);
    }
    const headings = [
      { key: "source", valueType: "code", label: "Blocking Directive Source" }
    ];
    const details = Audit.makeTableDetails(headings, score === 0 ? genericBlockingDirectives : []);
    return {
      score,
      details,
      warnings
    };
  }
};
var is_crawlable_default = IsCrawlable;
export {
  UIStrings,
  is_crawlable_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/is-crawlable.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
