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
function postcss (plugins = [], options = {}) {
  // https://github.com/postcss/postcss-loader#options
  const postcssOptions = Object.assign(
    {},
    options.parser && { parser: options.parser },
    options.stringifier && { stringifier: options.stringifier },
    options.syntax && { syntax: options.syntax }
  )

  return (context, util) => prevConfig => {
    const ruleDef = Object.assign(
      {
        test: context.fileType('text/css'),
        use: [ 'style-loader', 'css-loader', 'postcss-loader?' + JSON.stringify(postcssOptions) ]
      },
      options.include ? {
        include: Array.isArray(options.include) ? options.include : [ options.include ]
      } : {},
      options.exclude ? {
        exclude: Array.isArray(options.exclude) ? options.exclude : [ options.exclude ]
      } : {}
    )

    const _addLoader = util.addLoader(ruleDef)
    const _addPlugin = plugins.length > 0
      ? addLoaderOptionsPlugin(context, util, plugins)
      : config => config

    return _addPlugin(_addLoader(prevConfig))
  }
}

function addLoaderOptionsPlugin ({ webpack }, util, postcssPlugins) {
  return util.addPlugin(
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: postcssPlugins,

        // Hacky fix for a strange issue involving the postcss-loader, sass-loader and webpack@2
        // (see https://github.com/andywer/webpack-blocks/issues/116)
        // Might be removed again once the `sass` block uses a newer `sass-loader`
        context: '/'
      }
    })
  )
}
