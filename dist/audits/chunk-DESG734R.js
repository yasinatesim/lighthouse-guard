import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  MainThreadTasks
} from "./chunk-UE3SWGEC.js";
import {
  ProcessedTraceComputed
} from "./chunk-RI7XYKZY.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/main-thread-tasks.js
var MainThreadTasks2 = class {
  static {
    __name(this, "MainThreadTasks");
  }
  /**
   * @param {LH.Trace} trace
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<Array<LH.Artifacts.TaskNode>>}
   */
  static async compute_(trace, context) {
    const { mainThreadEvents, frames, timestamps } = await ProcessedTraceComputed.request(trace, context);
    return MainThreadTasks.getMainThreadTasks(
      mainThreadEvents,
      frames,
      timestamps.traceEnd,
      timestamps.timeOrigin
    );
  }
};
var MainThreadTasksComputed = makeComputedArtifact(MainThreadTasks2, null);

export {
  MainThreadTasksComputed
};
/*! Bundled license information:

lighthouse/core/computed/main-thread-tasks.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
