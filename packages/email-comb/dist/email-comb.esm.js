/**
 * email-comb
 * Remove unused CSS from email templates
 * Version: 2.0.8
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/email-comb
 */

import { matchRightIncl, matchLeft, matchRight } from 'string-match-left-right';
import emptyCondCommentRegex from 'regex-empty-conditional-comments';
import pullAllWithGlob from 'array-pull-all-with-glob';
import extract from 'string-extract-class-names';
import intersection from 'lodash.intersection';
import expander from 'string-range-expander';
import isObj from 'lodash.isplainobject';
import applySlices from 'ranges-apply';
import pullAll from 'lodash.pullall';
import isEmpty from 'ast-is-empty';
import Slices from 'ranges-push';
import uniq from 'lodash.uniq';
import matcher from 'matcher';

function generateShortname(seed) {
  const library = "abcdefghijklmnopqrstuvwxyz";
  const libraryLength = 26;
  let prefix = "";
  if (seed >= libraryLength) {
    prefix = generateShortname(Math.floor(seed / libraryLength) - 1);
  }
  return prefix + library[seed % libraryLength];
}

const isArr = Array.isArray;
function comb(str, opts) {
  const start = Date.now();
  const finalIndexesToDelete = new Slices({ limitToBeAddedWhitespace: true });
  const currentChunksMinifiedSelectors = new Slices();
  const lineBreaksToDelete = new Slices();
  function characterSuitableForNames(char) {
    return /[-_A-Za-z0-9]/.test(char);
  }
  function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  function existy(x) {
    return x != null;
  }
  function isStr(something) {
    return typeof something === "string";
  }
  function resetBodyClassOrId(initObj = {}) {
    return Object.assign(
      {
        valuesStart: null,
        valueStart: null,
        nameStart: null
      },
      initObj
    );
  }
  let i;
  let prevailingEOL;
  let styleStartedAt;
  let styleEndedAt;
  const headSelectorsArr = [];
  const bodyClassesArr = [];
  const bodyIdsArr = [];
  let commentStartedAt;
  let commentNearlyStartedAt;
  let bodyStartedAt;
  let bodyClass;
  let bodyId;
  const headSelectorsCount = {};
  let totalCounter = 0;
  let checkingInsideCurlyBraces;
  let insideCurlyBraces;
  let beingCurrentlyAt;
  let bodyItsTheFirstClassOrId;
  let bogusHTMLComment;
  let ruleChunkStartedAt;
  let headSelectorChunkStartedAt;
  let selectorChunkCanBeDeleted = false;
  let singleSelectorStartedAt;
  let headWholeLineCanBeDeleted;
  let lastKeptChunksCommaAt = null;
  let onlyDeletedChunksFollow = false;
  let bodyClassOrIdCanBeDeleted;
  let round1RangesClone;
  let nonIndentationsWhitespaceLength = 0;
  let commentsLength = 0;
  const regexEmptyStyleTag = /[\n]?\s*<style[^>]*>\s*<\/style\s*>/g;
  const regexEmptyMediaQuery = /[\n]?\s*@(media|supports|document)[^{]*{\s*}/g;
  const badChars = `.# ~\\!@$%^&*()+=,/';:"?><[]{}|\`\t\n`;
  const atRulesWhichMightWrapStyles = ["media", "supports", "document"];
  const atRulesWhichNeedToBeIgnored = [
    "font-feature-values",
    "counter-style",
    "namespace",
    "font-face",
    "keyframes",
    "viewport",
    "charset",
    "import",
    "page"
  ];
  const atRuleBreakCharacters = ["{", "(", "<", '"', "'", "@", ";"];
  if (typeof str !== "string") {
    throw new TypeError(
      `email-remove-unused-css: [THROW_ID_01] Input must be string! Currently it's ${typeof str}`
    );
  }
  if (!isObj(opts)) {
    if (opts === undefined || opts === null) {
      opts = {};
    } else {
      throw new TypeError(
        `email-remove-unused-css: [THROW_ID_02] Options, second input argument, must be a plain object! Currently it's ${typeof opts}, equal to: ${JSON.stringify(
          opts,
          null,
          4
        )}`
      );
    }
  }
  if (isStr(opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains)) {
    if (opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains.length) {
      opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains = [
        opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains
      ];
    } else {
      opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains = [];
    }
  }
  const defaults = {
    whitelist: [],
    backend: [],
    uglify: false,
    removeHTMLComments: true,
    doNotRemoveHTMLCommentsWhoseOpeningTagContains: ["[if", "[endif"]
  };
  if (isObj(opts) && hasOwnProp(opts, "backend") && isEmpty(opts.backend)) {
    opts.backend = [];
  }
  opts = Object.assign({}, defaults, opts);
  if (isStr(opts.whitelist)) {
    opts.whitelist = [opts.whitelist];
  }
  if (!isArr(opts.whitelist)) {
    throw new TypeError(
      `email-remove-unused-css: [THROW_ID_03] opts.whitelist should be an array, but it was customised to a wrong thing, ${JSON.stringify(
        opts.whitelist,
        null,
        4
      )}`
    );
  }
  if (opts.whitelist.length > 0 && !opts.whitelist.every(el => isStr(el))) {
    throw new TypeError(
      `email-remove-unused-css: [THROW_ID_04] opts.whitelist array should contain only string-type elements. Currently we\ve got:\n${JSON.stringify(
        opts.whitelist,
        null,
        4
      )}`
    );
  }
  if (!isArr(opts.backend)) {
    throw new TypeError(
      `email-remove-unused-css: [THROW_ID_05] opts.backend should be an array, but it was customised to a wrong thing, ${JSON.stringify(
        opts.backend,
        null,
        4
      )}`
    );
  }
  if (opts.backend.length > 0 && opts.backend.some(val => !isObj(val))) {
    throw new TypeError(
      `email-remove-unused-css: [THROW_ID_06] opts.backend array should contain only plain objects but it contains something else:\n${JSON.stringify(
        opts.backend,
        null,
        4
      )}`
    );
  }
  if (
    opts.backend.length > 0 &&
    !opts.backend.every(
      obj => hasOwnProp(obj, "heads") && hasOwnProp(obj, "tails")
    )
  ) {
    throw new TypeError(
      `email-remove-unused-css: [THROW_ID_07] every object within opts.backend should contain keys "heads" and "tails" but currently it's not the case. Whole "opts.backend" value array is currently equal to:\n${JSON.stringify(
        opts.backend,
        null,
        4
      )}`
    );
  }
  if (typeof opts.uglify !== "boolean") {
    if (opts.uglify === 1 || opts.uglify === 0) {
      opts.uglify = !!opts.uglify;
    } else {
      throw new TypeError(
        `email-remove-unused-css: [THROW_ID_08] opts.uglify should be a Boolean. Currently it's set to: ${JSON.stringify(
          opts.uglify,
          null,
          4
        )}}`
      );
    }
  }
  let allHeads = null;
  let allTails = null;
  if (isArr(opts.backend) && opts.backend.length) {
    allHeads = opts.backend.map(headsAndTailsObj => headsAndTailsObj.heads);
    allTails = opts.backend.map(headsAndTailsObj => headsAndTailsObj.tails);
  }
  const len = str.length;
  let trailingLinebreakLengthCorrection = 0;
  if (!str.length || !"\r\n".includes(str[str.length - 1])) {
    trailingLinebreakLengthCorrection = 1;
  }
  let doNothing;
  let doNothingUntil;
  let allClassesAndIdsThatWereCompletelyDeletedFromHead;
  let allClassesAndIdsWithinHeadFinal;
  let allClassesAndIdsWithinHead;
  let allClassesAndIdsWithinBody;
  let headSelectorsCountClone;
  let stateWithinHeadStyles;
  let currentlyWithinQuotes;
  let whitespaceStartedAt;
  let bodyClassesToDelete;
  let stateWithinBody;
  let bodyIdsToDelete;
  let bodyCssToDelete;
  let headCssToDelete;
  let currentChunk;
  let canDelete;
  let usedOnce;
  const endingsCount = {
    n: 0,
    r: 0,
    rn: 0
  };
  for (let round = 1; round <= 2; round++) {
    checkingInsideCurlyBraces = false;
    headSelectorChunkStartedAt = null;
    selectorChunkCanBeDeleted = false;
    bodyClassOrIdCanBeDeleted = true;
    headWholeLineCanBeDeleted = true;
    bodyClass = resetBodyClassOrId();
    bodyItsTheFirstClassOrId = true;
    onlyDeletedChunksFollow = false;
    singleSelectorStartedAt = null;
    bodyId = resetBodyClassOrId();
    commentNearlyStartedAt = null;
    stateWithinHeadStyles = false;
    lastKeptChunksCommaAt = null;
    currentlyWithinQuotes = null;
    whitespaceStartedAt = null;
    insideCurlyBraces = false;
    ruleChunkStartedAt = null;
    beingCurrentlyAt = null;
    stateWithinBody = false;
    commentStartedAt = null;
    doNothingUntil = null;
    styleStartedAt = null;
    bodyStartedAt = null;
    currentChunk = null;
    styleEndedAt = null;
    doNothing = false;
    totalCounter += len;
    stepouter: for (i = 0; i < len; i++) {
      const chr = str[i];
      if (str[i] === "\n") {
        if (str[i - 1] === "\r") {
          if (round === 1) {
            endingsCount.rn++;
          }
        } else {
          if (round === 1) {
            endingsCount.n++;
          }
        }
      } else if (str[i] === "\r" && str[i + 1] !== "\n") {
        if (round === 1) {
          endingsCount.r++;
        }
      }
      if (
        stateWithinHeadStyles !== true &&
        ((styleEndedAt === null &&
          styleStartedAt !== null &&
          i >= styleStartedAt) ||
          (styleStartedAt !== null &&
            styleEndedAt !== null &&
            styleStartedAt > styleEndedAt &&
            styleStartedAt < i))
      ) {
        stateWithinHeadStyles = true;
        stateWithinBody = false;
      } else if (
        stateWithinBody !== true &&
        bodyStartedAt !== null &&
        (styleStartedAt === null || styleStartedAt < i) &&
        (styleEndedAt === null || styleEndedAt < i)
      ) {
        stateWithinBody = true;
        stateWithinHeadStyles = false;
      }
      if (!doNothing && (str[i] === '"' || str[i] === "'")) {
        if (insideCurlyBraces) {
          if (!currentlyWithinQuotes) {
            currentlyWithinQuotes = str[i];
          } else {
            currentlyWithinQuotes = null;
          }
        }
      }
      if (doNothing) {
        if (
          doNothingUntil === null ||
          typeof doNothingUntil !== "string" ||
          (typeof doNothingUntil === "string" && doNothingUntil.length === 0)
        ) {
          doNothing = false;
        } else if (matchRightIncl(str, i, doNothingUntil)) {
          if (commentStartedAt !== null) {
            if (round === 1) {
              const lineBreakPresentOnTheLeft = matchLeft(
                str,
                commentStartedAt,
                ["\r\n", "\n", "\r"]
              );
              let startingIndex = commentStartedAt;
              if (lineBreakPresentOnTheLeft) {
                startingIndex -= lineBreakPresentOnTheLeft.length;
              }
              if (
                str[startingIndex - 1] &&
                characterSuitableForNames(str[startingIndex - 1]) &&
                str[i + doNothingUntil.length] &&
                characterSuitableForNames(str[i + doNothingUntil.length])
              ) {
                finalIndexesToDelete.push(
                  startingIndex,
                  i + doNothingUntil.length,
                  ";"
                );
                commentsLength += i + doNothingUntil.length - startingIndex;
              } else {
                finalIndexesToDelete.push(
                  startingIndex,
                  i + doNothingUntil.length
                );
                commentsLength += i + doNothingUntil.length - startingIndex;
              }
            }
            commentStartedAt = null;
          }
          i = i + doNothingUntil.length - 1;
          doNothingUntil = null;
          doNothing = false;
          continue stepouter;
        }
      }
      if (
        !doNothing &&
        str[i] === "<" &&
        str[i + 1] === "s" &&
        str[i + 2] === "t" &&
        str[i + 3] === "y" &&
        str[i + 4] === "l" &&
        str[i + 5] === "e"
      ) {
        checkingInsideCurlyBraces = true;
        for (let y = i; y < len; y++) {
          totalCounter++;
          if (str[y] === ">") {
            styleStartedAt = y + 1;
            ruleChunkStartedAt = y + 1;
            break;
          }
        }
      }
      if (
        !doNothing &&
        stateWithinHeadStyles &&
        str[i] === "<" &&
        str[i + 1] === "/" &&
        str[i + 2] === "s" &&
        str[i + 3] === "t" &&
        str[i + 4] === "y" &&
        str[i + 5] === "l" &&
        str[i + 6] === "e"
      ) {
        checkingInsideCurlyBraces = false;
        styleEndedAt = i - 1;
        ruleChunkStartedAt = null;
      }
      if (
        round === 1 &&
        commentStartedAt !== null &&
        str[i] === "*" &&
        str[i + 1] === "/"
      ) {
        let deleteUpTo = i + 2;
        if (
          str[i + 2] === "\n" ||
          (str[i + 2] === "\r" && str[i + 3] !== "\n")
        ) {
          deleteUpTo = i + 3;
        } else if (str[i + 2] === "\r" && str[i + 3] === "\n") {
          deleteUpTo = i + 4;
        }
        const calculatedRange = expander({
          str,
          from: commentStartedAt,
          to: deleteUpTo,
          wipeAllWhitespaceOnLeft: true
        });
        finalIndexesToDelete.push(...calculatedRange);
        commentStartedAt = null;
        doNothing = false;
      }
      if (
        round === 1 &&
        (stateWithinHeadStyles || stateWithinBody) &&
        str[i] === "/" &&
        str[i + 1] === "*" &&
        !commentStartedAt
      ) {
        commentStartedAt = i;
        doNothing = true;
        doNothingUntil = "*/";
        i++;
        continue stepouter;
      }
      if (!doNothing && stateWithinHeadStyles && str[i] === "@") {
        if (whitespaceStartedAt) {
          whitespaceStartedAt = null;
        }
        const matchedAtTagsName =
          matchRight(str, i, atRulesWhichMightWrapStyles) ||
          matchRight(str, i, atRulesWhichNeedToBeIgnored);
        if (matchedAtTagsName) {
          let temp;
          if (
            str[i + matchedAtTagsName.length + 1] === ";" ||
            (str[i + matchedAtTagsName.length + 1] &&
              !str[i + matchedAtTagsName.length + 1].trim().length &&
              matchRight(str, i + matchedAtTagsName.length + 1, ";", {
                trimBeforeMatching: true,
                cb: (char, theRemainderOfTheString, index) => {
                  temp = index;
                  return true;
                }
              }))
          ) {
            finalIndexesToDelete.push(
              i,
              temp ? temp : i + matchedAtTagsName.length + 2
            );
          }
          let secondaryStopper;
          for (let z = i + 1; z < len; z++) {
            totalCounter++;
            if (secondaryStopper && str[z] === secondaryStopper) {
              if (
                (str[z] === "}" &&
                  atRulesWhichNeedToBeIgnored.includes(matchedAtTagsName)) ||
                (str[z] === "{" &&
                  atRulesWhichMightWrapStyles.includes(matchedAtTagsName))
              ) {
                i = z;
                ruleChunkStartedAt = z + 1;
                continue stepouter;
              } else {
                secondaryStopper = undefined;
                continue;
              }
            }
            if (str[z] === '"' && !secondaryStopper) {
              secondaryStopper = '"';
            } else if (str[z] === "'" && !secondaryStopper) {
              secondaryStopper = "'";
            } else if (str[z] === "(" && !secondaryStopper) {
              secondaryStopper = ")";
            } else if (
              atRulesWhichNeedToBeIgnored.includes(matchedAtTagsName) &&
              str[z] === "{" &&
              !secondaryStopper
            ) {
              secondaryStopper = "}";
            }
            if (!secondaryStopper && atRuleBreakCharacters.includes(str[z])) {
              let pushRangeFrom;
              let pushRangeTo;
              if (str[z] === "{" || str[z] === ";") {
                insideCurlyBraces = false;
                ruleChunkStartedAt = z + 1;
                i = z;
                continue stepouter;
              } else if (str[z] === "@" || str[z] === "<") {
                if (
                  round === 1 &&
                  !str.slice(i, z).includes("{") &&
                  !str.slice(i, z).includes("(") &&
                  !str.slice(i, z).includes('"') &&
                  !str.slice(i, z).includes("'")
                ) {
                  pushRangeFrom = i;
                  pushRangeTo = z + (str[z] === ";" ? 1 : 0);
                  finalIndexesToDelete.push(pushRangeFrom, pushRangeTo);
                }
              }
              const iOffset = pushRangeTo
                ? pushRangeTo - 1
                : z - 1 + (str[z] === "{" ? 1 : 0);
              i = iOffset;
              ruleChunkStartedAt = iOffset + 1;
              continue stepouter;
            }
          }
        }
      }
      if (
        !doNothing &&
        stateWithinHeadStyles &&
        insideCurlyBraces &&
        checkingInsideCurlyBraces &&
        chr === "}" &&
        !currentlyWithinQuotes
      ) {
        insideCurlyBraces = false;
        if (round === 2 && headWholeLineCanBeDeleted && ruleChunkStartedAt) {
          finalIndexesToDelete.push(ruleChunkStartedAt, i + 1);
        }
        if (ruleChunkStartedAt) {
          ruleChunkStartedAt = i + 1;
        }
        headSelectorChunkStartedAt = null;
        selectorChunkCanBeDeleted = false;
        headWholeLineCanBeDeleted = true;
        singleSelectorStartedAt = null;
        lastKeptChunksCommaAt = null;
        onlyDeletedChunksFollow = false;
      }
      if (
        !doNothing &&
        !commentStartedAt &&
        styleStartedAt &&
        i >= styleStartedAt &&
        ((styleEndedAt === null && i >= styleStartedAt) ||
          (styleStartedAt > styleEndedAt && styleStartedAt < i)) &&
        i >= beingCurrentlyAt &&
        !insideCurlyBraces
      ) {
        if (singleSelectorStartedAt === null) {
          if (chr === "." || chr === "#") {
            singleSelectorStartedAt = i;
          } else if (chr.trim().length !== 0) {
            if (chr === "}") {
              ruleChunkStartedAt = i + 1;
              currentChunk = null;
            } else if (chr === "<" && str[i + 1] === "!") {
              for (let y = i; y < len; y++) {
                totalCounter++;
                if (str[y] === ">") {
                  ruleChunkStartedAt = y + 1;
                  headSelectorChunkStartedAt = y + 1;
                  i = y;
                  continue stepouter;
                }
              }
            }
          }
        } else {
          if (
            singleSelectorStartedAt !== null &&
            !characterSuitableForNames(chr)
          ) {
            const singleSelector = str.slice(singleSelectorStartedAt, i);
            if (
              round === 2 &&
              !selectorChunkCanBeDeleted &&
              headCssToDelete.includes(singleSelector)
            ) {
              selectorChunkCanBeDeleted = true;
              onlyDeletedChunksFollow = true;
            } else if (round === 2 && !selectorChunkCanBeDeleted) {
              if (
                opts.uglify &&
                (!isArr(opts.whitelist) ||
                  !opts.whitelist.length ||
                  !matcher([singleSelector], opts.whitelist).length) &&
                isStr(
                  generateShortname(
                    allClassesAndIdsWithinHeadFinal.indexOf(singleSelector)
                  )
                )
              ) {
                currentChunksMinifiedSelectors.push(
                  singleSelectorStartedAt + 1,
                  i,
                  generateShortname(
                    allClassesAndIdsWithinHeadFinal.indexOf(singleSelector)
                  )
                );
              }
              if (chr === ",") {
                lastKeptChunksCommaAt = i;
                onlyDeletedChunksFollow = false;
              }
            }
            if (chr === "." || chr === "#") {
              singleSelectorStartedAt = i;
            } else {
              singleSelectorStartedAt = null;
            }
          }
        }
        if (headSelectorChunkStartedAt === null) {
          if (
            chr.trim().length !== 0 &&
            chr !== "}" &&
            chr !== ";" &&
            !(str[i] === "/" && str[i + 1] === "*")
          ) {
            selectorChunkCanBeDeleted = false;
            headSelectorChunkStartedAt = i;
          }
        } else {
          if (",{".includes(chr)) {
            const sliceTo = whitespaceStartedAt ? whitespaceStartedAt : i;
            currentChunk = str.slice(headSelectorChunkStartedAt, sliceTo);
            if (round === 1) {
              if (whitespaceStartedAt) {
                if (chr === "," && whitespaceStartedAt < i) {
                  finalIndexesToDelete.push(whitespaceStartedAt, i);
                  nonIndentationsWhitespaceLength += i - whitespaceStartedAt;
                } else if (chr === "{" && whitespaceStartedAt < i - 1) {
                  finalIndexesToDelete.push(whitespaceStartedAt, i - 1);
                  nonIndentationsWhitespaceLength +=
                    i - 1 - whitespaceStartedAt;
                }
              }
              headSelectorsArr.push(currentChunk);
            } else {
              if (selectorChunkCanBeDeleted) {
                let fromIndex = headSelectorChunkStartedAt;
                let toIndex = i;
                let tempFindingIndex;
                if (
                  chr === "{" &&
                  str[fromIndex - 1] !== ">" &&
                  str[fromIndex - 1] !== "}"
                ) {
                  for (let y = headSelectorChunkStartedAt; y--; ) {
                    totalCounter++;
                    if (str[y].trim().length !== 0 && str[y] !== ",") {
                      fromIndex = y + 1;
                      break;
                    }
                  }
                  if (str[i - 1].trim().length === 0) {
                    toIndex = i - 1;
                  }
                } else if (chr === "," && str[i + 1].trim().length === 0) {
                  for (let y = i + 1; y < len; y++) {
                    totalCounter++;
                    if (str[y].trim().length !== 0) {
                      toIndex = y;
                      break;
                    }
                  }
                } else if (
                  matchLeft(str, fromIndex, "{", {
                    trimBeforeMatching: true,
                    cb: (char, theRemainderOfTheString, index) => {
                      tempFindingIndex = index;
                      return true;
                    }
                  })
                ) {
                  fromIndex = tempFindingIndex + 2;
                }
                const resToPush = expander({
                  str,
                  from: fromIndex,
                  to: toIndex,
                  ifRightSideIncludesThisThenCropTightly: ".#",
                  ifRightSideIncludesThisCropItToo: ",",
                  extendToOneSide: "right"
                });
                finalIndexesToDelete.push(...resToPush);
                if (opts.uglify) {
                  currentChunksMinifiedSelectors.wipe();
                }
              } else {
                if (headWholeLineCanBeDeleted) {
                  headWholeLineCanBeDeleted = false;
                }
                if (opts.uglify) {
                  finalIndexesToDelete.push(
                    currentChunksMinifiedSelectors.current()
                  );
                  currentChunksMinifiedSelectors.wipe();
                }
              }
            }
            if (chr !== "{") {
              headSelectorChunkStartedAt = null;
            } else if (round === 2) {
              if (
                !headWholeLineCanBeDeleted &&
                lastKeptChunksCommaAt !== null &&
                onlyDeletedChunksFollow
              ) {
                let deleteUpTo = lastKeptChunksCommaAt + 1;
                if ("\n\r".includes(str[lastKeptChunksCommaAt + 1])) {
                  for (let y = lastKeptChunksCommaAt + 1; y < len; y++) {
                    if (str[y].trim().length) {
                      deleteUpTo = y;
                      break;
                    }
                  }
                }
                finalIndexesToDelete.push(lastKeptChunksCommaAt, deleteUpTo);
                lastKeptChunksCommaAt = null;
                onlyDeletedChunksFollow = false;
              }
            }
          }
        }
      }
      if (
        !doNothing &&
        !stateWithinHeadStyles &&
        stateWithinBody &&
        str[i] === "/" &&
        matchRight(str, i, "body", { trimBeforeMatching: true, i: true }) &&
        matchLeft(str, i, "<", { trimBeforeMatching: true })
      ) {
        stateWithinBody = false;
        bodyStartedAt = null;
      }
      if (
        !doNothing &&
        str[i] === "<" &&
        matchRight(str, i, "body", {
          i: true,
          trimBeforeMatching: true,
          cb: (char, theRemainderOfTheString, index) => {
            if (round === 1) {
              if (char !== undefined && (char.trim() === "" || char === ">")) {
                if (index - i > 5) {
                  finalIndexesToDelete.push(i, index, "<body");
                  nonIndentationsWhitespaceLength += index - i - 5;
                } else {
                  return true;
                }
              }
              return true;
            }
            return true;
          }
        })
      ) {
        for (let y = i; y < len; y++) {
          totalCounter++;
          if (str[y] === ">") {
            bodyStartedAt = y + 1;
            break;
          }
        }
      }
      if (
        !doNothing &&
        stateWithinBody &&
        str[i] === "s" &&
        str[i + 1] === "t" &&
        str[i + 2] === "y" &&
        str[i + 3] === "l" &&
        str[i + 4] === "e" &&
        str[i + 5] === "=" &&
        badChars.includes(str[i - 1])
      ) {
        if (`"'`.includes(str[i + 6])) ;
      }
      if (
        !doNothing &&
        stateWithinBody &&
        str[i] === "c" &&
        str[i + 1] === "l" &&
        str[i + 2] === "a" &&
        str[i + 3] === "s" &&
        str[i + 4] === "s" &&
        badChars.includes(str[i - 1])
      ) {
        let valuesStart;
        if (str[i + 5] === "=") {
          if (str[i + 6] === '"' || str[i + 6] === "'") {
            valuesStart = i + 7;
          } else if (
            str[i + 6] &&
            (!str[i + 6].trim().length || "/>".includes(str[i + 6]))
          ) {
            const calculatedRange = expander({
              str,
              from: i,
              to: i + 6,
              ifRightSideIncludesThisThenCropTightly: "/>",
              wipeAllWhitespaceOnLeft: true
            });
            finalIndexesToDelete.push(...calculatedRange);
          }
        } else if (str[i + 5].trim().length === 0) {
          for (let y = i + 5; y < len; y++) {
            totalCounter++;
            if (str[y].trim().length) {
              if (str[y] === "=") {
                if (y > i + 5 && round === 1) {
                  finalIndexesToDelete.push(i + 5, y);
                }
                if ((str[y + 1] === '"' || str[y + 1] === "'") && str[y + 2]) {
                  valuesStart = y + 2;
                } else if (str[y + 1] && str[y + 1].trim().length === 0) {
                  for (let z = y + 1; z < len; z++) {
                    totalCounter++;
                    if (str[z].trim().length) {
                      if (z > y + 1 && round === 1) {
                        finalIndexesToDelete.push(y + 1, z);
                      }
                      if ((str[z] === '"' || str[z] === "'") && str[z + 1]) {
                        valuesStart = z + 1;
                      }
                      break;
                    }
                  }
                }
              } else {
                if (round === 1) {
                  const calculatedRange = expander({
                    str,
                    from: i,
                    to: y - 1,
                    ifRightSideIncludesThisThenCropTightly: "/>",
                    wipeAllWhitespaceOnLeft: true
                  });
                  finalIndexesToDelete.push(...calculatedRange);
                }
              }
              break;
            }
          }
        }
        if (valuesStart) {
          bodyClass = resetBodyClassOrId({
            valuesStart,
            nameStart: i
          });
          if (round === 1) {
            bodyItsTheFirstClassOrId = true;
          } else if (round === 2) {
            bodyClassOrIdCanBeDeleted = true;
          }
        }
      }
      if (
        !doNothing &&
        bodyStartedAt !== null &&
        str[i] === "i" &&
        str[i + 1] === "d" &&
        badChars.includes(str[i - 1])
      ) {
        let valuesStart;
        if (str[i + 2] === "=") {
          if (str[i + 3] === '"' || str[i + 3] === "'") {
            valuesStart = i + 4;
          } else if (
            str[i + 3] &&
            (!str[i + 3].trim().length || "/>".includes(str[i + 3]))
          ) {
            const calculatedRange = expander({
              str,
              from: i,
              to: i + 3,
              ifRightSideIncludesThisThenCropTightly: "/>",
              wipeAllWhitespaceOnLeft: true
            });
            finalIndexesToDelete.push(...calculatedRange);
          }
        } else if (str[i + 2].trim().length === 0) {
          for (let y = i + 2; y < len; y++) {
            totalCounter++;
            if (str[y].trim().length) {
              if (str[y] === "=") {
                if (y > i + 2 && round === 1) {
                  finalIndexesToDelete.push(i + 2, y);
                }
                if ((str[y + 1] === '"' || str[y + 1] === "'") && str[y + 2]) {
                  valuesStart = y + 2;
                } else if (str[y + 1] && str[y + 1].trim().length === 0) {
                  for (let z = y + 1; z < len; z++) {
                    totalCounter++;
                    if (str[z].trim().length) {
                      if (z > y + 1 && round === 1) {
                        finalIndexesToDelete.push(y + 1, z);
                      }
                      if ((str[z] === '"' || str[z] === "'") && str[z + 1]) {
                        valuesStart = z + 1;
                      }
                      break;
                    }
                  }
                }
              } else {
                if (round === 1) {
                  const calculatedRange = expander({
                    str,
                    from: i,
                    to: y - 1,
                    ifRightSideIncludesThisThenCropTightly: "/>",
                    wipeAllWhitespaceOnLeft: true
                  });
                  finalIndexesToDelete.push(...calculatedRange);
                }
              }
              break;
            }
          }
        }
        if (valuesStart) {
          bodyId = resetBodyClassOrId({
            valuesStart,
            nameStart: i
          });
          if (round === 1) {
            bodyItsTheFirstClassOrId = true;
          } else if (round === 2) {
            bodyClassOrIdCanBeDeleted = true;
          }
        }
      }
      if (
        !doNothing &&
        bodyClass.valuesStart !== null &&
        i >= bodyClass.valuesStart &&
        bodyClass.valueStart === null
      ) {
        if (allHeads && matchRightIncl(str, i, allHeads)) {
          doNothing = true;
          bodyClassOrIdCanBeDeleted = false;
          if (whitespaceStartedAt && i > whitespaceStartedAt + 1) {
            const calculatedRange = expander({
              str,
              from: whitespaceStartedAt,
              to: i,
              ifLeftSideIncludesThisThenCropTightly: "\"'",
              ifRightSideIncludesThisThenCropTightly: "\"'"
            });
            finalIndexesToDelete.push(...calculatedRange);
            whitespaceStartedAt = null;
          } else if (whitespaceStartedAt) {
            whitespaceStartedAt = null;
          }
          const matchedHeads = matchRightIncl(str, i, allHeads);
          const findings = opts.backend.find(
            headsTailsObj => headsTailsObj.heads === matchedHeads
          );
          doNothingUntil = findings["tails"];
        } else if (characterSuitableForNames(chr)) {
          bodyClass.valueStart = i;
          if (round === 1) {
            if (
              bodyItsTheFirstClassOrId &&
              bodyClass.valuesStart !== null &&
              str.slice(bodyClass.valuesStart, i).trim().length === 0 &&
              bodyClass.valuesStart < i
            ) {
              finalIndexesToDelete.push(bodyClass.valuesStart, i);
              nonIndentationsWhitespaceLength += i - bodyClass.valuesStart;
              bodyItsTheFirstClassOrId = false;
            } else if (
              whitespaceStartedAt !== null &&
              whitespaceStartedAt < i - 1
            ) {
              finalIndexesToDelete.push(whitespaceStartedAt + 1, i);
              nonIndentationsWhitespaceLength += i - whitespaceStartedAt + 1;
            }
          }
        }
      }
      if (
        !doNothing &&
        bodyClass.valueStart !== null &&
        i > bodyClass.valueStart &&
        (!characterSuitableForNames(chr) ||
          (allTails && matchRightIncl(str, i, allTails)))
      ) {
        const carvedClass = `${str.slice(bodyClass.valueStart, i)}`;
        if (round === 1) {
          bodyClassesArr.push(`.${carvedClass}`);
        } else {
          if (
            bodyClass.valueStart != null &&
            bodyClassesToDelete.includes(carvedClass)
          ) {
            const expandedRange = expander({
              str,
              from: bodyClass.valueStart,
              to: i,
              ifLeftSideIncludesThisThenCropTightly: `"'`,
              ifRightSideIncludesThisThenCropTightly: `"'`,
              wipeAllWhitespaceOnLeft: true
            });
            if (
              str[expandedRange[0] - 1] &&
              str[expandedRange[0] - 1].trim().length &&
              str[expandedRange[1]] &&
              str[expandedRange[1]].trim().length &&
              (allHeads || allTails) &&
              ((allHeads && matchLeft(str, expandedRange[0], allTails)) ||
                (allTails && matchRightIncl(str, expandedRange[1], allHeads)))
            ) {
              expandedRange[0] += 1;
            }
            finalIndexesToDelete.push(...expandedRange);
          } else {
            bodyClassOrIdCanBeDeleted = false;
            if (
              opts.uglify &&
              isStr(
                generateShortname(
                  allClassesAndIdsWithinHeadFinal.indexOf(`.${carvedClass}`)
                )
              )
            ) {
              finalIndexesToDelete.push(
                bodyClass.valueStart,
                i,
                generateShortname(
                  allClassesAndIdsWithinHeadFinal.indexOf(`.${carvedClass}`)
                )
              );
            }
          }
        }
        bodyClass.valueStart = null;
      }
      if (
        !doNothing &&
        bodyId.valueStart !== null &&
        i > bodyId.valueStart &&
        (!characterSuitableForNames(chr) ||
          (allTails && matchRightIncl(str, i, allTails)))
      ) {
        const carvedId = str.slice(bodyId.valueStart, i);
        if (round === 1) {
          bodyIdsArr.push(`#${carvedId}`);
        } else {
          if (bodyId.valueStart != null && bodyIdsToDelete.includes(carvedId)) {
            const expandedRange = expander({
              str,
              from: bodyId.valueStart,
              to: i,
              ifRightSideIncludesThisThenCropTightly: `"'`,
              wipeAllWhitespaceOnLeft: true
            });
            if (
              str[expandedRange[0] - 1] &&
              str[expandedRange[0] - 1].trim().length &&
              str[expandedRange[1]] &&
              str[expandedRange[1]].trim().length &&
              (allHeads || allTails) &&
              ((allHeads && matchLeft(str, expandedRange[0], allTails)) ||
                (allTails && matchRightIncl(str, expandedRange[1], allHeads)))
            ) {
              expandedRange[0] += 1;
            }
            finalIndexesToDelete.push(...expandedRange);
          } else {
            bodyClassOrIdCanBeDeleted = false;
            if (
              opts.uglify &&
              isStr(
                generateShortname(
                  allClassesAndIdsWithinHeadFinal.indexOf(`#${carvedId}`)
                )
              )
            ) {
              finalIndexesToDelete.push(
                bodyId.valueStart,
                i,
                generateShortname(
                  allClassesAndIdsWithinHeadFinal.indexOf(`#${carvedId}`)
                )
              );
            }
          }
        }
        bodyId.valueStart = null;
      }
      if (
        !doNothing &&
        bodyClass.valuesStart != null &&
        (chr === "'" || chr === '"') &&
        i >= bodyClass.valuesStart
      ) {
        if (i === bodyClass.valuesStart) {
          if (round === 1) {
            finalIndexesToDelete.push(
              ...expander({
                str,
                from: bodyClass.nameStart,
                to: i + 1,
                ifRightSideIncludesThisThenCropTightly: "/>",
                wipeAllWhitespaceOnLeft: true
              })
            );
          }
        } else {
          if (round === 2 && bodyClassOrIdCanBeDeleted) {
            const expandedRange = expander({
              str,
              from: bodyClass.valuesStart - 7,
              to: i + 1,
              ifRightSideIncludesThisThenCropTightly: "/>",
              wipeAllWhitespaceOnLeft: true
            });
            if (
              str[expandedRange[0] - 1] &&
              str[expandedRange[0] - 1].trim().length &&
              str[expandedRange[1]] &&
              str[expandedRange[1]].trim().length &&
              (allHeads || allTails) &&
              ((allHeads && matchLeft(str, expandedRange[0], allHeads)) ||
                (allTails && matchRightIncl(str, expandedRange[1], allTails)))
            ) {
              expandedRange[0] += 1;
            }
            finalIndexesToDelete.push(...expandedRange);
          }
          if (whitespaceStartedAt !== null) {
            finalIndexesToDelete.push(whitespaceStartedAt, i);
          }
        }
        bodyClass = resetBodyClassOrId();
      }
      if (
        !doNothing &&
        bodyId.valuesStart !== null &&
        (chr === "'" || chr === '"') &&
        i >= bodyId.valuesStart
      ) {
        if (i === bodyId.valuesStart) {
          if (round === 1) {
            finalIndexesToDelete.push(
              ...expander({
                str,
                from: bodyId.nameStart,
                to: i + 1,
                ifRightSideIncludesThisThenCropTightly: "/>",
                wipeAllWhitespaceOnLeft: true
              })
            );
          }
        } else {
          if (round === 2 && bodyClassOrIdCanBeDeleted) {
            const expandedRange = expander({
              str,
              from: bodyId.valuesStart - 4,
              to: i + 1,
              ifRightSideIncludesThisThenCropTightly: "/>",
              wipeAllWhitespaceOnLeft: true
            });
            if (
              str[expandedRange[0] - 1] &&
              str[expandedRange[0] - 1].trim().length &&
              str[expandedRange[1]] &&
              str[expandedRange[1]].trim().length &&
              (allHeads || allTails) &&
              ((allHeads && matchLeft(str, expandedRange[0], allHeads)) ||
                (allTails && matchRightIncl(str, expandedRange[1], allTails)))
            ) {
              expandedRange[0] += 1;
            }
            finalIndexesToDelete.push(...expandedRange);
          }
          if (whitespaceStartedAt !== null) {
            finalIndexesToDelete.push(whitespaceStartedAt, i);
          }
        }
        bodyId = resetBodyClassOrId();
      }
      if (
        !doNothing &&
        bodyId.valuesStart &&
        i >= bodyId.valuesStart &&
        bodyId.valueStart === null
      ) {
        if (allHeads && matchRightIncl(str, i, allHeads)) {
          doNothing = true;
          bodyClassOrIdCanBeDeleted = false;
          if (whitespaceStartedAt && i > whitespaceStartedAt + 1) {
            const calculatedRange = expander({
              str,
              from: whitespaceStartedAt,
              to: i,
              ifLeftSideIncludesThisThenCropTightly: "\"'",
              ifRightSideIncludesThisThenCropTightly: "\"'"
            });
            finalIndexesToDelete.push(...calculatedRange);
            whitespaceStartedAt = null;
          } else if (whitespaceStartedAt) {
            whitespaceStartedAt = null;
          }
          const matchedHeads = matchRightIncl(str, i, allHeads);
          const findings = opts.backend.find(
            headsTailsObj => headsTailsObj.heads === matchedHeads
          );
          doNothingUntil = findings["tails"];
        } else if (characterSuitableForNames(chr)) {
          bodyId.valueStart = i;
          if (round === 1) {
            if (
              bodyItsTheFirstClassOrId &&
              bodyId.valuesStart !== null &&
              str.slice(bodyId.valuesStart, i).trim().length === 0 &&
              bodyId.valuesStart < i
            ) {
              finalIndexesToDelete.push(bodyId.valuesStart, i);
              nonIndentationsWhitespaceLength += i - bodyId.valuesStart;
              bodyItsTheFirstClassOrId = false;
            } else if (
              whitespaceStartedAt !== null &&
              whitespaceStartedAt < i - 1
            ) {
              finalIndexesToDelete.push(whitespaceStartedAt + 1, i);
              nonIndentationsWhitespaceLength += i - whitespaceStartedAt + 1;
            }
          }
        }
      }
      if (!doNothing && round === 1) {
        if (
          commentStartedAt !== null &&
          commentStartedAt < i &&
          str[i] === ">" &&
          !usedOnce
        ) {
          if (
            opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains &&
            isArr(opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains) &&
            opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains.length &&
            opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains.some(
              val =>
                val.trim().length &&
                str
                  .slice(commentStartedAt, i)
                  .toLowerCase()
                  .includes(val)
            )
          ) {
            canDelete = false;
          }
          usedOnce = true;
        }
        if (commentStartedAt !== null && str[i] === ">") {
          if (!bogusHTMLComment && str[i - 1] === "-" && str[i - 2] === "-") {
            const calculatedRange = expander({
              str,
              from: commentStartedAt,
              to: i + 1,
              wipeAllWhitespaceOnLeft: true,
              addSingleSpaceToPreventAccidentalConcatenation: true
            });
            if (opts.removeHTMLComments && canDelete) {
              finalIndexesToDelete.push(...calculatedRange);
            }
            commentsLength += calculatedRange[1] - calculatedRange[0];
            commentStartedAt = null;
            bogusHTMLComment = undefined;
          } else if (bogusHTMLComment) {
            const calculatedRange = expander({
              str,
              from: commentStartedAt,
              to: i + 1,
              wipeAllWhitespaceOnLeft: true,
              addSingleSpaceToPreventAccidentalConcatenation: true
            });
            if (opts.removeHTMLComments && canDelete) {
              finalIndexesToDelete.push(...calculatedRange);
            }
            commentsLength += calculatedRange[1] - calculatedRange[0];
            commentStartedAt = null;
            bogusHTMLComment = undefined;
          }
        }
        if (
          opts.removeHTMLComments &&
          commentStartedAt === null &&
          str[i] === "<" &&
          str[i + 1] === "!"
        ) {
          if (
            (!allHeads ||
              (isArr(allHeads) &&
                allHeads.length &&
                !allHeads.includes("<!"))) &&
            (!allTails ||
              (isArr(allTails) && allTails.length && !allTails.includes("<!")))
          ) {
            if (
              !matchRight(str, i + 1, "doctype", {
                i: true,
                trimBeforeMatching: true
              }) &&
              !(
                str[i + 2] === "-" &&
                str[i + 3] === "-" &&
                isArr(opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains) &&
                opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains.length &&
                matchRight(
                  str,
                  i + 3,
                  opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains,
                  {
                    trimBeforeMatching: true
                  }
                )
              )
            ) {
              commentStartedAt = i;
              usedOnce = false;
              canDelete = true;
            }
            bogusHTMLComment = !(str[i + 2] === "-" && str[i + 3] === "-");
          }
          if (commentStartedAt !== i) {
            commentNearlyStartedAt = i;
          }
        }
      }
      if (
        !doNothing &&
        chr === "{" &&
        checkingInsideCurlyBraces &&
        !insideCurlyBraces
      ) {
        insideCurlyBraces = true;
        if (
          whitespaceStartedAt !== null &&
          (str.slice(whitespaceStartedAt, i).includes("\n") ||
            str.slice(whitespaceStartedAt, i).includes("\r"))
        ) {
          finalIndexesToDelete.push(whitespaceStartedAt, i);
        }
      }
      if (!doNothing) {
        if (!str[i].trim().length) {
          if (whitespaceStartedAt === null) {
            whitespaceStartedAt = i;
          }
        } else if (whitespaceStartedAt !== null) {
          whitespaceStartedAt = null;
        }
      }
      if (
        !doNothing &&
        round === 2 &&
        isArr(round1RangesClone) &&
        round1RangesClone.length &&
        i === round1RangesClone[0][0]
      ) {
        const temp = round1RangesClone.shift();
        if (temp[1] - 1 > i) {
          i = temp[1] - 1;
        }
        continue stepouter;
      }
      if (commentNearlyStartedAt !== null && str[i] === ">") {
        commentNearlyStartedAt = null;
        let temp;
        if (
          opts.removeHTMLComments &&
          isArr(opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains) &&
          opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains.length &&
          (opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains.some(val =>
            val.includes("if")
          ) ||
            opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains.some(val =>
              val.includes("mso")
            ) ||
            opts.doNotRemoveHTMLCommentsWhoseOpeningTagContains.some(val =>
              val.includes("ie")
            )) &&
          matchRight(str, i, "<!--", {
            trimBeforeMatching: true,
            cb: (char, theRemainderOfTheString, index) => {
              temp = index;
              return true;
            }
          })
        ) {
          if (
            matchRight(str, temp - 1, "-->", {
              trimBeforeMatching: true,
              cb: (char, theRemainderOfTheString, index) => {
                temp = index;
                return true;
              }
            })
          ) ;
          i = temp - 1;
          continue;
        }
      }
    }
    if (round === 1) {
      allClassesAndIdsWithinBody = uniq(
        bodyClassesArr.concat(bodyIdsArr).sort()
      );
      headSelectorsArr.forEach(el => {
        extract(el).forEach(selector => {
          if (
            Object.prototype.hasOwnProperty.call(headSelectorsCount, selector)
          ) {
            headSelectorsCount[selector] += 1;
          } else {
            headSelectorsCount[selector] = 1;
          }
        });
      });
      headSelectorsCountClone = Object.assign({}, headSelectorsCount);
      allClassesAndIdsWithinHead = uniq(
        headSelectorsArr.reduce((arr, el) => arr.concat(extract(el)), [])
      ).sort();
      const preppedHeadSelectorsArr = Array.from(headSelectorsArr);
      let deletedFromHeadArr = [];
      for (let y = 0, len2 = preppedHeadSelectorsArr.length; y < len2; y++) {
        totalCounter++;
        let temp;
        if (existy(preppedHeadSelectorsArr[y])) {
          temp = extract(preppedHeadSelectorsArr[y]);
        }
        if (!temp.every(el => allClassesAndIdsWithinBody.includes(el))) {
          deletedFromHeadArr.push(...extract(preppedHeadSelectorsArr[y]));
          preppedHeadSelectorsArr.splice(y, 1);
          y -= 1;
          len2 -= 1;
        }
      }
      deletedFromHeadArr = uniq(
        pullAllWithGlob(deletedFromHeadArr, opts.whitelist)
      );
      let preppedAllClassesAndIdsWithinHead;
      if (preppedHeadSelectorsArr.length > 0) {
        preppedAllClassesAndIdsWithinHead = preppedHeadSelectorsArr.reduce(
          (arr, el) => arr.concat(extract(el)),
          []
        );
      } else {
        preppedAllClassesAndIdsWithinHead = [];
      }
      headCssToDelete = pullAllWithGlob(
        pullAll(
          uniq(Array.from(allClassesAndIdsWithinHead)),
          bodyClassesArr.concat(bodyIdsArr)
        ),
        opts.whitelist
      );
      bodyCssToDelete = uniq(
        pullAllWithGlob(
          pullAll(
            bodyClassesArr.concat(bodyIdsArr),
            preppedAllClassesAndIdsWithinHead
          ),
          opts.whitelist
        )
      );
      headCssToDelete = uniq(
        headCssToDelete.concat(
          intersection(deletedFromHeadArr, bodyCssToDelete)
        )
      ).sort();
      bodyClassesToDelete = bodyCssToDelete
        .filter(s => s.startsWith("."))
        .map(s => s.slice(1));
      bodyIdsToDelete = bodyCssToDelete
        .filter(s => s.startsWith("#"))
        .map(s => s.slice(1));
      allClassesAndIdsThatWereCompletelyDeletedFromHead = Object.keys(
        headSelectorsCountClone
      ).filter(singleSelector => headSelectorsCountClone[singleSelector] < 1);
      bodyClassesToDelete = uniq(
        bodyClassesToDelete.concat(
          intersection(
            pullAllWithGlob(allClassesAndIdsWithinBody, opts.whitelist),
            allClassesAndIdsThatWereCompletelyDeletedFromHead
          )
            .filter(val => val[0] === ".")
            .map(val => val.slice(1))
        )
      );
      const allClassesAndIdsWithinBodyThatWereWhitelisted = matcher(
        allClassesAndIdsWithinBody,
        opts.whitelist
      );
      bodyCssToDelete = uniq(
        bodyCssToDelete.concat(
          bodyClassesToDelete.map(val => `.${val}`),
          bodyIdsToDelete.map(val => `#${val}`)
        )
      ).sort();
      allClassesAndIdsWithinHeadFinal = pullAll(
        pullAll(Array.from(allClassesAndIdsWithinHead), bodyCssToDelete),
        headCssToDelete
      );
      if (
        isArr(allClassesAndIdsWithinBodyThatWereWhitelisted) &&
        allClassesAndIdsWithinBodyThatWereWhitelisted.length
      ) {
        allClassesAndIdsWithinHeadFinal = allClassesAndIdsWithinHeadFinal.concat(
          allClassesAndIdsWithinBodyThatWereWhitelisted
        );
      }
      if (finalIndexesToDelete.current()) {
        round1RangesClone = Array.from(finalIndexesToDelete.current());
      } else {
        round1RangesClone = null;
      }
      if (
        endingsCount.rn > endingsCount.r &&
        endingsCount.rn > endingsCount.n
      ) {
        prevailingEOL = "\r\n";
      } else if (
        endingsCount.r > endingsCount.rn &&
        endingsCount.r > endingsCount.n
      ) {
        prevailingEOL = "\r";
      } else {
        prevailingEOL = "\n";
      }
    } else if (round === 2) {
      if (!"\r\n".includes(str[len - 1])) {
        finalIndexesToDelete.push(len, len, prevailingEOL);
      }
    }
  }
  finalIndexesToDelete.push(lineBreaksToDelete.current());
  if (str.length && finalIndexesToDelete.current()) {
    str = applySlices(str, finalIndexesToDelete.current());
    finalIndexesToDelete.wipe();
  }
  while (regexEmptyMediaQuery.test(str)) {
    str = str.replace(regexEmptyMediaQuery, "");
    totalCounter += str.length;
  }
  str = str.replace(regexEmptyStyleTag, "\n");
  totalCounter += str.length;
  let tempLen = str.length;
  str = str.replace(emptyCondCommentRegex(), "");
  totalCounter += str.length;
  if (tempLen !== str.length) {
    commentsLength += str.length - tempLen;
  }
  tempLen = str.length;
  str = str.replace(/(\r?\n|\r)*[ ]*(\r?\n|\r)+/g, prevailingEOL);
  if (tempLen !== str.length) {
    nonIndentationsWhitespaceLength += str.length - tempLen;
  }
  totalCounter += str.length;
  if (str.length) {
    if (
      (!str[0].trim().length || !str[str.length - 1].trim().length) &&
      str.length !== str.trim().length
    ) {
      nonIndentationsWhitespaceLength += str.length - str.trim().length;
    }
    str = `${str.trim()}${prevailingEOL}`;
  }
  return {
    log: {
      timeTakenInMiliseconds: Date.now() - start,
      traversedTotalCharacters: totalCounter,
      traversedTimesInputLength: len
        ? Math.round((totalCounter / len) * 100) / 100
        : 0,
      originalLength: len,
      cleanedLength: str.length,
      bytesSaved: Math.max(len - str.length, 0),
      percentageReducedOfOriginal: len
        ? Math.round((Math.max(len - str.length, 0) * 100) / len)
        : 0,
      nonIndentationsWhitespaceLength: Math.max(
        nonIndentationsWhitespaceLength - trailingLinebreakLengthCorrection,
        0
      ),
      nonIndentationsTakeUpPercentageOfOriginal:
        len &&
        Math.max(
          nonIndentationsWhitespaceLength - trailingLinebreakLengthCorrection,
          0
        )
          ? Math.round(
              (Math.max(nonIndentationsWhitespaceLength, 0) * 100) / len
            )
          : 0,
      commentsLength,
      commentsTakeUpPercentageOfOriginal:
        len && commentsLength ? Math.round((commentsLength * 100) / len) : 0
    },
    result: str,
    allInHead: allClassesAndIdsWithinHead,
    allInBody: allClassesAndIdsWithinBody,
    deletedFromHead: headCssToDelete.sort(),
    deletedFromBody: bodyCssToDelete.sort()
  };
}

export default comb;
