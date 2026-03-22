import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "./chunk-OLKTLGDL.js";
import {
  fetchResponseBodyFromCache
} from "./chunk-GMKVUW4A.js";
import "./chunk-ELEI4PD3.js";
import "./chunk-BSOGFMIV.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-V6LRM2MD.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-XKFKI4NM.js";
import {
  devtools_log_default
} from "./chunk-BINTPAJN.js";
import {
  base_gatherer_default
} from "./chunk-CWN23GK2.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/gather/gatherers/main-document-content.js
var MainDocumentContent = class extends base_gatherer_default {
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["navigation"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {Promise<LH.Artifacts['MainDocumentContent']>}
   */
  async getArtifact(context) {
    const devtoolsLog = context.dependencies.DevtoolsLog;
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: context.baseArtifacts.URL }, context);
    const session = context.driver.defaultSession;
    return fetchResponseBodyFromCache(session, mainResource.requestId);
  }
};
var main_document_content_default = MainDocumentContent;
export {
  main_document_content_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/main-document-content.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
