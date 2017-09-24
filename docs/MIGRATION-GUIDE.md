# Migrating to webpack-blocks v1.0

This is the migration guide for upgrading from webpack-blocks v0.4 to v1.0. It is a major update with a couple of breaking changes.

The first section covers the changes you have to make to your webpack-blocks configuration. The second section covers additional new features that you can use. The last section covers how to upgrade your custom blocks.


## Table of Contents

<!-- To update run: npx markdown-toc --maxdepth 2 -i docs/MIGRATION-GUIDE.md -->

<!-- toc -->

- [Migrating configuration](#migrating-configuration)
- [Additional features](#additional-features)
- [Migrating custom blocks](#migrating-custom-blocks)

<!-- tocstop -->

## Migrating configuration

### `match()`

You can now use `match()` to specify on which files to apply certain loaders. Works with every block that adds a loader, like `babel`, `css`, `elm`, `postcss`, `sass`.

The blocks still work without `match()`. **However, blocks dropped the `fileType`, `exclude` & `include` from their options. Use `match()` for that.**

```js
const { createConfig, css, file, match, postcss, url } = require('webpack-blocks')
const path = require('path')

module.exports = createConfig([
  // Matches *.js, *.jsx outside node_modules/ by default
  babel(),

  match('*.css', { exclude: path.resolve('node_modules') }, [
    css(),
    postcss()
  ]),

  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg', '*.webp'], [
    file()
  ])
])
```

### `@webpack-blocks/assets` package

The `assets` package contains the `css`, `css.modules`, `file` and `url` blocks which were contained in `@webpack-blocks/webpack` in v0.4. Use these blocks to configure a `css-loader`, `file-loader` or `url-loader`.

See the package's [README](../packages/assets/README.md) for further details.

### `webpack-blocks` package

The new `webpack-blocks` package can be installed using `npm install --save-dev webpack-blocks`. It is a convenience package, wrapping and exporting most of frequently used blocks, so you don't have to manage all those small package dependencies by yourself. Contains:

* assets
* babel
* dev-server
* extract-text
* postcss
* sass
* typescript
* uglify
* webpack

It also exports all the `@webpack-blocks/webpack` utility functions. See the package's [README](../packages/webpack-blocks/README.md) for further details.

### No more webpack v1

Support for webpack 1.x has been dropped. If you have not upgraded yet we recommend doing so soon.

### webpack as a peer dependency

Webpack is now a peer dependency of `@webpack-blocks/webpack`. Make sure to explicitly `npm install --save-dev webpack`.

### babel6 is now babel

The `@webpack-blocks/babel6` package has been renamed to `@webpack-blocks/babel`. You can now choose which version of babel to use, since `babel-core` is now a peer dependency (see below).

### babel-core as a peer dependency

`babel-core` is now a peer dependency of the `babel` block, so you can control which version of `babel-core` to use. Make sure to `npm install --save-dev babel-core` in your application.

### `webpack` no longer exported

`webpack` is no longer exported by `@webpack-blocks/webpack`. Use `const webpack = require('webpack')` instead which is more explicit.

### `resolve()` instead of `resolveAliases()`

The `resolveAliases` utility in `@webpack-blocks/webpack` has been replaced by the more generic `resolve`.

```diff
module.exports = createConfig([
-  resolveAliases({ package: path.resolve('./src/package') })
+  resolve({
+    alias: { package: path.resolve('./src/package') }
+  })
])
```

### Removed `devServer.reactHot()`

The `devServer.reactHot()` block has never worked too well. We also decided not to ship framework-specific blocks as core features.

If you feel like this is a feature you really want to have, create a new fancy React hot loader block and share it with the world!

### Requiring Node.js 6+ now

Please use node 6 or newer. We don't transpile the webpack-blocks code for legacy node versions anymore.

---

## Additional features

### webpack v3

We officially support webpack 3 now 🎉

### `@webpack-blocks/uglify` package

The `uglify` package is a convenience block for easily configuring JS minification using the [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin) which also supports minifying untranspiled ES2015 code.

See the package's [README](../packages/uglify/README.md) for further details.

### `setEnv()`

New utility block in `@webpack-blocks/webpack`. Replaces constants in your source code with a values from `process.env` using the [webpack.EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/).

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

### `resolve()` will prepend custom `extensions` (instead of appending them)

The new `resolve` utility in `@webpack-blocks/webpack` will prepend custom `extensions` you pass to it, rather than appending them.

This way extensions you set later in your `createConfig()` will have precedence over extensions you set earlier (webpack tries to match against the `extensions` from the first to last).

---

## Migrating custom blocks

### A concise migration example

A simple babel block in the old v0.4:

```js
function babel () {
  return context => ({
    module: {
      loaders: [
        {
          test: context.fileType('application/javascript'),
          loaders: [ 'babel-loader' ]
        }
      ]
    }
  })
}
```

The same block updated for v1.0:

```js
function babel () {
  return (context, { addLoader }) => addLoader(
    Object.assign({
      test: /\.(js|jsx)$/,
      use: [ 'babel-loader' ]
    }, context.match)
  )
}
```


### New API (#125)

In webpack-blocks v1.0 a block is now expected to have the signature

```diff
- (context) => configDiff
+ (context, utils) => prevConfig => updatedConfig
```

This way the block has more freedom about how to apply changes to the configuration. To keep writing custom blocks simple, the block will receive a `utils` argument. It contains:

- `utils.addLoader(loaderDefinition: object)`
- `utils.addPlugin(plugin: WebpackPlugin)`
- `utils.merge(configSnippet: object)`

These utility functions return an updater function `prevConfig => updatedConfig`. For details see [How to Write a Webpack Block](./BLOCK-CREATION.md).

### `context.match`

A small change in the block is required to support the new `match()`. Under the hood `match()` will set `context.match` to an object `{ test: RegExp, include: string|RegExp|string[]|RegExp[], exclude: string|RegExp|string[]|RegExp[] }`. `test` is always set, `include` and `exclude` are optional.

The properties of `context.match` match the properties you would pass to a webpack loader to define the files the loader should be applied to. This way you can just merge `context.match` into your webpack loader configuration.

### `context.fileType` is deprecated

The `context.fileType()` function is now deprecated. Just use `context.match.test` and provide a hard-coded RegExp as a default.

### See "How to Write a Webpack Block" (`/docs/BLOCK-CREATION.md`)

For more details you can check out [How to Write a Webpack Block](./BLOCK-CREATION.md).

### Added "How to test blocks" (`docs/TESTING.md`)

There is now a testing best-practices guide as well! See [How to test blocks](./TESTING.md).
