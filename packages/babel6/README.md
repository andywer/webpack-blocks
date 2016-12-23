# Webpack blocks - Babel 6+

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/babel6.svg)](https://www.npmjs.com/package/@webpack-blocks/babel6)

This is the `babel6` block providing Babel (Version 6+) configuration using the [babel-loader](https://github.com/babel/babel-loader).


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const babel = require('@webpack-blocks/babel6')

module.exports = createConfig([
  babel(/* options */)
])
```


## Options

#### exclude *(optional)*
Regular expression, string or function describing which files/directories to exclude from the babeling. Defaults to `/\/node_modules\//` regex, like all JS loaders.

#### include *(optional)*
Regular expression, string or function used to white-list which files/directories should be babeled. By default `exclude` is set only.

#### plugins *(optional)*
Array of Babel plugins to use. Babel will read them from `.babelrc` or `package.json` if omitted.

#### presets *(optional)*
Array of Babel presets to use. Babel will read them from `.babelrc` or `package.json` if omitted.


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
