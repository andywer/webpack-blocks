# webpack-blocks - ESLint

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/eslint.svg)](https://www.npmjs.com/package/@webpack-blocks/eslint)

This is the `eslint` block providing JavaScript linting support for webpack. Uses `eslint` via `eslint-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const eslint = require('@webpack-blocks/eslint')

module.exports = createConfig([
  eslint(/* eslint options */)
])
```

Use `match()` to explicitly specify the files to lint.


## Options

You can pass any `eslint-loader` options as an object to the `eslint` block. See [eslint-loader options](https://github.com/webpack-contrib/eslint-loader#options).


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
