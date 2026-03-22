import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "./chunk-ZU3XYCLR.js";
import {
  fetchResponseBodyFromCache
} from "./chunk-FTGJSZ7L.js";
import "./chunk-QE4YYANC.js";
import "./chunk-HXOADL7R.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-C5HPB2FB.js";
import "./chunk-DQQIQ7YS.js";
import "./chunk-SLD7CHCU.js";
import {
  devtools_log_default
} from "./chunk-NSCX6JDY.js";
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/main-document-content.js
var MainDocumentContent = class extends base_gatherer_default {
  static {
    __name(this, "MainDocumentContent");
  }
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
