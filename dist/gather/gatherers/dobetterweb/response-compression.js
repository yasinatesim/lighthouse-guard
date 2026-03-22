import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  fetchResponseBodyFromCache
} from "../chunk-FTGJSZ7L.js";
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

// node_modules/lighthouse/core/gather/gatherers/dobetterweb/response-compression.js
import { Buffer } from "buffer";
import { gzip } from "zlib";
var CHROME_EXTENSION_PROTOCOL = "chrome-extension:";
var binaryMimeTypes = ["image", "audio", "video"];
var textResourceTypes = [
  NetworkRequest.TYPES.Document,
  NetworkRequest.TYPES.Script,
  NetworkRequest.TYPES.Stylesheet,
  NetworkRequest.TYPES.XHR,
  NetworkRequest.TYPES.Fetch,
  NetworkRequest.TYPES.EventSource
];
var ResponseCompression = class _ResponseCompression extends base_gatherer_default {
  static {
    __name(this, "ResponseCompression");
  }
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  /**
   * @param {LH.Artifacts.NetworkRequest[]} networkRecords
   * @return {LH.Artifacts['ResponseCompression']}
   */
  static filterUnoptimizedResponses(networkRecords) {
    const unoptimizedResponses = [];
    networkRecords.forEach((record) => {
      if (record.sessionTargetType !== "page") return;
      const mimeType = record.mimeType;
      const resourceType = record.resourceType || NetworkRequest.TYPES.Other;
      const resourceSize = record.resourceSize;
      const isBinaryResource = mimeType && binaryMimeTypes.some((type) => mimeType.startsWith(type));
      const isTextResource = !isBinaryResource && textResourceTypes.includes(resourceType);
      const isChromeExtensionResource = record.url.startsWith(CHROME_EXTENSION_PROTOCOL);
      if (!isTextResource || !resourceSize || !record.finished || isChromeExtensionResource || !record.transferSize || record.statusCode === 304) {
        return;
      }
      if (!NetworkRequest.isContentEncoded(record)) {
        unoptimizedResponses.push({
          requestId: record.requestId,
          url: record.url,
          mimeType,
          transferSize: record.transferSize,
          resourceSize,
          gzipSize: 0
        });
      }
    });
    return unoptimizedResponses;
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @param {LH.Artifacts.NetworkRequest[]} networkRecords
   * @return {Promise<LH.Artifacts['ResponseCompression']>}
   */
  async getCompressibleRecords(context, networkRecords) {
    const session = context.driver.defaultSession;
    const textRecords = _ResponseCompression.filterUnoptimizedResponses(networkRecords);
    return Promise.all(textRecords.map((record) => {
      return fetchResponseBodyFromCache(session, record.requestId).then((content) => {
        if (!content) {
          return record;
        }
        return new Promise((resolve, reject) => {
          return gzip(content, (err, res) => {
            if (err) {
              return reject(err);
            }
            record.gzipSize = Buffer.byteLength(res, "utf8");
            resolve(record);
          });
        });
      }).catch((err) => {
        const isExpectedError = err?.message?.includes("No resource with given identifier found");
        if (!isExpectedError) {
          err.extra = { url: url_utils_default.elideDataURI(record.url) };
          throw err;
        }
        lighthouse_logger_default.error("ResponseCompression", err.message);
        record.gzipSize = void 0;
        return record;
      });
    }));
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {Promise<LH.Artifacts['ResponseCompression']>}
   */
  async getArtifact(context) {
    const devtoolsLog = context.dependencies.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    return this.getCompressibleRecords(context, networkRecords);
  }
};
var response_compression_default = ResponseCompression;
export {
  response_compression_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/dobetterweb/response-compression.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
