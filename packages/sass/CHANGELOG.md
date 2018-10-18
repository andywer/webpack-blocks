# @webpack-blocks/sass - Changelog

## 2.0.0-alpha.1

- Major version upgrade of `css-loader` to the
  [1.0.0](https://github.com/webpack-contrib/css-loader/releases/tag/v1.0.0)
  ([#291](https://github.com/andywer/webpack-blocks/pull/291))
- Deprecate `minimize` option after
  [the css-loader removed it](https://github.com/webpack-contrib/css-loader/releases/tag/v1.0.0)
  ([#291](https://github.com/andywer/webpack-blocks/pull/291))
- Remove `css-loader` and `style-loader` from the `use` option
  ([#294](https://github.com/andywer/webpack-blocks/pull/294))

## 2.0.0-alpha

- Support for webpack 4 ([#261](https://github.com/andywer/webpack-blocks/pull/261))

## 1.0.0-rc

- Add `minimize` option

## 1.0.0-beta.2

- Update dependency versions

## 1.0.0-beta

- Make compatible with `match()`

## 1.0.0-alpha

- Updated for new core API ([#125](https://github.com/andywer/webpack-blocks/issues/125))
- Requires node 6+

## 0.4.0

- No changes, just keeping the version numbers in sync

## 0.3.0

- Adapted to new API: Using `context` now

## 0.1.2

- Allow setting custom `node-sass` options (see
  [#15](https://github.com/andywer/webpack-blocks/issues/15))

## 0.1.1

- `loaders: [ 'style', 'css', 'sass' ]` =>
  `loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]`

## 0.1.0

Initial release.
