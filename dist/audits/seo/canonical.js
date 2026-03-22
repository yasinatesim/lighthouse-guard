import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "../chunk-32YVOUED.js";
import "../chunk-AB7S44AE.js";
import {
  url_utils_default
} from "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
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

// node_modules/lighthouse/core/audits/seo/canonical.js
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on a page's rel=canonical link. This descriptive title is shown to users when the rel=canonical link is valid. "rel=canonical" is an HTML attribute and value and so should not be translated. */
  title: "Document has a valid `rel=canonical`",
  /** Title of a Lighthouse audit that provides detail on a page's rel=canonical link. This descriptive title is shown to users when the rel=canonical link is invalid and should be fixed. "rel=canonical" is an HTML attribute and value and so should not be translated. */
  failureTitle: "Document does not have a valid `rel=canonical`",
  /** Description of a Lighthouse audit that tells the user *why* they need to have a valid rel=canonical link. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Canonical links suggest which URL to show in search results. [Learn more about canonical links](https://developer.chrome.com/docs/lighthouse/seo/canonical/).",
  /**
   * @description Explanatory message stating that there was a failure in an audit caused by multiple URLs conflicting with each other.
   * @example {https://example.com, https://example2.com} urlList
   * */
  explanationConflict: "Multiple conflicting URLs ({urlList})",
  /**
   * @description Explanatory message stating that there was a failure in an audit caused by a URL being invalid.
   * @example {https://example.com/} url
   * */
  explanationInvalid: "Invalid URL ({url})",
  /**
   * @description Explanatory message stating that there was a failure in an audit caused by a URL being relative instead of absolute.
   * @example {https://example.com/} url
   * */
  explanationRelative: "Is not an absolute URL ({url})",
  /**
   * @description Explanatory message stating that there was a failure in an audit caused by a URL pointing to a different hreflang than the current context.'hreflang' is an HTML attribute and should not be translated.
   * @example {https://example.com/} url
   */
  explanationPointsElsewhere: "Points to another `hreflang` location ({url})",
  /** Explanatory message stating that the page's canonical URL was pointing to the domain's root URL, which is a common mistake. "points" refers to the action of the 'rel=canonical' referencing another link. "root" refers to the starting/home page of the website. "domain" refers to the registered domain name of the website. */
  explanationRoot: "Points to the domain's root URL (the homepage), instead of an equivalent page of content"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var Canonical = class _Canonical extends Audit {
  static {
    __name(this, "Canonical");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "canonical",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      supportedModes: ["navigation"],
      requiredArtifacts: ["LinkElements", "URL", "DevtoolsLog"]
    };
  }
  /**
   * @param {LH.Artifacts.LinkElement[]} linkElements
   * @return {CanonicalURLData}
   */
  static collectCanonicalURLs(linkElements) {
    const uniqueCanonicalURLs = /* @__PURE__ */ new Set();
    const hreflangURLs = /* @__PURE__ */ new Set();
    let invalidCanonicalLink;
    let relativeCanonicallink;
    for (const link of linkElements) {
      if (link.source === "body") continue;
      if (link.rel === "canonical") {
        if (!link.hrefRaw) continue;
        if (!link.href) invalidCanonicalLink = link;
        else if (!url_utils_default.isValid(link.hrefRaw)) relativeCanonicallink = link;
        else uniqueCanonicalURLs.add(link.href);
      } else if (link.rel === "alternate") {
        if (link.href && link.hreflang) hreflangURLs.add(link.href);
      }
    }
    return { uniqueCanonicalURLs, hreflangURLs, invalidCanonicalLink, relativeCanonicallink };
  }
  /**
   * @param {CanonicalURLData} canonicalURLData
   * @return {LH.Audit.Product|undefined}
   */
  static findInvalidCanonicalURLReason(canonicalURLData) {
    const { uniqueCanonicalURLs, invalidCanonicalLink, relativeCanonicallink } = canonicalURLData;
    if (invalidCanonicalLink) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationInvalid, { url: invalidCanonicalLink.hrefRaw })
      };
    }
    if (relativeCanonicallink) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationRelative, { url: relativeCanonicallink.hrefRaw })
      };
    }
    const canonicalURLs = Array.from(uniqueCanonicalURLs);
    if (canonicalURLs.length === 0) {
      return {
        score: 1,
        notApplicable: true
      };
    }
    if (canonicalURLs.length > 1) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationConflict, { urlList: canonicalURLs.join(", ") })
      };
    }
  }
  /**
   * @param {CanonicalURLData} canonicalURLData
   * @param {URL} canonicalURL
   * @param {URL} baseURL
   * @return {LH.Audit.Product|undefined}
   */
  static findCommonCanonicalURLMistakes(canonicalURLData, canonicalURL, baseURL) {
    const { hreflangURLs } = canonicalURLData;
    if (hreflangURLs.has(baseURL.href) && hreflangURLs.has(canonicalURL.href) && baseURL.href !== canonicalURL.href) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationPointsElsewhere, { url: baseURL.href })
      };
    }
    if (canonicalURL.origin === baseURL.origin && canonicalURL.pathname === "/" && baseURL.pathname !== "/") {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationRoot)
      };
    }
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    const baseURL = new URL(mainResource.url);
    const canonicalURLData = _Canonical.collectCanonicalURLs(artifacts.LinkElements);
    const invalidURLAuditProduct = _Canonical.findInvalidCanonicalURLReason(canonicalURLData);
    if (invalidURLAuditProduct) return invalidURLAuditProduct;
    const canonicalURL = new URL([...canonicalURLData.uniqueCanonicalURLs][0]);
    const mistakeAuditProduct = _Canonical.findCommonCanonicalURLMistakes(
      canonicalURLData,
      canonicalURL,
      baseURL
    );
    if (mistakeAuditProduct) return mistakeAuditProduct;
    return {
      score: 1
    };
  }
};
var canonical_default = Canonical;
export {
  UIStrings,
  canonical_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/canonical.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
