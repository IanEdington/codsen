/**
 * emlint
 * Pluggable email template code linter
 * Version: 4.2.0
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://codsen.com/os/emlint/
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _inheritsLoose = require('@babel/runtime/helpers/inheritsLoose');
var tinyTypedEmitter = require('tiny-typed-emitter');
var stringFixBrokenNamedEntities = require('string-fix-broken-named-entities');
var astMonkeyTraverse = require('ast-monkey-traverse');
var lineColumnMini = require('line-column-mini');
var clone = require('lodash.clonedeep');
var codsenParser = require('codsen-parser');
var matcher = require('matcher');
var defineLazyProp = require('define-lazy-prop');
var stringProcessCommaSeparated = require('string-process-comma-separated');
var stringLeftRight = require('string-left-right');
var isRegExp = require('lodash.isregexp');
var rangesMerge = require('ranges-merge');
var _createForOfIteratorHelperLoose = require('@babel/runtime/helpers/createForOfIteratorHelperLoose');
var htmlAllKnownAttributes = require('html-all-known-attributes');
var leven = require('leven');
var db = require('mime-db');
var isRelativeUri = require('is-relative-uri');
var urlRegex = require('url-regex');
var isLanguageCode = require('is-language-code');
var isMediaDescriptor = require('is-media-descriptor');
var htmlEntitiesNotEmailFriendly$1 = require('html-entities-not-email-friendly');
var he = require('he');
var stringFindMalformed = require('string-find-malformed');
var stringMatchLeftRight = require('string-match-left-right');
var astMonkeyUtil = require('ast-monkey-util');
var op = require('object-path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectSpread__default = /*#__PURE__*/_interopDefaultLegacy(_objectSpread);
var _inheritsLoose__default = /*#__PURE__*/_interopDefaultLegacy(_inheritsLoose);
var clone__default = /*#__PURE__*/_interopDefaultLegacy(clone);
var matcher__default = /*#__PURE__*/_interopDefaultLegacy(matcher);
var defineLazyProp__default = /*#__PURE__*/_interopDefaultLegacy(defineLazyProp);
var isRegExp__default = /*#__PURE__*/_interopDefaultLegacy(isRegExp);
var _createForOfIteratorHelperLoose__default = /*#__PURE__*/_interopDefaultLegacy(_createForOfIteratorHelperLoose);
var leven__default = /*#__PURE__*/_interopDefaultLegacy(leven);
var db__default = /*#__PURE__*/_interopDefaultLegacy(db);
var urlRegex__default = /*#__PURE__*/_interopDefaultLegacy(urlRegex);
var he__default = /*#__PURE__*/_interopDefaultLegacy(he);
var op__default = /*#__PURE__*/_interopDefaultLegacy(op);

var allBadCharacterRules = ["bad-character-acknowledge", "bad-character-activate-arabic-form-shaping", "bad-character-activate-symmetric-swapping", "bad-character-application-program-command", "bad-character-backspace", "bad-character-bell", "bad-character-break-permitted-here", "bad-character-cancel", "bad-character-cancel-character", "bad-character-character-tabulation-set", "bad-character-character-tabulation-with-justification", "bad-character-control-0080", "bad-character-control-0081", "bad-character-control-0084", "bad-character-control-0099", "bad-character-control-sequence-introducer", "bad-character-data-link-escape", "bad-character-delete", "bad-character-device-control-four", "bad-character-device-control-one", "bad-character-device-control-string", "bad-character-device-control-three", "bad-character-device-control-two", "bad-character-em-quad", "bad-character-em-space", "bad-character-en-quad", "bad-character-en-space", "bad-character-end-of-medium", "bad-character-end-of-protected-area", "bad-character-end-of-selected-area", "bad-character-end-of-text", "bad-character-end-of-transmission", "bad-character-end-of-transmission-block", "bad-character-enquiry", "bad-character-escape", "bad-character-figure-space", "bad-character-first-strong-isolate", "bad-character-form-feed", "bad-character-four-per-em-space", "bad-character-function-application", "bad-character-hair-space", "bad-character-ideographic-space", "bad-character-information-separator-four", "bad-character-information-separator-one", "bad-character-information-separator-three", "bad-character-information-separator-two", "bad-character-inhibit-arabic-form-shaping", "bad-character-inhibit-symmetric-swapping", "bad-character-interlinear-annotation-anchor", "bad-character-interlinear-annotation-separator", "bad-character-interlinear-annotation-terminator", "bad-character-invisible-plus", "bad-character-invisible-separator", "bad-character-invisible-times", "bad-character-left-to-right-embedding", "bad-character-left-to-right-isolate", "bad-character-left-to-right-mark", "bad-character-left-to-right-override", "bad-character-line-separator", "bad-character-line-tabulation", "bad-character-line-tabulation-set", "bad-character-medium-mathematical-space", "bad-character-message-waiting", "bad-character-narrow-no-break-space", "bad-character-national-digit-shapes", "bad-character-negative-acknowledge", "bad-character-next-line", "bad-character-no-break-here", "bad-character-nominal-digit-shapes", "bad-character-non-breaking-space", "bad-character-null", "bad-character-ogham-space-mark", "bad-character-operating-system-command", "bad-character-paragraph-separator", "bad-character-partial-line-backward", "bad-character-partial-line-forward", "bad-character-pop-directional-formatting", "bad-character-pop-directional-isolate", "bad-character-private-message", "bad-character-private-use-1", "bad-character-private-use-2", "bad-character-punctuation-space", "bad-character-replacement-character", "bad-character-reverse-line-feed", "bad-character-right-to-left-embedding", "bad-character-right-to-left-isolate", "bad-character-right-to-left-mark", "bad-character-right-to-left-override", "bad-character-set-transmit-state", "bad-character-shift-in", "bad-character-shift-out", "bad-character-single-character-introducer", "bad-character-single-shift-three", "bad-character-single-shift-two", "bad-character-six-per-em-space", "bad-character-soft-hyphen", "bad-character-start-of-heading", "bad-character-start-of-protected-area", "bad-character-start-of-selected-area", "bad-character-start-of-string", "bad-character-start-of-text", "bad-character-string-terminator", "bad-character-substitute", "bad-character-synchronous-idle", "bad-character-tabulation", "bad-character-thin-space", "bad-character-three-per-em-space", "bad-character-word-joiner", "bad-character-zero-width-joiner", "bad-character-zero-width-no-break-space", "bad-character-zero-width-non-joiner", "bad-character-zero-width-space"];

var allTagRules = ["tag-bad-self-closing", "tag-bold", "tag-closing-backslash", "tag-is-present", "tag-missing-closing", "tag-missing-opening", "tag-name-case", "tag-rogue", "tag-space-after-opening-bracket", "tag-space-before-closing-bracket", "tag-space-before-closing-slash", "tag-space-between-slash-and-bracket", "tag-void-frontal-slash", "tag-void-slash"];

var allAttribRules = ["attribute-duplicate", "attribute-malformed", "attribute-on-closing-tag"];

var allCSSRules = ["css-rule-malformed", "css-trailing-semi"];

var allBadNamedHTMLEntityRules = ["bad-malformed-numeric-character-entity", "bad-named-html-entity-malformed-nbsp", "bad-named-html-entity-multiple-encoding", "bad-named-html-entity-not-email-friendly", "bad-named-html-entity-unrecognised"];

function splitByWhitespace(str, cbValues, cbWhitespace, originalOpts) {
  // console.log(
  //   `003 splitByWhitespace(): ${`\u001b[${36}m${`traverse and extract`}\u001b[${39}m`}`
  // );
  var defaults = {
    offset: 0,
    from: 0,
    to: str.length
  };

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts);

  var nameStartsAt = null;
  var whitespaceStartsAt = null;

  for (var i = opts.from; i < opts.to; i++) {
    // console.log(
    //   `018 ${`\u001b[${36}m${`------------------------------------------------\nstr[${i}]`}\u001b[${39}m`} = ${JSON.stringify(
    //     str[i],
    //     null,
    //     4
    //   )}`
    // );
    // catch the beginning of a whitespace
    if (whitespaceStartsAt === null && !str[i].trim().length) {
      whitespaceStartsAt = i; // console.log(
      //   `029 splitByWhitespace(): ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`whitespaceStartsAt`}\u001b[${39}m`} = ${whitespaceStartsAt}`
      // );
    } // catch the ending of a whitespace


    if (whitespaceStartsAt !== null && (str[i].trim().length || i + 1 === opts.to)) {
      // console.log(
      //   `039 ${`\u001b[${32}m${`PING`}\u001b[${39}m`} whitespace [${whitespaceStartsAt}, ${
      //     str[i].trim().length ? i : i + 1
      //   }]`
      // );
      if (typeof cbWhitespace === "function") {
        cbWhitespace([whitespaceStartsAt + opts.offset, (str[i].trim().length ? i : i + 1) + opts.offset]);
      }

      whitespaceStartsAt = null; // console.log(
      //   `051 splitByWhitespace(): ${`\u001b[${31}m${`RESET`}\u001b[${39}m`} ${`\u001b[${33}m${`whitespaceStartsAt`}\u001b[${39}m`} = ${whitespaceStartsAt}`
      // );
    } // catch the beginning of a name


    if (nameStartsAt === null && str[i].trim().length) {
      nameStartsAt = i; // console.log(
      //   `059 splitByWhitespace(): ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`nameStartsAt`}\u001b[${39}m`} = ${nameStartsAt}`
      // );
    } // catch the ending of a name


    if (nameStartsAt !== null && (!str[i].trim().length || i + 1 === opts.to)) {
      // console.log(
      //   `066 splitByWhitespace(): ${`\u001b[${32}m${`██`}\u001b[${39}m`} ${`\u001b[${32}m${`carved out ${opts.typeName} name`}\u001b[${39}m`} ${JSON.stringify(
      //     str.slice(
      //       nameStartsAt,
      //       i + 1 === opts.to && str[i].trim().length ? i + 1 : i
      //     ),
      //     null,
      //     0
      //   )}`
      // );
      // // call CB
      // console.log(
      //   `078 ${`\u001b[${32}m${`PING`}\u001b[${39}m`} chunk [${nameStartsAt}, ${
      //     i + 1 === opts.to ? i + 1 && str[i].trim().length : i
      //   }]`
      // );
      if (typeof cbValues === "function") {
        cbValues([nameStartsAt + opts.offset, (i + 1 === opts.to && str[i].trim().length ? i + 1 : i) + opts.offset]);
      } // reset


      nameStartsAt = null; // console.log(
      //   `092 splitByWhitespace(): ${`\u001b[${31}m${`RESET`}\u001b[${39}m`} ${`\u001b[${33}m${`nameStartsAt`}\u001b[${39}m`} = ${nameStartsAt}`
      // );
    } // console.log(" ");
    // console.log(" ");
    // console.log(
    //   `${`\u001b[${90}m${`1 splitByWhitespace(): ██ nameStartsAt = ${nameStartsAt}; whitespaceStartsAt = ${whitespaceStartsAt}`}\u001b[${39}m`}`
    // );
    // console.log(" ");
    // console.log(" ");

  }
}

function checkForWhitespace(str, idxOffset) {
  // insurance
  if (typeof str !== "string") {
    return {
      charStart: 0,
      charEnd: 0,
      errorArr: [],
      trimmedVal: ""
    };
  } // We'll catch surrounding whitespace and validate the value in one go. This means, we need to know where non-whitespace value is:


  var charStart = 0; // defaults

  var charEnd = str.length;
  var trimmedVal;
  var gatheredRanges = [];
  var errorArr = []; // tackle the inner wrapping whitespace first
  // ...left side:

  if (!str.length || !str[0].trim().length) {
    charStart = stringLeftRight.right(str); // returns digit or null - index of next non whitespace char on the right

    if (!str.length || charStart === null) {
      // it's just whitespace here
      charEnd = null;
      errorArr.push({
        idxFrom: +idxOffset,
        idxTo: +idxOffset + str.length,
        message: "Missing value.",
        fix: null // can't fix - value is missing completely!

      });
    } else {
      gatheredRanges.push([idxOffset, idxOffset + charStart]);
    }
  } // ...right side:


  if (charEnd && !str[str.length - 1].trim()) {
    charEnd = stringLeftRight.left(str, str.length - 1) + 1;
    gatheredRanges.push([idxOffset + charEnd, idxOffset + str.length]);
  }

  if (!gatheredRanges.length) {
    trimmedVal = str;
  } else {
    errorArr.push({
      idxFrom: gatheredRanges[0][0],
      idxTo: gatheredRanges[gatheredRanges.length - 1][1],
      message: "Remove whitespace.",
      fix: {
        ranges: clone__default['default'](gatheredRanges)
      } // we can fix - we delete this whitespace!

    }); // reset:

    gatheredRanges.length = 0;
    trimmedVal = str.trim();
  }
  return {
    charStart: charStart,
    charEnd: charEnd,
    errorArr: errorArr,
    trimmedVal: trimmedVal
  };
}

var defaults$3 = {
  caseInsensitive: false
};

function includesWithRegex(arr, whatToMatch, originalOpts) {
  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults$3), originalOpts);

  if (!Array.isArray(arr) || !arr.length) {
    // definitely does not include
    return false;
  } // console.log(
  //   `017 includesWithRegex(): ${`\u001b[${33}m${`whatToMatch`}\u001b[${39}m`} = ${JSON.stringify(
  //     whatToMatch,
  //     null,
  //     4
  //   )}`
  // );


  return arr.some(function (val) {
    return isRegExp__default['default'](val) && whatToMatch.match(val) || typeof val === "string" && (!opts.caseInsensitive && whatToMatch === val || opts.caseInsensitive && whatToMatch.toLowerCase() === val.toLowerCase());
  });
}

var defaults$2 = {
  caseInsensitive: false,
  canBeCommaSeparated: false,
  quickPermittedValues: [],
  permittedValues: [],
  noSpaceAfterComma: false
}; // if value is not comma-separated chain of values, whole thing is passed to this
// if value is comma-separated, each extracted chunk is passed to this
// we keep it separate to keep it DRY

function validateValue$2(str, idxOffset, opts, charStart, charEnd, errorArr) {
  var extractedValue = str.slice(charStart, charEnd);

  if (!(includesWithRegex(opts.quickPermittedValues, extractedValue, {
    caseInsensitive: opts.caseInsensitive
  }) || includesWithRegex(opts.permittedValues, extractedValue, {
    caseInsensitive: opts.caseInsensitive
  }))) {
    var fix = null;
    var message = "Unrecognised value: \"" + str.slice(charStart, charEnd) + "\".";

    if (includesWithRegex(opts.quickPermittedValues, extractedValue.toLowerCase()) || includesWithRegex(opts.permittedValues, extractedValue.toLowerCase())) {
      message = "Should be lowercase.";
      fix = {
        ranges: [[charStart + idxOffset, charEnd + idxOffset, extractedValue.toLowerCase()]]
      };
    } else if (Array.isArray(opts.quickPermittedValues) && opts.quickPermittedValues.length && opts.quickPermittedValues.length < 6 && opts.quickPermittedValues.every(function (val) {
      return typeof val === "string";
    }) && (!Array.isArray(opts.permittedValues) || !opts.permittedValues.length) && opts.quickPermittedValues.join("|").length < 40) {
      // if all reference values are strings, if the case is simple,
      // for example, <td dir="tralala">, instead of message:
      // Unrecognised value: "tralala".
      // we can say:
      // Should be "rtl|ltr"
      message = "Should be \"" + opts.quickPermittedValues.join("|") + "\".";
    } else if (Array.isArray(opts.permittedValues) && opts.permittedValues.length && opts.permittedValues.length < 6 && opts.permittedValues.every(function (val) {
      return typeof val === "string";
    }) && (!Array.isArray(opts.quickPermittedValues) || !opts.quickPermittedValues.length) && opts.permittedValues.join("|").length < 40) {
      // if all reference values are strings, if the case is simple,
      // for example, <td dir="tralala">, instead of message:
      // Unrecognised value: "tralala".
      // we can say:
      // Should be "rtl|ltr"
      message = "Should be \"" + opts.permittedValues.join("|") + "\".";
    }

    errorArr.push({
      idxFrom: charStart + idxOffset,
      idxTo: charEnd + idxOffset,
      message: message,
      fix: fix
    });
  }
}

function validateString(str, idxOffset, originalOpts) {

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults$2), originalOpts); // we get trimmed string start and end positions, also an encountered errors array


  var _checkForWhitespace = checkForWhitespace(str, idxOffset),
      charStart = _checkForWhitespace.charStart,
      charEnd = _checkForWhitespace.charEnd,
      errorArr = _checkForWhitespace.errorArr;

  if (typeof charStart === "number" && typeof charEnd === "number") {
    // continue checks only if there are non-whitespace characters in the value
    if (opts.canBeCommaSeparated) {
      stringProcessCommaSeparated.processCommaSep(str, {
        offset: idxOffset,
        oneSpaceAfterCommaOK: false,
        leadingWhitespaceOK: true,
        trailingWhitespaceOK: true,
        cb: function cb(idxFrom, idxTo) {
          str.slice(idxFrom - idxOffset, idxTo - idxOffset); // if there are errors, validateValue() mutates the passed "errorArr",
          // pushing to it

          validateValue$2(str, idxOffset, opts, idxFrom - idxOffset, // processCommaSep() reports offset values so we need to restore indexes to start where this "str" above starts
          idxTo - idxOffset, errorArr);
        },
        errCb: function errCb(ranges, message) {
          errorArr.push({
            idxFrom: ranges[0][0],
            idxTo: ranges[ranges.length - 1][1],
            message: message,
            fix: {
              ranges: ranges
            }
          });
        }
      });
    } else {
      str.slice(charStart, charEnd); // if there are errors, validateValue() mutates the passed "errorArr",
      // pushing to it

      validateValue$2(str, idxOffset, opts, charStart, charEnd, errorArr);
    }
  }
  return errorArr;
}

var wholeExtensionRegex = /^\.\w+$/g; // Regex is not so strict, to cover variations without miliseconds.
// Also, we don't use capturing groups because we don't extract, only validate.
// 2019-07-09T15:03:36Z (https://www.npmjs.com/package/iso-datestring-validator)
// 2011-10-05T14:48:00.000Z (https://www.npmjs.com/package/regex-iso-date)

var isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z/g;
var fontSizeRegex = /^[+-]?[1-7]$/;
var linkTypes = ["apple-touch-icon", "apple-touch-startup-image", "alternate", "archives", "appendix", "author", "bookmark", "canonical", "chapter", "contents", "copyright", "dns-prefetch", "external", "first", "glossary", "help", "icon", "import", "index", "last", "license", "manifest", "modulepreload", "next", "nofollow", "noopener", "noreferrer", "opener", "pingback", "preconnect", "prefetch", "preload", "prerender", "prev", "search", "shortlink", "section", "sidebar", "start", "stylesheet", "subsection", "tag", "up"];
var astErrMessages = {
  "tag-missing-opening": "Opening tag is missing.",
  "tag-missing-closing": "Closing tag is missing.",
  "tag-void-frontal-slash": "Remove frontal slash."
}; // -----------------------------------------------------------------------------

function isLetter(str) {
  return typeof str === "string" && str.length === 1 && str.toUpperCase() !== str.toLowerCase();
}

function isAnEnabledValue(maybeARulesValue) {
  if (Number.isInteger(maybeARulesValue) && maybeARulesValue > 0) {
    return maybeARulesValue;
  }

  if (Array.isArray(maybeARulesValue) && maybeARulesValue.length && Number.isInteger(maybeARulesValue[0]) && maybeARulesValue[0] > 0) {
    return maybeARulesValue[0];
  }

  return 0;
}

function isObj(something) {
  return !!(something && typeof something === "object" && !Array.isArray(something));
}

function isAnEnabledRule(rules, ruleId) {
  if (!ruleId) {
    return 0;
  }

  if (isObj(rules) && Object.prototype.hasOwnProperty.call(rules, ruleId)) {
    return rules[ruleId];
  }

  if (ruleId.includes("-") && Object.prototype.hasOwnProperty.call(rules, ruleId.split("-")[0])) {
    return rules[ruleId.split("-")[0]];
  }

  if (isObj(rules) && Object.prototype.hasOwnProperty.call(rules, "all")) {
    return rules.all;
  } // default return - rule's off:


  return 0; // Object.keys(rules.rules).some(
  //   ruleName =>
  //     (ruleName === "all" || // group blanket setting
  //     ruleName === "tag" || // group blanket setting
  //       ruleName.startsWith(obj.ruleId)) &&
  //     (isAnEnabledValue(rules.rules[ruleName]) ||
  //       isAnEnabledValue(processedRulesConfig[ruleName]))
  // )
} // -----------------------------------------------------------------------------

var util = /*#__PURE__*/Object.freeze({
__proto__: null,
wholeExtensionRegex: wholeExtensionRegex,
splitByWhitespace: splitByWhitespace,
isAnEnabledValue: isAnEnabledValue,
isAnEnabledRule: isAnEnabledRule,
astErrMessages: astErrMessages,
validateString: validateString,
fontSizeRegex: fontSizeRegex,
isoDateRegex: isoDateRegex,
linkTypes: linkTypes,
isLetter: isLetter,
isObj: isObj
});

