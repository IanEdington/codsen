import { version } from "../package.json";
import splitLines from "split-lines";

function isStr(something) {
  return typeof something === "string";
}

function c(changelogContents) {
  // validate the first input argument:
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
    // console.log(
    //   `${`\u001b[${33}m${`linesArr`}\u001b[${39}m`} = ${JSON.stringify(
    //     linesArr,
    //     null,
    //     4
    //   )}`
    // );

    // ███
    // 1. remove links from titles, for example, turn:
    // ## [2.9.1](https://bitbucket.org/codsen/codsen/src/master/packages/ranges-apply/compare/ranges-apply@2.9.0...ranges-apply@2.9.1) (2018-12-27)
    // into:
    // ## 2.9.1 (2018-12-27)
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
    // console.log(
    //   `084 AFTER STEP 1, ${`\u001b[${33}m${`linesArr`}\u001b[${39}m`} = ${JSON.stringify(
    //     linesArr,
    //     null,
    //     4
    //   )}`
    // );

    // ███
    // 2. remove bump-only entries, for example
    // "## 2.9.2 (2018-12-27)",
    // "",
    // "**Note:** Version bump only for package ranges-apply",

    const newLinesArr = [];
    for (let i = linesArr.length; i--; ) {
      console.log(
        `----------------${`\u001b[${36}m${i}\u001b[${39}m`}\n${`\u001b[${33}m${`linesArr[i]`}\u001b[${39}m`} = ${JSON.stringify(
          linesArr[i],
          null,
          4
        )}`
      );
      if (linesArr[i].startsWith("**Note:** Version bump only")) {
        // delete all the blank lines above the culprit:
        while (isStr(linesArr[i - 1]) && !linesArr[i - 1].trim().length && i) {
          i--;
        }
        // after that, delete the title, but only if there were no other entries:
        if (
          i &&
          isStr(linesArr[i - 1]) &&
          linesArr[i - 1].trim().startsWith("#")
        ) {
          i--;
        }
        // delete all the blank lines above the culprit:
        while (isStr(linesArr[i - 1]) && !linesArr[i - 1].trim().length && i) {
          i--;
        }
      } else {
        newLinesArr.unshift(linesArr[i]);
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