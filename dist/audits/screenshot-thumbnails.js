import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  SpeedlineComputed,
  require_jpeg_js
} from "./chunk-TXZEEGMI.js";
import "./chunk-FTKGXG7F.js";
import "./chunk-3WVTZQMF.js";
import {
  LighthouseError
} from "./chunk-2BIJ7VKV.js";
import "./chunk-MLADMIB3.js";
import "./chunk-T3HXWQEB.js";
import "./chunk-B4FIMLMR.js";
import "./chunk-NDN2O67Z.js";
import "./chunk-V6LRM2MD.js";
import {
  Audit
} from "./chunk-55A4MDN3.js";
import {
  __toESM
} from "./chunk-23MNVS5G.js";

// node_modules/lighthouse/core/audits/screenshot-thumbnails.js
var import_jpeg_js = __toESM(require_jpeg_js(), 1);
var NUMBER_OF_THUMBNAILS = 8;
var ScreenshotThumbnails = class _ScreenshotThumbnails extends Audit {
  /**
   * @return {LH.Audit.Meta}
   */
  static get meta() {
    return {
      id: "screenshot-thumbnails",
      scoreDisplayMode: Audit.SCORING_MODES.INFORMATIVE,
      title: "Screenshot Thumbnails",
      description: "This is what the load of your site looked like.",
      requiredArtifacts: ["Trace", "GatherContext"]
    };
  }
  /**
   * Scales down an image to THUMBNAIL_WIDTH using nearest neighbor for speed, maintains aspect
   * ratio of the original thumbnail.
   *
   * @param {ReturnType<SpeedlineFrame['getParsedImage']>} imageData
   * @param {number} scaledWidth
   * @return {{width: number, height: number, data: Uint8Array}}
   */
  static scaleImageToThumbnail(imageData, scaledWidth) {
    const scaleFactor = imageData.width / scaledWidth;
    const scaledHeight = Math.floor(imageData.height / scaleFactor);
    const outPixels = new Uint8Array(scaledWidth * scaledHeight * 4);
    for (let i = 0; i < scaledWidth; i++) {
      for (let j = 0; j < scaledHeight; j++) {
        const origX = Math.floor(i * scaleFactor);
        const origY = Math.floor(j * scaleFactor);
        const origPos = (origY * imageData.width + origX) * 4;
        const outPos = (j * scaledWidth + i) * 4;
        outPixels[outPos] = imageData.data[origPos];
        outPixels[outPos + 1] = imageData.data[origPos + 1];
        outPixels[outPos + 2] = imageData.data[origPos + 2];
        outPixels[outPos + 3] = imageData.data[origPos + 3];
      }
    }
    return {
      width: scaledWidth,
      height: scaledHeight,
      data: outPixels
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async _audit(artifacts, context) {
    const trace = artifacts.Trace;
    const cachedThumbnails = /* @__PURE__ */ new Map();
    const speedline = await SpeedlineComputed.request(trace, context);
    const minimumTimelineDuration = context.options.minimumTimelineDuration || 3e3;
    const numberOfThumbnails = context.options.numberOfThumbnails || NUMBER_OF_THUMBNAILS;
    const thumbnailWidth = context.options.thumbnailWidth || null;
    const thumbnails = [];
    const analyzedFrames = speedline.frames.filter((frame) => !frame.isProgressInterpolated());
    const maxFrameTime = speedline.complete || Math.max(...speedline.frames.map((frame) => frame.getTimeStamp() - speedline.beginning));
    const timelineEnd = Math.max(maxFrameTime, minimumTimelineDuration);
    if (!analyzedFrames.length || !Number.isFinite(timelineEnd)) {
      throw new LighthouseError(LighthouseError.errors.INVALID_SPEEDLINE);
    }
    for (let i = 1; i <= numberOfThumbnails; i++) {
      const targetTimestamp = speedline.beginning + timelineEnd * i / numberOfThumbnails;
      let frameForTimestamp = null;
      if (i === numberOfThumbnails) {
        frameForTimestamp = analyzedFrames[analyzedFrames.length - 1];
      } else {
        analyzedFrames.forEach((frame) => {
          if (frame.getTimeStamp() <= targetTimestamp) {
            frameForTimestamp = frame;
          }
        });
      }
      let base64Data;
      const cachedThumbnail = cachedThumbnails.get(frameForTimestamp);
      if (cachedThumbnail) {
        base64Data = cachedThumbnail;
      } else if (thumbnailWidth !== null) {
        const imageData = frameForTimestamp.getParsedImage();
        const thumbnailImageData = _ScreenshotThumbnails.scaleImageToThumbnail(imageData, thumbnailWidth);
        base64Data = import_jpeg_js.default.encode(thumbnailImageData, 90).data.toString("base64");
        cachedThumbnails.set(frameForTimestamp, base64Data);
      } else {
        base64Data = frameForTimestamp.getImage().toString("base64");
        cachedThumbnails.set(frameForTimestamp, base64Data);
      }
      thumbnails.push({
        timing: Math.round(targetTimestamp - speedline.beginning),
        timestamp: targetTimestamp * 1e3,
        data: `data:image/jpeg;base64,${base64Data}`
      });
    }
    return {
      score: 1,
      details: {
        type: "filmstrip",
        scale: timelineEnd,
        items: thumbnails
      }
    };
  }
  /**
   * @param {LH.Artifacts} artifacts
   * @param {LH.Audit.Context} context
   * @return {Promise<LH.Audit.Product>}
   */
  static async audit(artifacts, context) {
    try {
      return await this._audit(artifacts, context);
    } catch (err) {
      const noFramesErrors = /* @__PURE__ */ new Set([
        LighthouseError.errors.NO_SCREENSHOTS.code,
        LighthouseError.errors.SPEEDINDEX_OF_ZERO.code,
        LighthouseError.errors.NO_SPEEDLINE_FRAMES.code,
        LighthouseError.errors.INVALID_SPEEDLINE.code
      ]);
      if (noFramesErrors.has(err.code) && artifacts.GatherContext.gatherMode === "timespan") {
        return { notApplicable: true, score: 1 };
      }
      throw err;
    }
  }
};
var screenshot_thumbnails_default = ScreenshotThumbnails;
export {
  screenshot_thumbnails_default as default
};
/*! Bundled license information:

lighthouse/core/audits/screenshot-thumbnails.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