// rule: bad-character-null
// -----------------------------------------------------------------------------
// Catches raw character "NULL":
// https://www.fileformat.info/info/unicode/char/0000/index.htm
function badCharacterNull(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 0) {
        context.report({
          ruleId: "bad-character-null",
          message: "Bad character - NULL.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-start-of-heading
// -----------------------------------------------------------------------------
// Catches raw character "START OF HEADING":
// https://www.fileformat.info/info/unicode/char/0001/index.htm
function badCharacterStartOfHeading(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 1) {
        context.report({
          ruleId: "bad-character-start-of-heading",
          message: "Bad character - START OF HEADING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-start-of-text
// -----------------------------------------------------------------------------
// Catches raw character "START OF TEXT":
// https://www.fileformat.info/info/unicode/char/0002/index.htm
function badCharacterStartOfText(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 2) {
        context.report({
          ruleId: "bad-character-start-of-text",
          message: "Bad character - START OF TEXT.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-end-of-text
// -----------------------------------------------------------------------------
// Catches raw character "END OF TEXT":
// https://www.fileformat.info/info/unicode/char/0003/index.htm
function badCharacterEndOfText(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 3) {
        context.report({
          ruleId: "bad-character-end-of-text",
          message: "Bad character - END OF TEXT.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, "\n"]] // replace with line break

          }
        });
      }
    }
  };
}

// rule: bad-character-end-of-transmission
// -----------------------------------------------------------------------------
// Catches raw character "END OF TRANSMISSION":
// https://www.fileformat.info/info/unicode/char/0004/index.htm
function badCharacterEndOfTransmission(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 4) {
        context.report({
          ruleId: "bad-character-end-of-transmission",
          message: "Bad character - END OF TRANSMISSION.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-enquiry
// -----------------------------------------------------------------------------
// Catches raw character "ENQUIRY":
// https://www.fileformat.info/info/unicode/char/0005/index.htm
function badCharacterEnquiry(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 5) {
        context.report({
          ruleId: "bad-character-enquiry",
          message: "Bad character - ENQUIRY.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-acknowledge
// -----------------------------------------------------------------------------
// Catches raw character "ACKNOWLEDGE":
// https://www.fileformat.info/info/unicode/char/0006/index.htm
function badCharacterAcknowledge(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 6) {
        context.report({
          ruleId: "bad-character-acknowledge",
          message: "Bad character - ACKNOWLEDGE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-bell
// -----------------------------------------------------------------------------
// Catches raw character "BELL":
// https://www.fileformat.info/info/unicode/char/0007/index.htm
function badCharacterBell(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 7) {
        context.report({
          ruleId: "bad-character-bell",
          message: "Bad character - BELL.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-backspace
// -----------------------------------------------------------------------------
// Catches raw character "BACKSPACE":
// https://www.fileformat.info/info/unicode/char/0008/index.htm
function badCharacterBackspace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8) {
        context.report({
          ruleId: "bad-character-backspace",
          message: "Bad character - BACKSPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-tabulation

var badCharacterTabulation = function badCharacterTabulation(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  } // indentation tabs might be OK, check config.
  // tabs between text not OK.
  // tabs trailing lines, leading to EOL or line break, not OK. ("right-side indentation")
  // plan: use "leftStopAtNewLines" method, it stops at first non-whitespace
  // character or linebreaks of both kinds: CR or LF.

  var mode = "never";

  if (Array.isArray(originalOpts) && originalOpts[0] && typeof originalOpts[0] === "string" && originalOpts[0].toLowerCase() === "indentationisfine") {
    mode = "indentationIsFine";
  }

  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 9) {
        if (mode === "never") {
          // simple - there can't be any TABs, so raise it straight away
          context.report({
            ruleId: "bad-character-tabulation",
            message: "Bad character - TABULATION.",
            idxFrom: i,
            idxTo: i + 1,
            fix: {
              ranges: [[i, i + 1, " "]] // replace with one space

            }
          });
        } else if (mode === "indentationIsFine") {
          // leftStopAtNewLines() will stop either at first non-whitespace character
          // on the left, or LF or CR. By evaluating the trim of it, we can
          // filter out cases where it's non-whitespace character. In other
          // words, that's TAB in the middle of the line, between letter characters.
          var charTopOnBreaksIdx = stringLeftRight.leftStopAtNewLines(context.str, i);

          if (charTopOnBreaksIdx !== null && context.str[charTopOnBreaksIdx].trim().length) {
            context.report({
              ruleId: "bad-character-tabulation",
              message: "Bad character - TABULATION.",
              idxFrom: i,
              idxTo: i + 1,
              fix: {
                ranges: [[i, i + 1, " "]] // replace with one space

              }
            });
          }
        }
      }
    }
  };
};

// rule: bad-character-line-tabulation
// -----------------------------------------------------------------------------
// Catches raw character "LINE TABULATION":
// https://www.fileformat.info/info/unicode/char/000b/index.htm
function badCharacterLineTabulation(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 11) {
        context.report({
          ruleId: "bad-character-line-tabulation",
          message: "Bad character - LINE TABULATION.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-form-feed
// -----------------------------------------------------------------------------
// Catches raw character "FORM FEED":
// https://www.fileformat.info/info/unicode/char/000c/index.htm
function badCharacterFormFeed(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 12) {
        context.report({
          ruleId: "bad-character-form-feed",
          message: "Bad character - FORM FEED.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-shift-out
// -----------------------------------------------------------------------------
// Catches raw character "SHIFT OUT":
// https://www.fileformat.info/info/unicode/char/000e/index.htm
function badCharacterShiftOut(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 14) {
        context.report({
          ruleId: "bad-character-shift-out",
          message: "Bad character - SHIFT OUT.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-shift-in
// -----------------------------------------------------------------------------
// Catches raw character "SHIFT IN":
// https://www.fileformat.info/info/unicode/char/000f/index.htm
function badCharacterShiftIn(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 15) {
        context.report({
          ruleId: "bad-character-shift-in",
          message: "Bad character - SHIFT IN.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-data-link-escape
// -----------------------------------------------------------------------------
// Catches raw character "DATA LINK ESCAPE":
// https://www.fileformat.info/info/unicode/char/0010/index.htm
function badCharacterDataLinkEscape(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 16) {
        context.report({
          ruleId: "bad-character-data-link-escape",
          message: "Bad character - DATA LINK ESCAPE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-device-control-one
// -----------------------------------------------------------------------------
// Catches raw character "DEVICE CONTROL ONE":
// https://www.fileformat.info/info/unicode/char/0011/index.htm
function badCharacterDeviceControlOne(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 17) {
        context.report({
          ruleId: "bad-character-device-control-one",
          message: "Bad character - DEVICE CONTROL ONE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-device-control-two
// -----------------------------------------------------------------------------
// Catches raw character "DEVICE CONTROL TWO":
// https://www.fileformat.info/info/unicode/char/0012/index.htm
function badCharacterDeviceControlTwo(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 18) {
        context.report({
          ruleId: "bad-character-device-control-two",
          message: "Bad character - DEVICE CONTROL TWO.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-device-control-three
// -----------------------------------------------------------------------------
// Catches raw character "DEVICE CONTROL THREE":
// https://www.fileformat.info/info/unicode/char/0013/index.htm
function badCharacterDeviceControlThree(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 19) {
        context.report({
          ruleId: "bad-character-device-control-three",
          message: "Bad character - DEVICE CONTROL THREE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-device-control-four
// -----------------------------------------------------------------------------
// Catches raw character "DEVICE CONTROL FOUR":
// https://www.fileformat.info/info/unicode/char/0014/index.htm
function badCharacterDeviceControlFour(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 20) {
        context.report({
          ruleId: "bad-character-device-control-four",
          message: "Bad character - DEVICE CONTROL FOUR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-negative-acknowledge
// -----------------------------------------------------------------------------
// Catches raw character "NEGATIVE ACKNOWLEDGE":
// https://www.fileformat.info/info/unicode/char/0015/index.htm
function badCharacterNegativeAcknowledge(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 21) {
        context.report({
          ruleId: "bad-character-negative-acknowledge",
          message: "Bad character - NEGATIVE ACKNOWLEDGE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-synchronous-idle
// -----------------------------------------------------------------------------
// Catches raw character "SYNCHRONOUS IDLE":
// https://www.fileformat.info/info/unicode/char/0016/index.htm
function badCharacterSynchronousIdle(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 22) {
        context.report({
          ruleId: "bad-character-synchronous-idle",
          message: "Bad character - SYNCHRONOUS IDLE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-end-of-transmission-block
// -----------------------------------------------------------------------------
// Catches raw character "END OF TRANSMISSION BLOCK":
// https://www.fileformat.info/info/unicode/char/0017/index.htm
function badCharacterEndOfTransmissionBlock(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 23) {
        context.report({
          ruleId: "bad-character-end-of-transmission-block",
          message: "Bad character - END OF TRANSMISSION BLOCK.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-cancel
// -----------------------------------------------------------------------------
// Catches raw character "CANCEL":
// https://www.fileformat.info/info/unicode/char/0018/index.htm
function badCharacterCancel(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 24) {
        context.report({
          ruleId: "bad-character-cancel",
          message: "Bad character - CANCEL.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-end-of-medium
// -----------------------------------------------------------------------------
// Catches raw character "END OF MEDIUM":
// https://www.fileformat.info/info/unicode/char/0019/index.htm
function badCharacterEndOfMedium(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 25) {
        context.report({
          ruleId: "bad-character-end-of-medium",
          message: "Bad character - END OF MEDIUM.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-substitute
// -----------------------------------------------------------------------------
// Catches raw character "SUBSTITUTE":
// https://www.fileformat.info/info/unicode/char/001a/index.htm
function badCharacterSubstitute(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 26) {
        context.report({
          ruleId: "bad-character-substitute",
          message: "Bad character - SUBSTITUTE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-escape
// -----------------------------------------------------------------------------
// Catches raw character "ESCAPE":
// https://www.fileformat.info/info/unicode/char/001b/index.htm
function badCharacterEscape(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 27) {
        context.report({
          ruleId: "bad-character-escape",
          message: "Bad character - ESCAPE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-information-separator-four
// -----------------------------------------------------------------------------
// Catches raw character "INFORMATION SEPARATOR FOUR":
// https://www.fileformat.info/info/unicode/char/001c/index.htm
function badCharacterInformationSeparatorFour(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 28) {
        context.report({
          ruleId: "bad-character-information-separator-four",
          message: "Bad character - INFORMATION SEPARATOR FOUR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-information-separator-three
// -----------------------------------------------------------------------------
// Catches raw character "INFORMATION SEPARATOR THREE":
// https://www.fileformat.info/info/unicode/char/001d/index.htm
function badCharacterInformationSeparatorThree(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 29) {
        context.report({
          ruleId: "bad-character-information-separator-three",
          message: "Bad character - INFORMATION SEPARATOR THREE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-information-separator-two
// -----------------------------------------------------------------------------
// Catches raw character "INFORMATION SEPARATOR TWO":
// https://www.fileformat.info/info/unicode/char/001e/index.htm
function badCharacterInformationSeparatorTwo$1(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 30) {
        context.report({
          ruleId: "bad-character-information-separator-two",
          message: "Bad character - INFORMATION SEPARATOR TWO.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-information-separator-one
// -----------------------------------------------------------------------------
// Catches raw character "INFORMATION SEPARATOR ONE":
// https://www.fileformat.info/info/unicode/char/001f/index.htm
function badCharacterInformationSeparatorTwo(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 31) {
        context.report({
          ruleId: "bad-character-information-separator-one",
          message: "Bad character - INFORMATION SEPARATOR ONE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-delete
// -----------------------------------------------------------------------------
// Catches raw character "DELETE":
// https://www.fileformat.info/info/unicode/char/007f/index.htm
function badCharacterDelete(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 127) {
        context.report({
          ruleId: "bad-character-delete",
          message: "Bad character - DELETE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-control-0080
// -----------------------------------------------------------------------------
// Catches raw character "CONTROL" (hex 80):
// https://www.fileformat.info/info/unicode/char/0080/index.htm
function badCharacterControl0080(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 128) {
        context.report({
          ruleId: "bad-character-control-0080",
          message: "Bad character - CONTROL.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-control-0081
// -----------------------------------------------------------------------------
// Catches raw character "CONTROL" (hex 81):
// https://www.fileformat.info/info/unicode/char/0081/index.htm
function badCharacterControl0081(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 129) {
        context.report({
          ruleId: "bad-character-control-0081",
          message: "Bad character - CONTROL.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-break-permitted-here
// -----------------------------------------------------------------------------
// Catches raw character "BREAK PERMITTED HERE":
// https://www.fileformat.info/info/unicode/char/0082/index.htm
function badCharacterBreakPermittedHere(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 130) {
        context.report({
          ruleId: "bad-character-break-permitted-here",
          message: "Bad character - BREAK PERMITTED HERE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-no-break-here
// -----------------------------------------------------------------------------
// Catches raw character "NO BREAK HERE":
// https://www.fileformat.info/info/unicode/char/0083/index.htm
function badCharacterNoBreakHere(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 131) {
        context.report({
          ruleId: "bad-character-no-break-here",
          message: "Bad character - NO BREAK HERE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-control-0084
// -----------------------------------------------------------------------------
// Catches raw character "CONTROL" (hex 84):
// https://www.fileformat.info/info/unicode/char/0084/index.htm
function badCharacterControl0084(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 132) {
        context.report({
          ruleId: "bad-character-control-0084",
          message: "Bad character - CONTROL.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-next-line
// -----------------------------------------------------------------------------
// Catches raw character "NEXT LINE":
// https://www.fileformat.info/info/unicode/char/0085/index.htm
function badCharacterNextLine(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 133) {
        context.report({
          ruleId: "bad-character-next-line",
          message: "Bad character - NEXT LINE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-start-of-selected-area
// -----------------------------------------------------------------------------
// Catches raw character "START OF SELECTED AREA":
// https://www.fileformat.info/info/unicode/char/0086/index.htm
function badCharacterStartOfSelectedArea(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 134) {
        context.report({
          ruleId: "bad-character-start-of-selected-area",
          message: "Bad character - START OF SELECTED AREA.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-end-of-selected-area
// -----------------------------------------------------------------------------
// Catches raw character "END OF SELECTED AREA":
// https://www.fileformat.info/info/unicode/char/0087/index.htm
function badCharacterEndOfSelectedArea(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 135) {
        context.report({
          ruleId: "bad-character-end-of-selected-area",
          message: "Bad character - END OF SELECTED AREA.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-character-tabulation-set
// -----------------------------------------------------------------------------
// Catches raw character "CHARACTER TABULATION SET":
// https://www.fileformat.info/info/unicode/char/0088/index.htm
function badCharacterCharacterTabulationSet(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 136) {
        context.report({
          ruleId: "bad-character-character-tabulation-set",
          message: "Bad character - CHARACTER TABULATION SET.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-character-tabulation-with-justification
// -----------------------------------------------------------------------------
// Catches raw character "CHARACTER TABULATION WITH JUSTIFICATION":
// https://www.fileformat.info/info/unicode/char/0089/index.htm
function badCharacterCharacterTabulationWithJustification(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 137) {
        context.report({
          ruleId: "bad-character-character-tabulation-with-justification",
          message: "Bad character - CHARACTER TABULATION WITH JUSTIFICATION.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-line-tabulation-set
// -----------------------------------------------------------------------------
// Catches raw character "LINE TABULATION SET":
// https://www.fileformat.info/info/unicode/char/008a/index.htm
function badCharacterLineTabulationSet(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 138) {
        context.report({
          ruleId: "bad-character-line-tabulation-set",
          message: "Bad character - LINE TABULATION SET.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-partial-line-forward
// -----------------------------------------------------------------------------
// Catches raw character "PARTIAL LINE FORWARD":
// https://www.fileformat.info/info/unicode/char/008b/index.htm
function badCharacterPartialLineForward(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 139) {
        context.report({
          ruleId: "bad-character-partial-line-forward",
          message: "Bad character - PARTIAL LINE FORWARD.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-partial-line-backward
// -----------------------------------------------------------------------------
// Catches raw character "PARTIAL LINE BACKWARD":
// https://www.fileformat.info/info/unicode/char/008c/index.htm
function badCharacterPartialLineBackward(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 140) {
        context.report({
          ruleId: "bad-character-partial-line-backward",
          message: "Bad character - PARTIAL LINE BACKWARD.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-reverse-line-feed
// -----------------------------------------------------------------------------
// Catches raw character "REVERSE LINE FEED":
// https://www.fileformat.info/info/unicode/char/008d/index.htm
function badCharacterReverseLineFeed(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 141) {
        context.report({
          ruleId: "bad-character-reverse-line-feed",
          message: "Bad character - REVERSE LINE FEED.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-single-shift-two
// -----------------------------------------------------------------------------
// Catches raw character "SINGLE SHIFT TWO":
// https://www.fileformat.info/info/unicode/char/008e/index.htm
function badCharacterSingleShiftTwo$1(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 142) {
        context.report({
          ruleId: "bad-character-single-shift-two",
          message: "Bad character - SINGLE SHIFT TWO.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-single-shift-three
// -----------------------------------------------------------------------------
// Catches raw character "SINGLE SHIFT THREE":
// https://www.fileformat.info/info/unicode/char/008f/index.htm
function badCharacterSingleShiftTwo(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 143) {
        context.report({
          ruleId: "bad-character-single-shift-three",
          message: "Bad character - SINGLE SHIFT THREE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-device-control-string
// -----------------------------------------------------------------------------
// Catches raw character "DEVICE CONTROL STRING":
// https://www.fileformat.info/info/unicode/char/0090/index.htm
function badCharacterDeviceControlString(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 144) {
        context.report({
          ruleId: "bad-character-device-control-string",
          message: "Bad character - DEVICE CONTROL STRING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-private-use-1
// -----------------------------------------------------------------------------
// Catches raw character "PRIVATE USE ONE":
// https://www.fileformat.info/info/unicode/char/0091/index.htm
function badCharacterPrivateUseOne(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 145) {
        context.report({
          ruleId: "bad-character-private-use-1",
          message: "Bad character - PRIVATE USE ONE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-private-use-2
// -----------------------------------------------------------------------------
// Catches raw character "PRIVATE USE TWO":
// https://www.fileformat.info/info/unicode/char/0092/index.htm
function badCharacterPrivateUseTwo(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 146) {
        context.report({
          ruleId: "bad-character-private-use-2",
          message: "Bad character - PRIVATE USE TWO.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-set-transmit-state
// -----------------------------------------------------------------------------
// Catches raw character "SET TRANSMIT STATE":
// https://www.fileformat.info/info/unicode/char/0093/index.htm
function badCharacterSetTransmitState(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 147) {
        context.report({
          ruleId: "bad-character-set-transmit-state",
          message: "Bad character - SET TRANSMIT STATE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-cancel-character
// -----------------------------------------------------------------------------
// Catches raw character "CANCEL CHARACTER":
// https://www.fileformat.info/info/unicode/char/0094/index.htm
function badCharacterCancelCharacter(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 148) {
        context.report({
          ruleId: "bad-character-cancel-character",
          message: "Bad character - CANCEL CHARACTER.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-message-waiting
// -----------------------------------------------------------------------------
// Catches raw character "MESSAGE WAITING":
// https://www.fileformat.info/info/unicode/char/0095/index.htm
function badCharacterMessageWaiting(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 149) {
        context.report({
          ruleId: "bad-character-message-waiting",
          message: "Bad character - MESSAGE WAITING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-start-of-protected-area
// -----------------------------------------------------------------------------
// Catches raw character "START OF PROTECTED AREA":
// https://www.fileformat.info/info/unicode/char/0096/index.htm
function badCharacterStartOfProtectedArea(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 150) {
        context.report({
          ruleId: "bad-character-start-of-protected-area",
          message: "Bad character - START OF PROTECTED AREA.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-end-of-protected-area
// -----------------------------------------------------------------------------
// Catches raw character "END OF PROTECTED AREA":
// https://www.fileformat.info/info/unicode/char/0097/index.htm
function badCharacterEndOfProtectedArea(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 151) {
        context.report({
          ruleId: "bad-character-end-of-protected-area",
          message: "Bad character - END OF PROTECTED AREA.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-start-of-string
// -----------------------------------------------------------------------------
// Catches raw character "START OF STRING":
// https://www.fileformat.info/info/unicode/char/0098/index.htm
function badCharacterStartOfString(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 152) {
        context.report({
          ruleId: "bad-character-start-of-string",
          message: "Bad character - START OF STRING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-control-0099
// -----------------------------------------------------------------------------
// Catches raw character "CONTROL" (hex 99):
// https://www.fileformat.info/info/unicode/char/0099/index.htm
function badCharacterControl0099(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 153) {
        context.report({
          ruleId: "bad-character-control-0099",
          message: "Bad character - CONTROL.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-single-character-introducer
// -----------------------------------------------------------------------------
// Catches raw character "SINGLE CHARACTER INTRODUCER":
// https://www.fileformat.info/info/unicode/char/009a/index.htm
function badCharacterSingleCharacterIntroducer(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 154) {
        context.report({
          ruleId: "bad-character-single-character-introducer",
          message: "Bad character - SINGLE CHARACTER INTRODUCER.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-control-sequence-introducer
// -----------------------------------------------------------------------------
// Catches raw character "CONTROL SEQUENCE INTRODUCER":
// https://www.fileformat.info/info/unicode/char/009b/index.htm
function badCharacterControlSequenceIntroducer(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 155) {
        context.report({
          ruleId: "bad-character-control-sequence-introducer",
          message: "Bad character - CONTROL SEQUENCE INTRODUCER.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-string-terminator
// -----------------------------------------------------------------------------
// Catches raw character "STRING TERMINATOR":
// https://www.fileformat.info/info/unicode/char/009c/index.htm
function badCharacterStringTerminator(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 156) {
        context.report({
          ruleId: "bad-character-string-terminator",
          message: "Bad character - STRING TERMINATOR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-operating-system-command
// -----------------------------------------------------------------------------
// Catches raw character "OPERATING SYSTEM COMMAND":
// https://www.fileformat.info/info/unicode/char/009d/index.htm
function badCharacterOperatingSystemCommand(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 157) {
        context.report({
          ruleId: "bad-character-operating-system-command",
          message: "Bad character - OPERATING SYSTEM COMMAND.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-private-message
// -----------------------------------------------------------------------------
// Catches raw character "PRIVATE MESSAGE":
// https://www.fileformat.info/info/unicode/char/009e/index.htm
function badCharacterPrivateMessage(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 158) {
        context.report({
          ruleId: "bad-character-private-message",
          message: "Bad character - PRIVATE MESSAGE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-application-program-command
// -----------------------------------------------------------------------------
// Catches raw character "APPLICATION PROGRAM COMMAND":
// https://www.fileformat.info/info/unicode/char/009f/index.htm
function badCharacterApplicationProgramCommand(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 159) {
        context.report({
          ruleId: "bad-character-application-program-command",
          message: "Bad character - APPLICATION PROGRAM COMMAND.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-soft-hyphen
// -----------------------------------------------------------------------------
// Catches raw character "SOFT HYPHEN":
// https://www.fileformat.info/info/unicode/char/00ad/index.htm
function badCharacterSoftHyphen(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 173) {
        context.report({
          ruleId: "bad-character-soft-hyphen",
          message: "Bad character - SOFT HYPHEN.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-non-breaking-space
// -----------------------------------------------------------------------------
// Catches raw character "NON-BREAKING SPACE":
// https://www.fileformat.info/info/unicode/char/00a0/index.htm
function badCharacterNonBreakingSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 160) {
        context.report({
          ruleId: "bad-character-non-breaking-space",
          message: "Bad character - NON-BREAKING SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-ogham-space-mark
// -----------------------------------------------------------------------------
// Catches raw character "OGHAM SPACE MARK":
// https://www.fileformat.info/info/unicode/char/1680/index.htm
function badCharacterOghamSpaceMark(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 5760) {
        context.report({
          ruleId: "bad-character-ogham-space-mark",
          message: "Bad character - OGHAM SPACE MARK.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-en-quad
// -----------------------------------------------------------------------------
// Catches raw character "EN QUAD":
// https://www.fileformat.info/info/unicode/char/2000/index.htm
function badCharacterEnQuad(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8192) {
        context.report({
          ruleId: "bad-character-en-quad",
          message: "Bad character - EN QUAD.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-em-quad
// -----------------------------------------------------------------------------
// Catches raw character "EM QUAD":
// https://www.fileformat.info/info/unicode/char/2001/index.htm
function badCharacterEmQuad(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8193) {
        context.report({
          ruleId: "bad-character-em-quad",
          message: "Bad character - EM QUAD.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-en-space
// -----------------------------------------------------------------------------
// Catches raw character "EN SPACE":
// https://www.fileformat.info/info/unicode/char/2002/index.htm
function badCharacterEnSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8194) {
        context.report({
          ruleId: "bad-character-en-space",
          message: "Bad character - EN SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-em-space
// -----------------------------------------------------------------------------
// Catches raw character "EM SPACE":
// https://www.fileformat.info/info/unicode/char/2003/index.htm
function badCharacterEmSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8195) {
        context.report({
          ruleId: "bad-character-em-space",
          message: "Bad character - EM SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-three-per-em-space
// -----------------------------------------------------------------------------
// Catches raw character "THREE-PER-EM SPACE":
// https://www.fileformat.info/info/unicode/char/2004/index.htm
function badCharacterThreePerEmSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8196) {
        context.report({
          ruleId: "bad-character-three-per-em-space",
          message: "Bad character - THREE-PER-EM SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-four-per-em-space
// -----------------------------------------------------------------------------
// Catches raw character "FOUR-PER-EM SPACE":
// https://www.fileformat.info/info/unicode/char/2005/index.htm
function badCharacterFourPerEmSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8197) {
        context.report({
          ruleId: "bad-character-four-per-em-space",
          message: "Bad character - FOUR-PER-EM SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-six-per-em-space
// -----------------------------------------------------------------------------
// Catches raw character "SIX-PER-EM SPACE":
// https://www.fileformat.info/info/unicode/char/2006/index.htm
function badCharacterSixPerEmSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8198) {
        context.report({
          ruleId: "bad-character-six-per-em-space",
          message: "Bad character - SIX-PER-EM SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-figure-space
// -----------------------------------------------------------------------------
// Catches raw character "FIGURE SPACE":
// https://www.fileformat.info/info/unicode/char/2007/index.htm
function badCharacterFigureSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8199) {
        context.report({
          ruleId: "bad-character-figure-space",
          message: "Bad character - FIGURE SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-punctuation-space
// -----------------------------------------------------------------------------
// Catches raw character "PUNCTUATION SPACE":
// https://www.fileformat.info/info/unicode/char/2008/index.htm
function badCharacterPunctuationSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8200) {
        context.report({
          ruleId: "bad-character-punctuation-space",
          message: "Bad character - PUNCTUATION SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-thin-space
// -----------------------------------------------------------------------------
// Catches raw character "THIN SPACE":
// https://www.fileformat.info/info/unicode/char/2009/index.htm
function badCharacterThinSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8201) {
        context.report({
          ruleId: "bad-character-thin-space",
          message: "Bad character - THIN SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-hair-space
// -----------------------------------------------------------------------------
// Catches raw character "HAIR SPACE":
// https://www.fileformat.info/info/unicode/char/200a/index.htm
function badCharacterHairSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8202) {
        context.report({
          ruleId: "bad-character-hair-space",
          message: "Bad character - HAIR SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-zero-width-space
// -----------------------------------------------------------------------------
// Catches raw character "ZERO WIDTH SPACE":
// https://www.fileformat.info/info/unicode/char/200b/index.htm
function badCharacterZeroWidthSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8203) {
        context.report({
          ruleId: "bad-character-zero-width-space",
          message: "Bad character - ZERO WIDTH SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-zero-width-non-joiner
// -----------------------------------------------------------------------------
// Catches raw character "ZERO WIDTH NON-JOINER":
// https://www.fileformat.info/info/unicode/char/200c/index.htm
function badCharacterZeroWidthNonJoiner(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8204) {
        context.report({
          ruleId: "bad-character-zero-width-non-joiner",
          message: "Bad character - ZERO WIDTH NON-JOINER.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-zero-width-joiner
// -----------------------------------------------------------------------------
// Catches raw character "ZERO WIDTH JOINER":
// https://www.fileformat.info/info/unicode/char/200d/index.htm
function badCharacterZeroWidthJoiner(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8205) {
        context.report({
          ruleId: "bad-character-zero-width-joiner",
          message: "Bad character - ZERO WIDTH JOINER.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-left-to-right-mark
// -----------------------------------------------------------------------------
// Catches raw character "LEFT-TO-RIGHT MARK":
// https://www.fileformat.info/info/unicode/char/200e/index.htm
function badCharacterLeftToRightMark(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8206) {
        context.report({
          ruleId: "bad-character-left-to-right-mark",
          message: "Bad character - LEFT-TO-RIGHT MARK.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-right-to-left-mark
// -----------------------------------------------------------------------------
// Catches raw character "RIGHT-TO-LEFT MARK":
// https://www.fileformat.info/info/unicode/char/200f/index.htm
function badCharacterRightToLeftMark(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8207) {
        context.report({
          ruleId: "bad-character-right-to-left-mark",
          message: "Bad character - RIGHT-TO-LEFT MARK.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-left-to-right-embedding
// -----------------------------------------------------------------------------
// Catches raw character "LEFT-TO-RIGHT EMBEDDING":
// https://www.fileformat.info/info/unicode/char/202a/index.htm
function badCharacterLeftToRightEmbedding(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8234) {
        context.report({
          ruleId: "bad-character-left-to-right-embedding",
          message: "Bad character - LEFT-TO-RIGHT EMBEDDING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-right-to-left-embedding
// -----------------------------------------------------------------------------
// Catches raw character "RIGHT-TO-LEFT EMBEDDING":
// https://www.fileformat.info/info/unicode/char/202b/index.htm
function badCharacterRightToLeftEmbedding(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8235) {
        context.report({
          ruleId: "bad-character-right-to-left-embedding",
          message: "Bad character - RIGHT-TO-LEFT EMBEDDING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-pop-directional-formatting
// -----------------------------------------------------------------------------
// Catches raw character "POP DIRECTIONAL FORMATTING":
// https://www.fileformat.info/info/unicode/char/202c/index.htm
function badCharacterPopDirectionalFormatting(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8236) {
        context.report({
          ruleId: "bad-character-pop-directional-formatting",
          message: "Bad character - POP DIRECTIONAL FORMATTING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-left-to-right-override
// -----------------------------------------------------------------------------
// Catches raw character "LEFT-TO-RIGHT OVERRIDE":
// https://www.fileformat.info/info/unicode/char/202d/index.htm
function badCharacterLeftToRightOverride(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8237) {
        context.report({
          ruleId: "bad-character-left-to-right-override",
          message: "Bad character - LEFT-TO-RIGHT OVERRIDE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-right-to-left-override
// -----------------------------------------------------------------------------
// Catches raw character "RIGHT-TO-LEFT OVERRIDE":
// https://www.fileformat.info/info/unicode/char/202e/index.htm
function badCharacterRightToLeftOverride(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8238) {
        context.report({
          ruleId: "bad-character-right-to-left-override",
          message: "Bad character - RIGHT-TO-LEFT OVERRIDE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-word-joiner
// -----------------------------------------------------------------------------
// Catches raw character "WORD JOINER":
// https://www.fileformat.info/info/unicode/char/2060/index.htm
function badCharacterWordJoiner(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8288) {
        context.report({
          ruleId: "bad-character-word-joiner",
          message: "Bad character - WORD JOINER.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-function-application
// -----------------------------------------------------------------------------
// Catches raw character "FUNCTION APPLICATION":
// https://www.fileformat.info/info/unicode/char/2061/index.htm
function badCharacterFunctionApplication(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8289) {
        context.report({
          ruleId: "bad-character-function-application",
          message: "Bad character - FUNCTION APPLICATION.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-invisible-times
// -----------------------------------------------------------------------------
// Catches raw character "INVISIBLE TIMES":
// https://www.fileformat.info/info/unicode/char/2062/index.htm
function badCharacterInvisibleTimes(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8290) {
        context.report({
          ruleId: "bad-character-invisible-times",
          message: "Bad character - INVISIBLE TIMES.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-invisible-separator
// -----------------------------------------------------------------------------
// Catches raw character "INVISIBLE SEPARATOR":
// https://www.fileformat.info/info/unicode/char/2063/index.htm
function badCharacterInvisibleSeparator(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8291) {
        context.report({
          ruleId: "bad-character-invisible-separator",
          message: "Bad character - INVISIBLE SEPARATOR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-invisible-plus
// -----------------------------------------------------------------------------
// Catches raw character "INVISIBLE PLUS":
// https://www.fileformat.info/info/unicode/char/2064/index.htm
function badCharacterInvisiblePlus(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8292) {
        context.report({
          ruleId: "bad-character-invisible-plus",
          message: "Bad character - INVISIBLE PLUS.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-left-to-right-isolate
// -----------------------------------------------------------------------------
// Catches raw character "LEFT-TO-RIGHT ISOLATE":
// https://www.fileformat.info/info/unicode/char/2066/index.htm
function badCharacterLeftToRightIsolate(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8294) {
        context.report({
          ruleId: "bad-character-left-to-right-isolate",
          message: "Bad character - LEFT-TO-RIGHT ISOLATE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-right-to-left-isolate
// -----------------------------------------------------------------------------
// Catches raw character "RIGHT-TO-LEFT ISOLATE":
// https://www.fileformat.info/info/unicode/char/2067/index.htm
function badCharacterRightToLeftIsolate(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8295) {
        context.report({
          ruleId: "bad-character-right-to-left-isolate",
          message: "Bad character - RIGHT-TO-LEFT ISOLATE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-first-strong-isolate
// -----------------------------------------------------------------------------
// Catches raw character "FIRST STRONG ISOLATE":
// https://www.fileformat.info/info/unicode/char/2068/index.htm
function badCharacterFirstStrongIsolate(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8296) {
        context.report({
          ruleId: "bad-character-first-strong-isolate",
          message: "Bad character - FIRST STRONG ISOLATE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-pop-directional-isolate
// -----------------------------------------------------------------------------
// Catches raw character "FIRST STRONG ISOLATE":
// https://www.fileformat.info/info/unicode/char/2069/index.htm
function badCharacterPopDirectionalIsolate(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8297) {
        context.report({
          ruleId: "bad-character-pop-directional-isolate",
          message: "Bad character - FIRST STRONG ISOLATE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-inhibit-symmetric-swapping
// -----------------------------------------------------------------------------
// Catches raw character "INHIBIT SYMMETRIC SWAPPING":
// https://www.fileformat.info/info/unicode/char/206a/index.htm
function badCharacterInhibitSymmetricSwapping(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8298) {
        context.report({
          ruleId: "bad-character-inhibit-symmetric-swapping",
          message: "Bad character - INHIBIT SYMMETRIC SWAPPING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-activate-symmetric-swapping
// -----------------------------------------------------------------------------
// Catches raw character "INHIBIT SYMMETRIC SWAPPING":
// https://www.fileformat.info/info/unicode/char/206b/index.htm
function badCharacterActivateSymmetricSwapping(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8299) {
        context.report({
          ruleId: "bad-character-activate-symmetric-swapping",
          message: "Bad character - INHIBIT SYMMETRIC SWAPPING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-inhibit-arabic-form-shaping
// -----------------------------------------------------------------------------
// Catches raw character "INHIBIT ARABIC FORM SHAPING":
// https://www.fileformat.info/info/unicode/char/206c/index.htm
function badCharacterInhibitArabicFormShaping(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8300) {
        context.report({
          ruleId: "bad-character-inhibit-arabic-form-shaping",
          message: "Bad character - INHIBIT ARABIC FORM SHAPING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-activate-arabic-form-shaping
// -----------------------------------------------------------------------------
// Catches raw character "ACTIVATE ARABIC FORM SHAPING":
// https://www.fileformat.info/info/unicode/char/206d/index.htm
function badCharacterActivateArabicFormShaping(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8301) {
        context.report({
          ruleId: "bad-character-activate-arabic-form-shaping",
          message: "Bad character - ACTIVATE ARABIC FORM SHAPING.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-national-digit-shapes
// -----------------------------------------------------------------------------
// Catches raw character "NATIONAL DIGIT SHAPES":
// https://www.fileformat.info/info/unicode/char/206e/index.htm
function badCharacterNationalDigitShapes(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8302) {
        context.report({
          ruleId: "bad-character-national-digit-shapes",
          message: "Bad character - NATIONAL DIGIT SHAPES.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-nominal-digit-shapes
// -----------------------------------------------------------------------------
// Catches raw character "NOMINAL DIGIT SHAPES":
// https://www.fileformat.info/info/unicode/char/206f/index.htm
function badCharacterNominalDigitShapes(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8303) {
        context.report({
          ruleId: "bad-character-nominal-digit-shapes",
          message: "Bad character - NOMINAL DIGIT SHAPES.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-zero-width-no-break-space
// -----------------------------------------------------------------------------
// Catches raw character "ZERO WIDTH NO-BREAK SPACE":
// https://www.fileformat.info/info/unicode/char/feff/index.htm
function badCharacterZeroWidthNoBreakSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 65279) {
        context.report({
          ruleId: "bad-character-zero-width-no-break-space",
          message: "Bad character - ZERO WIDTH NO-BREAK SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-interlinear-annotation-anchor
// -----------------------------------------------------------------------------
// Catches raw character "INTERLINEAR ANNOTATION ANCHOR":
// https://www.fileformat.info/info/unicode/char/fff9/index.htm
function badCharacterInterlinearAnnotationAnchor(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 65529) {
        context.report({
          ruleId: "bad-character-interlinear-annotation-anchor",
          message: "Bad character - INTERLINEAR ANNOTATION ANCHOR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-interlinear-annotation-separator
// -----------------------------------------------------------------------------
// Catches raw character "INTERLINEAR ANNOTATION SEPARATOR":
// https://www.fileformat.info/info/unicode/char/fffa/index.htm
function badCharacterInterlinearAnnotationSeparator(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 65530) {
        context.report({
          ruleId: "bad-character-interlinear-annotation-separator",
          message: "Bad character - INTERLINEAR ANNOTATION SEPARATOR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-interlinear-annotation-terminator
// -----------------------------------------------------------------------------
// Catches raw character "INTERLINEAR ANNOTATION TERMINATOR":
// https://www.fileformat.info/info/unicode/char/fffb/index.htm
function badCharacterInterlinearAnnotationTerminator(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 65531) {
        context.report({
          ruleId: "bad-character-interlinear-annotation-terminator",
          message: "Bad character - INTERLINEAR ANNOTATION TERMINATOR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-line-separator
// -----------------------------------------------------------------------------
// Catches raw character "LINE SEPARATOR":
// https://www.fileformat.info/info/unicode/char/2028/index.htm
function badCharacterLineSeparator(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8232) {
        context.report({
          ruleId: "bad-character-line-separator",
          message: "Bad character - LINE SEPARATOR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-paragraph-separator
// -----------------------------------------------------------------------------
// Catches raw character "PARAGRAPH SEPARATOR":
// https://www.fileformat.info/info/unicode/char/2029/index.htm
function badCharacterParagraphSeparator(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8233) {
        context.report({
          ruleId: "bad-character-paragraph-separator",
          message: "Bad character - PARAGRAPH SEPARATOR.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// rule: bad-character-narrow-no-break-space
// -----------------------------------------------------------------------------
// Catches raw character "NARROW NO-BREAK SPACE":
// https://www.fileformat.info/info/unicode/char/202f/index.htm
function badCharacterNarrowNoBreakSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8239) {
        context.report({
          ruleId: "bad-character-narrow-no-break-space",
          message: "Bad character - NARROW NO-BREAK SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-medium-mathematical-space
// -----------------------------------------------------------------------------
// Catches raw character "MEDIUM MATHEMATICAL SPACE":
// https://www.fileformat.info/info/unicode/char/205f/index.htm
function badCharacterMediumMathematicalSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 8287) {
        context.report({
          ruleId: "bad-character-medium-mathematical-space",
          message: "Bad character - MEDIUM MATHEMATICAL SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-ideographic-space
// -----------------------------------------------------------------------------
// Catches raw character "IDEOGRAPHIC SPACE":
// https://www.fileformat.info/info/unicode/char/3000/index.htm
function badCharacterIdeographicSpace(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 12288) {
        context.report({
          ruleId: "bad-character-ideographic-space",
          message: "Bad character - IDEOGRAPHIC SPACE.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1, " "]] // replace with a normal space

          }
        });
      }
    }
  };
}

// rule: bad-character-replacement-character
// -----------------------------------------------------------------------------
// Catches raw character "REPLACEMENT CHARACTER":
// https://www.fileformat.info/info/unicode/char/fffd/index.htm
function badCharacterReplacementCharacter(context) {
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;

      if (chr.charCodeAt(0) === 65533) {
        context.report({
          ruleId: "bad-character-replacement-character",
          message: "Bad character - REPLACEMENT CHARACTER.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]] // just delete it

          }
        });
      }
    }
  };
}

// -----------------------------------------------------------------------------
// it flags up any tags which have whitespace between opening bracket and first
// tag name letter:
//
// < table>
// <   a href="">
// <\n\nspan>

function tagSpaceAfterOpeningBracket(context) {
  return {
    tag: function tag(node) {
      var ranges = []; // const wholeGap = context.str.slice(node.start + 1, node.tagNameStartsAt);
      // 1. if there's whitespace after opening bracket

      if (typeof context.str[node.start + 1] === "string" && !context.str[node.start + 1].trim()) {
        ranges.push([node.start + 1, stringLeftRight.right(context.str, node.start + 1) || context.str.length]);
      } // 2. if there's whitespace before tag name


      if (!context.str[node.tagNameStartsAt - 1].trim()) {
        var charToTheLeftOfTagNameIdx = stringLeftRight.left(context.str, node.tagNameStartsAt) || 0;

        if (charToTheLeftOfTagNameIdx !== node.start) {
          // we don't want duplication
          ranges.push([charToTheLeftOfTagNameIdx + 1, node.tagNameStartsAt]);
        }
      }

      if (ranges.length) {
        context.report({
          ruleId: "tag-space-after-opening-bracket",
          message: "Bad whitespace.",
          idxFrom: ranges[0][0],
          idxTo: ranges[ranges.length - 1][1],
          fix: {
            ranges: ranges
          }
        });
      }
    }
  };
}

// -----------------------------------------------------------------------------

var BACKSLASH$2 = "\\"; // it flags up any tags which have whitespace between opening bracket and first
// tag name letter:
//
// < table>
// <   a href="">
// <\n\nspan>

function tagSpaceBeforeClosingBracket(context) {
  return {
    tag: function tag(node) {
      var ranges = []; // const wholeGap = context.str.slice(node.start + 1, node.tagNameStartsAt);
      // 1. if there's whitespace before the closing bracket

      if ( // tag ends with a bracket:
      context.str[node.end - 1] === ">" && // and there's a whitespace on the left of it:
      !context.str[node.end - 2].trim().length && // and the next non-whitespace character on the left is not slash of
      // any kind (we don't want to step into rule's
      // "tag-space-between-slash-and-bracket" turf)
      !(BACKSLASH$2 + "/").includes(context.str[stringLeftRight.left(context.str, node.end - 1) || 0])) {
        var from = stringLeftRight.left(context.str, node.end - 1) ? stringLeftRight.left(context.str, node.end - 1) + 1 : 0;
        ranges.push([from, node.end - 1]);
      }

      if (ranges.length) {
        context.report({
          ruleId: "tag-space-before-closing-bracket",
          message: "Bad whitespace.",
          idxFrom: ranges[0][0],
          idxTo: ranges[ranges.length - 1][1],
          fix: {
            ranges: ranges
          }
        });
      }
    }
  };
}

// -----------------------------------------------------------------------------
// it flags up any tags which have whitespace between opening bracket and first
// tag name letter:
//
// < table>
// <   a href="">
// <\n\nspan>

function tagSpaceBeforeClosingSlash(context, mode) {
  if (mode === void 0) {
    mode = "never";
  }

  return {
    tag: function tag(node) {
      context.str.slice(node.start + 1, node.tagNameStartsAt); // PROCESSING:

      var closingBracketPos = node.end - 1;
      var slashPos = stringLeftRight.left(context.str, closingBracketPos);
      var leftOfSlashPos = stringLeftRight.left(context.str, slashPos) || 0;

      if (mode === "never" && node.void && context.str[slashPos] === "/" && leftOfSlashPos < slashPos - 1) {
        context.report({
          ruleId: "tag-space-before-closing-slash",
          message: "Bad whitespace.",
          idxFrom: leftOfSlashPos + 1,
          idxTo: slashPos,
          fix: {
            ranges: [[leftOfSlashPos + 1, slashPos]]
          }
        });
      } else if (mode === "always" && node.void && context.str[slashPos] === "/" && leftOfSlashPos === slashPos - 1) {
        context.report({
          ruleId: "tag-space-before-closing-slash",
          message: "Missing space.",
          idxFrom: slashPos,
          idxTo: slashPos,
          fix: {
            ranges: [[slashPos, slashPos, " "]]
          }
        });
      }
    }
  };
}

// -----------------------------------------------------------------------------
// it flags up any tags which have whitespace between opening bracket and first
// tag name letter:
//
// < table>
// <   a href="">
// <\n\nspan>

function tagSpaceBetweenSlashAndBracket(context) {
  return {
    tag: function tag(node) {
      // since we know the location of the closing bracket,
      // let's look to the left, is there a slash and check the distance
      if (Number.isInteger(node.end) && context.str[node.end - 1] === ">" && // necessary because in the future unclosed tags will be recognised!
      context.str[stringLeftRight.left(context.str, node.end - 1)] === "/" && stringLeftRight.left(context.str, node.end - 1) < node.end - 2) {
        var idxFrom = stringLeftRight.left(context.str, node.end - 1) + 1;
        context.report({
          ruleId: "tag-space-between-slash-and-bracket",
          message: "Bad whitespace.",
          idxFrom: idxFrom,
          idxTo: node.end - 1,
          fix: {
            ranges: [[idxFrom, node.end - 1]]
          }
        });
      }
    }
  };
}

// rule: tag-closing-backslash
var BACKSLASH$1 = "\\";

function tagClosingBackslash(context) {
  return {
    tag: function tag(node) { // since we know the location of the closing bracket,
      // let's look to the left, is there a slash and check the distance
      var ranges = []; //
      //
      //
      //           PART 1 - backslash is after opening bracket
      //
      //
      //

      if (Number.isInteger(node.start) && Number.isInteger(node.tagNameStartsAt) && context.str.slice(node.start, node.tagNameStartsAt).includes(BACKSLASH$1)) {

        for (var i = node.start; i < node.tagNameStartsAt; i++) {
          // fish-out all backslashes
          if (context.str[i] === BACKSLASH$1) {
            // just delete the backslash because it doesn't belong here
            // if there's a need for closing (left) slash, it will be added
            // by 3rd level rules which can "see" the surrounding tag layout.
            ranges.push([i, i + 1]);
          }
        }
      } //
      //
      //
      //           PART 2 - backslash is before closing bracket
      //
      //
      //


      if (Number.isInteger(node.end) && context.str[node.end - 1] === ">" && // necessary because in the future unclosed tags will be recognised!
      context.str[stringLeftRight.left(context.str, node.end - 1)] === BACKSLASH$1) {
        var message = node.void ? "Replace backslash with slash." : "Delete this.";
        var backSlashPos = stringLeftRight.left(context.str, node.end - 1); // So we confirmed there's left slash.
        // Is it completely rogue or is it meant to be self-closing tag's closing?

        var idxFrom = stringLeftRight.left(context.str, backSlashPos) + 1;
        var whatToInsert = node.void ? "/" : "";

        if (context.processedRulesConfig["tag-space-before-closing-slash"] && (Number.isInteger(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"] > 0 || Array.isArray(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"][0] > 0 && context.processedRulesConfig["tag-space-before-closing-slash"][1] === "never")) {
          // include any and all the whitespace to the left as well
          idxFrom = stringLeftRight.left(context.str, backSlashPos) + 1;
        } // but if spaces are requested via "tag-space-before-closing-slash",
        // ensure they're added


        if (Array.isArray(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"][0] > 0 && context.processedRulesConfig["tag-space-before-closing-slash"][1] === "always") {
          idxFrom = stringLeftRight.left(context.str, backSlashPos) + 1;
          whatToInsert = " " + whatToInsert; // but if space is already present at the beginning of the range at
          // index left(context.str, backSlashPos) + 1, don't add one there

          if (node.void && context.str[idxFrom + 1] === " ") {
            idxFrom += 1;
            whatToInsert = whatToInsert.trim();
          } else if (!node.void) {
            whatToInsert = whatToInsert.trim();
          }
        } // maybe slashes are forbidden on void tags?

        if (node.void && Array.isArray(context.processedRulesConfig["tag-void-slash"]) && context.processedRulesConfig["tag-void-slash"][0] > 0 && context.processedRulesConfig["tag-void-slash"][1] === "never") {
          whatToInsert = "";
          idxFrom = stringLeftRight.left(context.str, backSlashPos) + 1;
          message = "Delete this.";
        }

        context.report({
          ruleId: "tag-closing-backslash",
          message: message,
          idxFrom: idxFrom,
          idxTo: node.end - 1,
          fix: {
            ranges: [[idxFrom, node.end - 1, whatToInsert]]
          }
        });
      } // FINALLY,


      if (ranges.length) {
        context.report({
          ruleId: "tag-closing-backslash",
          message: "Wrong slash - backslash.",
          idxFrom: ranges[0][0],
          idxTo: ranges[ranges.length - 1][1],
          fix: {
            ranges: ranges
          }
        });
      }
    }
  };
}

// -----------------------------------------------------------------------------
// it controls, should we or should we not put the slashes on void tags,
// such as img. Is it <img...> or is it <img.../>?

var BACKSLASH = "\\";

function tagVoidSlash(context, mode) {
  if (mode === void 0) {
    mode = "always";
  }

  return {
    tag: function tag(node) { // PROCESSING:

      var closingBracketPos = node.end - 1;
      var slashPos = stringLeftRight.left(context.str, closingBracketPos);
      var leftOfSlashPos = stringLeftRight.left(context.str, slashPos) || 0;

      if (mode === "never" && node.void && context.str[slashPos] === "/") {
        // if slashes are forbidden on void tags, delete the slash and all
        // the whitespace in front, because there's never a space before
        // non-void tag's closing bracket without a slash, for example, "<span >"
        context.report({
          ruleId: "tag-void-slash",
          message: "Remove the slash.",
          idxFrom: leftOfSlashPos + 1,
          idxTo: closingBracketPos,
          fix: {
            ranges: [[leftOfSlashPos + 1, closingBracketPos]]
          }
        });
      } else if (mode === "always" && node.void && context.str[slashPos] !== "/" && ( // don't trigger if backslash rules are on:
      !context.processedRulesConfig["tag-closing-backslash"] || !(context.str[slashPos] === BACKSLASH && (Number.isInteger(context.processedRulesConfig["tag-closing-backslash"]) && context.processedRulesConfig["tag-closing-backslash"] > 0 || Array.isArray(context.processedRulesConfig["tag-closing-backslash"]) && context.processedRulesConfig["tag-closing-backslash"][0] > 0 && context.processedRulesConfig["tag-closing-backslash"][1] === "always")))) { // if slashes are requested on void tags, situation is more complex,
        // because we need to take into the account the rule
        // "tag-space-before-closing-slash"

        if (Array.isArray(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"][1] === "always") { // space is needed
          // check, maybe space is there

          if (context.str[slashPos + 1] === " ") {
            // but space exists already
            context.report({
              ruleId: "tag-void-slash",
              message: "Missing slash.",
              idxFrom: slashPos + 2,
              idxTo: closingBracketPos,
              fix: {
                ranges: [[slashPos + 2, closingBracketPos, "/"]]
              }
            });
          } else {
            // space is missing so add one
            context.report({
              ruleId: "tag-void-slash",
              message: "Missing slash.",
              idxFrom: slashPos + 1,
              idxTo: closingBracketPos,
              fix: {
                ranges: [[slashPos + 1, closingBracketPos, " /"]]
              }
            });
          }
        } else if (context.processedRulesConfig["tag-space-before-closing-slash"] === undefined || Array.isArray(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"][1] === "never" || Number.isInteger(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"] > 0) {
          // no space needed
          context.report({
            ruleId: "tag-void-slash",
            message: "Missing slash.",
            idxFrom: slashPos + 1,
            idxTo: closingBracketPos,
            fix: {
              ranges: [[slashPos + 1, closingBracketPos, "/"]]
            }
          });
        }
      }
    }
  };
}

// rule: tag-name-case
// -----------------------------------------------------------------------------
function tagNameCase(context) {
  var knownUpperCaseTags = ["CDATA"];
  var variableCaseTagNames = ["doctype"];
  return {
    tag: function tag(node) { // since we know the location of the closing bracket,
      // let's look to the left, is there a slash and check the distance

      if (node.tagName && node.recognised === true) {

        if (knownUpperCaseTags.includes(node.tagName.toUpperCase())) {
          // node.tagName will arrive lowercased, so we have to retrieve
          // the real characters by slicing from ranges
          if (context.str.slice(node.tagNameStartsAt, node.tagNameEndsAt) !== node.tagName.toUpperCase()) {
            var ranges = [[node.tagNameStartsAt, node.tagNameEndsAt, node.tagName.toUpperCase()]];
            context.report({
              ruleId: "tag-name-case",
              message: "Bad tag name case.",
              idxFrom: node.tagNameStartsAt,
              idxTo: node.tagNameEndsAt,
              fix: {
                ranges: ranges
              }
            });
          } // else - FINE

        } else if (context.str.slice(node.tagNameStartsAt, node.tagNameEndsAt) !== node.tagName && !variableCaseTagNames.includes(node.tagName.toLowerCase())) {
          var _ranges = [[node.tagNameStartsAt, node.tagNameEndsAt, node.tagName]];
          context.report({
            ruleId: "tag-name-case",
            message: "Bad tag name case.",
            idxFrom: node.tagNameStartsAt,
            idxTo: node.tagNameEndsAt,
            fix: {
              ranges: _ranges
            }
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------
// it flags up any tags from the blacklist

function tagIsPresent(context) {
  for (var _len = arguments.length, blacklist = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    blacklist[_key - 1] = arguments[_key];
  }

  return {
    tag: function tag(node) {

      if (Array.isArray(blacklist) && blacklist.length) {
        matcher__default['default']([node.tagName], blacklist);

        if (matcher__default['default']([node.tagName], blacklist).length) {
          context.report({
            ruleId: "tag-is-present",
            message: node.tagName + " is not allowed.",
            idxFrom: node.start,
            idxTo: node.end,
            fix: {
              ranges: [[node.start, node.end]]
            }
          });
        }
      }
    }
  };
}

// rule: tag-bold
// -----------------------------------------------------------------------------
// it flags up any <bold> tags
function tagBold(context, suggested) {
  if (suggested === void 0) {
    suggested = "strong";
  }

  return {
    tag: function tag(node) {

      if (node.tagName === "bold") {
        context.report({
          ruleId: "tag-bold",
          message: "Tag \"bold\" does not exist in HTML.",
          idxFrom: node.start,
          idxTo: node.end,
          fix: {
            ranges: [[node.tagNameStartsAt, node.tagNameEndsAt, suggested]]
          }
        });
      }
    }
  };
}

// -----------------------------------------------------------------------------
// flags up all self-closing non-void tags, for example: <table ... />

function tagBadSelfClosing(context) {
  return {
    tag: function tag(node) {

      if (!node.void && node.value.endsWith(">") && node.value[stringLeftRight.left(node.value, node.value.length - 1)] === "/") {
        var idxFrom = node.start + stringLeftRight.left(node.value, stringLeftRight.left(node.value, node.value.length - 1)) + 1;
        var idxTo = node.start + node.value.length - 1;
        context.report({
          ruleId: "tag-bad-self-closing",
          message: "Remove the slash.",
          idxFrom: idxFrom,
          idxTo: idxTo,
          fix: {
            ranges: [[idxFrom, idxTo]]
          }
        });
      }
    }
  };
}

// rule: attribute-duplicate

var attributeDuplicate = function attributeDuplicate(context) {
  var attributesWhichCanBeMerged = new Set(["id", "class"]); // imagine string:
  // `<a class="" class=""  >`
  // this rule will remove both classes, ending with:
  // [[2, 20]]
  // now these ranges don't include the trailing two spaces
  // when applied, yielding:
  // `<a  >` instead of `<a>`.
  // We need to extend the ending of the last range if it's on a
  // whitespace, leading up to / or >.

  function prepLast(ranges) {
    if (!Array.isArray(ranges) || !ranges.length) {
      return ranges;
    }

    if (!context.str[ranges[ranges.length - 1][1]].trim()) {
      var charOnTheRightIdx = stringLeftRight.right(context.str, ranges[ranges.length - 1][1]);

      if ("/>".includes(context.str[charOnTheRightIdx])) {
        ranges[ranges.length - 1][1] = charOnTheRightIdx;
      }
    }

    return ranges;
  }

  return {
    tag: function tag(node) { // if there is more than 1 attribute

      if (Array.isArray(node.attribs) && node.attribs.length > 1) {
        var attrsGatheredSoFar = new Set(); // record unique names

        var mergeableAttrsCaught = new Set(); // also unique

        for (var i = 0, len = node.attribs.length; i < len; i++) {

          if (!attrsGatheredSoFar.has(node.attribs[i].attribName)) {
            attrsGatheredSoFar.add(node.attribs[i].attribName);
          } else if (!attributesWhichCanBeMerged.has(node.attribs[i].attribName) || Array.isArray(node.attribs[i].attribValue) && node.attribs[i].attribValue.length && node.attribs[i].attribValue.some(function (obj) {
            return obj.value && (obj.value.includes("'") || obj.value.includes("\""));
          })) {
            context.report({
              ruleId: "attribute-duplicate",
              message: "Duplicate attribute \"" + node.attribs[i].attribName + "\".",
              idxFrom: node.attribs[i].attribStarts,
              idxTo: node.attribs[i].attribEnds,
              fix: null
            });
          } else {
            mergeableAttrsCaught.add(node.attribs[i].attribName);
          }
        } // process all recorded attributes which can be merged:


        if (mergeableAttrsCaught && mergeableAttrsCaught.size) {
          [].concat(mergeableAttrsCaught).forEach(function (attrNameBeingMerged) { // the first attribute with its value will also be replaced,
            // in whole, except, its value will be merged string of all
            // extracted values of all same-name attributes

            var theFirstRange = [];
            var extractedValues = [];
            var allOtherRanges = []; // can't use functional way with filter+reduce
            // instead we'll loop through all attributes

            var _loop = function _loop(_i, _len) {
              if (node.attribs[_i].attribName === attrNameBeingMerged) { // make a note of the index ranges, separating the first
                // attribute occurence from the rest:

                if (!theFirstRange.length) {
                  // whole attributes goes too, including whitespace
                  // on the left - it's because we automaticaly tackle
                  // all dirty code cases, imagine a tab as whitespace
                  // character in front of class="..." or equal missing
                  // or similar issues with the first attribute
                  theFirstRange.push(node.attribs[_i].attribLeft + 1, node.attribs[_i].attribEnds);
                } else {
                  // notice we push an array into an array
                  // include whitespace to the left, unless it's the first
                  // attribute of a tag (i === 0, or falsey)
                  allOtherRanges.push([_i ? node.attribs[_i].attribLeft + 1 : node.attribs[_i].attribStarts, node.attribs[_i].attribEnds]);
                }

                if (node.attribs[_i].attribValueStartsAt) { // either way, extract the values, split by whitespace

                  splitByWhitespace(node.attribs[_i].attribValueRaw, function (_ref) {
                    var from = _ref[0],
                        to = _ref[1];
                    extractedValues.push(node.attribs[_i].attribValueRaw.slice(from, to));
                  });
                }
              }
            };

            for (var _i = 0, _len = node.attribs.length; _i < _len; _i++) {
              _loop(_i);
            }
            var mergedValue = extractedValues.sort().join(" "); // finally, raise the error:

            if (mergedValue && mergedValue.length) {
              var ranges = prepLast(rangesMerge.rMerge([[].concat(theFirstRange, [" " + attrNameBeingMerged + "=\"" + mergedValue + "\""])].concat(allOtherRanges)));
              context.report({
                ruleId: "attribute-duplicate",
                message: "Duplicate attribute \"" + attrNameBeingMerged + "\".",
                idxFrom: node.start,
                idxTo: node.end,
                fix: {
                  ranges: ranges
                }
              });
            } else { // remove all attributes of this kind

              var _ranges = prepLast(rangesMerge.rMerge([[].concat(theFirstRange)].concat(allOtherRanges)));
              context.report({
                ruleId: "attribute-duplicate",
                message: "Duplicate attribute \"" + attrNameBeingMerged + "\".",
                idxFrom: node.start,
                idxTo: node.end,
                fix: {
                  ranges: _ranges
                }
              });
            }
          });
        }
      }
    }
  };
};

// rule: attribute-malformed
// -----------------------------------------------------------------------------
// it flags up malformed HTML attributes

function attributeMalformed(context) {
  // the following tags will be processed separately
  var blacklist = ["doctype"];
  return {
    attribute: function attribute(node) { // if Levenshtein distance is 1 and it's not among known attribute names,
      // it's definitely mis-typed

      if (!node.attribNameRecognised && !node.attribName.startsWith("xmlns:") && !blacklist.includes(node.parent.tagName)) {
        var somethingMatched = false;

        for (var _iterator = _createForOfIteratorHelperLoose__default['default'](htmlAllKnownAttributes.allHtmlAttribs.values()), _step; !(_step = _iterator()).done;) {
          var oneOfAttribs = _step.value;

          if (leven__default['default'](oneOfAttribs, node.attribName) === 1) {
            context.report({
              ruleId: "attribute-malformed",
              message: "Probably meant \"" + oneOfAttribs + "\".",
              idxFrom: node.attribNameStartsAt,
              idxTo: node.attribNameEndsAt,
              fix: {
                ranges: [[node.attribNameStartsAt, node.attribNameEndsAt, oneOfAttribs]]
              }
            });
            somethingMatched = true;
            break;
          }
        }

        if (!somethingMatched) {
          // the attribute was not recognised
          context.report({
            ruleId: "attribute-malformed",
            message: "Unrecognised attribute \"" + node.attribName + "\".",
            idxFrom: node.attribNameStartsAt,
            idxTo: node.attribNameEndsAt,
            fix: null
          });
        }
      } // context.str[node.attribNameEndsAt] !== "="
      // equal missing or something's wrong around it


      if (node.attribNameEndsAt && node.attribValueStartsAt) {

        if ( // if opening quotes are present, let's use their location
        node.attribOpeningQuoteAt !== null && context.str.slice(node.attribNameEndsAt, node.attribOpeningQuoteAt) !== "=") {
          var message = "Malformed around equal.";

          if (!context.str.slice(node.attribNameEndsAt, node.attribOpeningQuoteAt).includes("=")) {
            message = "Equal is missing.";
          }

          var fromRange = node.attribNameEndsAt;
          var toRange = node.attribOpeningQuoteAt;
          var whatToAdd = "="; // if equals is in a correct place, don't replace it

          if (context.str[fromRange] === "=") {
            fromRange += 1;
            whatToAdd = undefined;
          }
          context.report({
            ruleId: "attribute-malformed",
            message: message,
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            fix: {
              ranges: whatToAdd ? [[fromRange, toRange, "="]] : [[fromRange, toRange]]
            }
          });
        }
      } // repeated opening quotes


      if ( // value starts with a quote
      (node.attribValueRaw.startsWith("\"") || node.attribValueRaw.startsWith("'")) && node.attribValueStartsAt && node.attribOpeningQuoteAt && context.str[node.attribValueStartsAt] === context.str[node.attribOpeningQuoteAt]) {
        var _message = "Delete repeated opening quotes.";
        context.report({
          ruleId: "attribute-malformed",
          message: _message,
          idxFrom: node.attribStarts,
          idxTo: node.attribEnds,
          fix: {
            // delete the character
            ranges: [[node.attribValueStartsAt, node.attribValueStartsAt + 1]]
          }
        });
      } // repeated closing quotes


      if ( // value ends with a quote
      (node.attribValueRaw.endsWith("\"") || node.attribValueRaw.endsWith("'")) && node.attribValueEndsAt && node.attribClosingQuoteAt && context.str[node.attribValueEndsAt] === context.str[node.attribClosingQuoteAt]) {
        var _message2 = "Delete repeated closing quotes.";
        context.report({
          ruleId: "attribute-malformed",
          message: _message2,
          idxFrom: node.attribStarts,
          idxTo: node.attribEnds,
          fix: {
            // delete the character
            ranges: [[node.attribValueEndsAt - 1, node.attribValueEndsAt]]
          }
        });
      } // maybe some quotes are missing?


      var ranges = [];

      if (node.attribOpeningQuoteAt === null && node.attribValueStartsAt !== null) {
        ranges.push([node.attribValueStartsAt, node.attribValueStartsAt, node.attribClosingQuoteAt === null ? "\"" : context.str[node.attribClosingQuoteAt]]);
      }

      if (node.attribClosingQuoteAt === null && node.attribValueEndsAt !== null) {
        ranges.push([node.attribValueEndsAt, node.attribValueEndsAt, node.attribOpeningQuoteAt === null ? "\"" : context.str[node.attribOpeningQuoteAt]]);
      }

      if (ranges.length) {
        context.report({
          ruleId: "attribute-malformed",
          message: "Quote" + (ranges.length > 1 ? "s are" : " is") + " missing.",
          idxFrom: node.attribStarts,
          idxTo: node.attribEnds,
          fix: {
            ranges: ranges
          }
        });
      } // maybe quotes are mismatching?


      if (node.attribOpeningQuoteAt !== null && node.attribClosingQuoteAt !== null && context.str[node.attribOpeningQuoteAt] !== context.str[node.attribClosingQuoteAt]) { // default is double quotes; if content doesn't have them, that's what
        // we're going to use

        if (!node.attribValueRaw.includes("\"")) {
          context.report({
            ruleId: "attribute-malformed",
            message: (context.str[node.attribClosingQuoteAt] === "\"" ? "Opening" : "Closing") + " quote should be double.",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            fix: {
              ranges: [context.str[node.attribClosingQuoteAt] === "\"" ? [node.attribOpeningQuoteAt, node.attribOpeningQuoteAt + 1, "\""] : [node.attribClosingQuoteAt, node.attribClosingQuoteAt + 1, "\""]]
            }
          });
        } else if (!node.attribValueRaw.includes("'")) {
          context.report({
            ruleId: "attribute-malformed",
            message: (context.str[node.attribClosingQuoteAt] === "'" ? "Opening" : "Closing") + " quote should be single.",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            fix: {
              ranges: [context.str[node.attribClosingQuoteAt] === "'" ? [node.attribOpeningQuoteAt, node.attribOpeningQuoteAt + 1, "'"] : [node.attribClosingQuoteAt, node.attribClosingQuoteAt + 1, "'"]]
            }
          });
        } else ;
      }
    }
  };
}

var attributeOnClosingTag = function attributeOnClosingTag(context) {
  return {
    tag: function tag(node) { // if there is more than 1 attribute

      if (node.closing && Array.isArray(node.attribs) && node.attribs.length) {
        context.report({
          ruleId: "attribute-on-closing-tag",
          message: "Attribute on a closing tag.",
          idxFrom: node.attribs[0].attribStarts,
          idxTo: node.attribs[node.attribs.length - 1].attribEnds,
          fix: null
        });
      }
    }
  };
};

// -----------------------------------------------------------------------------

function attributeValidateAbbr(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "abbr") {
        // validate the parent
        if (!["td", "th"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-abbr",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // only check for rogue whitespace - value can be any string


        var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-abbr"
          }));
        });
      }
    }
  };
}

var knownUnits = ["cm", "mm", "in", "px", "pt", "pc", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "%"];
var knownCharsets = ["adobe-standard-encoding", "adobe-symbol-encoding", "amiga-1251", "ansi_x3.110-1983", "asmo_449", "big5", "big5-hkscs", "bocu-1", "brf", "bs_4730", "bs_viewdata", "cesu-8", "cp50220", "cp51932", "csa_z243.4-1985-1", "csa_z243.4-1985-2", "csa_z243.4-1985-gr", "csn_369103", "dec-mcs", "din_66003", "dk-us", "ds_2089", "ebcdic-at-de", "ebcdic-at-de-a", "ebcdic-ca-fr", "ebcdic-dk-no", "ebcdic-dk-no-a", "ebcdic-es", "ebcdic-es-a", "ebcdic-es-s", "ebcdic-fi-se", "ebcdic-fi-se-a", "ebcdic-fr", "ebcdic-it", "ebcdic-pt", "ebcdic-uk", "ebcdic-us", "ecma-cyrillic", "es", "es2", "euc-kr", "extended_unix_code_fixed_width_for_japanese", "extended_unix_code_packed_format_for_japanese", "gb18030", "gb2312", "gb_1988-80", "gb_2312-80", "gbk", "gost_19768-74", "greek-ccitt", "greek7", "greek7-old", "hp-desktop", "hp-legal", "hp-math8", "hp-pi-font", "hp-roman8", "hz-gb-2312", "ibm-symbols", "ibm-thai", "ibm00858", "ibm00924", "ibm01140", "ibm01141", "ibm01142", "ibm01143", "ibm01144", "ibm01145", "ibm01146", "ibm01147", "ibm01148", "ibm01149", "ibm037", "ibm038", "ibm1026", "ibm1047", "ibm273", "ibm274", "ibm275", "ibm277", "ibm278", "ibm280", "ibm281", "ibm284", "ibm285", "ibm290", "ibm297", "ibm420", "ibm423", "ibm424", "ibm437", "ibm500", "ibm775", "ibm850", "ibm851", "ibm852", "ibm855", "ibm857", "ibm860", "ibm861", "ibm862", "ibm863", "ibm864", "ibm865", "ibm866", "ibm868", "ibm869", "ibm870", "ibm871", "ibm880", "ibm891", "ibm903", "ibm904", "ibm905", "ibm918", "iec_p27-1", "inis", "inis-8", "inis-cyrillic", "invariant", "iso-10646-j-1", "iso-10646-ucs-2", "iso-10646-ucs-4", "iso-10646-ucs-basic", "iso-10646-unicode-latin1", "iso-10646-utf-1", "iso-11548-1", "iso-2022-cn", "iso-2022-cn-ext", "iso-2022-jp", "iso-2022-jp-2", "iso-2022-kr", "iso-8859-1-windows-3.0-latin-1", "iso-8859-1-windows-3.1-latin-1", "iso-8859-10", "iso-8859-13", "iso-8859-14", "iso-8859-15", "iso-8859-16", "iso-8859-2-windows-latin-2", "iso-8859-9-windows-latin-5", "iso-ir-90", "iso-unicode-ibm-1261", "iso-unicode-ibm-1264", "iso-unicode-ibm-1265", "iso-unicode-ibm-1268", "iso-unicode-ibm-1276", "iso_10367-box", "iso_2033-1983", "iso_5427", "iso_5427:1981", "iso_5428:1980", "iso_646.basic:1983", "iso_646.irv:1983", "iso_6937-2-25", "iso_6937-2-add", "iso_8859-1:1987", "iso_8859-2:1987", "iso_8859-3:1988", "iso_8859-4:1988", "iso_8859-5:1988", "iso_8859-6-e", "iso_8859-6-i", "iso_8859-6:1987", "iso_8859-7:1987", "iso_8859-8-e", "iso_8859-8-i", "iso_8859-8:1988", "iso_8859-9:1989", "iso_8859-supp", "it", "jis_c6220-1969-jp", "jis_c6220-1969-ro", "jis_c6226-1978", "jis_c6226-1983", "jis_c6229-1984-a", "jis_c6229-1984-b", "jis_c6229-1984-b-add", "jis_c6229-1984-hand", "jis_c6229-1984-hand-add", "jis_c6229-1984-kana", "jis_encoding", "jis_x0201", "jis_x0212-1990", "jus_i.b1.002", "jus_i.b1.003-mac", "jus_i.b1.003-serb", "koi7-switched", "koi8-r", "koi8-u", "ks_c_5601-1987", "ksc5636", "kz-1048", "latin-greek", "latin-greek-1", "latin-lap", "macintosh", "microsoft-publishing", "mnem", "mnemonic", "msz_7795.3", "nats-dano", "nats-dano-add", "nats-sefi", "nats-sefi-add", "nc_nc00-10:81", "nf_z_62-010", "nf_z_62-010_(1973)", "ns_4551-1", "ns_4551-2", "osd_ebcdic_df03_irv", "osd_ebcdic_df04_1", "osd_ebcdic_df04_15", "pc8-danish-norwegian", "pc8-turkish", "pt", "pt2", "ptcp154", "scsu", "sen_850200_b", "sen_850200_c", "shift_jis", "t.101-g2", "t.61-7bit", "t.61-8bit", "tis-620", "tscii", "unicode-1-1", "unicode-1-1-utf-7", "unknown-8bit", "us-ascii", "us-dk", "utf-16", "utf-16be", "utf-16le", "utf-32", "utf-32be", "utf-32le", "utf-7", "utf-8", "ventura-international", "ventura-math", "ventura-us", "videotex-suppl", "viqr", "viscii", "windows-1250", "windows-1251", "windows-1252", "windows-1253", "windows-1254", "windows-1255", "windows-1256", "windows-1257", "windows-1258", "windows-31j", "windows-874"]; // https://www.w3.org/TR/html4/sgml/loosedtd.html#Color
// "There are also 16 widely known color names with their sRGB values"

var basicColorNames = {
  aqua: "#00ffff",
  black: "#000000",
  blue: "#0000ff",
  fuchsia: "#ff00ff",
  gray: "#808080",
  green: "#008000",
  lime: "#00ff00",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  purple: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  teal: "#008080",
  white: "#ffffff",
  yellow: "#ffff00"
}; // https://www.w3schools.com/colors/colors_names.asp
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value

var extendedColorNames = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  grey: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
var sixDigitHexColorRegex = /^#([a-f0-9]{6})$/i;
var classNameRegex = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;

// -----------------------------------------------------------------------------

function attributeValidateAcceptCharset(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "accept-charset") {
        // validate the parent
        if (!["form"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-accept-charset",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // validate against the charsets list from IANA:
        // https://www.iana.org/assignments/character-sets/character-sets.xhtml
        // https://www.w3.org/TR/html4/interact/forms.html#adef-accept-charset


        var errorArr = validateString(node.attribValueRaw, node.attribValueStartsAt, {
          canBeCommaSeparated: true,
          noSpaceAfterComma: true,
          quickPermittedValues: ["UNKNOWN"],
          permittedValues: knownCharsets
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-accept-charset"
          }));
        });
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateAccept(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "accept") {
        // validate the parent
        if (!["form", "input"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-accept",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          quickPermittedValues: ["audio/*", "video/*", "image/*", "text/html", "image/png", "image/gif", "video/mpeg", "text/css", "audio/basic", wholeExtensionRegex],
          permittedValues: Object.keys(db__default['default']),
          canBeCommaSeparated: true,
          noSpaceAfterComma: true
        }); // HTML attribute accept MIME types as values. Here we reference the given
        // value against all official MIME types, taken from IANA and other sources,
        // https://www.npmjs.com/package/mime-db

        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-accept"
          }));
        });
      }
    }
  };
}

function attributeValidateAccesskey(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "accesskey") {
        // validate the parent
        if (!["a", "area", "button", "input", "label", "legend", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-accesskey",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // only check for rogue whitespace - value can be any string


        var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr,
            trimmedVal = _checkForWhitespace.trimmedVal;

        if (typeof charStart === "number" && typeof charEnd === "number") {
          // the value must be a character, raw or escaped, from a document's
          // charset
          // https://www.w3.org/TR/html4/interact/forms.html#adef-accesskey
          if (trimmedVal.length > 1 && !(trimmedVal.startsWith("&") && trimmedVal.endsWith(";"))) {
            errorArr.push({
              idxFrom: node.attribValueStartsAt + charStart,
              idxTo: node.attribValueStartsAt + charEnd,
              message: "Should be a single character (escaped or not).",
              fix: null
            });
          }
        }

        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-accesskey"
          }));
        });
      }
    }
  };
}

function isSingleSpace(str, originalOpts, errorArr) {
  var defaults = {
    from: 0,
    to: str.length,
    offset: 0
  };

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts); // whitespace starts at "from" and ends at "to"

  if (str.slice(opts.from, opts.to) !== " ") { // remove the minimal amount of content - if spaces are there
    // already, leave them

    var ranges;

    if (str[opts.from] === " ") {
      ranges = [[opts.offset + opts.from + 1, opts.offset + opts.to]];
    } else if (str[opts.to - 1] === " ") {
      ranges = [[opts.offset + opts.from, opts.offset + opts.to - 1]];
    } else {
      ranges = [[opts.offset + opts.from, opts.offset + opts.to, " "]];
    } // raise an error about this excessive/wrong whitespace
    errorArr.push({
      idxFrom: opts.offset + opts.from,
      idxTo: opts.offset + opts.to,
      message: "Should be a single space.",
      fix: {
        ranges: ranges
      }
    });
  }
}

function validateValue$1(str, originalOpts, errorArr) {
  var defaults = {
    offset: 0,
    multipleOK: false,
    from: 0,
    to: str.length,
    attribStarts: 0,
    attribEnds: str.length
  };

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts);
  var extractedValue = str.slice(opts.from, opts.to);
  var calcultedIsRel = isRelativeUri.isRel(extractedValue);

  if (Array.from(extractedValue).some(function (val) {
    return !val.trim().length;
  })) {
    // try to find out, is it whitespace within one URL, or is it whitespace
    // separating two URL's:
    var ranges = []; // whitespace ranges

    var foundCharacterRanges = [];
    splitByWhitespace(extractedValue, function (valueRangeArr) {
      foundCharacterRanges.push(valueRangeArr);
    }, function (whitespaceRangeArr) {
      ranges.push(whitespaceRangeArr);
    }, originalOpts);
    var countOfURIs = foundCharacterRanges.reduce(function (acc, curr) {

      if (extractedValue.slice(curr[0] - opts.offset, curr[1] - opts.offset).match(urlRegex__default['default']({
        exact: true
      }))) {
        return acc + 1;
      }

      return acc;
    }, 0); // assemble the value without whitespace

    foundCharacterRanges.reduce(function (acc, curr) {
      return acc + extractedValue.slice(curr[0] - opts.offset, curr[1] - opts.offset);
    }, "");

    if (countOfURIs > 1) {
      errorArr.push({
        idxFrom: opts.from + opts.offset,
        idxTo: opts.to + opts.offset,
        message: "There should be only one URI.",
        fix: null
      });
    } else {
      errorArr.push({
        idxFrom: opts.from + opts.offset,
        idxTo: opts.to + opts.offset,
        message: "Remove whitespace.",
        fix: {
          ranges: ranges
        }
      });
    }
  } else if (!extractedValue.startsWith("tel:") && !(urlRegex__default['default']({
    exact: true
  }).test(extractedValue) || calcultedIsRel.res)) { // message:
    // Should be ${opts.separator}-separated list of URI's.
    // applies onto when multiple values are allowed and whole attribute is
    // reported as wrong (not one of chunks):

    var message = "Should be an URI.";
    var idxFrom = opts.offset + opts.from;
    var idxTo = opts.offset + opts.to;
    var whatCouldBeExtractedAtAllFromRegex = extractedValue.match(urlRegex__default['default']()); // if URL's were extracted

    if (Array.isArray(whatCouldBeExtractedAtAllFromRegex)) {
      // something was indeed extracted
      if (whatCouldBeExtractedAtAllFromRegex.length > 1 && !opts.multipleOK) {
        message = "There should be only one URI.";
      } else {
        message = "URI's should be separated with a single space.";
      }

      idxFrom = opts.offset + opts.attribStarts;
      idxTo = opts.offset + opts.attribEnds;
    }
    errorArr.push({
      idxFrom: idxFrom,
      idxTo: idxTo,
      message: message,
      fix: null
    });
  }
}

function validateUri(str, originalOpts) {
  var defaults = {
    offset: 0,
    multipleOK: false,
    separator: "space",
    oneSpaceAfterCommaOK: false,
    leadingWhitespaceOK: false,
    trailingWhitespaceOK: false
  };

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts); // checkForWhitespace() reports index range between the
  // first last non-whitespace character; nulls otherwise

  var _checkForWhitespace = checkForWhitespace(str, opts.offset),
      charStart = _checkForWhitespace.charStart,
      charEnd = _checkForWhitespace.charEnd,
      errorArr = _checkForWhitespace.errorArr; // now that we know where non-whitespace chars are, we can evaluate them

  if (Number.isInteger(charStart)) {

    if (opts.multipleOK) {
      // depends, is it comma or space-separated format
      if (opts.separator === "space") {
        splitByWhitespace(str, function (_ref) {
          var charFrom = _ref[0],
              charTo = _ref[1];
          var extractedName = str.slice(charFrom, charTo); // maybe it's comma-and-space-separated, like
          // <object archive="https://codsen.com, https://detergent.io">

          if (extractedName.endsWith(",") && extractedName.length > 1) {
            errorArr.push({
              idxFrom: opts.offset + charTo - 1,
              idxTo: opts.offset + charTo,
              message: "No commas.",
              fix: null
            });
          } else {
            // Object assign needed to retain opts.multipleOK
            validateValue$1(str, _objectSpread__default['default'](_objectSpread__default['default']({}, opts), {}, {
              from: charFrom,
              to: charTo,
              attribStarts: charStart,
              attribEnds: charEnd,
              offset: opts.offset
            }), errorArr);
          }
        }, function (_ref2) {
          var whitespaceFrom = _ref2[0],
              whitespaceTo = _ref2[1];
          return isSingleSpace(str, {
            from: whitespaceFrom,
            to: whitespaceTo,
            offset: opts.offset
          }, errorArr);
        }, {
          from: charStart,
          to: charEnd
        });
      } else {
        stringProcessCommaSeparated.processCommaSep(str, {
          offset: opts.offset,
          oneSpaceAfterCommaOK: false,
          leadingWhitespaceOK: true,
          trailingWhitespaceOK: true,
          cb: function cb(idxFrom, idxTo) {
            str.slice(idxFrom - opts.offset, idxTo - opts.offset); // if there are errors, validateValue() mutates the passed "errorArr",
            // pushing to it
            // Object assign needed to retain opts.multipleOK

            validateValue$1(str, _objectSpread__default['default'](_objectSpread__default['default']({}, opts), {}, {
              from: idxFrom - opts.offset,
              to: idxTo - opts.offset,
              attribStarts: charStart,
              attribEnds: charEnd,
              offset: opts.offset
            }), errorArr);
          },
          errCb: function errCb(ranges, message) {
            var fix = {
              ranges: ranges
            }; // Some bad whitespace errors like spaces in the middle or URL
            // can't be fixed. We need to cater those cases.

            if (!str[ranges[0][0] - opts.offset].trim().length && str[ranges[0][0] - opts.offset - 1] && charStart < ranges[0][0] - 1 && (opts.separator === "space" || str[ranges[0][0] - opts.offset - 1] !== "," && str[ranges[0][1] - opts.offset] !== ",")) {
              // if it's not outer whitespace, skip the fix
              fix = null;
            }

            errorArr.push({
              idxFrom: ranges[0][0],
              idxTo: ranges[ranges.length - 1][1],
              message: message,
              fix: fix
            });
          }
        });
      }
    } else { // we pass whole value to validateValue(), "cropping" the whitespace:

      validateValue$1(str, {
        from: charStart,
        to: charEnd,
        offset: opts.offset
      }, errorArr);
    }
  }

  return errorArr;
}

function attributeValidateAction(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "action") {
        // validate the parent
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-action",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // Call validation upon whole attribute's value. Validator includes
          // whitespace checks.
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-action"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateAlign(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "align") {
        // validate the parent
        if (!["applet", "caption", "iframe", "img", "input", "object", "legend", "table", "hr", "div", "h1", "h2", "h3", "h4", "h5", "h6", "p", "col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-align",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = [];

        if (["legend", "caption"].includes(node.parent.tagName.toLowerCase())) {
          // top|bottom|left|right
          errorArr = validateString(node.attribValueRaw, // value
          node.attribValueStartsAt, // offset
          {
            permittedValues: ["top", "bottom", "left", "right"],
            canBeCommaSeparated: false
          });
        } else if (["applet", "iframe", "img", "input", "object"].includes(node.parent.tagName.toLowerCase())) {
          // top|middle|bottom|left|right
          errorArr = validateString(node.attribValueRaw, // value
          node.attribValueStartsAt, // offset
          {
            permittedValues: ["top", "middle", "bottom", "left", "right"],
            canBeCommaSeparated: false
          });
        } else if (["table", "hr"].includes(node.parent.tagName.toLowerCase())) {
          // left|center|right
          errorArr = validateString(node.attribValueRaw, // value
          node.attribValueStartsAt, // offset
          {
            permittedValues: ["left", "center", "right"],
            canBeCommaSeparated: false
          });
        } else if (["div", "h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(node.parent.tagName.toLowerCase())) {
          // left|center|right|justify
          errorArr = validateString(node.attribValueRaw, // value
          node.attribValueStartsAt, // offset
          {
            permittedValues: ["left", "center", "right", "justify"],
            canBeCommaSeparated: false
          });
        } else if (["col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName.toLowerCase())) {
          // left|center|right|justify|char
          errorArr = validateString(node.attribValueRaw, // value
          node.attribValueStartsAt, // offset
          {
            permittedValues: ["left", "center", "right", "justify", "char"],
            canBeCommaSeparated: false
          });
        }
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-align"
          }));
        });
      }
    }
  };
}

var defaults$1 = {
  namedCssLevel1OK: true,
  namedCssLevel2PlusOK: true,
  hexThreeOK: false,
  hexFourOK: false,
  hexSixOK: true,
  hexEightOK: false
};

function validateColor(str, idxOffset, originalOpts) {
  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults$1), originalOpts); // we get trimmed string start and end positions, also an encountered errors array


  var _checkForWhitespace = checkForWhitespace(str, idxOffset),
      charStart = _checkForWhitespace.charStart,
      charEnd = _checkForWhitespace.charEnd,
      errorArr = _checkForWhitespace.errorArr; // now that we know where non-whitespace chars are, evaluate them


  if (typeof charStart === "number" && typeof charEnd === "number") {
    // we need to extract the trimmed attribute's value
    // either it will be "str" (no inner whitespace) or
    // str.slice(charStart, charEnd) (whitespace found previously)
    var attrVal = errorArr.length ? str.slice(charStart, charEnd) : str;

    if (attrVal.length > 1 && isLetter(attrVal[0]) && isLetter(attrVal[1]) && Object.keys(extendedColorNames).includes(attrVal.toLowerCase())) {

      if (!opts.namedCssLevel1OK) {
        errorArr.push({
          idxFrom: idxOffset + charStart,
          idxTo: idxOffset + charEnd,
          message: "Named colors (CSS Level 1) not allowed.",
          fix: {
            ranges: [[idxOffset + charStart, idxOffset + charEnd, extendedColorNames[attrVal.toLowerCase()]]]
          }
        });
      } else if (!opts.namedCssLevel2PlusOK && (!opts.namedCssLevel1OK || !Object.keys(basicColorNames).includes(attrVal.toLowerCase()))) {
        errorArr.push({
          idxFrom: idxOffset + charStart,
          idxTo: idxOffset + charEnd,
          message: "Named colors (CSS Level 2+) not allowed.",
          fix: {
            ranges: [[idxOffset + charStart, idxOffset + charEnd, extendedColorNames[attrVal.toLowerCase()]]]
          }
        });
      }
    } else if (attrVal.startsWith("#")) {
      if (attrVal.length !== 7) {
        errorArr.push({
          idxFrom: idxOffset + charStart,
          idxTo: idxOffset + charEnd,
          message: "Hex color code should be 6 digits-long.",
          fix: null
        });
      } else if (!sixDigitHexColorRegex.test(attrVal)) {
        errorArr.push({
          idxFrom: idxOffset + charStart,
          idxTo: idxOffset + charEnd,
          message: "Unrecognised hex code.",
          fix: null
        });
      } else if (!opts.hexSixOK) {
        errorArr.push({
          idxFrom: idxOffset + charStart,
          idxTo: idxOffset + charEnd,
          message: "Hex colors not allowed.",
          fix: null
        });
      }
    } else if (attrVal.startsWith("rgb(")) {
      errorArr.push({
        idxFrom: idxOffset + charStart,
        idxTo: idxOffset + charEnd,
        message: "rgb() is not allowed.",
        fix: null
      });
    } else {
      errorArr.push({
        idxFrom: idxOffset + charStart,
        idxTo: idxOffset + charEnd,
        message: "Unrecognised color value.",
        fix: null
      });
    }
  }

  return errorArr;
}

function attributeValidateAlink(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateAlink(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "alink") {
        // validate the parent
        if (node.parent.tagName !== "body") {
          context.report({
            ruleId: "attribute-validate-alink",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-alink",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var errorArr = validateColor(node.attribValueRaw, node.attribValueStartsAt, {
            namedCssLevel1OK: true,
            namedCssLevel2PlusOK: true,
            hexThreeOK: false,
            hexFourOK: false,
            hexSixOK: true,
            hexEightOK: false
          });
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-alink"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateAlt(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "alt") {
        // validate the parent
        if (!["applet", "area", "img", "input"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-alt",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        if (node.attribValueStartsAt !== null && node.attribValueEndsAt !== null) {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-alt"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateArchive(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "archive") {
        // validate the parent
        if (!["applet", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-archive",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          // maybe value is missing anyway?
          context.report({
            ruleId: "attribute-validate-" + node.attribName,
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } // it depends, which tag is this attribute on...
        else if (node.parent.tagName === "applet") {
            // comma-separated list of archive URIs
            // Call validation upon the whole attribute's value. Validator includes
            // whitespace checks.
            validateUri(node.attribValueRaw, {
              offset: node.attribValueStartsAt,
              separator: "comma",
              multipleOK: true
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-archive"
              }));
            });
          } else if (node.parent.tagName === "object") {
            // space-separated list of URIs
            // Call validation upon the whole attribute's value. Validator includes
            // whitespace checks.
            validateUri(node.attribValueRaw, {
              offset: node.attribValueStartsAt,
              separator: "space",
              multipleOK: true
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-archive"
              }));
            });
          }
      }
    }
  };
}

function attributeValidateAxis(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "axis") {
        // validate the parent
        if (!["td", "th"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-axis",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-axis",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-axis"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateBackground(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "background") {
        // validate the parent
        if (!["body", "td"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-background",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // Call validation upon the whole attribute's value. Validator includes
          // whitespace checks.
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-background"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateBgcolor(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateBgcolor(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "bgcolor") {
        // validate the parent
        if (!["table", "tr", "td", "th", "body"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-bgcolor",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-bgcolor",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var errorArr = validateColor(node.attribValueRaw, node.attribValueStartsAt, {
            namedCssLevel1OK: true,
            namedCssLevel2PlusOK: true,
            hexThreeOK: false,
            hexFourOK: false,
            hexSixOK: true,
            hexEightOK: false
          });
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-bgcolor"
            }));
          });
        }
      }
    }
  };
}

var defaultOpts = {
  type: "integer",
  whitelistValues: [],
  theOnlyGoodUnits: null,
  plusOK: false,
  negativeOK: false,
  zeroOK: true,
  badUnits: [],
  enforceCount: null,
  noUnitsIsFine: true,
  canBeCommaSeparated: false,
  customGenericValueError: null,
  skipWhitespaceChecks: false,
  customPxMessage: null,
  maxValue: null
};

function validateValue(_ref) {
  var str = _ref.str,
      opts = _ref.opts,
      charStart = _ref.charStart,
      charEnd = _ref.charEnd,
      idxOffset = _ref.idxOffset,
      errorArr = _ref.errorArr;
  // the rule is for pattern digit(s) + unit, so start from checking, does it
  // start with a digit // insurance

  if (typeof str !== "string") {
    return;
  } // applies to rational and integer types


  if (str[charStart] === "0") {
    if (charEnd === charStart + 1) {
      // so length === 1
      if (!opts.zeroOK) {
        errorArr.push({
          idxFrom: idxOffset + charStart,
          idxTo: idxOffset + charEnd,
          message: "Zero not allowed.",
          fix: null
        });
      }
    } else if ("0123456789".includes(str[charStart + 1])) {
      // we have padded cases like 08
      errorArr.push({
        idxFrom: idxOffset + charStart,
        idxTo: idxOffset + charEnd,
        message: "Number padded with zero.",
        fix: null
      });
    }
  }

  if (!"0123456789".includes(str[charStart]) && !"0123456789".includes(str[charEnd - 1])) { // calculate the message

    var message = "Digits missing.";

    if (opts.customGenericValueError) {
      message = opts.customGenericValueError;
    } else if (Array.isArray(opts.theOnlyGoodUnits) && !opts.theOnlyGoodUnits.length && opts.type === "integer") {
      message = "Should be integer, no units.";
    }

    errorArr.push({
      idxFrom: idxOffset + charStart,
      idxTo: idxOffset + charEnd,
      message: message,
      fix: null
    });
  } else if ("0123456789".includes(str[charStart]) && "0123456789".includes(str[charEnd - 1]) && (!opts.noUnitsIsFine || opts.type === "integer" && opts.maxValue && str.slice(charStart, charEnd).match(/^\d+$/) && Number.parseInt(str.slice(charStart, charEnd), 10) > opts.maxValue)) {

    if (!opts.noUnitsIsFine) {
      errorArr.push({
        idxFrom: idxOffset + charStart,
        idxTo: idxOffset + charEnd,
        message: opts.customGenericValueError || "Units missing.",
        fix: null
      });
    } else {
      errorArr.push({
        idxFrom: idxOffset + charStart,
        idxTo: idxOffset + charEnd,
        message: "Maximum, " + opts.maxValue + " exceeded.",
        fix: null
      });
    }
  } else {

    for (var i = charStart; i < charEnd; i++) {

      if (!"0123456789".includes(str[i]) && (str[i] !== "." || opts.type !== "rational") && (str[i] !== "-" || !(opts.negativeOK && i === 0)) && (str[i] !== "+" || !(opts.plusOK && i === 0))) {
        // dash can be in the middle! For example, colspan="1-1"
        var endPart = str.slice(i, charEnd);

        if (isObj(opts) && (Array.isArray(opts.theOnlyGoodUnits) && !opts.theOnlyGoodUnits.includes(endPart) || Array.isArray(opts.badUnits) && opts.badUnits.includes(endPart))) { // special case for "px"

          if (endPart === "px") {
            var _message = opts.customPxMessage ? opts.customPxMessage : "Remove px.";

            errorArr.push({
              idxFrom: idxOffset + i,
              idxTo: idxOffset + charEnd,
              message: _message,
              fix: opts.customPxMessage ? null : {
                ranges: [[idxOffset + i, idxOffset + charEnd]]
              }
            });
          } else {
            // validate against the known units and serve a separate
            // message, depending on was it recognised
            // calculate the message
            var _message2 = "Bad unit.";

            if (str.match(/-\s*-/g)) {
              _message2 = "Repeated minus.";
            } else if (str.match(/\+\s*\+/g)) {
              _message2 = "Repeated plus.";
            } else if (Array.isArray(opts.theOnlyGoodUnits) && opts.theOnlyGoodUnits.length && opts.theOnlyGoodUnits.includes(endPart.trim())) {
              // if trimmed end part matches "good" units, it's the whitespace
              _message2 = "Rogue whitespace.";
            } else if (opts.customGenericValueError) {
              _message2 = opts.customGenericValueError;
            } else if (Array.isArray(opts.theOnlyGoodUnits) && !opts.theOnlyGoodUnits.length && opts.type === "integer") {
              _message2 = "Should be integer, no units.";
            }

            errorArr.push({
              idxFrom: idxOffset + i,
              idxTo: idxOffset + charEnd,
              message: _message2,
              fix: null
            });
          }
        } else if (!knownUnits.includes(endPart)) {
          var _message3 = "Unrecognised unit.";

          if (/\d/.test(endPart)) {
            _message3 = "Messy value.";
          } else if (knownUnits.includes(endPart.trim())) {
            _message3 = "Rogue whitespace.";
          }

          errorArr.push({
            idxFrom: idxOffset + i,
            idxTo: idxOffset + charEnd,
            message: _message3,
            fix: null
          });
        } // stop the loop


        break;
      }
    }
  }
} // function below is used to validate attribute values which contain
// digits and a unit, for example, "100%" of an HTML attribute
// width="100%"
// or
// "100%" of CSS head style "width:100%;"
// it returns array of ready error objects, except without ruleId, something like:
//
// {
//   idxFrom: 17,
//   idxTo: 19,
//   message: `Remove px.`,
//   fix: {
//     ranges: [[17, 19]]
//   }
// }
//
// if it can't fix, key "fix" value is null


function validateDigitAndUnit(str, idxOffset, originalOpts) {
  if (typeof str !== "string") {
    return [];
  }

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaultOpts), originalOpts); // we get trimmed string start and end positions, also an encountered errors array


  var charStart = 0;
  var charEnd = str.length;
  var errorArr = [];

  if (!opts.skipWhitespaceChecks) {
    var retrievedWhitespaceChecksObj = checkForWhitespace(str, idxOffset);
    charStart = retrievedWhitespaceChecksObj.charStart;
    charEnd = retrievedWhitespaceChecksObj.charEnd;
    errorArr = retrievedWhitespaceChecksObj.errorArr;
  } // now that we know where non-whitespace chars are, evaluate them

  if (Number.isInteger(charStart)) {

    if (opts.canBeCommaSeparated) { // split by comma and process each

      var extractedValues = [];
      stringProcessCommaSeparated.processCommaSep(str, {
        offset: idxOffset,
        oneSpaceAfterCommaOK: false,
        leadingWhitespaceOK: true,
        trailingWhitespaceOK: true,
        cb: function cb(idxFrom, idxTo) {
          var extractedValue = str.slice(idxFrom - idxOffset, idxTo - idxOffset); // if the value is not whitelisted, evaluate it

          if (!Array.isArray(opts.whitelistValues) || !opts.whitelistValues.includes(extractedValue)) {
            validateValue({
              str: str,
              opts: opts,
              charStart: idxFrom - idxOffset,
              charEnd: idxTo - idxOffset,
              idxOffset: idxOffset,
              errorArr: errorArr
            });
          }

          extractedValues.push(extractedValue);
        },
        errCb: function errCb(ranges, message) {
          errorArr.push({
            idxFrom: ranges[0][0],
            idxTo: ranges[ranges.length - 1][1],
            message: message,
            fix: {
              ranges: ranges
            }
          });
        }
      }); // enforce the "extractedValues" count

      if (Number.isInteger(opts.enforceCount) && extractedValues.length !== opts.enforceCount) {
        errorArr.push({
          idxFrom: charStart + idxOffset,
          idxTo: charEnd + idxOffset,
          message: "There should be " + opts.enforceCount + " values.",
          fix: null
        });
      } else if (typeof opts.enforceCount === "string" && ["even", "odd"].includes(opts.enforceCount.toLowerCase())) {
        if (opts.enforceCount.toLowerCase() === "even" && extractedValues.length % 2 !== 0) {
          errorArr.push({
            idxFrom: charStart + idxOffset,
            idxTo: charEnd + idxOffset,
            message: "Should be an even number of values but found " + extractedValues.length + ".",
            fix: null
          });
        } else if (opts.enforceCount.toLowerCase() !== "even" && extractedValues.length % 2 === 0) {
          errorArr.push({
            idxFrom: charStart + idxOffset,
            idxTo: charEnd + idxOffset,
            message: "Should be an odd number of values but found " + extractedValues.length + ".",
            fix: null
          });
        }
      }
    } else { // if the value is not whitelisted, evaluate it

      if (!Array.isArray(opts.whitelistValues) || !opts.whitelistValues.includes(str.slice(charStart, charEnd))) {
        validateValue({
          str: str,
          opts: opts,
          charStart: charStart,
          charEnd: charEnd,
          idxOffset: idxOffset,
          errorArr: errorArr
        });
      }
    }
  }

  return errorArr;
}

function attributeValidateBorder(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateBorder(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "border") {
        // validate the parent
        if (!["table", "img", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-border",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          negativeOK: false,
          theOnlyGoodUnits: [] // empty array means no units allowed

        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-border"
          }));
        });
      }
    }
  };
}

function attributeValidateCellpadding(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateCellpadding(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "cellpadding") {
        // validate the parent
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-cellpadding",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          negativeOK: false,
          theOnlyGoodUnits: ["%"],
          badUnits: ["px"],
          customGenericValueError: "Should be integer, either no units or percentage."
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-cellpadding"
          }));
        });
      }
    }
  };
}

function attributeValidateCellspacing(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateCellspacing(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "cellspacing") {
        // validate the parent
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-cellspacing",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          negativeOK: false,
          theOnlyGoodUnits: ["%"],
          badUnits: ["px"],
          customGenericValueError: "Should be integer, either no units or percentage."
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-cellspacing"
          }));
        });
      }
    }
  };
}

function attributeValidateChar(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "char") {
        // validate the parent
        if (!["col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-char",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-char",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              charStart = _checkForWhitespace.charStart,
              charEnd = _checkForWhitespace.charEnd,
              errorArr = _checkForWhitespace.errorArr,
              trimmedVal = _checkForWhitespace.trimmedVal;

          if (typeof charStart === "number" && typeof charEnd === "number") {
            // the value must be a character, raw or escaped, from ISO10646
            // https://www.w3.org/TR/html4/sgml/dtd.html#Character
            if (trimmedVal.length > 1 && !(trimmedVal.startsWith("&") && trimmedVal.endsWith(";"))) {
              errorArr.push({
                idxFrom: node.attribValueStartsAt + charStart,
                idxTo: node.attribValueStartsAt + charEnd,
                message: "Should be a single character.",
                fix: null
              });
            }
          }

          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-char"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateCharoff(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "charoff") {
        // validate the parent
        if (!["col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-charoff",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-charoff",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
            type: "integer",
            negativeOK: true,
            theOnlyGoodUnits: [],
            customGenericValueError: "Should be integer, no units."
          }); // tag has to have "char" attribute:

          if (!node.parent.attribs.some(function (attribObj) {
            return attribObj.attribName === "char";
          })) {
            errorArr.push({
              idxFrom: node.parent.start,
              idxTo: node.parent.end,
              message: "Attribute \"char\" missing.",
              fix: null
            });
          }

          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-charoff"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateCharset(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "charset") {
        // validate the parent
        if (!["a", "link", "script"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-charset",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-charset",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // validate against the charsets list from IANA:
          // https://www.iana.org/assignments/character-sets/character-sets.xhtml
          // https://www.w3.org/TR/html4/interact/forms.html#adef-charset
          var errorArr = validateString(node.attribValueRaw, node.attribValueStartsAt, {
            canBeCommaSeparated: false,
            noSpaceAfterComma: false,
            quickPermittedValues: [],
            permittedValues: knownCharsets
          });
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-charset"
            }));
          });
        }
      }
    }
  };
}

function validateVoid(node, context, errorArr, originalOpts) {
  //
  // prepare the opts
  //
  var defaults = {
    xhtml: false,
    enforceSiblingAttributes: null
  };

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts); //
  // further validation only applicable to input tags:
  //


  if (opts.xhtml) {
    // XHTML mode - enforcing node.attribName="node.attribName"
    var quotesType = "\"";

    if (node.attribOpeningQuoteAt !== null && context.str[node.attribOpeningQuoteAt] === "'") {
      quotesType = "'";
    } else if (node.attribClosingQuoteAt !== null && context.str[node.attribClosingQuoteAt] === "'") {
      quotesType = "'";
    } // equal might be missing or there might be some rogue whitespace,
    // for example - only value check is not enough


    if (node.attribValueRaw !== node.attribName || context.str.slice(node.attribNameEndsAt, node.attribEnds) !== "=" + quotesType + node.attribName + quotesType) {
      errorArr.push({
        idxFrom: node.attribNameStartsAt,
        idxTo: node.attribNameEndsAt,
        message: "It's XHTML, add value, =\"" + node.attribName + "\".",
        fix: {
          ranges: [[node.attribNameEndsAt, node.attribEnds, "=" + quotesType + node.attribName + quotesType]]
        }
      });
    }
  } else if (node.attribValueRaw !== null) {
    errorArr.push({
      idxFrom: node.attribNameEndsAt,
      idxTo: node.attribEnds,
      message: "Should have no value.",
      fix: {
        ranges: [[node.attribNameEndsAt, node.attribEnds]]
      }
    });
  }

  if (isObj(opts.enforceSiblingAttributes) && Object.keys(opts.enforceSiblingAttributes).length) {
    Object.keys(opts.enforceSiblingAttributes).forEach(function (siblingAttr) {

      if (Array.isArray(node.parent.attribs) && !node.parent.attribs.some(function (attribObj) {
        return attribObj.attribName === siblingAttr;
      })) {
        // parent tag is missing the requested attribute
        errorArr.push({
          idxFrom: node.parent.start,
          idxTo: node.parent.end,
          message: "Should have attribute \"" + siblingAttr + "\".",
          fix: null
        });
      } else if (opts.enforceSiblingAttributes[siblingAttr] && Array.isArray(opts.enforceSiblingAttributes[siblingAttr]) && Array.isArray(node.parent.attribs) && !node.parent.attribs.some(function (attribObj) {
        return attribObj.attribName === siblingAttr && opts.enforceSiblingAttributes[siblingAttr].includes(attribObj.attribValueRaw);
      })) {
        // enforce that, for example, "node.attribName"
        // should be present only on input tags of types
        // "checkbox" or "radio"
        // find out where that "type" attribute is located
        var idxFrom;
        var idxTo;

        for (var i = 0, len = node.parent.attribs.length; i < len; i++) {
          if (node.parent.attribs[i].attribName === siblingAttr) {
            idxFrom = node.parent.attribs[i].attribValueStartsAt;
            idxTo = node.parent.attribs[i].attribValueEndsAt;
            break;
          }
        }

        errorArr.push({
          idxFrom: idxFrom,
          idxTo: idxTo,
          message: "Only tags with " + opts.enforceSiblingAttributes[siblingAttr].map(function (val) {
            return "\"" + val + "\"";
          }).join(" or ") + " attributes can be " + node.attribName + ".",
          fix: null
        });
      }
    });
  }

  return errorArr;
}

function attributeValidateChecked(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "checked") {
        // validate the parent
        if (node.parent.tagName !== "input") {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: {
              type: ["checkbox", "radio"]
            }
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-checked"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateCite(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "cite") {
        // validate the parent
        if (!["blockquote", "q", "del", "ins"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-cite",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // Call validation upon the whole attribute's value. Validator includes
          // whitespace checks.
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-cite"
            }));
          });
        }
      }
    }
  };
}

function checkClassOrIdValue(str, originalOpts, errorArr) {
  var defaults = {
    typeName: "class",
    from: 0,
    to: str.length,
    offset: 0
  };

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts);
  var listOfUniqueNames = new Set();
  splitByWhitespace( //
  //
  //
  //
  //
  //
  //
  str, //
  //
  //
  //
  //
  //
  //
  function (_ref) {
    var charFrom = _ref[0],
        charTo = _ref[1];
    // value starts at "from" and ends at "to" // evaluate

    var extractedName = str.slice(charFrom, charTo);

    if (!classNameRegex.test(extractedName)) {
      errorArr.push({
        idxFrom: charFrom,
        idxTo: charTo,
        message: "Wrong " + opts.typeName + " name.",
        fix: null
      });
    } // check for unique-ness


    if (!listOfUniqueNames.has(extractedName)) {
      listOfUniqueNames.add(extractedName);
    } else {
      var deleteFrom = charFrom;
      var deleteTo = charTo;
      var nonWhitespaceCharOnTheRight = stringLeftRight.right(str, deleteTo);

      if (deleteTo >= opts.to || !nonWhitespaceCharOnTheRight || nonWhitespaceCharOnTheRight > opts.to) {
        deleteFrom = stringLeftRight.left(str, charFrom) + 1; // +1 because left() stops
        // to the left of the character - if it was without, that first non-
        // whitespace character would have been included
      } else {
        deleteTo = nonWhitespaceCharOnTheRight;
      }

      errorArr.push({
        idxFrom: charFrom,
        idxTo: charTo,
        message: "Duplicate " + opts.typeName + " \"" + extractedName + "\".",
        fix: {
          ranges: [[deleteFrom, deleteTo]]
        }
      });
    }
  }, //
  //
  //
  //
  //
  //
  //
  function (_ref2) {
    var whitespaceFrom = _ref2[0],
        whitespaceTo = _ref2[1];
    return isSingleSpace(str, {
      from: whitespaceFrom,
      to: whitespaceTo,
      offset: opts.offset
    }, errorArr);
  }, //
  //
  //
  //
  //
  //
  //
  opts // whole opts object is being passed further
  );
}

function attributeValidateClass(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "class") {
        // validate the parent
        if (["base", "basefont", "head", "html", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-class",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-class",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              charStart = _checkForWhitespace.charStart,
              charEnd = _checkForWhitespace.charEnd,
              errorArr = _checkForWhitespace.errorArr;

          if (typeof charStart === "number" && typeof charEnd === "number") {
            checkClassOrIdValue(context.str, {
              typeName: node.attribName,
              from: node.attribValueStartsAt + charStart,
              to: node.attribValueStartsAt + charEnd,
              offset: 0
            }, errorArr // might be mutated, more errors pushed into
            );
          }
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-class"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateClassid$1(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "classid") {
        // validate the parent
        if (node.parent.tagName !== "object") {
          context.report({
            ruleId: "attribute-validate-classid",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // Call validation upon the whole attribute's value. Validator includes
          // whitespace checks.
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-classid"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateClassid(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "clear") {
        // validate the parent
        if (node.parent.tagName !== "br") {
          context.report({
            ruleId: "attribute-validate-clear",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // beware, the charStart and charEnd are not offset, their "zero" is
        // start of an attribute's value, so if you use them, you need to
        // offset to the true index, you must add "(node.attribValueStartsAt as number)" value


        var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr;

        if (typeof charStart === "number" && typeof charEnd === "number" && !["left", "all", "right", "none"].includes(context.str.slice(node.attribValueStartsAt + charStart, node.attribValueStartsAt + charEnd))) {
          errorArr.push({
            idxFrom: node.attribValueStartsAt + charStart,
            idxTo: node.attribValueStartsAt + charEnd,
            message: "Should be: left|all|right|none.",
            fix: null
          });
        }

        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-clear"
          }));
        });
      }
    }
  };
}

function attributeValidateCode(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "code") {
        // validate the parent
        if (node.parent.tagName !== "applet") {
          context.report({
            ruleId: "attribute-validate-code",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-code",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only validate the whitespace
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt);
              _checkForWhitespace.charStart;
              _checkForWhitespace.charEnd;
              var errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-code"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateCodebase(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "codebase") {
        // validate the parent
        if (!["applet", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-codebase",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-codebase"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateCodetype(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "codetype") {
        // validate the parent
        if (node.parent.tagName !== "object") {
          context.report({
            ruleId: "attribute-validate-codetype",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          quickPermittedValues: ["application/javascript", "application/json", "application/x-www-form-urlencoded", "application/xml", "application/zip", "application/pdf", "application/sql", "application/graphql", "application/ld+json", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.oasis.opendocument.text", "application/zstd", "audio/mpeg", "audio/ogg", "multipart/form-data", "text/css", "text/html", "text/xml", "text/csv", "text/plain", "image/png", "image/jpeg", "image/gif", "application/vnd.api+json"],
          permittedValues: Object.keys(db__default['default']),
          canBeCommaSeparated: false,
          noSpaceAfterComma: false
        }); // HTML attribute accept MIME types as values. Here we reference the given
        // value against all official MIME types, taken from IANA and other sources,
        // https://www.npmjs.com/package/mime-db

        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-codetype"
          }));
        });
      }
    }
  };
}

function attributeValidateColor(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateColor(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "color") {
        // validate the parent
        if (!["basefont", "font"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-color",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-color",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var errorArr = validateColor(node.attribValueRaw, node.attribValueStartsAt, {
            namedCssLevel1OK: true,
            namedCssLevel2PlusOK: true,
            hexThreeOK: false,
            hexFourOK: false,
            hexSixOK: true,
            hexEightOK: false
          });
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-color"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateCols(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateCols(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "cols") {
        // validate the parent
        if (!["frameset", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-cols",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist

        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var errorArr = [];

          if (node.parent.tagName === "frameset") {
            errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
              whitelistValues: ["*"],
              theOnlyGoodUnits: ["%"],
              badUnits: ["px"],
              noUnitsIsFine: true,
              canBeCommaSeparated: true,
              type: "rational",
              customGenericValueError: "Should be: pixels|%|*."
            });
          } else if (node.parent.tagName === "textarea") {
            // each character must be a digit
            errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
              type: "integer",
              theOnlyGoodUnits: [],
              customGenericValueError: "Should be integer, no units."
            });
          }

          if (Array.isArray(errorArr) && errorArr.length) {
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-cols"
              }));
            });
          }
        }
      }
    }
  };
}

function attributeValidateColspan(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateColspan(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "colspan") {
        // validate the parent
        if (!["th", "td"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-colspan",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units."
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-colspan"
          }));
        });
      }
    }
  };
}

function attributeValidateCompact(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "compact") {
        // validate the parent
        if (!["dir", "dl", "menu", "ol", "ul"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-compact"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateContent(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "content") {
        // validate the parent
        if (node.parent.tagName !== "meta") {
          context.report({
            ruleId: "attribute-validate-content",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // only validate the whitespace


        var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt);
            _checkForWhitespace.charStart;
            _checkForWhitespace.charEnd;
            var errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-content"
          }));
        });
      }
    }
  };
} // TODO - add more checks from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta

function attributeValidateCoords(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `020 attributeValidateCoords(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "coords") {
        // validate the parent
        if (!["area", "a"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-coords",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else { // "coords" values depend on "shape" attribute's value

          if (!Array.isArray(node.parent.attribs) || !node.parent.attribs.length || !node.parent.attribs.some(function (attrObj) {
            return attrObj.attribName === "shape";
          })) {
            // enforce "shape" attribute
            context.report({
              ruleId: "attribute-validate-coords",
              idxFrom: node.parent.start,
              idxTo: node.parent.end,
              message: "Missing \"shape\" attribute.",
              fix: null
            });
          } else {
            // extract "shape" attr's value
            var shapeAttr = node.parent.attribs.filter(function (attrObj) {
              return attrObj.attribName === "shape";
            })[0];
            var enforceCount = null;

            if (shapeAttr.attribValueRaw === "rect") {
              // enforce the value count to be 4
              enforceCount = 4;
            } else if (shapeAttr.attribValueRaw === "circle") {
              // enforce the value count to be 3
              enforceCount = 3;
            } else if (shapeAttr.attribValueRaw === "poly") {
              // enforce the value count to be an even number
              enforceCount = "even";
            }

            var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
              whitelistValues: [],
              theOnlyGoodUnits: [],
              badUnits: [],
              noUnitsIsFine: true,
              canBeCommaSeparated: true,
              enforceCount: enforceCount,
              type: "integer",
              customGenericValueError: "Should be integer, no units."
            });

            if (Array.isArray(errorArr) && errorArr.length) {
              errorArr.forEach(function (errorObj) {
                context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                  ruleId: "attribute-validate-coords"
                }));
              });
            }
          }
        }
      }
    }
  };
}

function attributeValidateData(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "data") {
        // validate the parent
        if (node.parent.tagName !== "object") {
          context.report({
            ruleId: "attribute-validate-data",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-data"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateDatetime(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "datetime") {
        // validate the parent
        if (!["del", "ins"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-datetime",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          quickPermittedValues: [isoDateRegex],
          canBeCommaSeparated: false,
          noSpaceAfterComma: false
        }); // HTML attribute accept MIME types as values. Here we reference the given
        // value against all official MIME types, taken from IANA and other sources,
        // https://www.npmjs.com/package/mime-db

        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-datetime"
          }));
        });
      }
    }
  };
}

function attributeValidateDeclare(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "declare") {
        // validate the parent
        if (node.parent.tagName !== "object") {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-declare"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateDefer(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "defer") {
        // validate the parent
        if (node.parent.tagName !== "script") {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-defer"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateDir(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "dir") {
        // validate the parent
        if (["applet", "base", "basefont", "br", "frame", "frameset", "iframe", "param", "script"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-dir",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["ltr", "rtl"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-dir"
          }));
        });
      }
    }
  };
}

function attributeValidateDisabled(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "disabled") {
        // validate the parent
        if (!["button", "input", "optgroup", "option", "select", "textarea"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-disabled"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateEnctype(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "enctype") {
        // validate the parent
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-enctype",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          quickPermittedValues: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          permittedValues: Object.keys(db__default['default']),
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-enctype"
          }));
        });
      }
    }
  };
}

function attributeValidateFace(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "face") {
        // validate the parent
        if (node.parent.tagName !== "font") {
          context.report({
            ruleId: "attribute-validate-face",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // only validate the whitespace


        var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt);
            _checkForWhitespace.charStart;
            _checkForWhitespace.charEnd;
            var errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-face"
          }));
        });
      }
    }
  };
} // TODO - add more checks from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta

function attributeValidateFor(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "for") {
        // validate the parent
        if (node.parent.tagName !== "label") {
          context.report({
            ruleId: "attribute-validate-for",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
                charStart = _checkForWhitespace.charStart,
                charEnd = _checkForWhitespace.charEnd,
                errorArr = _checkForWhitespace.errorArr;

            if (typeof charStart === "number" && typeof charEnd === "number") {
              var extractedValue = node.attribValueRaw.slice(charStart, charEnd);
              var message = "Wrong id name.";
              var fix = null;
              var idxFrom = charStart + node.attribValueStartsAt;
              var idxTo = charEnd + node.attribValueStartsAt;

              if (Number.isInteger(charStart) && !classNameRegex.test(extractedValue)) {
                if (Array.from(extractedValue).some(function (val) {
                  return !val.trim().length;
                })) {
                  message = "Should be one value, no spaces.";
                } else if (extractedValue.includes("#")) {
                  message = "Remove hash.";
                  var firstHashAt = node.attribValueRaw.indexOf("#");
                  fix = {
                    ranges: [[node.attribValueStartsAt + firstHashAt, node.attribValueStartsAt + firstHashAt + 1]]
                  };
                  idxFrom = node.attribValueStartsAt + firstHashAt;
                  idxTo = node.attribValueStartsAt + firstHashAt + 1;
                }

                errorArr.push({
                  ruleId: "attribute-validate-for",
                  idxFrom: idxFrom,
                  idxTo: idxTo,
                  message: message,
                  fix: fix
                });
              }
            }
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-for"
              }));
            });
          }
      }
    }
  };
}

function attributeValidateFrame(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "frame") {
        // validate the parent
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-frame",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // https://www.w3.org/TR/html4/struct/tables.html#adef-frame


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["void", "above", "below", "hsides", "lhs", "rhs", "vsides", "box", "border" // All four sides.
          ],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-frame"
          }));
        });
      }
    }
  };
}

function attributeValidateFrameborder(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "frameborder") {
        // validate the parent
        if (!["frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-frameborder",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // https://www.w3.org/TR/html4/present/frames.html#adef-frameborder


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["0", "1"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-frameborder"
          }));
        });
      }
    }
  };
}

function attributeValidateHeaders(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "headers") {
        // validate the parent
        if (!["td", "th"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-headers",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
                charStart = _checkForWhitespace.charStart,
                charEnd = _checkForWhitespace.charEnd,
                errorArr = _checkForWhitespace.errorArr;
            checkClassOrIdValue(context.str, {
              typeName: "id",
              from: node.attribValueStartsAt + charStart,
              to: node.attribValueStartsAt + charEnd,
              offset: 0
            }, errorArr // might be mutated, more errors pushed into
            );
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-headers"
              }));
            });
          }
      }
    }
  };
}

function attributeValidateHeight(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "height") {
        // validate the parent
        if (!["iframe", "td", "th", "img", "object", "applet"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-height",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          badUnits: ["px"],
          theOnlyGoodUnits: ["%"],
          noUnitsIsFine: true,
          customGenericValueError: "Should be \"pixels|%\"."
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-height"
          }));
        });
      }
    }
  };
}

function attributeValidateHref(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "href") {
        // validate the parent
        if (!["a", "area", "link", "base"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-href",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-href"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateHreflang(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "hreflang") {
        // validate the parent
        if (!["a", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-hreflang",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // beware, the charStart and charEnd are not offset, their "zero" is
        // start of an attribute's value, so if you use them, you need to
        // offset to the true index, you must add "(node.attribValueStartsAt as number)" value


        var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr; // validate using "ietf-language-tag-regex" from npm:

        var _isLangCode = isLanguageCode.isLangCode(node.attribValueRaw.slice(charStart, charEnd)),
            message = _isLangCode.message;

        if (message) {
          errorArr.push({
            idxFrom: node.attribValueStartsAt + charStart,
            idxTo: node.attribValueStartsAt + charEnd,
            message: message,
            fix: null
          });
        }

        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-hreflang"
          }));
        });
      }
    }
  };
}

function attributeValidateHspace(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateHspace(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "hspace") {
        // validate the parent
        if (!["applet", "img", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-hspace",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          theOnlyGoodUnits: [],
          noUnitsIsFine: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-hspace"
          }));
        });
      }
    }
  };
}

function attributeValidateHttpequiv(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "http-equiv") {
        // validate the parent
        if (node.parent.tagName !== "meta") {
          context.report({
            ruleId: "attribute-validate-http-equiv",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["content-type", "default-style", "refresh", "X-UA-Compatible"],
          canBeCommaSeparated: false,
          caseInsensitive: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-http-equiv"
          }));
        });
      }
    }
  };
}

function attributeValidateId(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "id") {
        // validate the parent
        if (["base", "head", "html", "meta", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-id",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
                charStart = _checkForWhitespace.charStart,
                charEnd = _checkForWhitespace.charEnd,
                errorArr = _checkForWhitespace.errorArr;
            checkClassOrIdValue(context.str, {
              typeName: node.attribName,
              from: node.attribValueStartsAt + charStart,
              to: node.attribValueStartsAt + charEnd,
              offset: 0
            }, errorArr // might be mutated, more errors pushed into
            );
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-id"
              }));
            });
          }
      }
    }
  };
}

function attributeValidateIsmap(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "ismap") {
        // validate the parent
        if (!["img", "input"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-ismap"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateLabel(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "label") {
        // validate the parent
        if (!["option", "optgroup"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-label",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-label"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateLang(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "lang") {
        // validate the parent
        if (["applet", "base", "basefont", "br", "frame", "frameset", "iframe", "param", "script"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-lang",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // beware, the charStart and charEnd are not offset, their "zero" is
        // start of an attribute's value, so if you use them, you need to
        // offset to the true index, you must add "node.attribValueStartsAt" value


        var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr; // validate using "is-language-code" from npm:

        var _isLangCode = isLanguageCode.isLangCode(node.attribValueRaw.slice(charStart, charEnd)),
            message = _isLangCode.message;

        if (message) {
          errorArr.push({
            idxFrom: node.attribValueStartsAt + charStart,
            idxTo: node.attribValueStartsAt + charEnd,
            message: message,
            fix: null
          });
        }

        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-lang"
          }));
        });
      }
    }
  };
}

function attributeValidateLanguage(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "language") {
        // validate the parent
        if (node.parent.tagName !== "script") {
          context.report({
            ruleId: "attribute-validate-language",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-language"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateLink(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateLink(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "link") {
        // validate the parent
        if (node.parent.tagName !== "body") {
          context.report({
            ruleId: "attribute-validate-link",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var errorArr = validateColor(node.attribValueRaw, node.attribValueStartsAt, {
            namedCssLevel1OK: true,
            namedCssLevel2PlusOK: true,
            hexThreeOK: false,
            hexFourOK: false,
            hexSixOK: true,
            hexEightOK: false
          });
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-link"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateLongdesc(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "longdesc") {
        // validate the parent
        if (!["img", "frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-longdesc",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace -
          // TODO - add more rules, https://www.w3schools.com/TagS/att_img_longdesc.asp
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-longdesc"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateMarginheight(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateMarginheight(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "marginheight") {
        // validate the parent
        if (!["frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-marginheight",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          theOnlyGoodUnits: [],
          noUnitsIsFine: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-marginheight"
          }));
        });
      }
    }
  };
}

function attributeValidateMarginwidth(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateMarginwidth(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "marginwidth") {
        // validate the parent
        if (!["frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-marginwidth",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          theOnlyGoodUnits: [],
          noUnitsIsFine: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-marginwidth"
          }));
        });
      }
    }
  };
}

function attributeValidateMaxlength(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateMaxlength(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "maxlength") {
        // validate the parent
        if (node.parent.tagName !== "input") {
          context.report({
            ruleId: "attribute-validate-maxlength",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units."
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-maxlength"
          }));
        });
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateMedia(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "media") {
        // validate the parent
        if (!["style", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-media",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // beware, the charStart and charEnd are not offset, their "zero" is
        // start of an attribute's value, so if you use them, you need to
        // offset to the true index, you must add "(node.attribValueStartsAt as number)" value


        var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr; // concat errors from "is-media-descriptor" and report all:

        errorArr.concat(isMediaDescriptor.isMediaD(node.attribValueRaw.slice(charStart, charEnd), {
          offset: node.attribValueStartsAt
        })).forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-media"
          }));
        });
      }
    }
  };
}

function attributeValidateMethod(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "method") {
        // validate the parent
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-method",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["get", "post"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-method"
          }));
        });
      }
    }
  };
}

function attributeValidateMultiple(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "multiple") {
        // validate the parent
        if (node.parent.tagName !== "select") {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-multiple"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateName(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "name") {
        // validate the parent
        if (!["button", "textarea", "applet", "select", "form", "frame", "iframe", "img", "a", "input", "object", "map", "param", "meta"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-name",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace because value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-name"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateNohref(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "nohref") {
        // validate the parent
        if (node.parent.tagName !== "area") {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-nohref"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateNoresize(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "noresize") {
        // validate the parent
        if (node.parent.tagName !== "frame") {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-noresize"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateNoshade(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "noshade") {
        // validate the parent
        if (node.parent.tagName !== "hr") {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-noshade"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateNowrap(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "nowrap") {
        // validate the parent
        if (!["td", "th"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-nowrap"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateObject(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "object") {
        // validate the parent
        if (node.parent.tagName !== "applet") {
          context.report({
            ruleId: "attribute-validate-object",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-object"
            }));
          });
        }
      }
    }
  };
}

function validateScript(str, idxOffset // opts
) {
  // console.log(
  //   `005 validateScript(): ${`\u001b[${33}m${`opts`}\u001b[${39}m`} = ${JSON.stringify(
  //     opts,
  //     null,
  //     4
  //   )}`
  // );
  // we get trimmed string start and end positions, also an encountered errors array
  // const { charStart, charEnd, errorArr } = checkForWhitespace(str, idxOffset);
  var _checkForWhitespace = checkForWhitespace(str, idxOffset),
      errorArr = _checkForWhitespace.errorArr; // now that we know where non-whitespace chars are, we can evaluate them
  // if (Number.isInteger(charStart)) {
  //   TODO: SOMETHING MORE
  // }


  return errorArr;
}

// -----------------------------------------------------------------------------

function attributeValidateOnblur(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onblur") {
        // validate the parent
        if (!["a", "area", "button", "input", "label", "select", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onblur",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onblur"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnchange(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onchange") {
        // validate the parent
        if (!["input", "select", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onchange",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onchange"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnclick(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onclick") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onclick",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onclick"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOndblclick(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "ondblclick") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-ondblclick",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-ondblclick"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnfocus(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onfocus") {
        // validate the parent
        if (!["a", "area", "button", "input", "label", "select", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onfocus",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onfocus"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnkeydown(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onkeydown") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onkeydown",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onkeydown"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnkeypress(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onkeypress") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onkeypress",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onkeypress"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnkeyup(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onkeyup") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onkeyup",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onkeyup"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnload(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onload") {
        // validate the parent
        if (!["frameset", "body"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onload",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onload"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnmousedown(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onmousedown") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmousedown",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onmousedown"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnmousemove(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onmousemove") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmousemove",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onmousemove"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnmouseout(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onmouseout") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmouseout",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onmouseout"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnmouseover(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onmouseover") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmouseover",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onmouseover"
              }));
            });
          }
      }
    }
  };
}

function attributeValidateOnmouseup(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onmouseup") {
        // validate the parent
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmouseup",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onmouseup"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnreset(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onreset") {
        // validate the parent
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-onreset",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onreset"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnsubmit(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onsubmit") {
        // validate the parent
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-onsubmit",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onsubmit"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnselect(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onselect") {
        // validate the parent
        if (!["input", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onselect",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onselect"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateOnunload(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "onunload") {
        // validate the parent
        if (!["frameset", "body"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onunload",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist
        else if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
            context.report({
              ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
              idxFrom: node.attribStarts,
              idxTo: node.attribEnds,
              message: "Missing value.",
              fix: null
            });
          } else {
            // validate the script value
            var errorArr = validateScript(node.attribValueRaw, node.attribValueStartsAt);
            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-onunload"
              }));
            });
          }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateProfile(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "profile") {
        // validate the parent
        if (node.parent.tagName !== "head") {
          context.report({
            ruleId: "attribute-validate-profile",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // Call validation upon whole attribute's value. Validator includes
          // whitespace checks.
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: true
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-profile"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidatePrompt(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "prompt") {
        // validate the parent
        if (node.parent.tagName !== "isindex") {
          context.report({
            ruleId: "attribute-validate-prompt",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-prompt"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateReadonly(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "readonly") {
        // validate the parent
        if (!["textarea", "input"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-readonly"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateRel(context, enforceLowercase) {
  if (enforceLowercase === void 0) {
    enforceLowercase = false;
  }

  return {
    attribute: function attribute(node) {

      if (node.attribName === "rel") {
        // validate the parent
        if (!["a", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-rel",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: linkTypes,
          canBeCommaSeparated: false,
          caseInsensitive: !enforceLowercase
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-rel"
          }));
        });
      }
    }
  };
}

function attributeValidateRev(context, enforceLowercase) {
  if (enforceLowercase === void 0) {
    enforceLowercase = false;
  }

  return {
    attribute: function attribute(node) {

      if (node.attribName === "rev") {
        // validate the parent
        if (!["a", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-rev",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // check in two parts, first, a quick try, match the most common values only


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: linkTypes,
          canBeCommaSeparated: false,
          caseInsensitive: !enforceLowercase
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-rev"
          }));
        });
      }
    }
  };
}

function attributeValidateRows(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateRows(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "rows") {
        // validate the parent
        if (!["frameset", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-rows",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }
        var errorArr = []; // if value is empty or otherwise does not exist

        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else if (node.parent.tagName === "frameset") {
          errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
            whitelistValues: ["*"],
            theOnlyGoodUnits: ["%"],
            badUnits: ["px"],
            noUnitsIsFine: true,
            canBeCommaSeparated: true,
            type: "rational",
            customGenericValueError: "Should be: pixels|%|*."
          });
        } else if (node.parent.tagName === "textarea") {
          // each character must be a digit
          errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
            type: "integer",
            theOnlyGoodUnits: [],
            customGenericValueError: "Should be integer, no units."
          });
        }

        if (Array.isArray(errorArr) && errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-rows"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateRowspan(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateRowspan(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "rowspan") {
        // validate the parent
        if (!["th", "td"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-rowspan",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units."
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-rowspan"
          }));
        });
      }
    }
  };
}

function attributeValidateRules(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "rules") {
        // validate the parent
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-rules",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // https://www.w3.org/TR/html4/struct/tables.html#adef-frame


        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["none", "groups", "rows", "cols", "all"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-rules"
          }));
        });
      }
    }
  };
}

function attributeValidateScheme(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "scheme") {
        // validate the parent
        if (node.parent.tagName !== "meta") {
          context.report({
            ruleId: "attribute-validate-scheme",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-scheme"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateScope(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "scope") {
        // validate the parent
        if (!["td", "th"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-scope",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["row", "col", "rowgroup", "colgroup"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-scope"
          }));
        });
      }
    }
  };
}

function attributeValidateScrolling(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "scrolling") {
        // validate the parent
        if (!["frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-scrolling",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["auto", "yes", "no"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-scrolling"
          }));
        });
      }
    }
  };
}

function attributeValidateSelected(context, mode) {
  return {
    attribute: function attribute(node) {
      var errorArr = [];

      if (node.attribName === "selected") {
        // validate the parent
        if (node.parent.tagName !== "option") {
          errorArr.push({
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          // validate the value (or absence thereof)
          validateVoid(node, context, errorArr, {
            xhtml: !!mode,
            enforceSiblingAttributes: null
          });
        } // finally, report gathered errors:


        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-selected"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateShape(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "shape") {
        // validate the parent
        if (!["area", "a"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-shape",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateString(node.attribValueRaw, // value
        node.attribValueStartsAt, // offset
        {
          permittedValues: ["default", "rect", "circle", "poly"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-shape"
          }));
        });
      }
    }
  };
}

function attributeValidateSize(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateSize(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "size") {
        // validate the parent
        if (!["hr", "font", "input", "basefont", "select"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-size",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              charStart = _checkForWhitespace.charStart,
              charEnd = _checkForWhitespace.charEnd,
              errorArr = _checkForWhitespace.errorArr; // sort errorArr right here because some of the values will be
          // checked with regex quickly and it would be burden to stick
          // this whitespace reporting on every size attribute tag's case

          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-size"
            }));
          }); //
          //
          // now process each case of "size", depending by tag name
          //
          //

          if (typeof charStart === "number" && typeof charEnd === "number") {
            // the attribute's value is not empty
            var extractedVal = node.attribValueRaw.slice(charStart, charEnd);

            if (["hr", "input", "select"].includes(node.parent.tagName)) { // no need to check whitespace, opts.skipWhitespaceChecks: true

              validateDigitAndUnit(extractedVal, node.attribValueStartsAt + charStart, {
                type: "integer",
                negativeOK: false,
                theOnlyGoodUnits: [],
                skipWhitespaceChecks: true
              }).forEach(function (errorObj) {
                context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                  ruleId: "attribute-validate-size"
                }));
              });
            } else if (["font", "basefont"].includes(node.parent.tagName)) {

              if (!extractedVal.match(fontSizeRegex)) {
                var errorArr2 = validateDigitAndUnit(extractedVal, node.attribValueStartsAt + charStart, {
                  type: "integer",
                  negativeOK: false,
                  theOnlyGoodUnits: [],
                  skipWhitespaceChecks: true,
                  customGenericValueError: "Should be integer 1-7, plus/minus are optional."
                });

                if (!errorArr2.length) {
                  // if validateDigitAndUnit() didn't pick up any errors that
                  // possibly because they are too specific, like <font size="8">
                  // in which case, we raise a generic error against whole
                  // attribute's value
                  errorArr2.push({
                    idxFrom: node.attribValueStartsAt + charStart,
                    idxTo: node.attribValueStartsAt + charEnd,
                    message: "Should be integer 1-7, plus/minus are optional.",
                    fix: null
                  });
                }

                errorArr2.forEach(function (errorObj) {
                  context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                    ruleId: "attribute-validate-size"
                  }));
                });
              }
            }
          }
        }
      }
    }
  };
}

function attributeValidateSpan(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "span") {
        // validate the parent
        if (!["col", "colgroup"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-span",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units.",
          zeroOK: false,
          customPxMessage: "Columns number is not in pixels."
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-span"
          }));
        });
      }
    }
  };
}

function attributeValidateSrc(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "src") {
        // validate the parent
        if (!["script", "input", "frame", "iframe", "img"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-src",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-src"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateStandby(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "standby") {
        // validate the parent
        if (node.parent.tagName !== "object") {
          context.report({
            ruleId: "attribute-validate-standby",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-standby"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateStart(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "start") {
        // validate the parent
        if (node.parent.tagName !== "ol") {
          context.report({
            ruleId: "attribute-validate-start",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units.",
          zeroOK: false,
          customPxMessage: "Starting sequence number is not in pixels."
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-start"
          }));
        });
      }
    }
  };
}

var defaults = {
  noTrailingSemi: true
};

function validateInlineStyle(str, idxOffset, originalOpts) {

  var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts); // we get trimmed string start and end positions, also an encountered errors array
  // const { charStart, charEnd, errorArr } = checkForWhitespace(str, idxOffset);

  var _checkForWhitespace = checkForWhitespace(str, idxOffset),
      charStart = _checkForWhitespace.charStart,
      charEnd = _checkForWhitespace.charEnd,
      errorArr = _checkForWhitespace.errorArr; // now that we know where non-whitespace chars are, we can evaluate them

  if (charStart !== null && charEnd) {
    // 1. check inner whitespace:
    // imagine original source:
    // <td style="font-size:  10px;"></td>
    // extracted value is passed as "str":
    //            font-size:  10px;
    //                      ^^
    //             we flag this
    //
    var whitespaceStartsAt = null;
    var nonSpacesMet = false;

    for (var i = charStart; i < charEnd; i++) { // catch the unspaced colon
      // <td style="font-size:10px;"></td>
      //                     ^

      if (str[i] === ":" && str[i + 1].trim()) {
        errorArr.push({
          idxFrom: i + 1 + idxOffset,
          idxTo: i + 1 + idxOffset,
          message: "Add a space.",
          fix: {
            ranges: [[i + 1 + idxOffset, i + 1 + idxOffset, " "]]
          }
        });
      } // catch the start of a wrong whitespace chunk


      if ( // it's whitespace:
      !str[i].trim() && // it hasn't been recording
      whitespaceStartsAt === null) {
        whitespaceStartsAt = i;
      } // flag up non-space whitespace characters


      if ( // chunk has been recording
      whitespaceStartsAt && // and it's a whitespace
      !str[i].trim() && // and current char is not a space
      str[i] !== " " && // and flag hasn't been flipped already
      !nonSpacesMet) {
        nonSpacesMet = true;
      } // catch the excessive chunk or anything not-space


      if ( // it exists
      whitespaceStartsAt && // it's been passed
      i > whitespaceStartsAt && ( // and current char doesn't exist (end reached)
      !str[i] || // or it's not whitespace
      str[i].trim())) {

        if (nonSpacesMet || i > whitespaceStartsAt + 1) { // default is replacement of the whole string with a single space

          var from = whitespaceStartsAt;
          var to = i;
          var replacement = " ";

          if (str[whitespaceStartsAt] === " ") {
            // push "from" by one and remove replacement
            from += 1;
            replacement = null;
          } else if (str[i - 1] === " ") {
            to -= 1;
            replacement = null;
          }

          errorArr.push({
            idxFrom: from + idxOffset,
            idxTo: to + idxOffset,
            message: (nonSpacesMet && i === whitespaceStartsAt + 1 ? "Replace" : "Remove") + " whitespace.",
            fix: {
              ranges: [replacement ? [from + idxOffset, to + idxOffset, replacement] : [from + idxOffset, to + idxOffset]]
            }
          });
        } // reset


        whitespaceStartsAt = null;
        nonSpacesMet = false;
      }
    } // -----------------------------------------------------------------------------
    // 2. check the trailing semi


    if (opts.noTrailingSemi && str[charEnd - 1] === ";") {
      errorArr.push({
        idxFrom: charEnd - 1 + idxOffset,
        idxTo: charEnd + idxOffset,
        message: "Delete the trailing semicolon.",
        fix: {
          ranges: [[charEnd - 1 + idxOffset, charEnd + idxOffset]]
        }
      });
    } else if (!opts.noTrailingSemi && str[charEnd - 1] !== ";") {
      errorArr.push({
        idxFrom: charEnd + idxOffset,
        idxTo: charEnd + idxOffset,
        message: "Add the trailing semicolon.",
        fix: {
          ranges: [[charEnd + idxOffset, charEnd + idxOffset, ";"]]
        }
      });
    }
  }

  return errorArr;
}

// -----------------------------------------------------------------------------

function attributeValidateStyle(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }

  return {
    attribute: function attribute(node) {

      if (node.attribName === "style") {
        // validate the parent
        if (["base", "basefont", "head", "html", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-style",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateInlineStyle(node.attribValueRaw, node.attribValueStartsAt, {
          noTrailingSemi: Array.isArray(opts) && opts.includes("noTrailingSemi")
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-style"
          }));
        });
      }
    }
  };
}

function attributeValidateSummary(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "summary") {
        // validate the parent
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-summary",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-summary"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateTabindex(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "tabindex") {
        // validate the parent
        if (!["a", "area", "button", "input", "object", "select", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-tabindex",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units.",
          zeroOK: true,
          customPxMessage: "Tabbing order number should not be in pixels.",
          maxValue: 32767
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-tabindex"
          }));
        });
      }
    }
  };
}

function attributeValidateTarget(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "target") {
        // validate the parent
        if (!["a", "area", "base", "form", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-target",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace because value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-target"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateText(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateText(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "text") {
        // validate the parent
        if (node.parent.tagName !== "body") {
          context.report({
            ruleId: "attribute-validate-text",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var errorArr = validateColor(node.attribValueRaw, node.attribValueStartsAt, {
            namedCssLevel1OK: true,
            namedCssLevel2PlusOK: true,
            hexThreeOK: false,
            hexFourOK: false,
            hexSixOK: true,
            hexEightOK: false
          });
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-text"
            }));
          });
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------

function attributeValidateTitle(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "title") {
        // validate the parent
        if (["base", "basefont", "head", "html", "meta", "param", "script", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-title",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace because value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-title"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateType(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "type") {
        // validate the parent
        if (!["a", "link", "object", "param", "script", "style", "input", "li", "ol", "ul", "button"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-type",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // validate depending on type
        else if (["a", "link", "object", "param", "script", "style"].includes(node.parent.tagName)) {
            validateString(node.attribValueRaw, // value
            node.attribValueStartsAt, // offset
            {
              quickPermittedValues: ["application/javascript", "application/json", "application/x-www-form-urlencoded", "application/xml", "application/zip", "application/pdf", "application/sql", "application/graphql", "application/ld+json", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.oasis.opendocument.text", "application/zstd", "audio/mpeg", "audio/ogg", "multipart/form-data", "text/css", "text/html", "text/xml", "text/csv", "text/plain", "image/png", "image/jpeg", "image/gif", "application/vnd.api+json"],
              permittedValues: Object.keys(db__default['default']),
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "input") {
            validateString(node.attribValueRaw, // value
            node.attribValueStartsAt, // offset
            {
              quickPermittedValues: ["text", "password", "checkbox", "radio", "submit", "reset", "file", "hidden", "image", "button"],
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "li") {
            validateString(node.attribValueRaw, // value
            node.attribValueStartsAt, // offset
            {
              quickPermittedValues: ["disc", "square", "circle", "1", "a", "A", "i", "I"],
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "ol") {
            validateString(node.attribValueRaw, // value
            node.attribValueStartsAt, // offset
            {
              quickPermittedValues: ["1", "a", "A", "i", "I"],
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "ul") {
            validateString(node.attribValueRaw, // value
            node.attribValueStartsAt, // offset
            {
              quickPermittedValues: ["disc", "square", "circle"],
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "button") {
            validateString(node.attribValueRaw, // value
            node.attribValueStartsAt, // offset
            {
              quickPermittedValues: ["button", "submit", "reset"],
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-type"
              }));
            });
          }
      }
    }
  };
}

function attributeValidateUsemap(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "usemap") {
        // validate the parent
        if (!["img", "input", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-usemap",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-usemap"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateValign(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "valign") {
        // validate the parent
        if (!["col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-valign",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          validateString(node.attribValueRaw, // value
          node.attribValueStartsAt, // offset
          {
            permittedValues: ["top", "middle", "bottom", "baseline"],
            canBeCommaSeparated: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-valign"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateValue(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateValue(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "value") {
        // validate the parent
        if (!["input", "option", "param", "button", "li"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-value",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if parent is OK
        else if (node.parent.tagName === "li") {
            // value is number
            validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
              type: "integer",
              theOnlyGoodUnits: [],
              customGenericValueError: "Should be integer, no units.",
              zeroOK: false,
              customPxMessage: "Sequence number should not be in pixels."
            }).forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-value"
              }));
            });
          } else {
            // all others - value is CDATA
            var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
                errorArr = _checkForWhitespace.errorArr;

            errorArr.forEach(function (errorObj) {
              context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
                ruleId: "attribute-validate-value"
              }));
            });
          }
      }
    }
  };
}

function attributeValidateValuetype(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "valuetype") {
        // validate the parent
        if (node.parent.tagName !== "param") {
          context.report({
            ruleId: "attribute-validate-valuetype",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else {
          validateString(node.attribValueRaw, // value
          node.attribValueStartsAt, // offset
          {
            permittedValues: ["data", "ref", "object"],
            canBeCommaSeparated: false
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-valuetype"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateVersion(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "version") {
        // validate the parent
        if (node.parent.tagName !== "html") {
          context.report({
            ruleId: "attribute-validate-version",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          // only check for rogue whitespace - value can be any CDATA
          var _checkForWhitespace = checkForWhitespace(node.attribValueRaw, node.attribValueStartsAt),
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-version"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateVlink(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "vlink") {
        // validate the parent
        if (node.parent.tagName !== "body") {
          context.report({
            ruleId: "attribute-validate-vlink",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } // if value is empty or otherwise does not exist


        if (!node.attribValueStartsAt || !node.attribValueEndsAt) {
          context.report({
            ruleId: "attribute-validate-" + node.attribName.toLowerCase(),
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Missing value.",
            fix: null
          });
        } else {
          var errorArr = validateColor(node.attribValueRaw, node.attribValueStartsAt, {
            namedCssLevel1OK: true,
            namedCssLevel2PlusOK: true,
            hexThreeOK: false,
            hexFourOK: false,
            hexSixOK: true,
            hexEightOK: false
          });
          errorArr.forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-vlink"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateVspace(context) {
  return {
    attribute: function attribute(node) { // console.log(
      //   `015 attributeValidateVspace(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "vspace") {
        // validate the parent
        if (!["applet", "img", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-vspace",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        }

        var errorArr = validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
          theOnlyGoodUnits: [],
          noUnitsIsFine: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "attribute-validate-vspace"
          }));
        });
      }
    }
  };
}

function attributeValidateWidth(context) {
  return {
    attribute: function attribute(node) {

      if (node.attribName === "width") {
        // validate the parent
        if (!["hr", "iframe", "img", "object", "table", "td", "th", "applet", "col", "colgroup", "pre"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-width",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: "Tag \"" + node.parent.tagName + "\" can't have attribute \"" + node.attribName + "\".",
            fix: null
          });
        } else if (node.parent.tagName === "pre") {
          // number only
          validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
            theOnlyGoodUnits: [],
            noUnitsIsFine: true
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-width"
            }));
          });
        } else if (["colgroup", "col"].includes(node.parent.tagName)) {
          // multilength type
          validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
            badUnits: ["px"],
            theOnlyGoodUnits: ["*", "%"],
            noUnitsIsFine: true
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-width"
            }));
          });
        } else {
          // normal length
          validateDigitAndUnit(node.attribValueRaw, node.attribValueStartsAt, {
            badUnits: ["px"],
            noUnitsIsFine: true
          }).forEach(function (errorObj) {
            context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
              ruleId: "attribute-validate-width"
            }));
          });
        }
      }
    }
  };
}

// rule: bad-named-html-entity-not-email-friendly

function htmlEntitiesNotEmailFriendly(context) {
  return {
    entity: function entity(_ref) {
      var idxFrom = _ref.idxFrom,
          idxTo = _ref.idxTo;

      if (Object.keys(htmlEntitiesNotEmailFriendly$1.notEmailFriendly).includes(context.str.slice(idxFrom + 1, idxTo - 1))) {
        context.report({
          ruleId: "bad-named-html-entity-not-email-friendly",
          message: "Email-unfriendly named HTML entity.",
          idxFrom: idxFrom,
          idxTo: idxTo,
          fix: {
            ranges: [[idxFrom, idxTo, "&" + htmlEntitiesNotEmailFriendly$1.notEmailFriendly[context.str.slice(idxFrom + 1, idxTo - 1)] + ";"]]
          }
        });
      }
    }
  };
}

function processStr(str, offset, context, mode) {
  // traverse the value of this text node:
  for (var i = 0, len = str.length; i < len; i++) {
    if ((str[i].charCodeAt(0) > 127 || "<>\"&".includes(str[i])) && (str[i].charCodeAt(0) !== 160 || !Object.keys(context.processedRulesConfig).includes("bad-character-non-breaking-space") || !isAnEnabledValue(context.processedRulesConfig["bad-character-non-breaking-space"]))) {
      var encodedChr = he__default['default'].encode(str[i], {
        useNamedReferences: mode === "named"
      });

      if (Object.keys(htmlEntitiesNotEmailFriendly$1.notEmailFriendly).includes(encodedChr.slice(1, encodedChr.length - 1))) {
        encodedChr = "&" + htmlEntitiesNotEmailFriendly$1.notEmailFriendly[encodedChr.slice(1, encodedChr.length - 1)] + ";";
      }
      var charName = "";

      if (str[i].charCodeAt(0) === 160) {
        charName = " no-break space";
      } else if (str[i].charCodeAt(0) === 38) {
        charName = " ampersand";
      } else if (str[i].charCodeAt(0) === 60) {
        charName = " less than";
      } else if (str[i].charCodeAt(0) === 62) {
        charName = " greater than";
      } else if (str[i].charCodeAt(0) === 34) {
        charName = " double quotes";
      } else if (str[i].charCodeAt(0) === 163) {
        charName = " pound sign";
      }

      context.report({
        ruleId: "character-encode",
        message: "Unencoded" + charName + " character.",
        idxFrom: i + offset,
        idxTo: i + 1 + offset,
        fix: {
          ranges: [[i + offset, i + 1 + offset, encodedChr]]
        }
      });
    }
  }
}

var characterEncode = function characterEncode(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }

  return {
    text: function text(token) { // settle the mode, is it "always" or a default, "never"

      var mode = "named"; // opts array comes already sliced, without 1st element, so opts value
      // is 0th (and onwards if more)

      if (Array.isArray(opts) && ["named", "numeric"].includes(opts[0])) {
        mode = opts[0];
      } // ACTION

      processStr(token.value, token.start, context, mode);
    }
  };
};

function characterUnspacedPunctuation(context, originalOpts) {
  var charCodeMapping = {
    63: "questionMark",
    33: "exclamationMark",
    59: "semicolon",
    187: "rightDoubleAngleQuotMark",
    171: "leftDoubleAngleQuotMark"
  };
  return {
    text: function text(node) {
      var defaults = {
        questionMark: {
          whitespaceLeft: "never",
          whitespaceRight: "always"
        },
        exclamationMark: {
          whitespaceLeft: "never",
          whitespaceRight: "always"
        },
        semicolon: {
          whitespaceLeft: "never",
          whitespaceRight: "always"
        },
        rightDoubleAngleQuotMark: {
          whitespaceLeft: "never",
          whitespaceRight: "always"
        },
        leftDoubleAngleQuotMark: {
          whitespaceLeft: "never",
          whitespaceRight: "always"
        }
      };

      var opts = _objectSpread__default['default'](_objectSpread__default['default']({}, defaults), originalOpts); // plan: iterate each character from this text chunk/node, query each
      // caught character's surroundings as per config

      for (var i = node.start; i < node.end; i++) {
        var charCode = context.str[i].charCodeAt(0);

        if (charCodeMapping[String(charCode)]) {
          var charName = charCodeMapping[String(charCode)]; // precautions first.
          // if it's an exclamation mark and two dashes follow, we bail right away

          if (charName === "exclamationMark" && context.str[stringLeftRight.right(context.str, i)] === "-" && context.str[stringLeftRight.right(context.str, stringLeftRight.right(context.str, i))] === "-") {
            return;
          }

          if (opts[charName].whitespaceLeft === "never" && i && !context.str[i - 1].trim().length) {
            var idxFrom = stringLeftRight.left(context.str, i) ? stringLeftRight.left(context.str, i) + 1 : 0;
            context.report({
              ruleId: "character-unspaced-punctuation",
              idxFrom: idxFrom,
              idxTo: i,
              message: "Remove the whitespace.",
              fix: {
                ranges: [[idxFrom, i]]
              }
            });
          }

          if (opts[charName].whitespaceRight === "never" && i < node.end - 1 && !context.str[i + 1].trim().length) {
            context.report({
              ruleId: "character-unspaced-punctuation",
              idxFrom: i + 1,
              idxTo: stringLeftRight.right(context.str, i) || context.str.length,
              message: "Remove the whitespace.",
              fix: {
                ranges: [[i + 1, stringLeftRight.right(context.str, i) || context.str.length]]
              }
            });
          }

          if (opts[charName].whitespaceLeft === "always" && i && context.str[i - 1].trim().length) {
            context.report({
              ruleId: "character-unspaced-punctuation",
              idxFrom: i,
              idxTo: i + 1,
              message: "Add a space.",
              fix: {
                ranges: [[i, i, " "]]
              }
            });
          }

          if (opts[charName].whitespaceRight === "always" && i < node.end - 1 && context.str[i + 1].trim().length) {
            context.report({
              ruleId: "character-unspaced-punctuation",
              idxFrom: i,
              idxTo: i + 1,
              message: "Add a space.",
              fix: {
                ranges: [[i + 1, i + 1, " "]]
              }
            });
          }
        }
      }
    }
  };
}

// -----------------------------------------------------------------------------
// it tap the is-media-descriptor that we already use on tags
// to validate media query selectors, for example (rogue letter "e"):
// @media screeen {
//   ...
// }

function mediaMalformed(context) {
  return {
    at: function at(node) {

      if (node.identifier === "media") {
        var errors = isMediaDescriptor.isMediaD(node.query, {
          offset: node.queryStartsAt
        });
        errors.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "media-malformed"
          }));
        });
      } // if (node.tagName === "bold") {
      //   console.log(`037 RAISE ERROR [${node.start}, ${node.end}]`);
      //   context.report({
      //     ruleId: "media-malformed",
      //     message: `Tag "bold" does not exist in HTML.`,
      //     idxFrom: node.start,
      //     idxTo: node.end, // second elem. from last range
      //     fix: {
      //       ranges: [[node.tagNameStartsAt, node.tagNameEndsAt, suggested]]
      //     }
      //   });
      // }

    }
  };
}

function validateCommentClosing(token) {
  var reference = {
    simple: "-->",
    only: "<![endif]-->",
    not: "<!--<![endif]-->"
  }; // if all is fine, end quick

  if (token.kind === "simple" && token.value === "-->" || token.kind === "only" && token.value === "<![endif]-->" || token.kind === "not" && token.value === "<!--<![endif]-->") {
    return [];
  }

  var errorArr = []; // assemble string without whitespace:

  var valueWithoutWhitespace = ""; // first, tackle any inner whitespace

  splitByWhitespace(token.value, function (_ref) {
    var charFrom = _ref[0],
        charTo = _ref[1];
    valueWithoutWhitespace = "" + valueWithoutWhitespace + token.value.slice(charFrom, charTo);
  }, function (_ref2) {
    var whitespaceFrom = _ref2[0],
        whitespaceTo = _ref2[1];
    errorArr.push({
      ruleId: "comment-only-closing-malformed",
      idxFrom: token.start,
      idxTo: token.end,
      message: "Remove whitespace.",
      fix: {
        ranges: [[whitespaceFrom + token.start, whitespaceTo + token.start]]
      }
    });
  }); // if all it took was to remove some whitespace to get a correct value,
  // that's the end - return the "errorArr" with only whitespace ranges:

  if (token.kind === "simple" && valueWithoutWhitespace === "-->" || token.kind === "only" && valueWithoutWhitespace === "<![endif]-->" || token.kind === "not" && valueWithoutWhitespace === "<!--<![endif]-->") {
    return errorArr;
  } // if processing continues, it means something more is wrong
  errorArr.push({
    idxFrom: token.start,
    idxTo: token.end,
    message: "Malformed closing comment tag.",
    fix: {
      ranges: [[token.start, token.end, reference[token.kind]]]
    }
  });
  return errorArr;
}

function commentClosingMalformed(context) {
  return {
    comment: function comment(node) {

      if (node.closing) {
        // run the tag's value past the validator function
        var errorArr = validateCommentClosing(node) || []; // Out of all raised errors, only one can have "ranges.fix" -
        // all other fixes, if any present, will be removed.
        // This is to simplify the rule fix clashing.

        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            keepSeparateWhenFixing: true,
            ruleId: "comment-closing-malformed"
          }));
        });
      }
    }
  };
}

function validateCommentOpening(token) {
  var reference = {
    simple: /<!--/g,
    only: /<!--\[[^\]]+\]>/g,
    not: /<!--\[[^\]]+\]><!-->/g
  }; // if all is fine, end quick

  if (token.kind === "simple" && reference.simple.test(token.value) || token.kind === "only" && reference.only.test(token.value) || token.kind === "not" && reference.not.test(token.value)) {
    return [];
  }

  var errorArr = []; // assemble string without whitespace:

  var valueWithoutWhitespace = "";

  if (token.kind === "simple") { // first, tackle any inner whitespace

    splitByWhitespace(token.value, function (_ref) {
      var charFrom = _ref[0],
          charTo = _ref[1];
      valueWithoutWhitespace = "" + valueWithoutWhitespace + token.value.slice(charFrom, charTo);
    }, function (_ref2) {
      var whitespaceFrom = _ref2[0],
          whitespaceTo = _ref2[1];
      errorArr.push({
        idxFrom: token.start,
        idxTo: token.end,
        message: "Remove whitespace.",
        fix: {
          ranges: [[whitespaceFrom + token.start, whitespaceTo + token.start]]
        }
      });
    });
  } // if all it took was to remove some whitespace to get a correct value,
  // that's the end - return the "errorArr" with only whitespace ranges:

  if (token.kind === "simple" && reference.simple.test(valueWithoutWhitespace) || token.kind === "only" && reference.only.test(valueWithoutWhitespace) || token.kind === "not" && reference.not.test(valueWithoutWhitespace)) {
    return errorArr;
  } // if processing continues, it means something more is wrong
  var wrongBracketType = false; // check the opening tag's beginning:

  if (["only", "not"].includes(token.kind)) {
    // if beginning is malformed:
    stringFindMalformed.findMalformed(token.value, "<!--[", function (_ref3) {
      var idxFrom = _ref3.idxFrom,
          idxTo = _ref3.idxTo;
      var finalIdxTo = idxTo; // take precaution, "not" type openings have very similar
      // ending, <!--> which will get caught as well here!

      if (idxFrom === token.start) {

        if ( // imagine, we searched for "<!--[" in "<!--{if !mso}><!-->" -
        // the idxTo is currently at "{" - search stopped at "{" and caught
        // only "<!--", the frontal part.
        // We check, maybe there's wrong type opening bracket, followed by "if"
        "{(".includes(token.value[idxTo]) && // and "if" follows
        stringMatchLeftRight.matchRight(token.value, idxTo, "if", {
          trimBeforeMatching: true
        })) {
          wrongBracketType = true;
          finalIdxTo += 1;
        }

        errorArr.push({
          idxFrom: token.start,
          idxTo: token.end,
          message: "Malformed opening comment tag.",
          fix: {
            ranges: [[idxFrom + token.start, finalIdxTo + token.start, "<!--["]]
          }
        });
      }
    });
  } // check the ending part:


  if (token.kind === "not") { // if ending of the opening is malformed:

    stringFindMalformed.findMalformed(token.value, "]><!-->", function (_ref4) {
      var idxFrom = _ref4.idxFrom,
          idxTo = _ref4.idxTo;
      var finalIdxFrom = idxFrom;

      if ("})".includes(token.value[idxFrom - 1]) && // also require that token would start with:
      // "<!--{if" or "<!--(if"
      wrongBracketType) {
        finalIdxFrom -= 1;
      }
      errorArr.push({
        idxFrom: token.start,
        idxTo: token.end,
        message: "Malformed opening comment tag.",
        fix: {
          ranges: [[finalIdxFrom + token.start, idxTo + token.start, "]><!-->"]]
        }
      });
    });
  } else if (token.kind === "only") { // plan: take the value, chomp all ">" and "]" characters
    // from the end of it, then if anything's suspicious,
    // replace all that with tight "]>".

    for (var i = token.value.length; i--;) {
      if (token.value[i].trim().length && !">]".includes(token.value[i])) {
        // if heads already report wrong bracket type, extend by one character
        // and remove that bracket too
        var rangeStart = i + 1;

        if ("})".includes(token.value[i]) && wrongBracketType) {
          rangeStart -= 1;
        }

        if (token.value.slice(i + 1) !== "]>") {
          errorArr.push({
            idxFrom: token.start,
            idxTo: token.end,
            message: "Malformed opening comment tag.",
            fix: {
              ranges: [[rangeStart + token.start, token.end, "]>"]]
            }
          });
        }

        break;
      }
    }
  }

  return errorArr;
}

function commentOpeningMalformed(context) {
  return {
    text: function text(node) {
      stringFindMalformed.findMalformed(node.value, "<!--", function (errorObj) {
        context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
          message: "Malformed opening comment tag.",
          ruleId: "comment-opening-malformed",
          fix: {
            ranges: [[errorObj.idxFrom, errorObj.idxTo, "<!--"]]
          }
        }));
      }, {
        stringOffset: node.start
      });
    },
    comment: function comment(node) {

      if (!node.closing) {
        // run the tag's value past the validator function
        var errorArr = validateCommentOpening(node) || [];
        errorArr.forEach(function (errorObj) {
          context.report(_objectSpread__default['default'](_objectSpread__default['default']({}, errorObj), {}, {
            ruleId: "comment-opening-malformed"
          }));
        });
      }
    }
  };
}

// rule: comment-mismatching-pair

function commentMismatchingPair(context) {
  return {
    ast: function ast(node) { // we have raw AST, we need to traverse it and find mismatching-kind pairs
      // of type="comment" tokens, only-not or not-only

      astMonkeyTraverse.traverse(node, // (key, val, innerObj, stop) => {
      function (key, val, innerObj) {
        var current = val !== undefined ? val : key;

        if (isObj(current)) {
          // monkey will traverse every key, every string within.
          // We need to pick the objects of a type we need: "comment"
          // console.log(
          //   `210 ██ ${`\u001b[${35}m${`linter/tagCb():`}\u001b[${39}m`} PING ${`\u001b[${33}m${`current`}\u001b[${39}m`} = ${JSON.stringify(
          //     current,
          //     null,
          //     4
          //   )}`
          // );
          if (current.type === "comment" && current.closing) {
            var previousToken = op__default['default'].get(node, astMonkeyUtil.pathPrev(innerObj.path));

            if (isObj(previousToken) && previousToken.type === "comment" && !previousToken.closing) {
              if (previousToken.kind === "not" && current.kind === "only") { // turn tail into "not"-kind, add front part (<!--)
                // Out of all raised errors, only one can have "ranges.fix" -
                // all other fixes, if any present, will be removed.
                // This is to simplify the rule fix clashing.

                context.report({
                  ruleId: "comment-mismatching-pair",
                  keepSeparateWhenFixing: true,
                  message: "Add \"<!--\".",
                  idxFrom: current.start,
                  idxTo: current.end,
                  fix: {
                    ranges: [[current.start, current.start, "<!--"]]
                  }
                });
              } else if (previousToken.kind === "only" && current.kind === "not") { // turn tail into "only"-kind, remove front part (<!--)
                // Out of all raised errors, only one can have "ranges.fix" -
                // all other fixes, if any present, will be removed.
                // This is to simplify the rule fix clashing.

                context.report({
                  ruleId: "comment-mismatching-pair",
                  keepSeparateWhenFixing: true,
                  message: "Remove \"<!--\".",
                  idxFrom: current.start,
                  idxTo: current.end,
                  fix: {
                    ranges: [[current.start, current.end, "<![endif]-->"]]
                  }
                });
              }
            }
          }
        }

        return current;
      });
    }
  };
}

// rule: comment-conditional-nested
// function commentConditionalNested(context, ...opts) {

function commentConditionalNested(context) {
  return {
    ast: function ast(node) {
      var pathsWithOpeningComments = [];
      astMonkeyTraverse.traverse(node, // (key, val, innerObj, stop) => {
      function (key, val, innerObj) {
        var current = val !== undefined ? val : key;

        if (isObj(current)) {
          // monkey will traverse every key, every string within.
          // We need to pick the objects of a type we need: "comment"

          if (current.type === "comment") { // first, check, does any opening comment path strings match
            // the start of the current path - because if it is, it's nested
            // and should be reported

            if (pathsWithOpeningComments.some(function (pathStr) {
              return innerObj.path.startsWith(pathStr);
            })) {
              context.report({
                ruleId: "comment-conditional-nested",
                message: "Don't nest comments.",
                idxFrom: current.start,
                idxTo: current.end,
                fix: null
              });
            }

            if (!current.closing) {
              pathsWithOpeningComments.push(innerObj.path);
            }
          }
        }

        return current;
      });
    }
  };
}

// rule: email-td-sibling-padding
// -----------------------------------------------------------------------------
// prohibits use of CSS padding style on TD if sibling TD's are present
function tdSiblingPadding(context) {
  var start;
  var end;
  return {
    tag: function tag(node) {

      if ( // if this node is TR tag
      node.tagName === "tr" && // and it's got at least some some children tags
      Array.isArray(node.children) && // there are more than one TD children tags
      node.children.filter(function (tokenObj) {
        return tokenObj.type === "tag" && tokenObj.tagName === "td" && !tokenObj.closing;
      }).length > 1 && // any one of TD children tags contains a css style property "padding-*"
      node.children.some(function (tokenObj) {
        return tokenObj.type === "tag" && tokenObj.tagName === "td" && !tokenObj.closing && Array.isArray(tokenObj.attribs) && tokenObj.attribs.some(function (attribObj) {
          return attribObj.attribName === "style" && Array.isArray(attribObj.attribValue) && attribObj.attribValue.some(function (attribValueObj) {
            if (typeof attribValueObj.property === "string" && attribValueObj.property.startsWith("padding-")) {
              start = attribValueObj.start;
              end = attribValueObj.end;
              return true;
            }

            return false;
          });
        });
      })) {
        context.report({
          ruleId: "email-td-sibling-padding",
          message: "Don't set padding on TD when sibling TD's are present.",
          idxFrom: start,
          idxTo: end,
          fix: null
        });
      }
    }
  };
}

var trailingSemi = function trailingSemi(context, mode) {
  return {
    rule: function rule(node) { // incoming "rule"-type node will be something like:
      // {
      //   type: "rule",
      //   start: 7,
      //   end: 20,
      //   value: ".a{color:red}",
      //   left: 6,
      //   nested: false,
      //   openingCurlyAt: 9,
      //   closingCurlyAt: 19,
      //   selectorsStart: 7,
      //   selectorsEnd: 9,
      //   selectors: [
      //     {
      //       value: ".a",
      //       selectorStarts: 7,
      //       selectorEnds: 9,
      //     },
      //   ],
      //   properties: [
      //     {
      //       start: 10,
      //       end: 19,
      //       value: "red",
      //       property: "color",
      //       propertyStarts: 10,
      //       propertyEnds: 15,
      //       colon: 15,
      //       valueStarts: 16,
      //       valueEnds: 19,
      //       semi: null,
      //     },
      //   ],
      // };

      var properties = []; // there can be text nodes within properties array!
      // innocent whitespace is still a text node!!!!

      if (Array.isArray(node.properties) && node.properties.length && node.properties.filter(function (property) {
        return property.property;
      }).length) {
        properties = node.properties.filter(function (property) {
          return property.property;
        });
      }

      if (mode !== "never" && properties && properties.length && properties[~-properties.length].semi === null && properties[~-properties.length].valueEnds) {
        var idxFrom = properties[~-properties.length].start;
        var idxTo = properties[~-properties.length].end;
        var positionToInsert = properties[~-properties.length].valueEnds;
        context.report({
          ruleId: "css-trailing-semi",
          idxFrom: idxFrom,
          idxTo: idxTo,
          message: "Add a semicolon.",
          fix: {
            ranges: [[positionToInsert, positionToInsert, ";"]]
          }
        });
      } else if (mode === "never" && properties && properties.length && properties[~-properties.length].semi !== null && properties[~-properties.length].valueEnds) {
        var _idxFrom = properties[~-properties.length].start;
        var _idxTo = properties[~-properties.length].end;
        var positionToRemove = properties[~-properties.length].semi;
        context.report({
          ruleId: "css-trailing-semi",
          idxFrom: _idxFrom,
          idxTo: _idxTo,
          message: "Remove the semicolon.",
          fix: {
            ranges: [[positionToRemove, positionToRemove + 1]]
          }
        });
      }
    }
  };
};

var cssRuleMalformed = function cssRuleMalformed(context) {
  return {
    rule: function rule(node) { // 0. extract all properties - node.properties array records
      // all whitespace as text tokens and we want to exclude them

      var properties = []; // there can be text nodes within properties array!
      // innocent whitespace is still a text node!!!!

      if (Array.isArray(node.properties) && node.properties.length && node.properties.filter(function (property) {
        return property.property;
      }).length) {
        properties = node.properties.filter(function (property) {
          return property.property !== undefined;
        });
      } // 1. catch missing semi on all rules except last
      // <style>.a{color:red\n\ntext-align:left
      //                   ^

      if (properties && properties.length) { // Iterate starting from the second-to last.
        // The last property is ambiguous, tackled by a separate rule.

        for (var i = properties.length - 1; i--;) {
          if (properties[i].semi === null && properties[i].value) {
            //
            context.report({
              ruleId: "css-rule-malformed",
              idxFrom: properties[i].start,
              idxTo: properties[i].end,
              message: "Add a semicolon.",
              fix: {
                ranges: [[properties[i].end, properties[i].end, ";"]]
              }
            });
          }
        }
      } // 2. various checks
      // =================


      if (node.properties && node.properties.length) {
        node.properties.forEach(function (property) {
          // 2-1. catch rules with malformed !important
          // <style>.a{color:red !impotant;}</style>
          //                         ^^
          if (property.important && property.important !== "!important") {
            context.report({
              ruleId: "css-rule-malformed",
              idxFrom: property.importantStarts,
              idxTo: property.importantEnds,
              message: "Malformed !important.",
              fix: {
                ranges: [[property.importantStarts, property.importantEnds, "!important"]]
              }
            });
          } // 2-2 catch gaps in front of colon
          // <style>.a{ color : red; }</style>
          //                 ^


          if (property.colon && property.propertyEnds && property.propertyEnds < property.colon) {
            context.report({
              ruleId: "css-rule-malformed",
              idxFrom: property.start,
              idxTo: property.end,
              message: "Gap in front of semicolon.",
              fix: {
                ranges: [[property.propertyEnds, property.colon]]
              }
            });
          } // 2-3 catch gaps in front of semi
          // <style>.a{ color: red ; }</style>
          //                      ^


          if (property.semi && (property.importantEnds || property.valueEnds) && (property.importantEnds || property.valueEnds) < property.semi) {
            context.report({
              ruleId: "css-rule-malformed",
              idxFrom: property.start,
              idxTo: property.end,
              message: "Gap in front of semi.",
              fix: {
                ranges: [[property.importantEnds || property.valueEnds, property.semi]]
              }
            });
          } // 2-4 colon is not colon
          // <style>.a{color/red;}</style>
          //                ^


          if (property.colon && context.str[property.colon] !== ":") {
            context.report({
              ruleId: "css-rule-malformed",
              idxFrom: property.start,
              idxTo: property.end,
              message: "Mis-typed colon.",
              fix: {
                ranges: [[property.colon, property.colon + 1, ":"]]
              }
            });
          }
        });
      } // 3. catch css rules with selectors but without properties
      // <style>.a{;}
      //           ^


      if (Array.isArray(node.selectors) && node.selectors.length && !properties.length && node.openingCurlyAt && node.closingCurlyAt && node.closingCurlyAt > node.openingCurlyAt + 1 && context.str.slice(node.openingCurlyAt + 1, node.closingCurlyAt).trim()) {
        context.report({
          ruleId: "css-rule-malformed",
          idxFrom: node.start,
          idxTo: node.end,
          message: "Delete rogue character" + (context.str.slice(node.openingCurlyAt + 1, node.closingCurlyAt).trim().length > 1 ? "s" : "") + ".",
          fix: {
            ranges: [[node.openingCurlyAt + 1, node.closingCurlyAt]]
          }
        });
      } // 4. catch css properties without values
      // <style>.a{color:}</style>
      //                ^


      if (node.properties && Array.isArray(node.properties)) {
        for (var _i = 0, len = node.properties.length; _i < len; _i++) {

          if (node.properties[_i].value === null) {
            // tend a rare case, a rogue semicolon:
            // <style>.a{color:red; !important;}</style>
            //                    ^
            if (node.properties[_i].important !== null && node.properties[_i].property === null) {
              var errorRaised = false;

              if (_i) {
                for (var y = node.properties.length; y--;) {
                  if (y === _i) {
                    continue;
                  }

                  if ( // the property we're talking about is missing both
                  // value and property, yet it contains !important
                  node.properties[_i].important && !node.properties[_i].propertyStarts && !node.properties[_i].valueStarts && // we're traversing upon a CSS property, not a whitespace text token
                  node.properties[y].property !== undefined) {

                    if ( // its semi is present
                    node.properties[y].semi && // and its important is missing
                    !node.properties[y].importantStarts) { // the frontal space might be missing

                      var fromIdx = node.properties[y].semi;
                      var toIdx = node.properties[y].semi + 1;
                      var whatToInsert = void 0;

                      if (context.str[node.properties[y].semi + 1] !== " ") {
                        whatToInsert = " ";
                      }
                      context.report({
                        ruleId: "css-rule-malformed",
                        idxFrom: fromIdx,
                        idxTo: toIdx,
                        message: "Delete the semicolon.",
                        fix: {
                          ranges: [[fromIdx, toIdx, whatToInsert]]
                        }
                      });
                      errorRaised = true;
                    } else {
                      // stop looping further
                      break;
                    }
                  }
                }
              }

              if ( // it's a property token, not text whitespace token:
              node.properties[_i].property !== undefined && // and error hasn't been raised so far:
              !errorRaised) {
                context.report({
                  ruleId: "css-rule-malformed",
                  idxFrom: node.properties[_i].start,
                  idxTo: node.properties[_i].end,
                  message: "Missing value.",
                  fix: null
                });
              }
            } else {
              context.report({
                ruleId: "css-rule-malformed",
                idxFrom: node.properties[_i].start,
                idxTo: node.properties[_i].end,
                message: "Missing value.",
                fix: null
              });
            }
          }
        }
      }
    }
  };
};

// here we fetch the rules from all the places,
var builtInRules = {};
defineLazyProp__default['default'](builtInRules, "bad-character-null", function () {
  return badCharacterNull;
});
defineLazyProp__default['default'](builtInRules, "bad-character-start-of-heading", function () {
  return badCharacterStartOfHeading;
});
defineLazyProp__default['default'](builtInRules, "bad-character-start-of-text", function () {
  return badCharacterStartOfText;
});
defineLazyProp__default['default'](builtInRules, "bad-character-end-of-text", function () {
  return badCharacterEndOfText;
});
defineLazyProp__default['default'](builtInRules, "bad-character-end-of-transmission", function () {
  return badCharacterEndOfTransmission;
});
defineLazyProp__default['default'](builtInRules, "bad-character-enquiry", function () {
  return badCharacterEnquiry;
});
defineLazyProp__default['default'](builtInRules, "bad-character-acknowledge", function () {
  return badCharacterAcknowledge;
});
defineLazyProp__default['default'](builtInRules, "bad-character-bell", function () {
  return badCharacterBell;
});
defineLazyProp__default['default'](builtInRules, "bad-character-backspace", function () {
  return badCharacterBackspace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-tabulation", function () {
  return badCharacterTabulation;
});
defineLazyProp__default['default'](builtInRules, "bad-character-line-tabulation", function () {
  return badCharacterLineTabulation;
});
defineLazyProp__default['default'](builtInRules, "bad-character-form-feed", function () {
  return badCharacterFormFeed;
});
defineLazyProp__default['default'](builtInRules, "bad-character-shift-out", function () {
  return badCharacterShiftOut;
});
defineLazyProp__default['default'](builtInRules, "bad-character-shift-in", function () {
  return badCharacterShiftIn;
});
defineLazyProp__default['default'](builtInRules, "bad-character-data-link-escape", function () {
  return badCharacterDataLinkEscape;
});
defineLazyProp__default['default'](builtInRules, "bad-character-device-control-one", function () {
  return badCharacterDeviceControlOne;
});
defineLazyProp__default['default'](builtInRules, "bad-character-device-control-two", function () {
  return badCharacterDeviceControlTwo;
});
defineLazyProp__default['default'](builtInRules, "bad-character-device-control-three", function () {
  return badCharacterDeviceControlThree;
});
defineLazyProp__default['default'](builtInRules, "bad-character-device-control-four", function () {
  return badCharacterDeviceControlFour;
});
defineLazyProp__default['default'](builtInRules, "bad-character-negative-acknowledge", function () {
  return badCharacterNegativeAcknowledge;
});
defineLazyProp__default['default'](builtInRules, "bad-character-synchronous-idle", function () {
  return badCharacterSynchronousIdle;
});
defineLazyProp__default['default'](builtInRules, "bad-character-end-of-transmission-block", function () {
  return badCharacterEndOfTransmissionBlock;
});
defineLazyProp__default['default'](builtInRules, "bad-character-cancel", function () {
  return badCharacterCancel;
});
defineLazyProp__default['default'](builtInRules, "bad-character-end-of-medium", function () {
  return badCharacterEndOfMedium;
});
defineLazyProp__default['default'](builtInRules, "bad-character-substitute", function () {
  return badCharacterSubstitute;
});
defineLazyProp__default['default'](builtInRules, "bad-character-escape", function () {
  return badCharacterEscape;
});
defineLazyProp__default['default'](builtInRules, "bad-character-information-separator-four", function () {
  return badCharacterInformationSeparatorFour;
});
defineLazyProp__default['default'](builtInRules, "bad-character-information-separator-three", function () {
  return badCharacterInformationSeparatorThree;
});
defineLazyProp__default['default'](builtInRules, "bad-character-information-separator-two", function () {
  return badCharacterInformationSeparatorTwo$1;
});
defineLazyProp__default['default'](builtInRules, "bad-character-information-separator-one", function () {
  return badCharacterInformationSeparatorTwo;
});
defineLazyProp__default['default'](builtInRules, "bad-character-delete", function () {
  return badCharacterDelete;
});
defineLazyProp__default['default'](builtInRules, "bad-character-control-0080", function () {
  return badCharacterControl0080;
});
defineLazyProp__default['default'](builtInRules, "bad-character-control-0081", function () {
  return badCharacterControl0081;
});
defineLazyProp__default['default'](builtInRules, "bad-character-break-permitted-here", function () {
  return badCharacterBreakPermittedHere;
});
defineLazyProp__default['default'](builtInRules, "bad-character-no-break-here", function () {
  return badCharacterNoBreakHere;
});
defineLazyProp__default['default'](builtInRules, "bad-character-control-0084", function () {
  return badCharacterControl0084;
});
defineLazyProp__default['default'](builtInRules, "bad-character-next-line", function () {
  return badCharacterNextLine;
});
defineLazyProp__default['default'](builtInRules, "bad-character-start-of-selected-area", function () {
  return badCharacterStartOfSelectedArea;
});
defineLazyProp__default['default'](builtInRules, "bad-character-end-of-selected-area", function () {
  return badCharacterEndOfSelectedArea;
});
defineLazyProp__default['default'](builtInRules, "bad-character-character-tabulation-set", function () {
  return badCharacterCharacterTabulationSet;
});
defineLazyProp__default['default'](builtInRules, "bad-character-character-tabulation-with-justification", function () {
  return badCharacterCharacterTabulationWithJustification;
});
defineLazyProp__default['default'](builtInRules, "bad-character-line-tabulation-set", function () {
  return badCharacterLineTabulationSet;
});
defineLazyProp__default['default'](builtInRules, "bad-character-partial-line-forward", function () {
  return badCharacterPartialLineForward;
});
defineLazyProp__default['default'](builtInRules, "bad-character-partial-line-backward", function () {
  return badCharacterPartialLineBackward;
});
defineLazyProp__default['default'](builtInRules, "bad-character-reverse-line-feed", function () {
  return badCharacterReverseLineFeed;
});
defineLazyProp__default['default'](builtInRules, "bad-character-single-shift-two", function () {
  return badCharacterSingleShiftTwo$1;
});
defineLazyProp__default['default'](builtInRules, "bad-character-single-shift-three", function () {
  return badCharacterSingleShiftTwo;
});
defineLazyProp__default['default'](builtInRules, "bad-character-device-control-string", function () {
  return badCharacterDeviceControlString;
});
defineLazyProp__default['default'](builtInRules, "bad-character-private-use-1", function () {
  return badCharacterPrivateUseOne;
});
defineLazyProp__default['default'](builtInRules, "bad-character-private-use-2", function () {
  return badCharacterPrivateUseTwo;
});
defineLazyProp__default['default'](builtInRules, "bad-character-set-transmit-state", function () {
  return badCharacterSetTransmitState;
});
defineLazyProp__default['default'](builtInRules, "bad-character-cancel-character", function () {
  return badCharacterCancelCharacter;
});
defineLazyProp__default['default'](builtInRules, "bad-character-message-waiting", function () {
  return badCharacterMessageWaiting;
});
defineLazyProp__default['default'](builtInRules, "bad-character-start-of-protected-area", function () {
  return badCharacterStartOfProtectedArea;
});
defineLazyProp__default['default'](builtInRules, "bad-character-end-of-protected-area", function () {
  return badCharacterEndOfProtectedArea;
});
defineLazyProp__default['default'](builtInRules, "bad-character-start-of-string", function () {
  return badCharacterStartOfString;
});
defineLazyProp__default['default'](builtInRules, "bad-character-control-0099", function () {
  return badCharacterControl0099;
});
defineLazyProp__default['default'](builtInRules, "bad-character-single-character-introducer", function () {
  return badCharacterSingleCharacterIntroducer;
});
defineLazyProp__default['default'](builtInRules, "bad-character-control-sequence-introducer", function () {
  return badCharacterControlSequenceIntroducer;
});
defineLazyProp__default['default'](builtInRules, "bad-character-string-terminator", function () {
  return badCharacterStringTerminator;
});
defineLazyProp__default['default'](builtInRules, "bad-character-operating-system-command", function () {
  return badCharacterOperatingSystemCommand;
});
defineLazyProp__default['default'](builtInRules, "bad-character-private-message", function () {
  return badCharacterPrivateMessage;
});
defineLazyProp__default['default'](builtInRules, "bad-character-application-program-command", function () {
  return badCharacterApplicationProgramCommand;
});
defineLazyProp__default['default'](builtInRules, "bad-character-soft-hyphen", function () {
  return badCharacterSoftHyphen;
});
defineLazyProp__default['default'](builtInRules, "bad-character-non-breaking-space", function () {
  return badCharacterNonBreakingSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-ogham-space-mark", function () {
  return badCharacterOghamSpaceMark;
});
defineLazyProp__default['default'](builtInRules, "bad-character-en-quad", function () {
  return badCharacterEnQuad;
});
defineLazyProp__default['default'](builtInRules, "bad-character-em-quad", function () {
  return badCharacterEmQuad;
});
defineLazyProp__default['default'](builtInRules, "bad-character-en-space", function () {
  return badCharacterEnSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-em-space", function () {
  return badCharacterEmSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-three-per-em-space", function () {
  return badCharacterThreePerEmSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-four-per-em-space", function () {
  return badCharacterFourPerEmSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-six-per-em-space", function () {
  return badCharacterSixPerEmSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-figure-space", function () {
  return badCharacterFigureSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-punctuation-space", function () {
  return badCharacterPunctuationSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-thin-space", function () {
  return badCharacterThinSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-hair-space", function () {
  return badCharacterHairSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-zero-width-space", function () {
  return badCharacterZeroWidthSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-zero-width-non-joiner", function () {
  return badCharacterZeroWidthNonJoiner;
});
defineLazyProp__default['default'](builtInRules, "bad-character-zero-width-joiner", function () {
  return badCharacterZeroWidthJoiner;
});
defineLazyProp__default['default'](builtInRules, "bad-character-left-to-right-mark", function () {
  return badCharacterLeftToRightMark;
});
defineLazyProp__default['default'](builtInRules, "bad-character-right-to-left-mark", function () {
  return badCharacterRightToLeftMark;
});
defineLazyProp__default['default'](builtInRules, "bad-character-left-to-right-embedding", function () {
  return badCharacterLeftToRightEmbedding;
});
defineLazyProp__default['default'](builtInRules, "bad-character-right-to-left-embedding", function () {
  return badCharacterRightToLeftEmbedding;
});
defineLazyProp__default['default'](builtInRules, "bad-character-pop-directional-formatting", function () {
  return badCharacterPopDirectionalFormatting;
});
defineLazyProp__default['default'](builtInRules, "bad-character-left-to-right-override", function () {
  return badCharacterLeftToRightOverride;
});
defineLazyProp__default['default'](builtInRules, "bad-character-right-to-left-override", function () {
  return badCharacterRightToLeftOverride;
});
defineLazyProp__default['default'](builtInRules, "bad-character-word-joiner", function () {
  return badCharacterWordJoiner;
});
defineLazyProp__default['default'](builtInRules, "bad-character-function-application", function () {
  return badCharacterFunctionApplication;
});
defineLazyProp__default['default'](builtInRules, "bad-character-invisible-times", function () {
  return badCharacterInvisibleTimes;
});
defineLazyProp__default['default'](builtInRules, "bad-character-invisible-separator", function () {
  return badCharacterInvisibleSeparator;
});
defineLazyProp__default['default'](builtInRules, "bad-character-invisible-plus", function () {
  return badCharacterInvisiblePlus;
});
defineLazyProp__default['default'](builtInRules, "bad-character-left-to-right-isolate", function () {
  return badCharacterLeftToRightIsolate;
});
defineLazyProp__default['default'](builtInRules, "bad-character-right-to-left-isolate", function () {
  return badCharacterRightToLeftIsolate;
});
defineLazyProp__default['default'](builtInRules, "bad-character-first-strong-isolate", function () {
  return badCharacterFirstStrongIsolate;
});
defineLazyProp__default['default'](builtInRules, "bad-character-pop-directional-isolate", function () {
  return badCharacterPopDirectionalIsolate;
});
defineLazyProp__default['default'](builtInRules, "bad-character-inhibit-symmetric-swapping", function () {
  return badCharacterInhibitSymmetricSwapping;
});
defineLazyProp__default['default'](builtInRules, "bad-character-activate-symmetric-swapping", function () {
  return badCharacterActivateSymmetricSwapping;
});
defineLazyProp__default['default'](builtInRules, "bad-character-inhibit-arabic-form-shaping", function () {
  return badCharacterInhibitArabicFormShaping;
});
defineLazyProp__default['default'](builtInRules, "bad-character-activate-arabic-form-shaping", function () {
  return badCharacterActivateArabicFormShaping;
});
defineLazyProp__default['default'](builtInRules, "bad-character-national-digit-shapes", function () {
  return badCharacterNationalDigitShapes;
});
defineLazyProp__default['default'](builtInRules, "bad-character-nominal-digit-shapes", function () {
  return badCharacterNominalDigitShapes;
});
defineLazyProp__default['default'](builtInRules, "bad-character-zero-width-no-break-space", function () {
  return badCharacterZeroWidthNoBreakSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-interlinear-annotation-anchor", function () {
  return badCharacterInterlinearAnnotationAnchor;
});
defineLazyProp__default['default'](builtInRules, "bad-character-interlinear-annotation-separator", function () {
  return badCharacterInterlinearAnnotationSeparator;
});
defineLazyProp__default['default'](builtInRules, "bad-character-interlinear-annotation-terminator", function () {
  return badCharacterInterlinearAnnotationTerminator;
});
defineLazyProp__default['default'](builtInRules, "bad-character-line-separator", function () {
  return badCharacterLineSeparator;
});
defineLazyProp__default['default'](builtInRules, "bad-character-paragraph-separator", function () {
  return badCharacterParagraphSeparator;
});
defineLazyProp__default['default'](builtInRules, "bad-character-narrow-no-break-space", function () {
  return badCharacterNarrowNoBreakSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-medium-mathematical-space", function () {
  return badCharacterMediumMathematicalSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-ideographic-space", function () {
  return badCharacterIdeographicSpace;
});
defineLazyProp__default['default'](builtInRules, "bad-character-replacement-character", function () {
  return badCharacterReplacementCharacter;
}); // TAG rules
// -----------------------------------------------------------------------------

defineLazyProp__default['default'](builtInRules, "tag-space-after-opening-bracket", function () {
  return tagSpaceAfterOpeningBracket;
});
defineLazyProp__default['default'](builtInRules, "tag-space-before-closing-bracket", function () {
  return tagSpaceBeforeClosingBracket;
});
defineLazyProp__default['default'](builtInRules, "tag-space-before-closing-slash", function () {
  return tagSpaceBeforeClosingSlash;
});
defineLazyProp__default['default'](builtInRules, "tag-space-between-slash-and-bracket", function () {
  return tagSpaceBetweenSlashAndBracket;
});
defineLazyProp__default['default'](builtInRules, "tag-closing-backslash", function () {
  return tagClosingBackslash;
});
defineLazyProp__default['default'](builtInRules, "tag-void-slash", function () {
  return tagVoidSlash;
});
defineLazyProp__default['default'](builtInRules, "tag-name-case", function () {
  return tagNameCase;
});
defineLazyProp__default['default'](builtInRules, "tag-is-present", function () {
  return tagIsPresent;
});
defineLazyProp__default['default'](builtInRules, "tag-bold", function () {
  return tagBold;
});
defineLazyProp__default['default'](builtInRules, "tag-bad-self-closing", function () {
  return tagBadSelfClosing;
});
defineLazyProp__default['default'](builtInRules, "attribute-duplicate", function () {
  return attributeDuplicate;
});
defineLazyProp__default['default'](builtInRules, "attribute-malformed", function () {
  return attributeMalformed;
});
defineLazyProp__default['default'](builtInRules, "attribute-on-closing-tag", function () {
  return attributeOnClosingTag;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-abbr", function () {
  return attributeValidateAbbr;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-accept-charset", function () {
  return attributeValidateAcceptCharset;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-accept", function () {
  return attributeValidateAccept;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-accesskey", function () {
  return attributeValidateAccesskey;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-action", function () {
  return attributeValidateAction;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-align", function () {
  return attributeValidateAlign;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-alink", function () {
  return attributeValidateAlink;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-alt", function () {
  return attributeValidateAlt;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-archive", function () {
  return attributeValidateArchive;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-axis", function () {
  return attributeValidateAxis;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-background", function () {
  return attributeValidateBackground;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-bgcolor", function () {
  return attributeValidateBgcolor;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-border", function () {
  return attributeValidateBorder;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-cellpadding", function () {
  return attributeValidateCellpadding;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-cellspacing", function () {
  return attributeValidateCellspacing;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-char", function () {
  return attributeValidateChar;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-charoff", function () {
  return attributeValidateCharoff;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-charset", function () {
  return attributeValidateCharset;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-checked", function () {
  return attributeValidateChecked;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-cite", function () {
  return attributeValidateCite;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-class", function () {
  return attributeValidateClass;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-classid", function () {
  return attributeValidateClassid$1;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-clear", function () {
  return attributeValidateClassid;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-code", function () {
  return attributeValidateCode;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-codebase", function () {
  return attributeValidateCodebase;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-codetype", function () {
  return attributeValidateCodetype;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-color", function () {
  return attributeValidateColor;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-cols", function () {
  return attributeValidateCols;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-colspan", function () {
  return attributeValidateColspan;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-compact", function () {
  return attributeValidateCompact;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-content", function () {
  return attributeValidateContent;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-coords", function () {
  return attributeValidateCoords;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-data", function () {
  return attributeValidateData;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-datetime", function () {
  return attributeValidateDatetime;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-declare", function () {
  return attributeValidateDeclare;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-defer", function () {
  return attributeValidateDefer;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-dir", function () {
  return attributeValidateDir;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-disabled", function () {
  return attributeValidateDisabled;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-enctype", function () {
  return attributeValidateEnctype;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-face", function () {
  return attributeValidateFace;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-for", function () {
  return attributeValidateFor;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-frame", function () {
  return attributeValidateFrame;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-frameborder", function () {
  return attributeValidateFrameborder;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-headers", function () {
  return attributeValidateHeaders;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-height", function () {
  return attributeValidateHeight;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-href", function () {
  return attributeValidateHref;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-hreflang", function () {
  return attributeValidateHreflang;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-hspace", function () {
  return attributeValidateHspace;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-http-equiv", function () {
  return attributeValidateHttpequiv;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-id", function () {
  return attributeValidateId;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-ismap", function () {
  return attributeValidateIsmap;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-label", function () {
  return attributeValidateLabel;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-lang", function () {
  return attributeValidateLang;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-language", function () {
  return attributeValidateLanguage;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-link", function () {
  return attributeValidateLink;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-longdesc", function () {
  return attributeValidateLongdesc;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-marginheight", function () {
  return attributeValidateMarginheight;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-marginwidth", function () {
  return attributeValidateMarginwidth;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-maxlength", function () {
  return attributeValidateMaxlength;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-media", function () {
  return attributeValidateMedia;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-method", function () {
  return attributeValidateMethod;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-multiple", function () {
  return attributeValidateMultiple;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-name", function () {
  return attributeValidateName;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-nohref", function () {
  return attributeValidateNohref;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-noresize", function () {
  return attributeValidateNoresize;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-noshade", function () {
  return attributeValidateNoshade;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-nowrap", function () {
  return attributeValidateNowrap;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-object", function () {
  return attributeValidateObject;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onblur", function () {
  return attributeValidateOnblur;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onchange", function () {
  return attributeValidateOnchange;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onclick", function () {
  return attributeValidateOnclick;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-ondblclick", function () {
  return attributeValidateOndblclick;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onfocus", function () {
  return attributeValidateOnfocus;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onkeydown", function () {
  return attributeValidateOnkeydown;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onkeypress", function () {
  return attributeValidateOnkeypress;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onkeyup", function () {
  return attributeValidateOnkeyup;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onload", function () {
  return attributeValidateOnload;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onmousedown", function () {
  return attributeValidateOnmousedown;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onmousemove", function () {
  return attributeValidateOnmousemove;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onmouseout", function () {
  return attributeValidateOnmouseout;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onmouseover", function () {
  return attributeValidateOnmouseover;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onmouseup", function () {
  return attributeValidateOnmouseup;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onreset", function () {
  return attributeValidateOnreset;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onsubmit", function () {
  return attributeValidateOnsubmit;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onselect", function () {
  return attributeValidateOnselect;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-onunload", function () {
  return attributeValidateOnunload;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-profile", function () {
  return attributeValidateProfile;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-prompt", function () {
  return attributeValidatePrompt;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-readonly", function () {
  return attributeValidateReadonly;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-rel", function () {
  return attributeValidateRel;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-rev", function () {
  return attributeValidateRev;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-rows", function () {
  return attributeValidateRows;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-rowspan", function () {
  return attributeValidateRowspan;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-rules", function () {
  return attributeValidateRules;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-scheme", function () {
  return attributeValidateScheme;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-scope", function () {
  return attributeValidateScope;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-scrolling", function () {
  return attributeValidateScrolling;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-selected", function () {
  return attributeValidateSelected;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-shape", function () {
  return attributeValidateShape;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-size", function () {
  return attributeValidateSize;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-span", function () {
  return attributeValidateSpan;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-src", function () {
  return attributeValidateSrc;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-standby", function () {
  return attributeValidateStandby;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-start", function () {
  return attributeValidateStart;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-style", function () {
  return attributeValidateStyle;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-summary", function () {
  return attributeValidateSummary;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-tabindex", function () {
  return attributeValidateTabindex;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-target", function () {
  return attributeValidateTarget;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-text", function () {
  return attributeValidateText;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-title", function () {
  return attributeValidateTitle;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-type", function () {
  return attributeValidateType;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-usemap", function () {
  return attributeValidateUsemap;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-valign", function () {
  return attributeValidateValign;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-value", function () {
  return attributeValidateValue;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-valuetype", function () {
  return attributeValidateValuetype;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-version", function () {
  return attributeValidateVersion;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-vlink", function () {
  return attributeValidateVlink;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-vspace", function () {
  return attributeValidateVspace;
});
defineLazyProp__default['default'](builtInRules, "attribute-validate-width", function () {
  return attributeValidateWidth;
});
defineLazyProp__default['default'](builtInRules, "bad-named-html-entity-not-email-friendly", function () {
  return htmlEntitiesNotEmailFriendly;
});
defineLazyProp__default['default'](builtInRules, "character-encode", function () {
  return characterEncode;
});
defineLazyProp__default['default'](builtInRules, "character-unspaced-punctuation", function () {
  return characterUnspacedPunctuation;
});
defineLazyProp__default['default'](builtInRules, "media-malformed", function () {
  return mediaMalformed;
});
defineLazyProp__default['default'](builtInRules, "comment-closing-malformed", function () {
  return commentClosingMalformed;
});
defineLazyProp__default['default'](builtInRules, "comment-opening-malformed", function () {
  return commentOpeningMalformed;
});
defineLazyProp__default['default'](builtInRules, "comment-mismatching-pair", function () {
  return commentMismatchingPair;
});
defineLazyProp__default['default'](builtInRules, "comment-conditional-nested", function () {
  return commentConditionalNested;
}); // EMAIL rules
// -----------------------------------------------------------------------------

defineLazyProp__default['default'](builtInRules, "email-td-sibling-padding", function () {
  return tdSiblingPadding;
}); // CSS rules
// -----------------------------------------------------------------------------

defineLazyProp__default['default'](builtInRules, "css-trailing-semi", function () {
  return trailingSemi;
});
defineLazyProp__default['default'](builtInRules, "css-rule-malformed", function () {
  return cssRuleMalformed;
}); // EXPORTS
// -----------------------------------------------------------------------------

function get(something) {
  return builtInRules[something];
} // it expands the grouped rules, such as "bad-character", then
// removes the grouped rule so that only real, single rules
// are passed to Linter


function normaliseRequestedRules(opts) {
  // console.log(
  //   `870 normaliseRequestedRules() RECEIVED: ${`\u001b[${33}m${`opts`}\u001b[${39}m`} = ${JSON.stringify(
  //     opts,
  //     null,
  //     4
  //   )}`
  // );
  var res = {}; // first, if there are known group rules such as "bad-character", set
  // them as a foundation:

  if (Object.keys(opts).includes("all") && isAnEnabledValue(opts.all)) {
    Object.keys(builtInRules).forEach(function (ruleName) {
      res[ruleName] = opts.all;
    });
  } else {
    var temp;

    if (Object.keys(opts).some(function (ruleName) {
      if (["bad-character", "bad-character*", "bad-character-*"].includes(ruleName)) {
        temp = ruleName;
        return true;
      }

      return false;
    })) {
      allBadCharacterRules.forEach(function (ruleName) {
        res[ruleName] = opts[temp];
      });
    }

    if (Object.keys(opts).some(function (ruleName) {
      if (["tag", "tag*", "tag-*"].includes(ruleName)) {
        temp = ruleName;
        return true;
      }

      return false;
    })) {
      allTagRules.forEach(function (ruleName) {
        res[ruleName] = opts[temp];
      });
    }

    if (Object.keys(opts).some(function (ruleName) {
      if (["attribute", "attribute*", "attribute-*"].includes(ruleName)) {
        temp = ruleName;
        return true;
      }

      return false;
    })) {
      allAttribRules.forEach(function (ruleName) {
        res[ruleName] = opts[temp];
      });
    }

    if (Object.keys(opts).some(function (ruleName) {
      if (["css", "css*", "css-*"].includes(ruleName)) {
        temp = ruleName;
        return true;
      }

      return false;
    })) {
      allCSSRules.forEach(function (ruleName) {
        res[ruleName] = opts[temp];
      });
    }

    if (Object.keys(opts).includes("bad-html-entity")) {
      allBadNamedHTMLEntityRules.forEach(function (ruleName) {
        // whole group of rules, not necessarily starting with "bad-html-entity"
        // will be added. Currently it's the list:
        //  * bad-named-html-entity-malformed-nbsp
        //  * bad-named-html-entity-malformed-*
        //  * bad-named-html-entity-unrecognised
        //  * bad-named-html-entity-multiple-encoding
        //  * bad-malformed-numeric-character-entity
        //  * encoded-html-entity-nbsp
        //  * encoded-numeric-html-entity-reference
        res[ruleName] = opts["bad-html-entity"];
      });
    } // then, a-la Object.assign the rest


    Object.keys(opts).forEach(function (ruleName) {
      if (!["all", "tag", "tag*", "tag-*", "attribute", "attribute*", "attribute-*", "bad-character", "bad-character", "bad-character*", "bad-character-*", "bad-html-entity"].includes(ruleName)) {
        // now, it depends is an exact rule name being queried or is it wildcard
        if (Object.keys(builtInRules).includes(ruleName)) {
          res[ruleName] = clone__default['default'](opts[ruleName]);
        } else if (ruleName.includes("*")) {
          Object.keys(builtInRules).forEach(function (builtInRule) {
            if (matcher__default['default'].isMatch(builtInRule, ruleName)) {
              res[builtInRule] = clone__default['default'](opts[ruleName]);
            }
          });
        } // TODO - else clause error messaging - rule is configured but not available

      }
    });
  }
  return res;
}

tinyTypedEmitter.TypedEmitter.defaultMaxListeners = 0;
/**
 * Pluggable email template code linter
 */

var Linter = /*#__PURE__*/function (_TypedEmitter) {
  _inheritsLoose__default['default'](Linter, _TypedEmitter);

  function Linter() {
    var _this;

    _this = _TypedEmitter.call(this) || this;
    _this.messages = [];
    _this.str = "";
    _this.strLineStartIndexes = [];
    _this.config = {};
    _this.hasBeenCalledWithKeepSeparateWhenFixing = false;
    _this.processedRulesConfig = {};
    return _this;
  }

  var _proto = Linter.prototype;

  _proto.verify = function verify(str, config) {
    var _this2 = this;

    this.messages = [];
    this.str = str; // calculate line start indexes for row/column
    // reporting later, it allows line-column-mini to cut corners

    this.strLineStartIndexes = lineColumnMini.getLineStartIndexes(str);
    this.config = clone__default['default'](config);
    this.hasBeenCalledWithKeepSeparateWhenFixing = false;
    this.processedRulesConfig = {};
    var has = Object.prototype.hasOwnProperty; // VALIDATION FIRST

    if (config) {
      if (typeof config !== "object") {
        throw new Error("emlint/verify(): [THROW_ID_01] second input argument, config is not a plain object but " + typeof config + ". It's equal to:\n" + JSON.stringify(config, null, 4));
      } else if (!Object.keys(config).length) {
        // empty config => early return
        return [];
      } else if (!config.rules || typeof config.rules !== "object") {
        throw new Error("emlint/verify(): [THROW_ID_02] config contains no rules! It was given as:\n" + JSON.stringify(config, null, 4));
      }
    } else {
      // falsey config => early return
      return [];
    } // detect the language
    // const lang = detectLanguage(str);
    // filter out all applicable values and make them listen for events that
    // tokenizer emits
    // TODO - rebase, avoid using const, assign directly to "this."


    var processedRulesConfig = normaliseRequestedRules(config.rules);
    this.processedRulesConfig = processedRulesConfig;
    Object.keys(processedRulesConfig) // filter out the rules coming from external packages - they'll be
    // processed separately, in the callbacks coming out of external packages,
    // see the section "rules coming from standalone packages".
    .filter(function (ruleName) {
      return get(ruleName);
    }) // filter out enabled rules:
    .filter(function (ruleName) {
      // same config like in ESLint - 0 is off, 1 is warning, 2 is error
      if (typeof processedRulesConfig[ruleName] === "number") {
        return processedRulesConfig[ruleName] > 0;
      }

      if (Array.isArray(processedRulesConfig[ruleName])) {
        return processedRulesConfig[ruleName][0] > 0;
      }

      return false;
    }).forEach(function (rule) { // extract all the options, second array element onwards - the length is indeterminable

      var rulesFunction;

      if (Array.isArray(processedRulesConfig[rule]) && processedRulesConfig[rule].length > 1) {
        // pass not only "this", the context, but also all the opts, as args
        rulesFunction = get(rule).apply(void 0, [_this2].concat(processedRulesConfig[rule].slice(1)));
      } else {
        // just pass "this", the context
        rulesFunction = get(rule)(_this2);
      }

      Object.keys(rulesFunction).forEach(function (consumedNode) {
        _this2.on(consumedNode, function () {
          var _rulesFunction;

          // console.log(
          //   `106 ${`\u001b[${32}m${`linter.js`}\u001b[${39}m`}: ${`\u001b[${33}m${`consumedNode`}\u001b[${39}m`} = ${JSON.stringify(
          //     consumedNode,
          //     null,
          //     4
          //   )}`
          // );
          (_rulesFunction = rulesFunction)[consumedNode].apply(_rulesFunction, arguments);
        });
      });
    }); // emlint runs on codsen-parser which in turn runs on codsen-tokenizer.
    // Tokenizer recognises string as various token types and "pings" the
    // callback function given to the tokenizer with those lumps, plain objects.
    // Now, Parser consumes those tokens and assembles a tree, an AST.
    // EMLint is plugin-based. Plugins work on code source - consuming either
    // raw tokens, each token of particular kind, listening to event emitted
    // called after that token type, or plugins consume whole AST, listening
    // to "ast"-type event.
    // Now, the less work done the faster program runs.
    // The quickest way for emlint to obtain tokens is from codsen-parser,
    // to tap them raw, bypassing the AST tree, as they come from tokenizer.
    // But the problem is, this approach does not work with broken code.
    // We can't consume tokenizer's nodes because parser can change the
    // nodes, correcting the errors - it's possible because parser "sees" the
    // whole picture.
    // Therefore, we don't consume tokens from the tokenizer, we consume AST
    // from parser, then we send the monkey (ast-monkey-traverse) to traverse
    // that AST and emit the token events.

    this.emit("ast", astMonkeyTraverse.traverse(codsenParser.cparser(str, {
      charCb: function charCb(obj) {
        // We call the character-level callback from raw characters, coming
        // if from parser which comes straight from tokenizer.
        // console.log(
        //   `160 ██ ${`\u001b[${35}m${`linter/charCb():`}\u001b[${39}m`} incoming ${`\u001b[${33}m${`obj`}\u001b[${39}m`} = ${JSON.stringify(
        //     obj,
        //     null,
        //     4
        //   )}`
        // );
        _this2.emit("character", obj);
      },
      errCb: function errCb(obj) { // check, is rule enabled at the first place:

        var currentRulesSeverity = isAnEnabledRule(config.rules, obj.ruleId);

        if (currentRulesSeverity) {
          var message = "Something is wrong.";

          if (isObj(obj) && typeof obj.ruleId === "string" && has.call(astErrMessages, obj.ruleId)) {
            message = astErrMessages[obj.ruleId];
          }

          _this2.report(_objectSpread__default['default']({
            message: message,
            severity: currentRulesSeverity,
            fix: null
          }, obj));
        }
      }
    }), function (key, val, innerObj) {
      var current = val !== undefined ? val : key;

      if (isObj(current) && (!innerObj.parentKey || !innerObj.parentKey.startsWith("attrib"))) { // monkey will traverse every key, every string within.
        // We need to pick the objects of a type we need: "tag", "comment" etc.
        // tag-level callback

        _this2.emit(current.type, current); // plus, for type:html also ping each attribute


        if (current.type === "tag" && Array.isArray(current.attribs) && current.attribs.length) {
          current.attribs.forEach(function (attribObj) {

            _this2.emit("attribute", _objectSpread__default['default'](_objectSpread__default['default']({}, attribObj), {}, {
              parent: _objectSpread__default['default']({}, current)
            }));
          });
        }
      }

      return current;
    })); //
    //
    //
    //
    //
    //
    //                rules coming from standalone packages
    //
    //
    //
    //
    //
    //
    // 1. if any of bad named HTML entity catcher rules is requested, run it

    if (Object.keys(config.rules).some(function (ruleName) {
      return (ruleName === "all" || // group blanket setting
      ruleName === "bad-html-entity" || // group blanket setting
      ruleName.startsWith("bad-html-entity") || ruleName.startsWith("bad-named-html-entity") || matcher__default['default'].isMatch(["bad-malformed-numeric-character-entity"], ruleName)) && (isAnEnabledValue(config.rules[ruleName]) || isAnEnabledValue(processedRulesConfig[ruleName]));
    })) {
      stringFixBrokenNamedEntities.fixEnt(str, {
        cb: function cb(obj) { // evaluate, does the config have this emitted rule set and enabled

          var matchedRulesName = ""; // A severity value can be under array's first element or as digit,
          // plus rule itself might be group rule ("bad-html-entity") or
          // mentioned directly.
          // The plan is to try to extract severity various ways, later if it's
          // set, then report the error.

          var severity; // rule is group, blanket rule

          if (Object.keys(config.rules).includes("bad-html-entity")) {
            if (obj.ruleName === "bad-named-html-entity-unrecognised") {
              // unrecongnised named HTML entities might be false positives,
              // mix of ampersand, letters and semicolon, without spaces,
              // so default level is "warning", not "error":
              severity = 1;
            } else if (Array.isArray(config.rules["bad-html-entity"])) {
              severity = config.rules["bad-html-entity"][0];
            } else if (Number.isInteger(config.rules["bad-html-entity"])) {
              severity = config.rules["bad-html-entity"];
            }
          } else if (Object.keys(config.rules).some(function (rulesName) {

            if (matcher__default['default'].isMatch(obj.ruleName, rulesName)) {
              matchedRulesName = rulesName;
              return true;
            }

            return false;
          })) {
            if (obj.ruleName === "bad-named-html-entity-unrecognised" && config.rules["bad-named-html-entity-unrecognised"] === undefined) {
              // unless the rule was requested exactly, severity is 1.
              // This applies to both group blanket rules "bad-html-entity" and
              // any rules achieved by applying wildcards, for example,
              // "bad-named-html-entity-*".
              severity = 1;
            } else if (Array.isArray(config.rules[matchedRulesName])) {
              severity = config.rules[matchedRulesName][0];
            } else if (Number.isInteger(config.rules[matchedRulesName])) {
              severity = config.rules[matchedRulesName];
            }
          }

          if (Number.isInteger(severity)) {
            var message;

            if (obj.ruleName === "bad-named-html-entity-malformed-nbsp") {
              message = "Malformed NBSP entity.";
            } else if (obj.ruleName === "bad-named-html-entity-unrecognised") {
              message = "Unrecognised named entity.";
            } else if (obj.ruleName === "bad-named-html-entity-multiple-encoding") {
              message = "HTML entity encoding over and over.";
            } else if (obj.ruleName === "bad-malformed-numeric-character-entity") {
              message = "Malformed numeric entity.";
            } else {
              message = "Malformed " + (obj.entityName ? obj.entityName : "named") + " entity.";
            }

            var ranges = [[obj.rangeFrom, obj.rangeTo, obj.rangeValEncoded ? obj.rangeValEncoded : ""]];

            if (obj.ruleName === "bad-named-html-entity-unrecognised") {
              ranges = [];
            }

            _this2.report({
              severity: severity,
              ruleId: obj.ruleName,
              message: message,
              idxFrom: obj.rangeFrom,
              idxTo: obj.rangeTo,
              fix: {
                ranges: ranges
              }
            });
          }
        },
        entityCatcherCb: function entityCatcherCb(from, to) {

          _this2.emit("entity", {
            idxFrom: from,
            idxTo: to
          });
        }
      });
    } // remove all listeners
    // extract all keys from the events interface


    var allEventNames = ["tag", "at", "rule", "text", "esp", "character", "attribute", "ast", "comment", "entity"];
    allEventNames.forEach(function (eventName) {
      _this2.removeAllListeners(eventName);
    });
    return clone__default['default'](this.messages);
  };

  _proto.report = function report(obj) { // fill in other data points:

    var _lineCol = lineColumnMini.lineCol(this.strLineStartIndexes, obj.idxFrom, true),
        line = _lineCol.line,
        col = _lineCol.col;

    var severity = obj.severity || 0; // rules coming from 3rd party packages will give the severity value

    if (!Number.isInteger(obj.severity) && typeof this.processedRulesConfig[obj.ruleId] === "number") {
      severity = this.processedRulesConfig[obj.ruleId];
    } else if (!Number.isInteger(obj.severity) && Array.isArray(this.processedRulesConfig[obj.ruleId])) {
      severity = this.processedRulesConfig[obj.ruleId][0];
    }
    this.messages.push(_objectSpread__default['default'](_objectSpread__default['default']({
      fix: null,
      keepSeparateWhenFixing: false,
      line: line,
      column: col,
      severity: severity
    }, obj), this.hasBeenCalledWithKeepSeparateWhenFixing ? {
      fix: null
    } : {})); // After pushing, let's manage "keepSeparateWhenFixing" messages -
    // make a note of the first incoming message with "keepSeparateWhenFixing"
    // key, in order to remove "fix" values from all other incoming messages
    // with "keepSeparateWhenFixing" key. That's necessary to support certain
    // fixes composition.

    if (obj.keepSeparateWhenFixing && !this.hasBeenCalledWithKeepSeparateWhenFixing && obj.fix) {
      this.hasBeenCalledWithKeepSeparateWhenFixing = true;
    }
  };

  return Linter;
}(tinyTypedEmitter.TypedEmitter);

var version$1 = "4.2.0";

var version = version$1;

exports.Linter = Linter;
exports.util = util;
exports.version = version;
