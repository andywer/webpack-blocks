# webpack-blocks - TSLint

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/tslint.svg)](https://www.npmjs.com/package/@webpack-blocks/tslint)

This is the `tslint` block providing TypeScript linting support for webpack. Uses `tslint` via `tslint-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const tslint = require('@webpack-blocks/tslint')

module.exports = createConfig([
  tslint(/* tslint options */)
])
```

Use `match()` to explicitly specify the files to lint.


## Options

You can pass random `ts-loader` options as an object to the `tslint` block. See [tslint-loader options](https://github.com/wbuchwalter/tslint-loader#usage).


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
