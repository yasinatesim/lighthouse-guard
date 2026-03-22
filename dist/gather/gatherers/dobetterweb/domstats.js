import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  pageFunctions
} from "../chunk-RDNFCTTE.js";
import "../chunk-SLD7CHCU.js";
import {
  base_gatherer_default
} from "../chunk-3PE3GB6I.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/dobetterweb/domstats.js
function getDOMStats(element = document.body, deep = true) {
  let deepestElement = null;
  let maxDepth = -1;
  let maxWidth = -1;
  let numElements = 0;
  let parentWithMostChildren = null;
  const _calcDOMWidthAndHeight = /* @__PURE__ */ __name(function(element2, depth = 1) {
    if (depth > maxDepth) {
      deepestElement = element2;
      maxDepth = depth;
    }
    if (element2.children.length > maxWidth) {
      parentWithMostChildren = element2;
      maxWidth = element2.children.length;
    }
    let child = element2.firstElementChild;
    while (child) {
      _calcDOMWidthAndHeight(child, depth + 1);
      if (deep && child.shadowRoot) {
        _calcDOMWidthAndHeight(child.shadowRoot, depth + 1);
      }
      child = child.nextElementSibling;
      numElements++;
    }
    return { maxDepth, maxWidth, numElements };
  }, "_calcDOMWidthAndHeight");
  const result = _calcDOMWidthAndHeight(element);
  return {
    depth: {
      max: result.maxDepth,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      ...getNodeDetails(deepestElement)
    },
    width: {
      max: result.maxWidth,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      ...getNodeDetails(parentWithMostChildren)
    },
    totalBodyElements: result.numElements
  };
}
__name(getDOMStats, "getDOMStats");
var DOMStats = class extends base_gatherer_default {
  static {
    __name(this, "DOMStats");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['DOMStats']>}
   */
  async getArtifact(passContext) {
    const driver = passContext.driver;
    await driver.defaultSession.sendCommand("DOM.enable");
    const results = await driver.executionContext.evaluate(getDOMStats, {
      args: [],
      useIsolation: true,
      deps: [pageFunctions.getNodeDetails]
    });
    await driver.defaultSession.sendCommand("DOM.disable");
    return results;
  }
};
var domstats_default = DOMStats;
export {
  domstats_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/dobetterweb/domstats.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
