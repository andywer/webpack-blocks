/**
 * Elm webpack block.
 *
 * @see https://github.com/elm-community/elm-webpack-loader
 */

module.exports = elm

/**
 * @param {object} [options]
 * @param {RegExp|Function|string}  [options.exclude]       Directories to exclude.
 * @param {RegExp|Function|string}  [options.include]       Directories to include.
 * @param {number}                  [options.maxInstances]  Maximum instances of elm that can spawned.
 * @param {string}                  [options.cwd]           Custom location for your elm files.
 * @return {Function}
 */
function elm (options = {}, isProduction) {
  isProduction = typeof isProduction === 'boolean'
    ? isProduction
    : process.env.NODE_ENV === 'production'

  const productionDefaultConfig = {
    exclude: [/elm-stuff/, /node_modules/],
    hot: false,
    options: {}
  }
  const developmentDefaultConfig = {
    exclude: [/elm-stuff/, /node_modules/],
    hot: true,
    options: {
      verbose: true,
      warn: true,
      debug: true
    }
  }

  const elmDefaultConfig = isProduction ? productionDefaultConfig : developmentDefaultConfig

  return Object.assign(context => prevConfig => {
    context.elm = context.elm || elmDefaultConfig

    if ('exclude' in options) {
      context.elm.exclude = options.exclude
    }
    if ('include' in options) {
      context.elm.include = options.include
    }
    if ('cwd' in options) {
      context.elm.options.cwd = options.cwd
    }
    if ('maxInstances' in options) {
      context.elm.options.maxInstances = options.maxInstances
    }

    // Return unchanged config (configuration will be created by the post hook)
    return prevConfig
  }, { post: postConfig })
}

function postConfig (context, util) {
  const exclude = context.elm.exclude
  const include = context.elm.include

  const hotLoader = { loader: 'elm-hot-loader' }

  const loaderConfig = Object.assign({
    test: context.fileType('application/x-elm'),
    use: (context.elm.hot ? [hotLoader] : []).concat([
      {
        loader: 'elm-webpack-loader',
        options: context.elm.options
      }
    ])
  }, exclude && {
    exclude: Array.isArray(exclude) ? exclude : [ exclude ]
  }, include && {
    include: Array.isArray(include) ? include : [ include ]
  })

  return util.merge({
    resolve: {
      extensions: [ '.elm' ]
    },
    module: {
      rules: [ loaderConfig ]
    }
  })
}
