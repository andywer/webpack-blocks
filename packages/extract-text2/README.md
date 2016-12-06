# Webpack blocks - Extract text plugin for Webpack 2

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/extract-text2.svg)](https://www.npmjs.com/package/@webpack-blocks/extract-text2)

This is the block providing configuration for the [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin). Use it to extract CSS styles out of the bundle and into a separate CSS file.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  ...,
  extractText('css/[name].css')   // or just `extractText()`
])
```


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
