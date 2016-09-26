const path = require('path')
const merge = require('webpack-merge')

exports.createConfig = createConfig
exports.baseConfig = baseConfig
exports.addPlugins = addPlugins
exports.customConfig = customConfig
exports.resolveAliases = resolveAliases
exports.setDevTool = setDevTool
exports.setOutput = setOutput

function createConfig (configSetters) {
  return configSetters.reduce((config, setter) => merge.smart(config, setter(config)), {})
}

function baseConfig (entry, options = {}) {
  const { devtool = null, output } = options

  return () => merge(
    {
      entry,
      module: {
        loaders: [
          {
            test: /\.eot$|\.ttf$|\.woff$|\.svg$|\.png$/,
            loader: 'file'
          }, {
            test: /\.json/,
            loader: 'json'
          }
        ]
      }
    },
    output && setOutput(output)(),
    devtool && setDevTool(devtool)()
  )
}

function addPlugins (plugins) {
  return () => ({ plugins })
}

function customConfig (wpConfig) {
  return () => wpConfig
}

function resolveAliases (aliases) {
  return () => ({
    resolve: {
      alias: aliases
    }
  })
}

function setDevTool (devtool) {
  return () => ({ devtool })
}

function setOutput (output) {
  if (typeof output === 'string') {
    return setOutput({
      filename: path.basename(output) || 'bundle.js',
      path: path.dirname(output) || './build'
    })
  }

  return () => ({ output })
}
