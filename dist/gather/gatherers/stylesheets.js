import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  Sentry
} from "./chunk-ACZALYVN.js";
import "./chunk-3WVTZQMF.js";
import "./chunk-ELEI4PD3.js";
import "./chunk-BSOGFMIV.js";
import {
  lighthouse_logger_default
} from "./chunk-B4FIMLMR.js";
import "./chunk-V6LRM2MD.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-XKFKI4NM.js";
import {
  base_gatherer_default
} from "./chunk-CWN23GK2.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/gather/gatherers/stylesheets.js
var Stylesheets = class extends base_gatherer_default {
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
