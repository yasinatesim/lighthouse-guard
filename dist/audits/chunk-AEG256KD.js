import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  LanternInteractiveComputed
} from "./chunk-SPBZCMTA.js";
import {
  NavigationMetric
} from "./chunk-E4NYJWSQ.js";
import {
  TraceProcessor
} from "./chunk-NUK2ASLP.js";
import {
  NetworkRecorder,
  NetworkRequest
} from "./chunk-AB7S44AE.js";
import {
  url_utils_default
} from "./chunk-CGRNGE5D.js";
import {
  LighthouseError
} from "./chunk-4VECFSJ3.js";
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/driver/network-monitor.js
import { EventEmitter } from "events";
var NetworkMonitorEventEmitter = (
  /** @type {NetworkMonitorEmitter} */
  EventEmitter
);
var NetworkMonitor = class extends NetworkMonitorEventEmitter {
  static {
    __name(this, "NetworkMonitor");
  }
  /** @type {NetworkRecorder|undefined} */
  _networkRecorder = void 0;
  /** @type {Array<LH.Crdp.Page.Frame>} */
  _frameNavigations = [];
  /** @param {LH.Gatherer.Driver['targetManager']} targetManager */
  constructor(targetManager) {
    super();
    this._targetManager = targetManager;
    this._session = targetManager.rootSession();
    this._onFrameNavigated = (event) => this._frameNavigations.push(event.frame);
    this._onProtocolMessage = (event) => {
      if (!this._networkRecorder) return;
      this._networkRecorder.dispatch(event);
    };
  }
  /**
   * @return {Promise<void>}
   */
  async enable() {
    if (this._networkRecorder) return;
    this._frameNavigations = [];
    this._networkRecorder = new NetworkRecorder();
    const reEmit = /* @__PURE__ */ __name((event) => (r) => {
      this.emit(event, r);
      this._emitNetworkStatus();
    }, "reEmit");
    this._networkRecorder.on("requeststarted", reEmit("requeststarted"));
    this._networkRecorder.on("requestfinished", reEmit("requestfinished"));
    this._session.on("Page.frameNavigated", this._onFrameNavigated);
    this._targetManager.on("protocolevent", this._onProtocolMessage);
  }
  /**
   * @return {Promise<void>}
   */
  async disable() {
    if (!this._networkRecorder) return;
    this._session.off("Page.frameNavigated", this._onFrameNavigated);
    this._targetManager.off("protocolevent", this._onProtocolMessage);
    this._frameNavigations = [];
    this._networkRecorder = void 0;
  }
  /** @return {Promise<{requestedUrl?: string, mainDocumentUrl?: string}>} */
  async getNavigationUrls() {
    const frameNavigations = this._frameNavigations;
    if (!frameNavigations.length) return {};
    const mainFrameNavigations = frameNavigations.filter((frame) => !frame.parentId);
    if (!mainFrameNavigations.length) lighthouse_logger_default.warn("NetworkMonitor", "No detected navigations");
    let requestedUrl = mainFrameNavigations[0]?.url;
    if (this._networkRecorder) {
      const records = this._networkRecorder.getRawRecords();
      let initialUrlRequest = records.find((record) => record.url === requestedUrl);
      while (initialUrlRequest?.redirectSource) {
        initialUrlRequest = initialUrlRequest.redirectSource;
        requestedUrl = initialUrlRequest.url;
      }
    }
    return {
      requestedUrl,
      mainDocumentUrl: mainFrameNavigations[mainFrameNavigations.length - 1]?.url
    };
  }
  /**
   * @return {Array<NetworkRequest>}
   */
  getInflightRequests() {
    if (!this._networkRecorder) return [];
    return this._networkRecorder.getRawRecords().filter((request) => !request.finished);
  }
  /**
   * Returns whether the network is completely idle (i.e. there are 0 inflight network requests).
   */
  isIdle() {
    return this._isIdlePeriod(0);
  }
  /**
   * Returns whether any important resources for the page are in progress.
   * Above-the-fold images and XHRs should be included.
   * Tracking pixels, low priority images, and cross frame requests should be excluded.
   * @return {boolean}
   */
  isCriticalIdle() {
    if (!this._networkRecorder) return false;
    const requests = this._networkRecorder.getRawRecords();
    const rootFrameRequest = requests.find((r) => r.resourceType === "Document");
    const rootFrameId = rootFrameRequest?.frameId;
    return this._isIdlePeriod(
      0,
      // Return true if it should be a candidate for critical.
      (request) => request.frameId === rootFrameId && // WebSocket and Server-sent Events are typically long-lived and shouldn't be considered critical.
      request.resourceType !== "WebSocket" && request.resourceType !== "EventSource" && (request.priority === "VeryHigh" || request.priority === "High")
    );
  }
  /**
   * Returns whether the network is semi-idle (i.e. there are 2 or fewer inflight network requests).
   */
  is2Idle() {
    return this._isIdlePeriod(2);
  }
  /**
   * Returns whether the number of currently inflight requests is less than or
   * equal to the number of allowed concurrent requests.
   * @param {number} allowedRequests
   * @param {(request: NetworkRequest) => boolean} [requestFilter]
   * @return {boolean}
   */
  _isIdlePeriod(allowedRequests, requestFilter) {
    if (!this._networkRecorder) return false;
    const requests = this._networkRecorder.getRawRecords();
    let inflightRequests = 0;
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      if (request.finished) continue;
      if (requestFilter?.(request) === false) continue;
      if (NetworkRequest.isNonNetworkRequest(request)) continue;
      inflightRequests++;
    }
    return inflightRequests <= allowedRequests;
  }
  /**
   * Emits the appropriate network status event.
   */
  _emitNetworkStatus() {
    const zeroQuiet = this.isIdle();
    const twoQuiet = this.is2Idle();
    const criticalQuiet = this.isCriticalIdle();
    this.emit(zeroQuiet ? "networkidle" : "networkbusy");
    this.emit(twoQuiet ? "network-2-idle" : "network-2-busy");
    this.emit(criticalQuiet ? "network-critical-idle" : "network-critical-busy");
    if (twoQuiet && zeroQuiet) lighthouse_logger_default.verbose("NetworkRecorder", "network fully-quiet");
    else if (twoQuiet && !zeroQuiet) lighthouse_logger_default.verbose("NetworkRecorder", "network semi-quiet");
    else lighthouse_logger_default.verbose("NetworkRecorder", "network busy");
  }
  /**
   * Finds all time periods where the number of inflight requests is less than or equal to the
   * number of allowed concurrent requests.
   * The time periods returned are in ms.
   * @param {Array<LH.Artifacts.NetworkRequest>} requests
   * @param {number} allowedConcurrentRequests
   * @param {number=} endTime In ms
   * @return {Array<{start: number, end: number}>}
   */
  static findNetworkQuietPeriods(requests, allowedConcurrentRequests, endTime = Infinity) {
    let timeBoundaries = [];
    requests.forEach((request) => {
      if (url_utils_default.isNonNetworkProtocol(request.protocol)) return;
      if (request.protocol === "ws" || request.protocol === "wss") return;
      timeBoundaries.push({ time: request.networkRequestTime, isStart: true });
      if (request.finished) {
        timeBoundaries.push({ time: request.networkEndTime, isStart: false });
      }
    });
    timeBoundaries = timeBoundaries.filter((boundary) => boundary.time <= endTime).sort((a, b) => a.time - b.time);
    let numInflightRequests = 0;
    let quietPeriodStart = 0;
    const quietPeriods = [];
    timeBoundaries.forEach((boundary) => {
      if (boundary.isStart) {
        if (numInflightRequests === allowedConcurrentRequests) {
          quietPeriods.push({ start: quietPeriodStart, end: boundary.time });
        }
        numInflightRequests++;
      } else {
        numInflightRequests--;
        if (numInflightRequests === allowedConcurrentRequests) {
          quietPeriodStart = boundary.time;
        }
      }
    });
    if (numInflightRequests <= allowedConcurrentRequests) {
      quietPeriods.push({ start: quietPeriodStart, end: endTime });
    }
    return quietPeriods.filter((period) => period.start !== period.end);
  }
};

