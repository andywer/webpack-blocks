const { assertConfigSetters, invokeConfigSetters } = require('./configSetters')
const { getHooks } = require('./hooks')

module.exports = group

/**
 * Combines an array of blocks to a new joined block. Running this single block
 * has the same effect as running all source blocks.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {Function}
 */
function group (configSetters) {
  assertConfigSetters(configSetters)

  const pre = getHooks(configSetters, 'pre')
  const post = getHooks(configSetters, 'post')

  const groupBlock = context => config => invokeConfigSetters(configSetters, context, config)

  return Object.assign(groupBlock, { pre, post })
}
