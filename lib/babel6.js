module.exports = babel

function babel () {
  return (fileTypes) => ({
    module: {
      loaders: [
        {
          test: fileTypes('application/javascript'),
          exclude: [ /node_modules/ ],
          loaders: [ 'babel?cacheDirectory' ]
        }
      ]
    }
  })
}
