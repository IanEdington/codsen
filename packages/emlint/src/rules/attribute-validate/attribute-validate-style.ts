import { Linter, RuleObjType } from "../../linter";
import validateInlineStyle from "../../util/validateInlineStyle";

// rule: attribute-validate-style
// -----------------------------------------------------------------------------

function attributeValidateStyle(
  context: Linter,
  ...opts: string[]
): RuleObjType {
  return {
    attribute(node) {
      console.log(
        `███████████████████████████████████████ attributeValidateStyle() ███████████████████████████████████████`
      );
      console.log(
        `017 attribute-validate-style: ${`\u001b[${33}m${`opts`}\u001b[${39}m`} = ${JSON.stringify(
          opts,
          null,
          4
        )}`
      );

      if (node.attribName === "style") {
        // validate the parent
        if (
          [
            "base",
            "basefont",
            "head",
            "html",
            "meta",
            "param",
            "script",
            "style",
            "title",
          ].includes(node.parent.tagName)
        ) {
          context.report({
            ruleId: "attribute-validate-style",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: `Tag "${node.parent.tagName}" can't have attribute "${node.attribName}".`,
            fix: null,
          });
        }

        const errorArr = validateInlineStyle(
          node.attribValueRaw,
          node.attribValueStartsAt as number,
          {
            noTrailingSemi:
              Array.isArray(opts) && opts.includes("noTrailingSemi"),
          }
        );
        console.log(
          `057 received errorArr = ${JSON.stringify(errorArr, null, 4)}`
        );

        errorArr.forEach((errorObj) => {
          console.log(`061 RAISE ERROR`);
          context.report({ ...errorObj, ruleId: "attribute-validate-style" });
        });
      }
    },
  };
}

export default attributeValidateStyle;
