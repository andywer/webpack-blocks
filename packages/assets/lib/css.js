const _ = require('lodash')
const { synthesizeMatch } = require('./compat')

module.exports = css
module.exports.modules = cssModules

/**
 * @param {string} [fileType]   Deprecated.
 * @param {object} [options]    You can pass all css-loader options.
 * @param {object} [options.styleLoader]    style-loader options. If set to 'false' the 'style-loader' won't be added.
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

  const cssOptions = _.omit(options, ['exclude', 'include', 'styleLoader'])
  const loaders = [{ loader: 'css-loader', options: cssOptions }]

  if (options.styleLoader !== false) {
    loaders.unshift({ loader: 'style-loader', options: options.styleLoader || {} })
  }

  return (context, util) => util.addLoader(
    Object.assign(
      {
        test: /\.css$/,
        use: loaders
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
 * @param {object} [options.styleLoader]      style-loader options. If set to 'false' the 'style-loader' won't be added.
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

  const defaultCssOptions = {
    modules: true,
    importLoaders: 1,
    localIdentName: String(process.env.NODE_ENV) === 'production'
      ? '[hash:base64:10]'
      : '[name]--[local]--[hash:base64:5]'
  }
  const cssOptions = Object.assign(defaultCssOptions, _.omit(options, ['exclude', 'include', 'styleLoader']))
  const loaders = [{ loader: 'css-loader', options: cssOptions }]

  if (options.styleLoader !== false) {
    loaders.unshift({ loader: 'style-loader', options: options.styleLoader || {} })
  }

  return (context, util) => util.addLoader(
    Object.assign(
      {
        test: /\.css$/,
        use: loaders
      },
      // for API backwards compatibility only
      synthesizeMatch(context.fileType(fileType || 'text/css'), options),
      context.match
    )
  )
}
