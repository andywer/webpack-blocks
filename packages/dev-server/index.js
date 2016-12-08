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

  var configEntry = config.entry
  if (!configEntry) {
    configEntry = []
  } else if (typeof configEntry === 'string') {
    configEntry = [configEntry]
  }

  if (typeof configEntry === 'object') {
    if (Array.isArray(configEntry)) {
      return devServerEntry
    } else {
      var entry = {}

      // Merging has to be done manually when using multiple entry points
      for (let chunkName in configEntry) {
        var chunkEntry = configEntry[chunkName]

        if (typeof chunkEntry === 'string') {
          chunkEntry = [chunkEntry]
        }

        entry[chunkName] = chunkEntry.concat(devServerEntry)
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
