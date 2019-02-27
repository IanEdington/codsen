/**
 * lerna-clean-changelogs
 * Cleans all the crap from Lerna and Conventional Commits-generated changelogs
 * Version: 1.2.3
 * Author: Roy Revelt, Codsen Ltd
 * License: MIT
 * Homepage: https://gitlab.com/codsen/codsen/tree/master/packages/lerna-clean-changelogs
 */

import splitLines from 'split-lines';

var version = "1.2.3";

function isStr(something) {
  return typeof something === "string";
}
function c(changelogContents) {
  if (changelogContents === undefined) {
    throw new Error(
      `lerna-clean-changelogs: [THROW_ID_01] The first input argument is missing!`
    );
  } else if (!isStr(changelogContents)) {
    throw new Error(
      `lerna-clean-changelogs: [THROW_ID_02] The first input argument must be a string! It was given as ${
        Array.isArray(changelogContents) ? "array" : typeof changelogContents
      }, equal to:\n${JSON.stringify(changelogContents, null, 4)}`
    );
  }
  let final;
  let lastLineWasEmpty = false;
  if (
    changelogContents.length &&
    (!changelogContents.includes("\n") || !changelogContents.includes("\r"))
  ) {
    const changelogEndedWithLinebreak =
      isStr(changelogContents) &&
      changelogContents.length &&
      (changelogContents[changelogContents.length - 1] === "\n" ||
        changelogContents[changelogContents.length - 1] === "\r");
    changelogContents = changelogContents.trim();
    const linesArr = splitLines(changelogContents);
    linesArr.forEach((line, i) => {
      if (line.startsWith("#")) {
        linesArr[i] = line.replace(
          /(#+) \[?(\d+\.\d+\.\d+)\s?\]\([^)]*\)/g,
          "$1 $2"
        );
      }
      if (i && linesArr[i].startsWith("# ")) {
        linesArr[i] = `#${linesArr[i]}`;
      }
    });
    const newLinesArr = [];
    for (let i = linesArr.length; i--; ) {
      if (
        linesArr[i].startsWith("**Note:** Version bump only") ||
        linesArr[i].toLowerCase().includes("wip")
      ) {
        while (isStr(linesArr[i - 1]) && !linesArr[i - 1].trim().length && i) {
          i--;
        }
        if (
          i &&
          isStr(linesArr[i - 1]) &&
          linesArr[i - 1].trim().startsWith("#")
        ) {
          i--;
        }
        while (isStr(linesArr[i - 1]) && !linesArr[i - 1].trim().length && i) {
          i--;
        }
      } else if (!linesArr[i].trim().length) {
        if (!lastLineWasEmpty) {
          newLinesArr.unshift(linesArr[i].trim());
          lastLineWasEmpty = true;
        }
      } else {
        if (linesArr[i][0] === "*" && linesArr[i][1] === " ") {
          newLinesArr.unshift(`- ${linesArr[i].slice(2)}`);
        } else {
          newLinesArr.unshift(linesArr[i]);
        }
      }
      if (linesArr[i].trim().length) {
        lastLineWasEmpty = false;
      }
    }
    final = `${newLinesArr.join("\n")}${
      changelogEndedWithLinebreak ? "\n" : ""
    }`;
  }
  return {
    version,
    res: final || changelogContents
  };
}

export default c;
