/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 */

const _ = require('lodash')

module.exports = postcss

/**
 * @param {object}          [options]               https://github.com/postcss/postcss-loader#options
 * @param {bool}            [options.minimize]      Enable minification.
 * @param {string}          [options.parser]        Package name of custom PostCSS parser to use.
 * @param {string}          [options.stringifier]   Package name of custom PostCSS stringifier to use.
 * @param {string}          [options.syntax]        Package name of custom PostCSS parser/stringifier to use.
 * @param {PostCSSPlugin[]} [options.plugins]       PostCSS plugins, will read `postcss.config.js` file if not supplied.
 * @return {Function}
 */
function postcss (options = {}) {
  if (Array.isArray(options)) {
    throw Error('Passing PostCSS plugins as a first argument is not supported anymore, use options.plugins instead')
  }

  const postcssOptions = _.omit(options, 'minimize')
  return (context, util) => prevConfig => {
    const ruleDef = Object.assign({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { minimize: options.minimize }
        },
        {
          loader: 'postcss-loader',
          options: postcssOptions
        }
      ]
    }, context.match)

    let nextConfig = util.addLoader(ruleDef)(prevConfig)

    return nextConfig
  }
}
