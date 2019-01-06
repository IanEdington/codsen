# array-includes-with-glob

> like \_.includes but with wildcards

[![Minimum Node version required][node-img]][node-url]
[![Repository is on BitBucket][bitbucket-img]][bitbucket-url]
[![Coverage][cov-img]][cov-url]
[![View dependencies as 2D chart][deps2d-img]][deps2d-url]
[![Downloads/Month][downloads-img]][downloads-url]
[![Test in browser][runkit-img]][runkit-url]
[![Code style: prettier][prettier-img]][prettier-url]
[![MIT License][license-img]][license-url]

## Install

```bash
npm i array-includes-with-glob
```

Consume:

```js
// Consume as CommonJS require:
const arrayIncludesWithGlob = require("array-includes-with-glob");
// or tap the original ES Modules source:
import arrayIncludesWithGlob from "array-includes-with-glob";
```

Here's what you'll get:

| Type                                                                                                    | Key in `package.json` | Path                                   | Size |
| ------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------- | ---- |
| Main export - **CommonJS version**, transpiled to ES5, contains `require` and `module.exports`          | `main`                | `dist/array-includes-with-glob.cjs.js` | 3 KB |
| **ES module** build that Webpack/Rollup understands. Untranspiled ES6 code with `import`/`export`.      | `module`              | `dist/array-includes-with-glob.esm.js` | 3 KB |
| **UMD build** for browsers, transpiled, minified, containing `iife`'s and has all dependencies baked-in | `browser`             | `dist/array-includes-with-glob.umd.js` | 3 KB |

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

## Table of Contents

