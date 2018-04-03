const {
  createConfig,
  entryPoint,
  performance,
  setOutput
} = require('../../index')

const elm = require('@webpack-blocks/elm')
const path = require('path')

module.exports = createConfig([
  entryPoint(path.join(__dirname, 'main.js')),
  setOutput(path.join(__dirname, 'build/bundle.js')),
  elm({ cwd: __dirname }, true),
  performance({
    maxAssetSize: 200000,
    maxEntrypointSize: 500000,
    hints: 'error'
  })
])
