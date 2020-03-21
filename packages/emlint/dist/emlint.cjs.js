/**
 * emlint
 * Pluggable email template code linter
 * Version: 2.14.0
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/emlint
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var parser = _interopDefault(require('codsen-parser'));
var defineLazyProp = _interopDefault(require('define-lazy-prop'));
var clone = _interopDefault(require('lodash.clonedeep'));
var matcher = _interopDefault(require('matcher'));
var processCommaSeparated = _interopDefault(require('string-process-comma-separated'));
var stringLeftRight = require('string-left-right');
var isRegExp = _interopDefault(require('lodash.isregexp'));
var htmlAllKnownAttributes = require('html-all-known-attributes');
var leven = _interopDefault(require('leven'));
var db = _interopDefault(require('mime-db'));
var isRel = _interopDefault(require('is-relative-uri'));
var urlRegex = _interopDefault(require('url-regex'));
var isLangCode = _interopDefault(require('is-language-code'));
var isMediaD = _interopDefault(require('is-media-descriptor'));
var htmlEntitiesNotEmailFriendly$1 = require('html-entities-not-email-friendly');
var he = _interopDefault(require('he'));
var findMalformed = _interopDefault(require('string-find-malformed'));
var stringMatchLeftRight = require('string-match-left-right');
var traverse = _interopDefault(require('ast-monkey-traverse'));
var astMonkeyUtil = require('ast-monkey-util');
var op = _interopDefault(require('object-path'));
var lineColumn = _interopDefault(require('line-column'));
var stringFixBrokenNamedEntities = _interopDefault(require('string-fix-broken-named-entities'));

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var allBadCharacterRules = [
	"bad-character-acknowledge",
	"bad-character-activate-arabic-form-shaping",
	"bad-character-activate-symmetric-swapping",
	"bad-character-application-program-command",
	"bad-character-backspace",
	"bad-character-bell",
	"bad-character-break-permitted-here",
	"bad-character-cancel",
	"bad-character-cancel-character",
	"bad-character-character-tabulation-set",
	"bad-character-character-tabulation-with-justification",
	"bad-character-control-0080",
	"bad-character-control-0081",
	"bad-character-control-0084",
	"bad-character-control-0099",
	"bad-character-control-sequence-introducer",
	"bad-character-data-link-escape",
	"bad-character-delete",
	"bad-character-device-control-four",
	"bad-character-device-control-one",
	"bad-character-device-control-string",
	"bad-character-device-control-three",
	"bad-character-device-control-two",
	"bad-character-em-quad",
	"bad-character-em-space",
	"bad-character-en-quad",
	"bad-character-en-space",
	"bad-character-end-of-medium",
	"bad-character-end-of-protected-area",
	"bad-character-end-of-selected-area",
	"bad-character-end-of-text",
	"bad-character-end-of-transmission",
	"bad-character-end-of-transmission-block",
	"bad-character-enquiry",
	"bad-character-escape",
	"bad-character-figure-space",
	"bad-character-first-strong-isolate",
	"bad-character-form-feed",
	"bad-character-four-per-em-space",
	"bad-character-function-application",
	"bad-character-hair-space",
	"bad-character-ideographic-space",
	"bad-character-information-separator-four",
	"bad-character-information-separator-one",
	"bad-character-information-separator-three",
	"bad-character-information-separator-two",
	"bad-character-inhibit-arabic-form-shaping",
	"bad-character-inhibit-symmetric-swapping",
	"bad-character-interlinear-annotation-anchor",
	"bad-character-interlinear-annotation-separator",
	"bad-character-interlinear-annotation-terminator",
	"bad-character-invisible-plus",
	"bad-character-invisible-separator",
	"bad-character-invisible-times",
	"bad-character-left-to-right-embedding",
	"bad-character-left-to-right-isolate",
	"bad-character-left-to-right-mark",
	"bad-character-left-to-right-override",
	"bad-character-line-separator",
	"bad-character-line-tabulation",
	"bad-character-line-tabulation-set",
	"bad-character-medium-mathematical-space",
	"bad-character-message-waiting",
	"bad-character-narrow-no-break-space",
	"bad-character-national-digit-shapes",
	"bad-character-negative-acknowledge",
	"bad-character-next-line",
	"bad-character-no-break-here",
	"bad-character-nominal-digit-shapes",
	"bad-character-non-breaking-space",
	"bad-character-null",
	"bad-character-ogham-space-mark",
	"bad-character-operating-system-command",
	"bad-character-paragraph-separator",
	"bad-character-partial-line-backward",
	"bad-character-partial-line-forward",
	"bad-character-pop-directional-formatting",
	"bad-character-pop-directional-isolate",
	"bad-character-private-message",
	"bad-character-private-use-1",
	"bad-character-private-use-2",
	"bad-character-punctuation-space",
	"bad-character-replacement-character",
	"bad-character-reverse-line-feed",
	"bad-character-right-to-left-embedding",
	"bad-character-right-to-left-isolate",
	"bad-character-right-to-left-mark",
	"bad-character-right-to-left-override",
	"bad-character-set-transmit-state",
	"bad-character-shift-in",
	"bad-character-shift-out",
	"bad-character-single-character-introducer",
	"bad-character-single-shift-three",
	"bad-character-single-shift-two",
	"bad-character-six-per-em-space",
	"bad-character-soft-hyphen",
	"bad-character-start-of-heading",
	"bad-character-start-of-protected-area",
	"bad-character-start-of-selected-area",
	"bad-character-start-of-string",
	"bad-character-start-of-text",
	"bad-character-string-terminator",
	"bad-character-substitute",
	"bad-character-synchronous-idle",
	"bad-character-tabulation",
	"bad-character-thin-space",
	"bad-character-three-per-em-space",
	"bad-character-word-joiner",
	"bad-character-zero-width-joiner",
	"bad-character-zero-width-no-break-space",
	"bad-character-zero-width-non-joiner",
	"bad-character-zero-width-space"
];

var allTagRules = [
	"tag-bad-self-closing",
	"tag-bold",
	"tag-closing-backslash",
	"tag-is-present",
	"tag-missing-opening",
	"tag-name-case",
	"tag-space-after-opening-bracket",
	"tag-space-before-closing-slash",
	"tag-space-between-slash-and-bracket",
	"tag-void-frontal-slash",
	"tag-void-slash"
];

var allAttribRules = [
	"attribute-duplicate",
	"attribute-malformed"
];

var allBadNamedHTMLEntityRules = [
	"bad-malformed-numeric-character-entity",
	"bad-named-html-entity-malformed-nbsp",
	"bad-named-html-entity-multiple-encoding",
	"bad-named-html-entity-not-email-friendly",
	"bad-named-html-entity-unrecognised"
];

function checkForWhitespace(str, idxOffset) {
  var charStart = 0;
  var charEnd = str.length;
  var trimmedVal;
  var gatheredRanges = [];
  var errorArr = [];
  if (!str.length || !str[0].trim().length) {
    charStart = stringLeftRight.right(str);
    if (!str.length || charStart === null) {
      charEnd = null;
      errorArr.push({
        idxFrom: idxOffset,
        idxTo: idxOffset + str.length,
        message: "Missing value.",
        fix: null
      });
    } else {
      gatheredRanges.push([idxOffset, idxOffset + charStart]);
    }
  }
  if (charEnd && !str[str.length - 1].trim().length) {
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
        ranges: gatheredRanges
      }
    });
    gatheredRanges = [];
    trimmedVal = str.trim();
  }
  return {
    charStart: charStart,
    charEnd: charEnd,
    errorArr: errorArr,
    trimmedVal: trimmedVal
  };
}

function includesWithRegex(arr, whatToMatch) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!Array.isArray(arr) || !arr.length) {
    return false;
  }
  return arr.some(function (val) {
    return isRegExp(val) && whatToMatch.match(val) || typeof val === "string" && (!opts.caseInsensitive && whatToMatch === val || opts.caseInsensitive && whatToMatch.toLowerCase() === val.toLowerCase());
  });
}

function validateValue(str, idxOffset, opts, charStart, charEnd, errorArr) {
  var extractedValue = str.slice(charStart, charEnd);
  if (!(includesWithRegex(opts.quickPermittedValues, extractedValue, {
    caseInsensitive: opts.caseInsensitive
  }) || includesWithRegex(opts.permittedValues, extractedValue, {
    caseInsensitive: opts.caseInsensitive
  }))) {
    var fix = null;
    var message = "Unrecognised value: \"".concat(str.slice(charStart, charEnd), "\".");
    if (includesWithRegex(opts.quickPermittedValues, extractedValue.toLowerCase()) || includesWithRegex(opts.permittedValues, extractedValue.toLowerCase())) {
      message = "Should be lowercase.";
      fix = {
        ranges: [[charStart + idxOffset, charEnd + idxOffset, extractedValue.toLowerCase()]]
      };
    } else if (Array.isArray(opts.quickPermittedValues) && opts.quickPermittedValues.length && opts.quickPermittedValues.length < 6 && opts.quickPermittedValues.every(function (val) {
      return typeof val === "string";
    }) && (!Array.isArray(opts.permittedValues) || !opts.permittedValues.length) && opts.quickPermittedValues.join("|").length < 40) {
      message = "Should be \"".concat(opts.quickPermittedValues.join("|"), "\".");
    } else if (Array.isArray(opts.permittedValues) && opts.permittedValues.length && opts.permittedValues.length < 6 && opts.permittedValues.every(function (val) {
      return typeof val === "string";
    }) && (!Array.isArray(opts.quickPermittedValues) || !opts.quickPermittedValues.length) && opts.permittedValues.join("|").length < 40) {
      message = "Should be \"".concat(opts.permittedValues.join("|"), "\".");
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
  var defaults = {
    canBeCommaSeparated: false,
    caseInsensitive: false,
    quickPermittedValues: null,
    permittedValues: null
  };
  var opts = Object.assign({}, defaults, originalOpts);
  var _checkForWhitespace = checkForWhitespace(str, idxOffset),
      charStart = _checkForWhitespace.charStart,
      charEnd = _checkForWhitespace.charEnd,
      errorArr = _checkForWhitespace.errorArr;
  if (Number.isInteger(charStart)) {
    if (opts.canBeCommaSeparated) {
      processCommaSeparated(str, {
        offset: idxOffset,
        oneSpaceAfterCommaOK: false,
        leadingWhitespaceOK: true,
        trailingWhitespaceOK: true,
        cb: function cb(idxFrom, idxTo) {
          var extractedValue = str.slice(idxFrom - idxOffset, idxTo - idxOffset);
          validateValue(str, idxOffset, opts, idxFrom - idxOffset,
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
      var extractedValue = str.slice(charStart, charEnd);
      validateValue(str, idxOffset, opts, charStart, charEnd, errorArr);
    }
  }
  return errorArr;
}

var wholeExtensionRegex = /^\.\w+$/g;
var isoDateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z/g;
var fontSizeRegex = /^[+-]?[1-7]$/;
var linkTypes = ["alternate", "appendix", "author", "bookmark", "chapter", "contents", "copyright", "external", "glossary", "help", "index", "license", "next", "nofollow", "noopener", "noreferrer", "prev", "search", "section", "start", "stylesheet", "subsection", "tag"];
var astErrMessages = {
  "tag-missing-opening": "Opening tag is missing.",
  "tag-void-frontal-slash": "Remove frontal slash."
};
function isLetter(str) {
  return typeof str === "string" && str.length === 1 && str.toUpperCase() !== str.toLowerCase();
}
function isAnEnabledValue(maybeARulesValue) {
  if (Number.isInteger(maybeARulesValue) && maybeARulesValue > 0) {
    return maybeARulesValue;
  } else if (Array.isArray(maybeARulesValue) && maybeARulesValue.length && Number.isInteger(maybeARulesValue[0]) && maybeARulesValue[0] > 0) {
    return maybeARulesValue[0];
  }
  return 0;
}
function isObj(something) {
  return something && _typeof(something) === "object" && !Array.isArray(something);
}
function isAnEnabledRule(config, ruleId) {
  if (isObj(config) && Object.prototype.hasOwnProperty.call(config, ruleId)) {
    return config[ruleId];
  } else if (ruleId.includes("-") && Object.prototype.hasOwnProperty.call(config, ruleId.split("-")[0])) {
    return config[ruleId.split("-")[0]];
  } else if (isObj(config) && Object.prototype.hasOwnProperty.call(config, "all")) {
    return config.all;
  }
  return 0;
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, "\n"]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

function badCharacterTabulation(context) {
  var mode = "never";
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  if (Array.isArray(originalOpts) && originalOpts[0] && typeof originalOpts[0] === "string" && originalOpts[0].toLowerCase() === "indentationisfine") {
    mode = "indentationIsFine";
  }
  return {
    character: function character(_ref) {
      var chr = _ref.chr,
          i = _ref.i;
      if (chr.charCodeAt(0) === 9) {
        if (mode === "never") {
          context.report({
            ruleId: "bad-character-tabulation",
            message: "Bad character - TABULATION.",
            idxFrom: i,
            idxTo: i + 1,
            fix: {
              ranges: [[i, i + 1, " "]]
            }
          });
        } else if (mode === "indentationIsFine") {
          var charTopOnBreaksIdx = stringLeftRight.leftStopAtNewLines(context.str, i);
          if (charTopOnBreaksIdx !== null && context.str[charTopOnBreaksIdx].trim().length) {
            context.report({
              ruleId: "bad-character-tabulation",
              message: "Bad character - TABULATION.",
              idxFrom: i,
              idxTo: i + 1,
              fix: {
                ranges: [[i, i + 1, " "]]
              }
            });
          }
        }
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

function badCharacterInformationSeparatorTwo(context) {
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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

function badCharacterInformationSeparatorTwo$1(context) {
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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

function badCharacterSingleShiftTwo(context) {
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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

function badCharacterSingleShiftTwo$1(context) {
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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1, " "]]
          }
        });
      }
    }
  };
}

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
            ranges: [[i, i + 1]]
          }
        });
      }
    }
  };
}

function tagSpaceAfterOpeningBracket(context) {
  return {
    tag: function tag(node) {
      var ranges = [];
      if (typeof context.str[node.start + 1] === "string" && !context.str[node.start + 1].trim().length) {
        ranges.push([node.start + 1, stringLeftRight.right(context.str, node.start + 1)]);
      }
      if (!context.str[node.tagNameStartsAt - 1].trim().length) {
        var charToTheLeftOfTagNameIdx = stringLeftRight.left(context.str, node.tagNameStartsAt);
        if (charToTheLeftOfTagNameIdx !== node.start) {
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

function tagSpaceBeforeClosingSlash(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }
  return {
    tag: function tag(node) {
      var gapValue = context.str.slice(node.start + 1, node.tagNameStartsAt);
      var mode = "never";
      if (Array.isArray(opts) && ["always", "never"].includes(opts[0])) {
        mode = opts[0];
      }
      var closingBracketPos = node.end - 1;
      var slashPos = stringLeftRight.left(context.str, closingBracketPos);
      var leftOfSlashPos = stringLeftRight.left(context.str, slashPos);
      if (mode === "never" && node["void"] && context.str[slashPos] === "/" && leftOfSlashPos < slashPos - 1) {
        context.report({
          ruleId: "tag-space-before-closing-slash",
          message: "Bad whitespace.",
          idxFrom: leftOfSlashPos + 1,
          idxTo: slashPos,
          fix: {
            ranges: [[leftOfSlashPos + 1, slashPos]]
          }
        });
      } else if (mode === "always" && node["void"] && context.str[slashPos] === "/" && leftOfSlashPos === slashPos - 1) {
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

function tagSpaceBetweenSlashAndBracket(context) {
  return {
    tag: function tag(node) {
      if (Number.isInteger(node.end) && context.str[node.end - 1] === ">" &&
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

var BACKSLASH = "\\";
function tagClosingBackslash(context) {
  return {
    tag: function tag(node) {
      var ranges = [];
      if (Number.isInteger(node.start) && Number.isInteger(node.tagNameStartsAt) && context.str.slice(node.start, node.tagNameStartsAt).includes(BACKSLASH)) {
        for (var i = node.start; i < node.tagNameStartsAt; i++) {
          if (context.str[i] === BACKSLASH) {
            ranges.push([i, i + 1]);
          }
        }
      }
      if (Number.isInteger(node.end) && context.str[node.end - 1] === ">" &&
      context.str[stringLeftRight.left(context.str, node.end - 1)] === BACKSLASH) {
        var message = node["void"] ? "Replace backslash with slash." : "Delete this.";
        var backSlashPos = stringLeftRight.left(context.str, node.end - 1);
        var idxFrom = stringLeftRight.left(context.str, backSlashPos) + 1;
        var whatToInsert = node["void"] ? "/" : "";
        if (context.processedRulesConfig["tag-space-before-closing-slash"] && (Number.isInteger(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"] > 0 || Array.isArray(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"][0] > 0 && context.processedRulesConfig["tag-space-before-closing-slash"][1] === "never")) {
          idxFrom = stringLeftRight.left(context.str, backSlashPos) + 1;
        }
        if (Array.isArray(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"][0] > 0 && context.processedRulesConfig["tag-space-before-closing-slash"][1] === "always") {
          idxFrom = stringLeftRight.left(context.str, backSlashPos) + 1;
          whatToInsert = " ".concat(whatToInsert);
          if (node["void"] && context.str[idxFrom + 1] === " ") {
            idxFrom++;
            whatToInsert = whatToInsert.trim();
          } else if (!node["void"]) {
            whatToInsert = whatToInsert.trim();
          }
        }
        if (node["void"] && Array.isArray(context.processedRulesConfig["tag-void-slash"]) && context.processedRulesConfig["tag-void-slash"][0] > 0 && context.processedRulesConfig["tag-void-slash"][1] === "never") {
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
      }
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

var BACKSLASH$1 = "\\";
function tagVoidSlash(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }
  return {
    tag: function tag(node) {
      var mode = "always";
      if (Array.isArray(opts) && ["always", "never"].includes(opts[0])) {
        mode = opts[0];
      }
      var closingBracketPos = node.end - 1;
      var slashPos = stringLeftRight.left(context.str, closingBracketPos);
      var leftOfSlashPos = stringLeftRight.left(context.str, slashPos);
      if (mode === "never" && node["void"] && context.str[slashPos] === "/") {
        context.report({
          ruleId: "tag-void-slash",
          message: "Remove the slash.",
          idxFrom: leftOfSlashPos + 1,
          idxTo: closingBracketPos,
          fix: {
            ranges: [[leftOfSlashPos + 1, closingBracketPos]]
          }
        });
      } else if (mode === "always" && node["void"] && context.str[slashPos] !== "/" && (
      !context.processedRulesConfig["tag-closing-backslash"] || !(context.str[slashPos] === BACKSLASH$1 && (Number.isInteger(context.processedRulesConfig["tag-closing-backslash"]) && context.processedRulesConfig["tag-closing-backslash"] > 0 || Array.isArray(context.processedRulesConfig["tag-closing-backslash"]) && context.processedRulesConfig["tag-closing-backslash"][0] > 0 && context.processedRulesConfig["tag-closing-backslash"][1] === "always")))) {
        if (Array.isArray(context.processedRulesConfig["tag-space-before-closing-slash"]) && context.processedRulesConfig["tag-space-before-closing-slash"][1] === "always") {
          if (context.str[slashPos + 1] === " ") {
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

function tagNameCase(context) {
  var knownUpperCaseTags = ["DOCTYPE", "CDATA"];
  return {
    tag: function tag(node) {
      if (node.tagName && node.recognised === true) {
        if (knownUpperCaseTags.includes(node.tagName.toUpperCase())) {
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
          }
        } else if (context.str.slice(node.tagNameStartsAt, node.tagNameEndsAt) !== node.tagName) {
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

function tagIsPresent(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }
  return {
    tag: function tag(node) {
      if (Array.isArray(opts) && opts.length) {
        var temp = matcher([node.tagName], opts);
        if (matcher([node.tagName], opts).length) {
          context.report({
            ruleId: "tag-is-present",
            message: "".concat(node.tagName, " is not allowed."),
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

function tagBold(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }
  return {
    tag: function tag(node) {
      var suggested = "strong";
      if (Array.isArray(opts) && typeof opts[0] === "string" && opts[0].toLowerCase() === "b") {
        suggested = "b";
      }
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

function tagBadSelfClosing(context) {
  return {
    tag: function tag(node) {
      if (!node["void"] && node.value.endsWith(">") && node.value[stringLeftRight.left(node.value, node.value.length - 1)] === "/") {
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

function attributeDuplicate(context) {
  return {
    tag: function tag(node) {
      if (Array.isArray(node.attribs) && node.attribs.length > 1) {
        var attrsGatheredSoFar = [];
        for (var i = 0, len = node.attribs.length; i < len; i++) {
          if (!attrsGatheredSoFar.includes(node.attribs[i].attribName)) {
            attrsGatheredSoFar.push(node.attribs[i].attribName);
          } else {
            context.report({
              ruleId: "attribute-duplicate",
              message: "Duplicate attribute \"".concat(node.attribs[i].attribName, "\"."),
              idxFrom: node.attribs[i].attribStart,
              idxTo: node.attribs[i].attribEnd,
              fix: null
            });
          }
        }
      }
    }
  };
}

function attributeMalformed(context) {
  var blacklist = ["doctype"];
  return {
    attribute: function attribute(node) {
      if (!node.attribNameRecognised && !node.attribName.startsWith("xmlns:") && !blacklist.includes(node.parent.tagName)) {
        var somethingMatched = false;
        for (var i = 0, len = htmlAllKnownAttributes.allHtmlAttribs.length; i < len; i++) {
          if (leven(htmlAllKnownAttributes.allHtmlAttribs[i], node.attribName) === 1) {
            context.report({
              ruleId: "attribute-malformed",
              message: "Probably meant \"".concat(htmlAllKnownAttributes.allHtmlAttribs[i], "\"."),
              idxFrom: node.attribNameStartsAt,
              idxTo: node.attribNameEndsAt,
              fix: {
                ranges: [[node.attribNameStartsAt, node.attribNameEndsAt, htmlAllKnownAttributes.allHtmlAttribs[i]]]
              }
            });
            somethingMatched = true;
            break;
          }
        }
        if (!somethingMatched) {
          context.report({
            ruleId: "attribute-malformed",
            message: "Unrecognised attribute \"".concat(node.attribName, "\"."),
            idxFrom: node.attribNameStartsAt,
            idxTo: node.attribNameEndsAt,
            fix: null
          });
        }
      }
      if (node.attribValueStartsAt !== null && context.str[node.attribNameEndsAt] !== "=") {
        context.report({
          ruleId: "attribute-malformed",
          message: "Equal is missing.",
          idxFrom: node.attribStart,
          idxTo: node.attribEnd,
          fix: {
            ranges: [[node.attribNameEndsAt, node.attribNameEndsAt, "="]]
          }
        });
      }
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
          message: "Quote".concat(ranges.length > 1 ? "s are" : " is", " missing."),
          idxFrom: node.attribStart,
          idxTo: node.attribEnd,
          fix: {
            ranges: ranges
          }
        });
      }
      if (node.attribOpeningQuoteAt !== null && node.attribNameEndsAt !== null) {
        var whatShouldHaveBeenSinceEqualCharacter = context.str.slice(node.attribNameEndsAt, node.attribOpeningQuoteAt);
        if ("\"'".includes(whatShouldHaveBeenSinceEqualCharacter.slice(-1)) && whatShouldHaveBeenSinceEqualCharacter.includes("=")) {
          context.report({
            ruleId: "attribute-malformed",
            message: "Deleted repeated opening quotes.",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            fix: {
              ranges: [[stringLeftRight.left(context.str, node.attribOpeningQuoteAt), node.attribOpeningQuoteAt]]
            }
          });
        }
      }
    }
  };
}

function attributeValidateAbbr(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "abbr") {
        if (!["td", "th"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-abbr",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-abbr"
          }));
        });
      }
    }
  };
}

var knownUnits = ["cm", "mm", "in", "px", "pt", "pc", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "%"];
var knownCharsets = ["adobe-standard-encoding", "adobe-symbol-encoding", "amiga-1251", "ansi_x3.110-1983", "asmo_449", "big5", "big5-hkscs", "bocu-1", "brf", "bs_4730", "bs_viewdata", "cesu-8", "cp50220", "cp51932", "csa_z243.4-1985-1", "csa_z243.4-1985-2", "csa_z243.4-1985-gr", "csn_369103", "dec-mcs", "din_66003", "dk-us", "ds_2089", "ebcdic-at-de", "ebcdic-at-de-a", "ebcdic-ca-fr", "ebcdic-dk-no", "ebcdic-dk-no-a", "ebcdic-es", "ebcdic-es-a", "ebcdic-es-s", "ebcdic-fi-se", "ebcdic-fi-se-a", "ebcdic-fr", "ebcdic-it", "ebcdic-pt", "ebcdic-uk", "ebcdic-us", "ecma-cyrillic", "es", "es2", "euc-kr", "extended_unix_code_fixed_width_for_japanese", "extended_unix_code_packed_format_for_japanese", "gb18030", "gb2312", "gb_1988-80", "gb_2312-80", "gbk", "gost_19768-74", "greek-ccitt", "greek7", "greek7-old", "hp-desktop", "hp-legal", "hp-math8", "hp-pi-font", "hp-roman8", "hz-gb-2312", "ibm-symbols", "ibm-thai", "ibm00858", "ibm00924", "ibm01140", "ibm01141", "ibm01142", "ibm01143", "ibm01144", "ibm01145", "ibm01146", "ibm01147", "ibm01148", "ibm01149", "ibm037", "ibm038", "ibm1026", "ibm1047", "ibm273", "ibm274", "ibm275", "ibm277", "ibm278", "ibm280", "ibm281", "ibm284", "ibm285", "ibm290", "ibm297", "ibm420", "ibm423", "ibm424", "ibm437", "ibm500", "ibm775", "ibm850", "ibm851", "ibm852", "ibm855", "ibm857", "ibm860", "ibm861", "ibm862", "ibm863", "ibm864", "ibm865", "ibm866", "ibm868", "ibm869", "ibm870", "ibm871", "ibm880", "ibm891", "ibm903", "ibm904", "ibm905", "ibm918", "iec_p27-1", "inis", "inis-8", "inis-cyrillic", "invariant", "iso-10646-j-1", "iso-10646-ucs-2", "iso-10646-ucs-4", "iso-10646-ucs-basic", "iso-10646-unicode-latin1", "iso-10646-utf-1", "iso-11548-1", "iso-2022-cn", "iso-2022-cn-ext", "iso-2022-jp", "iso-2022-jp-2", "iso-2022-kr", "iso-8859-1-windows-3.0-latin-1", "iso-8859-1-windows-3.1-latin-1", "iso-8859-10", "iso-8859-13", "iso-8859-14", "iso-8859-15", "iso-8859-16", "iso-8859-2-windows-latin-2", "iso-8859-9-windows-latin-5", "iso-ir-90", "iso-unicode-ibm-1261", "iso-unicode-ibm-1264", "iso-unicode-ibm-1265", "iso-unicode-ibm-1268", "iso-unicode-ibm-1276", "iso_10367-box", "iso_2033-1983", "iso_5427", "iso_5427:1981", "iso_5428:1980", "iso_646.basic:1983", "iso_646.irv:1983", "iso_6937-2-25", "iso_6937-2-add", "iso_8859-1:1987", "iso_8859-2:1987", "iso_8859-3:1988", "iso_8859-4:1988", "iso_8859-5:1988", "iso_8859-6-e", "iso_8859-6-i", "iso_8859-6:1987", "iso_8859-7:1987", "iso_8859-8-e", "iso_8859-8-i", "iso_8859-8:1988", "iso_8859-9:1989", "iso_8859-supp", "it", "jis_c6220-1969-jp", "jis_c6220-1969-ro", "jis_c6226-1978", "jis_c6226-1983", "jis_c6229-1984-a", "jis_c6229-1984-b", "jis_c6229-1984-b-add", "jis_c6229-1984-hand", "jis_c6229-1984-hand-add", "jis_c6229-1984-kana", "jis_encoding", "jis_x0201", "jis_x0212-1990", "jus_i.b1.002", "jus_i.b1.003-mac", "jus_i.b1.003-serb", "koi7-switched", "koi8-r", "koi8-u", "ks_c_5601-1987", "ksc5636", "kz-1048", "latin-greek", "latin-greek-1", "latin-lap", "macintosh", "microsoft-publishing", "mnem", "mnemonic", "msz_7795.3", "nats-dano", "nats-dano-add", "nats-sefi", "nats-sefi-add", "nc_nc00-10:81", "nf_z_62-010", "nf_z_62-010_(1973)", "ns_4551-1", "ns_4551-2", "osd_ebcdic_df03_irv", "osd_ebcdic_df04_1", "osd_ebcdic_df04_15", "pc8-danish-norwegian", "pc8-turkish", "pt", "pt2", "ptcp154", "scsu", "sen_850200_b", "sen_850200_c", "shift_jis", "t.101-g2", "t.61-7bit", "t.61-8bit", "tis-620", "tscii", "unicode-1-1", "unicode-1-1-utf-7", "unknown-8bit", "us-ascii", "us-dk", "utf-16", "utf-16be", "utf-16le", "utf-32", "utf-32be", "utf-32le", "utf-7", "utf-8", "ventura-international", "ventura-math", "ventura-us", "videotex-suppl", "viqr", "viscii", "windows-1250", "windows-1251", "windows-1252", "windows-1253", "windows-1254", "windows-1255", "windows-1256", "windows-1257", "windows-1258", "windows-31j", "windows-874"];
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
};
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

function attributeValidateAcceptCharset(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "accept-charset") {
        if (!["form"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-accept-charset",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue, node.attribValueStartsAt, {
          canBeCommaSeparated: true,
          noSpaceAfterComma: true,
          quickPermittedValues: ["UNKNOWN"],
          permittedValues: knownCharsets
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-accept-charset"
          }));
        });
      }
    }
  };
}

function attributeValidateAccept(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "accept") {
        if (!["form", "input"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-accept",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          quickPermittedValues: ["audio/*", "video/*", "image/*", "text/html", "image/png", "image/gif", "video/mpeg", "text/css", "audio/basic", wholeExtensionRegex],
          permittedValues: Object.keys(db),
          canBeCommaSeparated: true,
          noSpaceAfterComma: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["a", "area", "button", "input", "label", "legend", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-accesskey",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr,
            trimmedVal = _checkForWhitespace.trimmedVal;
        if (Number.isInteger(charStart)) {
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
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-accesskey"
          }));
        });
      }
    }
  };
}

function splitByWhitespace(str, cbValues, cbWhitespace, originalOpts) {
  var defaults = {
    offset: 0,
    from: 0,
    to: str.length
  };
  var opts = Object.assign({}, defaults, originalOpts);
  var nameStartsAt = null;
  var whitespaceStartsAt = null;
  for (var i = opts.from; i < opts.to; i++) {
    if (whitespaceStartsAt === null && !str[i].trim().length) {
      whitespaceStartsAt = i;
    }
    if (whitespaceStartsAt !== null && (str[i].trim().length || i + 1 === opts.to)) {
      if (typeof cbWhitespace === "function") {
        cbWhitespace([whitespaceStartsAt + opts.offset, (str[i].trim().length ? i : i + 1) + opts.offset]);
      }
      whitespaceStartsAt = null;
    }
    if (nameStartsAt === null && str[i].trim().length) {
      nameStartsAt = i;
    }
    if (nameStartsAt !== null && (!str[i].trim().length || i + 1 === opts.to)) {
      if (typeof cbValues === "function") {
        cbValues([nameStartsAt + opts.offset, (i + 1 === opts.to ? i + 1 : i) + opts.offset]);
      }
      nameStartsAt = null;
    }
  }
}

function isSingleSpace(str, originalOpts, errorArr) {
  var defaults = {
    from: 0,
    to: str.length,
    offset: 0
  };
  var opts = Object.assign({}, defaults, originalOpts);
  if (str.slice(opts.from, opts.to) !== " ") {
    var ranges;
    if (str[opts.from] === " ") {
      ranges = [[opts.offset + opts.from + 1, opts.offset + opts.to]];
    } else if (str[opts.to - 1] === " ") {
      ranges = [[opts.offset + opts.from, opts.offset + opts.to - 1]];
    } else {
      ranges = [[opts.offset + opts.from, opts.offset + opts.to, " "]];
    }
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
    attribStart: 0,
    attribEnd: str.length
  };
  var opts = Object.assign({}, defaults, originalOpts);
  var extractedValue = str.slice(opts.from, opts.to);
  var calcultedIsRel = isRel(extractedValue);
  if (Array.from(extractedValue).some(function (val) {
    return !val.trim().length;
  })) {
    var ranges = [];
    var foundCharacterRanges = [];
    splitByWhitespace(extractedValue, function (valueRangeArr) {
      foundCharacterRanges.push(valueRangeArr);
    }, function (whitespaceRangeArr) {
      ranges.push(whitespaceRangeArr);
    }, originalOpts);
    var countOfURIs = foundCharacterRanges.reduce(function (acc, curr) {
      if (extractedValue.slice(curr[0] - opts.offset, curr[1] - opts.offset).match(urlRegex({
        exact: true
      }))) {
        return acc + 1;
      }
      return acc;
    }, 0);
    var valueWithoutWhitespace = foundCharacterRanges.reduce(function (acc, curr) {
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
  } else if (!(urlRegex({
    exact: true
  }).test(extractedValue) || calcultedIsRel.res)) {
    var message = "Should be an URI.";
    var idxFrom = opts.offset + opts.from;
    var idxTo = opts.offset + opts.to;
    var whatCouldBeExtractedAtAllFromRegex = extractedValue.match(urlRegex());
    if (Array.isArray(whatCouldBeExtractedAtAllFromRegex)) {
      if (whatCouldBeExtractedAtAllFromRegex.length > 1 && !opts.multipleOK) {
        message = "There should be only one URI.";
      } else {
        message = "URI's should be separated with a single space.";
      }
      idxFrom = opts.offset + opts.attribStart;
      idxTo = opts.offset + opts.attribEnd;
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
  var opts = Object.assign({}, defaults, originalOpts);
  var _checkForWhitespace = checkForWhitespace(str, opts.offset),
      charStart = _checkForWhitespace.charStart,
      charEnd = _checkForWhitespace.charEnd,
      errorArr = _checkForWhitespace.errorArr;
  if (Number.isInteger(charStart)) {
    if (opts.multipleOK) {
      if (opts.separator === "space") {
        splitByWhitespace(str, function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              charFrom = _ref2[0],
              charTo = _ref2[1];
          var extractedName = str.slice(charFrom, charTo);
          if (extractedName.endsWith(",") && extractedName.length > 1) {
            errorArr.push({
              idxFrom: opts.offset + charTo - 1,
              idxTo: opts.offset + charTo,
              message: "No commas.",
              fix: null
            });
          } else {
            validateValue$1(str, Object.assign({}, opts, {
              from: charFrom,
              to: charTo,
              attribStart: charStart,
              attribEnd: charEnd,
              offset: opts.offset
            }), errorArr);
          }
        }, function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              whitespaceFrom = _ref4[0],
              whitespaceTo = _ref4[1];
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
        processCommaSeparated(str, {
          offset: opts.offset,
          oneSpaceAfterCommaOK: false,
          leadingWhitespaceOK: true,
          trailingWhitespaceOK: true,
          cb: function cb(idxFrom, idxTo) {
            var extractedValue = str.slice(idxFrom - opts.offset, idxTo - opts.offset);
            validateValue$1(str, Object.assign({}, opts, {
              from: idxFrom - opts.offset,
              to: idxTo - opts.offset,
              attribStart: charStart,
              attribEnd: charEnd,
              offset: opts.offset
            }), errorArr);
          },
          errCb: function errCb(ranges, message) {
            var fix = {
              ranges: ranges
            };
            if (!str[ranges[0][0] - opts.offset].trim().length && str[ranges[0][0] - opts.offset - 1] && charStart < ranges[0][0] - 1 && (opts.separator === "space" || str[ranges[0][0] - opts.offset - 1] !== "," && str[ranges[0][1] - opts.offset] !== ",")) {
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
    } else {
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
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-action",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (!["applet", "caption", "iframe", "img", "input", "object", "legend", "table", "hr", "div", "h1", "h2", "h3", "h4", "h5", "h6", "p", "col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-align",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = [];
        if (["legend", "caption"].includes(node.parent.tagName.toLowerCase())) {
          errorArr = validateString(node.attribValue,
          node.attribValueStartsAt,
          {
            permittedValues: ["top", "bottom", "left", "right"],
            canBeCommaSeparated: false
          });
        } else if (["applet", "iframe", "img", "input", "object"].includes(node.parent.tagName.toLowerCase())) {
          errorArr = validateString(node.attribValue,
          node.attribValueStartsAt,
          {
            permittedValues: ["top", "middle", "bottom", "left", "right"],
            canBeCommaSeparated: false
          });
        } else if (["table", "hr"].includes(node.parent.tagName.toLowerCase())) {
          errorArr = validateString(node.attribValue,
          node.attribValueStartsAt,
          {
            permittedValues: ["left", "center", "right"],
            canBeCommaSeparated: false
          });
        } else if (["div", "h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(node.parent.tagName.toLowerCase())) {
          errorArr = validateString(node.attribValue,
          node.attribValueStartsAt,
          {
            permittedValues: ["left", "center", "right", "justify"],
            canBeCommaSeparated: false
          });
        } else if (["col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName.toLowerCase())) {
          errorArr = validateString(node.attribValue,
          node.attribValueStartsAt,
          {
            permittedValues: ["left", "center", "right", "justify", "char"],
            canBeCommaSeparated: false
          });
        }
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-align"
          }));
        });
      }
    }
  };
}

function validateColor(str, idxOffset, opts) {
  var _checkForWhitespace = checkForWhitespace(str, idxOffset),
      charStart = _checkForWhitespace.charStart,
      charEnd = _checkForWhitespace.charEnd,
      errorArr = _checkForWhitespace.errorArr;
  if (Number.isInteger(charStart)) {
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
    attribute: function attribute(node) {
      if (node.attribName === "alink") {
        if (node.parent.tagName !== "body") {
          context.report({
            ruleId: "attribute-validate-alink",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateColor(node.attribValue, node.attribValueStartsAt, {
          namedCssLevel1OK: true,
          namedCssLevel2PlusOK: true,
          hexThreeOK: false,
          hexFourOK: false,
          hexSixOK: true,
          hexEightOK: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-alink"
          }));
        });
      }
    }
  };
}

function attributeValidateAlt(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "alt") {
        if (!["applet", "area", "img", "input"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-alt",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-alt"
          }));
        });
      }
    }
  };
}

function attributeValidateArchive(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "archive") {
        if (!["applet", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-archive",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          if (node.parent.tagName === "applet") {
            validateUri(node.attribValue, {
              offset: node.attribValueStartsAt,
              separator: "comma",
              multipleOK: true
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-archive"
              }));
            });
          } else if (node.parent.tagName === "object") {
            validateUri(node.attribValue, {
              offset: node.attribValueStartsAt,
              separator: "space",
              multipleOK: true
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-archive"
              }));
            });
          }
        }
      }
    }
  };
}

function attributeValidateAxis(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "axis") {
        if (!["td", "th"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-axis",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-axis"
          }));
        });
      }
    }
  };
}

function attributeValidateBackground(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "background") {
        if (!["body", "td"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-background",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
    attribute: function attribute(node) {
      if (node.attribName === "bgcolor") {
        if (!["table", "tr", "td", "th", "body"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-bgcolor",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateColor(node.attribValue, node.attribValueStartsAt, {
          namedCssLevel1OK: true,
          namedCssLevel2PlusOK: true,
          hexThreeOK: false,
          hexFourOK: false,
          hexSixOK: true,
          hexEightOK: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-bgcolor"
          }));
        });
      }
    }
  };
}

function validateValue$2(_ref) {
  var str = _ref.str,
      opts = _ref.opts,
      charStart = _ref.charStart,
      charEnd = _ref.charEnd,
      idxOffset = _ref.idxOffset,
      errorArr = _ref.errorArr;
  if (str[charStart] === "0") {
    if (charEnd === charStart + 1) {
      if (!opts.zeroOK) {
        errorArr.push({
          idxFrom: idxOffset + charStart,
          idxTo: idxOffset + charEnd,
          message: "Zero not allowed.",
          fix: null
        });
      }
    } else {
      if ("0123456789".includes(str[charStart + 1])) {
        errorArr.push({
          idxFrom: idxOffset + charStart,
          idxTo: idxOffset + charEnd,
          message: "Number padded with zero.",
          fix: null
        });
      }
    }
  }
  if (!"0123456789".includes(str[charStart]) && !"0123456789".includes(str[charEnd - 1])) {
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
        message: "Maximum, ".concat(opts.maxValue, " exceeded."),
        fix: null
      });
    }
  } else {
    for (var i = charStart; i < charEnd; i++) {
      if (!"0123456789".includes(str[i]) && (str[i] !== "." || opts.type !== "rational") && (str[i] !== "-" || !(opts.negativeOK && i === 0)) && (str[i] !== "+" || !(opts.plusOK && i === 0))) {
        var endPart = str.slice(i, charEnd);
        if (isObj(opts) && (Array.isArray(opts.theOnlyGoodUnits) && !opts.theOnlyGoodUnits.includes(endPart) || Array.isArray(opts.badUnits) && opts.badUnits.includes(endPart))) {
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
            var _message2 = "Bad unit.";
            if (str.match(/-\s*-/g)) {
              _message2 = "Repeated minus.";
            } else if (str.match(/\+\s*\+/g)) {
              _message2 = "Repeated plus.";
            } else if (Array.isArray(opts.theOnlyGoodUnits) && opts.theOnlyGoodUnits.length && opts.theOnlyGoodUnits.includes(endPart.trim())) {
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
        }
        break;
      }
    }
  }
}
function validateDigitAndUnit(str, idxOffset, originalOpts) {
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
  var opts = Object.assign({}, defaultOpts, originalOpts);
  var charStart = 0;
  var charEnd = str.length;
  var errorArr = [];
  if (!opts.skipWhitespaceChecks) {
    var retrievedWhitespaceChecksObj = checkForWhitespace(str, idxOffset);
    charStart = retrievedWhitespaceChecksObj.charStart;
    charEnd = retrievedWhitespaceChecksObj.charEnd;
    errorArr = retrievedWhitespaceChecksObj.errorArr;
  }
  if (Number.isInteger(charStart)) {
    if (opts.canBeCommaSeparated) {
      var extractedValues = [];
      processCommaSeparated(str, {
        offset: idxOffset,
        oneSpaceAfterCommaOK: false,
        leadingWhitespaceOK: true,
        trailingWhitespaceOK: true,
        cb: function cb(idxFrom, idxTo) {
          var extractedValue = str.slice(idxFrom - idxOffset, idxTo - idxOffset);
          if (!Array.isArray(opts.whitelistValues) || !opts.whitelistValues.includes(extractedValue)) {
            validateValue$2({
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
      });
      if (Number.isInteger(opts.enforceCount) && extractedValues.length !== opts.enforceCount) {
        errorArr.push({
          idxFrom: charStart + idxOffset,
          idxTo: charEnd + idxOffset,
          message: "There should be ".concat(opts.enforceCount, " values."),
          fix: null
        });
      } else if (typeof opts.enforceCount === "string" && ["even", "odd", "uneven", "noneven"].includes(opts.enforceCount.toLowerCase())) {
        if (opts.enforceCount.toLowerCase() === "even" && extractedValues.length % 2 !== 0) {
          errorArr.push({
            idxFrom: charStart + idxOffset,
            idxTo: charEnd + idxOffset,
            message: "Should be an even number of values but found ".concat(extractedValues.length, "."),
            fix: null
          });
        } else if (opts.enforceCount.toLowerCase() !== "even" && extractedValues.length % 2 === 0) {
          errorArr.push({
            idxFrom: charStart + idxOffset,
            idxTo: charEnd + idxOffset,
            message: "Should be an odd number of values but found ".concat(extractedValues.length, "."),
            fix: null
          });
        }
      }
    } else {
      if (!Array.isArray(opts.whitelistValues) || !opts.whitelistValues.includes(str.slice(charStart, charEnd))) {
        validateValue$2({
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
    attribute: function attribute(node) {
      if (node.attribName === "border") {
        if (!["table", "img", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-border",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          negativeOK: false,
          theOnlyGoodUnits: []
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-border"
          }));
        });
      }
    }
  };
}

function attributeValidateCellpadding(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "cellpadding") {
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-cellpadding",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          negativeOK: false,
          theOnlyGoodUnits: ["%"],
          badUnits: ["px"],
          customGenericValueError: "Should be integer, either no units or percentage."
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-cellpadding"
          }));
        });
      }
    }
  };
}

function attributeValidateCellspacing(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "cellspacing") {
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-cellspacing",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          negativeOK: false,
          theOnlyGoodUnits: ["%"],
          badUnits: ["px"],
          customGenericValueError: "Should be integer, either no units or percentage."
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-char",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr,
            trimmedVal = _checkForWhitespace.trimmedVal;
        if (Number.isInteger(charStart)) {
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
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-char"
          }));
        });
      }
    }
  };
}

function attributeValidateCharoff(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "charoff") {
        if (!["col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-charoff",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          negativeOK: true,
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units."
        });
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
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-charoff"
          }));
        });
      }
    }
  };
}

function attributeValidateCharset(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "charset") {
        if (!["a", "link", "script"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-charset",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue, node.attribValueStartsAt, {
          canBeCommaSeparated: false,
          noSpaceAfterComma: false,
          quickPermittedValues: [],
          permittedValues: knownCharsets
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-charset"
          }));
        });
      }
    }
  };
}

function validateVoid(node, context, errorArr, originalOpts) {
  var defaults = {
    xhtml: false,
    enforceSiblingAttributes: null
  };
  var opts = Object.assign({}, defaults, originalOpts);
  if (opts.xhtml) {
    var quotesType = "\"";
    if (node.attribOpeningQuoteAt !== null && context.str[node.attribOpeningQuoteAt] === "'") {
      quotesType = "'";
    } else if (node.attribClosingQuoteAt !== null && context.str[node.attribClosingQuoteAt] === "'") {
      quotesType = "'";
    }
    if (node.attribValue !== node.attribName || context.str.slice(node.attribNameEndsAt, node.attribEnd) !== "=".concat(quotesType).concat(node.attribName).concat(quotesType)) {
      errorArr.push({
        idxFrom: node.attribNameStartsAt,
        idxTo: node.attribNameEndsAt,
        message: "It's XHTML, add value, =\"".concat(node.attribName, "\"."),
        fix: {
          ranges: [[node.attribNameEndsAt, node.attribEnd, "=".concat(quotesType).concat(node.attribName).concat(quotesType)]]
        }
      });
    }
  } else if (node.attribValue !== null) {
    errorArr.push({
      idxFrom: node.attribNameEndsAt,
      idxTo: node.attribEnd,
      message: "Should have no value.",
      fix: {
        ranges: [[node.attribNameEndsAt, node.attribEnd]]
      }
    });
  }
  if (isObj(opts.enforceSiblingAttributes) && Object.keys(opts.enforceSiblingAttributes).length) {
    Object.keys(opts.enforceSiblingAttributes).forEach(function (siblingAttr) {
      if (Array.isArray(node.parent.attribs) && !node.parent.attribs.some(function (attribObj) {
        return attribObj.attribName === siblingAttr;
      })) {
        errorArr.push({
          idxFrom: node.parent.start,
          idxTo: node.parent.end,
          message: "Should have attribute \"".concat(siblingAttr, "\"."),
          fix: null
        });
      } else if (opts.enforceSiblingAttributes[siblingAttr] && Array.isArray(opts.enforceSiblingAttributes[siblingAttr]) && Array.isArray(node.parent.attribs) && !node.parent.attribs.some(function (attribObj) {
        return attribObj.attribName === siblingAttr && opts.enforceSiblingAttributes[siblingAttr].includes(attribObj.attribValue);
      })) {
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
          message: "Only tags with ".concat(opts.enforceSiblingAttributes[siblingAttr].map(function (val) {
            return "\"".concat(val, "\"");
          }).join(" or "), " attributes can be ").concat(node.attribName, "."),
          fix: null
        });
      }
    });
  }
  return errorArr;
}

function attributeValidateChecked(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "checked") {
        if (node.parent.tagName !== "input") {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: {
              type: ["checkbox", "radio"]
            }
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (!["blockquote", "q", "del", "ins"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-cite",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
  var opts = Object.assign({}, defaults, originalOpts);
  var listOfUniqueNames = [];
  splitByWhitespace(
  str,
  function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        charFrom = _ref2[0],
        charTo = _ref2[1];
    var extractedName = str.slice(charFrom, charTo);
    if (!classNameRegex.test(extractedName)) {
      errorArr.push({
        idxFrom: charFrom,
        idxTo: charTo,
        message: "Wrong ".concat(opts.typeName, " name."),
        fix: null
      });
    }
    if (!listOfUniqueNames.includes(extractedName)) {
      listOfUniqueNames.push(extractedName);
    } else {
      var deleteFrom = charFrom;
      var deleteTo = charTo;
      var nonWhitespaceCharOnTheRight = stringLeftRight.right(str, deleteTo);
      if (deleteTo >= opts.to || !nonWhitespaceCharOnTheRight || nonWhitespaceCharOnTheRight > opts.to) {
        deleteFrom = stringLeftRight.left(str, charFrom) + 1;
      } else {
        deleteTo = nonWhitespaceCharOnTheRight;
      }
      errorArr.push({
        idxFrom: charFrom,
        idxTo: charTo,
        message: "Duplicate ".concat(opts.typeName, " \"").concat(extractedName, "\"."),
        fix: {
          ranges: [[deleteFrom, deleteTo]]
        }
      });
    }
  },
  function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        whitespaceFrom = _ref4[0],
        whitespaceTo = _ref4[1];
    return isSingleSpace(str, {
      from: whitespaceFrom,
      to: whitespaceTo,
      offset: opts.offset
    }, errorArr);
  },
  opts
  );
}

function attributeValidateClass(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "class") {
        if (["base", "basefont", "head", "html", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-class",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
              charStart = _checkForWhitespace.charStart,
              charEnd = _checkForWhitespace.charEnd,
              errorArr = _checkForWhitespace.errorArr;
          checkClassOrIdValue(context.str, {
            typeName: node.attribName,
            from: node.attribValueStartsAt + charStart,
            to: node.attribValueStartsAt + charEnd,
            offset: 0
          }, errorArr
          );
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-class"
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
      if (node.attribName === "classid") {
        if (node.parent.tagName !== "object") {
          context.report({
            ruleId: "attribute-validate-classid",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-classid"
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
      if (node.attribName === "clear") {
        if (node.parent.tagName !== "br") {
          context.report({
            ruleId: "attribute-validate-clear",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr;
        if (!["left", "all", "right", "none"].includes(context.str.slice(node.attribValueStartsAt + charStart, node.attribValueStartsAt + charEnd))) {
          errorArr.push({
            idxFrom: node.attribValueStartsAt + charStart,
            idxTo: node.attribValueStartsAt + charEnd,
            message: "Should be: left|all|right|none.",
            fix: null
          });
        }
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "applet") {
          context.report({
            ruleId: "attribute-validate-code",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-code"
          }));
        });
      }
    }
  };
}

function attributeValidateCodebase(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "codebase") {
        if (!["applet", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-codebase",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "object") {
          context.report({
            ruleId: "attribute-validate-codetype",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          quickPermittedValues: ["application/javascript", "application/json", "application/x-www-form-urlencoded", "application/xml", "application/zip", "application/pdf", "application/sql", "application/graphql", "application/ld+json", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.oasis.opendocument.text", "application/zstd", "audio/mpeg", "audio/ogg", "multipart/form-data", "text/css", "text/html", "text/xml", "text/csv", "text/plain", "image/png", "image/jpeg", "image/gif", "application/vnd.api+json"],
          permittedValues: Object.keys(db),
          canBeCommaSeparated: false,
          noSpaceAfterComma: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-codetype"
          }));
        });
      }
    }
  };
}

function attributeValidateColor(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "color") {
        if (!["basefont", "font"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-color",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateColor(node.attribValue, node.attribValueStartsAt, {
          namedCssLevel1OK: true,
          namedCssLevel2PlusOK: true,
          hexThreeOK: false,
          hexFourOK: false,
          hexSixOK: true,
          hexEightOK: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-color"
          }));
        });
      }
    }
  };
}

function attributeValidateCols(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "cols") {
        if (!["frameset", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-cols",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = [];
        if (node.parent.tagName === "frameset") {
          errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
            whitelistValues: ["*"],
            theOnlyGoodUnits: ["%"],
            badUnits: ["px"],
            noUnitsIsFine: true,
            canBeCommaSeparated: true,
            type: "rational",
            customGenericValueError: "Should be: pixels|%|*."
          });
        } else if (node.parent.tagName === "textarea") {
          errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
            type: "integer",
            theOnlyGoodUnits: [],
            customGenericValueError: "Should be integer, no units."
          });
        }
        if (Array.isArray(errorArr) && errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-cols"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateColspan(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "colspan") {
        if (!["th", "td"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-colspan",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units."
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-colspan"
          }));
        });
      }
    }
  };
}

function attributeValidateCompact(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "compact") {
        if (!["dir", "dl", "menu", "ol", "ul"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "meta") {
          context.report({
            ruleId: "attribute-validate-content",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-content"
          }));
        });
      }
    }
  };
}

function attributeValidateCoords(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "coords") {
        if (!["area", "a"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-coords",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          if (!Array.isArray(node.parent.attribs) || !node.parent.attribs.length || !node.parent.attribs.some(function (attrObj) {
            return attrObj.attribName === "shape";
          })) {
            context.report({
              ruleId: "attribute-validate-coords",
              idxFrom: node.parent.start,
              idxTo: node.parent.end,
              message: "Missing \"shape\" attribute.",
              fix: null
            });
          } else {
            var shapeAttr = node.parent.attribs.filter(function (attrObj) {
              return attrObj.attribName === "shape";
            })[0];
            var enforceCount = null;
            if (shapeAttr.attribValue === "rect") {
              enforceCount = 4;
            } else if (shapeAttr.attribValue === "circle") {
              enforceCount = 3;
            } else if (shapeAttr.attribValue === "poly") {
              enforceCount = "even";
            }
            var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
              whitelistValues: null,
              theOnlyGoodUnits: [],
              badUnits: null,
              noUnitsIsFine: true,
              canBeCommaSeparated: true,
              enforceCount: enforceCount,
              type: "integer",
              customGenericValueError: "Should be integer, no units."
            });
            if (Array.isArray(errorArr) && errorArr.length) {
              errorArr.forEach(function (errorObj) {
                context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "object") {
          context.report({
            ruleId: "attribute-validate-data",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (!["del", "ins"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-datetime",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          quickPermittedValues: [isoDateRegex],
          permittedValues: null,
          canBeCommaSeparated: false,
          noSpaceAfterComma: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-datetime"
          }));
        });
      }
    }
  };
}

function attributeValidateDeclare(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "declare") {
        if (node.parent.tagName !== "object") {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-declare"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateDefer(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "defer") {
        if (node.parent.tagName !== "script") {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (["applet", "base", "basefont", "br", "frame", "frameset", "iframe", "param", "script"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-dir",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["ltr", "rtl"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-dir"
          }));
        });
      }
    }
  };
}

function attributeValidateDisabled(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "disabled") {
        if (!["button", "input", "optgroup", "option", "select", "textarea"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-enctype",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          quickPermittedValues: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
          permittedValues: Object.keys(db),
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "font") {
          context.report({
            ruleId: "attribute-validate-face",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-face"
          }));
        });
      }
    }
  };
}

function attributeValidateFor(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "for") {
        if (node.parent.tagName !== "label") {
          context.report({
            ruleId: "attribute-validate-for",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
              charStart = _checkForWhitespace.charStart,
              charEnd = _checkForWhitespace.charEnd,
              errorArr = _checkForWhitespace.errorArr;
          var extractedValue = node.attribValue.slice(charStart, charEnd);
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
              var firstHashAt = node.attribValue.indexOf("#");
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
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-frame",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["void",
          "above",
          "below",
          "hsides",
          "lhs",
          "rhs",
          "vsides",
          "box",
          "border"
          ],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-frameborder",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["0", "1"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["td", "th"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-headers",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
              charStart = _checkForWhitespace.charStart,
              charEnd = _checkForWhitespace.charEnd,
              errorArr = _checkForWhitespace.errorArr;
          checkClassOrIdValue(context.str, {
            typeName: "id",
            from: node.attribValueStartsAt + charStart,
            to: node.attribValueStartsAt + charEnd,
            offset: 0
          }, errorArr
          );
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (!["iframe", "td", "th", "img", "object", "applet"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-height",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          badUnits: ["px"],
          theOnlyGoodUnits: ["%"],
          noUnitsIsFine: true,
          customGenericValueError: "Should be \"pixels|%\"."
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["a", "area", "link", "base"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-href",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-href"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateHreflang(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "hreflang") {
        if (!["a", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-hreflang",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr;
        var _isLangCode = isLangCode(node.attribValue.slice(charStart, charEnd)),
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
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-hreflang"
          }));
        });
      }
    }
  };
}

function attributeValidateHspace(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "hspace") {
        if (!["applet", "img", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-hspace",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          theOnlyGoodUnits: [],
          noUnitsIsFine: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "meta") {
          context.report({
            ruleId: "attribute-validate-http-equiv",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["content-type", "default-style", "refresh"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (["base", "head", "html", "meta", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-id",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
              charStart = _checkForWhitespace.charStart,
              charEnd = _checkForWhitespace.charEnd,
              errorArr = _checkForWhitespace.errorArr;
          checkClassOrIdValue(context.str, {
            typeName: node.attribName,
            from: node.attribValueStartsAt + charStart,
            to: node.attribValueStartsAt + charEnd,
            offset: 0
          }, errorArr
          );
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-id"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateIsmap(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "ismap") {
        if (!["img", "input"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (!["option", "optgroup"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-label",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-label"
          }));
        });
      }
    }
  };
}

function attributeValidateLang(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "lang") {
        if (["base", "head", "html", "meta", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-lang",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr;
        var _isLangCode = isLangCode(node.attribValue.slice(charStart, charEnd)),
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
          context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "script") {
          context.report({
            ruleId: "attribute-validate-language",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-language"
          }));
        });
      }
    }
  };
}

function attributeValidateLink(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "link") {
        if (node.parent.tagName !== "body") {
          context.report({
            ruleId: "attribute-validate-link",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateColor(node.attribValue, node.attribValueStartsAt, {
          namedCssLevel1OK: true,
          namedCssLevel2PlusOK: true,
          hexThreeOK: false,
          hexFourOK: false,
          hexSixOK: true,
          hexEightOK: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-link"
          }));
        });
      }
    }
  };
}

function attributeValidateLongdesc(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "longdesc") {
        if (!["img", "frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-longdesc",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-longdesc"
          }));
        });
      }
    }
  };
}

function attributeValidateMarginheight(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "marginheight") {
        if (!["frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-marginheight",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          theOnlyGoodUnits: [],
          noUnitsIsFine: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-marginheight"
          }));
        });
      }
    }
  };
}

function attributeValidateMarginwidth(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "marginwidth") {
        if (!["frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-marginwidth",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          theOnlyGoodUnits: [],
          noUnitsIsFine: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-marginwidth"
          }));
        });
      }
    }
  };
}

function attributeValidateMaxlength(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "maxlength") {
        if (node.parent.tagName !== "input") {
          context.report({
            ruleId: "attribute-validate-maxlength",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units."
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-maxlength"
          }));
        });
      }
    }
  };
}

function attributeValidateMedia(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "media") {
        if (!["style", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-media",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            charStart = _checkForWhitespace.charStart,
            charEnd = _checkForWhitespace.charEnd,
            errorArr = _checkForWhitespace.errorArr;
        errorArr.concat(isMediaD(node.attribValue.slice(charStart, charEnd), {
          offset: node.attribValueStartsAt
        })).forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-method",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["get", "post"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-method"
          }));
        });
      }
    }
  };
}

function attributeValidateMultiple(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "multiple") {
        if (node.parent.tagName !== "select") {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (!["button", "textarea", "applet", "select", "form", "frame", "iframe", "img", "a", "input", "object", "map", "param", "meta"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-name",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-name"
          }));
        });
      }
    }
  };
}

function attributeValidateNohref(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "nohref") {
        if (node.parent.tagName !== "area") {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-nohref"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateNoresize(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "noresize") {
        if (node.parent.tagName !== "frame") {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-noresize"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateNoshade(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "noshade") {
        if (node.parent.tagName !== "hr") {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-noshade"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateNowrap(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "nowrap") {
        if (!["td", "th"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-nowrap"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateObject(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "object") {
        if (node.parent.tagName !== "applet") {
          context.report({
            ruleId: "attribute-validate-object",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-object"
          }));
        });
      }
    }
  };
}

function validateScript(str, idxOffset, opts) {
  var _checkForWhitespace = checkForWhitespace(str, idxOffset),
      errorArr = _checkForWhitespace.errorArr;
  return errorArr;
}

function attributeValidateOnblur(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onblur") {
        if (!["a", "area", "button", "input", "label", "select", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onblur",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onblur"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnchange(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onchange") {
        if (!["input", "select", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onchange",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onchange"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnclick(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onclick") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onclick",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onclick"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOndblclick(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "ondblclick") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-ondblclick",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-ondblclick"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnfocus(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onfocus") {
        if (!["a", "area", "button", "input", "label", "select", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onfocus",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onfocus"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnkeydown(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onkeydown") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onkeydown",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onkeydown"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnkeypress(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onkeypress") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onkeypress",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onkeypress"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnkeyup(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onkeyup") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onkeyup",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onkeyup"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnload(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onload") {
        if (!["frameset", "body"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onload",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onload"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnmousedown(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onmousedown") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmousedown",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onmousedown"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnmousemove(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onmousemove") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmousemove",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onmousemove"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnmouseout(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onmouseout") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmouseout",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onmouseout"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnmouseover(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onmouseover") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmouseover",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onmouseover"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnmouseup(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onmouseup") {
        if (["applet", "base", "basefont", "bdo", "br", "font", "frame", "frameset", "head", "html", "iframe", "isindex", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onmouseup",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onmouseup"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnreset(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onreset") {
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-onreset",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onreset"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnsubmit(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onsubmit") {
        if (node.parent.tagName !== "form") {
          context.report({
            ruleId: "attribute-validate-onsubmit",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onsubmit"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnselect(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onselect") {
        if (!["input", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onselect",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onselect"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateOnunload(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = Object.assign({}, originalOpts);
      if (node.attribName === "onunload") {
        if (!["frameset", "body"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-onunload",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var errorArr = validateScript(node.attribValue, node.attribValueStartsAt);
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-onunload"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateProfile(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "profile") {
        if (node.parent.tagName !== "head") {
          context.report({
            ruleId: "attribute-validate-profile",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: true
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-profile"
            }));
          });
        }
      }
    }
  };
}

function attributeValidatePrompt(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "prompt") {
        if (node.parent.tagName !== "isindex") {
          context.report({
            ruleId: "attribute-validate-prompt",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-prompt"
          }));
        });
      }
    }
  };
}

function attributeValidateReadonly(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "readonly") {
        if (!["textarea", "input"].includes(node.parent.tagName)) {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-readonly"
            }));
          });
        }
      }
    }
  };
}

function attributeValidateRel(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var caseInsensitive = !Array.isArray(opts) || !opts.includes("enforceLowercase");
      if (node.attribName === "rel") {
        if (!["a", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-rel",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: linkTypes,
          canBeCommaSeparated: false,
          caseInsensitive: caseInsensitive
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-rel"
          }));
        });
      }
    }
  };
}

function attributeValidateRev(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var caseInsensitive = !Array.isArray(opts) || !opts.includes("enforceLowercase");
      if (node.attribName === "rev") {
        if (!["a", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-rev",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: linkTypes,
          canBeCommaSeparated: false,
          caseInsensitive: caseInsensitive
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-rev"
          }));
        });
      }
    }
  };
}

function attributeValidateRows(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "rows") {
        if (!["frameset", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-rows",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = [];
        if (node.parent.tagName === "frameset") {
          errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
            whitelistValues: ["*"],
            theOnlyGoodUnits: ["%"],
            badUnits: ["px"],
            noUnitsIsFine: true,
            canBeCommaSeparated: true,
            type: "rational",
            customGenericValueError: "Should be: pixels|%|*."
          });
        } else if (node.parent.tagName === "textarea") {
          errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
            type: "integer",
            theOnlyGoodUnits: [],
            customGenericValueError: "Should be integer, no units."
          });
        }
        if (Array.isArray(errorArr) && errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
    attribute: function attribute(node) {
      if (node.attribName === "rowspan") {
        if (!["th", "td"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-rowspan",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units."
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-rules",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["none", "groups", "rows", "cols", "all"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "meta") {
          context.report({
            ruleId: "attribute-validate-scheme",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-scheme"
          }));
        });
      }
    }
  };
}

function attributeValidateScope(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "scope") {
        if (!["td", "th"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-scope",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["row", "col", "rowgroup", "colgroup"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["frame", "iframe"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-scrolling",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["auto", "yes", "no"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-scrolling"
          }));
        });
      }
    }
  };
}

function attributeValidateSelected(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  return {
    attribute: function attribute(node) {
      var opts = {
        xhtml: false
      };
      if (Array.isArray(originalOpts) && originalOpts.length && originalOpts.some(function (val) {
        return val.toLowerCase() === "xhtml";
      })) {
        opts.xhtml = true;
      }
      var errorArr = [];
      if (node.attribName === "selected") {
        if (node.parent.tagName !== "option") {
          errorArr.push({
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateVoid(node, context, errorArr, Object.assign({}, opts, {
            enforceSiblingAttributes: null
          }));
        }
        if (errorArr.length) {
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (!["area", "a"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-shape",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateString(node.attribValue,
        node.attribValueStartsAt,
        {
          permittedValues: ["default", "rect", "circle", "poly"],
          canBeCommaSeparated: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-shape"
          }));
        });
      }
    }
  };
}

function attributeValidateSize(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "size") {
        if (!["hr", "font", "input", "basefont", "select"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-size",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
              charStart = _checkForWhitespace.charStart,
              charEnd = _checkForWhitespace.charEnd,
              errorArr = _checkForWhitespace.errorArr;
          errorArr.forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
              ruleId: "attribute-validate-size"
            }));
          });
          if (Number.isInteger(charStart)) {
            var extractedVal = node.attribValue.slice(charStart, charEnd);
            if (["hr", "input", "select"].includes(node.parent.tagName)) {
              validateDigitAndUnit(extractedVal, node.attribValueStartsAt + charStart, {
                type: "integer",
                negativeOK: false,
                theOnlyGoodUnits: [],
                skipWhitespaceChecks: true
              }).forEach(function (errorObj) {
                context.report(Object.assign({}, errorObj, {
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
                  errorArr2.push({
                    idxFrom: node.attribValueStartsAt + charStart,
                    idxTo: node.attribValueStartsAt + charEnd,
                    message: "Should be integer 1-7, plus/minus are optional.",
                    fix: null
                  });
                }
                errorArr2.forEach(function (errorObj) {
                  context.report(Object.assign({}, errorObj, {
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
        if (!["col", "colgroup"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-span",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units.",
          zeroOK: false,
          customPxMessage: "Columns number is not in pixels."
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["script", "input", "frame", "iframe", "img"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-src",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "object") {
          context.report({
            ruleId: "attribute-validate-standby",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-standby"
          }));
        });
      }
    }
  };
}

function attributeValidateStart(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "start") {
        if (node.parent.tagName !== "ol") {
          context.report({
            ruleId: "attribute-validate-start",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units.",
          zeroOK: false,
          customPxMessage: "Starting sequence number is not in pixels."
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-start"
          }));
        });
      }
    }
  };
}

function validateInlineStyle(str, idxOffset, opts) {
  var _checkForWhitespace = checkForWhitespace(str, idxOffset),
      errorArr = _checkForWhitespace.errorArr;
  return errorArr;
}

function attributeValidateStyle(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "style") {
        if (["base", "basefont", "head", "html", "meta", "param", "script", "style", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-style",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateInlineStyle(node.attribValue, node.attribValueStartsAt);
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-summary",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-summary"
          }));
        });
      }
    }
  };
}

function attributeValidateTabindex(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "tabindex") {
        if (!["a", "area", "button", "input", "object", "select", "textarea"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-tabindex",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          type: "integer",
          theOnlyGoodUnits: [],
          customGenericValueError: "Should be integer, no units.",
          zeroOK: true,
          customPxMessage: "Tabbing order number should not be in pixels.",
          maxValue: 32767
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["a", "area", "base", "form", "link"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-target",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-target"
          }));
        });
      }
    }
  };
}

function attributeValidateText(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "text") {
        if (node.parent.tagName !== "body") {
          context.report({
            ruleId: "attribute-validate-text",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateColor(node.attribValue, node.attribValueStartsAt, {
          namedCssLevel1OK: true,
          namedCssLevel2PlusOK: true,
          hexThreeOK: false,
          hexFourOK: false,
          hexSixOK: true,
          hexEightOK: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-text"
          }));
        });
      }
    }
  };
}

function attributeValidateTitle(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "title") {
        if (["base", "basefont", "head", "html", "meta", "param", "script", "title"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-title",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-title"
          }));
        });
      }
    }
  };
}

function attributeValidateType(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "type") {
        if (!["a", "link", "object", "param", "script", "style", "input", "li", "ol", "ul", "button"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-type",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          if (["a", "link", "object", "param", "script", "style"].includes(node.parent.tagName)) {
            validateString(node.attribValue,
            node.attribValueStartsAt,
            {
              quickPermittedValues: ["application/javascript", "application/json", "application/x-www-form-urlencoded", "application/xml", "application/zip", "application/pdf", "application/sql", "application/graphql", "application/ld+json", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.oasis.opendocument.text", "application/zstd", "audio/mpeg", "audio/ogg", "multipart/form-data", "text/css", "text/html", "text/xml", "text/csv", "text/plain", "image/png", "image/jpeg", "image/gif", "application/vnd.api+json"],
              permittedValues: Object.keys(db),
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "input") {
            validateString(node.attribValue,
            node.attribValueStartsAt,
            {
              quickPermittedValues: ["text", "password", "checkbox", "radio", "submit", "reset", "file", "hidden", "image", "button"],
              permittedValues: null,
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "li") {
            validateString(node.attribValue,
            node.attribValueStartsAt,
            {
              quickPermittedValues: ["disc", "square", "circle", "1", "a", "A", "i", "I"],
              permittedValues: null,
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "ol") {
            validateString(node.attribValue,
            node.attribValueStartsAt,
            {
              quickPermittedValues: ["1", "a", "A", "i", "I"],
              permittedValues: null,
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "ul") {
            validateString(node.attribValue,
            node.attribValueStartsAt,
            {
              quickPermittedValues: ["disc", "square", "circle"],
              permittedValues: null,
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-type"
              }));
            });
          } else if (node.parent.tagName === "button") {
            validateString(node.attribValue,
            node.attribValueStartsAt,
            {
              quickPermittedValues: ["button", "submit", "reset"],
              permittedValues: null,
              canBeCommaSeparated: false,
              noSpaceAfterComma: false
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-type"
              }));
            });
          }
        }
      }
    }
  };
}

function attributeValidateUsemap(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "usemap") {
        if (!["img", "input", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-usemap",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateUri(node.attribValue, {
            offset: node.attribValueStartsAt,
            multipleOK: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (!["col", "colgroup", "tbody", "td", "tfoot", "th", "thead", "tr"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-valign",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateString(node.attribValue,
          node.attribValueStartsAt,
          {
            permittedValues: ["top", "middle", "bottom", "baseline"],
            canBeCommaSeparated: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
    attribute: function attribute(node) {
      if (node.attribName === "value") {
        if (!["input", "option", "param", "button", "li"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-value",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          if (node.parent.tagName === "li") {
            validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
              type: "integer",
              theOnlyGoodUnits: [],
              customGenericValueError: "Should be integer, no units.",
              zeroOK: false,
              customPxMessage: "Sequence number should not be in pixels."
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-value"
              }));
            });
          } else {
            var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
                errorArr = _checkForWhitespace.errorArr;
            errorArr.forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-value"
              }));
            });
          }
        }
      }
    }
  };
}

function attributeValidateValuetype(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "valuetype") {
        if (node.parent.tagName !== "param") {
          context.report({
            ruleId: "attribute-validate-valuetype",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          validateString(node.attribValue,
          node.attribValueStartsAt,
          {
            permittedValues: ["data", "ref", "object"],
            canBeCommaSeparated: false
          }).forEach(function (errorObj) {
            context.report(Object.assign({}, errorObj, {
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
        if (node.parent.tagName !== "html") {
          context.report({
            ruleId: "attribute-validate-version",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var _checkForWhitespace = checkForWhitespace(node.attribValue, node.attribValueStartsAt),
            errorArr = _checkForWhitespace.errorArr;
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-version"
          }));
        });
      }
    }
  };
}

function attributeValidateVlink(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "vlink") {
        if (node.parent.tagName !== "body") {
          context.report({
            ruleId: "attribute-validate-vlink",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateColor(node.attribValue, node.attribValueStartsAt, {
          namedCssLevel1OK: true,
          namedCssLevel2PlusOK: true,
          hexThreeOK: false,
          hexFourOK: false,
          hexSixOK: true,
          hexEightOK: false
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "attribute-validate-vlink"
          }));
        });
      }
    }
  };
}

function attributeValidateVspace(context) {
  return {
    attribute: function attribute(node) {
      if (node.attribName === "vspace") {
        if (!["applet", "img", "object"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-vspace",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        }
        var errorArr = validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
          theOnlyGoodUnits: [],
          noUnitsIsFine: true
        });
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
        if (!["hr", "iframe", "img", "object", "table", "td", "th", "applet", "col", "colgroup", "pre"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-width",
            idxFrom: node.attribStart,
            idxTo: node.attribEnd,
            message: "Tag \"".concat(node.parent.tagName, "\" can't have this attribute."),
            fix: null
          });
        } else {
          if (node.parent.tagName === "pre") {
            validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
              theOnlyGoodUnits: [],
              noUnitsIsFine: true
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-width"
              }));
            });
          } else if (["colgroup", "col"].includes(node.parent.tagName)) {
            validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
              badUnits: ["px"],
              theOnlyGoodUnits: ["*", "%"],
              noUnitsIsFine: true
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-width"
              }));
            });
          } else {
            validateDigitAndUnit(node.attribValue, node.attribValueStartsAt, {
              badUnits: ["px"],
              noUnitsIsFine: true
            }).forEach(function (errorObj) {
              context.report(Object.assign({}, errorObj, {
                ruleId: "attribute-validate-width"
              }));
            });
          }
        }
      }
    }
  };
}

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
            ranges: [[idxFrom, idxTo, "&".concat(htmlEntitiesNotEmailFriendly$1.notEmailFriendly[context.str.slice(idxFrom + 1, idxTo - 1)], ";")]]
          }
        });
      }
    }
  };
}

function processStr(str, offset, context, mode) {
  for (var i = 0, len = str.length; i < len; i++) {
    if ((str[i].charCodeAt(0) > 127 || "<>\"&".includes(str[i])) && (str[i].charCodeAt(0) !== 160 || !Object.keys(context.processedRulesConfig).includes("bad-character-non-breaking-space") || !isAnEnabledValue(context.processedRulesConfig["bad-character-non-breaking-space"]))) {
      var encodedChr = he.encode(str[i], {
        useNamedReferences: mode === "named"
      });
      if (Object.keys(htmlEntitiesNotEmailFriendly$1.notEmailFriendly).includes(encodedChr.slice(1, encodedChr.length - 1))) {
        encodedChr = "&".concat(htmlEntitiesNotEmailFriendly$1.notEmailFriendly[encodedChr.slice(1, encodedChr.length - 1)], ";");
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
        message: "Unencoded".concat(charName, " character."),
        idxFrom: i + offset,
        idxTo: i + 1 + offset,
        fix: {
          ranges: [[i + offset, i + 1 + offset, encodedChr]]
        }
      });
    }
  }
}
function characterEncode(context) {
  for (var _len = arguments.length, opts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    opts[_key - 1] = arguments[_key];
  }
  return {
    text: function text(token) {
      var mode = "named";
      if (Array.isArray(opts) && ["named", "numeric"].includes(opts[0])) {
        mode = opts[0];
      }
      processStr(token.value, token.start, context, mode);
    }
  };
}

function characterUnspacedPunctuation(context) {
  for (var _len = arguments.length, originalOpts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    originalOpts[_key - 1] = arguments[_key];
  }
  var charCodeMapping = {
    "63": "questionMark",
    "33": "exclamationMark",
    "59": "semicolon",
    "187": "rightDoubleAngleQuotMark",
    "171": "leftDoubleAngleQuotMark"
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
      var opts = Object.assign({}, defaults);
      if (Array.isArray(originalOpts) && originalOpts.length && _typeof(originalOpts[0]) === "object" && originalOpts[0] !== null) {
        opts = Object.assign({}, defaults, originalOpts[0]);
      }
      for (var i = node.start; i < node.end; i++) {
        var charCode = context.str[i].charCodeAt(0);
        if (charCodeMapping[String(charCode)]) {
          var charName = charCodeMapping[String(charCode)];
          if (charName === "exclamationMark" && context.str[stringLeftRight.right(context.str, i)] === "-" && context.str[stringLeftRight.right(context.str, stringLeftRight.right(context.str, i))] === "-") {
            return;
          }
          if (opts[charName].whitespaceLeft === "never" && i && !context.str[i - 1].trim().length) {
            context.report({
              ruleId: "character-unspaced-punctuation",
              idxFrom: stringLeftRight.left(context.str, i) + 1,
              idxTo: i,
              message: "Remove the whitespace.",
              fix: {
                ranges: [[stringLeftRight.left(context.str, i) + 1, i]]
              }
            });
          }
          if (opts[charName].whitespaceRight === "never" && i < node.end - 1 && !context.str[i + 1].trim().length) {
            context.report({
              ruleId: "character-unspaced-punctuation",
              idxFrom: i + 1,
              idxTo: stringLeftRight.right(context.str, i),
              message: "Remove the whitespace.",
              fix: {
                ranges: [[i + 1, stringLeftRight.right(context.str, i)]]
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

function mediaMalformed(context) {
  return {
    at: function at(node) {
      if (node.identifier === "media") {
        var errors = isMediaD(node.query, {
          offset: node.queryStartsAt
        });
        errors.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "media-malformed"
          }));
        });
      }
    }
  };
}

function validateCommentClosing(token) {
  var reference = {
    simple: "-->",
    only: "<![endif]-->",
    not: "<!--<![endif]-->"
  };
  if (token.kind === "simple" && token.value === "-->" || token.kind === "only" && token.value === "<![endif]-->" || token.kind === "not" && token.value === "<!--<![endif]-->") {
    return [];
  }
  var errorArr = [];
  var valueWithoutWhitespace = "";
  splitByWhitespace(token.value, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        charFrom = _ref2[0],
        charTo = _ref2[1];
    valueWithoutWhitespace = "".concat(valueWithoutWhitespace).concat(token.value.slice(charFrom, charTo));
  }, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        whitespaceFrom = _ref4[0],
        whitespaceTo = _ref4[1];
    errorArr.push({
      ruleId: "comment-only-closing-malformed",
      idxFrom: token.start,
      idxTo: token.end,
      message: "Remove whitespace.",
      fix: {
        ranges: [[whitespaceFrom + token.start, whitespaceTo + token.start]]
      }
    });
  });
  if (token.kind === "simple" && valueWithoutWhitespace === "-->" || token.kind === "only" && valueWithoutWhitespace === "<![endif]-->" || token.kind === "not" && valueWithoutWhitespace === "<!--<![endif]-->") {
    return errorArr;
  }
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
        var errorArr = validateCommentClosing(node) || [];
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
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
  };
  if (token.kind === "simple" && reference.simple.test(token.value) || token.kind === "only" && reference.only.test(token.value) || token.kind === "not" && reference.not.test(token.value)) {
    return [];
  }
  var errorArr = [];
  var valueWithoutWhitespace = "";
  if (token.kind === "simple") {
    splitByWhitespace(token.value, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          charFrom = _ref2[0],
          charTo = _ref2[1];
      valueWithoutWhitespace = "".concat(valueWithoutWhitespace).concat(token.value.slice(charFrom, charTo));
    }, function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          whitespaceFrom = _ref4[0],
          whitespaceTo = _ref4[1];
      errorArr.push({
        idxFrom: token.start,
        idxTo: token.end,
        message: "Remove whitespace.",
        fix: {
          ranges: [[whitespaceFrom + token.start, whitespaceTo + token.start]]
        }
      });
    });
  }
  if (token.kind === "simple" && reference.simple.test(valueWithoutWhitespace) || token.kind === "only" && reference.only.test(valueWithoutWhitespace) || token.kind === "not" && reference.not.test(valueWithoutWhitespace)) {
    return errorArr;
  }
  var wrongBracketType;
  if (["only", "not"].includes(token.kind)) {
    findMalformed(token.value, "<!--[", function (_ref5) {
      var idxFrom = _ref5.idxFrom,
          idxTo = _ref5.idxTo;
      var finalIdxTo = idxTo;
      if (idxFrom === token.start) {
        if (
        "{(".includes(token.value[idxTo]) &&
        stringMatchLeftRight.matchRight(token.value, idxTo, "if", {
          trimBeforeMatching: true
        })) {
          wrongBracketType = true;
          finalIdxTo++;
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
  }
  if (token.kind === "not") {
    findMalformed(token.value, "]><!-->", function (_ref6) {
      var idxFrom = _ref6.idxFrom,
          idxTo = _ref6.idxTo;
      var finalIdxFrom = idxFrom;
      if ("})".includes(token.value[idxFrom - 1]) &&
      wrongBracketType) {
        finalIdxFrom--;
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
  } else if (token.kind === "only") {
    for (var i = token.value.length; i--;) {
      if (token.value[i].trim().length && !">]".includes(token.value[i])) {
        var rangeStart = i + 1;
        if ("})".includes(token.value[i]) && wrongBracketType) {
          rangeStart--;
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
      findMalformed(node.value, "<!--", function (errorObj) {
        context.report(Object.assign({}, errorObj, {
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
        var errorArr = validateCommentOpening(node) || [];
        errorArr.forEach(function (errorObj) {
          context.report(Object.assign({}, errorObj, {
            ruleId: "comment-opening-malformed"
          }));
        });
      }
    }
  };
}

function commentMismatchingPair(context) {
  return {
    ast: function ast(node) {
      traverse(node,
      function (key, val, innerObj) {
        var current = val !== undefined ? val : key;
        if (isObj(current)) {
          if (current.type === "comment" && current.closing) {
            var previousToken = op.get(node, astMonkeyUtil.pathPrev(innerObj.path));
            if (isObj(previousToken) && previousToken.type === "comment" && !previousToken.closing) {
              if (previousToken.kind === "not" && current.kind === "only") {
                context.report({
                  ruleId: "comment-mismatching-pair",
                  message: "Add \"<!--\".",
                  idxFrom: current.start,
                  idxTo: current.end,
                  fix: {
                    ranges: [[current.start, current.start, "<!--"]]
                  }
                });
              } else if (previousToken.kind === "only" && current.kind === "not") {
                context.report({
                  ruleId: "comment-mismatching-pair",
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

function commentConditionalNested(context) {
  return {
    ast: function ast(node) {
      var pathsWithOpeningComments = [];
      traverse(node,
      function (key, val, innerObj) {
        var current = val !== undefined ? val : key;
        if (isObj(current)) {
          if (current.type === "comment") {
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

var builtInRules = {};
defineLazyProp(builtInRules, "bad-character-null", function () {
  return badCharacterNull;
});
defineLazyProp(builtInRules, "bad-character-start-of-heading", function () {
  return badCharacterStartOfHeading;
});
defineLazyProp(builtInRules, "bad-character-start-of-text", function () {
  return badCharacterStartOfText;
});
defineLazyProp(builtInRules, "bad-character-end-of-text", function () {
  return badCharacterEndOfText;
});
defineLazyProp(builtInRules, "bad-character-end-of-transmission", function () {
  return badCharacterEndOfTransmission;
});
defineLazyProp(builtInRules, "bad-character-enquiry", function () {
  return badCharacterEnquiry;
});
defineLazyProp(builtInRules, "bad-character-acknowledge", function () {
  return badCharacterAcknowledge;
});
defineLazyProp(builtInRules, "bad-character-bell", function () {
  return badCharacterBell;
});
defineLazyProp(builtInRules, "bad-character-backspace", function () {
  return badCharacterBackspace;
});
defineLazyProp(builtInRules, "bad-character-tabulation", function () {
  return badCharacterTabulation;
});
defineLazyProp(builtInRules, "bad-character-line-tabulation", function () {
  return badCharacterLineTabulation;
});
defineLazyProp(builtInRules, "bad-character-form-feed", function () {
  return badCharacterFormFeed;
});
defineLazyProp(builtInRules, "bad-character-shift-out", function () {
  return badCharacterShiftOut;
});
defineLazyProp(builtInRules, "bad-character-shift-in", function () {
  return badCharacterShiftIn;
});
defineLazyProp(builtInRules, "bad-character-data-link-escape", function () {
  return badCharacterDataLinkEscape;
});
defineLazyProp(builtInRules, "bad-character-device-control-one", function () {
  return badCharacterDeviceControlOne;
});
defineLazyProp(builtInRules, "bad-character-device-control-two", function () {
  return badCharacterDeviceControlTwo;
});
defineLazyProp(builtInRules, "bad-character-device-control-three", function () {
  return badCharacterDeviceControlThree;
});
defineLazyProp(builtInRules, "bad-character-device-control-four", function () {
  return badCharacterDeviceControlFour;
});
defineLazyProp(builtInRules, "bad-character-negative-acknowledge", function () {
  return badCharacterNegativeAcknowledge;
});
defineLazyProp(builtInRules, "bad-character-synchronous-idle", function () {
  return badCharacterSynchronousIdle;
});
defineLazyProp(builtInRules, "bad-character-end-of-transmission-block", function () {
  return badCharacterEndOfTransmissionBlock;
});
defineLazyProp(builtInRules, "bad-character-cancel", function () {
  return badCharacterCancel;
});
defineLazyProp(builtInRules, "bad-character-end-of-medium", function () {
  return badCharacterEndOfMedium;
});
defineLazyProp(builtInRules, "bad-character-substitute", function () {
  return badCharacterSubstitute;
});
defineLazyProp(builtInRules, "bad-character-escape", function () {
  return badCharacterEscape;
});
defineLazyProp(builtInRules, "bad-character-information-separator-four", function () {
  return badCharacterInformationSeparatorFour;
});
defineLazyProp(builtInRules, "bad-character-information-separator-three", function () {
  return badCharacterInformationSeparatorThree;
});
defineLazyProp(builtInRules, "bad-character-information-separator-two", function () {
  return badCharacterInformationSeparatorTwo;
});
defineLazyProp(builtInRules, "bad-character-information-separator-one", function () {
  return badCharacterInformationSeparatorTwo$1;
});
defineLazyProp(builtInRules, "bad-character-delete", function () {
  return badCharacterDelete;
});
defineLazyProp(builtInRules, "bad-character-control-0080", function () {
  return badCharacterControl0080;
});
defineLazyProp(builtInRules, "bad-character-control-0081", function () {
  return badCharacterControl0081;
});
defineLazyProp(builtInRules, "bad-character-break-permitted-here", function () {
  return badCharacterBreakPermittedHere;
});
defineLazyProp(builtInRules, "bad-character-no-break-here", function () {
  return badCharacterNoBreakHere;
});
defineLazyProp(builtInRules, "bad-character-control-0084", function () {
  return badCharacterControl0084;
});
defineLazyProp(builtInRules, "bad-character-next-line", function () {
  return badCharacterNextLine;
});
defineLazyProp(builtInRules, "bad-character-start-of-selected-area", function () {
  return badCharacterStartOfSelectedArea;
});
defineLazyProp(builtInRules, "bad-character-end-of-selected-area", function () {
  return badCharacterEndOfSelectedArea;
});
defineLazyProp(builtInRules, "bad-character-character-tabulation-set", function () {
  return badCharacterCharacterTabulationSet;
});
defineLazyProp(builtInRules, "bad-character-character-tabulation-with-justification", function () {
  return badCharacterCharacterTabulationWithJustification;
});
defineLazyProp(builtInRules, "bad-character-line-tabulation-set", function () {
  return badCharacterLineTabulationSet;
});
defineLazyProp(builtInRules, "bad-character-partial-line-forward", function () {
  return badCharacterPartialLineForward;
});
defineLazyProp(builtInRules, "bad-character-partial-line-backward", function () {
  return badCharacterPartialLineBackward;
});
defineLazyProp(builtInRules, "bad-character-reverse-line-feed", function () {
  return badCharacterReverseLineFeed;
});
defineLazyProp(builtInRules, "bad-character-single-shift-two", function () {
  return badCharacterSingleShiftTwo;
});
defineLazyProp(builtInRules, "bad-character-single-shift-three", function () {
  return badCharacterSingleShiftTwo$1;
});
defineLazyProp(builtInRules, "bad-character-device-control-string", function () {
  return badCharacterDeviceControlString;
});
defineLazyProp(builtInRules, "bad-character-private-use-1", function () {
  return badCharacterPrivateUseOne;
});
defineLazyProp(builtInRules, "bad-character-private-use-2", function () {
  return badCharacterPrivateUseTwo;
});
defineLazyProp(builtInRules, "bad-character-set-transmit-state", function () {
  return badCharacterSetTransmitState;
});
defineLazyProp(builtInRules, "bad-character-cancel-character", function () {
  return badCharacterCancelCharacter;
});
defineLazyProp(builtInRules, "bad-character-message-waiting", function () {
  return badCharacterMessageWaiting;
});
defineLazyProp(builtInRules, "bad-character-start-of-protected-area", function () {
  return badCharacterStartOfProtectedArea;
});
defineLazyProp(builtInRules, "bad-character-end-of-protected-area", function () {
  return badCharacterEndOfProtectedArea;
});
defineLazyProp(builtInRules, "bad-character-start-of-string", function () {
  return badCharacterStartOfString;
});
defineLazyProp(builtInRules, "bad-character-control-0099", function () {
  return badCharacterControl0099;
});
defineLazyProp(builtInRules, "bad-character-single-character-introducer", function () {
  return badCharacterSingleCharacterIntroducer;
});
defineLazyProp(builtInRules, "bad-character-control-sequence-introducer", function () {
  return badCharacterControlSequenceIntroducer;
});
defineLazyProp(builtInRules, "bad-character-string-terminator", function () {
  return badCharacterStringTerminator;
});
defineLazyProp(builtInRules, "bad-character-operating-system-command", function () {
  return badCharacterOperatingSystemCommand;
});
defineLazyProp(builtInRules, "bad-character-private-message", function () {
  return badCharacterPrivateMessage;
});
defineLazyProp(builtInRules, "bad-character-application-program-command", function () {
  return badCharacterApplicationProgramCommand;
});
defineLazyProp(builtInRules, "bad-character-soft-hyphen", function () {
  return badCharacterSoftHyphen;
});
defineLazyProp(builtInRules, "bad-character-non-breaking-space", function () {
  return badCharacterNonBreakingSpace;
});
defineLazyProp(builtInRules, "bad-character-ogham-space-mark", function () {
  return badCharacterOghamSpaceMark;
});
defineLazyProp(builtInRules, "bad-character-en-quad", function () {
  return badCharacterEnQuad;
});
defineLazyProp(builtInRules, "bad-character-em-quad", function () {
  return badCharacterEmQuad;
});
defineLazyProp(builtInRules, "bad-character-en-space", function () {
  return badCharacterEnSpace;
});
defineLazyProp(builtInRules, "bad-character-em-space", function () {
  return badCharacterEmSpace;
});
defineLazyProp(builtInRules, "bad-character-three-per-em-space", function () {
  return badCharacterThreePerEmSpace;
});
defineLazyProp(builtInRules, "bad-character-four-per-em-space", function () {
  return badCharacterFourPerEmSpace;
});
defineLazyProp(builtInRules, "bad-character-six-per-em-space", function () {
  return badCharacterSixPerEmSpace;
});
defineLazyProp(builtInRules, "bad-character-figure-space", function () {
  return badCharacterFigureSpace;
});
defineLazyProp(builtInRules, "bad-character-punctuation-space", function () {
  return badCharacterPunctuationSpace;
});
defineLazyProp(builtInRules, "bad-character-thin-space", function () {
  return badCharacterThinSpace;
});
defineLazyProp(builtInRules, "bad-character-hair-space", function () {
  return badCharacterHairSpace;
});
defineLazyProp(builtInRules, "bad-character-zero-width-space", function () {
  return badCharacterZeroWidthSpace;
});
defineLazyProp(builtInRules, "bad-character-zero-width-non-joiner", function () {
  return badCharacterZeroWidthNonJoiner;
});
defineLazyProp(builtInRules, "bad-character-zero-width-joiner", function () {
  return badCharacterZeroWidthJoiner;
});
defineLazyProp(builtInRules, "bad-character-left-to-right-mark", function () {
  return badCharacterLeftToRightMark;
});
defineLazyProp(builtInRules, "bad-character-right-to-left-mark", function () {
  return badCharacterRightToLeftMark;
});
defineLazyProp(builtInRules, "bad-character-left-to-right-embedding", function () {
  return badCharacterLeftToRightEmbedding;
});
defineLazyProp(builtInRules, "bad-character-right-to-left-embedding", function () {
  return badCharacterRightToLeftEmbedding;
});
defineLazyProp(builtInRules, "bad-character-pop-directional-formatting", function () {
  return badCharacterPopDirectionalFormatting;
});
defineLazyProp(builtInRules, "bad-character-left-to-right-override", function () {
  return badCharacterLeftToRightOverride;
});
defineLazyProp(builtInRules, "bad-character-right-to-left-override", function () {
  return badCharacterRightToLeftOverride;
});
defineLazyProp(builtInRules, "bad-character-word-joiner", function () {
  return badCharacterWordJoiner;
});
defineLazyProp(builtInRules, "bad-character-function-application", function () {
  return badCharacterFunctionApplication;
});
defineLazyProp(builtInRules, "bad-character-invisible-times", function () {
  return badCharacterInvisibleTimes;
});
defineLazyProp(builtInRules, "bad-character-invisible-separator", function () {
  return badCharacterInvisibleSeparator;
});
defineLazyProp(builtInRules, "bad-character-invisible-plus", function () {
  return badCharacterInvisiblePlus;
});
defineLazyProp(builtInRules, "bad-character-left-to-right-isolate", function () {
  return badCharacterLeftToRightIsolate;
});
defineLazyProp(builtInRules, "bad-character-right-to-left-isolate", function () {
  return badCharacterRightToLeftIsolate;
});
defineLazyProp(builtInRules, "bad-character-first-strong-isolate", function () {
  return badCharacterFirstStrongIsolate;
});
defineLazyProp(builtInRules, "bad-character-pop-directional-isolate", function () {
  return badCharacterPopDirectionalIsolate;
});
defineLazyProp(builtInRules, "bad-character-inhibit-symmetric-swapping", function () {
  return badCharacterInhibitSymmetricSwapping;
});
defineLazyProp(builtInRules, "bad-character-activate-symmetric-swapping", function () {
  return badCharacterActivateSymmetricSwapping;
});
defineLazyProp(builtInRules, "bad-character-inhibit-arabic-form-shaping", function () {
  return badCharacterInhibitArabicFormShaping;
});
defineLazyProp(builtInRules, "bad-character-activate-arabic-form-shaping", function () {
  return badCharacterActivateArabicFormShaping;
});
defineLazyProp(builtInRules, "bad-character-national-digit-shapes", function () {
  return badCharacterNationalDigitShapes;
});
defineLazyProp(builtInRules, "bad-character-nominal-digit-shapes", function () {
  return badCharacterNominalDigitShapes;
});
defineLazyProp(builtInRules, "bad-character-zero-width-no-break-space", function () {
  return badCharacterZeroWidthNoBreakSpace;
});
defineLazyProp(builtInRules, "bad-character-interlinear-annotation-anchor", function () {
  return badCharacterInterlinearAnnotationAnchor;
});
defineLazyProp(builtInRules, "bad-character-interlinear-annotation-separator", function () {
  return badCharacterInterlinearAnnotationSeparator;
});
defineLazyProp(builtInRules, "bad-character-interlinear-annotation-terminator", function () {
  return badCharacterInterlinearAnnotationTerminator;
});
defineLazyProp(builtInRules, "bad-character-line-separator", function () {
  return badCharacterLineSeparator;
});
defineLazyProp(builtInRules, "bad-character-paragraph-separator", function () {
  return badCharacterParagraphSeparator;
});
defineLazyProp(builtInRules, "bad-character-narrow-no-break-space", function () {
  return badCharacterNarrowNoBreakSpace;
});
defineLazyProp(builtInRules, "bad-character-medium-mathematical-space", function () {
  return badCharacterMediumMathematicalSpace;
});
defineLazyProp(builtInRules, "bad-character-ideographic-space", function () {
  return badCharacterIdeographicSpace;
});
defineLazyProp(builtInRules, "bad-character-replacement-character", function () {
  return badCharacterReplacementCharacter;
});
defineLazyProp(builtInRules, "tag-space-after-opening-bracket", function () {
  return tagSpaceAfterOpeningBracket;
});
defineLazyProp(builtInRules, "tag-space-before-closing-slash", function () {
  return tagSpaceBeforeClosingSlash;
});
defineLazyProp(builtInRules, "tag-space-between-slash-and-bracket", function () {
  return tagSpaceBetweenSlashAndBracket;
});
defineLazyProp(builtInRules, "tag-closing-backslash", function () {
  return tagClosingBackslash;
});
defineLazyProp(builtInRules, "tag-void-slash", function () {
  return tagVoidSlash;
});
defineLazyProp(builtInRules, "tag-name-case", function () {
  return tagNameCase;
});
defineLazyProp(builtInRules, "tag-is-present", function () {
  return tagIsPresent;
});
defineLazyProp(builtInRules, "tag-bold", function () {
  return tagBold;
});
defineLazyProp(builtInRules, "tag-bad-self-closing", function () {
  return tagBadSelfClosing;
});
defineLazyProp(builtInRules, "attribute-duplicate", function () {
  return attributeDuplicate;
});
defineLazyProp(builtInRules, "attribute-malformed", function () {
  return attributeMalformed;
});
defineLazyProp(builtInRules, "attribute-validate-abbr", function () {
  return attributeValidateAbbr;
});
defineLazyProp(builtInRules, "attribute-validate-accept-charset", function () {
  return attributeValidateAcceptCharset;
});
defineLazyProp(builtInRules, "attribute-validate-accept", function () {
  return attributeValidateAccept;
});
defineLazyProp(builtInRules, "attribute-validate-accesskey", function () {
  return attributeValidateAccesskey;
});
defineLazyProp(builtInRules, "attribute-validate-action", function () {
  return attributeValidateAction;
});
defineLazyProp(builtInRules, "attribute-validate-align", function () {
  return attributeValidateAlign;
});
defineLazyProp(builtInRules, "attribute-validate-alink", function () {
  return attributeValidateAlink;
});
defineLazyProp(builtInRules, "attribute-validate-alt", function () {
  return attributeValidateAlt;
});
defineLazyProp(builtInRules, "attribute-validate-archive", function () {
  return attributeValidateArchive;
});
defineLazyProp(builtInRules, "attribute-validate-axis", function () {
  return attributeValidateAxis;
});
defineLazyProp(builtInRules, "attribute-validate-background", function () {
  return attributeValidateBackground;
});
defineLazyProp(builtInRules, "attribute-validate-bgcolor", function () {
  return attributeValidateBgcolor;
});
defineLazyProp(builtInRules, "attribute-validate-border", function () {
  return attributeValidateBorder;
});
defineLazyProp(builtInRules, "attribute-validate-cellpadding", function () {
  return attributeValidateCellpadding;
});
defineLazyProp(builtInRules, "attribute-validate-cellspacing", function () {
  return attributeValidateCellspacing;
});
defineLazyProp(builtInRules, "attribute-validate-char", function () {
  return attributeValidateChar;
});
defineLazyProp(builtInRules, "attribute-validate-charoff", function () {
  return attributeValidateCharoff;
});
defineLazyProp(builtInRules, "attribute-validate-charset", function () {
  return attributeValidateCharset;
});
defineLazyProp(builtInRules, "attribute-validate-checked", function () {
  return attributeValidateChecked;
});
defineLazyProp(builtInRules, "attribute-validate-cite", function () {
  return attributeValidateCite;
});
defineLazyProp(builtInRules, "attribute-validate-class", function () {
  return attributeValidateClass;
});
defineLazyProp(builtInRules, "attribute-validate-classid", function () {
  return attributeValidateClassid;
});
defineLazyProp(builtInRules, "attribute-validate-clear", function () {
  return attributeValidateClassid$1;
});
defineLazyProp(builtInRules, "attribute-validate-code", function () {
  return attributeValidateCode;
});
defineLazyProp(builtInRules, "attribute-validate-codebase", function () {
  return attributeValidateCodebase;
});
defineLazyProp(builtInRules, "attribute-validate-codetype", function () {
  return attributeValidateCodetype;
});
defineLazyProp(builtInRules, "attribute-validate-color", function () {
  return attributeValidateColor;
});
defineLazyProp(builtInRules, "attribute-validate-cols", function () {
  return attributeValidateCols;
});
defineLazyProp(builtInRules, "attribute-validate-colspan", function () {
  return attributeValidateColspan;
});
defineLazyProp(builtInRules, "attribute-validate-compact", function () {
  return attributeValidateCompact;
});
defineLazyProp(builtInRules, "attribute-validate-content", function () {
  return attributeValidateContent;
});
defineLazyProp(builtInRules, "attribute-validate-coords", function () {
  return attributeValidateCoords;
});
defineLazyProp(builtInRules, "attribute-validate-data", function () {
  return attributeValidateData;
});
defineLazyProp(builtInRules, "attribute-validate-datetime", function () {
  return attributeValidateDatetime;
});
defineLazyProp(builtInRules, "attribute-validate-declare", function () {
  return attributeValidateDeclare;
});
defineLazyProp(builtInRules, "attribute-validate-defer", function () {
  return attributeValidateDefer;
});
defineLazyProp(builtInRules, "attribute-validate-dir", function () {
  return attributeValidateDir;
});
defineLazyProp(builtInRules, "attribute-validate-disabled", function () {
  return attributeValidateDisabled;
});
defineLazyProp(builtInRules, "attribute-validate-enctype", function () {
  return attributeValidateEnctype;
});
defineLazyProp(builtInRules, "attribute-validate-face", function () {
  return attributeValidateFace;
});
defineLazyProp(builtInRules, "attribute-validate-for", function () {
  return attributeValidateFor;
});
defineLazyProp(builtInRules, "attribute-validate-frame", function () {
  return attributeValidateFrame;
});
defineLazyProp(builtInRules, "attribute-validate-frameborder", function () {
  return attributeValidateFrameborder;
});
defineLazyProp(builtInRules, "attribute-validate-headers", function () {
  return attributeValidateHeaders;
});
defineLazyProp(builtInRules, "attribute-validate-height", function () {
  return attributeValidateHeight;
});
defineLazyProp(builtInRules, "attribute-validate-href", function () {
  return attributeValidateHref;
});
defineLazyProp(builtInRules, "attribute-validate-hreflang", function () {
  return attributeValidateHreflang;
});
defineLazyProp(builtInRules, "attribute-validate-hspace", function () {
  return attributeValidateHspace;
});
defineLazyProp(builtInRules, "attribute-validate-http-equiv", function () {
  return attributeValidateHttpequiv;
});
defineLazyProp(builtInRules, "attribute-validate-id", function () {
  return attributeValidateId;
});
defineLazyProp(builtInRules, "attribute-validate-ismap", function () {
  return attributeValidateIsmap;
});
defineLazyProp(builtInRules, "attribute-validate-label", function () {
  return attributeValidateLabel;
});
defineLazyProp(builtInRules, "attribute-validate-lang", function () {
  return attributeValidateLang;
});
defineLazyProp(builtInRules, "attribute-validate-language", function () {
  return attributeValidateLanguage;
});
defineLazyProp(builtInRules, "attribute-validate-link", function () {
  return attributeValidateLink;
});
defineLazyProp(builtInRules, "attribute-validate-longdesc", function () {
  return attributeValidateLongdesc;
});
defineLazyProp(builtInRules, "attribute-validate-marginheight", function () {
  return attributeValidateMarginheight;
});
defineLazyProp(builtInRules, "attribute-validate-marginwidth", function () {
  return attributeValidateMarginwidth;
});
defineLazyProp(builtInRules, "attribute-validate-maxlength", function () {
  return attributeValidateMaxlength;
});
defineLazyProp(builtInRules, "attribute-validate-media", function () {
  return attributeValidateMedia;
});
defineLazyProp(builtInRules, "attribute-validate-method", function () {
  return attributeValidateMethod;
});
defineLazyProp(builtInRules, "attribute-validate-multiple", function () {
  return attributeValidateMultiple;
});
defineLazyProp(builtInRules, "attribute-validate-name", function () {
  return attributeValidateName;
});
defineLazyProp(builtInRules, "attribute-validate-nohref", function () {
  return attributeValidateNohref;
});
defineLazyProp(builtInRules, "attribute-validate-noresize", function () {
  return attributeValidateNoresize;
});
defineLazyProp(builtInRules, "attribute-validate-noshade", function () {
  return attributeValidateNoshade;
});
defineLazyProp(builtInRules, "attribute-validate-nowrap", function () {
  return attributeValidateNowrap;
});
defineLazyProp(builtInRules, "attribute-validate-object", function () {
  return attributeValidateObject;
});
defineLazyProp(builtInRules, "attribute-validate-onblur", function () {
  return attributeValidateOnblur;
});
defineLazyProp(builtInRules, "attribute-validate-onchange", function () {
  return attributeValidateOnchange;
});
defineLazyProp(builtInRules, "attribute-validate-onclick", function () {
  return attributeValidateOnclick;
});
defineLazyProp(builtInRules, "attribute-validate-ondblclick", function () {
  return attributeValidateOndblclick;
});
defineLazyProp(builtInRules, "attribute-validate-onfocus", function () {
  return attributeValidateOnfocus;
});
defineLazyProp(builtInRules, "attribute-validate-onkeydown", function () {
  return attributeValidateOnkeydown;
});
defineLazyProp(builtInRules, "attribute-validate-onkeypress", function () {
  return attributeValidateOnkeypress;
});
defineLazyProp(builtInRules, "attribute-validate-onkeyup", function () {
  return attributeValidateOnkeyup;
});
defineLazyProp(builtInRules, "attribute-validate-onload", function () {
  return attributeValidateOnload;
});
defineLazyProp(builtInRules, "attribute-validate-onmousedown", function () {
  return attributeValidateOnmousedown;
});
defineLazyProp(builtInRules, "attribute-validate-onmousemove", function () {
  return attributeValidateOnmousemove;
});
defineLazyProp(builtInRules, "attribute-validate-onmouseout", function () {
  return attributeValidateOnmouseout;
});
defineLazyProp(builtInRules, "attribute-validate-onmouseover", function () {
  return attributeValidateOnmouseover;
});
defineLazyProp(builtInRules, "attribute-validate-onmouseup", function () {
  return attributeValidateOnmouseup;
});
defineLazyProp(builtInRules, "attribute-validate-onreset", function () {
  return attributeValidateOnreset;
});
defineLazyProp(builtInRules, "attribute-validate-onsubmit", function () {
  return attributeValidateOnsubmit;
});
defineLazyProp(builtInRules, "attribute-validate-onselect", function () {
  return attributeValidateOnselect;
});
defineLazyProp(builtInRules, "attribute-validate-onunload", function () {
  return attributeValidateOnunload;
});
defineLazyProp(builtInRules, "attribute-validate-profile", function () {
  return attributeValidateProfile;
});
defineLazyProp(builtInRules, "attribute-validate-prompt", function () {
  return attributeValidatePrompt;
});
defineLazyProp(builtInRules, "attribute-validate-readonly", function () {
  return attributeValidateReadonly;
});
defineLazyProp(builtInRules, "attribute-validate-rel", function () {
  return attributeValidateRel;
});
defineLazyProp(builtInRules, "attribute-validate-rev", function () {
  return attributeValidateRev;
});
defineLazyProp(builtInRules, "attribute-validate-rows", function () {
  return attributeValidateRows;
});
defineLazyProp(builtInRules, "attribute-validate-rowspan", function () {
  return attributeValidateRowspan;
});
defineLazyProp(builtInRules, "attribute-validate-rules", function () {
  return attributeValidateRules;
});
defineLazyProp(builtInRules, "attribute-validate-scheme", function () {
  return attributeValidateScheme;
});
defineLazyProp(builtInRules, "attribute-validate-scope", function () {
  return attributeValidateScope;
});
defineLazyProp(builtInRules, "attribute-validate-scrolling", function () {
  return attributeValidateScrolling;
});
defineLazyProp(builtInRules, "attribute-validate-selected", function () {
  return attributeValidateSelected;
});
defineLazyProp(builtInRules, "attribute-validate-shape", function () {
  return attributeValidateShape;
});
defineLazyProp(builtInRules, "attribute-validate-size", function () {
  return attributeValidateSize;
});
defineLazyProp(builtInRules, "attribute-validate-span", function () {
  return attributeValidateSpan;
});
defineLazyProp(builtInRules, "attribute-validate-src", function () {
  return attributeValidateSrc;
});
defineLazyProp(builtInRules, "attribute-validate-standby", function () {
  return attributeValidateStandby;
});
defineLazyProp(builtInRules, "attribute-validate-start", function () {
  return attributeValidateStart;
});
defineLazyProp(builtInRules, "attribute-validate-style", function () {
  return attributeValidateStyle;
});
defineLazyProp(builtInRules, "attribute-validate-summary", function () {
  return attributeValidateSummary;
});
defineLazyProp(builtInRules, "attribute-validate-tabindex", function () {
  return attributeValidateTabindex;
});
defineLazyProp(builtInRules, "attribute-validate-target", function () {
  return attributeValidateTarget;
});
defineLazyProp(builtInRules, "attribute-validate-text", function () {
  return attributeValidateText;
});
defineLazyProp(builtInRules, "attribute-validate-title", function () {
  return attributeValidateTitle;
});
defineLazyProp(builtInRules, "attribute-validate-type", function () {
  return attributeValidateType;
});
defineLazyProp(builtInRules, "attribute-validate-usemap", function () {
  return attributeValidateUsemap;
});
defineLazyProp(builtInRules, "attribute-validate-valign", function () {
  return attributeValidateValign;
});
defineLazyProp(builtInRules, "attribute-validate-value", function () {
  return attributeValidateValue;
});
defineLazyProp(builtInRules, "attribute-validate-valuetype", function () {
  return attributeValidateValuetype;
});
defineLazyProp(builtInRules, "attribute-validate-version", function () {
  return attributeValidateVersion;
});
defineLazyProp(builtInRules, "attribute-validate-vlink", function () {
  return attributeValidateVlink;
});
defineLazyProp(builtInRules, "attribute-validate-vspace", function () {
  return attributeValidateVspace;
});
defineLazyProp(builtInRules, "attribute-validate-width", function () {
  return attributeValidateWidth;
});
defineLazyProp(builtInRules, "bad-named-html-entity-not-email-friendly", function () {
  return htmlEntitiesNotEmailFriendly;
});
defineLazyProp(builtInRules, "character-encode", function () {
  return characterEncode;
});
defineLazyProp(builtInRules, "character-unspaced-punctuation", function () {
  return characterUnspacedPunctuation;
});
defineLazyProp(builtInRules, "media-malformed", function () {
  return mediaMalformed;
});
defineLazyProp(builtInRules, "comment-closing-malformed", function () {
  return commentClosingMalformed;
});
defineLazyProp(builtInRules, "comment-opening-malformed", function () {
  return commentOpeningMalformed;
});
defineLazyProp(builtInRules, "comment-mismatching-pair", function () {
  return commentMismatchingPair;
});
defineLazyProp(builtInRules, "comment-conditional-nested", function () {
  return commentConditionalNested;
});
function get(something) {
  return builtInRules[something];
}
function normaliseRequestedRules(opts) {
  var res = {};
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
    })) {
      allAttribRules.forEach(function (ruleName) {
        res[ruleName] = opts[temp];
      });
    }
    if (Object.keys(opts).includes("bad-html-entity")) {
      allBadNamedHTMLEntityRules.forEach(function (ruleName) {
        res[ruleName] = opts["bad-html-entity"];
      });
    }
    Object.keys(opts).forEach(function (ruleName) {
      if (!["all", "tag", "tag*", "tag-*", "attribute", "attribute*", "attribute-*", "bad-character", "bad-character", "bad-character*", "bad-character-*", "bad-html-entity"].includes(ruleName)) {
        if (Object.keys(builtInRules).includes(ruleName)) {
          res[ruleName] = clone(opts[ruleName]);
        } else if (ruleName.includes("*")) {
          Object.keys(builtInRules).forEach(function (builtInRule) {
            if (matcher.isMatch(builtInRule, ruleName)) {
              res[builtInRule] = clone(opts[ruleName]);
            }
          });
        }
      }
    });
  }
  return res;
}

var domain;
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);
function EventEmitter() {
  EventEmitter.init.call(this);
}
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.usingDomains = false;
EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;
EventEmitter.defaultMaxListeners = 10;
EventEmitter.init = function () {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    if (domain.active ) ;
  }
  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || undefined;
};
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};
function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};
function emitNone(handler, isFn, self) {
  if (isFn) handler.call(self);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn) handler.call(self, arg1);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn) handler.call(self, arg1, arg2);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn) handler.call(self, arg1, arg2, arg3);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
  }
}
function emitMany(handler, isFn, self, args) {
  if (isFn) handler.apply(self, args);else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
  }
}
EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = type === 'error';
  events = this._events;
  if (events) doError = doError && events.error == null;else if (!doError) return false;
  domain = this.domain;
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er) er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er;
    } else {
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }
  handler = events[type];
  if (!handler) return false;
  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++) args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }
  return true;
};
function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    if (events.newListener) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);
      events = target._events;
    }
    existing = events[type];
  }
  if (!existing) {
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
    } else {
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }
  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}
EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
  events = this._events;
  if (!events) return this;
  list = events[type];
  if (!list) return this;
  if (list === listener || list.listener && list.listener === listener) {
    if (--this._eventsCount === 0) this._events = new EventHandlers();else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;
    for (i = list.length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }
    if (position < 0) return this;
    if (list.length === 1) {
      list[0] = undefined;
      if (--this._eventsCount === 0) {
        this._events = new EventHandlers();
        return this;
      } else {
        delete events[type];
      }
    } else {
      spliceOne(list, position);
    }
    if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events;
  events = this._events;
  if (!events) return this;
  if (!events.removeListener) {
    if (arguments.length === 0) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    } else if (events[type]) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
    }
    return this;
  }
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    for (var i = 0, key; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = new EventHandlers();
    this._eventsCount = 0;
    return this;
  }
  listeners = events[type];
  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners) {
    do {
      this.removeListener(type, listeners[listeners.length - 1]);
    } while (listeners[0]);
  }
  return this;
};
EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;
  if (!events) ret = [];else {
    evlistener = events[type];
    if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
  }
  return ret;
};
EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;
  if (events) {
    var evlistener = events[type];
    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];
  list.pop();
}
function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--) copy[i] = arr[i];
  return copy;
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

EventEmitter.defaultMaxListeners = 0;
var Linter = function (_EventEmitter) {
  _inherits(Linter, _EventEmitter);
  function Linter() {
    _classCallCheck(this, Linter);
    return _possibleConstructorReturn(this, _getPrototypeOf(Linter).apply(this, arguments));
  }
  _createClass(Linter, [{
    key: "verify",
    value: function verify(str, config) {
      var _this = this;
      this.messages = [];
      this.str = str;
      this.config = config;
      if (config) {
        if (_typeof(config) !== "object") {
          throw new Error("emlint/verify(): [THROW_ID_01] second input argument, config is not a plain object but ".concat(_typeof(config), ". It's equal to:\n").concat(JSON.stringify(config, null, 4)));
        } else if (!Object.keys(config).length) {
          return this.messages;
        } else if (!config.rules || _typeof(config.rules) !== "object") {
          throw new Error("emlint/verify(): [THROW_ID_02] config contains no rules! It was given as:\n".concat(JSON.stringify(config, null, 4)));
        }
      } else {
        return this.messages;
      }
      var processedRulesConfig = normaliseRequestedRules(config.rules);
      this.processedRulesConfig = processedRulesConfig;
      Object.keys(processedRulesConfig)
      .filter(function (ruleName) {
        return get(ruleName);
      })
      .filter(function (ruleName) {
        if (typeof processedRulesConfig[ruleName] === "number") {
          return processedRulesConfig[ruleName] > 0;
        } else if (Array.isArray(processedRulesConfig[ruleName])) {
          return processedRulesConfig[ruleName][0] > 0;
        }
      }).forEach(function (rule) {
        var rulesFunction;
        if (Array.isArray(processedRulesConfig[rule]) && processedRulesConfig[rule].length > 1) {
          rulesFunction = get(rule).apply(void 0, [_this].concat(_toConsumableArray(processedRulesConfig[rule].slice(1))));
        } else {
          rulesFunction = get(rule)(_this);
        }
        Object.keys(rulesFunction).forEach(function (consumedNode) {
          _this.on(consumedNode, function () {
            var _rulesFunction;
            (_rulesFunction = rulesFunction)[consumedNode].apply(_rulesFunction, arguments);
          });
        });
      });
      this.emit("ast", traverse(parser(str, {
        charCb: function charCb(obj) {
          _this.emit("character", obj);
        },
        errCb: function errCb(obj) {
          var currentRulesSeverity = isAnEnabledRule(config.rules, obj.ruleId);
          if (currentRulesSeverity) {
            var message = "Something is wrong.";
            if (isObj(obj) && Object.keys(astErrMessages).includes(obj.ruleId)) {
              message = astErrMessages[obj.ruleId];
            }
            _this.report(Object.assign({
              message: message,
              severity: currentRulesSeverity,
              fix: null
            }, obj));
          }
        }
      }),
      function (key, val) {
        var current = val !== undefined ? val : key;
        if (isObj(current)) {
          _this.emit(current.type, current);
          if (current.type === "tag" && Array.isArray(current.attribs) && current.attribs.length) {
            current.attribs.forEach(function (attribObj) {
              _this.emit("attribute", Object.assign({}, attribObj, {
                parent: Object.assign({}, current)
              }));
            });
          }
        }
        return current;
      }));
      if (Object.keys(config.rules).some(function (ruleName) {
        return (ruleName === "all" ||
        ruleName === "bad-html-entity" ||
        ruleName.startsWith("bad-html-entity") || ruleName.startsWith("bad-named-html-entity") || matcher.isMatch(["bad-malformed-numeric-character-entity"], ruleName)) && (isAnEnabledValue(config.rules[ruleName]) || isAnEnabledValue(processedRulesConfig[ruleName]));
      })) {
        stringFixBrokenNamedEntities(str, {
          cb: function cb(obj) {
            var matchedRulesName;
            var severity;
            if (Object.keys(config.rules).includes("bad-html-entity")) {
              if (obj.ruleName === "bad-named-html-entity-unrecognised") {
                severity = 1;
              } else if (Array.isArray(config.rules["bad-html-entity"])) {
                severity = config.rules["bad-html-entity"][0];
              } else if (Number.isInteger(config.rules["bad-html-entity"])) {
                severity = config.rules["bad-html-entity"];
              }
            } else if (Object.keys(config.rules).some(function (rulesName) {
              if (matcher.isMatch(obj.ruleName, rulesName)) {
                matchedRulesName = rulesName;
                return true;
              }
            })) {
              if (obj.ruleName === "bad-named-html-entity-unrecognised" && config.rules["bad-named-html-entity-unrecognised"] === undefined) {
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
                message = "Malformed ".concat(obj.entityName ? obj.entityName : "named", " entity.");
              }
              var ranges = [[obj.rangeFrom, obj.rangeTo, obj.rangeValEncoded ? obj.rangeValEncoded : ""]];
              if (obj.ruleName === "bad-named-html-entity-unrecognised") {
                ranges = [];
              }
              _this.report({
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
            _this.emit("entity", {
              idxFrom: from,
              idxTo: to
            });
          }
        });
      }
      ["tag", "at", "rule", "text", "esp", "character"].forEach(function (eventName) {
        _this.removeAllListeners(eventName);
      });
      return this.messages;
    }
  }, {
    key: "report",
    value: function report(obj) {
      var _lineColumn = lineColumn(this.str, obj.idxFrom),
          line = _lineColumn.line,
          col = _lineColumn.col;
      var severity = obj.severity;
      if (!Number.isInteger(obj.severity) && typeof this.processedRulesConfig[obj.ruleId] === "number") {
        severity = this.processedRulesConfig[obj.ruleId];
      } else if (!Number.isInteger(obj.severity) && Array.isArray(this.processedRulesConfig[obj.ruleId])) {
        severity = this.processedRulesConfig[obj.ruleId][0];
      }
      this.messages.push(Object.assign({}, {
        line: line,
        column: col,
        severity: severity
      }, obj));
    }
  }]);
  return Linter;
}(EventEmitter);

var version = "2.14.0";

exports.Linter = Linter;
exports.version = version;
