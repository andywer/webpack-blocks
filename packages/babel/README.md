# webpack-blocks - Babel 6+

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/babel.svg)](https://www.npmjs.com/package/@webpack-blocks/babel)

This is the `babel` block providing Babel (Version 6+) configuration using the [babel-loader](https://github.com/babel/babel-loader).

## Installation

```sh
npm install --save-dev babel-core @webpack-blocks/babel
# or
yarn add --dev babel-core @webpack-blocks/babel
```

## Usage

```js
const { createConfig, match } = require('@webpack-blocks/webpack')
const babel = require('@webpack-blocks/babel')

module.exports = createConfig([
  match(['*.js', '!*node_modules*'], [
    babel(/* options */)
  ])
])
```

You can also use the babel block without `match()`. It will by default match `*.js` and `*.jsx` files while excluding everything in `node_modules/`.


## Options

#### cacheDirectory *(optional)*
Uses a cache directory if set to true. Defaults to true.

#### plugins *(optional)*
Array of Babel plugins to use. Babel will read them from `.babelrc` or `package.json` if omitted.

#### presets *(optional)*
Array of Babel presets to use. Babel will read them from `.babelrc` or `package.json` if omitted.


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
