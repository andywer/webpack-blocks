const createFileTypesMapping = require('./createFileTypesMapping')
const defaultFileTypes = require('./defaultFileTypes')
const { assertConfigSetters, invokeConfigSetters } = require('./configSetters')
const { invokePreHooks, invokePostHooks } = require('./hooks')

module.exports = createConfig

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
  assertConfigSetters(configSetters)

  /** @deprecated context.fileType */
  const fileType = createFileTypesMapping(defaultFileTypes)
  const context = Object.assign({ fileType }, initialContext)

  const baseConfig = {
    resolve: {
      // Explicitly define default extensions, otherwise blocks will overwrite them instead of extending
      extensions: ['.js', '.json']
    },
    // Less noisy than default settings
    stats: {
      children: false,
      chunks: false,
      modules: false,
      reasons: false
    },
    module: {
      rules: []
    },
    plugins: []
  }

  invokePreHooks(configSetters, context)
  const config = invokeConfigSetters(configSetters, context, baseConfig)
  const postProcessedConfig = invokePostHooks(configSetters, context, config)

  return postProcessedConfig
}
