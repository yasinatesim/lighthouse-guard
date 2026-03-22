import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/viewport-dimensions.js
function getViewportDimensions() {
  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    devicePixelRatio: window.devicePixelRatio
  };
}
__name(getViewportDimensions, "getViewportDimensions");
var ViewportDimensions = class extends base_gatherer_default {
  static {
    __name(this, "ViewportDimensions");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "timespan", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts.ViewportDimensions>}
   */
  async getArtifact(passContext) {
    const driver = passContext.driver;
    const dimensions = await driver.executionContext.evaluate(getViewportDimensions, {
      args: [],
      useIsolation: true
    });
    const allNumeric = Object.values(dimensions).every(Number.isFinite);
    if (!allNumeric) {
      const results = JSON.stringify(dimensions);
      throw new Error(`ViewportDimensions results were not numeric: ${results}`);
    }
    return dimensions;
  }
};
var viewport_dimensions_default = ViewportDimensions;
export {
  viewport_dimensions_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/viewport-dimensions.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
