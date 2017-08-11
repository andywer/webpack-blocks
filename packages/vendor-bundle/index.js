/**
 * Vendor bundle webpack block.
 */

const webpack = require('webpack')

module.exports = vendorBundle

/**
 * @param {object} filepath
 * @param {string|string[]|RegExp|RegExp[]} exclude
 */
function hasBeenExcluded (filepath, exclude) {
  if (!exclude) {
    return false
  } else if (Array.isArray(exclude)) {
    return exclude.some(item => hasBeenExcluded(filepath, item))
  } else if (exclude instanceof RegExp) {
    return exclude.test(filepath)
  }

  return filepath.includes(exclude)
}

/**
 * @param {object} [options]
 * @param {string} [options.name=main] Name of the main bundle of your app.
 * @param {string} [options.filename=vendor.\[chunkhash\].js] Output bundle file name.
 * @param {string|string[]|RegExp|RegExp[]} [exclude] Modules to exclude.
 * @param {number} [options.minChunks=1] Minimal number of chunks to include dependency into the bundle.
 * @return {Function}
 */
function vendorBundle (options = {}) {
  options = Object.assign({
    name: 'main',
    filename: 'vendor.[chunkhash].js',
    minChunks: 1
  }, options)

  return (context, util) => {
    const plugin = new webpack.optimize.CommonsChunkPlugin({
      name: options.main,
      filename: options.filename,
      children: true,
      minChunks ({ userRequest }, count) {
        return userRequest && userRequest.includes('node_modules') &&
                userRequest.endsWith('.js') &&
                count >= options.minChunks &&
                !hasBeenExcluded(userRequest, options.exclude)
      }
    })
    return util.addPlugin(plugin)
  }
}
