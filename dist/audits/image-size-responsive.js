import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ImageRecordsComputed
} from "./chunk-6QMGR6RW.js";
import {
  NetworkRecordsComputed
} from "./chunk-JDNHHZFJ.js";
import {
  url_utils_default
} from "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
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

// node_modules/lighthouse/core/audits/image-size-responsive.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the size of visible images on the page. This descriptive title is shown to users when all images have correct sizes. */
  title: "Serves images with appropriate resolution",
  /** Title of a Lighthouse audit that provides detail on the size of visible images on the page. This descriptive title is shown to users when not all images have correct sizes. */
  failureTitle: "Serves images with low resolution",
  /** Description of a Lighthouse audit that tells the user why they should maintain an appropriate size for all images. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Image natural dimensions should be proportional to the display size and the pixel ratio to maximize image clarity. [Learn how to provide responsive images](https://web.dev/articles/serve-responsive-images).",
  /**  Label for a column in a data table; entries in the column will be a string representing the displayed size of the image. */
  columnDisplayed: "Displayed size",
  /**  Label for a column in a data table; entries in the column will be a string representing the actual size of the image. */
  columnActual: "Actual size",
  /**  Label for a column in a data table; entries in the column will be a string representing the expected size of the image. */
  columnExpected: "Expected size"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var SMALL_IMAGE_FACTOR = 1;
var LARGE_IMAGE_FACTOR = 0.75;
var SMALL_IMAGE_THRESHOLD = 64;
function isVisible(imageRect, viewportDimensions) {
  return (imageRect.bottom - imageRect.top) * (imageRect.right - imageRect.left) > 0 && imageRect.top <= viewportDimensions.innerHeight && imageRect.bottom >= 0 && imageRect.left <= viewportDimensions.innerWidth && imageRect.right >= 0;
}
function isSmallerThanViewport(imageRect, viewportDimensions) {
  return imageRect.bottom - imageRect.top <= viewportDimensions.innerHeight && imageRect.right - imageRect.left <= viewportDimensions.innerWidth;
}
function isCandidate(image, imageRecord) {
  const artisticImageRenderingValues = ["pixelated", "crisp-edges"];
  const densityDescriptorRegex = / \d+(\.\d+)?x/;
  if (image.displayedWidth <= 1 || image.displayedHeight <= 1) {
    return false;
  }
  if (!image.naturalDimensions || !image.naturalDimensions.width || !image.naturalDimensions.height) {
    return false;
  }
  if (imageRecord?.mimeType === "image/svg+xml") {
    return false;
  }
  if (url_utils_default.guessMimeType(image.src) === "image/svg+xml") {
    return false;
  }
  if (image.isCss) {
    return false;
  }
  if (image.computedStyles.objectFit !== "fill") {
    return false;
  }
  if (artisticImageRenderingValues.includes(image.computedStyles.imageRendering)) {
    return false;
  }
  if (densityDescriptorRegex.test(image.srcset)) {
    return false;
  }
  return true;
}
function imageHasNaturalDimensions(image) {
  return !!image.naturalDimensions;
}
function imageHasRightSize(image, DPR) {
  const [expectedWidth, expectedHeight] = allowedImageSize(image.displayedWidth, image.displayedHeight, DPR);
  return image.naturalDimensions.width >= expectedWidth && image.naturalDimensions.height >= expectedHeight;
}
function getResult(image, DPR) {
  const [expectedWidth, expectedHeight] = expectedImageSize(image.displayedWidth, image.displayedHeight, DPR);
  return {
    url: url_utils_default.elideDataURI(image.src),
    node: Audit.makeNodeItem(image.node),
    displayedSize: `${image.displayedWidth} x ${image.displayedHeight}`,
    actualSize: `${image.naturalDimensions.width} x ${image.naturalDimensions.height}`,
    actualPixels: image.naturalDimensions.width * image.naturalDimensions.height,
    expectedSize: `${expectedWidth} x ${expectedHeight}`,
    expectedPixels: expectedWidth * expectedHeight
  };
}
function allowedImageSize(displayedWidth, displayedHeight, DPR) {
  let factor = SMALL_IMAGE_FACTOR;
  if (displayedWidth > SMALL_IMAGE_THRESHOLD || displayedHeight > SMALL_IMAGE_THRESHOLD) {
    factor = LARGE_IMAGE_FACTOR;
  }
  const requiredDpr = quantizeDpr(DPR);
  const width = Math.ceil(factor * requiredDpr * displayedWidth);
  const height = Math.ceil(factor * requiredDpr * displayedHeight);
  return [width, height];
}
function expectedImageSize(displayedWidth, displayedHeight, DPR) {
  const width = Math.ceil(quantizeDpr(DPR) * displayedWidth);
  const height = Math.ceil(quantizeDpr(DPR) * displayedHeight);
  return [width, height];
}
function deduplicateResultsByUrl(results) {
  results.sort((a, b) => a.url === b.url ? 0 : a.url < b.url ? -1 : 1);
  const deduplicated = [];
  for (const r of results) {
    const previousResult = deduplicated[deduplicated.length - 1];
    if (previousResult && previousResult.url === r.url) {
      if (previousResult.expectedPixels < r.expectedPixels) {
        deduplicated[deduplicated.length - 1] = r;
      }
    } else {
      deduplicated.push(r);
    }
  }
  return deduplicated;
}
function sortResultsBySizeDelta(results) {
  return results.sort(
    (a, b) => b.expectedPixels - b.actualPixels - (a.expectedPixels - a.actualPixels)
  );
}
var ImageSizeResponsive = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "image-size-responsive",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["ImageElements", "ViewportDimensions"],
      __internalOptionalArtifacts: ["DevtoolsLog"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const DPR = artifacts.ViewportDimensions.devicePixelRatio;
    const imageRecordsByURL = /* @__PURE__ */ new Map();
    if (artifacts.DevtoolsLog) {
      const networkRecords = await NetworkRecordsComputed.request(artifacts.DevtoolsLog, context);
      const images = await ImageRecordsComputed.request({
        ImageElements: artifacts.ImageElements,
        networkRecords
      }, context);
      images.forEach((img) => imageRecordsByURL.set(img.src, img));
    }
    const results = Array.from(artifacts.ImageElements).filter((image) => isCandidate(image, imageRecordsByURL.get(image.src))).filter(imageHasNaturalDimensions).filter((image) => !imageHasRightSize(image, DPR)).filter((image) => isVisible(image.clientRect, artifacts.ViewportDimensions)).filter((image) => isSmallerThanViewport(image.clientRect, artifacts.ViewportDimensions)).map((image) => getResult(image, DPR));
    const headings = [
      { key: "node", valueType: "node", label: "" },
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "displayedSize", valueType: "text", label: str_(UIStrings2.columnDisplayed) },
      { key: "actualSize", valueType: "text", label: str_(UIStrings2.columnActual) },
      { key: "expectedSize", valueType: "text", label: str_(UIStrings2.columnExpected) }
    ];
    const finalResults = sortResultsBySizeDelta(deduplicateResultsByUrl(results));
    return {
      score: Number(results.length === 0),
      details: Audit.makeTableDetails(headings, finalResults)
    };
  }
};
function quantizeDpr(dpr) {
  if (dpr >= 2) {
    return 2;
  }
  if (dpr >= 1.5) {
    return 1.5;
  }
  return 1;
}
var image_size_responsive_default = ImageSizeResponsive;
export {
  UIStrings2 as UIStrings,
  image_size_responsive_default as default
};
/*! Bundled license information:

lighthouse/core/audits/image-size-responsive.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
