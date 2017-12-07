const { assertConfigSetters } = require('./configSetters')
const group = require('./group')

module.exports = when

/**
 * Applies an array of webpack blocks only if `condition` is true.
 *
 * @param {boolean} condition         Condition to test
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {Function}
 */
function when (condition, configSetters) {
  assertConfigSetters(configSetters)

  if (condition) {
    return group(configSetters)
  } else {
    return () => config => config
  }
}
