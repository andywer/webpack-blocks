const merge = require('webpack-merge')
const { createBaseConfig } = require('./lib/webpack')

exports.createConfig = createConfig
exports.env = env

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

/**
 * Takes an array of webpack blocks and creates a webpack config out of them.
 * Each webpack block is a callback function which will be invoked to return a
 * partial webpack config. These partial configs are eventually merged to the
 * final, complete webpack config that will be returned.
 *
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {object}                   Webpack config object.
 */
function createConfig (configSetters) {
  if (!Array.isArray(configSetters) || !configSetters.every(isFunction)) {
    throw new Error(`Expected parameter 'configSetters' to be an array of functions.`)
  }

  const fileTypes = createFileTypesMapping(defaultFileTypeMatchers)
  const baseConfig = createBaseConfig(fileTypes)

  return invokeConfigSetters(fileTypes, configSetters, baseConfig)
}

/**
 * Applies an array of webpack blocks only if `process.env.NODE_ENV` matches the
 * given `envName`. If no `NODE_ENV` is set, it will be treated as 'development'.
 *
 * @param {string} envName            Environment name like 'development', 'production' or 'testing'.
 * @param {Function[]} configSetters  Array of functions as returned by webpack blocks.
 * @return {Function}
 */
function env (envName, configSetters) {
  const currentEnv = process.env.NODE_ENV || 'development'

  return currentEnv === envName
    ? (fileTypes) => invokeConfigSetters(fileTypes, configSetters)
    : () => ({})
}

function invokeConfigSetters (fileTypes, configSetters, baseConfig) {
  baseConfig = baseConfig || {}

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
