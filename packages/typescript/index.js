/**
 * Typescript webpack block.
 *
 * @see https://github.com/s-panferov/awesome-typescript-loader
 */

const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')

module.exports = typescript

/**
 * @param {object} [options] See https://github.com/s-panferov/awesome-typescript-loader#loader-options
 * @return {Function}
 */
function typescript (options = {}) {
  return (context, util) => util.merge({
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    module: {
      rules: [
        Object.assign({
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options
            }
          ]
        }, context.match)
      ]
    },
    plugins: [
      new CheckerPlugin(),
      new TsConfigPathsPlugin({ tsconfig: options.configFileName, compiler: options.compiler }) // This hooks into webpacks module resolution, configure via tsconfig.json
    ]
  })
}
