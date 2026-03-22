import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UnusedJavascriptSummaryComputed
} from "../chunk-UNGGEIT5.js";
import {
  JSBundlesComputed
} from "../chunk-QMRXOAX7.js";
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

// node_modules/lighthouse/core/audits/byte-efficiency/unused-javascript.js
var UIStrings2 = {
  /** Imperative title of a Lighthouse audit that tells the user to reduce JavaScript that is never evaluated during page load. This is displayed in a list of audit titles that Lighthouse generates. */
  title: "Reduce unused JavaScript",
  /** Description of a Lighthouse audit that tells the user *why* they should reduce JavaScript that is never needed/evaluated by the browser. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var UNUSED_BYTES_IGNORE_THRESHOLD = 20 * 1024;
var UNUSED_BYTES_IGNORE_BUNDLE_SOURCE_THRESHOLD = 512;
function commonPrefix(strings) {
  if (!strings.length) {
    return "";
  }
  const maxWord = strings.reduce((a, b) => a > b ? a : b);
  let prefix = strings.reduce((a, b) => a > b ? b : a);
  while (!maxWord.startsWith(prefix)) {
    prefix = prefix.slice(0, -1);
  }
  return prefix;
}
__name(commonPrefix, "commonPrefix");
function trimCommonPrefix(string, commonPrefix2) {
  if (!commonPrefix2) return string;
  return string.startsWith(commonPrefix2) ? "\u2026" + string.slice(commonPrefix2.length) : string;
}
__name(trimCommonPrefix, "trimCommonPrefix");
var UnusedJavaScript = class extends ByteEfficiencyAudit {
  static {
    __name(this, "UnusedJavaScript");
  }
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "unused-javascript",
      title: str_(UIStrings2.title),
      description: str_(UIStrings2.description),
      scoreDisplayMode: ByteEfficiencyAudit.SCORING_MODES.METRIC_SAVINGS,
      guidanceLevel: 1,
      requiredArtifacts: [
        "JsUsage",
        "Scripts",
        "SourceMaps",
        "GatherContext",
        "DevtoolsLog",
        "Trace",
        "URL",
        "SourceMaps"
      ]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {Array<LH.Artifacts.NetworkRequest>} networkRecords
   * @param {LH.Audit.Context} context
   * @return {Promise<import('./byte-efficiency-audit.js').ByteEfficiencyProduct>}
   */
  static async audit_(artifacts, networkRecords, context) {
    const bundles = await JSBundlesComputed.request(artifacts, context);
    const {
      unusedThreshold = UNUSED_BYTES_IGNORE_THRESHOLD,
      bundleSourceUnusedThreshold = UNUSED_BYTES_IGNORE_BUNDLE_SOURCE_THRESHOLD
    } = context.options || {};
    const compressionRatioByUrl = /* @__PURE__ */ new Map();
    const items = [];
    for (const [scriptId, scriptCoverage] of Object.entries(artifacts.JsUsage)) {
      const script = artifacts.Scripts.find((s) => s.scriptId === scriptId);
      if (!script) continue;
      const bundle = bundles.find((b) => b.script.scriptId === scriptId) ?? null;
      const unusedJsSummary = await UnusedJavascriptSummaryComputed.request({ scriptId, scriptCoverage, bundle }, context);
      if (unusedJsSummary.wastedBytes === 0 || unusedJsSummary.totalBytes === 0) continue;
      const compressionRatio = estimateCompressionRatioForContent(
        compressionRatioByUrl,
        script.url,
        artifacts,
        networkRecords
      );
      const item = {
        url: script.url,
        totalBytes: Math.round(compressionRatio * unusedJsSummary.totalBytes),
        wastedBytes: Math.round(compressionRatio * unusedJsSummary.wastedBytes),
        wastedPercent: unusedJsSummary.wastedPercent
      };
      if (item.wastedBytes <= unusedThreshold) continue;
      items.push(item);
      if (!bundle || "errorMessage" in bundle.sizes) continue;
      const sizes = bundle.sizes;
      if (unusedJsSummary.sourcesWastedBytes) {
        const topUnusedSourceSizes = Object.entries(unusedJsSummary.sourcesWastedBytes).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([source, unused]) => {
          const total = source === "(unmapped)" ? sizes.unmappedBytes : sizes.files[source];
          return {
            source,
            unused: Math.round(unused * compressionRatio),
            total: Math.round(total * compressionRatio)
          };
        }).filter((d) => d.unused >= bundleSourceUnusedThreshold);
        const commonSourcePrefix = commonPrefix(bundle.map.sourceURLs());
        item.subItems = {
          type: "subitems",
          items: topUnusedSourceSizes.map(({ source, unused, total }) => {
            return {
              source: trimCommonPrefix(source, commonSourcePrefix),
              sourceBytes: total,
              sourceWastedBytes: unused
            };
          })
        };
      }
    }
    return {
      items,
      headings: [
        /* eslint-disable max-len */
        { key: "url", valueType: "url", subItemsHeading: { key: "source", valueType: "code" }, label: str_(UIStrings.columnURL) },
        { key: "totalBytes", valueType: "bytes", subItemsHeading: { key: "sourceBytes" }, label: str_(UIStrings.columnTransferSize) },
        { key: "wastedBytes", valueType: "bytes", subItemsHeading: { key: "sourceWastedBytes" }, label: str_(UIStrings.columnWastedBytes) }
        /* eslint-enable max-len */
      ]
    };
  }
};
var unused_javascript_default = UnusedJavaScript;
export {
  UIStrings2 as UIStrings,
  unused_javascript_default as default
};
/*! Bundled license information:

lighthouse/core/audits/byte-efficiency/unused-javascript.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
