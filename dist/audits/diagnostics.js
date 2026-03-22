import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainResourceComputed
} from "./chunk-32YVOUED.js";
import {
  MainThreadTasksComputed
} from "./chunk-DESG734R.js";
import "./chunk-UE3SWGEC.js";
import {
  NetworkAnalysisComputed
} from "./chunk-UNPQMFMQ.js";
import "./chunk-RI7XYKZY.js";
import "./chunk-NUK2ASLP.js";
import {
  NetworkRecordsComputed
} from "./chunk-AB7S44AE.js";
import "./chunk-CGRNGE5D.js";
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

// node_modules/lighthouse/core/audits/diagnostics.js
var Diagnostics = class extends Audit {
  static {
    __name(this, "Diagnostics");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "diagnostics",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: "Diagnostics",
      description: "Collection of useful page vitals.",
      supportedModes: ["navigation"],
      requiredArtifacts: ["URL", "Trace", "DevtoolsLog"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const trace = artifacts.Trace;
    const devtoolsLog = artifacts.DevtoolsLog;
    const tasks = await MainThreadTasksComputed.request(trace, context);
    const records = await NetworkRecordsComputed.request(devtoolsLog, context);
    const analysis = await NetworkAnalysisComputed.request(devtoolsLog, context);
    const mainResource = await MainResourceComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    const toplevelTasks = tasks.filter((t) => !t.parent);
    const mainDocumentTransferSize = mainResource.transferSize;
    const totalByteWeight = records.reduce((sum, r) => sum + (r.transferSize || 0), 0);
    const totalTaskTime = toplevelTasks.reduce((sum, t) => sum + (t.duration || 0), 0);
    const maxRtt = Math.max(...analysis.additionalRttByOrigin.values()) + analysis.rtt;
    const maxServerLatency = Math.max(...analysis.serverResponseTimeByOrigin.values());
    const diagnostics = {
      numRequests: records.length,
      numScripts: records.filter((r) => r.resourceType === "Script").length,
      numStylesheets: records.filter((r) => r.resourceType === "Stylesheet").length,
      numFonts: records.filter((r) => r.resourceType === "Font").length,
      numTasks: toplevelTasks.length,
      numTasksOver10ms: toplevelTasks.filter((t) => t.duration > 10).length,
      numTasksOver25ms: toplevelTasks.filter((t) => t.duration > 25).length,
      numTasksOver50ms: toplevelTasks.filter((t) => t.duration > 50).length,
      numTasksOver100ms: toplevelTasks.filter((t) => t.duration > 100).length,
      numTasksOver500ms: toplevelTasks.filter((t) => t.duration > 500).length,
      rtt: analysis.rtt,
      throughput: analysis.throughput,
      maxRtt,
      maxServerLatency,
      totalByteWeight,
      totalTaskTime,
      mainDocumentTransferSize
    };
    return {
      score: 1,
      details: {
        type: "debugdata",
        // TODO: Consider not nesting diagnostics under `items`.
        items: [diagnostics]
      }
    };
  }
};
var diagnostics_default = Diagnostics;
export {
  diagnostics_default as default
};
/*! Bundled license information:

lighthouse/core/audits/diagnostics.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
