/**
 * Webpack base config block.
 *
 * @see https://webpack.github.io/docs/configuration.html
 */

const assert = require('assert-plus')
const core = require('@webpack-blocks/core')
const webpack = require('webpack')
const path = require('path')
const parseVersion = require('./lib/parseVersion')

const webpackVersion = parseVersion(require('webpack/package.json').version)

exports.env = core.env
exports.group = core.group
exports.webpack = webpack

exports.createConfig = createConfig
exports.createConfig.vanilla = createVanillaConfig

exports.addPlugins = addPlugins
exports.customConfig = customConfig
exports.defineConstants = require('./lib/defineConstants')
exports.entryPoint = entryPoint
exports.performance = performance
exports.resolveAliases = resolveAliases
exports.setContext = setContext
exports.setDevTool = setDevTool
exports.setOutput = setOutput
exports.sourceMaps = sourceMaps

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

/**
 * Adds one or multiple entry points. If the parameter is not an object the
 * entry point(s) will be added to the default chunk named `main`.
 *
 * @param {object|string[]|string} entry
 * @see https://webpack.github.io/docs/configuration.html#entry
 */
function entryPoint (entry) {
  return () => ({
    entry: normalizeEntry(entry)
  })
}

function normalizeEntry (entry) {
  if (Array.isArray(entry)) {
    return {
      main: entry
    }
  } else if (typeof entry === 'string') {
    return {
      main: [ entry ]
    }
  } else if (typeof entry === 'object') {
    Object.keys(entry).forEach((entryName) => {
      if (!Array.isArray(entry[entryName])) {
        entry[entryName] = [ entry[entryName] ]
      }
    })
    return entry
  } else {
    throw new Error(`Expected entry point to be object, array or string. Instead got: ${entry}`)
  }
}

/**
 * @see https://webpack.github.io/docs/configuration.html#plugins
 */
function addPlugins (plugins) {
  return plugins.length > 0
    ? () => ({ plugins })
    : () => ({})          // since webpack-merge would otherwise clear the plugins array
}

function customConfig (wpConfig) {
  return () => wpConfig
}

/**
 * @param {object} performanceBudget
 * @param {number} performanceBudget.maxAssetSize
 * @param {number} performanceBudget.maxEntrypointSize
 * @param {string} performanceBudget.hints              'warning' or 'error'
 */
function performance (performanceBudget) {
  return () => ({
    performance: performanceBudget
  })
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
    context: path.resolve(contextPath)
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
    output = {
      filename: path.basename(output) || 'bundle.js',
      path: path.resolve(path.dirname(output) || './build')
    }
  }

  return () => ({ output })
}

/**
 * Just a convenience wrapper to enable sourcemaps in an easier-to-read fashion
 * than `setDevTool()`.
 * @TODO: Only sets the javascript sourcemaps now. Would be nice to make loaders
 *        enable their specific sourcemaps when `sourceMaps()` is used.
 *
 * @param {string} [devtool]
 * @return {Function}
 */
function sourceMaps (devtool) {
  return (context) => {
    context.sourceMaps = true
    return { devtool: devtool || 'cheap-module-source-map' }
  }
}
