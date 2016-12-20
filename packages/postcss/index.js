/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 */

module.exports = postcss

/**
 * @param {PostCSSPlugin[]} [plugins]                     Will read `postcss.config.js` file if not supplied.
 * @param {object}          [options]
 * @param {RegExp, Function, string}  [options.exclude]   Directories to exclude.
 * @return {Function}
 */
function postcss (plugins, options) {
  options = options || {}
  const exclude = options.exclude || /\/node_modules\//

  return (context) => Object.assign({
    module: {
      loaders: [
        {
          test: context.fileTypes('text/css'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'style-loader', 'css-loader', 'postcss-loader' ]
        }
      ]
    }
  }, plugins ? {
    postcss: plugins
  } : {})
}
