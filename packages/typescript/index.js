/**
 * Typescript webpack block.
 *
 * @see https://github.com/s-panferov/awesome-typescript-loader
 */

const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')

module.exports = typescript

/**
 * @param {object}   [advancedPathResolution]                  See https://github.com/s-panferov/awesome-typescript-loader#advanced-path-resolution-in-typescript-20
 * @param {object} [options.tsconfig]
 * @param {object} [options.compiler]
 * @return {Function}
 */
function typescript (options) {
  return (context) => ({
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    module: {
      loaders: [
        {
          test: context.fileType('application/x-typescript'),
          loaders: [
            'awesome-typescript-loader'
          ]
        }
      ]
    },
    plugins: options ? [new CheckerPlugin(), new TsConfigPathsPlugin({ tsconfig: options.tsconfig, compiler: options.compiler })] : [new CheckerPlugin()]
  })
}
