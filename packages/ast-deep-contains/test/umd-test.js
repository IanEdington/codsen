import tap from "tap";
import { deepContains } from "../dist/ast-deep-contains.umd";

tap.test("UMD build works fine", (t) => {
  const gathered = [];
  const errors = [];

  deepContains(
    { a: "1", b: "2", c: "3" },
    { a: "1", b: "2" },
    (leftSideVal, rightSideVal) => {
      gathered.push([leftSideVal, rightSideVal]);
    },
    (err) => {
      errors.push(err);
    }
  );

  t.strictSame(
    gathered,
    [
      ["1", "1"],
      ["2", "2"],
    ],
    "01.01"
  );
  t.strictSame(errors, [], "01.02");
  t.end();
});
