import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ImageRecordsComputed
} from "./chunk-CHRUNVRL.js";
import {
  ByteEfficiencyAudit
} from "./chunk-5PQDCZ5I.js";
import {
  NetworkRequest
} from "./chunk-YOYAIZOW.js";
import {
  url_utils_default
} from "./chunk-OZ2G5ZKT.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-O3YNDXOX.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/byte-efficiency/uses-responsive-images.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to resize images to match the display dimensions. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Properly size images",
  /** Description of a Lighthouse audit that tells the user *why* they need to serve appropriately sized images. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn how to size images](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_BYTES = 4096;
var IGNORE_THRESHOLD_IN_BYTES_BREAKPOINTS_PRESENT = 12288;
var UsesResponsiveImages = class _UsesResponsiveImages extends ByteEfficiencyAudit {
  static {
    __name(this, "UsesResponsiveImages");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-responsive-images",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 2,
      requiredArtifacts: [
        "ImageElements",
        "ViewportDimensions",
        "GatherContext",
        "DevtoolsLog",
        "Trace",
        "URL",
        "SourceMaps"
      ]
    };
  }
  /**
   * @param {LH.Artifacts.ImageElement & {naturalWidth: number, naturalHeight: number}} image
   * @param {LH.Artifacts.ViewportDimensions} ViewportDimensions
   * @return {{width: number, height: number}};
   */
  static getDisplayedDimensions(image, ViewportDimensions) {
    if (image.displayedWidth && image.displayedHeight) {
      return {
        width: image.displayedWidth * ViewportDimensions.devicePixelRatio,
        height: image.displayedHeight * ViewportDimensions.devicePixelRatio
      };
    }
    const viewportWidth = ViewportDimensions.innerWidth;
    const viewportHeight = ViewportDimensions.innerHeight * 2;
    const imageAspectRatio = image.naturalWidth / image.naturalHeight;
    const viewportAspectRatio = viewportWidth / viewportHeight;
    let usedViewportWidth = viewportWidth;
    let usedViewportHeight = viewportHeight;
    if (imageAspectRatio > viewportAspectRatio) {
      usedViewportHeight = viewportWidth / imageAspectRatio;
    } else {
      usedViewportWidth = viewportHeight * imageAspectRatio;
    }
    return {
      width: usedViewportWidth * ViewportDimensions.devicePixelRatio,
      height: usedViewportHeight * ViewportDimensions.devicePixelRatio
    };
  }
  /**
   * @param {LH.Artifacts.ImageElement & {naturalWidth: number, naturalHeight: number}} image
   * @param {LH.Artifacts.ViewportDimensions} ViewportDimensions
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @return {null|LH.Audit.ByteEfficiencyItem};
   */
  static computeWaste(image, ViewportDimensions, networkRecords) {
    const networkRecord = networkRecords.find((record) => record.url === image.src);
    if (!networkRecord) {
      return null;
    }
    const displayed = this.getDisplayedDimensions(image, ViewportDimensions);
    const usedPixels = displayed.width * displayed.height;
    const url = url_utils_default.elideDataURI(image.src);
    const actualPixels = image.naturalWidth * image.naturalHeight;
    const wastedRatio = 1 - usedPixels / actualPixels;
    const totalBytes = NetworkRequest.getResourceSizeOnNetwork(networkRecord);
    const wastedBytes = Math.round(totalBytes * wastedRatio);
    return {
      node: ByteEfficiencyAudit.makeNodeItem(image.node),
      url,
      totalBytes,
      wastedBytes,
      wastedPercent: 100 * wastedRatio
    };
  }
  /**
   * @param {LH.Artifacts.ImageElement} image
   * @return {number};
   */
  static determineAllowableWaste(image) {
    if (image.srcset || image.isPicture) {
      return IGNORE_THRESHOLD_IN_BYTES_BREAKPOINTS_PRESENT;
    }
    return IGNORE_THRESHOLD_IN_BYTES;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Audit.Context} context
   * @return {Promise<import('./byte-efficiency-audit.js').ByteEfficiencyProduct>}
   */
  static async audit_(artifacts, networkRecords, context) {
    const images = await ImageRecordsComputed.request({
      ImageElements: artifacts.ImageElements,
      networkRecords
    }, context);
    const ViewportDimensions = artifacts.ViewportDimensions;
    const resultsMap = /* @__PURE__ */ new Map();
    const passedImageList = [];
    for (const image of images) {
      if (image.mimeType === "image/svg+xml" || image.isCss) {
        continue;
      }
      if (!image.naturalDimensions) continue;
      const naturalHeight = image.naturalDimensions.height;
      const naturalWidth = image.naturalDimensions.width;
      if (!naturalWidth || !naturalHeight) continue;
      const processed = _UsesResponsiveImages.computeWaste(
        { ...image, naturalHeight, naturalWidth },
        ViewportDimensions,
        networkRecords
      );
      if (!processed) continue;
      const exceedsAllowableWaste = processed.wastedBytes > this.determineAllowableWaste(image);
      const existing = resultsMap.get(processed.url);
      if (exceedsAllowableWaste && !passedImageList.includes(processed.url)) {
        if (!existing || existing.wastedBytes > processed.wastedBytes) {
          resultsMap.set(processed.url, processed);
        }
      } else {
        resultsMap.delete(processed.url);
        passedImageList.push(processed.url);
      }
    }
    const items = Array.from(resultsMap.values());
    const headings = [
      { key: "node", valueType: "node", label: "" },
      { key: "url", valueType: "url", label: str_(UIStrings.columnURL) },
      { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnResourceSize) },
      { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings.columnWastedBytes) }
    ];
    return {
      items,
      headings
    };
  }
};
var uses_responsive_images_default = UsesResponsiveImages;

export {
  UIStrings2 as UIStrings,
  str_,
  uses_responsive_images_default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/uses-responsive-images.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
