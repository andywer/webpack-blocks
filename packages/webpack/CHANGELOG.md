# @webpack-blocks/webpack - Changelog

## Next release

- Fail with meaningful message if `createConfig()` is called with invalid param ([#110](https://github.com/andywer/webpack-blocks/issues/110))

## 0.4.0

- Provide `createConfig.vanilla()` (see [#80](https://github.com/andywer/webpack-blocks/issues/80))
- Added `webpackVersion` to context
- Breaking change: Removed `node_modules/` exclusion from default css-loader
- Using `webpack-merge` v2.3 instead of v0.14

## 0.3.0

- Provide `group()` for creating presets
- Provide `performance()` for webpack performance budgeting

## 0.2.0

- Normalize entry points to object syntax to fix entry point merging issues (see [#21](https://github.com/andywer/webpack-blocks/pull/21))

## 0.1.5

- Add empty string to `resolve.extensions` again (https://github.com/andywer/webpack-blocks/pull/21)

## 0.1.4

- Use explicit `-loader` suffix
- Remove empty string from `resolve.extensions`

## 0.1.3

- Bugfix: `context` and `output.path` paths are now absolute as they are supposed to be

## 0.1.2

- Bugfix: Can now safely call `addPlugins()` with an empty array

## 0.1.1

- Export `webpack` for convenience

## 0.1.0

Initial release.
