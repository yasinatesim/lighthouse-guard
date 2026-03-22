var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/lighthouse/core/gather/base-gatherer.js
var BaseGatherer = class {
  static {
    __name(this, "BaseGatherer");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = { supportedModes: [] };
  /**
   * Method to start observing a page for an arbitrary period of time.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  startInstrumentation(passContext) {
  }
  /**
   * Method to start observing a page when the measurements are very sensitive and
   * should observe as little Lighthouse-induced work as possible.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  startSensitiveInstrumentation(passContext) {
  }
  /**
   * Method to stop observing a page when the measurements are very sensitive and
   * should observe as little Lighthouse-induced work as possible.
   *
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  stopSensitiveInstrumentation(passContext) {
  }
  /**
   * Method to end observing a page after an arbitrary period of time.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  stopInstrumentation(passContext) {
  }
  /**
   * Method to gather results about a page.
   * @param {LH.Gatherer.Context} passContext
   * @return {LH.Gatherer.PhaseResult}
   */
  getArtifact(passContext) {
  }
};
var base_gatherer_default = BaseGatherer;

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

lighthouse/types/lh.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/base-gatherer.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/cache-contents.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
