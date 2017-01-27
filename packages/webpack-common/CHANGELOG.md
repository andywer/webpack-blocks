# @webpack-blocks/webpack-common - Changelog

## 0.4.0

- Added `parseVersion()`
- Updated `dev-server` logic to make it composable (calling it multiple times in a single config works as expected; see [#78](https://github.com/andywer/webpack-blocks/pull/78))
- Updated `extract-text` logic to make it work with updated `webpack-merge` (see [#77](https://github.com/andywer/webpack-blocks/pull/77))
- Improved tests for `devServer` and turned its unit tests to integration tests

## 0.3.0

Initial release.
