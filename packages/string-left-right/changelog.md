# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 2.0.0 (2019-03-04)

### Features

- Initial release ([6a3394b](https://gitlab.com/codsen/codsen/commit/6a3394b))
- Merge modes via opts.mergeType ([7fb1c5f](https://gitlab.com/codsen/codsen/commit/7fb1c5f))

### BREAKING CHANGES

- Second input argument, progressFn, was moved into opts.progressFn and opts was
placed into second input argument instead

## 1.10.7 (2019-02-10)

### Bug Fixes

- Fix the Create New Issue URLs ([c5ee4a6](https://gitlab.com/codsen/codsen/commit/c5ee4a6))

## 1.10.0 (2019-01-20)

- ✨ Various documentation and setup tweaks after we migrated to monorepo
- ✨ Setup refresh: updated dependencies and all config files using automated tools

## 1.6.0 (2018-12-26)

### Features

- improvements to opts.addSingleSpaceToPreventAccidentalConcatenation ([8bb929a](https://gitlab.com/codsen/codsen/tree/master/packages/string-left-right/commits/8bb929a))
- opts.addSingleSpaceToPreventAccidentalConcatenation ([19b1390](https://gitlab.com/codsen/codsen/tree/master/packages/string-left-right/commits/19b1390))
- opts.addSingleSpaceToPreventAccidentalConcatenation improvements ([47df5be](https://gitlab.com/codsen/codsen/tree/master/packages/string-left-right/commits/47df5be))

## 1.5.0 (2018-10-26)

- ✨ Updated all dependencies
- ✨ Restored coveralls.io reporting
- ✨ Restored unit test linting

## 1.4.0 (2018-09-20)

- ✨ Improvements to `opts.addSingleSpaceToPreventAccidentalConcatenation`, now it detects is there at least one digit or number around and if there's none, it doesn't add a space.

## 1.3.0 (2018-09-20)

- ✨ Improvements to cases when `opts.ifLeftSideIncludesThisThenCropTightly`/`opts.ifRightSideIncludesThisThenCropTightly` is an array
- ✨ Now we tend an edge case when `opts.addSingleSpaceToPreventAccidentalConcatenation` is surrounded by characters, whitelisted by `opts.ifLeftSideIncludesThisThenCropTightly` and `opts.ifRightSideIncludesThisThenCropTightly` (or just one of them, but then the other is a falsey empty string). In that case, the compensation space is not added.

## 1.2.0 (2018-09-18)

- ✨ New feature - `opts.addSingleSpaceToPreventAccidentalConcatenation`. It's off by default but if it's on, it can prevent accidental concatenation of string when chunk is deleted. It checks the outer edges of the string range what is about to be deleted and if non-whitespace surrounds both sides it adds a single space (as range's third argument).

## 1.0.0 (2018-09-11)

- ✨ First public release