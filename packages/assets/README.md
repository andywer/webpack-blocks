# Webpack blocks - Assets

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/assets.svg)](https://www.npmjs.com/package/@webpack-blocks/assets)

This is the `assets` block providing configuration for the style loader, file loader, URL loader and friends.


## Usage

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css, file, url } = require('@webpack-blocks/assets')

module.exports = createConfig([
  css(),                            // or use `match()` to apply it to other files than *.css
  match(['*.eot', '*.ttf', '*.woff', '*.woff2'], [
    file()                          // will copy font files to build directory and link to them
  ]),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg', '*.webp'], [
    url({ limit: 10000 })           // will load images up to 10KB as data URL
  ])
])
```

In order to use CSS modules:

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')

module.exports = createConfig([
  match('*.css', { exclude: path.resolve('node_modules') }, [
    css.modules({
      localIdentName: '[name]--[local]--[hash:base64:5]'
    })
  ])
])
```


## API

### css(options: ?object)

Will match `*.css` by default if not used with `match()`. You can pass all [css-loader options](https://github.com/webpack-contrib/css-loader).

### css.modules(options: ?object)

Will match `*.css` by default if not used with `match()`. You can pass all [css-loader options](https://github.com/webpack-contrib/css-loader).

The difference to `css()` is that it sets the following css-loader options:
* `modules: true`
* `importLoaders` defaults to `1`
* `localIdentName` defaults to `'[name]--[local]--[hash:base64:5]'` in development and `'[hash:base64:10]'` in production

### file(options: ?object)

Must be used with `match()`. You can pass all [file-loader options](https://github.com/webpack-contrib/file-loader).

### url(options: ?object)

Must be used with `match()`. You can pass all [url-loader options](https://github.com/webpack-contrib/url-loader). We strongly recommend setting a `limit` to prevent huge files to be encoded as a data URL.


## Webpack blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
