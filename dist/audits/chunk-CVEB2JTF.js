import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  Sentry
} from "./chunk-E5UDU7XN.js";
import {
  ProcessedTraceComputed
} from "./chunk-XFJEV2GR.js";
import {
  Processor_exports,
  handlers_exports,
  helpers_exports,
  insights_exports
} from "./chunk-YOYAIZOW.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

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
var TraceProcessor = Processor_exports.TraceProcessor;
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
      const processor = new TraceProcessor({
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

export {
  TraceProcessor,
  TraceHandlers,
  Insights,
  Helpers,
  CumulativeLayoutShiftComputed
};
/*! Bundled license information:

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
*/
