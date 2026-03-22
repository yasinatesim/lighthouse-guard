import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  CumulativeLayoutShiftComputed,
  Helpers,
  Insights,
  TraceHandlers,
  TraceProcessor
} from "./chunk-LBG2XUR7.js";
import {
  ProcessedTraceComputed
} from "./chunk-RI7XYKZY.js";
import {
  require_SDK
} from "./chunk-I4AAD5AR.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  createIcuMessageFn
} from "./chunk-4MZOSFEN.js";
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import {
  __name,
  __toESM
} from "./chunk-XE6XARIN.js";

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
    const processor = new TraceProcessor(TraceHandlers);
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

export {
  TraceEngineResultComputed
};
/*! Bundled license information:

lighthouse/core/computed/trace-engine-result.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
