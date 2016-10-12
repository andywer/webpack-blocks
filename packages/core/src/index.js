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

  return invokeConfigSetters(fileTypes, configSetters)
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
    ? (fileTypes) => invokeConfigSetters(fileTypes, configSetters)
    : () => ({})
}

function invokeConfigSetters (fileTypes, configSetters) {
  return configSetters.reduce(
    (config, setter) => merge.smart(config, setter(fileTypes, config)),
    {}
  )
}
