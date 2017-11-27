# string-strip-html

<a href="https://github.com/revelt/eslint-on-airbnb-base-badge" style="float: right; padding: 0 0 20px 20px;"><img src="https://cdn.rawgit.com/revelt/eslint-on-airbnb-base-badge/0c3e46c9/lint-badge.svg" alt="ESLint on airbnb-base with caveats" width="100" align="right"></a>

> Strips HTML tags from strings. Detects legit unencoded brackets.

[![Minimum Node version required][node-img]][node-url]
[![Link to npm page][npm-img]][npm-url]
[![Build Status][travis-img]][travis-url]
[![Coverage][cov-img]][cov-url]
[![bitHound Overall Score][overall-img]][overall-url]
[![bitHound Dependencies][deps-img]][deps-url]
[![View dependencies as 2D chart][deps2d-img]][deps2d-url]
[![bitHound Dev Dependencies][dev-img]][dev-url]
[![Known Vulnerabilities][vulnerabilities-img]][vulnerabilities-url]
[![Downloads/Month][downloads-img]][downloads-url]
[![Test in browser][runkit-img]][runkit-url]
[![MIT License][license-img]][license-url]

## Install

```sh
$ npm i string-strip-html
```

```js
// consume as a CommonJS require:
const stripHtml = require('string-strip-html')
// or as an ES Module:
import stripHtml from 'string-strip-html'

// it does not assume the output must be always HTML and detects legit brackets:
console.log(stripHtml('a < b and c > d')) // => 'a < b and c > d'
// leaves content between tags:
console.log(stripHtml('Some text <b>and</b> text.')) // => 'Some text and text.'
// adds spaces to prevent accidental string concatenation
console.log(stripHtml('aaa<div>bbb</div>ccc')) // => 'aaa bbb ccc'
```

Here's what you'll get:

Type            | Key in `package.json` | Path  | Size
----------------|-----------------------|-------|--------
Main export - **CommonJS version**, transpiled, contains `require` and `module.exports` | `main`                | `dist/string-strip-html.cjs.js` | 7&nbsp;KB
**ES module** build that Webpack/Rollup understands. Untranspiled ES6 code with `import`/`export`. | `module`              | `dist/string-strip-html.esm.js` | 7&nbsp;KB
**UMD build** for browsers, transpiled, minified, containing `iife`'s and has all dependencies baked-in | `browser`            | `dist/string-strip-html.umd.js` | 35&nbsp;KB

