# @webpack-blocks/postcss - Changelog

## 0.4.3

- Bug fix: Fix loading of `postcss.config.js` ([#137](https://github.com/andywer/webpack-blocks/pull/137))

## 0.4.2

- Bug fix: Fix `postcss`/`sass` crash when using webpack 2 and source maps ([#116](https://github.com/andywer/webpack-blocks/issues/116))

## 0.4.1

- Made `plugins` parameter optional ([#112](https://github.com/andywer/webpack-blocks/issues/112))

## 0.4.0

- Breaking change: Dropped the default `node_modules/` exclusion

## 0.3.2

- Bug fix: PostCSS plugin configuration now works with webpack 2 ([#68](https://github.com/andywer/webpack-blocks/issues/68))

## 0.3.1

- Supporting custom PostCSS options now (`parser`, `stringifier`, `syntax`)

## 0.3.0

- Adapted to new API: Using `context` now

## 0.2.0

- Fix loader order issue
- Upgraded to postcss-loader v1.2.0 which supports reading the `postcss.config.js` file

## 0.1.1

- `loaders: [ 'postcss' ]` => `loaders: [ 'postcss-loader' ]`

## 0.1.0

Initial release.
