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
  return (fileTypes) => ({
    module: {
      loaders: [
        {
          test: fileTypes('text/x-sass'),
          loaders: [ 'style', 'css', 'sass' ]
        }
      ]
    }
  })
}
