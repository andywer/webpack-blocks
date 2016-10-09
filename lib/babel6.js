module.exports = babel

function babel (options) {
  const { exclude = /node_modules/ } = options || {}

  return (fileTypes) => ({
    module: {
      loaders: [
        {
          test: fileTypes('application/javascript'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'babel?cacheDirectory&plugins[]=react-hot-loader/babel' ]
        }
      ]
    }
  })
}
