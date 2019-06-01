/**
 * array-group-str-omit-num-char
 * Groups array of strings by omitting number characters
 * Version: 2.0.15
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/array-group-str-omit-num-char
 */

import checkTypes from 'check-types-mini';
import isObj from 'lodash.isplainobject';
import uniq from 'lodash.uniq';
import rangesApply from 'ranges-apply';

const isArr = Array.isArray;
function groupStr(originalArr, originalOpts) {
  if (!isArr(originalArr)) {
    throw new Error(
      "array-group-str-omit-num-char: [THROW_ID_01] the first input argument must be an array!"
    );
  }
  let opts;
  const defaults = {
    wildcard: "*",
    dedupePlease: true
  };
  if (originalOpts != null) {
    if (!isObj(originalOpts)) {
      throw new Error(
        `array-group-str-omit-num-char: [THROW_ID_02] the second input argument, options object must be a plain object! It was given as ${typeof originalOpts}, equal to:\n${JSON.stringify(
          originalOpts,
          null,
          4
        )}`
      );
    } else {
      opts = Object.assign({}, defaults, originalOpts);
      checkTypes(opts, defaults, {
        msg: "array-group-str-omit-num-char: [THROW_ID_03*]"
      });
    }
  } else {
    opts = Object.assign({}, defaults);
  }
  let arr;
  if (opts.dedupePlease) {
    arr = uniq(originalArr);
  } else {
    arr = Array.from(originalArr);
  }
  const len = arr.length;
  const compiledObj = {};
  for (let i = 0; i < len; i++) {
    const digitChunks = arr[i].match(/\d+/gm);
    if (!digitChunks) {
      compiledObj[arr[i]] = {
        count: 1
      };
    } else {
      const wildcarded = arr[i].replace(/\d+/gm, opts.wildcard);
      if (compiledObj.hasOwnProperty(wildcarded)) {
        digitChunks.forEach((digitsChunkStr, i) => {
          if (
            compiledObj[wildcarded].elementsWhichWeCanReplaceWithWildcards[i] &&
            digitsChunkStr !==
              compiledObj[wildcarded].elementsWhichWeCanReplaceWithWildcards[i]
          ) {
            compiledObj[wildcarded].elementsWhichWeCanReplaceWithWildcards[
              i
            ] = false;
          }
        });
        compiledObj[wildcarded].count++;
      } else {
        compiledObj[wildcarded] = {
          count: 1,
          elementsWhichWeCanReplaceWithWildcards: Array.from(digitChunks)
        };
      }
    }
  }
  const resObj = {};
  Object.keys(compiledObj).forEach(key => {
    let newKey = key;
    if (
      isArr(compiledObj[key].elementsWhichWeCanReplaceWithWildcards) &&
      compiledObj[key].elementsWhichWeCanReplaceWithWildcards.some(
        val => val !== false
      )
    ) {
      const rangesArr = [];
      let nThIndex = 0;
      for (
        let z = 0;
        z < compiledObj[key].elementsWhichWeCanReplaceWithWildcards.length;
        z++
      ) {
        nThIndex = newKey.indexOf(
          opts.wildcard,
          nThIndex + opts.wildcard.length
        );
        if (
          compiledObj[key].elementsWhichWeCanReplaceWithWildcards[z] !== false
        ) {
          rangesArr.push([
            nThIndex,
            nThIndex + opts.wildcard.length,
            compiledObj[key].elementsWhichWeCanReplaceWithWildcards[z]
          ]);
        }
      }
      newKey = rangesApply(newKey, rangesArr);
    }
    resObj[newKey] = compiledObj[key].count;
  });
  return resObj;
}

export default groupStr;
