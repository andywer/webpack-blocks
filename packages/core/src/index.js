const merge = require('webpack-merge')
const createFileTypesMapping = require('./createFileTypesMapping')
const defaultFileTypes = require('./defaultFileTypes')

exports.createConfig = createConfig
exports.group = group
exports.env = env

const isFunction = (value) => typeof value === 'function'

/**
 * Takes an array of webpack blocks and creates a webpack config out of them.
 * Each webpack block is a callback function which will be invoked to return a
 * partial webpack config. These partial configs are merged to create the
 * final, complete webpack config that will be returned.
 *
 * @param {object}     initialContext                 The blueprint for the initial context object.
 * @param {object}     initialContext.webpack         Webpack instance
 * @param {object}     initialContext.webpackVersion  Webpack version (`{ major, minor, ... }`)
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createConfig (initialContext, configSetters) {
  if (!initialContext) {
    throw new Error(`No initial context passed.`)
  }
  if (!Array.isArray(configSetters) || !configSetters.every(isFunction)) {
    throw new Error(`Expected parameter 'configSetters' to be an array of functions.`)
  }

  const fileType = createFileTypesMapping(defaultFileTypes)
  const context = Object.assign({ fileType }, initialContext)

  invokePreHooks(configSetters, context)
  const config = invokeConfigSetters(configSetters, context)
  const postProcessedConfig = invokePostHooks(configSetters, context, config)

  return postProcessedConfig
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
  } else {
    return group(configSetters)
  }
}

/**
 * Combines an array of blocks to a new joined block. Running this single block
 * has the same effect as running all source blocks.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {Function}
 */
function group (configSetters) {
  const pre = getHooks(configSetters, 'pre')
  const post = getHooks(configSetters, 'post')

  const groupBlock = (context, config) => {
    // `baseConfig` must be {}, so `invokeConfigSetters()` returns a config
    // diff, not the whole merged config
    const baseConfig = {}
    // `getCompleteConfig` will make sure the whole config is passed as 2nd param when
    // the config setters are invoked, even though the baseConfig is `{}`, not `config`
    const getCompleteConfig = (incompleteConfig) => merge.smart(config, incompleteConfig)
    return invokeConfigSetters(configSetters, context, baseConfig, getCompleteConfig)
  }

  return Object.assign(groupBlock, { pre, post })
}

function getHooks (configSetters, type) {
  // Get all the blocks' pre/post hooks
  const hooks = configSetters
    .filter(setter => Boolean(setter[type]))
    .map(setter => setter[type])

  // Flatten the array (since each item might be an array as well)
  const flattenedHooks = hooks
    .map((hook) => Array.isArray(hook) ? hook : [ hook ])
    .reduce((allHooks, someHooks) => allHooks.concat(someHooks), [])

  return filterDuplicates(flattenedHooks)
}

function invokeConfigSetters (configSetters, context, baseConfig = {}, getCompleteConfig = (config) => config) {
  return configSetters.reduce(
    (mergedConfig, setter) => {
      const configPartial = setter(context, getCompleteConfig(mergedConfig))
      return merge.smart(mergedConfig, configPartial)
    },
    baseConfig
  )
}

function invokePreHooks (configSetters, context) {
  const preHooks = getHooks(configSetters, 'pre')
  preHooks.forEach((hook) => hook(context))
}

function invokePostHooks (configSetters, context, config) {
  const postHooks = getHooks(configSetters, 'post')
  return invokeConfigSetters(postHooks, context, config)
}

function filterDuplicates (array) {
  return array.filter((item, index) => array.indexOf(item) === index)
}
