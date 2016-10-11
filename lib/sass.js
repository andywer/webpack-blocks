/**
 * SASS webpack block.
 *
 * @see https://github.com/jtangelder/sass-loader
 * @example
 * const { createConfig } = require('webpack-blocks')
 * const sass = require('webpack-blocks/lib/sass')
 *
 * module.exports = createConfig([
 *   sass()
 * ])
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
