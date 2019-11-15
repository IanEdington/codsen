// rule: tag-space-before-closing-slash
// -----------------------------------------------------------------------------

// it flags up any tags which have whitespace between opening bracket and first
// tag name letter:
//
// < table>
// <   a href="">
// <\n\nspan>

import { left } from "string-left-right";

function tagSpaceBeforeClosingSlash(context, ...opts) {
  return {
    html: function(node) {
      console.log(`016 inside rule: node = ${JSON.stringify(node, null, 4)}`);
      const gapValue = context.str.slice(node.start + 1, node.tagNameStartAt);
      console.log(`018 gapValue = ${JSON.stringify(gapValue, null, 4)}`);

      console.log(
        `021 tagSpaceBeforeClosingSlash(): ${`\u001b[${33}m${`context.str[${node.tagNameStartAt}]`}\u001b[${39}m`} = ${JSON.stringify(
          context.str[node.tagNameStartAt],
          null,
          4
        )}`
      );
      console.log(
        `028 tagSpaceBeforeClosingSlash(): ${`\u001b[${33}m${`opts`}\u001b[${39}m`} = ${JSON.stringify(
          opts,
          null,
          4
        )}`
      );
      // settle the mode, is it "always" or a default, "never"
      let mode = "never";
      // opts array comes already sliced, without 1st element, so opts value
      // is 0th (and onwards if more)
      if (Array.isArray(opts) && ["always", "never"].includes(opts[0])) {
        mode = opts[0];
      }
      console.log(
        `042 tagSpaceBeforeClosingSlash(): ${`\u001b[${35}m${`calculated mode`}\u001b[${39}m`} = "${mode}"`
      );

      // PROCESSING:
      const closingBracketPos = node.end - 1;
      const slashPos = left(context.str, closingBracketPos);
      const leftOfSlashPos = left(context.str, slashPos);
      if (
        mode === "never" &&
        node.selfClosing &&
        context.str[slashPos] === "/" &&
        leftOfSlashPos < slashPos - 1
      ) {
        console.log(`055 whitespace present in front of closing slash!`);
        context.report({
          ruleId: "tag-space-before-closing-slash",
          message: "Bad whitespace.",
          idxFrom: leftOfSlashPos + 1,
          idxTo: slashPos,
          fix: { ranges: [[leftOfSlashPos + 1, slashPos]] }
        });
      } else if (
        mode === "always" &&
        node.selfClosing &&
        context.str[slashPos] === "/" &&
        leftOfSlashPos === slashPos - 1
      ) {
        console.log(`069 space missing in front of closing slash!`);
        context.report({
          ruleId: "tag-space-before-closing-slash",
          message: "Missing space.",
          idxFrom: slashPos,
          idxTo: slashPos,
          fix: { ranges: [[slashPos, slashPos, " "]] }
        });
      }
    }
  };
}

export default tagSpaceBeforeClosingSlash;