// node_modules/lighthouse/core/computed/metrics/interactive.js
var REQUIRED_QUIET_WINDOW = 5e3;
var ALLOWED_CONCURRENT_REQUESTS = 2;
var Interactive = class _Interactive extends NavigationMetric {
  static {
    __name(this, "Interactive");
  }
  /**
   * Finds all time periods where the number of inflight requests is less than or equal to the
   * number of allowed concurrent requests (2).
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {{timestamps: {traceEnd: number}}} processedNavigation
   * @return {Array<TimePeriod>}
   */
  static _findNetworkQuietPeriods(networkRecords, processedNavigation) {
    const traceEndTsInMs = processedNavigation.timestamps.traceEnd / 1e3;
    const filteredNetworkRecords = networkRecords.filter((record) => {
      return record.finished && record.requestMethod === "GET" && !record.failed && // Consider network records that had 4xx/5xx status code as "failed"
      record.statusCode < 400;
    });
    return NetworkMonitor.findNetworkQuietPeriods(
      filteredNetworkRecords,
      ALLOWED_CONCURRENT_REQUESTS,
      traceEndTsInMs
    );
  }
  /**
   * Finds all time periods where there are no long tasks.
   * @param {Array<TimePeriod>} longTasks
   * @param {{timestamps: {timeOrigin: number, traceEnd: number}}} processedNavigation
   * @return {Array<TimePeriod>}
   */
  static _findCPUQuietPeriods(longTasks, processedNavigation) {
    const timeOriginTsInMs = processedNavigation.timestamps.timeOrigin / 1e3;
    const traceEndTsInMs = processedNavigation.timestamps.traceEnd / 1e3;
    if (longTasks.length === 0) {
      return [{ start: 0, end: traceEndTsInMs }];
    }
    const quietPeriods = [];
    longTasks.forEach((task, index) => {
      if (index === 0) {
        quietPeriods.push({
          start: 0,
          end: task.start + timeOriginTsInMs
        });
      }
      if (index === longTasks.length - 1) {
        quietPeriods.push({
          start: task.end + timeOriginTsInMs,
          end: traceEndTsInMs
        });
      } else {
        quietPeriods.push({
          start: task.end + timeOriginTsInMs,
          end: longTasks[index + 1].start + timeOriginTsInMs
        });
      }
    });
    return quietPeriods;
  }
  /**
   * Finds the first time period where a network quiet period and a CPU quiet period overlap.
   * @param {Array<TimePeriod>} longTasks
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Artifacts.ProcessedNavigation} processedNavigation
   * @return {{cpuQuietPeriod: TimePeriod, networkQuietPeriod: TimePeriod, cpuQuietPeriods: Array<TimePeriod>, networkQuietPeriods: Array<TimePeriod>}}
   */
  static findOverlappingQuietPeriods(longTasks, networkRecords, processedNavigation) {
    const FcpTsInMs = processedNavigation.timestamps.firstContentfulPaint / 1e3;
    const isLongEnoughQuietPeriod = /* @__PURE__ */ __name((period) => period.end > FcpTsInMs + REQUIRED_QUIET_WINDOW && period.end - period.start >= REQUIRED_QUIET_WINDOW, "isLongEnoughQuietPeriod");
    const networkQuietPeriods = this._findNetworkQuietPeriods(networkRecords, processedNavigation).filter(isLongEnoughQuietPeriod);
    const cpuQuietPeriods = this._findCPUQuietPeriods(longTasks, processedNavigation).filter(isLongEnoughQuietPeriod);
    const cpuQueue = cpuQuietPeriods.slice();
    const networkQueue = networkQuietPeriods.slice();
    let cpuCandidate = cpuQueue.shift();
    let networkCandidate = networkQueue.shift();
    while (cpuCandidate && networkCandidate) {
      if (cpuCandidate.start >= networkCandidate.start) {
        if (networkCandidate.end >= cpuCandidate.start + REQUIRED_QUIET_WINDOW) {
          return {
            cpuQuietPeriod: cpuCandidate,
            networkQuietPeriod: networkCandidate,
            cpuQuietPeriods,
            networkQuietPeriods
          };
        } else {
          networkCandidate = networkQueue.shift();
        }
      } else {
        if (cpuCandidate.end >= networkCandidate.start + REQUIRED_QUIET_WINDOW) {
          return {
            cpuQuietPeriod: cpuCandidate,
            networkQuietPeriod: networkCandidate,
            cpuQuietPeriods,
            networkQuietPeriods
          };
        } else {
          cpuCandidate = cpuQueue.shift();
        }
      }
    }
    throw new LighthouseError(
      cpuCandidate ? LighthouseError.errors.NO_TTI_NETWORK_IDLE_PERIOD : LighthouseError.errors.NO_TTI_CPU_IDLE_PERIOD
    );
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<LH.Artifacts.LanternMetric>}
   */
  static computeSimulatedMetric(data, context) {
    const metricData = NavigationMetric.getMetricComputationInput(data);
    return LanternInteractiveComputed.request(metricData, context);
  }
  /**
   * @param {LH.Artifacts.NavigationMetricComputationData} data
   * @return {Promise<LH.Artifacts.Metric>}
   */
  static computeObservedMetric(data) {
    const { processedTrace, processedNavigation, networkRecords } = data;
    if (!processedNavigation.timestamps.domContentLoaded) {
      throw new LighthouseError(LighthouseError.errors.NO_DCL);
    }
    const longTasks = TraceProcessor.getMainThreadTopLevelEvents(processedTrace).filter((event) => event.duration >= 50);
    const quietPeriodInfo = _Interactive.findOverlappingQuietPeriods(
      longTasks,
      networkRecords,
      processedNavigation
    );
    const cpuQuietPeriod = quietPeriodInfo.cpuQuietPeriod;
    const timestamp = Math.max(
      cpuQuietPeriod.start,
      processedNavigation.timestamps.firstContentfulPaint / 1e3,
      processedNavigation.timestamps.domContentLoaded / 1e3
    ) * 1e3;
    const timing = (timestamp - processedNavigation.timestamps.timeOrigin) / 1e3;
    return Promise.resolve({ timing, timestamp });
  }
};
var InteractiveComputed = makeComputedArtifact(
  Interactive,
  ["devtoolsLog", "gatherContext", "settings", "simulator", "trace", "URL", "SourceMaps"]
);

export {
  InteractiveComputed
};
/*! Bundled license information:

lighthouse/core/gather/driver/network-monitor.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/computed/metrics/interactive.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
