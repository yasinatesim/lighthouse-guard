import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  trace_default
} from "./chunk-NE4YDJKR.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-C5HPB2FB.js";
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/trace-compat.js
var TraceCompat = class extends base_gatherer_default {
  static {
    __name(this, "TraceCompat");
  }
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
