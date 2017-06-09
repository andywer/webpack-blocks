/**
 * Webpack dev-server block.
 *
 * @see https://github.com/webpack/webpack-dev-server
 */

module.exports = devServer

devServer.proxy = proxy
devServer.reactHot = reactHot

/**
 * @param {object} [options]    See https://webpack.github.io/docs/configuration.html#devserver
 * @param {bool}   [options.historyApiFallback]
 * @param {bool}   [options.hot]
 * @param {bool}   [options.inline]
 * @param {string|string[]} [entry]
 * @return {Function}
 */
function devServer (options = {}, entry = []) {
  if (options && (typeof options === 'string' || Array.isArray(options))) {
    entry = options
    options = {}
  }

  if (!Array.isArray(entry)) {
    entry = entry ? [ entry ] : []
  }

  const setter = context => prevConfig => {
    context.devServer = context.devServer || { entry: [], options: {} }
    context.devServer.entry = context.devServer.entry.concat(entry)
    context.devServer.options = Object.assign({}, context.devServer.options, options)

    return prevConfig
  }

  return Object.assign(setter, { post: postConfig })
}

function postConfig (context, util) {
  const entryPointsToAdd = context.devServer.entry

  return prevConfig => {
    return util.merge({
      devServer: Object.assign({
        hot: true,
        hotOnly: true,
        historyApiFallback: true,
        inline: true
      }, context.devServer.options),
      entry: addDevEntryToAll(prevConfig.entry || {}, entryPointsToAdd),
      plugins: [
        new context.webpack.HotModuleReplacementPlugin(),
        new context.webpack.NamedModulesPlugin()
      ]
    })(prevConfig)
  }
}

function addDevEntryToAll (presentEntryPoints, devServerEntry) {
  const newEntryPoints = {}

  Object.keys(presentEntryPoints).forEach(chunkName => {
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
  return (context, util) => util.merge({
    devServer: {
      proxy: proxyRoutes
    }
  })
}

/**
 * For adding the react-hot-loader to the JS loaders.
 * @param {object} [options]
 * @param {RegExp, Function, string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function reactHot () {
  return (context, util) => util.addLoader(
    Object.assign({
      test: /\.(js|jsx)$/,
      use: [ 'react-hot' ]
    }, context.match)
  )
}
