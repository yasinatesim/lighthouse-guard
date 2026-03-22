import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
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

// node_modules/lighthouse/core/audits/dobetterweb/paste-preventing-inputs.js
var UIStrings2 = {
  /** Title of a Lighthouse audit that provides detail on the ability to paste into input fields. This descriptive title is shown to users when the page allows pasting of content into input fields. */
  title: "Allows users to paste into input fields",
  /** Title of a Lighthouse audit that provides detail on the ability to paste into input fields. This descriptive title is shown to users when the page does not allow pasting of content into input fields. */
  failureTitle: "Prevents users from pasting into input fields",
  /** Description of a Lighthouse audit that tells the user why they should allow pasting of content into input fields. This is displayed after a user expands the section to see more. No character length limits. 'Learn More' becomes link text to additional documentation. */
  description: "Preventing input pasting is a bad practice for the UX, and weakens security by blocking password managers.[Learn more about user-friendly input fields](https://developer.chrome.com/docs/lighthouse/best-practices/paste-preventing-inputs/)."
};
var str_ = createIcuMessageFn(import.meta.url, UIStrings2);
var PastePreventingInputsAudit = class extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "paste-preventing-inputs",
      title: str_(UIStrings2.title),
      failureTitle: str_(UIStrings2.failureTitle),
      description: str_(UIStrings2.description),
      requiredArtifacts: ["Inputs"]
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @return {LH.Audit.Product}
   */
  static audit(artifacts) {
    const inputsWithPreventsPaste = artifacts.Inputs.inputs.filter((input) => input.preventsPaste);
    const items = [];
    inputsWithPreventsPaste.forEach((input) => {
      items.push({
        node: Audit.makeNodeItem(input.node),
        type: input.type
      });
    });
    const headings = [
      { key: "node", valueType: "node", label: str_(UIStrings.columnFailingElem) }
    ];
    return {
      score: Number(inputsWithPreventsPaste.length === 0),
      details: Audit.makeTableDetails(headings, items)
    };
  }
};
var paste_preventing_inputs_default = PastePreventingInputsAudit;
export {
  UIStrings2 as UIStrings,
  paste_preventing_inputs_default as default
};
/*! Bundled license information:

lighthouse/core/audits/dobetterweb/paste-preventing-inputs.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
