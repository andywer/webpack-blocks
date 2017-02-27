/**
 * Webpack base config block.
 *
 * @see https://webpack.github.io/docs/configuration.html
 */

const assert = require('assert-plus')
const common = require('@webpack-blocks/webpack-common')
const core = require('@webpack-blocks/core')
const webpack = require('webpack')

const webpackVersion = common.parseVersion(require('webpack/package.json').version)

exports.env = core.env
exports.group = core.group
exports.webpack = webpack

exports.createConfig = createConfig
exports.createConfig.vanilla = createVanillaConfig

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
 * Wraps @webpack-blocks/core's `createConfig` without `createConfig()`'s usual
 * default config.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createVanillaConfig (configSetters) {
  assert.arrayOfFunc(configSetters, '1st param passed to createConfig.vanilla() must be an array of functions.')
  return core.createConfig({ webpack, webpackVersion }, [ createEmptyConfig ].concat(configSetters))
}

function createEmptyConfig () {
  return {
    module: {
      loaders: []
    },
    plugins: []
  }
}

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
  assert.arrayOfFunc(configSetters, '1st param passed to createConfig() must be an array of functions.')
  return core.createConfig({ webpack, webpackVersion }, [ createBaseConfig ].concat(configSetters))
}

function createBaseConfig (context) {
  return {
    module: {
      loaders: [
        {
          test: context.fileType('text/css'),
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
    plugins: [],
    resolve: {
      extensions: [ '', '.js', '.jsx', '.json' ]
    }
  }
}
