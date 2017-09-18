/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 */

module.exports = postcss

/**
 * @param {PostCSSPlugin[]} [plugins]               Will read `postcss.config.js` file if not supplied.
 * @param {object}          [options]               https://github.com/postcss/postcss-loader#options
 * @param {bool}            [options.minimize]      Enable minification.
 * @param {string}          [options.parser]        Package name of custom PostCSS parser to use.
 * @param {string}          [options.stringifier]   Package name of custom PostCSS stringifier to use.
 * @param {string}          [options.syntax]        Package name of custom PostCSS parser/stringifier to use.
 * @return {Function}
 */
function postcss (plugins = [], options = {}) {
  const { minimize, ...postcssOptions } = options
  return (context, util) => prevConfig => {
    const ruleDef = Object.assign({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { minimize }
        },
        {
          loader: 'postcss-loader',
          options: postcssOptions
        }
      ]
    }, context.match)

    let nextConfig = util.addLoader(ruleDef)(prevConfig)

    if (plugins.length > 0) {
      nextConfig = util.addPlugin(createLoaderOptionsPlugin(context, plugins))(nextConfig)
    }

    return nextConfig
  }
}

function createLoaderOptionsPlugin ({ webpack }, postcssPlugins) {
  return new webpack.LoaderOptionsPlugin({
    options: {
      postcss: postcssPlugins,

      // Hacky fix for a strange issue involving the postcss-loader, sass-loader and webpack@2
      // (see https://github.com/andywer/webpack-blocks/issues/116)
      // TODO: Might be removed again once the `sass` block uses a newer `sass-loader`
      context: '/'
    }
  })
}
