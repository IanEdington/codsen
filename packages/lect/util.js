/* eslint no-param-reassign:0, no-continue:0, no-console:0,
no-loop-func:0, prefer-destructuring:0 */

const fs = require("fs-extra");
const path = require("path");
const objectPath = require("object-path");
const replace = require("replace-string");
const pify = require("pify");
const request = pify(require("request"));
const split = require("split-lines");
const trim = require("lodash.trim");
const isObj = require("lodash.isplainobject");
const filesize = require("filesize");
const traverse = require("ast-monkey-traverse");

const currentTime = new Date();
const year = currentTime.getFullYear();
const isArr = Array.isArray;
function isStr(something) {
  return typeof something === "string";
}

const DEBUG = 0;

// -----------------------------------------------------------------------------

// const linkToCommits = 'https://bitbucket.org/<%= options.projectOwner %>/<%= options.projectName %>/commits?author=<%= contributor.login %>'
// const linkToIssues = 'https://bitbucket.org/<%= options.projectOwner %>/<%= options.projectName %>/issues?q=author%3A<%= contributor.login %>'

function resolveVars(str, pack, parsedPack) {
  // if contributors section exists in package.json, get contributors' count from there
  let count = 0;
  if (
    objectPath.has(pack, "lect.contributors") &&
    isArr(pack.lect.contributors)
  ) {
    count = pack.lect.contributors.length;
  } else {
    // otherwise, peeps must be using all-contributors CLI so we need to parse
    // the contrib tables in readme and count how many contributors there are
    // TODO - call all-contributors parser
  }

  const mappings = {
    "%REPONAME%": pack.name,
    "%USERNAME%": parsedPack.user,
    "%ISSUELINK%": `${path.join(
      pack.repository,
      `issues/new?issue[title]=${`${
        pack.name
      }%20package%20-%20put%20title%20here`}&issue[description]=${`%23%23%20${
        pack.name
      }%0A%0Aput%20description%20here`}`
    )}`,
    "%COMMITLINK%": `https://bitbucket.org/${parsedPack.user}/${
      parsedPack.project
    }/commits`,
    "%YEAR%": String(year),
    "%CONTRIBUTORCOUNT%": String(count)
  };
  return Object.keys(mappings).reduce(
    (accumulator, mappingsKey) =>
      replace(accumulator, mappingsKey, mappings[mappingsKey]),
    str
  );
}

// -----------------------------------------------------------------------------

function extractSrc(str) {
  let attrStartsAt = null;
  for (let i = 0, len = str.length; i < len; i++) {
    if (
      `${str[i]}${str[i + 1]}${str[i + 2]}${str[i + 3]}${str[i + 4]}` ===
      'src="'
    ) {
      attrStartsAt = i + 5;
      i += 5;
      continue;
    }
    if (attrStartsAt && str[i] === '"') {
      return str.slice(attrStartsAt, i);
    }
  }
  return null;
}

// -----------------------------------------------------------------------------

function removeRecognisedLintingBadges(str, lectrc) {
  const theSplit = split(str);
  // insurance in case the .lectrc.json does not have the key "header.rightFloatedBadge" set:
  if (!objectPath.has(lectrc, "header.rightFloatedBadge")) {
    return str;
  }
  // filter out the repeated floated linting badges:
  return theSplit
    .filter(
      rowsVal => !rowsVal.includes(extractSrc(lectrc.header.rightFloatedBadge))
    )
    .join("\n");
}

// -----------------------------------------------------------------------------

function replaceNpmInstallRow(str, pack) {
  const theSplit = split(str);
  return theSplit
    .map((rowsContent, index) => {
      if (
        trim(rowsContent, "$ ").startsWith("npm i") &&
        theSplit[index - 1] !== undefined &&
        theSplit[index - 1].includes("```") &&
        theSplit[index + 1] !== undefined &&
        theSplit[index + 1].includes("```")
      ) {
        return `npm i ${objectPath.has(pack, "bin") ? "-g " : ""}${pack.name}`;
      }
      return rowsContent;
    })
    .join("\n");
}

