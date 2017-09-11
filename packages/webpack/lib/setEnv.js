module.exports = setEnv

/**
 * Replaces constants in your source code with values from `process.env`
 * using the `webpack.EnvironmentPlugin`.
 *
 * Using `setEnv` multiple times results in a single
 * EnvironmentPlugin instance configured to do all the replacements.
 *
 * @param {string[]|object} constants
 * @return {Function}
 */
function setEnv (constants) {
  const setter = context => prevConfig => {
    context.setEnv = Object.assign({}, context.setEnv, toObject(constants))
    return prevConfig
  }

  return Object.assign(setter, { post: addEnvironmentPlugin })
}

function addEnvironmentPlugin (context, util) {
  return util.addPlugin(
    new context.webpack.EnvironmentPlugin(context.setEnv)
  )
}

function toObject (constants) {
  if (Array.isArray(constants)) {
    return constants.reduce((result, constant) => {
      // Setting the default (fallback) value to `undefined`
      // to make sure the EnvironmentPlugin will throw a warning
      // in case if `process.env[constant]` was not defined too.
      result[constant] = undefined
      return result
    }, {})
  }

  return constants
}
