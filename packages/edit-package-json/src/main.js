import { left, right, chompLeft } from "string-left-right";
import apply from "ranges-apply";

const isArr = Array.isArray;
function isStr(something) {
  return typeof something === "string";
}
function isNum(something) {
  return typeof something === "number";
}
function stringifyPath(something) {
  if (isArr(something)) {
    return something.join(".");
  } else if (isStr(something)) {
    return something;
  }
  return String(something);
}
function stringifyAndEscapeValue(something) {
  console.log(
    `021 ██ stringifyAndEscapeValue() called with ${JSON.stringify(
      something,
      null,
      0
    )} (${typeof something})`
  );

  // since incoming strings will come already wrapped with legit double quotes, we don't need to escape them
  if (
    isStr(something) &&
    something.startsWith(`"`) &&
    something.endsWith(`"`)
  ) {
    return `${JSON.stringify(
      something.slice(1, something.length - 1),
      null,
      0
    )}`;
  }
  return JSON.stringify(something, null, 0);
}

function isNotEscape(str, idx) {
  if (str[idx] !== "\\") {
    // log(`045 yes, it's not excaped`);
    return true;
  }

  const temp = chompLeft(str, idx, { mode: 1 }, "\\");
  // log(
  //   `${`\u001b[${33}m${`temp`}\u001b[${39}m`} = ${JSON.stringify(
  //     temp,
  //     null,
  //     4
  //   )}; ${`\u001b[${33}m${`(idx - temp) % 2`}\u001b[${39}m`} = ${(idx - temp) %
  //     2}`
  // );
  if (isNum(temp) && (idx - temp) % 2 !== 0) {
    // log(`059 yes, it's not excaped`);
    return true;
  }
  // log(`062 no, it's excaped!`);
  return false;
}

