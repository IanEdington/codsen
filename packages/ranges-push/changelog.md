# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.8.0] - 2018-05-19

### Fixed

* ✨ Fixed second input argument throw error message reporting. Previously, when second argument was of a wrong type, the first argument's details were reported which caused confusion. Fixed now.

### Added

* ✨ Throw error pinning in unit tests. Otherwise we would not be able to prove this feature above is correctly implemented. Both before and after were throwing an error. The correctness is distinguished by _which_ error exactly, (first arg's wrong type) `THROW_ID_09` or (newly added second arg's wrong type) `THROW_ID_10`. I'd go as far as to say, if _throw pinning_ was implemented at the beginning, this bug would not have happened.

## [2.7.0] - 2018-05-11

Setup refresh.

### Added

* ✨ Set up [Prettier](https://prettier.io)
* ✨ Removed `package.lock` and `.editorconfig`
* ✨ Wired Rollup to remove comments from non-dev builds. This means we can now leave the `console.log`s in the source code — Rollup will remove them from production code.
* ✨ Unit tests are pointing at ES modules build, which means that code coverage is correct now, without Babel functions being missed

## [2.6.0] - 2018-02-24

### Added

* ✨ Chillax™ feature. If `null` is being `.push`ed, nothing happens. It won't `throw` from now on.

## [2.5.0] - 2018-02-10

### Added

* ✨ Now accepts output of another slices class (its `.current()` output) as the first input argument. Now, it won't throw an error that second argument is missing, provided the validation of the array from the 1st argument passes.

In practice, I'm going to use it in [string-remove-duplicate-heads-tails](https://github.com/codsen/string-remove-duplicate-heads-tails) for example, where I there will be two-step process. Range comes in as a plausible range, then we traverse further and if further ranges are found, that plausible-one is merged into the real ranges slices array class. This merging up until now was a problem - it could only be done iterating one array and `.push`ing each range one-by-one into another slices array.

### Changed

* 🔧 Because of the above I had to rewrite the whole validation and error throwing part. All unit tests are the same and more were added, so there shoud not be any breaking changes.

## [2.4.0] - 2018-01-18

### Added

* ✨ `opts.limitToBeAddedWhitespace` now also collapses the leading and trailing whitespace. If any chunk of leading whitespace (anything that would get `trim()`'med) contain line break `\n`, it's turned into `\n`. Otherwise, it's turned into single space.

```js
// does nothing to trimmed strings:
'aaa' => 'aaa'
// if leading or trailing whitespace doesn't contain \n, collapse to a single space
'  aaa   ' => ' aaa '
// otherwise, collapse to a single \n
'     \n\n   aaa  \n\n\n    ' => '\naaa\n'
```

## [2.3.0] - 2018-01-16

### Added

* ✨ `.push` as an alias for `.add`. Both do the same thing. I thought the name of this package has "push" so why there is no such method? Until now, that is.

## [2.2.0] - 2017-12-29

### Added

* ✨ When third argument is `null`, any merged range results will have there `null`.

## [2.1.0] - 2017-12-20

### Added

* ✨ `opts.limitToBeAddedWhitespace` - makes life easier when cleaning HTML. Now, chunk ranges can contain any amount of whitespace - the `current()` will run `string-collapse` on the to-be-inserted, third argument. Now, if there are any line breaks among the whitespace characters, the result will be a single line break instead. Basically, when this setting is active, only space or linebreak will be inserted in place of deleted range.

What this feature gives you is you can activate it and freely push chunks of string in, extracting whitespace along it and pushing it too. You don't need to care about excessive amount of it - this library will truncate it automatically. It's very handy when stripping strings from [HTML tags](https://github.com/codsen/string-strip-html) for example.

## [2.0.0] - 2017-12-05

### Changed

* ✨ Rewrite in ES modules
* ✨ Now serving three builds: CommonJS, UMD and ES modules, all wired up to appropriate end-points on `package.json`

### Added

* ✨ If you have two ranges where second-one completely overlaps the first-one and the first has third argument, something to insert in its place, that third argument will be discarded upon merge.

Let's say you got these two ranges:

```js
[[5, 6, " "], [1, 10]];
```

Previously, result would be `[1, 10, ' ']`. Now result will be `[1, 10]`. This is logical, because each range should take care to consider its vicinity. If `[1, 10]` came in without instructions to add something in its place, we assume this was intentional.

## [1.6.0] - 2017-09-25

### Changed

* ✨ Actually serving the transpiled version as default. Sorry about that. Now the transpiled source is wired to `package.json` `main`. The proper Rollup setup (UMD, ESJ and ESM builds) is in coming next.

## [1.5.0] - 2017-09-18

### Changed

* ✨ Separated the merging function into a separate library, [ranges-merge](https://github.com/codsen/ranges-merge).

## [1.4.0] - 2017-09-12

### Added

* ✨ Separated ranges sorting function into a [separate library](https://github.com/codsen/ranges-sort) because it will be needed in [Detergent](https://github.com/codsen/detergent).
* ✨ Replaced JS Standard with ESLint on `airbnb-base` config with two exceptions: 1. no semicolons and 2. allow plus-plus in `for`-loops. For posterity JS Standard has been neglected by its maintainers, currently it's using half-year old version of ESLint, and doesn't tap to majority of its rules. After activating ESLint, it found some style issues that needed fixing. I like that.

## [1.3.0] - 2017-08-30

### Added

* ✨ Transpiled version is available from the folder `/es5/`.

## [1.2.0] - 2017-08-16

### Fixed

* 🔧 The input validation was not passing through the zero indexes for `.add()` because natural number checks were not including zero. Sorted now.

## [1.1.0] - 2017-07-31

### Added

* ✨ An improvement to the algorithm which doesn't change API: sorting and merging is now done upon querying `.current()`, not during `.add()`. This guarantees maximum data precision, especially if you don't do any `.add()` after calling `.current()` and processing the slices array using [string-replace-slices-array](https://github.com/codsen/string-replace-slices-array).

## 1.0.0 - 2017-07-28

### New

* First public release

[1.1.0]: https://github.com/codsen/string-slices-array-push/compare/v1.0.0...v1.1.0
[1.2.0]: https://github.com/codsen/string-slices-array-push/compare/v1.1.0...v1.2.0
[1.3.0]: https://github.com/codsen/string-slices-array-push/compare/v1.2.0...v1.3.0
[1.4.0]: https://github.com/codsen/string-slices-array-push/compare/v1.3.0...v1.4.0
[1.5.0]: https://github.com/codsen/string-slices-array-push/compare/v1.4.0...v1.5.0
[1.6.0]: https://github.com/codsen/string-slices-array-push/compare/v1.5.0...v1.6.0
[2.0.0]: https://github.com/codsen/string-slices-array-push/compare/v1.6.0...v2.0.0
[2.1.0]: https://github.com/codsen/string-slices-array-push/compare/v2.0.0...v2.1.0
[2.2.0]: https://github.com/codsen/string-slices-array-push/compare/v2.1.0...v2.2.0
[2.3.0]: https://github.com/codsen/string-slices-array-push/compare/v2.2.0...v2.3.0
[2.4.0]: https://github.com/codsen/string-slices-array-push/compare/v2.3.0...v2.4.0
[2.5.0]: https://github.com/codsen/string-slices-array-push/compare/v2.4.5...v2.5.0
[2.6.0]: https://github.com/codsen/string-slices-array-push/compare/v2.5.0...v2.6.0
[2.7.0]: https://github.com/codsen/string-slices-array-push/compare/v2.6.0...v2.7.0
[2.8.0]: https://github.com/codsen/string-slices-array-push/compare/v2.7.0...v2.8.0
