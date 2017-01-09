# Webpack blocks - PostCSS

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/postcss.svg)](https://www.npmjs.com/package/@webpack-blocks/postcss)

This is the `postcss` block providing PostCSS configuration.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer')

module.exports = createConfig([
  postcss([
    autoprefixer({ browsers: ['last 2 versions'] })
  ], { /* custom PostCSS options */ })
])
```

Instead of passing the PostCSS plugins as an array you can also create a `postcss.config.js` file containing the plugin configuration (see [PostCSS loader usage](https://github.com/postcss/postcss-loader#usage)):

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('precss')
  ]
}
```


## Options

#### parser *(optional)*
Package name of a custom PostCSS parser to use. Pass for instance `'sugarss'` to be able to write indent-based CSS.

#### stringifier *(optional)*
Package name of a custom PostCSS stringifier to use.

#### syntax *(optional)*
Package name of a custom PostCSS syntax to use. The package must export a `parse` and a `stringify` function.


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
