import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  waitForNetworkIdle
} from "./chunk-YFDNZNKC.js";
import "./chunk-FP565QWJ.js";
import "./chunk-HXOADL7R.js";
import "./chunk-FOYXSDFQ.js";
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
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/lib/emulation.js
function parseUseragentIntoMetadata(userAgent, formFactor) {
  const match = userAgent.match(/Chrome\/([\d.]+)/);
  const fullVersion = match?.[1] || "99.0.1234.0";
  const [version] = fullVersion.split(".", 1);
  const brands = [
    { brand: "Chromium", version },
    { brand: "Google Chrome", version }
  ];
  const motoGPowerDetails = {
    platform: "Android",
    platformVersion: "11.0",
    architecture: "",
    model: "moto g power (2022)"
  };
  const macDesktopDetails = {
    platform: "macOS",
    platformVersion: "10.15.7",
    architecture: "x86",
    model: ""
  };
  const mobile = formFactor === "mobile";
  return {
    brands,
    fullVersion,
    // Since config users can supply a custom useragent, they likely are emulating something
    // other than Moto G Power and MacOS Desktop.
    // TODO: Determine how to thoughtfully expose this metadata/client-hints configurability.
    ...mobile ? motoGPowerDetails : macDesktopDetails,
    mobile
  };
}
__name(parseUseragentIntoMetadata, "parseUseragentIntoMetadata");
async function emulate(session, settings) {
  if (settings.emulatedUserAgent !== false) {
    const userAgent = (
      /** @type {string} */
      settings.emulatedUserAgent
    );
    await session.sendCommand("Network.setUserAgentOverride", {
      userAgent,
      userAgentMetadata: parseUseragentIntoMetadata(userAgent, settings.formFactor)
    });
  }
  if (settings.screenEmulation.disabled !== true) {
    const { width, height, deviceScaleFactor, mobile } = settings.screenEmulation;
    const params = { width, height, deviceScaleFactor, mobile };
    await session.sendCommand("Emulation.setDeviceMetricsOverride", params);
    await session.sendCommand("Emulation.setTouchEmulationEnabled", {
      enabled: params.mobile
    });
  }
}
__name(emulate, "emulate");

