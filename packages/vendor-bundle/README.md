# Webpack blocks - vendor bundle

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/vendor-bundle.svg)](https://www.npmjs.com/package/@webpack-blocks/vendor-bundle)

This block for [webpack-blocks](https://github.com/andywer/webpack-blocks) extracts a vendor bundle that includes the most used dependencies of your app.

## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const vendorBundle = require('@webpack-blocks/vendorBundle')

module.exports = createConfig([
  vendorBundle(/* options */)
])
```

## Options

#### name *(default: main)*

Name of the main bundle of your app.

#### filename *(default: vendor.[chunkhash].js)*

Output bundle file name.

#### minChunks *(default: 1)*

Minimal number of chunks to include dependency into the bundle.

#### exclude *(optional)*, string, array of strings, RegExp or array of RegExps

Modules to exclude from the bundle.

## Generated webpack config

By default generates this configuration:

```js
{
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      filename: 'vendor.[chunkhash].js',
      children: true,
      minChunks ({ userRequest }, count) {
        return userRequest && userRequest.includes('node_modules') &&
                userRequest.endsWith('.js') &&
                count >= options.minChunks
      }
    })
  ]
}
```

## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
