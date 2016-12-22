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
function sass (options) {
  options = options || {}

  const hasOptions = Object.keys(options).length > 0

  return (context) => ({
    module: {
      loaders: [
        {
          test: context.fileType('text/x-sass'),
          loaders: [
            'style-loader',
            options.sourceMap ? 'css-loader?sourceMap' : 'css-loader',
            hasOptions ? 'sass-loader?' + JSON.stringify(options) : 'sass-loader'
          ]
        }
      ]
    }
  })
}
