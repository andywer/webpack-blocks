/**
 * Tslint webpack block.
 *
 * @see https://github.com/wbuchwalter/tslint-loader
 */

module.exports = tslint
const webpack = require('webpack')

/**
 * @param {object}   [options]                  See https://github.com/wbuchwalter/tslint-loader#usage
 * @return {Function}
 */
function tslint (options) {
  options = options || {}

  const setter = (context) => ({
    module: {
      loaders: [
        {
          enforce: 'pre',
          test: context.fileType('text/x-typescript'),
          loaders: [ 'tslint-loader' ]
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          tslint: options
        }
      })
    ]
  })

  return Object.assign(setter, { pre })
}

function pre (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
