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
  return prevConfig => webpackMerge.smart(prevConfig, {
    module: {
      rules: [ loaderDef ]
    }
  })
}

function addPlugin (plugin) {
  return prevConfig => ({
    ...prevConfig,
    plugins: prevConfig.plugins.concat([ plugin ])
  })
}
