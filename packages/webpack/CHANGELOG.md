# @webpack-blocks/webpack - Changelog

## Next version

- Added `when()` ([#242](https://github.com/andywer/webpack-blocks/issues/242))

## 1.0.0-rc

- Added `setEnv()` ([#206](https://github.com/andywer/webpack-blocks/pull/206))

## 1.0.0-beta.3

- Make resolve() prepend custom extensions ([#177](https://github.com/andywer/webpack-blocks/issues/177))
- Let core `createConfig()` validate the passed setters ([#171](https://github.com/andywer/webpack-blocks/issues/171))

## 1.0.0-beta.2

- Made webpack a peer dependency ([#169](https://github.com/andywer/webpack-blocks/issues/169))
- Made compatible with webpack v3 ([#169](https://github.com/andywer/webpack-blocks/issues/169))

## 1.0.0-beta

- Added `match()`
- Added `resolve()`, deprecate `resolveAliases()`

## 1.0.0-alpha

- Updated for new core API ([#125](https://github.com/andywer/webpack-blocks/issues/125))
- Fail with meaningful message if `createConfig()` is called with invalid param ([#110](https://github.com/andywer/webpack-blocks/issues/110))
- Added `text/html` file type (in `@webpack-blocks/core`)
- Requires node 6+

## 0.4.0

- Provide `createConfig.vanilla()` (see [#80](https://github.com/andywer/webpack-blocks/issues/80))
- Added `webpackVersion` to context
- Breaking change: Removed `node_modules/` exclusion from default css-loader
- Using `webpack-merge` v2.3 instead of v0.14
- Using `webpack` v2.2 instead of its RC

## 0.3.1

- Remove the `json-loader` config & depedency, since webpack 2 comes with a default json-loader config (#63)

## 0.3.0

Initial non-beta release. Aligned with the v0.3 release changes.

- Provide `group()` for creating presets
- Provide `performance()` for webpack performance budgeting
- Updated dependency: Using webpack 2 release candidate

## 0.1.0-beta

Initial beta release.
