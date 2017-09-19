# webpack-blocks - the convenience package

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/webpack-blocks.svg)](https://www.npmjs.com/package/webpack-blocks)

This is the webpack-blocks convenience package. It wraps all the most commonly used blocks, so you can install just this single package and have webpack-blocks and your favorite blocks set up.


## Usage

Here is a small sample configuration. Instead of requiring from `@webpack-blocks/webpack`, `@webpack-blocks/babel` and others you just need a single `require()` and a single dependency in your `package.json`.

Of course you can still separately define or install custom blocks and use them as you want.

```js
const webpack = require('webpack')
const {
  babel,
  createConfig,
  css,
  defineConstants,
  entryPoint,
  env,
  extractText,
  match,
  setOutput,
  uglify
} = require('webpack-blocks')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('./build/bundle.js'),
  babel(),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV
  }),
  match('*.css', { exclude: /node_modules/ }, [
    css({ minimize: true }),
    env('production', [extractText()])
  ]),
  env('production', [
    uglify()
  ])
])
```

## Included blocks

* [assets](https://github.com/andywer/webpack-blocks/tree/master/packages/assets)
* [babel](https://github.com/andywer/webpack-blocks/tree/master/packages/babel)
* [dev-server](https://github.com/andywer/webpack-blocks/tree/master/packages/dev-server)
* [extract-text](https://github.com/andywer/webpack-blocks/tree/master/packages/extract-text)
* [postcss](https://github.com/andywer/webpack-blocks/tree/master/packages/postcss)
* [sass](https://github.com/andywer/webpack-blocks/tree/master/packages/sass)
* [typescript](https://github.com/andywer/webpack-blocks/tree/master/packages/typescript)
* [uglify](https://github.com/andywer/webpack-blocks/tree/master/packages/uglify)
* [webpack](https://github.com/andywer/webpack-blocks/tree/master/packages/webpack)


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
