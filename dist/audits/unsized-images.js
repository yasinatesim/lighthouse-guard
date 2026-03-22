import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  url_utils_default
} from "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/unsized-images.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on whether all images have explicit width and height. This descriptive title is shown to users when every image has explicit width and height */
  title: "Image elements have explicit `width` and `height`",
  /** Title of a Lighthouse audit that provides detail on whether all images have explicit width and height. This descriptive title is shown to users when one or more images does not have explicit width and height */
  failureTitle: "Image elements do not have explicit `width` and `height`",
  /** Description of a Lighthouse audit that tells the user why they should include explicit width and height for all images. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Set an explicit width and height on image elements to reduce layout shifts and improve CLS. [Learn how to set image dimensions](https://web.dev/articles/optimize-cls#images_without_dimensions)"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var UnsizedImages = class _UnsizedImages extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "unsized-images",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      guidanceLevel: 4,
      requiredArtifacts: ["ImageElements"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   * An img size attribute prevents layout shifts if it is a non-negative integer (incl zero!).
   * @url https://html.spec.whatwg.org/multipage/embedded-content-other.html#dimension-attributes
   * @param {string | null} attrValue
   * @return {boolean}
   */
  static doesHtmlAttrProvideExplicitSize(attrValue) {
    if (!attrValue) return false;
    if (attrValue.startsWith("+")) return false;
    const int = parseInt(attrValue, 10);
    return int >= 0;
  }
  /**
   * An img css size property prevents layout shifts if it is defined, not empty, and not equal to 'auto'.
   * @param {string | null} property
   * @return {boolean}
   */
  static isCssPropExplicitlySet(property) {
    if (!property) return false;
    return !["auto", "initial", "unset", "inherit"].includes(property);
  }
  /**
   * Images are considered sized if they have defined & valid values.
   * @param {LH.Artifacts.ImageElement} image
   * @return {boolean}
   */
  static isSizedImage(image) {
    if (image.cssEffectiveRules === void 0) return true;
    const attrWidth = image.attributeWidth;
    const attrHeight = image.attributeHeight;
    const cssWidth = image.cssEffectiveRules.width;
    const cssHeight = image.cssEffectiveRules.height;
    const cssAspectRatio = image.cssEffectiveRules.aspectRatio;
    const htmlWidthIsExplicit = _UnsizedImages.doesHtmlAttrProvideExplicitSize(attrWidth);
    const cssWidthIsExplicit = _UnsizedImages.isCssPropExplicitlySet(cssWidth);
    const htmlHeightIsExplicit = _UnsizedImages.doesHtmlAttrProvideExplicitSize(attrHeight);
    const cssHeightIsExplicit = _UnsizedImages.isCssPropExplicitlySet(cssHeight);
    const explicitAspectRatio = _UnsizedImages.isCssPropExplicitlySet(cssAspectRatio);
    const explicitWidth = htmlWidthIsExplicit || cssWidthIsExplicit;
    const explicitHeight = htmlHeightIsExplicit || cssHeightIsExplicit;
    return explicitWidth && explicitHeight || explicitWidth && explicitAspectRatio || explicitHeight && explicitAspectRatio;
  }
  /**
   * @param {LH.Artifacts.ImageElement} image
   * @return {boolean}
   */
  static isNonNetworkSvg(image) {
    const isSvg = url_utils_default.guessMimeType(image.src) === "image/svg+xml";
    const urlScheme = image.src.slice(0, image.src.indexOf(":"));
    const isNonNetwork = url_utils_default.isNonNetworkProtocol(urlScheme);
    return isSvg && isNonNetwork;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts) {
    const images = artifacts.ImageElements.filter((el) => !el.isCss && !el.isInShadowDOM);
    const unsizedImages = [];
    for (const image of images) {
      const isFixedImage = image.computedStyles.position === "fixed" || image.computedStyles.position === "absolute";
      if (isFixedImage) continue;
      if (_UnsizedImages.isNonNetworkSvg(image)) continue;
      if (_UnsizedImages.isSizedImage(image)) continue;
      const boundingRect = image.node.boundingRect;
      const isNotDisplayed = boundingRect.width === 0 && boundingRect.height === 0;
      if (isNotDisplayed) continue;
      unsizedImages.push({
        url: url_utils_default.elideDataURI(image.src),
        node: Audit.makeNodeItem(image.node)
      });
    }
    const headings = [
      { key: "node", valueType: "node", label: "" },
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) }
    ];
    return {
      score: unsizedImages.length > 0 ? 0 : 1,
      details: Audit.makeTableDetails(headings, unsizedImages),
      metricSavings: {
        CLS: 0
      }
    };
  }
};
var unsized_images_default = UnsizedImages;
export {
  UIStrings2 as UIStrings,
  unsized_images_default as default
};
/*! Bundled license information:

lighthouse/core/audits/unsized-images.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
