import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
} from "../chunk-BAGEWQME.js";
import {
  TraceEngineResultComputed
} from "../chunk-TYEYL6JI.js";
import "../chunk-CVEB2JTF.js";
import "../chunk-E5UDU7XN.js";
import "../chunk-2RUE6MFF.js";
import "../chunk-4WOLRYCI.js";
import "../chunk-XFJEV2GR.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  UIStrings8 as UIStrings2,
  getOptimizationMessage
} from "../chunk-YOYAIZOW.js";
import "../chunk-OZ2G5ZKT.js";
import "../chunk-EBBYNBKM.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-O3YNDXOX.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-DQQIQ7YS.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/insights/image-delivery-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/ImageDelivery.js", UIStrings2);
var getOptimizationMessage2 = TraceEngineResultComputed.localizeFunction(str_, getOptimizationMessage);
var ImageDeliveryInsight = class extends Audit {
  static {
    __name(this, "ImageDeliveryInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "image-delivery-insight",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"],
      replacesAudits: [
        "modern-image-formats",
        "uses-optimized-images",
        "efficient-animated-content",
        "uses-responsive-images"
      ]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "ImageDelivery", (insight) => {
      const headings = [
        /* eslint-disable max-len */
        { key: "url", valueType: "url", label: str_(UIStrings.columnURL), subItemsHeading: { key: "reason", valueType: "text" } },
        { key: "totalBytes", valueType: "bytes", label: str_(UIStrings.columnResourceSize) },
        { key: "wastedBytes", valueType: "bytes", label: str_(UIStrings.columnWastedBytes), subItemsHeading: { key: "wastedBytes", valueType: "bytes" } }
        /* eslint-enable max-len */
      ];
      const items = insight.optimizableImages.map((image) => ({
        url: image.request.args.data.url,
        totalBytes: image.request.args.data.decodedBodyLength,
        wastedBytes: image.byteSavings,
        subItems: {
          type: (
            /** @type {const} */
            "subitems"
          ),
          items: image.optimizations.map((optimization) => ({
            reason: getOptimizationMessage2(optimization),
            wastedBytes: optimization.byteSavings
          }))
        }
      }));
      return Audit.makeTableDetails(headings, items);
    });
  }
};
var image_delivery_insight_default = ImageDeliveryInsight;
export {
  image_delivery_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/image-delivery-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
