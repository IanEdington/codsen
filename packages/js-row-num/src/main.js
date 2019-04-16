import Slices from "ranges-push";
import applySlices from "ranges-apply";
import checkTypes from "check-types-mini";
import { padStart } from "./util";

function fixRowNums(str, originalOpts) {
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }
  function isDigit(something) {
    return /[0-9]/.test(something);
  }
  function isAZ(something) {
    return /[A-Za-z]/.test(something);
  }

  const defaults = {
    padStart: 3
  };
  const opts = Object.assign({}, defaults, originalOpts);
  if (
    !opts.padStart ||
    typeof opts.padStart !== "number" ||
    (typeof opts.padStart === "number" && opts.padStart < 0)
  ) {
    opts.padStart = 0;
  }
  checkTypes(opts, defaults, { msg: "js-row-num: [THROW_ID_04*]" });

  const finalIndexesToDelete = new Slices();

  let i;
  const len = str.length;
  let quotes = null;
  let consoleStartsAt = null;
  let bracketOpensAt = null;
  let currentRow = 1;
  let wasLetterDetected = false;
  let digitStartsAt = null;

  if (opts.padStart && len > 45000) {
    opts.padStart = 4;
  }

  console.log(`${`\u001b[${33}m${`str`}\u001b[${39}m`}:\n${str}`);

  for (i = 0; i < len; i++) {
    console.log(
      `\u001b[${36}m${`--------------------------------`}\u001b[${39}m ${`\u001b[${33}m${`str[${i}]`}\u001b[${39}m`} = ${
        str[i].trim().length ? str[i] : JSON.stringify(str[i], null, 0)
      }`
    );

    // count lines:
    if (str[i] === "\n" || (str[i] === "\r" && str[i + 1] !== "\n")) {
      currentRow++;
    }

    // catch the ending of the digits within console.log:
    if (digitStartsAt && !isDigit(str[i]) && i > digitStartsAt) {
      // replace the digits:
      console.log("058 THING ABOUT TO BE PUSHED:");
      console.log(
        `060 ${`\u001b[${33}m${`opts.padStart`}\u001b[${39}m`} = ${JSON.stringify(
          opts.padStart,
          null,
          4
        )}`
      );
      console.log(
        `067 ${`\u001b[${33}m${`padStart(${currentRow} (${typeof currentRow}), ${
          opts.padStart
        } (typeof ${opts.padStart}), "0")`}\u001b[${39}m`} = ${JSON.stringify(
          padStart(currentRow, opts.padStart, "0"),
          null,
          4
        )}`
      );
      console.log(
        `076 ${opts.padStart}`
          ? padStart(currentRow, opts.padStart, "0")
          : `${currentRow}`
      );
      finalIndexesToDelete.push(
        digitStartsAt,
        i,
        opts.padStart
          ? padStart(currentRow, opts.padStart, "0")
          : `${currentRow}`
      );
      // then, reset:
      digitStartsAt = null;
      console.log(
        `090 ${`\u001b[${33}m${`digitStartsAt`}\u001b[${39}m`} = null`
      );
      // set wasLetterDetected as a decoy to prevent further digit lumps from being edited:
      wasLetterDetected = true;
      console.log(
        `095 SET ${`\u001b[${33}m${`wasLetterDetected`}\u001b[${39}m`} = true`
      );
    }

    // catch the first digit within console.log:
    if (
      quotes &&
      quotes.start < i &&
      !wasLetterDetected &&
      !digitStartsAt &&
      isDigit(str[i])
    ) {
      digitStartsAt = i;
      console.log(
        `109 SET ${`\u001b[${33}m${`digitStartsAt`}\u001b[${39}m`} = ${digitStartsAt}`
      );
    }

    // catch first letter within console.log:
    if (quotes && quotes.start < i && !wasLetterDetected && isAZ(str[i])) {
      // Skip one of more of either patterns:
      // \u001b[${33}m
      // ${`
      // `\u001b[33m       \u001b[39m`

      // \u001B[4m        \u001B[0m

      // \u001B[4m   \u001B[0m

      // check for pattern \u001B[ + optional ${ + any amount of digits + optional } + m
      if (
        str[i - 1] === "\\" &&
        str[i] === "u" &&
        str[i + 1] === "0" &&
        str[i + 2] === "0" &&
        str[i + 3] === "1" &&
        (str[i + 4] === "b" || str[i + 5] === "B") &&
        str[i + 5] === "["
      ) {
        console.log(`134 \u001b[${35}m${`MATCHED`}\u001b[${39}m`);
        // at this moment, we have stuck here:
        //
        // console.log(`\u001b[${33}m${`137 zzz`}\u001b[${39}m`)
        //                    ^
        //           here, at this bracket

        // now, the ANSI colour digit code might be wrapped with ${} and also,
        // it can be of an indeterminate width: normally there is either one or
        // two digits.

        // We need to find where digits start.

        // There are two possibilities: either here, or after string literal ${}
        // wrapper:

        // base assumption, we're here:
        // console.log(`\u001b[33m 123 zzz \u001b[${39}m`)
        //                     ^
        //                   here

        let startMarchingForwFrom;
        if (isDigit(str[i + 6])) {
          startMarchingForwFrom = i + 6;
          console.log(
            `159 SET ${`\u001b[${33}m${`startMarchingForwFrom`}\u001b[${39}m`} = ${startMarchingForwFrom}`
          );
        } else if (
          str[i + 6] === "$" &&
          str[i + 7] === "{" &&
          isDigit(str[i + 8])
        ) {
          startMarchingForwFrom = i + 8;
          console.log(
            `168 SET ${`\u001b[${33}m${`startMarchingForwFrom`}\u001b[${39}m`} = ${startMarchingForwFrom}`
          );
        }

        console.log(
          `173 FINAL ${`\u001b[${33}m${`startMarchingForwFrom`}\u001b[${39}m`} = ${startMarchingForwFrom}`
        );

        // find out where does this (possibly a sequence) of number(s) end:
        let numbersSequenceEndsAt;
        if (startMarchingForwFrom) {
          console.log(
            `180 \u001b[${36}m${`startMarchingForwFrom`}\u001b[${39}m was set so marching forward`
          );
          for (let y = startMarchingForwFrom; y < len; y++) {
            console.log(`\u001b[${36}m${`str[${y}] = ${str[y]}`}\u001b[${39}m`);
            if (!isDigit(str[y])) {
              numbersSequenceEndsAt = y;
              console.log(`\u001b[${36}m${`not digit, so break`}\u001b[${39}m`);
              break;
            }
          }
          console.log(`190 \u001b[${36}m${`stop marching`}\u001b[${39}m`);
        }

        // answer: at "numbersSequenceEndsAt".
        console.log(
          `195 \u001b[${32}m${`str[${numbersSequenceEndsAt}] = ${
            str[numbersSequenceEndsAt]
          }`}\u001b[${39}m`
        );

        // We're at the next character where digits end. That is:

        // console.log(`\u001b[33m 123 zzz \u001b[${39}m`)
        //                       ^
        //                     here, OR

        // console.log(`\u001b[${33}m 123 zzz \u001b[${39}m`)
        //                         ^
        //                       here

        let ansiSequencesLetterMAt;

        if (str[numbersSequenceEndsAt] === "m") {
          // if number follows "m", this is it:
          ansiSequencesLetterMAt = numbersSequenceEndsAt;
        } else if (
          str[numbersSequenceEndsAt] === "}" &&
          str[numbersSequenceEndsAt + 1] === "m"
        ) {
          ansiSequencesLetterMAt = numbersSequenceEndsAt + 1;
        }

        console.log(
          `223 ${`\u001b[${33}m${`ansiSequencesLetterMAt`}\u001b[${39}m`} = ${ansiSequencesLetterMAt};`
        );

        if (!ansiSequencesLetterMAt) {
          // if ANSI closing "m" hasn't been detected yet, bail:
          wasLetterDetected = true;
          continue;
        }

        if (
          str[ansiSequencesLetterMAt + 1] === "$" &&
          str[ansiSequencesLetterMAt + 2] === "{" &&
          str[ansiSequencesLetterMAt + 3] === "`"
        ) {
          i = ansiSequencesLetterMAt + 3;
          console.log(`238 SET ${`\u001b[${33}m${`i`}\u001b[${39}m`} = ${i}`);
          continue;
        }
      }

      wasLetterDetected = true;
      console.log(
        `245 SET ${`\u001b[${33}m${`wasLetterDetected`}\u001b[${39}m`} = true`
      );
    }

    // catch closing quotes console.log( ' -----> ' <------)
    if (quotes && quotes.start < i && quotes.type === str[i]) {
      console.log(
        `252 \u001b[${31}m${`CLOSING QUOTE DETECTED - WIPE`}\u001b[${39}m`
      );
      quotes = null;
      consoleStartsAt = null;
      bracketOpensAt = null;
      digitStartsAt = null;
      wasLetterDetected = false;
    }

    // catch opening quotes console.log( -----> ' <------ ')
    if (
      !quotes &&
      consoleStartsAt &&
      consoleStartsAt < i &&
      bracketOpensAt &&
      bracketOpensAt < i &&
      str[i].trim().length
    ) {
      console.log("270");

      if (str[i] === '"' || str[i] === "'" || str[i] === "`") {
        quotes = {};
        quotes.start = i;
        quotes.type = str[i];
        wasLetterDetected = false;
        console.log(
          `278 SET ${`\u001b[${33}m${`wasLetterDetected`}\u001b[${39}m`} = ${JSON.stringify(
            wasLetterDetected,
            null,
            4
          )}`
        );
        console.log(
          `285 SET ${`\u001b[${33}m${`quotes`}\u001b[${39}m`} = ${JSON.stringify(
            quotes,
            null,
            4
          )}`
        );
      } else if (str[i] !== "/") {
        // wipe
        console.log(
          `294 \u001b[${31}m${`A QUOTE EXPECTED HERE SO WIPE`}\u001b[${39}m`
        );
        consoleStartsAt = null;
        bracketOpensAt = null;
        digitStartsAt = null;
      }
    }

    // catch the opening bracket of console.log ---->(<----- )
    if (
      !bracketOpensAt &&
      str[i].trim().length &&
      consoleStartsAt &&
      consoleStartsAt <= i
    ) {
      if (str[i] === "(") {
        bracketOpensAt = i;
        console.log(
          `312 SET ${`\u001b[${33}m${`bracketOpensAt`}\u001b[${39}m`} = ${JSON.stringify(
            bracketOpensAt,
            null,
            4
          )}`
        );
      } else {
        // wipe
        console.log(`320 \u001b[${31}m${`WIPE`}\u001b[${39}m`);
        consoleStartsAt = null;
        digitStartsAt = null;
      }
    }

    // catch console.log
    if (
      str[i] === "c" &&
      str[i + 1] === "o" &&
      str[i + 2] === "n" &&
      str[i + 3] === "s" &&
      str[i + 4] === "o" &&
      str[i + 5] === "l" &&
      str[i + 6] === "e" &&
      str[i + 7] === "." &&
      str[i + 8] === "l" &&
      str[i + 9] === "o" &&
      str[i + 10] === "g"
    ) {
      consoleStartsAt = i + 11;
      console.log(
        `342 SET ${`\u001b[${33}m${`consoleStartsAt`}\u001b[${39}m`} = ${consoleStartsAt}`
      );
      // offset the index so we don't traverse twice what was traversed already:
      i = i + 10;
      console.log(`346 SET ${`\u001b[${33}m${`i`}\u001b[${39}m`} = ${i}`);
      continue;
    }

    console.log(`\u001b[${90}m${`--------------------------`}\u001b[${39}m`);
    console.log(`\u001b[${90}m${`currentRow = ${currentRow}`}\u001b[${39}m`);
    console.log(
      `\u001b[${90}m${`digitStartsAt = ${digitStartsAt}`}\u001b[${39}m`
    );
    console.log(
      `\u001b[${90}m${`bracketOpensAt = ${bracketOpensAt}`}\u001b[${39}m`
    );
    console.log(
      `\u001b[${90}m${`consoleStartsAt = ${consoleStartsAt}`}\u001b[${39}m`
    );
    console.log(
      `\u001b[${90}m${`quotes = ${JSON.stringify(quotes, null, 0)}${
        quotes ? `\nwasLetterDetected = ${wasLetterDetected}` : ""
      }`}\u001b[${39}m`
    );
  }

  if (finalIndexesToDelete.current()) {
    return applySlices(str, finalIndexesToDelete.current());
  }

  // wipe
  quotes = undefined;
  consoleStartsAt = undefined;
  bracketOpensAt = undefined;
  currentRow = undefined;
  wasLetterDetected = undefined;
  digitStartsAt = undefined;
  currentRow = undefined;
  return str;
}

export default fixRowNums;
