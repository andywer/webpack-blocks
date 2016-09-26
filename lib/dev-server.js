module.exports = devServer

function devServer (options = {}) {
  const { proxy = {} } = options

  return () => ({
    devServer: {
      hot: true,
      historyApiFallback: true,
      proxy
    },
    entry: {
      devServer: [ 'webpack/hot/dev-server', 'webpack/hot/only-dev-server' ]
    },
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          loaders: [ 'react-hot' ]
        }
      ]
    }
  })
}
