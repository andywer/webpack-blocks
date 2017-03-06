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

  const setter = (context, util) => prevConfig => {
    const _addLoader = util.addLoader({
      test: context.fileType('application/x-typescript'),
      loaders: [ 'tslint-loader' ],
      enforce: 'pre'
    })
    const _addPlugin = util.addPlugin(
      new context.webpack.LoaderOptionsPlugin({
        options: {
          tslint: options
        }
      })
    )

    return _addLoader(_addPlugin(prevConfig))
  }

  return Object.assign(setter, { pre })
}

function pre (context) {
  const registeredTypes = context.fileType.all()

  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
