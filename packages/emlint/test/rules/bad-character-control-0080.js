// avanotonly

// rule: bad-character-control-0080
// https://www.fileformat.info/info/unicode/char/0080/index.htm
// -----------------------------------------------------------------------------

import test from "ava";
import { Linter } from "../../dist/emlint.esm";
import deepContains from "ast-deep-contains";
import { applyFixes } from "../../t-util/util";

// -----------------------------------------------------------------------------

// 1. basic tests
test(`01.01 - detects two APPLICATION PROGRAM COMMAND characters`, t => {
  const str = "\u009Fdlkgjld\u009Fj";
  const linter = new Linter();
  const messages = linter.verify(str, {
    rules: {
      "bad-character-application-program-command": 2
    }
  });
  deepContains(
    messages,
    [
      {
        ruleId: "bad-character-application-program-command",
        severity: 2,
        idxFrom: 0,
        idxTo: 1,
        line: 1,
        column: 1, // remember columns numbers start from 1, not zero
        message: "Bad character - APPLICATION PROGRAM COMMAND.",
        fix: {
          ranges: [[0, 1]]
        }
      },
      {
        ruleId: "bad-character-application-program-command",
        severity: 2,
        idxFrom: 8,
        idxTo: 9,
        line: 1,
        column: 9, // remember columns numbers start from 1, not zero
        message: "Bad character - APPLICATION PROGRAM COMMAND.",
        fix: {
          ranges: [[8, 9]]
        }
      }
    ],
    t.is,
    t.fail
  );
  t.is(applyFixes(str, messages), "dlkgjldj");
});
