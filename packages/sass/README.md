# Webpack blocks - SASS

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is the `sass` block providing SASS/SCSS support for webpack. Uses `node-sass` via `sass-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  sass()
])
```


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
