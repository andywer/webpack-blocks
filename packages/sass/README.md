# webpack-blocks - Sass

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/sass.svg)](https://www.npmjs.com/package/@webpack-blocks/sass)

This is the `sass` block providing Sass support for webpack. Uses `node-sass` via `sass-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  sass(/* node-sass options */)
])
```

Use `match()` to explicitly specify on which files to apply the block:

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  match(['*.scss', '!*node_modules*'], [
    sass(/* node-sass options */)
  ])
])
```


## Options

#### minimize *(optional)*
Enable CSS minification (by passing this option to `css-loader`).

#### Sass options

You can pass any [sass-loader / node-sass options](https://github.com/sass/node-sass#options) as an object to the `sass` block.


## Examples

### Extract text plugin

Use the `extract-text` block to extract the compiled SASS/SCSS styles into a separate CSS file:

```js
const { createConfig, match, env } = require('@webpack-blocks/webpack')
const sass = require('@webpack-blocks/sass')
const extractText = require('@webpack-blocks/extract-text')

module.exports = createConfig([
  match('*.scss', [
    sass({ minimize: true }),
    env('production', [extractText()])
  ])
])
```

Make sure you use the `extract-text` block *after* the `sass` block.


### CSS Modules

You can use SASS/SCSS in combination with CSS modules.

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const sass = require('@webpack-blocks/sass')
const { css } = require('@webpack-blocks/assets')

module.exports = createConfig([
  match('*.scss', [
    sass(),
    css.modules()
  ])
])
```


### PostCSS

You can use the SASS block together with PostCSS (using the `postcss` block) and its plugins, like the Autoprefixer.

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const sass = require('@webpack-blocks/sass')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer');

module.exports = createConfig([
  match('*.scss', [
    sass(),
    postcss([autoprefixer()])
  ])
])
```


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
