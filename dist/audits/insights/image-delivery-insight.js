import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
} from "../chunk-4F2V2OZV.js";
import {
  TraceEngineResultComputed
} from "../chunk-Z7S4UQSE.js";
import "../chunk-22N3WN7S.js";
import "../chunk-GRLAFLTF.js";
import "../chunk-2FKQ374S.js";
import "../chunk-ZATS4KUU.js";
import "../chunk-FTKGXG7F.js";
import "../chunk-3WVTZQMF.js";
import "../chunk-3KEMYTTF.js";
import {
  UIStrings8 as UIStrings2,
  getOptimizationMessage
} from "../chunk-JDNHHZFJ.js";
import "../chunk-YNYBF6HU.js";
import "../chunk-2BIJ7VKV.js";
import "../chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import {
  Audit
} from "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/insights/image-delivery-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/ImageDelivery.js", UIStrings2);
var getOptimizationMessage2 = TraceEngineResultComputed.localizeFunction(str_, getOptimizationMessage);
var ImageDeliveryInsight = class extends Audit {
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
