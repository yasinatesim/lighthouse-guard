import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  url_utils_default
} from "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import {
  UIStrings,
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

// node_modules/lighthouse/core/audits/image-aspect-ratio.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the aspect ratios of all images on the page. This descriptive title is shown to users when all images use correct aspect ratios. */
  title: "Displays images with correct aspect ratio",
  /** Title of a Lighthouse audit that provides detail on the aspect ratios of all images on the page. This descriptive title is shown to users when not all images use correct aspect ratios. */
  failureTitle: "Displays images with incorrect aspect ratio",
  /** Description of a Lighthouse audit that tells the user why they should maintain the correct aspect ratios for all images. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Image display dimensions should match natural aspect ratio. [Learn more about image aspect ratio](https://developer.chrome.com/docs/lighthouse/best-practices/image-aspect-ratio/).",
  /**  Label for a column in a data table; entries in the column will be the numeric aspect ratio of an image as displayed in a web page. */
  columnDisplayed: "Aspect Ratio (Displayed)",
  /**  Label for a column in a data table; entries in the column will be the numeric aspect ratio of the raw (actual) image. */
  columnActual: "Aspect Ratio (Actual)"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var THRESHOLD_PX = 2;
var ImageAspectRatio = class _ImageAspectRatio extends Audit {
  static {
    __name(this, "ImageAspectRatio");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "image-aspect-ratio",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["ImageElements"]
    };
  }
  /**
   * @param {WellDefinedImage} image
   * @return {{url: string, node: LH.Audit.Details.NodeValue, displayedAspectRatio: string, actualAspectRatio: string, doRatiosMatch: boolean}}
   */
  static computeAspectRatios(image) {
    const url = url_utils_default.elideDataURI(image.src);
    const actualAspectRatio = image.naturalDimensions.width / image.naturalDimensions.height;
    const displayedAspectRatio = image.displayedWidth / image.displayedHeight;
    const targetDisplayHeight = image.displayedWidth / actualAspectRatio;
    const targetDisplayWidth = image.displayedHeight * actualAspectRatio;
    const doRatiosMatch = targetDisplayHeight < targetDisplayWidth ? Math.abs(targetDisplayHeight - image.displayedHeight) < THRESHOLD_PX : Math.abs(targetDisplayWidth - image.displayedWidth) < THRESHOLD_PX;
    return {
      url,
      node: Audit.makeNodeItem(image.node),
      displayedAspectRatio: `${image.displayedWidth} x ${image.displayedHeight}
        (${displayedAspectRatio.toFixed(2)})`,
      actualAspectRatio: `${image.naturalDimensions.width} x ${image.naturalDimensions.height}
        (${actualAspectRatio.toFixed(2)})`,
      doRatiosMatch
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const images = artifacts.ImageElements;
    const results = [];
    images.filter((image) => {
      return !image.isCss && url_utils_default.guessMimeType(image.src) !== "image/svg+xml" && image.naturalDimensions && image.naturalDimensions.height > 5 && image.naturalDimensions.width > 5 && image.displayedWidth && image.displayedHeight && image.computedStyles.objectFit === "fill";
    }).forEach((image) => {
      const wellDefinedImage = (
        /** @type {WellDefinedImage} */
        image
      );
      const processed = _ImageAspectRatio.computeAspectRatios(wellDefinedImage);
      if (!processed.doRatiosMatch) results.push(processed);
    });
    const headings = [
      { key: "node", valueType: "node", label: "" },
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "displayedAspectRatio", valueType: "text", label: str_(UIStrings2.columnDisplayed) },
      { key: "actualAspectRatio", valueType: "text", label: str_(UIStrings2.columnActual) }
    ];
    return {
      score: Number(results.length === 0),
      details: Audit.makeTableDetails(headings, results)
    };
  }
};
var image_aspect_ratio_default = ImageAspectRatio;
export {
  UIStrings2 as UIStrings,
  image_aspect_ratio_default as default
};
/*! Bundled license information:

lighthouse/core/audits/image-aspect-ratio.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
