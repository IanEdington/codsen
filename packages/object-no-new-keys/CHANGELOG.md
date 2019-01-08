# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.4.0](https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys/compare/object-no-new-keys@2.3.7...object-no-new-keys@2.4.0) (2019-01-08)


### Features

* Add one more tag before which there will be a line break ([4f00871](https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys/commits/4f00871))





## [2.3.7](https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys/compare/object-no-new-keys@2.3.6...object-no-new-keys@2.3.7) (2019-01-02)

**Note:** Version bump only for package object-no-new-keys

## [2.3.6](https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys/compare/object-no-new-keys@2.3.5...object-no-new-keys@2.3.6) (2019-01-01)

**Note:** Version bump only for package object-no-new-keys

## [2.3.5](https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys/compare/object-no-new-keys@2.3.4...object-no-new-keys@2.3.5) (2018-12-29)

**Note:** Version bump only for package object-no-new-keys

## [2.3.4](https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys/compare/object-no-new-keys@2.3.3...object-no-new-keys@2.3.4) (2018-12-29)

**Note:** Version bump only for package object-no-new-keys

## [2.3.3](https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys/compare/object-no-new-keys@2.3.2...object-no-new-keys@2.3.3) (2018-12-27)

**Note:** Version bump only for package object-no-new-keys

## [2.3.2](https://bitbucket.org/codsen/codsen/src/master/packages/object-no-new-keys/compare/object-no-new-keys@2.3.1...object-no-new-keys@2.3.2) (2018-12-27)

**Note:** Version bump only for package object-no-new-keys

## 2.3.1 (2018-12-26)

**Note:** Version bump only for package object-no-new-keys

## 2.3.0 (2018-10-24)

- ✨ Updated all dependencies
- ✨ Restored coveralls.io reporting
- ✨ Restored unit test linting

## 2.2.0 (2018-06-16)

GitHub sold us out. In the meantime, we:

- ✨ Migrated to Bitbucket (to host repo + perform CI) and Codacy (for code quality audit)
- ✨ Dropped BitHound (RIP) and Travis

## 2.1.0 (2018-05-26)

- ✨ Set up [Prettier](https://prettier.io) on a custom ESLint rule set.
- ✨ Removed `package.lock` and `.editorconfig`
- ✨ Wired Rollup to remove comments from non-dev builds. This means we can now leave the `console.log`s in the source code — there's no need to comment-out `console.log` statements or care about them not spilling into production. Now it's done automatically.
- ✨ Unit tests are pointing at ES modules build, which means that code coverage is correct now, without Babel functions being missed. This is important because now code coverage is real again and now there are no excuses not to perfect it.

# 2.0.0 (2017-12-12)

- ✨ Rebased in ES Modules
- ✨ Set up Rollup. Now we generate and serve three builds: CommonJS, UMD and ES Modules.
- ✨ Whole setup overhaul to match my latest understanding how things should be set.

## 1.1.0 (2017-07-25)

- ✨ Since mode is integer, some people might pass integer as a third argument (instead of if passing plain object, `{mode: 1||2}`. I added a human-friendly error message which explains it's wrong if it's happens.

- `object-assign` from dependencies, switched to native ES6 `Object.assign`
- `type-detect` replacing it with 10 times lighter `lodash.isplainobject`

## 1.0.0 (2017-05-15)

- First public release
