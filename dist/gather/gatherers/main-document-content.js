import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  MainResourceComputed
} from "./chunk-VUYE7EEN.js";
import {
  fetchResponseBodyFromCache
} from "./chunk-X4HUPCDF.js";
import "./chunk-62BSSGB3.js";
import "./chunk-GO42M3MA.js";
import "./chunk-VDXIC3K2.js";
import "./chunk-YWWNWPSO.js";
import "./chunk-7CCOEJTA.js";
import "./chunk-5LGJRNXS.js";
import {
  devtools_log_default
} from "./chunk-2DY3KL3O.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

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
