const webpack = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpack.createConfig
const customConfig = webpack.customConfig
const entryPoint = webpack.entryPoint
const setOutput = webpack.setOutput

const path = require('path')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'app.js')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  customConfig({
    output: {
      // Created bundle will be a module instead of a stand-alone self-running bundle
      // So we can require() it and check if it works
      libraryTarget: 'commonjs2'
    }
  })
])
