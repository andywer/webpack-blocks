const globToRegex = require('glob-to-regexp')
const createFileTypesMapping = require('./createFileTypesMapping')
const defaultFileTypes = require('./defaultFileTypes')
const blockUtils = require('./blockUtils')

exports.createConfig = createConfig
exports.group = group
exports.env = env
exports.match = match

const isFunction = value => typeof value === 'function'

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

  const baseConfig = {
    resolve: {
      // Explicitly define default extensions, otherwise blocks will overwrite them instead of extending
      extensions: ['.js', '.json']
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
    return () => config => config
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

  const groupBlock = context => config => invokeConfigSetters(configSetters, context, config)

  return Object.assign(groupBlock, { pre, post })
}

/**
 * State on which files to apply the loader blocks passed in this call. Works
 * like `group()`, but adds the file matching information to the context.
 *
 * @param {string|RegExp|Function|Array} test   A glob like `*.css` or `{*.js, *.jsx}` or something else to use as `loader.test`.
 * @param {object} [options]                    Optional advanced matching options.
 * @param {string|Function|RegExp|Array|object} [options.include]
 * @param {string|Function|RegExp|Array|object} [options.exclude]
 * @param {Function[]} configSetters            Array of functions as returned by webpack blocks.
 * @return {Function}
 */
function match (test, options, configSetters) {
  if (!configSetters && Array.isArray(options)) {
    configSetters = options
    options = {}
  }

  const match = { test: createFileTypeMatcher(test) }

  if (options.exclude) {
    match.exclude = options.exclude
  }
  if (options.include) {
    match.include = options.include
  }

  const groupBlock = context => config => invokeConfigSetters(configSetters, deriveContextWithMatch(context, match), config)

  return Object.assign(groupBlock, {
    pre: context => invokePreHooks(configSetters, deriveContextWithMatch(context, match)),
    post: context => config => invokePostHooks(configSetters, deriveContextWithMatch(context, match), config)
  })
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

  return filterDuplicates(flattenedHooks)
}

function invokeConfigSetters (configSetters, context, baseConfig) {
  return configSetters.reduce(
    (config, setter) => {
      const updateFunction = setter(context, blockUtils)

      if (typeof updateFunction !== 'function') {
        throw new Error(
          `Expected a function, instead got a ${typeof updateFunction}. Beware that the block API changed since version 0.x.

          Dump of what should have been a function: ${JSON.stringify(updateFunction)}`
        )
      }

      return updateFunction(config)
    },
    baseConfig
  )
}

function invokePreHooks (configSetters, context) {
  const preHooks = getHooks(configSetters, 'pre')
  preHooks.forEach(hook => hook(context))
}

function invokePostHooks (configSetters, context, config) {
  const postHooks = getHooks(configSetters, 'post')
  return invokeConfigSetters(postHooks, context, config)
}

function createFileTypeMatcher (test) {
  const regexify = glob => globToRegex(glob, { extended: true })

  if (typeof test === 'string') {
    return regexify(test)
  } else if (Array.isArray(test) && test.every(item => typeof item === 'string')) {
    return test.map(item => regexify(item))
  } else {
    return test
  }
}

function deriveContextWithMatch (context, match) {
  // Use an ES Proxy, so the returned context will include `match` and mutations
  // to it will also be applied to the original context. This is important,
  // since we have now got a global context object and local ones.
  return new Proxy(context, {
    has (target, propName) {
      return propName === 'match' ? true : (propName in target)
    },
    get (target, propName) {
      return propName === 'match' ? match : target[propName]
    }
  })
}

function filterDuplicates (array) {
  return array.filter((item, index) => array.indexOf(item) === index)
}
