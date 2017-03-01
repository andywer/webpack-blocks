# Webpack blocks - HappyPack

This is the `happypack` block providing an easy to use block to support Happypack cache and mutli thread execution.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const babel = require('@webpack-blocks/babel')
const sass = require('@webpack-blocks/sass')
const happypack = require('@webpack-blocks/happypack')

module.exports = createConfig([
  happypack([
  	babel(),
  	sass(),
  ], {threads: 4})
])
```

## Options

- An array of `webpack-blocks` that are compatible with happypack, [Here the full list](https://github.com/amireh/happypack/wiki/Webpack-Loader-API-Support)
- Happypack options [Here](https://github.com/amireh/happypack/wiki/Webpack-Loader-API-Support)

## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
