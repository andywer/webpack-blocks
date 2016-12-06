# Webpack blocks - Webpack 2 base configuration

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/webpack2.svg)](https://www.npmjs.com/package/@webpack-blocks/webpack2)

This is the `webpack` block providing webpack 1.x core functionality. Also provides all `@webpack-blocks/core` exports for convenience.


## Usage

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { addPlugins, createConfig, entryPoint, env, setOutput, sourceMaps, webpack } = require('@webpack-blocks/webpack')

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

## Exports

#### createConfig(configSetter: Function[]): object

Takes an array of config setters (the functions returned by invoked webpack blocks), invokes them and returns the resulting webpack config object.

#### env(envName: string, configSetters: Function[]): Function

Applies an array of webpack blocks only if `process.env.NODE_ENV` matches the given `envName`. If no `NODE_ENV` is set, it will be treated as 'development'.

#### webpack: object

Same as `require('webpack')`.

#### addPlugins(plugins: WebpackPlugin[])
#### customConfig(webpackConfigSnippet: object)
#### entryPoint(entryPoint: string|string[]|object)
#### resolveAliases(aliases: object)
#### setContext(path: string)
#### setDevTool(devtool: string)
#### setOutput(output: string|object)
#### sourceMaps()


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
