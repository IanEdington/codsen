import tap from "tap";
import { fixEnt as fix } from "../dist/string-fix-broken-named-entities.esm";

tap.test(
  `01 - ${`\u001b[${35}m${`throws`}\u001b[${39}m`} - 1st input arg is wrong`,
  (t) => {
    t.doesNotThrow(() => {
      fix("");
    }, "01.01");
    t.throws(() => {
      fix();
    }, /THROW_ID_01/);

    t.throws(() => {
      fix(true);
    }, /THROW_ID_01/);

    t.throws(() => {
      fix(0);
    }, /THROW_ID_01/);

    t.throws(() => {
      fix(1);
    }, /THROW_ID_01/);

    t.throws(() => {
      fix(null);
    }, /THROW_ID_01/);
    t.end();
  }
);

tap.test(
  `02 - ${`\u001b[${35}m${`throws`}\u001b[${39}m`} - 2nd input arg is wrong`,
  (t) => {
    t.throws(() => {
      fix("aaa", "bbb");
    }, /THROW_ID_02/);

    t.throws(() => {
      fix("aaa", true);
    }, /THROW_ID_02/);

    // does not throw on falsey:
    t.doesNotThrow(() => {
      fix("zzz", {});
    }, "02.03");
    t.doesNotThrow(() => {
      fix("zzz", undefined);
    }, "02.04");
    t.end();
  }
);

tap.test(
  `03 - ${`\u001b[${35}m${`throws`}\u001b[${39}m`} - opts.cb is not function`,
  (t) => {
    t.throws(() => {
      fix("aaa", { cb: "bbb" });
    }, /THROW_ID_03/);
    t.end();
  }
);

tap.test(
  `04 - ${`\u001b[${35}m${`throws`}\u001b[${39}m`} - opts.entityCatcherCb is not function`,
  (t) => {
    t.throws(() => {
      fix("aaa", { entityCatcherCb: "bbb" });
    }, /THROW_ID_04/);
    t.end();
  }
);

tap.test(
  `05 - ${`\u001b[${35}m${`throws`}\u001b[${39}m`} - opts.progressFn is not function`,
  (t) => {
    t.throws(() => {
      fix("aaa", { progressFn: "bbb" });
    }, /THROW_ID_05/);
    t.end();
  }
);
