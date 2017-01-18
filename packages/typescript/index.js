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
  const setter = (context) => ({
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
    plugins: [
      new CheckerPlugin()
    ].concat(
      options ? [
        new TsConfigPathsPlugin({ tsconfig: options.tsconfig, compiler: options.compiler })
      ] : []
    )
  })

  return Object.assign(setter, { pre })
}

function pre (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
