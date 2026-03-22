import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  InteractiveComputed
} from "../chunk-AEG256KD.js";
import "../chunk-SPBZCMTA.js";
import "../chunk-E4NYJWSQ.js";
import {
  ByteEfficiencyAudit
} from "../chunk-7TZ77HKH.js";
import "../chunk-22KTQBIM.js";
import "../chunk-5FAUCPF6.js";
import "../chunk-VUSO5I4V.js";
import "../chunk-ZFITDNXI.js";
import "../chunk-5AKLBR55.js";
import "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import {
  Sentry
} from "../chunk-2DV6G4YM.js";
import "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import {
  ProcessedTraceComputed
} from "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  NetworkRequest
} from "../chunk-AB7S44AE.js";
import {
  url_utils_default
} from "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/byte-efficiency/offscreen-images.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to defer loading offscreen images. Offscreen images are images located outside of the visible browser viewport. As they are unseen by the user and slow down page load, they should be loaded later, closer to when the user is going to see them. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Defer offscreen images",
  /** Description of a Lighthouse audit that tells the user *why* they should defer loading offscreen images. Offscreen images are images located outside of the visible browser viewport. As they are unseen by the user and slow down page load, they should be loaded later, closer to when the user is going to see them. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn how to defer offscreen images](https://developer.chrome.com/docs/lighthouse/performance/offscreen-images/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var ALLOWABLE_OFFSCREEN_IN_PX = 100;
var ALLOWABLE_OFFSCREEN_BOTTOM_IN_VIEWPORTS = 3;
var IGNORE_THRESHOLD_IN_BYTES = 2048;
var IGNORE_THRESHOLD_IN_PERCENT = 75;
var IGNORE_THRESHOLD_IN_MS = 50;
var OffscreenImages = class _OffscreenImages extends ByteEfficiencyAudit {
  static {
    __name(this, "OffscreenImages");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "offscreen-images",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      supportedModes: ["navigation"],
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
   * @param {{top: number, bottom: number, left: number, right: number}} imageRect
   * @param {{innerWidth: number, innerHeight: number}} viewportDimensions
   * @return {number}
   */
  static computeVisiblePixels(imageRect, viewportDimensions) {
    const innerWidth = viewportDimensions.innerWidth;
    const innerHeight = viewportDimensions.innerHeight;
    const allowableOffscreenBottomInPx = ALLOWABLE_OFFSCREEN_BOTTOM_IN_VIEWPORTS * viewportDimensions.innerHeight;
    const top = Math.max(imageRect.top, -1 * ALLOWABLE_OFFSCREEN_IN_PX);
    const right = Math.min(imageRect.right, innerWidth + ALLOWABLE_OFFSCREEN_IN_PX);
    const bottom = Math.min(imageRect.bottom, innerHeight + allowableOffscreenBottomInPx);
    const left = Math.max(imageRect.left, -1 * ALLOWABLE_OFFSCREEN_IN_PX);
    return Math.max(right - left, 0) * Math.max(bottom - top, 0);
  }
  /**
   * @param {LH.Artifacts.ImageElement} image
   * @param {{innerWidth: number, innerHeight: number}} viewportDimensions
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @return {null|Error|WasteResult}
   */
  static computeWaste(image, viewportDimensions, networkRecords) {
    const networkRecord = networkRecords.find((record) => record.url === image.src);
    if (!networkRecord) return null;
    if (image.loading === "lazy" || image.loading === "eager") return null;
    const url = url_utils_default.elideDataURI(image.src);
    const totalPixels = image.displayedWidth * image.displayedHeight;
    const visiblePixels = this.computeVisiblePixels(image.clientRect, viewportDimensions);
    const wastedRatio = totalPixels === 0 ? 1 : 1 - visiblePixels / totalPixels;
    const totalBytes = NetworkRequest.getResourceSizeOnNetwork(networkRecord);
    const wastedBytes = Math.round(totalBytes * wastedRatio);
    if (!Number.isFinite(wastedRatio)) {
      return new Error(`Invalid image sizing information ${url}`);
    }
    return {
      node: ByteEfficiencyAudit.makeNodeItem(image.node),
      url,
      requestStartTime: networkRecord.networkRequestTime,
      totalBytes,
      wastedBytes,
      wastedPercent: 100 * wastedRatio
    };
  }
  /**
   * Filters out image requests that were requested after the last long task based on lantern timings.
   *
   * @param {WasteResult[]} images
   * @param {LH.Artifacts.LanternMetric} lanternMetricData
   */
  static filterLanternResults(images, lanternMetricData) {
    const nodeTimings = lanternMetricData.pessimisticEstimate.nodeTimings;
    let lastLongTaskStartTime = 0;
    const startTimesByURL = /* @__PURE__ */ new Map();
    for (const [node, timing] of nodeTimings) {
      if (node.type === "cpu" && timing.duration >= 50) {
        lastLongTaskStartTime = Math.max(lastLongTaskStartTime, timing.startTime);
      } else if (node.type === "network") {
        startTimesByURL.set(node.request.url, timing.startTime);
      }
    }
    return images.filter((image) => {
      if (image.wastedBytes < IGNORE_THRESHOLD_IN_BYTES) return false;
      if (image.wastedPercent < IGNORE_THRESHOLD_IN_PERCENT) return false;
      const imageRequestStartTime = startTimesByURL.get(image.url) || 0;
      return imageRequestStartTime < lastLongTaskStartTime - IGNORE_THRESHOLD_IN_MS;
    });
  }
  /**
   * Filters out image requests that were requested after TTI.
   *
   * @param {WasteResult[]} images
   * @param {number} interactiveTimestamp
   */
  static filterObservedResults(images, interactiveTimestamp) {
    return images.filter((image) => {
      if (image.wastedBytes < IGNORE_THRESHOLD_IN_BYTES) return false;
      if (image.wastedPercent < IGNORE_THRESHOLD_IN_PERCENT) return false;
      return image.requestStartTime < interactiveTimestamp / 1e3 - IGNORE_THRESHOLD_IN_MS;
    });
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Audit.Context} context
   * @return {Promise<import('./byte-efficiency-audit.js').ByteEfficiencyProduct>}
   */
  static async audit_(artifacts, networkRecords, context) {
    const { URL, SourceMaps } = artifacts;
    const images = artifacts.ImageElements;
    const viewportDimensions = artifacts.ViewportDimensions;
    const gatherContext = artifacts.GatherContext;
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const warnings = [];
    const resultsMap = /* @__PURE__ */ new Map();
    for (const image of images) {
      const processed = _OffscreenImages.computeWaste(image, viewportDimensions, networkRecords);
      if (processed === null) {
        continue;
      }
      if (processed instanceof Error) {
        warnings.push(processed.message);
        Sentry.captureException(processed, { tags: { audit: this.meta.id }, level: "warning" });
        continue;
      }
      const existing = resultsMap.get(processed.url);
      if (!existing || existing.wastedBytes > processed.wastedBytes) {
        resultsMap.set(processed.url, processed);
      }
    }
    const settings = context.settings;
    let items;
    const unfilteredResults = Array.from(resultsMap.values());
    try {
      const metricComputationData = { trace, devtoolsLog, gatherContext, settings, URL, SourceMaps, simulator: null };
      const interactive = await InteractiveComputed.request(metricComputationData, context);
      const lanternInteractive = (
        /** @type {LH.Artifacts.LanternMetric} */
        interactive
      );
      items = context.settings.throttlingMethod === "simulate" ? _OffscreenImages.filterLanternResults(unfilteredResults, lanternInteractive) : (
        // @ts-expect-error - .timestamp will exist if throttlingMethod isn't lantern
        _OffscreenImages.filterObservedResults(unfilteredResults, interactive.timestamp)
      );
    } catch (err) {
      if (context.settings.throttlingMethod === "simulate") {
        throw err;
      }
      items = _OffscreenImages.filterObservedResults(
        unfilteredResults,
        await ProcessedTraceComputed.request(trace, context).then((tot) => tot.timestamps.traceEnd)
      );
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
var offscreen_images_default = OffscreenImages;
export {
  UIStrings2 as UIStrings,
  offscreen_images_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/offscreen-images.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
