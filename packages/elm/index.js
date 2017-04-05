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
function elm (options, isProduction) {
  options = options || {}
  isProduction = isProduction || process.env.NODE_ENV === 'production'

  const productionDefaultConfig = {
    exclude: [/elm-stuff/, /node_modules/],
    loader: 'elm-webpack-loader'
  }
  const developmentDefaultConfig = {
    exclude: [/elm-stuff/, /node_modules/],
    loader: 'elm-hot-loader!elm-webpack-loader',
    verbose: 'true',
    warn: 'true',
    debug: 'true'
  }

  const elmDefaultConfig = isProduction ? productionDefaultConfig : developmentDefaultConfig

  return Object.assign((context) => {
    context.elm = context.elm || elmDefaultConfig

    if ('cwd' in options) {
      context.elm.cwd = options.cwd
    }
    if ('exclude' in options) {
      context.elm.exclude = options.exclude
    }
    if ('include' in options) {
      context.elm.include = options.include
    }
    if ('maxInstances' in options) {
      context.elm.maxInstances = options.maxInstances
    }

    // Return empty config snippet (configuration will be created by the post hook)
    return {}
  }, { post: postConfig })
}

function postConfig (context) {
  const exclude = context.elm.exclude
  const include = context.elm.include
  const loader = context.elm.loader

  const elmOptions = Object.assign({}, context.elm)
  delete elmOptions.exclude
  delete elmOptions.include
  delete elmOptions.loader

  const loaderConfig = Object.assign({
    test: context.fileType('application/x-elm'),
    loader: loader + (Object.keys(elmOptions).length ? `?${JSON.stringify(elmOptions)}` : '')
  }, exclude && {
    exclude: Array.isArray(exclude) ? exclude : [ exclude ]
  }, include && {
    include: Array.isArray(include) ? include : [ include ]
  })

  return {
    resolve: {
      extensions: [ '.elm' ]
    },
    module: {
      loaders: [ loaderConfig ]
    }
  }
}
