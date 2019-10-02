# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.4.6](https://gitlab.com/codsen/codsen/compare/string-fix-broken-named-entities@2.4.5...string-fix-broken-named-entities@2.4.6) (2019-10-02)

**Note:** Version bump only for package string-fix-broken-named-entities





## 2.4.3 (2019-09-11)

### Bug Fixes

- algorithm tweaks ([fe71a2a](https://gitlab.com/codsen/codsen/commit/fe71a2a))
- treat clean nbsp sequences correctly ([061de0d](https://gitlab.com/codsen/codsen/commit/061de0d))

## 2.4.0 (2019-08-24)

### Bug Fixes

- fix &prnsim to be recognised correctly ([fd4df75](https://gitlab.com/codsen/codsen/commit/fd4df75))
- further named entity recognition fixes ([feef62b](https://gitlab.com/codsen/codsen/commit/feef62b))
- recognise false positive &nspar and also wire up false-positive array to be checked ([c5d2d2d](https://gitlab.com/codsen/codsen/commit/c5d2d2d))

### Features

- improved recognition of sandwitched named html entities without semicolons ([4aa96f7](https://gitlab.com/codsen/codsen/commit/4aa96f7))

## 2.3.0 (2019-06-01)

### Features

- Algorithm improvements and more unit tests ([23d8596](https://gitlab.com/codsen/codsen/commit/23d8596))
- Avoid false positives when adding missing ampersand onto named HTML entities ([5b48388](https://gitlab.com/codsen/codsen/commit/5b48388))
- Loosen amp fixes when ampersand is present ([49238ff](https://gitlab.com/codsen/codsen/commit/49238ff))
- Make fixing algorithm more conservative, tap the list of uncertain entities ([1806c12](https://gitlab.com/codsen/codsen/commit/1806c12))
- Move the known adhoc broken entity patterns above all-entity matching part ([c9350fa](https://gitlab.com/codsen/codsen/commit/c9350fa))
- opts.entityCatcherCb ([cb77ae9](https://gitlab.com/codsen/codsen/commit/cb77ae9))
- Programmatic tests to cover entity letter case errors and making them pass ([f3dc471](https://gitlab.com/codsen/codsen/commit/f3dc471))
- Supports numeric entities, both decimal and hex ([d07d5c4](https://gitlab.com/codsen/codsen/commit/d07d5c4))
- wrong case and whitespace recognition on all named HTML entities ([942d2cf](https://gitlab.com/codsen/codsen/commit/942d2cf))

## 2.2.0 (2019-04-06)

### Bug Fixes

- Align nbsp missing semicol error with other entities, use -malformed-nbsp ([12420e5](https://gitlab.com/codsen/codsen/commit/12420e5))
- Before recoding missing semicolon check part ([ad3394f](https://gitlab.com/codsen/codsen/commit/ad3394f))
- Checks for all named HTML entities, missing ampersands or semicolon recognition ([7762556](https://gitlab.com/codsen/codsen/commit/7762556))
- Full support of all named HTML entities - missing semicolons or ampersands ([c0b92c5](https://gitlab.com/codsen/codsen/commit/c0b92c5))
- Rebase to use all-named-html-entities instead of plain list array of entities ([434945a](https://gitlab.com/codsen/codsen/commit/434945a))
- Rudimentary protection against CSS false positive display:block ([8c14b90](https://gitlab.com/codsen/codsen/commit/8c14b90))
- Separate numeric entities for releases later ([1942303](https://gitlab.com/codsen/codsen/commit/1942303))

## 2.1.0 (2019-03-17)

### Bug Fixes

- Properly recognise false cases for double-encoded entity scenarios ([0b3eed2](https://gitlab.com/codsen/codsen/commit/0b3eed2))

### Features

- Algorithm improvements ([daa1149](https://gitlab.com/codsen/codsen/commit/daa1149))
- Improvements to recognise malformed entities and multiple encoding ([1ef1698](https://gitlab.com/codsen/codsen/commit/1ef1698))

## 2.0.0 (2019-03-04)

### Features

- ✨ Make opts.progressFn + opts.decode combo to be more precise ([f599a29](https://gitlab.com/codsen/codsen/commit/f599a29))
- ✨ Add `opts.cb` ([8f34d1c](https://gitlab.com/codsen/codsen/commit/8f34d1c))
- ✨ Add `opts.progressFn` ([869e3f0](https://gitlab.com/codsen/codsen/commit/869e3f0))

## 1.6.0 (2019-01-27)

- ✨ Add opts.decode ([ae22fea](https://gitlab.com/codsen/codsen/tree/master/packages/string-fix-broken-named-entities/commits/ae22fea))

## 1.5.0 (2019-01-27)

- ✨ Add opts.decode ([ae22fea](https://gitlab.com/codsen/codsen/tree/master/packages/string-fix-broken-named-entities/commits/ae22fea))

## 1.4.0 (2019-01-20)

- ✨ Various documentation and setup tweaks after we migrated to monorepo
- ✨ Setup refresh: updated dependencies and all config files using automated tools

## 1.1.0 (2018-10-25)

- ✨ Update all dependencies
- ✨ Restore coveralls.io reporting
- ✨ Restore unit test linting

## 1.0.0 (2018-08-29)

- ✨ First public release
