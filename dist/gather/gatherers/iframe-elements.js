import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  pageFunctions
} from "./chunk-GO4LGQT6.js";
import "./chunk-5LGJRNXS.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/iframe-elements.js
function collectIFrameElements() {
  const realBoundingClientRect = window.__HTMLElementBoundingClientRect || window.HTMLElement.prototype.getBoundingClientRect;
  const iFrameElements = getElementsInDocument("iframe");
  return iFrameElements.map(
    /** @param {HTMLIFrameElement} node */
    (node) => {
      const clientRect = realBoundingClientRect.call(node);
      const { top, bottom, left, right, width, height } = clientRect;
      return {
        id: node.id,
        src: node.src,
        clientRect: { top, bottom, left, right, width, height },
        // @ts-expect-error - put into scope via stringification
        isPositionFixed: isPositionFixed(node),
        // eslint-disable-line no-undef
        // @ts-expect-error - getNodeDetails put into scope via stringification
        node: getNodeDetails(node)
      };
    }
  );
}
__name(collectIFrameElements, "collectIFrameElements");
var IFrameElements = class extends base_gatherer_default {
  static {
    __name(this, "IFrameElements");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['IFrameElements']>}
   * @override
   */
  async getArtifact(passContext) {
    const driver = passContext.driver;
    const iframeElements = await driver.executionContext.evaluate(collectIFrameElements, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getElementsInDocument,
        pageFunctions.isPositionFixed,
        pageFunctions.getNodeDetails
      ]
    });
    return iframeElements;
  }
};
var iframe_elements_default = IFrameElements;
export {
  iframe_elements_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/iframe-elements.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
