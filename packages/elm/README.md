# Webpack blocks - elm

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/elm.svg)](https://www.npmjs.com/package/@webpack-blocks/elm)

This is the `elm` block providing Elm configuration using the [elm-webpack-loader](https://github.com/elm-community/elm-webpack-loader).


## Usage

```js
const { createConfig } = require('@webpack-blocks/webpack')
const elm = require('@webpack-blocks/elm')

module.exports = createConfig([
  elm(/* options */)
])
```


## Options

#### exclude *(optional)*
Regular expression, string or function describing which files/directories to exclude from the elming. Defaults to `/\/elm-stuff\//` and `/\/node_modules\//` regex.

#### include *(optional)*
Regular expression, string or function used to white-list which files/directories should be elmed. By default `exclude` is set only.

#### maxInstances *(optional)*
Number uset to set maxInstances of elm that can spawned. This should be set to a number less than the number of cores your machine has. The ideal number is 1, as it will prevent Elm instances causing deadlocks.

#### cwd *(optional)*
String which specify a custom location within your project for your elm files.


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
