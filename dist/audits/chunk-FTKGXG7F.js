import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TraceProcessor
} from "./chunk-3WVTZQMF.js";
import {
  LighthouseError
} from "./chunk-2BIJ7VKV.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";

// node_modules/lighthouse/core/lib/lh-trace-processor.js
var LHTraceProcessor = class extends TraceProcessor {
  /**
   * @return {Error}
   */
  static createNoNavstartError() {
    return new LighthouseError(LighthouseError.errors.NO_NAVSTART);
  }
  /**
   * This isn't currently used, but will be when the time origin of trace processing is changed.
   * @see {TraceProcessor.computeTimeOrigin}
   * @see https://github.com/GoogleChrome/lighthouse/pull/11253#discussion_r507985527
   * @return {Error}
   */
  static createNoResourceSendRequestError() {
    return new LighthouseError(LighthouseError.errors.NO_RESOURCE_REQUEST);
  }
  /**
   * @return {Error}
   */
  static createNoTracingStartedError() {
    return new LighthouseError(LighthouseError.errors.NO_TRACING_STARTED);
  }
  /**
   * @return {Error}
   */
  static createNoFirstContentfulPaintError() {
    return new LighthouseError(LighthouseError.errors.NO_FCP);
  }
};
var lh_trace_processor_default = LHTraceProcessor;

// node_modules/lighthouse/core/computed/processed-trace.js
var ProcessedTrace = class {
  /**
    * @param {LH.Trace} trace
    * @return {Promise<LH.Artifacts.ProcessedTrace>}
   */
  static async compute_(trace) {
    return lh_trace_processor_default.processTrace(trace);
  }
};
var ProcessedTraceComputed = makeComputedArtifact(ProcessedTrace, null);

export {
  lh_trace_processor_default,
  ProcessedTraceComputed
};
/*! Bundled license information:

lighthouse/core/lib/lh-trace-processor.js:
lighthouse/core/computed/processed-trace.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
