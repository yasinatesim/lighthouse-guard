import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkAnalysisComputed
} from "./chunk-UNPQMFMQ.js";
import {
  NetworkRecordsComputed
} from "./chunk-AB7S44AE.js";
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

// node_modules/lighthouse/core/audits/network-server-latency.js
var UIStrings2 = {
  /** Descriptive title of a Lighthouse audit that tells the user the server latencies observed from each origin the page connected to. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Server Backend Latencies",
  /** Description of a Lighthouse audit that tells the user that server latency can effect their website's performance negatively. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more about server response time](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var NetworkServerLatency = class extends Audit {
  static {
    __name(this, "NetworkServerLatency");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "network-server-latency",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["DevtoolsLog"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const records = await NetworkRecordsComputed.request(devtoolsLog, context);
    if (!records.length) {
      return {
        score: 1,
        notApplicable: true
      };
    }
    const analysis = await NetworkAnalysisComputed.request(devtoolsLog, context);
    let maxLatency = 0;
    const results = [];
    for (const [origin, serverResponseTime] of analysis.serverResponseTimeByOrigin.entries()) {
      if (!origin.startsWith("http")) continue;
      maxLatency = Math.max(serverResponseTime, maxLatency);
      results.push({ origin, serverResponseTime });
    }
    results.sort((a, b) => b.serverResponseTime - a.serverResponseTime);
    const headings = [
      { key: "origin", valueType: "text", label: str_(UIStrings.columnURL) },
      {
        key: "serverResponseTime",
        valueType: "ms",
        granularity: 1,
        label: str_(UIStrings.columnTimeSpent)
      }
    ];
    const tableDetails = Audit.makeTableDetails(
      headings,
      results,
      { sortedBy: ["serverResponseTime"] }
    );
    return {
      score: Math.max(1 - maxLatency / 500, 0),
      numericValue: maxLatency,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.ms, { timeInMs: maxLatency }),
      details: tableDetails
    };
  }
};
var network_server_latency_default = NetworkServerLatency;
export {
  UIStrings2 as UIStrings,
  network_server_latency_default as default
};
/*! Bundled license information:

lighthouse/core/audits/network-server-latency.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
