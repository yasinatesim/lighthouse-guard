import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainThreadTasksComputed
} from "./chunk-DESG734R.js";
import "./chunk-UE3SWGEC.js";
import "./chunk-RI7XYKZY.js";
import "./chunk-NUK2ASLP.js";
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

// node_modules/lighthouse/core/audits/main-thread-tasks.js
var MainThreadTasks = class extends Audit {
  static {
    __name(this, "MainThreadTasks");
  }
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
