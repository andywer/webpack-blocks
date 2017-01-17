# Webpack blocks - SASS

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is the `typescript` block providing Typescript support for webpack. Uses `awesome-typescript-loader`.


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const typescript = require('@webpack-blocks/typescript')

module.exports = createConfig([
  typescript()
])
```

## Options

Uses the default tsconfig.json in the root directory to pass options (See [here](https://github.com/s-panferov/awesome-typescript-loader#tsconfigjson))

## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
