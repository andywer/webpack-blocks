const webpack2 = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpack2.createConfig
const defineConstants = webpack2.defineConstants
const entryPoint = webpack2.entryPoint
const performance = webpack2.performance
const setOutput = webpack2.setOutput

const babel = require('@webpack-blocks/babel6')
const postcss = require('@webpack-blocks/postcss')
const extractText = require('@webpack-blocks/extract-text2')
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
  performance({
    maxAssetSize: 100000,
    maxEntrypointSize: 500000,
    hints: 'error'
  }),
  defineConstants({
    'process.env.TEST': 'This is the injected process.env.TEST!'
  })
])
