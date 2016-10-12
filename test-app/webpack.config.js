const HtmlWebpackPlugin = require('html-webpack-plugin')
const { createConfig, entryPoint, setOutput, sourceMaps, addPlugins } = require('@webpack-blocks/webpack')
const babel = require('@webpack-blocks/babel6')
const cssModules = require('@webpack-blocks/css-modules')
const devServer = require('@webpack-blocks/dev-server')

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
