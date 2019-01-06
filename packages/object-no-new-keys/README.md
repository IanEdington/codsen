# object-no-new-keys

> Check, does a plain object (AST/JSON) has any unique keys, not present in a reference object (another AST/JSON)

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
- [Idea](#markdown-header-idea)
- [API](#markdown-header-api)
- [Two modes](#markdown-header-two-modes)
- [For example](#markdown-header-for-example)
- [Competition](#markdown-header-competition)
- [Contributing](#markdown-header-contributing)
- [Licence](#markdown-header-licence)

## Install

```bash
npm i object-no-new-keys
```

```js
// consume as a CommonJS require:
const objectNoNewKeys = require("object-no-new-keys");
// or as an ES Module:
import objectNoNewKeys from "object-no-new-keys";
```

Here's what you'll get:

| Type                                                                                                    | Key in `package.json` | Path                             | Size  |
| ------------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------- | ----- |
| Main export - **CommonJS version**, transpiled to ES5, contains `require` and `module.exports`          | `main`                | `dist/object-no-new-keys.cjs.js` | 4 KB  |
| **ES module** build that Webpack/Rollup understands. Untranspiled ES6 code with `import`/`export`.      | `module`              | `dist/object-no-new-keys.esm.js` | 4 KB  |
| **UMD build** for browsers, transpiled, minified, containing `iife`'s and has all dependencies baked-in | `browser`             | `dist/object-no-new-keys.umd.js` | 28 KB |

**[⬆ back to top](#markdown-header-object-no-new-keys)**

## Idea

Check, does a `given thing` (probably a nested plain object) have any keys, not present in a `reference thing` (probably an another nested plain object). I'm using a term "thing" because this library uses a recursive algorithm which means both inputs can be _whatever_-type (string, plain object or an array).

This library will try to perform a **deep, recursive traversal** of both inputs and will not mutate the input arguments.

It is meant for work with AST's, parsed HTML or JSON, the cases where there are _objects within arrays within objects_.

Personally, I use this library to look for any rogue keys in email template content files, in JSON format.

**[⬆ back to top](#markdown-header-object-no-new-keys)**

## API

**objectNoNewKeys(input, reference\[, opts])**

Returns zero or more long array of the paths to each key/element in the `input` which does not exist in `reference`.

### `opts` - an Optional Options Object

**Defaults**:

```js
{
  mode: 2;
}
```

| Optional Options Object's key | Type           | Obligatory? | Default | Description                         |
| ----------------------------- | -------------- | ----------- | ------- | ----------------------------------- |
| {                             |                |             |         |
| `mode`                        | Integer number | no          | `2`     | Choose mode: `1` or `2`. See below. |
| {                             |                |             |         |

**[⬆ back to top](#markdown-header-object-no-new-keys)**

## Two modes

This library has two modes:

1.  Strict comparing, having no assumptions about the `reference`.
2.  Comparing, assuming that the `reference` will be NORMALISED.

By "_normalised_" I mean if any arrays have object children, those objects have the same keys.

These two modes mainly concern the case when both `input` and `reference` have an array, but `reference` has fewer elements and there's nothing to compare the `input` element to:

```js
const input = {
  a: [
    {
      // object number 1
      b: "b1",
      c: "c1"
    },
    {
      // object number 2
      b: "b2",
      c: "c2",
      x: "y"
    }
  ]
};

const reference = {
  a: [
    {
      // << just one object!
      b: "b3",
      c: "c3"
    }
  ]
};
```

First mode will report that `a[1].b` and `a[1].c` and `a[1].x` are all rogue keys, not present in `reference.`

The second mode will anticipate that `reference` will be normalised, that is, we can **compare input array elements to the first element of an array in reference**. We'll get the same thing — all objects within an array should have the same keys. This means, `input` has only one rogue key — `a[1].x`. And algorithm will identify it by comparing `input` object `a[1]` to `reference` object `a[0]` — second/third/whatever element in the `input` to **ALWAYS THE FIRST ELEMENT IN REFERENCE**, `a[0]`.

I need the second mode, but I give people chance to use the first mode as well. Maybe somebody will find it useful.

**[⬆ back to top](#markdown-header-object-no-new-keys)**

## For example

```js
const nnk = require("object-no-new-keys");
const res = nnk(
  {
    a: "a",
    b: "b",
    c: "c"
  },
  {
    c: "z"
  }
);
console.log("nnk = " + JSON.stringify(nnk, null, 4));
// => ['a', 'b']
```

works with arrays too:

```js
const nnk = require("object-no-new-keys");
const res = nnk(
  {
    //<<< input
    a: [
      {
        b: "aaa",
        d: "aaa", // rogue key, record it
        f: "fff" // another rogue key, record it
      },
      {
        c: "aaa",
        k: "kkk" // yet another rogue key, record it
      }
    ],
    x: "x" // rogue too
  },
  {
    // <<< reference
    a: [
      {
        b: "bbb",
        c: "ccc"
      },
      {
        b: "yyy",
        c: "zzz"
      }
    ]
  }
);
console.log("res = " + JSON.stringify(res, null, 4));
// => ['a[0].d', 'a[0].f', 'a[1].k', 'x']
```

**[⬆ back to top](#markdown-header-object-no-new-keys)**

## Competition

You could try to use a [missing-deep-keys](https://github.com/vladgolubev/missing-deep-keys), but it won't work if your inputs have **arrays**. For posterity, the algorithm of it is quite wise: run `lodash.difference` against [deep-keys](https://www.npmjs.com/package/deep-keys)-flattened stringified key schemas of both object and reference. However, `deep-keys` does not support **arrays**, so it's not that easy.

In short, `missing-deep-keys` is for cases when you have only objects-within-objects. `object-no-new-keys` is for work with parsed HTML (AST's) or JSON. Higher-end.

**[⬆ back to top](#markdown-header-object-no-new-keys)**

## Contributing

- If you see an error, [raise an issue](https://bitbucket.org/codsen/codsen/issues/new?title=object-no-new-keys%20package%20-%20put%20title%20here).
- If you want a new feature but can't code it up yourself, also [raise an issue](https://bitbucket.org/codsen/codsen/issues/new?title=object-no-new-keys%20package%20-%20put%20title%20here). Let's discuss it.
- If you tried to use this package, but something didn't work out, also [raise an issue](https://bitbucket.org/codsen/codsen/issues/new?title=object-no-new-keys%20package%20-%20put%20title%20here). We'll try to help.
- If you want to contribute some code, fork the [monorepo](https://bitbucket.org/codsen/codsen/src/) via BitBucket, then write code, then file a pull request via BitBucket. We'll merge it in and release.

In monorepo, npm libraries are located in `packages/` folder. Inside, the source code is located either in `src/` folder (normal npm library) or in the root, `cli.js` (if it's a command line application).

The npm script "`dev`", the `"dev": "rollup -c --dev --silent"` builds the development version retaining all `console.log`s with row numbers. It's handy to have [js-row-num-cli](https://www.npmjs.com/package/js-row-num-cli) installed globally so you can automatically update the row numbers on all `console.log`s.

**[⬆ back to top](#markdown-header-object-no-new-keys)**

## Licence

MIT License

Copyright (c) 2015-2019 Roy Revelt and other contributors

[node-img]: https://img.shields.io/node/v/object-no-new-keys.svg?style=flat-square&label=works%20on%20node
[node-url]: https://www.npmjs.com/package/object-no-new-keys
[bitbucket-img]: https://img.shields.io/badge/repo-on%20BitBucket-brightgreen.svg?style=flat-square
[bitbucket-url]: https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys
[cov-img]: https://img.shields.io/badge/coverage-100%-brightgreen.svg?style=flat-square
[cov-url]: https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys
[deps2d-img]: https://img.shields.io/badge/deps%20in%202D-see_here-08f0fd.svg?style=flat-square
[deps2d-url]: http://npm.anvaka.com/#/view/2d/object-no-new-keys
[downloads-img]: https://img.shields.io/npm/dm/object-no-new-keys.svg?style=flat-square
[downloads-url]: https://npmcharts.com/compare/object-no-new-keys
[runkit-img]: https://img.shields.io/badge/runkit-test_in_browser-a853ff.svg?style=flat-square
[runkit-url]: https://npm.runkit.com/object-no-new-keys
[prettier-img]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://prettier.io
[license-img]: https://img.shields.io/badge/licence-MIT-51c838.svg?style=flat-square
[license-url]: https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys
