# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.9.38](https://gitlab.com/codsen/codsen/compare/string-convert-indexes@1.9.37...string-convert-indexes@1.9.38) (2019-08-18)

**Note:** Version bump only for package string-convert-indexes





## 1.9.0 (2019-01-20)

- ✨ Various documentation and setup tweaks after we migrated to monorepo
- ✨ Setup refresh: updated dependencies and all config files using automated tools

## 1.6.0 (2018-10-25)

- ✨ Update all dependencies
- ✨ Restore coveralls.io reporting
- ✨ Restore unit test linting

## 1.5.0 (2018-08-19)

- ✨ Rebase code to remove any `if (DEBUG)` statements - now `console.log` comments can be left in place - they will be removed during non-dev Rollup builds
- ✨ Refresh the setup - temporarily remove `nyc` and update all dependencies

## 1.4.0 (2018-06-29)

- ✨ Set up Rollup to remove comments from the code

## 1.3.0 (2018-06-16)

GitHub sold us out. In the meantime, we:

- ✨ Migrate to BitBucket (to host repo + perform CI) and Codacy (for code quality audit)
- ✨ Drop BitHound (RIP) and Travis

## 1.2.0 (2018-05-10)

- ✨ Set up [Prettier](https://prettier.io)
- ✨ Remove `package.lock` and `.editorconfig`
- ✨ Wire up Rollup to remove comments from non-dev builds. This means we can now leave the `console.log`s in the source code — Rollup will remove from production code.
- ✨ Point the unit tests at the _ES modules_ build, which means that code coverage is correct now, without Babel functions being missed

## 1.1.0 (2017-12-27)

- ✨ Now, this library can convert the next index, right outside of the last character.

Imagine, you have a string, astral character `\uD834\uDF06`. Now describe its contents in terms of `String.slice()` range. That would be `[0, 2]`. Now, this index \#2 is outside of the string character indexes range! We have only `\uD834` at \#0 and `\uDF06` at \#1. There's no \#2!

Previously, this \#2 would have caused an error. Now it does not. We can actually calculate and convert the next character, right outside of the string too. After all, the calculation needs just the lengths of all the characters BEFORE it, and we have that!

Practically, this is very important feature, it means we now can convert the ranges that include string's last character.

## 1.0.0 (2017-12-25)

- ✨ First public release
