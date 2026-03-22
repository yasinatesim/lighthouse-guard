import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UIStrings as UIStrings2,
  str_,
  uses_responsive_images_default
} from "../chunk-6PDQYFZO.js";
import "../chunk-CHRUNVRL.js";
import "../chunk-5PQDCZ5I.js";
import "../chunk-4MRT5KFH.js";
import "../chunk-KWLN6AZG.js";
import "../chunk-GPJRF3VM.js";
import "../chunk-GOQIOX72.js";
import "../chunk-GPGXHKXU.js";
import "../chunk-TYEYL6JI.js";
import "../chunk-CVEB2JTF.js";
import "../chunk-E5UDU7XN.js";
import "../chunk-2RUE6MFF.js";
import "../chunk-4WOLRYCI.js";
import "../chunk-XFJEV2GR.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import "../chunk-YOYAIZOW.js";
import {
  url_utils_default
} from "../chunk-OZ2G5ZKT.js";
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
  static {
    __name(this, "UsesResponsiveImagesSnapshot");
  }
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
