/**
 * PostCSS webpack block.
 *
 * @see https://github.com/postcss/postcss-loader
 * @example
 * const { createConfig } = require('webpack-blocks')
 * const autoprefixer = require('autoprefixer')
 * const postcss = require('webpack-blocks/lib/postcss')
 *
 * module.exports = createConfig([
 *   postcss([
 *     autoprefixer({ browsers: ['last 2 versions'] })
 *   ])
 * ])
 */

module.exports = postcss

/**
 * @param {PostCSSPlugin[]} plugins
 * @param {object}          [options]
 * @param {RegExp, Function, string}  [options.exclude]         Directories to exclude.
 * @return {Function}
 */
function postcss (plugins, options) {
  const { exclude = /\/node_modules\// } = options || {}

  return (fileTypes) => ({
    module: {
      loaders: [
        {
          test: fileTypes('text/css'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'postcss' ]
        }
      ]
    },
    postcss: plugins
  })
}
