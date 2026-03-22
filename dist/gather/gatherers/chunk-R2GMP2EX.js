import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  lighthouse_logger_default
} from "./chunk-B4FIMLMR.js";

// node_modules/lighthouse/core/gather/driver/wait-for-condition.js
function waitForFrameNavigated(session) {
  let cancel = () => {
    throw new Error("waitForFrameNavigated.cancel() called before it was defined");
  };
  const promise = new Promise((resolve, reject) => {
    session.once("Page.frameNavigated", resolve);
    cancel = () => {
      session.off("Page.frameNavigated", resolve);
      reject(new Error("Wait for navigated cancelled"));
    };
  });
  return { promise, cancel };
}
function waitForNetworkIdle(session, networkMonitor, networkQuietOptions) {
  let hasDCLFired = false;
  let idleTimeout;
  let cancel = () => {
    throw new Error("waitForNetworkIdle.cancel() called before it was defined");
  };
  const { networkQuietThresholdMs, busyEvent, idleEvent, isIdle } = networkQuietOptions;
  const promise = new Promise((resolve, reject) => {
    const onIdle = () => {
      networkMonitor.once(busyEvent, onBusy);
      idleTimeout = setTimeout(() => {
        cancel();
        resolve();
      }, networkQuietThresholdMs);
    };
    const onBusy = () => {
      networkMonitor.once(idleEvent, onIdle);
      idleTimeout && clearTimeout(idleTimeout);
    };
    const domContentLoadedListener = () => {
      hasDCLFired = true;
      if (isIdle(networkMonitor)) {
        onIdle();
      } else {
        onBusy();
      }
    };
    const logStatus = () => {
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
    };
    networkMonitor.on("requeststarted", logStatus);
    networkMonitor.on("requestfinished", logStatus);
    networkMonitor.on(busyEvent, logStatus);
    if (!networkQuietOptions.pretendDCLAlreadyFired) {
      session.once("Page.domContentEventFired", domContentLoadedListener);
    } else {
      domContentLoadedListener();
    }
    let canceled = false;
    cancel = () => {
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
    };
  });
  return {
    promise,
    cancel
  };
}
function waitForLoadEvent(session, pauseAfterLoadMs) {
  let cancel = () => {
    throw new Error("waitForLoadEvent.cancel() called before it was defined");
  };
  const promise = new Promise((resolve, reject) => {
    let loadTimeout;
    const loadListener = function() {
      loadTimeout = setTimeout(resolve, pauseAfterLoadMs);
    };
    session.once("Page.loadEventFired", loadListener);
    let canceled = false;
    cancel = () => {
      if (canceled) return;
      canceled = true;
      session.off("Page.loadEventFired", loadListener);
      loadTimeout && clearTimeout(loadTimeout);
    };
  });
  return {
    promise,
    cancel
  };
}

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
