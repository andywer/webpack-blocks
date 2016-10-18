const {
  addPlugins, createConfig, entryPoint, env, setOutput, sourceMaps, webpack
} = require('@webpack-blocks/webpack')

const babel = require('@webpack-blocks/babel6')
const cssModules = require('@webpack-blocks/css-modules')
const devServer = require('@webpack-blocks/dev-server')
const extractText = require('@webpack-blocks/extract-text')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const basePlugins = [
  new HtmlWebpackPlugin({
    inject: true,
    template: './index.html'
  }),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env || 'development')
  })
]

const productionPlugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: true },
    screwIe8: true
  })
]

module.exports = createConfig([
  entryPoint('./src/index.dev.js'),
  setOutput('./build/bundle.js'),
  babel(),
  cssModules(),
  addPlugins(basePlugins),
  env('development', [
    sourceMaps(),
    devServer(),
    devServer.proxy({
      '/api/*': { target: 'http://localhost:8080' }
    })
  ]),
  env('production', [
    extractText(),
    addPlugins(productionPlugins)
  ])
])
