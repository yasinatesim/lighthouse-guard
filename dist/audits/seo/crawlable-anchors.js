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

// node_modules/lighthouse/core/audits/seo/crawlable-anchors.js
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on whether links have potentially-crawlable href attributes. This descriptive title is shown when all links on the page are potentially-crawlable. */
  title: "Links are crawlable",
  /** Descriptive title of a Lighthouse audit that provides detail on whether links have potentially-crawlable href attributes. This descriptive title is shown when there are href attributes which are not crawlable by search engines. */
  failureTitle: "Links are not crawlable",
  /** Description of a Lighthouse audit that tells the user why href attributes on links should be crawlable. This is displayed after a user expands the section to see more. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Search engines may use `href` attributes on links to crawl websites. Ensure that the `href` attribute of anchor elements links to an appropriate destination, so more pages of the site can be discovered. [Learn how to make links crawlable](https://support.google.com/webmasters/answer/9112205)",
  /** Label for a column in a data table; entries will be the HTML anchor elements that failed the audit. Anchors are DOM elements that are links. */
  columnFailingLink: "Uncrawlable Link"
};
var hrefAssociatedAttributes = [
  "target",
  "download",
  "ping",
  "rel",
  "hreflang",
  "type",
  "referrerpolicy"
];
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var CrawlableAnchors = class extends Audit {
  static {
    __name(this, "CrawlableAnchors");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "crawlable-anchors",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["AnchorElements", "URL"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit({ AnchorElements: anchorElements, URL: url }) {
    const failingAnchors = anchorElements.filter(({
      rawHref,
      name = "",
      role = "",
      id,
      href,
      attributeNames = [],
      listeners = [],
      ancestorListeners = []
    }) => {
      rawHref = rawHref.replace(/\s/g, "");
      name = name.trim();
      role = role.trim();
      const hasListener = Boolean(listeners.length || ancestorListeners.length);
      if (role.length > 0) return;
      if (rawHref.startsWith("mailto:")) return;
      if (rawHref === "" && id) return;
      const javaScriptVoidRegExp = /javascript:void(\(|)0(\)|)/;
      if (rawHref.startsWith("file:")) return true;
      if (name.length > 0) return;
      if (!attributeNames.includes("href") && hrefAssociatedAttributes.every((attribute) => !attributeNames.includes(attribute))) {
        return hasListener;
      }
      if (href === "") return true;
      if (javaScriptVoidRegExp.test(rawHref)) return true;
      try {
        new URL(rawHref, url.finalDisplayedUrl);
      } catch (e) {
        return true;
      }
    });
    const headings = [{
      key: "node",
      valueType: "node",
      label: str_(UIStrings.columnFailingLink)
    }];
    const itemsToDisplay = failingAnchors.map((anchor) => {
      return {
        node: Audit.makeNodeItem(anchor.node)
      };
    });
    return {
      score: Number(failingAnchors.length === 0),
      details: Audit.makeTableDetails(headings, itemsToDisplay)
    };
  }
};
var crawlable_anchors_default = CrawlableAnchors;
export {
  UIStrings,
  crawlable_anchors_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/crawlable-anchors.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
