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

// node_modules/lighthouse/core/audits/byte-efficiency/modern-image-formats.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to serve images in newer and more efficient image formats in order to enhance the performance of a page. A non-modern image format was designed 20+ years ago. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Serve images in next-gen formats",
  /** Description of a Lighthouse audit that tells the user *why* they should use newer and more efficient image formats. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Image formats like WebP and AVIF often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more about modern image formats](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_BYTES = 8192;
var ModernImageFormats = class _ModernImageFormats extends ByteEfficiencyAudit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "modern-image-formats",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 3,
      requiredArtifacts: [
        "OptimizedImages",
        "DevtoolsLog",
        "Trace",
        "URL",
        "GatherContext",
        "ImageElements",
        "SourceMaps"
      ]
    };
  }
  /**
   * @param {{naturalWidth: number, naturalHeight: number}} imageElement
   * @return {number}
   */
  static estimateWebPSizeFromDimensions(imageElement) {
    const totalPixels = imageElement.naturalWidth * imageElement.naturalHeight;
    const expectedBytesPerPixel = 2 * 1 / 10;
    return Math.round(totalPixels * expectedBytesPerPixel);
  }
  /**
   * @param {{naturalWidth: number, naturalHeight: number}} imageElement
   * @return {number}
   */
  static estimateAvifSizeFromDimensions(imageElement) {
    const totalPixels = imageElement.naturalWidth * imageElement.naturalHeight;
    const expectedBytesPerPixel = 2 * 1 / 12;
    return Math.round(totalPixels * expectedBytesPerPixel);
  }
  /**
   * @param {{jpegSize: number | undefined, webpSize: number | undefined}} otherFormatSizes
   * @return {number|undefined}
   */
  static estimateAvifSizeFromWebPAndJpegEstimates(otherFormatSizes) {
    if (!otherFormatSizes.jpegSize || !otherFormatSizes.webpSize) return void 0;
    const estimateFromJpeg = otherFormatSizes.jpegSize * 5 / 10;
    const estimateFromWebp = otherFormatSizes.webpSize * 8 / 10;
    return estimateFromJpeg / 2 + estimateFromWebp / 2;
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
      }
      if (image.mimeType === "image/webp" || image.mimeType === "image/avif") continue;
      const jpegSize = image.jpegSize;
      let webpSize = image.webpSize;
      let avifSize = _ModernImageFormats.estimateAvifSizeFromWebPAndJpegEstimates({
        jpegSize,
        webpSize
      });
      let fromProtocol = true;
      if (typeof webpSize === "undefined") {
        if (!imageElement) {
          warnings.push(`Unable to locate resource ${url_utils_default.getURLDisplayName(image.url)}`);
          continue;
        }
        if (!imageElement.naturalDimensions) continue;
        const naturalHeight = imageElement.naturalDimensions.height;
        const naturalWidth = imageElement.naturalDimensions.width;
        if (!naturalWidth || !naturalHeight) continue;
        webpSize = _ModernImageFormats.estimateWebPSizeFromDimensions({
          naturalHeight,
          naturalWidth
        });
        avifSize = _ModernImageFormats.estimateAvifSizeFromDimensions({
          naturalHeight,
          naturalWidth
        });
        fromProtocol = false;
      }
      if (webpSize === void 0 || avifSize === void 0) continue;
      const wastedWebpBytes = image.originalSize - webpSize;
      const wastedBytes = image.originalSize - avifSize;
      if (wastedBytes < IGNORE_THRESHOLD_IN_BYTES) continue;
      const url = url_utils_default.elideDataURI(image.url);
      const isCrossOrigin = !url_utils_default.originsMatch(pageURL, image.url);
      items.push({
        node: imageElement ? ByteEfficiencyAudit.makeNodeItem(imageElement.node) : void 0,
        url,
        fromProtocol,
        isCrossOrigin,
        totalBytes: image.originalSize,
        wastedBytes,
        wastedWebpBytes
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
var modern_image_formats_default = ModernImageFormats;
export {
  UIStrings2 as UIStrings,
  modern_image_formats_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/modern-image-formats.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
