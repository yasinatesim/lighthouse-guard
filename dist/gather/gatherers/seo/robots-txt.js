import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "../chunk-CWN23GK2.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/gather/gatherers/seo/robots-txt.js
var RobotsTxt = class extends base_gatherer_default {
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
