module.exports = babel

function babel () {
  return () => ({
    module: {
      loaders: [
        {
          test: /\.jsx?/,
          exclude: [ /node_modules/ ],
          loaders: [ 'babel?cacheDirectory' ]
        }
      ]
    }
  })
}
