import { Linter, RuleObjType } from "../../linter";

// rule: bad-character-control-0080
// -----------------------------------------------------------------------------

// Catches raw character "CONTROL" (hex 80):
// https://www.fileformat.info/info/unicode/char/0080/index.htm

function badCharacterControl0080(context: Linter): RuleObjType {
  return {
    character({ chr, i }) {
      if (chr.charCodeAt(0) === 128) {
        context.report({
          ruleId: "bad-character-control-0080",
          message: "Bad character - CONTROL.",
          idxFrom: i,
          idxTo: i + 1,
          fix: {
            ranges: [[i, i + 1]], // just delete it
          },
        });
      }
    },
  };
}

export default badCharacterControl0080;
