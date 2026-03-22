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
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/dobetterweb/charset.js
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on if the charset is set properly for a page. This title is shown when the charset is defined correctly. Charset defines the character encoding (eg UTF-8) of the page content. */
  title: "Properly defines charset",
  /** Title of a Lighthouse audit that provides detail on if the charset is set properly for a page. This title is shown when the charset meta tag is missing or defined too late in the page. */
  failureTitle: "Charset declaration is missing or occurs too late in the HTML",
  /** Description of a Lighthouse audit that tells the user why the charset needs to be defined early on. */
  description: "A character encoding declaration is required. It can be done with a `<meta>` tag in the first 1024 bytes of the HTML or in the Content-Type HTTP response header. [Learn more about declaring the character encoding](https://developer.chrome.com/docs/lighthouse/best-practices/charset/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var CONTENT_TYPE_HEADER = "content-type";
var IANA_REGEX = /^[a-zA-Z0-9-_:.()]{2,}$/;
var CHARSET_HTML_REGEX = /<meta[^>]+charset[^<]+>/i;
var CHARSET_HTTP_REGEX = /charset\s*=\s*[a-zA-Z0-9-_:.()]{2,}/i;
var CharsetDefined = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "charset",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["MainDocumentContent", "URL", "DevtoolsLog", "MetaElements"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    let isCharsetSet = false;
    if (mainResource.responseHeaders) {
      const contentTypeHeader = mainResource.responseHeaders.find((header) => header.name.toLowerCase() === CONTENT_TYPE_HEADER);
      if (contentTypeHeader) {
        isCharsetSet = CHARSET_HTTP_REGEX.test(contentTypeHeader.value);
      }
    }
    const BOM_FIRSTCHAR = 65279;
    isCharsetSet = isCharsetSet || artifacts.MainDocumentContent.charCodeAt(0) === BOM_FIRSTCHAR;
    if (CHARSET_HTML_REGEX.test(artifacts.MainDocumentContent.slice(0, 1024))) {
      isCharsetSet = isCharsetSet || artifacts.MetaElements.some((meta) => {
        return meta.charset && IANA_REGEX.test(meta.charset) || meta.httpEquiv === "content-type" && meta.content && CHARSET_HTTP_REGEX.test(meta.content);
      });
    }
    return {
      score: Number(isCharsetSet)
    };
  }
};
var charset_default = CharsetDefined;
export {
  CHARSET_HTML_REGEX,
  CHARSET_HTTP_REGEX,
  IANA_REGEX,
  UIStrings,
  charset_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/charset.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
