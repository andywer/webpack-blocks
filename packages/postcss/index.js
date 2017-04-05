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
  plugins = plugins || []
  options = options || {}

  // https://github.com/postcss/postcss-loader#options
  const postcssOptions = Object.assign(
    {},
    options.parser && { parser: options.parser },
    options.stringifier && { stringifier: options.stringifier },
    options.syntax && { syntax: options.syntax }
  )

  return (context) => Object.assign(
    {
      module: {
        loaders: [
          Object.assign({
            test: context.fileType('text/css'),
            loaders: [ 'style-loader', 'css-loader', 'postcss-loader?' + JSON.stringify(postcssOptions) ]
          }, options.exclude ? {
            exclude: Array.isArray(options.exclude) ? options.exclude : [ options.exclude ]
          } : {})
        ]
      }
    },
    plugins.length > 0 ? createPostcssPluginsConfig(context.webpack, plugins) : {}
  )
}

function createPostcssPluginsConfig (webpack, plugins) {
  const isWebpack2 = typeof webpack.validateSchema !== 'undefined'

  if (isWebpack2) {
    return {
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: plugins,

            // Hacky fix for a strange issue involving the postcss-loader, sass-loader and webpack@2
            // (see https://github.com/andywer/webpack-blocks/issues/116)
            // Might be removed again once the `sass` block uses a newer `sass-loader`
            context: '/'
          }
        })
      ]
    }
  } else {
    return {
      postcss: plugins
    }
  }
}
