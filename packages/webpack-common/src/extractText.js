/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

export {
  getLoaderConfigByType,
  getNonStyleLoaders
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
