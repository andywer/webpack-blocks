const globToRegex = require('glob-to-regexp')
const { assertConfigSetters, invokeConfigSetters } = require('./configSetters')
const { invokePreHooks, invokePostHooks } = require('./hooks')

module.exports = match

/**
 * State on which files to apply the loader blocks passed in this call. Works
 * like `group()`, but adds the file matching information to the context.
 *
 * @param {string|RegExp|Function|Array} test   A glob like `*.css` or `{*.js, *.jsx}` or something else to use as `loader.test`.
 * @param {object} [options]                    Rule options. See https://webpack.js.org/configuration/module/
 * @param {Function[]} configSetters            Array of functions as returned by webpack blocks.
 * @return {Function}
 */
function match (test, options, configSetters) {
  if (!configSetters && Array.isArray(options)) {
    configSetters = options
    options = {}
  }

  assertConfigSetters(configSetters)

  if (options.test) {
    console.warn(`match(): Setting 'test' in options is not supported and will be overriden with a 'test' argument.`)
  }

  options.test = createFileTypeMatcher(test)

  const groupBlock = context => config => invokeConfigSetters(configSetters, deriveContextWithMatch(context, options), config)

  return Object.assign(groupBlock, {
    pre: context => invokePreHooks(configSetters, deriveContextWithMatch(context, options)),
    post: context => config => invokePostHooks(configSetters, deriveContextWithMatch(context, options), config)
  })
}

const regexify = glob => globToRegex(glob, { extended: true })

function createFileTypeMatcher (test) {
  if (typeof test === 'string') {
    return regexify(test)
  }
  if (Array.isArray(test) && test.every(item => typeof item === 'string')) {
    return test.map(item => regexify(item))
  }
  return test
}

function deriveContextWithMatch (context, options) {
  // Use an ES Proxy, so the returned context will include `match` and mutations
  // to it will also be applied to the original context. This is important,
  // since we have now got a global context object and local ones.
  return new Proxy(context, {
    has (target, propName) {
      return propName === 'match' ? true : (propName in target)
    },
    get (target, propName) {
      return propName === 'match' ? options : target[propName]
    }
  })
}
