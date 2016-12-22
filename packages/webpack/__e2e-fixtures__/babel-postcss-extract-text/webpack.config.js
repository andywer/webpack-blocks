const webpackBlock = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpackBlock.createConfig
const defineConstants = webpackBlock.defineConstants
const entryPoint = webpackBlock.entryPoint
const setOutput = webpackBlock.setOutput

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
  defineConstants({
    'process.env.TEST': 'This is the injected process.env.TEST!'
  })
])
