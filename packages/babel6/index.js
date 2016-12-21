/**
 * Babel webpack block.
 *
 * @see https://github.com/babel/babel-loader
 */

module.exports = babel

/**
 * @param {object} [options]
 * @param {RegExp, Function, string}  [options.exclude]   Directories to exclude.
 * @param {string[]}                  [options.plugins]   Babel plugins to use.
 * @param {string[]}                  [options.presets]   Babel presets to use.
 * @return {Function}
 */
function babel (options) {
  options = options || {}

  const babelDefaultConfig = {
    cacheDirectory: true,
    exclude: /\/node_modules\//
  }

  return Object.assign((context) => {
    // Write babel config into the context
    context.babel = context.babel || babelDefaultConfig

    if ('cacheDirectory' in options) {
      context.babel.cacheDirectory = options.cacheDirectory
    }
    if ('exclude' in options) {
      context.babel.exclude = options.exclude
    }
    if ('plugins' in options) {
      context.babel.plugins = (context.babel.plugins || []).concat(options.plugins)
    }
    if ('presets' in options) {
      context.babel.presets = (context.babel.presets || []).concat(options.presets)
    }

    // Return empty config snippet (configuration will be created by the post hook)
    return {}
  }, { post: postConfig })
}

function postConfig (context) {
  const exclude = context.babel.exclude

  const babelOptions = Object.assign({}, context.babel)
  delete babelOptions.exclude

  return {
    module: {
      loaders: [
        {
          test: context.fileType('application/javascript'),
          exclude: Array.isArray(exclude) ? exclude : [ exclude ],
          loaders: [ 'babel-loader?' + JSON.stringify(babelOptions) ]
        }
      ]
    }
  }
}
