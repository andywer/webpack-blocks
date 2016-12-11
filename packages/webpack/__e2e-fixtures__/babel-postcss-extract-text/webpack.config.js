const webpackBlock = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const addPlugins = webpackBlock.addPlugins
const createConfig = webpackBlock.createConfig
const entryPoint = webpackBlock.entryPoint
const setOutput = webpackBlock.setOutput
const webpack = webpackBlock.webpack

const babel = require('@webpack-blocks/babel6')
const postcss = require('@webpack-blocks/postcss')
const extractText = require('@webpack-blocks/extract-text')
const path = require('path')
const precss = require('precss')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'app.js')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  babel(),
  postcss([
    precss
  ]),
  extractText(
    path.join('styles.css')
  ),
  addPlugins([
    new webpack.DefinePlugin({
      'process.env': { TEST: '"This is the injected process.env.TEST!"' }
    })
  ])
])
