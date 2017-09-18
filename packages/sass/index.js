/**
 * SASS webpack block.
 *
 * @see https://github.com/jtangelder/sass-loader
 */

const _ = require('lodash')

module.exports = sass

/**
 * @param {object}   [options]                  See https://github.com/sass/node-sass#options
 * @param {bool}     [options.minimize]         Enable minification.
 * @param {string[]} [options.includePaths]
 * @param {bool}     [options.indentedSyntax]
 * @param {string}   [options.outputStyle]
 * @param {bool}     [options.sourceMap]
 * @return {Function}
 */
function sass (options = {}) {
  const sassOptions = _.omit(options, 'minimize')
  return (context, util) => util.addLoader(
    Object.assign({
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: Boolean(options.sourceMap),
            minimize: options.minimize
          }
        },
        {
          loader: 'sass-loader',
          options: sassOptions
        }
      ]
    }, context.match)
  )
}
