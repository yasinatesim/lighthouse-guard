import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  lighthouse_logger_default
} from "./chunk-VDXIC3K2.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/lib/tracehouse/trace-processor.js
var ACCEPTABLE_NAVIGATION_URL_REGEX = /^(chrome|https?):/;
var BASE_RESPONSE_LATENCY = 16;
var SCHEDULABLE_TASK_TITLE_LH = "RunTask";
var SCHEDULABLE_TASK_TITLE_ALT1 = "ThreadControllerImpl::RunTask";
var SCHEDULABLE_TASK_TITLE_ALT2 = "ThreadControllerImpl::DoWork";
var SCHEDULABLE_TASK_TITLE_ALT3 = "TaskQueueManager::ProcessTaskFromWorkQueue";
var TraceProcessor = class _TraceProcessor {
  static {
    __name(this, "TraceProcessor");
  }
  static get TIMESPAN_MARKER_ID() {
    return "__lighthouseTimespanStart__";
  }
  /**
   * @return {Error}
   */
  static createNoNavstartError() {
    return new Error("No navigationStart event found");
  }
  /**
   * @return {Error}
   */
  static createNoResourceSendRequestError() {
    return new Error("No ResourceSendRequest event found");
  }
  /**
   * @return {Error}
   */
  static createNoTracingStartedError() {
    return new Error("No tracingStartedInBrowser event found");
  }
  /**
   * @return {Error}
   */
  static createNoFirstContentfulPaintError() {
    return new Error("No FirstContentfulPaint event found");
  }
  /**
   * @return {Error}
   */
  static createNoLighthouseMarkerError() {
    return new Error("No Lighthouse timespan marker event found");
  }
  /**
   * Returns true if the event is a navigation start event of a document whose URL seems valid.
   *
   * @param {LH.TraceEvent} event
   * @return {boolean}
   */
  static _isNavigationStartOfInterest(event) {
    if (event.name !== "navigationStart") return false;
    if (event.args.data?.documentLoaderURL === void 0) return true;
    if (!event.args.data?.documentLoaderURL) return false;
    return ACCEPTABLE_NAVIGATION_URL_REGEX.test(event.args.data.documentLoaderURL);
  }
  /**
   * This method sorts a group of trace events that have the same timestamp. We want to...
   *
   * 1. Put E events first, we finish off our existing events before we start new ones.
   * 2. Order B/X events by their duration, we want parents to start before child events.
   * 3. If we don't have any of this to go on, just use the position in the original array (stable sort).
   *
   * Note that the typical group size with the same timestamp will be quite small (<10 or so events),
   * and the number of groups typically ~1% of total trace, so the same ultra-performance-sensitive consideration
   * given to functions that run on entire traces does not necessarily apply here.
   *
   * @param {number[]} tsGroupIndices
   * @param {number[]} timestampSortedIndices
   * @param {number} indexOfTsGroupIndicesStart
   * @param {LH.TraceEvent[]} traceEvents
   * @return {number[]}
   */
  static _sortTimestampEventGroup(tsGroupIndices, timestampSortedIndices, indexOfTsGroupIndicesStart, traceEvents) {
    const lookupArrayIndexByTsIndex = /* @__PURE__ */ __name((i) => timestampSortedIndices[i], "lookupArrayIndexByTsIndex");
    const lookupEventByTsIndex = /* @__PURE__ */ __name((i) => traceEvents[lookupArrayIndexByTsIndex(i)], "lookupEventByTsIndex");
    const eEventIndices = [];
    const bxEventIndices = [];
    const otherEventIndices = [];
    for (const tsIndex of tsGroupIndices) {
      const arrayIndex = lookupArrayIndexByTsIndex(tsIndex);
      const event = lookupEventByTsIndex(tsIndex);
      if (event.ph === "E") eEventIndices.push(arrayIndex);
      else if (event.ph === "X" || event.ph === "B") bxEventIndices.push(arrayIndex);
      else otherEventIndices.push(arrayIndex);
    }
    const effectiveDuration = /* @__PURE__ */ new Map();
    for (const index of bxEventIndices) {
      const event = traceEvents[index];
      if (event.ph === "X") {
        effectiveDuration.set(index, event.dur);
      } else {
        let duration = Number.MAX_SAFE_INTEGER;
        let additionalNestedEventsWithSameName = 0;
        const startIndex = indexOfTsGroupIndicesStart + tsGroupIndices.length;
        for (let j = startIndex; j < timestampSortedIndices.length; j++) {
          const potentialMatchingEvent = lookupEventByTsIndex(j);
          const eventMatches = potentialMatchingEvent.name === event.name && potentialMatchingEvent.pid === event.pid && potentialMatchingEvent.tid === event.tid;
          if (!eventMatches) continue;
          if (potentialMatchingEvent.ph === "E" && additionalNestedEventsWithSameName === 0) {
            duration = potentialMatchingEvent.ts - event.ts;
            break;
          } else if (potentialMatchingEvent.ph === "E") {
            additionalNestedEventsWithSameName--;
          } else if (potentialMatchingEvent.ph === "B") {
            additionalNestedEventsWithSameName++;
          }
        }
        effectiveDuration.set(index, duration);
      }
    }
    bxEventIndices.sort((indexA, indexB) => (effectiveDuration.get(indexB) || 0) - (effectiveDuration.get(indexA) || 0) || indexA - indexB);
    otherEventIndices.sort((indexA, indexB) => indexA - indexB);
    return [...eEventIndices, ...bxEventIndices, ...otherEventIndices];
  }
  /**
   * Sorts and filters trace events by timestamp and respecting the nesting structure inherent to
   * parent/child event relationships.
   *
   * @param {LH.TraceEvent[]} traceEvents
   * @param {(e: LH.TraceEvent) => boolean} filter
   */
  static filteredTraceSort(traceEvents, filter) {
    const indices = [];
    for (let srcIndex = 0; srcIndex < traceEvents.length; srcIndex++) {
      if (filter(traceEvents[srcIndex])) {
        indices.push(srcIndex);
      }
    }
    indices.sort((indexA, indexB) => traceEvents[indexA].ts - traceEvents[indexB].ts);
    for (let i = 0; i < indices.length - 1; i++) {
      const ts = traceEvents[indices[i]].ts;
      const tsGroupIndices = [i];
      for (let j = i + 1; j < indices.length; j++) {
        if (traceEvents[indices[j]].ts !== ts) break;
        tsGroupIndices.push(j);
      }
      if (tsGroupIndices.length === 1) continue;
      const finalIndexOrder = _TraceProcessor._sortTimestampEventGroup(
        tsGroupIndices,
        indices,
        i,
        traceEvents
      );
      indices.splice(i, finalIndexOrder.length, ...finalIndexOrder);
      i += tsGroupIndices.length - 1;
    }
    const sorted = [];
    for (let i = 0; i < indices.length; i++) {
      sorted.push(traceEvents[indices[i]]);
    }
    return sorted;
  }
  /**
   * There should *always* be at least one top level event, having 0 typically means something is
   * drastically wrong with the trace and we should just give up early and loudly.
   *
   * @param {LH.TraceEvent[]} events
   */
  static assertHasToplevelEvents(events) {
    const hasToplevelTask = events.some(this.isScheduleableTask);
    if (!hasToplevelTask) {
      throw new Error("Could not find any top level events");
    }
  }
  /**
   * Calculate duration at specified percentiles for given population of
   * durations.
   * If one of the durations overlaps the end of the window, the full
   * duration should be in the duration array, but the length not included
   * within the window should be given as `clippedLength`. For instance, if a
   * 50ms duration occurs 10ms before the end of the window, `50` should be in
   * the `durations` array, and `clippedLength` should be set to 40.
   * @see https://docs.google.com/document/d/1b9slyaB9yho91YTOkAQfpCdULFkZM9LqsipcX3t7He8/preview
   * @param {!Array<number>} durations Array of durations, sorted in ascending order.
   * @param {number} totalTime Total time (in ms) of interval containing durations.
   * @param {!Array<number>} percentiles Array of percentiles of interest, in ascending order.
   * @param {number=} clippedLength Optional length clipped from a duration overlapping end of window. Default of 0.
   * @return {!Array<{percentile: number, time: number}>}
   * @private
   */
  static _riskPercentiles(durations, totalTime, percentiles, clippedLength = 0) {
    let busyTime = 0;
    for (let i = 0; i < durations.length; i++) {
      busyTime += durations[i];
    }
    busyTime -= clippedLength;
    let completedTime = totalTime - busyTime;
    let duration = 0;
    let cdfTime = completedTime;
    const results = [];
    let durationIndex = -1;
    let remainingCount = durations.length + 1;
    if (clippedLength > 0) {
      remainingCount--;
    }
    for (const percentile of percentiles) {
      const percentileTime = percentile * totalTime;
      while (cdfTime < percentileTime && durationIndex < durations.length - 1) {
        completedTime += duration;
        remainingCount -= duration < 0 ? -1 : 1;
        if (clippedLength > 0 && clippedLength < durations[durationIndex + 1]) {
          duration = -clippedLength;
          clippedLength = 0;
        } else {
          durationIndex++;
          duration = durations[durationIndex];
        }
        cdfTime = completedTime + Math.abs(duration) * remainingCount;
      }
      results.push({
        percentile,
        time: Math.max(0, (percentileTime - completedTime) / remainingCount) + BASE_RESPONSE_LATENCY
      });
    }
    return results;
  }
  /**
   * Calculates the maximum queueing time (in ms) of high priority tasks for
   * selected percentiles within a window of the main thread.
   * @see https://docs.google.com/document/d/1b9slyaB9yho91YTOkAQfpCdULFkZM9LqsipcX3t7He8/preview
   * @param {Array<ToplevelEvent>} events
   * @param {number} startTime Start time (in ms relative to timeOrigin) of range of interest.
   * @param {number} endTime End time (in ms relative to timeOrigin) of range of interest.
   * @param {!Array<number>=} percentiles Optional array of percentiles to compute. Defaults to [0.5, 0.75, 0.9, 0.99, 1].
   * @return {!Array<{percentile: number, time: number}>}
   */
  static getRiskToResponsiveness(events, startTime, endTime, percentiles = [0.5, 0.75, 0.9, 0.99, 1]) {
    const totalTime = endTime - startTime;
    percentiles.sort((a, b) => a - b);
    const ret = this.getMainThreadTopLevelEventDurations(events, startTime, endTime);
    return this._riskPercentiles(
      ret.durations,
      totalTime,
      percentiles,
      ret.clippedLength
    );
  }
  /**
   * Provides durations in ms of all main thread top-level events
   * @param {Array<ToplevelEvent>} topLevelEvents
   * @param {number} startTime Optional start time (in ms relative to timeOrigin) of range of interest. Defaults to 0.
   * @param {number} endTime Optional end time (in ms relative to timeOrigin) of range of interest. Defaults to trace end.
   * @return {{durations: Array<number>, clippedLength: number}}
   */
  static getMainThreadTopLevelEventDurations(topLevelEvents, startTime = 0, endTime = Infinity) {
    const durations = [];
    let clippedLength = 0;
    for (const event of topLevelEvents) {
      if (event.end < startTime || event.start > endTime) {
        continue;
      }
      let duration = event.duration;
      let eventStart = event.start;
      if (eventStart < startTime) {
        eventStart = startTime;
        duration = event.end - startTime;
      }
      if (event.end > endTime) {
        clippedLength = duration - (endTime - eventStart);
      }
      durations.push(duration);
    }
    durations.sort((a, b) => a - b);
    return {
      durations,
      clippedLength
    };
  }
  /**
   * Provides the top level events on the main thread with timestamps in ms relative to timeOrigin.
   * start.
   * @param {LH.Artifacts.ProcessedTrace} trace
   * @param {number=} startTime Optional start time (in ms relative to timeOrigin) of range of interest. Defaults to 0.
   * @param {number=} endTime Optional end time (in ms relative to timeOrigin) of range of interest. Defaults to trace end.
   * @return {Array<ToplevelEvent>}
   */
  static getMainThreadTopLevelEvents(trace, startTime = 0, endTime = Infinity) {
    const topLevelEvents = [];
    let prevToplevel = void 0;
    for (const event of trace.mainThreadEvents) {
      if (!this.isScheduleableTask(event) || !event.dur) continue;
      const start = (event.ts - trace.timeOriginEvt.ts) / 1e3;
      const end = (event.ts + event.dur - trace.timeOriginEvt.ts) / 1e3;
      if (start > endTime || end < startTime) continue;
      if (prevToplevel && start < prevToplevel.end) {
        prevToplevel.end = start - 1e-3;
      }
      prevToplevel = {
        start,
        end,
        duration: event.dur / 1e3
      };
      topLevelEvents.push(prevToplevel);
    }
    return topLevelEvents;
  }
  /**
   * @param {LH.TraceEvent[]} events
   * @return {{startingPid: number, frameId: string}}
   */
  static findMainFrameIds(events) {
    const startedInBrowserEvt = events.find((e) => e.name === "TracingStartedInBrowser");
    if (startedInBrowserEvt?.args.data?.frames) {
      const mainFrame = startedInBrowserEvt.args.data.frames.find((frame) => !frame.parent);
      const frameId = mainFrame?.frame;
      const pid = mainFrame?.processId;
      if (pid && frameId) {
        return {
          startingPid: pid,
          frameId
        };
      }
    }
    const startedInPageEvt = events.find((e) => e.name === "TracingStartedInPage");
    if (startedInPageEvt?.args?.data) {
      const frameId = startedInPageEvt.args.data.page;
      if (frameId) {
        return {
          startingPid: startedInPageEvt.pid,
          frameId
        };
      }
    }
    const navStartEvt = events.find(
      (e) => this._isNavigationStartOfInterest(e) && e.args.data?.isLoadingMainFrame
    );
    const firstResourceSendEvt = events.find((e) => e.name === "ResourceSendRequest");
    if (navStartEvt?.args?.data && firstResourceSendEvt && firstResourceSendEvt.pid === navStartEvt.pid && firstResourceSendEvt.tid === navStartEvt.tid) {
      const frameId = navStartEvt.args.frame;
      if (frameId) {
        return {
          startingPid: navStartEvt.pid,
          frameId
        };
      }
    }
    throw this.createNoTracingStartedError();
  }
  /**
   * If there were any cross-origin navigations, there'll be more than one pid returned
   * @param {{startingPid: number, frameId: string}} mainFrameInfo
   * @param {LH.TraceEvent[]} keyEvents
   * @return {Map<number, number>} Map where keys are process IDs and their values are thread IDs
   */
  static findMainFramePidTids(mainFrameInfo, keyEvents) {
    const frameProcessEvts = keyEvents.filter(
      (evt) => (
        // ProcessReadyInBrowser is used when a processID isn't available when the FrameCommittedInBrowser trace event is emitted.
        // In that case. FrameCommittedInBrowser has no processId, but a processPseudoId. and the ProcessReadyInBrowser event declares the proper processId.
        (evt.name === "FrameCommittedInBrowser" || evt.name === "ProcessReadyInBrowser") && evt.args?.data?.frame === mainFrameInfo.frameId && evt?.args?.data?.processId
      )
    );
    const mainFramePids = frameProcessEvts.length ? frameProcessEvts.map((e) => e?.args?.data?.processId) : [mainFrameInfo.startingPid];
    const pidToTid = /* @__PURE__ */ new Map();
    for (const pid of new Set(mainFramePids)) {
      const threadEvents = keyEvents.filter(
        (e) => e.cat === "__metadata" && e.pid === pid && e.ph === "M" && e.name === "thread_name"
      );
      let threadNameEvt = threadEvents.find((e) => e.args.name === "CrRendererMain");
      if (!threadNameEvt) {
        threadNameEvt = threadEvents.find((e) => e.args.name === "CrBrowserMain");
      }
      const tid = threadNameEvt?.tid;
      if (!tid) {
        throw new Error("Unable to determine tid for renderer process");
      }
      pidToTid.set(pid, tid);
    }
    return pidToTid;
  }
  /**
   * @param {LH.TraceEvent} evt
   * @return {boolean}
   */
  static isScheduleableTask(evt) {
    return evt.name === SCHEDULABLE_TASK_TITLE_LH || evt.name === SCHEDULABLE_TASK_TITLE_ALT1 || evt.name === SCHEDULABLE_TASK_TITLE_ALT2 || evt.name === SCHEDULABLE_TASK_TITLE_ALT3;
  }
  /**
   * @param {LH.TraceEvent} evt
   * @return {evt is LCPEvent}
   */
  static isLCPEvent(evt) {
    if (evt.name !== "largestContentfulPaint::Invalidate" && evt.name !== "largestContentfulPaint::Candidate") return false;
    return Boolean(evt.args?.frame);
  }
  /**
   * @param {LH.TraceEvent} evt
   * @return {evt is LCPCandidateEvent}
   */
  static isLCPCandidateEvent(evt) {
    return Boolean(
      evt.name === "largestContentfulPaint::Candidate" && evt.args?.frame && evt.args.data && evt.args.data.size !== void 0
    );
  }
  /**
   * The associated frame ID is set in different locations for different trace events.
   * This function checks all known locations for the frame ID and returns `undefined` if it's not found.
   *
   * @param {LH.TraceEvent} evt
   * @return {string|undefined}
   */
  static getFrameId(evt) {
    return evt.args?.data?.frame || evt.args.data?.frameID || evt.args.frame;
  }
  /**
   * Returns the maximum LCP event across all frames in `events`.
   * Sets `invalidated` flag if LCP of every frame is invalidated.
   *
   * LCP's trace event was first introduced in m78. We can't surface an LCP for older Chrome versions.
   * LCP comes from a frame's latest `largestContentfulPaint::Candidate`, but it can be invalidated by a `largestContentfulPaint::Invalidate` event.
   *
   * @param {LH.TraceEvent[]} events
   * @param {LH.TraceEvent} timeOriginEvent
   * @return {{lcp: LCPEvent | undefined, invalidated: boolean}}
   */
  static computeValidLCPAllFrames(events, timeOriginEvent) {
    const lcpEvents = events.filter(this.isLCPEvent).reverse();
    const finalLcpEventsByFrame = /* @__PURE__ */ new Map();
    for (const e of lcpEvents) {
      if (e.ts <= timeOriginEvent.ts) break;
      const frame = e.args.frame;
      if (finalLcpEventsByFrame.has(frame)) continue;
      finalLcpEventsByFrame.set(frame, e);
    }
    let maxLcpAcrossFrames;
    for (const lcp of finalLcpEventsByFrame.values()) {
      if (!this.isLCPCandidateEvent(lcp)) continue;
      if (!maxLcpAcrossFrames || lcp.args.data.size > maxLcpAcrossFrames.args.data.size) {
        maxLcpAcrossFrames = lcp;
      }
    }
    return {
      lcp: maxLcpAcrossFrames,
      // LCP events were found, but final LCP event of every frame was an invalidate event.
      invalidated: Boolean(!maxLcpAcrossFrames && finalLcpEventsByFrame.size)
    };
  }
  /**
   * @param {Array<{id: string, url: string, parent?: string}>} frames
   * @return {Map<string, string>}
   */
  static resolveRootFrames(frames) {
    const parentFrames = /* @__PURE__ */ new Map();
    for (const frame of frames) {
      if (!frame.parent) continue;
      parentFrames.set(frame.id, frame.parent);
    }
    const frameIdToRootFrameId = /* @__PURE__ */ new Map();
    for (const frame of frames) {
      let cur = frame.id;
      while (parentFrames.has(cur)) {
        cur = /** @type {string} */
        parentFrames.get(cur);
      }
      if (cur === void 0) {
        throw new Error("Unexpected undefined frameId");
      }
      frameIdToRootFrameId.set(frame.id, cur);
    }
    return frameIdToRootFrameId;
  }
  /**
   * Finds key trace events, identifies main process/thread, and returns timings of trace events
   * in milliseconds since the time origin in addition to the standard microsecond monotonic timestamps.
   * @param {LH.Trace} trace
   * @param {{timeOriginDeterminationMethod?: TimeOriginDeterminationMethod}} [options]
   * @return {LH.Artifacts.ProcessedTrace}
  */
  static processTrace(trace, options) {
    const { timeOriginDeterminationMethod = "auto" } = options || {};
    const keyEvents = this.filteredTraceSort(trace.traceEvents, (e) => {
      return e.cat.includes("blink.user_timing") || e.cat.includes("loading") || e.cat.includes("devtools.timeline") || e.cat === "__metadata";
    });
    const mainFrameInfo = this.findMainFrameIds(keyEvents);
    const rendererPidToTid = this.findMainFramePidTids(mainFrameInfo, keyEvents);
    const processEvents = _TraceProcessor.filteredTraceSort(trace.traceEvents, (e) => rendererPidToTid.has(e.pid));
    const framesById = /* @__PURE__ */ new Map();
    const tracingStartedFrames = keyEvents.find((e) => e.name === "TracingStartedInBrowser")?.args?.data?.frames;
    if (tracingStartedFrames) {
      for (const frame of tracingStartedFrames) {
        framesById.set(frame.frame, {
          id: frame.frame,
          url: frame.url,
          parent: frame.parent
        });
      }
    }
    keyEvents.filter(
      /** @return {evt is FrameCommittedEvent} */
      (evt) => {
        return Boolean(
          evt.name === "FrameCommittedInBrowser" && evt.args.data?.frame && evt.args.data.url !== void 0
        );
      }
    ).forEach((evt) => {
      framesById.set(evt.args.data.frame, {
        id: evt.args.data.frame,
        url: evt.args.data.url,
        parent: evt.args.data.parent
      });
    });
    const frames = [...framesById.values()];
    const frameIdToRootFrameId = this.resolveRootFrames(frames);
    const inspectedTreeFrameIds = [...frameIdToRootFrameId.entries()].filter(([, rootFrameId]) => rootFrameId === mainFrameInfo.frameId).map(([child]) => child);
    function associatedToMainFrame(e) {
      const frameId = _TraceProcessor.getFrameId(e);
      return frameId === mainFrameInfo.frameId;
    }
    __name(associatedToMainFrame, "associatedToMainFrame");
    function associatedToAllFrames(e) {
      const frameId = _TraceProcessor.getFrameId(e);
      return frameId ? inspectedTreeFrameIds.includes(frameId) : false;
    }
    __name(associatedToAllFrames, "associatedToAllFrames");
    const frameEvents = keyEvents.filter((e) => associatedToMainFrame(e));
    let frameTreeEvents = [];
    if (frameIdToRootFrameId.has(mainFrameInfo.frameId)) {
      frameTreeEvents = keyEvents.filter((e) => associatedToAllFrames(e));
    } else {
      lighthouse_logger_default.warn(
        "TraceProcessor",
        "frameTreeEvents may be incomplete, make sure the trace has frame events"
      );
      frameIdToRootFrameId.set(mainFrameInfo.frameId, mainFrameInfo.frameId);
      frameTreeEvents = frameEvents;
    }
    const timeOriginEvt = this.computeTimeOrigin(
      { keyEvents, frameEvents, mainFrameInfo },
      timeOriginDeterminationMethod
    );
    const mainThreadEvents = processEvents.filter((e) => e.tid === rendererPidToTid.get(e.pid));
    const traceEnd = this.computeTraceEnd(trace.traceEvents, timeOriginEvt);
    return {
      frames,
      mainThreadEvents,
      frameEvents,
      frameTreeEvents,
      processEvents,
      mainFrameInfo,
      timeOriginEvt,
      timings: {
        timeOrigin: 0,
        traceEnd: traceEnd.timing
      },
      timestamps: {
        timeOrigin: timeOriginEvt.ts,
        traceEnd: traceEnd.timestamp
      },
      _keyEvents: keyEvents,
      _rendererPidToTid: rendererPidToTid
    };
  }
  /**
   * Finds key navigation trace events and computes timings of events in milliseconds since the time
   * origin in addition to the standard microsecond monotonic timestamps.
   * @param {LH.Artifacts.ProcessedTrace} processedTrace
   * @return {LH.Artifacts.ProcessedNavigation}
  */
  static processNavigation(processedTrace) {
    const { frameEvents, frameTreeEvents, timeOriginEvt, timings, timestamps } = processedTrace;
    const frameTimings = this.computeNavigationTimingsForFrame(frameEvents, { timeOriginEvt });
    const fcpAllFramesEvt = frameTreeEvents.find(
      (e) => e.name === "firstContentfulPaint" && e.ts > timeOriginEvt.ts
    );
    if (!fcpAllFramesEvt) {
      throw this.createNoFirstContentfulPaintError();
    }
    const lcpAllFramesEvt = this.computeValidLCPAllFrames(frameTreeEvents, timeOriginEvt).lcp;
    const getTiming = /* @__PURE__ */ __name((ts) => (ts - timeOriginEvt.ts) / 1e3, "getTiming");
    const maybeGetTiming = /* @__PURE__ */ __name((ts) => ts === void 0 ? void 0 : getTiming(ts), "maybeGetTiming");
    return {
      timings: {
        timeOrigin: timings.timeOrigin,
        firstPaint: frameTimings.timings.firstPaint,
        firstContentfulPaint: frameTimings.timings.firstContentfulPaint,
        firstContentfulPaintAllFrames: getTiming(fcpAllFramesEvt.ts),
        largestContentfulPaint: frameTimings.timings.largestContentfulPaint,
        largestContentfulPaintAllFrames: maybeGetTiming(lcpAllFramesEvt?.ts),
        load: frameTimings.timings.load,
        domContentLoaded: frameTimings.timings.domContentLoaded,
        traceEnd: timings.traceEnd
      },
      timestamps: {
        timeOrigin: timestamps.timeOrigin,
        firstPaint: frameTimings.timestamps.firstPaint,
        firstContentfulPaint: frameTimings.timestamps.firstContentfulPaint,
        firstContentfulPaintAllFrames: fcpAllFramesEvt.ts,
        largestContentfulPaint: frameTimings.timestamps.largestContentfulPaint,
        largestContentfulPaintAllFrames: lcpAllFramesEvt?.ts,
        load: frameTimings.timestamps.load,
        domContentLoaded: frameTimings.timestamps.domContentLoaded,
        traceEnd: timestamps.traceEnd
      },
      firstPaintEvt: frameTimings.firstPaintEvt,
      firstContentfulPaintEvt: frameTimings.firstContentfulPaintEvt,
      firstContentfulPaintAllFramesEvt: fcpAllFramesEvt,
      largestContentfulPaintEvt: frameTimings.largestContentfulPaintEvt,
      largestContentfulPaintAllFramesEvt: lcpAllFramesEvt,
      loadEvt: frameTimings.loadEvt,
      domContentLoadedEvt: frameTimings.domContentLoadedEvt,
      lcpInvalidated: frameTimings.lcpInvalidated
    };
  }
  /**
   * Computes the last observable timestamp in a set of trace events.
   *
   * @param {Array<LH.TraceEvent>} events
   * @param {LH.TraceEvent} timeOriginEvt
   * @return {{timing: number, timestamp: number}}
   */
  static computeTraceEnd(events, timeOriginEvt) {
    let maxTs = -Infinity;
    for (const event of events) {
      maxTs = Math.max(event.ts + (event.dur || 0), maxTs);
    }
    return { timestamp: maxTs, timing: (maxTs - timeOriginEvt.ts) / 1e3 };
  }
  /**
   * Computes the time origin using the specified method.
   *
   *    - firstResourceSendRequest
   *      Uses the time that the very first network request is sent in the main frame.
   *      Eventually should be used in place of lastNavigationStart as the default for navigations.
   *      This method includes the cost of all redirects when evaluating a navigation (which matches lantern behavior).
   *      The only difference between firstResourceSendRequest and the first `navigationStart` is
   *      the unload time of `about:blank` (which is a Lighthouse implementation detail and shouldn't be included).
   *
   *    - lastNavigationStart
   *      Uses the time of the last `navigationStart` event in the main frame.
   *      The historical time origin of Lighthouse from 2016-Present.
   *      This method excludes the cost of client-side redirects when evaluating a navigation.
   *      Can also be skewed by several hundred milliseconds or even seconds when the browser takes a long
   *      time to unload `about:blank`.
   *
   * @param {{keyEvents: Array<LH.TraceEvent>, frameEvents: Array<LH.TraceEvent>, mainFrameInfo: {frameId: string}}} traceEventSubsets
   * @param {TimeOriginDeterminationMethod} method
   * @return {LH.TraceEvent}
   */
  static computeTimeOrigin(traceEventSubsets, method) {
    const lastNavigationStart = /* @__PURE__ */ __name(() => {
      const frameEvents = traceEventSubsets.frameEvents;
      return frameEvents.filter(this._isNavigationStartOfInterest).pop();
    }, "lastNavigationStart");
    const lighthouseMarker = /* @__PURE__ */ __name(() => {
      const frameEvents = traceEventSubsets.keyEvents;
      return frameEvents.find(
        (evt) => evt.name === "clock_sync" && evt.args.sync_id === _TraceProcessor.TIMESPAN_MARKER_ID
      );
    }, "lighthouseMarker");
    switch (method) {
      case "firstResourceSendRequest": {
        const fetchStart = traceEventSubsets.keyEvents.find((event) => {
          if (event.name !== "ResourceSendRequest") return false;
          const data = event.args.data || {};
          return data.frame === traceEventSubsets.mainFrameInfo.frameId;
        });
        if (!fetchStart) throw this.createNoResourceSendRequestError();
        return fetchStart;
      }
      case "lastNavigationStart": {
        const navigationStart = lastNavigationStart();
        if (!navigationStart) throw this.createNoNavstartError();
        return navigationStart;
      }
      case "lighthouseMarker": {
        const marker = lighthouseMarker();
        if (!marker) throw this.createNoLighthouseMarkerError();
        return marker;
      }
      case "auto": {
        const marker = lighthouseMarker() || lastNavigationStart();
        if (!marker) throw this.createNoNavstartError();
        return marker;
      }
    }
  }
  /**
   * Computes timings of trace events of key trace events in milliseconds since the time origin
   * in addition to the standard microsecond monotonic timestamps.
   * @param {Array<LH.TraceEvent>} frameEvents
   * @param {{timeOriginEvt: LH.TraceEvent}} options
  */
  static computeNavigationTimingsForFrame(frameEvents, options) {
    const { timeOriginEvt } = options;
    const firstPaint = frameEvents.find((e) => e.name === "firstPaint" && e.ts > timeOriginEvt.ts);
    const firstContentfulPaint = frameEvents.find(
      (e) => e.name === "firstContentfulPaint" && e.ts > timeOriginEvt.ts
    );
    if (!firstContentfulPaint) {
      throw this.createNoFirstContentfulPaintError();
    }
    const lcpResult = this.computeValidLCPAllFrames(frameEvents, timeOriginEvt);
    const load = frameEvents.find((e) => e.name === "loadEventEnd" && e.ts > timeOriginEvt.ts);
    const domContentLoaded = frameEvents.find(
      (e) => e.name === "domContentLoadedEventEnd" && e.ts > timeOriginEvt.ts
    );
    const getTimestamp = /* @__PURE__ */ __name((event) => event?.ts, "getTimestamp");
    const timestamps = {
      timeOrigin: timeOriginEvt.ts,
      firstPaint: getTimestamp(firstPaint),
      firstContentfulPaint: firstContentfulPaint.ts,
      largestContentfulPaint: getTimestamp(lcpResult.lcp),
      load: getTimestamp(load),
      domContentLoaded: getTimestamp(domContentLoaded)
    };
    const getTiming = /* @__PURE__ */ __name((ts) => (ts - timeOriginEvt.ts) / 1e3, "getTiming");
    const maybeGetTiming = /* @__PURE__ */ __name((ts) => ts === void 0 ? void 0 : getTiming(ts), "maybeGetTiming");
    const timings = {
      timeOrigin: 0,
      firstPaint: maybeGetTiming(timestamps.firstPaint),
      firstContentfulPaint: getTiming(timestamps.firstContentfulPaint),
      largestContentfulPaint: maybeGetTiming(timestamps.largestContentfulPaint),
      load: maybeGetTiming(timestamps.load),
      domContentLoaded: maybeGetTiming(timestamps.domContentLoaded)
    };
    return {
      timings,
      timestamps,
      timeOriginEvt,
      firstPaintEvt: firstPaint,
      firstContentfulPaintEvt: firstContentfulPaint,
      largestContentfulPaintEvt: lcpResult.lcp,
      loadEvt: load,
      domContentLoadedEvt: domContentLoaded,
      lcpInvalidated: lcpResult.invalidated
    };
  }
};

export {
  TraceProcessor
};
/*! Bundled license information:

lighthouse/core/lib/tracehouse/trace-processor.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
