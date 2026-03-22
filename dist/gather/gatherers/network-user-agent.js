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

// node_modules/lighthouse/core/gather/gatherers/network-user-agent.js
var NetworkUserAgent = class _NetworkUserAgent extends base_gatherer_default {
  static {
    __name(this, "NetworkUserAgent");
  }
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  /**
   * @param {LH.Artifacts['DevtoolsLog']} devtoolsLog
   * @return {string}
   */
  static getNetworkUserAgent(devtoolsLog) {
    for (const entry of devtoolsLog) {
      if (entry.method !== "Network.requestWillBeSent") continue;
      const userAgent = entry.params.request.headers["User-Agent"];
      if (userAgent) return userAgent;
    }
    return "";
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {Promise<LH.Artifacts['NetworkUserAgent']>}
   */
  async getArtifact(context) {
    return _NetworkUserAgent.getNetworkUserAgent(context.dependencies.DevtoolsLog);
  }
};
var network_user_agent_default = NetworkUserAgent;
export {
  network_user_agent_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/network-user-agent.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
