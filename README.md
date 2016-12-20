# webpack-blocks [![Build Status](https://travis-ci.org/andywer/webpack-blocks.svg?branch=master)](https://travis-ci.org/andywer/webpack-blocks)

Functional building blocks for the webpack config. Compose it using feature middlewares like *Babel*, *PostCSS*, *HMR&nbsp;(Hot&nbsp;Module&nbsp;Replacement)*, …

Missing anything? Write your own and share them!

>"Finally, webpack config done right. (...) Webpack clearly wants to stay low-level. So it makes total sense to outsource configuring it to well designed blocks instead of copy-paste."
>
>[Dan Abramov](https://github.com/gaearon) via [twitter](https://twitter.com/dan_abramov/status/806249934399881216) (Co-author of Redux, Create React App and React Hot Loader)

<br />

## v0.3 Update note

**Version 0.3.x of webpack-blocks contains a bunch of new features, but also with a major breaking change under the hood.**

*Every* block has been updated, but you have to make sure **all webpack-blocks packages you use are version >= 0.3.0** or otherwise **all packages are < 0.3.0**.

On the upside we don't consider it an early release anymore and the next major release you see might very well be `v1.0` 👌

<br />

## Installation

```sh
npm install --save-dev @webpack-blocks/webpack @webpack-blocks/babel6 ...
```


## Usage

Create a development config with Babel support, dev server, HMR and PostCSS autoprefixer:

```js
const { createConfig, defineConstants, env, entryPoint, setOutput, sourceMaps } = require('@webpack-blocks/webpack')
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

Check out the [sample app](./test-app) to see a webpack config in action or read [how to create your own blocks](./docs/BLOCK-CREATION.md).


## Available webpack blocks

- [babel6](./packages/babel6)
- [css-modules](./packages/css-modules)
- [dev-server](./packages/dev-server)
- [extract-text](./packages/extract-text)
- [postcss](./packages/postcss)
- [sass](./packages/sass)
- [webpack](./packages/webpack) *(Webpack base config)*

Missing something? Write and publish your own webpack blocks!


## Webpack 2

Looking for webpack 2 support? It's currently in beta. One of the nice gimmicks of using webpack-blocks is that you can switch between webpack versions in an instant!

Just use the webpack 2 versions of the following blocks:

```
@webpack-blocks/webpack -> @webpack-blocks/webpack2
@webpack-blocks/dev-server -> @webpack-blocks/dev-server2
@webpack-blocks/extract-text -> @webpack-blocks/extract-text2
```

That's it! You can also have a look at the [end-to-end test projects](https://github.com/andywer/webpack-blocks/tree/feature/webpack2/packages/webpack2/__e2e-fixtures__) to see an example.


## Design principles

- Extensibility first
- Uniformity for easy composition
- Keep everything configurable
- But provide sane defaults


## group() (*presets*)

You have got some projects with a similar, yet not identical webpack configuration? Seems like you are looking for something preset-ish!

Fortunately, this is also very simple:

```js
const { env, group } = require('@webpack-blocks/webpack')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server')

function myPreset (proxyConfig) {
  return group([
    babel(),
    env('development', [
      devServer(),
      devServer.proxy(proxyConfig)
    ])
  ])
}
```

The key feature is the `group()` method which takes a set of blocks and returns a new block that combines all their functionality.

Then use your preset like this:

```js
const { createConfig } = require('@webpack-blocks/webpack')

module.exports = createConfig([
  myPreset({
    '/api': { target: 'http://localhost:3000' }
  }),
  ...   // add more blocks here
])
```


## You might want to know

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
          loaders: [ 'babel?cacheDirectory' ]
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
</details>

## Like what you see?

Support webpack-blocks by giving [feedback](https://github.com/andywer/webpack-blocks/issues), publishing new webpack blocks or just by 🌟 starring the project!
