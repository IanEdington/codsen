'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var checkTypes = _interopDefault(require('check-types-mini'));
var isObj = _interopDefault(require('lodash.isplainobject'));
var replaceSlicesArr = _interopDefault(require('string-replace-slices-array'));
var Slices = _interopDefault(require('string-slices-array-push'));
var stringMatchLeftRight = require('string-match-left-right');

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint no-lonely-if:0, no-loop-func:0, max-len:0, security/detect-object-injection:0 */

function collapse(str, originalOpts) {
  // f's
  function charCodeBetweenInclusive(character, from, end) {
    return character.charCodeAt(0) >= from && character.charCodeAt(0) <= end;
  }
  function isSpaceOrLeftBracket(character) {
    return character === '<' || character.trim() === '';
  }
  if (typeof str !== 'string') {
    throw new Error('string-collapse-white-space/collapse(): [THROW_ID_01] The input is not string but ' + (typeof str === 'undefined' ? 'undefined' : _typeof(str)) + ', equal to: ' + JSON.stringify(str, null, 4));
  }
  if (originalOpts !== undefined && originalOpts !== null && !isObj(originalOpts)) {
    throw new Error('string-collapse-white-space/collapse(): [THROW_ID_02] The opts is not a plain object but ' + (typeof originalOpts === 'undefined' ? 'undefined' : _typeof(originalOpts)) + ', equal to:\n' + JSON.stringify(originalOpts, null, 4));
  }
  if (str.length === 0) {
    return '';
  }

  var finalIndexesToDelete = new Slices();

  // declare defaults, so we can enforce types later:
  var defaults = {
    trimStart: true, // otherwise, leading whitespace will be collapsed to a single space
    trimEnd: true, // otherwise, trailing whitespace will be collapsed to a single space
    trimLines: false, // activates trim per-line basis
    trimnbsp: false, // non-breaking spaces are trimmed too
    recogniseHTML: true // collapses whitespace around HTML brackets


    // fill any settings with defaults if missing:
  };var opts = Object.assign({}, defaults, originalOpts);

  // the check:
  checkTypes(opts, defaults, { msg: 'string-collapse-white-space/collapse(): [THROW_ID_03*]' });

  var preliminaryIndexesToDelete = void 0;
  if (opts.recogniseHTML) {
    preliminaryIndexesToDelete = new Slices();
  }

  // -----------------------------------------------------------------------------

  // const DEBUG = 0
  var res = str;
  var spacesEndAt = null;
  var whiteSpaceEndsAt = null;
  var lineWhiteSpaceEndsAt = null;
  var endingOfTheLine = false;
  var stateWithinTag = false;
  var whiteSpaceWithinTagEndsAt = null;
  var tagMatched = false;
  var tagCanEndHere = false;
  var count = void 0;
  var bail = false; // bool flag to notify when false positive detected, used in HTML detection
  var resetCounts = function resetCounts() {
    return {
      equalDoubleQuoteCombo: 0,
      equalOnly: 0,
      doubleQuoteOnly: 0,
      spacesBetweenLetterChunks: 0,
      linebreaks: 0
    };
  };
  var bracketJustFound = false; // dumb state switch, activated by > and terminated by
  // first non-whitespace char

  if (opts.recogniseHTML) {
    count = resetCounts(); // initiates the count object, assigning all keys to zero
  }

  // looping backwards for better efficiency
  for (var i = str.length; i--;) {
    // if (DEBUG) { console.log(`------------------------ ${str[i].trim() !== '' ? str[i] : 'space'}`) }
    //
    // space clauses
    if (str[i] === ' ') {
      if (spacesEndAt === null) {
        spacesEndAt = i;
      }
    } else if (spacesEndAt !== null) {
      // it's not a space character
      // if we have a sequence of spaces, this character terminates that sequence
      if (i + 1 !== spacesEndAt) {
        finalIndexesToDelete.add(i + 1, spacesEndAt);
      }
      spacesEndAt = null;
    }

    // white space clauses
    if (str[i].trim() === '' && (!opts.trimnbsp && str[i] !== '\xa0' || opts.trimnbsp)) {
      // it's some sort of white space character, but not a non-breaking space
      if (whiteSpaceEndsAt === null) {
        whiteSpaceEndsAt = i;
      }
      // line trimming:
      if (str[i] !== '\n' && str[i] !== '\r' && lineWhiteSpaceEndsAt === null) {
        lineWhiteSpaceEndsAt = i + 1;
      }
      if (str[i] === '\n' || str[i] === '\r') {
        if (lineWhiteSpaceEndsAt !== null) {
          if (opts.trimLines) {
            finalIndexesToDelete.add(i + 1, lineWhiteSpaceEndsAt);
          }
          lineWhiteSpaceEndsAt = null;
        }
        if (str[i - 1] !== '\n' && str[i - 1] !== '\r') {
          lineWhiteSpaceEndsAt = i;
          endingOfTheLine = true;
        }
      }
    } else {
      // it's not white space character
      if (whiteSpaceEndsAt !== null) {
        if (i + 1 !== whiteSpaceEndsAt + 1 && whiteSpaceEndsAt === str.length - 1 && opts.trimEnd) {
          finalIndexesToDelete.add(i + 1, whiteSpaceEndsAt + 1);
        }
        whiteSpaceEndsAt = null;
      }

      // encountered letter resets line trim counters:
      if (lineWhiteSpaceEndsAt !== null) {
        if (endingOfTheLine && opts.trimLines) {
          endingOfTheLine = false; // apply either way
          finalIndexesToDelete.add(i + 1, lineWhiteSpaceEndsAt);
        }
        lineWhiteSpaceEndsAt = null;
      }
    }

    // this chunk could be ported to the (str[i].trim() === '') clause for example,
    // but it depends on the flags that aforementioned's "else" is setting,
    // (whiteSpaceEndsAt !== null),
    // therefore it's less code if we put zero index clauses here.
    if (i === 0) {
      if (whiteSpaceEndsAt !== null && opts.trimStart) {
        finalIndexesToDelete.add(0, whiteSpaceEndsAt + 1);
      } else if (spacesEndAt !== null) {
        finalIndexesToDelete.add(i + 1, spacesEndAt + 1);
      }
    }

    if (opts.recogniseHTML) {
      if (str[i].trim() === '') {
        // W H I T E S P A C E
        if (stateWithinTag && !tagCanEndHere) {
          tagCanEndHere = true;
        }
        if (tagMatched && !whiteSpaceWithinTagEndsAt) {
          // cases where there's space between opening bracket and a confirmed HTML tag name
          whiteSpaceWithinTagEndsAt = i + 1;
        }
        if (tagMatched && str[i - 1] !== undefined && str[i - 1].trim() !== '' && str[i - 1] !== '<' && str[i - 1] !== '/') {
          // bail, something's wrong, there's non-whitespace character to the left of a
          // recognised HTML tag. For example: "< zzz div ...>"
          tagMatched = false;
          stateWithinTag = false;
          preliminaryIndexesToDelete.wipe();
          // if (DEBUG) { console.log('wipe at row 176') }
        }
        if (!bail && !bracketJustFound && str[i].trim() === '' && str[i - 1] !== '<' && (str[i + 1] === undefined || str[i + 1].trim() !== '' && str[i + 1].trim() !== '/')) {
          if (str[i - 1] === undefined || str[i - 1].trim() !== '' && str[i - 1] !== '<' && str[i - 1] !== '/') {
            // if (DEBUG) { console.log(`190: count.spacesBetweenLetterChunks was ${count.spacesBetweenLetterChunks}`) }
            count.spacesBetweenLetterChunks += 1;
            // if (DEBUG) { console.log(`192: count.spacesBetweenLetterChunks became ${count.spacesBetweenLetterChunks}`) }
          } else {
            // loop backwards and check, is the first non-space char being "<".
            for (var y = i - 1; y--;) {
              if (str[y].trim() !== '') {
                if (str[y] === '<') {
                  bail = true;
                } else if (str[y] !== '/') {
                  // if (DEBUG) { console.log(`199: count.spacesBetweenLetterChunks was ${count.spacesBetweenLetterChunks}`) }
                  count.spacesBetweenLetterChunks += i - y;
                  // if (DEBUG) { console.log(`201: count.spacesBetweenLetterChunks became ${count.spacesBetweenLetterChunks}`) }
                }
                break;
              }
            }
          }
        }
      } else {
        // N O T   W H I T E S P A C E

        // =========
        // count equal characters and double quotes
        if (str[i] === '=') {
          count.equalOnly += 1;
          if (str[i + 1] === '"') {
            count.equalDoubleQuoteCombo += 1;
          }
        } else if (str[i] === '"') {
          count.doubleQuoteOnly += 1;
        }

        // if the dumb flag is on, turn it off.
        // first non-whitespace character deactivates it.
        if (bracketJustFound) {
          bracketJustFound = false;
        }

        // =========
        // terminate existing range, push the captured range into preliminaries' array
        if (whiteSpaceWithinTagEndsAt !== null) {
          preliminaryIndexesToDelete.add(i + 1, whiteSpaceWithinTagEndsAt);
          // finalIndexesToDelete.add(i + 1, whiteSpaceWithinTagEndsAt)
          whiteSpaceWithinTagEndsAt = null;
        }

        // =========
        // html detection bits:
        // mind you, we're iterating backwards, so tag starts with ">"
        if (str[i] === '>') {
          // first, reset the count obj.
          count = resetCounts(count);
          // set dumb bracket flag to on
          bracketJustFound = true;
          // two cases:
          if (stateWithinTag) {
            // this is bad, another closing bracket
            preliminaryIndexesToDelete.wipe();
            // if (DEBUG) { console.log('wipe at row 244') }
          } else {
            stateWithinTag = true;
            if (str[i - 1] !== undefined && str[i - 1].trim() === '' && !whiteSpaceWithinTagEndsAt) {
              whiteSpaceWithinTagEndsAt = i;
            }
          }
          if (!tagCanEndHere) {
            tagCanEndHere = true;
            // tag name might be ending with bracket: <br>
          }
        } else if (str[i] === '<') {
          // if (DEBUG) { console.log(`preliminaryIndexesToDelete.current() = ${JSON.stringify(preliminaryIndexesToDelete.current(), null, 4)}`) }
          // the rest of calculations:
          stateWithinTag = false;
          // reset bail flag
          if (bail) {
            bail = false;
          }
          // bail clause, when false positives are detected, such as "a < b and c > d" -
          // the part: < b and c > looks really deceptive, b is valid tag name...
          // this bail will detect such cases, freak out and bail, wiping preliminary ranges.
          if (count.spacesBetweenLetterChunks > 0 && count.equalDoubleQuoteCombo === 0) {
            tagMatched = false;
            preliminaryIndexesToDelete.wipe();
            // if (DEBUG) { console.log('wipe at row 270') }
          }
          // if somehow we're within a tag and there are already provisional ranges
          if (tagMatched && preliminaryIndexesToDelete.current()) {
            preliminaryIndexesToDelete.current().forEach(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  rangeStart = _ref2[0],
                  rangeEnd = _ref2[1];

              return finalIndexesToDelete.add(rangeStart, rangeEnd);
            });
            tagMatched = false;
          }
          // finally, reset the count obj.
          count = resetCounts(count);
        } else if (stateWithinTag && str[i] === '/') {
          whiteSpaceWithinTagEndsAt = i;
        } else if (stateWithinTag && !tagMatched) {
          if (tagCanEndHere && charCodeBetweenInclusive(str[i], 97, 122)) {
            // if letters a-z, inclusive:
            // ---------------------------------------------------------------
            tagCanEndHere = false;
            if (charCodeBetweenInclusive(str[i], 97, 110)) {
              // if letters a-n, inclusive:
              if (str[i] === 'a' && (str[i - 1] === 'e' && stringMatchLeftRight.matchLeftIncl(str, i, ['area', 'textarea'], { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 't' && stringMatchLeftRight.matchLeftIncl(str, i, ['data', 'meta'], { cb: isSpaceOrLeftBracket, i: true }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === 'b' && (stringMatchLeftRight.matchLeftIncl(str, i, ['rb', 'sub'], { cb: isSpaceOrLeftBracket, i: true }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === 'c' && stringMatchLeftRight.matchLeftIncl(str, i, 'rtc', { cb: isSpaceOrLeftBracket, i: true }) || str[i] === 'd' && (str[i - 1] === 'a' && stringMatchLeftRight.matchLeftIncl(str, i, ['head', 'thead'], { cb: isSpaceOrLeftBracket, i: true }) || stringMatchLeftRight.matchLeftIncl(str, i, ['kbd', 'dd', 'embed', 'legend', 'td'], { cb: isSpaceOrLeftBracket, i: true })) || str[i] === 'e' && (stringMatchLeftRight.matchLeftIncl(str, i, 'source', { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 'd' && stringMatchLeftRight.matchLeftIncl(str, i, ['aside', 'code'], { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 'l' && stringMatchLeftRight.matchLeftIncl(str, i, ['table', 'article', 'title', 'style'], { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 'm' && stringMatchLeftRight.matchLeftIncl(str, i, ['iframe', 'time'], { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 'r' && stringMatchLeftRight.matchLeftIncl(str, i, ['pre', 'figure', 'picture'], { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 't' && stringMatchLeftRight.matchLeftIncl(str, i, ['template', 'cite', 'blockquote'], { cb: isSpaceOrLeftBracket, i: true }) || stringMatchLeftRight.matchLeftIncl(str, i, 'base', { cb: isSpaceOrLeftBracket, i: true }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === 'g' && stringMatchLeftRight.matchLeftIncl(str, i, ['img', 'strong', 'dialog', 'svg'], { cb: isSpaceOrLeftBracket, i: true }) || str[i] === 'h' && stringMatchLeftRight.matchLeftIncl(str, i, ['th', 'math'], { cb: isSpaceOrLeftBracket, i: true }) || str[i] === 'i' && (stringMatchLeftRight.matchLeftIncl(str, i, ['bdi', 'li'], { cb: isSpaceOrLeftBracket, i: true }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === 'k' && stringMatchLeftRight.matchLeftIncl(str, i, ['track', 'link', 'mark'], { cb: isSpaceOrLeftBracket, i: true }) || str[i] === 'l' && stringMatchLeftRight.matchLeftIncl(str, i, ['html', 'ol', 'ul', 'dl', 'label', 'del', 'small', 'col'], { cb: isSpaceOrLeftBracket, i: true }) || str[i] === 'm' && stringMatchLeftRight.matchLeftIncl(str, i, ['param', 'em', 'menuitem', 'form'], { cb: isSpaceOrLeftBracket, i: true }) || str[i] === 'n' && (str[i - 1] === 'o' && stringMatchLeftRight.matchLeftIncl(str, i, ['section', 'caption', 'figcaption', 'option', 'button'], { cb: isSpaceOrLeftBracket, i: true }) || stringMatchLeftRight.matchLeftIncl(str, i, ['span', 'keygen', 'dfn', 'main'], { cb: isSpaceOrLeftBracket, i: true }))) {
                tagMatched = true;
              }
            } else {
              // o-z, inclusive. codes 111-122, inclusive
              if (str[i] === 'o' && stringMatchLeftRight.matchLeftIncl(str, i, ['bdo', 'video', 'audio'], { cb: isSpaceOrLeftBracket, i: true }) || str[i] === 'p' && (isSpaceOrLeftBracket(str[i - 1]) || str[i - 1] === 'u' && stringMatchLeftRight.matchLeftIncl(str, i, ['hgroup', 'colgroup', 'optgroup', 'sup'], { cb: isSpaceOrLeftBracket, i: true }) || stringMatchLeftRight.matchLeftIncl(str, i, ['map', 'samp', 'rp'], { cb: isSpaceOrLeftBracket, i: true })) || str[i] === 'q' && isSpaceOrLeftBracket(str[i - 1]) || str[i] === 'r' && (str[i - 1] === 'e' && stringMatchLeftRight.matchLeftIncl(str, i, ['header', 'meter', 'footer'], { cb: isSpaceOrLeftBracket, i: true }) || stringMatchLeftRight.matchLeftIncl(str, i, ['var', 'br', 'abbr', 'wbr', 'hr', 'tr'], { cb: isSpaceOrLeftBracket, i: true })) || str[i] === 's' && (str[i - 1] === 's' && stringMatchLeftRight.matchLeftIncl(str, i, ['address', 'progress'], { cb: isSpaceOrLeftBracket, i: true }) || stringMatchLeftRight.matchLeftIncl(str, i, ['canvas', 'details', 'ins'], { cb: isSpaceOrLeftBracket, i: true }) || isSpaceOrLeftBracket(str[i - 1])) || str[i] === 't' && (str[i - 1] === 'c' && stringMatchLeftRight.matchLeftIncl(str, i, ['object', 'select'], { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 'o' && stringMatchLeftRight.matchLeftIncl(str, i, ['slot', 'tfoot'], { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 'p' && stringMatchLeftRight.matchLeftIncl(str, i, ['script', 'noscript'], { cb: isSpaceOrLeftBracket, i: true }) || str[i - 1] === 'u' && stringMatchLeftRight.matchLeftIncl(str, i, ['input', 'output'], { cb: isSpaceOrLeftBracket, i: true }) || stringMatchLeftRight.matchLeftIncl(str, i, ['fieldset', 'rt', 'datalist', 'dt'], { cb: isSpaceOrLeftBracket, i: true })) || str[i] === 'u' && (isSpaceOrLeftBracket(str[i - 1]) || stringMatchLeftRight.matchLeftIncl(str, i, 'menu', { cb: isSpaceOrLeftBracket, i: true })) || str[i] === 'v' && stringMatchLeftRight.matchLeftIncl(str, i, ['nav', 'div'], { cb: isSpaceOrLeftBracket, i: true }) || str[i] === 'y' && stringMatchLeftRight.matchLeftIncl(str, i, ['ruby', 'body', 'tbody', 'summary'], { cb: isSpaceOrLeftBracket, i: true })) {
                tagMatched = true;
              }
            }

            // ---------------------------------------------------------------
          } else if (tagCanEndHere && charCodeBetweenInclusive(str[i], 49, 54)) {
            // if digits 1-6
            tagCanEndHere = false;
            if (str[i - 1] === 'h' && (str[i - 2] === '<' || str[i - 2].trim() === '')) {
              tagMatched = true;
            }
          } else if (str[i] === '=' || str[i] === '"') {
            tagCanEndHere = false;
          }
        }
      }
    }
  }

  // apply the ranges, creating the result string
  if (finalIndexesToDelete.current()) {
    res = replaceSlicesArr(str, finalIndexesToDelete.current());
    finalIndexesToDelete.wipe();
    finalIndexesToDelete = undefined; // putting up our class for garbage collector
  }

  return res;
}

module.exports = collapse;
