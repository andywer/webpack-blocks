const _ = require('lodash')
const blockUtils = require('./blockUtils')

module.exports = {
  assertConfigSetters,
  invokeConfigSetters
}

/**
 * Asserts that given param is an array of functions.
 *
 * @param {Function[]} configSetters Array of functions as returned by webpack blocks.
 */
function assertConfigSetters(configSetters) {
  if (!Array.isArray(configSetters)) {
    throw new Error(
      `Expected parameter 'configSetters' to be an array of functions. Instead got ${configSetters}.`
    )
  }
  if (!configSetters.every(_.isFunction)) {
    const invalidElementIndex = configSetters.findIndex(setter => !_.isFunction(setter))
    throw new Error(
      `Expected parameter 'configSetters' to be an array of functions. ` +
        `Element at index ${invalidElementIndex} is invalid: ${configSetters[invalidElementIndex]}.`
    )
  }
}

function invokeConfigSetters(configSetters, context, baseConfig) {
  return configSetters.reduce((config, setter) => {
    const updateFunction = setter(context, blockUtils)
    return updateFunction(config)
  }, baseConfig)
}
