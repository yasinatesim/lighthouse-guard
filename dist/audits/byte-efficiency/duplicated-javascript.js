import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ModuleDuplicationComputed
} from "../chunk-EAF2KUOF.js";
import "../chunk-QMRXOAX7.js";
import {
  estimateCompressionRatioForContent
} from "../chunk-7PCH2QJG.js";
import {
  ByteEfficiencyAudit
} from "../chunk-7TZ77HKH.js";
import "../chunk-22KTQBIM.js";
import "../chunk-5FAUCPF6.js";
import "../chunk-VUSO5I4V.js";
import "../chunk-ZFITDNXI.js";
import "../chunk-5AKLBR55.js";
import "../chunk-HDGMQKEX.js";
import "../chunk-LBG2XUR7.js";
import "../chunk-2DV6G4YM.js";
import "../chunk-EXNQHM7K.js";
import "../chunk-UNPQMFMQ.js";
import "../chunk-RI7XYKZY.js";
import "../chunk-NUK2ASLP.js";
import "../chunk-I4AAD5AR.js";
import "../chunk-AB7S44AE.js";
import "../chunk-CGRNGE5D.js";
import "../chunk-4VECFSJ3.js";
import "../chunk-VW72MYVI.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-4MZOSFEN.js";
import "../chunk-FOYXSDFQ.js";
import "../chunk-7FMDRUEI.js";
import "../chunk-C5HPB2FB.js";
import "../chunk-ZGW6XDCS.js";
import {
  __name
} from "../chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/byte-efficiency/duplicated-javascript.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to remove duplicate JavaScript from their code. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Remove duplicate modules in JavaScript bundles",
  /** Description of a Lighthouse audit that tells the user *why* they should remove duplicate JavaScript from their scripts. This is displayed after a user expands the section to see more. No word length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. "
  // +
  // TODO: we need docs.
  // '[Learn more](https://developer.chrome.com/docs/lighthouse/performance/duplicated-javascript/).',
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var IGNORE_THRESHOLD_IN_BYTES = 1024 * 10;
function indexOfOrEnd(haystack, needle, startPosition = 0) {
  const index = haystack.indexOf(needle, startPosition);
  return index === -1 ? haystack.length : index;
}
__name(indexOfOrEnd, "indexOfOrEnd");
var DuplicatedJavascript = class _DuplicatedJavascript extends ByteEfficiencyAudit {
  static {
    __name(this, "DuplicatedJavascript");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "duplicated-javascript",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 2,
      requiredArtifacts: [
        "DevtoolsLog",
        "Trace",
        "SourceMaps",
        "Scripts",
        "GatherContext",
        "URL"
      ]
    };
  }
  /**
   * @param {string} source
   */
  static _getNodeModuleName(source) {
    const sourceSplit = source.split("node_modules/");
    source = sourceSplit[sourceSplit.length - 1];
    const indexFirstSlash = indexOfOrEnd(source, "/");
    if (source[0] === "@") {
      return source.slice(0, indexOfOrEnd(source, "/", indexFirstSlash + 1));
    }
    return source.slice(0, indexFirstSlash);
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   */
  static async _getDuplicationGroupedByNodeModules(artifacts, context) {
    const duplication = await ModuleDuplicationComputed.request(artifacts, context);
    const groupedDuplication = /* @__PURE__ */ new Map();
    for (const [source, sourceDatas] of duplication.entries()) {
      if (!source.includes("node_modules")) {
        groupedDuplication.set(source, sourceDatas);
        continue;
      }
      const normalizedSource = "node_modules/" + _DuplicatedJavascript._getNodeModuleName(source);
      const aggregatedSourceDatas = groupedDuplication.get(normalizedSource) || [];
      for (const { scriptId, scriptUrl, resourceSize } of sourceDatas) {
        let sourceData = aggregatedSourceDatas.find((d) => d.scriptId === scriptId);
        if (!sourceData) {
          sourceData = { scriptId, scriptUrl, resourceSize: 0 };
          aggregatedSourceDatas.push(sourceData);
        }
        sourceData.resourceSize += resourceSize;
      }
      groupedDuplication.set(normalizedSource, aggregatedSourceDatas);
    }
    for (const sourceDatas of duplication.values()) {
      sourceDatas.sort((a, b) => b.resourceSize - a.resourceSize);
    }
    return groupedDuplication;
  }
  /**
   * Each details item returned is a module with subItems for each resource that
   * includes it. The wastedBytes for the details item is the number of bytes
   * occupied by the sum of all but the largest copy of the module. wastedBytesByUrl
   * attributes the cost of the bytes to a specific resource, for use by lantern.
   * @param {LH.Artifacts} artifacts
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Audit.Context} context
   * @return {Promise<ByteEfficiencyProduct>}
   */
  static async audit_(artifacts, networkRecords, context) {
    const ignoreThresholdInBytes = context.options?.ignoreThresholdInBytes || IGNORE_THRESHOLD_IN_BYTES;
    const duplication = await _DuplicatedJavascript._getDuplicationGroupedByNodeModules(artifacts, context);
    const compressionRatioByUrl = /* @__PURE__ */ new Map();
    const items = [];
    let overflowWastedBytes = 0;
    const overflowUrls = /* @__PURE__ */ new Set();
    const wastedBytesByUrl = /* @__PURE__ */ new Map();
    for (const [source, sourceDatas] of duplication.entries()) {
      const subItems = [];
      let wastedBytesTotal = 0;
      for (let i = 0; i < sourceDatas.length; i++) {
        const sourceData = sourceDatas[i];
        const scriptId = sourceData.scriptId;
        const script = artifacts.Scripts.find((script2) => script2.scriptId === scriptId);
        const url = script?.url || "";
        const compressionRatio = estimateCompressionRatioForContent(
          compressionRatioByUrl,
          url,
          artifacts,
          networkRecords
        );
        const transferSize = Math.round(sourceData.resourceSize * compressionRatio);
        subItems.push({
          url,
          sourceTransferBytes: transferSize
        });
        if (i === 0) continue;
        wastedBytesTotal += transferSize;
        wastedBytesByUrl.set(url, (wastedBytesByUrl.get(url) || 0) + transferSize);
      }
      if (wastedBytesTotal <= ignoreThresholdInBytes) {
        overflowWastedBytes += wastedBytesTotal;
        for (const subItem of subItems) {
          overflowUrls.add(subItem.url);
        }
        continue;
      }
      items.push({
        source,
        wastedBytes: wastedBytesTotal,
        // Not needed, but keeps typescript happy.
        url: "",
        // Not needed, but keeps typescript happy.
        totalBytes: 0,
        subItems: {
          type: "subitems",
          items: subItems
        }
      });
    }
    if (overflowWastedBytes > ignoreThresholdInBytes) {
      items.push({
        source: "Other",
        wastedBytes: overflowWastedBytes,
        url: "",
        totalBytes: 0,
        subItems: {
          type: "subitems",
          items: Array.from(overflowUrls).map((url) => ({ url }))
        }
      });
    }
    const headings = [
      /* eslint-disable max-len */
      { key: "source", valueType: "code", subItemsHeading: { key: "url", valueType: "url" }, label: str_(UIStrings.columnSource) },
      { key: null, valueType: "bytes", subItemsHeading: { key: "sourceTransferBytes" }, granularity: 10, label: str_(UIStrings.columnTransferSize) },
      { key: "wastedBytes", valueType: "bytes", granularity: 10, label: str_(UIStrings.columnWastedBytes) }
      /* eslint-enable max-len */
    ];
    return {
      items,
      headings,
      wastedBytesByUrl
    };
  }
};
var duplicated_javascript_default = DuplicatedJavascript;
export {
  UIStrings2 as UIStrings,
  duplicated_javascript_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/duplicated-javascript.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
