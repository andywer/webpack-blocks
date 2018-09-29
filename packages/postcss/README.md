# webpack-blocks - PostCSS

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/postcss.svg)](https://www.npmjs.com/package/@webpack-blocks/postcss)

This is the `postcss` block providing [PostCSS](http://postcss.org/) configuration.

## Usage

<!-- prettier-ignore-start -->
```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const postcss = require('@webpack-blocks/postcss')

module.exports = createConfig([
  match(['*.css', '!*node_modules*'], [
    css(),
    postcss()
  ])
])
```
<!-- prettier-ignore-end -->

**NOTE**: the postcss block handles only the postcss transformation, you must use the css block if
you want to require the css in your browser.

We recommend you to configure PostCSS using the `postcss.config.js` file (see
[PostCSS loader usage](https://github.com/postcss/postcss-loader#usage)):

```js
// postcss.config.js
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [autoprefixer({ browsers: ['last 2 versions'] })]
}
```

But you can pass configuration directly to the `postcss` block:

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer')

module.exports = createConfig([
  css(),
  postcss({
    plugins: [autoprefixer({ browsers: ['last 2 versions'] })]
    /* Other PostCSS options */
  })
])
```

## Options

### PostCSS options

#### parser _(optional)_

Package name of a custom PostCSS parser to use. Pass for instance `'sugarss'` to be able to write
indent-based CSS.

#### stringifier _(optional)_

Package name of a custom PostCSS stringifier to use.

#### syntax _(optional)_

Package name of a custom PostCSS syntax to use. The package must export a `parse` and a `stringify`
function.

#### plugins _(optional)_

Array of PostCSS plugins.

## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
