const { assertConfigSetters } = require('./configSetters')
const group = require('./group')

module.exports = env

/**
 * Applies an array of webpack blocks only if `process.env.NODE_ENV` matches the
 * given `envName`. If no `NODE_ENV` is set, it will be treated as 'development'.
 *
 * @param {string} envName            Environment name like 'development', 'production' or 'testing'.
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {Function}
 */
function env (envName, configSetters) {
  assertConfigSetters(configSetters)

  const currentEnv = process.env.NODE_ENV || 'development'

  if (currentEnv !== envName) {
    return () => config => config
  } else {
    return group(configSetters)
  }
}
