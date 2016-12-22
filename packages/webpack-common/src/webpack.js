/*
 * Functions for use in @webpack-blocks/webpack and @webpack-blocks/webpack2.
 */

import path from 'path'

export {
  addPlugins,
  customConfig,
  entryPoint,
  performance,
  resolveAliases,
  setContext,
  setDevTool,
  setOutput,
  sourceMaps
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
function sourceMaps (devtool = 'cheap-module-source-map') {
  return (context) => {
    context.sourceMaps = true
    return { devtool }
  }
}
