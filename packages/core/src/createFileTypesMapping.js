module.exports = createFileTypesMapping

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
     * @param {string} type   MIME type.
     * @return {boolean}
     */
    has (type) {
      return type in currentMapping
    },

    /**
     * @param {string|object} type
     * @param {RegExp|Function|string|array} [condition]  Only used if param `type` is a string.
     * @return {FileTypesMapping} this
     * @see https://webpack.github.io/docs/configuration.html#module-loaders
     * @example `fileType.add('application/javascript', /\.jsx?$/)`
     * @example `fileType.add({ 'application/javascript': [ /\.js$/, /\.jsx$/ ] })`
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
