/**
 * Webpack dev-server block.
 *
 * @see https://github.com/webpack/webpack-dev-server
 */

export default devServer

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
function devServer (options = {}, entry = null) {
  if (options && (typeof options === 'string' || Array.isArray(options))) {
    entry = options
    options = {}
  }

  if (!Array.isArray(entry)) {
    entry = entry ? [ entry ] : []
  }

  return Object.assign((context) => {
    context.devServer = context.devServer || { entry: [], options: {} }
    context.devServer.entry = context.devServer.entry.concat(entry)
    context.devServer.options = Object.assign({}, context.devServer.options, options)

    return {}
  }, { post: postConfig })
}

function postConfig (context, config) {
  const entryPointsToAdd = context.devServer.entry.length > 0
    ? context.devServer.entry
    : [ 'webpack/hot/only-dev-server' ]

  return {
    devServer: Object.assign({
      hot: true,
      historyApiFallback: true,
      inline: true
    }, context.devServer.options),
    entry: addDevEntryToAll(config.entry || {}, entryPointsToAdd),
    plugins: [
      new context.webpack.HotModuleReplacementPlugin()
    ]
  }
}

function addDevEntryToAll (presentEntryPoints, devServerEntry) {
  const newEntryPoints = {}

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
function reactHot (options = {}) {
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
