import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/driver/dom.js
function handlePotentialMissingNodeError(err) {
  if (/No node.*found/.test(err.message) || /Node.*does not belong to the document/.test(err.message)) {
    return void 0;
  }
  throw err;
}
__name(handlePotentialMissingNodeError, "handlePotentialMissingNodeError");
async function resolveNodeIdToObjectId(session, backendNodeId) {
  try {
    const resolveNodeResponse = await session.sendCommand("DOM.resolveNode", { backendNodeId });
    return resolveNodeResponse.object.objectId;
  } catch (err) {
    return handlePotentialMissingNodeError(err);
  }
}
__name(resolveNodeIdToObjectId, "resolveNodeIdToObjectId");
async function resolveDevtoolsNodePathToObjectId(session, path) {
  try {
    const { nodeId } = await session.sendCommand("DOM.pushNodeByPathToFrontend", { path });
    const { object: { objectId } } = await session.sendCommand("DOM.resolveNode", { nodeId });
    return objectId;
  } catch (err) {
    return handlePotentialMissingNodeError(err);
  }
}
__name(resolveDevtoolsNodePathToObjectId, "resolveDevtoolsNodePathToObjectId");

export {
  resolveNodeIdToObjectId,
  resolveDevtoolsNodePathToObjectId
};
/*! Bundled license information:

lighthouse/core/gather/driver/dom.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
