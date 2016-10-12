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
