import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  require_SDK,
  source_maps_default
} from "./chunk-J6ARWDJP.js";
import {
  trace_default
} from "./chunk-NE4YDJKR.js";
import "./chunk-NESHVRVI.js";
import {
  Sentry
} from "./chunk-4LDDF7I7.js";
import {
  TraceProcessor
} from "./chunk-NUK2ASLP.js";
import {
  Processor_exports,
  handlers_exports,
  helpers_exports,
  insights_exports,
  makeComputedArtifact
} from "./chunk-QE4YYANC.js";
import {
  resolveNodeIdToObjectId
} from "./chunk-2VOQBKE3.js";
import {
  ExecutionContext
} from "./chunk-FP565QWJ.js";
import {
  LighthouseError,
  createIcuMessageFn
} from "./chunk-HXOADL7R.js";
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import "./chunk-C5HPB2FB.js";
import "./chunk-DQQIQ7YS.js";
import {
  pageFunctions
} from "./chunk-RDNFCTTE.js";
import "./chunk-SLD7CHCU.js";
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name,
  __toESM
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/lib/lh-trace-processor.js
var LHTraceProcessor = class extends TraceProcessor {
  static {
    __name(this, "LHTraceProcessor");
  }
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
  static {
    __name(this, "ProcessedTrace");
  }
  /**
    * @param {LH.Trace} trace
    * @return {Promise<LH.Artifacts.ProcessedTrace>}
   */
  static async compute_(trace) {
    return lh_trace_processor_default.processTrace(trace);
  }
};
var ProcessedTraceComputed = makeComputedArtifact(ProcessedTrace, null);

// node_modules/lighthouse/core/computed/processed-navigation.js
var ProcessedNavigation = class {
  static {
    __name(this, "ProcessedNavigation");
  }
  /**
   * @param {LH.Trace | LH.Artifacts.ProcessedTrace} traceOrProcessedTrace
   * @return {traceOrProcessedTrace is LH.Artifacts.ProcessedTrace}
   */
  static isProcessedTrace(traceOrProcessedTrace) {
    return "timeOriginEvt" in traceOrProcessedTrace;
  }
  /**
   * @param {LH.Trace | LH.Artifacts.ProcessedTrace} traceOrProcessedTrace
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.ProcessedNavigation>}
   */
  static async compute_(traceOrProcessedTrace, context) {
    if (this.isProcessedTrace(traceOrProcessedTrace)) {
      return lh_trace_processor_default.processNavigation(traceOrProcessedTrace);
    }
    const processedTrace = await ProcessedTraceComputed.request(traceOrProcessedTrace, context);
    return lh_trace_processor_default.processNavigation(processedTrace);
  }
};
var ProcessedNavigationComputed = makeComputedArtifact(ProcessedNavigation, null);

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

// node_modules/lighthouse/core/lib/rect-helpers.js
function addRectTopAndBottom({ x, y, width, height }) {
  return {
    left: x,
    top: y,
    right: x + width,
    bottom: y + height,
    width,
    height
  };
}
__name(addRectTopAndBottom, "addRectTopAndBottom");
function getRectOverlapArea(rect1, rect2) {
  const rectYOverlap = Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top);
  if (rectYOverlap <= 0) return 0;
  const rectXOverlap = Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left);
  if (rectXOverlap <= 0) return 0;
  return rectXOverlap * rectYOverlap;
}
__name(getRectOverlapArea, "getRectOverlapArea");
function getRectArea(rect) {
  return rect.width * rect.height;
}
__name(getRectArea, "getRectArea");
function traceRectToLHRect(rect) {
  const rectArgs = {
    x: rect[0],
    y: rect[1],
    width: rect[2],
    height: rect[3]
  };
  return addRectTopAndBottom(rectArgs);
}
__name(traceRectToLHRect, "traceRectToLHRect");

