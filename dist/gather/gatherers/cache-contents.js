import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/cache-contents.js
function getCacheContents() {
  return caches.keys().then((cacheNames) => Promise.all(cacheNames.map((cacheName) => caches.open(cacheName)))).then((caches2) => {
    const requests = [];
    return Promise.all(caches2.map((cache) => {
      return cache.keys().then((reqs) => {
        requests.push(...reqs.map((r) => r.url));
      });
    })).then((_) => {
      return requests;
    });
  });
}
__name(getCacheContents, "getCacheContents");
var CacheContents = class extends base_gatherer_default {
  static {
    __name(this, "CacheContents");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * Creates an array of cached URLs.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['CacheContents']>}
   */
  async getArtifact(passContext) {
    const driver = passContext.driver;
    const cacheUrls = await driver.executionContext.evaluate(getCacheContents, { args: [] });
    return cacheUrls;
  }
};
var cache_contents_default = CacheContents;
export {
  cache_contents_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/cache-contents.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
