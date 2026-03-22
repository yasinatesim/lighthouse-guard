import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/seo/font-size.js
var FONT_SIZE_PROPERTY_NAME = "font-size";
var MINIMAL_LEGIBLE_FONT_SIZE_PX = 12;
var MAX_NODES_SOURCE_RULE_FETCHED = 50;
function hasFontSizeDeclaration(style) {
  return !!style && !!style.cssProperties.find(({ name }) => name === FONT_SIZE_PROPERTY_NAME);
}
__name(hasFontSizeDeclaration, "hasFontSizeDeclaration");
function findMostSpecificMatchedCSSRule(matchedCSSRules = [], isDeclarationOfInterest) {
  let mostSpecificRule;
  for (let i = matchedCSSRules.length - 1; i >= 0; i--) {
    if (isDeclarationOfInterest(matchedCSSRules[i].rule.style)) {
      mostSpecificRule = matchedCSSRules[i].rule;
      break;
    }
  }
  if (mostSpecificRule) {
    return {
      type: "Regular",
      ...mostSpecificRule.style,
      parentRule: {
        origin: mostSpecificRule.origin,
        selectors: mostSpecificRule.selectorList.selectors
      }
    };
  }
}
__name(findMostSpecificMatchedCSSRule, "findMostSpecificMatchedCSSRule");
function findInheritedCSSRule(inheritedEntries = []) {
  for (const { inlineStyle, matchedCSSRules } of inheritedEntries) {
    if (hasFontSizeDeclaration(inlineStyle)) return { type: "Inline", ...inlineStyle };
    const directRule = findMostSpecificMatchedCSSRule(matchedCSSRules, hasFontSizeDeclaration);
    if (directRule) return directRule;
  }
}
__name(findInheritedCSSRule, "findInheritedCSSRule");
function getEffectiveFontRule({ attributesStyle, inlineStyle, matchedCSSRules, inherited }) {
  if (hasFontSizeDeclaration(inlineStyle)) return { type: "Inline", ...inlineStyle };
  const matchedRule = findMostSpecificMatchedCSSRule(matchedCSSRules, hasFontSizeDeclaration);
  if (matchedRule) return matchedRule;
  if (hasFontSizeDeclaration(attributesStyle)) return { type: "Attributes", ...attributesStyle };
  const inheritedRule = findInheritedCSSRule(inherited);
  if (inheritedRule) return inheritedRule;
  return void 0;
}
__name(getEffectiveFontRule, "getEffectiveFontRule");
function getTextLength(text) {
  return !text ? 0 : Array.from(text.trim()).length;
}
__name(getTextLength, "getTextLength");
async function fetchSourceRule(session, nodeId) {
  const matchedRules = await session.sendCommand("CSS.getMatchedStylesForNode", {
    nodeId
  });
  const sourceRule = getEffectiveFontRule(matchedRules);
  if (!sourceRule) return void 0;
  return {
    type: sourceRule.type,
    range: sourceRule.range,
    styleSheetId: sourceRule.styleSheetId,
    parentRule: sourceRule.parentRule && {
      origin: sourceRule.parentRule.origin,
      selectors: sourceRule.parentRule.selectors
    }
  };
}
__name(fetchSourceRule, "fetchSourceRule");
var FontSize = class _FontSize extends base_gatherer_default {
  static {
    __name(this, "FontSize");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.ProtocolSession} session
   * @param {Array<NodeFontData>} failingNodes
   */
  static async fetchFailingNodeSourceRules(session, failingNodes) {
    const nodesToAnalyze = failingNodes.sort((a, b) => b.textLength - a.textLength).slice(0, MAX_NODES_SOURCE_RULE_FETCHED);
    await session.sendCommand("DOM.getDocument", { depth: -1, pierce: true });
    const { nodeIds } = await session.sendCommand("DOM.pushNodesByBackendIdsToFrontend", {
      backendNodeIds: nodesToAnalyze.map((node) => node.parentNode.backendNodeId)
    });
    const analysisPromises = nodesToAnalyze.map(async (failingNode, i) => {
      failingNode.nodeId = nodeIds[i];
      try {
        const cssRule = await fetchSourceRule(session, nodeIds[i]);
        failingNode.cssRule = cssRule;
      } catch (err) {
        failingNode.cssRule = void 0;
      }
      return failingNode;
    });
    const analyzedFailingNodesData = await Promise.all(analysisPromises);
    const analyzedFailingTextLength = analyzedFailingNodesData.reduce(
      (sum, { textLength }) => sum += textLength,
      0
    );
    return { analyzedFailingNodesData, analyzedFailingTextLength };
  }
  /**
   * Returns the TextNodes in a DOM Snapshot.
   * Every entry is associated with a TextNode in the layout tree (not display: none).
   * @param {LH.Crdp.DOMSnapshot.CaptureSnapshotResponse} snapshot
   */
  getTextNodesInLayoutFromSnapshot(snapshot) {
    const strings = snapshot.strings;
    const getString = /* @__PURE__ */ __name((index) => strings[index], "getString");
    const getFloat = /* @__PURE__ */ __name((index) => parseFloat(strings[index]), "getFloat");
    const textNodesData = [];
    for (let j = 0; j < snapshot.documents.length; j++) {
      const doc = snapshot.documents[j];
      if (!doc.nodes.backendNodeId || !doc.nodes.parentIndex || !doc.nodes.attributes || !doc.nodes.nodeName) {
        throw new Error("Unexpected response from DOMSnapshot.captureSnapshot.");
      }
      const nodes = (
        /** @type {Required<typeof doc['nodes']>} */
        doc.nodes
      );
      const getParentData = /* @__PURE__ */ __name((parentIndex) => ({
        backendNodeId: nodes.backendNodeId[parentIndex],
        attributes: nodes.attributes[parentIndex].map(getString),
        nodeName: getString(nodes.nodeName[parentIndex])
      }), "getParentData");
      for (const layoutIndex of doc.textBoxes.layoutIndex) {
        const text = strings[doc.layout.text[layoutIndex]];
        if (!text) continue;
        const nodeIndex = doc.layout.nodeIndex[layoutIndex];
        const styles = doc.layout.styles[layoutIndex];
        const [fontSizeStringId, visibilityStringId] = styles;
        const fontSize = getFloat(fontSizeStringId);
        const visibility = getString(visibilityStringId);
        const parentIndex = nodes.parentIndex[nodeIndex];
        const grandParentIndex = nodes.parentIndex[parentIndex];
        const parentNode = getParentData(parentIndex);
        const grandParentNode = grandParentIndex !== void 0 ? getParentData(grandParentIndex) : void 0;
        textNodesData.push({
          nodeIndex,
          backendNodeId: nodes.backendNodeId[nodeIndex],
          fontSize,
          visibility,
          textLength: getTextLength(text),
          parentNode: {
            ...parentNode,
            parentNode: grandParentNode
          }
        });
      }
    }
    return textNodesData;
  }
  /**
   * Get all the failing text nodes that don't meet the legible text threshold.
   * @param {LH.Crdp.DOMSnapshot.CaptureSnapshotResponse} snapshot
   */
  findFailingNodes(snapshot) {
    const failingNodes = [];
    let totalTextLength = 0;
    let failingTextLength = 0;
    for (const textNodeData of this.getTextNodesInLayoutFromSnapshot(snapshot)) {
      if (textNodeData.visibility === "hidden") {
        continue;
      }
      totalTextLength += textNodeData.textLength;
      if (textNodeData.fontSize >= MINIMAL_LEGIBLE_FONT_SIZE_PX) {
        continue;
      }
      failingTextLength += textNodeData.textLength;
      failingNodes.push({
        nodeId: 0,
        // Set later in fetchFailingNodeSourceRules.
        parentNode: textNodeData.parentNode,
        textLength: textNodeData.textLength,
        fontSize: textNodeData.fontSize
      });
    }
    return { totalTextLength, failingTextLength, failingNodes };
  }
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts.FontSize>} font-size analysis
   */
  async getArtifact(passContext) {
    const session = passContext.driver.defaultSession;
    const stylesheets = /* @__PURE__ */ new Map();
    const onStylesheetAdded = /* @__PURE__ */ __name((sheet) => stylesheets.set(sheet.header.styleSheetId, sheet.header), "onStylesheetAdded");
    session.on("CSS.styleSheetAdded", onStylesheetAdded);
    await Promise.all([
      session.sendCommand("DOMSnapshot.enable"),
      session.sendCommand("DOM.enable"),
      session.sendCommand("CSS.enable")
    ]);
    const snapshot = await session.sendCommand("DOMSnapshot.captureSnapshot", {
      computedStyles: ["font-size", "visibility"]
    });
    const {
      totalTextLength,
      failingTextLength,
      failingNodes
    } = this.findFailingNodes(snapshot);
    const {
      analyzedFailingNodesData,
      analyzedFailingTextLength
    } = await _FontSize.fetchFailingNodeSourceRules(session, failingNodes);
    session.off("CSS.styleSheetAdded", onStylesheetAdded);
    analyzedFailingNodesData.filter((data) => data.cssRule?.styleSheetId).forEach((data) => data.cssRule.stylesheet = stylesheets.get(data.cssRule.styleSheetId));
    await Promise.all([
      session.sendCommand("DOMSnapshot.disable"),
      session.sendCommand("DOM.disable"),
      session.sendCommand("CSS.disable")
    ]);
    return {
      analyzedFailingNodesData,
      analyzedFailingTextLength,
      failingTextLength,
      totalTextLength
    };
  }
};
var font_size_default = FontSize;

export {
  findMostSpecificMatchedCSSRule,
  getEffectiveFontRule,
  font_size_default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/seo/font-size.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
