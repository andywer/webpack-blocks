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

  const module = (context) => ({
    preLoaders: [ loader(context) ]
  })

  const setter = (context) => ({
    module: module(context),
    tslint: options
  })

  return Object.assign(setter, { pre })
}

function pre (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
