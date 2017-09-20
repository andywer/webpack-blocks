const _ = require('lodash')
const { invokeConfigSetters } = require('./configSetters')

module.exports = {
  getHooks,
  invokePreHooks,
  invokePostHooks
}

function getHooks (configSetters, type) {
  // Get all the blocks' pre/post hooks
  const hooks = configSetters
    .filter(setter => Boolean(setter[type]))
    .map(setter => setter[type])

  // Flatten the array (since each item might be an array as well)
  const flattenedHooks = hooks
    .map(hook => Array.isArray(hook) ? hook : [ hook ])
    .reduce((allHooks, someHooks) => allHooks.concat(someHooks), [])

  return _.uniq(flattenedHooks)
}

function invokePreHooks (configSetters, context) {
  const preHooks = getHooks(configSetters, 'pre')
  preHooks.forEach(hook => hook(context))
}

function invokePostHooks (configSetters, context, config) {
  const postHooks = getHooks(configSetters, 'post')
  return invokeConfigSetters(postHooks, context, config)
}
