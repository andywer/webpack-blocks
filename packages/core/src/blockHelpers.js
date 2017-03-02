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
  return prevConfig => ({
    ...prevConfig,
    module: {
      ...prevConfig.module,
      loaders: prevConfig.module.loaders.concat([ loaderDef ])
    }
  })
}

function addPlugin (plugin) {
  return prevConfig => ({
    ...prevConfig,
    plugins: prevConfig.plugins.concat([ plugin ])
  })
}
