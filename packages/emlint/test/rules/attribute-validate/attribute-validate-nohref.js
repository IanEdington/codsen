const t = require("tap");
const { Linter } = require("../../../dist/emlint.cjs");
const { applyFixes } = require("../../../t-util/util");

// 01. validation
// -----------------------------------------------------------------------------

t.test(
  `01.01 - ${`\u001b[${34}m${`validation`}\u001b[${39}m`} - no nohref, error level 0`,
  t => {
    const str = `<area><img>`; // <---- deliberately a tag names of both kinds, suitable and unsuitable
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 0
      }
    });
    t.equal(applyFixes(str, messages), str);
    t.same(messages, []);
    t.end();
  }
);

t.test(
  `01.02 - ${`\u001b[${34}m${`validation`}\u001b[${39}m`} - no nohref, error level 1`,
  t => {
    const str = `<area><img>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 1
      }
    });
    t.equal(applyFixes(str, messages), str);
    t.same(messages, []);
    t.end();
  }
);

t.test(
  `01.03 - ${`\u001b[${34}m${`validation`}\u001b[${39}m`} - no nohref, error level 2`,
  t => {
    const str = `<area><img>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 2
      }
    });
    t.equal(applyFixes(str, messages), str);
    t.same(messages, []);
    t.end();
  }
);

t.only(
  `01.04 - ${`\u001b[${34}m${`validation`}\u001b[${39}m`} - healthy img`,
  t => {
    const str = `<area nohref>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 2
      }
    });
    t.equal(applyFixes(str, messages), str);
    t.same(messages, []);
    t.end();
  }
);

// 02. wrong parent tag
// -----------------------------------------------------------------------------

t.test(
  `02.01 - ${`\u001b[${35}m${`parent`}\u001b[${39}m`} - recognised tag`,
  t => {
    const str = `<div nohref>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 2
      }
    });
    // can't fix:
    t.equal(applyFixes(str, messages), str);
    t.match(messages, [
      {
        ruleId: "attribute-validate-nohref",
        idxFrom: 5,
        idxTo: 11,
        message: `Tag "div" can't have this attribute.`,
        fix: null
      }
    ]);
    t.end();
  }
);

t.test(
  `02.02 - ${`\u001b[${35}m${`parent`}\u001b[${39}m`} - unrecognised tag`,
  t => {
    const str = `<zzz nohref class="yyy">`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 2
      }
    });
    // can't fix:
    t.equal(applyFixes(str, messages), str);
    t.match(messages, [
      {
        ruleId: "attribute-validate-nohref",
        idxFrom: 5,
        idxTo: 11,
        message: `Tag "zzz" can't have this attribute.`,
        fix: null
      }
    ]);
    t.end();
  }
);

// 03. wrong value
// -----------------------------------------------------------------------------

t.test(
  `03.01 - ${`\u001b[${35}m${`parent`}\u001b[${39}m`} - boolean value`,
  t => {
    const str = `<area nohref="true">`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 2
      }
    });
    // can fix:
    t.equal(applyFixes(str, messages), `<area nohref>`);
    t.match(messages, [
      {
        ruleId: "attribute-validate-nohref",
        idxFrom: 12,
        idxTo: 19,
        message: `Should have no value.`,
        fix: {
          ranges: [[12, 19]]
        }
      }
    ]);
    t.end();
  }
);

t.test(
  `03.02 - ${`\u001b[${35}m${`parent`}\u001b[${39}m`} - boolean value`,
  t => {
    const str = `<area nohref=true>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 2
      }
    });
    // can fix:
    t.equal(applyFixes(str, messages), `<area nohref>`);
    t.match(messages, [
      {
        ruleId: "attribute-validate-nohref",
        idxFrom: 12,
        idxTo: 17,
        message: `Should have no value.`,
        fix: {
          ranges: [[12, 17]]
        }
      }
    ]);
    t.end();
  }
);

t.test(
  `03.03 - ${`\u001b[${35}m${`parent`}\u001b[${39}m`} - empty value`,
  t => {
    const str = `<area nohref="">`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 2
      }
    });
    // can't fix:
    t.equal(applyFixes(str, messages), `<area nohref>`);
    t.match(messages, [
      {
        ruleId: "attribute-validate-nohref",
        idxFrom: 12,
        idxTo: 15,
        message: `Should have no value.`,
        fix: {
          ranges: [[12, 15]]
        }
      }
    ]);
    t.end();
  }
);

t.test(
  `03.04 - ${`\u001b[${35}m${`parent`}\u001b[${39}m`} - value missing, equal present`,
  t => {
    const str = `<area nohref=>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": 2
      }
    });
    // can't fix:
    t.equal(applyFixes(str, messages), `<area nohref>`);
    t.match(messages, [
      {
        ruleId: "attribute-validate-nohref",
        idxFrom: 12,
        idxTo: 13,
        message: `Should have no value.`,
        fix: {
          ranges: [[12, 13]]
        }
      }
    ]);
    t.end();
  }
);

