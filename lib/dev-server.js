const webpack = require('webpack')

module.exports = devServer

devServer.proxy = proxy

/**
 * @see https://webpack.github.io/docs/configuration.html#devserver
 */
function devServer (options) {
  return (fileTypes) => ({
    devServer: {
      hot: true,
      historyApiFallback: true,
      inline: true
    },
    entry: [ 'webpack/hot/dev-server' ],
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
