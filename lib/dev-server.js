const webpack = require('webpack')

module.exports = devServer

devServer.proxy = proxy

/**
 * @see https://webpack.github.io/docs/configuration.html#devserver
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

function proxy (proxyRoutes) {
  return () => ({
    devServer: {
      proxy: proxyRoutes
    }
  })
}
