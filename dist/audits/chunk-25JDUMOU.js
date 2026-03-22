import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  makeComputedArtifact
} from "./chunk-VW72MYVI.js";
import {
  __commonJS,
  __name,
  __toESM
} from "./chunk-XE6XARIN.js";

// node_modules/metaviewport-parser/index.js
var require_metaviewport_parser = __commonJS({
  "node_modules/metaviewport-parser/index.js"(exports) {
    exports.getRenderingDataFromViewport = function(viewportProperties, uaDeviceWidth, uaDeviceHeight, uaMaxZoom, uaMinZoom) {
      var vw = uaDeviceWidth / 100;
      var vh = uaDeviceHeight / 100;
      var maxZoom = null;
      var minZoom = null;
      var zoom = null;
      var minWidth = null;
      var minHeight = null;
      var maxWidth = null;
      var maxHeight = null;
      var width = null, height = null;
      var initialWidth = uaDeviceWidth;
      var initialHeight = uaDeviceHeight;
      var userZoom = "zoom";
      var interactiveWidget = "resizes-visual";
      if (viewportProperties["maximum-scale"] !== void 0) {
        maxZoom = translateZoomProperty(viewportProperties["maximum-scale"]);
      }
      if (viewportProperties["minimum-scale"] !== void 0) {
        minZoom = translateZoomProperty(viewportProperties["minimum-scale"]);
      }
      if (viewportProperties["initial-scale"] !== void 0) {
        zoom = translateZoomProperty(viewportProperties["initial-scale"]);
      }
      if (minZoom !== null && maxZoom === null) {
        minZoom = min(uaMaxZoom, translateZoomProperty(viewportProperties["minimum-scale"]));
      }
      if (viewportProperties["width"] !== void 0) {
        minWidth = "extend-to-zoom";
        maxWidth = translateLengthProperty(viewportProperties["width"], vw, vh);
      }
      if (viewportProperties["height"] !== void 0) {
        minHeight = "extend-to-zoom";
        maxHeight = translateLengthProperty(viewportProperties["height"], vw, vh);
      }
      if (viewportProperties["user-scalable"] !== void 0) {
        userZoom = viewportProperties["user-scalable"];
        if (typeof userZoom === "number") {
          if (userZoom >= 1 || userZoom <= -1) {
            userZoom = "zoom";
          } else {
            userZoom = "fixed";
          }
        } else {
          switch (userZoom) {
            case "yes":
            case "device-width":
            case "device-height":
              userZoom = "zoom";
              break;
            case "no":
            default:
              userZoom = "fixed";
              break;
          }
        }
      }
      if (viewportProperties["interactive-widget"] !== void 0) {
        switch (viewportProperties["interactive-widget"]) {
          case "overlays-content":
          case "resizes-content":
          case "resizes-visual":
            interactiveWidget = viewportProperties["interactive-widget"];
            break;
          default:
            interactiveWidget = "resizes-visual";
            break;
        }
      }
      if (zoom !== null && (viewportProperties["width"] === void 0 || width === void 0)) {
        if (viewportProperties["height"] !== void 0) {
          minWidth = null;
          maxWidth = null;
        } else {
          minWidth = "extend-to-zoom";
          maxWidth = "extend-to-zoom";
        }
      }
      if (minZoom !== null && maxZoom !== null) {
        maxZoom = max(minZoom, maxZoom);
      }
      if (zoom !== null) {
        zoom = clamp(zoom, minZoom, maxZoom);
      }
      var extendZoom = zoom === null && maxZoom === null ? null : min(zoom, maxZoom);
      var extendWidth, extendHeight;
      if (extendZoom === null) {
        if (maxWidth === "extend-to-zoom") {
          maxWidth = null;
        }
        if (maxHeight === "extend-to-zoom") {
          maxHeight = null;
        }
        if (minWidth === "extend-to-zoom") {
          minWidth = maxWidth;
        }
        if (minHeight === "extend-to-zoom") {
          minHeight = maxHeight;
        }
      } else {
        extendWidth = initialWidth / extendZoom;
        extendHeight = initialHeight / extendZoom;
        if (maxWidth === "extend-to-zoom") {
          maxWidth = extendWidth;
        }
        if (maxHeight === "extend-to-zoom") {
          maxHeight = extendHeight;
        }
        if (minWidth === "extend-to-zoom") {
          minWidth = max(extendWidth, maxWidth);
        }
        if (minHeight === "extend-to-zoom") {
          minHeight = max(extendHeight, maxHeight);
        }
      }
      if (minWidth !== null || maxWidth !== null) {
        width = max(minWidth, min(maxWidth, initialWidth));
      }
      if (minHeight !== null || maxHeight !== null) {
        height = max(minHeight, min(maxHeight, initialHeight));
      }
      if (width === null) {
        if (height === null) {
          width = initialWidth;
        } else {
          if (initialHeight !== 0) {
            width = Math.round(height * (initialWidth / initialHeight));
          } else {
            width = initialWidth;
          }
        }
      }
      if (height === null) {
        if (initialWidth !== 0) {
          height = Math.round(width * (initialHeight / initialWidth));
        } else {
          height = initialHeight;
        }
      }
      return { zoom, width, height, userZoom, interactiveWidget };
    };
    function min(a, b) {
      if (a === null) return b;
      if (b === null) return a;
      return Math.min(a, b);
    }
    __name(min, "min");
    function max(a, b) {
      if (a === null) return b;
      if (b === null) return a;
      return Math.max(a, b);
    }
    __name(max, "max");
    function translateLengthProperty(prop, vw, vh) {
      if (typeof prop === "number") {
        if (prop >= 0) {
          return clamp(prop, 1, 1e4);
        } else {
          return void 0;
        }
      }
      if (prop === "device-width") {
        return 100 * vw;
      }
      if (prop === "device-height") {
        return 100 * vh;
      }
      return 1;
    }
    __name(translateLengthProperty, "translateLengthProperty");
    function translateZoomProperty(prop) {
      if (typeof prop === "number") {
        if (prop >= 0) {
          return clamp(prop, 0.1, 10);
        } else {
          return void 0;
        }
      }
      if (prop === "yes") {
        return 1;
      }
      if (prop === "device-width" || prop === "device-height") {
        return 10;
      }
      if (prop === "no" || prop === null) {
        return 0.1;
      }
    }
    __name(translateZoomProperty, "translateZoomProperty");
    function clamp(value, minv, maxv) {
      return max(min(value, maxv), minv);
    }
    __name(clamp, "clamp");
    exports.parseMetaViewPortContent = function(S) {
      var parsedContent = {
        validProperties: {},
        unknownProperties: {},
        invalidValues: {}
      };
      var i = 1;
      while (i <= S.length) {
        while (i <= S.length && RegExp(" |\n|	|\0d|,|;|=").test(S[i - 1])) {
          i++;
        }
        if (i <= S.length) {
          i = parseProperty(parsedContent, S, i);
        }
      }
      return parsedContent;
    };
    var propertyNames = ["width", "height", "initial-scale", "minimum-scale", "maximum-scale", "user-scalable", "shrink-to-fit", "viewport-fit", "interactive-widget"];
    function parseProperty(parsedContent, S, i) {
      var start = i;
      while (i <= S.length && !RegExp(" |\n|	|\0d|,|;|=").test(S[i - 1])) {
        i++;
      }
      if (i > S.length || RegExp(",|;").test(S[i - 1])) {
        return i;
      }
      var propertyName = S.slice(start - 1, i - 1);
      while (i <= S.length && !RegExp(",|;|=").test(S[i - 1])) {
        i++;
      }
      if (i > S.length || RegExp(",|;").test(S[i - 1])) {
        return i;
      }
      while (i <= S.length && RegExp(" |\n|	|\0d|=").test(S[i - 1])) {
        i++;
      }
      if (i > S.length || RegExp(",|;").test(S[i - 1])) {
        return i;
      }
      start = i;
      while (i <= S.length && !RegExp(" |\n|	|\0d|,|;|=").test(S[i - 1])) {
        i++;
      }
      var propertyValue = S.slice(start - 1, i - 1);
      setProperty(parsedContent, propertyName, propertyValue);
      return i;
    }
    __name(parseProperty, "parseProperty");
    function setProperty(parsedContent, name, value) {
      if (propertyNames.indexOf(name) >= 0) {
        var number = parseFloat(value);
        if (!isNaN(number)) {
          parsedContent.validProperties[name] = number;
          return;
        }
        var string = value.toLowerCase();
        if (string === "yes" || string === "no" || string === "device-width" || string === "device-height" || // https://webkit.org/blog/7929/designing-websites-for-iphone-x/
        name.toLowerCase() === "viewport-fit" && (string === "auto" || string === "cover") || name.toLowerCase() === "interactive-widget" && exports.expectedValues["interactive-widget"].includes(string)) {
          parsedContent.validProperties[name] = string;
          return;
        }
        parsedContent.validProperties[name] = null;
        parsedContent.invalidValues[name] = value;
      } else {
        parsedContent.unknownProperties[name] = value;
      }
    }
    __name(setProperty, "setProperty");
    exports.expectedValues = {
      "width": ["device-width", "device-height", "a positive number"],
      "height": ["device-width", "device-height", "a positive number"],
      "initial-scale": ["a positive number"],
      "minimum-scale": ["a positive number"],
      "maximum-scale": ["a positive number"],
      "user-scalable": ["yes", "no", "0", "1"],
      "shrink-to-fit": ["yes", "no"],
      "viewport-fit": ["auto", "cover"],
      "interactive-widget": ["overlays-content", "resizes-content", "resizes-visual"]
    };
  }
});

