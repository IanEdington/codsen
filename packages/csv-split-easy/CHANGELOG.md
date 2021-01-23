# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 5.0.0 (2021-01-23)


### Bug Fixes

* Fix the Create New Issue URLs ([f5a41bf](https://github.com/codsen/codsen/commit/f5a41bf16fd8f43de7f8e7de68da562821ddb960))


### Features

* Add one more tag before which there will be a line break ([d178203](https://github.com/codsen/codsen/commit/d1782036b134102fd552d38d2d4f39c93195620b))
* Initial release ([8db2df9](https://github.com/codsen/codsen/commit/8db2df9fb08d66cf6c7a75a57cdcd15a5ec12c1c))
* Merge modes via opts.mergeType ([2394464](https://github.com/codsen/codsen/commit/2394464976ce1970bcd31b45d9fd9955f4bbcc09))
* rebase, split tests into separate files and add examples ([8d18785](https://github.com/codsen/codsen/commit/8d187857ee1765aa16d0fd9aa2410f183e0d4257))
* rewrite in TS, start using named exports ([c7b2268](https://github.com/codsen/codsen/commit/c7b226840e6f49464d2e1ebf3486ea4d8fd86b26))


### Performance Improvements

* remove check-types-mini ([2ed86fe](https://github.com/codsen/codsen/commit/2ed86fe981414023dad150a4e0a7833f19caa315))


### BREAKING CHANGES

* previously: "import splitEasy from ..." - now "import { splitEasy } from ..."
* Second input argument, progressFn, was moved into opts.progressFn and opts was
placed into second input argument instead





## 4.0.0 (2020-11-28)

Accidental version bump during migration to sourcehut. Sorry about that.

## 3.1.0 (2020-09-27)

### Features

- rebase, split tests into separate files and add examples ([18e0373](https://gitlab.com/codsen/codsen/commit/18e0373c01f4e2cd4af2ceaf1b4719954b054291))

## 3.0.37 (2019-10-05)

### Performance Improvements

- remove check-types-mini ([4eae010](https://gitlab.com/codsen/codsen/commit/4eae010))

## 2.6.0 (2019-01-20)

- ✨ Various documentation and setup tweaks after we migrated to monorepo
- ✨ Setup refresh: updated dependencies and all config files using automated tools

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

- ✨ Set up [Prettier](https://prettier.io)
- ✨ Removed `package.lock` and `.editorconfig`
- ✨ Wired Rollup to remove comments from non-dev builds. This means we can now leave the `console.log`s in the source code — Rollup will remove from production code.

## 2.1.0 (2018-03-06)

- ✨ PR \#3 from [@mac-](https://github.com/mac-) now caters double quotes wrapping double quotes, used as a means of escaping code
- 🔧 Updated dependencies. Rollup is continuously improving and build sizes are getting smaller.

## 2.0.0 (2017-11-08)

- ✨ Rewrote in ES modules, set up the Rollup
- ✨ Removes Standard and set up raw ESLint on `airbnb-base` config with semicolons off
- ✨ Additional checks on options object

## 1.3.0 (2017-08-16)

- ✨ `opts.removeThousandSeparatorsFromNumbers`. On by default. That's `string-remove-thousand-separators` ([npm](https://www.npmjs.com/package/string-remove-thousand-separators), [GitLab](https://gitlab.com/codsen/codsen/tree/master/packages/string-remove-thousand-separators)) internally doing it.
- ✨ `opts.padSingleDecimalPlaceNumbers`. On by default. `10.2` → `10.20`.
- ✨ `opts.forceUKStyle`. Off by default. `10,15` → `10.15`.

## 1.2.0 (2017-08-13)

- ✨ Now algorithm skips empty rows, where each column within the row contains only empty space.

## 1.1.0 (2017-08-13)

- ✨ Automatic trimming of all leading and trailing whitespace. Some IDE's (like Atom) add a trailing empty line at the end of a file. If you opened a CSV and saved it over, such IDE's would a trailing empty line. `csv-split-easy` automatically trims all whitespace in front and in the end of an incoming string now, so such whitespace should not be an issue now.

## 1.0.0 (2017-08-13)

- ✨ First public release
