import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  manual_audit_default
} from "../../chunk-OC6VGRXI.js";
import {
  createIcuMessageFn
} from "../../chunk-4MZOSFEN.js";
import "../../chunk-FOYXSDFQ.js";
import "../../chunk-7FMDRUEI.js";
import "../../chunk-C5HPB2FB.js";
import "../../chunk-ZGW6XDCS.js";
import {
  __name
} from "../../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/seo/manual/structured-data.js
var UIStrings = {
  /** Description of a Lighthouse audit that provides detail on the structured data in a page. "Structured data" is a standardized data format on a page that helps a search engine categorize and understand its contents. This description is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Run the [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) and the [Structured Data Linter](http://linter.structured-data.org/) to validate structured data. [Learn more about Structured Data](https://developer.chrome.com/docs/lighthouse/seo/structured-data/).",
  /** Title of a Lighthouse audit that prompts users to manually check their page for valid structured data. "Structured data" is a standardized data format on a page that helps a search engine categorize and understand its contents. */
  title: "Structured data is valid"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var StructuredData = class extends manual_audit_default {
  static {
    __name(this, "StructuredData");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return Object.assign({
      id: "structured-data",
      description: str_(UIStrings.description),
      title: str_(UIStrings.title)
    }, super.partialMeta);
  }
};
var structured_data_default = StructuredData;
export {
  UIStrings,
  structured_data_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/manual/structured-data.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
