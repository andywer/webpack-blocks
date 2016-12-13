const merge = require('webpack-merge')
const createFileTypesMapping = require('./createFileTypesMapping')
const defaultFileTypes = require('./defaultFileTypes')

exports.createConfig = createConfig
exports.env = env

const isFunction = (value) => typeof value === 'function'

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

  const preSetters = getHooks(configSetters, 'pre')
  const postSetters = getHooks(configSetters, 'post')

  let config = invokeConfigSetters(preSetters, context)
  config = invokeConfigSetters(configSetters, context, {}, config)
  config = invokeConfigSetters(postSetters, context, {}, config)

  return config
}

function getHooks (configSetters, type) {
  // Get all the hooks with the block
  let hooks = configSetters
    .filter(setter => setter[type])
    .map(setter => setter[type])

  // Get the hooks within the sub-blocks
  configSetters
    .filter(setter => setter.subSetters)
    .forEach(setter => {
      hooks = hooks.concat(getHooks(setter.subSetters, type))
    })

  // Keep each hooks only once
  return hooks.filter((hook, index) =>
    hooks.findIndex(findingHook => hook.toString() == findingHook.toString()) === index
  )
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

  if (currentEnv !== envName) {
    return () => ({})
  }

  const envBlock = (context, config) => invokeConfigSetters(configSetters, context, config)
  envBlock.subSetters = configSetters

  return envBlock
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
