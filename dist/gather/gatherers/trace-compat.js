import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  trace_default
} from "./chunk-QDE2QHJ5.js";
import "./chunk-JRAJ3QIZ.js";
import "./chunk-VDXIC3K2.js";
import "./chunk-YWWNWPSO.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

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
