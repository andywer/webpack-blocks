# webpack-blocks - Extract text plugin

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/extract-text.svg)](https://www.npmjs.com/package/@webpack-blocks/extract-text)

This is the block providing configuration for the [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin). Use it to extract CSS styles out of the bundle and into a separate CSS file.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  ...,
  extractText('path/to/output.file')
])
```

You will frequently want to use it to extract styles:

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  match('*.css', [
    css(),
    extractText()     // filename defaults to 'css/[name].[contenthash:8].css'
  ])
])
```


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