// node_modules/lighthouse/core/lib/polyfill-dom-rect.js
function polyfillDOMRect() {
  (function(global2) {
    function number(v) {
      return v === void 0 ? 0 : Number(v);
    }
    __name(number, "number");
    function different(u, v) {
      return u !== v && !(isNaN(u) && isNaN(v));
    }
    __name(different, "different");
    function DOMRect(xArg, yArg, wArg, hArg) {
      let x, y, width, height, left, right, top, bottom;
      x = number(xArg);
      y = number(yArg);
      width = number(wArg);
      height = number(hArg);
      Object.defineProperties(this, {
        x: {
          get: /* @__PURE__ */ __name(function() {
            return x;
          }, "get"),
          set: /* @__PURE__ */ __name(function(newX) {
            if (different(x, newX)) {
              x = newX;
              left = right = void 0;
            }
          }, "set"),
          enumerable: true
        },
        y: {
          get: /* @__PURE__ */ __name(function() {
            return y;
          }, "get"),
          set: /* @__PURE__ */ __name(function(newY) {
            if (different(y, newY)) {
              y = newY;
              top = bottom = void 0;
            }
          }, "set"),
          enumerable: true
        },
        width: {
          get: /* @__PURE__ */ __name(function() {
            return width;
          }, "get"),
          set: /* @__PURE__ */ __name(function(newWidth) {
            if (different(width, newWidth)) {
              width = newWidth;
              left = right = void 0;
            }
          }, "set"),
          enumerable: true
        },
        height: {
          get: /* @__PURE__ */ __name(function() {
            return height;
          }, "get"),
          set: /* @__PURE__ */ __name(function(newHeight) {
            if (different(height, newHeight)) {
              height = newHeight;
              top = bottom = void 0;
            }
          }, "set"),
          enumerable: true
        },
        left: {
          get: /* @__PURE__ */ __name(function() {
            if (left === void 0) {
              left = x + Math.min(0, width);
            }
            return left;
          }, "get"),
          enumerable: true
        },
        right: {
          get: /* @__PURE__ */ __name(function() {
            if (right === void 0) {
              right = x + Math.max(0, width);
            }
            return right;
          }, "get"),
          enumerable: true
        },
        top: {
          get: /* @__PURE__ */ __name(function() {
            if (top === void 0) {
              top = y + Math.min(0, height);
            }
            return top;
          }, "get"),
          enumerable: true
        },
        bottom: {
          get: /* @__PURE__ */ __name(function() {
            if (bottom === void 0) {
              bottom = y + Math.max(0, height);
            }
            return bottom;
          }, "get"),
          enumerable: true
        }
      });
    }
    __name(DOMRect, "DOMRect");
    globalThis.DOMRect = DOMRect;
  })(globalThis);
}
__name(polyfillDOMRect, "polyfillDOMRect");

// node_modules/lighthouse/core/lib/trace-engine.js
polyfillDOMRect();
var TraceProcessor2 = Processor_exports.TraceProcessor;
var TraceHandlers = handlers_exports.ModelHandlers;
var Insights = insights_exports;
var Helpers = helpers_exports;

