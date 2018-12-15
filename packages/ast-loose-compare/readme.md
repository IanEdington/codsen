# ast-loose-compare

> Compare anything: AST, objects, arrays and strings

[![Minimum Node version required][node-img]][node-url]
[![Repository is on BitBucket][bitbucket-img]][bitbucket-url]
[![Coverage][cov-img]][cov-url]
[![View dependencies as 2D chart][deps2d-img]][deps2d-url]
[![Downloads/Month][downloads-img]][downloads-url]
[![Test in browser][runkit-img]][runkit-url]
[![Code style: prettier][prettier-img]][prettier-url]
[![MIT License][license-img]][license-url]

## Table of Contents

- [Install](#markdown-header-install)
- [Purpose](#markdown-header-purpose)
- [Difference from `ast-compare`](#markdown-header-difference-from-ast-compare)
- [Differences from \_.isMatch](#markdown-header-differences-from-_ismatch)
- [Competition](#markdown-header-competition)
- [API](#markdown-header-api)
- [More examples](#markdown-header-more-examples)
- [Contributing](#markdown-header-contributing)
- [Licence](#markdown-header-licence)

## Install

```bash
npm i ast-loose-compare
```

```js
// consume via a CommonJS require:
const looseCompare = require("ast-loose-compare");
// or as an ES Module:
import looseCompare from "ast-loose-compare";
```

Here's what you'll get:

| Type                                                                                                    | Key in `package.json` | Path                            | Size  |
| ------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------- | ----- |
| Main export - **CommonJS version**, transpiled to ES5, contains `require` and `module.exports`          | `main`                | `dist/ast-loose-compare.cjs.js` | 3 KB  |
| **ES module** build that Webpack/Rollup understands. Untranspiled ES6 code with `import`/`export`.      | `module`              | `dist/ast-loose-compare.esm.js` | 3 KB  |
| **UMD build** for browsers, transpiled, minified, containing `iife`'s and has all dependencies baked-in | `browser`             | `dist/ast-loose-compare.umd.js` | 14 KB |

**[⬆ back to top](#markdown-header-ast-loose-compare)**

## Purpose

To find out, does an object/array/string/nested-mix is a subset or equal to another input:

```js
compare(
  {
    a: {
      b: "d",
      c: [],
      e: "f",
      g: "h"
    }
  },
  {
    a: {
      b: "d",
      c: []
    }
  }
);
// => true
```

Any plain object, array or string or nested tree of thereof that contains only space characters, tabs or line breaks is considered as "containing only empty space".

If this library will encounter two things that contain only _empty space_, it will report them as equal.

For example these two are equal:

```js
compare(
  {
    a: "a",
    b: "\n \n\n"
  },
  {
    a: "a",
    b: "\t\t \t"
  }
);
// => true
```

Second input argument can be subset of first-one, notice `b` values are of a different type, yet both contain only _empty space_:

```js
compare(
  {
    a: "a",
    b: [[["\n \n\n"]]],
    c: "c"
  },
  {
    a: "a",
    b: { c: { d: "   \t\t \t" } }
  }
);
// => true
```

Main purpose of this library is to compare parsed HTML/CSS trees when deleting empty [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) branches. This library is a dependency for [ast-delete-object](https://bitbucket.org/codsen/ast-delete-object) — library which can delete elements from [parsed](https://github.com/posthtml/posthtml-parser) HTML/CSS objects.

**[⬆ back to top](#markdown-header-ast-loose-compare)**

## Difference from `ast-compare`

There is another similarly-named library, [ast-compare](https://bitbucket.org/codsen/ast-compare). The difference between the two is the following.

`ast-compare` will check: is something a _subset_ or exactly equal of something. If **subset** query item has empty array or an array with empty string with it, it will search for exactly the same on the **superset** query item. Unlike in [\_.isMatch](https://www.npmjs.com/package/lodash.ismatch), empty array will not be reported as equal to non-empty array.

`ast-loose-compare` will act the same as `ast-compare` except

In Lodash [\_.isMatch](https://www.npmjs.com/package/lodash.ismatch), an empty array will be equal to anything that has only empty space (on other objects/arrays containing only empty space). Here, `ast-loose-compare` will report that empty array is not equal to non-empty array (or anything containing non just an empty space).

**[⬆ back to top](#markdown-header-ast-loose-compare)**

## Differences from \_.isMatch

> "Partial comparisons will match empty array and empty object source values against any array or object value, respectively." — [Lodash documentation](https://lodash.com/docs/4.16.4#isMatch)

[\_.isMatch](https://www.npmjs.com/package/lodash.ismatch) positively matches empty arrays to everything. This is bad when you are comparing parsed HTML/CSS trees. This library doesn't do this. In this library, empty array will not be reported as equal to non-empty array, although if both arguments contain something which is _empty space_, they will be considered equal.

If you want an AST comparison library with a stricter ways towards the _empty space equation_, check [ast-compare](https://bitbucket.org/codsen/ast-compare).

**[⬆ back to top](#markdown-header-ast-loose-compare)**

## Competition

I want to check, does a deeply-nested array of objects/strings/arrays (for example, [PostHTML-parsed](https://github.com/posthtml/posthtml-parser) AST output) is equal or is a subset of something. Normally `_.isMatch` would do the deed but it positively matches empty arays against any arrays. Hence this library. Plus, this library will accept and adapt to any sources — combinations of arrays, objects and strings. That's necessary to support any parsed AST trees - HTML or CSS or whatever.

**[⬆ back to top](#markdown-header-ast-loose-compare)**

## API

```js
looseCompare(
  bigObj, // something (Object|Array|String|nested mix)
  smallObj // something (Object|Array|String|nested mix). Maybe it's a subset or equal to bigObj.
);
// => Boolean|undefined
```

- If everything from `smallObj` matches everything within `bigObj`, this library returns `true`.
- Otherwise, if there's a mismatch, returns `false`.
- For all other cases where inputs are missing/`undefined`, returns `undefined`.
- If both `smallObj` and `bigObj` contain the same key and their values contain only empty space (differing or not), they will be considered equal.

**[⬆ back to top](#markdown-header-ast-loose-compare)**

## More examples

```js
compare({ a: "1", b: "2", c: "3" }, { a: "1", b: "2" });
// => true, because second (smallObj) is subset of (or equal) first (bigObj).
```

```js
compare({ a: "1", b: "2" }, { a: "1", b: "2", c: "3" });
// => false, because second (smallObj) is not a subset (or equal) to first (bigObj).
```

```js
compare(["a", "b", "c"], ["a", "b"]);
// => true, because second is a subset of first
```

```js
compare(["a", "b"], ["a", "b", "c"]);
// => false, because second is not a subset of first
```

```js
compare("aaaaa\nbbbbb", "aaaaa\nbbbbb");
// => true, because strings are equal
```

```js
compare({ a: "a" });
// => undefined, because second input value is missing
```

**[⬆ back to top](#markdown-header-ast-loose-compare)**

## Contributing

- If you **want a new feature** in this package or you would like us to change some of its functionality, raise an [issue on this repo](https://bitbucket.org/codsen/ast-loose-compare/issues/new).

- If you tried to use this library but it misbehaves, or **you need advice setting it up**, and its readme doesn't make sense, just document it and raise an [issue on this repo](https://bitbucket.org/codsen/ast-loose-compare/issues/new).

- If you would like to **add or change some features**, just fork it, hack away, and file a pull request. We'll do our best to merge it quickly. _Prettier_ is enabled, so you don't need to worry about the code style.

**[⬆ back to top](#markdown-header-ast-loose-compare)**

## Licence

MIT License (MIT)

Copyright © 2018 Codsen Ltd, Roy Revelt

[node-img]: https://img.shields.io/node/v/ast-loose-compare.svg?style=flat-square&label=works%20on%20node
[node-url]: https://www.npmjs.com/package/ast-loose-compare
[bitbucket-img]: https://img.shields.io/badge/repo-on%20BitBucket-brightgreen.svg?style=flat-square
[bitbucket-url]: https://bitbucket.org/codsen/ast-loose-compare
[cov-img]: https://coveralls.io/repos/bitbucket/codsen/ast-loose-compare/badge.svg?style=flat-square&branch=master
[cov-url]: https://coveralls.io/bitbucket/codsen/ast-loose-compare?branch=master
[deps2d-img]: https://img.shields.io/badge/deps%20in%202D-see_here-08f0fd.svg?style=flat-square
[deps2d-url]: http://npm.anvaka.com/#/view/2d/ast-loose-compare
[downloads-img]: https://img.shields.io/npm/dm/ast-loose-compare.svg?style=flat-square
[downloads-url]: https://npmcharts.com/compare/ast-loose-compare
[runkit-img]: https://img.shields.io/badge/runkit-test_in_browser-a853ff.svg?style=flat-square
[runkit-url]: https://npm.runkit.com/ast-loose-compare
[prettier-img]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://prettier.io
[license-img]: https://img.shields.io/badge/licence-MIT-51c838.svg?style=flat-square
[license-url]: https://bitbucket.org/codsen/ast-loose-compare