// 04. XHTML
// -----------------------------------------------------------------------------

t.test(
  `04.01 - ${`\u001b[${34}m${`XHTML`}\u001b[${39}m`} - healthy nohref checkbox, as HTML`,
  t => {
    const str = `<area nohref>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": [2, "xhtml"]
      }
    });
    // can fix:
    t.equal(applyFixes(str, messages), `<area nohref="nohref">`);
    t.match(messages, [
      {
        ruleId: "attribute-validate-nohref",
        idxFrom: 6,
        idxTo: 12,
        message: `It's XHTML, add value, ="nohref".`,
        fix: {
          ranges: [[12, 12, `="nohref"`]]
        }
      }
    ]);
    t.end();
  }
);

t.test(
  `04.03 - ${`\u001b[${34}m${`XHTML`}\u001b[${39}m`} - missing after equal, as HTML`,
  t => {
    const str = `<area nohref=/>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": [2, "xhtml"]
      }
    });
    t.equal(applyFixes(str, messages), `<area nohref="nohref"/>`);
    t.end();
  }
);

t.test(
  `04.04 - ${`\u001b[${34}m${`XHTML`}\u001b[${39}m`} - closing quote and content missing, as HTML`,
  t => {
    const str = `<area nohref =">`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": [2, "xhtml"]
      }
    });
    t.match(messages[0].fix.ranges, [[12, 15, `="nohref"`]]);
    t.equal(applyFixes(str, messages), `<area nohref="nohref">`);
    t.end();
  }
);

t.test(
  `04.05 - ${`\u001b[${34}m${`XHTML`}\u001b[${39}m`} - double quotes, no content, as HTML`,
  t => {
    const str = `<area nohref=""/>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": [2, "xhtml"]
      }
    });
    t.equal(applyFixes(str, messages), `<area nohref="nohref"/>`);
    t.end();
  }
);

t.test(
  `04.06 - ${`\u001b[${34}m${`XHTML`}\u001b[${39}m`} - single quotes, no content, as HTML`,
  t => {
    const str = `<area nohref=''/>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": [2, "xhtml"]
      }
    });
    t.equal(applyFixes(str, messages), `<area nohref='nohref'/>`);
    t.end();
  }
);

t.test(
  `04.07 - ${`\u001b[${34}m${`XHTML`}\u001b[${39}m`} - quotes with content missing, as HTML`,
  t => {
    const str = `<area nohref='>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": [2, "xhtml"]
      }
    });
    t.equal(applyFixes(str, messages), `<area nohref='nohref'>`);
    t.end();
  }
);

t.test(
  `04.08 - ${`\u001b[${34}m${`XHTML`}\u001b[${39}m`} - equal missing, otherwise healthy HTML`,
  t => {
    const str = `<area nohref"nohref"/>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": [2, "xhtml"]
      }
    });
    t.equal(applyFixes(str, messages), `<area nohref="nohref"/>`);
    t.end();
  }
);

t.test(
  `04.09 - ${`\u001b[${34}m${`XHTML`}\u001b[${39}m`} - equal missing, otherwise healthy HTML`,
  t => {
    const str = `<area nohref'nohref'/>`;
    const linter = new Linter();
    const messages = linter.verify(str, {
      rules: {
        "attribute-validate-nohref": [2, "xhtml"]
      }
    });
    t.equal(applyFixes(str, messages), `<area nohref='nohref'/>`);
    t.end();
  }
);