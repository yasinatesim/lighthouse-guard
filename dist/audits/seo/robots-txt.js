import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  createIcuMessageFn
} from "../chunk-O3YNDXOX.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/seo/robots-txt.js
var HTTP_CLIENT_ERROR_CODE_LOW = 400;
var HTTP_SERVER_ERROR_CODE_LOW = 500;
var DIRECTIVE_SITEMAP = "sitemap";
var DIRECTIVE_USER_AGENT = "user-agent";
var DIRECTIVE_ALLOW = "allow";
var DIRECTIVE_DISALLOW = "disallow";
var DIRECTIVES_GROUP_MEMBERS = /* @__PURE__ */ new Set([DIRECTIVE_ALLOW, DIRECTIVE_DISALLOW]);
var DIRECTIVE_SAFELIST = /* @__PURE__ */ new Set([
  DIRECTIVE_USER_AGENT,
  DIRECTIVE_DISALLOW,
  // standard
  DIRECTIVE_ALLOW,
  DIRECTIVE_SITEMAP,
  // universally supported
  "crawl-delay",
  // yahoo, bing, yandex
  "clean-param",
  "host",
  // yandex
  "request-rate",
  "visit-time",
  "noindex"
  // not officially supported, but used in the wild
]);
var SITEMAP_VALID_PROTOCOLS = /* @__PURE__ */ new Set(["https:", "http:", "ftp:"]);
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on the site's robots.txt file. Note: "robots.txt" is a canonical filename and should not be translated. This descriptive title is shown when the robots.txt file is present and configured correctly. */
  title: "robots.txt is valid",
  /** Title of a Lighthouse audit that provides detail on the site's robots.txt file. Note: "robots.txt" is a canonical filename and should not be translated. This descriptive title is shown when the robots.txt file is misconfigured, which makes the page hard or impossible to scan via web crawler. */
  failureTitle: "robots.txt is not valid",
  /** Description of a Lighthouse audit that tells the user *why* they need to have a valid robots.txt file. Note: "robots.txt" is a canonical filename and should not be translated. This is displayed after a user expands the section to see more. No character length limits. */
  description: "If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed. [Learn more about robots.txt](https://developer.chrome.com/docs/lighthouse/seo/invalid-robots-txt/).",
  /**
   * @description Label for the audit identifying that the robots.txt request has returned a specific HTTP status code. Note: "robots.txt" is a canonical filename and should not be translated.
   * @example {500} statusCode
   * */
  displayValueHttpBadCode: "Request for robots.txt returned HTTP status: {statusCode}",
  /** [ICU Syntax] Label for the audit identifying the number of errors that occured while validating the robots.txt file. "itemCount" will be replaced by the integer count of errors encountered. */
  displayValueValidationError: `{itemCount, plural,
    =1 {1 error found}
    other {# errors found}
    }`,
  /** Explanatory message stating that there was a failure in an audit caused by Lighthouse not being able to download the robots.txt file for the site.  Note: "robots.txt" is a canonical filename and should not be translated. */
  explanation: "Lighthouse was unable to download a robots.txt file"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
function verifyDirective(directiveName, directiveValue) {
  if (!DIRECTIVE_SAFELIST.has(directiveName)) {
    throw new Error("Unknown directive");
  }
  if (directiveName === DIRECTIVE_SITEMAP) {
    let sitemapUrl;
    try {
      sitemapUrl = new URL(directiveValue);
    } catch (e) {
      throw new Error("Invalid sitemap URL");
    }
    if (!SITEMAP_VALID_PROTOCOLS.has(sitemapUrl.protocol)) {
      throw new Error("Invalid sitemap URL protocol");
    }
  }
  if (directiveName === DIRECTIVE_USER_AGENT && !directiveValue) {
    throw new Error("No user-agent specified");
  }
  if (directiveName === DIRECTIVE_ALLOW || directiveName === DIRECTIVE_DISALLOW) {
    if (directiveValue !== "" && directiveValue[0] !== "/" && directiveValue[0] !== "*") {
      throw new Error('Pattern should either be empty, start with "/" or "*"');
    }
    const dollarIndex = directiveValue.indexOf("$");
    if (dollarIndex !== -1 && dollarIndex !== directiveValue.length - 1) {
      throw new Error('"$" should only be used at the end of the pattern');
    }
  }
}
__name(verifyDirective, "verifyDirective");
function parseLine(line) {
  const hashIndex = line.indexOf("#");
  if (hashIndex !== -1) {
    line = line.substr(0, hashIndex);
  }
  line = line.trim();
  if (line.length === 0) {
    return null;
  }
  const colonIndex = line.indexOf(":");
  if (colonIndex === -1) {
    throw new Error("Syntax not understood");
  }
  const directiveName = line.slice(0, colonIndex).trim().toLowerCase();
  const directiveValue = line.slice(colonIndex + 1).trim();
  verifyDirective(directiveName, directiveValue);
  return {
    directive: directiveName,
    value: directiveValue
  };
}
__name(parseLine, "parseLine");
function validateRobots(content) {
  const errors = [];
  let inGroup = false;
  content.split(/\r\n|\r|\n/).forEach((line, index) => {
    let parsedLine;
    try {
      parsedLine = parseLine(line);
    } catch (e) {
      errors.push({
        index: (index + 1).toString(),
        line,
        message: e.message.toString()
      });
    }
    if (!parsedLine) {
      return;
    }
    if (parsedLine.directive === DIRECTIVE_USER_AGENT) {
      inGroup = true;
    } else if (!inGroup && DIRECTIVES_GROUP_MEMBERS.has(parsedLine.directive)) {
      errors.push({
        index: (index + 1).toString(),
        line,
        message: "No user-agent specified"
      });
    }
  });
  return errors;
}
__name(validateRobots, "validateRobots");
var RobotsTxt = class extends Audit {
  static {
    __name(this, "RobotsTxt");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "robots-txt",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["RobotsTxt"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const {
      status,
      content
    } = artifacts.RobotsTxt;
    if (!status) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanation)
      };
    }
    if (status >= HTTP_SERVER_ERROR_CODE_LOW) {
      return {
        score: 0,
        displayValue: str_(UIStrings.displayValueHttpBadCode, { statusCode: status })
      };
    } else if (status >= HTTP_CLIENT_ERROR_CODE_LOW || content === "") {
      return {
        score: 1,
        notApplicable: true
      };
    }
    if (content === null) {
      throw new Error(`Status ${status} was valid, but content was null`);
    }
    const validationErrors = validateRobots(content);
    const headings = [
      { key: "index", valueType: "text", label: "Line #" },
      { key: "line", valueType: "code", label: "Content" },
      { key: "message", valueType: "code", label: "Error" }
    ];
    const details = Audit.makeTableDetails(headings, validationErrors);
    let displayValue;
    if (validationErrors.length) {
      displayValue = str_(UIStrings.displayValueValidationError, { itemCount: validationErrors.length });
    }
    return {
      score: Number(validationErrors.length === 0),
      details,
      displayValue
    };
  }
};
var robots_txt_default = RobotsTxt;
export {
  UIStrings,
  robots_txt_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/robots-txt.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
