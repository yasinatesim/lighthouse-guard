import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
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

// node_modules/lighthouse/core/audits/seo/meta-description.js
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on the web page's document meta description. This descriptive title is shown when the document has a meta description. "meta" should be left untranslated because it refers to an HTML element. */
  title: "Document has a meta description",
  /** Title of a Lighthouse audit that provides detail on the web page's document meta description. This descriptive title is shown when the document does not have a meta description. "meta" should be left untranslated because it refers to an HTML element. */
  failureTitle: "Document does not have a meta description",
  /** Description of a Lighthouse audit that tells the user *why* they need to have meta descriptions on their page. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Meta descriptions may be included in search results to concisely summarize page content. [Learn more about the meta description](https://developer.chrome.com/docs/lighthouse/seo/meta-description/).",
  /** Explanatory message stating that there was a failure in an audit caused by the page's meta description text being empty. */
  explanation: "Description text is empty."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var Description = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "meta-description",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      requiredArtifacts: ["MetaElements"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const metaDescription = artifacts.MetaElements.find((meta) => meta.name === "description");
    if (!metaDescription) {
      return {
        score: 0
      };
    }
    const description = metaDescription.content || "";
    if (description.trim().length === 0) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanation)
      };
    }
    return {
      score: 1
    };
  }
};
var meta_description_default = Description;
export {
  UIStrings,
  meta_description_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/meta-description.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
