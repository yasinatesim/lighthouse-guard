import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "./chunk-32YVOUED.js";
import {
  EntityClassificationComputed
} from "./chunk-EXNQHM7K.js";
import {
  NetworkRecordsComputed
} from "./chunk-AB7S44AE.js";
import {
  url_utils_default
} from "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import "./chunk-4MZOSFEN.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/network-requests.js
var NetworkRequests = class extends Audit {
  static {
    __name(this, "NetworkRequests");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "network-requests",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: "Network Requests",
      description: "Lists the network requests that were made during page load.",
      requiredArtifacts: ["DevtoolsLog", "URL", "GatherContext"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const records = await NetworkRecordsComputed.request(devtoolsLog, context);
    const classifiedEntities = await EntityClassificationComputed.request(
      { URL: artifacts.URL, devtoolsLog },
      context
    );
    const earliestRendererStartTime = records.reduce(
      (min, record) => Math.min(min, record.rendererStartTime),
      Infinity
    );
    let mainFrameId;
    if (artifacts.GatherContext.gatherMode === "navigation") {
      const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
      mainFrameId = mainResource.frameId;
    }
    const normalizeTime = /* @__PURE__ */ __name((time) => time < earliestRendererStartTime || !Number.isFinite(time) ? void 0 : time - earliestRendererStartTime, "normalizeTime");
    const results = records.map((record) => {
      const endTimeDeltaMs = record.lrStatistics?.endTimeDeltaMs;
      const TCPMs = record.lrStatistics?.TCPMs;
      const requestMs = record.lrStatistics?.requestMs;
      const responseMs = record.lrStatistics?.responseMs;
      const isLinkPreload = record.isLinkPreload || void 0;
      const experimentalFromMainFrame = mainFrameId ? record.frameId === mainFrameId || void 0 : void 0;
      const entity = classifiedEntities.entityByUrl.get(record.url);
      return {
        url: url_utils_default.elideDataURI(record.url),
        sessionTargetType: record.sessionTargetType,
        protocol: record.protocol,
        rendererStartTime: normalizeTime(record.rendererStartTime),
        networkRequestTime: normalizeTime(record.networkRequestTime),
        networkEndTime: normalizeTime(record.networkEndTime),
        finished: record.finished,
        transferSize: record.transferSize,
        resourceSize: record.resourceSize,
        statusCode: record.statusCode,
        mimeType: record.mimeType,
        resourceType: record.resourceType,
        priority: record.priority,
        isLinkPreload,
        experimentalFromMainFrame,
        entity: entity?.name,
        lrEndTimeDeltaMs: endTimeDeltaMs,
        // Only exists on Lightrider runs
        lrTCPMs: TCPMs,
        // Only exists on Lightrider runs
        lrRequestMs: requestMs,
        // Only exists on Lightrider runs
        lrResponseMs: responseMs
        // Only exists on Lightrider runs
      };
    });
    const headings = [
      { key: "url", valueType: "url", label: "URL" },
      { key: "protocol", valueType: "text", label: "Protocol" },
      { key: "networkRequestTime", valueType: "ms", granularity: 1, label: "Network Request Time" },
      { key: "networkEndTime", valueType: "ms", granularity: 1, label: "Network End Time" },
      {
        key: "transferSize",
        valueType: "bytes",
        displayUnit: "kb",
        granularity: 1,
        label: "Transfer Size"
      },
      {
        key: "resourceSize",
        valueType: "bytes",
        displayUnit: "kb",
        granularity: 1,
        label: "Resource Size"
      },
      { key: "statusCode", valueType: "text", label: "Status Code" },
      { key: "mimeType", valueType: "text", label: "MIME Type" },
      { key: "resourceType", valueType: "text", label: "Resource Type" }
    ];
    const tableDetails = Audit.makeTableDetails(headings, results);
    const networkStartTimeTs = Number.isFinite(earliestRendererStartTime) ? earliestRendererStartTime * 1e3 : void 0;
    const initiators = records.filter((record) => record.initiator.url).map((record) => {
      const { type, url, lineNumber, columnNumber } = record.initiator;
      return {
        type,
        url: url ? url_utils_default.elideDataURI(url) : void 0,
        lineNumber,
        columnNumber
      };
    });
    tableDetails.debugData = {
      type: "debugdata",
      networkStartTimeTs,
      initiators
    };
    return {
      score: 1,
      details: tableDetails
    };
  }
};
var network_requests_default = NetworkRequests;
export {
  network_requests_default as default
};
/*! Bundled license information:

lighthouse/core/audits/network-requests.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
