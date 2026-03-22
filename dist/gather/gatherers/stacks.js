import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  lighthouse_logger_default
} from "./chunk-FOYXSDFQ.js";
import "./chunk-C5HPB2FB.js";
import {
  init_shim_fs,
  shim_fs_default
} from "./chunk-DQQIQ7YS.js";
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/stacks.js
init_shim_fs();
import { createRequire } from "module";
var require2 = /* @__PURE__ */ createRequire(import.meta.url);
var libDetectorSource = shim_fs_default.readFileSync(
  require2.resolve("js-library-detector/library/libraries.js"),
  "utf8"
);
async function detectLibraries() {
  const libraries = [];
  const libraryDetectorTests = d41d8cd98f00b204e9800998ecf8427e_LibraryDetectorTests;
  for (const [name, lib] of Object.entries(libraryDetectorTests)) {
    try {
      let timeout;
      const timeoutPromise = new Promise((r) => timeout = setTimeout(() => r(false), 1e3));
      const result = await Promise.race([lib.test(window), timeoutPromise]);
      if (timeout) clearTimeout(timeout);
      if (result) {
        libraries.push({
          id: lib.id,
          name,
          version: result.version,
          npm: lib.npm
        });
      }
    } catch (e) {
    }
  }
  return libraries;
}
__name(detectLibraries, "detectLibraries");
var Stacks = class _Stacks extends base_gatherer_default {
  static {
    __name(this, "Stacks");
  }
  constructor() {
    super();
    this.meta = {
      supportedModes: ["snapshot", "navigation"]
    };
  }
  /**
   * @param {LH.Gatherer.Driver['executionContext']} executionContext
   * @return {Promise<LH.Artifacts['Stacks']>}
   */
  static async collectStacks(executionContext) {
    const status = { msg: "Collect stacks", id: "lh:gather:collectStacks" };
    lighthouse_logger_default.time(status);
    const jsLibraries = await executionContext.evaluate(detectLibraries, {
      args: [],
      deps: [libDetectorSource]
    });
    const stacks = jsLibraries.map((lib) => ({
      detector: "js",
      id: lib.id,
      name: lib.name,
      version: typeof lib.version === "number" ? String(lib.version) : lib.version || void 0,
      npm: lib.npm || void 0
    }));
    lighthouse_logger_default.timeEnd(status);
    return stacks;
  }
  /**
   * @param {LH.Gatherer.Context} context
   * @return {Promise<LH.Artifacts['Stacks']>}
   */
  async getArtifact(context) {
    try {
      return await _Stacks.collectStacks(context.driver.executionContext);
    } catch {
      return [];
    }
  }
};
var stacks_default = Stacks;
export {
  stacks_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/stacks.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
