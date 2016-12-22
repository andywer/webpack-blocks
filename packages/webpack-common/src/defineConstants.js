export default defineConstants

/**
 * Replaces constants in your source code with a value (`process.env.NODE_ENV`
 * for example) using the `webpack.DefinePlugin`. Every constant's value is
 * `JSON.stringify()`-ed first, so you don't have to remember.
 *
 * Special feature: Using `defineConstants` multiple times results in a single
 * DefinePlugin instance configured to do all the replacements.
 *
 * @param {object} constants  { [constantName: string]: * }
 * @return {Function}
 */
function defineConstants (constants) {
  return Object.assign((context) => {
    context.defineConstants = Object.assign({}, context.defineConstants, constants)
    return {}       // return empty webpack config snippet
  }, { post: addDefinePlugin })
}

function addDefinePlugin (context) {
  const stringify = (value) => JSON.stringify(value, null, 2)
  const stringifiedConstants = mapProps(context.defineConstants, stringify)

  return {
    plugins: [
      new context.webpack.DefinePlugin(stringifiedConstants)
    ]
  }
}

function mapProps (object, valueMapper) {
  return Object.keys(object)
    .map((propKey) => ({ [propKey]: valueMapper(object[propKey]) }))
    .reduce((newObject, partial) => Object.assign(newObject, partial), {})
}
