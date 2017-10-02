# webpack-blocks - Extract text

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/extract-text.svg)](https://www.npmjs.com/package/@webpack-blocks/extract-text)

Use this block to extract text (for example CSS) from the bundle into a separate file. Uses [Extract Text Plugin](https://github.com/webpack/extract-text-webpack-plugin).


## Installation

```sh
# for webpack v3
npm install --save-dev @webpack-blocks/extract-text
# for webpack v2 install the last v1.0 beta version
npm install --save-dev @webpack-blocks/extract-text@^1.0.0-beta.2
```


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  /* ... */
  extractText('path/to/output.file')
])
```

Most likely you’ll use it to extract styles:

```js
const { createConfig, match, env } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  match('*.css', [
    css(),
    // Filename defaults to 'css/[name].[contenthash:8].css'
    // Extract styles only in production mode
    // to keep styles hot reload in development
    env('production', [extractText()])
  ])
])
```


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
