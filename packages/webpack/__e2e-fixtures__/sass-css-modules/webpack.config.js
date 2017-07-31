const { createConfig, entryPoint, match, setOutput } = require('../../index')
const { css } = require('@webpack-blocks/assets')
const extractText = require('@webpack-blocks/extract-text')
const sass = require('@webpack-blocks/sass')
const path = require('path')

module.exports = createConfig([
  entryPoint(path.join(__dirname, 'src/index.js')),
  setOutput(path.join(__dirname, 'build/bundle.js')),
  match('*.scss', [
    css.modules(),
    sass(),
    extractText('./styles.css')
  ])
])
