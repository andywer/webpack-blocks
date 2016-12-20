/**
 * Webpack dev-server block.
 *
 * @see https://github.com/webpack/webpack-dev-server
 */

const webpack = require('webpack')

module.exports = devServer

devServer.proxy = proxy
devServer.reactHot = reactHot

/**
 * @param {object} [options]    See https://webpack.github.io/docs/configuration.html#devserver
 * @param {bool}   [options.historyApiFallback]
 * @param {bool}   [options.hot]
 * @param {bool}   [options.inline]
 * @param {string|string[]} [entry]   Defaults to 'webpack/hot/only-dev-server'
 * @return {Function}
 */
function devServer (options, entry) {
  if (options && (typeof options === 'string' || Array.isArray(options))) {
    entry = options
    options = {}
  } else {
    entry = entry || 'webpack/hot/only-dev-server'
  }

  entry = Array.isArray(entry) ? entry : [ entry ]

  const devServerBlock = (context) => {
    context.devServer = { entry }

    return {
      devServer: Object.assign({
        hot: true,
        historyApiFallback: true,
        inline: true
      }, options)
    }
  }

  return Object.assign(devServerBlock, { post: postConfig })
}

function postConfig (context, config) {
  if (!context.devServer) {
    return {}
  }

  return {
    entry: addDevEntryToAll(config.entry || {}, context.devServer.entry),
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}

function addDevEntryToAll (presentEntryPoints, devServerEntry) {
  const newEntryPoints = {}

  // Add dev-server to every entry point
  Object.keys(presentEntryPoints).forEach((chunkName) => {
    // It's fine to just set the `devServerEntry`, instead of concat()-ing the present ones.
    // Will be concat()-ed by webpack-merge (see `createConfig()`)
    newEntryPoints[ chunkName ] = devServerEntry
  })

  return newEntryPoints
}

/**
 * @param {object} proxyRoutes    { <path>: <target URL> }
 * @return {Function}
 * @see http://webpack.github.io/docs/webpack-dev-server.html#proxy
 */
function proxy (proxyRoutes) {
  return () => ({
    devServer: {
      proxy: proxyRoutes
    }
  })
}

/**
 * For adding the react-hot-loader to the JS loaders. Only when using
 * react-hot-loader before version 3.
 * @param {object} [options]
 * @param {RegExp, Function, string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function reactHot (options) {
  options = options || {}
  const exclude = options.exclude || /\/node_modules\//

  return (context) => ({
    module: {
      loaders: [{
        test: context.fileType('application/javascript'),
        exclude: Array.isArray(exclude) ? exclude : [ exclude ],
        loaders: [ 'react-hot' ]
      }]
    }
  })
}
