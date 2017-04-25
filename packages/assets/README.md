# Webpack blocks - Babel 6+

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/assets.svg)](https://www.npmjs.com/package/@webpack-blocks/assets)

This is the `assets` block providing configuration for the style loader, file loader, URL loader and friends.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const { css, file, url } = require('@webpack-blocks/assets')

module.exports = createConfig([
  css(),
  file('font'),                     // will copy font files and link to them
  url('image', { limit: 10000 })    // will load images up to 10KB as data URL
])
```

In order to use CSS modules:

```js
const { createConfig } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')

module.exports = createConfig([
  css.modules({
    exclude: [ /node_modules/ ],
    localIdentName: '[name]--[local]--[hash:base64:5]'
  })
])
```


## Generic options

#### exclude *(optional)*
Regular expression, string or function describing which files/directories to exclude from the babeling.

#### include *(optional)*
Regular expression, string or function used to white-list which files/directories should be babeled. By default `exclude` is set only.


## Specific usage

### css(fileType: ?string, options: ?object)

`fileType` defaults to `'text/css'` which matches `*.css`. You can pass all [css-loader options](https://github.com/webpack-contrib/css-loader).

### css.modules(fileType: ?string, options: ?object)

`fileType` defaults to `'text/css'` which matches `*.css`. You can pass all [css-loader options](https://github.com/webpack-contrib/css-loader).

The difference to `css()` is that it sets the following options:
* `modules: true`
* `importLoaders` defaults to `1`
* `localIdentName` defaults to `'[name]--[local]--[hash:base64:5]'` in development and `'[hash:base64:10]'` in production

### file(fileType: string, options: ?object)

You can pass all [file-loader options](https://github.com/webpack-contrib/file-loader).

### url(fileType: string, options: ?object)

You can pass all [url-loader options](https://github.com/webpack-contrib/url-loader). We strongly recommend setting a `limit` to prevent huge files to be encoded as a data URL.


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
