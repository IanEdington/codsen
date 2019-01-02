# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.4.6](https://bitbucket.org/codsen/codsen/src/master/packages/csv-split-easy/compare/csv-split-easy@2.4.5...csv-split-easy@2.4.6) (2019-01-01)

**Note:** Version bump only for package csv-split-easy





## [2.4.5](https://bitbucket.org/codsen/codsen/src/master/packages/csv-split-easy/compare/csv-split-easy@2.4.4...csv-split-easy@2.4.5) (2018-12-29)

**Note:** Version bump only for package csv-split-easy





## [2.4.4](https://bitbucket.org/codsen/codsen/src/master/packages/csv-split-easy/compare/csv-split-easy@2.4.3...csv-split-easy@2.4.4) (2018-12-29)

**Note:** Version bump only for package csv-split-easy





## [2.4.3](https://bitbucket.org/codsen/codsen/src/master/packages/csv-split-easy/compare/csv-split-easy@2.4.2...csv-split-easy@2.4.3) (2018-12-27)

**Note:** Version bump only for package csv-split-easy





## [2.4.2](https://bitbucket.org/codsen/codsen/src/master/packages/csv-split-easy/compare/csv-split-easy@2.4.1...csv-split-easy@2.4.2) (2018-12-27)

**Note:** Version bump only for package csv-split-easy





## 2.4.1 (2018-12-26)

**Note:** Version bump only for package csv-split-easy





## 2.4.0 (2018-10-17)

- ✨ Updated all dependencies
- ✨ Restored unit test coverage tracking: reporting in terminal and coveralls.io
- ✨ Restored unit test linting

## 2.3.0 (2018-06-11)

GitHub sold us out. In the meantime, we:

- ✨ Migrated to BitBucket (to host repo + perform CI) and Codacy (for code quality audit)
- ✨ Dropped BitHound (RIP) and Travis
- ✨ Removed `package-lock`

## 2.2.0 (2018-05-03)

### Added

- ✨ Set up [Prettier](https://prettier.io)
- ✨ Removed `package.lock` and `.editorconfig`
- ✨ Wired Rollup to remove comments from non-dev builds. This means we can now leave the `console.log`s in the source code — Rollup will remove from production code.

## 2.1.0 (2018-03-06)

### Added

- ✨ PR [#3](https://bitbucket.org/codsen/csv-split-easy/pull/3) from [@mac-](https://github.com/mac-) now caters double quotes wrapping double quotes, used as a means of escaping code
- 🔧 Updated dependencies. Rollup is continuously improving and build sizes are getting smaller.

# 2.0.0 (2017-11-08)

### Added

- ✨ Rewrote in ES modules, set up the Rollup
- ✨ Removes Standard and set up raw ESLint on `airbnb-base` config with semicolons off
- ✨ Additional checks on options object

## 1.3.0 (2017-08-16)

### Added

- ✨ `opts.removeThousandSeparatorsFromNumbers`. On by default. That's [string-remove-thousand-separators](https://bitbucket.org/codsen/string-remove-thousand-separators) internally doing it.
- ✨ `opts.padSingleDecimalPlaceNumbers`. On by default. `10.2` → `10.20`.
- ✨ `opts.forceUKStyle`. Off by default. `10,15` → `10.15`.

## 1.2.0 (2017-08-13)

### Added

- ✨ Skips empty rows, where each column within the row contains only empty space.

## 1.1.0 (2017-08-13)

### Added

- ✨ Automatic trimming of all leading and trailing whitespace. Some IDE's (like Atom) add a trailing empty line at the end of a file. If you opened a CSV and saved it over, such IDE's would a trailing empty line. `csv-split-easy` automatically trims all whitespace in front and in the end of an incoming string now, so such whitespace should not be an issue now.

## 1.0.0 (2017-08-13)

- First public release
