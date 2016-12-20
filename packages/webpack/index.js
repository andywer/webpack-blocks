/**
 * Webpack base config block.
 *
 * @see https://webpack.github.io/docs/configuration.html
 */

const path = require('path')
const core = require('@webpack-blocks/core')
const webpack = require('webpack')

exports.env = core.env
exports.group = core.group
exports.webpack = webpack

exports.addPlugins = addPlugins
exports.createConfig = createConfig
exports.customConfig = customConfig
exports.entryPoint = entryPoint
exports.resolveAliases = resolveAliases
exports.setContext = setContext
exports.setDevTool = setDevTool
exports.setOutput = setOutput
exports.sourceMaps = sourceMaps
exports.setDllPlugin = setDllPlugin

/**
 * Wraps @webpack-blocks/core's `createConfig` to provide some sane default
 * configuration first.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createConfig (configSetters) {
  return core.createConfig([ createBaseConfig ].concat(configSetters))
}

function createBaseConfig (context) {
  return {
    module: {
      loaders: [
        {
          test: context.fileTypes('text/css'),
          exclude: [ /\/node_modules\// ],
          loaders: [ 'style-loader', 'css-loader' ]
        }, {
          test: context.fileTypes('image'),
          loaders: [ 'file-loader' ]
        }, {
          test: context.fileTypes('application/font'),
          loaders: [ 'file-loader' ]
        }, {
          test: context.fileTypes('application/json'),
          loaders: [ 'json-loader' ]
        }, {
          test: context.fileTypes('audio'),
          loaders: [ 'url-loader' ]
        }, {
          test: context.fileTypes('video'),
          loaders: [ 'url-loader' ]
        }
      ]
    },

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
  return setDevTool(devtool || 'cheap-module-source-map')
}

/**
 * @see http://webpack.github.io/docs/list-of-plugins.html#dllplugin
 */
function setDllPlugin (options) {
  return addPlugins([
    new webpack.DllPlugin(options)
  ])
}
