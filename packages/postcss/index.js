/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 */

module.exports = postcss

/**
 * @param {PostCSSPlugin[]} [plugins]                   Will read `postcss.config.js` file if not supplied.
 * @param {object}          [options]
 * @param {RegExp|Function|string}  [options.exclude]     Directories to exclude.
 * @param {string}                  [options.parser]      Package name of custom PostCSS parser to use.
 * @param {string}                  [options.stringifier] Package name of custom PostCSS stringifier to use.
 * @param {string}                  [options.syntax]      Package name of custom PostCSS parser/stringifier to use.
 * @return {Function}
 */
function postcss (plugins, options) {
  options = options || {}
  const exclude = options.exclude || /\/node_modules\//

  // https://github.com/postcss/postcss-loader#options
  const postcssOptions = Object.assign(
    {},
    options.parser && { parser: options.parser },
    options.stringifier && { stringifier: options.stringifier },
    options.syntax && { syntax: options.syntax }
  )

  return (context) => Object.assign({
    module: {
      loaders: [
        {
          test: context.fileType('text/css'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'style-loader', 'css-loader', 'postcss-loader?' + JSON.stringify(postcssOptions) ]
        }
      ]
    }
  }, plugins ? {
    postcss: plugins
  } : {})
}
