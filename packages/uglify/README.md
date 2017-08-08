# Webpack blocks - UglifyJS

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/uglify.svg)](https://www.npmjs.com/package/@webpack-blocks/uglify)

This block provides UglifyJS webpack plugin configuration for [webpack-blocks](https://github.com/andywer/webpack-blocks).

Based on [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) (not `webpack.optimize.UglifyJsPlugin`) which uses UglifyJS v3 (uglify-es) that supports ECMAScript 2015.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const uglify = require('@webpack-blocks/uglify')

module.exports = createConfig([
  uglify(/* options */)
])
```

## Options

You can pass any `uglifyjs-webpack-plugin` and UglifyJS options, see the [uglifyjs-webpack-plugin docs for details](https://github.com/webpack-contrib/uglifyjs-webpack-plugin#options).

## Generated webpack config

By default generates this configuration:

```js
{
  plugins: [
    new UglifyJSPlugin({
      parallel: {
        cache: true
      },
      uglifyOptions: {
        ie8: false,
        ecma: 5,
        compress: {
          warnings: false
        }
      }
    })
  ]
}
```

## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
