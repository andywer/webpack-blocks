# webpack-blocks - PostCSS

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/postcss.svg)](https://www.npmjs.com/package/@webpack-blocks/postcss)

This is the `postcss` block providing PostCSS configuration.


## Usage

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer')

module.exports = createConfig([
  match('*.css', { exclude: path.resolve('node_modules') }, [
    css(),
    postcss([
      autoprefixer({ browsers: ['last 2 versions'] })
    ], { /* custom PostCSS options */ })
  ])
])
```

Instead of passing the PostCSS plugins as an array you can also create a `postcss.config.js` file containing the plugin configuration (see [PostCSS loader usage](https://github.com/postcss/postcss-loader#usage)):

```js
// postcss.config.js
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ]
}
```


## Options

### PostCSS options

#### parser *(optional)*
Package name of a custom PostCSS parser to use. Pass for instance `'sugarss'` to be able to write indent-based CSS.

#### stringifier *(optional)*
Package name of a custom PostCSS stringifier to use.

#### syntax *(optional)*
Package name of a custom PostCSS syntax to use. The package must export a `parse` and a `stringify` function.


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