// node_modules/lighthouse/core/computed/metrics/cumulative-layout-shift.js
var RECENT_INPUT_WINDOW = 500;
var CumulativeLayoutShift = class _CumulativeLayoutShift {
  static {
    __name(this, "CumulativeLayoutShift");
  }
  /**
   * Returns all LayoutShift events that had no recent input.
   * Only a `weightedScore` per event is returned. For non-main-frame events, this is
   * the only score that matters. For main-frame events, `weighted_score_delta === score`.
   * @see https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/layout/layout_shift_tracker.cc;l=492-495;drc=de3b3a8a8839269c6b44403fa38a13a1ed12fed5
   * @param {LH.Artifacts.ProcessedTrace} processedTrace
   * @return {Array<LayoutShiftEvent>}
   */
  static getLayoutShiftEvents(processedTrace) {
    const layoutShiftEvents = [];
    let mustRespectHadRecentInput = false;
    let viewportChangeTs = processedTrace.timestamps.timeOrigin;
    const firstViewportEvent = processedTrace.frameEvents.find((event) => event.name === "viewport");
    if (firstViewportEvent) {
      viewportChangeTs = firstViewportEvent.ts;
    }
    for (const event of processedTrace.frameTreeEvents) {
      if (event.name !== "LayoutShift" || !event.args.data || event.args.data.is_main_frame === void 0) {
        continue;
      }
      if (event.args.data.weighted_score_delta === void 0) {
        throw new Error("CLS missing weighted_score_delta");
      }
      if (event.args.data.had_recent_input) {
        const timing = (event.ts - viewportChangeTs) / 1e3;
        if (timing > RECENT_INPUT_WINDOW || mustRespectHadRecentInput) continue;
      } else {
        mustRespectHadRecentInput = true;
      }
      layoutShiftEvents.push({
        ts: event.ts,
        isMainFrame: event.args.data.is_main_frame,
        weightedScore: event.args.data.weighted_score_delta,
        impactedNodes: event.args.data.impacted_nodes,
        event
      });
    }
    return layoutShiftEvents;
  }
  /**
   * Each layout shift event has a 'score' which is the amount added to the CLS as a result of the given shift(s).
   * We calculate the score per element by taking the 'score' of each layout shift event and
   * distributing it between all the nodes that were shifted, proportianal to the impact region of
   * each shifted element.
   *
   * @param {LayoutShiftEvent[]} layoutShiftEvents
   * @return {Map<number, number>}
   */
  static getImpactByNodeId(layoutShiftEvents) {
    const impactByNodeId = /* @__PURE__ */ new Map();
    for (const event of layoutShiftEvents) {
      if (!event.impactedNodes) continue;
      let totalAreaOfImpact = 0;
      const pixelsMovedPerNode = /* @__PURE__ */ new Map();
      for (const node of event.impactedNodes) {
        if (!node.node_id || !node.old_rect || !node.new_rect) continue;
        const oldRect = traceRectToLHRect(node.old_rect);
        const newRect = traceRectToLHRect(node.new_rect);
        const areaOfImpact = getRectArea(oldRect) + getRectArea(newRect) - getRectOverlapArea(oldRect, newRect);
        pixelsMovedPerNode.set(node.node_id, areaOfImpact);
        totalAreaOfImpact += areaOfImpact;
      }
      for (const [nodeId, pixelsMoved] of pixelsMovedPerNode.entries()) {
        let clsContribution = impactByNodeId.get(nodeId) || 0;
        clsContribution += pixelsMoved / totalAreaOfImpact * event.weightedScore;
        impactByNodeId.set(nodeId, clsContribution);
      }
    }
    return impactByNodeId;
  }
  /**
   * Calculates cumulative layout shifts per cluster (session) of LayoutShift
   * events -- where a new cluster is created when there's a gap of more than
   * 1000ms since the last LayoutShift event or the cluster is greater than
   * 5000ms long -- and returns the max LayoutShift score found.
   * @param {Array<LayoutShiftEvent>} layoutShiftEvents
   * @return {number}
   */
  static calculate(layoutShiftEvents) {
    const gapMicroseconds = 1e6;
    const limitMicroseconds = 5e6;
    let maxScore = 0;
    let currentClusterScore = 0;
    let firstTs = Number.NEGATIVE_INFINITY;
    let prevTs = Number.NEGATIVE_INFINITY;
    for (const event of layoutShiftEvents) {
      if (event.ts - firstTs > limitMicroseconds || event.ts - prevTs > gapMicroseconds) {
        firstTs = event.ts;
        currentClusterScore = 0;
      }
      prevTs = event.ts;
      currentClusterScore += event.weightedScore;
      maxScore = Math.max(maxScore, currentClusterScore);
    }
    return maxScore;
  }
  /**
   * @param {LayoutShiftEvent[]} allFrameShiftEvents
   * @param {LayoutShiftEvent[]} mainFrameShiftEvents
   */
  static async computeWithSharedTraceEngine(allFrameShiftEvents, mainFrameShiftEvents) {
    const run = /* @__PURE__ */ __name(async (events) => {
      const processor = new TraceProcessor2({
        LayoutShifts: TraceHandlers.LayoutShifts,
        Screenshots: TraceHandlers.Screenshots
      });
      await processor.parse(
        /** @type {import('@paulirish/trace_engine').Types.Events.Event[]} */
        events,
        {}
      );
      if (!processor.parsedTrace) {
        throw new Error("null trace engine result");
      }
      return processor.parsedTrace.LayoutShifts.sessionMaxScore;
    }, "run");
    const cumulativeLayoutShift = await run(allFrameShiftEvents.map((e) => e.event));
    const cumulativeLayoutShiftMainFrame = await run(mainFrameShiftEvents.map((e) => e.event));
    return { cumulativeLayoutShift, cumulativeLayoutShiftMainFrame };
  }
  /**
   * @param {LH.Trace} trace
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<{cumulativeLayoutShift: number, cumulativeLayoutShiftMainFrame: number, impactByNodeId: Map<number, number>, newEngineResult?: {cumulativeLayoutShift: number, cumulativeLayoutShiftMainFrame: number}, newEngineResultDiffered: boolean}>}
   */
  static async compute_(trace, context) {
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const allFrameShiftEvents = _CumulativeLayoutShift.getLayoutShiftEvents(processedTrace);
    const impactByNodeId = _CumulativeLayoutShift.getImpactByNodeId(allFrameShiftEvents);
    const mainFrameShiftEvents = allFrameShiftEvents.filter((e) => e.isMainFrame);
    const cumulativeLayoutShift = _CumulativeLayoutShift.calculate(allFrameShiftEvents);
    const cumulativeLayoutShiftMainFrame = _CumulativeLayoutShift.calculate(mainFrameShiftEvents);
    let newEngineResult;
    let newEngineResultDiffered = false;
    let tryNewTraceEngine = true;
    if (allFrameShiftEvents.some((e) => e.event.args.data?.had_recent_input)) {
      tryNewTraceEngine = false;
    }
    if (tryNewTraceEngine) {
      try {
        newEngineResult = await this.computeWithSharedTraceEngine(allFrameShiftEvents, mainFrameShiftEvents);
        newEngineResultDiffered = newEngineResult.cumulativeLayoutShift !== cumulativeLayoutShift || newEngineResult.cumulativeLayoutShiftMainFrame !== cumulativeLayoutShiftMainFrame;
        if (newEngineResultDiffered) {
          newEngineResultDiffered = true;
          const expected = JSON.stringify({ cumulativeLayoutShift, cumulativeLayoutShiftMainFrame });
          const got = JSON.stringify(newEngineResult);
          throw new Error(`new trace engine differed. expected: ${expected}, got: ${got}`);
        }
      } catch (err) {
        console.error(err);
        newEngineResultDiffered = true;
        const error = new Error("Error when using new trace engine", { cause: err });
        if (global.expect) {
          throw error;
        } else {
          Sentry.captureException(error, {
            tags: { computed: "new-trace-engine" },
            level: "error",
            extra: {
              // Not sure if Sentry handles `cause`, so just in case add the info in a second place.
              errorMsg: err.toString()
            }
          });
        }
      }
    }
    return {
      cumulativeLayoutShift,
      cumulativeLayoutShiftMainFrame,
      impactByNodeId,
      newEngineResult,
      newEngineResultDiffered
    };
  }
};
var CumulativeLayoutShiftComputed = makeComputedArtifact(CumulativeLayoutShift, null);

