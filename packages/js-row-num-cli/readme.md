# js-row-num-cli

> Update all row numbers in all console.logs in JS code

[![Repository is on BitBucket][bitbucket-img]][bitbucket-url]
[![View dependencies as 2D chart][deps2d-img]][deps2d-url]
[![Downloads/Month][downloads-img]][downloads-url]
[![Code style: prettier][prettier-img]][prettier-url]
[![MIT License][license-img]][license-url]

## Table of Contents

- [Install globally or npx-it](#markdown-header-install-globally-or-npx-it)
- [TLDR](#markdown-header-tldr)
- [What it does](#markdown-header-what-it-does)
- [A nifty setup idea](#markdown-header-a-nifty-setup-idea)
- [Updating it](#markdown-header-updating-it)
- [Contributing](#markdown-header-contributing)
- [Licence](#markdown-header-licence)

## Install globally or npx-it

```bash
npm i -g js-row-num-cli
```

then, call it typing `jsrownum` or `jrn` in your terminal, like this:

```bash
jsrownum
# or
jrn
```

or specify a glob pointing to some `js` files:

```bash
jsrownum "folder/*.js"
# or
jrn "folder/*.js"
```

If `jsrownum` is too long, you can also type `jrn`; we wired up that as an alternative.

**[⬆ back to top](#markdown-header-js-row-num-cli)**

## TLDR

It updates each `console.log` in your `.js` files...

from:

```js
// something on row 1
// something on row 2
console.log('000 var = ' + var); // row 3
//           ^^^
```

to:

```js
// ...
console.log('003 var = ' + var);
//           ^^^
```

Because it's on row 3.

⚡️⚡️⚡️⚡️🔥🔥🔥🍻🍻🍻🍻🤩🤩💪🏼💪🏼💪🏼💪🏼💪🏼👊🏼👊🏼👊🏼👊🏼💥💥💥💥⚡️⚡️🌟🌟🌟🌟⚡️🍺🍺💪🏼💪🏼

**[⬆ back to top](#markdown-header-js-row-num-cli)**

## What it does

First, it depends, did you specify a path or not.

- If you did, for example, `jsrownum "folder/*.js"` it will process that file (or expand glob into a list of files).
- If you didn't, just typed `jsrownum`, it will use the current folder where it was called from and look for files in this order:

1.  ./src/main.js
2.  ./main.js
3.  ./cli.js
4.  ./index.js
5.  ./src/index.js

**Once it picks the file**, it will look for `console.log` statements, and replace the first chunk of an uninterrupted sequence of numbers with a number of a row it sits.

For exampe, on row number 55 there's a `console.log("045 var = " + var)`.
It will replace `045` with `055`.

🌟⚡️🍺🍺💪🏼💪🏼🍺

The default padding is three characters, but you can override it, see the optional flags table below.

`console.log`s help to troubleshoot the code. These days Rollup builds are standard — having a source in ES Modules (and pointing unit tests to it) and using that source to build three types of applications: 1. ESM (same as source); 2. UMD (minified, for browsers and unpkg.com); 3. Common JS — transpiled to ES5, suitable for older platforms.

Now, you can use Rollup to remove comments and `console.log`s automatically when producing _production_ builds. During _development_ builds, you can use CLI flags to skip `console.log` removal. This way, you get all the goodness of `console.log`s in the terminal, and there's no risk that they will spill into production.

**[⬆ back to top](#markdown-header-js-row-num-cli)**

### API

Once installed globally, type in your terminal: `jsrownum` OR type `jrn`.

If you **won't pass** any glob file/folder pattern or patterns, for example, just type `jrn`, it will look for the following files in this priority order:

1.  ./src/main.js
2.  ./main.js
3.  ./cli.js
4.  ./index.js
5.  ./src/index.js

If you **will pass** some globs, for example:

```bash
jrn "src/*.js"
jsrownum --pad="4" "dist/**/*.js test/ index.js"
jrn "test1.js test2.js" -p 2
```

...it will expand the globs and catch all `.js` files in the folders you specified and process them.

Optionally, you can pass the options, which match the [API](https://www.npmjs.com/package/js-row-num):

| CLI flag        | For example,                       | What it does                                                                                                                                                                   |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-p` or `--pad` | `jsrownum -p 3` or `jrn --pad="4"` | Lets you set the row number padding. For example, `console.log` statement on row 3 with padding set to 4 would get `0003` added. Row 99 with padding of 1 would be still `99`. |

**[⬆ back to top](#markdown-header-js-row-num-cli)**

## A nifty setup idea

I set up an alias for `jsrownum`, to piggyback on some common command I run often. For example, `git add .` - this way all row numbers are processed automatically without any hassle.

## Updating it

When you install it globally, it will check occasionally, are there newer versions available, and if so, will show a message nagging you to update. [Same tech](https://www.npmjs.com/package/update-notifier) that AVA or npm uses!

**[⬆ back to top](#markdown-header-js-row-num-cli)**

## Contributing

- If you **want a new feature** in this package or you would like us to change some of its functionality, raise an [issue on this repo](https://bitbucket.org/codsen/js-row-num-cli/issues/new).

- If you tried to use this library but it misbehaves, or **you need advice setting it up**, and its readme doesn't make sense, just document it and raise an [issue on this repo](https://bitbucket.org/codsen/js-row-num-cli/issues/new).

- If you would like to **add or change some features**, just fork it, hack away, and file a pull request. We'll do our best to merge it quickly. _Prettier_ is enabled, so you don't need to worry about the code style.

**[⬆ back to top](#markdown-header-js-row-num-cli)**

## Licence

MIT License (MIT)

Copyright © 2018 Codsen Ltd, Roy Revelt

[node-img]: https://img.shields.io/node/v/js-row-num-cli.svg?style=flat-square&label=works%20on%20node
[node-url]: https://www.npmjs.com/package/js-row-num-cli
[bitbucket-img]: https://img.shields.io/badge/repo-on%20BitBucket-brightgreen.svg?style=flat-square
[bitbucket-url]: https://bitbucket.org/codsen/js-row-num-cli
[deps2d-img]: https://img.shields.io/badge/deps%20in%202D-see_here-08f0fd.svg?style=flat-square
[deps2d-url]: http://npm.anvaka.com/#/view/2d/js-row-num-cli
[downloads-img]: https://img.shields.io/npm/dm/js-row-num-cli.svg?style=flat-square
[downloads-url]: https://npmcharts.com/compare/js-row-num-cli
[prettier-img]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://prettier.io
[license-img]: https://img.shields.io/badge/licence-MIT-51c838.svg?style=flat-square
[license-url]: https://bitbucket.org/codsen/js-row-num-cli
