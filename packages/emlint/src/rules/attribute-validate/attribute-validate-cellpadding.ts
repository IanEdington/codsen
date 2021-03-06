import { Linter, RuleObjType } from "../../linter";

// rule: attribute-validate-cellspacing
// -----------------------------------------------------------------------------

import validateDigitAndUnit from "../../util/validateDigitAndUnit";

function attributeValidateCellpadding(context: Linter): RuleObjType {
  return {
    attribute(node) {
      console.log(
        `███████████████████████████████████████ attributeValidateCellpadding() ███████████████████████████████████████`
      );

      // console.log(
      //   `015 attributeValidateCellpadding(): node = ${JSON.stringify(node, null, 4)}`
      // );

      if (node.attribName === "cellpadding") {
        // validate the parent
        if (node.parent.tagName !== "table") {
          context.report({
            ruleId: "attribute-validate-cellpadding",
            idxFrom: node.attribStarts,
            idxTo: node.attribEnds,
            message: `Tag "${node.parent.tagName}" can't have attribute "${node.attribName}".`,
            fix: null,
          });
        }

        const errorArr = validateDigitAndUnit(
          node.attribValueRaw,
          node.attribValueStartsAt as number,
          {
            type: "integer",
            negativeOK: false,
            theOnlyGoodUnits: ["%"],
            badUnits: ["px"],
            customGenericValueError:
              "Should be integer, either no units or percentage.",
          }
        );
        console.log(
          `044 received errorArr = ${JSON.stringify(errorArr, null, 4)}`
        );

        errorArr.forEach((errorObj) => {
          console.log(`048 RAISE ERROR`);
          context.report({
            ...errorObj,
            ruleId: "attribute-validate-cellpadding",
          });
        });
      }
    },
  };
}

export default attributeValidateCellpadding;
