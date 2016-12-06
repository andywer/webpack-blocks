# Webpack blocks - CSS Modules

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/css-modules.svg)](https://www.npmjs.com/package/@webpack-blocks/css-modules)

This is the `css-modules` block providing CSS modules configuration by setting the `modules` parameter on the `css-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const cssModules = require('@webpack-blocks/css-modules')

module.exports = createConfig([
  cssModules(/* options */)
])
```


## Options

#### exclude *(optional)*
Regular expression, string or function describing which files/directories not to use the CSS modules loader on. Defaults to `/\/node_modules\//` regex.

#### importLoaders *(optional integer)*
That many loaders after the css-loader are used to import resources. Defaults to `1`. See [css-loader](https://github.com/webpack/css-loader#importing-and-chained-loaders).

#### localIdentName *(optional string)*
The pattern how to rewrite the CSS class names. Defaults to `[name]--[local]--[hash:base64:5]` in development and `[hash:base64:10]` in production.


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
