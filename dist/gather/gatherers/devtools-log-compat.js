import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  devtools_log_default
} from "./chunk-BINTPAJN.js";
import {
  base_gatherer_default
} from "./chunk-CWN23GK2.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/gather/gatherers/devtools-log-compat.js
var DevtoolsLogCompat = class extends base_gatherer_default {
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} passContext
   * @return {Promise<LH.Artifacts['devtoolsLogs']>}
   */
  async getArtifact(passContext) {
    return {
      defaultPass: passContext.dependencies.DevtoolsLog
    };
  }
};
var devtools_log_compat_default = DevtoolsLogCompat;
export {
  devtools_log_compat_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/devtools-log-compat.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
