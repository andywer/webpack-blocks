const {
  addPlugins, createConfig, entryPoint, env, setOutput, sourceMaps, webpack
} = require('@webpack-blocks/webpack2')

const babel = require('@webpack-blocks/babel6')
const cssModules = require('@webpack-blocks/css-modules')
const devServer = require('@webpack-blocks/dev-server2')
const extractText = require('@webpack-blocks/extract-text2')
const plugins = require('./webpack.plugins')

module.exports = createConfig([
  setOutput('./build/bundle.js'),
  babel(),
  cssModules(),
  addPlugins(plugins.basePlugins),
  env('development', [
    entryPoint('./src/index.dev.js'),
    sourceMaps(),
    devServer(),
    devServer.proxy({
      '/api/*': { target: 'http://localhost:4000' }
    }),
    addPlugins(plugins.devPlugins)
  ]),
  env('production', [
    entryPoint('./src/index.js'),
    extractText(),
    addPlugins(plugins.productionPlugins)
  ])
])
