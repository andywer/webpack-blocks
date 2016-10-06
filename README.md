# webpack-blocks - The building blocks for your frontend

A functional approach to tame your webpack config. Composing the webpack config of middlewares like *babel*, *hmr*, ...

**- Attention: This is just a draft right now -**


## Installation

```sh
npm install --save-dev https://github.com/andywer/webpack-blocks.git
```


## Usage

Create a development config with Babel support, dev server and HMR:

```js
const { createConfig, baseConfig, setOutput } = require('webpack-blocks')
const babel = require('webpack-blocks/lib/babel6')
const devServer = require('webpack-blocks/lib/dev-server')

module.exports = createConfig([
  baseConfig('./src/main.js'),
  setOutput('./build/bundle.js'),
  babel(),
  devServer({
    proxy: {
      '/api/*': { target: 'http://localhost:8080' }
    }
  })
])
```

## Have a look at

- [index.js](./index.js)
- [lib/babel6.js](./lib/babel6.js)
- [lib/dev-server.js](./lib/dev-server.js)


## Feedback?

You are welcome! Feel free to open an 👉 [issue](https://github.com/andywer/webpack-blocks/issues).