- [Install](#markdown-header-install)
- [How it works](#markdown-header-how-it-works)
- [API](#markdown-header-api)
- [Conditions when this library will throw](#markdown-header-conditions-when-this-library-will-throw)
- [Contributing](#markdown-header-contributing)
- [Licence](#markdown-header-licence)

## How it works

Lodash `_.includes` can tell, does an array contain given string among its elements:

```js
_.includes(["abcd", "aaa", "bbb"], "bc");
// => true

_.includes(["abcd", "aaa", "bbb"], "zzz");
// => false
```

This library is a supercharged version of the Lodash `_.includes`, letting you to put _wildcards_:

```js
includesWithGlob(["xc", "yc", "zc"], "*c");
// => true (all 3)

includesWithGlob(["xc", "yc", "zc"], "*a");
// => false (none found)

includesWithGlob(["something", "anything", "zzz"], "some*");
// => true (1 hit)
```

**Wildcard means zero or more Unicode characters.**

You can also do fancy things like a wildcard in the middle of a string, or multiple wildcards in a string:

```js
includesWithGlob(["something", "zzz", "soothing"], "so*ing");
// => true (2 hits)
```

This library will tolerate non-string values in the source array; it will skip those values.

This library is astral-character friendly, supports all Unicode characters (including emoji) and doesn't mutate the input.

You can also query multiple values and request that ANY (default behaviour) or ALL (optional setting) should be found in the source, to yield a result "`true`". See examples [below](#options-object-examples).

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

## API

```js
includesWithGlob(
  source, // input - an array of strings or a single string
  whatToFind, // what to look for - can contain wildcards, "*"'s, can be array of strings or a single string
  options
);
```

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

### API - Input

| Input argument | Type                         | Obligatory? | Description                                                                    |
| -------------- | ---------------------------- | ----------- | ------------------------------------------------------------------------------ |
| `source`       | A string or array of strings | yes         | Source string or array of strings                                              |
| `whatToFind`   | A string or array of strings | yes         | What to look for. Can contain wildcards. Can be one string or array of strings |
| `options`      | Plain object                 | no          | Options object. See below for its API.                                         |

None of the input arguments is mutated.

| Options object's key         | Value          | Default | Description                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------- | -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{`                          |                |         |
| `arrayVsArrayAllMustBeFound` | `any` or `all` | `any`   | When a source (the first argument) is array, and what to look for (the second argument) is also array, you can have the match performed two ways: `any` setting will return true if _any_ of the second argument array's elements are found in the source array. `all` setting will return `true` only if _all_ elements within the second argument are found within the source array. |
| `}`                          |                |         |

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

#### Options object examples

```js
var arrayIncludesWithGlob = require("array-includes-with-glob");
var source = ["aaa", "bbb", "ccc"];
var whatToLookFor = ["a*", "d*"];

var res1 = arrayIncludesWithGlob(source, whatToLookFor);
console.log("res1 = " + res1);
// => res1 = true, because at one element, 'a*' was found in source (it was its first element)

var res2 = arrayIncludesWithGlob(source, whatToLookFor, {
  arrayVsArrayAllMustBeFound: "all"
});
console.log("res2 = " + res2);
// => res2 = false, because not all elements were found in source: 'd*' was not present in source!
```

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

### Practical usage

I need this library for my other libraries when I'm working with plain objects, and I want to let users whitelist certain keys of those objects. For example, [object-merge-advanced](https://bitbucket.org/codsen/object-merge-advanced) can skip the overwrite of any keys upon request. That request technically, is an array, like `['*thing']` in the example below:

```js
mergeAdvanced(
  {
    // first object to merge
    something: "a",
    anything: "b",
    everything: "c"
  },
  {
    // second object to merge
    something: ["a"],
    anything: ["b"],
    everything: "d"
  },
  {
    ignoreKeys: ["*thing"]
  }
);
```

In the example above, we need to run a check through all keys of the first object and check, are any covered by the `ignoreKeys` array. If so, those keys would not get merged and keep their values.

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

### API - Output

| Type    | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| Boolean | Returns `true` if at least one `stringToFind` is found, else `false`. |

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

## Conditions when this library will throw

This library will throw an error if:

- any of inputs are missing
- any of inputs are of the wrong type

Also, if first input argument, a source array, is an empty array or empty string, the result will always be `false`.

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

## Contributing

- If you see an error, [raise an issue](https://bitbucket.org/codsen/codsen/issues/new?title=array-includes-with-glob%20package%20-%20put%20title%20here).
- If you want a new feature but can't code it up yourself, also [raise an issue](https://bitbucket.org/codsen/codsen/issues/new?title=array-includes-with-glob%20package%20-%20put%20title%20here). Let's discuss it.
- If you tried to use this package, but something didn't work out, also [raise an issue](https://bitbucket.org/codsen/codsen/issues/new?title=array-includes-with-glob%20package%20-%20put%20title%20here). We'll try to help.
- If you want to contribute some code, fork the [monorepo](https://bitbucket.org/codsen/codsen/src/) via BitBucket, then write code, then file a pull request via BitBucket. We'll merge it in and release.

In monorepo, npm libraries are located in `packages/` folder. Inside, the source code is located either in `src/` folder (normal npm library) or in the root, `cli.js` (if it's a command line application).

The npm script "`dev`", the `"dev": "rollup -c --dev --silent"` builds the development version retaining all `console.log`s with row numbers. It's handy to have [js-row-num-cli](https://www.npmjs.com/package/js-row-num-cli) installed globally so you can automatically update the row numbers on all `console.log`s.

**[⬆ back to top](#markdown-header-array-includes-with-glob)**

## Licence

MIT License

Copyright (c) 2015-2019 Roy Revelt and other contributors

[node-img]: https://img.shields.io/node/v/array-includes-with-glob.svg?style=flat-square&label=works%20on%20node
[node-url]: https://www.npmjs.com/package/array-includes-with-glob
[bitbucket-img]: https://img.shields.io/badge/repo-on%20BitBucket-brightgreen.svg?style=flat-square
[bitbucket-url]: https://bitbucket.org/codsen/codsen/src/master/packages/array-includes-with-glob
[cov-img]: https://img.shields.io/badge/coverage-100%-brightgreen.svg?style=flat-square
[cov-url]: https://bitbucket.org/codsen/codsen/src/master/packages/array-includes-with-glob
[deps2d-img]: https://img.shields.io/badge/deps%20in%202D-see_here-08f0fd.svg?style=flat-square
[deps2d-url]: http://npm.anvaka.com/#/view/2d/array-includes-with-glob
[downloads-img]: https://img.shields.io/npm/dm/array-includes-with-glob.svg?style=flat-square
[downloads-url]: https://npmcharts.com/compare/array-includes-with-glob
[runkit-img]: https://img.shields.io/badge/runkit-test_in_browser-a853ff.svg?style=flat-square
[runkit-url]: https://npm.runkit.com/array-includes-with-glob
[prettier-img]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://prettier.io
[license-img]: https://img.shields.io/badge/licence-MIT-51c838.svg?style=flat-square
[license-url]: https://bitbucket.org/codsen/codsen/src/master/packages/array-includes-with-glob
