# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 4.0.0 (2020-11-28)

### Bug Fixes

- Fix the Create New Issue URLs ([c5ee4a6](https://git.sr.ht/~royston/codsen/commits/c5ee4a61e9436099b0e20d20bca043c1b2c93f55))

### Features

- accept nulls among pushed values, do not throw, just do nothing ([4badda3](https://git.sr.ht/~royston/codsen/commits/4badda381aa08f260dffaec17311f14e50d79ed2))
- Add one more tag before which there will be a line break ([4f00871](https://git.sr.ht/~royston/codsen/commits/4f008715dcc2de7b2b52b67ce2e27728d5ffec37))
- hardening the type checks just in case ([106ae7a](https://git.sr.ht/~royston/codsen/commits/106ae7a969a2ecfc2ab3704d9195460aff9930a2))
- implement throw pinning in unit tests ([6b8c789](https://git.sr.ht/~royston/codsen/commits/6b8c7897b292c8d4cb50121fa171ed24e48bda1a))
- improved whitespace insertion algorithm ([b8c4463](https://git.sr.ht/~royston/codsen/commits/b8c4463eb3a20dd1b750a33c9a97e404aa3197f2))
- Initial release ([4f35bfb](https://git.sr.ht/~royston/codsen/commits/4f35bfb167e54b1a0e5e8f01871293b262c67a76))
- Merge modes via opts.mergeType ([7fb1c5f](https://git.sr.ht/~royston/codsen/commits/7fb1c5f319aa41ea54c68eed004ab2dfdc7425bf))
- non-breaking spaces are now retained when pushing with whitespace limiter option on ([2de001d](https://git.sr.ht/~royston/codsen/commits/2de001d0b7f3c2282a64f760060f483274e31c6d))
- omit the 3rd argument when it's equal to an empty string ([343c153](https://git.sr.ht/~royston/codsen/commits/343c1538e849479bf55f9ed861bedc2cdb2bbd9b))
- opts.limitLinebreaksCount ([55eedfa](https://git.sr.ht/~royston/codsen/commits/55eedfa687ea7bebf55ab6ca042070d533ce3905))
- opts.mergeType ([7efa4db](https://git.sr.ht/~royston/codsen/commits/7efa4dbc2346ab17256858ff1118d304a9ac9d0e))
- ranges.replace() ([f0a2de0](https://git.sr.ht/~royston/codsen/commits/f0a2de0af157d97b3876c4bfd8f6ee60b67e867f))
- Remove check-types-mini for perf reasons and also to reduce Lerna ECYCLE warnings ([50be5d8](https://git.sr.ht/~royston/codsen/commits/50be5d83152910d65c4cf50f1c06b8078fdc4dae))
- remove couple dependencies and rebase a little bit ([616b47d](https://git.sr.ht/~royston/codsen/commits/616b47df0ef6a5a72f766d690b0169608e39a4d9))

### Reverts

- restores back as it was before, no changes to opts.limitToBeAddedWhitespace ([f0b36f3](https://git.sr.ht/~royston/codsen/commits/f0b36f3fd6cc7ac4f307e4f00867e03ccf1b5038))

### BREAKING CHANGES

- Second input argument, progressFn, was moved into opts.progressFn and opts was
placed into second input argument instead

## 3.7.0 (2020-02-01)

### Features

- remove couple dependencies and rebase a little bit ([616b47d](https://gitlab.com/codsen/codsen/commit/616b47df0ef6a5a72f766d690b0169608e39a4d9))

## 3.6.0 (2019-09-14)

### Features

- non-breaking spaces are now retained when pushing with whitespace limiter option on ([2de001d](https://gitlab.com/codsen/codsen/commit/2de001d))

## 3.5.0 (2019-09-11)

### Features

- improved whitespace insertion algorithm ([b8c4463](https://gitlab.com/codsen/codsen/commit/b8c4463))

### Reverts

- restores back as it was before, no changes to opts.limitToBeAddedWhitespace ([f0b36f3](https://gitlab.com/codsen/codsen/commit/f0b36f3))

## 3.4.0 (2019-09-04)

### Features

- accept nulls among pushed values, do not throw, just do nothing ([4badda3](https://gitlab.com/codsen/codsen/commit/4badda3))

## 3.3.0 (2019-08-08)

### Features

- opts.mergeType ([7efa4db](https://gitlab.com/codsen/codsen/commit/7efa4db))

## 3.2.0 (2019-06-18)

### Features

- Remove check-types-mini for perf reasons and also to reduce Lerna ECYCLE warnings ([50be5d8](https://gitlab.com/codsen/codsen/commit/50be5d8))

## 3.1.0 (2019-06-01)

### Features

- ranges.replace() ([f0a2de0](https://gitlab.com/codsen/codsen/commit/f0a2de0))

## 2.16.0 (2019-01-20)

- ✨ Various documentation and setup tweaks after we migrated to monorepo
- ✨ Setup refresh: updated dependencies and all config files using automated tools

## 2.13.0 (2018-12-26)

- ✨ Harden the type checks just in case ([106ae7a](https://gitlab.com/codsen/codsen/tree/master/packages/ranges-push/commits/106ae7a))
- ✨ Implement throw pinning in unit tests ([6b8c789](https://gitlab.com/codsen/codsen/tree/master/packages/ranges-push/commits/6b8c789))
- ✨ Omit the 3rd argument when it's equal to an empty string ([343c153](https://gitlab.com/codsen/codsen/tree/master/packages/ranges-push/commits/343c153))
- ✨ Add `opts.limitLinebreaksCount` ([55eedfa](https://gitlab.com/codsen/codsen/tree/master/packages/ranges-push/commits/55eedfa))

## 2.12.0 (2018-10-25)

- ✨ Updated all dependencies
- ✨ Restored coveralls.io reporting
- ✨ Restored unit test linting

## 2.11.0 (2018-07-26)

- ✨ If third argument is an empty string, now it's being completely omited. This is necessary for unit tests' sanity. Otherwise, it's impossible to `deepEqual`-match.

## 2.10.0 (2018-07-03)

- ✨ Added `opts.limitLinebreaksCount` - this will allow double linebreaks resulting in an empty row between the content lines.

## 2.9.0 (2018-06-18)

- ✨ Rename to `ranges-push` and migrate to Bitbucket

## 2.8.0 (2018-05-19)

- ✨ Fixed second input argument throw error message reporting. Previously, when second argument was of a wrong type, the first argument's details were reported which caused confusion. Fixed now.
- ✨ Throw error pinning in unit tests. Otherwise we would not be able to prove this feature above is correctly implemented. Both before and after were throwing an error. The correctness is distinguished by _which_ error exactly, (first arg's wrong type) `THROW_ID_09` or (newly added second arg's wrong type) `THROW_ID_10`. I'd go as far as to say, if _throw pinning_ was implemented at the beginning, this bug would not have happened.

## 2.7.0 (2018-05-11)

Setup refresh.

- ✨ Set up [Prettier](https://prettier.io)
- ✨ Removed `package.lock` and `.editorconfig`
- ✨ Wired Rollup to remove comments from non-dev builds. This means we can now leave the `console.log`s in the source code — Rollup will remove them from production code.
- ✨ Unit tests are pointing at ES modules build, which means that code coverage is correct now, without Babel functions being missed

## 2.6.0 (2018-02-24)

- ✨ Chillax™ feature. If `null` is being `.push`ed, nothing happens. It won't `throw` from now on.

## 2.5.0 (2018-02-10)

- ✨ Now accepts output of another slices class (its `.current()` output) as the first input argument. Now, it won't throw an error that second argument is missing, provided the validation of the array from the 1st argument passes.

  In practice, I'm going to use it in [string-remove-duplicate-heads-tails](https://www.npmjs.com/package/string-remove-duplicate-heads-tails) for example, where I there will be two-step process. Range comes in as a plausible range, then we traverse further and if further ranges are found, that plausible-one is merged into the real ranges slices array class. This merging up until now was a problem - it could only be done iterating one array and `.push`ing each range one-by-one into another slices array.

- 🔧 Because of the above I had to rewrite the whole validation and error throwing part. All unit tests are the same and more were added, so there shoud not be any breaking changes.

## 2.4.0 (2018-01-18)

- ✨ `opts.limitToBeAddedWhitespace` now also collapses the leading and trailing whitespace. If any chunk of leading whitespace (anything that would get `trim()`'med) contain line break `\n`, it's turned into `\n`. Otherwise, it's turned into single space.

```js
// does nothing to trimmed strings:
'aaa' => 'aaa'
// if leading or trailing whitespace doesn't contain \n, collapse to a single space
'  aaa   ' => ' aaa '
// otherwise, collapse to a single \n
'     \n\n   aaa  \n\n\n    ' => '\naaa\n'
```

## 2.3.0 (2018-01-16)

- ✨ `.push` as an alias for `.add`. Both do the same thing. I thought the name of this package has "push" so why there is no such method? Until now, that is.

## 2.2.0 (2017-12-29)

- ✨ When third argument is `null`, any merged range results will have there `null`.

## 2.1.0 (2017-12-20)

- ✨ `opts.limitToBeAddedWhitespace` - makes life easier when cleaning HTML. Now, chunk ranges can contain any amount of whitespace - the `current()` will run `string-collapse` on the to-be-inserted, third argument. Now, if there are any line breaks among the whitespace characters, the result will be a single line break instead. Basically, when this setting is active, only space or linebreak will be inserted in place of deleted range.

What this feature gives you is you can activate it and freely push chunks of string in, extracting whitespace along it and pushing it too. You don't need to care about excessive amount of it - this library will truncate it automatically. It's very handy when stripping strings from [HTML tags](https://www.npmjs.com/package/string-strip-html) for example.

## 2.0.0 (2017-12-05)

- ✨ Rewrite in ES modules
- ✨ Now serving three builds: CommonJS, UMD and ES modules, all wired up to appropriate end-points on `package.json`
- ✨ If you have two ranges where second-one completely overlaps the first-one and the first has third argument, something to insert in its place, that third argument will be discarded upon merge.

  Let's say you got these two ranges:

  ```js
  [
    [5, 6, " "],
    [1, 10],
  ];
  ```

  Previously, result would be `[1, 10, ' ']`. Now result will be `[1, 10]`. This is logical, because each range should take care to consider its vicinity. If `[1, 10]` came in without instructions to add something in its place, we assume this was intentional.

## 1.6.0 (2017-09-25)

- ✨ Actually serving the transpiled version as default. Sorry about that. Now the transpiled source is wired to `package.json` `main`. The proper Rollup setup (UMD, ESJ and ESM builds) is in coming next.

## 1.5.0 (2017-09-18)

- ✨ Separated the merging function into a separate library, [ranges-merge](https://www.npmjs.com/package/ranges-merge).

## 1.4.0 (2017-09-12)

- ✨ Separated ranges sorting function into a [separate library](https://www.npmjs.com/package/ranges-sort) because it will be needed in [Detergent](https://www.npmjs.com/package/detergent).
- ✨ Replaced JS Standard with ESLint on `airbnb-base` config with two exceptions: 1. no semicolons and 2. allow plus-plus in `for`-loops. For posterity JS Standard has been neglected by its maintainers, currently it's using half-year old version of ESLint, and doesn't tap to majority of its rules. After activating ESLint, it found some style issues that needed fixing. I like that.

## 1.3.0 (2017-08-30)

- ✨ Transpiled version is available from the folder `/es5/`.

## 1.2.0 (2017-08-16)

- 🔧 The input validation was not passing through the zero indexes for `.add()` because natural number checks were not including zero. Sorted now.

## 1.1.0 (2017-07-31)

- ✨ An improvement to the algorithm which doesn't change API: sorting and merging is now done upon querying `.current()`, not during `.add()`. This guarantees maximum data precision, especially if you don't do any `.add()` after calling `.current()` and processing the slices array using [string-replace-slices-array](https://www.npmjs.com/package/ranges-apply).

## 1.0.0 (2017-07-28)

- ✨ First public release
