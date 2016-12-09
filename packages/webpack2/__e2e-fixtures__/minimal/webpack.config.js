const path = require('path')
const { createConfig, customConfig, entryPoint, setOutput } = require('../../index')

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
