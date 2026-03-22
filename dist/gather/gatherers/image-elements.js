import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  findMostSpecificMatchedCSSRule
} from "./chunk-YOBGMED4.js";
import {
  lighthouse_logger_default
} from "./chunk-VDXIC3K2.js";
import "./chunk-YWWNWPSO.js";
import {
  pageFunctions
} from "./chunk-GO4LGQT6.js";
import "./chunk-5LGJRNXS.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/image-elements.js
function getClientRect(element) {
  const clientRect = element.getBoundingClientRect();
  return {
    // Just grab the DOMRect properties we want, excluding x/y/width/height
    top: clientRect.top,
    bottom: clientRect.bottom,
    left: clientRect.left,
    right: clientRect.right
  };
}
__name(getClientRect, "getClientRect");
function getPosition(element, computedStyle) {
  if (element.parentElement && element.parentElement.tagName === "PICTURE") {
    const parentStyle = window.getComputedStyle(element.parentElement);
    return parentStyle.getPropertyValue("position");
  }
  return computedStyle.getPropertyValue("position");
}
__name(getPosition, "getPosition");
function getHTMLImages(allElements) {
  const allImageElements = (
    /** @type {Array<HTMLImageElement>} */
    allElements.filter((element) => {
      return element.localName === "img";
    })
  );
  return allImageElements.map((element) => {
    const computedStyle = window.getComputedStyle(element);
    const isPicture = !!element.parentElement && element.parentElement.tagName === "PICTURE";
    const canTrustNaturalDimensions = !isPicture && !element.srcset;
    return {
      // currentSrc used over src to get the url as determined by the browser
      // after taking into account srcset/media/sizes/etc.
      src: element.currentSrc,
      srcset: element.srcset,
      displayedWidth: element.width,
      displayedHeight: element.height,
      clientRect: getClientRect(element),
      attributeWidth: element.getAttribute("width"),
      attributeHeight: element.getAttribute("height"),
      naturalDimensions: canTrustNaturalDimensions ? { width: element.naturalWidth, height: element.naturalHeight } : void 0,
      cssRules: void 0,
      // this will get overwritten below
      computedStyles: {
        position: getPosition(element, computedStyle),
        objectFit: computedStyle.getPropertyValue("object-fit"),
        imageRendering: computedStyle.getPropertyValue("image-rendering")
      },
      isCss: false,
      isPicture,
      loading: element.loading,
      isInShadowDOM: element.getRootNode() instanceof ShadowRoot,
      fetchPriority: element.fetchPriority,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(element)
    };
  });
}
__name(getHTMLImages, "getHTMLImages");
function getCSSImages(allElements) {
  const CSS_URL_REGEX = /^url\("([^"]+)"\)$/;
  const images = [];
  for (const element of allElements) {
    const style = window.getComputedStyle(element);
    if (!style.backgroundImage || !CSS_URL_REGEX.test(style.backgroundImage)) continue;
    const imageMatch = style.backgroundImage.match(CSS_URL_REGEX);
    const url = imageMatch[1];
    images.push({
      src: url,
      srcset: "",
      displayedWidth: element.clientWidth,
      displayedHeight: element.clientHeight,
      clientRect: getClientRect(element),
      attributeWidth: null,
      attributeHeight: null,
      naturalDimensions: void 0,
      cssEffectiveRules: void 0,
      computedStyles: {
        position: getPosition(element, style),
        objectFit: "",
        imageRendering: style.getPropertyValue("image-rendering")
      },
      isCss: true,
      isPicture: false,
      isInShadowDOM: element.getRootNode() instanceof ShadowRoot,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(element)
    });
  }
  return images;
}
__name(getCSSImages, "getCSSImages");
function collectImageElementInfo() {
  const allElements = getElementsInDocument();
  return getHTMLImages(allElements).concat(getCSSImages(allElements));
}
__name(collectImageElementInfo, "collectImageElementInfo");
function determineNaturalSize(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("error", (_) => reject(new Error("determineNaturalSize failed img load")));
    img.addEventListener("load", () => {
      resolve({
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      });
    });
    img.src = url;
  });
}
__name(determineNaturalSize, "determineNaturalSize");
function findSizeDeclaration(rule, property) {
  if (!rule || !rule.cssProperties) return;
  const definedProp = rule.cssProperties.find(({ name }) => name === property);
  if (!definedProp) return;
  return definedProp.value;
}
__name(findSizeDeclaration, "findSizeDeclaration");
function findMostSpecificCSSRule(matchedCSSRules, property) {
  const isDeclarationofInterest = /* @__PURE__ */ __name((declaration) => findSizeDeclaration(declaration, property), "isDeclarationofInterest");
  const rule = findMostSpecificMatchedCSSRule(matchedCSSRules, isDeclarationofInterest);
  if (!rule) return;
  return findSizeDeclaration(rule, property);
}
__name(findMostSpecificCSSRule, "findMostSpecificCSSRule");
function getEffectiveSizingRule({ attributesStyle, inlineStyle, matchedCSSRules }, property) {
  const inlineRule = findSizeDeclaration(inlineStyle, property);
  if (inlineRule) return inlineRule;
  const attributeRule = findSizeDeclaration(attributesStyle, property);
  if (attributeRule) return attributeRule;
  const matchedRule = findMostSpecificCSSRule(matchedCSSRules, property);
  if (matchedRule) return matchedRule;
  return null;
}
__name(getEffectiveSizingRule, "getEffectiveSizingRule");
function getPixelArea(element) {
  if (element.naturalDimensions) {
    return element.naturalDimensions.height * element.naturalDimensions.width;
  }
  return element.displayedHeight * element.displayedWidth;
}
__name(getPixelArea, "getPixelArea");
var ImageElements = class extends base_gatherer_default {
  static {
    __name(this, "ImageElements");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "timespan", "navigation"]
  };
  constructor() {
    super();
    this._naturalSizeCache = /* @__PURE__ */ new Map();
  }
  /**
   * @param {LH.Gatherer.Driver} driver
   * @param {LH.Artifacts.ImageElement} element
   */
  async fetchElementWithSizeInformation(driver, element) {
    const url = element.src;
    let size = this._naturalSizeCache.get(url);
    if (!size) {
      try {
        driver.defaultSession.setNextProtocolTimeout(250);
        size = await driver.executionContext.evaluate(determineNaturalSize, {
          args: [url],
          useIsolation: true
        });
        this._naturalSizeCache.set(url, size);
      } catch (_) {
      }
    }
    if (!size) return;
    element.naturalDimensions = { width: size.naturalWidth, height: size.naturalHeight };
  }
  /**
   * Images might be sized via CSS. In order to compute unsized-images failures, we need to collect
   * matched CSS rules to see if this is the case.
   * @url http://go/dwoqq (googlers only)
   * @param {LH.Gatherer.ProtocolSession} session
   * @param {string} devtoolsNodePath
   * @param {LH.Artifacts.ImageElement} element
   */
  async fetchSourceRules(session, devtoolsNodePath, element) {
    try {
      const { nodeId } = await session.sendCommand("DOM.pushNodeByPathToFrontend", {
        path: devtoolsNodePath
      });
      if (!nodeId) return;
      const matchedRules = await session.sendCommand("CSS.getMatchedStylesForNode", {
        nodeId
      });
      const width = getEffectiveSizingRule(matchedRules, "width");
      const height = getEffectiveSizingRule(matchedRules, "height");
      const aspectRatio = getEffectiveSizingRule(matchedRules, "aspect-ratio");
      element.cssEffectiveRules = { width, height, aspectRatio };
    } catch (err) {
      if (/No node.*found/.test(err.message)) return;
      throw err;
    }
  }
  /**
   *
   * @param {LH.Gatherer.Driver} driver
   * @param {LH.Artifacts.ImageElement[]} elements
   */
  async collectExtraDetails(driver, elements) {
    let reachedGatheringBudget = false;
    setTimeout((_) => reachedGatheringBudget = true, 5e3);
    let skippedCount = 0;
    for (const element of elements) {
      if (reachedGatheringBudget) {
        skippedCount++;
        continue;
      }
      if (!element.isInShadowDOM && !element.isCss) {
        await this.fetchSourceRules(driver.defaultSession, element.node.devtoolsNodePath, element);
      }
      if (element.isPicture || element.isCss || element.srcset) {
        await this.fetchElementWithSizeInformation(driver, element);
      }
    }
    if (reachedGatheringBudget) {
      lighthouse_logger_default.warn("ImageElements", `Reached gathering budget of 5s. Skipped extra details for ${skippedCount}/${elements.length}`);
    }
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Artifacts['ImageElements']>}
   */
  async getArtifact(context) {
    const session = context.driver.defaultSession;
    const executionContext = context.driver.executionContext;
    const elements = await executionContext.evaluate(collectImageElementInfo, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getElementsInDocument,
        pageFunctions.getBoundingClientRect,
        pageFunctions.getNodeDetails,
        getClientRect,
        getPosition,
        getHTMLImages,
        getCSSImages
      ]
    });
    await Promise.all([
      session.sendCommand("DOM.enable"),
      session.sendCommand("CSS.enable"),
      session.sendCommand("DOM.getDocument", { depth: -1, pierce: true })
    ]);
    elements.sort((a, b) => getPixelArea(b) - getPixelArea(a));
    await this.collectExtraDetails(context.driver, elements);
    await Promise.all([
      session.sendCommand("DOM.disable"),
      session.sendCommand("CSS.disable")
    ]);
    return elements;
  }
};
var image_elements_default = ImageElements;
export {
  image_elements_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/image-elements.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
