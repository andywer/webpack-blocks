# Webpack blocks - PostCSS

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is the `postcss` block providing PostCSS configuration.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer')

module.exports = createConfig([
  postcss([
    autoprefixer({ browsers: ['last 2 versions'] })
  ])
])
```


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
