/**
 * UglifyJS webpack block.
 *
 * @see https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 */

const webpackMerge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = uglify

/**
 * @param {object} [options] UglifyJS options
 * @return {Function}
 */
function uglify (options = {}) {
  options = webpackMerge({
    parallel: {
      cache: true
    },
    uglifyOptions: {
      ie8: false,
      ecma: 5,
      compress: {
        warnings: false
      }
    }
  }, options)

  const postHook = (context, util) => {
    const plugin = new UglifyJSPlugin(options)
    return util.addPlugin(plugin)
  }

  return Object.assign(
    () => prevConfig => prevConfig,
    { post: postHook }
  )
}