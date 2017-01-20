const webpackBlock = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpackBlock.createConfig
const defineConstants = webpackBlock.defineConstants
const entryPoint = webpackBlock.entryPoint
const setOutput = webpackBlock.setOutput

const typescript = require('@webpack-blocks/typescript')
const tslint = require('@webpack-blocks/tslint')
const path = require('path')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'app.ts')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  typescript(),
  tslint({
    emitErrors: true
  }),
  defineConstants({
    'process.env.TEST': 'This is the injected process.env.TEST!'
  })
])
