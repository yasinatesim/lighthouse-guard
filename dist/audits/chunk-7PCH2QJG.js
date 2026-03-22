import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRequest
} from "./chunk-AB7S44AE.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/lib/script-helpers.js
function isInline(script) {
  return Boolean(script.startLine || script.startColumn);
}
__name(isInline, "isInline");
function getRequestForScript(networkRecords, script) {
  let networkRequest = networkRecords.find((request) => request.url === script.url);
  while (networkRequest?.redirectDestination) {
    networkRequest = networkRequest.redirectDestination;
  }
  return networkRequest;
}
__name(getRequestForScript, "getRequestForScript");
function estimateTransferSize(networkRecord, totalBytes, resourceType) {
  if (!networkRecord) {
    switch (resourceType) {
      case "Stylesheet":
        return Math.round(totalBytes * 0.2);
      case "Script":
      case "Document":
        return Math.round(totalBytes * 0.33);
      default:
        return Math.round(totalBytes * 0.5);
    }
  } else if (networkRecord.resourceType === resourceType) {
    return networkRecord.transferSize || 0;
  } else {
    const transferSize = networkRecord.transferSize || 0;
    const resourceSize = networkRecord.resourceSize || 0;
    const compressionRatio = Number.isFinite(resourceSize) && resourceSize > 0 ? transferSize / resourceSize : 1;
    return Math.round(totalBytes * compressionRatio);
  }
}
__name(estimateTransferSize, "estimateTransferSize");
function estimateCompressedContentSize(networkRecord, totalBytes, resourceType) {
  if (!networkRecord) {
    switch (resourceType) {
      case "Stylesheet":
        return Math.round(totalBytes * 0.2);
      case "Script":
      case "Document":
        return Math.round(totalBytes * 0.33);
      default:
        return Math.round(totalBytes * 0.5);
    }
  }
  let contentTransferSize = networkRecord.transferSize || 0;
  if (!NetworkRequest.isContentEncoded(networkRecord)) {
    contentTransferSize = networkRecord.resourceSize;
  } else if (networkRecord.responseHeadersTransferSize) {
    contentTransferSize = Math.max(0, contentTransferSize - networkRecord.responseHeadersTransferSize);
  }
  if (networkRecord.resourceType === resourceType) {
    return contentTransferSize;
  } else {
    const resourceSize = networkRecord.resourceSize || 0;
    const compressionRatio = Number.isFinite(resourceSize) && resourceSize > 0 ? contentTransferSize / resourceSize : 1;
    return Math.round(totalBytes * compressionRatio);
  }
}
__name(estimateCompressedContentSize, "estimateCompressedContentSize");
function estimateCompressionRatioForContent(compressionRatioByUrl, url, artifacts, networkRecords) {
  let compressionRatio = compressionRatioByUrl.get(url);
  if (compressionRatio !== void 0) return compressionRatio;
  const script = artifacts.Scripts.find((script2) => script2.url === url);
  if (!script) {
    compressionRatio = 1;
  } else {
    const networkRecord = getRequestForScript(networkRecords, script);
    const contentLength = networkRecord?.resourceSize || script.length || 0;
    const compressedSize = estimateCompressedContentSize(networkRecord, contentLength, "Script");
    compressionRatio = compressedSize / contentLength;
  }
  compressionRatioByUrl.set(url, compressionRatio);
  return compressionRatio;
}
__name(estimateCompressionRatioForContent, "estimateCompressionRatioForContent");

export {
  isInline,
  getRequestForScript,
  estimateTransferSize,
  estimateCompressedContentSize,
  estimateCompressionRatioForContent
};
/*! Bundled license information:

lighthouse/core/lib/script-helpers.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
