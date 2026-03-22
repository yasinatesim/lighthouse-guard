import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UIStrings as UIStrings2,
  str_,
  uses_responsive_images_default
} from "../chunk-VOM524TB.js";
import "../chunk-6QMGR6RW.js";
import "../chunk-DGNLV5FC.js";
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
import {
  Audit
} from "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/byte-efficiency/uses-responsive-images-snapshot.js
var UIStrings3 = {
  /** Descriptive title of a Lighthouse audit that checks if images match their displayed dimensions. This is displayed when the audit is passing. */
  title: "Images were appropriate for their displayed size",
  /** Descriptive title of a Lighthouse audit that checks if images match their displayed dimensions. This is displayed when the audit is failing. */
  failureTitle: "Images were larger than their displayed size",
  /** Label for a column in a data table; entries will be the dimensions of an image as it appears on the page. */
  columnDisplayedDimensions: "Displayed dimensions",
  /** Label for a column in a data table; entries will be the dimensions of an image from it's source file. */
  columnActualDimensions: "Actual dimensions"
};
var str_2 = createIcuMessageFn(import.meta.url, UIStrings3);
var IGNORE_THRESHOLD_IN_PIXELS = 1365;
var UsesResponsiveImagesSnapshot = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "uses-responsive-images-snapshot",
      title: str_2(UIStrings3.title),
      failureTitle: str_2(UIStrings3.failureTitle),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      supportedModes: ["snapshot"],
      guidanceLevel: 2,
      requiredArtifacts: ["ImageElements", "ViewportDimensions"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts) {
    let score = 1;
    const items = [];
    for (const image of artifacts.ImageElements) {
      if (image.isCss) continue;
      if (!image.naturalDimensions) continue;
      const actual = image.naturalDimensions;
      const displayed = uses_responsive_images_default.getDisplayedDimensions(
        { ...image, naturalWidth: actual.width, naturalHeight: actual.height },
        artifacts.ViewportDimensions
      );
      const actualPixels = actual.width * actual.height;
      const usedPixels = displayed.width * displayed.height;
      if (actualPixels <= usedPixels) continue;
      if (actualPixels - usedPixels > IGNORE_THRESHOLD_IN_PIXELS) score = 0;
      items.push({
        node: Audit.makeNodeItem(image.node),
        url: url_utils_default.elideDataURI(image.src),
        displayedDimensions: `${displayed.width}x${displayed.height}`,
        actualDimensions: `${actual.width}x${actual.height}`
      });
    }
    const headings = [
      /* eslint-disable max-len */
      { key: "node", valueType: "node", label: "" },
      { key: "url", valueType: "url", label: str_2(UIStrings.columnURL) },
      { key: "displayedDimensions", valueType: "text", label: str_2(UIStrings3.columnDisplayedDimensions) },
      { key: "actualDimensions", valueType: "text", label: str_2(UIStrings3.columnActualDimensions) }
      /* eslint-enable max-len */
    ];
    const details = Audit.makeTableDetails(headings, items);
    return {
      score,
      details
    };
  }
};
var uses_responsive_images_snapshot_default = UsesResponsiveImagesSnapshot;
export {
  UIStrings3 as UIStrings,
  uses_responsive_images_snapshot_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/uses-responsive-images-snapshot.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
