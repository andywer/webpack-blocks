const webpackBlock = require('../../index')

// Need to write it like this instead of destructuring so it runs on Node 4.x w/o transpiling
const createConfig = webpackBlock.createConfig
const entryPoint = webpackBlock.entryPoint
const setOutput = webpackBlock.setOutput

const path = require('path')
const postcss = require('@webpack-blocks/postcss')
const precss = require('precss')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  entryPoint(
    path.join(__dirname, 'styles.sass')
  ),
  setOutput(
    path.join(__dirname, 'build/bundle.js')
  ),
  postcss([
    precss
  ]),
  sass({ indentSyntax: true, sourceMap: true })
])
