# webpack-blocks - assets

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/assets.svg)](https://www.npmjs.com/package/@webpack-blocks/assets)

This is the `assets` block providing configuration for the style loader, file loader, URL loader and
friends.

## Usage

<!-- prettier-ignore-start -->
```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css, file, url } = require('@webpack-blocks/assets')

module.exports = createConfig([
  css(), // or use `match()` to apply it to other files than *.css

  // will copy font files to build directory and link to them
  match(['*.eot', '*.ttf', '*.woff', '*.woff2'], [
    file()
  ]),

  // will load images up to 10KB as data URL
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg', '*.webp'], [
    url({ limit: 10000 })
  ])
])
```
<!-- prettier-ignore-end -->

In order to use CSS modules:

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')

module.exports = createConfig([
  match(
    ['*.css', '!*node_modules*'],
    [
      css.modules({
        localIdentName: '[name]--[local]--[hash:base64:5]'
      })
    ]
  )
])
```

## API

### css(options: ?object)

Will match `*.css` by default if not used with `match()`. You can pass all
[`css-loader` options](https://github.com/webpack-contrib/css-loader). With `styleLoader` you can
pass options to the [`style-loader`](https://github.com/webpack-contrib/style-loader), setting it to
`false` will remove the `style-loader` from loaders.

### css.modules(options: ?object)

Will match `*.css` by default if not used with `match()`. You can pass all
[`css-loader` options](https://github.com/webpack-contrib/css-loader).

The difference to `css()` is that it sets the following `css-loader` options by default:

- `modules: true`
- `importLoaders` defaults to `1`
- `localIdentName` defaults to `'[name]--[local]--[hash:base64:5]'` in development and
  `'[hash:base64:10]'` in production

### file(options: ?object)

Must be used with `match()`. You can pass all
[`file-loader` options](https://github.com/webpack-contrib/file-loader).

### url(options: ?object)

Must be used with `match()`. You can pass all
[`url-loader` options](https://github.com/webpack-contrib/url-loader). We strongly recommend setting
a `limit` to prevent huge files to be encoded as a data URL.

## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
