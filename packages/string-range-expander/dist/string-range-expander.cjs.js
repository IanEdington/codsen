/**
 * string-range-expander
 * Expands string index ranges within whitespace boundaries until letters are met
 * Version: 2.0.6
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/string-range-expander/
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);

var version$1 = "2.0.6";

var version = version$1;
var defaults = {
  str: "",
  from: 0,
  to: 0,
  ifLeftSideIncludesThisThenCropTightly: "",
  ifLeftSideIncludesThisCropItToo: "",
  ifRightSideIncludesThisThenCropTightly: "",
  ifRightSideIncludesThisCropItToo: "",
  extendToOneSide: false,
  wipeAllWhitespaceOnLeft: false,
  wipeAllWhitespaceOnRight: false,
  addSingleSpaceToPreventAccidentalConcatenation: false
};

function expander(originalOpts) {
  var letterOrDigit = /^[0-9a-zA-Z]+$/; // Internal functions
  // ---------------------------------------------------------------------------

  function isWhitespace(char) {
    if (!char || typeof char !== "string") {
      return false;
    }

    return !char.trim();
  }

  function isStr(something) {
    return typeof something === "string";
  } // Sanitise the inputs
  // ---------------------------------------------------------------------------


  if (!originalOpts || typeof originalOpts !== "object" || Array.isArray(originalOpts)) {
    var supplementalString;

    if (originalOpts === undefined) {
      supplementalString = "but it is missing completely.";
    } else if (originalOpts === null) {
      supplementalString = "but it was given as null.";
    } else {
      supplementalString = "but it was given as " + typeof originalOpts + ", equal to:\n" + JSON.stringify(originalOpts, null, 4) + ".";
    }

    throw new Error("string-range-expander: [THROW_ID_01] Input must be a plain object " + supplementalString);
  } else if (typeof originalOpts === "object" && originalOpts !== null && !Array.isArray(originalOpts) && !Object.keys(originalOpts).length) {
    throw new Error("string-range-expander: [THROW_ID_02] Input must be a plain object but it was given as a plain object without any keys.");
  }

  if (typeof originalOpts.from !== "number") {
    throw new Error("string-range-expander: [THROW_ID_03] The input's \"from\" value opts.from, is not a number! Currently it's given as " + typeof originalOpts.from + ", equal to " + JSON.stringify(originalOpts.from, null, 0));
  }

  if (typeof originalOpts.to !== "number") {
    throw new Error("string-range-expander: [THROW_ID_04] The input's \"to\" value opts.to, is not a number! Currently it's given as " + typeof originalOpts.to + ", equal to " + JSON.stringify(originalOpts.to, null, 0));
  }

  if (originalOpts && originalOpts.str && !originalOpts.str[originalOpts.from] && originalOpts.from !== originalOpts.to) {
    throw new Error("string-range-expander: [THROW_ID_05] The given input string opts.str (\"" + originalOpts.str + "\") must contain the character at index \"from\" (\"" + originalOpts.from + "\")");
  }

  if (originalOpts && originalOpts.str && !originalOpts.str[originalOpts.to - 1]) {
    throw new Error("string-range-expander: [THROW_ID_06] The given input string, opts.str (\"" + originalOpts.str + "\") must contain the character at index before \"to\" (\"" + (originalOpts.to - 1) + "\")");
  }

  if (originalOpts.from > originalOpts.to) {
    throw new Error("string-range-expander: [THROW_ID_07] The given \"from\" index, \"" + originalOpts.from + "\" is greater than \"to\" index, \"" + originalOpts.to + "\". That's wrong!");
  }

  if (isStr(originalOpts.extendToOneSide) && originalOpts.extendToOneSide !== "left" && originalOpts.extendToOneSide !== "right" || !isStr(originalOpts.extendToOneSide) && originalOpts.extendToOneSide !== undefined && originalOpts.extendToOneSide !== false) {
    throw new Error("string-range-expander: [THROW_ID_08] The opts.extendToOneSide value is not recogniseable! It's set to: \"" + originalOpts.extendToOneSide + "\" (" + typeof originalOpts.extendToOneSide + "). It has to be either Boolean \"false\" or strings \"left\" or \"right\"");
  } // Prepare the opts
  // ---------------------------------------------------------------------------


  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts);

  if (Array.isArray(opts.ifLeftSideIncludesThisThenCropTightly)) {
    var culpritsIndex;
    var culpritsValue;

    if (opts.ifLeftSideIncludesThisThenCropTightly.every(function (val, i) {
      if (!isStr(val)) {
        culpritsIndex = i;
        culpritsValue = val;
        return false;
      }

      return true;
    })) {
      opts.ifLeftSideIncludesThisThenCropTightly = opts.ifLeftSideIncludesThisThenCropTightly.join("");
    } else {
      throw new Error("string-range-expander: [THROW_ID_09] The opts.ifLeftSideIncludesThisThenCropTightly was set to an array:\n" + JSON.stringify(opts.ifLeftSideIncludesThisThenCropTightly, null, 4) + ". Now, that array contains not only string elements. For example, an element at index " + culpritsIndex + " is of a type " + typeof culpritsValue + " (equal to " + JSON.stringify(culpritsValue, null, 0) + ").");
    }
  } // Action
  // ---------------------------------------------------------------------------


  var str = opts.str; // convenience

  var from = opts.from;
  var to = opts.to; // 1. expand the given range outwards and leave a single space or
  // {single-of-whatever-there-was} (like line break, tab etc) on each side

  if (opts.extendToOneSide !== "right" && (isWhitespace(str[from - 1]) && (isWhitespace(str[from - 2]) || opts.ifLeftSideIncludesThisCropItToo.includes(str[from - 2])) || str[from - 1] && opts.ifLeftSideIncludesThisCropItToo.includes(str[from - 1]) || opts.wipeAllWhitespaceOnLeft && isWhitespace(str[from - 1]))) {
    // loop backwards

    for (var i = from; i--;) {

      if (!opts.ifLeftSideIncludesThisCropItToo.includes(str[i])) {
        if (str[i].trim()) {
          if (opts.wipeAllWhitespaceOnLeft || opts.ifLeftSideIncludesThisCropItToo.includes(str[i + 1])) {
            from = i + 1;
          } else {
            from = i + 2;
          }
          break;
        } else if (i === 0) {
          if (opts.wipeAllWhitespaceOnLeft) {
            from = 0;
          } else {
            from = 1;
          }
          break;
        }
      }
    }
  } // 2. expand forward


  if (opts.extendToOneSide !== "left" && (isWhitespace(str[to]) && (opts.wipeAllWhitespaceOnRight || isWhitespace(str[to + 1])) || opts.ifRightSideIncludesThisCropItToo.includes(str[to]))) {
    // loop forward

    for (var _i = to, len = str.length; _i < len; _i++) {

      if (!opts.ifRightSideIncludesThisCropItToo.includes(str[_i]) && (str[_i] && str[_i].trim() || str[_i] === undefined)) {
        if (opts.wipeAllWhitespaceOnRight || opts.ifRightSideIncludesThisCropItToo.includes(str[_i - 1])) {
          to = _i;
        } else {
          to = _i - 1;
        }
        break;
      }
    }
  } // 3. tight crop adjustments


  if (opts.extendToOneSide !== "right" && isStr(opts.ifLeftSideIncludesThisThenCropTightly) && opts.ifLeftSideIncludesThisThenCropTightly && (str[from - 2] && opts.ifLeftSideIncludesThisThenCropTightly.includes(str[from - 2]) || str[from - 1] && opts.ifLeftSideIncludesThisThenCropTightly.includes(str[from - 1])) || opts.extendToOneSide !== "left" && isStr(opts.ifRightSideIncludesThisThenCropTightly) && opts.ifRightSideIncludesThisThenCropTightly && (str[to + 1] && opts.ifRightSideIncludesThisThenCropTightly.includes(str[to + 1]) || str[to] && opts.ifRightSideIncludesThisThenCropTightly.includes(str[to]))) {

    if (opts.extendToOneSide !== "right" && isWhitespace(str[from - 1]) && !opts.wipeAllWhitespaceOnLeft) {
      from -= 1;
    }

    if (opts.extendToOneSide !== "left" && isWhitespace(str[to]) && !opts.wipeAllWhitespaceOnRight) {
      to += 1;
    }
  }

  if (opts.addSingleSpaceToPreventAccidentalConcatenation && str[from - 1] && str[from - 1].trim() && str[to] && str[to].trim() && (!opts.ifLeftSideIncludesThisThenCropTightly && !opts.ifRightSideIncludesThisThenCropTightly || !((!opts.ifLeftSideIncludesThisThenCropTightly || opts.ifLeftSideIncludesThisThenCropTightly.includes(str[from - 1])) && (!opts.ifRightSideIncludesThisThenCropTightly || str[to] && opts.ifRightSideIncludesThisThenCropTightly.includes(str[to])))) && (letterOrDigit.test(str[from - 1]) || letterOrDigit.test(str[to]))) {
    return [from, to, " "];
  }
  return [from, to];
}

exports.defaults = defaults;
exports.expander = expander;
exports.version = version;
