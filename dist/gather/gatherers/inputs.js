import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  pageFunctions
} from "./chunk-RDNFCTTE.js";
import "./chunk-SLD7CHCU.js";
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/gather/gatherers/inputs.js
function collectElements() {
  const inputArtifacts = [];
  const formElToArtifact = /* @__PURE__ */ new Map();
  const labelElToArtifact = /* @__PURE__ */ new Map();
  const formEls = getElementsInDocument("form");
  for (const formEl of formEls) {
    formElToArtifact.set(formEl, {
      id: formEl.id,
      name: formEl.name,
      autocomplete: formEl.autocomplete,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(formEl)
    });
  }
  const labelEls = getElementsInDocument("label");
  for (const labelEl of labelEls) {
    labelElToArtifact.set(labelEl, {
      for: labelEl.htmlFor,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(labelEl)
    });
  }
  const inputEls = getElementsInDocument("textarea, input, select");
  for (const inputEl of inputEls) {
    const parentFormEl = inputEl.form;
    const parentFormIndex = parentFormEl ? [...formElToArtifact.keys()].indexOf(parentFormEl) : void 0;
    const labelIndices = [...inputEl.labels || []].map((labelEl) => {
      return [...labelElToArtifact.keys()].indexOf(labelEl);
    });
    let preventsPaste;
    if (!inputEl.readOnly) {
      preventsPaste = !inputEl.dispatchEvent(new ClipboardEvent("paste", { cancelable: true }));
    }
    inputArtifacts.push({
      parentFormIndex,
      labelIndices,
      id: inputEl.id,
      name: inputEl.name,
      type: inputEl.type,
      placeholder: inputEl instanceof HTMLSelectElement ? void 0 : inputEl.placeholder,
      autocomplete: {
        property: inputEl.autocomplete,
        attribute: inputEl.getAttribute("autocomplete"),
        // Requires `--enable-features=AutofillShowTypePredictions`.
        prediction: inputEl.getAttribute("autofill-prediction")
      },
      preventsPaste,
      // @ts-expect-error - getNodeDetails put into scope via stringification
      node: getNodeDetails(inputEl)
    });
  }
  return {
    inputs: inputArtifacts,
    forms: [...formElToArtifact.values()],
    labels: [...labelElToArtifact.values()]
  };
}
__name(collectElements, "collectElements");
var Inputs = class extends base_gatherer_default {
  static {
    __name(this, "Inputs");
  }
  /** @type {LH.Gatherer.GathererMeta} */
  meta = {
    supportedModes: ["snapshot", "navigation"]
  };
  /**
   * @param {LH.Gatherer.Context} passContext
   * @return {Promise<LH.Artifacts['Inputs']>}
   */
  async getArtifact(passContext) {
    return passContext.driver.executionContext.evaluate(collectElements, {
      args: [],
      useIsolation: true,
      deps: [
        pageFunctions.getElementsInDocument,
        pageFunctions.getNodeDetails
      ]
    });
  }
};
var inputs_default = Inputs;
export {
  inputs_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/inputs.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
