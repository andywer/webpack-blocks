const webpackBlock = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpackBlock.createConfig
const customConfig = webpackBlock.customConfig
const entryPoint = webpackBlock.entryPoint
const setOutput = webpackBlock.setOutput

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
