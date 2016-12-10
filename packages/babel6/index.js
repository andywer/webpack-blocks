/**
 * Babel webpack block.
 *
 * @see https://github.com/babel/babel-loader
 */

module.exports = babel

/**
 * @param {object} [options]
 * @param {RegExp, Function, string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function babel (options) {
  options = options || {}
  const exclude = options.exclude || /\/node_modules\//

  return (context) => ({
    module: {
      loaders: [
        {
          test: context.fileTypes('application/javascript'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'babel-loader?cacheDirectory' ]
        }
      ]
    }
  })
}
