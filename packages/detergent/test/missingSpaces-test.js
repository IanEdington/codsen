// avanotonly

import test from "ava";
import { mixer, allCombinations } from "../t-util/util";
import { det } from "../dist/detergent.esm";
import { rawNDash } from "../dist/util.esm";

// -----------------------------------------------------------------------------

test(`01.01 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing space after ndash added (space + ndash) - missing space after ndash added`, t => {
  mixer({
    convertEntities: 1,
    convertDashes: 1,
    removeWidows: 1,
    addMissingSpaces: 0 // <-------
  }).forEach(opt => {
    t.is(
      det("10am &ndash;11am", opt).res,
      "10am&nbsp;&ndash;11am",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.02 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing space after ndash added (space + ndash) - missing space after ndash added`, t => {
  mixer({
    convertEntities: 1,
    convertDashes: 1,
    removeWidows: 0,
    addMissingSpaces: 1 // <-------
  }).forEach(opt => {
    t.is(
      det("10am &ndash;11am", opt).res,
      "10am &ndash; 11am",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.03 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing space after ndash added (space + ndash) - missing space after ndash added`, t => {
  mixer({
    convertEntities: 1,
    convertDashes: 1,
    removeWidows: 0,
    addMissingSpaces: 0 // <-------
  }).forEach(opt => {
    t.is(
      det("10am &ndash;11am", opt).res,
      "10am &ndash;11am",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.04 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within simple URL's - url only`, t => {
  [
    "http://detergent.io",
    "http://detergent.io?something=zzz%26else=ccc",
    "tel://123"
  ].forEach(src => {
    allCombinations.forEach(opt => {
      t.is(det(src, opt).res, src, `${src} - ${JSON.stringify(opt, null, 4)}`);
    });
  });
});

test(`01.05 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within simple URL's - url + space only (checks trimming impact)`, t => {
  mixer({
    dontEncodeNonLatin: 1,
    keepBoldEtc: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io ", opt).res,
      "http://detergent.io",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.06 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls - url + space + text`, t => {
  mixer({
    removeWidows: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io is cool", opt).res,
      "http://detergent.io is cool",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.07 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls - adds space before capital letter (line break)`, t => {
  mixer({
    removeWidows: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io.\nThis is cool", opt).res,
      "http://detergent.io.\nThis is cool",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.08 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls - adds space before capital letter (line break)`, t => {
  mixer({
    removeWidows: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io. \nThis is cool", opt).res,
      "http://detergent.io.\nThis is cool",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.09 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls - no :// but www instead`, t => {
  mixer({
    removeWidows: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("Aaaaa.Aaaa www.detergent.io bbbbb.Bbbbb", opt).res,
      "Aaaaa. Aaaa www.detergent.io bbbbb. Bbbbb",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.10 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls - url + space + text`, t => {
  mixer({
    removeWidows: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("http://detergent.io is cool", opt).res,
      "http://detergent.io is cool",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.11 - \u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m - missing space after ndash added (nbsp + ndash) - space after ndash not added where not needed`, t => {
  mixer({
    convertDashes: 1,
    convertEntities: 0
  }).forEach(opt => {
    t.is(
      det(`10am&ndash;11am`, opt).res,
      `10am${rawNDash}11am`,
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.12 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls - address + full stop + line break`, t => {
  mixer({
    removeWidows: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("http://detergent.io.\nThis is cool", opt).res,
      "http://detergent.io.\nThis is cool",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.13 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls - address + full stop + space + line break`, t => {
  mixer({
    removeWidows: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("http://detergent.io. \nThis is cool", opt).res,
      "http://detergent.io.\nThis is cool",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.14 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls - no :// but www instead`, t => {
  mixer({
    removeWidows: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("Aaaaa.Aaaa www.detergent.io bbbbb.Bbbbb", opt).res,
      "Aaaaa.Aaaa www.detergent.io bbbbb.Bbbbb",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.15 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - sentence #1`, t => {
  mixer({
    removeWidows: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.This is cool.", opt).res,
      "This is http://detergent.io. This is cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.16 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - sentence #2`, t => {
  mixer({
    removeWidows: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.", opt).res,
      "This is http://detergent.io.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.17 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - sentence #3`, t => {
  mixer({
    removeWidows: 1,
    convertEntities: 1,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.This is cool.", opt).res,
      "This is http://detergent.io. This is&nbsp;cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.18 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - sentence #4`, t => {
  mixer({
    removeWidows: 1,
    convertEntities: 1,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.", opt).res,
      "This is http://detergent.io.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.19 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - vs widow removal`, t => {
  mixer({
    removeWidows: 1,
    convertEntities: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.This is cool.", opt).res,
      "This is http://detergent.io. This is\u00A0cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.20 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - trailing full stop #1`, t => {
  mixer({
    removeWidows: 1,
    convertEntities: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.", opt).res,
      "This is http://detergent.io.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.21 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - trailing full stop #2`, t => {
  mixer({
    removeWidows: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.This is cool.", opt).res,
      "This is http://detergent.io.This is cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.22 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - trailing full stop #3`, t => {
  mixer({
    removeWidows: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.", opt).res,
      "This is http://detergent.io.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.23 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - trailing full stop #4`, t => {
  mixer({
    removeWidows: 1,
    convertEntities: 1,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.This is cool.", opt).res,
      "This is http://detergent.io.This is&nbsp;cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.24 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - trailing full stop #5`, t => {
  mixer({
    removeWidows: 1,
    convertEntities: 1,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.", opt).res,
      "This is http://detergent.io.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.25 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - vs widow removal`, t => {
  mixer({
    removeWidows: 1,
    convertEntities: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.This is cool.", opt).res,
      "This is http://detergent.io.This is\u00A0cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.26 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - adds space after semicolon, but not in URLs - trailing full stop #6`, t => {
  mixer({
    removeWidows: 1,
    convertEntities: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.", opt).res,
      "This is http://detergent.io.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.27 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls, considering emoji and line breaks - emoji #1`, t => {
  mixer({
    removeWidows: 0,
    convertEntities: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det(
        "Aaaa🦄.bbbbb http://detergent.whatever.a.bd.re.qwe.gf.asdew.v.df.g.er.re ZZZ.🦄YYY",
        opt
      ).res,
      "Aaaa🦄.bbbbb http://detergent.whatever.a.bd.re.qwe.gf.asdew.v.df.g.er.re ZZZ.🦄YYY",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.28 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls, considering emoji and line breaks - emoji #2`, t => {
  mixer({
    removeWidows: 0,
    convertEntities: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det(
        "Aaaa.Bbbbb http://detergent.whatever.a.bd.re.qwe.\ngf.Asdew.V.Df,g;er.Re ZZZ.🦄YYY sfhksdf fgkjhk jhfgkh.",
        opt
      ).res,
      "Aaaa. Bbbbb http://detergent.whatever.a.bd.re.qwe.\ngf. Asdew. V. Df, g; er. Re ZZZ.🦄YYY sfhksdf fgkjhk jhfgkh.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.29 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls, considering emoji and line breaks - emoji #3`, t => {
  mixer({
    removeWidows: 0,
    convertEntities: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det(
        "Aaaa🦄.bbbbb http://detergent.whatever.a.bd.re.qwe.gf.asdew.v.df.g.er.re ZZZ.🦄YYY",
        opt
      ).res,
      "Aaaa🦄.bbbbb http://detergent.whatever.a.bd.re.qwe.gf.asdew.v.df.g.er.re ZZZ.🦄YYY",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.30 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - doesn't add spaces within urls, considering emoji and line breaks - emoji #4`, t => {
  mixer({
    removeWidows: 0,
    convertEntities: 0,
    replaceLineBreaks: 0,
    removeLineBreaks: 0,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det(
        "Aaaa.Bbbbb http://detergent.whatever.a.bd.re.qwe.\ngf.Asdew.V.Df,g;er.Re ZZZ.🦄YYY sfhksdf fgkjhk jhfgkh.",
        opt
      ).res,
      "Aaaa.Bbbbb http://detergent.whatever.a.bd.re.qwe.\ngf.Asdew.V.Df,g;er.Re ZZZ.🦄YYY sfhksdf fgkjhk jhfgkh.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.31 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - add missing spaces`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io;is cool.", opt).res,
      "http://detergent.io;is cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.32 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - semicol`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(det("aaa;bbb", opt).res, "aaa; bbb", JSON.stringify(opt, null, 4));
  });
});

test(`01.33 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - comma + URL`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io,is cool.", opt).res,
      "http://detergent.io,is cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.34 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - comma + text`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(det("aaa,bbb", opt).res, "aaa, bbb", JSON.stringify(opt, null, 4));
  });
});

test(`01.35 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - added space because first letter is uppercase`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io.Cool!", opt).res,
      "http://detergent.io. Cool!",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.36 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - all caps will prevent space added`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io.IS COOL.", opt).res,
      "http://detergent.io.IS COOL.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.37 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - small caps will prevent space added`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("http://detergent.io.is cool.", opt).res,
      "http://detergent.io.is cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.38 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - letter after full stop has to be uppercase`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(det("aaa.bbb", opt).res, "aaa.bbb", JSON.stringify(opt, null, 4));
  });
});

test(`01.39 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - being on the safe side - not adding spaces around detected URLs - letter after full stop has to be uppercase`, t => {
  mixer({
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(det("Aaa.Bbb", opt).res, "Aaa. Bbb", JSON.stringify(opt, null, 4));
  });
});

test(`01.40 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - non-Latin character after URL #1`, t => {
  mixer({
    removeWidows: 0,
    dontEncodeNonLatin: 1,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.Это хорошо.", opt).res,
      "This is http://detergent.io. Это хорошо.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.41 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - non-Latin character after URL #2`, t => {
  mixer({
    removeWidows: 0,
    dontEncodeNonLatin: 1,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io,Это хорошо.", opt).res,
      "This is http://detergent.io,Это хорошо.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.42 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - non-Latin character after URL #3`, t => {
  mixer({
    removeWidows: 0,
    dontEncodeNonLatin: 1,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io;Это хорошо.", opt).res,
      "This is http://detergent.io;Это хорошо.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.43 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - non-Latin character after URL - not adding the missing spaces #1`, t => {
  mixer({
    removeWidows: 0,
    dontEncodeNonLatin: 1,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io.Это хорошо.", opt).res,
      "This is http://detergent.io.Это хорошо.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.44 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - non-Latin character after URL - not adding the missing spaces #2`, t => {
  mixer({
    removeWidows: 0,
    dontEncodeNonLatin: 1,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io,Это хорошо.", opt).res,
      "This is http://detergent.io,Это хорошо.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.45 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - non-Latin character after URL - not adding the missing spaces #3`, t => {
  mixer({
    removeWidows: 0,
    dontEncodeNonLatin: 1,
    addMissingSpaces: 0
  }).forEach(opt => {
    t.is(
      det("This is http://detergent.io;Это хорошо.", opt).res,
      "This is http://detergent.io;Это хорошо.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.46 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - leaves file names intact`, t => {
  allCombinations.forEach(opt => {
    [
      "image.jpg",
      "image.JPG",
      "image.jpeg",
      "image.JPEG",
      "image.png",
      "image.PNG",
      "image.gif",
      "image.GIF",
      "image.svg",
      "image.SVG",
      "image.json",
      "image.JSON",
      "image.html",
      "image.HTML",
      "image.htm",
      "image.HTM"
    ].forEach(src => {
      t.is(det(src, opt).res, src, JSON.stringify(opt, null, 4));
    });
  });
});

test(`01.47 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - long sentences with file names with extensions #1`, t => {
  t.is(det("Some text .gitignore").res, "Some text .gitignore");
});

test(`01.48 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - long sentences with file names with extensions #2`, t => {
  mixer({
    removeWidows: 0
  }).forEach(opt => {
    t.is(
      det(
        "When you will download header.PNG, file fix.jpg and the dotfiles named .gitignore, check them.",
        opt
      ).res,
      "When you will download header.PNG, file fix.jpg and the dotfiles named .gitignore, check them.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.49 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - false positive - Dutch "p.st"`, t => {
  allCombinations.forEach(opt => {
    t.is(
      det("10eur p.st", opt).res,
      "10eur p.st",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.50 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing spaces addition can be turned off - full stop, addMissingSpaces=on`, t => {
  mixer({
    addMissingSpaces: 1,
    dontEncodeNonLatin: 1,
    useXHTML: 1
  }).forEach(opt => {
    t.is(
      det("Text.More text.", opt).res,
      "Text. More text.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.51 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing spaces addition can be turned off - full stop, addMissingSpaces=off`, t => {
  mixer({
    addMissingSpaces: 0,
    dontEncodeNonLatin: 1,
    useXHTML: 1
  }).forEach(opt => {
    t.is(
      det("Text.More text.", opt).res,
      "Text.More text.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.52 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing spaces addition can be turned off - full stop, addMissingSpaces=on, dontEncodeNonLatin=on`, t => {
  mixer({
    addMissingSpaces: 1,
    dontEncodeNonLatin: 1,
    useXHTML: 1
  }).forEach(opt => {
    t.is(det("Text,more text.", opt).res, "Text, more text.");
    t.is(
      det("Text,more text,", opt).res,
      "Text, more text,",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.53 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing spaces addition can be turned off - full stop, addMissingSpaces=off, dontEncodeNonLatin=on`, t => {
  mixer({
    addMissingSpaces: 0,
    dontEncodeNonLatin: 1,
    useXHTML: 1
  }).forEach(opt => {
    t.is(det("Text,more text.", opt).res, "Text,more text.");
    t.is(
      det("Text,more text,", opt).res,
      "Text,more text,",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.54 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing spaces addition can be turned off - full stop, addMissingSpaces=on, dontEncodeNonLatin=on`, t => {
  mixer({
    addMissingSpaces: 1,
    dontEncodeNonLatin: 1,
    useXHTML: 1
  }).forEach(opt => {
    t.is(det("Text;more text.", opt).res, "Text; more text.");
    t.is(det("text;more text.", opt).res, "text; more text.");
    t.is(det("Text;more text", opt).res, "Text; more text");
    t.is(
      det("text;more text", opt).res,
      "text; more text",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.55 - ${`\u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m`} - missing spaces addition can be turned off - semicol, addMissingSpaces=off`, t => {
  mixer({
    addMissingSpaces: 0,
    dontEncodeNonLatin: 1,
    useXHTML: 1
  }).forEach(opt => {
    t.is(det("Text;more text.", opt).res, "Text;more text.");
    t.is(det("text;more text.", opt).res, "text;more text.");
    t.is(det("Text;more text", opt).res, "Text;more text");
    t.is(
      det("text;more text", opt).res,
      "text;more text",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.56 - \u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m - missing space after ndash added (nbsp + ndash) - missing space after ndash added`, t => {
  mixer({
    convertDashes: 1,
    removeWidows: 1,
    convertEntities: 1,
    addMissingSpaces: 1 // <-------
  }).forEach(opt => {
    t.is(
      det("10am&nbsp;&ndash;11am", opt).res,
      "10am&nbsp;&ndash;&nbsp;11am",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.57 - \u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m - missing space after ndash added (nbsp + ndash) - missing space after ndash added`, t => {
  mixer({
    convertDashes: 1,
    convertEntities: 1,
    addMissingSpaces: 0 // <-------
  }).forEach(opt => {
    t.is(
      det("10am&nbsp;&ndash;11am", opt).res,
      "10am&nbsp;&ndash;11am",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.58 - \u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m - missing space after ndash added (nbsp + ndash) - missing space after ndash added`, t => {
  mixer({
    convertDashes: 1,
    removeWidows: 1,
    convertEntities: 1,
    addMissingSpaces: 0 // <-------
  }).forEach(opt => {
    t.is(
      det("10am&nbsp;&ndash;11am and more text", opt).res,
      "10am&nbsp;&ndash;11am and more&nbsp;text",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.59 - \u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m - missing space after ndash added (nbsp + ndash) - space after ndash not added where not needed`, t => {
  mixer({
    convertDashes: 1,
    convertEntities: 1
  }).forEach(opt => {
    t.is(
      det("10am&ndash;11am", opt).res,
      "10am&ndash;11am",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.60 - \u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m - missing space after ndash added (nbsp + ndash) - missing space after ndash added`, t => {
  mixer({
    convertDashes: 1,
    removeWidows: 1,
    convertEntities: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("10am&nbsp;&ndash;11am", opt).res,
      `10am\u00A0${rawNDash}\u00A011am`,
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`01.61 - \u001b[${33}m${`opts.addMissingSpaces`}\u001b[${39}m - missing space after ndash added (nbsp + ndash) - missing space after ndash added`, t => {
  mixer({
    convertDashes: 1,
    removeWidows: 0,
    convertEntities: 0,
    addMissingSpaces: 1
  }).forEach(opt => {
    t.is(
      det("10am&nbsp;&ndash;11am", opt).res,
      `10am\u00A0${rawNDash} 11am`,
      JSON.stringify(opt, null, 4)
    );
  });
});

// 02. whitespace control
// -----------------------------------------------------------------------------

test(`02.01 - deletes space around n-dash between numbers`, t => {
  mixer({
    convertDashes: 1,
    convertEntities: 0
  }).forEach(opt => {
    t.is(
      det(`1880 ${rawNDash} 1912`, opt).res,
      `1880${rawNDash}1912`,
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`02.02 - deletes space around n-dash between numbers`, t => {
  mixer({
    convertDashes: 1,
    convertEntities: 0
  }).forEach(opt => {
    t.is(
      det(`1880 &ndash; 1912`, opt).res,
      `1880${rawNDash}1912`,
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`02.03 - deletes space around n-dash between numbers`, t => {
  mixer({
    convertDashes: 1,
    convertEntities: 1
  }).forEach(opt => {
    t.is(
      det(`1880 ${rawNDash} 1912`, opt).res,
      "1880&ndash;1912",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`02.04 - deletes space around n-dash between numbers`, t => {
  mixer({
    convertDashes: 1,
    convertEntities: 1
  }).forEach(opt => {
    t.is(
      det("1880 &ndash; 1912", opt).res,
      "1880&ndash;1912",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`02.05 - space in front of n-dash, missing space after it`, t => {
  mixer({
    convertDashes: 1,
    convertEntities: 0
  }).forEach(opt => {
    t.is(
      det(`1880 ${rawNDash}1912`, opt).res,
      `1880${rawNDash}1912`,
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`02.06 - jinja/nunjucks code chunk with double quotes`, t => {
  const str1 = '{{ "%.2f"|format(total.value) }}';
  allCombinations.forEach(opt => {
    t.is(det(str1, opt).res, str1);
  });

  const str2 = '{% if z == "text" %}{{ text }}{% endif %}';
  allCombinations.forEach(opt => {
    t.is(det(str2, opt).res, str2);
  });

  const str3 = '{%- if z == "text" -%}{{ text }}{%- endif -%}';
  allCombinations.forEach(opt => {
    t.is(det(str3, opt).res, str3, JSON.stringify(opt, null, 4));
  });
});

test(`02.07 - sanity check #01`, t => {
  mixer({
    convertEntities: 0,
    removeWidows: 0
  }).forEach(opt => {
    t.is(
      det("Semicolon;\u00A0is cool.", opt).res,
      "Semicolon;\u00A0is cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`02.08 - sanity check #02`, t => {
  mixer({
    convertEntities: 0
  }).forEach(opt => {
    t.is(
      det("Semicolon;&is cool.", opt).res,
      "Semicolon;&is cool.",
      JSON.stringify(opt, null, 4)
    );
  });
});

test(`02.09 - sanity check #03`, t => {
  mixer({
    dontEncodeNonLatin: 1,
    keepBoldEtc: 1
  }).forEach(opt => {
    t.is(
      det("${responseObject.storeName}", opt).res,
      "${responseObject.storeName}",
      JSON.stringify(opt, null, 4)
    );
  });
});
