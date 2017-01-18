const webpack2 = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const defineConstants = webpack2.defineConstants
const createConfig = webpack2.createConfig
const entryPoint = webpack2.entryPoint
const performance = webpack2.performance
const setOutput = webpack2.setOutput

const typescript = require('@webpack-blocks/typescript')
const path = require('path')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'app.ts')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  typescript(),
  performance({
    maxAssetSize: 100000,
    maxEntrypointSize: 500000,
    hints: 'error'
  }),
  defineConstants({
    'process.env.TEST': 'This is the injected process.env.TEST!'
  })
])
