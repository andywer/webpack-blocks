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

  return (fileTypes, config) => ({
    devServer: Object.assign({
      hot: true,
      historyApiFallback: true,
      inline: true
    }, options),
    entry: addDevEntry(entry, config),
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}

function addDevEntry (devServerEntry, config) {
  if (typeof devServerEntry === 'string') {
    devServerEntry = [devServerEntry]
  }

  if (!config.entry) {
    config.entry = []
  } else if (typeof config.entry === 'string') {
    config.entry = [config.entry]
  }

  if (typeof config.entry === 'object') {
    if (Array.isArray(config.entry)) {
      return devServerEntry.concat(config.entry)
    } else {
      var entry = {}

      // Adding dev server to all entries
      for (let chunkName in config.entry) {
        var chunkEntry = config.entry[chunkName]

        if (typeof chunkEntry === 'string') {
          chunkEntry = [chunkEntry]
        }

        entry[chunkName] = devServerEntry.concat(chunkEntry)
      }

      return entry
    }
  }

  return devServerEntry
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

  return (fileTypes) => ({
    module: {
      loaders: [{
        test: fileTypes('application/javascript'),
        exclude: Array.isArray(exclude) ? exclude : [ exclude ],
        loaders: [ 'react-hot' ]
      }]
    }
  })
}
