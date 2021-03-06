import tap from "tap";
import { find } from "../dist/ast-monkey.umd";

const input = {
  a1: {
    b1: "c1",
  },
  a2: {
    b2: "c2",
  },
  z1: {
    x1: "y1",
  },
};
const intended = [
  {
    index: 1,
    key: "a1",
    val: {
      b1: "c1",
    },
    path: [1],
  },
  {
    index: 3,
    key: "a2",
    val: {
      b2: "c2",
    },
    path: [3],
  },
];

tap.test("UMD build works fine", (t) => {
  t.strictSame(find(input, { key: "a*" }), intended, "01");
  t.end();
});
