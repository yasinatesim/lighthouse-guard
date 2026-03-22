import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  resolveDevtoolsNodePathToObjectId
} from "./chunk-GSA6V4GF.js";
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

// node_modules/lighthouse/core/gather/gatherers/anchor-elements.js
function collectAnchorElements() {
  const resolveURLOrEmpty = /* @__PURE__ */ __name((url) => {
    try {
      return new URL(url, window.location.href).href;
    } catch (_) {
      return "";
    }
  }, "resolveURLOrEmpty");
  function getTruncatedOnclick(node) {
    const onclick = node.getAttribute("onclick") || "";
    return onclick.slice(0, 1024);
  }
  __name(getTruncatedOnclick, "getTruncatedOnclick");
  function getLangOfInnerText(node) {
    let curNodeLang = null;
    for (const child of node.querySelectorAll("*")) {
      if (!child.textContent) continue;
      const childLang = child.closest("[lang]")?.getAttribute("lang");
      if (!childLang) continue;
      if (!curNodeLang) {
        curNodeLang = childLang;
        continue;
      }
      if (curNodeLang.split("-")[0] !== childLang.split("-")[0]) {
        return null;
      }
    }
    return curNodeLang ?? node.closest("[lang]")?.getAttribute("lang") ?? null;
  }
  __name(getLangOfInnerText, "getLangOfInnerText");
  const anchorElements = getElementsInDocument("a");
  const langElements = getElementsInDocument("[lang]");
  const documentHasSingleLang = langElements.length === 1 && (langElements[0].nodeName === "BODY" || langElements[0].nodeName === "HTML");
  const singleLang = documentHasSingleLang ? langElements[0].getAttribute("lang") : null;
  return anchorElements.map((node) => {
    if (node instanceof HTMLAnchorElement) {
      return {
        href: node.href,
        rawHref: node.getAttribute("href") || "",
        onclick: getTruncatedOnclick(node),
        role: node.getAttribute("role") || "",
        name: node.name,
        text: node.innerText,
        // we don't want to return hidden text, so use innerText
        textLang: singleLang ?? getLangOfInnerText(node) ?? void 0,
        rel: node.rel,
        target: node.target,
        id: node.getAttribute("id") || "",
        attributeNames: node.getAttributeNames(),
        // @ts-expect-error - getNodeDetails put into scope via stringification
        node: getNodeDetails(node)
      };
    }
    return {
      href: resolveURLOrEmpty(node.href.baseVal),
      rawHref: node.getAttribute("href") || "",
      onclick: getTruncatedOnclick(node),
      role: node.getAttribute("role") || "",
      text: node.textContent || "",
      textLang: singleLang ?? getLangOfInnerText(node) ?? void 0,
      rel: "",
      target: node.target.baseVal || "",
      id: node.getAttribute("id") || "",
      attributeNames: node.getAttributeNames(),
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(node)
    };
  });
}
__name(collectAnchorElements, "collectAnchorElements");
async function getEventListeners(session, devtoolsNodePath) {
  const objectId = await resolveDevtoolsNodePathToObjectId(session, devtoolsNodePath);
  if (!objectId) return [];
  const response = await session.sendCommand("DOMDebugger.getEventListeners", {
    objectId
  });
  return response.listeners.map(({ type }) => ({ type }));
}
__name(getEventListeners, "getEventListeners");
var AnchorElements = class extends base_gatherer_default {
  static {
    __name(this, "AnchorElements");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['AnchorElements']>}
   */
  async getArtifact(passContext) {
    const session = passContext.driver.defaultSession;
    const anchors = await passContext.driver.executionContext.evaluate(collectAnchorElements, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getElementsInDocument,
        pageFunctions.getNodeDetails
      ]
    });
    await session.sendCommand("DOM.enable");
    await session.sendCommand("DOM.getDocument", { depth: -1, pierce: true });
    const anchorsWithEventListeners = anchors.map(async (anchor) => {
      const listeners = await getEventListeners(session, anchor.node.devtoolsNodePath);
      const ancestorListeners = /* @__PURE__ */ new Set();
      const splitPath = anchor.node.devtoolsNodePath.split(",");
      const ancestorListenerPromises = [];
      while (splitPath.length >= 2) {
        splitPath.length -= 2;
        const path = splitPath.join(",");
        const promise = getEventListeners(session, path).then((listeners2) => {
          for (const listener of listeners2) {
            ancestorListeners.add(listener);
          }
        }).catch(() => {
        });
        ancestorListenerPromises.push(promise);
      }
      await Promise.all(ancestorListenerPromises);
      return {
        ...anchor,
        listeners,
        ancestorListeners: Array.from(ancestorListeners)
      };
    });
    const result = await Promise.all(anchorsWithEventListeners);
    await session.sendCommand("DOM.disable");
    return result;
  }
};
var anchor_elements_default = AnchorElements;
export {
  anchor_elements_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/anchor-elements.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
