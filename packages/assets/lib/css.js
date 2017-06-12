const { synthesizeMatch } = require('./compat')

module.exports = css
module.exports.modules = cssModules

/**
 * @param {string} [fileType]   Deprecated.
 * @param {object} [options]    You can pass all css-loader options.
 * @return {Function}
 * @see https://github.com/webpack-contrib/css-loader
 */
function css (fileType, options = {}) {
  if (fileType && typeof fileType === 'object' && Object.keys(options).length === 0) {
    options = fileType
    fileType = null
  }
  if (fileType || options.exclude || options.include) {
    console.warn(`css(): You are using the deprecated 'fileType' parameter, 'options.exclude' or 'options.include'. Use match() instead.`)
  }

  return (context, util) => util.addLoader(
    Object.assign(
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options }
        ]
      },
      // for API backwards compatibility only
      synthesizeMatch(context.fileType(fileType || 'text/css'), options),
      context.match
    )
  )
}

/**
 * @param {string} [fileType]   Deprecated.
 * @param {object} [options] You can pass all css-loader options.
 * @param {number} [options.importLoaders]    Defaults to 1.
 * @param {string} [options.localIdentName]   Defaults to '[hash:base64:10]' in production, '[name]--[local]--[hash:base64:5]' in development.
 * @return {Function}
 * @see https://github.com/webpack-contrib/css-loader
 */
function cssModules (fileType, options = {}) {
  if (fileType && typeof fileType === 'object' && Object.keys(options).length === 0) {
    options = fileType
    fileType = null
  }
  if (fileType || options.exclude || options.include) {
    console.warn(`css.modules(): You are using the deprecated 'fileType' parameter, 'options.exclude' or 'options.include'. Use match() instead.`)
  }

  options = Object.assign({
    modules: true,
    importLoaders: 1,
    localIdentName: String(process.env.NODE_ENV) === 'production'
      ? '[hash:base64:10]'
      : '[name]--[local]--[hash:base64:5]'
  }, options)

  return (context, util) => util.addLoader(
    Object.assign(
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options }
        ]
      },
      // for API backwards compatibility only
      synthesizeMatch(context.fileType(fileType || 'text/css'), options),
      context.match
    )
  )
}
