/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 */
module.exports = postcss

/**
 * Adds `postcss-loader` block to your webpack configuration. `postcss-loader`
 * options can be supplied with `plugins`, `options.parser`, `options.stringifier` or
 * `options.syntax`.
 *
 * `postcss-loader` tries to use `postcss.config.js` file when no arguments are
 * supplied.
 *
 * You can exclude files with `options.exclude`.
 *
 * @see https://github.com/postcss/postcss-loader
 *
 * @param {PostCSSPlugin[]}           [plugins]                             An array of {@link http://api.postcss.org/global.html#pluginFunction|PostCSS plugins}.
 * @param {object}                    [options]
 * @param {PostCSSParser|string}      [options.parser]                      Must be a {@link http://www.google.com|PostCSS parser} instance or the module name as string, e.g. 'postcss-scss'.
 * @param {PostCSSStringifier|string} [options.stringifier]                 Must be a {@link http://api.postcss.org/global.html#stringifier|PostCSS stringifier} instance or the module name as string, e.g. 'postcss-scss'.
 * @param {PostCSSSyntax|string}      [options.syntax]                      Must be a {@link http://api.postcss.org/global.html#syntax|PostCSS syntax} instance or the module name as string, e.g. 'postcss-scss'.
 * @param {RegExp|Function|string}    [options.exclude=/\/node_modules\//]  Files excluded from this loader
 * @return {Function}
 */
function postcss (plugins, options) {
  options = options || {}
  const exclude = options.exclude || /\/node_modules\//

  /* TODO: Remove this condition as soon as loading plugins with webpack 2 works. */
  if (plugins) {
    throw new Error(`Loading postcss plugins with webpack 2 (as of webpack@2.2.0-rc.3) does not work right now. Please use a postcss.config.js file! Reference: https://github.com/postcss/postcss-loader/issues/125#issuecomment-257127969`)
  }

  return (context) => Object.assign({
    module: {
      rules: [
        {
          test: context.fileType('text/css'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                parser: options.parser,
                stringifier: options.stringifier,
                syntax: options.syntax,
                plugins: plugins
              }
            }
          ]
        }
      ]
    }
  })
}
