# test-mixer

> Test helper to generate function opts object variations

<div class="package-badges">
  <a href="https://www.npmjs.com/package/test-mixer" rel="nofollow noreferrer noopener">
    <img src="https://img.shields.io/badge/-npm-blue?style=flat-square" alt="page on npm">
  </a>
  <a href="https://codsen.com/os/test-mixer" rel="nofollow noreferrer noopener">
    <img src="https://img.shields.io/badge/-codsen-blue?style=flat-square" alt="page on codsen.com">
  </a>
  <a href="https://git.sr.ht/~royston/codsen/tree/master/packages/test-mixer" rel="nofollow noreferrer noopener">
    <img src="https://img.shields.io/badge/-sourcehut-blue?style=flat-square" alt="page on sourcehut">
  </a>
  <a href="https://npmcharts.com/compare/test-mixer?interval=30" rel="nofollow noreferrer noopener" target="_blank">
    <img src="https://img.shields.io/npm/dm/test-mixer.svg?style=flat-square" alt="Downloads per month">
  </a>
  <a href="https://prettier.io" rel="nofollow noreferrer noopener" target="_blank">
    <img src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg?style=flat-square" alt="Code style: prettier">
  </a>
  <img src="https://img.shields.io/badge/licence-MIT-brightgreen.svg?style=flat-square" alt="MIT License">
  <a href="https://liberamanifesto.com" rel="nofollow noreferrer noopener" target="_blank">
    <img src="https://img.shields.io/badge/libera-manifesto-lightgrey.svg?style=flat-square" alt="libera manifesto">
  </a>
</div>

## Install

```bash
npm i test-mixer
```

## Quick Take

```js
import { strict as assert } from "assert";
import mixer from "test-mixer";

// generates 2^n combinations
assert.deepEqual(
  mixer(
    {
      foo: true, // override
      baz: 1, // not a boolean
    },
    {
      // defaults or reference object:
      foo: true,
      bar: false,
      baz: 0, // default is not a boolean either
    }
  ),
  [
    {
      foo: true, // static, as per 1st arg
      bar: false, // combination #1
      baz: 1, // non-bools get copied over
    },
    {
      foo: true, // static, as per 1st arg
      bar: true, // combination #2
      baz: 1, // non-bools get copied over
    },
  ]
);
```

## Documentation

Please [visit codsen.com](https://codsen.com/os/test-mixer/) for a full description of the API and examples.

## Licence

MIT License

Copyright (c) 2010-2020 Roy Revelt and other contributors

<img src="https://codsen.com/images/png-codsen-ok.png" width="98" alt="ok" align="center"> <img src="https://codsen.com/images/png-codsen-1.png" width="148" alt="codsen" align="center"> <img src="https://codsen.com/images/png-codsen-star-small.png" width="32" alt="star" align="center">