import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  url_utils_default
} from "./chunk-OZ2G5ZKT.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/image-records.js
var ImageRecords = class _ImageRecords {
  static {
    __name(this, "ImageRecords");
  }
  /**
   * @param {LH.Artifacts.NetworkRequest[]} networkRecords
   */
  static indexNetworkRecords(networkRecords) {
    return networkRecords.reduce(
      (map, record) => {
        const isImage = /^image/.test(record.mimeType) || /\.(avif|webp)$/i.test(record.url);
        if (isImage && record.finished && record.statusCode === 200) {
          map[record.url] = record;
        }
        return map;
      },
      /** @type {Record<string, LH.Artifacts.NetworkRequest>} */
      {}
    );
  }
  /**
   * @param {{ImageElements: LH.Artifacts['ImageElements'], networkRecords: LH.Artifacts.NetworkRequest[]}} data
   * @return {Promise<LH.Artifacts.ImageElementRecord[]>}
   */
  static async compute_(data) {
    const indexedNetworkRecords = _ImageRecords.indexNetworkRecords(data.networkRecords);
    const imageRecords = [];
    for (const element of data.ImageElements) {
      const networkRecord = indexedNetworkRecords[element.src];
      const mimeType = networkRecord?.mimeType;
      imageRecords.push({
        ...element,
        mimeType: mimeType ? mimeType : url_utils_default.guessMimeType(element.src)
      });
    }
    imageRecords.sort((a, b) => {
      const aRecord = indexedNetworkRecords[a.src] || {};
      const bRecord = indexedNetworkRecords[b.src] || {};
      return bRecord.resourceSize - aRecord.resourceSize;
    });
    return imageRecords;
  }
};
var ImageRecordsComputed = makeComputedArtifact(ImageRecords, ["ImageElements", "networkRecords"]);

export {
  ImageRecordsComputed
};
/*! Bundled license information:

lighthouse/core/computed/image-records.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
