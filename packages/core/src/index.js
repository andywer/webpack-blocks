const merge = require('webpack-merge')
const createFileTypesMapping = require('./createFileTypesMapping')
const defaultFileTypes = require('./defaultFileTypes')

exports.createConfig = createConfig
exports.env = env
exports.addPreHook = addPreHook
exports.addPostHook = addPostHook

const isFunction = (value) => typeof value === 'function'

const preHooks = []
const postHooks = []

/**
 * Allow you to do some pre-processing before the configuration
 * is being built with blocks.
 *
 * @param {Function[]} callback  Function called before the blocks are set
 */
function addPreHook (callback) {
  if (!isFunction(callback)) {
    throw new Error(`Expected parameter 'callback' to be a function.`)
  }

  preHooks.push(callback)
}

/**
 * Allow you to do some post-processing after the configuration
 * has been built with blocks.
 *
 * @param {Function[]} callback  Function called after the blocks are set
 */
function addPostHook (callback) {
  if (!isFunction(callback)) {
    throw new Error(`Expected parameter 'callback' to be a function.`)
  }

  postHooks.push(callback)
}

/**
 * Takes an array of webpack blocks and creates a webpack config out of them.
 * Each webpack block is a callback function which will be invoked to return a
 * partial webpack config. These partial configs are merged to create the
 * final, complete webpack config that will be returned.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createConfig (configSetters) {
  if (!Array.isArray(configSetters) || !configSetters.every(isFunction)) {
    throw new Error(`Expected parameter 'configSetters' to be an array of functions.`)
  }

  const fileTypes = createFileTypesMapping(defaultFileTypes)
  const context = { fileTypes }

  let config = invokeConfigSetters(preHooks, context)
  config = invokeConfigSetters(configSetters, context, {}, config)
  config = invokeConfigSetters(postHooks, context, {}, config)

  return config
}

/**
 * Applies an array of webpack blocks only if `process.env.NODE_ENV` matches the
 * given `envName`. If no `NODE_ENV` is set, it will be treated as 'development'.
 *
 * @param {string} envName            Environment name like 'development', 'production' or 'testing'.
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {Function}
 */
function env (envName, configSetters) {
  const currentEnv = process.env.NODE_ENV || 'development'

  return currentEnv === envName
    ? (context, config) => invokeConfigSetters(configSetters, context, config)
    : () => ({})
}

function invokeConfigSetters (configSetters, context, baseConfig = {}, initialConfig = {}) {
  const getCompleteConfig = Object.keys(baseConfig).length > 0
    ? (mergedConfig) => merge.smart(baseConfig, mergedConfig)
    : (mergedConfig) => mergedConfig

  return configSetters.reduce(
    (mergedConfig, setter) => {
      const configPartial = setter(context, getCompleteConfig(mergedConfig))
      return merge.smart(mergedConfig, configPartial)
    },
    initialConfig
  )
}
