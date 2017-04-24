/**
 * Typescript webpack block.
 *
 * @see https://github.com/s-panferov/awesome-typescript-loader
 */

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin

module.exports = typescript

/**
 * @param {object} [options] See https://github.com/s-panferov/awesome-typescript-loader#loader-options
 * @return {Function}
 */
function typescript (options) {
  options = options || {}
  return (context, util) => util.merge({
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: context.fileType('application/x-typescript'),
          use: [
            {
              loader: 'awesome-typescript-loader',
              options
            }
          ]
        }
      ]
    },
    plugins: [
      new CheckerPlugin(),
      new TsConfigPathsPlugin({ tsconfig: options.configFileName, compiler: options.compiler }) // This hooks into webpacks module resolution, configure via tsconfig.json
    ]
  })
}
