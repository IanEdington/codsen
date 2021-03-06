import { Linter, RuleObjType } from "../../linter";
import { left } from "string-left-right";

// rule: tag-bad-self-closing
// -----------------------------------------------------------------------------

// flags up all self-closing non-void tags, for example: <table ... />

function tagBadSelfClosing(context: Linter): RuleObjType {
  return {
    tag(node) {
      console.log(
        `███████████████████████████████████████ tagBadSelfClosing() ███████████████████████████████████████`
      );
      console.log(
        `016 tagBadSelfClosing(): ${`\u001b[${33}m${`node`}\u001b[${39}m`} = ${JSON.stringify(
          node,
          null,
          4
        )}`
      );

      if (
        !node.void &&
        node.value.endsWith(">") &&
        node.value[left(node.value, node.value.length - 1) as number] === "/"
      ) {
        console.log(
          `029 tagBadSelfClosing(): ${`\u001b[${31}m${`BAD SELF-CLOSING SLASH!`}\u001b[${39}m`}`
        );
        const idxFrom =
          node.start +
          (left(
            node.value,
            left(node.value, node.value.length - 1) as number
          ) as number) +
          1;
        const idxTo = node.start + node.value.length - 1;

        console.log(
          `041 tagBadSelfClosing(): ${`\u001b[${33}m${`idxFrom`}\u001b[${39}m`} = ${JSON.stringify(
            idxFrom,
            null,
            4
          )}`
        );
        console.log(
          `048 tagBadSelfClosing(): ${`\u001b[${33}m${`idxTo`}\u001b[${39}m`} = ${JSON.stringify(
            idxTo,
            null,
            4
          )}`
        );
        context.report({
          ruleId: "tag-bad-self-closing",
          message: "Remove the slash.",
          idxFrom,
          idxTo,
          fix: { ranges: [[idxFrom, idxTo]] },
        });
      }
    },
  };
}

export default tagBadSelfClosing;
