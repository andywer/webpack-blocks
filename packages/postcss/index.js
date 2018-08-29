/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 */

module.exports = postcss

/**
 * @param {object}          [options]               https://github.com/postcss/postcss-loader#options
 * @param {string}          [options.parser]        Package name of custom PostCSS parser to use.
 * @param {string}          [options.stringifier]   Package name of custom PostCSS stringifier to use.
 * @param {string}          [options.syntax]        Package name of custom PostCSS parser/stringifier to use.
 * @param {PostCSSPlugin[]} [options.plugins]       PostCSS plugins, will read `postcss.config.js` file if not supplied.
 * @return {Function}
 */
function postcss(options = {}) {
  if (Array.isArray(options)) {
    throw Error(
      'Passing PostCSS plugins as a first argument is not supported anymore, use options.plugins instead'
    )
  }

  return (context, util) => prevConfig => {
    const ruleDef = Object.assign(
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options
          }
        ]
      },
      context.match
    )

    let nextConfig = util.addLoader(ruleDef)(prevConfig)

    return nextConfig
  }
}
