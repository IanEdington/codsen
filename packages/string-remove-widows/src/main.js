import { version } from "../package.json";
import apply from "ranges-apply";
const Ranges = require("ranges-push");
import { left, right } from "string-left-right";
import { matchRightIncl } from "string-match-left-right";
import {
  rawnbsp,
  encodedNbspHtml,
  encodedNbspCss,
  encodedNbspJs,
  rawNdash,
  encodedNdashHtml,
  encodedNdashCss,
  encodedNdashJs,
  rawMdash,
  encodedMdashHtml,
  encodedMdashCss,
  encodedMdashJs,
  headsAndTailsJinja,
  headsAndTailsHugo,
  headsAndTailsHexo
} from "./util";
import isObj from "lodash.isplainobject";
import arrayiffyIfStr from "arrayiffy-if-string";

const defaultOpts = {
  removeWidowPreventionMeasures: false,
  convertEntities: true, // encode?
  targetLanguage: "html", // encode in what? [html, css, js]
  UKPostcodes: false, // replace space in UK postcodes?
  hyphens: true, // replace space with non-breaking space in front of dash
  minWordCount: 4, // if there are less words than this in chunk, skip
  minCharCount: 5, // if there are less characters than this in chunk, skip
  ignore: [], // put {heads: "{{", tails: "}}"} or presents: "jinja", "nunjucks", "hugo", "hexo"
  reportProgressFunc: null, // reporting progress function
  reportProgressFuncFrom: 0,
  reportProgressFuncTo: 100
};

