# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.5.42](https://gitlab.com/codsen/codsen/compare/js-row-num-cli@1.5.41...js-row-num-cli@1.5.42) (2019-09-04)

**Note:** Version bump only for package js-row-num-cli





## 1.5.0 (2019-01-20)

- ✨ Various documentation and setup tweaks after we migrated to monorepo
- ✨ Setup refresh: updated dependencies and all config files using automated tools

## 1.3.0 (2018-12-26)

- ✨ Implement **atomic file write** ([b9a3c2b](https://gitlab.com/codsen/codsen/tree/master/packages/js-row-num-cli/commits/b9a3c2b))
- ✨ Improved messages when zero files found + promisified write function ([83d2bee](https://gitlab.com/codsen/codsen/tree/master/packages/js-row-num-cli/commits/83d2bee))

## 1.2.0 (2018-09-20)

- ✨ Properly set the message when there were zero files to update
- ✨ Promisified the atomic write function

## 1.1.0 (2018-09-18)

- ✨ Now file writing is done [atomically](https://github.com/npm/write-file-atomic), the write operation now cannot be interrupted or "partially" performed. Practically, this means, it will be not possible to accidentally damage the processed `.js` file there's a clash between other programs (code editors, for example) reading it. I has happened to me in the past that `.js` file accidentally gets written to be blank. No more!
- ✨ Additionally, now we have a check implemented, is the freshly-read `.js` file not blank. If it's blank, nothing is written.

## 1.0.0 (2018-07-12)

- ✨ First public release
