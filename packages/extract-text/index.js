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

  return (context, helpers) => prevConfig => {
    const loaderConfig = getLoaderConfigByType(context, prevConfig, fileType)
    const nonStyleLoaders = getNonStyleLoaders(loaderConfig, fileType)

    // Partial application of `addLoader`, `addPlugin` & `removeLoaders`
    // Bind them to their job, but don't apply them on a config yet

    const _addLoader = helpers.addLoader({
      test: context.fileType(fileType),
      exclude: loaderConfig.exclude,
      loader: plugin.extract({
        fallbackLoader: 'style-loader',
        loader: nonStyleLoaders
      })
    })
    const _addPlugin = helpers.addPlugin(plugin)
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
function getLoaderConfigByType (context, webpackConfig, fileType) {
  const loaderConfig = webpackConfig.module.loaders.find(
    // using string-based comparison here, since webpack-merge tends to deep-cloning things
    (loader) => String(loader.test) === String(context.fileType(fileType))
  )

  if (loaderConfig) {
    return loaderConfig
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
function getNonStyleLoaders (loaderConfig, fileType) {
  if (!loaderConfig.loaders || loaderConfig.loaders.length === 0) {
    throw new Error(`No ${fileType} file loaders found.`)
  }
  if (!/^style(-loader)?$/.test(loaderConfig.loaders[0])) {
    throw new Error(`Expected "style-loader" to be first loader of .css files. Instead got: ${loaderConfig.loaders[0]}`)
  }

  // `loaderConfig.loaders` without the leading 'style-loader'
  const nonStyleLoaders = [].concat(loaderConfig.loaders)
  nonStyleLoaders.shift()

  return nonStyleLoaders
}

/**
 * @param {RegExp} loaderTest   Remove all loaders that match this `.test` regex.
 * @return {Function}
 */
function removeLoaders (loaderTest) {
  return prevConfig => {
    const newLoaders = prevConfig.module.loaders.filter(loaderDef => loaderDef.test !== loaderTest)

    return Object.assign({}, prevConfig, {
      module: Object.assign({}, prevConfig.module, {
        loaders: newLoaders
      })
    })
  }
}
