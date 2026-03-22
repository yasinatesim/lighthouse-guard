import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  base_gatherer_default
} from "../chunk-BYDJSNVN.js";
import {
  __name
} from "../chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/seo/robots-txt.js
var RobotsTxt = class extends base_gatherer_default {
  static {
    __name(this, "RobotsTxt");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['RobotsTxt']>}
   */
  async getArtifact(passContext) {
    const { finalDisplayedUrl } = passContext.baseArtifacts.URL;
    const robotsUrl = new URL("/robots.txt", finalDisplayedUrl).href;
    return passContext.driver.fetcher.fetchResource(robotsUrl).catch((err) => ({ status: null, content: null, errorMessage: err.message }));
  }
};
var robots_txt_default = RobotsTxt;
export {
  robots_txt_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/seo/robots-txt.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