// -----------------------------------------------------------------------------

function replaceNpxRow(str, pack) {
  const theSplit = split(str);
  return split(str)
    .map((rowsContent, index) => {
      if (
        trim(rowsContent, "$ ").startsWith("npx") &&
        theSplit[index - 1] !== undefined &&
        theSplit[index - 1].includes("```") &&
        theSplit[index + 1] !== undefined &&
        theSplit[index + 1].includes("```")
      ) {
        return `$ npx ${pack.name}`;
      }
      return rowsContent;
    })
    .join("\n");
}

// -----------------------------------------------------------------------------

function piecesHeadingIsNotAmongExcluded(str) {
  if (
    str.includes("#") &&
    (str.toLowerCase().includes("licence") ||
      str.toLowerCase().includes("testing") ||
      str.toLowerCase().includes("contributors") ||
      str.toLowerCase().includes("contributing"))
  ) {
    return false;
  }
  return true;
}

// -----------------------------------------------------------------------------

// Should report the index of "S" in "Some text" from below:
//
// [![Test in browser][runkit-img]][runkit-url]
//
// Some text
//
function extractStringUnderBadges(str) {
  let lastBadgeRow = null;
  if (typeof str !== "string") {
    return str;
  }
  const theSplit = split(str);
  theSplit.forEach((row, i) => {
    if (`${row[0]}${row[1]}${row[2]}` === "[![") {
      lastBadgeRow = i;
    }
  });
  if (lastBadgeRow !== null) {
    return theSplit
      .filter((content, idx) => idx > lastBadgeRow)
      .join("\n")
      .trim();
  }
  return str;
}

// -----------------------------------------------------------------------------

function assembleRollupInfoTable(pack, lectrc) {
  let rollupTable = "";
  if (objectPath.has(lectrc, "rollup.infoTitle")) {
    rollupTable += `${lectrc.rollup.infoTitle.trim()}\n\n`;
  }
  rollupTable +=
    "Type            | Key in `package.json` | Path  | Size\r\n----------------|-----------------------|-------|--------";
  if (objectPath.has(pack, "main")) {
    try {
      const { size } = fs.statSync(pack.main);
      rollupTable += `\n${
        lectrc.rollup.infoTable.cjsTitle
      } | \`main\`                | \`${pack.main}\` | ${filesize(size, {
        round: 0
      })}`;
    } catch (err) {
      return ""; // because main should always be there
    }
  }
  if (objectPath.has(pack, "module")) {
    try {
      const { size } = fs.statSync(pack.module);
      rollupTable += `\n${
        lectrc.rollup.infoTable.esmTitle
      } | \`module\`              | \`${pack.module}\` | ${filesize(size, {
        round: 0
      })}`;
    } catch (err) {
      objectPath.del(pack, "module");
    }
  }
  if (objectPath.has(pack, "browser")) {
    try {
      const { size } = fs.statSync(pack.browser);
      rollupTable += `\n${
        lectrc.rollup.infoTable.umdTitle
      } | \`browser\`            | \`${pack.browser}\` | ${filesize(size, {
        round: 0
      })}`;
    } catch (err) {
      objectPath.del(pack, "browser");
    }
  }
  return rollupTable;
}

// -----------------------------------------------------------------------------

