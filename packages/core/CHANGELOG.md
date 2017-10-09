# @webpack-blocks/core - Changelog

## Next release

- Add `inspect` method

## 1.0.0-beta.2

- More useful error message when passing invalid blocks to `createConfig()` ([#171](https://github.com/andywer/webpack-blocks/issues/171))
- Less noisy default options

## 1.0.0-beta

- Added `match()`

## 1.0.0-alpha

- New block API ([#125](https://github.com/andywer/webpack-blocks/issues/125))
- Added `text/html` file type
- Dropped transpiling, requires node 6+

## 0.4.0

- Changed signature of `createConfig()` to allow passing `context.webpackVersion`
- Using `webpack-merge` v2.3 instead of v0.14
- Fixed a bug where the config passed to blocks as parameter might contain duplicate values (see [#79](https://github.com/andywer/webpack-blocks/pull/79))
- Added `application/x-typescript` file type
- Added `text/x-less` file type

## 0.3.0

- Breaking API change: Added `context` object
- Implement `group()` for creating presets

## 0.1.2

- Fixes `env()` merging already everything, resulting in duplicate config props (see [#29](https://github.com/andywer/webpack-blocks/issues/29))

## 0.1.1

- Ensure `env()` passes webpack config properly to setters. (see [#2](https://github.com/andywer/webpack-blocks/issues/2))

## 0.1.0

Initial release.
