import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  TraceEngineResultComputed
} from "./chunk-TYEYL6JI.js";
import {
  ProcessedTraceComputed
} from "./chunk-XFJEV2GR.js";
import {
  NO_NAVIGATION
} from "./chunk-YOYAIZOW.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-O3YNDXOX.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/insights/insight-audit.js
var str_ = createIcuMessageFn(import.meta.url, {});
async function getInsightSet(artifacts, context) {
  const settings = context.settings;
  const trace = artifacts.Trace;
  const processedTrace = await ProcessedTraceComputed.request(trace, context);
  const SourceMaps = artifacts.SourceMaps;
  const traceEngineResult = await TraceEngineResultComputed.request({ trace, settings, SourceMaps }, context);
  const navigationId = processedTrace.timeOriginEvt.args.data?.navigationId;
  const key = navigationId ?? NO_NAVIGATION;
  const insights = traceEngineResult.insights.get(key);
  return { insights, parsedTrace: traceEngineResult.parsedTrace };
}
__name(getInsightSet, "getInsightSet");
async function adaptInsightToAuditProduct(artifacts, context, insightName, createDetails) {
  const { insights, parsedTrace } = await getInsightSet(artifacts, context);
  if (!insights) {
    return {
      scoreDisplayMode: Audit.SCORING_MODES.NOT_APPLICABLE,
      score: null
    };
  }
  const insight = insights.model[insightName];
  if (insight instanceof Error) {
    return {
      errorMessage: insight.message,
      errorStack: insight.stack,
      score: null
    };
  }
  const cbResult = createDetails(insight, {
    parsedTrace,
    insights
  });
  const warnings = [...insight.warnings ?? []];
  let details;
  if (cbResult && "warnings" in cbResult) {
    details = cbResult.details;
    warnings.push(...cbResult.warnings);
  } else {
    details = cbResult;
  }
  if (!details) {
    return {
      scoreDisplayMode: Audit.SCORING_MODES.NOT_APPLICABLE,
      score: null,
      details
    };
  }
  if (insight.wastedBytes !== void 0) {
    if (!details.debugData) {
      details.debugData = { type: "debugdata" };
    }
    details.debugData.wastedBytes = insight.wastedBytes;
  }
  if (insight.metricSavings) {
    for (const [metric, value] of Object.entries(insight.metricSavings)) {
      if (!Number.isFinite(value)) {
        delete insight.metricSavings[metric];
      }
    }
  }
  let metricSavings = insight.metricSavings;
  if (insight.category === "INP" && !metricSavings?.INP) {
    metricSavings = { ...metricSavings, INP: (
      /** @type {any} */
      0
    ) };
  } else if (insight.category === "CLS" && !metricSavings?.CLS) {
    metricSavings = { ...metricSavings, CLS: (
      /** @type {any} */
      0
    ) };
  } else if (insight.category === "LCP" && !metricSavings?.LCP) {
    metricSavings = { ...metricSavings, LCP: (
      /** @type {any} */
      0
    ) };
  }
  let displayValue;
  if (insight.wastedBytes) {
    displayValue = str_(UIStrings.displayValueByteSavings, { wastedBytes: insight.wastedBytes });
  } else {
    let wastedMs;
    switch (insight.insightKey) {
      case "DocumentLatency":
      case "DuplicatedJavaScript":
      case "FontDisplay":
      case "LegacyJavaScript":
      case "RenderBlocking": {
        wastedMs = metricSavings?.FCP;
        break;
      }
      case "LCPDiscovery":
      case "ModernHTTP": {
        wastedMs = metricSavings?.LCP;
        break;
      }
      case "Viewport": {
        wastedMs = metricSavings?.INP;
        break;
      }
    }
    if (wastedMs) {
      displayValue = str_(UIStrings.displayValueMsSavings, { wastedMs });
    }
  }
  let score;
  let scoreDisplayMode;
  if (insight.state === "fail" || insight.state === "pass") {
    score = insight.state === "fail" ? 0 : 1;
    scoreDisplayMode = insight.metricSavings ? Audit.SCORING_MODES.METRIC_SAVINGS : Audit.SCORING_MODES.NUMERIC;
  } else {
    score = null;
    scoreDisplayMode = Audit.SCORING_MODES.INFORMATIVE;
  }
  return {
    scoreDisplayMode,
    score,
    metricSavings,
    warnings: warnings.length ? warnings : void 0,
    displayValue,
    details
  };
}
__name(adaptInsightToAuditProduct, "adaptInsightToAuditProduct");
function makeNodeItemForNodeId(traceElements, nodeId) {
  if (typeof nodeId !== "number") {
    return;
  }
  const traceElement = traceElements.find((te) => te.traceEventType === "trace-engine" && te.nodeId === nodeId);
  const node = traceElement?.node;
  if (!node) {
    return;
  }
  return Audit.makeNodeItem(node);
}
__name(makeNodeItemForNodeId, "makeNodeItemForNodeId");

export {
  adaptInsightToAuditProduct,
  makeNodeItemForNodeId
};
/*! Bundled license information:

lighthouse/core/audits/insights/insight-audit.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
