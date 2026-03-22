import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/css-usage.js
var CSSUsage = class extends base_gatherer_default {
  static {
    __name(this, "CSSUsage");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Artifacts['CSSUsage']>}
   */
  async getArtifact(context) {
    const session = context.driver.defaultSession;
    const executionContext = context.driver.executionContext;
    await session.sendCommand("DOM.enable");
    await session.sendCommand("CSS.enable");
    await session.sendCommand("CSS.startRuleUsageTracking");
    await executionContext.evaluate(() => window.getComputedStyle(document.body), {
      args: []
    });
    const { ruleUsage } = await session.sendCommand("CSS.stopRuleUsageTracking");
    await session.sendCommand("CSS.disable");
    await session.sendCommand("DOM.disable");
    return ruleUsage;
  }
};
var css_usage_default = CSSUsage;
export {
  css_usage_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/css-usage.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
