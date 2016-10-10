module.exports = postcss

function postcss (plugins, options) {
  const { exclude = /\/node_modules\// } = options || {}

  return (fileTypes) => ({
    module: {
      loaders: [
        {
          test: fileTypes('text/css'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'postcss' ]
        }
      ]
    },
    postcss: plugins
  })
}
