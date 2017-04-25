const _ = require('lodash')

module.exports = css
module.exports.modules = cssModules

/**
 * @param {string} [fileType]
 * @param {object} [options] You can pass all css-loader options.
 * @param {*}      [options.include]
 * @param {*}      [options.exclude]
 * @return {Function}
 * @see https://github.com/webpack-contrib/css-loader
 */
function css (fileType = 'text/css', options) {
  if (fileType && typeof fileType === 'object' && !options) {
    options = fileType
    fileType = 'text/css'
  }
  if (!fileType || typeof fileType !== 'string') {
    throw new Error(`Need to pass a valid file type to css().`)
  }

  options = options || {}

  return (context, util) => util.addLoader({
    test: context.fileType(fileType),
    include: options.include,
    exclude: options.exclude,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: _.omit(options, [ 'exclude', 'include' ])
      }
    ]
  })
}

/**
 * @param {string} [fileType]
 * @param {object} [options] You can pass all css-loader options.
 * @param {*}      [options.include]
 * @param {*}      [options.exclude]
 * @param {number} [options.importLoaders]    Defaults to 1.
 * @param {string} [options.localIdentName]   Defaults to '[hash:base64:10]' in production, '[name]--[local]--[hash:base64:5]' in development.
 * @return {Function}
 * @see https://github.com/webpack-contrib/css-loader
 */
function cssModules (fileType = 'text/css', options) {
  if (fileType && typeof fileType === 'object' && !options) {
    options = fileType
    fileType = 'text/css'
  }
  if (!fileType || typeof fileType !== 'string') {
    throw new Error(`Need to pass a valid file type to css.modules().`)
  }

  options = Object.assign({
    modules: true,
    importLoaders: 1,
    localIdentName: String(process.env.NODE_ENV) === 'production'
      ? '[hash:base64:10]'
      : '[name]--[local]--[hash:base64:5]'
  }, options)

  return (context, util) => util.addLoader({
    test: context.fileType(fileType),
    include: options.include,
    exclude: options.exclude,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: _.omit(options, [ 'exclude', 'include' ])
      }
    ]
  })
}
