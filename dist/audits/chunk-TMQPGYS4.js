import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ProcessedNavigationComputed
} from "./chunk-IOK3BAH7.js";
import {
  NetworkRecordsComputed
} from "./chunk-JDNHHZFJ.js";
import {
  LighthouseError
} from "./chunk-2BIJ7VKV.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";

// node_modules/lighthouse/core/computed/lcp-image-record.js
var LCPImageRecord = class {
  /**
   * @param {{trace: LH.Trace, devtoolsLog: LH.DevtoolsLog}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.NetworkRequest|undefined>}
   */
  static async compute_(data, context) {
    const { trace, devtoolsLog } = data;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const processedNavigation = await ProcessedNavigationComputed.request(trace, context);
    if (processedNavigation.timings.largestContentfulPaint === void 0) {
      throw new LighthouseError(LighthouseError.errors.NO_LCP);
    }
    const lcpEvent = processedNavigation.largestContentfulPaintEvt;
    if (!lcpEvent) return;
    const lcpImagePaintEvent = trace.traceEvents.filter((e) => {
      return e.name === "LargestImagePaint::Candidate" && e.args.frame === lcpEvent.args.frame && e.args.data?.DOMNodeId === lcpEvent.args.data?.nodeId && e.args.data?.size === lcpEvent.args.data?.size;
    }).sort((a, b) => b.ts - a.ts)[0];
    const lcpUrl = lcpImagePaintEvent?.args.data?.imageUrl;
    if (!lcpUrl) return;
    const candidates = networkRecords.filter((record) => {
      return record.url === lcpUrl && record.finished && // Same frame as LCP trace event.
      record.frameId === lcpImagePaintEvent.args.frame && record.networkRequestTime < (processedNavigation.timestamps.largestContentfulPaint || 0);
    }).map((record) => {
      while (record.redirectDestination) {
        record = record.redirectDestination;
      }
      return record;
    }).filter((record) => {
      return record.resourceType === "Image";
    });
    return candidates.sort((a, b) => a.networkEndTime - b.networkEndTime)[0];
  }
};
var LCPImageRecordComputed = makeComputedArtifact(LCPImageRecord, ["devtoolsLog", "trace"]);

export {
  LCPImageRecordComputed
};
/*! Bundled license information:

lighthouse/core/computed/lcp-image-record.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
