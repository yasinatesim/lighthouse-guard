import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  Sentry
} from "../chunk-4LDDF7I7.js";
import "../chunk-NUK2ASLP.js";
import {
  NetworkRecordsComputed,
  NetworkRequest,
  url_utils_default
} from "../chunk-QE4YYANC.js";
import "../chunk-HXOADL7R.js";
import {
  lighthouse_logger_default
} from "../chunk-FOYXSDFQ.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-SLD7CHCU.js";
import {
  devtools_log_default
} from "../chunk-NSCX6JDY.js";
import {
  base_gatherer_default
} from "../chunk-3PE3GB6I.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/dobetterweb/optimized-images.js
var MAX_TIME_TO_SPEND_ENCODING = 5e3;
var MAX_RESOURCE_SIZE_TO_ENCODE = 2e3 * 1024;
var JPEG_QUALITY = 0.92;
var WEBP_QUALITY = 0.85;
var MINIMUM_IMAGE_SIZE = 4096;
var IMAGE_REGEX = /^image\/((x|ms|x-ms)-)?(png|bmp|jpeg)$/;
var OptimizedImages = class _OptimizedImages extends base_gatherer_default {
  static {
    __name(this, "OptimizedImages");
  }
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  constructor() {
    super();
    this._encodingStartAt = 0;
  }
  /**
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @return {Array<SimplifiedNetworkRecord>}
   */
  static filterImageRequests(networkRecords) {
    const seenUrls = /* @__PURE__ */ new Set();
    return networkRecords.reduce(
      (prev, record) => {
        if (seenUrls.has(record.url) || !record.finished || record.sessionTargetType !== "page") {
          return prev;
        }
        seenUrls.add(record.url);
        const isOptimizableImage = record.resourceType === NetworkRequest.TYPES.Image && IMAGE_REGEX.test(record.mimeType);
        const actualResourceSize = NetworkRequest.getResourceSizeOnNetwork(record);
        if (isOptimizableImage && actualResourceSize > MINIMUM_IMAGE_SIZE) {
          prev.push({
            requestId: record.requestId,
            url: record.url,
            mimeType: record.mimeType,
            resourceSize: actualResourceSize
          });
        }
        return prev;
      },
      /** @type {Array<SimplifiedNetworkRecord>} */
      []
    );
  }
  /**
   * @param {LH.Gatherer.ProtocolSession} session
   * @param {string} requestId
   * @param {'jpeg'|'webp'} encoding Either webp or jpeg.
   * @return {Promise<LH.Crdp.Audits.GetEncodedResponseResponse>}
   */
  _getEncodedResponse(session, requestId, encoding) {
    requestId = NetworkRequest.getRequestIdForBackend(requestId);
    const quality = encoding === "jpeg" ? JPEG_QUALITY : WEBP_QUALITY;
    const params = { requestId, encoding, quality, sizeOnly: true };
    return session.sendCommand("Audits.getEncodedResponse", params);
  }
  /**
   * @param {LH.Gatherer.ProtocolSession} session
   * @param {SimplifiedNetworkRecord} networkRecord
   * @return {Promise<{originalSize: number, jpegSize?: number, webpSize?: number}>}
   */
  async calculateImageStats(session, networkRecord) {
    const originalSize = networkRecord.resourceSize;
    if (Date.now() - this._encodingStartAt > MAX_TIME_TO_SPEND_ENCODING || originalSize > MAX_RESOURCE_SIZE_TO_ENCODE) {
      return { originalSize, jpegSize: void 0, webpSize: void 0 };
    }
    const jpegData = await this._getEncodedResponse(session, networkRecord.requestId, "jpeg");
    const webpData = await this._getEncodedResponse(session, networkRecord.requestId, "webp");
    return {
      originalSize,
      jpegSize: jpegData.encodedSize,
      webpSize: webpData.encodedSize
    };
  }
  /**
   * @param {LH.Gatherer.ProtocolSession} session
   * @param {Array<SimplifiedNetworkRecord>} imageRecords
   * @return {Promise<LH.Artifacts['OptimizedImages']>}
   */
  async computeOptimizedImages(session, imageRecords) {
    this._encodingStartAt = Date.now();
    const results = [];
    for (const record of imageRecords) {
      try {
        const stats = await this.calculateImageStats(session, record);
        const image = { failed: false, ...stats, ...record };
        results.push(image);
      } catch (err) {
        lighthouse_logger_default.warn("optimized-images", err.message, record.url);
        Sentry.captureException(err, {
          tags: { gatherer: "OptimizedImages" },
          extra: { imageUrl: url_utils_default.elideDataURI(record.url) },
          level: "warning"
        });
        const imageError = { failed: true, errMsg: err.message, ...record };
        results.push(imageError);
      }
    }
    return results;
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {Promise<LH.Artifacts['OptimizedImages']>}
   */
  async getArtifact(context) {
    const devtoolsLog = context.dependencies.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const imageRecords = _OptimizedImages.filterImageRequests(networkRecords).sort((a, b) => b.resourceSize - a.resourceSize);
    return await this.computeOptimizedImages(context.driver.defaultSession, imageRecords);
  }
};
var optimized_images_default = OptimizedImages;
export {
  optimized_images_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/dobetterweb/optimized-images.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
