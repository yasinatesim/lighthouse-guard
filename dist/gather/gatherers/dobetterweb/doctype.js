import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "../chunk-3PE3GB6I.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/dobetterweb/doctype.js
function getDoctype() {
  if (!document.doctype) {
    return null;
  }
  const documentCompatMode = document.compatMode;
  const { name, publicId, systemId } = document.doctype;
  return { name, publicId, systemId, documentCompatMode };
}
__name(getDoctype, "getDoctype");
var Doctype = class extends base_gatherer_default {
  static {
    __name(this, "Doctype");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['Doctype']>}
   */
  getArtifact(passContext) {
    const driver = passContext.driver;
    return driver.executionContext.evaluate(getDoctype, {
      args: [],
      useIsolation: true
    });
  }
};
var doctype_default = Doctype;
export {
  doctype_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/dobetterweb/doctype.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
