# webpack-blocks - The building blocks for your frontend

A functional approach to tame your webpack config. Composing the webpack config of feature middlewares like *Babel*, *PostCSS*, *HMR*, ...

**- Still working the details out. Not yet published to npm. -**


## Installation

```sh
npm install --save-dev https://github.com/andywer/webpack-blocks.git
```


## Usage

Create a development config with Babel support, dev server, HMR and PostCSS autoprefixer:

```js
const { createConfig, env } = require('webpack-blocks')
const { entryPoint, setOutput, sourceMaps } = require('webpack-blocks/lib/webpack')
const autoprefixer = require('autoprefixer')
const babel = require('webpack-blocks/lib/babel6')
const devServer = require('webpack-blocks/lib/dev-server')
const postcss = require('webpack-blocks/lib/postcss')

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
const cssModules = require('webpack-blocks/lib/css-modules')

...

module.exports = createConfig([
  ...
  cssModules()
])
```


## Available webpack blocks

- [babel6](./lib/babel6.js)
- [css-modules](./lib/css-modules.js)
- [dev-server](./lib/dev-server.js)
- [postcss](./lib/postcss.js)
- [webpack](./lib/webpack.js) *(Webpack base config)*

You can find usage documentation in these files. Feel free to write and publish your own webpack blocks!


## Feedback?

You are welcome! Feel free to open an 👉 [issue](https://github.com/andywer/webpack-blocks/issues).
