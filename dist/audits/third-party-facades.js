import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  third_party_summary_default
} from "./chunk-WPGEVHCL.js";
import "./chunk-KRP3ZBL5.js";
import {
  TBTImpactTasksComputed
} from "./chunk-EMYN325U.js";
import "./chunk-F3LBQ6H5.js";
import "./chunk-FXMGSRO7.js";
import "./chunk-QBXT32HH.js";
import "./chunk-CRKKLQWT.js";
import "./chunk-K7WBVFH2.js";
import "./chunk-JY4RKQCD.js";
import "./chunk-DGRQI5GC.js";
import "./chunk-4PONSSZA.js";
import "./chunk-YN3ARENP.js";
import "./chunk-IOK3BAH7.js";
import "./chunk-ZIUDIWBD.js";
import "./chunk-Z7S4UQSE.js";
import "./chunk-22N3WN7S.js";
import "./chunk-GRLAFLTF.js";
import {
  EntityClassificationComputed,
  third_party_web_default
} from "./chunk-2FKQ374S.js";
import "./chunk-ZATS4KUU.js";
import "./chunk-FTKGXG7F.js";
import "./chunk-3WVTZQMF.js";
import "./chunk-3KEMYTTF.js";
import {
  NetworkRecordsComputed
} from "./chunk-JDNHHZFJ.js";
import "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
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

