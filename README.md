# webpack-blocks

Functional building blocks for the webpack config. Compose it using feature middlewares like *Babel*, *PostCSS*, *HMR&nbsp;(Hot&nbsp;Module&nbsp;Replacement)*, …

Missing anything? Write your own and share them!

[![Build Status](https://travis-ci.org/andywer/webpack-blocks.svg?branch=master)](https://travis-ci.org/andywer/webpack-blocks)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

>"Finally, webpack config done right. (...) Webpack clearly wants to stay low-level. So it makes total sense to outsource configuring it to well designed blocks instead of copy-paste."
>
>[Dan Abramov](https://github.com/gaearon) via [twitter](https://twitter.com/dan_abramov/status/806249934399881216) (Co-author of Redux, Create React App and React Hot Loader)


## 1.0

We are quickly heading towards to webpack-blocks 1.0 release. You can find the 1.0 readme in the [release/1.0 branch](https://github.com/andywer/webpack-blocks/tree/release/1.0).

You can already try the alpha release. If so, please make sure to leave a short comment in [The 1.0 Experience](https://github.com/andywer/webpack-blocks/issues/153). It's much appreciated!


## Installation

```sh
npm install --save-dev @webpack-blocks/webpack2 @webpack-blocks/babel6 ...
```


## Usage

Create a webpack 2 config with Babel support, dev server and PostCSS autoprefixer:

```js
const { createConfig, defineConstants, env, entryPoint, setOutput, sourceMaps } = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server2')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('./build/bundle.js'),
  babel(),
  postcss([
    autoprefixer({ browsers: ['last 2 versions'] })
  ]),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV
  }),
  env('development', [
    devServer(),
    devServer.proxy({
      '/api': { target: 'http://localhost:3000' }
    }),
    sourceMaps()
  ])
])
```

Wanna use CSS modules? No problem!

```js
const cssModules = require('@webpack-blocks/css-modules')

...

module.exports = createConfig([
  ...
  cssModules()
])
```

Need a custom block? Easy, since a block is just a function returning a function:

```js
module.exports = createConfig([
  ...
  myCssLoader([ './styles' ])
])

function myCssLoader (include) {
  return (context) => ({
    module: {
      loaders: [
        {
          test: context.fileType('text/css'),
          loaders: [ 'style-loader', 'my-css-loader' ],
          include
        }
      ]
    }
  })
}
```

Check out the [sample app](./test-app) to see a webpack config in action or read [how to create your own blocks](./docs/BLOCK-CREATION.md).


## Available webpack blocks

- [babel6](./packages/babel6)
- [css-modules](./packages/css-modules)
- [dev-server](./packages/dev-server)
- [dev-server2](./packages/dev-server2) *(for Webpack 2)*
- [extract-text](./packages/extract-text)
- [extract-text2](./packages/extract-text2) *(for Webpack 2)*
- [postcss](./packages/postcss)
- [sass](./packages/sass)
- [typescript](./packages/typescript)
- [tslint](./packages/tslint)
- [webpack](./packages/webpack) *(Webpack 1 base config)*
- [webpack2](./packages/webpack2) *(Webpack 2 base config)*

Missing something? Write and publish your own webpack blocks!


## Upgrading from webpack 1.x to webpack 2.x

One of the nice gimmicks of using webpack-blocks is that you can switch between webpack versions in an instant!

Just use the webpack 2.x versions of the following blocks:

```
@webpack-blocks/webpack -> @webpack-blocks/webpack2
@webpack-blocks/dev-server -> @webpack-blocks/dev-server2
@webpack-blocks/extract-text -> @webpack-blocks/extract-text2
```


## Design principles

- Extensibility first
- Uniformity for easy composition
- Keep everything configurable
- But provide sane defaults


## You might want to know

<details>
<summary>Can I get rid of the default loaders?</summary>

The `createConfig()` function sets some generic default loaders. This should not be a problem. If does happen to be a problem you can also create a "vanilla" configuration (without the defaults) by using `createConfig.vanilla()` instead.
</details>

<details>
<summary>How does env() work?</summary>

You might wonder how `env('development', [ ... ])` works? It just checks the NODE_ENV environment variable and only applies its contained webpack blocks if it matches.

So make sure you set the NODE_ENV accordingly:

```js
// your package.json
"scripts": {
  "build": "NODE_ENV=production webpack --config webpack.config.js",
  "start": "NODE_ENV=development webpack-dev-server --config webpack.config.js"
}
```

If there is no NODE_ENV set then it will just treat NODE_ENV as if it was `development`.
</details>

<details>
<summary>What does defineConstants() do?</summary>

`defineConstants()` is just a small convenience wrapper around webpack's [DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin). It is composable and automatically encodes the values. Use it to replace constants in your code by their values at build time.

So having a `defineConstants({ 'process.env.FOO': 'foo' })` and a `defineConstants({ 'process.env.BAR': 'bar' })` in your config means the resulting webpack config will finally contain a single `new webpack.DefinePlugin({ 'process.env.FOO': '"FOO"', 'process.env.BAR': '"BAR"' })`, thus replacing any occurence of `process.env.FOO` and `process.env.BAR` with the given values.
</details>

<details>
<summary>What does a block look like from the inside?</summary>

A webpack block is *just a function and requires no dependencies at all* (🎉🎉), thus making it easy to write your own blocks and share them with the community.

Take the `babel6` webpack block for instance:

```js
/**
 * @param {object} [options]
 * @param {RegExp|Function|string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function babel (options) {
  const { exclude = /\/node_modules\// } = options || {}

  return (context) => ({
    module: {
      loaders: [
        {
          // we use a `MIME type => RegExp` abstraction here in order to have consistent regexs
          test: context.fileType('application/javascript'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'babel-loader?cacheDirectory' ]
        }
      ]
    }
  })
}
```

Add a README and a package.json and you are ready to ship.

For more details see [How to write a block](./docs/BLOCK-CREATION.md).
</details>

<details>
<summary>I need some custom webpack config snippet!</summary>

No problem. If you don't want to write your own webpack block you can just use `customConfig()`:

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { addPlugins, customConfig } = require('@webpack-blocks/webpack2')

...

module.exports = createConfig([
  ...
  addPlugins([
    // Add a custom webpack plugin
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ]),
  customConfig({
    // Add some custom webpack config snippet
    resolve: {
      extensions: [ '.js', '.es6' ]
    }
  })
])
```

The object you pass to `customConfig()` will be merged into the webpack config using
[webpack-merge](https://github.com/survivejs/webpack-merge) like any other webpack
block's partial config.
</details>

<details>
<summary>How to compose blocks? (a.k.a. building presets)</summary>

Got some projects with a similar, yet not identical webpack configuration? Seems like you could use a preset:

```js
const { createConfig, env, group } = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server2')

function myPreset (proxyConfig) {
  return group([
    babel(),
    env('development', [
      devServer(),
      devServer.proxy(proxyConfig)
    ])
  ])
}

module.exports = createConfig([
  myPreset({
    '/api': { target: 'http://localhost:3000' }
  }),
  ...   // add more blocks here
])
```

The key feature is the `group()` method which takes a set of blocks and returns a new block that combines all their functionality.
</details>


## Like what you see?

Support webpack-blocks by giving [feedback](https://github.com/andywer/webpack-blocks/issues), publishing new webpack blocks or just by 🌟 starring the project!
