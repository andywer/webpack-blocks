/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const common = require('@webpack-blocks/webpack-common')

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

  return (context, webpackConfig) => {
    const loaderConfig = common.getLoaderConfigByType(context, webpackConfig, fileType)
    const nonStyleLoaders = common.getNonStyleLoaders(loaderConfig, fileType)

    return {
      module: {
        loaders: [
          {
            test: context.fileType(fileType),
            exclude: loaderConfig.exclude,
            loader: plugin.extract({
              fallbackLoader: 'style-loader',
              loader: nonStyleLoaders
            }),
            loaders: undefined
          }
        ]
      },
      plugins: [ plugin ]
    }
  }
}
