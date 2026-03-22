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

// node_modules/lighthouse/core/audits/network-rtt.js
var UIStrings2 = {
  /** Descriptive title of a Lighthouse audit that tells the user the round trip times to each origin the page connected to. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Network Round Trip Times",
  /** Description of a Lighthouse audit that tells the user that a high network round trip time (RTT) can effect their website's performance because the server is physically far away from them thus making the RTT high. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more about the Round Trip Time](https://hpbn.co/primer-on-latency-and-bandwidth/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var NetworkRTT = class extends Audit {
  static {
    __name(this, "NetworkRTT");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "network-rtt",
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
    let maxRtt = 0;
    const baseRtt = analysis.rtt;
    const results = [];
    for (const [origin, additionalRtt] of analysis.additionalRttByOrigin.entries()) {
      if (!origin.startsWith("http")) continue;
      const rtt = additionalRtt + baseRtt;
      results.push({ origin, rtt });
      maxRtt = Number.isFinite(rtt) ? Math.max(rtt, maxRtt) : maxRtt;
    }
    results.sort((a, b) => b.rtt - a.rtt);
    const headings = [
      { key: "origin", valueType: "text", label: str_(UIStrings.columnURL) },
      { key: "rtt", valueType: "ms", granularity: 1, label: str_(UIStrings.columnTimeSpent) }
    ];
    const tableDetails = Audit.makeTableDetails(headings, results, { sortedBy: ["rtt"] });
    return {
      score: 1,
      numericValue: maxRtt,
      numericUnit: "millisecond",
      displayValue: str_(UIStrings.ms, { timeInMs: maxRtt }),
      details: tableDetails
    };
  }
};
var network_rtt_default = NetworkRTT;
export {
  UIStrings2 as UIStrings,
  network_rtt_default as default
};
/*! Bundled license information:

lighthouse/core/audits/network-rtt.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
