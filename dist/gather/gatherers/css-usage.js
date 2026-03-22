var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/lighthouse/core/gather/base-gatherer.js
var BaseGatherer = class {
  static {
    __name(this, "BaseGatherer");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = { supportedModes: [] };
  /**
   * Method to start observing a page for an arbitrary period of time.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  startInstrumentation(passContext) {
  }
  /**
   * Method to start observing a page when the measurements are very sensitive and
   * should observe as little Lighthouse-induced work as possible.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  startSensitiveInstrumentation(passContext) {
  }
  /**
   * Method to stop observing a page when the measurements are very sensitive and
   * should observe as little Lighthouse-induced work as possible.
   *
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  stopSensitiveInstrumentation(passContext) {
  }
  /**
   * Method to end observing a page after an arbitrary period of time.
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<void>|void}
   */
  stopInstrumentation(passContext) {
  }
  /**
   * Method to gather results about a page.
   * @param {LH.Gatherer.Context} passContext
   * @return {LH.Gatherer.PhaseResult}
   */
  getArtifact(passContext) {
  }
};
var base_gatherer_default = BaseGatherer;

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

lighthouse/types/lh.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/base-gatherer.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/css-usage.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
