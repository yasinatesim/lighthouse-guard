import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  pageFunctions
} from "./chunk-72S37XJF.js";
import "./chunk-XKFKI4NM.js";
import {
  base_gatherer_default
} from "./chunk-CWN23GK2.js";
import "./chunk-23MNVS5G.js";

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
    const getAttribute = (name) => {
      const attr = meta.attributes.getNamedItem(name);
      if (!attr) return;
      return attr.value;
    };
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
var MetaElements = class extends base_gatherer_default {
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
