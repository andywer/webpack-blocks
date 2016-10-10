const HtmlWebpackPlugin = require('html-webpack-plugin')
const { createConfig } = require('../')
const { entryPoint, setOutput, sourceMaps, addPlugins } = require('../lib/webpack')
const babel = require('../lib/babel6')
const cssModules = require('../lib/css-modules')
const devServer = require('../lib/dev-server')

module.exports = createConfig([
  entryPoint('./src/index.dev.js'),
  setOutput('./build/bundle.js'),
  babel(),
  sourceMaps(),
  cssModules(),
  devServer(),
  devServer.proxy({
    '/api/*': { target: 'http://localhost:8080' }
  }),
  addPlugins([
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ])
])
