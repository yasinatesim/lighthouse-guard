import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  UnusedJavascriptSummaryComputed
} from "./chunk-UN2LSKXU.js";
import {
  ModuleDuplicationComputed
} from "./chunk-IVDAVZ2R.js";
import {
  JSBundlesComputed
} from "./chunk-QQ76V5R3.js";
import {
  getRequestForScript,
  isInline
} from "./chunk-S2GJPGDO.js";
import "./chunk-3KEMYTTF.js";
import {
  NetworkRecordsComputed
} from "./chunk-JDNHHZFJ.js";
import "./chunk-YNYBF6HU.js";
import "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
import "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/script-treemap-data.js
var ScriptTreemapDataAudit = class _ScriptTreemapDataAudit extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "script-treemap-data",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: "Script Treemap Data",
      description: "Used for treemap app",
      requiredArtifacts: ["Trace", "DevtoolsLog", "SourceMaps", "Scripts", "JsUsage", "URL", "SourceMaps"]
    };
  }
  /**
   * Returns a tree data structure where leaf nodes are sources (ie. real files from source tree)
   * from a source map, and non-leaf nodes are directories. Leaf nodes have data
   * for bytes, coverage, etc., when available, and non-leaf nodes have the
   * same data as the sum of all descendant leaf nodes.
   * @param {string} src
   * @param {string} sourceRoot
   * @param {Record<string, SourceData>} sourcesData
   * @return {LH.Treemap.Node}
   */
  static makeScriptNode(src, sourceRoot, sourcesData) {
    function newNode(name) {
      return {
        name,
        resourceBytes: 0,
        encodedBytes: void 0
      };
    }
    const sourceRootNode = newNode(sourceRoot);
    function addAllNodesInSourcePath(source, data) {
      let node = sourceRootNode;
      sourceRootNode.resourceBytes += data.resourceBytes;
      if (data.unusedBytes) {
        sourceRootNode.unusedBytes = (sourceRootNode.unusedBytes || 0) + data.unusedBytes;
      }
      const sourcePathSegments = source.replace(sourceRoot, "").split(/\/+/);
      sourcePathSegments.forEach((sourcePathSegment, i) => {
        if (sourcePathSegment.length === 0) return;
        const isLeaf = i === sourcePathSegments.length - 1;
        let child = node.children && node.children.find((child2) => child2.name === sourcePathSegment);
        if (!child) {
          child = newNode(sourcePathSegment);
          node.children = node.children || [];
          node.children.push(child);
        }
        node = child;
        node.resourceBytes += data.resourceBytes;
        if (data.unusedBytes) node.unusedBytes = (node.unusedBytes || 0) + data.unusedBytes;
        if (isLeaf && data.duplicatedNormalizedModuleName !== void 0) {
          node.duplicatedNormalizedModuleName = data.duplicatedNormalizedModuleName;
        }
      });
    }
    for (const [source, data] of Object.entries(sourcesData)) {
      addAllNodesInSourcePath(source, data);
    }
    function collapseAll(node) {
      while (node.children && node.children.length === 1) {
        const child = node.children[0];
        node.name += "/" + child.name;
        if (child.duplicatedNormalizedModuleName) {
          node.duplicatedNormalizedModuleName = child.duplicatedNormalizedModuleName;
        }
        node.children = child.children;
      }
      if (node.children) {
        for (const child of node.children) {
          collapseAll(child);
        }
      }
    }
    collapseAll(sourceRootNode);
    if (!sourceRootNode.name) {
      return {
        ...sourceRootNode,
        name: src,
        children: sourceRootNode.children
      };
    }
    const scriptNode = { ...sourceRootNode };
    scriptNode.name = src;
    scriptNode.children = [sourceRootNode];
    return scriptNode;
  }
  /**
   * Returns nodes where the first level of nodes are URLs.
   * Every external script has a node.
   * All inline scripts are combined into a single node.
   * If a script has a source map, that node will be created by makeScriptNode.
   *
   * Example return result:
     - index.html (inline scripts)
     - main.js
     - - webpack://
     - - - react.js
     - - - app.js
     - i-have-no-map.js
   *
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Treemap.Node[]>}
   */
  static async makeNodes(artifacts, context) {
    const devtoolsLog = artifacts.DevtoolsLog;
    const networkRecords = await NetworkRecordsComputed.request(devtoolsLog, context);
    const nodes = [];
    const htmlNodesByFrameId = /* @__PURE__ */ new Map();
    const bundles = await JSBundlesComputed.request(artifacts, context);
    const duplicationByPath = await ModuleDuplicationComputed.request(artifacts, context);
    for (const script of artifacts.Scripts) {
      if (script.scriptLanguage !== "JavaScript") continue;
      const name = script.url;
      const bundle = bundles.find((bundle2) => script.scriptId === bundle2.script.scriptId) ?? null;
      const scriptCoverage = (
        /** @type {LH.Artifacts['JsUsage'][string] | undefined} */
        artifacts.JsUsage[script.scriptId]
      );
      const unusedJavascriptSummary = scriptCoverage ? await UnusedJavascriptSummaryComputed.request(
        { scriptId: script.scriptId, scriptCoverage, bundle },
        context
      ) : void 0;
      let node;
      if (bundle && !("errorMessage" in bundle.sizes)) {
        const sourcesData = {};
        for (const source of Object.keys(bundle.sizes.files)) {
          const sourceData = {
            resourceBytes: bundle.sizes.files[source]
          };
          if (unusedJavascriptSummary?.sourcesWastedBytes) {
            sourceData.unusedBytes = unusedJavascriptSummary.sourcesWastedBytes[source];
          }
          let sourceWithoutSourceRoot = source;
          if (bundle.rawMap.sourceRoot && source.startsWith(bundle.rawMap.sourceRoot)) {
            sourceWithoutSourceRoot = source.replace(bundle.rawMap.sourceRoot, "");
          }
          const key = ModuleDuplicationComputed.normalizeSource(sourceWithoutSourceRoot);
          if (duplicationByPath.has(key)) sourceData.duplicatedNormalizedModuleName = key;
          sourcesData[source] = sourceData;
        }
        if (bundle.sizes.unmappedBytes) {
          const sourceData = {
            resourceBytes: bundle.sizes.unmappedBytes
          };
          if (unusedJavascriptSummary?.sourcesWastedBytes) {
            sourceData.unusedBytes = unusedJavascriptSummary.sourcesWastedBytes["(unmapped)"];
          }
          sourcesData["(unmapped)"] = sourceData;
        }
        node = this.makeScriptNode(script.url, bundle.rawMap.sourceRoot || "", sourcesData);
      } else {
        node = {
          name,
          resourceBytes: unusedJavascriptSummary?.totalBytes ?? script.length ?? 0,
          encodedBytes: void 0,
          unusedBytes: unusedJavascriptSummary?.wastedBytes
        };
      }
      if (isInline(script)) {
        let htmlNode = htmlNodesByFrameId.get(script.executionContextAuxData.frameId);
        if (!htmlNode) {
          htmlNode = {
            name,
            resourceBytes: 0,
            encodedBytes: void 0,
            unusedBytes: void 0,
            children: []
          };
          htmlNodesByFrameId.set(script.executionContextAuxData.frameId, htmlNode);
          nodes.push(htmlNode);
        }
        htmlNode.resourceBytes += node.resourceBytes;
        if (node.unusedBytes) htmlNode.unusedBytes = (htmlNode.unusedBytes || 0) + node.unusedBytes;
        node.name = script.content ? "(inline) " + script.content.trimStart().substring(0, 15) + "\u2026" : "(inline)";
        htmlNode.children?.push(node);
      } else {
        nodes.push(node);
        const networkRecord = getRequestForScript(networkRecords, script);
        if (networkRecord) {
          const bodyTransferSize = networkRecord.transferSize - networkRecord.responseHeadersTransferSize;
          node.encodedBytes = bodyTransferSize;
        } else {
          node.encodedBytes = node.resourceBytes;
        }
      }
    }
    for (const [frameId, node] of htmlNodesByFrameId) {
      const record = networkRecords.find((r) => r.resourceType === "Document" && r.frameId === frameId);
      if (record) {
        const inlineScriptsPct = node.resourceBytes / record.resourceSize;
        const bodyTransferSize = record.transferSize - record.responseHeadersTransferSize;
        node.encodedBytes = Math.floor(bodyTransferSize * inlineScriptsPct);
      } else {
        node.encodedBytes = node.resourceBytes;
      }
    }
    return nodes;
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    const nodes = await _ScriptTreemapDataAudit.makeNodes(artifacts, context);
    const details = {
      type: "treemap-data",
      nodes
    };
    return {
      score: 1,
      details
    };
  }
};
var script_treemap_data_default = ScriptTreemapDataAudit;
export {
  script_treemap_data_default as default
};
/*! Bundled license information:

lighthouse/core/audits/script-treemap-data.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
