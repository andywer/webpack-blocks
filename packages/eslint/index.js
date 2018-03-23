/**
 * ESLint webpack block.
 *
 * @see https://github.com/webpack-contrib/eslint-loader
 */

module.exports = eslint

/**
 * @param {object}    [options] See https://github.com/webpack-contrib/eslint-loader#options
 * @return {Function}
 */
function eslint (options = {}) {
  return ({context, util}) =>
    util.addLoader(
      Object.assign(
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          enforce: 'pre',
          use: [{ loader: 'eslint-loader', options }]
        },
        context.match
      )
    )
}
