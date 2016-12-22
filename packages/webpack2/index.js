/**
 * Webpack base config block.
 *
 * @see https://webpack.github.io/docs/configuration.html
 */

const common = require('@webpack-blocks/webpack-common')
const core = require('@webpack-blocks/core')
const webpack = require('webpack')

exports.env = core.env
exports.group = core.group
exports.webpack = webpack

exports.createConfig = createConfig

exports.addPlugins = common.addPlugins
exports.customConfig = common.customConfig
exports.defineConstants = common.defineConstants
exports.entryPoint = common.entryPoint
exports.performance = common.performance
exports.resolveAliases = common.resolveAliases
exports.setContext = common.setContext
exports.setDevTool = common.setDevTool
exports.setOutput = common.setOutput
exports.sourceMaps = common.sourceMaps

/**
 * Takes an array of webpack blocks and creates a webpack config out of them.
 * Each webpack block is a callback function which will be invoked to return a
 * partial webpack config. These partial configs are merged to create the
 * final, complete webpack config that will be returned.
 *
 * Wraps @webpack-blocks/core's `createConfig` to provide some sane default
 * configuration first.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createConfig (configSetters) {
  return core.createConfig(webpack, [ createBaseConfig ].concat(configSetters))
}

function createBaseConfig (context) {
  return {
    module: {
      loaders: [
        {
          test: context.fileType('text/css'),
          exclude: [ /\/node_modules\// ],
          loaders: [ 'style-loader', 'css-loader' ]
        }, {
          test: context.fileType('image'),
          loaders: [ 'file-loader' ]
        }, {
          test: context.fileType('application/font'),
          loaders: [ 'file-loader' ]
        }, {
          test: context.fileType('application/json'),
          loaders: [ 'json-loader' ]
        }, {
          test: context.fileType('audio'),
          loaders: [ 'url-loader' ]
        }, {
          test: context.fileType('video'),
          loaders: [ 'url-loader' ]
        }
      ]
    },

    resolve: {
      extensions: [ '.js', '.jsx', '.json' ]
    }
  }
}
