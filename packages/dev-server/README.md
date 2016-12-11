# Webpack blocks - Webpack Dev Server

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/dev-server.svg)](https://www.npmjs.com/package/@webpack-blocks/dev-server)

This is the `dev-server` block providing webpack dev server configuration.


## Usage

```js
const { createConfig, env } = require('@webpack-blocks/webpack')
const devServer = require('@webpack-blocks/dev-server')

module.exports = createConfig([
  // use only if `NODE_ENV === 'development'`:
  env('development', [
    devServer(),
    // if you need to proxy API requests:
    devServer.proxy({
      '/api': { target: 'http://localhost:3000' }
    }),
    // in case you are using react-hot-loader 2.x:
    // (need to install `react-hot-loader` package manually, though)
    devServer.reactHot()
  ])
])
```


## Pitfalls

Make sure you use this `dev-server` block after your `entryPoint()` blocks. The dev server will extend all of them with the `'webpack/hot/only-dev-server'` entry point by default.

If you sense that this might be a major problem for you, feel free to engage in the [pre/post-processing discussion](https://github.com/andywer/webpack-blocks/issues/25).


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
