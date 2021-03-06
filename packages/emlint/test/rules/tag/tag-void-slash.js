// rule: tag-void-slash
// -----------------------------------------------------------------------------

import tap from "tap";
import { Linter } from "../../../dist/emlint.esm";
import { applyFixes } from "../../../t-util/util";
// import { deepContains } from "ast-deep-contains");

// 1. no config
// -----------------------------------------------------------------------------

tap.test(
  `01 - ${`\u001b[${33}m${`no config`}\u001b[${39}m`} - slash present`,
  (t) => {
    const str = "<br/>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-void-slash": 2,
      },
    });
    t.strictSame(messages, [], "01.01");
    t.equal(applyFixes(str, messages), str, "01.02");
    t.end();
  }
);

tap.test(
  `02 - ${`\u001b[${33}m${`no config`}\u001b[${39}m`} - slash absent`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-void-slash": 2,
      },
    });
    t.match(
      messages,
      [
        {
          ruleId: "tag-void-slash",
          severity: 2,
          idxFrom: 3,
          idxTo: 3,
          line: 1,
          column: 4,
          message: "Missing slash.",
          fix: {
            ranges: [[3, 3, "/"]],
          },
        },
      ],
      "02.01"
    );
    t.equal(applyFixes(str, messages), "<br/>", "02.02");
    t.end();
  }
);

tap.test(
  `03 - ${`\u001b[${33}m${`no config`}\u001b[${39}m`} - with "tag-space-before-closing-slash"`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-space-before-closing-slash": 2,
        "tag-void-slash": 2,
      },
    });
    t.match(
      messages,
      [
        {
          ruleId: "tag-void-slash",
          severity: 2,
          idxFrom: 3,
          idxTo: 3,
          line: 1,
          column: 4,
          message: "Missing slash.",
          fix: {
            ranges: [[3, 3, "/"]],
          },
        },
      ],
      "03.01"
    );
    t.equal(applyFixes(str, messages), "<br/>", "03.02");
    t.end();
  }
);

tap.test(
  `04 - ${`\u001b[${33}m${`no config`}\u001b[${39}m`} - with grouped rule, "tag"`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        tag: 2,
      },
    });
    t.match(
      messages,
      [
        {
          ruleId: "tag-void-slash",
          severity: 2,
          idxFrom: 3,
          idxTo: 3,
          line: 1,
          column: 4,
          message: "Missing slash.",
          fix: {
            ranges: [[3, 3, "/"]],
          },
        },
      ],
      "04.01"
    );
    t.equal(applyFixes(str, messages), "<br/>", "04.02");
    t.end();
  }
);

tap.test(
  `05 - ${`\u001b[${33}m${`no config`}\u001b[${39}m`} - "tag-space-before-closing-slash"=always`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-space-before-closing-slash": [2, "always"],
        "tag-void-slash": 2,
      },
    });
    t.match(
      messages,
      [
        {
          ruleId: "tag-void-slash",
          severity: 2,
          idxFrom: 3,
          idxTo: 3,
          line: 1,
          column: 4,
          message: "Missing slash.",
          fix: {
            ranges: [[3, 3, " /"]],
          },
        },
      ],
      "05.01"
    );
    t.equal(applyFixes(str, messages), "<br />", "05.02");
    t.end();
  }
);

tap.test(
  `06 - ${`\u001b[${33}m${`no config`}\u001b[${39}m`} - "tag-space-before-closing-slash"=never`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-space-before-closing-slash": [2, "never"],
        "tag-void-slash": 2,
      },
    });
    t.match(
      messages,
      [
        {
          ruleId: "tag-void-slash",
          severity: 2,
          idxFrom: 3,
          idxTo: 3,
          line: 1,
          column: 4,
          message: "Missing slash.",
          fix: {
            ranges: [[3, 3, "/"]],
          },
        },
      ],
      "06.01"
    );
    t.equal(applyFixes(str, messages), "<br/>", "06.02");
    t.end();
  }
);

tap.test(
  `07 - ${`\u001b[${33}m${`no config`}\u001b[${39}m`} - "tag-space-before-closing-slash"=never, hardcoded void's default always`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-space-before-closing-slash": [2, "never"],
        "tag-void-slash": [2, "always"],
      },
    });
    t.match(
      messages,
      [
        {
          ruleId: "tag-void-slash",
          severity: 2,
          idxFrom: 3,
          idxTo: 3,
          line: 1,
          column: 4,
          message: "Missing slash.",
          fix: {
            ranges: [[3, 3, "/"]],
          },
        },
      ],
      "07.01"
    );
    t.equal(applyFixes(str, messages), "<br/>", "07.02");
    t.end();
  }
);

tap.test(
  `08 - ${`\u001b[${33}m${`no config`}\u001b[${39}m`} - both never`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-space-before-closing-slash": [2, "never"],
        "tag-void-slash": [2, "never"],
      },
    });
    t.strictSame(messages, [], "08.01");
    t.equal(applyFixes(str, messages), str, "08.02");
    t.end();
  }
);

// 02. with config
// -----------------------------------------------------------------------------

tap.test(
  `09 - ${`\u001b[${32}m${`with config`}\u001b[${39}m`} - slash absent, config=always`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-void-slash": [2, "always"],
      },
    });
    t.match(
      messages,
      [
        {
          ruleId: "tag-void-slash",
          severity: 2,
          idxFrom: 3,
          idxTo: 3,
          line: 1,
          column: 4,
          message: "Missing slash.",
          fix: {
            ranges: [[3, 3, "/"]],
          },
        },
      ],
      "09.01"
    );
    t.equal(applyFixes(str, messages), "<br/>", "09.02");
    t.end();
  }
);

tap.test(
  `10 - ${`\u001b[${32}m${`with config`}\u001b[${39}m`} - slash absent, config=never`,
  (t) => {
    const str = "<br>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-void-slash": [2, "never"],
      },
    });
    t.strictSame(messages, [], "10.01");
    t.equal(applyFixes(str, messages), str, "10.02");
    t.end();
  }
);

tap.test(
  `11 - ${`\u001b[${32}m${`with config`}\u001b[${39}m`} - slash present, config=never`,
  (t) => {
    const str = "<br/>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-void-slash": [2, "never"],
      },
    });
    t.match(
      messages,
      [
        {
          ruleId: "tag-void-slash",
          severity: 2,
          idxFrom: 3,
          idxTo: 4,
          line: 1,
          column: 4,
          message: "Remove the slash.",
          fix: {
            ranges: [[3, 4]],
          },
        },
      ],
      "11.01"
    );
    t.equal(applyFixes(str, messages), "<br>", "11.02");
    t.end();
  }
);

tap.test(
  `12 - ${`\u001b[${32}m${`with config`}\u001b[${39}m`} - slash present, config=always`,
  (t) => {
    const str = "<br/>";
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "tag-void-slash": [2, "always"],
      },
    });
    t.strictSame(messages, [], "12.01");
    t.equal(applyFixes(str, messages), str, "12.02");
    t.end();
  }
);
