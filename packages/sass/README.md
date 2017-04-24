# Webpack blocks - SASS

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/sass.svg)](https://www.npmjs.com/package/@webpack-blocks/sass)

This is the `sass` block providing SASS/SCSS support for webpack. Uses `node-sass` via `sass-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  sass(/* node-sass options */)
])
```

## Options

You can pass random `sass-loader` options as an object to the `sass` block. Those options are basically identical with [node-sass' options](https://github.com/sass/node-sass#options).


## Extract text plugin

You can use the `extract-text` block to extract the compiled SASS/SCSS styles into a separate CSS file. Just pass the `text/x-sass` MIME type as second argument to the `extract-text` block:

```js
module.exports = createConfig([
  sass(),
  extractText('css/[name].css', 'text/x-sass')
])
```

Make sure you use the `extract-text` block *after* the `sass` block.


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
