# Webpack blocks - Webpack Dev Server

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is the `dev-server` block providing webpack dev server configuration.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const devServer = require('@webpack-blocks/dev-server')

module.exports = createConfig([
  devServer(),
  // if you need to proxy API requests:
  devServer.proxy({
    '/api': { target: 'http://localhost:3000' }
  })
])
```


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
