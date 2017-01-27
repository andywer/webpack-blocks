# @webpack-blocks/core - Changelog

## 0.4.0

- Changed signature of `createConfig()` to allow passing `context.webpackVersion`
- Upgraded `webpack-merge` to v2.3
- Fixed a bug where the config passed to blocks as parameter might contain duplicate values (see [#79](https://github.com/andywer/webpack-blocks/pull/79))
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
