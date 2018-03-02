# webpack-blocks - webpack base configuration

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/webpack.svg)](https://www.npmjs.com/package/@webpack-blocks/webpack)

This is the `webpack` block providing webpack core functionality. Also provides all `@webpack-blocks/core` exports for convenience.


## Usage

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { addPlugins, createConfig, defineConstants, entryPoint, env, setOutput, sourceMaps } = require('@webpack-blocks/webpack')
const { css } = require('@webpack-blocks/assets')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('./build/bundle.js'),
  css(),
  addPlugins([
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ]),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development'
  }),
  env('development', [
    // will only enable source maps if `NODE_ENV === 'development'`
    sourceMaps()
  ])
])
```

## Exports

#### createConfig(configSetter: Function[]): object

Takes an array of config setters (the functions returned by invoked webpack blocks), invokes them and returns the resulting webpack config object.

### Helpers

#### group(configSetters: Function[]): Function

Combines an array of blocks to a new joined block. Running this single block has the same effect as running all source blocks.

#### env(envName: string, configSetters: Function[]): Function

Applies an array of webpack blocks only if `process.env.NODE_ENV` matches the given `envName`. If no `NODE_ENV` is set, it will be treated as 'development'.

Use like this:

```js
module.exports = createConfig([
  css(),
  env('production', [extractText()])
])
```

#### match(test: string|RegExp|Array, options: ?object, configSetters: Function[]): Function

State on which files to apply the loader blocks passed in this call. Works like `group()`, but adds the file matching information to the context that can be used by the child blocks. The options parameter is optional.

Use like this:

```js
module.exports = createConfig([
  match(['*.scss', '!*node_modules*'], [
    sass(),
    extractText('css/[name].css')
  ])
])
```

To match multiple file patterns you can pass a pattern array:

```js
module.exports = createConfig([
  match(['*.sass', '*.scss'], [
    /* blocks */
  ])
])
```

#### when(condition: boolean, configSetters: Function[]): Function

Applies an array of webpack blocks only if `condition` is true (or truthy).

Use like this:

```js
module.exports = createConfig([
  when(process.env.CI, [reportBuildStatsPlugin()])
])
```

### Shorthand setters

#### addPlugins(plugins: WebpackPlugin[])

Add custom [plugins](https://webpack.github.io/docs/configuration.html#plugins) to the webpack configuration.

Example usage:

```js
addPlugins([ new HtmlWebpackPlugin() ])
```

#### customConfig(webpackConfigSnippet: object)

Add some custom configuration to the webpack configuration. The object you pass will be merged into the webpack configuration object.

#### defineConstants(constants: object): Function

Replaces constants in your source code with a value (`process.env.NODE_ENV` for example) using the [webpack.DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin). Pass an object containing your constant definitions: `{ [constantName: string]: <constantValue: any> }`.

Every constant's value is `JSON.stringify()`-ed first, so you don't have to remember.

Using `defineConstants` multiple times results in a single DefinePlugin instance configured to do all the replacements.

#### setEnv(constants: string[]|object): Function

Replaces constants in your source code with a values from `process.env` using the [webpack.EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/).

Using `setEnv` multiple times results in a single EnvironmentPlugin instance configured to do all the replacements.

```js
module.exports = createConfig([
  setEnv(['NODE_ENV']),
  setEnv({
    BABEL_ENV: 'development', // use 'development' unless process.env.BABEL_ENV is defined
    PORT: 3000,
  }),
])
```

#### entryPoint(entryPoint: string|string[]|object)

Adds one or multiple entry points. If the parameter is not an object the entry point(s) will be added to the default chunk named `main`. This way we make sure that the resulting [https://webpack.github.io/docs/configuration.html#entry](entry) configuration property will always be an object.

#### performance(perfBudgetOptions: object)

Set a performance budget. Performance budgets are custom limits (like max bundle size) you can set to make webpack warn you or throw an error if the application exceeds those limits.

Options object:

```js
{
  maxAssetSize: number,         // File size limit in bytes
  maxEntrypointSize: number,    // Total size (of an entry point) limit in bytes
  hints: string                 // "warning" or "error"
}
```

#### resolve(config: object)

Sets [resolve](https://webpack.js.org/configuration/resolve/). Use it to manually override module resolution.

Example:

```js
resolve({
  alias: { Utilities: path.resolve(__dirname, 'src/utilities/') }, // resolve `import 'Utilities'` to correct path
  extensions: ['.js', '.json'],
  modules: [path.resolve(__dirname, 'src'), 'node_modules']
})
```

#### setContext(path: string)

Sets the webpack [context](https://webpack.github.io/docs/configuration.html#context). Not to be confused with the webpack-block's `context` object.

#### setDevTool(devtool: string)

Use it to manually set the webpack [devtool](https://webpack.github.io/docs/configuration.html#devtool) property, like `'eval'`, `'source-map'` and such.

#### setOutput(output: string|object)

Sets the webpack [output](https://webpack.github.io/docs/configuration.html#output) property. Use it to tell webpack where to save the output bundle(s).

You can either pass an object that complies to the format described in the [webpack docs](https://webpack.github.io/docs/configuration.html#output) or just pass the destination file path.

Instead of passing the destination file path you can also
* Just pass a filename (not the complete path): The directory will default to `./build/`.
* Just pass the path to a directory (trailing `/`): The filename will default to `bundle.js`.

#### sourceMaps(devtool: ?string)

Just a convenience wrapper to enable sourcemaps in an easier-to-read fashion than `setDevTool()`. Will set webpack's `devtool` to `'cheap-module-source-map'` if no explicit `devtool` is passed as parameter.


## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
