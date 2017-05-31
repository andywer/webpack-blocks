# @webpack-blocks/babel6 - Changelog

## Next release

- Use `match()` instead of passing an `exclude` option

## 1.0

- Updated for new core API ([#125](https://github.com/andywer/webpack-blocks/issues/125))
- Requires node 6+

## 0.4.1

- Fix default `node_modules/` exclusion, so it works on windows ([#108](https://github.com/andywer/webpack-blocks/pull/108))

## 0.4.0

- No changes, just keeping the version numbers in sync

## 0.3.0

- Use `context`
- Allow passing `presets`/`plugins` to block
- May set `include` (white-list file matching), not just `exclude`

## 0.1.1

- `loaders: [ 'babel' ]` => `loaders: [ 'babel-loader' ]`

## 0.1.0

Initial release.
