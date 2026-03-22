import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

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