// node_modules/lighthouse/core/computed/viewport-meta.js
var import_metaviewport_parser = __toESM(require_metaviewport_parser(), 1);
var ViewportMeta = class {
  static {
    __name(this, "ViewportMeta");
  }
  /**
   * @param {LH.GathererArtifacts['MetaElements']} MetaElements
   * @return {Promise<ViewportMetaResult>}
  */
  static async compute_(MetaElements) {
    const viewportMeta = MetaElements.find((meta) => meta.name === "viewport");
    if (!viewportMeta) {
      return {
        hasViewportTag: false,
        isMobileOptimized: false,
        parserWarnings: [],
        rawContentString: void 0
      };
    }
    const warnings = [];
    const rawContentString = viewportMeta.content || "";
    const parsedProps = import_metaviewport_parser.default.parseMetaViewPortContent(rawContentString);
    if (Object.keys(parsedProps.unknownProperties).length) {
      warnings.push(`Invalid properties found: ${JSON.stringify(parsedProps.unknownProperties)}`);
    }
    if (Object.keys(parsedProps.invalidValues).length) {
      warnings.push(`Invalid values found: ${JSON.stringify(parsedProps.invalidValues)}`);
    }
    const viewportProps = parsedProps.validProperties;
    const initialScale = Number(viewportProps["initial-scale"]);
    if (!isNaN(initialScale) && initialScale < 1) {
      return {
        hasViewportTag: true,
        isMobileOptimized: false,
        parserWarnings: warnings,
        rawContentString
      };
    }
    const isMobileOptimized = Boolean(viewportProps.width || initialScale);
    return {
      hasViewportTag: true,
      isMobileOptimized,
      parserWarnings: warnings,
      rawContentString
    };
  }
};
var ViewportMetaComputed = makeComputedArtifact(ViewportMeta, null);

export {
  ViewportMetaComputed
};
/*! Bundled license information:

lighthouse/core/computed/viewport-meta.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
