/**
 * SASS webpack block.
 *
 * @see https://github.com/jtangelder/sass-loader
 */

module.exports = sass

/**
 * @param {object}   [options]                  See https://github.com/sass/node-sass#options
 * @param {string[]} [options.includePaths]
 * @param {bool}     [options.indentedSyntax]
 * @param {string}   [options.outputStyle]
 * @param {bool}     [options.sourceMap]
 * @return {Function}
 */
function sass (options = {}) {
  return (context, util) => util.addLoader({
    test: context.fileType('text/x-sass'),
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: !!options.sourceMap
        }
      },
      {
        loader: 'sass-loader',
        options
      }
    ]
  })
}
