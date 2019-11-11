import { notEmailFriendly } from "html-entities-not-email-friendly";
import { allNamedEntities } from "all-named-html-entities";
import rangesExpander from "string-range-expander";
import { convertOne } from "string-apostrophes";
import he from "he";
import {
  rightStopAtNewLines,
  leftStopAtNewLines,
  right,
  left
} from "string-left-right";
import {
  doConvertEntities,
  isUppercaseLetter,
  isLowercaseLetter,
  rightSingleQuote,
  rightDoubleQuote,
  punctuationChars,
  leftSingleQuote,
  leftDoubleQuote,
  widowRegexTest,
  rawEllipsis,
  isLetter,
  isNumber,
  rawMDash,
  rawNDash,
  isQuote,
  rawNbsp
} from "./util";

// This function gets from-to indexes and numeric character code.
// It is used by processOutside() which skips already processed ranges and
// iterates over the remaining indexes. Also, it is used to validate the
// encode entities - those are decoded and ran through this function as well.
// That's why we need this fancy "y" - "up to" index and we can't make it
// using simple "i + 1" - the "character" might be actually an encoded
// chunk of characters. We separate the location of character(s)
// (which could be expressed as string.slice(i, y)) and the value it
// represents ("charcode").
function processCharacter(
  str,
  opts,
  rangesArr,
  i,
  y,
  offsetBy,
  brClosingBracketIndexesArr,
  state,
  applicableOpts,
  endOfLine
) {
  const len = str.length;

  console.log(
    `\u001b[${36}m${`===============================`}\u001b[${39}m \u001b[${35}m${`str[i] at ${i} = ${
      str[i].trim().length ? str.slice(i, y) : JSON.stringify(str[i], null, 0)
    }`}\u001b[${39}m ${`\u001b[${90}m (${str
      .slice(i, y)
      .split("")
      .map(v => `#${v.charCodeAt(0)}`)
      .join(
        `; `
      )}); i = ${i}; y = ${y}\u001b[${39}m`} \u001b[${36}m${`===============================`}\u001b[${39}m`
  );

  console.log(
    `${`\u001b[${90}m${`state = ${JSON.stringify(
      state,
      null,
      4
    )}`}\u001b[${39}m`}`
  );
  console.log(
    `0074 received endOfLine = ${JSON.stringify(endOfLine, null, 0)}`
  );

  if (
    /[\uD800-\uDFFF]/g.test(str[i]) &&
    !(
      (str.charCodeAt(i + 1) >= 0xdc00 && str.charCodeAt(i + 1) <= 0xdfff) ||
      (str.charCodeAt(i - 1) >= 0xd800 && str.charCodeAt(i - 1) <= 0xdbff)
    )
  ) {
    // if it's a surrogate and another surrogate doesn't come in front or
    // follow, it's considered to be stray and liable for removal
    console.log(`0086 processCharacter.js - it's a stray surrogate`);
    rangesArr.push(i, i + 1);
    console.log(
      `0089 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
        1}]`
    );
  } else if (y - i > 1) {
    applicableOpts.convertEntities = true;
    console.log(
      `0095 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
        applicableOpts.convertEntities
      }`
    );
    applicableOpts.dontEncodeNonLatin =
      applicableOpts.dontEncodeNonLatin ||
      doConvertEntities(str.slice(i, y), true) !==
        doConvertEntities(str.slice(i, y), false);
    console.log(
      `0104 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.dontEncodeNonLatin = ${
        applicableOpts.dontEncodeNonLatin
      }`
    );

    // if it's astral character which comprises of more than one character,
    // tackle it separately from "normal" charactrs of length === 1
    if (opts.convertEntities) {
      rangesArr.push(
        i,
        y,
        doConvertEntities(str.slice(i, y), opts.dontEncodeNonLatin)
      );
    }
  } else {
    //
    //
    //
    //
    //
    //
    //
    // so it's single character.

    const charcode = str[i].charCodeAt(0);
    // Filter ASCII
    // the cutoff point is 127 not 128 because large chunk of invisibles, C1
    // group starts at DEL, decimal point 128.
    if (charcode < 127) {
      // within ASCII - no need to encode, just clean
      console.log(
        `0135 processCharacter.js - ${`\u001b[${90}m${`character within ASCII`}\u001b[${39}m`}`
      );
      if (charcode < 32) {
        if (charcode < 9) {
          if (charcode === 3) {
            // that's \u0003, END OF TEXT - replace with line break
            console.log(
              `0142 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "${
                opts.removeLineBreaks ? " " : "\\n"
              }"]`
            );
            rangesArr.push(
              i,
              y,
              opts.removeLineBreaks
                ? " "
                : opts.replaceLineBreaks
                ? `<br${opts.useXHTML ? "/" : ""}>\n`
                : "\n"
            );

            applicableOpts.removeLineBreaks = true;
            console.log(
              `0158 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.removeLineBreaks = ${
                applicableOpts.removeLineBreaks
              }`
            );
            if (!opts.removeLineBreaks) {
              applicableOpts.replaceLineBreaks = true;
              console.log(
                `0165 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.replaceLineBreaks = ${
                  applicableOpts.replaceLineBreaks
                }`
              );

              if (opts.replaceLineBreaks) {
                applicableOpts.useXHTML = true;
                console.log(
                  `0173 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.useXHTML = ${
                    applicableOpts.useXHTML
                  }`
                );
              }
            }
          } else {
            // charcodes: [0;2], [4;8] - remove these control chars
            console.log(
              `0182 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}]`
            );
            rangesArr.push(i, y);
          }
          // continue to the next character (otherwise it would get encoded):
          // continue;
        } else if (charcode === 9) {
          // Replace all tabs, '\u0009', with spaces:
          console.log(
            `0191 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, " "]`
          );
          rangesArr.push(i, y, " ");
          // continue to the next character (otherwise it would get encoded):
          // continue;
        } else if (charcode === 10) {
          // 10 - "\u000A" - line feed, LF or \n
          console.log(`0198 processCharacter.js - LF caught`);

          if (!applicableOpts.removeLineBreaks) {
            applicableOpts.removeLineBreaks = true;
            console.log(
              `0203 processCharacter.js: SET ${`\u001b[${32}m${`applicableOpts.removeLineBreaks`}\u001b[${39}m`} = ${
                applicableOpts.removeLineBreaks
              }`
            );
          }

          if (
            !opts.removeLineBreaks &&
            (!brClosingBracketIndexesArr ||
              (Array.isArray(brClosingBracketIndexesArr) &&
                !brClosingBracketIndexesArr.some(idx => left(str, i) === idx)))
          ) {
            if (opts.replaceLineBreaks) {
              applicableOpts.useXHTML = true;
              applicableOpts.replaceLineBreaks = true;
              console.log(
                `0219 processCharacter.js: SET ${`\u001b[${32}m${`applicableOpts.useXHTML`}\u001b[${39}m`} = ${
                  applicableOpts.useXHTML
                }; ${`\u001b[${32}m${`applicableOpts.replaceLineBreaks`}\u001b[${39}m`} = ${
                  applicableOpts.replaceLineBreaks
                }`
              );
            } else if (!opts.replaceLineBreaks) {
              // opts.replaceLineBreaks === false
              applicableOpts.replaceLineBreaks = true;
              console.log(
                `0229 processCharacter.js: SET ${`\u001b[${32}m${`applicableOpts.replaceLineBreaks`}\u001b[${39}m`} = ${
                  applicableOpts.replaceLineBreaks
                }`
              );
            }
          }

          if (!opts.removeLineBreaks) {
            applicableOpts.eol = true;
            console.log(
              `0239 processCharacter.js: SET ${`\u001b[${32}m${`applicableOpts.eol`}\u001b[${39}m`} = ${
                applicableOpts.eol
              }`
            );
          }

          // won't run on CRLF, only on LF - the CR will be processed separately

          if (opts.removeLineBreaks) {
            // only remove replace with space if it's standalone, Mac-style
            // EOL ending, not Windows CRLF, because CR would have already
            // been replaced and replacing here would result in two spaces added
            let whatToInsert = " ";
            if (punctuationChars.includes(str[right(str, i)])) {
              whatToInsert = "";
            }
            console.log(
              `0256 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${JSON.stringify(
                whatToInsert,
                null,
                0
              )}]`
            );
            rangesArr.push(i, y, whatToInsert);
          } else if (
            opts.replaceLineBreaks &&
            (!brClosingBracketIndexesArr ||
              (Array.isArray(brClosingBracketIndexesArr) &&
                !brClosingBracketIndexesArr.some(idx => left(str, i) === idx)))
          ) {
            // above, we check, is there a closing bracket of <br>.
            // All this contraption is necessary because br's can have HTML
            // attributes - you can't just match <br> or <br/> or <br />,
            // there can be ESP tags in non-HTML

            let startingIdx = i;
            if (str[i - 1] === " ") {
              startingIdx = leftStopAtNewLines(str, i) + 1;
            }
            rangesArr.push(
              startingIdx,
              i + (endOfLine === "\r" ? 1 : 0),
              `<br${opts.useXHTML ? "/" : ""}>${
                endOfLine === "\r\n" ? "\r" : ""
              }${endOfLine === "\r" ? "\r" : ""}`
            );
            console.log(
              `0286 processCharacter.js: ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${startingIdx}, ${i +
                (endOfLine === "\r" ? 1 : 0)}, ${`<br${
                opts.useXHTML ? "/" : ""
              }>${JSON.stringify(
                endOfLine === "\r\n" ? "\r" : "",
                null,
                4
              )}${JSON.stringify(endOfLine === "\r" ? "\r" : "", null, 4)}`}]`
            );
          } else {
            //
            //
            // delete any whitespace to the left
            if (str[leftStopAtNewLines(str, i)].trim().length) {
              // delete trailing whitespace at the end of each line
              const tempIdx = leftStopAtNewLines(str, i);
              if (tempIdx < i - 1) {
                console.log(
                  `0304 processCharacter.js: ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${tempIdx +
                    1}, ${i}]`
                );
                rangesArr.push(
                  tempIdx + 1,
                  i,
                  `${endOfLine === "\r\n" ? "\r" : ""}`
                );
              }
            }

            if (endOfLine === "\r\n" && str[i - 1] !== "\r") {
              rangesArr.push(i, i, "\r");
              console.log(
                `0318 processCharacter.js: ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} missing CR for this Windows EOL [${i}, ${i}, "\\r"]`
              );
            } else if (endOfLine === "\r") {
              rangesArr.push(i, i + 1);
              console.log(
                `0323 processCharacter.js: delete this LF ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
                  1}]`
              );
            }

            // either way, delete any whitespace to the right
            if (str[rightStopAtNewLines(str, i)].trim().length) {
              const tempIdx = rightStopAtNewLines(str, i);
              if (tempIdx > i + 1) {
                console.log(
                  `0333 processCharacter.js: ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i +
                    1}, ${tempIdx}]`
                );
                rangesArr.push(i + 1, tempIdx);
              }
            }
          }

          //
          // URL detection:
          //

          // TODO - check state.onUrlCurrently
          state.onUrlCurrently = false;
          console.log(
            `0348 processCharacter.js - SET ${`\u001b[${33}m${`state.onUrlCurrently`}\u001b[${39}m`} = false`
          );
        } else if (charcode === 11 || charcode === 12) {
          // 11 - "\u000B" - tab
          // 12 - "\u000C" - form feed
          applicableOpts.removeLineBreaks = true;
          console.log(
            `0355 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.removeLineBreaks = ${
              applicableOpts.removeLineBreaks
            }`
          );

          rangesArr.push(i, y, opts.removeLineBreaks ? " " : "\n");
          console.log(
            `0362 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${
              opts.removeLineBreaks ? " " : "\\n"
            }]`
          );
          // continue;
        } else if (charcode === 13) {
          // 13 - "\u000D" - carriage return
          console.log(`0369 CR caught`);

          if (!applicableOpts.removeLineBreaks) {
            applicableOpts.removeLineBreaks = true;
            console.log(
              `0374 processCharacter.js: SET ${`\u001b[${32}m${`applicableOpts.removeLineBreaks`}\u001b[${39}m`} = ${
                applicableOpts.removeLineBreaks
              }`
            );
          }

          if (
            !opts.removeLineBreaks &&
            (!brClosingBracketIndexesArr ||
              (Array.isArray(brClosingBracketIndexesArr) &&
                !brClosingBracketIndexesArr.some(idx => left(str, i) === idx)))
          ) {
            if (opts.replaceLineBreaks && !opts.removeLineBreaks) {
              applicableOpts.useXHTML = true;
              applicableOpts.replaceLineBreaks = true;
              console.log(
                `0390 processCharacter.js: SET ${`\u001b[${32}m${`applicableOpts.useXHTML`}\u001b[${39}m`} = ${
                  applicableOpts.useXHTML
                }; ${`\u001b[${32}m${`applicableOpts.replaceLineBreaks`}\u001b[${39}m`} = ${
                  applicableOpts.replaceLineBreaks
                }`
              );
            } else if (!opts.replaceLineBreaks) {
              // opts.replaceLineBreaks === false
              applicableOpts.replaceLineBreaks = true;
              console.log(
                `0400 processCharacter.js: SET ${`\u001b[${32}m${`applicableOpts.replaceLineBreaks`}\u001b[${39}m`} = ${
                  applicableOpts.replaceLineBreaks
                }`
              );
            }
          }

          if (!opts.removeLineBreaks) {
            applicableOpts.eol = true;
            console.log(
              `0410 processCharacter.js: SET ${`\u001b[${32}m${`applicableOpts.eol`}\u001b[${39}m`} = ${
                applicableOpts.eol
              }`
            );
          }

          if (opts.removeLineBreaks) {
            let whatToInsert = " ";
            if (
              punctuationChars.includes(str[right(str, i)]) ||
              ["\n", "\r"].includes(str[i + 1])
            ) {
              whatToInsert = "";
            }
            rangesArr.push(i, y, whatToInsert);
            console.log(
              `0426 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${JSON.stringify(
                whatToInsert,
                null,
                0
              )}]`
            );
          } else if (
            opts.replaceLineBreaks &&
            (!brClosingBracketIndexesArr ||
              (Array.isArray(brClosingBracketIndexesArr) &&
                !brClosingBracketIndexesArr.some(idx => left(str, i) === idx)))
          ) {
            console.log(`0438`);
            let startingIdx = i;
            if (str[i - 1] === " ") {
              startingIdx = leftStopAtNewLines(str, i) + 1;
            }
            let endingIdx = i;
            let whatToInsert = "";

            if (str[i + 1] !== "\n") {
              if (endOfLine === "\n") {
                whatToInsert = "\n";
              } else if (endOfLine === "\r\n") {
                // add missing LF after current CR
                rangesArr.push(i + 1, i + 1, "\n");
                console.log(
                  `0453 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i +
                    1}, ${i + 1}]`
                );
              }
            }

            if (endOfLine === "\n") {
              // extend this range to also delete this CR
              endingIdx = i + 1;
            } else if (endOfLine === "\r" && str[i + 1] === "\n") {
              // delete that LF from wrong CRLF set which is present
              rangesArr.push(i + 1, i + 2);
              console.log(
                `0466 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i + 1}, ${i +
                  2}]`
              );
            }
            rangesArr.push(
              startingIdx,
              endingIdx,
              `<br${opts.useXHTML ? "/" : ""}>${whatToInsert}`
            );
            console.log(
              `0476 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${startingIdx}, ${endingIdx}, ${JSON.stringify(
                whatToInsert,
                null,
                4
              )}]`
            );

            // skip the \n that follows
            if (str[i + 1] === "\n") {
              console.log(`0485 offset by 1`);
              offsetBy(1);
            }
          } else {
            console.log(`0489`);
            if (endOfLine === "\n") {
              rangesArr.push(i, i + 1, str[i + 1] === "\n" ? "" : "\n");
              console.log(
                `0493 PUSH [${i}, ${i + 1}, ${JSON.stringify(
                  str[i + 1] === "\n" ? "" : "\n",
                  null,
                  0
                )}]`
              );
            } else if (endOfLine === "\r" && str[i + 1] === "\n") {
              // delete the LF that follows
              rangesArr.push(i + 1, i + 2);
              console.log(`0502 PUSH [${i + 1}, ${i + 2}]`);
            } else if (endOfLine === "\r\n" && str[i + 1] !== "\n") {
              // add LF afterwards
              rangesArr.push(i, i + 1, "\n");
              console.log(`0506 PUSH [${i}, ${i + 1}, "\\n"]`);
            }

            // delete whitespace at the beginning and at the end of each line
            if (str[leftStopAtNewLines(str, i)].trim().length) {
              // delete trailing whitespace at the end of each line
              let endingIdx = i;
              if (endOfLine === "\n") {
                // extend this range to also delete this CR
                endingIdx = i + 1;
              }
              const tempIdx = leftStopAtNewLines(str, i);
              if (tempIdx < i - 1) {
                console.log(
                  `0520 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${tempIdx +
                    1}, ${endingIdx}, ${JSON.stringify(
                    `${str[i + 1] === "\n" ? "" : "\n"}`,
                    null,
                    4
                  )}]`
                );
                rangesArr.push(
                  tempIdx + 1,
                  endingIdx,
                  `${str[i + 1] === "\n" ? "" : "\n"}`
                );
              }
            }

            // delete whitespace in front of each line
            if (
              str[rightStopAtNewLines(str, i)].trim().length &&
              str[i + 1] !== "\n"
            ) {
              const tempIdx = rightStopAtNewLines(str, i);
              if (tempIdx > i + 1) {
                console.log(
                  `0543 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i +
                    1}, ${tempIdx}]`
                );
                rangesArr.push(i + 1, tempIdx);
              }
            }
          }
        } else if (charcode > 13) {
          // charcodes: [14;31] - remove these control chars
          rangesArr.push(i, y);
          console.log(
            `0554 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}]`
          );
          // continue;
        }
      } else {
        console.log(`0559 processCharacter.js - clauses 32 <= charcode < 127`);
        // 32 <= charcode < 127
        // NO ENCODING HERE, JUST FIXES

        if (charcode === 32) {
          // IF SPACE CHARACTER
        } else if (charcode === 34) {
          // IF DOUBLE QUOTE
          console.log(`0567 processCharacter.js: double quote caught`);

          // it depends, are there non-whitespace characters around
          if (right(str, i) || left(str, i)) {
            applicableOpts.convertApostrophes = true;
            console.log(
              `0573 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertApostrophes = ${
                applicableOpts.convertApostrophes
              }`
            );
            const tempRes = convertOne(str, {
              from: i,
              convertEntities: opts.convertEntities,
              convertApostrophes: opts.convertApostrophes,
              offsetBy
            });
            console.log(
              `0584 ${`\u001b[${33}m${`tempRes`}\u001b[${39}m`} = ${JSON.stringify(
                tempRes,
                null,
                4
              )}`
            );
            if (tempRes && tempRes.length) {
              applicableOpts.convertEntities = true;
              console.log(
                `0593 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                  applicableOpts.convertEntities
                }`
              );
              rangesArr.push(tempRes);
            }
          } else {
            applicableOpts.convertEntities = true;
            console.log(
              `0602 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                applicableOpts.convertEntities
              }`
            );
            if (opts.convertEntities) {
              rangesArr.push(i, i + 1, "&quot;");
            }
          }
        } else if (charcode === 38) {
          // IF AMPERSAND, the &
          console.log(`0612 processCharacter.js - ampersand clauses`);
          if (isLetter(str[i + 1])) {
            // it can be a named entity
            const temp = Object.keys(allNamedEntities).find(
              entName =>
                str.startsWith(entName, i + 1) &&
                str[i + entName.length + 1] === ";"
            );
            console.log(
              `0621 processCharacter.js - ${`\u001b[${33}m${`temp`}\u001b[${39}m`} = ${JSON.stringify(
                temp,
                null,
                4
              )}`
            );
            applicableOpts.convertEntities = true;
            console.log(
              `0629 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                applicableOpts.convertEntities
              }`
            );
            if (temp) {
              console.log(
                `0635 processCharacter.js - named entity, ${`\u001b[${32}m${temp}\u001b[${39}m`} found`
              );

              if (temp === "apos") {
                applicableOpts.convertApostrophes = true;
                console.log(
                  `0641 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertApostrophes = ${
                    applicableOpts.convertApostrophes
                  }`
                );

                console.log(`0646 processCharacter.js - let's decode`);
                const decodedTempRes = convertOne(str, {
                  from: i,
                  to: i + temp.length + 2,
                  value: `'`,
                  convertEntities: opts.convertEntities,
                  convertApostrophes: opts.convertApostrophes,
                  offsetBy
                });
                if (Array.isArray(decodedTempRes) && decodedTempRes.length) {
                  rangesArr.push(decodedTempRes);
                  console.log(
                    `0658 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${JSON.stringify(
                      decodedTempRes,
                      null,
                      0
                    )}`
                  );
                  console.log(`0664 offset by ${temp.length + 2}`);
                  offsetBy(temp.length + 2);
                } else {
                  rangesArr.push([i, i + temp.length + 2, `'`]);
                  console.log(
                    `0669 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${JSON.stringify(
                      [i, i + temp.length + 2, `'`],
                      null,
                      0
                    )}`
                  );
                  console.log(`0675 offset by ${temp.length + 2}`);
                  offsetBy(temp.length + 2);
                }
              } else if (
                opts.convertEntities &&
                Object.keys(notEmailFriendly).includes(
                  str.slice(i + 1, i + temp.length + 1)
                )
              ) {
                console.log(
                  `0685 processCharacter.js - not email-friendly named entity`
                );
                rangesArr.push(
                  i,
                  i + temp.length + 2,
                  `&${notEmailFriendly[str.slice(i + 1, i + temp.length + 1)]};`
                );
                console.log(
                  `0693 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
                    temp.length +
                    2}, &${JSON.stringify(
                    notEmailFriendly[str.slice(i + 1, i + temp.length + 1)],
                    null,
                    4
                  )};]`
                );
                offsetBy(temp.length + 1);
                console.log(`0702 offset by ${temp.length + 1}`);
              } else if (!opts.convertEntities) {
                console.log(
                  `0705 decoded ${JSON.stringify(
                    str.slice(i, i + temp.length + 2),
                    null,
                    4
                  )} (charCodeAt = ${he
                    .decode(`${str.slice(i, i + temp.length + 2)}`)
                    .charCodeAt(0)})`
                );
                console.log(
                  `0714 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} decoded [${i}, ${i +
                    temp.length +
                    2}, ${JSON.stringify(
                    he.decode(`${str.slice(i, i + temp.length + 2)}`),
                    null,
                    4
                  )}]`
                );
                rangesArr.push(
                  i,
                  i + temp.length + 2,
                  he.decode(`${str.slice(i, i + temp.length + 2)}`)
                );
                offsetBy(temp.length + 1);
                console.log(`0728 offset by ${temp.length + 1}`);
              } else {
                // if opts.convertEntities
                // just skip
                offsetBy(temp.length + 1);
                console.log(`0733 offset by ${temp.length + 1}`);
              }
            } else if (opts.convertEntities) {
              // no named entities matched, so encode the ampersand
              rangesArr.push(i, i + 1, "&amp;");
              console.log(
                `0739 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
                  1}, "&amp;"]`
              );
            }
          } else if (str[right(str, i)] === "#") {
            // it can be a numeric, a decimal or a hex entity
            console.log("0745 ██ numeric, a decimal or a hex entity");
            for (let z = right(str, i); z < len; z++) {
              if (str[z].trim().length && !isNumber(str[z]) && str[z] !== "#") {
                if (str[z] === ";") {
                  // it's numeric entity
                  console.log(`0750 carved out "${str.slice(i, z + 1)}"`);
                  const tempRes = he.encode(he.decode(str.slice(i, z + 1)), {
                    useNamedReferences: true
                  });
                  console.log(
                    `0755 ${`\u001b[${33}m${`tempRes`}\u001b[${39}m`} = ${JSON.stringify(
                      tempRes,
                      null,
                      4
                    )}`
                  );
                  if (tempRes) {
                    rangesArr.push(i, z + 1, tempRes);
                    console.log(
                      `0764 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${z +
                        1}, "${tempRes}"]`
                    );
                  }
                  offsetBy(z + 1 - i);
                  console.log(`0769 offset by ${z + 1 - i}`);
                } else {
                  // do checks, maybe semicol is missing?
                  // TODO
                }
              }
            }
          } else {
            applicableOpts.convertEntities = true;
            console.log(
              `0779 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                applicableOpts.convertEntities
              }`
            );
            if (opts.convertEntities) {
              // encode it
              rangesArr.push(i, i + 1, "&amp;");
              console.log(
                `0787 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
                  1}, "&amp;"]`
              );
            }
          }
        } else if (charcode === 39) {
          // IF SINGLE QUOTE OR APOSTROPHE, the '

          // first, calculate theoretical maximum setting and set applicable rules
          // based on it
          const temp = convertOne(str, {
            from: i,
            convertEntities: true,
            convertApostrophes: true
          });
          if (temp.length) {
            applicableOpts.convertApostrophes = true;
            console.log(
              `0805 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertApostrophes = ${
                applicableOpts.convertApostrophes
              }`
            );
            if (opts.convertApostrophes) {
              applicableOpts.convertEntities = true;
              console.log(
                `0812 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                  applicableOpts.convertEntities
                }`
              );
            }
            rangesArr.push(
              convertOne(str, {
                from: i,
                convertEntities: opts.convertEntities,
                convertApostrophes: opts.convertApostrophes,
                offsetBy
              })
            );
          }
        } else if (charcode === 44 || charcode === 59) {
          // IF COMMA (,) OR SEMICOLON (;)

          // 1. check for whitespace leading to colon or semicolon
          if (str[i - 1] && !str[i - 1].trim().length) {
            const whatsOnTheLeft = left(str, i);
            if (whatsOnTheLeft < i - 1) {
              rangesArr.push(whatsOnTheLeft + 1, i);
              console.log(
                `0835 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${whatsOnTheLeft +
                  1}, ${i}]`
              );
            }
          }

          // 2. comma-specific
          if (
            charcode === 44 &&
            str[y] !== undefined &&
            !state.onUrlCurrently &&
            !isNumber(str[y]) &&
            str[y].trim().length &&
            str[y] !== " " &&
            str[y] !== "\n" &&
            str[y] !== '"' &&
            str[y] !== "'" &&
            str[y] !== leftSingleQuote &&
            str[y] !== leftDoubleQuote &&
            str[y] !== rightSingleQuote &&
            str[y] !== rightDoubleQuote
          ) {
            // comma, not on URL, not followed by number = add space afterwards
            applicableOpts.addMissingSpaces = true;
            console.log(
              `0860 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.addMissingSpaces = ${
                applicableOpts.addMissingSpaces
              }`
            );

            if (opts.addMissingSpaces) {
              rangesArr.push(y, y, " ");
              console.log(
                `0868 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${y}, ${y}, " "]`
              );
            }
          }

          console.log(`0873`);
          // 3. semicolon-specific
          if (
            charcode === 59 &&
            str[y] !== undefined &&
            !state.onUrlCurrently &&
            str[y].trim().length &&
            str[y] !== "&" &&
            str[y] !== '"' &&
            str[y] !== "'" &&
            str[y] !== leftSingleQuote &&
            str[y] !== leftDoubleQuote &&
            str[y] !== rightSingleQuote &&
            str[y] !== rightDoubleQuote
          ) {
            applicableOpts.addMissingSpaces = true;
            console.log(
              `0890 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.addMissingSpaces = ${
                applicableOpts.addMissingSpaces
              }`
            );

            if (opts.addMissingSpaces) {
              rangesArr.push(y, y, " ");
              console.log(
                `0898 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${y}, ${y}, " "]`
              );
            }
          }
        } else if (charcode === 45) {
          // IF MINUS SIGN / HYPHEN
          console.log("0904 processCharacter.js - minus caught");
          // don't mess up if minus is between two numbers
          if (
            str[i - 1] === " " &&
            str[y] === " " &&
            isNumber(str[left(str, i)]) &&
            isNumber(str[right(str, y)])
          ) {
            console.log(`0912 processCharacter.js - seems legit - skip`);
          } else {
            // add space after minus/dash character if there's nbsp or space in front of it,
            // but the next character is not currency or digit.
            // That's to prevent the space addition in front of legit minuses.
            if (
              (str[i - 1] === rawNbsp || str[i - 1] === " ") &&
              str[y] !== "$" &&
              str[y] !== "£" &&
              str[y] !== "€" &&
              str[y] !== "₽" &&
              str[y] !== "0" &&
              str[y] !== "1" &&
              str[y] !== "2" &&
              str[y] !== "3" &&
              str[y] !== "4" &&
              str[y] !== "5" &&
              str[y] !== "6" &&
              str[y] !== "7" &&
              str[y] !== "8" &&
              str[y] !== "9" &&
              str[y] !== "-" &&
              str[y] !== ">" &&
              str[y] !== " "
            ) {
              applicableOpts.addMissingSpaces = true;
              console.log(
                `0939 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.addMissingSpaces = ${
                  applicableOpts.addMissingSpaces
                }`
              );

              if (opts.addMissingSpaces) {
                // add space after it:
                rangesArr.push(y, y, " ");
                console.log(
                  `0948 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${y}, ${y}, " "]`
                );
              }
            } else if (
              str[i - 1] &&
              str[y] &&
              ((isNumber(str[i - 1]) && isNumber(str[y])) ||
                (str[i - 1].toLowerCase() === "a" &&
                  str[y].toLowerCase() === "z"))
            ) {
              applicableOpts.convertDashes = true;
              console.log(
                `0960 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertDashes = ${
                  applicableOpts.convertDashes
                }`
              );

              if (opts.convertDashes) {
                applicableOpts.convertEntities = true;
                console.log(
                  `0968 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                    applicableOpts.convertEntities
                  }`
                );

                console.log(
                  `0974 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${
                    opts.convertEntities ? "&ndash;" : "\u2013"
                  }]`
                );
                rangesArr.push(
                  i,
                  y,
                  opts.convertEntities ? "&ndash;" : "\u2013"
                );
              }
            } else if (
              str[i - 1] &&
              str[y] &&
              ((str[i - 1].trim().length === 0 && str[y].trim().length === 0) ||
                (isLowercaseLetter(str[i - 1]) && str[y] === "'"))
            ) {
              applicableOpts.convertDashes = true;
              console.log(
                `0992 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertDashes = ${
                  applicableOpts.convertDashes
                }`
              );

              if (opts.convertDashes) {
                applicableOpts.convertEntities = true;
                console.log(
                  `1000 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                    applicableOpts.convertEntities
                  }`
                );

                console.log(
                  `1006 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${
                    opts.convertEntities ? "&mdash;" : rawMDash
                  }]`
                );
                rangesArr.push(
                  i,
                  y,
                  opts.convertEntities ? "&mdash;" : rawMDash
                );
              }
            } else if (
              str[i - 1] &&
              str[y] &&
              isLetter(str[i - 1]) &&
              isQuote(str[y])
            ) {
              applicableOpts.convertDashes = true;
              console.log(
                `1024 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertDashes = ${
                  applicableOpts.convertDashes
                }`
              );

              if (opts.convertDashes) {
                applicableOpts.convertEntities = true;
                console.log(
                  `1032 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                    applicableOpts.convertEntities
                  }`
                );

                // direct speech breaks off
                console.log(
                  `1039 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${
                    opts.convertEntities ? "&mdash;" : rawMDash
                  }]`
                );
                rangesArr.push(
                  i,
                  y,
                  opts.convertEntities ? "&mdash;" : rawMDash
                );
              }
            }
          }

          // tackle widow word setting - space in front when opts.removeWidows is on
          if (
            str[i - 2] &&
            str[i - 2].trim().length &&
            !str[i - 1].trim().length &&
            !["\n", "\r"].includes(str[i - 1])
          ) {
            // 1. mark option as applicable
            applicableOpts.removeWidows = true;
            console.log(
              `1062 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`applicableOpts.removeWidows`}\u001b[${39}m`} = ${
                applicableOpts.removeWidows
              }`
            );

            // 2. if option is on, apply it
            if (opts.removeWidows) {
              applicableOpts.convertEntities = true;
              console.log(
                `1071 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`applicableOpts.convertEntities`}\u001b[${39}m`} = ${
                  applicableOpts.convertEntities
                }`
              );

              rangesArr.push(
                i - 1,
                i,
                opts.convertEntities ? "&nbsp;" : rawNbsp
              );
              console.log(
                `1082 processCharacter.js: ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} nbsp [${i -
                  1}, ${i}, ${opts.convertEntities ? "&nbsp;" : rawNbsp}]`
              );
            }
          }
        } else if (charcode === 46) {
          // IF DOT CHARACTER
          //
          // 1. convert first of three and only three dots to ellipsis, encode
          // if needed
          // TODO - improve matching to account for possible spaces between dots
          if (
            str[i - 1] !== "." &&
            str[y] === "." &&
            str[y + 1] === "." &&
            str[y + 2] !== "."
          ) {
            applicableOpts.convertDotsToEllipsis = true;
            console.log(
              `1101 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertDotsToEllipsis = ${
                applicableOpts.convertDotsToEllipsis
              }`
            );

            if (opts.convertDotsToEllipsis) {
              applicableOpts.convertEntities = true;
              console.log(
                `1109 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                  applicableOpts.convertEntities
                }`
              );

              console.log(
                `1115 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y +
                  2}, ${opts.convertEntities ? "&hellip;" : `${rawEllipsis}`}]`
              );
              rangesArr.push(
                i,
                y + 2,
                opts.convertEntities ? "&hellip;" : `${rawEllipsis}`
              );
            }
          }

          // 2. add missing space after full stop or comma except on extensions and URL's
          const first = str[y] ? str[y].toLowerCase() : "";
          const second = str[y + 1] ? str[y + 1].toLowerCase() : "";
          const third = str[y + 2] ? str[y + 2].toLowerCase() : "";
          const fourth = str[y + 3] ? str[y + 3].toLowerCase() : "";
          const nextThreeChars = first + second + third;
          if (
            first + second !== "js" &&
            nextThreeChars !== "jpg" &&
            nextThreeChars !== "png" &&
            nextThreeChars !== "gif" &&
            nextThreeChars !== "svg" &&
            nextThreeChars !== "htm" &&
            nextThreeChars !== "pdf" &&
            nextThreeChars !== "psd" &&
            nextThreeChars !== "tar" &&
            nextThreeChars !== "zip" &&
            nextThreeChars !== "rar" &&
            nextThreeChars !== "otf" &&
            nextThreeChars !== "ttf" &&
            nextThreeChars !== "eot" &&
            nextThreeChars !== "php" &&
            nextThreeChars !== "rss" &&
            nextThreeChars !== "asp" &&
            nextThreeChars !== "ppt" &&
            nextThreeChars !== "doc" &&
            nextThreeChars !== "txt" &&
            nextThreeChars !== "rtf" &&
            nextThreeChars !== "git" &&
            nextThreeChars + fourth !== "jpeg" &&
            nextThreeChars + fourth !== "html" &&
            nextThreeChars + fourth !== "woff" &&
            !(
              !isLetter(str[i - 2]) &&
              str[i - 1] === "p" &&
              str[y] === "s" &&
              str[y + 1] === "t" &&
              !isLetter(str[y + 2])
            )
          ) {
            // two tasks: deleting any spaces before and adding spaces after
            //
            // 2-1. ADDING A MISSING SPACE AFTER IT:
            if (
              str[y] !== undefined &&
              // - When it's not within a URL, the requirement for next letter to be uppercase letter.
              //   This prevents both numbers with decimal digits and short url's like "detergent.io"
              // - When it's within URL, it's stricter:
              //   next letter has to be an uppercase letter, followed by lowercase letter.
              ((!state.onUrlCurrently && isUppercaseLetter(str[y])) ||
                (state.onUrlCurrently &&
                  isLetter(str[y]) &&
                  isUppercaseLetter(str[y]) &&
                  isLetter(str[y + 1]) &&
                  isLowercaseLetter(str[y + 1]))) &&
              str[y] !== " " &&
              str[y] !== "." &&
              str[y] !== "\n"
            ) {
              applicableOpts.addMissingSpaces = true;
              console.log(
                `1187 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.addMissingSpaces = ${
                  applicableOpts.addMissingSpaces
                }`
              );

              if (opts.addMissingSpaces) {
                rangesArr.push(y, y, " ");
                console.log(
                  `1195 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${y}, ${y}, " "]`
                );
              }
            }

            // 2-2. REMOVING SPACES BEFORE IT:
            if (
              str[i - 1] !== undefined &&
              str[i - 1].trim() === "" &&
              str[y] !== "." &&
              (str[i - 2] === undefined || str[i - 2] !== ".") // that's for cases: "aaa. . " < observe second dot.
            ) {
              // march backwards
              for (y = i - 1; y--; ) {
                if (str[y].trim() !== "") {
                  rangesArr.push(y + 1, i);
                  console.log(
                    `1212 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${y +
                      1}, ${i}]`
                  );
                  break;
                }
              }
            }
          }
        } else if (charcode === 47) {
          console.log("1221 processCharacter.js - right slash caught");
          // IF RIGHT SLASH, /
        } else if (charcode === 58) {
          // IF COLON (:)
          //
          // URL detection
          //

          if (
            str[y - 1] &&
            str[right(str, y - 1)] === "/" &&
            str[right(str, right(str, y - 1))] === "/"
          ) {
            state.onUrlCurrently = true;
            console.log(
              `1236 processCharacter.js - ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`state.onUrlCurrently`}\u001b[${39}m`} = true`
            );
          }
        } else if (charcode === 60) {
          // IF LESS THAN SIGN, <
          applicableOpts.convertEntities = true;
          console.log(
            `1243 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );

          if (opts.convertEntities) {
            rangesArr.push(i, i + 1, "&lt;");
            console.log(
              `1251 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
                1}, "&lt;"]`
            );
          }
        } else if (charcode === 62) {
          // IF GREATER THAN SIGN, >
          applicableOpts.convertEntities = true;
          console.log(
            `1259 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );

          if (opts.convertEntities) {
            rangesArr.push(i, i + 1, "&gt;");
            console.log(
              `1267 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${i +
                1}, "&gt;"]`
            );
          }
        } else if (charcode === 119) {
          // IF LETTER w
          //
          // URL detection
          //
          if (
            str[y + 1] &&
            str[y].toLowerCase() === "w" &&
            str[y + 1].toLowerCase() === "w"
          ) {
            state.onUrlCurrently = true;
            console.log(
              `1283 processCharacter.js - ${`\u001b[${33}m${`state.onUrlCurrently`}\u001b[${39}m`} = true`
            );
          }
        } else if (charcode === 123) {
          // opening curly bracket {

          // check for following {{ and {%, if following skip until closing found
          let stopUntil;
          if (str[y] === "{") {
            stopUntil = "}}";
          } else if (str[y] === "%") {
            stopUntil = "%}";
          }
          // PS. whitespace limiting with dashes like {%- zz -%} don't matter
          // because dashes sit inside and will be caught by standard {%..%}
          if (stopUntil) {
            console.log(
              `1300 processCharacter.js - stopUntil = ${stopUntil} so loop:`
            );
            for (let z = i; z < len; z++) {
              console.log(`= str[z] = ${str[z]}`);
              if (str[z] === stopUntil[0] && str[z + 1] === stopUntil[1]) {
                console.log(
                  `1306 processCharacter.js - offset by ${z + 1 - i}`
                );
                offsetBy(z + 1 - i);
                break;
              }
            }
            // if end is reached and closing counterpart is not found,
            // nothing happens.
          }
        }
      }
    } else {
      // >= 127
      // outside ASCII, need to encode (unless requested not to)
      console.log(
        `1321 processCharacter.js - ${`\u001b[${90}m${`character outside ASCII`}\u001b[${39}m`}; charcode = ${charcode}`
      );

      // plan - filter all characters for deletion and leave reset (ELSE) to
      // be encoded

      if (charcode > 126 && charcode < 160) {
        // C1 group
        if (charcode !== 133) {
          // over thirty characters, so they are statistically more likely to happen:
          rangesArr.push(i, y);
          console.log(
            `1333 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}]`
          );
        } else {
          // only codepoint 133 - Next Line (NEL), statistically less probable
          // so it comes second:
          applicableOpts.removeLineBreaks = true;
          console.log(
            `1340 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.removeLineBreaks = ${
              applicableOpts.removeLineBreaks
            }`
          );

          rangesArr.push(i, y, opts.removeLineBreaks ? "" : "\n");
          console.log(
            `1347 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${
              opts.removeLineBreaks ? "" : "\\n"
            }]`
          );
        }
      } else if (charcode === 173) {
        // IF SOFT HYPHEN, '\u00AD'
        rangesArr.push(i, y);
        console.log(
          `1356 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}]`
        );
      } else if (charcode === 8232 || charcode === 8233) {
        // '\u2028', '\u2029'
        applicableOpts.removeLineBreaks = true;
        console.log(
          `1362 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.removeLineBreaks = ${
            applicableOpts.removeLineBreaks
          }`
        );

        rangesArr.push(i, y, opts.removeLineBreaks ? "" : "\n");
        console.log(
          `1369 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${
            opts.removeLineBreaks ? "" : "\\n"
          }]`
        );
      } else if (
        [
          5760,
          8191,
          8192,
          8193,
          8194,
          8195,
          8196,
          8197,
          8198,
          8199,
          8200,
          8201,
          8202,
          8239,
          8287,
          12288
        ].includes(charcode)
      ) {
        // replace with spaces from
        // https://www.fileformat.info/info/unicode/category/Zs/list.htm

        // - ogham space marks (#5760), '\u1680'
        // - en quad (#8192), '\u2000'
        // - em quad (#8193), '\u2001'
        // - en space (#8194), '\u2002'
        // - em space (#8195), '\u2003'
        // - three-per-em-space (#8196), '\u2004'
        // - four-per-em-space (#8197), '\u2005'
        // - six-per-em-space (#8198), '\u2006'
        // - figure space (#8199), '\u2007'
        // - punctuation space (#8200), '\u2008'
        // - thin space (#8201), '\u2009'
        // - hair space (#8202), '\u200A'
        // - narrow no break space (#8239), '\u202F'
        // - medium mathematical space (#8287), '\u205F'
        // - ideographic space (#12288), '\u3000'

        console.log("1412 processCharacter.js - hairspace caught");
        if (!str[y]) {
          rangesArr.push(i, y);
          console.log(
            `1416 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}]`
          );
        } else {
          // rangesArr.push(i, y, " ");
          const expandedRange = rangesExpander({
            str,
            from: i,
            to: y,
            wipeAllWhitespaceOnLeft: true,
            wipeAllWhitespaceOnRight: true,
            addSingleSpaceToPreventAccidentalConcatenation: true
          });
          console.log(
            `1429 processCharacter.js - expanded to ${JSON.stringify(
              expandedRange,
              null,
              0
            )} and then pushed it`
          );
          rangesArr.push(...expandedRange);
        }
      } else if (charcode === 8206) {
        // remove all left-to-right mark chars, '\u200E'
        console.log("1439 processCharacter.js - LTR mark caught");
        rangesArr.push(i, y);
        console.log(
          `1442 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}]`
        );
      } else if (charcode === 8207) {
        console.log("1445 processCharacter.js - RTL mark caught");
        // remove all right-to-right mark chars, '\u200F'
        rangesArr.push(i, y);
        console.log(
          `1449 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}]`
        );
      } else if (
        charcode === 8211 ||
        (charcode === 65533 && isNumber(str[i - 1]) && isNumber(str[y]))
      ) {
        // IF N-DASH, '\u2013'
        console.log("1456 processCharacter.js - N dash caught");

        applicableOpts.convertDashes = true;
        console.log(
          `1460 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertDashes = ${
            applicableOpts.convertDashes
          }`
        );

        if (!opts.convertDashes) {
          console.log(`1466 conversion is off`);
          rangesArr.push(i, y, "-");
          console.log(
            `1469 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "-"]`
          );
        } else {
          applicableOpts.convertEntities = true;
          console.log(
            `1474 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );

          if (opts.convertEntities) {
            // if it's space-ndash-space, put m-dash instead
            if (
              str[i - 1] &&
              !str[i - 1].trim().length &&
              str[i + 1] &&
              !str[i + 1].trim().length &&
              !(isNumber(str[i - 2]) && isNumber(str[i + 2]))
            ) {
              rangesArr.push(i, y, "&mdash;");
              console.log(
                `1490 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "&mdash;"]`
              );
            } else {
              // ELSE - n-dash stays
              rangesArr.push(i, y, "&ndash;");
              console.log(
                `1496 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "&ndash;"]`
              );
            }
          } else if (charcode === 65533) {
            if (
              str[i - 1] &&
              !str[i - 1].trim().length &&
              str[i + 1] &&
              !str[i + 1].trim().length
            ) {
              rangesArr.push(i, y, rawMDash);
              console.log(
                `1508 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "raw m-dash"]`
              );
            } else {
              rangesArr.push(i, y, rawNDash);
              console.log(
                `1513 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "raw n-dash"]`
              );
            }
          }
        }

        // if there's space in front but no space after:
        // ---------------------------------------------
        if (
          str[i - 1] &&
          str[i - 1].trim().length === 0 &&
          str[y].trim().length !== 0
        ) {
          console.log(`1526`);
          if (str[i - 2] && isNumber(str[i - 2]) && isNumber(str[y])) {
            rangesArr.push(i - 1, i);
            console.log(
              `1530 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} (TO DELETE) [${i -
                1}, ${i}]`
            );
          } else {
            applicableOpts.addMissingSpaces = true;
            console.log(
              `1536 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.addMissingSpaces = ${
                applicableOpts.addMissingSpaces
              }`
            );
            applicableOpts.convertEntities = true;
            console.log(
              `1542 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                applicableOpts.convertEntities
              }`
            );

            // 1.
            // add space after
            if (opts.addMissingSpaces) {
              let whatToAdd = " ";
              // imagine case "10am&nbsp;&ndash;11am" - we're adding space
              // before "11am", but there needs to be non-breaking space because
              // widow removal is on
              if (!widowRegexTest.test(str.slice(y))) {
                applicableOpts.removeWidows = true;
                console.log(
                  `1557 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.removeWidows = ${
                    applicableOpts.removeWidows
                  }`
                );
                if (opts.removeWidows) {
                  whatToAdd = opts.convertEntities ? "&nbsp;" : rawNbsp;
                  console.log(
                    `1564 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} whatToAdd = ${
                      opts.convertEntities ? whatToAdd : "rawNbsp"
                    }`
                  );
                }
              }

              rangesArr.push(y, y, whatToAdd);
              console.log(
                `1573 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${y}, ${y}, ${JSON.stringify(
                  whatToAdd,
                  null,
                  0
                )}]`
              );
            }

            // 2.
            // replace space in front with non-breaking space if widow removal is on
            if (str.slice(i - 1, i) !== rawNbsp) {
              applicableOpts.removeWidows = true;
              console.log(
                `1586 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.removeWidows = ${
                  applicableOpts.removeWidows
                }`
              );

              if (opts.removeWidows) {
                rangesArr.push(
                  i - 1,
                  i,
                  opts.convertEntities ? "&nbsp;" : rawNbsp
                );
                console.log(
                  `1598 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i -
                    1}, ${i}, ${JSON.stringify(
                    opts.convertEntities ? "&nbsp;" : rawNbsp,
                    null,
                    0
                  )}]`
                );
              }
            }
          }
        } else if (
          str[i - 2] &&
          str[i - 1] &&
          str[y] &&
          str[y + 1] &&
          isNumber(str[i - 2]) &&
          isNumber(str[y + 1]) &&
          str[i - 1].trim().length === 0 &&
          str[y].trim().length === 0
        ) {
          // delete spaces around n-dash if those are number strings
          rangesArr.push(i - 1, i);
          rangesArr.push(y, y + 1);
          console.log(
            `1622 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i -
              1}, ${i}], then [${y}, ${y + 1}]`
          );
        }

        // Also, if it is mistakenly put instead of an m-dash, we need to tackle
        // the widow word, space in front of it within this clause.

        if (
          str[i - 2] &&
          str[i + 1] &&
          !str[i - 1].trim().length &&
          str[i - 2].trim().length &&
          !str[i + 1].trim().length &&
          !(isNumber(str[i - 2]) && isNumber(str[i + 2]))
        ) {
          // 1. report as applicable
          applicableOpts.removeWidows = true;
          if (opts.removeWidows) {
            // 2. replace the space
            rangesArr.push(i - 1, i, opts.convertEntities ? "&nbsp;" : rawNbsp);
            console.log(
              `1644 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i -
                1}, ${i}, ${JSON.stringify(
                opts.convertEntities ? "&nbsp;" : rawNbsp,
                null,
                4
              )}]`
            );
          }
        }
      } else if (
        charcode === 8212 ||
        (charcode === 65533 && str[i - 1] === " " && str[y] === " ")
      ) {
        // IF RAW M-DASH, '\u2014'
        console.log("1658 processCharacter.js - M dash caught");

        applicableOpts.convertDashes = true;
        console.log(
          `1662 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertDashes = ${
            applicableOpts.convertDashes
          }`
        );

        // replace spaces in front with nbsp if widow removal is on
        if (str[i - 1] === " " && left(str, i) !== null) {
          applicableOpts.removeWidows = true;
          console.log(
            `1671 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.removeWidows = ${
              applicableOpts.removeWidows
            }`
          );

          if (opts.removeWidows) {
            applicableOpts.convertEntities = true;
            console.log(
              `1679 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                applicableOpts.convertEntities
              }`
            );

            rangesArr.push(
              left(str, i) + 1,
              i,
              opts.convertEntities ? "&nbsp;" : rawNbsp
            );
            console.log(
              `1690 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${left(
                str,
                i
              ) + 1}, ${i}, ${JSON.stringify(
                opts.convertEntities ? "&nbsp;" : rawNbsp,
                null,
                4
              )} (charCodeAt=${rawNbsp.charCodeAt(0)})]`
            );
          }
        }

        // tackle conversion into hyphen and surrounding spaces
        if (!opts.convertDashes) {
          console.log(`1704 processCharacter.js - conversion is off`);
          rangesArr.push(i, y, "-");
          console.log(
            `1707 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "-"]`
          );
        } else {
          applicableOpts.convertEntities = true;
          console.log(
            `1712 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );
          // 1. if there's space in front but no space after M-dash, add one after
          if (
            str[i - 1] &&
            str[i - 1].trim().length === 0 &&
            str[y].trim().length !== 0
          ) {
            applicableOpts.addMissingSpaces = true;
            console.log(
              `1724 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.addMissingSpaces = ${
                applicableOpts.addMissingSpaces
              }`
            );

            if (opts.addMissingSpaces) {
              rangesArr.push(y, y, " ");
              console.log(
                `1732 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${y}, ${y}, " "]`
              );
            }
          }

          // 2. encode if applicable
          if (opts.convertEntities) {
            rangesArr.push(i, y, "&mdash;");
            console.log(
              `1741 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "&mdash;"]`
            );
          } else if (charcode === 65533) {
            rangesArr.push(i, y, rawMDash);
            console.log(
              `1746 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "raw m-dash"]`
            );
          }

          console.log(
            `processCharacter.js - ${`\u001b[${33}m${`rangesArr.current()`}\u001b[${39}m`} = ${JSON.stringify(
              rangesArr.current(),
              null,
              4
            )}`
          );
        }
      } else if (charcode === 8216) {
        // IF UNENCODED LEFT SINGLE QUOTE

        const tempRes = convertOne(str, {
          from: i,
          to: y,
          convertEntities: true,
          convertApostrophes: true
        });

        if (tempRes && tempRes.length) {
          applicableOpts.convertApostrophes = true;
          console.log(
            `1771 processCharacter.js - ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertApostrophes = ${
              applicableOpts.convertApostrophes
            }`
          );

          const tempRes = convertOne(str, {
            from: i,
            to: y,
            convertEntities: true,
            convertApostrophes: true
          });

          if (tempRes) {
            if (opts.convertApostrophes) {
              applicableOpts.convertEntities = true;
              console.log(
                `1787 processCharacter.js - ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                  applicableOpts.convertEntities
                }`
              );
            }

            rangesArr.push(
              convertOne(str, {
                from: i,
                to: y,
                convertEntities: opts.convertEntities,
                convertApostrophes: opts.convertApostrophes,
                offsetBy
              })
            );
          }
        }
      } else if (charcode === 8217) {
        // IF UNENCODED RIGHT SINGLE QUOTE
        applicableOpts.convertApostrophes = true;
        console.log(
          `1808 processCharacter.js - ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertApostrophes = ${
            applicableOpts.convertApostrophes
          }`
        );

        if (!opts.convertApostrophes) {
          rangesArr.push(i, y, "'");
          console.log(
            `1816 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "'"]`
          );
        } else {
          applicableOpts.convertEntities = true;
          console.log(
            `1821 processCharacter.js - ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );
          if (opts.convertEntities) {
            rangesArr.push(i, y, "&rsquo;");
            console.log(
              `1828 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "&rsquo;"]`
            );
          }
        }
      } else if (charcode === 8220) {
        // IF UNENCODED LEFT DOUBLE QUOTE
        applicableOpts.convertApostrophes = true;
        console.log(
          `1836 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertApostrophes = ${
            applicableOpts.convertApostrophes
          }`
        );

        if (!opts.convertApostrophes) {
          applicableOpts.convertEntities = true;
          console.log(
            `1844 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );
          rangesArr.push(i, y, opts.convertEntities ? `&quot;` : `"`);
          console.log(
            `1850 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${JSON.stringify(
              opts.convertEntities ? `&quot;` : `"`,
              null,
              0
            )}]`
          );
        } else if (opts.convertEntities) {
          applicableOpts.convertEntities = true;
          console.log(
            `1859 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );
          rangesArr.push(i, y, "&ldquo;");
          console.log(
            `1865 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "&ldquo;"]`
          );
        }
      } else if (charcode === 8221) {
        // IF UNENCODED RIGHT DOUBLE QUOTE
        applicableOpts.convertApostrophes = true;
        console.log(
          `1872 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertApostrophes = ${
            applicableOpts.convertApostrophes
          }`
        );

        if (!opts.convertApostrophes) {
          applicableOpts.convertEntities = true;
          console.log(
            `1880 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );
          rangesArr.push(i, y, opts.convertEntities ? `&quot;` : `"`);
          console.log(
            `1886 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${JSON.stringify(
              opts.convertEntities ? `&quot;` : `"`,
              null,
              0
            )}]`
          );
        } else if (opts.convertEntities) {
          applicableOpts.convertEntities = true;
          console.log(
            `1895 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );
          rangesArr.push(i, y, "&rdquo;");
          console.log(
            `1901 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "&rdquo;"]`
          );
        }
      } else if (charcode === 8230) {
        // IF UNENCODED HORIZONTAL ELLIPSIS CHARACTER &hellip;
        applicableOpts.convertDotsToEllipsis = true;
        console.log(
          `1908 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertDotsToEllipsis = ${
            applicableOpts.convertDotsToEllipsis
          }`
        );

        if (!opts.convertDotsToEllipsis) {
          rangesArr.push(i, y, "...");
          console.log(
            `1916 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "..."]`
          );
        } else {
          applicableOpts.convertEntities = true;
          console.log(
            `1921 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );

          if (opts.convertEntities) {
            rangesArr.push(i, y, "&hellip;");
            console.log(
              `1929 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "&hellip;"]`
            );
          }
        }
      } else if (charcode === 65279) {
        // IF BOM, '\uFEFF'
        rangesArr.push(i, y);
        console.log(
          `1937 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}]`
        );
      } else {
        console.log(
          `1941 processCharacter.js - ${`\u001b[${90}m${`else clause leading to encode`}\u001b[${39}m`}`
        );
        //
        //
        // ENCODE (on by default, but can be turned off)
        //
        //

        if (
          !applicableOpts.dontEncodeNonLatin &&
          doConvertEntities(str[i], true) !== doConvertEntities(str[i], false)
        ) {
          applicableOpts.dontEncodeNonLatin = true;
          console.log(
            `1955 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.dontEncodeNonLatin = ${
              applicableOpts.dontEncodeNonLatin
            }`
          );
        }

        // try to convert the current character into HTML entities.
        let convertedCharVal = doConvertEntities(
          str[i],
          opts.dontEncodeNonLatin
        );
        console.log(
          `1967 processCharacter.js - ${`\u001b[${33}m${`convertedCharVal`}\u001b[${39}m`} = ${JSON.stringify(
            convertedCharVal,
            null,
            4
          )}`
        );
        if (
          Object.keys(notEmailFriendly).includes(
            convertedCharVal.slice(1, convertedCharVal.length - 1)
          )
        ) {
          convertedCharVal = `&${
            notEmailFriendly[
              convertedCharVal.slice(1, convertedCharVal.length - 1)
            ]
          };`;
        }
        console.log(
          `1985 processCharacter.js - ${`\u001b[${33}m${`convertedCharVal`}\u001b[${39}m`} = ${JSON.stringify(
            convertedCharVal,
            null,
            4
          )}`
        );
        // 2. If the result is different from the original character, this means
        // that this character needs to be encoded. We will submit this character's
        // range up for replacement.
        if (str[i] !== convertedCharVal) {
          applicableOpts.convertEntities = true;
          console.log(
            `1997 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
              applicableOpts.convertEntities
            }`
          );

          // here

          if (opts.convertEntities) {
            if (convertedCharVal === "&mldr;") {
              console.log(
                `2007 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, "&hellip;"]`
              );
              rangesArr.push(i, y, "&hellip;");
            } else if (convertedCharVal !== "&apos;") {
              console.log(
                `2012 processCharacter.js - ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} [${i}, ${y}, ${convertedCharVal}]`
              );
              rangesArr.push(i, y, convertedCharVal);
            }

            applicableOpts.convertEntities = true;
            console.log(
              `2019 processCharacter.js: ${`\u001b[${32}m${`SET`}\u001b[${39}m`} applicableOpts.convertEntities = ${
                applicableOpts.convertEntities
              }`
            );
          }
        }
      }
    }

    if (state.onUrlCurrently && !str[i].trim().length) {
      console.log(
        `2030 SET ${`\u001b[${33}m${`state.onUrlCurrently`}\u001b[${39}m`} = false`
      );
      state.onUrlCurrently = false;
    }

    //
    //
    //
    //
    //
    //
    //
  }

  console.log(
    `2045 processCharacter.js - ${`\u001b[${32}m${`finally`}\u001b[${39}m`}, rangesArr = ${JSON.stringify(
      rangesArr.current(),
      null,
      4
    )}`
  );
}

export { processCharacter };
