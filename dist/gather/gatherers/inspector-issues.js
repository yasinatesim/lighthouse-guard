import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRecordsComputed
} from "./chunk-ELEI4PD3.js";
import "./chunk-BSOGFMIV.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-V6LRM2MD.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-XKFKI4NM.js";
import {
  devtools_log_default
} from "./chunk-BINTPAJN.js";
import {
  base_gatherer_default
} from "./chunk-CWN23GK2.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/gather/gatherers/inspector-issues.js
var InspectorIssues = class extends base_gatherer_default {
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
