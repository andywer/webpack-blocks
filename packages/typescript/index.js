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
  const setter = (context) => ({
    resolve: {
      extensions: ['.ts', '.tsx']
    },
    module: {
      loaders: [
        {
          test: context.fileType('application/x-typescript'),
          loaders: [
            'awesome-typescript-loader?' + JSON.stringify(options)
          ]
        }
      ]
    },
    plugins: [
      new CheckerPlugin(),
      new TsConfigPathsPlugin({ tsconfig: options.tsconfig, compiler: options.compiler }) //This hooks into webpacks module resolution, configure via tsconfig.json
    ]
  })

  return Object.assign(setter, { pre })
}

function pre (context) {
  const registeredTypes = context.fileType.all()
  if (!('application/x-typescript' in registeredTypes)) {
    context.fileType.add('application/x-typescript', /\.(ts|tsx)$/)
  }
}
