# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.5.0] - 2018-08-19

- ✨ Rebased code to remove any `if (DEBUG)` statements - now `console.log` comments can be left in place - they will be removed during non-dev Rollup builds
- ✨ Refreshed the setup - temporarily removed `nyc` and updated all dependencies

## [1.4.0] - 2018-06-29

- ✨ Set up Rollup to remove comments from the code

## [1.3.0] - 2018-06-16

GitHub sold us out. In the meantime, we:

- ✨ Migrated to BitBucket (to host repo + perform CI) and Codacy (for code quality audit)
- ✨ Dropped BitHound (RIP) and Travis

## [1.2.0] - 2018-05-10

### Added

- ✨ Set up [Prettier](https://prettier.io)
- ✨ Removed `package.lock` and `.editorconfig`
- ✨ Wired Rollup to remove comments from non-dev builds. This means we can now leave the `console.log`s in the source code — Rollup will remove from production code.
- ✨ Unit tests are pointing at ES modules build, which means that code coverage is correct now, without Babel functions being missed

## [1.1.0] - 2017-12-27

### Added

- ✨ Now, this library can convert the next index, right outside of the last character.

Imagine, you have a string, astral character `\uD834\uDF06`.
Now describe its contents in terms of `String.slice()` range.
That would be `[0, 2]`. Now, this index \#2 is outside of the string character
indexes range! We have only `\uD834` at \#0 and `\uDF06` at \#1. There's no \#2!

Previously, this \#2 would have caused an error. Now it does not. We can actually
calculate and convert the next character, right outside of the string too. After
all, the calculation needs just the lengths of all the characters BEFORE it, and
we have that!

Practically, this is very important feature, it means we now can convert the ranges
that include string's last character.

## 1.0.0 - 2017-12-25

### New

- ✨ First public release

[1.1.0]: https://bitbucket.org/codsen/string-fix-broken-named-entities/branches/compare/v1.1.0%0Dv1.0.2#diff
[1.2.0]: https://bitbucket.org/codsen/string-fix-broken-named-entities/branches/compare/v1.2.0%0Dv1.1.4#diff
[1.3.0]: https://bitbucket.org/codsen/string-fix-broken-named-entities/branches/compare/v1.3.0%0Dv1.2.1#diff
[1.4.0]: https://bitbucket.org/codsen/string-fix-broken-named-entities/branches/compare/v1.4.0%0Dv1.3.0#diff
[1.5.0]: https://bitbucket.org/codsen/string-fix-broken-named-entities/branches/compare/v1.5.0%0Dv1.4.0#diff