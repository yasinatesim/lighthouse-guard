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

// node_modules/lighthouse/core/gather/gatherers/meta-elements.js
function collectMetaElements() {
  const functions = (
    /** @type {typeof pageFunctions} */
    {
      // @ts-expect-error - getElementsInDocument put into scope via stringification
      getElementsInDocument,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      getNodeDetails
    }
  );
  const metas = functions.getElementsInDocument("head meta");
  return metas.map((meta) => {
    const getAttribute = /* @__PURE__ */ __name((name) => {
      const attr = meta.attributes.getNamedItem(name);
      if (!attr) return;
      return attr.value;
    }, "getAttribute");
    return {
      name: meta.name.toLowerCase(),
      content: meta.content,
      property: getAttribute("property"),
      httpEquiv: meta.httpEquiv ? meta.httpEquiv.toLowerCase() : void 0,
      charset: getAttribute("charset"),
      node: functions.getNodeDetails(meta)
    };
  });
}
__name(collectMetaElements, "collectMetaElements");
var MetaElements = class extends base_gatherer_default {
  static {
    __name(this, "MetaElements");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['MetaElements']>}
   */
  getArtifact(passContext) {
    const driver = passContext.driver;
    return driver.executionContext.evaluate(collectMetaElements, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getElementsInDocument,
        pageFunctions.getNodeDetails
      ]
    });
  }
};
var meta_elements_default = MetaElements;
export {
  meta_elements_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/meta-elements.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
