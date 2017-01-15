# @webpack-blocks/webpack - Changelog

## Next release

- Provide `createConfig.vanilla()` (see [#80](https://github.com/andywer/webpack-blocks/issues/80))
- Breaking change: Removed `node_modules/` exclusion from default css-loader

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
