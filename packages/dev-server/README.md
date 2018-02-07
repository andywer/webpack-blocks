# webpack-blocks - Webpack Dev Server

[![Gitter chat](https://badges.gitter.im/webpack-blocks.svg)](https://gitter.im/webpack-blocks)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/@webpack-blocks/dev-server.svg)](https://www.npmjs.com/package/@webpack-blocks/dev-server)

This is the `dev-server` block providing webpack dev server configuration.


## Usage

```js
const { createConfig, env } = require('@webpack-blocks/webpack')
const devServer = require('@webpack-blocks/dev-server')

module.exports = createConfig([
  // use only if `NODE_ENV === 'development'`:
  env('development', [
    devServer({
      // Show full-screen overlay in the browser on compiler errors or warnings
      overlay: true,

      // If you need to proxy API requests:
      proxy: {
        '/api': { target: 'http://localhost:3000' },
      },
    }),
  ])
])
```

Don’t forget to enable hot reload in your app. If you’re using React it may look like this:

```js
import React from 'react';
import ReactDOM from 'react-dom';

function render() {
  ReactDOM.render(
    <h1>Hello, webpack-blocks!</h1>,
    document.getElementById('root')
  );
}

render();

if (module.hot) {
  module.hot.accept(render);
}
```

## webpack-blocks

Check out the

👉 [Main documentation](https://github.com/andywer/webpack-blocks)

Released under the terms of the MIT license.
