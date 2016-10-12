/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 */

module.exports = postcss

/**
 * @param {PostCSSPlugin[]} plugins
 * @param {object}          [options]
 * @param {RegExp, Function, string}  [options.exclude]         Directories to exclude.
 * @return {Function}
 */
function postcss (plugins, options) {
  options = options || {}
  const exclude = options.exclude || /\/node_modules\//

  return (fileTypes) => ({
    module: {
      loaders: [
        {
          test: fileTypes('text/css'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'postcss' ]
        }
      ]
    },
    postcss: plugins
  })
}
