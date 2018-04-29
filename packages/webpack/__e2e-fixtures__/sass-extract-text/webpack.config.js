const { createConfig, entryPoint, match, setOutput } = require('../../index')

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
  match('*.sass', [
    sass({ indentSyntax: true }),
    extractText('styles.css')
  ])
])