// node_modules/lighthouse/core/computed/trace-engine-result.js
var import_SDK = __toESM(require_SDK(), 1);
var TraceEngineResult = class _TraceEngineResult {
  static {
    __name(this, "TraceEngineResult");
  }
  /**
   * @param {LH.TraceEvent[]} _traceEvents
   * @param {LH.Audit.Context['settings']} settings
   * @param {LH.Artifacts['SourceMaps']} SourceMaps
   * @return {Promise<LH.Artifacts.TraceEngineResult>}
   */
  static async runTraceEngine(_traceEvents, settings, SourceMaps) {
    const processor = new TraceProcessor2(TraceHandlers);
    const traceEvents = (
      /** @type {import('@paulirish/trace_engine').Types.Events.Event[]} */
      _traceEvents
    );
    const lanternSettings = {};
    if (settings.throttlingMethod) lanternSettings.throttlingMethod = settings.throttlingMethod;
    if (settings.throttling) lanternSettings.throttling = settings.throttling;
    if (settings.precomputedLanternData) {
      lanternSettings.precomputedLanternData = settings.precomputedLanternData;
    }
    Helpers.SyntheticEvents.SyntheticEventsManager.createAndActivate(traceEvents);
    await processor.parse(traceEvents, {
      logger: {
        start(id) {
          const logId = `lh:computed:TraceEngineResult:${id}`;
          lighthouse_logger_default.time({ msg: `Trace Engine ${id}`, id: logId });
        },
        end(id) {
          const logId = `lh:computed:TraceEngineResult:${id}`;
          lighthouse_logger_default.timeEnd({ msg: `Trace Engine ${id}`, id: logId });
        }
      },
      lanternSettings,
      async resolveSourceMap(params) {
        const sourceMap = SourceMaps.find((sm) => sm.scriptId === params.scriptId);
        if (!sourceMap || !sourceMap.map) {
          return null;
        }
        const compiledUrl = sourceMap.scriptUrl || "compiled.js";
        const mapUrl = sourceMap.sourceMapUrl || "compiled.js.map";
        return new import_SDK.default.SourceMap(compiledUrl, mapUrl, sourceMap.map);
      }
    });
    if (!processor.parsedTrace) throw new Error("No data");
    if (!processor.insights) throw new Error("No insights");
    this.localizeInsights(processor.insights);
    return { parsedTrace: processor.parsedTrace, insights: processor.insights };
  }
  /**
   * Adapts the given DevTools function that returns a localized string to one
   * that returns a LH.IcuMessage.
   *
   * @template {any[]} Args
   * @template {import('../lib/trace-engine.js').DevToolsIcuMessage} Ret
   * @param {ReturnType<i18n.createIcuMessageFn>} str_
   * @param {(...args: Args) => Ret} fn
   * @return {(...args: Args) => LH.IcuMessage}
   */
  static localizeFunction(str_, fn) {
    return (...args) => this.localize(str_, fn(...args));
  }
  /**
   * Converts the input parameters given to `i18nString` usages in DevTools to a
   * LH.IcuMessage.
   *
   * @param {ReturnType<i18n.createIcuMessageFn>} str_
   * @param {import('../lib/trace-engine.js').DevToolsIcuMessage} traceEngineI18nObject
   * @return {LH.IcuMessage}
   */
  static localize(str_, traceEngineI18nObject) {
    let values;
    if (traceEngineI18nObject.values) {
      values = {};
      for (const [key, value] of Object.entries(traceEngineI18nObject.values)) {
        if (value && typeof value === "object" && "__i18nBytes" in value) {
          values[key] = value.__i18nBytes;
        } else if (value && typeof value === "object" && "__i18nMillis" in value) {
          values[key] = `${value.__i18nMillis} ms`;
        } else if (value && typeof value === "object" && "i18nId" in value) {
          values[key] = str_(value.i18nId, value.values).formattedDefault;
        } else {
          values[key] = value;
        }
      }
    }
    return str_(traceEngineI18nObject.i18nId, values);
  }
  /**
   * Recursively finds all DevToolsIcuMessage objects and replaces them with LH.IcuMessage.
   *
   * @param {ReturnType<i18n.createIcuMessageFn>} str_
   * @param {object} object
   */
  static localizeObject(str_, object) {
    function recursiveReplaceLocalizableStrings(obj, cb, seen) {
      if (seen.has(seen)) {
        return;
      }
      seen.add(obj);
      if (obj instanceof Map) {
        for (const [key, value] of obj) {
          if (value && typeof value === "object" && "i18nId" in value) {
            obj.set(key, cb(value));
          } else {
            recursiveReplaceLocalizableStrings(value, cb, seen);
          }
        }
      } else if (obj && typeof obj === "object" && !Array.isArray(obj)) {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          if (value && typeof value === "object" && "i18nId" in value) {
            obj[key] = cb(value);
          } else {
            recursiveReplaceLocalizableStrings(value, cb, seen);
          }
        });
      } else if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          const value = obj[i];
          if (value && typeof value === "object" && "i18nId" in value) {
            obj[i] = cb(value);
          } else {
            recursiveReplaceLocalizableStrings(value, cb, seen);
          }
        }
      }
    }
    __name(recursiveReplaceLocalizableStrings, "recursiveReplaceLocalizableStrings");
    recursiveReplaceLocalizableStrings(object, (traceEngineI18nObject) => {
      let values = traceEngineI18nObject.values;
      if (values) {
        values = structuredClone(values);
        for (const [key, value] of Object.entries(values)) {
          if (value && typeof value === "object" && "__i18nBytes" in value) {
            values[key] = value.__i18nBytes;
          } else if (value && typeof value === "object" && "__i18nMillis" in value) {
            values[key] = `${value.__i18nMillis} ms`;
          } else if (value && typeof value === "object" && "i18nId" in value) {
            values[key] = str_(value.i18nId, value.values).formattedDefault;
          }
        }
      }
      return str_(traceEngineI18nObject.i18nId, values);
    }, /* @__PURE__ */ new Set());
  }
  /**
   * @param {import('@paulirish/trace_engine/models/trace/insights/types.js').TraceInsightSets} insightSets
   */
  static localizeInsights(insightSets) {
    for (const insightSet of insightSets.values()) {
      for (const [name, model] of Object.entries(insightSet.model)) {
        if (model instanceof Error) {
          continue;
        }
        let traceEngineUIStrings;
        if (name in Insights.Models) {
          const nameAsKey = (
            /** @type {keyof typeof TraceEngine.Insights.Models} */
            name
          );
          traceEngineUIStrings = Insights.Models[nameAsKey].UIStrings;
        } else {
          throw new Error(`insight missing UIStrings: ${name}`);
        }
        const key = `node_modules/@paulirish/trace_engine/models/trace/insights/${name}.js`;
        const str_ = createIcuMessageFn(key, traceEngineUIStrings);
        this.localizeObject(str_, model);
      }
    }
  }
  /**
   * @param {{trace: LH.Trace, settings: LH.Audit.Context['settings'], SourceMaps: LH.Artifacts['SourceMaps']}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.TraceEngineResult>}
   */
  static async compute_(data, context) {
    const processedTrace = await ProcessedTraceComputed.request(data.trace, context);
    const layoutShiftEvents = new Set(
      CumulativeLayoutShiftComputed.getLayoutShiftEvents(processedTrace).map((e) => e.event)
    );
    const traceEvents = [...data.trace.traceEvents];
    for (let i = 0; i < traceEvents.length; i++) {
      let event = traceEvents[i];
      if (event.name !== "LayoutShift") continue;
      if (!event.args.data) continue;
      const isConsidered = layoutShiftEvents.has(event);
      if (event.args.data.had_recent_input && isConsidered) {
        event = JSON.parse(JSON.stringify(event));
        event.args.data.had_recent_input = false;
        traceEvents[i] = event;
      }
    }
    const result = await _TraceEngineResult.runTraceEngine(traceEvents, data.settings, data.SourceMaps);
    return result;
  }
};
var TraceEngineResultComputed = makeComputedArtifact(TraceEngineResult, ["trace", "settings", "SourceMaps"]);

