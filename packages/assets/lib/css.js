const _ = require('lodash')

module.exports = css
module.exports.modules = cssModules

/**
 * @param {object} [options]    You can pass all css-loader options.
 * @param {object} [options.styleLoader]    style-loader options. If set to 'false' the 'style-loader' won't be added.
 * @return {Function}
 * @see https://github.com/webpack-contrib/css-loader
 */
function css(options = {}) {
  const cssOptions = _.omit(options, ['styleLoader'])
  const loaders = [{ loader: 'css-loader', options: cssOptions }]

  if (options.styleLoader !== false) {
    loaders.unshift({ loader: 'style-loader', options: options.styleLoader || {} })
  }

  return (context, util) =>
    util.addLoader(
      Object.assign(
        {
          test: /\.css$/,
          use: loaders
        },
        context.match
      )
    )
}

/**
 * @param {object} [options] You can pass all css-loader options.
 * @param {number} [options.importLoaders]    Defaults to 1.
 * @param {string} [options.localIdentName]   Defaults to '[hash:base64:10]' in production, '[name]--[local]--[hash:base64:5]' in development.
 * @param {object} [options.styleLoader]      style-loader options. If set to 'false' the 'style-loader' won't be added.
 * @return {Function}
 * @see https://github.com/webpack-contrib/css-loader
 */
function cssModules(options = {}) {
  const defaultCssOptions = {
    modules: true,
    importLoaders: 1,
    localIdentName:
      String(process.env.NODE_ENV) === 'production'
        ? '[hash:base64:10]'
        : '[name]--[local]--[hash:base64:5]'
  }
  const cssOptions = Object.assign(
    defaultCssOptions,
    _.omit(options, ['exclude', 'include', 'styleLoader'])
  )
  const loaders = [{ loader: 'css-loader', options: cssOptions }]

  if (options.styleLoader !== false) {
    loaders.unshift({ loader: 'style-loader', options: options.styleLoader || {} })
  }

  return (context, util) =>
    util.addLoader(
      Object.assign(
        {
          test: /\.css$/,
          use: loaders
        },
        context.match
      )
    )
}
