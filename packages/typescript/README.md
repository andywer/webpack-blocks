# webpack-blocks - TypeScript

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/typescript.svg)](https://www.npmjs.com/package/@webpack-blocks/typescript)

This is the `typescript` block providing TypeScript support for webpack. Uses `awesome-typescript-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const typescript = require('@webpack-blocks/typescript')

module.exports = createConfig([
  typescript()
])
```

Use `match()` to explicitly specify the files to load using the TypeScript loader.


## Options

Uses the default tsconfig.json in the root directory to pass options (See [here](https://github.com/s-panferov/awesome-typescript-loader#tsconfigjson))

## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
