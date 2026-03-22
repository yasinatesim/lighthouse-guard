import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  NetworkRequest
} from "./chunk-62BSSGB3.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/driver/network.js
async function fetchResponseBodyFromCache(session, requestId, timeout = 1e3) {
  requestId = NetworkRequest.getRequestIdForBackend(requestId);
  session.setNextProtocolTimeout(timeout);
  const result = await session.sendCommand("Network.getResponseBody", { requestId });
  return result.body;
}
__name(fetchResponseBodyFromCache, "fetchResponseBodyFromCache");

export {
  fetchResponseBodyFromCache
};
/*! Bundled license information:

lighthouse/core/gather/driver/network.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
