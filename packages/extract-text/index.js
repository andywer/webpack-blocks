/**
 * Extract-text webpack block.
 *
 * @see https://github.com/webpack/extract-text-webpack-plugin
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = extractText

/**
 * @param {string}    outputFilePattern
 * @return {Function}
 */
function extractText (outputFilePattern) {
  outputFilePattern = outputFilePattern || 'css/[name].[contenthash:8].css'

  return (context, webpackConfig) => {
    const cssLoader = webpackConfig.module.loaders.find((loader) => loader.test === context.fileTypes('text/css'))

    if (!cssLoader) {
      throw new Error(`CSS loader could not be found in webpack config.`)
    }

    return {
      module: {
        loaders: [
          {
            test: context.fileTypes('text/css'),
            exclude: cssLoader.exclude,
            loader: ExtractTextPlugin.extract.apply(null, cssLoader.loaders),
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
