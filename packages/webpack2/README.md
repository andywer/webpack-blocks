# Webpack blocks - Webpack 2 base configuration

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is the `webpack` block providing webpack 1.x core functionality. Also provides all `@webpack-blocks/core` exports for convenience.


## Usage

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { addPlugins, createConfig, entryPoint, env, setOutput, sourceMaps, webpack } = require('@webpack-blocks/webpack')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('./build/bundle.js'),
  addPlugins([
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env || 'development')
    })
  ]),
  env('development', [
    // will only enable source maps if `NODE_ENV === 'development'`
    sourceMaps()
  ])
])
```


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
