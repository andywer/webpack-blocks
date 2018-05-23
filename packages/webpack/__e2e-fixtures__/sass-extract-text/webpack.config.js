const { createConfig, entryPoint, match, setMode, setOutput } = require('../../index')

const path = require('path')
const extractText = require('@webpack-blocks/extract-text')
const sass = require('@webpack-blocks/sass')

module.exports = createConfig([
  setMode('development'),
  entryPoint(path.join(__dirname, 'app.js')),
  setOutput(path.join(__dirname, 'build/bundle.js')),
  match('*.sass', [sass({ indentSyntax: true }), extractText('styles.css')])
])
