/**
 * Vendor bundle webpack block.
 */

const webpack = require('webpack')

module.exports = vendorBundle

/**
 * @param {object} [options]
 * @param {object} [options.name=main] Name of the main bundle of your app.
 * @param {object} [options.filename=vendor.\[chunkhash\].js] Output bundle file name.
 * @param {object} [options.minChunks=5] Minimal number of chunks to include dependency into the bundle.
 * @return {Function}
 */
function vendorBundle (options = {}) {
  options = Object.assign({
    name: 'main',
    filename: 'vendor.[chunkhash].js',
    minChunks: 5
  }, options)

  return (context, util) => {
    const plugin = new webpack.optimize.CommonsChunkPlugin({
      name: options.main,
      filename: options.filename,
      children: true,
      minChunks (module, count) {
        return module.context && module.context.includes('node_modules') &&
                module.request.endsWith('.js') &&
                count >= options.minChunks
      }
    })
    return util.addPlugin(plugin)
  }
}
