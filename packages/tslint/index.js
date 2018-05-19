/**
 * Tslint webpack block.
 *
 * @see https://github.com/wbuchwalter/tslint-loader
 */

module.exports = tslint

/**
 * @param {object}   [options]                  See https://github.com/wbuchwalter/tslint-loader#usage
 * @return {Function}
 */
function tslint(options = {}) {
  return context => prevConfig => {
    let nextConfig = context.addLoader(
      Object.assign(
        {
          test: /\.(ts|tsx)$/,
          use: ['tslint-loader'],
          enforce: 'pre'
        },
        context.match
      )
    )(prevConfig)

    nextConfig = context.addPlugin(
      new context.webpack.LoaderOptionsPlugin({
        options: {
          tslint: options
        }
      })
    )(nextConfig)

    return nextConfig
  }
}
