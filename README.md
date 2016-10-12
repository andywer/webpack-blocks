# webpack-blocks - The building blocks for your frontend

A functional approach to tame your webpack config. Composing the webpack config of feature middlewares like *Babel*, *PostCSS*, *HMR*, ...


## Installation

```sh
npm install --save-dev @webpack-blocks/webpack @webpack-blocks/babel6 ...
```


## Usage

Create a development config with Babel support, dev server, HMR and PostCSS autoprefixer:

```js
const { createConfig, env, entryPoint, setOutput, sourceMaps } = require('@webpack-blocks/webpack')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server')
const postcss = require('@webpack-blocks/postcss')
const autoprefixer = require('autoprefixer')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('./build/bundle.js'),
  babel(),
  postcss([
    autoprefixer({ browsers: ['last 2 versions'] })
  ]),
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


## Available webpack blocks

- [babel6](./packages/babel6)
- [css-modules](./packages/css-modules)
- [dev-server](./packages/dev-server)
- [postcss](./packages/postcss)
- [sass](./packages/sass)
- [webpack](./packages/webpack) *(Webpack base config)*

You can find usage documentation in these files.

Missing something? Feel free to write and publish your own webpack blocks!


## How does a webpack block look like from the inside?

A webpack block is *just a function and requires no dependencies at all* (🎉🎉), thus making it easy to write your own blocks and share them with the community.

Take `babel6` webpack block for instance:

```js
/**
 * @param {object} [options]
 * @param {RegExp, Function, string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function babel (options) {
  const { exclude = /\/node_modules\// } = options || {}

  return (fileTypes) => ({
    module: {
      loaders: [
        {
          // we use a `MIME type => RegExp` abstraction here in order to have consistent regexs
          test: fileTypes('application/javascript'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'babel?cacheDirectory' ]
        }
      ]
    }
  })
}
```


## I need some custom webpack config snippet!

No problem. If you don't want to write your own webpack block you can just use `customConfig()`:

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { addPlugins, customConfig } = require('@webpack-blocks/webpack')

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
      extensions: [ '', '.js', '.es6' ]
    }
  })
])
```

The object you pass to `customConfig()` will be merged into the webpack config using
[webpack-merge](https://github.com/survivejs/webpack-merge) like any other webpack
block's partial config.


## Like what you see?

Support webpack-blocks by giving some [feedback](#feedback), publishing new webpack blocks or just by 🌟 starring the project!


## Feedback?

You are welcome! Feel free to open an 👉 [issue](https://github.com/andywer/webpack-blocks/issues).
