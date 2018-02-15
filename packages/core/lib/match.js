const globToRegex = require('glob-to-regexp')
const { assertConfigSetters, invokeConfigSetters } = require('./configSetters')
const { invokePreHooks, invokePostHooks } = require('./hooks')

module.exports = match

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
function match (patterns, options, configSetters) {
  if (!configSetters && Array.isArray(options)) {
    configSetters = options
    options = {}
  }

  assertConfigSetters(configSetters)

  const match = {}

  const [test, negations] = splitPatterns(patterns)

  match.test = getMatches(patterns, test)
  if (negations || options.exclude) {
    match.exclude = getExcludes(patterns, negations, options.exclude)
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

const regexify = glob => globToRegex(glob, { extended: true })

// split positive matches and negative matches
function splitPatterns (patterns) {
  if (typeof patterns === 'string') {
    return [
      !patterns.startsWith('!') && patterns,
      patterns.startsWith('!') && patterns.slice(1)
    ]
  } else if (Array.isArray(patterns) && patterns.every(pattern => typeof pattern === 'string')) {
    const test = patterns.filter(pattern => !pattern.startsWith('!'))
    const negations = patterns.filter(pattern => pattern.startsWith('!')).map(pattern => pattern.slice(1))
    return [test.length > 0 && test, negations.length > 0 && negations]
  } else {
    return [patterns, false]
  }
}

function getMatches (patterns, test) {
  if (typeof patterns === 'string') {
    return regexify(test)
  } else if (Array.isArray(patterns) && patterns.every(pattern => typeof pattern === 'string')) {
    return test.map(regexify)
  } else {
    return test
  }
}

function getExcludes (patterns, negations, exclude) {
  if (typeof patterns === 'string') {
    let excludes = []
    if (negations) {
      excludes = excludes.concat(regexify(negations))
    }
    if (exclude) {
      excludes = excludes.concat(exclude)
    }
    return excludes.length === 1 ? excludes[0] : excludes
  } else if (Array.isArray(patterns) && patterns.every(pattern => typeof pattern === 'string')) {
    let excludes = []
    if (negations) {
      excludes = excludes.concat(negations.map(regexify))
    }
    if (exclude) {
      excludes = excludes.concat(exclude)
    }
    return excludes.length === 1 ? excludes[0] : excludes
  } else {
    return exclude
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