// node_modules/lighthouse/core/gather/gatherers/trace-elements.js
var MAX_LAYOUT_SHIFTS = 15;
function getNodeDetailsData() {
  const elem = this.nodeType === document.ELEMENT_NODE ? this : this.parentElement;
  let traceElement;
  if (elem) {
    traceElement = { node: getNodeDetails(elem) };
  }
  return traceElement;
}
__name(getNodeDetailsData, "getNodeDetailsData");
var TraceElements = class _TraceElements extends base_gatherer_default {
  static {
    __name(this, "TraceElements");
  }
  /** @type {LH.Gatherer.GathererMeta<'Trace'|'SourceMaps'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { Trace: trace_default.symbol, SourceMaps: source_maps_default.symbol }
  };
  /** @type {Map<string, string>} */
  animationIdToName = /* @__PURE__ */ new Map();
  constructor() {
    super();
    this._onAnimationStarted = this._onAnimationStarted.bind(this);
  }
  /** @param {LH.Crdp.Animation.AnimationStartedEvent} args */
  _onAnimationStarted({ animation: { id, name } }) {
    if (name) this.animationIdToName.set(id, name);
  }
  /**
   * @param {LH.Artifacts.TraceEngineResult} traceEngineResult
   * @param {string|undefined} navigationId
   * @return {Promise<Array<{nodeId: number}>>}
   */
  static async getTraceEngineElements(traceEngineResult, navigationId) {
    const insightSet = [...traceEngineResult.insights.values()].at(-1);
    if (!insightSet) {
      return [];
    }
    if (navigationId) {
      if (insightSet.navigation?.args.data?.navigationId !== navigationId) {
        return [];
      }
    } else {
      if (insightSet.navigation) {
        return [];
      }
    }
    function recursiveObjectEnumerate(obj, cb, seen) {
      if (seen.has(seen)) {
        return;
      }
      seen.add(obj);
      if (obj && typeof obj === "object" && !Array.isArray(obj)) {
        if (obj instanceof Map) {
          for (const [key, val] of obj) {
            if (typeof val === "object") {
              recursiveObjectEnumerate(val, cb, seen);
            } else {
              cb(val, key);
            }
          }
        } else {
          Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "object") {
              recursiveObjectEnumerate(obj[key], cb, seen);
            } else {
              cb(obj[key], key);
            }
          });
        }
      } else if (Array.isArray(obj)) {
        obj.forEach((item) => {
          if (typeof item === "object" || Array.isArray(item)) {
            recursiveObjectEnumerate(item, cb, seen);
          }
        });
      }
    }
    __name(recursiveObjectEnumerate, "recursiveObjectEnumerate");
    const nodeIds = [];
    recursiveObjectEnumerate(insightSet.model, (val, key) => {
      const keys = ["nodeId", "node_id", "backendNodeId"];
      if (typeof val === "number" && keys.includes(key)) {
        nodeIds.push(val);
      }
    }, /* @__PURE__ */ new Set());
    for (const shift of insightSet.model.CLSCulprits.shifts.values()) {
      nodeIds.push(...shift.unsizedImages.map((s) => s.backendNodeId));
    }
    return [...new Set(nodeIds)].map((id) => ({ nodeId: id }));
  }
  /**
   * We want to a single representative node to represent the shift, so let's pick
   * the one with the largest impact (size x distance moved).
   *
   * @param {LH.Artifacts.TraceImpactedNode[]} impactedNodes
   * @param {Map<number, number>} impactByNodeId
   * @return {number|undefined}
   */
  static getBiggestImpactNodeForShiftEvent(impactedNodes, impactByNodeId) {
    let biggestImpactNodeId;
    let biggestImpactNodeScore = Number.NEGATIVE_INFINITY;
    for (const node of impactedNodes) {
      const impactScore = impactByNodeId.get(node.node_id);
      if (impactScore !== void 0 && impactScore > biggestImpactNodeScore) {
        biggestImpactNodeId = node.node_id;
        biggestImpactNodeScore = impactScore;
      }
    }
    return biggestImpactNodeId;
  }
  /**
   * This function finds the top (up to 15) layout shifts on the page, and returns
   * the id of the largest impacted node of each shift, along with any related nodes
   * that may have caused the shift.
   *
   * @param {LH.Trace} trace
   * @param {LH.Artifacts.TraceEngineResult['parsedTrace']} traceEngineResult
   * @param {LH.Gatherer.Context} context
   * @return {Promise<Array<{nodeId: number}>>}
   */
  static async getTopLayoutShifts(trace, traceEngineResult, context) {
    const { impactByNodeId } = await CumulativeLayoutShiftComputed.request(trace, context);
    const clusters = traceEngineResult.LayoutShifts.clusters ?? [];
    const layoutShiftEvents = (
      /** @type {import('../../lib/trace-engine.js').SaneSyntheticLayoutShift[]} */
      clusters.flatMap((c) => c.events)
    );
    return layoutShiftEvents.sort((a, b) => b.args.data.weighted_score_delta - a.args.data.weighted_score_delta).slice(0, MAX_LAYOUT_SHIFTS).flatMap((event) => {
      const nodeIds = [];
      const impactedNodes = event.args.data.impacted_nodes || [];
      const biggestImpactedNodeId = this.getBiggestImpactNodeForShiftEvent(impactedNodes, impactByNodeId);
      if (biggestImpactedNodeId !== void 0) {
        nodeIds.push(biggestImpactedNodeId);
      }
      return nodeIds.map((nodeId) => ({ nodeId }));
    });
  }
  /**
   * @param {LH.Trace} trace
   * @param {LH.Gatherer.Context} context
   * @return {Promise<TraceElementData|undefined>}
   */
  static async getResponsivenessElement(trace, context) {
    const { settings } = context;
    try {
      const responsivenessEvent = await ResponsivenessComputed.request({ trace, settings }, context);
      if (!responsivenessEvent) return;
      return { nodeId: responsivenessEvent.args.data.nodeId };
    } catch {
      return;
    }
  }
  /**
   * Find the node ids of elements which are animated using the Animation trace events.
   * @param {Array<LH.TraceEvent>} mainThreadEvents
   * @return {Promise<Array<TraceElementData>>}
   */
  async getAnimatedElements(mainThreadEvents) {
    const animationPairs = /* @__PURE__ */ new Map();
    for (const event of mainThreadEvents) {
      if (event.name !== "Animation") continue;
      if (!event.id2 || !event.id2.local) continue;
      const local = event.id2.local;
      const pair = animationPairs.get(local) || { begin: void 0, status: void 0 };
      if (event.ph === "b") {
        pair.begin = event;
      } else if (event.ph === "n" && event.args.data && event.args.data.compositeFailed !== void 0) {
        pair.status = event;
      }
      animationPairs.set(local, pair);
    }
    const elementAnimations = /* @__PURE__ */ new Map();
    for (const { begin, status } of animationPairs.values()) {
      const nodeId = begin?.args?.data?.nodeId;
      const animationId = begin?.args?.data?.id;
      const failureReasonsMask = status?.args?.data?.compositeFailed;
      const unsupportedProperties = status?.args?.data?.unsupportedProperties;
      if (!nodeId || !animationId) continue;
      const animationIds = elementAnimations.get(nodeId) || /* @__PURE__ */ new Set();
      animationIds.add({ animationId, failureReasonsMask, unsupportedProperties });
      elementAnimations.set(nodeId, animationIds);
    }
    const animatedElementData = [];
    for (const [nodeId, animationIds] of elementAnimations) {
      const animations = [];
      for (const { animationId, failureReasonsMask, unsupportedProperties } of animationIds) {
        const animationName = this.animationIdToName.get(animationId);
        animations.push({ name: animationName, failureReasonsMask, unsupportedProperties });
      }
      animatedElementData.push({ nodeId, animations });
    }
    return animatedElementData;
  }
  /**
   * @param {LH.Trace} trace
   * @param {LH.Gatherer.Context} context
   * @return {Promise<{nodeId: number, type: string} | undefined>}
   */
  static async getLcpElement(trace, context) {
    let processedNavigation;
    try {
      processedNavigation = await ProcessedNavigationComputed.request(trace, context);
    } catch (err) {
      if (context.gatherMode === "timespan" && err.code === LighthouseError.errors.NO_FCP.code) {
        return;
      }
      throw err;
    }
    const lcpData = processedNavigation.largestContentfulPaintEvt?.args?.data;
    if (lcpData?.nodeId === void 0 || !lcpData.type) return;
    return {
      nodeId: lcpData.nodeId,
      type: lcpData.type
    };
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async startInstrumentation(context) {
    await context.driver.defaultSession.sendCommand("Animation.enable");
    context.driver.defaultSession.on("Animation.animationStarted", this._onAnimationStarted);
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async stopInstrumentation(context) {
    context.driver.defaultSession.off("Animation.animationStarted", this._onAnimationStarted);
    await context.driver.defaultSession.sendCommand("Animation.disable");
  }
  /**
   * @param {LH.Gatherer.ProtocolSession} session
   * @param {number} backendNodeId
   */
  async getNodeDetails(session, backendNodeId) {
    try {
      const objectId = await resolveNodeIdToObjectId(session, backendNodeId);
      if (!objectId) return null;
      const deps = ExecutionContext.serializeDeps([
        pageFunctions.getNodeDetails,
        getNodeDetailsData
      ]);
      return await session.sendCommand("Runtime.callFunctionOn", {
        objectId,
        functionDeclaration: `function () {
          ${deps}
          return getNodeDetailsData.call(this);
        }`,
        returnByValue: true,
        awaitPromise: true
      });
    } catch (err) {
      Sentry.captureException(err, {
        tags: { gatherer: "TraceElements" },
        level: "error"
      });
    }
    return null;
  }
  /**
   * @param {LH.Gatherer.Context<'Trace'|'SourceMaps'>} context
   * @return {Promise<LH.Artifacts.TraceElement[]>}
   */
  async getArtifact(context) {
    const session = context.driver.defaultSession;
    const trace = context.dependencies.Trace;
    const SourceMaps = context.dependencies.SourceMaps;
    const settings = context.settings;
    const traceEngineResult = await TraceEngineResultComputed.request({ trace, settings, SourceMaps }, context);
    const processedTrace = await ProcessedTraceComputed.request(trace, context);
    const { mainThreadEvents } = processedTrace;
    const navigationId = processedTrace.timeOriginEvt.args.data?.navigationId;
    const traceEngineData = await _TraceElements.getTraceEngineElements(
      traceEngineResult,
      navigationId
    );
    const lcpNodeData = await _TraceElements.getLcpElement(trace, context);
    const shiftsData = await _TraceElements.getTopLayoutShifts(
      trace,
      traceEngineResult.parsedTrace,
      context
    );
    const animatedElementData = await this.getAnimatedElements(mainThreadEvents);
    const responsivenessElementData = await _TraceElements.getResponsivenessElement(trace, context);
    const backendNodeDataMap = /* @__PURE__ */ new Map([
      ["trace-engine", traceEngineData],
      ["largest-contentful-paint", lcpNodeData ? [lcpNodeData] : []],
      ["layout-shift", shiftsData],
      ["animation", animatedElementData],
      ["responsiveness", responsivenessElementData ? [responsivenessElementData] : []]
    ]);
    const callFunctionOnCache = /* @__PURE__ */ new Map();
    const traceElements = [];
    for (const [traceEventType, backendNodeData] of backendNodeDataMap) {
      for (let i = 0; i < backendNodeData.length; i++) {
        const backendNodeId = backendNodeData[i].nodeId;
        let response = callFunctionOnCache.get(backendNodeId);
        if (response === void 0) {
          response = await this.getNodeDetails(session, backendNodeId);
          callFunctionOnCache.set(backendNodeId, response);
        }
        if (response?.result?.value) {
          traceElements.push({
            ...response.result.value,
            traceEventType,
            animations: backendNodeData[i].animations,
            nodeId: backendNodeId,
            type: backendNodeData[i].type
          });
        }
      }
    }
    return traceElements;
  }
};
var trace_elements_default = TraceElements;
export {
  trace_elements_default as default
};
/*! Bundled license information:

lighthouse/core/lib/lh-trace-processor.js:
lighthouse/core/computed/processed-trace.js:
lighthouse/core/computed/processed-navigation.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/computed/metrics/responsiveness.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/lib/rect-helpers.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/computed/metrics/cumulative-layout-shift.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/computed/trace-engine-result.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/trace-elements.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