function replaceRollupInfoTableAndItsHeader(str, pack, lectrc) {
  // generation part
  // ===============
  let rollupTable = "";
  if (
    (pack.module || pack.browser) &&
    objectPath.has(lectrc, "rollup.infoTable") &&
    Object.keys(lectrc.rollup.infoTable).length > 0
  ) {
    rollupTable = `${assembleRollupInfoTable(pack, lectrc)}\n\n`;
  }

  // defaults cater the case when Rollup is consumed in package.json,
  // but there's no info table in readme yet.
  // Whole contents of "install" section, "str" contents, go in front of newly-
  // generated rollup info table, "rollupTable"
  let stringBefore = `${str}\n\n`;
  let stringAfter = "";

  // removal part
  // ============
  if (str.includes("|") && str.includes("--")) {
    const theSplit = split(str);
    // First, look for the line under the table title.
    // Thing like:
    // "----------------|-----------------------|-------|--------"
    let theFirstRowThatContainsMinusMinusAndPipe = null;
    for (let i = 0, len = theSplit.length; i < len; i++) {
      if (theSplit[i].includes("--") && theSplit[i].includes("|")) {
        theFirstRowThatContainsMinusMinusAndPipe = i;
        break;
      }
    }

    let firstRowsUpForDeletionIndex = theFirstRowThatContainsMinusMinusAndPipe;
    let lastRowsUpForDeletionIndex = theFirstRowThatContainsMinusMinusAndPipe;

    // sanity check: line above our line index "theFirstRowThatContainsMinusMinusAndPipe",
    // the "----------------|-----------------------|-------|--------",
    // must contain vertical pipe. If not, throw.
    if (!theSplit[theFirstRowThatContainsMinusMinusAndPipe - 1].includes("|")) {
      throw new Error(
        `lect: the Rollup info table's heading does not contain vertical pipe symbol, which is strange! It's equal to:\n${
          theSplit[theFirstRowThatContainsMinusMinusAndPipe - 1]
        }`
      );
    }

    // if there is a sentence row above the table ending with colon, include it as well.
    // Requirements are 1) that row must end with colon; 2) above that row there
    // should be an empty line.
    // 2) requirement is to attempt to avoid including longer paragraphs above it.

    if (
      theSplit[theFirstRowThatContainsMinusMinusAndPipe - 2].trim() === "" &&
      trim(
        theSplit[theFirstRowThatContainsMinusMinusAndPipe - 3],
        "#*_ "
      ).endsWith(":") &&
      theSplit[theFirstRowThatContainsMinusMinusAndPipe - 4].trim() === ""
    ) {
      firstRowsUpForDeletionIndex =
        theFirstRowThatContainsMinusMinusAndPipe - 4;
    }
    // if there's no empty line above the table,
    if (
      theSplit[theFirstRowThatContainsMinusMinusAndPipe - 2].trim() !== "" &&
      trim(
        theSplit[theFirstRowThatContainsMinusMinusAndPipe - 2],
        "#*_ "
      ).endsWith(":") &&
      theSplit[theFirstRowThatContainsMinusMinusAndPipe - 3].trim() === ""
    ) {
      firstRowsUpForDeletionIndex =
        theFirstRowThatContainsMinusMinusAndPipe - 3;
    }

    // Once the top row is found, line above it goes as well as every single line
    // under it, which contains vertical pipe. The first row that does not contains
    // the pipe underneath breaks this deletion process.
    for (let i = 0, len = theSplit.length; i < len; i++) {
      // we're cycling form zero again not from "theFirstRowThatContainsMinusMinusAndPipe"
      // because we need to record original indexes. We can't shift the starting index.
      if (i > theFirstRowThatContainsMinusMinusAndPipe) {
        if (theSplit[i].includes("|")) {
          lastRowsUpForDeletionIndex = i;
        } else {
          break;
        }
      }
    }

    stringBefore = theSplit
      .filter(
        (rowsStringValue, rowsIndex) => rowsIndex < firstRowsUpForDeletionIndex
      )
      .join("\n");

    if (stringBefore.length > 0) {
      stringBefore += "\n\n";
    }

    stringAfter = theSplit
      .filter(
        (rowsStringValue, rowsIndex) => rowsIndex > lastRowsUpForDeletionIndex
      )
      .join("\n");

    if (stringAfter.length > 0) {
      stringAfter += "\n\n";
    }
  }

  return stringBefore + rollupTable + stringAfter;
}

