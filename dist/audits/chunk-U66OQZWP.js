import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);

// node_modules/lighthouse/core/lib/minification-estimator.js
var PUNCTUATOR_REGEX = /(return|case|else|{|\(|\[|\.\.\.|;|,|<|>|<=|>=|==|!=|===|!==|\+|-|\*|%|\*\*|\+\+|--|<<|>>|>>>|&|\||\^|!|~|&&|\|\||\?|:|=|\+=|-=|\*=|%=|\*\*=|<<=|>>=|>>>=|&=|\|=|\^=|=>|\/|\/=|\})$/;
var WHITESPACE_REGEX = /( |\n|\t)+$/;
function hasPunctuatorBefore(content, startPosition) {
  for (let i = startPosition; i > 0; i--) {
    const sliceStart = Math.max(0, i - 6);
    const precedingCharacters = content.slice(sliceStart, i);
    if (WHITESPACE_REGEX.test(precedingCharacters)) continue;
    return PUNCTUATOR_REGEX.test(precedingCharacters);
  }
  return true;
}
function computeTokenLength(content, features) {
  let totalTokenLength = 0;
  let isInSinglelineComment = false;
  let isInMultilineComment = false;
  let isInLicenseComment = false;
  let isInString = false;
  let isInRegex = false;
  let isInRegexCharacterClass = false;
  let stringOpenChar = null;
  const templateLiteralDepth = [];
  for (let i = 0; i < content.length; i++) {
    const twoChars = content.substr(i, 2);
    const char = twoChars.charAt(0);
    const isWhitespace = char === " " || char === "\n" || char === "	";
    const isAStringOpenChar = char === `'` || char === '"' || char === "`";
    if (isInSinglelineComment) {
      if (char === "\n") {
        isInSinglelineComment = false;
      }
    } else if (isInMultilineComment) {
      if (isInLicenseComment) totalTokenLength++;
      if (twoChars === "*/") {
        if (isInLicenseComment) totalTokenLength++;
        isInMultilineComment = false;
        i++;
      }
    } else if (isInString) {
      totalTokenLength++;
      if (stringOpenChar === "`" && twoChars === "${") {
        templateLiteralDepth.push("templateBrace");
        isInString = false;
        totalTokenLength++;
        i++;
      } else if (char === "\\") {
        totalTokenLength++;
        i++;
      } else if (char === stringOpenChar) {
        isInString = false;
      }
    } else if (isInRegex) {
      totalTokenLength++;
      if (char === "\\") {
        totalTokenLength++;
        i++;
      } else if (char === "[") {
        isInRegexCharacterClass = true;
      } else if (char === "]" && isInRegexCharacterClass) {
        isInRegexCharacterClass = false;
      } else if (char === "/" && !isInRegexCharacterClass) {
        isInRegex = false;
      }
    } else {
      if (twoChars === "/*") {
        isInMultilineComment = true;
        isInLicenseComment = content.charAt(i + 2) === "!";
        if (isInLicenseComment) totalTokenLength += 2;
        i++;
      } else if (twoChars === "//" && features.singlelineComments) {
        isInSinglelineComment = true;
        isInMultilineComment = false;
        isInLicenseComment = false;
        i++;
      } else if (char === "/" && features.regex && hasPunctuatorBefore(content, i)) {
        isInRegex = true;
        totalTokenLength++;
      } else if (char === "{" && templateLiteralDepth.length) {
        templateLiteralDepth.push("normalBrace");
        totalTokenLength++;
      } else if (char === "}" && templateLiteralDepth.length) {
        if (templateLiteralDepth[templateLiteralDepth.length - 1] === "templateBrace") {
          isInString = true;
          stringOpenChar = "`";
        }
        templateLiteralDepth.pop();
        totalTokenLength++;
      } else if (isAStringOpenChar) {
        isInString = true;
        stringOpenChar = char;
        totalTokenLength++;
      } else if (!isWhitespace) {
        totalTokenLength++;
      }
    }
  }
  if (isInMultilineComment || isInString) {
    return content.length;
  }
  return totalTokenLength;
}
function computeJSTokenLength(content) {
  return computeTokenLength(content, { singlelineComments: true, regex: true });
}
function computeCSSTokenLength(content) {
  return computeTokenLength(content, { singlelineComments: false, regex: false });
}

export {
  computeJSTokenLength,
  computeCSSTokenLength
};
/*! Bundled license information:

lighthouse/core/lib/minification-estimator.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
