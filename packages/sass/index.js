/**
 * SASS webpack block.
 *
 * @see https://github.com/jtangelder/sass-loader
 */

module.exports = sass

/**
 * @return {Function}
 */
function sass () {
  return (context) => ({
    module: {
      loaders: [
        {
          test: context.fileTypes('text/x-sass'),
          loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
      ]
    }
  })
}
