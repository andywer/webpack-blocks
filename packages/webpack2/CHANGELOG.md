# @webpack-blocks/webpack2 - Changelog

## Next release

- Fail with meaningful message if `createConfig()` is called with invalid param ([#110](https://github.com/andywer/webpack-blocks/issues/110))

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
