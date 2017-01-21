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

Takes an array of config setters (the functions returned by invoked webpack blocks), invokes them and returns the resulting webpack config object. Already sets some generic default config, like default CSS, font and image file loaders.

#### createConfig.vanilla(configSetter: Function[]): object

Works just like `createConfig()`, but provides no default configuration whatsoever. Use it only if you want to get rid of the default loaders for some reason.

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

---

#### addPlugins(plugins: WebpackPlugin[])

Add custom [plugins](https://webpack.github.io/docs/configuration.html#plugins) to the webpack configuration.

Example usage: `addPlugins([ new HtmlWebpackPlugin() ])`

#### customConfig(webpackConfigSnippet: object)

Add some custom configuration to the webpack configuration. The object you pass will be merged into the webpack configuration object.

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

#### resolveAliases(aliases: object)

Sets [resolve.alias](https://webpack.github.io/docs/configuration.html#resolve-alias). Use it to manually override module resolving.

Example usage: `resolveAliases({ foo: path.resolve('./bar.js') })` will make `require('foo')` resolve to `bar.js`.

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


## Webpack blocks

Check out the

👉 [Main Documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
