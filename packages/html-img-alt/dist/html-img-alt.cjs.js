/** 
 * html-img-alt
 * Adds missing ALT attributes to IMG tags and cleans within IMG tags. No HTML parsing used.
 * Version: 1.4.13
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/html-img-alt
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var unfancy = _interopDefault(require('string-unfancy'));
var apply = _interopDefault(require('ranges-apply'));
var Ranges = _interopDefault(require('ranges-push'));
var checkTypes = _interopDefault(require('check-types-mini'));
var isObj = _interopDefault(require('lodash.isplainobject'));

function _typeof(obj) {
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

function alts(str, originalOpts) {
  function existy(x) {
    return x != null;
  }
  if (typeof str !== "string") {
    throw new TypeError("html-img-alt/alts(): [THROW_ID_01] Input must be string! Currently its type is: ".concat(_typeof(str), ", equal to: ").concat(JSON.stringify(str, null, 4)));
  }
  if (existy(originalOpts) && !isObj(originalOpts)) {
    throw new TypeError("html-img-alt/alts(): [THROW_ID_02] Options object must be a plain object! Currently its type is: ".concat(_typeof(originalOpts), ", equal to: ").concat(JSON.stringify(originalOpts, null, 4)));
  }
  var finalSpaceNeeded;
  var withinImageTag = false;
  var withinQuotes = false;
  var imageTagStartedAt = 0;
  var whitespaceStarted = 0;
  var slashStartedAt = 0;
  var altContentsStart = 0;
  var withinAlt = false;
  var thereShouldBeEqualCharacterHere = 0;
  var thereShouldBeTheFirstDoubleQuoteHere = 0;
  var thereShouldBeTheSecondDoubleQuoteHere = 0;
  var addSpaceInTheFutureBeforeSlashOrBracket = false;
  var altBegins = null;
  var rangesArr = new Ranges();
  var plausibleWithinQuotesRanges = new Ranges();
  var defaults = {
    unfancyTheAltContents: true
  };
  var opts = Object.assign({}, defaults, originalOpts);
  checkTypes(opts, defaults, {
    msg: "html-img-alt/alts(): [THROW_ID_03]"
  });
  for (var i = 0, len = str.length; i < len; i++) {
    var charcode = str[i].charCodeAt(0);
    if ("".concat(str[i]).concat(str[i + 1]).concat(str[i + 2]).concat(str[i + 3]) === "<img") {
      if (!withinImageTag) {
        withinImageTag = true;
        imageTagStartedAt = i;
      } else {
        throw new TypeError("html-img-alt/alts(): [THROW_ID_02] Something is wrong with the code - there's an image tag within an image tag. First image tag was: ".concat(str.slice(imageTagStartedAt - 20, imageTagStartedAt + 20), ", then before it was closed, we've got this: ").concat(str.slice(i - 20, i + 20)));
      }
    }
    if (withinImageTag && str[i] === "/") {
      slashStartedAt = i;
    }
    if (withinImageTag && !withinQuotes) {
      if ("".concat(str[i]).concat(str[i + 1]).concat(str[i + 2]) === "alt") {
        altBegins = i;
      } else if ("".concat(str[i - 3]).concat(str[i - 2]).concat(str[i - 1]) === "alt") {
        withinAlt = true;
      }
    }
    if (withinAlt && str[i].trim() !== "" && str[i] !== "=" && str[i] !== '"') {
      withinAlt = false;
    }
    if (altBegins && i === altBegins + 3) {
      thereShouldBeEqualCharacterHere = i;
    }
    if (str[i] === "=") {
      if (altBegins) {
        thereShouldBeEqualCharacterHere = 0;
        thereShouldBeTheFirstDoubleQuoteHere = i + 1;
      }
      if (plausibleWithinQuotesRanges.current() && plausibleWithinQuotesRanges.current().length) {
        plausibleWithinQuotesRanges.wipe();
      }
      if (withinQuotes && str[i + 1] === '"') {
        withinQuotes = false;
        altContentsStart = 0;
      }
    }
    if (whitespaceStarted && str[i].trim() !== "") {
      if (whitespaceStarted < i - 1 + (str[i] === ">" || str[i] === "'" || slashStartedAt || thereShouldBeEqualCharacterHere || thereShouldBeTheFirstDoubleQuoteHere || thereShouldBeTheSecondDoubleQuoteHere ? 1 : 0)) {
        if (!withinQuotes) {
          rangesArr.add(whitespaceStarted, i - 1 + (str[i] === ">" || str[i] === "'" || slashStartedAt || thereShouldBeEqualCharacterHere || thereShouldBeTheFirstDoubleQuoteHere || thereShouldBeTheSecondDoubleQuoteHere ? 1 : 0));
        } else {
          plausibleWithinQuotesRanges.add(whitespaceStarted, i - 1 + (str[i] === ">" || str[i] === "'" || slashStartedAt || thereShouldBeEqualCharacterHere || thereShouldBeTheFirstDoubleQuoteHere || thereShouldBeTheSecondDoubleQuoteHere ? 1 : 0));
        }
        if (str[i] === ">" || str[i] === "/") {
          addSpaceInTheFutureBeforeSlashOrBracket = true;
        }
        if (thereShouldBeEqualCharacterHere && str[i] !== "=" && i >= thereShouldBeEqualCharacterHere || thereShouldBeTheFirstDoubleQuoteHere && str[i] !== '"' && i >= thereShouldBeTheFirstDoubleQuoteHere) {
          var missingTrailingSpace = "";
          var location = thereShouldBeEqualCharacterHere || thereShouldBeTheFirstDoubleQuoteHere;
          var thingToAdd = "";
          if (thereShouldBeEqualCharacterHere) {
            thingToAdd += "=";
          }
          if (!withinQuotes) {
            rangesArr.add(location, location, "".concat(thingToAdd, "\"\"").concat(missingTrailingSpace));
          }
          thereShouldBeEqualCharacterHere = 0;
          thereShouldBeTheFirstDoubleQuoteHere = 0;
        }
      }
      whitespaceStarted = 0;
    }
    if (str[i] === '"') {
      withinQuotes = !withinQuotes;
      if (i === thereShouldBeTheFirstDoubleQuoteHere) {
        thereShouldBeTheSecondDoubleQuoteHere = i + 1;
      }
    }
    if (str[i] === '"') {
      if (thereShouldBeTheFirstDoubleQuoteHere && i >= thereShouldBeTheFirstDoubleQuoteHere) {
        thereShouldBeTheSecondDoubleQuoteHere = thereShouldBeTheFirstDoubleQuoteHere;
        thereShouldBeTheFirstDoubleQuoteHere = 0;
        if (withinAlt) {
          altContentsStart = i + 1;
          withinAlt = false;
        }
        if (str[i + 1].trim() === "/" || str[i + 1].trim() === ">") {
          addSpaceInTheFutureBeforeSlashOrBracket = true;
          finalSpaceNeeded = false;
        }
      } else if (thereShouldBeTheSecondDoubleQuoteHere && i >= thereShouldBeTheSecondDoubleQuoteHere) {
        plausibleWithinQuotesRanges.wipe();
        thereShouldBeTheSecondDoubleQuoteHere = 0;
        if (str[i + 1] === ">" || str[i + 1] === "/") {
          addSpaceInTheFutureBeforeSlashOrBracket = true;
          finalSpaceNeeded = false;
        }
        if (altContentsStart && opts.unfancyTheAltContents) {
          var altContents = str.slice(altContentsStart, i);
          if (unfancy(altContents).trim() !== altContents) {
            rangesArr.add(altContentsStart, i, unfancy(altContents).trim());
          }
        }
        altContentsStart = 0;
      }
    }
    if (withinImageTag && !withinQuotes && str[i] === "'") {
      rangesArr.add(i, i + 1);
      if (str[i + 1] === "/" || str[i + 1] === ">") {
        addSpaceInTheFutureBeforeSlashOrBracket = true;
      }
    }
    if (withinImageTag && str[i] === ">") {
      imageTagStartedAt = 0;
      withinQuotes = false;
      if (altBegins === null) {
        if (slashStartedAt) {
          rangesArr.add(slashStartedAt, slashStartedAt, ' alt="" ');
        } else {
          rangesArr.add(i, i, ' alt="" ');
        }
        finalSpaceNeeded = false;
        addSpaceInTheFutureBeforeSlashOrBracket = false;
      }
      if (!slashStartedAt && thereShouldBeEqualCharacterHere === i) {
        rangesArr.add(i, i, '="" ');
        finalSpaceNeeded = false;
      } else if (slashStartedAt && thereShouldBeEqualCharacterHere === i - 1) {
        rangesArr.add(i - 1, i - 1, '="" ');
        finalSpaceNeeded = false;
      }
      if (!slashStartedAt && thereShouldBeTheFirstDoubleQuoteHere && thereShouldBeTheFirstDoubleQuoteHere <= i) {
        rangesArr.add(i, i, '"" ');
        addSpaceInTheFutureBeforeSlashOrBracket = false;
      } else if (slashStartedAt && thereShouldBeTheFirstDoubleQuoteHere && thereShouldBeTheFirstDoubleQuoteHere <= i) {
        rangesArr.add(i - 1, i - 1, '"" ');
        addSpaceInTheFutureBeforeSlashOrBracket = false;
      } else if (!slashStartedAt && thereShouldBeTheSecondDoubleQuoteHere && thereShouldBeTheSecondDoubleQuoteHere <= i) {
        rangesArr.add(i, i, '"');
        addSpaceInTheFutureBeforeSlashOrBracket = true;
        if (plausibleWithinQuotesRanges.current()) {
          plausibleWithinQuotesRanges.current().forEach(function (key) {
            rangesArr.add(key[0], key[1], key[2]);
          });
        }
        rangesArr.current();
        plausibleWithinQuotesRanges.wipe();
      } else if (slashStartedAt && thereShouldBeTheSecondDoubleQuoteHere && thereShouldBeTheSecondDoubleQuoteHere <= i) {
        rangesArr.add(thereShouldBeTheSecondDoubleQuoteHere + 1, thereShouldBeTheSecondDoubleQuoteHere + 1, '"');
        if (plausibleWithinQuotesRanges.current()) {
          plausibleWithinQuotesRanges.current().forEach(function (key) {
            rangesArr.add(key[0], key[1], key[2]);
          });
        }
        plausibleWithinQuotesRanges.wipe();
        rangesArr.current();
      }
      if (finalSpaceNeeded || addSpaceInTheFutureBeforeSlashOrBracket) {
        if (slashStartedAt) {
          rangesArr.add(slashStartedAt, slashStartedAt, " ");
        } else {
          rangesArr.add(i, i, " ");
        }
      }
      withinImageTag = false;
      altBegins = null;
      thereShouldBeTheFirstDoubleQuoteHere = 0;
      thereShouldBeTheSecondDoubleQuoteHere = 0;
      finalSpaceNeeded = false;
    }
    if (slashStartedAt && str[i] !== "/" && str[i].trim() !== "") {
      slashStartedAt = 0;
      thereShouldBeEqualCharacterHere = 0;
      thereShouldBeTheFirstDoubleQuoteHere = 0;
      thereShouldBeTheSecondDoubleQuoteHere = 0;
    }
    if (withinImageTag && str[i].trim() === "" && !whitespaceStarted) {
      whitespaceStarted = i;
    }
  }
  if (existy(rangesArr.current()) && rangesArr.current().length > 0) {
    return apply(str, rangesArr.current());
  }
  return str;
}

module.exports = alts;
