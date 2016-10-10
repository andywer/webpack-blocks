/**
 * Webpack base config block.
 *
 * @see https://webpack.github.io/docs/configuration.html
 * @example
 * const HtmlWebpackPlugin = require('html-webpack-plugin')
 * const { createConfig } = require('webpack-blocks')
 * const { addPlugins, entryPoint, setOutput, sourceMaps } = require('webpack-blocks/lib/webpack')
 *
 * module.exports = createConfig([
 *   entryPoint('./src/main.js'),
 *   setOutput('./build/bundle.js'),
 *   sourceMaps(),
 *   addPlugins([
 *     new HtmlWebpackPlugin({
 *       inject: true,
 *       template: './index.html'
 *     })
 *   ])
 * ])
 */

const path = require('path')

exports.createBaseConfig = createBaseConfig
exports.addPlugins = addPlugins
exports.customConfig = customConfig
exports.entryPoint = entryPoint
exports.resolveAliases = resolveAliases
exports.setContext = setContext
exports.setDevTool = setDevTool
exports.setOutput = setOutput
exports.sourceMaps = sourceMaps

function createBaseConfig (fileTypes) {
  return {
    module: {
      loaders: [
        {
          test: fileTypes('text/css'),
          exclude: [ /\/node_modules\// ],
          loaders: [ 'style', 'css' ]
        }, {
          test: fileTypes('image'),
          loaders: [ 'file' ]
        }, {
          test: fileTypes('application/font'),
          loaders: [ 'file' ]
        }, {
          test: fileTypes('application/json'),
          loaders: [ 'json' ]
        }, {
          test: fileTypes('audio'),
          loaders: [ 'url' ]
        }, {
          test: fileTypes('video'),
          loaders: [ 'url' ]
        }
      ]
    },

    resolve: {
      extensions: [ '.js', '.jsx', '.json', '' ]
    }
  }
}

/**
 * @see https://webpack.github.io/docs/configuration.html#entry
 */
function entryPoint (entry) {
  return () => ({
    entry: typeof entry === 'string' ? [ entry ] : entry
  })
}

/**
 * @see https://webpack.github.io/docs/configuration.html#plugins
 */
function addPlugins (plugins) {
  return () => ({ plugins })
}

function customConfig (wpConfig) {
  return () => wpConfig
}

/**
 * @see https://webpack.github.io/docs/configuration.html#resolve-alias
 */
function resolveAliases (aliases) {
  return () => ({
    resolve: {
      alias: aliases
    }
  })
}

/**
 * @see https://webpack.github.io/docs/configuration.html#context
 */
function setContext (contextPath) {
  return () => ({
    context: contextPath
  })
}

/**
 * @see https://webpack.github.io/docs/configuration.html#devtool
 */
function setDevTool (devtool) {
  return () => ({ devtool })
}

/**
 * @see https://webpack.github.io/docs/configuration.html#output
 */
function setOutput (output) {
  if (typeof output === 'string') {
    return setOutput({
      filename: path.basename(output) || 'bundle.js',
      path: path.dirname(output) || './build'
    })
  }

  return () => ({ output })
}

/**
 * Just a convenience wrapper to enable sourcemaps in an easier-to-read fashion
 * than `setDevTool()`.
 *
 * @param {string} [devtool]
 * @return {Function}
 */
function sourceMaps (devtool) {
  return setDevTool(devtool || 'cheap-module-source-map')
}