**[⬆ &nbsp;back to top](#)**

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Purpose](#purpose)
- [Bigger picture](#bigger-picture)
- [API](#api)
  - [API - Input](#api---input)
  - [Optional Options Object](#optional-options-object)
  - [API - Output](#api---output)
- [Contributing](#contributing)
- [Licence](#licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Purpose

Imagine you have a string with some HTML tags in it. This library makes those tags go poof.

I strongly believe JS libraries should do one thing and do it well.

In this case, it should strip HTML tags and **only** HTML tags. If we detect something else, only resembling a tag, we should not delete it, right?

I think stripping anything else than an HTML tag would be _not doing it well_.

Speaking about competitor libs, they excuse their algorithm imperfections saying unencoded brackets are not allowed within HTML.

But hey, what if somebody wanted to strip HTML tags within simple text? Both inputs and outputs then _could_ contain brackets and they would not be encoded, right?

Other HTML stripping libraries (like [strip](https://www.npmjs.com/package/strip) and [striptags](https://www.npmjs.com/package/striptags)) _assume_ the output must be HTML too. As a consequence, they:

1. Limit their functionality and algorithm creativity, not concerning with false positive cases, legit brackets in non-HTML scenarios,
2. thus preventing other libraries that accept HTML too as input (besides other things) to use their HTML stripping.

I had emotional debates on GitHub with other people that were explaining to me HTML must have to unencoded brackets. That was their response to me saying HTML stripping libraries should strip **only HTML tags** (not `a < b and c > d` for example). If it's deemed to be **not** an HTML tag, **it should not be stripped** and I don't care if unencoded brackets _are_ not allowed in HTML. It's outside the scope. My algorithm didn't detect it as a tag and thus left it out. End of scope.

For example, text cleaning libraries (like [Detergent](https://github.com/codsen/detergent)) might implement HTML stripping, and their outputs will most of the cases be not-HTML (strictly speaking, since you can paste any text into HTML). A string like `a < b and c > d` should be able to pass the HTML stripping intact. Then, encode the brackets, but the HTML stripping should not strip `< b and c >`.

The scope of this library is to take HTML and strip HTML tags and only HTML tags. If there's something else there besides tags, what doesn't belong in HTML, I don't care. Use different tool to process your string further.

**[⬆ &nbsp;back to top](#)**

## Bigger picture

I scratched my itch, producing [detergent](https://github.com/codsen/detergent) - I needed a tool to clean the text before pasting into HTML because clients would supply briefing documents in all possible forms and shapes and often text would contain invisible Unicode characters. I've been given: Excel files, PSD's, Illustrator files, PDF's and of course, good old "nothing" where I had to reference existing code.

Detergent would remove excessive whitespace, invisible characters and improve the text's English style. Detergent would also take HTML as input - stripping the tags, cleaning the text and giving back ready-to-paste sentences. But most of the cases, Detergent's input is just a text. And not always it ends up in HTML.

In September 2017, [string.js](https://www.npmjs.com/package/string) which originally performed the HTML-stripping was discovered as having [vulnerabilities](https://snyk.io/vuln/npm:string).

I was able to quickly replace all functions that Detergent was consuming from `string.js` except **HTML-stripping**.

This library is the last missing piece of a puzzle to drop `string.js` from Detergent dependencies.

**[⬆ &nbsp;back to top](#)**

## API

Basically, string-in string-out, with optional second input argument - an Optional Options Object.

### API - Input

Input argument | Type         | Obligatory? | Description
---------------|--------------|-------------|-----------
`input`        | String       | yes         | Text you want to strip HTML tags from
`opts`         | Plain object | no          | Optional options object, see below

If input arguments are supplied have any other types, an error will be `throw`n.

**[⬆ &nbsp;back to top](#)**

### Optional Options Object

options object's key             | Type of its value             | Default               | Description
---------------------------------|-------------------------------|-----------------------|----------------------
{                                |                               |                       |
`ignoreTags`                     | Array of zero or more strings | `[]`                  | Any tags provided here will not be stripped from the input
`stripTogetherWithTheirContents` | Array of zero or more strings, `something falsey` | `['script', 'style']` | My idea is you should be able to paste HTML and see only the text that would be visible in a browser window. Not CSS, not stuff from `script` tags. To turn this off, just set it to an empty array. Or something falsey.
}                                |                               |         |

The Optional Options Object is validated by [check-types-mini](https://github.com/codsen/check-types-mini) so please behave: the settings' values have to match the API and settings object should not have any extra keys, not defined in the API. Naughtiness will cause error `throw`s. I know, it's strict, but it prevents any API misconfigurations and helps to identify some errors early-on.

Here is the O.O.O. in one place (in case you ever want to copy it):

```js
stripHtml(
  str,
  {
    ignoreTags: [],
    stripTogetherWithTheirContents: ['script', 'style'],
  }
);
```

**[⬆ &nbsp;back to top](#)**

### API - Output

A string of zero or more characters-length.

## Contributing

Hi! 99% of people in the society are passive - consumers. They wait for others to take action, they prefer to blend in. The remaining 1% are proactive citizens who will _do_ something rather than _wait_. If you are one of that 1%, you're in luck because I am the same and _together_ we can make something happen.

* If you **want a new feature** in this package or you would like to change some of its functionality, raise an [issue on this repo](https://github.com/codsen/string-strip-html/issues). Also, you can [email me](mailto:roy@codsen.com). Just let it out.

* If you tried to use this library but it misbehaves, or **you need an advice setting it up**, and its readme doesn't make sense, just document it and raise an [issue on this repo](https://github.com/codsen/string-strip-html/issues). Alternatively, you can [email me](mailto:roy@codsen.com).

* If you don't like the code in here and would like to **give an advice** about how something could be done better, please do. Same drill - [GitHub issues](https://github.com/codsen/string-strip-html/issues) or [email](mailto:roy@codsen.com), your choice.

* If you would like to **add or change some features**, just fork it, hack away, and file a pull request. I'll do my best to merge it quickly. Code style is `airbnb`, only without semicolons. If you use a good code editor, it will pick up the established ESLint setup.

**[⬆ &nbsp;back to top](#)**

## Licence

MIT License (MIT)

Copyright © 2017 Codsen Ltd, Roy Revelt

[node-img]: https://img.shields.io/node/v/string-strip-html.svg?style=flat-square&label=works%20on%20node
[node-url]: https://www.npmjs.com/package/string-strip-html

[npm-img]: https://img.shields.io/npm/v/string-strip-html.svg?style=flat-square&label=release
[npm-url]: https://www.npmjs.com/package/string-strip-html

[travis-img]: https://img.shields.io/travis/codsen/string-strip-html.svg?style=flat-square
[travis-url]: https://travis-ci.org/codsen/string-strip-html

[cov-img]: https://coveralls.io/repos/github/codsen/string-strip-html/badge.svg?style=flat-square?branch=master
[cov-url]: https://coveralls.io/github/codsen/string-strip-html?branch=master

[overall-img]: https://img.shields.io/bithound/code/github/codsen/string-strip-html.svg?style=flat-square
[overall-url]: https://www.bithound.io/github/codsen/string-strip-html

[deps-img]: https://img.shields.io/bithound/dependencies/github/codsen/string-strip-html.svg?style=flat-square
[deps-url]: https://www.bithound.io/github/codsen/string-strip-html/master/dependencies/npm

[deps2d-img]: https://img.shields.io/badge/deps%20in%202D-see_here-08f0fd.svg?style=flat-square
[deps2d-url]: http://npm.anvaka.com/#/view/2d/string-strip-html

[dev-img]: https://img.shields.io/bithound/devDependencies/github/codsen/string-strip-html.svg?style=flat-square
[dev-url]: https://www.bithound.io/github/codsen/string-strip-html/master/dependencies/npm

[vulnerabilities-img]: https://snyk.io/test/github/codsen/string-strip-html/badge.svg?style=flat-square
[vulnerabilities-url]: https://snyk.io/test/github/codsen/string-strip-html

[downloads-img]: https://img.shields.io/npm/dm/string-strip-html.svg?style=flat-square
[downloads-url]: https://npmcharts.com/compare/string-strip-html

[runkit-img]: https://img.shields.io/badge/runkit-test_in_browser-a853ff.svg?style=flat-square
[runkit-url]: https://npm.runkit.com/string-strip-html

[license-img]: https://img.shields.io/npm/l/string-strip-html.svg?style=flat-square
[license-url]: https://github.com/codsen/string-strip-html/blob/master/license.md