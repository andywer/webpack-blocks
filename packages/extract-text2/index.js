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

  const plugin = new ExtractTextPlugin(outputFilePattern)

  return (context, webpackConfig) => {
    const cssLoader = webpackConfig.module.loaders.find((loader) => loader.test === context.fileType('text/css'))

    if (!cssLoader) {
      throw new Error(`CSS loader could not be found in webpack config.`)
    }

    return {
      module: {
        loaders: [
          {
            test: context.fileType('text/css'),
            exclude: cssLoader.exclude,
            loader: plugin.extract({
              before: 'style',
              loader: cssLoader.loaders.filter((loaderString) => !loaderString.match(/^style(-loader)?/))
            }),
            loaders: undefined
          }
        ]
      },
      plugins: [ plugin ]
    }
  }
}
