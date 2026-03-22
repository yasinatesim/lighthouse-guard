import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  adaptInsightToAuditProduct
} from "../chunk-NTJRD7SM.js";
import "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import "../chunk-2DV6G4YM.js";
import "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import {
  UIStrings16 as UIStrings
} from "../chunk-AB7S44AE.js";
import "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import {
  Audit
} from "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/insights/slow-css-selector-insight.js
var str_ = createIcuMessageFn("node_modules/@paulirish/trace_engine/models/trace/insights/SlowCSSSelector.js", UIStrings);
var SlowCSSSelectorInsight = class extends Audit {
  static {
    __name(this, "SlowCSSSelectorInsight");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "slow-css-selector-insight",
      title: str_(UIStrings.title),
      failureTitle: str_(UIStrings.title),
      description: str_(UIStrings.description),
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "TraceElements", "SourceMaps"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    return adaptInsightToAuditProduct(artifacts, context, "SlowCSSSelector", (insight) => {
      const headings = [];
      const items = [];
      return Audit.makeTableDetails(headings, items);
    });
  }
};
var slow_css_selector_insight_default = SlowCSSSelectorInsight;
export {
  slow_css_selector_insight_default as default
};
/*! Bundled license information:

lighthouse/core/audits/insights/slow-css-selector-insight.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
