import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  EntityClassificationComputed
} from "./chunk-2FKQ374S.js";
import {
  NetworkRecordsComputed,
  NetworkRequest
} from "./chunk-JDNHHZFJ.js";
import {
  url_utils_default
} from "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import {
  makeComputedArtifact
} from "./chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/computed/resource-summary.js
var ResourceSummary = class _ResourceSummary {
  /**
   * @param {LH.Artifacts.NetworkRequest} record
   * @return {ResourceType}
   */
  static determineResourceType(record) {
    if (!record.resourceType) return "other";
    const requestToResourceType = {
      "Stylesheet": "stylesheet",
      "Image": "image",
      "Media": "media",
      "Font": "font",
      "Script": "script",
      "Document": "document"
    };
    return requestToResourceType[record.resourceType] || "other";
  }
  /**
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Artifacts.URL} URLArtifact
   * @param {LH.Artifacts.EntityClassification} classifiedEntities
   * @return {Record<ResourceType, ResourceEntry>}
   */
  static summarize(networkRecords, URLArtifact, classifiedEntities) {
    const resourceSummary = {
      "stylesheet": { count: 0, resourceSize: 0, transferSize: 0 },
      "image": { count: 0, resourceSize: 0, transferSize: 0 },
      "media": { count: 0, resourceSize: 0, transferSize: 0 },
      "font": { count: 0, resourceSize: 0, transferSize: 0 },
      "script": { count: 0, resourceSize: 0, transferSize: 0 },
      "document": { count: 0, resourceSize: 0, transferSize: 0 },
      "other": { count: 0, resourceSize: 0, transferSize: 0 },
      "total": { count: 0, resourceSize: 0, transferSize: 0 },
      "third-party": { count: 0, resourceSize: 0, transferSize: 0 }
    };
    const firstPartyHosts = classifiedEntities.firstParty?.domains.map((domain) => `*.${domain}`) || [`*.${url_utils_default.getRootDomain(URLArtifact.finalDisplayedUrl)}`];
    networkRecords.filter((record) => {
      const type = this.determineResourceType(record);
      if (type === "other" && record.url.endsWith("/favicon.ico")) {
        return false;
      }
      if (NetworkRequest.isNonNetworkRequest(record)) return false;
      return true;
    }).forEach((record) => {
      const type = this.determineResourceType(record);
      resourceSummary[type].count++;
      resourceSummary[type].resourceSize += record.resourceSize;
      resourceSummary[type].transferSize += record.transferSize;
      resourceSummary.total.count++;
      resourceSummary.total.resourceSize += record.resourceSize;
      resourceSummary.total.transferSize += record.transferSize;
      const isFirstParty = firstPartyHosts.some((hostExp) => {
        const url = new URL(record.url);
        if (hostExp.startsWith("*.")) {
          return url.hostname.endsWith(hostExp.slice(2));
        }
        return url.hostname === hostExp;
      });
      if (!isFirstParty) {
        resourceSummary["third-party"].count++;
        resourceSummary["third-party"].resourceSize += record.resourceSize;
        resourceSummary["third-party"].transferSize += record.transferSize;
      }
    });
    return resourceSummary;
  }
  /**
   * @param {{URL: LH.Artifacts['URL'], devtoolsLog: LH.DevtoolsLog}} data
   * @param {LH.Artifacts.ComputedContext} context
   * @return {Promise<Record<ResourceType,ResourceEntry>>}
   */
  static async compute_(data, context) {
    const networkRecords = await NetworkRecordsComputed.request(data.devtoolsLog, context);
    const classifiedEntities = await EntityClassificationComputed.request(
      { URL: data.URL, devtoolsLog: data.devtoolsLog },
      context
    );
    return _ResourceSummary.summarize(networkRecords, data.URL, classifiedEntities);
  }
};
var ResourceSummaryComputed = makeComputedArtifact(ResourceSummary, ["URL", "devtoolsLog"]);

// node_modules/lighthouse/core/audits/resource-summary.js
var str_ = createIcuMessageFn(import.meta.url);
var ResourceSummary2 = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "resource-summary",
      title: "Resources Summary",
      description: "Aggregates all network requests and groups them by type",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      requiredArtifacts: ["DevtoolsLog", "URL"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const summary = await ResourceSummaryComputed.request({ devtoolsLog, URL: artifacts.URL }, context);
    const headings = [
      { key: "label", valueType: "text", label: str_(UIStrings.columnResourceType) },
      { key: "requestCount", valueType: "numeric", label: str_(UIStrings.columnRequests) },
      { key: "transferSize", valueType: "bytes", label: str_(UIStrings.columnTransferSize) }
    ];
    const strMappings = {
      "total": str_(UIStrings.totalResourceType),
      "document": str_(UIStrings.documentResourceType),
      "script": str_(UIStrings.scriptResourceType),
      "stylesheet": str_(UIStrings.stylesheetResourceType),
      "image": str_(UIStrings.imageResourceType),
      "media": str_(UIStrings.mediaResourceType),
      "font": str_(UIStrings.fontResourceType),
      "other": str_(UIStrings.otherResourceType),
      "third-party": str_(UIStrings.thirdPartyResourceType)
    };
    const types = (
      /** @type {Array<ResourceType>} */
      Object.keys(summary)
    );
    const rows = types.map((type) => {
      return {
        // ResourceType is included as an "id" for ease of use.
        // It does not appear directly in the table.
        resourceType: type,
        label: strMappings[type],
        requestCount: summary[type].count,
        transferSize: summary[type].transferSize
      };
    });
    const thirdPartyRow = rows.find((r) => r.resourceType === "third-party") || [];
    const otherRows = rows.filter((r) => r.resourceType !== "third-party").sort((a, b) => {
      return b.transferSize - a.transferSize;
    });
    const tableItems = otherRows.concat(thirdPartyRow);
    const tableDetails = Audit.makeTableDetails(headings, tableItems);
    return {
      details: tableDetails,
      score: null
    };
  }
};
var resource_summary_default = ResourceSummary2;
export {
  resource_summary_default as default
};
/*! Bundled license information:

lighthouse/core/computed/resource-summary.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/audits/resource-summary.js:
  (**
   * @license Copyright 2019 The Lighthouse Authors. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
   * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
   *)
*/
