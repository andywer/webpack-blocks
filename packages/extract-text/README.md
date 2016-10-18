# Webpack blocks - Extract text

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is the block providing configuration for the [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin). Use it to extract CSS styles out of the bundle and into a separate CSS file.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  extractText()
])
```


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
