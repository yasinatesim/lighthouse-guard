import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRecordsComputed,
  core_exports
} from "./chunk-AB7S44AE.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/main-resource.js
var MainResource = class {
  static {
    __name(this, "MainResource");
  }
  /**
   * @param {{URL: LH.Artifacts['URL'], devtoolsLog: LH.DevtoolsLog}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.NetworkRequest>}
   */
  static async compute_(data, context) {
    const { mainDocumentUrl } = data.URL;
    if (!mainDocumentUrl) throw new Error("mainDocumentUrl must exist to get the main resource");
    const records = await NetworkRecordsComputed.request(data.devtoolsLog, context);
    const mainResource = core_exports.NetworkAnalyzer.findLastDocumentForUrl(records, mainDocumentUrl);
    if (!mainResource) {
      throw new Error("Unable to identify the main resource");
    }
    return mainResource;
  }
};
var MainResourceComputed = makeComputedArtifact(MainResource, ["URL", "devtoolsLog"]);

export {
  MainResourceComputed
};
/*! Bundled license information:

lighthouse/core/computed/main-resource.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
