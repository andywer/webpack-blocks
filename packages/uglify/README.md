# webpack-blocks - UglifyJS

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/uglify.svg)](https://www.npmjs.com/package/@webpack-blocks/uglify)

This block provides UglifyJS webpack plugin configuration for
[webpack-blocks](https://github.com/andywer/webpack-blocks).

Based on [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) (not
`webpack.optimize.UglifyJsPlugin`) which uses UglifyJS v3 (uglify-es) that supports ECMAScript 2015.

**This block will only work in the `production` mode.**

## Usage

<!-- prettier-ignore-start -->
```js
const { createConfig, env, uglify } = require('webpack-blocks')

module.exports = createConfig([
  uglify(/* options */)
])
```
<!-- prettier-ignore-end -->

## Options

You can pass any `uglifyjs-webpack-plugin` and UglifyJS options, see the
[`uglifyjs-webpack-plugin` docs for details](https://github.com/webpack-contrib/uglifyjs-webpack-plugin#options).

## Generated webpack config

By default generates this configuration:

```js
{
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        cache: true,
        uglifyOptions: {
          compress: {
            warnings: false
          }
        }
      })
    ]
  }
}
```

## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
