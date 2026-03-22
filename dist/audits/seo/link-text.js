import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  url_utils_default
} from "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import {
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/seo/link-text.js
var nonDescriptiveLinkTexts = {
  // English
  "en": /* @__PURE__ */ new Set([
    "click here",
    "click this",
    "go",
    "here",
    "information",
    "learn more",
    "more",
    "more info",
    "more information",
    "right here",
    "read more",
    "see more",
    "start",
    "this"
  ]),
  // Japanese
  "ja": /* @__PURE__ */ new Set([
    "\u3053\u3053\u3092\u30AF\u30EA\u30C3\u30AF",
    "\u3053\u3061\u3089\u3092\u30AF\u30EA\u30C3\u30AF",
    "\u30EA\u30F3\u30AF",
    "\u7D9A\u304D\u3092\u8AAD\u3080",
    "\u7D9A\u304F",
    "\u5168\u6587\u8868\u793A"
  ]),
  // Spanish
  "es": /* @__PURE__ */ new Set([
    "click aqu\xED",
    "click aqui",
    "clicka aqu\xED",
    "clicka aqui",
    "pincha aqu\xED",
    "pincha aqui",
    "aqu\xED",
    "aqui",
    "m\xE1s",
    "mas",
    "m\xE1s informaci\xF3n",
    "m\xE1s informacion",
    "mas informaci\xF3n",
    "mas informacion",
    "este",
    "enlace",
    "este enlace",
    "empezar"
  ]),
  // Portuguese
  "pt": /* @__PURE__ */ new Set([
    "clique aqui",
    "ir",
    "mais informa\xE7\xE3o",
    "mais informa\xE7\xF5es",
    "mais",
    "veja mais"
  ]),
  // Korean
  "ko": /* @__PURE__ */ new Set([
    "\uC5EC\uAE30",
    "\uC5EC\uAE30\uB97C \uD074\uB9AD",
    "\uD074\uB9AD",
    "\uB9C1\uD06C",
    "\uC790\uC138\uD788",
    "\uC790\uC138\uD788 \uBCF4\uAE30",
    "\uACC4\uC18D",
    "\uC774\uB3D9",
    "\uC804\uCCB4 \uBCF4\uAE30"
  ]),
  // Swedish
  "sv": /* @__PURE__ */ new Set([
    "h\xE4r",
    "klicka h\xE4r",
    "l\xE4s mer",
    "mer",
    "mer info",
    "mer information"
  ]),
  // German
  "de": /* @__PURE__ */ new Set([
    "klicke hier",
    "hier klicken",
    "hier",
    "mehr",
    "siehe",
    "dies",
    "das",
    "weiterlesen"
  ]),
  // Tamil
  "ta": /* @__PURE__ */ new Set([
    "\u0B85\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4 \u0BAA\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
    "\u0BAE\u0BB1\u0BC1\u0BAA\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
    "\u0BAE\u0BC1\u0BA8\u0BCD\u0BA4\u0BC8\u0BAF \u0BAA\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
    "\u0BAE\u0BC1\u0BA9\u0BCD\u0BAA\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
    "\u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD \u0B85\u0BB1\u0BBF\u0B95",
    "\u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD \u0BA4\u0B95\u0BB5\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BC1",
    "\u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD \u0BA4\u0BB0\u0BB5\u0BC1\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1",
    "\u0BA4\u0BAF\u0BB5\u0BC1\u0B9A\u0BC6\u0BAF\u0BCD\u0BA4\u0BC1 \u0B87\u0B99\u0BCD\u0B95\u0BC7 \u0B85\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BB5\u0BC1\u0BAE\u0BCD",
    "\u0B87\u0B99\u0BCD\u0B95\u0BC7 \u0B95\u0BBF\u0BB3\u0BBF\u0B95\u0BCD \u0B9A\u0BC6\u0BAF\u0BCD\u0BAF\u0BB5\u0BC1\u0BAE\u0BCD"
  ]),
  // Persian
  "fa": /* @__PURE__ */ new Set([
    "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u0628\u06CC\u0634\u062A\u0631",
    "\u0627\u0637\u0644\u0627\u0639\u0627\u062A",
    "\u0627\u06CC\u0646",
    "\u0627\u06CC\u0646\u062C\u0627 \u0628\u0632\u0646\u06CC\u062F",
    "\u0627\u06CC\u0646\u062C\u0627 \u06A9\u0644\u06CC\u06A9 \u06A9\u0646\u06CC\u062F",
    "\u0627\u06CC\u0646\u062C\u0627",
    "\u0628\u0631\u0648",
    "\u0628\u06CC\u0634\u062A\u0631 \u0628\u062E\u0648\u0627\u0646\u06CC\u062F",
    "\u0628\u06CC\u0634\u062A\u0631 \u0628\u062F\u0627\u0646\u06CC\u062F",
    "\u0628\u06CC\u0634\u062A\u0631",
    "\u0634\u0631\u0648\u0639"
  ])
};
var UIStrings = {
  /** Title of a Lighthouse audit that tests if each link on a page contains a sufficient description of what a user will find when they click it. Generic, non-descriptive text like "click here" doesn't give an indication of what the link leads to. This descriptive title is shown when all links on the page have sufficient textual descriptions. */
  title: "Links have descriptive text",
  /** Title of a Lighthouse audit that tests if each link on a page contains a sufficient description of what a user will find when they click it. Generic, non-descriptive text like "click here" doesn't give an indication of what the link leads to. This descriptive title is shown when one or more links on the page contain generic, non-descriptive text. */
  failureTitle: "Links do not have descriptive text",
  /** Description of a Lighthouse audit that tells the user *why* they need to have descriptive text on the links in their page. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Descriptive link text helps search engines understand your content. [Learn how to make links more accessible](https://developer.chrome.com/docs/lighthouse/seo/link-text/).",
  /** [ICU Syntax] Label for the audit identifying the number of links found. "link" here refers to the links in a web page to other web pages. */
  displayValue: `{itemCount, plural,
    =1 {1 link found}
    other {# links found}
    }`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var LinkText = class extends Audit {
  static {
    __name(this, "LinkText");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "link-text",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["URL", "AnchorElements"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const failingLinks = artifacts.AnchorElements.filter((link) => {
      if (!link.href || link.rel.includes("nofollow")) return false;
      const href = link.href.toLowerCase();
      if (href.startsWith("javascript:") || href.startsWith("mailto:") || // This line prevents the audit from flagging anchor links.
      // In this case it is better to use `finalDisplayedUrl` than `mainDocumentUrl`.
      url_utils_default.equalWithExcludedFragments(link.href, artifacts.URL.finalDisplayedUrl)) {
        return false;
      }
      const searchTerm = link.text.trim().toLowerCase();
      if (searchTerm) {
        if (link.textLang) {
          const lang = link.textLang.split("-")[0];
          if (nonDescriptiveLinkTexts[lang] && nonDescriptiveLinkTexts[lang].has(searchTerm)) {
            return true;
          }
        } else {
          for (const texts of Object.values(nonDescriptiveLinkTexts)) {
            if (texts.has(searchTerm)) {
              return true;
            }
          }
        }
      }
      return false;
    }).map((link) => {
      return {
        href: link.href,
        text: link.text.trim(),
        textLang: link.textLang
      };
    });
    const headings = [
      { key: "href", valueType: "url", label: "Link destination" },
      { key: "text", valueType: "text", label: "Link Text" }
    ];
    const details = Audit.makeTableDetails(headings, failingLinks);
    let displayValue;
    if (failingLinks.length) {
      displayValue = str_(UIStrings.displayValue, { itemCount: failingLinks.length });
    }
    return {
      score: Number(failingLinks.length === 0),
      details,
      displayValue
    };
  }
};
var link_text_default = LinkText;
export {
  UIStrings,
  link_text_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/link-text.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
