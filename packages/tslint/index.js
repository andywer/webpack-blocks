/**
 * Tslint webpack block.
 *
 * @see https://github.com/wbuchwalter/tslint-loader
 */

module.exports = tslint

/**
 * @param {object}   [options]                  See https://github.com/wbuchwalter/tslint-loader#usage
 * @return {Function}
 */
function tslint (options) {
  options = options || {}

  const loader = (context, extra) => Object.assign({
    test: context.fileType('application/x-typescript'),
    loaders: [ 'tslint-loader' ]
  }, extra)

  const module = (context) => (context.webpackVersion.major === 1 ? {
    preLoaders: [ loader(context) ]
  } : {
    loaders: [ loader(context, { enforce: 'pre' }) ]
  })

  const setter = (context) => Object.assign({
    module: module(context),
    plugins: context.webpackVersion.major === 2 ? [
      new context.webpack.LoaderOptionsPlugin({
        options: {
          tslint: options
        }
      })
    ] : []
  }, context.webpackVersion.major === 1 ? { tslint: options } : undefined)

  return Object.assign(setter, { pre })
}

function pre (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