// node_modules/lighthouse/core/audits/third-party-facades.js
var UIStrings2 = {
  /** Title of a diagnostic audit that provides details about the third-party code on a web page that can be lazy loaded with a facade alternative. This descriptive title is shown to users when no resources have facade alternatives available. A facade is a lightweight component which looks like the desired resource. Lazy loading means resources are deferred until they are needed. Third-party code refers to resources that are not within the control of the site owner. */
  title: "Lazy load third-party resources with facades",
  /** Title of a diagnostic audit that provides details about the third-party code on a web page that can be lazy loaded with a facade alternative. This descriptive title is shown to users when one or more third-party resources have available facade alternatives. A facade is a lightweight component which looks like the desired resource. Lazy loading means resources are deferred until they are needed. Third-party code refers to resources that are not within the control of the site owner. */
  failureTitle: "Some third-party resources can be lazy loaded with a facade",
  /** Description of a Lighthouse audit that identifies the third-party code on the page that can be lazy loaded with a facade alternative. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. A facade is a lightweight component which looks like the desired resource. Lazy loading means resources are deferred until they are needed. Third-party code refers to resources that are not within the control of the site owner. */
  description: "Some third-party embeds can be lazy loaded. Consider replacing them with a facade until they are required. [Learn how to defer third-parties with a facade](https://developer.chrome.com/docs/lighthouse/performance/third-party-facades/).",
  /** Summary text for the result of a Lighthouse audit that identifies the third-party code on a web page that can be lazy loaded with a facade alternative. This text summarizes the number of lazy loading facades that can be used on the page. A facade is a lightweight component which looks like the desired resource. */
  displayValue: `{itemCount, plural,
  =1 {# facade alternative available}
  other {# facade alternatives available}
  }`,
  /** Label for a table column that displays the name of the product that a URL is used for. The products in the column will be pieces of software used on the page, like the "YouTube Embedded Player" or the "Drift Live Chat" box. */
  columnProduct: "Product",
  /**
   * @description Template for a table entry that gives the name of a product which we categorize as video related.
   * @example {YouTube Embedded Player} productName
   */
  categoryVideo: "{productName} (Video)",
  /**
   * @description Template for a table entry that gives the name of a product which we categorize as customer success related. Customer success means the product supports customers by offering chat and contact solutions.
   * @example {Intercom Widget} productName
   */
  categoryCustomerSuccess: "{productName} (Customer Success)",
  /**
   * @description Template for a table entry that gives the name of a product which we categorize as marketing related.
   * @example {Drift Live Chat} productName
   */
  categoryMarketing: "{productName} (Marketing)",
  /**
   * @description Template for a table entry that gives the name of a product which we categorize as social related.
   * @example {Facebook Messenger Customer Chat} productName
   */
  categorySocial: "{productName} (Social)"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var CATEGORY_UI_MAP = {
  "video": UIStrings2.categoryVideo,
  "customer-success": UIStrings2.categoryCustomerSuccess,
  "marketing": UIStrings2.categoryMarketing,
  "social": UIStrings2.categorySocial
};
var ThirdPartyFacades = class _ThirdPartyFacades extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "third-party-facades",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      supportedModes: ["navigation"],
      guidanceLevel: 3,
      requiredArtifacts: ["Trace", "DevtoolsLog", "URL", "GatherContext", "SourceMaps"],
      scoreDisplayMode: Audit.SCORING_MODES.METRIC_SAVINGS
    };
  }
  /**
   * Sort items by transfer size and combine small items into a single row.
   * Items will be mutated in place to a maximum of 6 rows.
   * @param {import('./third-party-summary.js').URLSummary[]} items
   */
  static condenseItems(items) {
    items.sort((a, b) => b.transferSize - a.transferSize);
    let splitIndex = items.findIndex((item) => item.transferSize < 1e3) || 1;
    if (splitIndex === -1 || splitIndex > 5) splitIndex = 5;
    if (splitIndex >= items.length - 1) return;
    const remainder = items.splice(splitIndex);
    const finalItem = remainder.reduce((result, item) => {
      result.transferSize += item.transferSize;
      result.blockingTime += item.blockingTime;
      return result;
    });
    if (finalItem.transferSize < 1e3) return;
    finalItem.url = str_(UIStrings.otherResourcesLabel);
    items.push(finalItem);
  }
  /**
   * @param {Map<string, import('./third-party-summary.js').Summary>} byURL
   * @param {LH.Artifacts.EntityClassification} classifiedEntities
   * @return {FacadableProduct[]}
   */
  static getProductsWithFacade(byURL, classifiedEntities) {
    const facadableProductMap = /* @__PURE__ */ new Map();
    for (const url of byURL.keys()) {
      const entity = classifiedEntities.entityByUrl.get(url);
      if (!entity || classifiedEntities.isFirstParty(url)) continue;
      const product = third_party_web_default.getProduct(url);
      if (!product || !product.facades || !product.facades.length) continue;
      if (facadableProductMap.has(product.name)) continue;
      facadableProductMap.set(product.name, { product, entity });
    }
    return Array.from(facadableProductMap.values());
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const settings = context.settings;
    const devtoolsLog = artifacts.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const classifiedEntities = await EntityClassificationComputed.request(
      { URL: artifacts.URL, devtoolsLog },
      context
    );
    const metricComputationData = Audit.makeMetricComputationDataInput(artifacts, context);
    const tbtImpactTasks = await TBTImpactTasksComputed.request(metricComputationData, context);
    const multiplier = settings.throttlingMethod === "simulate" ? settings.throttling.cpuSlowdownMultiplier : 1;
    const summaries = third_party_summary_default.getSummaries(
      networkRecords,
      tbtImpactTasks,
      multiplier,
      classifiedEntities
    );
    const facadableProducts = _ThirdPartyFacades.getProductsWithFacade(summaries.byURL, classifiedEntities);
    let tbtImpact = 0;
    const results = [];
    for (const { product, entity } of facadableProducts) {
      const categoryTemplate = CATEGORY_UI_MAP[product.categories[0]];
      let productWithCategory;
      if (categoryTemplate) {
        productWithCategory = str_(categoryTemplate, { productName: product.name });
      } else {
        productWithCategory = product.name;
      }
      const urls = summaries.urls.get(entity);
      const entitySummary = summaries.byEntity.get(entity);
      if (!urls || !entitySummary) continue;
      tbtImpact += entitySummary.tbtImpact;
      const items = Array.from(urls).map((url) => {
        const urlStats = summaries.byURL.get(url);
        return (
          /** @type {import('./third-party-summary.js').URLSummary} */
          { url, ...urlStats }
        );
      });
      this.condenseItems(items);
      results.push({
        product: productWithCategory,
        transferSize: entitySummary.transferSize,
        blockingTime: entitySummary.blockingTime,
        subItems: { type: "subitems", items },
        // Add entity manually since facades don't have a single `url`.
        entity: entity.name
      });
    }
    if (!results.length) {
      return {
        score: 1,
        notApplicable: true,
        metricSavings: { TBT: 0 }
      };
    }
    const headings = [
      /* eslint-disable max-len */
      { key: "product", valueType: "text", subItemsHeading: { key: "url", valueType: "url" }, label: str_(UIStrings2.columnProduct) },
      { key: "transferSize", valueType: "bytes", subItemsHeading: { key: "transferSize" }, granularity: 1, label: str_(UIStrings.columnTransferSize) },
      { key: "blockingTime", valueType: "ms", subItemsHeading: { key: "blockingTime" }, granularity: 1, label: str_(UIStrings.columnBlockingTime) }
      /* eslint-enable max-len */
    ];
    return {
      score: 0,
      displayValue: str_(UIStrings2.displayValue, {
        itemCount: results.length
      }),
      details: Audit.makeTableDetails(headings, results),
      metricSavings: { TBT: Math.round(tbtImpact) }
    };
  }
};
var third_party_facades_default = ThirdPartyFacades;
export {
  UIStrings2 as UIStrings,
  third_party_facades_default as default
};
/*! Bundled license information:

lighthouse/core/audits/third-party-facades.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
