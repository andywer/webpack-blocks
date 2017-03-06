/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = extractText

/**
 * @param {string}    outputFilePattern
 * @param {string}  [fileType]          A MIME type used for file matching. Defaults to `text/css`.
 * @return {Function}
 */
function extractText (outputFilePattern, fileType) {
  outputFilePattern = outputFilePattern || 'css/[name].[contenthash:8].css'
  fileType = fileType || 'text/css'

  const plugin = new ExtractTextPlugin(outputFilePattern)

  return (context, util) => prevConfig => {
    const ruleConfig = getRuleConfigByType(context, prevConfig, fileType)
    const nonStyleLoaders = getNonStyleLoaders(ruleConfig, fileType)

    // Partial application of `addLoader`, `addPlugin` & `removeLoaders`
    // Bind them to their job, but don't apply them on a config yet

    const _addLoader = util.addLoader({
      test: context.fileType(fileType),
      exclude: ruleConfig.exclude,
      use: plugin.extract({
        fallback: 'style-loader',
        use: nonStyleLoaders
      })
    })
    const _addPlugin = util.addPlugin(plugin)
    const _removeLoaders = removeLoaders(context.fileType(fileType))

    // Now apply them to the config: Remove the existing loaders for that
    // file type, add the new loader and add the plugin

    return _addPlugin(_addLoader(_removeLoaders(prevConfig)))
  }
}

/**
 * @param {object}  context
 * @param {object}  webpackConfig
 * @param {string}  fileType
 * @return {object}
 * @throws {Error}
 */
function getRuleConfigByType (context, webpackConfig, fileType) {
  // TODO: Consider that there might be more than one loader matching the file type!

  const ruleConfig = webpackConfig.module.rules.find(
    // using string-based comparison here, since webpack-merge tends to deep-cloning things
    (loader) => String(loader.test) === String(context.fileType(fileType))
  )

  if (ruleConfig) {
    return ruleConfig
  } else {
    throw new Error(`${fileType} loader could not be found in webpack config.`)
  }
}

/**
 * Finds the loader config for the given `fileType` and returns all loaders
 * except the `style-loader` which is expected to be the first loader.
 *
 * @param {object}  context
 * @param {object}  webpackConfig
 * @param {string}  fileType
 * @return {string[]}
 * @throws {Error}
 */
function getNonStyleLoaders (ruleConfig, fileType) {
  if (!ruleConfig.use || ruleConfig.use.length === 0) {
    throw new Error(`No ${fileType} file loaders found.`)
  }
  const loader = typeof ruleConfig.use[0] === 'string'
        ? ruleConfig.use[0]
        : ruleConfig.use[0].loader
  if (loader !== 'style-loader') {
    throw new Error(`Expected "style-loader" to be first loader of .css files. Instead got: ${ruleConfig.use[0].loader}`)
  }

  // `ruleConfig.use` without the leading 'style-loader'
  const nonStyleLoaders = [].concat(ruleConfig.use)
  nonStyleLoaders.shift()

  return nonStyleLoaders
}

/**
 * @param {RegExp} ruleTest   Remove all loaders that match this `.test` regex.
 * @return {Function}
 */
function removeLoaders (ruleTest) {
  return prevConfig => {
    const newRules = prevConfig.module.rules.filter(
      ruleDef => String(ruleDef.test) !== String(ruleTest)
    )

    return Object.assign({}, prevConfig, {
      module: Object.assign({}, prevConfig.module, {
        rules: newRules
      })
    })
  }
}
