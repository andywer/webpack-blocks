/**
 * Babel webpack block.
 *
 * @see https://github.com/babel/babel-loader
 */

module.exports = babel

/**
 * @param {object} [options]
 * @param {RegExp|Function|string}  [options.exclude]   Directories to exclude.
 * @param {RegExp|Function|string}  [options.include]   Directories to include.
 * @param {string[]}                [options.plugins]   Babel plugins to use.
 * @param {string[]}                [options.presets]   Babel presets to use.
 * @return {Function}
 */
function babel (options) {
  options = options || {}

  const babelDefaultConfig = {
    cacheDirectory: true,
    exclude: /node_modules/
  }

  const setter = context => prevConfig => {
    // Write babel config into the context
    context.babel = context.babel || babelDefaultConfig

    if ('cacheDirectory' in options) {
      context.babel.cacheDirectory = options.cacheDirectory
    }
    if ('exclude' in options) {
      context.babel.exclude = options.exclude
    }
    if ('include' in options) {
      context.babel.include = options.include
    }
    if ('plugins' in options) {
      context.babel.plugins = (context.babel.plugins || []).concat(options.plugins)
    }
    if ('presets' in options) {
      context.babel.presets = (context.babel.presets || []).concat(options.presets)
    }

    return prevConfig
  }

  return Object.assign(setter, { post: postConfig })
}

function postConfig (context, util) {
  const exclude = context.babel.exclude
  const include = context.babel.include

  const babelOptions = Object.assign({}, context.babel)
  delete babelOptions.exclude
  delete babelOptions.include

  const ruleConfig = Object.assign({
    test: context.fileType('application/javascript'),
    use: [ {
      loader: 'babel-loader',
      options: babelOptions
    } ]
  }, exclude && {
    exclude: Array.isArray(exclude) ? exclude : [ exclude ]
  }, include && {
    include: Array.isArray(include) ? include : [ include ]
  })

  return util.addLoader(ruleConfig)
}