// node_modules/lighthouse/core/gather/gatherers/full-page-screenshot.js
var FULL_PAGE_SCREENSHOT_QUALITY = process.env.LH_FPS_TEST ? 100 : 30;
var FULL_PAGE_SCREENSHOT_FORMAT = process.env.LH_FPS_TEST ? "png" : "webp";
var MAX_WEBP_SIZE = 16383;
function kebabCaseToCamelCase(str) {
  return (
    /** @type {LH.Util.KebabToCamelCase<S>} */
    str.replace(/(-\w)/g, (m) => m[1].toUpperCase())
  );
}
__name(kebabCaseToCamelCase, "kebabCaseToCamelCase");
function getObservedDeviceMetrics() {
  const screenOrientationType = kebabCaseToCamelCase(window.screen.orientation.type);
  return {
    width: window.outerWidth,
    height: window.outerHeight,
    screenOrientation: {
      type: screenOrientationType,
      angle: window.screen.orientation.angle
    },
    deviceScaleFactor: window.devicePixelRatio
  };
}
__name(getObservedDeviceMetrics, "getObservedDeviceMetrics");
function waitForDoubleRaf() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}
__name(waitForDoubleRaf, "waitForDoubleRaf");
var FullPageScreenshot = class extends base_gatherer_default {
  static {
    __name(this, "FullPageScreenshot");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "timespan", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} context
   */
  waitForNetworkIdle(context) {
    const session = context.driver.defaultSession;
    const networkMonitor = context.driver.networkMonitor;
    return waitForNetworkIdle(session, networkMonitor, {
      pretendDCLAlreadyFired: true,
      networkQuietThresholdMs: 1e3,
      busyEvent: "network-critical-busy",
      idleEvent: "network-critical-idle",
      isIdle: /* @__PURE__ */ __name((recorder) => recorder.isCriticalIdle(), "isIdle")
    });
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @param {{height: number, width: number, mobile: boolean}} deviceMetrics
   */
  async _resizeViewport(context, deviceMetrics) {
    const session = context.driver.defaultSession;
    const metrics = await session.sendCommand("Page.getLayoutMetrics");
    const fullHeight = Math.round(
      deviceMetrics.height * metrics.cssContentSize.height / metrics.cssLayoutViewport.clientHeight
    );
    const height = Math.min(fullHeight, MAX_WEBP_SIZE);
    const waitForNetworkIdleResult = this.waitForNetworkIdle(context);
    await session.sendCommand("Emulation.setDeviceMetricsOverride", {
      mobile: deviceMetrics.mobile,
      deviceScaleFactor: 1,
      height,
      width: 0
      // Leave width unchanged
    });
    await Promise.race([
      new Promise((resolve) => setTimeout(resolve, 1e3 * 5)),
      waitForNetworkIdleResult.promise
    ]);
    waitForNetworkIdleResult.cancel();
    await context.driver.executionContext.evaluate(waitForDoubleRaf, { args: [] });
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Result.FullPageScreenshot['screenshot']>}
   */
  async _takeScreenshot(context) {
    const [metrics, result] = await Promise.all([
      context.driver.defaultSession.sendCommand("Page.getLayoutMetrics"),
      context.driver.defaultSession.sendCommand("Page.captureScreenshot", {
        format: FULL_PAGE_SCREENSHOT_FORMAT,
        quality: FULL_PAGE_SCREENSHOT_QUALITY
      })
    ]);
    const data = `data:image/${FULL_PAGE_SCREENSHOT_FORMAT};base64,` + result.data;
    return {
      data,
      width: metrics.cssVisualViewport.clientWidth,
      height: metrics.cssVisualViewport.clientHeight
    };
  }
  /**
   * Gatherers can collect details about DOM nodes, including their position on the page.
   * Layout shifts occuring after a gatherer runs can cause these positions to be incorrect,
   * resulting in a poor experience for element screenshots.
   * `getNodeDetails` maintains a collection of DOM objects in the page, which we can iterate
   * to re-collect the bounding client rectangle.
   * @see pageFunctions.getNodeDetails
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Result.FullPageScreenshot['nodes']>}
   */
  async _resolveNodes(context) {
    function resolveNodes() {
      const nodes = {};
      if (!window.__lighthouseNodesDontTouchOrAllVarianceGoesAway) return nodes;
      const lhIdToElements = window.__lighthouseNodesDontTouchOrAllVarianceGoesAway;
      for (const [node, id] of lhIdToElements.entries()) {
        const rect = getBoundingClientRect(node);
        nodes[id] = { id: node.id, ...rect };
      }
      return nodes;
    }
    __name(resolveNodes, "resolveNodes");
    function resolveNodesInPage({ useIsolation }) {
      return context.driver.executionContext.evaluate(resolveNodes, {
        args: [],
        useIsolation,
        deps: [pageFunctions.getBoundingClientRect]
      });
    }
    __name(resolveNodesInPage, "resolveNodesInPage");
    const pageContextResult = await resolveNodesInPage({ useIsolation: false });
    const isolatedContextResult = await resolveNodesInPage({ useIsolation: true });
    return { ...pageContextResult, ...isolatedContextResult };
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Artifacts['FullPageScreenshot']>}
   */
  async getArtifact(context) {
    const session = context.driver.defaultSession;
    const executionContext = context.driver.executionContext;
    const settings = context.settings;
    const lighthouseControlsEmulation = !settings.screenEmulation.disabled;
    const deviceMetrics = { ...settings.screenEmulation };
    try {
      if (!settings.usePassiveGathering) {
        if (!lighthouseControlsEmulation) {
          const observedDeviceMetrics = await executionContext.evaluate(getObservedDeviceMetrics, {
            args: [],
            useIsolation: true,
            deps: [kebabCaseToCamelCase]
          });
          deviceMetrics.height = observedDeviceMetrics.height;
          deviceMetrics.width = observedDeviceMetrics.width;
          deviceMetrics.deviceScaleFactor = observedDeviceMetrics.deviceScaleFactor;
          deviceMetrics.mobile = settings.formFactor === "mobile";
        }
        await this._resizeViewport(context, deviceMetrics);
      }
      const [screenshot, nodes] = await Promise.all([this._takeScreenshot(context), this._resolveNodes(context)]);
      return {
        screenshot,
        nodes
      };
    } finally {
      if (!settings.usePassiveGathering) {
        if (lighthouseControlsEmulation) {
          await emulate(session, settings);
        } else {
          await session.sendCommand("Emulation.setDeviceMetricsOverride", {
            mobile: deviceMetrics.mobile,
            deviceScaleFactor: deviceMetrics.deviceScaleFactor,
            height: deviceMetrics.height,
            width: 0
            // Leave width unchanged
          });
        }
      }
    }
  }
};
var full_page_screenshot_default = FullPageScreenshot;
export {
  full_page_screenshot_default as default
};
/*! Bundled license information:

lighthouse/core/lib/emulation.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/full-page-screenshot.js:
  (**
   * @license Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
