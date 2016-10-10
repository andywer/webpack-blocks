/**
 * Babel webpack block.
 *
 * @see https://github.com/babel/babel-loader
 * @example
 * const { createConfig } = require('webpack-blocks')
 * const babel = require('webpack-blocks/lib/babel6')
 *
 * module.exports = createConfig([
 *   babel()
 * ])
 */

module.exports = babel

/**
 * @param {object} [options]
 * @param {RegExp, Function, string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function babel (options) {
  const { exclude = /\/node_modules\// } = options || {}

  return (fileTypes) => ({
    module: {
      loaders: [
        {
          test: fileTypes('application/javascript'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'babel?cacheDirectory' ]
        }
      ]
    }
  })
}