// -----------------------------------------------------------------------------

function parseReadme(str) {
  // sanity checks in case a dud md file was given
  if (typeof str !== "string" || !str.includes("#")) {
    return null;
  }
  let sliceStartsAt = 0; // this is a moving marker at which we cut
  const gatheredContent = [];
  let withiBackticksBlock = false;

  for (let i = 0, len = str.length; i < len; i++) {
    // catch three backticks block
    if (`${str[i]}${str[i + 1]}${str[i + 2]}` === "```") {
      if (!withiBackticksBlock) {
        withiBackticksBlock = true;
      } else {
        withiBackticksBlock = false;
      }
    }
    // catch a new line
    if (str[i - 1] === "\n" && str[i] !== "\n" && !withiBackticksBlock) {
      if (
        `${str[i]}${str[i + 1]}` === "# " ||
        `${str[i]}${str[i + 1]}${str[i + 2]}` === "## " ||
        `${str[i]}${str[i + 1]}${str[i + 2]}${str[i + 3]}` === "### " ||
        `${str[i]}${str[i + 1]}${str[i + 2]}${str[i + 3]}${str[i + 4]}` ===
          "#### "
      ) {
        gatheredContent.push(str.slice(sliceStartsAt, i));
        sliceStartsAt = i;
      }
    }
    // catch the ending of a string
    if (str[i + 1] === undefined) {
      gatheredContent.push(str.slice(sliceStartsAt, i));
    }
  }

  // at this moment we have the readme sliced by heading (h1, h2 or h3)
  return gatheredContent.map(chunk => {
    const res = split(chunk);
    if (
      res.length > 0 &&
      res[0] !== undefined &&
      res[0].trim().length > 0 &&
      res[0].includes("#")
    ) {
      const heading = split(chunk)[0];
      const restofit = split(chunk)
        .filter((el, i) => i !== 0)
        .filter(
          el =>
            !(
              replace(el, "&nbsp;", " ").includes("back to top") &&
              el.includes("[")
            )
        )
        .join("\n")
        .trim();

      const lineCount = res.length;
      return { heading, restofit, lineCount };
    }
    return chunk;
  });
}

// -----------------------------------------------------------------------------

function getUserInfo(username) {
  return request
    .get({
      url: `https://api.github.com/users/${username}`,
      headers: {
        "user-agent": "lect"
      }
    })
    .then(response => {
      const body = JSON.parse(response.body);
      return {
        login: body.login,
        name: body.name || username,
        avatar_url: body.avatar_url,
        profile: body.blog || body.html_url
      };
    });
  // .catch(() => {})
}
// -----------------------------------------------------------------------------

const defaultTypes = {
  blog: {
    symbol: "📝",
    description: "Blogposts"
  },
  bug: {
    symbol: "🐛",
    description: "Bug reports",
    link: "%ISSUELINK%"
  },
  code: {
    symbol: "💻",
    description: "Code",
    link: "%COMMITLINK%"
  },
  design: {
    symbol: "🎨",
    description: "Design"
  },
  doc: {
    symbol: "📖",
    description: "Documentation",
    link: "%COMMITLINK%"
  },
  eventOrganizing: {
    symbol: "📋",
    description: "Event Organizing"
  },
  example: {
    symbol: "💡",
    description: "Examples"
  },
  financial: {
    symbol: "💵",
    description: "Financial"
  },
  fundingFinding: {
    symbol: "🔍",
    description: "Funding Finding"
  },
  ideas: {
    symbol: "🤔",
    description: "Ideas, Planning, & Feedback"
  },
  infra: {
    symbol: "🚇",
    description: "Infrastructure (Hosting, Build-Tools, etc)"
  },
  plugin: {
    symbol: "🔌",
    description: "Plugin/utility libraries"
  },
  question: {
    symbol: "💬",
    description: "Answering Questions"
  },
  review: {
    symbol: "👀",
    description: "Reviewed Pull Requests"
  },
  talk: {
    symbol: "📢",
    description: "Talks"
  },
  test: {
    symbol: "⚠️",
    description: "Tests",
    link: "%COMMITLINK%"
  },
  tool: {
    symbol: "🔧",
    description: "Tools"
  },
  translation: {
    symbol: "🌍",
    description: "Translation"
  },
  tutorial: {
    symbol: "✅",
    description: "Tutorials"
  },
  video: {
    symbol: "📹",
    description: "Videos"
  }
};

