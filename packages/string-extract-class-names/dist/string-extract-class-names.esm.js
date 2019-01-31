/**
 * string-extract-class-names
 * Extract class (or id) name from a string
 * Version: 5.8.3
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/string-extract-class-names
 */

function stringExtractClassNames(input, returnRangesInstead) {
  function existy(x) {
    return x != null;
  }
  if (input === undefined) {
    throw new Error(
      `string-extract-class-names: [THROW_ID_01] input must not be undefined!`
    );
  } else if (typeof input !== "string") {
    throw new TypeError(
      `string-extract-class-names: [THROW_ID_02] first input should be string, not ${typeof input}, currently equal to ${JSON.stringify(
        input,
        null,
        4
      )}`
    );
  }
  if (!existy(returnRangesInstead) || !returnRangesInstead) {
    returnRangesInstead = false;
  } else if (typeof returnRangesInstead !== "boolean") {
    throw new TypeError(
      `string-extract-class-names: [THROW_ID_03] second input argument should be a Boolean, not ${typeof input}, currently equal to ${JSON.stringify(
        input,
        null,
        4
      )}`
    );
  }
  const badChars = `.# ~\\!@$%^&*()+=,/';:"?><[]{}|\``;
  let selectorStartsAt = null;
  const result = [];
  for (let i = 0, len = input.length; i < len; i++) {
    if (
      selectorStartsAt !== null &&
      (badChars.includes(input[i]) || input[i].trim().length === 0)
    ) {
      if (i > selectorStartsAt + 1) {
        if (returnRangesInstead) {
          result.push([selectorStartsAt, i]);
        } else {
          result.push(input.slice(selectorStartsAt, i));
        }
      }
      selectorStartsAt = null;
    }
    if (selectorStartsAt === null && (input[i] === "." || input[i] === "#")) {
      selectorStartsAt = i;
    }
    if (i + 1 === len && selectorStartsAt !== null && i > selectorStartsAt) {
      if (returnRangesInstead) {
        result.push([selectorStartsAt, len]);
      } else {
        result.push(input.slice(selectorStartsAt, len));
      }
    }
  }
  return result;
}

export default stringExtractClassNames;
