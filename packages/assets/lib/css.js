module.exports = css
module.exports.modules = cssModules

/**
 * @param {object} [options] You can pass all css-loader options.
 * @return {Function}
 * @see https://github.com/webpack-contrib/css-loader
 */
function css (options = {}) {
  return (context, util) => util.addLoader(
    Object.assign({
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options }
      ]
    }, context.match)
  )
}

/**
 * @param {object} [options] You can pass all css-loader options.
 * @param {number} [options.importLoaders]    Defaults to 1.
 * @param {string} [options.localIdentName]   Defaults to '[hash:base64:10]' in production, '[name]--[local]--[hash:base64:5]' in development.
 * @return {Function}
 * @see https://github.com/webpack-contrib/css-loader
 */
function cssModules (options = {}) {
  options = Object.assign({
    modules: true,
    importLoaders: 1,
    localIdentName: String(process.env.NODE_ENV) === 'production'
      ? '[hash:base64:10]'
      : '[name]--[local]--[hash:base64:5]'
  }, options)

  return (context, util) => util.addLoader(
    Object.assign({
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options }
      ]
    }, context.match)
  )
}
