import{createRequire as __cjsReq}from'module';const __baseReq=__cjsReq(import.meta.url);const __vRes={'axe-core/axe.min.js':'axe-core/axe.min.js','js-library-detector/library/libraries.js':'js-library-detector/library/libraries.js'};const require=Object.assign((...a)=>__baseReq(...a),{...(__baseReq),resolve(m,...a){return __vRes[m]??__baseReq.resolve(m,...a);}});
import {
  NetworkRecordsComputed
} from "./chunk-62BSSGB3.js";
import "./chunk-GO42M3MA.js";
import "./chunk-VDXIC3K2.js";
import "./chunk-YWWNWPSO.js";
import "./chunk-7CCOEJTA.js";
import "./chunk-5LGJRNXS.js";
import {
  devtools_log_default
} from "./chunk-2DY3KL3O.js";
import {
  base_gatherer_default
} from "./chunk-BYDJSNVN.js";
import {
  __name
} from "./chunk-TE5Z3W7Q.js";

// node_modules/lighthouse/core/gather/gatherers/inspector-issues.js
var InspectorIssues = class extends base_gatherer_default {
  static {
    __name(this, "InspectorIssues");
  }
  /** @type {LH.Gatherer.GathererMeta<'DevtoolsLog'>} */
  meta = {
    supportedModes: ["timespan", "navigation"],
    dependencies: { DevtoolsLog: devtools_log_default.symbol }
  };
  constructor() {
    super();
    this._issues = [];
    this._onIssueAdded = this.onIssueAdded.bind(this);
  }
  /**
   * @param {LH.Crdp.Audits.IssueAddedEvent} entry
   */
  onIssueAdded(entry) {
    this._issues.push(entry.issue);
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async startInstrumentation(context) {
    const session = context.driver.defaultSession;
    session.on("Audits.issueAdded", this._onIssueAdded);
    await session.sendCommand("Audits.enable");
  }
  /**
   * @param {LH.Gatherer.Context} context
   */
  async stopInstrumentation(context) {
    const session = context.driver.defaultSession;
    session.off("Audits.issueAdded", this._onIssueAdded);
    await session.sendCommand("Audits.disable");
  }
  /**
   * @param {LH.Gatherer.Context<'DevtoolsLog'>} context
   * @return {Promise<LH.Artifacts.InspectorIssues>}
   */
  async getArtifact(context) {
    const devtoolsLog = context.dependencies.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const artifact = {
      // TODO(v13): remove empty arrays.
      attributionReportingIssue: [],
      blockedByResponseIssue: [],
      bounceTrackingIssue: [],
      clientHintIssue: [],
      contentSecurityPolicyIssue: [],
      cookieDeprecationMetadataIssue: [],
      corsIssue: [],
      deprecationIssue: [],
      federatedAuthRequestIssue: [],
      genericIssue: [],
      heavyAdIssue: [],
      lowTextContrastIssue: [],
      mixedContentIssue: [],
      navigatorUserAgentIssue: [],
      partitioningBlobURLIssue: [],
      propertyRuleIssue: [],
      quirksModeIssue: [],
      cookieIssue: [],
      elementAccessibilityIssue: [],
      sharedArrayBufferIssue: [],
      sharedDictionaryIssue: [],
      stylesheetLoadingIssue: [],
      sriMessageSignatureIssue: [],
      federatedAuthUserInfoRequestIssue: [],
      userReidentificationIssue: []
    };
    for (const issue of this._issues) {
      const detailsKey = (
        /** @type {keyof LH.Crdp.Audits.InspectorIssueDetails} */
        Object.keys(issue.details)[0]
      );
      const details = issue.details[detailsKey];
      if (!details) {
        continue;
      }
      const artifactKey = (
        /** @type {LH.Artifacts.InspectorIssuesKeyToArtifactKey<typeof detailsKey>} */
        detailsKey.replace("Details", "")
      );
      const requestId = "request" in details && details.request && details.request.requestId;
      if (requestId) {
        if (networkRecords.find((req) => req.requestId === requestId)) {
          if (!artifact[artifactKey]) {
            artifact[artifactKey] = [];
          }
          artifact[artifactKey].push(details);
        }
      } else {
        if (!artifact[artifactKey]) {
          artifact[artifactKey] = [];
        }
        artifact[artifactKey].push(details);
      }
    }
    return artifact;
  }
};
var inspector_issues_default = InspectorIssues;
export {
  inspector_issues_default as default
};
/*! Bundled license information:

lighthouse/core/gather/gatherers/inspector-issues.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
