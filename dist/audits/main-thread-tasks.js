import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainThreadTasksComputed
} from "./chunk-FXMGSRO7.js";
import "./chunk-QBXT32HH.js";
import "./chunk-FTKGXG7F.js";
import "./chunk-3WVTZQMF.js";
import "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
import "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/main-thread-tasks.js
var MainThreadTasks = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "main-thread-tasks",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: "Tasks",
      description: "Lists the toplevel main thread tasks that executed during page load.",
      requiredArtifacts: ["Trace"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const trace = artifacts.Trace;
    const tasks = await MainThreadTasksComputed.request(trace, context);
    const results = tasks.filter((task) => task.duration > 5 && !task.parent).map((task) => {
      return {
        duration: task.duration,
        startTime: task.startTime
      };
    });
    const headings = [
      { key: "startTime", valueType: "ms", granularity: 1, label: "Start Time" },
      { key: "duration", valueType: "ms", granularity: 1, label: "End Time" }
    ];
    const tableDetails = Audit.makeTableDetails(headings, results);
    return {
      score: 1,
      details: tableDetails
    };
  }
};
var main_thread_tasks_default = MainThreadTasks;
export {
  main_thread_tasks_default as default
};
/*! Bundled license information:

lighthouse/core/audits/main-thread-tasks.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
