# Webpack blocks - Webpack 2 base configuration

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/webpack2.svg)](https://www.npmjs.com/package/@webpack-blocks/webpack2)

This is the `webpack2` block providing webpack 2 core functionality. Also provides all `@webpack-blocks/core` exports for convenience.


## Usage

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { addPlugins, createConfig, entryPoint, env, setOutput, sourceMaps, webpack } = require('@webpack-blocks/webpack2')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('./build/bundle.js'),
  addPlugins([
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env || 'development')
    })
  ]),
  env('development', [
    // will only enable source maps if `NODE_ENV === 'development'`
    sourceMaps()
  ])
])
```


## Webpack 2 compatible blocks

There are some webpack loaders and plugins that are only compatible with webpack 2 in a certain version.
Make sure you use the appropriate webpack blocks:

* [dev-server2](https://www.npmjs.com/package/@webpack-blocks/dev-server2)
* [extract-text2](https://www.npmjs.com/package/@webpack-blocks/extract-text2)


## Exports

#### createConfig(configSetter: Function[]): object

Takes an array of config setters (the functions returned by invoked webpack blocks), invokes them and returns the resulting webpack config object.

#### group(configSetters: Function[]): Function

Combines an array of blocks to a new joined block. Running this single block has the same effect as running all source blocks.

#### env(envName: string, configSetters: Function[]): Function

Applies an array of webpack blocks only if `process.env.NODE_ENV` matches the given `envName`. If no `NODE_ENV` is set, it will be treated as 'development'.

#### defineConstants(constants: object): Function

Replaces constants in your source code with a value (`process.env.NODE_ENV` for example) using the [webpack.DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin). Pass an object containing your constant definitions: `{ [constantName: string]: <constantValue: any> }`.

Every constant's value is `JSON.stringify()`-ed first, so you don't have to remember.

Special feature: Using `defineConstants` multiple times results in a single DefinePlugin instance configured to do all the replacements.

#### webpack: object

Same as `require('webpack')`.

#### addPlugins(plugins: WebpackPlugin[])
#### customConfig(webpackConfigSnippet: object)
#### entryPoint(entryPoint: string|string[]|object)
#### performance(perfBudgetOptions: object)
#### resolveAliases(aliases: object)
#### setContext(path: string)
#### setDevTool(devtool: string)
#### setOutput(output: string|object)
#### sourceMaps()


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
