import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  NetworkRecordsComputed
} from "./chunk-QE4YYANC.js";
import "./chunk-HXOADL7R.js";
import "./chunk-FOYXSDFQ.js";
import "./chunk-C5HPB2FB.js";
import "./chunk-DQQIQ7YS.js";
import "./chunk-SLD7CHCU.js";
import {
  devtools_log_default
} from "./chunk-NSCX6JDY.js";
import {
  base_gatherer_default
} from "./chunk-3PE3GB6I.js";
import {
  __name
} from "./chunk-XE6XARIN.js";

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
