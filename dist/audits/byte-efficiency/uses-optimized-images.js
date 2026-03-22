import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ByteEfficiencyAudit
} from "../chunk-DGNLV5FC.js";
import "../chunk-TMQPGYS4.js";
import "../chunk-4PONSSZA.js";
import "../chunk-YN3ARENP.js";
import "../chunk-IOK3BAH7.js";
import "../chunk-ZIUDIWBD.js";
import "../chunk-Z7S4UQSE.js";
import "../chunk-22N3WN7S.js";
import "../chunk-GRLAFLTF.js";
import "../chunk-2FKQ374S.js";
import "../chunk-ZATS4KUU.js";
import "../chunk-FTKGXG7F.js";
import "../chunk-3WVTZQMF.js";
import "../chunk-3KEMYTTF.js";
import "../chunk-JDNHHZFJ.js";
import {
  url_utils_default
} from "../chunk-YNYBF6HU.js";
import "../chunk-2BIJ7VKV.js";
import "../chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/byte-efficiency/uses-optimized-images.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to encode images with optimization (better compression). This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Efficiently encode images",
  /** Description of a Lighthouse audit that tells the user *why* they need to efficiently encode images. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Optimized images load faster and consume less cellular data. [Learn how to efficiently encode images](https://developer.chrome.com/docs/lighthouse/performance/uses-optimized-images/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_BYTES = 4096;
var UsesOptimizedImages = class _UsesOptimizedImages extends ByteEfficiencyAudit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-optimized-images",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 2,
      requiredArtifacts: [
        "OptimizedImages",
        "ImageElements",
        "GatherContext",
        "DevtoolsLog",
        "Trace",
        "URL",
        "SourceMaps"
      ]
    };
  }
  /**
   * @param {{originalSize: number, jpegSize: number}} image
   * @return {{bytes: number, percent: number}}
   */
  static computeSavings(image) {
    const bytes = image.originalSize - image.jpegSize;
    const percent = 100 * bytes / image.originalSize;
    return { bytes, percent };
  }
  /**
   * @param {{naturalWidth: number, naturalHeight: number}} imageElement
   * @return {number}
   */
  static estimateJPEGSizeFromDimensions(imageElement) {
    const totalPixels = imageElement.naturalWidth * imageElement.naturalHeight;
    const expectedBytesPerPixel = 2 * 1 / 8;
    return Math.round(totalPixels * expectedBytesPerPixel);
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {import('./byte-efficiency-audit.js').ByteEfficiencyProduct}
   */
  static audit_(artifacts) {
    const pageURL = artifacts.URL.finalDisplayedUrl;
    const images = artifacts.OptimizedImages;
    const imageElements = artifacts.ImageElements;
    const imageElementsByURL = /* @__PURE__ */ new Map();
    imageElements.forEach((img) => imageElementsByURL.set(img.src, img));
    const items = [];
    const warnings = [];
    for (const image of images) {
      const imageElement = imageElementsByURL.get(image.url);
      if (image.failed) {
        warnings.push(`Unable to decode ${url_utils_default.getURLDisplayName(image.url)}`);
        continue;
      } else if (/(jpeg|bmp)/.test(image.mimeType) === false) {
        continue;
      }
      let jpegSize = image.jpegSize;
      let fromProtocol = true;
      if (typeof jpegSize === "undefined") {
        if (!imageElement) {
          warnings.push(`Unable to locate resource ${url_utils_default.getURLDisplayName(image.url)}`);
          continue;
        }
        if (!imageElement.naturalDimensions) continue;
        const naturalHeight = imageElement.naturalDimensions.height;
        const naturalWidth = imageElement.naturalDimensions.width;
        if (!naturalHeight || !naturalWidth) continue;
        jpegSize = _UsesOptimizedImages.estimateJPEGSizeFromDimensions({ naturalHeight, naturalWidth });
        fromProtocol = false;
      }
      if (image.originalSize < jpegSize + IGNORE_THRESHOLD_IN_BYTES) continue;
      const url = url_utils_default.elideDataURI(image.url);
      const isCrossOrigin = !url_utils_default.originsMatch(pageURL, image.url);
      const jpegSavings = _UsesOptimizedImages.computeSavings({ ...image, jpegSize });
      items.push({
        node: imageElement ? ByteEfficiencyAudit.makeNodeItem(imageElement.node) : void 0,
        url,
        fromProtocol,
        isCrossOrigin,
        totalBytes: image.originalSize,
        wastedBytes: jpegSavings.bytes
      });
    }
    const headings = [
      { key: "node", valueType: "node", label: "" },
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnResourceSize) },
      { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings.columnWastedBytes) }
    ];
    return {
      warnings,
      items,
      headings
    };
  }
};
var uses_optimized_images_default = UsesOptimizedImages;
export {
  UIStrings2 as UIStrings,
  uses_optimized_images_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/uses-optimized-images.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
