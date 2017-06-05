# Webpack blocks - PostCSS for Webpack 2

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/postcss.svg)](https://www.npmjs.com/package/@webpack-blocks/postcss)

This is the `postcss` block providing PostCSS configuration.


## Usage

***IMPORTANT:** Loading postcss plugins inside the webpack 2 (as of webpack@2.2.0-rc.3) configuration does not work right now, which is why we currently use postcss.config.js. Reference: https://github.com/postcss/postcss-loader/issues/125#issuecomment-257127969*

### webpack.config.js
```js
const { createConfig } = require('@webpack-blocks/webpack')
const postcss = require('@webpack-blocks/postcss')

module.exports = createConfig([
  postcss([
    // You'd normally pass in your plugins here. Please check the note about
    // configuring PostCSS plugins above!
  ])
])
```

### postcss.config.js

```js
module.exports = {
  plugins: {
    'autoprefixer': {
      { browsers: ['last 2 versions'] }
    }
  }
})
```

### Specificying postcss-loader options

If you want to specifiy `syntax`, `stringifier` or `parser`, f.e. for using `postcss-scss`, you can pass an options object as second argument.

```js
const { createConfig } = require('@webpack-blocks/webpack')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer')
const scss = require('postcss-scss')

module.exports = createConfig([
  postcss([
    // You'd normally pass in your plugins here. Please check the note about
    // configuring PostCSS plugins above!
  ], {
    syntax: 'postcss-scss',
    // stringifier: 'custom-stringifier',
    // parser: 'custom-parser'
  })
])
```


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
