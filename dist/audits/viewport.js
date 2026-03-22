import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ViewportMetaComputed
} from "./chunk-25JDUMOU.js";
import "./chunk-VW72MYVI.js";
import {
  createIcuMessageFn
} from "./chunk-4MZOSFEN.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/viewport.js
var UIStrings = {
  /** Title of a Lighthouse audit that provides detail on the viewport meta tag in a web page's html. This descriptive title is shown to users when a viewport tag is set and configured. */
  title: 'Has a `<meta name="viewport">` tag with `width` or `initial-scale`',
  /** Title of a Lighthouse audit that provides detail on the viewport meta tag in a web page's html. This descriptive title is shown to users when a viewport tag is not set or configured. */
  failureTitle: 'Does not have a `<meta name="viewport">` tag with `width` or `initial-scale`',
  /** Description of a Lighthouse audit that tells the user why they should have a viewport meta tag in their html. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: 'A `<meta name="viewport">` not only optimizes your app for mobile screen sizes, but also prevents [a 300 millisecond delay to user input](https://developer.chrome.com/blog/300ms-tap-delay-gone-away/). [Learn more about using the viewport meta tag](https://developer.chrome.com/docs/lighthouse/pwa/viewport/).',
  /** Explanatory message stating that no viewport meta tag exists on the page. */
  explanationNoTag: 'No `<meta name="viewport">` tag found'
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings);
var Viewport = class extends Audit {
  static {
    __name(this, "Viewport");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "viewport",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.failureTitle),
      description: str_(UIStrings.description),
      guidanceLevel: 3,
      requiredArtifacts: ["MetaElements"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const viewportMeta = await ViewportMetaComputed.request(artifacts.MetaElements, context);
    let inpSavings = 300;
    if (!viewportMeta.hasViewportTag) {
      return {
        score: 0,
        explanation: str_(UIStrings.explanationNoTag),
        metricSavings: {
          INP: inpSavings
        }
      };
    }
    if (viewportMeta.isMobileOptimized) {
      inpSavings = 0;
    }
    let details;
    if (viewportMeta.rawContentString !== void 0) {
      details = {
        type: "debugdata",
        viewportContent: viewportMeta.rawContentString
      };
    }
    return {
      score: Number(viewportMeta.isMobileOptimized),
      metricSavings: {
        INP: inpSavings
      },
      warnings: viewportMeta.parserWarnings,
      details
    };
  }
};
var viewport_default = Viewport;
export {
  UIStrings,
  viewport_default as default
};
/*! Bundled license information:

lighthouse/core/audits/viewport.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
