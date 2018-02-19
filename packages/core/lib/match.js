const _ = require('lodash')
const globToRegex = require('glob-to-regexp')
const { assertConfigSetters, invokeConfigSetters } = require('./configSetters')
const { invokePreHooks, invokePostHooks } = require('./hooks')

module.exports = match

const regexify = glob => globToRegex(glob, { extended: true })
const stripArrayConditionally = array => array.length === 1 ? array[0] : array
const toArray = thing => Array.isArray(thing) ? thing : [ thing ]

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
    throw new Error(`match(): Setting 'test' in options is not supported; use the argument instead.`)
  }

  const { inclusions, exclusions } = splitPatterns(toArray(test))
  const match = Object.assign({}, options, {
    // The `.test` is usually just one pattern, so stripping the array feels more natural
    test: stripArrayConditionally(normalizeMatchers(inclusions))
  })

  if (exclusions.length > 0) {
    match.exclude = _.concat(
      match.exclude ? toArray(match.exclude) : [],
      normalizeMatchers(exclusions)
    )
  }

  const groupBlock = context => config => invokeConfigSetters(configSetters, deriveContextWithMatch(context, match), config)

  return Object.assign(groupBlock, {
    pre: context => invokePreHooks(configSetters, deriveContextWithMatch(context, match)),
    post: context => config => invokePostHooks(configSetters, deriveContextWithMatch(context, match), config)
  })
}

function normalizeMatchers (fileMatchTests) {
  return fileMatchTests.map(test => {
    if (typeof test === 'string') {
      return regexify(test)
    }
    return test
  })
}

function splitPatterns (patterns) {
  const isNegation = pattern => typeof pattern === 'string' && pattern.startsWith('!')
  const stripLeadingExclam = pattern => pattern.startsWith('!') ? pattern.substr(1) : pattern
  return {
    inclusions: patterns.filter(pattern => !isNegation(pattern)),
    exclusions: patterns.filter(pattern => isNegation(pattern)).map(stripLeadingExclam)
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