// -----------------------------------------------------------------------------

function getIcon(contribType) {
  if (DEBUG) {
    console.log(
      `\u001b[${31}m${"\n\nGETICON request:"}\u001b[${39}m ${JSON.stringify(
        contribType,
        null,
        4
      )}`
    );
  }
  let res = "";
  Object.keys(defaultTypes).forEach(key => {
    if (defaultTypes[key].description === contribType) {
      res = defaultTypes[key].symbol;
    }
  });
  return res;
}
function getContribShortName(contribType) {
  if (DEBUG) {
    console.log(
      `\u001b[${31}m${"\n\nGETICON request:"}\u001b[${39}m ${JSON.stringify(
        contribType,
        null,
        4
      )}`
    );
  }
  let res = "";
  Object.keys(defaultTypes).forEach(key => {
    if (defaultTypes[key].description === contribType) {
      res = key;
    }
  });
  return res;
}

// -----------------------------------------------------------------------------

function assembleContributors(contributors, pack, parsedPack) {
  if (DEBUG) {
    console.log(`\u001b[${33}m${"CALLED assembleContributors"}\u001b[${39}m`);
  }
  // action
  let res =
    "<!-- prettier-ignore-start -->\n<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->";
  const separator =
    "\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: |";
  for (let i = 0, len = contributors.length; i < len; i++) {
    // first assemble the title row which contains image and text underneath
    if (i % 7 === 0) {
      res += "\n";
    }
    res += `${i % 7 === 0 ? "" : " "}| [<img src="${
      contributors[i].avatar_url
    }" width="100px;"/><br /><sub><b>${
      contributors[i].name
    }</b></sub>](https://bitbucket.org/${contributors[i].login})<br />`;
    // foop through all contributors in package.json and find the current contributor,
    // that is, "contributors[i]". Once found, fetch its contents and list under the
    // already-assembled avatar & name rows.
    let contributionsContent = null;
    for (let y = pack.lect.contributors.length; y--; ) {
      const obj = pack.lect.contributors[y];
      if (obj.username === contributors[i].login) {
        contributionsContent = obj.contribution;
        break;
      }
    }
    if (contributionsContent) {
      if (DEBUG) {
        console.log(
          `\n\n\n\n\n\n${`\u001b[${33}m${"499contributionsContent"}\u001b[${39}m`} = ${JSON.stringify(
            contributionsContent,
            null,
            4
          )}`
        );
      }
      contributionsContent.forEach(contribValue => {
        let url;
        let contributionDescription;

        if (isStr(contribValue)) {
          contributionDescription = trim(contribValue, "* ");
          // URL depends on the type of contribution
          //
          // [🎨](#design-marcobiedermann "Design")

          if (
            contribValue === "Code" ||
            contribValue === "Documentation" ||
            contribValue === "Tests"
          ) {
            // linking to commits:
            url = `https://bitbucket.org/${parsedPack.user}/${
              parsedPack.project
            }/commits?author=${contributors[i].login.toLowerCase()}`;
          } else if (contribValue === "Bug reports") {
            // linking to issues:
            url = `https://bitbucket.org/${parsedPack.user}/${
              parsedPack.project
            }/issues?q=author%3A${contributors[i].login.toLowerCase()}`;
          } else {
            url = `#${getContribShortName(
              contribValue
            ).toLowerCase()}-${contributors[i].login.toLowerCase()}`;
          }
          //
        } else if (isObj(contribValue)) {
          contributionDescription = Object.keys(contribValue)[0];
          url = contribValue[Object.keys(contribValue)[0]];
        } else if (isArr(contribValue)) {
          contributionDescription = contribValue[0];
          url = contribValue[1];
        }

        // assemble icon:
        const icon = getIcon(contributionDescription);
        if (DEBUG) {
          console.log(
            `\u001b[${32}m${"----------------------------------------------------------------------"}\u001b[${39}m`
          );
        }
        if (DEBUG) {
          console.log(
            `${`\u001b[${33}m${"526 FINAL icon received from getIcon(): "}\u001b[${39}m`} ${JSON.stringify(
              icon,
              null,
              4
            )}`
          );
        }
        if (DEBUG) {
          console.log(
            `${`\u001b[${33}m${"527 FINAL url"}\u001b[${39}m`} = ${JSON.stringify(
              url,
              null,
              4
            )}`
          );
        }
        if (DEBUG) {
          console.log(
            `\u001b[${33}m${`528 ASSEMBLED: >>>${` [${icon}](${url} "${trim(
              contributionDescription,
              "* "
            )}")`}<<<`}\u001b[${39}m`
          );
        }

        res += ` [${icon}](${url} "${trim(contributionDescription, "* ")}")`;
      });

      // add the ending pipe at the end of the columns
      if ((i % 6 === 0 && i !== 0) || i === len - 1) {
        res += " |";
      }
    }
    // add header row before 8th floated user box, index 7
    if (i === 7) {
      res += separator;
    }
    if (len < 7 && i === len - 1) {
      let finalLine = "\n|";
      for (let y = len; y--; ) {
        finalLine += " :---: |";
      }
      res += finalLine;
    }
  }
  res += "\n<!-- ALL-CONTRIBUTORS-LIST:END -->\n<!-- prettier-ignore-end -->";
  return `${res}`;
}

// -----------------------------------------------------------------------------

function standardiseBools(astOrSomething) {
  astOrSomething = traverse(astOrSomething, (key, val) => {
    const current = val !== undefined ? val : key;
    if (!isArr(current) && !isObj(current)) {
      return !!current;
    }
    return current;
  });
  return astOrSomething;
}

// -----------------------------------------------------------------------------

// updates all paths with correct project.
// anticipates for the case where you just copied another library into this one
// and so your GitHub user is correct, just project name needs updating.
function normalisePackageJson(obj, gitHubUser, projName) {
  if (!isObj(obj)) {
    return obj;
  }

  objectPath.set(obj, "repository", {
    type: "git",
    url: `https://bitbucket.org/${gitHubUser}/${projName}.git`
  });

  objectPath.set(obj, "bugs", {
    url: `https://bitbucket.org/${gitHubUser}/${projName}/issues`
  });

  if (
    !objectPath.has(obj, "homepage") ||
    !isStr(obj.homepage) ||
    obj.homepage.includes("#readme")
  ) {
    objectPath.set(
      obj,
      "homepage",
      `https://bitbucket.org/${gitHubUser}/${projName}#readme`
    );
  }

  return obj;
}

// -----------------------------------------------------------------------------

module.exports = {
  resolveVars,
  extractSrc,
  removeRecognisedLintingBadges,
  replaceNpmInstallRow,
  replaceNpxRow,
  piecesHeadingIsNotAmongExcluded,
  extractStringUnderBadges,
  replaceRollupInfoTableAndItsHeader,
  parseReadme,
  getUserInfo,
  assembleRollupInfoTable,
  assembleContributors,
  standardiseBools,
  normalisePackageJson,
  contributionTypes: Object.keys(defaultTypes).map(
    key => defaultTypes[key].description
  )
};
