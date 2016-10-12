/**
 * Webpack dev-server block.
 *
 * @see https://github.com/webpack/webpack-dev-server
 */

const webpack = require('webpack')

module.exports = devServer

devServer.proxy = proxy

/**
 * @param {object} [options]    See https://webpack.github.io/docs/configuration.html#devserver
 * @param {bool}   [options.historyApiFallback]
 * @param {bool}   [options.hot]
 * @param {bool}   [options.inline]
 * @return {Function}
 */
function devServer (options) {
  return (fileTypes) => ({
    devServer: Object.assign({
      hot: true,
      historyApiFallback: true,
      inline: true
    }, options),
    entry: [ 'webpack/hot/only-dev-server' ],
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
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