function removeWidows(str, originalOpts) {
  function push(finalStart, finalEnd) {
    let finalWhatToInsert = rawnbsp;
    // calculate what to insert
    if (opts.removeWidowPreventionMeasures) {
      finalWhatToInsert = " ";
    } else if (opts.convertEntities) {
      finalWhatToInsert = encodedNbspHtml;
      if (isStr(opts.targetLanguage)) {
        if (opts.targetLanguage.trim().toLowerCase() === "css") {
          finalWhatToInsert = encodedNbspCss;
        } else if (opts.targetLanguage.trim().toLowerCase() === "js") {
          finalWhatToInsert = encodedNbspJs;
        }
      }
    }
    rangesArr.push(finalStart, finalEnd, finalWhatToInsert);
    console.log(
      `058 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${finalStart}, ${finalEnd}, "${finalWhatToInsert}"]`
    );
  }
  function isStr(something) {
    return typeof something === "string";
  }
  // track time taken
  const start = Date.now();

  // insurance:
  if (!isStr(str)) {
    if (str === undefined) {
      throw new Error(
        "string-remove-widows: [THROW_ID_01] the first input argument is completely missing! It should be given as string."
      );
    } else {
      throw new Error(
        `string-remove-widows: [THROW_ID_02] the first input argument must be string! It was given as "${typeof str}", equal to:\n${JSON.stringify(
          str,
          null,
          4
        )}`
      );
    }
  }

  if (originalOpts && !isObj(originalOpts)) {
    throw new Error(
      `string-remove-widows: [THROW_ID_03] the second input argument, options object, should be a plain object but it was given as type ${typeof originalOpts}, equal to ${JSON.stringify(
        originalOpts,
        null,
        4
      )}`
    );
  }

  // consts

  const isArr = Array.isArray;
  const len = str.length;
  const rangesArr = new Ranges({ mergeType: 2 });
  const punctuationCharsToConsiderWidowIssue = ["."];
  const postcodeRegexFront = /[A-Z]{1,2}[0-9][0-9A-Z]?$/;
  const postcodeRegexEnd = /^[0-9][A-Z]{2}/;

  const leavePercForLastStage = 0.06; // in range of [0, 1]

  // vars

  let currentPercentageDone;
  let lastPercentage = 0;
  let wordCount; // counted per-chunk (paragraph)
  let charCount; // counted per-character, per chunk (paragraph)

  let secondToLastWhitespaceStartedAt; // necessary to support whitespace at line ends
  let secondToLastWhitespaceEndedAt; // necessary to support whitespace at line ends
  let lastWhitespaceStartedAt;
  let lastWhitespaceEndedAt;
  let lastEncodedNbspStartedAt;
  let lastEncodedNbspEndedAt;
  // let lineBreakCount;
  let doNothingUntil;

  // requests to bump word count in the future:
  let bumpWordCountAt;

  // prep the opts
  const opts = Object.assign({}, defaultOpts, originalOpts);

  // tackle alternative name for hyphens, "dashes"
  if (opts.dashes) {
    opts.hyphens = true;
    delete opts.dashes;
  }

  if (!opts.ignore || (!isArr(opts.ignore) && !isStr(opts.ignore))) {
    opts.ignore = [];
  } else {
    opts.ignore = arrayiffyIfStr(opts.ignore);
    if (opts.ignore.some(val => isStr(val))) {
      // if some values are strings, we need to either remove them or expand them
      // from string to recognised list of heads/tails
      let temp = [];
      // console.log(
      //   `142 ${`\u001b[${31}m${`OLD`}\u001b[${39}m`} ${`\u001b[${33}m${`opts.ignore`}\u001b[${39}m`} = ${JSON.stringify(
      //     opts.ignore,
      //     null,
      //     0
      //   )}`
      // );
      opts.ignore = opts.ignore.filter(val => {
        if (isStr(val) && val.length) {
          if (
            ["nunjucks", "jinja", "liquid"].includes(val.trim().toLowerCase())
          ) {
            temp = temp.concat(headsAndTailsJinja);
          } else if (["hugo"].includes(val.trim().toLowerCase())) {
            temp = temp.concat(headsAndTailsHugo);
          } else if (["hexo"].includes(val.trim().toLowerCase())) {
            temp = temp.concat(headsAndTailsHexo);
          }
          return false;
        } else if (typeof val === "object") {
          return true;
        }
        // otherwise false is returned, value is excluded
      });
      if (temp.length) {
        opts.ignore = opts.ignore.concat(temp);
      }
    }
  }

  let ceil;

  if (opts.reportProgressFunc) {
    // ceil is the top the range [0, 100], or whatever it was customised to,
    // [opts.reportProgressFuncFrom, opts.reportProgressFuncTo].
    // Also, leavePercForLastStage needs to be left to next stage, so "100" or
    // "opts.reportProgressFuncTo" is multiplied by (1 - leavePercForLastStage).
    ceil = Math.floor(
      opts.reportProgressFuncTo -
        (opts.reportProgressFuncTo - opts.reportProgressFuncFrom) *
          leavePercForLastStage -
        opts.reportProgressFuncFrom
    );
    console.log(
      `185 ${`\u001b[${33}m${`ceil`}\u001b[${39}m`} = ${JSON.stringify(
        ceil,
        null,
        4
      )}`
    );
  }

  // console.log(
  //   `194 ${`\u001b[${32}m${`FINAL`}\u001b[${39}m`} ${`\u001b[${33}m${`opts.ignore`}\u001b[${39}m`} = ${JSON.stringify(
  //     opts.ignore,
  //     null,
  //     4
  //   )}`
  // );

  function resetAll() {
    wordCount = 0;
    charCount = 0;
    secondToLastWhitespaceStartedAt = undefined;
    secondToLastWhitespaceEndedAt = undefined;
    lastWhitespaceStartedAt = undefined;
    lastWhitespaceEndedAt = undefined;
    lastEncodedNbspStartedAt = undefined;
    lastEncodedNbspEndedAt = undefined;
    // lineBreakCount = undefined;
  }

  resetAll();

  console.log(
    `216 ${`\u001b[${32}m${`USING`}\u001b[${39}m`} ${`\u001b[${33}m${`opts`}\u001b[${39}m`} = ${JSON.stringify(
      opts,
      null,
      4
    )}`
  );

  // iterate the string
  for (let i = 0; i < len; i++) {
    //
    //
    //
    //
    //                    TOP
    //
    //
    //
    //

    // Logging:
    // ███████████████████████████████████████
    console.log(
      `\n\u001b[${36}m${`===============================`}\u001b[${39}m \u001b[${35}m${`str[ ${i} ] = ${
        str[i].trim().length ? str[i] : JSON.stringify(str[i], null, 0)
      }`}\u001b[${39}m \u001b[${36}m${`===============================`}\u001b[${39}m\n`
    );

    // detect templating language heads and tails
    if (!doNothingUntil && isArr(opts.ignore) && opts.ignore.length) {
      opts.ignore.some((valObj, y) => {
        if (
          (isArr(valObj.heads) &&
            valObj.heads.some(oneOfHeads => str.startsWith(oneOfHeads, i))) ||
          (isStr(valObj.heads) && str.startsWith(valObj.heads, i))
        ) {
          console.log(
            `252 ${`\u001b[${31}m${`heads detected!`}\u001b[${39}m`}`
          );
          wordCount++;
          doNothingUntil = opts.ignore[y].tails;
          console.log(
            `257 ${`\u001b[${90}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`doNothingUntil`}\u001b[${39}m`} = ${doNothingUntil}`
          );
          return true;
        }
      });
    }

    // if there was word count bump request issued in the past for current
    // index, do bump it:
    if (!doNothingUntil && bumpWordCountAt && bumpWordCountAt === i) {
      wordCount++;
      bumpWordCountAt = undefined;
      console.log(
        `270 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`wordCount`}\u001b[${39}m`} = ${wordCount}; ${`\u001b[${33}m${`bumpWordCountAt`}\u001b[${39}m`} = ${bumpWordCountAt}`
      );
    }

    // Report the progress. Used in web worker setups.
    if (typeof opts.reportProgressFunc === "function") {
      // defaults:
      // opts.reportProgressFuncFrom = 0
      // opts.reportProgressFuncTo = 100

      currentPercentageDone =
        opts.reportProgressFuncFrom + Math.floor((i / len) * ceil);
      // console.log(
      //   `283 ${`\u001b[${33}m${`currentPercentageDone`}\u001b[${39}m`} = ${currentPercentageDone}; ${`\u001b[${33}m${`lastPercentage`}\u001b[${39}m`} = ${lastPercentage};`
      // );

      if (currentPercentageDone !== lastPercentage) {
        lastPercentage = currentPercentageDone;
        opts.reportProgressFunc(currentPercentageDone);
      }
    }

    // catch the end of whitespace (must be at the top)
    if (
      !doNothingUntil &&
      i &&
      str[i].trim().length &&
      (!str[i - 1] || (str[i - 1] && !str[i - 1].trim().length))
    ) {
      // 1. mark the ending
      lastWhitespaceEndedAt = i;
      console.log(
        `302 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`lastWhitespaceEndedAt`}\u001b[${39}m`} = ${lastWhitespaceEndedAt}`
      );
    }

    if (!doNothingUntil && str[i].trim().length) {
      charCount++;
    }

    //
    //
    //
    //
    //
    //
    //
    //
    //             MIDDLE
    //
    //
    //
    //
    //
    //
    //
    //

    // catch dashes
    if (
      !doNothingUntil &&
      opts.hyphens &&
      (str[i] === "-" ||
        str[i] === rawMdash ||
        str[i] === rawNdash ||
        str.slice(i).startsWith(encodedNdashHtml) ||
        str.slice(i).startsWith(encodedNdashCss) ||
        str.slice(i).startsWith(encodedNdashJs) ||
        str.slice(i).startsWith(encodedMdashHtml) ||
        str.slice(i).startsWith(encodedMdashCss) ||
        str.slice(i).startsWith(encodedMdashJs)) &&
      str[i + 1] &&
      (!str[i + 1].trim().length || str[i] === "&")
    ) {
      console.log(`344 dash starts here`);
      if (str[i - 1] && !str[i - 1].trim().length && str[left(str, i)]) {
        push(left(str, i) + 1, i);
        console.log(`347 push [${left(str, i) + 1}, ${i}]`);
      }
    }

    // catch the HTML-encoded (named or numeric) nbsp's:
    if (
      !doNothingUntil &&
      ((str[i] === "&" &&
        str[i + 1] === "n" &&
        str[i + 2] === "b" &&
        str[i + 3] === "s" &&
        str[i + 4] === "p" &&
        str[i + 5] === ";") ||
        (str[i] === "&" &&
          str[i + 1] === "#" &&
          str[i + 2] === "1" &&
          str[i + 3] === "6" &&
          str[i + 4] === "0" &&
          str[i + 5] === ";"))
    ) {
      console.log(`369 HTML-encoded NBSP caught!`);
      lastEncodedNbspStartedAt = i;
      lastEncodedNbspEndedAt = i + 6;
      console.log(
        `373 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`lastEncodedNbspStartedAt`}\u001b[${39}m`} = ${lastEncodedNbspStartedAt}; ${`\u001b[${33}m${`lastEncodedNbspEndedAt`}\u001b[${39}m`} = ${lastEncodedNbspEndedAt}`
      );

      // since there was no whitespace, word counting needs to ba taken care of
      // separately, but the index-bumping must happen in future, at correct time
      if (str[i + 6] && str[i + 6].trim().length) {
        bumpWordCountAt = i + 6;
      }

      // if it opts.convertEntities is off, replace it right away
      if (!opts.convertEntities) {
        rangesArr.push(i, i + 6, rawnbsp);
        console.log(
          `386 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
            6}, "${rawnbsp}"]`
        );
      } else if (
        opts.targetLanguage === "css" ||
        opts.targetLanguage === "js"
      ) {
        rangesArr.push(
          i,
          i + 6,
          opts.targetLanguage === "css" ? encodedNbspCss : encodedNbspJs
        );
        console.log(
          `399 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i + 6}, "${
            opts.targetLanguage === "css" ? encodedNbspCss : encodedNbspJs
          }"]`
        );
      }
    }

    // catch the CSS-encoded (\00A0) nbsp's:
    if (
      !doNothingUntil &&
      str[i] === "\\" &&
      str[i + 1] === "0" &&
      str[i + 2] === "0" &&
      str[i + 3] &&
      str[i + 3].toUpperCase() === "A" &&
      str[i + 4] === "0"
    ) {
      console.log(`416 CSS-encoded NBSP caught!`);
      lastEncodedNbspStartedAt = i;
      lastEncodedNbspEndedAt = i + 5;
      console.log(
        `420 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`lastEncodedNbspStartedAt`}\u001b[${39}m`} = ${lastEncodedNbspStartedAt}; ${`\u001b[${33}m${`lastEncodedNbspEndedAt`}\u001b[${39}m`} = ${lastEncodedNbspEndedAt}`
      );

      // since there was no whitespace, word counting needs to ba taken care of
      // separately, but the index-bumping must happen in future, at correct time
      if (str[i + 5] && str[i + 5].trim().length) {
        bumpWordCountAt = i + 5;
      }

      // if it opts.convertEntities is off, replace it right away
      if (!opts.convertEntities) {
        rangesArr.push(i, i + 5, rawnbsp);
        console.log(
          `433 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
            5}, "${rawnbsp}"]`
        );
      } else if (
        opts.targetLanguage === "html" ||
        opts.targetLanguage === "js"
      ) {
        rangesArr.push(
          i,
          i + 5,
          opts.targetLanguage === "html" ? encodedNbspHtml : encodedNbspJs
        );
        console.log(
          `446 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i + 5}, "${
            opts.targetLanguage === "html" ? encodedNbspHtml : encodedNbspJs
          }"]`
        );
      }
    }

    // catch the JS-encoded (\u00A0) nbsp's:
    if (
      !doNothingUntil &&
      str[i] === "\\" &&
      str[i + 1] &&
      str[i + 1].toLowerCase() === "u" &&
      str[i + 2] === "0" &&
      str[i + 3] === "0" &&
      str[i + 4] &&
      str[i + 4].toUpperCase() === "A" &&
      str[i + 5] === "0"
    ) {
      console.log(`465 JS-encoded NBSP caught!`);
      lastEncodedNbspStartedAt = i;
      lastEncodedNbspEndedAt = i + 6;
      console.log(
        `469 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`lastEncodedNbspStartedAt`}\u001b[${39}m`} = ${lastEncodedNbspStartedAt}; ${`\u001b[${33}m${`lastEncodedNbspEndedAt`}\u001b[${39}m`} = ${lastEncodedNbspEndedAt}`
      );

      // since there was no whitespace, word counting needs to ba taken care of
      // separately, but the index-bumping must happen in future, at correct time
      if (str[i + 6] && str[i + 6].trim().length) {
        bumpWordCountAt = i + 6;
      }

      // if it opts.convertEntities is off, replace it right away
      if (!opts.convertEntities) {
        rangesArr.push(i, i + 6, rawnbsp);
        console.log(
          `482 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
            6}, "${rawnbsp}"]`
        );
      } else if (
        opts.targetLanguage === "html" ||
        opts.targetLanguage === "css"
      ) {
        rangesArr.push(
          i,
          i + 6,
          opts.targetLanguage === "html" ? encodedNbspHtml : encodedNbspCss
        );
        console.log(
          `495 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i + 6}, "${
            opts.targetLanguage === "html" ? encodedNbspHtml : encodedNbspCss
          }"]`
        );
      }
    }

    // catch raw nbsp's:
    if (!doNothingUntil && str[i] === rawnbsp) {
      console.log(`504 raw unencoded NBSP caught!`);
      lastEncodedNbspStartedAt = i;
      lastEncodedNbspEndedAt = i + 1;
      console.log(
        `508 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`lastEncodedNbspStartedAt`}\u001b[${39}m`} = ${lastEncodedNbspStartedAt}; ${`\u001b[${33}m${`lastEncodedNbspEndedAt`}\u001b[${39}m`} = ${lastEncodedNbspEndedAt}`
      );

      // since there was no whitespace, word counting needs to ba taken care of
      // separately, but the index-bumping must happen in future, at correct time
      if (str[i + 2] && str[i + 2].trim().length) {
        bumpWordCountAt = i + 2;
      }

      // if it opts.convertEntities is off, replace it right away
      if (opts.convertEntities) {
        rangesArr.push(
          i,
          i + 1,
          opts.targetLanguage === "css"
            ? encodedNbspCss
            : opts.targetLanguage === "js"
            ? encodedNbspJs
            : encodedNbspHtml
        );
        console.log(
          `529 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i + 1}, "${
            opts.targetLanguage === "css"
              ? encodedNbspCss
              : opts.targetLanguage === "js"
              ? encodedNbspJs
              : encodedNbspHtml
          }"]`
        );
      }
    }

    // catch the first letter of the first word
    if (
      !doNothingUntil &&
      str[i].trim().length &&
      (!str[i - 1] || !str[i - 1].trim().length)
    ) {
      // 1. bump the word counter
      wordCount++;
      console.log(
        `549 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`wordCount`}\u001b[${39}m`} = ${wordCount}`
      );
    }

    // catch the ending of paragraphs or the EOL - here's where the action happens
    if (
      !doNothingUntil &&
      (!str[i + 1] ||
        ((str[i] === "\n" && str[i + 1] === "\n") ||
          (str[i] === "\r" && str[i + 1] === "\r") ||
          (str[i] === "\r" &&
            str[i + 1] === "\n" &&
            str[i + 2] === "\r" &&
            str[i + 3] === "\n")) ||
        ((str[i] === "\n" ||
          str[i] === "\r" ||
          (str[i] === "\r" && str[i + 1] === "\n")) &&
          str[i - 1] &&
          punctuationCharsToConsiderWidowIssue.includes(str[left(str, i)])))
    ) {
      console.log(
        `570 ${`\u001b[${32}m${`██`}\u001b[${39}m`} PARAGRAPH ENDING!`
      );

      if (
        (!opts.minWordCount || wordCount >= opts.minWordCount) &&
        (!opts.minCharCount || charCount >= opts.minCharCount)
      ) {
        let finalStart;
        let finalEnd;

        // calculate start and end values
        if (
          lastWhitespaceStartedAt !== undefined &&
          lastWhitespaceEndedAt !== undefined &&
          lastEncodedNbspStartedAt !== undefined &&
          lastEncodedNbspEndedAt !== undefined
        ) {
          console.log(`587`);
          if (lastWhitespaceStartedAt > lastEncodedNbspStartedAt) {
            finalStart = lastWhitespaceStartedAt;
            finalEnd = lastWhitespaceEndedAt;
          } else {
            finalStart = lastEncodedNbspStartedAt;
            finalEnd = lastEncodedNbspEndedAt;
          }
        } else if (
          lastWhitespaceStartedAt !== undefined &&
          lastWhitespaceEndedAt !== undefined
        ) {
          console.log(`599`);
          finalStart = lastWhitespaceStartedAt;
          finalEnd = lastWhitespaceEndedAt;
        } else if (
          lastEncodedNbspStartedAt !== undefined &&
          lastEncodedNbspEndedAt !== undefined
        ) {
          console.log(`606`);
          finalStart = lastEncodedNbspStartedAt;
          finalEnd = lastEncodedNbspEndedAt;
        }

        // if by now the point to insert non-breaking space was not found,
        // give last chance to secondToLastWhitespaceStartedAt and
        // secondToLastWhitespaceEndedAt:
        if (
          !(finalStart && finalEnd) &&
          secondToLastWhitespaceStartedAt &&
          secondToLastWhitespaceEndedAt
        ) {
          console.log(`619`);
          finalStart = secondToLastWhitespaceStartedAt;
          finalEnd = secondToLastWhitespaceEndedAt;
        }

        console.log(`624 finalStart = ${finalStart}; finalEnd = ${finalEnd}`);

        if (finalStart && finalEnd) {
          push(finalStart, finalEnd);
        }
      }

      resetAll();
      console.log(`632 ${`\u001b[${31}m${`RESET`}\u001b[${39}m`}`);
    }

    // catch postcodes
    // postcodeRegexFront, postcodeRegexEnd
    if (
      opts.UKPostcodes &&
      !str[i].trim().length &&
      str[i - 1] &&
      str[i - 1].trim().length &&
      postcodeRegexFront.test(str.slice(0, i)) &&
      str[right(str, i)] &&
      postcodeRegexEnd.test(str.slice(right(str, i)))
    ) {
      console.log(`646 POSTCODE caught: [${i}, ${right(str, i)}]`);
      push(i, right(str, i));
    }

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //              BOTTOM
    //
    //
    //
    //
    //
    //
    //
    //

    // catch the start of whitespace (must be at the bottom)
    //
    // either it's first whitespace character ever met, or we're overwriting an
    // old whitespace record and it's the first character of new whitespace chunk
    if (
      !doNothingUntil &&
      !str[i].trim().length &&
      str[i - 1] &&
      str[i - 1].trim().length &&
      (lastWhitespaceStartedAt === undefined ||
        (str[lastWhitespaceStartedAt - 1] &&
          str[lastWhitespaceStartedAt - 1].trim().length)) &&
      !"/>".includes(str[right(str, i)]) &&
      !str.slice(0, left(str, i) + 1).endsWith("br") &&
      !str.slice(0, left(str, i) + 1).endsWith("hr")
    ) {
      // 1. current value becomes second-to-last
      secondToLastWhitespaceStartedAt = lastWhitespaceStartedAt;
      secondToLastWhitespaceEndedAt = lastWhitespaceEndedAt;

      // 2. mark new-one
      lastWhitespaceStartedAt = i;

      // 2. wipe the ending of new-one
      lastWhitespaceEndedAt = undefined;

      console.log(
        `696 ${`\u001b[${32}m${`SET 2`}\u001b[${39}m`} ${`\u001b[${33}m${`secondToLastWhitespaceStartedAt`}\u001b[${39}m`} = ${secondToLastWhitespaceStartedAt};${" ".repeat(
          String(secondToLastWhitespaceStartedAt).length <
            String(lastWhitespaceStartedAt).length
            ? Math.max(
                String(secondToLastWhitespaceStartedAt).length,
                String(lastWhitespaceStartedAt).length
              ) -
                Math.min(
                  String(secondToLastWhitespaceStartedAt).length,
                  String(lastWhitespaceStartedAt).length
                )
            : 0
        )} ${`\u001b[${33}m${`secondToLastWhitespaceEndedAt`}\u001b[${39}m`} = ${secondToLastWhitespaceEndedAt};`
      );
      console.log(
        `711 ${`\u001b[${32}m${`SET 2`}\u001b[${39}m`} ${`\u001b[${33}m${`lastWhitespaceStartedAt`}\u001b[${39}m`}         = ${lastWhitespaceStartedAt};${" ".repeat(
          String(secondToLastWhitespaceStartedAt).length >
            String(lastWhitespaceStartedAt).length
            ? Math.max(
                String(secondToLastWhitespaceStartedAt).length,
                String(lastWhitespaceStartedAt).length
              ) -
                Math.min(
                  String(secondToLastWhitespaceStartedAt).length,
                  String(lastWhitespaceStartedAt).length
                )
            : 0
        )} ${`\u001b[${33}m${`lastWhitespaceEndedAt`}\u001b[${39}m`}         = ${lastWhitespaceEndedAt};`
      );

      // 3. wipe the records of the last nbsp because they are not relevant
      if (
        lastEncodedNbspStartedAt !== undefined ||
        lastEncodedNbspEndedAt !== undefined
      ) {
        lastEncodedNbspStartedAt = undefined;
        lastEncodedNbspEndedAt = undefined;
        console.log(
          `734 ${`\u001b[${90}m${`RESET`}\u001b[${39}m`} lastEncodedNbspStartedAt, lastEncodedNbspEndedAt`
        );
      }
    }

    // look for templating tails
    let tempTailFinding;
    if (doNothingUntil) {
      if (
        isStr(doNothingUntil) &&
        (!doNothingUntil.length || str.startsWith(doNothingUntil, i))
      ) {
        doNothingUntil = undefined;
      } else if (
        isArr(doNothingUntil) &&
        (!doNothingUntil.length ||
          doNothingUntil.some(val => {
            if (str.startsWith(val, i)) {
              tempTailFinding = val;
              return true;
            }
          }))
      ) {
        doNothingUntil = undefined;
        console.log(
          `759 RESET ${`\u001b[${33}m${`doNothingUntil`}\u001b[${39}m`}`
        );
        console.log(
          `762 ${`\u001b[${32}m${`BUMP`}\u001b[${39}m`} i: ${`\u001b[${33}m${i}\u001b[${39}m`}=>${`\u001b[${33}m${i +
            tempTailFinding.length}\u001b[${39}m`}`
        );

        i += tempTailFinding.length;

        // imagine we caught "{% endif" of the following string:
        // {% if something %} some text and more text {% endif %}
        // we need to tackle the "%}" that follows.
        console.log(
          `772 \u001b[${32}m${`██`}\u001b[${39}m we're at i=${i}, to the right is: ${str.slice(
            i
          )}`
        );
        if (isArr(opts.ignore) && opts.ignore.length && str[i + 1]) {
          opts.ignore.some(oneOfHeadsTailsObjs => {
            // console.log("\n\n\n");
            // console.log(
            //   `780 ${`\u001b[${36}m${`███████████████████████████████████████`}\u001b[${39}m`}\n\n\n`
            // );
            // console.log(
            //   `783 PROCESSING ${`\u001b[${33}m${`oneOfHeadsTailsObjs`}\u001b[${39}m`} = ${JSON.stringify(
            //     oneOfHeadsTailsObjs,
            //     null,
            //     4
            //   )}`
            // );
            return matchRightIncl(str, i, oneOfHeadsTailsObjs.tails, {
              trimBeforeMatching: true,
              cb: (char, theRemainderOfTheString, index) => {
                if (index) {
                  console.log(`793 RECEIVED by CB() index = ${index}`);
                  i = index - 1;
                  console.log(
                    `796 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} i = ${i - 1}`
                  );
                  if (str[i + 1] && str[i + 1].trim().length) {
                    wordCount++;
                    console.log(
                      `801 ${`\u001b[${32}m${`BUMP`}\u001b[${39}m`} wordCount now = ${wordCount}`
                    );
                  }
                }
                return true;
              }
            });
          });
        }
      }
    }

    // logging after each loop's iteration:
    // ███████████████████████████████████████
    console.log(
      `    \u001b[${90}m${`██ ██ ██ ██ ██ END ██ ██ ██ ██ ██`}\u001b[${39}m`
    );
    console.log(
      `${`\u001b[${90}m${`231 second-to-last whitespace: [${secondToLastWhitespaceStartedAt}, ${secondToLastWhitespaceEndedAt}]`}\u001b[${39}m`}`
    );
    console.log(
      `${`\u001b[${90}m${`231 last whitespace: [${lastWhitespaceStartedAt}, ${lastWhitespaceEndedAt}]`}\u001b[${39}m`}`
    );
    console.log(
      `${`\u001b[${90}m${`234 last encoded nbsp: [${lastEncodedNbspStartedAt}, ${lastEncodedNbspEndedAt}]`}\u001b[${39}m`}`
    );
    console.log(
      `${`\u001b[${90}m${`237 word count ${wordCount}; char count ${charCount}`}\u001b[${39}m`}${
        bumpWordCountAt
          ? `${`\u001b[${90}m${`;`}\u001b[${39}m`}${`\u001b[${90}m${` bumpWordCountAt = ${bumpWordCountAt}`}\u001b[${39}m`}`
          : ""
      }`
    );
    console.log(
      `${`\u001b[${90}m${`516 rangesArr: ${JSON.stringify(
        rangesArr.current(),
        null,
        0
      )}`}\u001b[${39}m`}${
        doNothingUntil
          ? `\n${`\u001b[${31}m${`doNothingUntil = ${JSON.stringify(
              doNothingUntil,
              null,
              0
            )}`}\u001b[${39}m`}`
          : ""
      }`
    );

    //
    //
    //
    // end of the loop
  }

  return {
    res: apply(
      str,
      rangesArr.current(),
      opts.reportProgressFunc
        ? incomingPerc => {
            currentPercentageDone = Math.floor(
              (opts.reportProgressFuncTo - opts.reportProgressFuncFrom) *
                (1 - leavePercForLastStage) +
                (incomingPerc / 100) *
                  (opts.reportProgressFuncTo - opts.reportProgressFuncFrom) *
                  leavePercForLastStage
            );
            console.log(
              `870 ${`\u001b[${33}m${`currentPercentageDone`}\u001b[${39}m`} = ${JSON.stringify(
                currentPercentageDone,
                null,
                4
              )}`
            );
            if (currentPercentageDone !== lastPercentage) {
              lastPercentage = currentPercentageDone;
              opts.reportProgressFunc(currentPercentageDone);
            }
          }
        : null
    ),
    ranges: rangesArr.current(),
    log: {
      timeTakenInMiliseconds: Date.now() - start
    }
  };
}

// main export
export { removeWidows, defaultOpts, version };
