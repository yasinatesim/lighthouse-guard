import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LCPBreakdownComputed
} from "./chunk-FBGCU7L2.js";
import {
  LargestContentfulPaintComputed
} from "./chunk-FS25QDSJ.js";
import "./chunk-HZ5CS3EU.js";
import "./chunk-OMH7NEK4.js";
import "./chunk-4MRT5KFH.js";
import "./chunk-KWLN6AZG.js";
import "./chunk-GPJRF3VM.js";
import "./chunk-GOQIOX72.js";
import "./chunk-GPGXHKXU.js";
import "./chunk-TYEYL6JI.js";
import "./chunk-CVEB2JTF.js";
import "./chunk-E5UDU7XN.js";
import "./chunk-2RUE6MFF.js";
import "./chunk-4WOLRYCI.js";
import "./chunk-XFJEV2GR.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import "./chunk-YOYAIZOW.js";
import "./chunk-OZ2G5ZKT.js";
import "./chunk-EBBYNBKM.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-O3YNDXOX.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-DQQIQ7YS.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/lcp-lazy-loaded.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on whether the largest above-the-fold image was loaded with sufficient priority. This descriptive title is shown to users when the image was loaded properly. */
  title: "Largest Contentful Paint image was not lazily loaded",
  /** Title of a Lighthouse audit that provides detail on whether the largest above-the-fold image was loaded with sufficient priority. This descriptive title is shown to users when the image was loaded inefficiently using the `loading=lazy` attribute. */
  failureTitle: "Largest Contentful Paint image was lazily loaded",
  /** Description of a Lighthouse audit that tells the user why the advice is important. This is displayed after a user expands the section to see more. No character length limits. */
  description: "Above-the-fold images that are lazily loaded render later in the page lifecycle, which can delay the largest contentful paint. [Learn more about optimal lazy loading](https://web.dev/articles/lcp-lazy-loading)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var ESTIMATED_PERCENT_SAVINGS = 0.15;
var LargestContentfulPaintLazyLoaded = class extends Audit {
  static {
    __name(this, "LargestContentfulPaintLazyLoaded");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "lcp-lazy-loaded",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      supportedModes: ["navigation"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 3,
      requiredArtifacts: [
        "TraceElements",
        "ViewportDimensions",
        "ImageElements",
        "Trace",
        "DevtoolsLog",
        "GatherContext",
        "URL",
        "SourceMaps"
      ]
    };
  }
  /**
   * @param {LH.Artifacts.ImageElement} image
   * @param {LH.Artifacts.ViewportDimensions} viewportDimensions
   * @return {boolean}
   */
  static isImageInViewport(image, viewportDimensions) {
    const imageTop = image.clientRect.top;
    const viewportHeight = viewportDimensions.innerHeight;
    return imageTop < viewportHeight;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const lcpElement = artifacts.TraceElements.find((element) => {
      return element.traceEventType === "largest-contentful-paint" && element.type === "image";
    });
    const lcpElementImage = lcpElement ? artifacts.ImageElements.find((elem) => {
      return elem.node.devtoolsNodePath === lcpElement.node.devtoolsNodePath;
    }) : void 0;
    if (!lcpElementImage || !this.isImageInViewport(lcpElementImage, artifacts.ViewportDimensions)) {
      return {
        score: null,
        notApplicable: true,
        metricSavings: { LCP: 0 }
      };
    }
    const headings = [
      { key: "node", valueType: "node", label: str_(UIStrings.columnElement) }
    ];
    const details = Audit.makeTableDetails(headings, [
      {
        node: Audit.makeNodeItem(lcpElementImage.node)
      }
    ]);
    const wasLazyLoaded = lcpElementImage.loading === "lazy";
    const metricComputationData = Audit.makeMetricComputationDataInput(artifacts, context);
    const { timing: metricLcp } = await LargestContentfulPaintComputed.request(metricComputationData, context);
    const lcpBreakdown = await LCPBreakdownComputed.request(metricComputationData, context);
    let lcpSavings = 0;
    if (wasLazyLoaded && lcpBreakdown.loadStart !== void 0) {
      const lcpLoadDelay = lcpBreakdown.loadStart - lcpBreakdown.ttfb;
      lcpSavings = Math.min(metricLcp * ESTIMATED_PERCENT_SAVINGS, lcpLoadDelay);
    }
    return {
      score: wasLazyLoaded ? 0 : 1,
      metricSavings: {
        LCP: lcpSavings
      },
      details
    };
  }
};
var lcp_lazy_loaded_default = LargestContentfulPaintLazyLoaded;
export {
  UIStrings2 as UIStrings,
  lcp_lazy_loaded_default as default
};
/*! Bundled license information:

lighthouse/core/audits/lcp-lazy-loaded.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
