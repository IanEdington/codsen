import { lint } from "../dist/emlint.esm";
import apply from "ranges-apply";
import { c } from "../t-util/util";
import test from "ava";

const charactersToTest = [
  "null",
  "start-of-heading",
  "start-of-text",
  "end-of-text",
  "end-of-transmission",
  "enquiry",
  "acknowledge",
  "bell",
  "backspace",
  "character-tabulation",
  "line-feed",
  "line-tabulation",
  "form-feed",
  "carriage-return",
  "shift-out",
  "shift-in",
  "data-link-escape",
  "device-control-one",
  "device-control-two",
  "device-control-three",
  "device-control-four",
  "negative-acknowledge",
  "synchronous-idle",
  "end-of-transmission-block",
  "cancel",
  "end-of-medium",
  "substitute",
  "escape",
  "information-separator-four",
  "information-separator-three",
  "information-separator-two",
  "information-separator-one"
];

test(`XX - ASCII 0-31`, t => {
  charactersToTest.forEach((characterStr, idx) => {
    if (idx !== 9 && idx !== 10 && idx !== 13) {
      // 9 = tab, 10 = LF, 13 = CR
      const bad1 = String.fromCharCode(idx);
      const res1 = lint(bad1);
      t.is(
        res1.issues[0].name,
        `bad-character-${characterStr}`,
        `02.${String(idx).length === 1 ? `0${idx}` : idx}.01`
      );
      t.deepEqual(
        res1.issues[0].position,
        [[0, 1]],
        `02.${String(idx).length === 1 ? `0${idx}` : idx}.02`
      );
      t.is(
        apply(bad1, res1.fix),
        "",
        `02.${String(idx).length === 1 ? `0${idx}` : idx}.03`
      );

      const bad2 = `aaaaa\n\n\n${bad1}bbb`;
      const res2 = lint(bad2);
      t.is(
        res2.issues[0].name,
        `bad-character-${characterStr}`,
        `02.${String(idx).length === 1 ? `0${idx}` : idx}.04`
      );
      t.deepEqual(
        res2.issues[0].position,
        [[8, 9]],
        `02.${String(idx).length === 1 ? `0${idx}` : idx}.05`
      );
      t.is(
        apply(bad2, res2.fix),
        "aaaaa\n\n\nbbb",
        `02.${String(idx).length === 1 ? `0${idx}` : idx}.06`
      );
    }
  });
});

const c1CharactersToTest = [
  "delete",
  "padding",
  "high-octet-preset",
  "break-permitted-here",
  "no-break-here",
  "index",
  "next-line",
  "start-of-selected-area",
  "end-of-selected-area",
  "character-tabulation-set",
  "character-tabulation-with-justification",
  "line-tabulation-set",
  "partial-line-forward",
  "partial-line-backward",
  "reverse-line-feed",
  "single-shift-two",
  "single-shift-three",
  "device-control-string",
  "private-use-1",
  "private-use-2",
  "set-transmit-state",
  "cancel-character",
  "message-waiting",
  "start-of-protected-area",
  "end-of-protected-area",
  "start-of-string",
  "single-graphic-character-introducer",
  "single-character-intro-introducer",
  "control-sequence-introducer",
  "string-terminator",
  "operating-system-command",
  "private-message",
  "application-program-command"
];

test(`YY - Unicode 127-159`, t => {
  c1CharactersToTest.forEach((characterStr, idx) => {
    const bad1 = String.fromCharCode(idx + 127);
    const res1 = lint(bad1);
    t.is(
      res1.issues[0].name,
      `bad-character-${characterStr}`,
      `02.${String(idx).length === 1 ? `0${idx}` : idx}.01`
    );
    t.deepEqual(
      res1.issues[0].position,
      [[0, 1]],
      `02.${String(idx).length === 1 ? `0${idx}` : idx}.02`
    );
    t.is(
      apply(bad1, res1.fix),
      "",
      `02.${String(idx).length === 1 ? `0${idx}` : idx}.03`
    );

    const bad2 = `aaaaa\n\n\n${bad1}bbb`;
    const res2 = lint(bad2);
    t.is(
      res2.issues[0].name,
      `bad-character-${characterStr}`,
      `02.${String(idx).length === 1 ? `0${idx}` : idx}.04`
    );
    t.deepEqual(
      res2.issues[0].position,
      [[8, 9]],
      `02.${String(idx).length === 1 ? `0${idx}` : idx}.05`
    );
    t.is(
      apply(bad2, res2.fix),
      "aaaaa\n\n\nbbb",
      `02.${String(idx).length === 1 ? `0${idx}` : idx}.06`
    );
  });
});

test(`01 - DELETE character (control)`, t =>
  c(`first\u007Fsecond`, `firstsecond`, "bad-character-delete", t));

test(`02 - ETX character, tight`, t =>
  c(`first\u0003second`, `firstsecond`, "bad-character-end-of-text", t));

test(`03 - ETX character, spaced`, t =>
  c(`first \u0003second`, `first second`, "bad-character-end-of-text", t));

test(`04 - ETX character, spaced`, t =>
  c(`first \u0003 second`, `first second`, "bad-character-end-of-text", t));

test(`05 - ETX character, spaced with line breaks`, t =>
  c(`first \u0003\nsecond`, `first\nsecond`, "bad-character-end-of-text", t));

// https://www.fileformat.info/info/unicode/char/200b/index.htm
test(`06 - zero width space`, t =>
  c("a\u200Bb", `ab`, "bad-character-zero-width-space", t));

