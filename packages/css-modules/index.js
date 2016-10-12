/**
 * CSS Modules webpack block.
 *
 * @see https://github.com/webpack/css-loader
 */

module.exports = cssModules

/**
 * @param {object} [options]
 * @param {RegExp, Function, string}  [options.exclude]         Directories to exclude.
 * @param {number}                    [options.importLoaders]
 * @param {string}                    [options.localIdentName]
 * @return {Function}
 */
function cssModules (options) {
  const localIdentDefault = String(process.env.NODE_ENV) === 'production'
    ? '[hash:base64:10]'
    : '[name]--[local]--[hash:base64:5]'

  const { exclude = /\/node_modules\//, importLoaders = 1, localIdentName = localIdentDefault } = options || {}

  return (fileTypes) => ({
    module: {
      loaders: [
        {
          test: fileTypes('text/css'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'style', 'css?' + stringifyQueryParams({ importLoaders, localIdentName, modules: true }) ]
        }
      ]
    }
  })
}

/**
 * Cannot use `require('querystring').stringify()`, since css-loader params might
 * contain special characters as `[`, `]` that would be escaped.
 */
function stringifyQueryParams (params) {
  return Object.keys(params)
    .filter((paramName) => (params[ paramName ] !== null && params[ paramName ] !== undefined))
    .map((paramName) => (params[ paramName ] === true ? `${paramName}` : `${paramName}=${params[ paramName ]}`))
    .join('&')
}
