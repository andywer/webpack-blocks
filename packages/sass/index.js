/**
 * SASS webpack block.
 *
 * @see https://github.com/jtangelder/sass-loader
 */

module.exports = sass

/**
 * @param {object}   [options]                  See https://github.com/sass/node-sass#options
 * @param {string[]} [options.sassOptions.includePaths]
 * @param {bool}     [options.sassOptions.indentedSyntax]
 * @param {string}   [options.sassOptions.outputStyle]
 * @param {bool}     [options.sourceMap]
 * @return {Function}
 */
function sass(options = {}) {
  return (context, util) => {
    if (!context.match) {
      throw Error(
        'You cannot use the sass() block outside a match() block. You also need to use the css() block on sass files.'
      )
    }

    return util.addLoader(
      Object.assign(
        {
          test: /\.(sass|scss)$/,
          use: [
            {
              loader: 'sass-loader',
              options
            }
          ]
        },
        context.match
      )
    )
  }
}
