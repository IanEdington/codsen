import arrayiffy from "arrayiffy-if-string";

function isObj(something) {
  return (
    something && typeof something === "object" && !Array.isArray(something)
  );
}
function isStr(something) {
  return typeof something === "string";
}

function march(str, fromIndexInclusive, strToMatch, opts, special, getNextIdx) {
  console.log(`013 \u001b[${35}m${"CALLED march()"}\u001b[${39}m`);
  console.log(
    `======\nargs:
${`\u001b[${33}m${`str`}\u001b[${39}m`} = ${str}
${`\u001b[${33}m${`fromIndexInclusive`}\u001b[${39}m`} = ${fromIndexInclusive}
${`\u001b[${33}m${`strToMatch`}\u001b[${39}m`} = ${strToMatch}
${`\u001b[${33}m${`opts`}\u001b[${39}m`} = ${JSON.stringify(opts, null, 4)}
${`\u001b[${33}m${`special`}\u001b[${39}m`} = ${special}
======`
  );

  const strToMatchVal =
    typeof strToMatch === "function" ? strToMatch() : strToMatch;

  // early ending case if matching EOL being at 0-th index:
  if (fromIndexInclusive < 0 && special && strToMatchVal === "EOL") {
    console.log("029 EARLY ENDING, return true");
    return strToMatchVal;
  }

  console.log(
    `034 ${`\u001b[${33}m${"fromIndexInclusive"}\u001b[${39}m`} = ${JSON.stringify(
      fromIndexInclusive,
      null,
      4
    )}`
  );

  if (fromIndexInclusive >= str.length && !special) {
    console.log(
      `043 starting index is beyond the string length so RETURN FALSE`
    );
    return false;
  }
  let charsToCheckCount = special ? 1 : strToMatch.length;
  console.log(`048 starting charsToCheckCount = ${charsToCheckCount}`);

  let lastWasMismatched = false; // value is "false" or index of where it was activated

  let i = fromIndexInclusive;
  console.log(
    `054 FIY, ${`\u001b[${33}m${`i`}\u001b[${39}m`} = ${JSON.stringify(
      i,
      null,
      4
    )}`
  );
  console.log(
    `061 FIY, ${`\u001b[${33}m${`str`}\u001b[${39}m`} = ${JSON.stringify(
      str,
      null,
      4
    )}`
  );
  while (str[i]) {
    const nextIdx = getNextIdx(i);

    console.log(
      `071 ${`\u001b[${36}m${"=================================="}\u001b[${39}m`} ${i}: >>${
        str[i]
      }`
    );
    if (opts.trimBeforeMatching && str[i].trim() === "") {
      console.log("076 trimmed");
      if (!str[nextIdx] && special && strToMatch === "EOL") {
        console.log(
          "079 start/end of string reached, matching to EOL, so return true"
        );
        return true;
      }
      i = getNextIdx(i);
      continue;
    }

    console.log(
      `088 ${`\u001b[${33}m${"opts.trimCharsBeforeMatching"}\u001b[${39}m`} = ${JSON.stringify(
        opts.trimCharsBeforeMatching,
        null,
        4
      )}`
    );
    console.log(
      `095 ${`\u001b[${33}m${`opts.trimCharsBeforeMatching.includes("${str[i]}")`}\u001b[${39}m`} = ${JSON.stringify(
        opts.trimCharsBeforeMatching.includes(str[i]),
        null,
        4
      )}`
    );

    if (
      (!opts.i && opts.trimCharsBeforeMatching.includes(str[i])) ||
      (opts.i &&
        opts.trimCharsBeforeMatching
          .map(val => val.toLowerCase())
          .includes(str[i].toLowerCase()))
    ) {
      console.log("109 char is in the skip list");
      if (special && strToMatch === "EOL" && !str[nextIdx]) {
        // return true because we reached the zero'th index, exactly what we're looking for
        console.log(
          "113 RETURN true because it's EOL next, exactly what we're looking for"
        );
        return true;
      }
      i = getNextIdx(i);
      continue;
    }
    console.log(
      `121 ${`\u001b[${33}m${"charsToCheckCount"}\u001b[${39}m`} = ${JSON.stringify(
        charsToCheckCount,
        null,
        4
      )}`
    );
    console.log(
      `128 strToMatch[charsToCheckCount - 1] = strToMatch[${charsToCheckCount -
        1}] = ${strToMatch[charsToCheckCount - 1]}`
    );
    console.log(
      `132 strToMatch[charsToCheckCount - 2]strToMatch[charsToCheckCount - 1] = strToMatch[${charsToCheckCount -
        2}]strToMatch[${charsToCheckCount - 1}] = ${
        strToMatch[charsToCheckCount - 2]
      }${strToMatch[charsToCheckCount - 1]}`
    );

    const charToCompareAgainst =
      nextIdx > i
        ? strToMatch[strToMatch.length - charsToCheckCount]
        : strToMatch[charsToCheckCount - 1];

    console.log(" ");
    console.log(`144 \u001b[${35}m${"██ str[i]"}\u001b[${39}m = ${str[i]}`);
    console.log(
      `146 \u001b[${35}m${"██ charToCompareAgainst"}\u001b[${39}m = ${charToCompareAgainst}`
    );
    if (
      (!opts.i && str[i] === charToCompareAgainst) ||
      (opts.i && str[i].toLowerCase() === charToCompareAgainst.toLowerCase())
    ) {
      console.log(" ");
      console.log(`153 ${`\u001b[${32}m${`MATCHED!`}\u001b[${39}m`}`);
      console.log(" ");
      charsToCheckCount -= 1;
      if (charsToCheckCount < 1) {
        console.log(
          `158 all chars matched, ${`\u001b[${32}m${`RETURN`}\u001b[${39}m`} i: ${i}; charsToCheckCount = ${charsToCheckCount}`
        );
        return i;
      }

      console.log(
        `164 ${`\u001b[${32}m${`${`\u001b[${32}m${`OK.`}\u001b[${39}m`} Reduced charsToCheckCount to ${charsToCheckCount}`}\u001b[${39}m`}`
      );
    } else {
      console.log(" ");
      console.log(`168 ${`\u001b[${31}m${`DID'T MATCH!`}\u001b[${39}m`}`);
      console.log(" ");
      console.log(`170 str[i = ${i}] = ${JSON.stringify(str[i], null, 4)}`);
      console.log(
        `172 strToMatch[strToMatch.length - charsToCheckCount = ${strToMatch.length -
          charsToCheckCount}] = ${JSON.stringify(
          strToMatch[strToMatch.length - charsToCheckCount],
          null,
          4
        )}`
      );

      // finally, try to salvage the situation, maybe opts.maxMismatches
      // allow a mismatch?
      if (opts.maxMismatches) {
        opts.maxMismatches = opts.maxMismatches - 1;
        console.log(
          `185 ${`\u001b[${31}m${`REDUCE`}\u001b[${39}m`} opts.maxMismatches to ${
            opts.maxMismatches
          }`
        );
        lastWasMismatched = i;
      } else {
        console.log(
          `192 ${`\u001b[${31}m${`THEREFORE, returning false.`}\u001b[${39}m`}`
        );
        return false;
      }
    }

    // turn off "lastWasMismatched" if it's on and it hasn't been activated
    // on this current index:
    if (Number.isInteger(lastWasMismatched) && lastWasMismatched !== i) {
      lastWasMismatched = false;
      console.log(
        `203 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`lastWasMismatched`}\u001b[${39}m`} = ${lastWasMismatched}`
      );
    }

    // iterate onto the next index, otherwise while would loop infinitely
    i = getNextIdx(i);

    console.log(
      `${`\u001b[${90}m${`--------------------- ending with: ---------------------`}\u001b[${39}m`}`
    );
    console.log(
      `${`\u001b[${90}m${`charsToCheckCount = ${JSON.stringify(
        charsToCheckCount,
        null,
        4
      )}`}\u001b[${39}m`}`
    );
    console.log(
      `${`\u001b[${90}m${`lastWasMismatched = ${JSON.stringify(
        lastWasMismatched,
        null,
        4
      )}`}\u001b[${39}m`}`
    );
  }

  console.log(`229 AFTER THE WHILE LOOP`);

  if (charsToCheckCount > 0) {
    if (special && strToMatchVal === "EOL") {
      console.log(
        `234 charsToCheckCount = ${charsToCheckCount};\nwent past the beginning of the string and EOL was queried to ${`\u001b[${32}m${`return TRUE`}\u001b[${39}m`}`
      );
      return true;
    }
    console.log(
      `239 ${`\u001b[${31}m${`charsToCheckCount = ${charsToCheckCount} THEREFORE, returning FALSE`}\u001b[${39}m`}`
    );
    return false;
  }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Real deal

function main(mode, str, position, originalWhatToMatch, originalOpts) {
  const defaults = {
    i: false,
    trimBeforeMatching: false,
    trimCharsBeforeMatching: [],
    maxMismatches: 0,
    firstMustMatch: true,
    lastMustMatch: true
  };

  // insurance
  if (
    isObj(originalOpts) &&
    Object.prototype.hasOwnProperty.call(originalOpts, "trimBeforeMatching") &&
    typeof originalOpts.trimBeforeMatching !== "boolean"
  ) {
    throw new Error(
      `string-match-left-right/${mode}(): [THROW_ID_09] opts.trimBeforeMatching should be boolean!${
        Array.isArray(originalOpts.trimBeforeMatching)
          ? ` Did you mean to use opts.trimCharsBeforeMatching?`
          : ""
      }`
    );
  }

  const opts = Object.assign({}, defaults, originalOpts);
  opts.trimCharsBeforeMatching = arrayiffy(opts.trimCharsBeforeMatching);
  opts.trimCharsBeforeMatching = opts.trimCharsBeforeMatching.map(el =>
    isStr(el) ? el : String(el)
  );

  if (!isStr(str)) {
    return false;
  } else if (!str.length) {
    return false;
  }

  if (!Number.isInteger(position) || position < 0) {
    throw new Error(
      `string-match-left-right/${mode}(): [THROW_ID_03] the second argument should be a natural number. Currently it's of a type: ${typeof position}, equal to:\n${JSON.stringify(
        position,
        null,
        4
      )}`
    );
  }
  let whatToMatch;

  let special;
  if (isStr(originalWhatToMatch)) {
    console.log("333");
    whatToMatch = [originalWhatToMatch];
  } else if (Array.isArray(originalWhatToMatch)) {
    console.log("336");
    whatToMatch = originalWhatToMatch;
  } else if (!originalWhatToMatch) {
    console.log("339");
    whatToMatch = originalWhatToMatch;
  } else if (typeof originalWhatToMatch === "function") {
    console.log("342");
    whatToMatch = [];
    whatToMatch.push(originalWhatToMatch);
    console.log(
      `346 whatToMatch = ${whatToMatch}; Array.isArray(whatToMatch) = ${Array.isArray(
        whatToMatch
      )}; whatToMatch.length = ${whatToMatch.length}`
    );
  } else {
    console.log("351");
    throw new Error(
      `string-match-left-right/${mode}(): [THROW_ID_05] the third argument, whatToMatch, is neither string nor array of strings! It's ${typeof originalWhatToMatch}, equal to:\n${JSON.stringify(
        originalWhatToMatch,
        null,
        4
      )}`
    );
  }

  console.log("\n\n");
  console.log(
    `363 whatToMatch = ${whatToMatch}; typeof whatToMatch = ${typeof whatToMatch}`
  );

  if (originalOpts && !isObj(originalOpts)) {
    throw new Error(
      `string-match-left-right/${mode}(): [THROW_ID_06] the fourth argument, options object, should be a plain object. Currently it's of a type "${typeof originalOpts}", and equal to:\n${JSON.stringify(
        originalOpts,
        null,
        4
      )}`
    );
  }

  let culpritsIndex;
  let culpritsVal;
  if (
    opts.trimCharsBeforeMatching.some((el, i) => {
      if (el.length > 1) {
        culpritsIndex = i;
        culpritsVal = el;
        return true;
      }
      return false;
    })
  ) {
    throw new Error(
      `string-match-left-right/${mode}(): [THROW_ID_07] the fourth argument, options object contains trimCharsBeforeMatching. It was meant to list the single characters but one of the entries at index ${culpritsIndex} is longer than 1 character, ${culpritsVal.length} (equals to ${culpritsVal}). Please split it into separate characters and put into array as separate elements.`
    );
  }

  // action

  // CASE 1. If it's driven by callback-only, the 3rd input argument, what to look
  // for - is falsey - empty string within array (or not), OR given null

  if (
    !whatToMatch ||
    !Array.isArray(whatToMatch) || // 0
    (Array.isArray(whatToMatch) && !whatToMatch.length) || // []
    (Array.isArray(whatToMatch) &&
      whatToMatch.length === 1 &&
      isStr(whatToMatch[0]) &&
      !whatToMatch[0].trim().length) // [""]
  ) {
    if (typeof opts.cb === "function") {
      console.log("408");
      let firstCharOutsideIndex;

      // matchLeft() or matchRightIncl() methods start at index "position"
      let startingPosition = position;
      if (mode === "matchLeftIncl" || mode === "matchRight") {
        startingPosition += 1;
      }

      if (mode[5] === "L") {
        for (let y = startingPosition; y--; ) {
          // assemble the value of the current character
          const currentChar = str[y];
          // do the actual evaluation, is the current character non-whitespace/non-skiped
          if (
            (!opts.trimBeforeMatching ||
              (opts.trimBeforeMatching &&
                currentChar !== undefined &&
                currentChar.trim().length)) &&
            (!opts.trimCharsBeforeMatching.length ||
              (currentChar !== undefined &&
                !opts.trimCharsBeforeMatching.includes(currentChar)))
          ) {
            firstCharOutsideIndex = y;
            break;
          }
        }
      } else if (mode.startsWith("matchRight")) {
        for (let y = startingPosition; y < str.length; y++) {
          // assemble the value of the current character
          const currentChar = str[y];
          console.log(
            `440 ${`\u001b[${33}m${"currentChar"}\u001b[${39}m`} = ${JSON.stringify(
              currentChar,
              null,
              4
            )}`
          );
          // do the actual evaluation, is the current character non-whitespace/non-skiped
          if (
            (!opts.trimBeforeMatching ||
              (opts.trimBeforeMatching && currentChar.trim().length)) &&
            (!opts.trimCharsBeforeMatching.length ||
              !opts.trimCharsBeforeMatching.includes(currentChar))
          ) {
            console.log("453 breaking!");
            firstCharOutsideIndex = y;
            break;
          }
        }
      }
      if (firstCharOutsideIndex === undefined) {
        console.log("460 RETURN false");
        return false;
      }

      const wholeCharacterOutside = str[firstCharOutsideIndex];
      const indexOfTheCharacterAfter = firstCharOutsideIndex + 1;

      let theRemainderOfTheString = "";
      if (indexOfTheCharacterAfter && indexOfTheCharacterAfter > 0) {
        theRemainderOfTheString = str.slice(0, indexOfTheCharacterAfter);
      }
      if (mode[5] === "L") {
        console.log(`472 ${`\u001b[${32}m${`CALL THE CB()`}\u001b[${39}m`}`);
        return opts.cb(
          wholeCharacterOutside,
          theRemainderOfTheString,
          firstCharOutsideIndex
        );
      }
      // ELSE matchRight & matchRightIncl

      if (firstCharOutsideIndex && firstCharOutsideIndex > 0) {
        theRemainderOfTheString = str.slice(firstCharOutsideIndex);
      }
      console.log(`484 ${`\u001b[${32}m${`CALL THE CB()`}\u001b[${39}m`}`);
      return opts.cb(
        wholeCharacterOutside,
        theRemainderOfTheString,
        firstCharOutsideIndex
      );
    }
    let extraNote = "";
    if (!originalOpts) {
      extraNote =
        " More so, the whole options object, the fourth input argument, is missing!";
    }
    throw new Error(
      `string-match-left-right/${mode}(): [THROW_ID_08] the third argument, "whatToMatch", was given as an empty string. This means, you intend to match purely by a callback. The callback was not set though, the opts key "cb" is not set!${extraNote}`
    );
  }

  // Case 2. Normal operation where callback may or may not be present, but it is
  // only accompanying the matching of what was given in 3rd input argument.
  // Then if 3rd arg's contents were matched, callback is checked and its Boolean
  // result is merged using logical "AND" - meaning both have to be true to yield
  // final result "true".

  for (let i = 0, len = whatToMatch.length; i < len; i++) {
    console.log(
      `\n760 matchLeft() LOOP ${i} ${`\u001b[${32}m${`=================================================================================`}\u001b[${39}m`} \n\n`
    );

    special = typeof whatToMatch[i] === "function";
    console.log(`513 special = ${special}`);

    console.log(
      `516 🔥 whatToMatch no. ${i} = ${
        whatToMatch[i]
      } (type ${typeof whatToMatch[i]})`
    );
    console.log(`520 🔥 special = ${special}`);

    // since input can be function, we need to grab the value explicitly:
    const whatToMatchVal = whatToMatch[i];

    let fullCharacterInFront;
    let indexOfTheCharacterInFront;
    let restOfStringInFront = "";

    let startingPosition = position;
    if (mode === "matchRight") {
      startingPosition++;
    } else if (mode === "matchLeft") {
      startingPosition--;
    }

    console.log(
      `537 \u001b[${33}m${"march() called with:"}\u001b[${39}m\n* startingPosition = ${JSON.stringify(
        startingPosition,
        null,
        4
      )}\n* whatToMatchVal = "${whatToMatchVal}"\n`
    );
    console.log("\n\n\n\n\n\n");
    console.log(
      `545 ███████████████████████████████████████ march() STARTS BELOW ███████████████████████████████████████`
    );
    const found = march(
      str,
      startingPosition,
      whatToMatchVal,
      opts,
      special,
      i => (mode[5] === "L" ? i - 1 : i + 1)
    );
    console.log(
      `556 ███████████████████████████████████████ march() ENDED ABOVE ███████████████████████████████████████\n\n\n\n\n\n`
    );
    console.log(
      `559 \u001b[${33}m${"found"}\u001b[${39}m = ${JSON.stringify(
        found,
        null,
        4
      )}`
    );

    // if marchBackward returned positive result and it was "special" case,
    // Bob's your uncle, here's the result:
    if (
      found &&
      special &&
      typeof whatToMatchVal === "function" &&
      whatToMatchVal() === "EOL"
    ) {
      console.log(`574 returning whatToMatchVal() = ${whatToMatchVal()}`);
      return whatToMatchVal() &&
        (opts.cb
          ? opts.cb(
              fullCharacterInFront,
              restOfStringInFront,
              indexOfTheCharacterInFront
            )
          : true)
        ? whatToMatchVal()
        : false;
    }

    // now, the "found" is the index of the first character of what was found.
    // we need to calculate the character to the left of it, which might be emoji
    // so its first character might be either "minus one index" (normal character)
    // or "minus two indexes" (emoji). Let's calculate that:

    if (Number.isInteger(found)) {
      indexOfTheCharacterInFront = mode.startsWith("matchLeft")
        ? found - 1
        : found + 1;

      //
      if (mode[5] === "L") {
        restOfStringInFront = str.slice(0, found);
      } else {
        restOfStringInFront = str.slice(indexOfTheCharacterInFront);
      }
    }

    if (indexOfTheCharacterInFront < 0) {
      indexOfTheCharacterInFront = undefined;
    }

    if (str[indexOfTheCharacterInFront]) {
      fullCharacterInFront = str[indexOfTheCharacterInFront];
    }

    console.log(
      `614 FINAL ${`\u001b[${33}m${`indexOfTheCharacterInFront`}\u001b[${39}m`} = ${JSON.stringify(
        indexOfTheCharacterInFront,
        null,
        4
      )}
        ${`\u001b[${33}m${`fullCharacterInFront`}\u001b[${39}m`} = ${JSON.stringify(
        fullCharacterInFront,
        null,
        4
      )}
        ${`\u001b[${33}m${`restOfStringInFront`}\u001b[${39}m`} = ${JSON.stringify(
        restOfStringInFront,
        null,
        4
      )}`
    );

    if (
      Number.isInteger(found) &&
      (opts.cb
        ? opts.cb(
            fullCharacterInFront,
            restOfStringInFront,
            indexOfTheCharacterInFront
          )
        : true)
    ) {
      console.log(
        `642 ${`\u001b[${32}m${`RETURN`}\u001b[${39}m`} ${`\u001b[${33}m${`whatToMatchVal`}\u001b[${39}m`} = ${JSON.stringify(
          whatToMatchVal,
          null,
          4
        )}`
      );
      return whatToMatchVal;
    }
  }
  console.log(`651 ${`\u001b[${32}m${`RETURN`}\u001b[${39}m`} false`);
  return false;
}

// External API functions

function matchLeftIncl(str, position, whatToMatch, opts) {
  return main("matchLeftIncl", str, position, whatToMatch, opts);
}

function matchLeft(str, position, whatToMatch, opts) {
  return main("matchLeft", str, position, whatToMatch, opts);
}

function matchRightIncl(str, position, whatToMatch, opts) {
  return main("matchRightIncl", str, position, whatToMatch, opts);
}

function matchRight(str, position, whatToMatch, opts) {
  return main("matchRight", str, position, whatToMatch, opts);
}

export { matchLeftIncl, matchRightIncl, matchLeft, matchRight };