// https://en.wikipedia.org/wiki/Non-breaking_space
// http://www.fileformat.info/info/unicode/char/00a0/browsertest.htm
test(`07 - unencoded non-breaking space - between letters`, t =>
  c("a\xA0b", `a&nbsp;b`, "bad-character-unencoded-non-breaking-space", t));

// when raw non-breaking spaces are copy pasted into code editor:
test(`08 - unencoded non-breaking space - among indentations`, t =>
  c(
    `
\xA0  <!--[if gte mso 9]>
\xA0  <xml>
  \xA0  <o:Z>
  \xA0  <o:AA/>
  \xA0  <o:P>96</o:P>
  \xA0  </o:Z>
\xA0  </xml>
\xA0  <![endif]-->`,
    `
&nbsp;  <!--[if gte mso 9]>
&nbsp;  <xml>
  &nbsp;  <o:Z>
  &nbsp;  <o:AA/>
  &nbsp;  <o:P>96</o:P>
  &nbsp;  </o:Z>
&nbsp;  </xml>
&nbsp;  <![endif]-->`,
    "bad-character-unencoded-non-breaking-space",
    t
  ));

test(`09 - unencoded grave accent`, t =>
  c("a`b", `a&#x60;b`, "bad-character-grave-accent", t));

// line separator character
// https://www.fileformat.info/info/unicode/char/2028/index.htm
test(`10 - unencoded line separator`, t =>
  c("a\u2028b", `a\nb`, "bad-character-line-separator", t));

test(`11 - unencoded pound`, t =>
  c("a\xA3b", `a&pound;b`, "bad-character-unencoded-pound", t));

test(`12 - unencoded euro`, t =>
  c("a\u20ACb", `a&euro;b`, "bad-character-unencoded-euro", t));

test(`13 - unencoded cent`, t =>
  c("a\xA2b", `a&cent;b`, "bad-character-unencoded-cent", t));

test(`14 - generic bad characters`, t =>
  c("a\u0378b", `ab`, "bad-character-generic", t));

// https://www.fileformat.info/info/unicode/char/2000/index.htm
test(`15 - en quad`, t => c("a\u2000b", `a b`, "bad-character-en-quad", t));

test(`16 - em quad`, t => c("a\u2001b", `a b`, "bad-character-em-quad", t));

test(`17 - en space`, t => c("a\u2002b", `a b`, "bad-character-en-space", t));

test(`18 - em space`, t => c("a\u2003b", `a b`, "bad-character-em-space", t));

// three-per-em space:
// https://www.fileformat.info/info/unicode/char/2004/index.htm
test(`19 - three-per-em space`, t =>
  c("a\u2004b", `a b`, "bad-character-three-per-em-space", t));

// four-per-em space:
// https://www.fileformat.info/info/unicode/char/2005/index.htm
test(`20 - four-per-em space`, t =>
  c("a\u2005b", `a b`, "bad-character-four-per-em-space", t));

// six-per-em space:
// https://www.fileformat.info/info/unicode/char/2006/index.htm
test(`21 - six-per-em space`, t =>
  c("a\u2006b", `a b`, "bad-character-six-per-em-space", t));

// figure space:
// https://www.fileformat.info/info/unicode/char/2007/index.htm
test(`22 - figure space`, t =>
  c("a\u2007b", `a b`, "bad-character-figure-space", t));

// punctuation space:
// https://www.fileformat.info/info/unicode/char/2008/index.htm
test(`23 - punctuation space`, t =>
  c("a\u2008b", `a b`, "bad-character-punctuation-space", t));

// thin space:
// https://www.fileformat.info/info/unicode/char/2009/index.htm
test(`24 - thin space`, t =>
  c("a\u2009b", `a b`, "bad-character-thin-space", t));

// hair space:
// https://www.fileformat.info/info/unicode/char/200a/index.htm
test(`25 - hair space`, t =>
  c("a\u200ab", `a b`, "bad-character-hair-space", t));

// narrow no-break space:
// https://www.fileformat.info/info/unicode/char/202f/index.htm
test(`26 - narrow no-break space`, t =>
  c("a\u202Fb", `a b`, "bad-character-narrow-no-break-space", t));

// line separator:
// https://www.fileformat.info/info/unicode/char/2028/index.htm
test(`27 - line separator`, t =>
  c("a\u2028b", `a\nb`, "bad-character-line-separator", t));

// paragraph separator:
// https://www.fileformat.info/info/unicode/char/2029/index.htm
test(`28 - paragraph separator`, t =>
  c("a\u2029b", `a\nb`, "bad-character-paragraph-separator", t));

// medium mathematical space:
// https://www.fileformat.info/info/unicode/char/205f/index.htm
test(`29 - medium mathematical space`, t =>
  c("a\u205fb", `a b`, "bad-character-medium-mathematical-space", t));

// ideographic space:
// https://www.fileformat.info/info/unicode/char/3000/index.htm
test(`30 - ideographic space`, t =>
  c("a\u3000b", `a b`, "bad-character-ideographic-space", t));

// ogham space mark:
// https://www.fileformat.info/info/unicode/char/1680/index.htm
test(`31 - ogham space mark`, t =>
  c("a\u1680b", `a b`, "bad-character-ogham-space-mark", t));

// CHARACTERS OUTSIDE ASCII
// -----------------------------------------------------------------------------

test(`32 - raw copyright character`, t =>
  c("a\xA9b", `a&copy;b`, "bad-character-unencoded-char-outside-ascii", t));

// it's not encoding to &Barwed; which is not email-friendly - instead,
// numeric equivalent is used &#x2306;
test(`33 - raw email pattern entity character "Barwed"`, t =>
  c("a\u2306b", `a&#x2306;b`, "bad-character-unencoded-char-outside-ascii", t));
