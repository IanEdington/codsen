import { Linter, RuleObjType } from "../../linter";

// rule: attribute-validate-cite
// -----------------------------------------------------------------------------

import validateUri from "../../util/validateUri";

function attributeValidateCite(context: Linter): RuleObjType {
  return {
    attribute(node) {
      console.log(
        `███████████████████████████████████████ attributeValidateCite() ███████████████████████████████████████`
      );

      console.log(
        `016 attributeValidateCite(): node = ${JSON.stringify(node, null, 4)}`
      );

      if (node.attribName === "cite") {
        // validate the parent
        if (!["blockquote", "q", "del", "ins"].includes(node.parent.tagName)) {
          context.report({
            ruleId: "attribute-validate-cite",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: `Tag "${node.parent.tagName}" can't have attribute "${node.attribName}".`,
            fix: null,
          });
        } else {
          // Call validation upon the whole attribute's value. Validator includes
          // whitespace checks.
          validateUri(node.attribValueRaw, {
            offset: node.attribValueStartsAt as number,
            multipleOK: false,
          }).forEach((errorObj) => {
            console.log(`036 RAISE ERROR`);
            context.report({ ...errorObj, ruleId: "attribute-validate-cite" });
          });
        }
      }
    },
  };
}

export default attributeValidateCite;
