/**
 * Webpack base config block.
 *
 * @see https://webpack.github.io/docs/configuration.html
 */

const core = require('@webpack-blocks/core')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const path = require('path')
const parseVersion = require('./lib/parseVersion')

const webpackVersion = parseVersion(require('webpack/package.json').version)

exports.env = core.env
exports.group = core.group
exports.match = core.match
exports.when = core.when

exports.createConfig = createConfig

exports.addPlugins = addPlugins
exports.customConfig = customConfig
exports.defineConstants = require('./lib/defineConstants')
exports.setEnv = require('./lib/setEnv')
exports.entryPoint = entryPoint
exports.performance = performance
exports.resolve = resolve
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
 * Wraps @webpack-blocks/core's `createConfig`.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createConfig (configSetters) {
  return core.createConfig({ webpack, webpackVersion }, [ createEmptyConfig ].concat(configSetters))
}

function createEmptyConfig (context, util) {
  return util.merge({
    module: {
      rules: []
    },
    plugins: []
  })
}

/**
 * Adds one or multiple entry points. If the parameter is not an object the
 * entry point(s) will be added to the default chunk named `main`.
 *
 * @param {object|string[]|string} entry
 * @see https://webpack.github.io/docs/configuration.html#entry
 */
function entryPoint (entry) {
  return (context, util) => util.merge({
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
  return (context, util) => util.merge({ plugins })
}

function customConfig (wpConfig) {
  return (context, util) => util.merge(wpConfig)
}

/**
 * @param {object} performanceBudget
 * @param {number} performanceBudget.maxAssetSize
 * @param {number} performanceBudget.maxEntrypointSize
 * @param {string} performanceBudget.hints              'warning' or 'error'
 */
function performance (performanceBudget) {
  return (context, util) => util.merge({
    performance: performanceBudget
  })
}

/**
 * @see https://webpack.js.org/configuration/resolve/
 */
function resolve (config) {
  const strategy = { 'resolve.extensions': 'prepend' }
  const merge = webpackMerge.smartStrategy(strategy)

  return () => prevConfig => merge(prevConfig, {
    resolve: config
  })
}

/**
 * @deprecated
 * @see https://webpack.github.io/docs/configuration.html#resolve-alias
 */
function resolveAliases (aliases) {
  console.warn(`[webpack-blocks] resolveAliases is deprecated. Please, use resolve({ alias: '' }) instead.`)
  return (context, util) => util.merge({
    resolve: {
      alias: aliases
    }
  })
}

/**
 * @see https://webpack.github.io/docs/configuration.html#context
 */
function setContext (contextPath) {
  return (context, util) => util.merge({
    context: path.resolve(contextPath)
  })
}

/**
 * @see https://webpack.github.io/docs/configuration.html#devtool
 */
function setDevTool (devtool) {
  return (context, util) => util.merge({ devtool })
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

  return (context, util) => util.merge({ output })
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
function sourceMaps (devtool = 'cheap-module-source-map') {
  return (context, util) => {
    context.sourceMaps = true

    return util.merge({ devtool })
  }
}
