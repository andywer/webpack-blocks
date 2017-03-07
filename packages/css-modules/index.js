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
  options = options || {}

  const localIdentDefault = String(process.env.NODE_ENV) === 'production'
    ? '[hash:base64:10]'
    : '[name]--[local]--[hash:base64:5]'

  const importLoaders = options.importLoaders || 1
  const localIdentName = options.localIdentName || localIdentDefault

  return (context, util) => util.addLoader(
    Object.assign({
      test: context.fileType('text/css'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { importLoaders, localIdentName, modules: true }
        }
      ]
    }, options.exclude ? {
      exclude: Array.isArray(options.exclude) ? options.exclude : [ options.exclude ]
    } : {})
  )
}
