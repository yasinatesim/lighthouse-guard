import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  lighthouse_logger_default
} from "./chunk-VDXIC3K2.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/driver/wait-for-condition.js
function waitForFrameNavigated(session) {
  let cancel = /* @__PURE__ */ __name(() => {
    throw new Error("waitForFrameNavigated.cancel() called before it was defined");
  }, "cancel");
  const promise = new Promise((resolve, reject) => {
    session.once("Page.frameNavigated", resolve);
    cancel = /* @__PURE__ */ __name(() => {
      session.off("Page.frameNavigated", resolve);
      reject(new Error("Wait for navigated cancelled"));
    }, "cancel");
  });
  return { promise, cancel };
}
__name(waitForFrameNavigated, "waitForFrameNavigated");
function waitForNetworkIdle(session, networkMonitor, networkQuietOptions) {
  let hasDCLFired = false;
  let idleTimeout;
  let cancel = /* @__PURE__ */ __name(() => {
    throw new Error("waitForNetworkIdle.cancel() called before it was defined");
  }, "cancel");
  const { networkQuietThresholdMs, busyEvent, idleEvent, isIdle } = networkQuietOptions;
  const promise = new Promise((resolve, reject) => {
    const onIdle = /* @__PURE__ */ __name(() => {
      networkMonitor.once(busyEvent, onBusy);
      idleTimeout = setTimeout(() => {
        cancel();
        resolve();
      }, networkQuietThresholdMs);
    }, "onIdle");
    const onBusy = /* @__PURE__ */ __name(() => {
      networkMonitor.once(idleEvent, onIdle);
      idleTimeout && clearTimeout(idleTimeout);
    }, "onBusy");
    const domContentLoadedListener = /* @__PURE__ */ __name(() => {
      hasDCLFired = true;
      if (isIdle(networkMonitor)) {
        onIdle();
      } else {
        onBusy();
      }
    }, "domContentLoadedListener");
    const logStatus = /* @__PURE__ */ __name(() => {
      if (!hasDCLFired) {
        lighthouse_logger_default.verbose("waitFor", "Waiting on DomContentLoaded");
        return;
      }
      const inflightRecords = networkMonitor.getInflightRequests();
      if (lighthouse_logger_default.isVerbose() && inflightRecords.length < 20 && inflightRecords.length > 0) {
        lighthouse_logger_default.verbose("waitFor", `=== Waiting on ${inflightRecords.length} requests to finish`);
        for (const record of inflightRecords) {
          lighthouse_logger_default.verbose("waitFor", `Waiting on ${record.url.slice(0, 120)} to finish`);
        }
      }
    }, "logStatus");
    networkMonitor.on("requeststarted", logStatus);
    networkMonitor.on("requestfinished", logStatus);
    networkMonitor.on(busyEvent, logStatus);
    if (!networkQuietOptions.pretendDCLAlreadyFired) {
      session.once("Page.domContentEventFired", domContentLoadedListener);
    } else {
      domContentLoadedListener();
    }
    let canceled = false;
    cancel = /* @__PURE__ */ __name(() => {
      if (canceled) return;
      canceled = true;
      if (idleTimeout) clearTimeout(idleTimeout);
      if (!networkQuietOptions.pretendDCLAlreadyFired) {
        session.off("Page.domContentEventFired", domContentLoadedListener);
      }
      networkMonitor.removeListener(busyEvent, onBusy);
      networkMonitor.removeListener(idleEvent, onIdle);
      networkMonitor.removeListener("requeststarted", logStatus);
      networkMonitor.removeListener("requestfinished", logStatus);
      networkMonitor.removeListener(busyEvent, logStatus);
    }, "cancel");
  });
  return {
    promise,
    cancel
  };
}
__name(waitForNetworkIdle, "waitForNetworkIdle");
function waitForLoadEvent(session, pauseAfterLoadMs) {
  let cancel = /* @__PURE__ */ __name(() => {
    throw new Error("waitForLoadEvent.cancel() called before it was defined");
  }, "cancel");
  const promise = new Promise((resolve, reject) => {
    let loadTimeout;
    const loadListener = /* @__PURE__ */ __name(function() {
      loadTimeout = setTimeout(resolve, pauseAfterLoadMs);
    }, "loadListener");
    session.once("Page.loadEventFired", loadListener);
    let canceled = false;
    cancel = /* @__PURE__ */ __name(() => {
      if (canceled) return;
      canceled = true;
      session.off("Page.loadEventFired", loadListener);
      loadTimeout && clearTimeout(loadTimeout);
    }, "cancel");
  });
  return {
    promise,
    cancel
  };
}
__name(waitForLoadEvent, "waitForLoadEvent");

export {
  waitForFrameNavigated,
  waitForNetworkIdle,
  waitForLoadEvent
};
/*! Bundled license information:

lighthouse/core/gather/driver/wait-for-condition.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
