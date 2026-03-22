import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  ViewportMetaComputed
} from "../chunk-CYP4ABH3.js";
import "../chunk-MLADMIB3.js";
import {
  UIStrings,
  createIcuMessageFn
} from "../chunk-T3HXWQEB.js";
import "../chunk-B4FIMLMR.js";
import "../chunk-NDN2O67Z.js";
import "../chunk-V6LRM2MD.js";
import {
  Audit
} from "../chunk-55A4MDN3.js";
import "../chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/seo/font-size.js
var MINIMAL_PERCENTAGE_OF_LEGIBLE_TEXT = 60;
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the font sizes used on the page. This descriptive title is shown to users when the fonts used on the page are large enough to be considered legible. */
  title: "Document uses legible font sizes",
  /** Title of a Lighthouse audit that provides detail on the font sizes used on the page. This descriptive title is shown to users when there is a font that may be too small to be read by users. */
  failureTitle: "Document doesn't use legible font sizes",
  /** Description of a Lighthouse audit that tells the user *why* they need to use a larger font size. This is displayed after a user expands the section to see more. No character length limits. The last sentence starting with 'Learn' becomes link text to additional documentation. */
  description: "Font sizes less than 12px are too small to be legible and require mobile visitors to \u201Cpinch to zoom\u201D in order to read. Strive to have >60% of page text \u226512px. [Learn more about legible font sizes](https://developer.chrome.com/docs/lighthouse/seo/font-size/).",
  /** Label for the audit identifying font sizes that are too small. */
  displayValue: "{decimalProportion, number, extendedPercent} legible text",
  /** Explanatory message stating that there was a failure in an audit caused by a missing page viewport meta tag configuration. "viewport" and "meta" are HTML terms and should not be translated. */
  explanationViewport: "Text is illegible because there's no viewport meta tag optimized for mobile screens.",
  /** Label for the table row which summarizes all failing nodes that were not fully analyzed. "Add'l" is shorthand for "Additional" */
  additionalIllegibleText: "Add'l illegible text",
  /** Label for the table row which displays the percentage of nodes that have proper font size. */
  legibleText: "Legible text",
  /** Label for a column in a data table; entries will be css style rule selectors. */
  columnSelector: "Selector",
  /** Label for a column in a data table; entries will be the percent of page text a specific CSS rule applies to. */
  columnPercentPageText: "% of Page Text",
  /** Label for a column in a data table; entries will be text font sizes. */
  columnFontSize: "Font Size"
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
function getUniqueFailingRules(fontSizeArtifact) {
  const failingRules = /* @__PURE__ */ new Map();
  fontSizeArtifact.forEach((failingNodeData) => {
    const { nodeId, cssRule, fontSize, textLength, parentNode } = failingNodeData;
    const artifactId = getFontArtifactId(cssRule, nodeId);
    const failingRule = failingRules.get(artifactId);
    if (!failingRule) {
      failingRules.set(artifactId, {
        nodeId,
        parentNode,
        cssRule,
        fontSize,
        textLength
      });
    } else {
      failingRule.textLength += textLength;
    }
  });
  return [...failingRules.values()];
}
function getAttributeMap(attributes = []) {
  const map = /* @__PURE__ */ new Map();
  for (let i = 0; i < attributes.length; i += 2) {
    const name = attributes[i];
    const value = attributes[i + 1];
    if (!name || !value) continue;
    const normalizedValue = value.trim();
    if (normalizedValue) {
      map.set(name.toLowerCase(), normalizedValue);
    }
  }
  return map;
}
function getSelector(parentNode) {
  const attributeMap = getAttributeMap(parentNode.attributes);
  if (attributeMap.has("id")) {
    return "#" + attributeMap.get("id");
  } else {
    const attrClass = attributeMap.get("class");
    if (attrClass) {
      return "." + attrClass.split(/\s+/).join(".");
    }
  }
  return parentNode.nodeName.toLowerCase();
}
function nodeToTableNode(parentNode) {
  const attributes = parentNode.attributes || [];
  const attributesString = attributes.map(
    (value, idx) => idx % 2 === 0 ? ` ${value}` : `="${value}"`
  ).join("");
  return {
    type: "node",
    selector: parentNode.parentNode ? getSelector(parentNode.parentNode) : "",
    snippet: `<${parentNode.nodeName.toLowerCase()}${attributesString}>`
  };
}
function findStyleRuleSource(baseURL, styleDeclaration, parentNode) {
  if (!styleDeclaration || styleDeclaration.type === "Attributes" || styleDeclaration.type === "Inline") {
    return {
      source: { type: "url", value: baseURL },
      selector: nodeToTableNode(parentNode)
    };
  }
  if (styleDeclaration.parentRule && styleDeclaration.parentRule.origin === "user-agent") {
    return {
      source: { type: "code", value: "User Agent Stylesheet" },
      selector: styleDeclaration.parentRule.selectors.map((item) => item.text).join(", ")
    };
  }
  let selector = "";
  if (styleDeclaration.parentRule) {
    const rule = styleDeclaration.parentRule;
    selector = rule.selectors.map((item) => item.text).join(", ");
  }
  if (styleDeclaration.stylesheet && !styleDeclaration.stylesheet.sourceURL) {
    return {
      source: { type: "code", value: "dynamic" },
      selector
    };
  }
  if (styleDeclaration.stylesheet && styleDeclaration.range) {
    const { range, stylesheet } = styleDeclaration;
    const urlProvider = stylesheet.hasSourceURL ? "comment" : "network";
    let line = range.startLine;
    let column = range.startColumn;
    const addHtmlLocationOffset = stylesheet.isInline && urlProvider !== "comment";
    if (addHtmlLocationOffset) {
      line += stylesheet.startLine;
      if (range.startLine === 0) {
        column += stylesheet.startColumn;
      }
    }
    const source = Audit.makeSourceLocation(stylesheet.sourceURL, line, column);
    source.urlProvider = urlProvider;
    return {
      source,
      selector
    };
  }
  return {
    selector,
    source: { type: "code", value: "Unknown" }
  };
}
function getFontArtifactId(styleDeclaration, textNodeId) {
  if (styleDeclaration && styleDeclaration.type === "Regular") {
    const startLine = styleDeclaration.range ? styleDeclaration.range.startLine : 0;
    const startColumn = styleDeclaration.range ? styleDeclaration.range.startColumn : 0;
    return `${styleDeclaration.styleSheetId}@${startLine}:${startColumn}`;
  } else {
    return `node_${textNodeId}`;
  }
}
var FontSize = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "font-size",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["FontSize", "URL", "MetaElements"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    if (context.settings.formFactor === "desktop") {
      return {
        score: 1,
        notApplicable: true
      };
    }
    const viewportMeta = await ViewportMetaComputed.request(artifacts.MetaElements, context);
    if (!viewportMeta.isMobileOptimized) {
      return {
        score: 0,
        explanation: str_(UIStrings2.explanationViewport)
      };
    }
    const {
      analyzedFailingNodesData,
      analyzedFailingTextLength,
      failingTextLength,
      totalTextLength
    } = artifacts.FontSize;
    if (totalTextLength === 0) {
      return {
        score: 1
      };
    }
    const failingRules = getUniqueFailingRules(analyzedFailingNodesData);
    const percentageOfPassingText = (totalTextLength - failingTextLength) / totalTextLength * 100;
    const pageUrl = artifacts.URL.finalDisplayedUrl;
    const headings = [
      { key: "source", valueType: "source-location", label: str_(UIStrings.columnSource) },
      { key: "selector", valueType: "code", label: str_(UIStrings2.columnSelector) },
      { key: "coverage", valueType: "text", label: str_(UIStrings2.columnPercentPageText) },
      { key: "fontSize", valueType: "text", label: str_(UIStrings2.columnFontSize) }
    ];
    const tableData = failingRules.sort((a, b) => b.textLength - a.textLength).map(({ cssRule, textLength, fontSize, parentNode }) => {
      const percentageOfAffectedText = textLength / totalTextLength * 100;
      const origin = findStyleRuleSource(pageUrl, cssRule, parentNode);
      return {
        source: origin.source,
        selector: origin.selector,
        coverage: `${percentageOfAffectedText.toFixed(2)}%`,
        fontSize: `${fontSize}px`
      };
    });
    if (analyzedFailingTextLength < failingTextLength) {
      const percentageOfUnanalyzedFailingText = (failingTextLength - analyzedFailingTextLength) / totalTextLength * 100;
      tableData.push({
        // Overrides default `source-location`
        source: { type: "code", value: str_(UIStrings2.additionalIllegibleText) },
        selector: "",
        coverage: `${percentageOfUnanalyzedFailingText.toFixed(2)}%`,
        fontSize: "< 12px"
      });
    }
    if (percentageOfPassingText > 0) {
      tableData.push({
        // Overrides default `source-location`
        source: { type: "code", value: str_(UIStrings2.legibleText) },
        selector: "",
        coverage: `${percentageOfPassingText.toFixed(2)}%`,
        fontSize: "\u2265 12px"
      });
    }
    const decimalProportion = percentageOfPassingText / 100;
    const displayValue = str_(UIStrings2.displayValue, { decimalProportion });
    const details = Audit.makeTableDetails(headings, tableData);
    const passed = percentageOfPassingText >= MINIMAL_PERCENTAGE_OF_LEGIBLE_TEXT;
    return {
      score: Number(passed),
      details,
      displayValue
    };
  }
};
var font_size_default = FontSize;
export {
  UIStrings2 as UIStrings,
  font_size_default as default
};
/*! Bundled license information:

lighthouse/core/audits/seo/font-size.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
