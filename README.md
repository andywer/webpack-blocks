# webpack-blocks [![Build Status](https://travis-ci.org/andywer/webpack-blocks.svg?branch=master)](https://travis-ci.org/andywer/webpack-blocks)

Functional building blocks for the webpack config. Compose it using feature middlewares like *Babel*, *PostCSS*, *HMR&nbsp;(Hot&nbsp;Module&nbsp;Replacement)*, …

Missing anything? Write your own and share them!

**Early release - Keep your seatbelt fastened.**


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

Check out the [sample app](./test-app) to see a [webpack config](./test-app/webpack.config.js) in action.


## Available webpack blocks

- [babel6](./packages/babel6)
- [css-modules](./packages/css-modules)
- [dev-server](./packages/dev-server)
- [extract-text](./packages/extract-text)
- [postcss](./packages/postcss)
- [sass](./packages/sass)
- [webpack](./packages/webpack) *(Webpack base config)*

Missing something? Write and publish your own webpack blocks!


## Design principles

- Extensibility first
- Uniformity for easy composition
- Keep everything configurable
- But provide sane defaults


## env()

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

You can find the default file types and the extensions they match [here](https://github.com/andywer/webpack-blocks/blob/master/packages/core/src/defaultFileTypes.js).


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

Support webpack-blocks by giving [feedback](https://github.com/andywer/webpack-blocks/issues), publishing new webpack blocks or just by 🌟 starring the project!
