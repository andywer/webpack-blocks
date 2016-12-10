const webpack2 = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpack2.createConfig
const customConfig = webpack2.customConfig
const entryPoint = webpack2.entryPoint
const setOutput = webpack2.setOutput

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
