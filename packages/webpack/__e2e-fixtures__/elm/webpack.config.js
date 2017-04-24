const webpack2 = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpack2.createConfig
const entryPoint = webpack2.entryPoint
const performance = webpack2.performance
const setOutput = webpack2.setOutput

const elm = require('@webpack-blocks/elm')
const path = require('path')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'main.js')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  elm({ cwd: __dirname }, true),
  performance({
    maxAssetSize: 200000,
    maxEntrypointSize: 500000,
    hints: 'error'
  })
])
