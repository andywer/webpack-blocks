/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = extractText

/**
 * @param {string}  outputFilePattern
 * @param {string}  [fileType]          A MIME type used for file matching. Defaults to `text/css`.
 * @return {Function}
 */
function extractText (outputFilePattern, fileType) {
  outputFilePattern = outputFilePattern || 'css/[name].[contenthash:8].css'
  fileType = fileType || 'text/css'

  return (fileTypes, webpackConfig) => {
    const cssLoader = webpackConfig.module.loaders.find((loader) => loader.test === fileTypes(fileType))

    if (!cssLoader) {
      throw new Error(`${fileType} loader could not be found in webpack config.`)
    }

    if (!cssLoader.loaders || cssLoader.loaders.length === 0) {
      throw new Error(`No ${fileType} file loaders found.`)
    }
    if (!/^style(-loader)?$/.test(cssLoader.loaders[0])) {
      throw new Error(`Expected "style-loader" to be first loader of .css files. Instead got: ${cssLoader.loaders[0]}`)
    }

    // `cssLoader.loaders` without the leading 'style-loader'
    const nonStyleLoaders = [].concat(cssLoader.loaders)
    nonStyleLoaders.shift()

    return {
      module: {
        loaders: [
          {
            test: fileTypes(fileType),
            exclude: cssLoader.exclude,
            loader: ExtractTextPlugin.extract('style-loader', nonStyleLoaders),
            loaders: undefined
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin(outputFilePattern)
      ]
    }
  }
}
