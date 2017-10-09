# Webpack blocks - Less

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/less.svg)](https://www.npmjs.com/package/@webpack-blocks/less)

This is the `less` block providing Less support for webpack. Uses `less` via `less-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const less = require('@webpack-blocks/less')

module.exports = createConfig([
  less(/* less options */)
])
```

## Options

You can pass random `less-loader` options as an object to the `less` block. Those options are basically identical with [less' options](http://lesscss.org/usage/#command-line-usage-options).


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
