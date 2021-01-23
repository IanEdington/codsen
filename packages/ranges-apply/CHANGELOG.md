# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 5.0.0 (2021-01-23)


### Bug Fixes

* actually rename files ([f831404](https://github.com/codsen/codsen/commit/f831404fdb15c521292a21ba9f76401635b1446d))
* Fix the Create New Issue URLs ([f5a41bf](https://github.com/codsen/codsen/commit/f5a41bf16fd8f43de7f8e7de68da562821ddb960))
* harden the eslint rules set and make all tests pass ([ee7d872](https://github.com/codsen/codsen/commit/ee7d87260665ddfb45d6d30fd2d5061d4ce42b6c))
* make all tests pass ([d3dfcbf](https://github.com/codsen/codsen/commit/d3dfcbf9f9ccc89776f2e7011b27d32b6a3e495c))


### Features

* 3rd input arg - progressFn ([e2e33e4](https://github.com/codsen/codsen/commit/e2e33e497081272acf1a526e0866cc6345101c14))
* accept null as second input argument, instead of ranges ([07eb055](https://github.com/codsen/codsen/commit/07eb05523bc8645ce9f3fd7aa8a57cd52277cc86))
* Add one more tag before which there will be a line break ([d178203](https://github.com/codsen/codsen/commit/d1782036b134102fd552d38d2d4f39c93195620b))
* discard any nulls among ranges ([8696454](https://github.com/codsen/codsen/commit/8696454714f4356b2341aef3307417aea964b63b))
* Initial release ([8db2df9](https://github.com/codsen/codsen/commit/8db2df9fb08d66cf6c7a75a57cdcd15a5ec12c1c))
* Merge modes via opts.mergeType ([2394464](https://github.com/codsen/codsen/commit/2394464976ce1970bcd31b45d9fd9955f4bbcc09))
* ranges-merge (sort + merge) is applied by default now to prevent errors on unsorted ranges ([85452ab](https://github.com/codsen/codsen/commit/85452abe49824e12c08ac74928b149c60a79e8e5))
* remove a dependency, speed up the program by 130% ([860b203](https://github.com/codsen/codsen/commit/860b203689b86b3e09dc491317525f39511dce3d))
* rewrite in TS and start using named exports ([202b763](https://github.com/codsen/codsen/commit/202b763cd2219d6beae0d346237b538789f4d67f))


### BREAKING CHANGES

* previously: "import rApply from ..." - now "import { rApply } from ..."
* Second input argument, progressFn, was moved into opts.progressFn and opts was
placed into second input argument instead





## 4.0.0 (2020-11-28)

Accidental version bump during migration to sourcehut. Sorry about that.

## 3.2.0 (2020-09-07)

### Bug Fixes

- make all tests pass ([d86cf1b](https://gitlab.com/codsen/codsen/commit/d86cf1bca9b0ac38e5bf141ed4ffd44c935ef51c))

### Features

- discard any nulls among ranges ([2a09e88](https://gitlab.com/codsen/codsen/commit/2a09e88fb3a7b50be255b4cfb265bf0b8542e4ee))

## 3.1.5 (2020-04-26)

### Bug Fixes

- harden the eslint rules set and make all tests pass ([3b593b4](https://gitlab.com/codsen/codsen/commit/3b593b495f645005780a26ab8d719aa7d1846dd0))

## 3.1.0 (2020-01-26)

### Features

- remove a dependency, speed up the program by 130% ([b787194](https://gitlab.com/codsen/codsen/commit/b787194c39e2e688fc50d63795412ba5339692fd))

## 2.12.0 (2019-01-20)

- ✨ Various documentation and setup tweaks after we migrated to monorepo
- ✨ Setup refresh: updated dependencies and all config files using automated tools

## 2.9.0 (2018-12-26)

- ✨ Add 3rd input arg - progressFn ([f6735e2](https://gitlab.com/codsen/codsen/tree/master/packages/ranges-apply/commits/f6735e2))
- ✨ Accept `null` as second input argument, instead of ranges ([0c59484](https://gitlab.com/codsen/codsen/tree/master/packages/ranges-apply/commits/0c59484))
- ✨ [`ranges-merge`](https://www.npmjs.com/package/ranges-merge) (sort + merge) is applied by default now to prevent errors on unsorted ranges ([35e3c4b](https://gitlab.com/codsen/codsen/tree/master/packages/ranges-apply/commits/35e3c4b))

## 2.8.0 (2018-11-29)

- ✨ Added third argument, `progressFn` — it reports progress, feeding natural numbers meaning percentage done to any function that is in the third input argument.
- ✨ Pinned all the throws on all unit tests. "Pinning unit test throws" means we not just assert the fact that function threw, but match the throw's error message too. This gives more assurance:

  1. When there are many cases when an algorithm can throw and generic "function threw" assertion is used, a unit test can anticipate one throw to be thrown but another was thrown. Generic "function threw" assertions would still pass, throw is throw after all. But not pinned throws:
  2. It's easier to sort unit tests this way (order by throw ID) in a test file
  3. It's easier to perfect the unit test coverage when throws can be easier identified.
  4. It's faster to comprehend a number compared to a sentence. "THROW_ID_01" is faster to comprehend than a full title (which can differ from other title by a single word). At the end of the day, being less tired means achieving more.

  ```js
  const error1 = t.throws(() => {
    repl();
  });
  t.match(error1.message, /THROW_ID_01/);
  ```

## 2.7.0 (2018-10-25)

- ✨ Updated all dependencies
- ✨ Restored coveralls.io reporting
- ✨ Restored unit test linting

## 2.6.0 (2018-08-29)

- ✨ Now second argument, ranges array, can be `null`. This means, output of [ranges-push](https://www.npmjs.com/package/ranges-push) classes method`.current()` can be fed directly into this library without even checking. If it's null, original string will be returned.

## 2.5.0 (2018-08-16)

- ✨ Now we merge all input ranges using [ranges-merge](https://www.npmjs.com/package/ranges-merge) because it's necessary for algorithm and we can't rely on user to always provide merged ranges only.

## 2.4.0 (2018-08-11)

- ✨ Updated error labels
- ✨ Updated all dependencies
- ✨ Removed AVA ES linting rules and `nyc` code coverage build steps because we migrated to Babel v.7 and `nyc` breaks

## 2.3.0 (2018-06-18)

- ✨ Renamed to `ranges-apply` and migrated to Bitbucket.

## 2.2.0 (2018-05-11)

- ✨ Set up [Prettier](https://prettier.io)
- ✨ Removed `package.lock` and `.editorconfig`
- ✨ Wired Rollup to remove comments from non-dev builds. This means we can now leave the `console.log`s in the source code — Rollup will remove from production code.
- ✨ Unit tests are pointing at ES modules build, which means that code coverage is correct now, without Babel functions being missed

## 2.1.0 (2018-02-13)

- ✨ Now accepts a single range as well, not only array of ranges.

## 2.0.0 (2017-11-02)

- ✨ The main source now is in ES2015 modules with `import`/`export`.
- ✨ Implemented Rollup to generate 3 flavours of this package: CommonJS, UMD and ESM `module` with `import`/`export`.

## 1.4.0 (2017-09-19)

- 🔧 Switching to ESLint on `airbnb-base` preset with semicolons-off override. JS Standard is rubbish because it's too relaxed and it's been using half-year-old ESLint. Actually it's even flagged as insecure by BitHound at the moment because of shell.js dependency two levels deep. ESLint itself is fine however.
- 💥 Removed _options_, the third input argument. It did nothing and I was expecting to add options, but now I don't want any. I removed the unused code related to options.

## 1.3.0 (2017-08-30)

- 🔧 OK, so after replacing ES6 template strings, the `let`s stopped minification of [emailcomb](https://emailcomb.com). I came up with idea to transpile the source to `/es5/index.js`, after publishing it should be available for consumption via `require('string-replace-slices-array/es5')`. Let's see how it goes.
- 🔧 I restored all template strings as they were in `v1.1.0`.
- 🔧 Tweaked the npm scripts, so ES5 version is generated as a pre-commit step.

## 1.2.0 (2017-08-29)

- 🔧 Guys, strange stuff. I was generating a production build of [emailcomb](https://emailcomb.com) and it refused to minify this library because of the first backtick in the ES6 template strings. So, I replaced them with ES5 code. Let's see how it will go.

## 1.1.0 (2017-08-16)

- 🔧 Now allowing zeros as values in ranges too. Sorry about that, the integer-checking library was not accepting zeros. Fixed now.

## 1.0.0 (2017-07-25)

- ✨ First public release
