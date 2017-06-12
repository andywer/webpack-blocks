/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = extractText

/**
 * @param {string}    outputFilePattern
 * @param {string}    [fileType]          Deprecated
 * @return {Function}
 */
function extractText (outputFilePattern = 'css/[name].[contenthash:8].css', fileType = null) {
  const plugin = new ExtractTextPlugin(outputFilePattern)

  if (fileType) {
    console.warn(`extractText(): You are using the deprecated 'fileType' parameter. Use match() instead.`)
  }

  const postHook = (context, util) => prevConfig => {
    let nextConfig = prevConfig

    // Only apply to loaders in the same `match()` group or css loaders if there is no `match()`
    const ruleToMatch = context.match || { test: fileType ? context.fileType(fileType) : /\.css$/ }
    const matchingLoaderRules = getMatchingLoaderRules(ruleToMatch, prevConfig)

    if (matchingLoaderRules.length === 0) {
      throw new Error(`extractText(): No loaders found to extract contents from. Looking for loaders matching ${ruleToMatch.test}`)
    }

    const [ fallbackLoaders, nonFallbackLoaders ] = splitFallbackRule(matchingLoaderRules)

    const newLoaderDef = Object.assign({}, ruleToMatch, {
      use: plugin.extract({
        fallback: fallbackLoaders,
        use: nonFallbackLoaders
      })
    })

    for (const ruleToRemove of matchingLoaderRules) {
      nextConfig = removeLoaderRule(ruleToRemove)(nextConfig)
    }

    nextConfig = util.addPlugin(plugin)(nextConfig)
    nextConfig = util.addLoader(newLoaderDef)(nextConfig)

    return nextConfig
  }

  return Object.assign(
    () => prevConfig => prevConfig,
    { post: postHook }
  )
}

function getMatchingLoaderRules (ruleToMatch, webpackConfig) {
  return webpackConfig.module.rules.filter(
    rule => (
      isLoaderConditionMatching(rule.test, ruleToMatch.test) &&
      isLoaderConditionMatching(rule.exclude, ruleToMatch.exclude) &&
      isLoaderConditionMatching(rule.include, ruleToMatch.include)
    )
  )
}

function splitFallbackRule (rules) {
  const leadingStyleLoaderInAllRules = rules.every(rule => {
    return rule.use.length > 0 && rule.use[0] && (rule.use[0] === 'style-loader' || rule.use[0].loader === 'style-loader')
  })

  if (leadingStyleLoaderInAllRules) {
    const trimmedRules = rules.map(rule => Object.assign({}, rule, { use: rule.use.slice(1) }))
    return [ ['style-loader'], getUseEntriesFromRules(trimmedRules) ]
  } else {
    return [ [], getUseEntriesFromRules(rules) ]
  }
}

function getUseEntriesFromRules (rules) {
  const normalizeUseEntry = use => typeof use === 'string' ? { loader: use } : use

  return rules.reduce(
    (useEntries, rule) => useEntries.concat(rule.use.map(normalizeUseEntry)),
    []
  )
}

/**
 * @param {object} rule   Remove all loaders that match this loader rule.
 * @return {Function}
 */
function removeLoaderRule (rule) {
  return prevConfig => {
    const newRules = prevConfig.module.rules.filter(
      prevRule => !(
        isLoaderConditionMatching(prevRule.test, rule.test) &&
        isLoaderConditionMatching(prevRule.include, rule.include) &&
        isLoaderConditionMatching(prevRule.exclude, rule.exclude)
      )
    )

    return Object.assign({}, prevConfig, {
      module: Object.assign({}, prevConfig.module, {
        rules: newRules
      })
    })
  }
}

function isLoaderConditionMatching (test1, test2) {
  if (test1 === test2) {
    return true
  } else if (typeof test1 !== typeof test2) {
    return false
  } else if (test1 instanceof RegExp && test2 instanceof RegExp) {
    return test1 === test2 || String(test1) === String(test2)
  } else if (Array.isArray(test1) && Array.isArray(test2)) {
    return areArraysMatching(test1, test2)
  }
  return false
}

function areArraysMatching (array1, array2) {
  if (array1.length !== array2.length) {
    return false
  }

  return array1.every(
    item1 => (
      array2.indexOf(item1) >= 0 ||
      (item1 instanceof RegExp && array2.find(item2 => item2 instanceof RegExp && String(item1) === String(item2)))
    )
  )
}
