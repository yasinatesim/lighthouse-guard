import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  Audit
} from "./chunk-ZGW6XDCS.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/audits/manual/manual-audit.js
var ManualAudit = class extends Audit {
  static {
    __name(this, "ManualAudit");
  }
  /**
   * @return {Pick<LH.Audit.Meta, 'scoreDisplayMode'|'requiredArtifacts'>}
   */
  static get partialMeta() {
    return {
      scoreDisplayMode: Audit.SCORING_MODES.MANUAL,
      requiredArtifacts: []
    };
  }
  /**
   * @return {LH.Audit.Product}
   */
  static audit() {
    return {
      score: 0
      // displayValue: '(needs manual verification)'
    };
  }
};
var manual_audit_default = ManualAudit;

export {
  manual_audit_default
};
/*! Bundled license information:

lighthouse/core/audits/manual/manual-audit.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
