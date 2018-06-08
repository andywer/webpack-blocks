# webpack-blocks - TypeScript

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/typescript.svg)](https://www.npmjs.com/package/@webpack-blocks/typescript)

This is the `typescript` block providing TypeScript support for webpack. Uses
`awesome-typescript-loader`.

## Usage

<!-- prettier-ignore-start -->
```js
const { createConfig } = require('@webpack-blocks/webpack')
const typescript = require('@webpack-blocks/typescript')

module.exports = createConfig([
  typescript(/* options, optional */)
])
```
<!-- prettier-ignore-end -->

Use `match()` to explicitly specify the files to load using the TypeScript loader.

## Options

Uses the default tsconfig.json in the root directory (See
[here](https://github.com/s-panferov/awesome-typescript-loader#tsconfigjson)). You can pass
[awesome-typescript-loader options](https://github.com/s-panferov/awesome-typescript-loader#loader-options)
to the block.

## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
