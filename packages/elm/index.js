/**
 * Elm webpack block.
 *
 * @see https://github.com/elm-community/elm-webpack-loader
 */

module.exports = elm

/**
 * @param {object} [options]
 * @param {number}                  [options.maxInstances]  Maximum instances of elm that can spawned.
 * @param {string}                  [options.cwd]           Custom location for your elm files.
 * @return {Function}
 */
function elm (options = {}, isProduction) {
  isProduction = typeof isProduction === 'boolean'
    ? isProduction
    : process.env.NODE_ENV === 'production'

  const productionDefaultConfig = {
    hot: false,
    options: {}
  }
  const developmentDefaultConfig = {
    hot: true,
    options: {
      verbose: true,
      warn: true,
      debug: true
    }
  }

  const main = context => prevConfig => {
    context.elm = Object.assign({}, context.elm, isProduction ? productionDefaultConfig : developmentDefaultConfig)
    context.elm.options = Object.assign(context.elm.options, options)

    // Return unchanged config (configuration will be created by the post hook)
    return prevConfig
  }

  return Object.assign(main, { post: postConfig })
}

function postConfig (context, util) {
  const elmLoader = {
    loader: 'elm-webpack-loader',
    options: context.elm.options
  }
  const elmHotLoader = {
    loader: 'elm-hot-loader'
  }

  const loaderConfig = Object.assign({
    test: context.fileType('application/x-elm'),
    exclude: [/elm-stuff/, /node_modules/],
    use: context.elm.hot ? [elmHotLoader, elmLoader] : [elmLoader]
  }, context.match)

  return util.merge({
    resolve: {
      extensions: [ '.elm' ]
    },
    module: {
      rules: [ loaderConfig ]
    }
  })
}
