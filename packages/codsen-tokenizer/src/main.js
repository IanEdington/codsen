import { matchRight } from "string-match-left-right";
import { left, right } from "string-left-right";
import isTagOpening from "is-html-tag-opening";
import isObj from "lodash.isplainobject";
import clone from "lodash.clonedeep";
import {
  // charSuitableForTagName,
  // isLowerCaseLetter,
  // isUppercaseLetter,
  // secondToLastChar,
  isLatinLetter,
  // isLowercase,
  flipEspTag,
  // secondChar,
  // firstChar,
  // lastChar,
  isStr,
  isNum
} from "./util";

const defaults = {
  reportProgressFunc: null,
  reportProgressFuncFrom: 0,
  reportProgressFuncTo: 100
};

// https://html.spec.whatwg.org/multipage/syntax.html#elements-2
const voidTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];

// contains all common templating language head/tail marker characters:
const espChars = `{}%-$_()*|`;

function tokenizer(str, cb, originalOpts) {
  //
  //
  //
  //
  //
  //
  //
  // INSURANCE
  // ---------------------------------------------------------------------------
  if (!isStr(str)) {
    if (str === undefined) {
      throw new Error(
        "codsen-tokenizer: [THROW_ID_01] the first input argument is completely missing! It should be given as string."
      );
    } else {
      throw new Error(
        `codsen-tokenizer: [THROW_ID_02] the first input argument must be string! It was given as "${typeof str}", equal to:\n${JSON.stringify(
          str,
          null,
          4
        )}`
      );
    }
  }
  if (typeof cb !== "function") {
    throw new Error(
      `codsen-tokenizer: [THROW_ID_03] the second input argument, callback function, should be a function but it was given as type ${typeof cb}, equal to ${JSON.stringify(
        cb,
        null,
        4
      )}`
    );
  }
  if (originalOpts && !isObj(originalOpts)) {
    throw new Error(
      `codsen-tokenizer: [THROW_ID_04] the third input argument, options object, should be a plain object but it was given as type ${typeof originalOpts}, equal to ${JSON.stringify(
        originalOpts,
        null,
        4
      )}`
    );
  }

  //
  //
  //
  //
  //
  //
  //
  // OPTS
  // ---------------------------------------------------------------------------

  const opts = Object.assign({}, defaults, originalOpts);
  if (
    opts.reportProgressFunc &&
    typeof opts.reportProgressFunc !== "function"
  ) {
    throw new TypeError(
      `codsen-tokenizer: [THROW_ID_05] opts.reportProgressFunc should be a function but it was given as :\n${JSON.stringify(
        opts.reportProgressFunc,
        null,
        4
      )} (${typeof opts.reportProgressFunc})`
    );
  }

  //
  //
  //
  //
  //
  //
  //
  // VARS
  // ---------------------------------------------------------------------------

  let currentPercentageDone;
  let lastPercentage = 0;
  const len = str.length;
  const midLen = Math.floor(len / 2);
  let doNothing; // normally set to a number, index until where to do nothing
  let styleStarts = false; // flag used to instruct content after <style> to toggle type="css"

  // when we compile the token, we fill this object:
  let token = {};
  const tokenDefault = {
    type: null, // html, css, js, text, esp
    start: null,
    end: null,
    tail: null, // used to store the guessed ESP token's/tag's tail
    kind: null
  };
  function tokenReset() {
    // object-assign is basically cloning - objects are passed by reference,
    // we can't risk mutating the default object:
    token = Object.assign({}, tokenDefault);
  }
  // PS. we need this contraption in order to keep a single source of truth
  // of the token format - we'll improve and change the format of the default
  // object throughout the releases - it's best when its format comes from single
  // place, in this case, "tokenDefault".

  // Initial reset:
  tokenReset();

  //
  //
  //
  //
  //
  //
  //
  // INNER FUNCTIONS
  // ---------------------------------------------------------------------------

  // When we enter the double quotes or any other kind of "layer", we need to
  // ignore all findings until the "layer" is exited. Here we keep note of the
  // closing strings which exit the current "layer". There can be many of them,
  // nested and escaped and so on.
  const layers = [];
  // example of contents:
  // [
  //     {
  //         type: "simple",
  //         value: "}",
  //     },
  //     {
  //         type: "esp",
  //         value: "%}"
  //     }
  // ]
  // there can be two types of layer values: simple strings to match html/css
  // token types and complex, to match esp tokens heuristically, where we don't
  // know exact ESP tails but we know set of characters that suspected "tail"
  // should match.
  //
  function matchLayerLast(str, i) {
    if (!layers.length) {
      return false;
    } else if (layers[layers.length - 1].type === "simple") {
      return str[i] === layers[layers.length - 1].value;
    } else if (layers[layers.length - 1].type === "esp") {
      if (!espChars.includes(str[i])) {
        return false;
      }
      // so the first character is from ESP tags list
      // 1. extract esp tag lump
      let wholeEspTagLump = "";
      const len = str.length;
      for (let y = i; y < len; y++) {
        if (espChars.includes(str[y])) {
          wholeEspTagLump = wholeEspTagLump + str[y];
        } else {
          break;
        }
      }
      console.log(`206 wholeEspTagLump = ${wholeEspTagLump}`);
      // match
      // every character from the last "layers" complex-type entry must be
      // present in the extracted lump
      return layers[layers.length - 1].value
        .split("")
        .every(char => wholeEspTagLump.includes(char));
    }
  }

  function pingcb(incomingToken) {
    console.log(`217 PING cb() with ${JSON.stringify(incomingToken, null, 4)}`);
    cb(clone(incomingToken));
    // reset
    tokenReset();
  }

  function dumpCurrentToken(token, i) {
    console.log(
      `225 ${`\u001b[${35}m${`dumpCurrentToken()`}\u001b[${39}m`}; incoming token=${JSON.stringify(
        token,
        null,
        0
      )}`
    );
    // let's ensure it was not CSS with trailing whitespace, because now is the
    // time to separate it and report it as a standalone token.
    if (
      token.type !== "text" &&
      token.start !== null &&
      str[i - 1] &&
      !str[i - 1].trim().length
    ) {
      console.log(`239 this token indeed had trailing whitespace`);
      // separate that trailing space
      token.end = left(str, i) + 1;
      console.log(
        `243 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.end`}\u001b[${39}m`} = ${
          token.end
        }`
      );
      pingcb(token);
      token.start = left(str, i) + 1;
      token.type = "text";
      console.log(
        `251 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.start`}\u001b[${39}m`} = ${
          token.start
        }; ${`\u001b[${33}m${`token.type`}\u001b[${39}m`} = ${token.type}`
      );
    }

    // if a token is already being recorded, end it
    if (token.start !== null) {
      token.end = i;
      console.log(
        `261 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.end`}\u001b[${39}m`} = ${
          token.end
        }; then PING CB()`
      );
      pingcb(token);
    }
  }

  function initHtmlToken() {
    token = Object.assign(
      {
        tagNameStartAt: null,
        tagNameEndAt: null,
        tagName: null,
        recognised: null,
        closing: false,
        void: false,
        pureHTML: true, // meaning there are no esp bits
        esp: []
      },
      token
    );
  }

  //
  //
  //
  //
  //
  //
  //
  // THE MAIN LOOP
  // ---------------------------------------------------------------------------

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
    // -------------------------------------------------------------------------
    console.log(
      `\u001b[${36}m${`===============================`}\u001b[${39}m \u001b[${35}m${`str[ ${i} ] = ${
        str[i] && str[i].trim().length
          ? str[i]
          : JSON.stringify(str[i], null, 0)
      }`}\u001b[${39}m \u001b[${36}m${`===============================`}\u001b[${39}m\n`
    );

    // Progress:
    // -------------------------------------------------------------------------
    if (opts.reportProgressFunc) {
      if (len > 1000 && len < 2000) {
        if (i === midLen) {
          opts.reportProgressFunc(
            Math.floor(
              (opts.reportProgressFuncTo - opts.reportProgressFuncFrom) / 2
            )
          );
        }
      } else if (len >= 2000) {
        // defaults:
        // opts.reportProgressFuncFrom = 0
        // opts.reportProgressFuncTo = 100

        currentPercentageDone =
          opts.reportProgressFuncFrom +
          Math.floor(
            (i / len) *
              (opts.reportProgressFuncTo - opts.reportProgressFuncFrom)
          );

        if (currentPercentageDone !== lastPercentage) {
          lastPercentage = currentPercentageDone;
          opts.reportProgressFunc(currentPercentageDone);
          console.log(`342 DONE ${currentPercentageDone}%`);
        }
      }
    }

    // turn off doNothing if marker passed
    // -------------------------------------------------------------------------

    if (Number.isInteger(doNothing) && i >= doNothing) {
      doNothing = false;
      console.log(`352 TURN OFF doNothing`);
    }

    if (token.end && token.end === i) {
      // if value was captured from the past, push it now
      console.log(`357 call dumpCurrentToken()`);
      if (token.kind === "style") {
        styleStarts = true;
      }
      // we need to retain the information after tag was dumped to cb() and wiped
      dumpCurrentToken(token, i);
    }

    //
    //
    //
    //
    //                    MIDDLE
    //
    //
    //
    //

    // record "layers" like entering double quotes
    // -------------------------------------------------------------------------
    if (
      !doNothing &&
      ["html"].includes(token.type) &&
      [`"`, `'`].includes(str[i])
    ) {
      if (matchLayerLast(str, i)) {
        // maybe it's the closing counterpart?
        layers.pop();
        console.log(`385 ${`\u001b[${32}m${`POP`}\u001b[${39}m`} layers`);
        console.log(
          `387 now ${`\u001b[${33}m${`layers`}\u001b[${39}m`} = ${JSON.stringify(
            layers,
            null,
            4
          )}`
        );
      } else if (!layers.length || layers[layers.length - 1].type !== "esp") {
        // it's opening then
        // but push only if there are no esp heads in the last position.
        // The idea is, ESP tags are complex, in many cases there's no more
        // point tracking pairs of something - quotes might be used as strings
        // for example, like "'" and in such case you wouldn't find the closing
        // single quote. Solution is to skip "layer" recording until ESP tails
        // are found.
        layers.push({
          type: "simple",
          value: str[i]
        });
        console.log(
          `406 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${JSON.stringify(
            {
              type: "simple",
              value: str[i]
            },
            null,
            4
          )}`
        );
        console.log(
          `416 now ${`\u001b[${33}m${`layers`}\u001b[${39}m`} = ${JSON.stringify(
            layers,
            null,
            4
          )}`
        );
      }
    }

    // catch the beginning of a token
    // -------------------------------------------------------------------------
    // below, part:
    // (token.type !== "esp" || token.tail.includes(str[i]))
    // means that we won't end ESP token and start HTML token unless anticipated tail
    // character is matched

    if (!doNothing) {
      console.log(`433 FIY, layers.length = ${layers.length}`);
      if (
        !layers.length &&
        str[i] === "<" &&
        (isTagOpening(str, i) ||
          matchRight(str, i, ["!--", "!doctype", "?xml"], { i: true })) &&
        (token.type !== "esp" || token.tail.includes(str[i]))
      ) {
        console.log(`441 html tag opening`);

        if (token.type) {
          dumpCurrentToken(token, i);
        }

        token.start = i;
        token.type = "html";

        console.log(
          `451 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.start`}\u001b[${39}m`} = ${
            token.start
          }; ${`\u001b[${33}m${`token.type`}\u001b[${39}m`} = ${token.type}`
        );

        // add other HTML-specific keys onto the object
        initHtmlToken();

        if (matchRight(str, i, "!--")) {
          token.kind = "comment";
          console.log(
            `462 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.kind`}\u001b[${39}m`} = ${
              token.kind
            }`
          );
        } else if (matchRight(str, i, "!doctype", { i: true })) {
          token.kind = "doctype";
          console.log(
            `469 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.kind`}\u001b[${39}m`} = ${
              token.kind
            }`
          );
        } else if (matchRight(str, i, "?xml", { i: true })) {
          token.kind = "xml";
          console.log(
            `476 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.kind`}\u001b[${39}m`} = ${
              token.kind
            }`
          );
        } else if (
          matchRight(str, i, "style", { i: true, trimCharsBeforeMatching: "/" })
        ) {
          token.kind = "style";
          console.log(
            `485 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.kind`}\u001b[${39}m`} = ${
              token.kind
            }`
          );
        }
      } else if (
        !(token.type === "html" && token.kind === "comment") &&
        espChars.includes(str[i]) &&
        str[i + 1] &&
        espChars.includes(str[i + 1]) &&
        !(str[i] === "-" && str[i + 1] === "-")
      ) {
        console.log(`497 ESP tag detected`);
        // we don't look for esp tags in HTML comments because conditionals
        // often have complex contraptions with brackets and pipes that are
        // difficult to catch them all reliably.

        // extract the tag opening and guess the closing judging from it
        let wholeEspTagLump = "";
        for (let y = i; y < len; y++) {
          if (espChars.includes(str[y])) {
            wholeEspTagLump = wholeEspTagLump + str[y];
          } else {
            break;
          }
        }
        console.log(
          `512 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} wholeEspTagLump = ${wholeEspTagLump}`
        );
        console.log(
          `515 FIY, ${`\u001b[${33}m${`layers`}\u001b[${39}m`} = ${JSON.stringify(
            layers,
            null,
            4
          )}`
        );

        if (!["html", "esp"].includes(token.type)) {
          console.log("523");
          dumpCurrentToken(token, i);

          token.start = i;
          token.type = "esp";
          console.log(
            `529 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.start`}\u001b[${39}m`} = ${
              token.start
            }; ${`\u001b[${33}m${`token.type`}\u001b[${39}m`} = ${token.type}`
          );
          doNothing = i + wholeEspTagLump.length;
          console.log(
            `535 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${31}m${`doNothing`}\u001b[${39}m`} = ${doNothing}`
          );
          token.tail = flipEspTag(wholeEspTagLump);
          console.log(
            `539 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.tail`}\u001b[${39}m`} = ${
              token.tail
            }`
          );
        } else if (token.type === "html") {
          console.log("544");
          // maybe it's closing part of a set?
          if (matchLayerLast(str, i)) {
            layers.pop();
            console.log(`548 ${`\u001b[${32}m${`POP`}\u001b[${39}m`} layers`);
          } else {
            console.log(`550 ESP tag within HTML tag`);
            layers.push({
              type: "esp",
              value: flipEspTag(wholeEspTagLump)
            });
            console.log(
              `556 ${`\u001b[${32}m${`PUSH`}\u001b[${39}m`} ${JSON.stringify(
                {
                  type: "esp",
                  value: flipEspTag(wholeEspTagLump)
                },
                null,
                4
              )}`
            );
            console.log(
              `566 ${`\u001b[${33}m${`layers`}\u001b[${39}m`} = ${JSON.stringify(
                layers,
                null,
                4
              )}`
            );
          }
        } else {
          console.log("574");
        }
      } else if (token.start === null || token.end === i) {
        if (styleStarts) {
          console.log(`578`);
          // 1. if there's whitespace, ping it as text
          if (!str[i].trim().length) {
            token.start = i;
            token.type = "text";
            token.end = right(str, i) || str.length;
            console.log(
              `585 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.start`}\u001b[${39}m`} = ${
                token.start
              }; ${`\u001b[${33}m${`token.end`}\u001b[${39}m`} = ${
                token.end
              }; ${`\u001b[${33}m${`token.type`}\u001b[${39}m`} = ${token.type}`
            );
            pingcb(token);

            // consider <style> ...  EOL - nothing inside, whitespace leading to
            // end of the string
            if (right(str, i)) {
              token.start = right(str, i);
              token.type = "css";
              console.log(
                `599 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.start`}\u001b[${39}m`} = ${
                  token.start
                }; ${`\u001b[${33}m${`token.type`}\u001b[${39}m`} = ${
                  token.type
                }`
              );

              doNothing = right(str, i);
              console.log(
                `608 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${31}m${`doNothing`}\u001b[${39}m`} = ${doNothing}`
              );
            }
          } else {
            // css starts with away after opening tag
            token.start = i;
            token.type = "css";
            console.log(
              `616 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.start`}\u001b[${39}m`} = ${
                token.start
              }; ${`\u001b[${33}m${`token.type`}\u001b[${39}m`} = ${token.type}`
            );
          }
        } else {
          // finally, the last default type is "text"
          token.start = i;
          console.log(
            `625 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.start`}\u001b[${39}m`} = ${
              token.start
            }`
          );
          token.type = "text";
          console.log(
            `631 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.type`}\u001b[${39}m`} = ${
              token.type
            }`
          );
        }
      }

      // END OF if (!doNothing)
    }

    // catch the ending of a token
    // -------------------------------------------------------------------------
    if (!doNothing) {
      if (token.type === "html" && !layers.length && str[i] === ">") {
        token.end = i + 1;
        console.log(
          `647 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.end`}\u001b[${39}m`} = ${
            token.end
          }`
        );
      } else if (
        token.type === "esp" &&
        token.end === null &&
        isStr(token.tail) &&
        token.tail.includes(str[i])
      ) {
        console.log(`657 POSSIBLE ESP TAILS`);
        // extract the whole lump of ESP tag characters:
        let wholeEspTagClosing = "";
        for (let y = i; y < len; y++) {
          if (espChars.includes(str[y])) {
            wholeEspTagClosing = wholeEspTagClosing + str[y];
          } else {
            break;
          }
        }
        console.log(`667 wholeEspTagClosing = ${wholeEspTagClosing}`);

        token.end = i + wholeEspTagClosing.length;
        console.log(
          `671 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.end`}\u001b[${39}m`} = ${
            token.end
          }`
        );
        doNothing = i + wholeEspTagClosing.length;
        console.log(
          `677 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${31}m${`doNothing`}\u001b[${39}m`} = ${doNothing}`
        );
      }
      // END OF if (!doNothing)
    }

    // Catch the end of a tag name
    // -------------------------------------------------------------------------

    if (
      token.type === "html" &&
      isNum(token.tagNameStartAt) &&
      !isNum(token.tagNameEndAt)
    ) {
      if (!isLatinLetter(str[i])) {
        token.tagNameEndAt = i;
        console.log(
          `694 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.tagNameEndAt`}\u001b[${39}m`} = ${
            token.tagNameEndAt
          }`
        );

        token.tagName = str.slice(token.tagNameStartAt, i);
        console.log(
          `701 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.tagName`}\u001b[${39}m`} = ${
            token.tagName
          }`
        );

        // We evaluate self-closing tags not by presence of slash but evaluating
        // is the tag name among known self-closing tags. This way, we can later
        // catch and fix missing closing slashes.
        if (voidTags.includes(token.tagName)) {
          token.void = true;
          console.log(
            `712 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.void`}\u001b[${39}m`} = ${
              token.void
            }`
          );
        }
      }
    }

    // Catch the start of a tag name:
    // -------------------------------------------------------------------------

    if (
      token.type === "html" &&
      !isNum(token.tagNameStartAt) &&
      isNum(token.start) &&
      token.start < i
    ) {
      // MULTIPLE ENTRY!
      // Consider closing tag's slashes and tag name itself.

      if (str[i] === "/") {
        token.closing = true;
        console.log(
          `735 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.closing`}\u001b[${39}m`} = ${
            token.closing
          }`
        );
      } else if (isLatinLetter(str[i])) {
        token.tagNameStartAt = i;
        console.log(
          `742 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.tagNameStartAt`}\u001b[${39}m`} = ${
            token.tagNameStartAt
          }`
        );
        // if by now closing marker is still null, set it to false - there
        // won't be any closing slashes between opening bracket and tag name
        if (!token.closing) {
          token.closing = false;
          console.log(
            `751 ${`\u001b[${32}m${`SET`}\u001b[${39}m`} ${`\u001b[${33}m${`token.closing`}\u001b[${39}m`} = ${
              token.closing
            }`
          );
        }
      } else {
        // TODO - tag opening followed by not-a-letter?
        // <?a>
      }
    }

    //
    //
    //
    //
    //                    BOTTOM
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
    // catch end of the string
    // -------------------------------------------------------------------------

    // notice there's no "doNothing"
    if (!str[i + 1] && token.start !== null) {
      token.end = i + 1;
      pingcb(token);
    }

    //
    //
    //
    //
    //
    //
    //
    // logging:
    // -------------------------------------------------------------------------

    console.log(
      `${`\u001b[${90}m${`==========================================\ntoken: ${JSON.stringify(
        token,
        null,
        0
      )}${
        layers.length ? `\nlayers: ${JSON.stringify(layers, null, 0)}` : ""
      }`}\u001b[${39}m`}${
        doNothing
          ? `\n${`\u001b[${31}m${`DO NOTHING UNTIL ${doNothing}`}\u001b[${39}m`}`
          : ""
      }`
    );
  }
}

// -----------------------------------------------------------------------------

export default tokenizer;
