/**
 * Typescript webpack block.
 *
 * @see https://github.com/s-panferov/awesome-typescript-loader
 */

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin

module.exports = typescript

/**
 * @param {object} [advancedPathResolution]                  See https://github.com/s-panferov/awesome-typescript-loader#advanced-path-resolution-in-typescript-20
 * @param {object} [options.tsconfig]
 * @param {object} [options.compiler]
 * @return {Function}
 */
function typescript (options) {
  return (context, util) => util.merge({
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: context.fileType('application/x-typescript'),
          use: [ 'awesome-typescript-loader' ]
        }
      ]
    },
    plugins: [
      new CheckerPlugin()
    ].concat(
      options ? [
        new TsConfigPathsPlugin({ tsconfig: options.tsconfig, compiler: options.compiler })
      ] : []
    )
  })
}
