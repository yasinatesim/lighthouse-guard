import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRequest
} from "./chunk-ELEI4PD3.js";

// node_modules/lighthouse/core/gather/driver/network.js
async function fetchResponseBodyFromCache(session, requestId, timeout = 1e3) {
  requestId = NetworkRequest.getRequestIdForBackend(requestId);
  session.setNextProtocolTimeout(timeout);
  const result = await session.sendCommand("Network.getResponseBody", { requestId });
  return result.body;
}

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
