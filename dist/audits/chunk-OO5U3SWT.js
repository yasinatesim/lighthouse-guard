import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRequest
} from "./chunk-AB7S44AE.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/lib/tracehouse/task-summary.js
var BROWSER_TASK_NAMES_SET = /* @__PURE__ */ new Set([
  "CpuProfiler::StartProfiling"
]);
var BROWSER_GC_TASK_NAMES_SET = /* @__PURE__ */ new Set([
  "V8.GCCompactor",
  "MajorGC",
  "MinorGC"
]);
function getJavaScriptURLs(records) {
  const urls = /* @__PURE__ */ new Set();
  for (const record of records) {
    if (record.resourceType === NetworkRequest.TYPES.Script) {
      urls.add(record.url);
    }
  }
  return urls;
}
__name(getJavaScriptURLs, "getJavaScriptURLs");
function getAttributableURLForTask(task, jsURLs) {
  const jsURL = task.attributableURLs.find((url) => jsURLs.has(url));
  const fallbackURL = task.attributableURLs[0];
  let attributableURL = jsURL || fallbackURL;
  if (!attributableURL || attributableURL === "about:blank") {
    if (BROWSER_TASK_NAMES_SET.has(task.event.name)) attributableURL = "Browser";
    else if (BROWSER_GC_TASK_NAMES_SET.has(task.event.name)) attributableURL = "Browser GC";
    else attributableURL = "Unattributable";
  }
  return attributableURL;
}
__name(getAttributableURLForTask, "getAttributableURLForTask");
function getExecutionTimingsByURL(tasks, networkRecords) {
  const jsURLs = getJavaScriptURLs(networkRecords);
  const result = /* @__PURE__ */ new Map();
  for (const task of tasks) {
    const attributableURL = getAttributableURLForTask(task, jsURLs);
    const timingByGroupId = result.get(attributableURL) || {};
    const originalTime = timingByGroupId[task.group.id] || 0;
    timingByGroupId[task.group.id] = originalTime + task.selfTime;
    result.set(attributableURL, timingByGroupId);
  }
  return result;
}
__name(getExecutionTimingsByURL, "getExecutionTimingsByURL");

export {
  getJavaScriptURLs,
  getAttributableURLForTask,
  getExecutionTimingsByURL
};
/*! Bundled license information:

lighthouse/core/lib/tracehouse/task-summary.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
