# webpack-blocks - Sass

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/sass.svg)](https://www.npmjs.com/package/@webpack-blocks/sass)

This is the `sass` block providing Sass support for webpack. Uses `node-sass` via `sass-loader`.

## Usage

<!-- prettier-ignore-start -->
```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  match(['*.scss', '!*node_modules*'], [
    css(),
    sass({ sassOptions: {/* node-sass options */} })
  ])
])
```
<!-- prettier-ignore-end -->

**NOTE**: Use match() here to apply the css() block to `.scss` files.

## Options

You can pass any [sass-loader](https://github.com/webpack-contrib/sass-loader) as an object to the
`sass` block. For example you can pass
[node-sass options](https://github.com/sass/node-sass#options) in the `sassOptions` property.

## Examples

### Extract text plugin

Use the `extract-text` block to extract the compiled SASS/SCSS styles into a separate CSS file:

<!-- prettier-ignore-start -->
```js
const { createConfig, match, env } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const sass = require('@webpack-blocks/sass')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  match('*.scss', [
    css(),
    sass(),
    env('production', [extractText()])
  ])
])
```
<!-- prettier-ignore-end -->

Make sure you use the `extract-text` block _after_ the `sass` block.

### CSS Modules

You can use SASS/SCSS in combination with CSS modules.

<!-- prettier-ignore-start -->
```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  match('*.scss', [
    css.modules(),
    sass()
  ])
])
```
<!-- prettier-ignore-end -->

### PostCSS

You can use the SASS block together with PostCSS (using the `postcss` block) and its plugins, like
the [Autoprefixer](https://github.com/postcss/autoprefixer), or
[cssnano](https://github.com/cssnano/cssnano) if you want css minification.

<!-- prettier-ignore-start -->
```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')
const sass = require('@webpack-blocks/sass')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = createConfig([
  match('*.scss', [
    css(),
    sass(),
    postcss([autoprefixer(), cssnano()])
  ])
])
```
<!-- prettier-ignore-end -->

## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
