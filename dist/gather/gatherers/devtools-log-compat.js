import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  devtools_log_default
} from "./chunk-2DY3KL3O.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/devtools-log-compat.js
var DevtoolsLogCompat = class extends base_gatherer_default {
  static {
    __name(this, "DevtoolsLogCompat");
  }
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
