module.exports = devServer

devServer.proxy = proxy

/**
 * @see https://webpack.github.io/docs/configuration.html#devserver
 */
function devServer () {
  return (fileTypes) => ({
    devServer: {
      hot: true,
      historyApiFallback: true
    },
    entry: {
      devServer: [ 'webpack/hot/dev-server', 'webpack/hot/only-dev-server' ]
    },
    module: {
      loaders: [
        {
          test: fileTypes('application/javascript'),
          loaders: [ 'react-hot' ]
        }
      ]
    }
  })
}

function proxy (proxyRoutes) {
  return () => ({
    devServer: {
      proxy: proxyRoutes
    }
  })
}
