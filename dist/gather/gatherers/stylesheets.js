import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  Sentry
} from "./chunk-WB2OF2LL.js";
import "./chunk-JRAJ3QIZ.js";
import "./chunk-62BSSGB3.js";
import "./chunk-GO42M3MA.js";
import {
  lighthouse_logger_default
} from "./chunk-VDXIC3K2.js";
import "./chunk-YWWNWPSO.js";
import "./chunk-7CCOEJTA.js";
import "./chunk-5LGJRNXS.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/stylesheets.js
var Stylesheets = class extends base_gatherer_default {
  static {
    __name(this, "Stylesheets");
  }
  constructor() {
    super();
    this._session = void 0;
    this._sheetPromises = /* @__PURE__ */ new Map();
    this._onStylesheetAdded = this._onStylesheetAdded.bind(this);
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "timespan", "navigation"]
  };
  /**
   * @param {LH.Crdp.CSS.StyleSheetAddedEvent} event
   */
  _onStylesheetAdded(event) {
    if (!this._session) throw new Error("Session not initialized");
    const styleSheetId = event.header.styleSheetId;
    const sheetPromise = this._session.sendCommand("CSS.getStyleSheetText", { styleSheetId }).then((content) => ({
      header: event.header,
      content: content.text
    })).catch((err) => {
      lighthouse_logger_default.warn(
        "Stylesheets",
        `Error fetching content of stylesheet with URL "${event.header.sourceURL}"`
      );
      Sentry.captureException(err, {
        tags: {
          gatherer: "Stylesheets"
        },
        extra: {
          url: event.header.sourceURL
        },
        level: "error"
      });
      return null;
    });
    this._sheetPromises.set(styleSheetId, sheetPromise);
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Artifacts['Stylesheets']>}
   */
  async getArtifact(context) {
    const executionContext = context.driver.executionContext;
    const session = context.driver.defaultSession;
    this._session = session;
    session.on("CSS.styleSheetAdded", this._onStylesheetAdded);
    await session.sendCommand("DOM.enable");
    await session.sendCommand("CSS.enable");
    await executionContext.evaluate(() => window.getComputedStyle(document.body), {
      args: []
    });
    session.off("CSS.styleSheetAdded", this._onStylesheetAdded);
    const sheets = await Promise.all(this._sheetPromises.values());
    await session.sendCommand("CSS.disable");
    await session.sendCommand("DOM.disable");
    const dedupedStylesheets = /* @__PURE__ */ new Map();
    for (const sheet of sheets) {
      if (!sheet) continue;
      if (sheet.header.length === 0) {
        continue;
      }
      dedupedStylesheets.set(sheet.content, sheet);
    }
    return Array.from(dedupedStylesheets.values());
  }
};
var stylesheets_default = Stylesheets;
export {
  stylesheets_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/stylesheets.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
