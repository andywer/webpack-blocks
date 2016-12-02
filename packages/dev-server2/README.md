# Webpack blocks - Webpack Dev Server for Webpack 2

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

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


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
