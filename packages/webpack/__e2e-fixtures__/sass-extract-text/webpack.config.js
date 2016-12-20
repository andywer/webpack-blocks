const webpackBlock = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpackBlock.createConfig
const entryPoint = webpackBlock.entryPoint
const setOutput = webpackBlock.setOutput

const path = require('path')
const extractText = require('@webpack-blocks/extract-text')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'app.js')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  sass({ indentSyntax: true }),
  extractText('styles.css', 'text/x-sass')
])
