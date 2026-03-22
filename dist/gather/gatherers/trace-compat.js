import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  trace_default
} from "./chunk-V3CGP63T.js";
import "./chunk-3WVTZQMF.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-V6LRM2MD.js";
import {
  base_gatherer_default
} from "./chunk-CWN23GK2.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/gather/gatherers/trace-compat.js
var TraceCompat = class extends base_gatherer_default {
  /** @type {LH.Gatherer.GathererMeta<'Trace'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { Trace: trace_default.symbol }
  };
  /**
   * @param {LH.Gatherer.Context<'Trace'>} passContext
   * @return {Promise<LH.Artifacts['traces']>}
   */
  async getArtifact(passContext) {
    return {
      defaultPass: passContext.dependencies.Trace
    };
  }
};
var trace_compat_default = TraceCompat;
export {
  trace_compat_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/trace-compat.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
