# webpack-blocks - The building blocks for your frontend

A functional approach to tame your webpack config. Composing the webpack config of middlewares like *babel*, *hmr*, ...

**- Still working the details out. Not yet published to npm. -**


## Installation

```sh
npm install --save-dev https://github.com/andywer/webpack-blocks.git
```


## Usage

Create a development config with Babel support, dev server and HMR:

```js
const { createConfig } = require('webpack-blocks')
const { entryPoint, setOutput, sourceMaps } = require('webpack-blocks/lib/webpack')
const babel = require('webpack-blocks/lib/babel6')
const devServer = require('webpack-blocks/lib/dev-server')

module.exports = createConfig([
  entryPoint('./src/main.js'),
  setOutput('./build/bundle.js'),
  babel(),
  sourceMaps(),
  devServer(),
  devServer.proxy({
    '/api': { target: 'http://localhost:3000' }
  })
])
```

Wanna use CSS modules? No problem!

```js
const cssModules = require('webpack-blocks/lib/css-modules')

...

module.exports = createConfig([
  ...,
  cssModules()
])
```


## Available webpack blocks

- [babel6](./lib/babel6.js)
- [css-modules](./lib/css-modules.js)
- [dev-server](./lib/dev-server.js)
- [postcss](./lib/postcss.js)
- [webpack](./lib/webpack.js) *(Webpack base config)*

You can find usage documentation in these files.


## Feedback?

You are welcome! Feel free to open an 👉 [issue](https://github.com/andywer/webpack-blocks/issues).
