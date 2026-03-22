import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
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

// node_modules/lighthouse/core/audits/non-composited-animations.js
var UIStrings2 = {
  /** Title of a diagnostic LH audit that provides details on animations that are not composited. */
  title: "Avoid non-composited animations",
  /** Description of a diagnostic LH audit that shows the user animations that are not composited. Janky means frames may be skipped and the animation will look bad. Acceptable alternatives here might be 'poor', or 'slow'. */
  description: "Animations which are not composited can be janky and increase CLS. [Learn how to avoid non-composited animations](https://developer.chrome.com/docs/lighthouse/performance/non-composited-animations/)",
  /** [ICU Syntax] Label identifying the number of animated elements that are not composited. */
  displayValue: `{itemCount, plural,
  =1 {# animated element found}
  other {# animated elements found}
  }`,
  /**
   * @description [ICU Syntax] Descriptive reason for why a user-provided animation failed to be optimized by the browser due to the animated CSS property not being supported on the compositor. Shown in a table with a list of other potential failure reasons.
   * @example {height, width} properties
   */
  unsupportedCSSProperty: `{propertyCount, plural,
    =1 {Unsupported CSS Property: {properties}}
    other {Unsupported CSS Properties: {properties}}
  }`,
  /**
   * @description [ICU Syntax] Descriptive reason for why a user-provided animation failed to be optimized by the browser due to custom CSS properties (CSS variables) not being supported on the compositor. Shown in a table with a list of other potential failure reasons.
   * @example {--swing-y, --rotation} properties
   */
  unsupportedCustomCSSProperty: `{propertyCount, plural,
    =1 {Custom CSS properties cannot be animated on the compositor: {properties}}
    other {Custom CSS properties cannot be animated on the compositor: {properties}}
  }`,
  /** Descriptive reason for why a user-provided animation failed to be optimized by the browser due to a `transform` property being dependent on the size of the element itself. Shown in a table with a list of other potential failure reasons.  */
  transformDependsBoxSize: "Transform-related property depends on box size",
  /** Descriptive reason for why a user-provided animation failed to be optimized by the browser due to a `filter` property possibly moving pixels. Shown in a table with a list of other potential failure reasons.  */
  filterMayMovePixels: "Filter-related property may move pixels",
  /** Descriptive reason for why a user-provided animation failed to be optimized by the browser due to an effect having a composite mode which is not `replace`. Shown in a table with a list of other potential failure reasons.  */
  nonReplaceCompositeMode: 'Effect has composite mode other than "replace"',
  /** Descriptive reason for why a user-provided animation failed to be optimized by the browser due to another animation on the same target being incompatible. Shown in a table with a list of other potential failure reasons.  */
  incompatibleAnimations: "Target has another animation which is incompatible",
  /** Descriptive reason for why a user-provided animation failed to be optimized by the browser due to an effect having unsupported timing parameters. Shown in a table with a list of other potential failure reasons.  */
  unsupportedTimingParameters: "Effect has unsupported timing parameters"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var ACTIONABLE_FAILURE_REASONS = [
  {
    flag: 1 << 13,
    text: UIStrings2.unsupportedCSSProperty
  },
  {
    flag: 1 << 11,
    text: UIStrings2.transformDependsBoxSize
  },
  {
    flag: 1 << 12,
    text: UIStrings2.filterMayMovePixels
  },
  {
    flag: 1 << 4,
    text: UIStrings2.nonReplaceCompositeMode
  },
  {
    flag: 1 << 6,
    text: UIStrings2.incompatibleAnimations
  },
  {
    flag: 1 << 3,
    text: UIStrings2.unsupportedTimingParameters
  }
];
function getActionableFailureReasons(failureCode, unsupportedProperties) {
  return ACTIONABLE_FAILURE_REASONS.filter((reason) => failureCode & reason.flag).map((reason) => {
    if (reason.text === UIStrings2.unsupportedCSSProperty) {
      const customProperties = /* @__PURE__ */ new Set();
      const nonCustomProperties = /* @__PURE__ */ new Set();
      for (const property of unsupportedProperties) {
        if (property.startsWith("--")) {
          customProperties.add(property);
        } else {
          nonCustomProperties.add(property);
        }
      }
      const reasons = [];
      if (nonCustomProperties.size > 0) {
        reasons.push(str_(UIStrings2.unsupportedCSSProperty, {
          propertyCount: nonCustomProperties.size,
          properties: Array.from(nonCustomProperties).join(", ")
        }));
      }
      if (customProperties.size > 0) {
        reasons.push(str_(UIStrings2.unsupportedCustomCSSProperty, {
          propertyCount: customProperties.size,
          properties: Array.from(customProperties).join(", ")
        }));
      }
      return reasons;
    }
    return str_(reason.text);
  }).flat();
}
__name(getActionableFailureReasons, "getActionableFailureReasons");
var NonCompositedAnimations = class extends Audit {
  static {
    __name(this, "NonCompositedAnimations");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "non-composited-animations",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      guidanceLevel: 2,
      requiredArtifacts: ["TraceElements", "HostUserAgent"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts) {
    const match = artifacts.HostUserAgent.match(/Chrome\/(\d+)/);
    if (!match || Number(match[1]) < 86) {
      return {
        score: 1,
        notApplicable: true,
        metricSavings: { CLS: 0 }
      };
    }
    const results = [];
    let shouldAddAnimationNameColumn = false;
    artifacts.TraceElements.forEach((element) => {
      if (element.traceEventType !== "animation") return;
      const animations = element.animations || [];
      const animationReasons = /* @__PURE__ */ new Map();
      for (const { name, failureReasonsMask, unsupportedProperties } of animations) {
        if (!failureReasonsMask) continue;
        const failureReasons = getActionableFailureReasons(failureReasonsMask, unsupportedProperties || []);
        for (const failureReason of failureReasons) {
          if (name) {
            shouldAddAnimationNameColumn = true;
          }
          const reasons = animationReasons.get(name) || /* @__PURE__ */ new Set();
          reasons.add(failureReason);
          animationReasons.set(name, reasons);
        }
      }
      if (!animationReasons.size) return;
      const allFailureReasons = [];
      for (const [name, reasons] of animationReasons) {
        for (const failureReason of reasons) {
          allFailureReasons.push({
            failureReason,
            animation: name
          });
        }
      }
      results.push({
        node: Audit.makeNodeItem(element.node),
        subItems: {
          type: "subitems",
          items: allFailureReasons
        }
      });
    });
    const headings = [
      /* eslint-disable max-len */
      { key: "node", valueType: "node", subItemsHeading: { key: "failureReason", valueType: "text" }, label: str_(UIStrings.columnElement) }
      /* eslint-enable max-len */
    ];
    if (shouldAddAnimationNameColumn) {
      headings.push(
        /* eslint-disable max-len */
        { key: null, valueType: "text", subItemsHeading: { key: "animation", valueType: "text" }, label: str_(UIStrings.columnName) }
        /* eslint-enable max-len */
      );
    }
    const details = Audit.makeTableDetails(headings, results);
    let displayValue;
    if (results.length > 0) {
      displayValue = str_(UIStrings2.displayValue, { itemCount: results.length });
    }
    return {
      score: results.length === 0 ? 1 : 0,
      notApplicable: results.length === 0,
      metricSavings: {
        // We do not have enough information to accurately predict the impact of individual animations on CLS.
        // It is also not worth the effort since only a small percentage of sites have their CLS affected by non-composited animations.
        // https://github.com/GoogleChrome/lighthouse/pull/15099#issuecomment-1558107906
        CLS: 0
      },
      details,
      displayValue
    };
  }
};
var non_composited_animations_default = NonCompositedAnimations;
export {
  UIStrings2 as UIStrings,
  non_composited_animations_default as default
};
/*! Bundled license information:

lighthouse/core/audits/non-composited-animations.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
