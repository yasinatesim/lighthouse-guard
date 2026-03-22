import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  waitForFrameNavigated,
  waitForLoadEvent
} from "./chunk-PGKDD2KL.js";
import "./chunk-2INHUWZH.js";
import "./chunk-GO42M3MA.js";
import "./chunk-VDXIC3K2.js";
import "./chunk-YWWNWPSO.js";
import "./chunk-7CCOEJTA.js";
import "./chunk-GO4LGQT6.js";
import "./chunk-5LGJRNXS.js";
import {
  devtools_log_default
} from "./chunk-2DY3KL3O.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/bf-cache-failures.js
var AFTER_RETURN_TIMEOUT = 100;
var TEMP_PAGE_PAUSE_TIMEOUT = 100;
var BFCacheFailures = class _BFCacheFailures extends base_gatherer_default {
  static {
    __name(this, "BFCacheFailures");
  }
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["navigation", "timespan"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  /**
   * @param {LH.Crdp.Page.BackForwardCacheNotRestoredExplanation[]} errorList
   * @return {LH.Artifacts.BFCacheFailure}
   */
  static processBFCacheEventList(errorList) {
    const notRestoredReasonsTree = {
      Circumstantial: {},
      PageSupportNeeded: {},
      SupportPending: {}
    };
    for (const err of errorList) {
      const bfCacheErrorsMap = notRestoredReasonsTree[err.type];
      bfCacheErrorsMap[err.reason] = [];
    }
    return { notRestoredReasonsTree };
  }
  /**
   * @param {LH.Crdp.Page.BackForwardCacheNotRestoredExplanationTree} errorTree
   * @return {LH.Artifacts.BFCacheFailure}
   */
  static processBFCacheEventTree(errorTree) {
    const notRestoredReasonsTree = {
      Circumstantial: {},
      PageSupportNeeded: {},
      SupportPending: {}
    };
    function traverse(node) {
      for (const error of node.explanations) {
        const bfCacheErrorsMap = notRestoredReasonsTree[error.type];
        const frameUrls = bfCacheErrorsMap[error.reason] || [];
        frameUrls.push(node.url);
        bfCacheErrorsMap[error.reason] = frameUrls;
      }
      for (const child of node.children) {
        traverse(child);
      }
    }
    __name(traverse, "traverse");
    traverse(errorTree);
    return { notRestoredReasonsTree };
  }
  /**
   * @param {LH.Crdp.Page.BackForwardCacheNotUsedEvent|undefined} event
   * @return {LH.Artifacts.BFCacheFailure}
   */
  static processBFCacheEvent(event) {
    if (event?.notRestoredExplanationsTree) {
      return _BFCacheFailures.processBFCacheEventTree(event.notRestoredExplanationsTree);
    }
    return _BFCacheFailures.processBFCacheEventList(event?.notRestoredExplanations || []);
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Crdp.Page.BackForwardCacheNotUsedEvent|undefined>}
   */
  async activelyCollectBFCacheEvent(context) {
    const session = context.driver.defaultSession;
    let bfCacheEvent = void 0;
    function onBfCacheNotUsed(event) {
      bfCacheEvent = event;
    }
    __name(onBfCacheNotUsed, "onBfCacheNotUsed");
    session.on("Page.backForwardCacheNotUsed", onBfCacheNotUsed);
    const history = await session.sendCommand("Page.getNavigationHistory");
    const entry = history.entries[history.currentIndex];
    await Promise.all([
      session.sendCommand("Page.navigate", { url: "chrome://terms" }),
      // DevTools e2e tests can sometimes fail on the next command if we progress too fast.
      // The only reliable way to prevent this is to wait for an arbitrary period of time after load.
      waitForLoadEvent(session, TEMP_PAGE_PAUSE_TIMEOUT).promise
    ]);
    const [, frameNavigatedEvent] = await Promise.all([
      session.sendCommand("Page.navigateToHistoryEntry", { entryId: entry.id }),
      waitForFrameNavigated(session).promise
    ]);
    await new Promise((resolve) => setTimeout(resolve, AFTER_RETURN_TIMEOUT));
    if (frameNavigatedEvent.type !== "BackForwardCacheRestore" && !bfCacheEvent) {
      throw new Error("bfcache failed but the failure reasons were not emitted in time");
    }
    session.off("Page.backForwardCacheNotUsed", onBfCacheNotUsed);
    return bfCacheEvent;
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {LH.Crdp.Page.BackForwardCacheNotUsedEvent[]}
   */
  passivelyCollectBFCacheEvents(context) {
    const events = [];
    for (const event of context.dependencies.DevtoolsLog) {
      if (event.method === "Page.backForwardCacheNotUsed") {
        events.push(event.params);
      }
    }
    return events;
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {Promise<LH.Artifacts['BFCacheFailures']>}
   */
  async getArtifact(context) {
    const events = this.passivelyCollectBFCacheEvents(context);
    if (context.gatherMode === "navigation" && !context.settings.usePassiveGathering) {
      const activelyCollectedEvent = await this.activelyCollectBFCacheEvent(context);
      if (activelyCollectedEvent) events.push(activelyCollectedEvent);
    }
    return events.map(_BFCacheFailures.processBFCacheEvent);
  }
};
var bf_cache_failures_default = BFCacheFailures;
export {
  bf_cache_failures_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/bf-cache-failures.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