function main({ str, path, valToInsert, mode }) {
  let i;
  function log(something) {
    // if (i > 80 && str[i] && str[i].trim().length) {
    // if (str[i] && str[i].trim().length) {
    if (str[i] !== " ") {
      console.log(something);
    }
  }
  const len = str.length;
  const ranges = [];
  log(`077 main(): MODE=${mode}`);
  // bad characters
  const badChars = ["{", "}", "[", "]", ":", ","];

  let calculatedValueToInsert = valToInsert;
  // if string is passed and it's not wrapped with double quotes,
  // we must wrap it with quotes, we can't write it to JSON like that!
  if (
    isStr(valToInsert) &&
    !valToInsert.startsWith(`"`) &&
    !valToInsert.startsWith(`{`)
  ) {
    calculatedValueToInsert = `"${valToInsert}"`;
  }

  // state trackers are arrays because both can be mixed of nested elements.
  // Imagine, you caught the ending of an array. How do you know, are you within
  // a (parent) array or within a (parent) object now?
  // We are going to record starting indexes of each object or array opening,
  // then pop them upon ending. This way we'll know exactly what's the depth
  // and where we are currently.
  const withinObjectIndexes = [];
  const withinArrayIndexes = [];

  let currentlyWithinObject = false;
  let currentlyWithinArray = false;

  // this mode is activated to instruct that the value must be replaced,
  // no matter how deeply nested it is. It is activated once the path is matched.
  // When this is on, we stop iterating each key/value and we capture only
  // the whole value.
  let replaceThisValue = false;

  let keyStartedAt;
  let keyEndedAt;
  let valueStartedAt;
  let valueEndedAt;
  let keyName;
  let keyValue;
  let withinQuotesSince;
  function withinQuotes() {
    return isNum(withinQuotesSince);
  }

  let itsTheFirstElem = false;

  const skipUntilTheFollowingIsMet = [];

  function reset() {
    keyStartedAt = null;
    keyEndedAt = null;
    valueStartedAt = null;
    valueEndedAt = null;
    keyName = null;
    keyValue = null;
  }
  reset();

  // we keep it as array so that we can array.push/array.pop to go levels up and down
  const currentPath = [];

  for (i = 0; i < len; i++) {
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
    log(
      `\n\u001b[${36}m${`===============================`}\u001b[${39}m \u001b[${35}m${`str[ ${i} ] = ${
        str[i] && str[i].trim().length
          ? str[i]
          : JSON.stringify(str[i], null, 0)
      }`}\u001b[${39}m \u001b[${36}m${`===============================`}\u001b[${39}m\n`
    );

    // "within X" stage toggles

    // openings are easy:
    if (!isNum(withinQuotesSince) && str[i - 1] === "[") {
      currentlyWithinArray = true;
      if (str[i] !== "]") {
        currentlyWithinObject = false;
        console.log(
          `167 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentlyWithinArray`}\u001b[${39}m`} = ${currentlyWithinArray};  ${`\u001b[${33}m${`currentlyWithinObject`}\u001b[${39}m`} = ${currentlyWithinObject}`
        );
      }
    }

    if (!isNum(withinQuotesSince) && str[i - 1] === "{") {
      currentlyWithinObject = true;
      if (str[i] !== "}") {
        currentlyWithinArray = false;
        console.log(
          `177 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentlyWithinArray`}\u001b[${39}m`} = ${currentlyWithinArray};  ${`\u001b[${33}m${`currentlyWithinObject`}\u001b[${39}m`} = ${currentlyWithinObject}`
        );
      }
    }

    if (
      !isNum(withinQuotesSince) &&
      str[i] === "{" &&
      isNotEscape(str, i - 1) &&
      !replaceThisValue
    ) {
      console.log(`188 object's start caught`);
      if (currentlyWithinArray) {
        // we can't push here first zero because opening bracket pushes the first
        // zero in path - we only bump for second element onwards -
        // that's needed to support empty arrays - if we waited for some value
        // to be inside in order to bump the path, empty array inside an array
        //  would never get correct path and thus deleted/set.
        //
        if (!itsTheFirstElem) {
          log(
            `198 ${`\u001b[${33}m${`currentPath`}\u001b[${39}m`} = ${JSON.stringify(
              currentPath,
              null,
              4
            )}`
          );
          currentPath[currentPath.length - 1] =
            currentPath[currentPath.length - 1] + 1;
          log(
            `207 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentPath[${currentPath.length -
              1}]`}\u001b[${39}m`} = ${currentPath[currentPath.length - 1]}`
          );
        }
      }

      withinObjectIndexes.push(i);
      log(
        `215 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${`\u001b[${33}m${`withinObjectIndexes`}\u001b[${39}m`} = ${JSON.stringify(
          withinObjectIndexes,
          null,
          4
        )}`
      );
    }

    if (
      !isNum(withinQuotesSince) &&
      str[i] === "}" &&
      isNotEscape(str, i - 1) &&
      !replaceThisValue
    ) {
      withinObjectIndexes.pop();
      log(
        `231 ${`\u001b[${31}m${`POP`}\u001b[${39}m`} ${`\u001b[${33}m${`withinObjectIndexes`}\u001b[${39}m`} = ${JSON.stringify(
          withinObjectIndexes,
          null,
          4
        )}`
      );
    }

    if (
      !isNum(withinQuotesSince) &&
      str[i] === "]" &&
      isNotEscape(str, i - 1) &&
      !replaceThisValue
    ) {
      console.log(`245 inside sq. bracket clauses`);
      withinArrayIndexes.pop();
      log(
        `248 ${`\u001b[${32}m${`POP`}\u001b[${39}m`} ${`\u001b[${33}m${`withinArrayIndexes`}\u001b[${39}m`} = ${JSON.stringify(
          withinArrayIndexes,
          null,
          4
        )}`
      );

      currentPath.pop();
      log(`256 POP path, now = ${JSON.stringify(currentPath, null, 4)}`);

      log(`258 ${`\u001b[${31}m${`RESET`}\u001b[${39}m`}`);
      reset();

      console.log(
        `262 FIY, currentlyWithinObject = ${currentlyWithinObject}; currentlyWithinArray = ${currentlyWithinArray}`
      );
      if (itsTheFirstElem) {
        itsTheFirstElem = false;
        log(
          `267 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`itsTheFirstElem`}\u001b[${39}m`} = ${itsTheFirstElem}`
        );
      }
    }

    if (!isNum(withinQuotesSince) && str[i] === "]") {
      console.log(`273`);
      if (!withinArrayIndexes.length) {
        currentlyWithinArray = false;
        console.log(
          `277 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentlyWithinArray`}\u001b[${39}m`} = ${currentlyWithinArray}`
        );
        if (withinObjectIndexes.length && !currentlyWithinObject) {
          currentlyWithinObject = true;
          console.log(
            `282 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} currentlyWithinObject = ${currentlyWithinObject}`
          );
        }
      } else if (
        withinArrayIndexes.length &&
        (!withinObjectIndexes.length ||
          withinArrayIndexes[withinArrayIndexes.length - 1] >
            withinObjectIndexes[withinObjectIndexes.length - 1])
      ) {
        console.log(
          `292 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentlyWithinArray`}\u001b[${39}m`} = ${currentlyWithinArray}`
        );
        currentlyWithinArray = true;
      }
    }

    if (!isNum(withinQuotesSince) && str[i] === "}") {
      if (!withinObjectIndexes.length) {
        console.log(
          `301 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentlyWithinObject`}\u001b[${39}m`} = ${currentlyWithinObject}`
        );
        currentlyWithinObject = false;
      } else if (
        !withinArrayIndexes.length ||
        withinObjectIndexes[withinObjectIndexes.length - 1] >
          withinArrayIndexes[withinArrayIndexes.length - 1]
      ) {
        console.log(
          `310 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentlyWithinObject`}\u001b[${39}m`} = ${currentlyWithinObject}`
        );
        currentlyWithinObject = true;
      }
    }

    // for arrays, this is the beginning of what to replace
    console.log(`317 above of beginning of what to replace in arrays`);
    if (
      currentlyWithinArray &&
      stringifyPath(path) === currentPath.join(".") &&
      !replaceThisValue &&
      str[i].trim().length
      // (stringifyPath(path) === currentPath.join(".") ||
      //   currentPath.join(".").endsWith(`.${stringifyPath(path)}`))
    ) {
      console.log(`326 arrays - beginning of what to replace`);
      replaceThisValue = true;
      log(
        `329 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`replaceThisValue`}\u001b[${39}m`} = ${replaceThisValue}`
      );

      valueStartedAt = i;
      log(
        `334 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`valueStartedAt`}\u001b[${39}m`} = ${valueStartedAt}`
      );
    }

    if (
      !isNum(withinQuotesSince) &&
      str[i] === "[" &&
      isNotEscape(str, i - 1) &&
      !replaceThisValue
    ) {
      console.log(`344 array's start caught`);
      withinArrayIndexes.push(i);
      itsTheFirstElem = true;
      log(
        `348 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${`\u001b[${33}m${`withinArrayIndexes`}\u001b[${39}m`} = ${JSON.stringify(
          withinArrayIndexes,
          null,
          4
        )}; ${`\u001b[${33}m${`itsTheFirstElem`}\u001b[${39}m`} = ${itsTheFirstElem}`
      );

      // if (left(str, i) !== null) {
      // console.log(`356 it's not root-level array, so push zero into path`);
      currentPath.push(0);
      log(
        `359 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} zero to path, now = ${JSON.stringify(
          currentPath,
          null,
          0
        )}`
      );
      // }
    }

    // catch comma within arrays
    if (
      currentlyWithinArray &&
      str[i] === "," &&
      itsTheFirstElem &&
      !(valueStartedAt && !valueEndedAt) // precaution against comma within a string value
    ) {
      // that empty array will have itsTheFirstElem still on:
      // "e": [{}, ...],
      itsTheFirstElem = false;
      log(
        `379 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`itsTheFirstElem`}\u001b[${39}m`} = ${itsTheFirstElem}`
      );
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

    // catch the start of a value
    // in arrays, there are no keys, only values
    //
    // path-wise, object paths are calculated from the end of a key. Array paths
    // are calculated from the start of the value (there are no keys). It's from
    // the start, not from the end because it can be a big nested object, and
    // by the time we'd reach its end, we'd have new keys and values recorded.
    if (
      !replaceThisValue &&
      !valueStartedAt &&
      str[i].trim().length &&
      !badChars.includes(str[i]) &&
      (currentlyWithinArray || (!currentlyWithinArray && keyName))
    ) {
      log(`415 catching the start of a value clauses`);
      valueStartedAt = i;
      log(
        `418 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`valueStartedAt`}\u001b[${39}m`} = ${valueStartedAt}`
      );

      // calculate the path on arrays
      if (currentlyWithinArray) {
        if (itsTheFirstElem) {
          itsTheFirstElem = false;
          log(
            `426 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`itsTheFirstElem`}\u001b[${39}m`} = ${itsTheFirstElem}`
          );
        } else {
          currentPath[currentPath.length - 1] =
            currentPath[currentPath.length - 1] + 1;
          log(
            `432 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentPath[${currentPath.length -
              1}]`}\u001b[${39}m`} = ${currentPath[currentPath.length - 1]}`
          );
        }
      }
    }

    // catch the end of a value
    if (
      !replaceThisValue &&
      !isNum(withinQuotesSince) &&
      (currentlyWithinArray || (!currentlyWithinArray && keyName)) &&
      valueStartedAt &&
      valueStartedAt < i &&
      !valueEndedAt &&
      ((str[valueStartedAt] === `"` && str[i] === `"` && str[i - 1] !== `\\`) ||
        (str[valueStartedAt] !== `"` && !str[i].trim().length) ||
        ["}", ","].includes(str[i]))
    ) {
      log(`451 catching the end of a value clauses`);
      keyValue = str.slice(
        valueStartedAt,
        str[valueStartedAt] === `"` ? i + 1 : i
      );
      log(
        `457 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`keyValue`}\u001b[${39}m`} = ${keyValue}`
      );
      valueEndedAt = i;
      log(
        `461 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`valueEndedAt`}\u001b[${39}m`} = ${valueEndedAt}`
      );
    }

    // catch the start of a key
    if (
      !replaceThisValue &&
      !currentlyWithinArray &&
      str[i] === `"` &&
      str[i - 1] !== `\\` &&
      !keyName &&
      !keyStartedAt &&
      !keyEndedAt &&
      str[i + 1]
    ) {
      keyStartedAt = i + 1;
      log(
        `478 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`keyStartedAt`}\u001b[${39}m`} = ${keyStartedAt}`
      );
    }

    // catch the end of a key
    //
    // path-wise, object paths are calculated from the end of a key. Array paths
    // are calculated from the start of the value (there are no keys). It's from
    // the start, not from the end because it can be a big nested object, and
    // by the time we'd reach its end, we'd have new keys and values recorded.
    if (
      !replaceThisValue &&
      !currentlyWithinArray &&
      str[i] === `"` &&
      str[i - 1] !== `\\` &&
      !keyEndedAt &&
      keyStartedAt &&
      !valueStartedAt &&
      keyStartedAt < i
    ) {
      keyEndedAt = i + 1;
      keyName = str.slice(keyStartedAt, i);
      log(
        `501 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`keyEndedAt`}\u001b[${39}m`} = ${keyEndedAt};  ${`\u001b[${33}m${`keyName`}\u001b[${39}m`} = ${keyName}`
      );

      // set the path
      currentPath.push(keyName);
      log(`506 PUSH to path, now = ${JSON.stringify(currentPath, null, 4)}`);

      // array cases don't come here so there are no conditionals for currentlyWithinArray
      if (
        stringifyPath(path) === currentPath.join(".") // ||
        // currentPath.join(".").endsWith(`.${stringifyPath(path)}`)
      ) {
        replaceThisValue = true;
        log(
          `515 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`replaceThisValue`}\u001b[${39}m`} = ${replaceThisValue}`
        );
      }
    }

    if (
      !replaceThisValue &&
      !isNum(withinQuotesSince) &&
      str[i] === "," &&
      currentlyWithinObject
    ) {
      console.log(
        `527 COMMA within object caught - before popping, ${`\u001b[${33}m${`currentPath`}\u001b[${39}m`} = ${JSON.stringify(
          currentPath,
          null,
          0
        )}`
      );
      currentPath.pop();
      log(
        `535 POP(), now ${`\u001b[${33}m${`currentPath`}\u001b[${39}m`} = ${JSON.stringify(
          currentPath,
          null,
          0
        )}`
      );
    }

    if (
      !replaceThisValue &&
      ((valueEndedAt && i >= valueEndedAt) ||
        (["}", "]"].includes(str[left(str, i)]) &&
          ["}", "]"].includes(str[i])) ||
        (str[i] === "}" && str[left(str, i)] === "{")) &&
      str[i].trim().length
    ) {
      log(
        `552 ${`\u001b[${36}m${`██`}\u001b[${39}m`} catch the end of a key-value pair clauses`
      );
      if (str[i] === "," && !["}", "]"].includes(str[right(str, i)])) {
        log(`555 ${`\u001b[${31}m${`RESET`}\u001b[${39}m`}`);
        reset();
      } else if (str[i] === "}") {
        log(`558 closing curlie caught`);
        if (valueEndedAt || str[left(str, i)] !== "{") {
          console.log(
            `561 before popping, ${`\u001b[${33}m${`currentPath`}\u001b[${39}m`} = ${JSON.stringify(
              currentPath,
              null,
              0
            )}`
          );
          currentPath.pop();
          log(
            `569 POP(), now ${`\u001b[${33}m${`currentPath`}\u001b[${39}m`} = ${JSON.stringify(
              currentPath,
              null,
              0
            )}`
          );
        }

        log(`577 currently, currentlyWithinObject: ${currentlyWithinObject}`);
        log(`578 currently, currentlyWithinArray: ${currentlyWithinArray}`);

        if (
          withinArrayIndexes.length &&
          withinObjectIndexes.length &&
          withinArrayIndexes[withinArrayIndexes.length - 1] >
            withinObjectIndexes[withinObjectIndexes.length - 1]
        ) {
          currentlyWithinObject = false;
          currentlyWithinArray = true;
          console.log(
            `589 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`currentlyWithinObject`}\u001b[${39}m`} = ${currentlyWithinObject}; ${`\u001b[${33}m${`currentlyWithinArray`}\u001b[${39}m`} = ${currentlyWithinArray}`
          );
        }

        // TODO - cleanup below
        // if (
        //   !currentlyWithinArray &&
        //   !(str[i] === "}" && str[left(str, i)] === "{") // not empty obj
        // ) {
        //   console.log(
        //     `599 before popping, ${`\u001b[${33}m${`currentPath`}\u001b[${39}m`} = ${JSON.stringify(
        //       currentPath,
        //       null,
        //       0
        //     )}`
        //   );
        //   currentPath.pop();
        //   log(
        //     `607 POP(), now ${`\u001b[${33}m${`currentPath`}\u001b[${39}m`} = ${JSON.stringify(
        //       currentPath,
        //       null,
        //       0
        //     )}`
        //   );
        // }

        // also reset but don't touch the path - rabbit hole goes deeper
        log(`616 ${`\u001b[${31}m${`RESET`}\u001b[${39}m`}`);
        reset();
      }
    }

    // catch plain object as a value
    if (
      !replaceThisValue &&
      str[i] === "{" &&
      isStr(keyName) &&
      !valueStartedAt &&
      !keyValue
    ) {
      // also reset but don't touch the path - rabbit hole goes deeper
      log(`630 ${`\u001b[${31}m${`RESET`}\u001b[${39}m`}`);
      reset();
    }

    // catch the start of the value when replaceThisValue is on
    if (
      str[i].trim().length &&
      replaceThisValue &&
      !valueStartedAt &&
      i > keyEndedAt &&
      ![":"].includes(str[i])
    ) {
      valueStartedAt = i;
      log(
        `644 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`valueStartedAt`}\u001b[${39}m`} = ${valueStartedAt}`
      );
    }

    // enable withinQuotesSince
    if (
      str[i] === `"` &&
      isNotEscape(str, i - 1) &&
      ((isNum(keyStartedAt) && !keyEndedAt) ||
        (isNum(valueStartedAt) && !valueEndedAt)) &&
      !isNum(withinQuotesSince)
    ) {
      withinQuotesSince = i;
      log(
        `658 SET ${`\u001b[${33}m${`withinQuotesSince`}\u001b[${39}m`} = ${withinQuotesSince}; withinQuotes = ${withinQuotes()}`
      );
    }

    // The "skipUntilTheFollowingIsMet".
    //
    // Calculate going levels deep - curlies within quotes within brackets etc.
    // idea is, once we stumble upon opening bracket/curlie or first double quote,
    // no matter what follows, at first we march forward until we meet the first
    // closing counterpart. Then we continue seeking what we came.
    if (
      skipUntilTheFollowingIsMet.length &&
      str[i] ===
        skipUntilTheFollowingIsMet[skipUntilTheFollowingIsMet.length - 1] &&
      isNotEscape(str, i - 1)
    ) {
      console.log(`674 POP clause`);
      skipUntilTheFollowingIsMet.pop();
      log(
        `677 ${`\u001b[${32}m${`POP`}\u001b[${39}m`} skipUntilTheFollowingIsMet = ${JSON.stringify(
          skipUntilTheFollowingIsMet,
          null,
          4
        )}`
      );
    } else if (
      (!withinQuotesSince || withinQuotesSince === i) &&
      replaceThisValue &&
      // !skipUntilTheFollowingIsMet.length &&
      !currentlyWithinArray &&
      valueStartedAt
    ) {
      console.log(`690 about to catch various opening brackets/quotes`);
      if (str[i] === "{" && isNotEscape(str, i - 1)) {
        console.log(`692`);
        skipUntilTheFollowingIsMet.push("}");
        log(
          `695 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${`\u001b[${33}m${`skipUntilTheFollowingIsMet`}\u001b[${39}m`} = ${JSON.stringify(
            skipUntilTheFollowingIsMet,
            null,
            4
          )}`
        );
      } else if (str[i] === "[" && isNotEscape(str, i - 1)) {
        console.log(`702`);
        skipUntilTheFollowingIsMet.push("]");
        log(
          `705 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${`\u001b[${33}m${`skipUntilTheFollowingIsMet`}\u001b[${39}m`} = ${JSON.stringify(
            skipUntilTheFollowingIsMet,
            null,
            4
          )}`
        );
      } else if (str[i] === `"` && isNotEscape(str, i - 1)) {
        console.log(`712`);
        skipUntilTheFollowingIsMet.push(`"`);
        log(
          `715 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${`\u001b[${33}m${`skipUntilTheFollowingIsMet`}\u001b[${39}m`} = ${JSON.stringify(
            skipUntilTheFollowingIsMet,
            null,
            4
          )}`
        );
      }
      console.log(`722`);
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

    // disable withinQuotesSince
    if (
      str[i] === `"` &&
      isNotEscape(str, i - 1) &&
      isNum(withinQuotesSince) &&
      withinQuotesSince !== i
    ) {
      withinQuotesSince = undefined;
      log(
        `753 RESET ${`\u001b[${33}m${`withinQuotesSince`}\u001b[${39}m`} = ${withinQuotesSince}; withinQuotes = ${withinQuotes()}`
      );
    }

    // catch the end of the value when replaceThisValue is on
    if (
      replaceThisValue &&
      isArr(skipUntilTheFollowingIsMet) &&
      !skipUntilTheFollowingIsMet.length &&
      valueStartedAt &&
      i > valueStartedAt
    ) {
      log(
        `766 within catch the end of the value when replaceThisValue is on clauses`
      );

      if (
        !withinQuotesSince &&
        ((str[valueStartedAt] === "[" && str[i] === "]") ||
          (str[valueStartedAt] === "{" && str[i] === "}") ||
          (str[valueStartedAt] === `"` && str[i] === `"`) ||
          (!["[", "{", `"`].includes(str[valueStartedAt]) &&
            str[valueStartedAt].trim().length &&
            (!str[i].trim().length ||
              (badChars.includes(str[i]) && isNotEscape(str, i - 1))))) // cover numeric, bool, null etc, without quotes
      ) {
        log(
          `780 INSIDE CATCH-END CLAUSES currently ${`\u001b[${33}m${`str[valueStartedAt=${valueStartedAt}]`}\u001b[${39}m`} = ${JSON.stringify(
            str[valueStartedAt],
            null,
            4
          )}`
        );

        if (mode === "set") {
          // 1. if set()
          log(`789 ${`\u001b[${32}m${`RETURN`}\u001b[${39}m`}`);
          let extraLineBreak = "";
          if (
            str
              .slice(valueStartedAt, i + (str[i].trim().length ? 1 : 0))
              .includes("\n") &&
            str[i + (str[i].trim().length ? 1 : 0)] !== "\n"
          ) {
            extraLineBreak = "\n";
          }
          let endingPartsBeginning = i + (str[i].trim().length ? 1 : 0);
          console.log(
            `801 SET ${`\u001b[${33}m${`endingPartsBeginning`}\u001b[${39}m`} = ${JSON.stringify(
              endingPartsBeginning,
              null,
              4
            )}`
          );

          if (
            (currentlyWithinArray &&
              ![`"`, `[`, `{`].includes(str[valueStartedAt]) &&
              str[right(str, endingPartsBeginning - 1)] !== "]") ||
            (str[endingPartsBeginning - 1] === "," &&
              str[valueStartedAt - 1] !== `"`)
          ) {
            console.log(
              `816 endingPartsBeginning before = ${endingPartsBeginning}`
            );
            endingPartsBeginning = endingPartsBeginning - 1;
            console.log(
              `820 endingPartsBeginning after = ${endingPartsBeginning}`
            );
          }

          if (currentlyWithinArray && str[valueStartedAt - 1] === `"`) {
            console.log(`825 valueStartedAt before = ${valueStartedAt}`);
            valueStartedAt = valueStartedAt - 1;
            console.log(`827 valueStartedAt after = ${valueStartedAt}`);
          }

          console.log(
            `RETURNING:\n${`\u001b[${36}m${`[0, ${valueStartedAt}]`}\u001b[${39}m`}: ${JSON.stringify(
              str.slice(0, valueStartedAt),
              null,
              0
            )}\nstringifyAndEscapeValue(calculatedValueToInsert) = ${JSON.stringify(
              stringifyAndEscapeValue(calculatedValueToInsert),
              null,
              0
            )}\n${`\u001b[${36}m${`[${endingPartsBeginning}, ${str.length}]`}\u001b[${39}m`}: ${JSON.stringify(
              str.slice(endingPartsBeginning),
              null,
              0
            )}`
          );
          return `${str.slice(0, valueStartedAt)}${stringifyAndEscapeValue(
            calculatedValueToInsert
          )}${extraLineBreak}${str.slice(endingPartsBeginning)}`;
        } else if (mode === "del") {
          // 1. if del()
          log(`848 ${`\u001b[${32}m${`RETURN`}\u001b[${39}m`}`);

          log(
            `851 ${`\u001b[${33}m${`keyStartedAt`}\u001b[${39}m`} = ${JSON.stringify(
              keyStartedAt,
              null,
              4
            )}; val = ${(currentlyWithinArray ? valueStartedAt : keyStartedAt) -
              1}`
          );
          let startingPoint =
            left(
              str,
              (currentlyWithinArray ? valueStartedAt : keyStartedAt) - 1
            ) + 1;
          log(
            `864 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} initial ${`\u001b[${33}m${`startingPoint`}\u001b[${39}m`} = ${startingPoint}`
          );
          let endingPoint = i + (str[i].trim().length ? 1 : 0);
          if (
            str[startingPoint - 1] === "," &&
            ["}", "]"].includes(str[right(str, endingPoint - 1)])
          ) {
            startingPoint--;
            log(
              `873 SET ${`\u001b[${33}m${`startingPoint`}\u001b[${39}m`} = ${startingPoint}`
            );
          }
          if (str[endingPoint] === ",") {
            endingPoint++;
            log(
              `879 SET ${`\u001b[${33}m${`endingPoint`}\u001b[${39}m`} = ${endingPoint}`
            );
          }
          log(
            `883 ${`\u001b[${33}m${`startingPoint`}\u001b[${39}m`} = ${JSON.stringify(
              startingPoint,
              null,
              4
            )}; ${`\u001b[${33}m${`endingPoint`}\u001b[${39}m`} = ${JSON.stringify(
              endingPoint,
              null,
              4
            )};`
          );

          ranges.push([startingPoint, endingPoint]);
          log(
            `896 ${`\u001b[${32}m${`FINAL PUSH`}\u001b[${39}m`} ${`\u001b[${33}m${`ranges`}\u001b[${39}m`} = ${JSON.stringify(
              ranges,
              null,
              4
            )}`
          );
          log(`902 then ${`\u001b[${31}m${`BREAK`}\u001b[${39}m`}`);
          break;
        }
      }
      // 2. replace non-quoted values
    }

    log(
      `${`\u001b[${withinQuotesSince ? 32 : 31}m${`withinQuotesSince${
        isNum(withinQuotesSince) ? `=${withinQuotesSince}` : ""
      }`}\u001b[${39}m`}; ${`\u001b[${
        currentlyWithinObject ? 32 : 31
      }m${`currentlyWithinObject`}\u001b[${39}m`}; ${`\u001b[${
        currentlyWithinArray ? 32 : 31
      }m${`currentlyWithinArray`}\u001b[${39}m`}; ${`\u001b[${
        replaceThisValue ? 32 : 31
      }m${`replaceThisValue`}\u001b[${39}m`}; ${`\u001b[${
        itsTheFirstElem ? 32 : 31
      }m${`itsTheFirstElem`}\u001b[${39}m`}; ${`\u001b[${
        skipUntilTheFollowingIsMet.length ? 32 : 31
      }m${`skipUntilTheFollowingIsMet${
        skipUntilTheFollowingIsMet
          ? `: ${JSON.stringify(skipUntilTheFollowingIsMet, null, 0)}`
          : ""
      }`}\u001b[${39}m`}`
    );

    log(`current path: ${JSON.stringify(currentPath.join("."), null, 0)}`);
    log(
      `${`\u001b[${33}m${`keyName`}\u001b[${39}m`} = ${keyName}; ${`\u001b[${33}m${`keyValue`}\u001b[${39}m`} = ${keyValue}; ${`\u001b[${33}m${`keyStartedAt`}\u001b[${39}m`} = ${keyStartedAt}; ${`\u001b[${33}m${`keyEndedAt`}\u001b[${39}m`} = ${keyEndedAt}; ${`\u001b[${33}m${`valueStartedAt`}\u001b[${39}m`} = ${valueStartedAt}; ${`\u001b[${33}m${`valueEndedAt`}\u001b[${39}m`} = ${valueEndedAt}`
    );
    log(
      `${`\u001b[${33}m${`withinArrayIndexes`}\u001b[${39}m`} = ${JSON.stringify(
        withinArrayIndexes,
        null,
        0
      )}; ${`\u001b[${33}m${`withinObjectIndexes`}\u001b[${39}m`} = ${JSON.stringify(
        withinObjectIndexes,
        null,
        0
      )};`
    );
  }
  log(`\n\u001b[${36}m${`=============================== FIN.`}\u001b[${39}m`);

  log(`947 RETURN applied ${JSON.stringify(apply(str, ranges), null, 4)}`);
  return apply(str, ranges);
}

function set(str, path, valToInsert) {
  console.log(`954 set()`);
  if (!isStr(str) || !str.length) {
    throw new Error(
      `edit-package-json/set(): [THROW_ID_01] first input argument must be a non-empty string. It was given as ${JSON.stringify(
        str,
        null,
        4
      )} (type ${typeof str})`
    );
  }
  return main({ str, path, valToInsert, mode: "set" });
}

function del(str, path) {
  console.log(`968 del()`);
  if (!isStr(str) || !str.length) {
    throw new Error(
      `edit-package-json/del(): [THROW_ID_02] first input argument must be a non-empty string. It was given as ${JSON.stringify(
        str,
        null,
        4
      )} (type ${typeof str})`
    );
  }
  // absence of what to insert means delete
  return main({ str, path, mode: "del" });
}

export { set, del };
