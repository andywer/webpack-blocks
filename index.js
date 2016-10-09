const merge = require('webpack-merge')
const { createBaseConfig } = require('./lib/webpack')

exports.createConfig = createConfig

const defaultFileTypeMatchers = {
  'application/font': /\.(eot|ttf|woff|woff2)(\?.*)?$/,
  'application/javascript': /\.(js|jsx)$/,
  'application/json': /\.json$/,
  'audio': /\.(aac|m4a|mp3|oga|ogg|wav)$/,
  'image': /\.(gif|ico|jpg|jpeg|png|svg|webp)$/,
  'text/css': /\.css$/,
  'text/x-sass': /\.(sass|scss)$/,
  'video': /\.(mp4|webm)$/
}

const isFunction = (value) => typeof value === 'function'

function createConfig (configSetters) {
  if (!Array.isArray(configSetters) || !configSetters.every(isFunction)) {
    throw new Error(`Expected parameter 'configSetters' to be an array of functions.`)
  }

  const fileTypes = createFileTypesMapping(defaultFileTypeMatchers)
  const baseConfig = createBaseConfig(fileTypes)

  return configSetters.reduce(
    (config, setter) => merge.smart(config, setter(fileTypes, config)),
    baseConfig
  )
}

function createFileTypesMapping (initialMapping) {
  let currentMapping = initialMapping

  const mapperMethods = {
    all () {
      return currentMapping
    },

    /**
     * @param {string} type   MIME type.
     * @return {RegExp|Function|string|array}
     */
    get (type) {
      if (!(type in currentMapping)) {
        throw new Error(`FileTypes:get(): Type is not registered: ${type}`)
      }
      return currentMapping[ type ]
    },

    /**
     * @param {string|object} type
     * @param {RegExp|Function|string|array} [condition]  Only used if param `type` is a string.
     *                                                    @see https://webpack.github.io/docs/configuration.html#module-loaders
     * @return {FileTypesMapping} this
     * @example `fileTypes.add('application/javascript', /\.jsx?$/)`
     * @example `fileTypes.add({ 'application/javascript': [ /\.js$/, /\.jsx$/ ] })`
     */
    add (type, condition) {
      if (typeof type === 'string') {
        currentMapping = addOne(type, condition)
      } else if (typeof type === 'object') {
        currentMapping = addMultiple(type)
      } else {
        throw new Error(`FileTypes:add(): Expected 1st param to be a string or object, but got: ${typeof type}`)
      }
      return mapper
    }
  }

  function FileTypeMapping (type) {
    return mapper.get(type)
  }

  function addOne (type, condition) {
    if (!condition) {
      throw new Error(`FileTypes:add(): Expected a 'condition' as 2nd param if 1st param is a string.`)
    }
    return Object.assign({}, currentMapping, {
      [ type ]: condition
    })
  }

  function addMultiple (types) {
    return Object.assign({}, currentMapping, types)
  }

  const mapper = Object.assign(FileTypeMapping, mapperMethods)
  return mapper
}
