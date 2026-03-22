import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  init_shim_fs,
  shim_fs_default
} from "./chunk-7CCOEJTA.js";
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

// node_modules/lighthouse/core/lib/axe.js
init_shim_fs();
import { createRequire } from "module";
var require2 = /* @__PURE__ */ createRequire(import.meta.url);
var axeSource = shim_fs_default.readFileSync(require2.resolve("axe-core/axe.min.js"), "utf8");

// node_modules/lighthouse/core/gather/gatherers/accessibility.js
async function runA11yChecks() {
  const axe = window.axe;
  const application = `lighthouse-${Math.random()}`;
  axe.configure({
    branding: {
      application
    },
    noHtml: true
  });
  const axeResults = await axe.run(document, {
    elementRef: true,
    runOnly: {
      type: "tag",
      values: [
        "wcag2a",
        "wcag2aa"
      ]
    },
    // resultTypes doesn't limit the output of the axeResults object. Instead, if it's defined,
    // some expensive element identification is done only for the respective types. https://github.com/dequelabs/axe-core/blob/f62f0cf18f7b69b247b0b6362cf1ae71ffbf3a1b/lib/core/reporters/helpers/process-aggregate.js#L61-L97
    resultTypes: ["violations", "inapplicable"],
    rules: {
      // Consider http://go/prcpg for expert review of the aXe rules.
      "accesskeys": { enabled: true },
      "area-alt": { enabled: false },
      "aria-allowed-role": { enabled: true },
      "aria-braille-equivalent": { enabled: false },
      "aria-conditional-attr": { enabled: true },
      "aria-deprecated-role": { enabled: true },
      "aria-dialog-name": { enabled: true },
      "aria-prohibited-attr": { enabled: true },
      "aria-roledescription": { enabled: false },
      "aria-treeitem-name": { enabled: true },
      "aria-text": { enabled: true },
      "audio-caption": { enabled: false },
      "blink": { enabled: false },
      "duplicate-id": { enabled: false },
      "empty-heading": { enabled: true },
      "frame-focusable-content": { enabled: false },
      "frame-title-unique": { enabled: false },
      "heading-order": { enabled: true },
      "html-xml-lang-mismatch": { enabled: true },
      "identical-links-same-purpose": { enabled: true },
      "image-redundant-alt": { enabled: true },
      "input-button-name": { enabled: true },
      "label-content-name-mismatch": { enabled: true },
      "landmark-one-main": { enabled: true },
      "link-in-text-block": { enabled: true },
      "marquee": { enabled: false },
      "meta-viewport": { enabled: true },
      // https://github.com/dequelabs/axe-core/issues/2958
      "nested-interactive": { enabled: false },
      "no-autoplay-audio": { enabled: false },
      "role-img-alt": { enabled: false },
      "scrollable-region-focusable": { enabled: false },
      "select-name": { enabled: true },
      "server-side-image-map": { enabled: false },
      "skip-link": { enabled: true },
      // https://github.com/GoogleChrome/lighthouse/issues/16163
      "summary-name": { enabled: false },
      "svg-img-alt": { enabled: false },
      "tabindex": { enabled: true },
      "table-duplicate-name": { enabled: true },
      "table-fake-caption": { enabled: true },
      "target-size": { enabled: true },
      "td-has-header": { enabled: true }
    }
  });
  document.documentElement.scrollTop = 0;
  return {
    violations: axeResults.violations.map(createAxeRuleResultArtifact),
    incomplete: axeResults.incomplete.map(createAxeRuleResultArtifact),
    notApplicable: axeResults.inapplicable.map((result) => ({ id: result.id })),
    // FYI: inapplicable => notApplicable!
    passes: axeResults.passes.map((result) => ({ id: result.id })),
    version: axeResults.testEngine.version
  };
}
__name(runA11yChecks, "runA11yChecks");
async function runA11yChecksAndResetScroll() {
  const originalScrollPosition = {
    x: window.scrollX,
    y: window.scrollY
  };
  try {
    return await runA11yChecks();
  } finally {
    window.scrollTo(originalScrollPosition.x, originalScrollPosition.y);
  }
}
__name(runA11yChecksAndResetScroll, "runA11yChecksAndResetScroll");
function createAxeRuleResultArtifact(result) {
  const nodes = result.nodes.map((node) => {
    const { target, failureSummary, element } = node;
    const nodeDetails = getNodeDetails(
      /** @type {HTMLElement} */
      element
    );
    const relatedNodeElements = /* @__PURE__ */ new Set();
    const impactToNumber = /* @__PURE__ */ __name((impact) => [null, "minor", "moderate", "serious", "critical"].indexOf(impact), "impactToNumber");
    const checkResults = [...node.any, ...node.all, ...node.none].sort((a, b) => impactToNumber(b.impact) - impactToNumber(a.impact));
    for (const checkResult of checkResults) {
      for (const relatedNode of checkResult.relatedNodes || []) {
        const relatedElement = relatedNode.element;
        if (relatedNodeElements.size >= 3) break;
        if (!relatedElement) continue;
        if (element === relatedElement) continue;
        relatedNodeElements.add(relatedElement);
      }
    }
    const relatedNodeDetails = [...relatedNodeElements].map(getNodeDetails);
    return {
      target,
      failureSummary,
      node: nodeDetails,
      relatedNodes: relatedNodeDetails
    };
  });
  const resultError = result.error;
  let error;
  if (resultError instanceof Error) {
    error = {
      name: resultError.name,
      message: resultError.message
    };
  }
  return {
    id: result.id,
    impact: result.impact || void 0,
    tags: result.tags,
    nodes,
    error
  };
}
__name(createAxeRuleResultArtifact, "createAxeRuleResultArtifact");
var Accessibility = class extends base_gatherer_default {
  static {
    __name(this, "Accessibility");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  static pageFns = {
    runA11yChecks,
    createAxeRuleResultArtifact
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts.Accessibility>}
   */
  getArtifact(passContext) {
    const driver = passContext.driver;
    return driver.executionContext.evaluate(runA11yChecksAndResetScroll, {
      args: [],
      useIsolation: true,
      deps: [
        axeSource,
        pageFunctions.getNodeDetails,
        createAxeRuleResultArtifact,
        runA11yChecks
      ]
    });
  }
};
var accessibility_default = Accessibility;
export {
  accessibility_default as default
};
/*! Bundled license information:

lighthouse/core/lib/axe.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)

lighthouse/core/gather/gatherers/accessibility.js:
  (**
   * @license
   * Copyright 2016 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
