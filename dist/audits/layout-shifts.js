import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  cumulative_layout_shift_default
} from "./chunk-WQHAR6GV.js";
import {
  trace_elements_default
} from "./chunk-3I2HPP74.js";
import "./chunk-7SF6R5PV.js";
import "./chunk-ZFITDNXI.js";
import {
  TraceEngineResultComputed
} from "./chunk-HDGMQKEX.js";
import {
  CumulativeLayoutShiftComputed
} from "./chunk-LBG2XUR7.js";
import "./chunk-2DV6G4YM.js";
import "./chunk-EXNQHM7K.js";
import "./chunk-UNPQMFMQ.js";
import "./chunk-RI7XYKZY.js";
import "./chunk-NUK2ASLP.js";
import "./chunk-I4AAD5AR.js";
import "./chunk-AB7S44AE.js";
import "./chunk-CGRNGE5D.js";
import "./chunk-4VECFSJ3.js";
import "./chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-4MZOSFEN.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-7FMDRUEI.js";
import "./chunk-C5HPB2FB.js";
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/layout-shifts.js
var MAX_LAYOUT_SHIFTS = 15;
var UIStrings2 = {
  /** Descriptive title of a diagnostic audit that provides the top elements affected by layout shifts. */
  title: "Avoid large layout shifts",
  /** Description of a diagnostic audit that provides the top elements affected by layout shifts. "windowing" means the metric value is calculated using the subset of events in a small window of time during the run. "normalization" is a good substitute for "windowing". The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "These are the largest layout shifts observed on the page. Each table item represents a single layout shift, and shows the element that shifted the most. Below each item are possible root causes that led to the layout shift. Some of these layout shifts may not be included in the CLS metric value due to [windowing](https://web.dev/articles/cls#what_is_cls). [Learn how to improve CLS](https://web.dev/articles/optimize-cls)",
  /** Label for a column in a data table; entries in this column will be a number representing how large the layout shift was. */
  columnScore: "Layout shift score",
  /** A possible reason why that the layout shift occured. */
  rootCauseUnsizedMedia: "Media element lacking an explicit size",
  /** A possible reason why that the layout shift occured. */
  rootCauseFontChanges: "Web font loaded",
  /** A possible reason why that the layout shift occured. */
  rootCauseInjectedIframe: "Injected iframe",
  /** Label shown per-audit to show how many layout shifts are present. The `{# shifts found}` placeholder will be replaced with the number of layout shifts. */
  displayValueShiftsFound: `{shiftCount, plural, =1 {1 layout shift found} other {# layout shifts found}}`
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var LayoutShifts = class extends Audit {
  static {
    __name(this, "LayoutShifts");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "layout-shifts",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 2,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const settings = context.settings;
    const trace = artifacts.Trace;
    const SourceMaps = artifacts.SourceMaps;
    const traceEngineResult = await TraceEngineResultComputed.request({ trace, settings, SourceMaps }, context);
    const clusters = traceEngineResult.parsedTrace.LayoutShifts.clusters ?? [];
    const { cumulativeLayoutShift: clsSavings, impactByNodeId } = await CumulativeLayoutShiftComputed.request(trace, context);
    const traceElements = artifacts.TraceElements.filter((element) => element.traceEventType === "layout-shift");
    const allRootCauses = {
      layoutShifts: /* @__PURE__ */ new Map()
    };
    for (const insightSet of traceEngineResult.insights.values()) {
      for (const [shift, reasons] of insightSet.model.CLSCulprits.shifts) {
        allRootCauses.layoutShifts.set(shift, reasons);
      }
    }
    const items = [];
    const layoutShiftEvents = (
      /** @type {import('../lib/trace-engine.js').SaneSyntheticLayoutShift[]} */
      clusters.flatMap((c) => c.events).filter((e) => !!e.args.data)
    );
    const topLayoutShiftEvents = layoutShiftEvents.sort((a, b) => b.args.data.weighted_score_delta - a.args.data.weighted_score_delta).slice(0, MAX_LAYOUT_SHIFTS);
    for (const event of topLayoutShiftEvents) {
      const biggestImpactNodeId = trace_elements_default.getBiggestImpactNodeForShiftEvent(
        event.args.data.impacted_nodes || [],
        impactByNodeId
      );
      const biggestImpactElement = traceElements.find((t) => t.nodeId === biggestImpactNodeId);
      const rootCauses = allRootCauses.layoutShifts.get(event);
      const subItems = [];
      if (rootCauses) {
        for (const unsizedImage of rootCauses.unsizedImages) {
          const element = artifacts.TraceElements.find(
            (t) => t.traceEventType === "trace-engine" && t.nodeId === unsizedImage.backendNodeId
          );
          subItems.push({
            extra: element ? Audit.makeNodeItem(element.node) : void 0,
            cause: str_(UIStrings2.rootCauseUnsizedMedia)
          });
        }
        for (const request of rootCauses.webFonts) {
          const url = request.args.data.url;
          subItems.push({
            extra: { type: "url", value: url },
            cause: str_(UIStrings2.rootCauseFontChanges)
          });
        }
        for (const iframe of rootCauses.iframes) {
          subItems.push({
            extra: iframe.url ? { type: "url", value: iframe.url } : void 0,
            cause: str_(UIStrings2.rootCauseInjectedIframe)
          });
        }
      }
      items.push({
        node: biggestImpactElement ? Audit.makeNodeItem(biggestImpactElement.node) : void 0,
        score: event.args.data.weighted_score_delta,
        subItems: subItems.length ? { type: "subitems", items: subItems } : void 0
      });
    }
    const headings = [
      /* eslint-disable max-len */
      { key: "node", valueType: "node", subItemsHeading: { key: "extra" }, label: str_(UIStrings.columnElement) },
      { key: "score", valueType: "numeric", subItemsHeading: { key: "cause", valueType: "text" }, granularity: 1e-3, label: str_(UIStrings2.columnScore) }
      /* eslint-enable max-len */
    ];
    const details = Audit.makeTableDetails(headings, items);
    let displayValue;
    if (items.length > 0) {
      displayValue = str_(
        UIStrings2.displayValueShiftsFound,
        { shiftCount: items.length }
      );
    }
    const passed = clsSavings <= cumulative_layout_shift_default.defaultOptions.p10;
    return {
      score: passed ? 1 : 0,
      scoreDisplayMode: passed ? Audit.SCORING_MODES.INFORMATIVE : void 0,
      metricSavings: {
        CLS: clsSavings
      },
      notApplicable: details.items.length === 0,
      displayValue,
      details
    };
  }
};
var layout_shifts_default = LayoutShifts;
export {
  UIStrings2 as UIStrings,
  layout_shifts_default as default
};
/*! Bundled license information:

lighthouse/core/audits/layout-shifts.js:
  (**
   * @license Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
