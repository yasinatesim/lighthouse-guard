import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ProcessedTraceComputed
} from "./chunk-XFJEV2GR.js";
import {
  LighthouseError
} from "./chunk-EBBYNBKM.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/computed/metrics/responsiveness.js
var KEYBOARD_EVENTS = /* @__PURE__ */ new Set(["keydown", "keypress", "keyup"]);
var CLICK_TAP_DRAG_EVENTS = /* @__PURE__ */ new Set([
  "mousedown",
  "mouseup",
  "pointerdown",
  "pointerup",
  "click"
]);
var interactionTypeToType = {
  keyboard: KEYBOARD_EVENTS,
  tapOrClick: CLICK_TAP_DRAG_EVENTS,
  drag: CLICK_TAP_DRAG_EVENTS
};
var Responsiveness = class _Responsiveness {
  static {
    __name(this, "Responsiveness");
  }
  /**
   * @param {LH.Artifacts.ProcessedTrace} processedTrace
   * @return {ResponsivenessEvent|null}
   */
  static getHighPercentileResponsiveness(processedTrace) {
    const responsivenessEvents = processedTrace.frameTreeEvents.filter(
      /** @return {e is ResponsivenessEvent} */
      (e) => {
        return e.name === "Responsiveness.Renderer.UserInteraction";
      }
    ).sort((a, b) => b.args.data.maxDuration - a.args.data.maxDuration);
    if (responsivenessEvents.length === 0) {
      return null;
    }
    const index = Math.min(9, Math.floor(responsivenessEvents.length / 50));
    return responsivenessEvents[index];
  }
  /**
   * Finds the interaction event that was probably the responsivenessEvent.maxDuration
   * source.
   * Note that (presumably due to rounding to ms), the interaction duration may not
   * be the same value as `maxDuration`, just the closest value. Function will throw
   * if the closest match is off by more than 4ms.
   * TODO: this doesn't try to match inputs to interactions and break ties if more than
   * one interaction had this duration by returning the first found.
   * @param {ResponsivenessEvent} responsivenessEvent
   * @param {LH.Trace} trace
   * @return {EventTimingEvent}
   */
  static findInteractionEvent(responsivenessEvent, { traceEvents }) {
    const candidates = traceEvents.filter(
      /** @return {evt is EventTimingEvent} */
      (evt) => {
        return evt.name === "EventTiming" && evt.ph !== "e";
      }
    );
    if (candidates.length && candidates.every((candidate) => !candidate.args.data?.frame)) {
      throw new LighthouseError(
        LighthouseError.errors.UNSUPPORTED_OLD_CHROME,
        { featureName: "detailed EventTiming trace events" }
      );
    }
    const { maxDuration, interactionType } = responsivenessEvent.args.data;
    let bestMatchEvent;
    let minDurationDiff = Number.POSITIVE_INFINITY;
    for (const candidate of candidates) {
      if (candidate.args.data.frame !== responsivenessEvent.args.frame) continue;
      const { type, duration } = candidate.args.data;
      const matchingTypes = interactionTypeToType[interactionType];
      if (!matchingTypes) {
        throw new Error(`unexpected responsiveness interactionType '${interactionType}'`);
      }
      if (!matchingTypes.has(type)) continue;
      const durationDiff = Math.abs(duration - maxDuration);
      if (durationDiff < minDurationDiff) {
        bestMatchEvent = candidate;
        minDurationDiff = durationDiff;
      }
    }
    if (!bestMatchEvent) {
      throw new Error(`no interaction event found for responsiveness type '${interactionType}'`);
    }
    if (minDurationDiff > 5) {
      throw new Error(`no interaction event found within 5ms of responsiveness maxDuration (max: ${maxDuration}, closest ${bestMatchEvent.args.data.duration})`);
    }
    return bestMatchEvent;
  }
  /**
   * @param {{trace: LH.Trace, settings: LH.Audit.Context['settings']}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<EventTimingEvent|null>}
   */
  static async compute_(data, context) {
    const { settings, trace } = data;
    if (settings.throttlingMethod === "simulate") {
      throw new Error("Responsiveness currently unsupported by simulated throttling");
    }
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const responsivenessEvent = _Responsiveness.getHighPercentileResponsiveness(processedTrace);
    if (!responsivenessEvent) return null;
    const interactionEvent = _Responsiveness.findInteractionEvent(responsivenessEvent, trace);
    return JSON.parse(JSON.stringify(interactionEvent));
  }
};
var ResponsivenessComputed = makeComputedArtifact(Responsiveness, [
  "trace",
  "settings"
]);

export {
  ResponsivenessComputed
};
/*! Bundled license information:

lighthouse/core/computed/metrics/responsiveness.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
