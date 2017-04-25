const _ = require('lodash')
const webpackMerge = require('webpack-merge')

module.exports = {
  merge,
  addLoader,
  addPlugin
}

function merge (configSnippet) {
  return prevConfig => webpackMerge.smart(prevConfig, configSnippet)
}

function addLoader (loaderDef) {
  const cleanedLoaderDef = _.omitBy(loaderDef, _.isUndefined)
  return prevConfig => webpackMerge.smart(prevConfig, {
    module: {
      rules: [ cleanedLoaderDef ]
    }
  })
}

function addPlugin (plugin) {
  return prevConfig => Object.assign(
    {},
    prevConfig,
    { plugins: prevConfig.plugins.concat([ plugin ]) }
  )
}
