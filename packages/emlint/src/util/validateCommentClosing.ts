import splitByWhitespace from "./splitByWhitespace";
import { CommentToken } from "../../../codsen-tokenizer/src/util/util";
import { ErrorObj } from "./commonTypes";

function validateCommentClosing(token: CommentToken): ErrorObj[] {
  const reference = {
    simple: "-->",
    only: "<![endif]-->",
    not: "<!--<![endif]-->",
  };

  console.log(
    `013 validateCommentClosing(): ${`\u001b[${33}m${`token`}\u001b[${39}m`} = ${JSON.stringify(
      token,
      null,
      4
    )}`
  );

  // if all is fine, end quick
  if (
    (token.kind === "simple" && token.value === "-->") ||
    (token.kind === "only" && token.value === "<![endif]-->") ||
    (token.kind === "not" && token.value === "<!--<![endif]-->")
  ) {
    return [];
  }

  const errorArr: ErrorObj[] = [];

  // assemble string without whitespace:
  let valueWithoutWhitespace = "";

  // first, tackle any inner whitespace
  splitByWhitespace(
    token.value,
    ([charFrom, charTo]) => {
      valueWithoutWhitespace = `${valueWithoutWhitespace}${token.value.slice(
        charFrom,
        charTo
      )}`;
    },
    ([whitespaceFrom, whitespaceTo]) => {
      errorArr.push({
        ruleId: "comment-only-closing-malformed",
        idxFrom: token.start,
        idxTo: token.end,
        message: "Remove whitespace.",
        fix: {
          ranges: [[whitespaceFrom + token.start, whitespaceTo + token.start]],
        },
      });
    }
  );

  console.log(
    `057 ██ ${`\u001b[${33}m${`valueWithoutWhitespace`}\u001b[${39}m`} = ${JSON.stringify(
      valueWithoutWhitespace,
      null,
      4
    )}`
  );

  // if all it took was to remove some whitespace to get a correct value,
  // that's the end - return the "errorArr" with only whitespace ranges:
  if (
    (token.kind === "simple" && valueWithoutWhitespace === "-->") ||
    (token.kind === "only" && valueWithoutWhitespace === "<![endif]-->") ||
    (token.kind === "not" && valueWithoutWhitespace === "<!--<![endif]-->")
  ) {
    console.log(
      `072 validateCommentClosing(): ${`\u001b[${32}m${`RETURN`}\u001b[${39}m`}`
    );
    return errorArr;
  }

  // if processing continues, it means something more is wrong
  console.log(`078 validateCommentClosing(): something is wrong`);
  console.log(
    `080 validateCommentClosing(): errorArr so far: ${JSON.stringify(
      errorArr,
      null,
      4
    )}`
  );
  errorArr.push({
    idxFrom: token.start,
    idxTo: token.end,
    message: "Malformed closing comment tag.",
    fix: {
      ranges: [[token.start, token.end, (reference as any)[token.kind]]],
    },
  });

  return errorArr;
}

export default validateCommentClosing;
